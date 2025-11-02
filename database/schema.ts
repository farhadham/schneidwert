import { billingPlan, organizationMemberRole } from "@/data/constants";
import { or, relations } from "drizzle-orm";
import {
  boolean,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
});

export const sessionTable = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, {
      onDelete: "cascade",
    }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    precision: 0,
  }).notNull(),
  ipAddress: varchar("ip_address"),
  userAgent: varchar("user_agent"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
});

export const accountTable = pgTable("account", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, {
      onDelete: "cascade",
    }),
  accountId: varchar("accountId").notNull(),
  providerId: varchar("provider_id").notNull(),
  accessToken: varchar("access_token"),
  refreshToken: varchar("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", {
    withTimezone: true,
    precision: 0,
  }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
    withTimezone: true,
    precision: 0,
  }),
  scope: varchar("scope"),
  idToken: varchar("id_token"),
  password: varchar("password"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
});

export const verificationTable = pgTable("verification", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: varchar("identifier").notNull(),
  value: varchar("value").notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
});

export const orgTable = pgTable("org", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
});

export const orgMemberTable = pgTable(
  "org_member",
  {
    orgId: uuid("org_id")
      .notNull()
      .references(() => orgTable.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    role: varchar("role", { enum: organizationMemberRole })
      .notNull()
      .default("member"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      precision: 0,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.orgId, table.userId] })],
);

export const projectTable = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id")
    .notNull()
    .references(() => orgTable.id, { onDelete: "cascade" }),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
});

export const jobTable = pgTable("job", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projectTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  input: jsonb("input").notNull(),
  result: jsonb("result").notNull(),
  calcVersion: varchar("calc_version").notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
});

export const billingTable = pgTable("billing", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id")
    .notNull()
    .references(() => orgTable.id, { onDelete: "cascade" }),
  stripeCustomerId: varchar("stripe_customer_id").notNull(),
  stripeSubscriptionId: varchar("stripe_subscription_id").notNull(),
  plan: varchar("plan", { enum: billingPlan }).notNull().default("starter"),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 0,
  })
    .notNull()
    .defaultNow(),
});

// Relations

export const userRelations = relations(userTable, ({ one, many }) => ({
  orgMembership: one(orgMemberTable),
  orgCreated: one(orgTable, {
    fields: [userTable.id],
    references: [orgTable.createdBy],
  }),
  jobsCreated: many(jobTable),
}));

export const orgRelations = relations(orgTable, ({ many, one }) => ({
  members: many(orgMemberTable),
  createdByUser: one(userTable, {
    fields: [orgTable.createdBy],
    references: [userTable.id],
  }),
  projects: many(projectTable),
  billings: many(billingTable),
}));

export const orgMemberRelations = relations(orgMemberTable, ({ one }) => ({
  user: one(userTable, {
    fields: [orgMemberTable.userId],
    references: [userTable.id],
  }), // orgMember belongs to 1 user only and can be null
  org: one(orgTable, {
    fields: [orgMemberTable.orgId],
    references: [orgTable.id],
  }),
}));

export const projectRelations = relations(projectTable, ({ one, many }) => ({
  org: one(orgTable, {
    fields: [projectTable.orgId],
    references: [orgTable.id],
  }),
  jobs: many(jobTable),
}));

export const jobRelations = relations(jobTable, ({ one }) => ({
  project: one(projectTable, {
    fields: [jobTable.projectId],
    references: [projectTable.id],
  }),
  createdByUser: one(userTable, {
    fields: [jobTable.createdBy],
    references: [userTable.id],
  }),
}));

export const billingRelations = relations(billingTable, ({ one }) => ({
  org: one(orgTable, {
    fields: [billingTable.orgId],
    references: [orgTable.id],
  }),
}));
