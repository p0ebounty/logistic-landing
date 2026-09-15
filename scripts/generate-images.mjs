// Generates the landing imagery with kie.ai (model: gpt-image-2-5-flare-text-to-image).
// Usage: node scripts/generate-images.mjs            -> every image that is not generated yet
//        node scripts/generate-images.mjs hero-interchange challenge-crm   -> regenerate these
// Needs KIE_API_KEY in .env.local. Raw results land in assets/generated/.
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { IMAGES as PHOTOS } from './image-prompts.mjs';
import { PRODUCT_IMAGES } from './product-prompts.mjs';

const IMAGES = [...PHOTOS, ...PRODUCT_IMAGES];

process.loadEnvFile('.env.local');
const KEY = process.env.KIE_API_KEY;
if (!KEY) throw new Error('KIE_API_KEY is missing in .env.local');

const API = 'https://api.kie.ai/api/v1/jobs';
const MODEL = 'gpt-image-2-5-flare-text-to-image';
const OUT_DIR = path.resolve('assets/generated');
const headers = { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

mkdirSync(OUT_DIR, { recursive: true });

const isGenerated = (name) => readdirSync(OUT_DIR).some((file) => file.startsWith(`${name}.`) && !file.endsWith('.json'));

async function createTask(image) {
  const res = await fetch(`${API}/createTask`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: MODEL,
      input: { prompt: image.prompt, aspect_ratio: image.aspectRatio, resolution: image.resolution, background: 'opaque' },
    }),
  });
  const { code, msg, data } = await res.json();
  if (code !== 200) throw new Error(`${image.name}: createTask failed (${code}) ${msg}`);
  return data.taskId;
}

async function waitForResult(name, taskId) {
  for (let attempt = 0; attempt < 150; attempt++) {
    await sleep(attempt < 6 ? 5_000 : 8_000);
    const res = await fetch(`${API}/recordInfo?taskId=${encodeURIComponent(taskId)}`, { headers });
    const { code, msg, data } = await res.json();
    if (code !== 200) throw new Error(`${name}: recordInfo failed (${code}) ${msg}`);
    if (data.state === 'success') return { url: JSON.parse(data.resultJson).resultUrls[0], costTime: data.costTime };
    if (data.state === 'fail') throw new Error(`${name}: generation failed (${data.failCode}) ${data.failMsg}`);
  }
  throw new Error(`${name}: timed out waiting for task ${taskId}`);
}

async function generate(image) {
  const taskId = await createTask(image);
  console.log(`${image.name}: task ${taskId} created`);
  const { url, costTime } = await waitForResult(image.name, taskId);
  const res = await fetch(url);
  const ext = (res.headers.get('content-type') || '').split('/')[1]?.replace('jpeg', 'jpg') || path.extname(new URL(url).pathname).slice(1) || 'png';
  const bytes = Buffer.from(await res.arrayBuffer());
  writeFileSync(path.join(OUT_DIR, `${image.name}.${ext}`), bytes);
  writeFileSync(path.join(OUT_DIR, `${image.name}.json`), JSON.stringify({ taskId, model: MODEL, ...image, sourceUrl: url, costTime }, null, 2));
  console.log(`${image.name}: saved ${ext}, ${(bytes.length / 1e6).toFixed(1)} MB, ${Math.round((costTime ?? 0) / 1000)} s`);
}

const requested = process.argv.slice(2);
const unknown = requested.filter((name) => !IMAGES.some((image) => image.name === name));
if (unknown.length) throw new Error(`Unknown image names: ${unknown.join(', ')}`);

const queue = IMAGES.filter((image) => (requested.length ? requested.includes(image.name) : !isGenerated(image.name)));
if (!queue.length) console.log('Nothing to generate.');

const results = await Promise.allSettled(queue.map(generate));
for (const result of results) if (result.status === 'rejected') console.error(result.reason.message);
process.exitCode = results.some((result) => result.status === 'rejected') ? 1 : 0;
