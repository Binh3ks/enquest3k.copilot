# 🧠 Antigravity Model Router & Task Delegation Rule

**Áp dụng bắt buộc cho MỌI yêu cầu của người dùng từ 2026-08-17.**

---

## 1. Nguyên Tắc Phân Phối Tác Vụ Tự Động (Automated Model Delegation Protocol)

Khi nhận một yêu cầu mới từ USER, Agent BẮT BUỘC phải thực hiện tự động phân loại tác vụ theo 4 tầng (Tiers):

### 🟢 Tier 1: Fast Operations (Flash Engine)
- **Tác vụ**: Chạy lệnh terminal (`git`, `npm run audit`, `npm run build`), tóm tắt phiên (`/handoff`), nạp context mở đầu (`/start`), xem file log, format Markdown.
- **Quy tắc thực thi**: Phản hồi tức thì trong ≤0.5s, không viết giải thích thừa, chỉ chạy lệnh và báo cáo 3 dòng ngắn gọn.
- **Tiết kiệm**: 95% token cost.

### 🟡 Tier 2: Code Implementation & UI Scaffolding
- **Tác vụ**: Viết component React, sửa UI/CSS Vanilla, tạo data hooks, kết nối routing.
- **Quy tắc thực thi**: Đọc kỹ file gốc trước khi sửa, tuân thủ không cắt xén code, kiểm tra lints và build exit code 0 ngay sau khi làm xong.
- **Tiết kiệm**: Tránh vỡ build $\rightarrow$ giảm 80% lượt thử lại.

### 🔴 Tier 3: Deep Reasoning & Cambridge Blueprint Standard
- **Tác vụ**: Giải thuật toán Bar Models SVG, cân chỉnh tọa độ điểm chạm (LineMatcher targets), xây dựng script audio đa giọng Cambridge Flyers, debug bug crash ẩn (`ReferenceError`, TDZ).
- **Quy tắc thực thi**: Sử dụng quy trình phân tích từng bước (Step-by-step reasoning), kiểm tra nguyên nhân gốc rễ (Root Cause) bằng empirical logs trước khi patch code.

### 🟣 Tier 4: Multi-Agent Subagent Swarm (Parallel Pipeline)
- **Tác vụ**: Sinh nội dung hoàn chỉnh cho cả tuần học từ Syllabus (`read_stem`, `read_social`, `explore.js`, `writing.js`, `mindmap.js`, `vocab.js`, `week_XX_real.js`), audit hàng loạt file.
- **Quy tắc thực thi**: Tự động spawn Subagent Swarm (`content-writer`, `quality-reviewer`) để chạy song song. Main agent chịu trách nhiệm thu thập báo cáo tổng hợp.
- **Tiết kiệm**: Giữ Main Session context window sạch sẽ (<20k tokens).

---

## 2. Lệnh Kiểm Tra Routing Nhanh
Agent hoặc người dùng có thể kiểm tra phân loại bằng lệnh:
```bash
node scripts/model_router.mjs "<Yêu cầu nhiệm vụ>"
```
