import { billingPlan, organizationMemberRole } from "@/data/constants";
import { or, relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  numeric,
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

export const projectTable = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
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
  // Material selection
  materialId: uuid("material_id")
    .notNull()
    .references(() => materialTable.id),
  thicknessId: uuid("thickness_id")
    .notNull()
    .references(() => materialThicknessTable.id),

  // Input parameters
  cutLengthMm: numeric("cut_length_mm", { precision: 12, scale: 2 }).notNull(), // Total cutting length in mm
  holesCount: integer("holes_count").notNull().default(0), // Number of holes/drillings

  // Optional time inputs
  setupMin: numeric("setup_min", { precision: 10, scale: 2 }).default("0"), // Setup/rigging time
  postMin: numeric("post_min", { precision: 10, scale: 2 }).default("0"), // Post-processing (deburring, washing)
  engraveLengthMm: numeric("engrave_length_mm", {
    precision: 10,
    scale: 2,
  }).default("0"), // Engraving length

  qty: integer("qty").notNull().default(1), // Quantity of parts

  // Pricing overrides
  overrideMachineEurMin: numeric("override_machine_eur_min", {
    precision: 10,
    scale: 2,
  }), // Override machine cost for this job
  marginPct: numeric("margin_pct", { precision: 5, scale: 2 }).default("0"), // Margin/markup percentage

  // Calculated results (stored for history/reference)
  resultPricePerUnit: numeric("result_price_per_unit", {
    precision: 10,
    scale: 2,
  }),
  resultTotal: numeric("result_total", { precision: 10, scale: 2 }),

  // Job metadata
  customerName: text("customer_name"), // Optional customer reference
  notes: text("notes"),
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

export const materialTable = pgTable("material", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(), // e.g., "Stahl S235", "Edelstahl 1.4301"
  code: text("code").notNull(), // e.g., "S235", "1.4301"
  active: boolean("active").notNull().default(true),
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

export const materialThicknessTable = pgTable("material_thickness", {
  id: uuid("id").defaultRandom().primaryKey(),
  materialId: uuid("material_id")
    .notNull()
    .references(() => materialTable.id, { onDelete: "cascade" }),
  thicknessMm: numeric("thickness_mm", { precision: 10, scale: 2 }).notNull(), // e.g., 2.00, 3.00, 4.00

  // Cost parameters per thickness
  cutCostPerM: numeric("cut_cost_per_m", { precision: 10, scale: 2 }).notNull(), // €/meter of cutting
  drillSecsPerHole: numeric("drill_secs_per_hole", {
    precision: 10,
    scale: 2,
  }).notNull(), // seconds per drilling/hole
  engraveCostPerM: numeric("engrave_cost_per_m", { precision: 10, scale: 2 }), // optional: €/meter for engraving

  notes: text("notes"),
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

// Relations

export const userRelations = relations(userTable, ({ one, many }) => ({
  projectsCreated: many(projectTable),
}));

export const projectRelations = relations(projectTable, ({ one, many }) => ({
  jobs: many(jobTable),
  createdByUser: one(userTable, {
    fields: [projectTable.createdBy],
    references: [userTable.id],
  }),
}));

export const jobRelations = relations(jobTable, ({ one }) => ({
  project: one(projectTable, {
    fields: [jobTable.projectId],
    references: [projectTable.id],
  }),
  material: one(materialTable, {
    fields: [jobTable.materialId],
    references: [materialTable.id],
  }),
  thickness: one(materialThicknessTable, {
    fields: [jobTable.thicknessId],
    references: [materialThicknessTable.id],
  }),
}));

export const materialsRelations = relations(materialTable, ({ many }) => ({
  thicknesses: many(materialThicknessTable),
  jobs: many(jobTable),
}));

export const materialThicknessesRelations = relations(
  materialThicknessTable,
  ({ one, many }) => ({
    material: one(materialTable, {
      fields: [materialThicknessTable.materialId],
      references: [materialTable.id],
    }),
    jobs: many(jobTable),
  }),
);
