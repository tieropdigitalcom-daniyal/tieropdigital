import test from 'node:test';
import assert from 'node:assert/strict';
import { projectEmail } from '../lib/inquiry-email.ts';
import { EMAIL, WHATSAPP_URL } from '../lib/content.ts';

const inquiry = { name: 'Test Visitor', country: 'PK', phone: '+923127204408', email: 'visitor@example.com', message: 'A new website with design & animation.\nPlease include a contact page.' };

test('email and Gmail drafts keep all validated details and service in matching fields', () => {
  const links = projectEmail(inquiry, EMAIL, 'Design & video');
  const mail = new URL(links.mailto);
  const gmail = new URL(links.gmail);
  assert.equal(mail.pathname, 'info@tieropdigital.com');
  assert.equal(gmail.searchParams.get('to'), mail.pathname);
  assert.equal(gmail.searchParams.get('su'), mail.searchParams.get('subject'));
  assert.equal(gmail.searchParams.get('body'), mail.searchParams.get('body'));
  const body = mail.searchParams.get('body');
  for (const detail of [inquiry.name, inquiry.email, inquiry.phone, inquiry.message, 'Pakistan', 'Service: Design & video']) assert.ok(body.includes(detail));
});

test('visitor text cannot create extra mail headers or URL parameters', () => {
  const links = projectEmail({ ...inquiry, message: 'Discuss #ideas &bcc=other@example.com? 🙂\nSecond line.' }, EMAIL);
  const mail = new URL(links.mailto);
  assert.deepEqual([...mail.searchParams.keys()], ['subject', 'body']);
  assert.equal(mail.hash, '');
  assert.ok(mail.searchParams.get('body').includes('#ideas &bcc=other@example.com? 🙂\nSecond line.'));
  assert.ok(!mail.searchParams.get('body').includes('Service:'));
});

test('WhatsApp uses the supplied Pakistan number in international wa.me format', () => {
  const whatsapp = new URL(WHATSAPP_URL);
  assert.equal(whatsapp.hostname, 'wa.me');
  assert.equal(whatsapp.pathname, '/923127204408');
});
