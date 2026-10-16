// DigiTera static-site QA: works offline with Node 22 and does not mutate content.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const content = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const pages = {
  'index.html': content('index.html'),
  'case-studies.html': content('case-studies.html')
};
const ids = html => [...html.matchAll(/\bid=(["'])(.*?)\1/g)].map(match => match[2]);
const attrs = html => [...html.matchAll(/\b(href|src|poster)=(["'])(.*?)\2/g)]
  .map(match => ({ name: match[1], value: match[3] }));

for (const [name, html] of Object.entries(pages)) {
  const localIds = ids(html);
  assert.equal(localIds.length, new Set(localIds).size, `Duplicate HTML id on ${name}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Expected one h1 on ${name}`);
  assert.ok(/<meta\s+name="description"/i.test(html), `Missing meta description in ${name}`);
  assert.ok(/<title>.{20,}<\/title>/i.test(html), `Missing meaningful title in ${name}`);

  for (const { name: attribute, value } of attrs(html)) {
    if (/^(?:https?:|mailto:|tel:|data:)/i.test(value)) continue;
    const [pathAndQuery, fragment] = value.split('#');
    const file = pathAndQuery.split('?')[0];
    if (file) {
      assert.ok(fs.existsSync(new URL('../' + file, import.meta.url)),
        `Missing local ${attribute} target in ${name}: ${file}`);
    }
    if (fragment) {
      const targetHtml = file ? pages[file] : html;
      if (targetHtml) assert.ok(ids(targetHtml).includes(decodeURIComponent(fragment)),
        `Broken local anchor in ${name}: ${value}`);
    }
  }
}

const homepage = pages['index.html'], studies = pages['case-studies.html'];
assert.notEqual(homepage.match(/<title>(.*?)<\/title>/)?.[1],
  studies.match(/<title>(.*?)<\/title>/)?.[1], 'Duplicate SEO page titles');
const schemaTag = homepage.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(schemaTag, 'Missing structured service data');
const schema = JSON.parse(schemaTag[1]);
assert.equal(schema.name, 'DigiTera');
assert.equal(schema.email, 'digitera.info@gmail.com');
assert.ok(homepage.includes('id="questions"'), 'Client FAQs missing');
assert.ok(homepage.includes('id="how-we-work"'), 'How-we-work section missing');
assert.ok(studies.includes('NOT A WEBSITE SCREENSHOT'), 'Qasr illustration disclosure missing');
assert.ok(studies.includes('STRATEGY FRAMEWORK / NOT VERIFIED METRICS'), 'Apex research disclosure missing');

const projectData = content('projects.js'), handler = content('app.js');
for (const project of ['qasrdecor', 'apex-limo', 'ugc-coloring']) {
  assert.ok(projectData.includes(`"id":"${project}"`), `Missing project id ${project}`);
  assert.ok(handler.includes(`'${project}':`), `Missing opt-in brief for ${project}`);
}
for (const filename of ['styles.css','refresh.css','studio.css','portfolio.css',
  'brand-refresh.css','client-upgrade.css','case-studies.css']) {
  const style = content(filename);
  assert.equal((style.match(/{/g) || []).length, (style.match(/}/g) || []).length,
    `Unbalanced CSS: ${filename}`);
}
assert.ok(!homepage.includes('1,000+ learners'), 'Unsupported numerical hero claim found');

const servicesSection = homepage.match(/<section class="section wrap services-section" id="services">([\s\S]*?)<\/section>/)?.[1] || '';
assert.equal((servicesSection.match(/<details\b/g) || []).length, 8, 'Expected eight services: Digital resources belongs in navigation');
assert.ok(servicesSection.includes('<h3>Visuals &amp; Animation</h3>'), 'Visuals & Animation service missing');
assert.ok(servicesSection.includes('<h3>AI Automation</h3>'), 'AI Automation service missing');
assert.ok(!servicesSection.includes('<h3>Digital resources &amp; tools</h3>'), 'Resources should not be a service card');
assert.ok(homepage.includes('<section class="section wrap digitera-resources-section" id="digital-resources"'), 'Standalone resources section missing');
assert.ok(homepage.includes('<h2 id="digital-resources-title">Digital resources'), 'Resources heading missing');
const desktopNav = homepage.match(/<nav class="desktop-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1] || '';
const mobileNav = homepage.match(/<nav id="mobile-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1] || '';
for (const nav of [desktopNav, mobileNav]) {
  assert.ok(nav.includes('<a href="#digital-resources">Digital resources &amp; tools</a>'), 'Resources missing from navigation');
}
assert.ok(!servicesSection.includes('class="service-subcategory"'), 'Old nested Digital Resources block must be removed');
for (const option of ['Visuals & Animation', 'AI Automation']) {
  assert.ok(homepage.includes(`<option>${option}</option>`), `Contact option missing: ${option}`);
}
assert.ok(homepage.includes('<option>Digital resources &amp; tools</option>'), 'Digital resources & tools contact option missing');
assert.ok(homepage.includes('CEO of DigiTera'), 'CEO identity missing');
assert.ok(homepage.includes('initiative for futuristic learning'), 'DigiTera learning initiative missing');
assert.equal(content('CNAME').trim(), 'digitera.art', 'Custom domain must remain unchanged');
const newCss = content('services-enhancements.css');
assert.equal((newCss.match(/{/g) || []).length, (newCss.match(/}/g) || []).length, 'Unbalanced services CSS');
assert.ok(newCss.includes('prefers-reduced-motion'), 'Services animation must respect reduced motion');

console.log('PASS: SEO, schema, internal anchors, static resources, IDs, evidence and brief routing.');
