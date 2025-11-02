import { db } from "@/database";
import {
  accountTable,
  sessionTable,
  userTable,
  verificationTable,
} from "@/database/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: userTable,
      verification: verificationTable,
      account: accountTable,
      session: sessionTable,
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    database: {
      generateId: false, // Database created Id automatically for us. No need for better-auth
    },
  },
});
