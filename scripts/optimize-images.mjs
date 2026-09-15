// Turns generated imagery, product screenshots and brand files into web-ready assets.
// Usage: node scripts/optimize-images.mjs
// Images in src/assets are imported statically, so Next.js knows their size and builds blur placeholders.
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const IMG = 'src/assets/images';

const JOBS = [
  { src: 'assets/generated/hero-interchange', out: `${IMG}/hero-interchange.webp`, width: 3200, quality: 78 },
  { src: 'assets/generated/hero-interchange-portrait', out: `${IMG}/hero-interchange-portrait.webp`, width: 1400, quality: 78 },
  { src: 'assets/generated/challenge-leads', out: `${IMG}/challenge-leads.webp`, width: 1800, quality: 80 },
  { src: 'assets/generated/challenge-calls', out: `${IMG}/challenge-calls.webp`, width: 1800, quality: 80 },
  { src: 'assets/generated/challenge-tenders', out: `${IMG}/challenge-tenders.webp`, width: 1800, quality: 80 },
  { src: 'assets/generated/challenge-crm', out: `${IMG}/challenge-crm.webp`, width: 1800, quality: 80 },
  { src: 'assets/generated/pilot-highway', out: `${IMG}/pilot-highway.webp`, width: 2800, quality: 78 },
  // Product screens: fictional English data in the structure of the current platform.
  ...['dashboard', 'contacts', 'call', 'contact-card', 'tasks', 'progress', 'leadgen'].map((screen) => ({
    src: `assets/generated/product-${screen}`,
    out: `${IMG}/product-${screen}.webp`,
    width: 2560,
    quality: 90,
  })),
  // Brand: MQ mark for the header, app icons, social preview background.
  { src: 'assets/brand/magnaqore-logo', out: 'src/assets/brand/mq-mark.png', width: 192, format: 'png' },
  { src: 'assets/brand/icon', out: 'src/app/icon.png', width: 512, format: 'png' },
  { src: 'assets/brand/icon', out: 'src/app/apple-icon.png', width: 180, format: 'png' },
  { src: 'assets/generated/hero-interchange', out: 'assets/og/og-background.jpg', width: 1200, height: 630, position: 'right', format: 'jpeg', quality: 84 },
];

// Sources are referenced without extension: generated files may come back as png, jpg or webp.
function resolveSource(base) {
  const dir = path.dirname(base);
  if (!existsSync(dir)) return null;
  const file = readdirSync(dir).find((name) => name.startsWith(`${path.basename(base)}.`) && !name.endsWith('.json'));
  return file ? path.join(dir, file) : null;
}

for (const job of JOBS) {
  const src = resolveSource(job.src);
  if (!src) {
    console.warn(`skip ${job.out}: no source for ${job.src}`);
    continue;
  }
  mkdirSync(path.dirname(job.out), { recursive: true });
  let pipeline = sharp(src).resize({
    width: job.width,
    height: job.height,
    fit: job.height ? 'cover' : 'inside',
    position: job.position ?? 'centre',
    withoutEnlargement: true,
  });
  if (job.format === 'png') pipeline = pipeline.png({ compressionLevel: 9 });
  else if (job.format === 'jpeg') pipeline = pipeline.jpeg({ quality: job.quality, mozjpeg: true });
  else pipeline = pipeline.webp({ quality: job.quality, effort: 6 });
  const info = await pipeline.toFile(job.out);
  console.log(`${job.out}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`);
}
