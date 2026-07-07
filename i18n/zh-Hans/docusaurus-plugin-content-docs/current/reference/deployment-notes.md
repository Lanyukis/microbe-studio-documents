---
title: 部署说明
---

# 部署说明

部署文档到 Cloudflare Pages 时使用这些说明。

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `build`
- Node.js version: `>=20`
- Production domain: `docs.microbe-studio.com`

## 部署前检查

在 build 或打包文档前运行：

```bash
npm run check-docs
```

这会检查常见文档问题：截图路径错误、越南语内容编码异常，以及 locale 文件缺失。

它也会阻止一些对中国用户不稳定的运行时 CDN 依赖，例如 Google Fonts 和公共 JavaScript CDN。

## 图片优化

- 将原始截图保存在 `static/` 外部。
- 只将优化后的 WebP 图片发布到 `static/img/...`。
- 部署前运行图片优化：

```bash
npm run optimize-images -- static/img/getting-started/setup-mumu
```

- 转换后如需删除公开目录中的 PNG/JPG：

```bash
npm run optimize-images -- static/img/getting-started/setup-mumu --delete-original
```

## 搜索

搜索是本地搜索，并在 build 时生成。如果搜索结果过旧，请运行 clean build：

```bash
npm run clear
npm run build
```

## 中国访问检查清单

- 使用本地字体或系统字体；不要添加 Google Fonts。
- 保持本地搜索；除非已在中国网络环境测试，不要将中文文档切换到 Algolia。
- 将截图以优化后的 WebP 发布到 `static/img/...`。
- 避免在文档页中嵌入来自外部 CDN 的视频、iframe 或脚本。
- 每次 production build 后测试 `/zh-Hans/`。

## 语言策略

- English 是默认 public fallback。
- Vietnamese 是内容 source of truth。
- Chinese 已作为 scaffold 启用。在从越南语翻译并 review 之前，`zh-Hans` 内容仍视为未完成。
