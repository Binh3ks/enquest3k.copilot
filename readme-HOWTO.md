# Copilot Memory + Context (ENGQUEST3K)

Mục tiêu:
- **Memory** = nơi lưu “quyết định / kết luận / lệnh quan trọng” sau mỗi buổi làm việc.
- **Context** = file DUY NHẤT bạn attach vào Copilot chat (`copilot-context.md`).
- Copilot **KHÔNG tự nhớ chat cũ** → phải **ghi vào repo** rồi **build**.

---

## 0) File & lệnh đang dùng

### Files
- `docs/memory.md`  
  → kho lưu “Decision / Notes” (con người đọc, script ghi)
- `docs/context-sources.md`  
  → danh sách các file được phép đưa vào context
- `scripts/build-context.mjs`  
  → build ra `copilot-context.md`
- `scripts/add-memory.mjs`  
  → append 1 entry vào `docs/memory.md`
- `scripts/mem.sh`  
  → 1 lệnh: ghi memory + build context
- `copilot-context.md`  
  ✅ file DUY NHẤT attach vào Copilot chat

### NPM scripts (package.json)
- `npm run context:build`
- `npm run memory:add -- "..."` (hoặc `npm run memory:add "..."` tùy shell)
- `./scripts/mem.sh "..."` ✅ khuyến nghị

---

## 1) Bắt đầu 1 phiên chat mới với Copilot (VS Code)

1) Mở **Copilot Chat**
2) Dán dòng này (để Copilot đọc codebase + context):
@workspace #file:copilot-context.md

scss
Sao chép mã
3) (Tuỳ chọn) Dán “rule ngắn” này 1 lần ở đầu chat:
Rules:

Only use @workspace + #file:copilot-context.md as truth.

If unclear, ask.

No guessing. Show exact file paths and diffs.

yaml
Sao chép mã

✅ Xong: Copilot đã có toàn bộ context (bao gồm memory nếu đã build).

---

## 2) Ghi “memory” đúng cách (KHÔNG ghi chat, chỉ ghi kết luận)

Bạn ghi những thứ như:
- quyết định kỹ thuật
- phát hiện bug + nguyên nhân
- “chúng ta sẽ làm bước tiếp theo là gì”
- lệnh quan trọng để chạy lại
- file chính liên quan

### ⭐ Cách nhanh nhất: Project Manager Option 5 (KHUYẾN NGHỊ)
```bash
./tools/project_manager.sh
# Chọn: 5
```
**Làm tất cả trong 1 lệnh:**
- 🧠 Ghi chat insights từ sessions
- 📝 Ghi core project memories  
- 🔄 Rebuild copilot-context.md

### Cách thủ công (nếu cần ghi memory riêng lẻ)
```bash
./scripts/mem.sh "Decision: <nội dung ngắn gọn>"
```
Ví dụ:

```bash
./scripts/mem.sh "Decision: <nội dung ngắn gọn>"
```
**Kết quả:**
- Append vào docs/memory.md
- Rebuild copilot-context.md (Copilot chat mới đọc được)

### 3) Nếu muốn tách 2 bước (ít dùng)
### 3) Nếu muốn tách 2 bước (ít dùng)
**(A) Chỉ ghi memory** (chưa build)
```bash
npm run memory:add "Decision: ..."
```
**(B) Build context** (đưa memory vào copilot-context.md)
```bash
npm run context:build
```
⚠️ **Lưu ý:** Nếu chỉ làm (A) mà không làm (B) thì Copilot sẽ chưa thấy memory mới (trừ khi bạn attach docs/memory.md trực tiếp).

## 4) Workflow chuẩn mỗi lần làm việc
**Khi vừa chốt xong 1 kết luận quan trọng**
Gõ 1 câu ngắn "Decision: …"

**Chạy:**
```bash
./tools/project_manager.sh
# Chọn: 5
```
**Tiếp tục** làm việc / mở Copilot chat mới → attach `#file:copilot-context.md`

## 5) Checklist nhanh (đỡ quên)
☑️ **Copilot chat mới:** `@workspace #file:copilot-context.md`

☑️ **Có quyết định mới:** `./tools/project_manager.sh` → chọn `5`

☑️ **Không attach docs/memory.md** (trừ khi debug). Chỉ attach copilot-context.md.