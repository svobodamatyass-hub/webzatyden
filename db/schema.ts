import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  message: text("message").notNull().default(""),
  goal: text("goal").notNull(),
  websiteSize: text("website_size").notNull(),
  packageName: text("package_name").notNull(),
  locale: text("locale").notNull(),
  status: text("status").notNull().default("new"),
  ipHash: text("ip_hash").notNull(),
}, (table) => [
  index("inquiries_created_at_idx").on(table.createdAt),
  index("inquiries_status_idx").on(table.status),
]);

export const inquiryRateLimits = sqliteTable("inquiry_rate_limits", {
  fingerprint: text("fingerprint").primaryKey(),
  windowStartedAt: integer("window_started_at").notNull(),
  requestCount: integer("request_count").notNull().default(1),
  lastSeenAt: integer("last_seen_at").notNull(),
}, (table) => [index("inquiry_rate_limits_last_seen_idx").on(table.lastSeenAt)]);
