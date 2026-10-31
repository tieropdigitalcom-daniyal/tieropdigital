import test from 'node:test';
import assert from 'node:assert/strict';
import { servicePages, aiAccessPackages } from '../lib/service-pages.ts';
import { homepageServiceRoutes } from '../lib/service-routes.ts';
import { articles } from '../lib/articles.ts';
import { team } from '../lib/team.ts';
import { serviceNames } from '../lib/service-names.ts';

test('service navigation, related pages and article CTAs resolve to published service slugs', () => {
  const slugs = new Set(servicePages.map(service => service.slug));
  assert.equal(slugs.size, servicePages.length, 'duplicate service route');
  for (const slug of Object.values(homepageServiceRoutes)) assert.ok(slugs.has(slug), slug);
  for (const article of articles) assert.ok(slugs.has(article.service), article.slug);
  for (const service of servicePages) for (const slug of service.related) assert.ok(slugs.has(slug) && slug !== service.slug, slug);
});
test('article routes and local table-of-contents targets are unique and URL-safe', () => {
  assert.equal(new Set(articles.map(article => article.slug)).size, articles.length);
  for (const article of articles) {
    assert.match(article.slug, /^[a-z0-9-]+$/);
    assert.equal(new Set(article.sections.map(section => section.id)).size, article.sections.length);
    for (const section of article.sections) assert.match(section.id, /^[a-z0-9-]+$/);
  }
});
test('access packages retain the corrected rupee prices and distinct billing durations', () => {
  assert.deepEqual(aiAccessPackages.map(({name,price,months,duration})=>({name,price,months,duration})), [
    {name:'ChatGPT',price:1000,months:1,duration:'1 month'},
    {name:'Gemini',price:900,months:18,duration:'18 months'},
  ]);
});
test('all service page contact links can be recognized by the inquiry form', () => {
  assert.deepEqual([...serviceNames].sort(), servicePages.map(service=>service.title).sort());
});
test('team mail links belong to the correct leaders', () => {
  assert.deepEqual(team.map(({name,email})=>[name,email]), [['M Qasim Hassan','qasim@tieropdigital.com'],['Daniyal','daniyal@tieropdigital.com'],['Mudassir','mudassir@tieropdigital.com']]);
});
