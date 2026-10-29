import { mkdirSync } from "node:fs";
import { dirname, isAbsolute } from "node:path";
import { DatabaseSync, type SQLInputValue } from "node:sqlite";

// The existing inquiry SQL stays atomic across Node.js processes through SQLite.
// Keep this file outside the web root and outside replaceable deployment folders.
export class InquiryDatabase {
  private readonly database: DatabaseSync;

  constructor(filename: string) {
    if (filename !== ":memory:" && !isAbsolute(filename)) {
      throw new Error("INQUIRY_DB_PATH must be an absolute private file path.");
    }
    if (filename !== ":memory:") mkdirSync(dirname(filename), { recursive: true, mode: 0o700 });
    this.database = new DatabaseSync(filename);
    this.database.exec(`
      PRAGMA busy_timeout = 5000;
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS inquiry_requests (
        id TEXT PRIMARY KEY NOT NULL, user_hash TEXT NOT NULL,
        payload_hash TEXT NOT NULL, created_at INTEGER NOT NULL,
        last_attempt INTEGER NOT NULL, attempts INTEGER DEFAULT 1 NOT NULL,
        status TEXT NOT NULL, email_id TEXT
      );
      CREATE INDEX IF NOT EXISTS inquiry_user_time ON inquiry_requests (user_hash, created_at);
      CREATE TABLE IF NOT EXISTS email_delivery_events (
        id TEXT PRIMARY KEY NOT NULL, email_id TEXT NOT NULL,
        event_type TEXT NOT NULL, created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS delivery_email ON email_delivery_events (email_id);
    `);
  }

  prepare(sql: string) {
    return {
      bind: (...values: SQLInputValue[]) => ({
        first: async <T = Record<string, unknown>>() =>
          (this.database.prepare(sql).get(...values) as T | undefined) ?? null,
        run: async () => this.database.prepare(sql).run(...values),
      }),
    };
  }

  close() { this.database.close(); }
}
