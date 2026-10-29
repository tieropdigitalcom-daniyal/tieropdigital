import test from 'node:test';
import assert from 'node:assert/strict';
import { inquirySchema } from '../lib/inquiry-schema.ts';
import { sameOrigin, equalTokens, readLimitedBody, sha256 } from '../lib/security.ts';
const valid = { name: 'Test Visitor', country: 'US', phone: '+12025550123', email: 'visitor@example.com', message: 'A new website for our small business.', website: '', requestId: '123e4567-e89b-42d3-a456-426614174000' };
test('accepts an international inquiry and rejects untrusted extra fields', () => { assert.equal(inquirySchema.safeParse(valid).success, true); assert.equal(inquirySchema.safeParse({ ...valid, authenticated: true }).success, false); });
test('rejects subject injection, invalid phone, unsupported country, honeypot and oversized input', () => { for (const changed of [{ name: 'Name\r\nBcc: other@example.com' }, { phone: '+10000000000' }, { phone: '1234' }, { country: 'XX' }, { website: 'spam' }, { message: 'x'.repeat(5001) }, { email: 'invalid' }, { requestId: '../another-request' }]) assert.equal(inquirySchema.safeParse({ ...valid, ...changed }).success, false, JSON.stringify(changed)); });
test('only accepts matching origins for browser mutations', () => { assert.equal(sameOrigin(new Request('https://studio.example/api/inquiry', { headers: { origin: 'https://studio.example' } })), true); for (const headers of [{}, { origin: 'https://attacker.example' }, { origin: 'https://studio.example', 'sec-fetch-site': 'cross-site' }]) assert.equal(sameOrigin(new Request('https://studio.example/api/inquiry', { headers })), false); });
test('csrf comparisons reject missing, shortened and mismatched values', () => { assert.equal(equalTokens('a'.repeat(43), 'a'.repeat(43)), true); for (const candidate of ['', 'a'.repeat(42), 'b'.repeat(43)]) assert.equal(equalTokens('a'.repeat(43), candidate), false); });
test('request bodies are bounded before parsing', async () => { assert.equal(await readLimitedBody(new Request('https://studio.example', { method: 'POST', body: 'hello' }), 8), 'hello'); await assert.rejects(readLimitedBody(new Request('https://studio.example', { method: 'POST', body: 'x'.repeat(33) }), 32), /payload_too_large/); });
test('SHA-256 produces the expected stable hash', async () => { assert.equal(await sha256('dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'), 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM'); });

import { createRequestId } from '../lib/request-id.ts';
test('creates secure UUID v4 request IDs without depending on randomUUID support', () => { const a = createRequestId(); const b = createRequestId(); assert.match(a, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/); assert.notEqual(a, b); });
