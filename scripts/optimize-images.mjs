import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootArg = process.argv[2] ?? 'static/img';
const rootDir = path.resolve(process.cwd(), rootArg);
const maxWidth = Number(process.env.IMAGE_MAX_WIDTH ?? 1600);
const quality = Number(process.env.IMAGE_WEBP_QUALITY ?? 78);
const deleteOriginal = process.argv.includes('--delete-original');
const supported = new Set(['.png', '.jpg', '.jpeg']);

async function* walk(dir) {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry.isFile() && supported.has(path.extname(entry.name).toLowerCase())) {
      yield fullPath;
    }
  }
}

let converted = 0;
let originalBytes = 0;
let optimizedBytes = 0;

for await (const file of walk(rootDir)) {
  const ext = path.extname(file);
  const output = file.slice(0, -ext.length) + '.webp';
  const inputStat = await fs.stat(file);
  const image = sharp(file);
  const metadata = await image.metadata();
  const shouldResize = metadata.width && metadata.width > maxWidth;

  await image
    .resize(shouldResize ? {width: maxWidth, withoutEnlargement: true} : undefined)
    .webp({quality})
    .toFile(output);

  const outputStat = await fs.stat(output);
  converted += 1;
  originalBytes += inputStat.size;
  optimizedBytes += outputStat.size;

  if (deleteOriginal) {
    await fs.unlink(file);
  }

  console.log(`${path.relative(process.cwd(), file)} -> ${path.relative(process.cwd(), output)}`);
}

const saved = originalBytes - optimizedBytes;
const pct = originalBytes > 0 ? Math.round((saved / originalBytes) * 100) : 0;

console.log('');
console.log(`Converted ${converted} image(s).`);
console.log(`Original: ${(originalBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`Optimized: ${(optimizedBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`Saved: ${(saved / 1024 / 1024).toFixed(2)} MB (${pct}%)`);
