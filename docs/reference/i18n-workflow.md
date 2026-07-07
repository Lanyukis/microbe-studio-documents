---
title: Translation Workflow
---

# Translation Workflow

Vietnamese is the source of truth for Microbe Studio documentation.

## Status model

Use these labels when tracking each page:

| Status | Meaning |
| --- | --- |
| `source-ready` | Vietnamese content is complete enough to translate. |
| `translated` | English or Chinese translation exists. |
| `reviewed` | A human has reviewed terminology and product accuracy. |
| `outdated` | The translation no longer matches the Vietnamese source. |

## Recommended process

1. Write or update the Vietnamese page first.
2. Mark the page `source-ready`.
3. Translate to English for the default public route.
4. Review English terminology and screenshots.
5. Translate to Chinese after the English version is stable.
6. Mark older translations `outdated` whenever the Vietnamese source changes.

## Chinese locale readiness

Use `zh-Hans` for Simplified Chinese content intended for users in China. Do not enable `zh-Hans` in `docusaurus.config.ts` until the locale has at least the core getting-started pages translated and reviewed. When enabling it, also add Chinese browser detection in `static/js/locale-redirect.js`, add `zh` to the local search language list, and include `zh-Hans` in the docs parity check.

## Translation checklist

| Page | Vietnamese source | English | Chinese |
| --- | --- | --- | --- |
| Setup MuMu | `source-ready` | `translated` | `outdated` |
| Instance Dashboard | draft | `outdated` | `outdated` |
| Flow Queue | draft | `outdated` | `outdated` |
| Flows Management | draft | `outdated` | `outdated` |
| Scheduler | draft | `outdated` | `outdated` |
| Discord Bot | draft | `outdated` | `outdated` |
