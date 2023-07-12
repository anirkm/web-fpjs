import {
  integer,
  pgEnum,
  pgTable,
  uuid,
  serial,
  uniqueIndex,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("user_id").primaryKey().notNull(),
  email: varchar("email").notNull(),
});

export const verifications = pgTable("verifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id").notNull(),
  requestId: varchar("request_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  verifications: many(verifications),
}));

export const verificationsRelation = relations(verifications, ({ one }) => ({
  author: one(users, {
    fields: [verifications.userId],
    references: [users.id],
  }),
}));
