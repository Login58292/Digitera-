// Repeatable source checks for this static portfolio. Run: node scripts/check-portfolio.mjs
// No npm dependencies and no production writes.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const load = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const home = load('index.html');
const cases = load('case-studies.html');
const js = load('projects.js');
const style = load('client-upgrade.css');
const caseStyle = load('case-studies.css');
const ids = html => new Set([...html.matchAll(/\bid=(["'])(.*?)\1/g)].map(x=>x[2]));
function uniqueIds(html,name) {
 const all = [...html.matchAll(/\bid=(["'])(.*?)\1/g)].map(x=>x[2]);
 assert.equal(new Set(all).size,all.length,`Duplicate HTML id on ${name}`);
}
function localTargets(html,name) {
 const targets = [...html.matchAll(/\bhref=(["'])(.*?)\1/g)].map(x=>x[2]);
 for (const href of targets) {
  const match = href.match(/^(?:(index\.html|case-studies\.html))?#([^?]+)/);
  if (!match) continue;
  const page=match[1]==='index.html'?home:match[1]==='case-studies.html'?cases:html;
  assert.ok(ids(page).has(decodeURIComponent(match[2])),`Broken hash ${href} on ${name}`);
 }
}
uniqueIds(home,'homepage'); uniqueIds(cases,'case studies');
localTargets(home,'homepage'); localTargets(cases,'case studies');
for (const id of ['qasr','apex','ugc','campaigns','approach','evidence-title'])
 assert.ok(ids(cases).has(id),`Missing case study id: ${id}`);
for (const id of ['case-studies','how-we-work','contact'])
 assert.ok(ids(home).has(id),`Missing homepage id: ${id}`);
for (const slug of ['qasrdecor','apex-limo','ugc-coloring'])
 assert.ok(js.includes(`"id":"${slug}"`),`Unknown project modal id: ${slug}`);
for (const media of ['smartfix.webp','smart-ac.webp','clean-air.webp','clean-dryer.webp','digitera-logo.webp'])
 assert.ok(fs.existsSync(new URL('../assets/'+media,import.meta.url)),`Missing image: ${media}`);
assert.ok(!home.includes('Nearly <strong>6 years</strong>'),'Unverified hero metric still present');
assert.ok(!home.includes('1,000+ learners'),'Unverified learners metric still present');
assert.ok(cases.includes('NOT A WEBSITE SCREENSHOT'),'Illustrative status missing');
assert.ok(cases.includes('not confirmed defects') || cases.includes('not confirmed'),'Research-stage label missing');
assert.ok(cases.includes('No fabricated') || cases.includes('not shown because'),'Outcome boundary missing');
for(const [name,css] of [['homepage',style],['case study',caseStyle]]){
 const opens=(css.match(/{/g)||[]).length,closes=(css.match(/}/g)||[]).length;
 assert.equal(opens,closes,`Unbalanced CSS in ${name}`);
}
for(const css of ['styles.css','refresh.css','studio.css','portfolio.css','brand-refresh.css','client-upgrade.css','case-studies.css'])
 assert.ok(fs.existsSync(new URL('../'+css,import.meta.url)),`Missing CSS: ${css}`);
console.log('Portfolio source-level checks passed: IDs, anchors, project links, media, content boundaries and styles.');
