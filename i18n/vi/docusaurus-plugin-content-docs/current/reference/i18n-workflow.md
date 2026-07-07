---
title: Workflow dịch thuật
---

# Workflow dịch thuật

Bản tiếng Việt là source of truth cho tài liệu Microbe Studio.

## Trạng thái

| Status | Ý nghĩa |
| --- | --- |
| `source-ready` | Nội dung tiếng Việt đã đủ ổn để dịch. |
| `translated` | Bản dịch tiếng Anh hoặc tiếng Trung đã tồn tại. |
| `reviewed` | Đã có người review thuật ngữ và độ chính xác sản phẩm. |
| `outdated` | Bản dịch không còn khớp với nguồn tiếng Việt. |

## Quy trình đề xuất

1. Viết hoặc sửa trang tiếng Việt trước.
2. Đánh dấu trang là `source-ready`.
3. Dịch sang tiếng Anh cho route public mặc định.
4. Review thuật ngữ và ảnh chụp ở bản tiếng Anh.
5. Dịch sang tiếng Trung sau khi bản Anh ổn định.
6. Đánh dấu bản dịch cũ là `outdated` khi nguồn tiếng Việt thay đổi.

## Điều kiện bật bản tiếng Trung

Dùng `zh-Hans` cho bản Simplified Chinese dành cho người dùng Trung Quốc. Không bật `zh-Hans` trong `docusaurus.config.ts` khi locale chưa có ít nhất các trang getting-started cốt lõi đã dịch và review. Khi bật, cần thêm detect tiếng Trung trong `static/js/locale-redirect.js`, thêm `zh` vào cấu hình local search, và đưa `zh-Hans` vào bước kiểm tra parity của docs.

## Checklist dịch thuật

| Page | Vietnamese source | English | Chinese |
| --- | --- | --- | --- |
| Setup MuMu | `source-ready` | `translated` | `outdated` |
| Instance Dashboard | draft | `outdated` | `outdated` |
| Flow Queue | draft | `outdated` | `outdated` |
| Flows Management | draft | `outdated` | `outdated` |
| Scheduler | draft | `outdated` | `outdated` |
| Discord Bot | draft | `outdated` | `outdated` |
