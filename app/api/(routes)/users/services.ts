import { db } from "@/database";
import { userTable } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getMyCompleteProfile = async (userId: string) => {
  return db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
  });
};
