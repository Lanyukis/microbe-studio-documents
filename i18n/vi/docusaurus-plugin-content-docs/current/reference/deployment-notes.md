---
title: Ghi chú deploy
---

# Ghi chú deploy

Dùng trang này khi deploy docs lên Cloudflare Pages.

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `build`
- Node.js version: `>=20`
- Production domain: `docs.microbe-studio.com`

## Check trước khi deploy

Chạy lệnh này trước khi build hoặc đóng gói docs:

```bash
npm run check-docs
```

Lệnh này bắt các lỗi thường gặp: sai đường dẫn ảnh, lỗi encoding tiếng Việt, và thiếu file locale.

Lệnh này cũng chặn các runtime CDN thường không ổn định với người dùng Trung Quốc, ví dụ Google Fonts và public JavaScript CDN.

## Tối ưu ảnh

- Giữ ảnh gốc ngoài `static/`.
- Chỉ publish ảnh WebP đã tối ưu trong `static/img/...`.
- Chạy optimize trước khi deploy:

```bash
npm run optimize-images -- static/img/getting-started/setup-mumu
```

- Nếu muốn xóa PNG/JPG public sau khi convert:

```bash
npm run optimize-images -- static/img/getting-started/setup-mumu --delete-original
```

## Search

Search là local search, được generate khi build. Nếu kết quả search bị cũ, chạy clean build:

```bash
npm run clear
npm run build
```

## Checklist truy cập từ Trung Quốc

- Giữ font ở dạng local hoặc system font; không thêm Google Fonts.
- Giữ search là local search; không chuyển bản Trung sang Algolia nếu chưa test network từ Trung Quốc.
- Publish screenshot ở dạng WebP đã tối ưu trong `static/img/...`.
- Tránh nhúng video, iframe, hoặc script từ CDN ngoài trong docs page.
- Test `/zh-Hans/` sau mỗi production build.

## Chính sách ngôn ngữ

- English là fallback public mặc định.
- Tiếng Việt là source of truth.
- Tiếng Trung đã được bật ở dạng scaffold. Coi nội dung `zh-Hans` là chưa hoàn chỉnh cho tới khi được dịch từ tiếng Việt và review.
