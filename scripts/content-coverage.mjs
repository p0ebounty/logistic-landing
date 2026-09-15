// Measures how much of the old landing's text survives on the new page.
// Usage: node scripts/content-coverage.mjs [url]   (default http://localhost:3000)
// Score = share of the old page's word pairs (bigrams) that also appear in the new page's server-rendered HTML.
import { readFileSync } from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:3000';
const THRESHOLD = 0.6;

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', times: '×', rarr: '→' };

function decode(html) {
  return html
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
}

function tokens(text) {
  return text
    .toLowerCase()
    .replace(/[‘’`]/g, "'")
    .replace(/[“”«»]/g, '"')
    .replace(/(\d)[ ,](?=\d{3}\b)/g, '$1') // $18 000 / $18,000 -> $18000
    .replace(/×/g, 'x') // 5X / 5× and "6 months X $3500" / "6 months × $3,500"
    .replace(/[–—]/g, ' - ')
    .split(/[^a-z0-9$%.+']+/)
    .map((token) => token.replace(/^[.'+]+|[.'+]+$/g, ''))
    .filter(Boolean);
}

const bigrams = (list) => (list.length === 1 ? [list[0]] : list.slice(1).map((token, i) => `${list[i]} ${token}`));

const oldLines = readFileSync('docs/old-site-content.txt', 'utf8')
  .split(/\r?\n/)
  .filter((line) => line.trim() && !line.startsWith('#'));

const html = await (await fetch(url)).text();
const body = decode(
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' '),
);
const newTokens = tokens(body);
const newSet = new Set([...bigrams(newTokens), ...newTokens]);

let total = 0;
let covered = 0;
const weak = [];
for (const line of oldLines) {
  const grams = bigrams(tokens(line));
  if (!grams.length) continue;
  const hits = grams.filter((gram) => newSet.has(gram)).length;
  total += grams.length;
  covered += hits;
  if (hits / grams.length < THRESHOLD) weak.push(`${Math.round((hits / grams.length) * 100)}%  ${line.trim()}`);
}

console.log(`Content coverage: ${((covered / total) * 100).toFixed(1)}% (${covered}/${total} word pairs)`);
if (weak.length) {
  console.log(`\nLines below ${THRESHOLD * 100}% (${weak.length}):`);
  for (const line of weak) console.log(`  ${line}`);
}
