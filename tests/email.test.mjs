import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { DatabaseSync } from 'node:sqlite';
import vm from 'node:vm';
import ts from 'typescript';
import { inquirySchema } from '../lib/inquiry-schema.ts';
import * as security from '../lib/security.ts';
import { EMAIL, SITE_URL } from '../lib/content.ts';

// Execute the real inquiry route modules against SQLite and isolated,
// in-memory provider responses. These tests never send email or use real keys.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const csrf = 'a'.repeat(43);
const visitor = { id: 'test-google-user', email: 'visitor@example.com', email_confirmed_at: '2026-01-01', user_metadata: { full_name: 'Test Visitor' }, identities: [{ provider: 'google' }] };
const valid = { name: 'Test Visitor', country: 'US', phone: '+12025550123', email: visitor.email, message: 'A new website for our small business.', website: '', requestId: '123e4567-e89b-42d3-a456-426614174000' };

function fixture(options = {}) {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(resolve(root, 'drizzle/0000_clumsy_johnny_blaze.sql'), 'utf8'));
  const database = { prepare(sql) { return { bind(...values) { return {
    async first() { return sqlite.prepare(sql).get(...values) ?? null; },
    async run() { return sqlite.prepare(sql).run(...values); },
  }; } }; } };
  const env = options.unconfigured ? { DB: database } : {
    DB: database,
    RESEND_API_KEY: 'test-send-key', INQUIRY_FROM_EMAIL: 'Studio <studio@example.test>',
    RESEND_WEBHOOK_SECRET: `whsec_${Buffer.from('isolated-test-webhook-secret').toString('base64')}`,
  };
  const sent = [];
  const requests = [];
  let emailStatus = options.emailStatus ?? 200;
  const providerFetch = async (url, init = {}) => {
    requests.push(String(url));
    if (String(url).endsWith('/auth/v1/user')) return Response.json(options.user ?? visitor);
    if (String(url) === 'https://api.resend.com/emails') {
      sent.push({ ...JSON.parse(init.body), headers: init.headers });
      if (options.networkFailure) throw new TypeError('Simulated provider timeout');
      return Response.json(options.emptyReceipt ? {} : { id: 'email_test_accepted' }, { status: emailStatus });
    }
    throw new Error('Unexpected external request in test');
  };
  class NextResponse extends Response {
    static json(body, init) { return Response.json(body, init); }
    static redirect(url) { return Response.redirect(url, 307); }
  }
  const cache = new Map();
  const load = file => {
    file = resolve(root, file);
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} }; cache.set(file, module);
    const compiled = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    const localRequire = id => {
      if (id === '@/lib/runtime-env') return { env };
      if (id === 'next/server') return { NextResponse };
      if (id.endsWith('inquiry-schema')) return { inquirySchema };
      if (id === '@/lib/security' || id === './security') return security;
      if (id === '@/lib/content' || id === './content') return { EMAIL, SITE_URL };
      if (id.startsWith('@/')) return load(id.slice(2) + '.ts');
      if (id.startsWith('.')) return load(resolve(dirname(file), id + '.ts'));
      return require(id);
    };
    const run = vm.runInNewContext(`(function(require,module,exports){${compiled}\n})`, { Request, Response, Headers, URL, TextEncoder, TextDecoder, Uint8Array, crypto, atob, btoa, AbortSignal, fetch: providerFetch });
    run(localRequire, module, module.exports);
    return module.exports;
  };
  const request = (data = valid, overrides = {}) => new Request('https://studio.example/api/inquiry', {
    method: 'POST', headers: { origin: 'https://studio.example', 'content-type': 'application/json',
      cookie: `__Host-td_csrf=${csrf}`, 'x-csrf-token': csrf, 'cf-connecting-ip': '192.0.2.1', ...overrides.headers },
    body: typeof data === 'string' ? data : JSON.stringify(data),
  });
  return { env, sqlite, sent, requests, load, request, setStatus(status) { emailStatus = status; } };
}

test('unconfigured email returns 503 without contacting a provider', async () => {
  const f = fixture({ unconfigured: true });
  const res = await f.load('app/api/inquiry/route.ts').POST(f.request());
  assert.equal(res.status, 503); assert.equal(f.requests.length, 0); assert.equal((await res.json()).accepted, undefined);
});

test('cross-origin, missing-cookie and invalid-CSRF submissions never send an email', async () => {
  const f = fixture(); const { POST } = f.load('app/api/inquiry/route.ts');
  assert.equal((await POST(f.request(valid, { headers: { origin: 'https://attacker.example' } }))).status, 403);
  assert.equal((await POST(f.request(valid, { headers: { cookie: '' } }))).status, 403);
  assert.equal((await POST(f.request(valid, { headers: { 'x-csrf-token': 'b'.repeat(43) } }))).status, 403);
  assert.equal(f.sent.length, 0);
});

test('anonymous form setup issues a secure CSRF cookie and needs no login provider', async () => {
  const f = fixture();
  const res = await f.load('app/api/inquiry/route.ts').GET(new Request('https://studio.example/api/inquiry'));
  const body = await res.json();
  assert.equal(res.status, 200); assert.equal(body.emailReady, true);
  assert.match(body.csrf, /^[A-Za-z0-9_-]{43}$/);
  assert.match(res.headers.get('set-cookie'), /__Host-td_csrf=.*HttpOnly; SameSite=Lax; Max-Age=2592000; Secure/);
  assert.equal(f.requests.length, 0);
});

test('rejects invalid email, malformed JSON, honeypot and invalid phone', async () => {
  const f = fixture(); const { POST } = f.load('app/api/inquiry/route.ts');
  for (const data of [{ ...valid, email: 'invalid' }, '{bad', { ...valid, website: 'spam' }, { ...valid, phone: '123' }]) {
    assert.equal((await POST(f.request(data))).status, 400);
  }
  assert.equal((await POST(f.request('x'.repeat(33000)))).status, 400);
  assert.equal(f.sent.length, 0);
});

test('anonymous inquiry sends under the client name to the fixed inbox with client Reply-To', async () => {
  const f = fixture();
  const res = await f.load('app/api/inquiry/route.ts').POST(f.request());
  assert.equal(res.status, 200); assert.equal((await res.json()).accepted, true);
  assert.equal(f.sent.length, 1); assert.deepEqual(f.sent[0].to, [EMAIL]);
  assert.equal(f.sent[0].reply_to, visitor.email); assert.match(f.sent[0].text, /Client Name: Test Visitor/);
  assert.equal(f.sent[0].from, '"Test Visitor via TIEROP DIGITAL" <studio@example.test>');
  assert.match(f.sent[0].subject, /Test Visitor/);
  assert.equal(f.requests.some(url => url.includes('/auth/')), false);
  assert.match(res.headers.get('cache-control'), /no-store/);
  const row = f.sqlite.prepare('SELECT * FROM inquiry_requests').get();
  assert.equal(row.status, 'accepted'); assert.equal(row.email_id, 'email_test_accepted');
  assert.equal(JSON.stringify(row).includes(visitor.email), false); assert.equal(JSON.stringify(row).includes(valid.message), false);
});

test('same accepted request is idempotent; changed contents cannot reuse its ID', async () => {
  const f = fixture(); const { POST } = f.load('app/api/inquiry/route.ts');
  assert.equal((await POST(f.request())).status, 200);
  assert.equal((await POST(f.request())).status, 200);
  assert.equal((await POST(f.request({ ...valid, message: 'Changed project details about our website.' }))).status, 409);
  assert.equal(f.sent.length, 1);
});

test('provider errors do not show success and retry uses the same idempotency key', async () => {
  const f = fixture({ emailStatus: 429 }); const { POST } = f.load('app/api/inquiry/route.ts');
  const failure = await POST(f.request());
  assert.equal(failure.status, 502); assert.equal(failure.headers.get('retry-after'), '30');
  assert.equal((await failure.json()).accepted, undefined);
  assert.equal((await POST(f.request())).status, 409);
  assert.equal(f.sent.length, 1);
  f.sqlite.prepare('UPDATE inquiry_requests SET last_attempt = last_attempt - 31').run(); f.setStatus(200);
  assert.equal((await POST(f.request())).status, 200);
  assert.equal(f.sent.length, 2);
  assert.equal(f.sent[0].headers['Idempotency-Key'], f.sent[1].headers['Idempotency-Key']);
  assert.deepEqual(f.sent[0], f.sent[1], 'Retry must keep the exact provider payload, including its submission timestamp');
});

test('timeout and missing provider receipt never claim acceptance', async () => {
  for (const options of [{ networkFailure: true }, { emptyReceipt: true }]) {
    const f = fixture(options); const res = await f.load('app/api/inquiry/route.ts').POST(f.request());
    assert.ok(res.status >= 500); assert.equal((await res.json()).accepted, undefined);
    assert.notEqual(f.sqlite.prepare('SELECT status FROM inquiry_requests').get().status, 'accepted');
  }
});

test('limits one sender to five attempts per hour even with fresh form cookies', async () => {
  const f = fixture(); const { POST } = f.load('app/api/inquiry/route.ts');
  for (let i = 0; i < 6; i++) {
    const token = String(i).repeat(43);
    const res = await POST(f.request({ ...valid, requestId: `123e4567-e89b-42d3-a456-42661417400${i}` }, { headers: { cookie: `__Host-td_csrf=${token}`, 'x-csrf-token': token } }));
    assert.equal(res.status, i < 5 ? 200 : 429);
  }
  assert.equal(f.sent.length, 5);
});

test('the site-wide limit also bounds attempts with different sender addresses', async () => {
  const f = fixture(); const { POST } = f.load('app/api/inquiry/route.ts');
  for (let i = 0; i < 51; i++) {
    const requestId = `123e4567-e89b-42d3-a456-${String(i).padStart(12, '0')}`;
    const res = await POST(f.request({ ...valid, email: `visitor${i}@example.com`, requestId }));
    assert.equal(res.status, i < 50 ? 200 : 429);
  }
  assert.equal(f.sent.length, 50);
});

test('HTTPS proxy form setup uses the secure cookie prefix', async () => {
  const f = fixture();
  const response = await f.load('app/api/inquiry/route.ts').GET(new Request('http://localhost:3000/api/inquiry', {
    headers: { host: 'studio.example', 'x-forwarded-proto': 'https' },
  }));
  assert.match(response.headers.get('set-cookie'), /__Host-td_csrf=.*; Secure/);
});

async function signedWebhook(f, body, timestamp = String(Math.floor(Date.now() / 1000))) {
  const id = 'webhook_test_event';
  const bytes = Buffer.from(f.env.RESEND_WEBHOOK_SECRET.slice(6), 'base64');
  const key = await crypto.subtle.importKey('raw', bytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = Buffer.from(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${id}.${timestamp}.${body}`))).toString('base64');
  return new Request('https://studio.example/api/email-webhook', { method: 'POST', headers: { 'svix-id': id, 'svix-timestamp': timestamp, 'svix-signature': `v1,${signature}` }, body });
}

test('signed delivery webhook stores metadata once, including replay protection', async () => {
  const f = fixture(); const { POST } = f.load('app/api/email-webhook/route.ts');
  const body = JSON.stringify({ type: 'email.delivered', data: { email_id: 'email_test_accepted' } });
  assert.equal((await POST(await signedWebhook(f, body))).status, 200);
  assert.equal((await POST(await signedWebhook(f, body))).status, 200);
  assert.equal(f.sqlite.prepare('SELECT count(*) AS n FROM email_delivery_events').get().n, 1);
  assert.equal(f.sqlite.prepare('SELECT event_type FROM email_delivery_events').get().event_type, 'email.delivered');
});

test('webhook rejects stale, unsigned and tampered events', async () => {
  const f = fixture(); const { POST } = f.load('app/api/email-webhook/route.ts');
  const body = JSON.stringify({ type: 'email.delivered', data: { email_id: 'email_test_accepted' } });
  assert.equal((await POST(new Request('https://studio.example/api/email-webhook', { method: 'POST', body }))).status, 401);
  assert.equal((await POST(await signedWebhook(f, body, String(Math.floor(Date.now() / 1000) - 400)))).status, 401);
  const signed = await signedWebhook(f, body);
  assert.equal((await POST(new Request(signed.url, { method: 'POST', headers: signed.headers, body: body + ' ' }))).status, 401);
  assert.equal(f.sqlite.prepare('SELECT count(*) AS n FROM email_delivery_events').get().n, 0);
});

test('email delivery webhook remains unavailable until configured', async () => {
  const f = fixture({ unconfigured: true });
  assert.equal((await f.load('app/api/email-webhook/route.ts').POST(new Request('https://studio.example/api/email-webhook', { method: 'POST' }))).status, 503);
});
