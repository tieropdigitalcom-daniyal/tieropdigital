import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { InquiryDatabase } from '../lib/inquiry-database.ts';

test('Node inquiry storage persists between connections and applies SQL rate limits', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'tierop-inquiry-'));
  const filename = join(directory, 'private', 'inquiries.sqlite');
  let database = new InquiryDatabase(filename);
  try {
    const insert = `INSERT INTO inquiry_requests
      (id, user_hash, payload_hash, created_at, last_attempt, attempts, status)
      SELECT ?, 'visitor', 'payload', 100, 100, 1, 'pending'
      WHERE (SELECT COALESCE(SUM(attempts), 0) FROM inquiry_requests WHERE user_hash = 'visitor') < 5
      RETURNING id`;
    for (let i = 0; i < 5; i++) assert.equal((await database.prepare(insert).bind(String(i)).first()).id, String(i));
    assert.equal(await database.prepare(insert).bind('blocked').first(), null);
    database.close();
    database = new InquiryDatabase(filename);
    assert.equal((await database.prepare('SELECT COUNT(*) AS count FROM inquiry_requests').bind().first()).count, 5);
    const event = 'INSERT OR IGNORE INTO email_delivery_events VALUES (?, ?, ?, ?)';
    await database.prepare(event).bind('event-1', 'email-1', 'email.delivered', 100).run();
    await database.prepare(event).bind('event-1', 'email-1', 'email.delivered', 100).run();
    assert.equal((await database.prepare('SELECT COUNT(*) AS count FROM email_delivery_events').bind().first()).count, 1);
  } finally { database.close(); rmSync(directory, { recursive: true, force: true }); }
});

test('Node inquiry storage rejects a relative path', () => {
  assert.throws(() => new InquiryDatabase('public/inquiries.sqlite'), /absolute private file path/);
});
