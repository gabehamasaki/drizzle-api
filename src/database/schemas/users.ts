import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable('users', {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
})

export const userSelectSchema = createSelectSchema(users);
export const userInsertSchema = createInsertSchema(users, {
  email: z.string().email(),
  password: z.string().min(8),
});

export type User = z.infer<typeof userSelectSchema>;
export type UserInsert = z.infer<typeof userInsertSchema>;