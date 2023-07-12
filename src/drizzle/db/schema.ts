import {
  pgEnum,
  pgTable,
  uuid,
  uniqueIndex,
  index,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: varchar("user_id").primaryKey().notNull(),
    email: varchar("email"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (users) => ({
    userIdIndex: uniqueIndex("users__user_id__idx").on(users.id),
    emailIndex: index("users__email__idx").on(users.email),
  })
);

export const verifications = pgTable(
  "verifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id),
    requestId: varchar("request_id").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (verifications) => ({
    idIndex: uniqueIndex("verifications__id__idx").on(verifications.id),
    requestIdIndex: uniqueIndex("verifications__request_id__idx").on(
      verifications.requestId
    ),
    userIdIndex: index("verifications__user_id__idx").on(verifications.userId),
  })
);

export const appealStatusEnum = pgEnum("appeal", ["pending", "accepted", "rejected"]);

export const appeals = pgTable("appeals", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  message: varchar("message", { length: 350 }).notNull(),
  reason: varchar("reason", { length: 100 }).notNull(),
  status: appealStatusEnum("appeal").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  verifications: many(verifications),
  appeals: many(appeals),
}));

export const appealsRelations = relations(appeals, ({ one }) => ({
  user: one(users, {
    fields: [appeals.userId],
    references: [users.id],
  }),
}))

export const verificationsRelation = relations(verifications, ({ one }) => ({
  user: one(users, {
    fields: [verifications.userId],
    references: [users.id],
  }),
}));
