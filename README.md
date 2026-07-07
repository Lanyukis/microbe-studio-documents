# Microbe Studio Docs

Documentation site for Microbe Studio users and partners, built with Docusaurus.

## Folder Guide

- `i18n/vi/docusaurus-plugin-content-docs/current/`
  Main writing folder for Vietnamese docs. Write here first. This is the source of truth.

- `docs/`
  English default docs. This is the public fallback route at `/`.

- `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`
  Simplified Chinese docs. This is currently scaffolded and should be translated from the Vietnamese source after each page is ready.

- `content-source/`
  Draft/raw source folder. Use this for Notion exports, rough notes, or temporary writing material. Docusaurus does not render this folder directly.

- `static/img/`
  Public image assets. Put optimized screenshots here and reference them from Markdown as `/img/...`.

- `src/`
  Theme and UI customization.

- `scripts/`
  Utility scripts such as docs checks and image optimization.

- `build/`
  Generated production output. Do not edit this folder manually.

## Writing Workflow

Write Vietnamese first:

```text
i18n/vi/docusaurus-plugin-content-docs/current/
```

Recommended page structure:

```md
---
title: Page title
description: Short page summary.
---

# Page title

## Mục đích

## Khi nào dùng

## Các bước thực hiện

## Kiểm tra kết quả

## Lỗi thường gặp
```

After a Vietnamese page is ready:

1. Review and polish the Vietnamese content.
2. Translate it to English in `docs/`.
3. Translate it to Simplified Chinese in `i18n/zh-Hans/...`.
4. Update translation status in `reference/i18n-workflow.md`.

## Local Preview

Install dependencies:

```bash
npm install
```

Preview English:

```bash
npm run start:en
```

Preview Vietnamese:

```bash
npm run start:vi
```

Preview Simplified Chinese:

```bash
npm run start:zh
```

Docusaurus dev server serves one locale at a time. Language switching can 404 in `npm run start:*`. To test language switching, use a production build:

```bash
npm run build
npm run serve
```

## Images

Writers can save screenshots directly under `static/img/...` while writing. This is the simplest workflow and works well with live preview.

Example:

```text
static/img/getting-started/setup-mumu/01-download-mumu.webp
```

Markdown usage:

```md
![Download MuMu](/img/getting-started/setup-mumu/01-download-mumu.webp)
```

PNG/JPG screenshots are also fine during writing:

```text
static/img/getting-started/setup-mumu/01-download-mumu.png
```

```md
![Download MuMu](/img/getting-started/setup-mumu/01-download-mumu.png)
```

Optimize images:

```bash
npm run optimize-images -- static/img/getting-started/setup-mumu
```

After optimization, update Markdown links to use the generated `.webp` files. Then remove public PNG/JPG files:

```bash
npm run optimize-images -- static/img/getting-started/setup-mumu --delete-original
```

Recommended image workflow:

1. Take screenshots and save them directly into `static/img/<section>/<page>/`.
2. Use the image immediately in Markdown with `/img/...`.
3. Preview with `npm run start:vi`.
4. Before deploy, run `npm run optimize-images`.
5. Update links to `.webp`.
6. Run `npm run check-docs`.

## Pre-Deploy Checks

Run checks before deploying:

```bash
npm run check-docs
npm run typecheck
npm run build
```

`check-docs` catches:

- Missing referenced screenshots.
- Encoding/mojibake issues.
- Missing locale docs between EN, VI, and ZH.
- Runtime CDN dependencies that are unreliable for users in China.

## Deployment

Production domain:

```text
https://docs.microbe-studio.com
```

Recommended Cloudflare Pages settings:

```text
Build command: npm run build
Output directory: build
Node.js version: >=20
```
