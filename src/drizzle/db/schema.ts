import {
  integer,
  pgEnum,
  pgTable,
  uuid,
  serial,
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
    requestIdIndex: index("verifications__request_id__idx").on(
      verifications.requestId
    ),
    userIdIndex: index("verifications__user_id__idx").on(verifications.userId),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  verifications: many(verifications),
}));

export const verificationsRelation = relations(verifications, ({ one }) => ({
  user: one(users, {
    fields: [verifications.userId],
    references: [users.id],
  }),
}));
