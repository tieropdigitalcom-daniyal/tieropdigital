import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
// Operational metadata only. No names, contact details or inquiry messages.
export const inquiryRequests = sqliteTable('inquiry_requests', {
  id: text('id').primaryKey(),
  userHash: text('user_hash').notNull(),
  payloadHash: text('payload_hash').notNull(),
  createdAt: integer('created_at').notNull(),
  lastAttempt: integer('last_attempt').notNull(),
  attempts: integer('attempts').notNull().default(1),
  status: text('status').notNull(),
  emailId: text('email_id'),
}, table => [index('inquiry_user_time').on(table.userHash, table.createdAt)]);
export const deliveryEvents = sqliteTable('email_delivery_events', {
  id: text('id').primaryKey(),
  emailId: text('email_id').notNull(),
  eventType: text('event_type').notNull(),
  createdAt: integer('created_at').notNull(),
}, table => [index('delivery_email').on(table.emailId)]);
