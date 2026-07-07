---
title: Deployment Notes
---

# Deployment Notes

Use these notes when deploying the docs to Cloudflare Pages.

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `build`
- Node.js version: `>=20`
- Production domain: `docs.microbe-studio.com`

## Pre-deploy checks

Run this before building or packaging the docs:

```bash
npm run check-docs
```

This catches common docs issues: broken screenshot paths, encoding mojibake in Vietnamese content, and missing locale files.

It also blocks common runtime CDN dependencies that are unreliable for users in China, such as Google Fonts and public JavaScript CDNs.

## Image optimization

- Keep original screenshots outside `static/`.
- Publish optimized WebP images under `static/img/...`.
- Run image optimization before deployment:

```bash
npm run optimize-images -- static/img/getting-started/setup-mumu
```

- To remove original PNG/JPG files after conversion:

```bash
npm run optimize-images -- static/img/getting-started/setup-mumu --delete-original
```

## Search

Search is local and generated at build time. If search results look stale, run a clean build:

```bash
npm run clear
npm run build
```

## China access checklist

- Keep fonts local or system-based; do not add Google Fonts.
- Keep search local; do not switch Chinese docs to Algolia unless the network behavior is tested from China.
- Publish screenshots as optimized WebP under `static/img/...`.
- Avoid embedding videos, iframes, or scripts from external CDNs in docs pages.
- Test `/zh-Hans/` after every production build.

## Locale policy

- English is the default public fallback.
- Vietnamese is the content source of truth.
- Chinese is enabled as a scaffold. Treat `zh-Hans` content as incomplete until it is translated from Vietnamese and reviewed.
