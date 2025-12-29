# Batch Image Manager - Usage Guide

## Mục đích
Sử dụng Gemini Imagen API để tạo hình ảnh cho vocabulary, word power, và story covers trong EngQuest3k.

## Cách chạy

```bash
# Từ thư mục Engquest3k/
cd /Users/binhnguyen/Downloads/engquest3k_new/Engquest3k

# Chạy với cú pháp:
node tools/batch_manager.js <start_week> <end_week> "<GEMINI_API_KEY>"

# Ví dụ: Tạo hình cho week 20 (cả advanced và easy)
node tools/batch_manager.js 20 20 "AIzaSyAso9RuRUt5OA2GZk6-Nc9pFf-3YfVz41k"

# Ví dụ: Tạo hình cho week 1-5
node tools/batch_manager.js 1 5 "AIzaSyAso9RuRUt5OA2GZk6-Nc9pFf-3YfVz41k"
```

## Cập nhật (25/12/2025)
- ✅ Sửa lại filename logic để khớp với tên file image thực
- ✅ Hỗ trợ word_power images
- ✅ Tự động tạo folder nếu không tồn tại
- ✅ Bỏ qua file đã tồn tại (skip existing)

## Filenames được tạo
- Vocabulary: `/public/images/week{N}/{word}.jpg`
  - Ví dụ: `archaeologist.jpg`, `ancient.jpg`
- Word Power: `/public/images/week{N}/wordpower_{word}.jpg`
  - Ví dụ: `wordpower_artifact.jpg`
- Story Covers: `/public/images/week{N}/read_cover.jpg`, `explore_cover.jpg`

## Lưu ý
- API rate limit: 1.5 giây delay giữa requests
- Chỉ tạo nếu file chưa tồn tại
- Cần GEMINI_API_KEY có quyền access Imagen 4.0
