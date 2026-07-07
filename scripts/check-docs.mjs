import fs from 'node:fs';
import path from 'node:path';

const TEXT_EXTENSIONS = new Set(['.css', '.js', '.json', '.md', '.mdx', '.mjs', '.ts', '.tsx']);
const MARKDOWN_EXTENSIONS = new Set(['.md', '.mdx']);
const SKIP_DIRS = new Set(['.docusaurus', 'build', 'node_modules']);
const SKIP_MARKDOWN_IMAGE_FILES = new Set(['README.md']);
const LOCALE_DOC_DIRS = [
  ['vi', 'i18n/vi/docusaurus-plugin-content-docs/current'],
  ['zh-Hans', 'i18n/zh-Hans/docusaurus-plugin-content-docs/current'],
];
const RUNTIME_SOURCE_PATHS = ['docusaurus.config.ts', 'sidebars.ts', 'src', 'static'];
const BLOCKED_RUNTIME_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'ajax.googleapis.com',
  'googletagmanager.com',
  'google-analytics.com',
  'cdn.jsdelivr.net',
  'unpkg.com',
  'cdnjs.cloudflare.com',
];
const MOJIBAKE_SEQUENCES = [
  '\u00c3',
  '\u00c2',
  '\u00c4',
  '\u00c6',
  '\u00d0',
  '\u00f0',
  '\u00e1\u00ba',
  '\u00e1\u00bb',
  '\uFFFD',
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        walk(path.join(dir, entry.name), files);
      }
      continue;
    }

    files.push(path.join(dir, entry.name));
  }

  return files;
}

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function normalizePath(file) {
  return file.split(path.sep).join('/');
}

function hasMojibake(text) {
  return MOJIBAKE_SEQUENCES.some((sequence) => text.includes(sequence));
}

function isRuntimeSourceFile(file) {
  const normalized = normalizePath(file);
  return RUNTIME_SOURCE_PATHS.some((sourcePath) => {
    return normalized === sourcePath || normalized.startsWith(`${sourcePath}/`);
  });
}

function checkMojibake(files) {
  const badFiles = files.filter((file) => {
    return TEXT_EXTENSIONS.has(path.extname(file)) && hasMojibake(readText(file));
  });

  for (const file of badFiles) {
    console.error(`Possible encoding issue: ${normalizePath(file)}`);
  }

  return badFiles.length;
}

function checkBlockedRuntimeDependencies(files) {
  let issueCount = 0;

  for (const file of files) {
    if (!TEXT_EXTENSIONS.has(path.extname(file)) || !isRuntimeSourceFile(file)) {
      continue;
    }

    const text = readText(file);
    for (const host of BLOCKED_RUNTIME_HOSTS) {
      if (text.includes(host)) {
        console.error(`Blocked runtime host for China access: ${normalizePath(file)} -> ${host}`);
        issueCount += 1;
      }
    }
  }

  return issueCount;
}

function checkMarkdownImages(files) {
  let missingCount = 0;
  const imagePattern = /!\[[^\]]*]\((\/img\/[^)]+)\)/g;

  for (const file of files) {
    if (!MARKDOWN_EXTENSIONS.has(path.extname(file))) {
      continue;
    }

    if (SKIP_MARKDOWN_IMAGE_FILES.has(normalizePath(file))) {
      continue;
    }

    const text = readText(file);
    for (const match of text.matchAll(imagePattern)) {
      const imagePath = path.join('static', match[1]);
      if (!fs.existsSync(imagePath)) {
        console.error(`Missing image: ${normalizePath(file)} -> ${match[1]}`);
        missingCount += 1;
      }
    }
  }

  return missingCount;
}

function listMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return walk(dir)
    .filter((file) => MARKDOWN_EXTENSIONS.has(path.extname(file)))
    .map((file) => normalizePath(path.relative(dir, file)))
    .sort();
}

function checkLocaleParity() {
  const enFiles = listMarkdownFiles('docs');
  const enSet = new Set(enFiles);
  let issueCount = 0;

  for (const [locale, dir] of LOCALE_DOC_DIRS) {
    const localeFiles = listMarkdownFiles(dir);
    const localeSet = new Set(localeFiles);
    const missingLocaleFiles = enFiles.filter((file) => !localeSet.has(file));
    const extraLocaleFiles = localeFiles.filter((file) => !enSet.has(file));

    for (const file of missingLocaleFiles) {
      console.error(`Missing ${locale} doc: ${file}`);
    }

    for (const file of extraLocaleFiles) {
      console.error(`Extra ${locale} doc: ${file}`);
    }

    issueCount += missingLocaleFiles.length + extraLocaleFiles.length;
  }

  return issueCount;
}

const files = walk('.');
const errors =
  checkMojibake(files) +
  checkBlockedRuntimeDependencies(files) +
  checkMarkdownImages(files) +
  checkLocaleParity();

if (errors > 0) {
  console.error(`Docs check failed with ${errors} issue(s).`);
  process.exit(1);
}

console.log('Docs check passed.');
