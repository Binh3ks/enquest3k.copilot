# 🚀 TOGETHER AI SETUP - Giải pháp Groq 429 Rate Limit

## ⚠️ VẤN ĐỀ HIỆN TẠI

**Groq**: Bị rate limit (429) liên tục, không dùng được
- Limit: 15 requests/phút (quá thấp)
- Mỗi request đều bị reject ngay lập tức
- Không đủ cho 100 học sinh test

**Gemini**: Works nhưng limit thấp
- Free tier: 60 requests/phút, 1500 requests/ngày
- Không đủ cho production với nhiều users

---

## ✅ GIẢI PHÁP: TOGETHER AI

**Together AI** - Free tier tốt nhất hiện nay:
- ✅ **60 requests/phút** (gấp 4 lần Groq)
- ✅ **1M tokens/tháng** miễn phí
- ✅ API tương thích OpenAI (dễ tích hợp)
- ✅ Models mạnh: Llama 3.3 70B, Qwen 2.5, Mixtral 8x7B
- ✅ Latency thấp (~500-800ms)
- ✅ Free tier ổn định, ít bị chặn

---

## 📝 HƯỚNG DẪN CÀI ĐẶT

### Bước 1: Đăng ký Together AI (2 phút)

1. Truy cập: **https://api.together.xyz/signup**
2. Đăng ký tài khoản (có thể dùng Google/GitHub)
3. Verify email
4. Dashboard sẽ tự động mở

### Bước 2: Lấy API Key

1. Vào **Settings** > **API Keys**
   - URL trực tiếp: https://api.together.xyz/settings/api-keys
2. Click **"Create API key"**
3. Đặt tên: `Engquest_Production`
4. Click **"Create"**
5. **Copy** API key (dạng: `xyz123abc...`)
   - ⚠️ CHỈ HIỂN THỊ 1 LẦN! Lưu lại ngay!

### Bước 3: Thêm vào .env

Mở file `.env` và **thay** dòng:
```bash
VITE_TOGETHER_API_KEY=your_together_api_key_here
```

Thành:
```bash
VITE_TOGETHER_API_KEY=xyz123abc...  # Dán API key vừa copy
```

### Bước 4: Rebuild & Test

```bash
npm run build
```

Hard refresh browser: `Cmd + Shift + R` (macOS) hoặc `Ctrl + Shift + R` (Windows)

---

## 🔄 CHIẾN LƯỢC MỚI - 3 LAYERS

### Priority Fallback:

**Layer 1: Together AI** (Primary - 60 req/min)
- Dùng mặc định cho mọi requests
- Llama 3.3 70B - cực nhanh và chính xác
- Đủ mạnh cho 100+ students đồng thời

**Layer 2: Groq** (Backup - 15 req/min)
- Chỉ dùng khi Together AI lỗi
- Hỗ trợ backup khi rate limit

**Layer 3: Gemini** (Last Resort)
- Dự phòng cuối cùng
- Dùng khi cả Together và Groq đều fail

### Console Logs:
```javascript
🚀 Layer 1: Trying Together AI (attempt 1/2)...
✅ Together AI succeeded in 650ms

// Nếu Together AI fail:
⚠️ Together AI failed (429): Request failed
🔄 Auto-switching to Layer 2: Groq...
✅ Groq succeeded (fallback) in 480ms

// Nếu cả 2 fail:
⚠️ Groq failed (429): Request failed
🔄 Auto-switching to Layer 3: Gemini 2.0 Flash...
✅ Gemini succeeded (fallback) in 1200ms
```

---

## 📊 SO SÁNH PROVIDERS

| Provider | Free Limit | Latency | Stability | Best For |
|----------|-----------|---------|-----------|----------|
| **Together AI** | 60 req/min | 500-800ms | ⭐⭐⭐⭐⭐ | **Production** |
| Groq | 15 req/min | 300-500ms | ⭐⭐ | Backup |
| Gemini | 60 req/min | 1000-1500ms | ⭐⭐⭐⭐ | Last resort |

**Kết luận**: Together AI là lựa chọn tốt nhất cho production với 100+ users!

---

## 🧪 TESTING

### Test 1: Together AI Primary
```bash
# Open Mission 2
# Console should show:
✅ Together AI succeeded in 650ms
```

### Test 2: Rapid Clicks (Rate Limit Test)
```bash
# Click hints rapidly (10 clicks in 5 seconds)
# Should NOT see 429 errors
# All requests go through normally
```

### Test 3: Fallback Chain
```bash
# If Together AI quota full:
🚀 Layer 1: Trying Together AI...
⚠️ Together AI quota FULL, waiting...
# OR
🔄 Auto-switching to Layer 2: Groq...
✅ Groq succeeded (fallback)
```

---

## ❓ FAQ

**Q: Together AI có miễn phí vĩnh viễn không?**
A: Có free tier 1M tokens/tháng. Đủ cho ~5000 conversations. Nếu vượt, có thể tạo account mới hoặc upgrade ($0.20/1M tokens - rất rẻ).

**Q: Có cần credit card không?**
A: KHÔNG. Hoàn toàn free, không cần thẻ.

**Q: Model nào tốt nhất?**
A: `meta-llama/Llama-3.3-70B-Instruct-Turbo` - đã config sẵn trong code. Nhanh và chính xác.

**Q: Latency có nhanh hơn Groq?**
A: Xấp xỉ (~500-800ms vs 300-500ms). Nhưng stable hơn nhiều, không bị 429.

**Q: Có cần thay đổi code không?**
A: KHÔNG. Chỉ cần thêm API key vào `.env` và rebuild. Code đã support Together AI sẵn.

---

## 🆘 TROUBLESHOOTING

### Lỗi: "Together AI API key not configured"
```bash
# Kiểm tra .env có đúng không:
cat .env | grep TOGETHER

# Phải thấy:
VITE_TOGETHER_API_KEY=xyz123abc...

# Nếu không, check:
1. File .env có tồn tại không?
2. Tên biến đúng chưa? (VITE_TOGETHER_API_KEY)
3. Đã rebuild chưa? (npm run build)
```

### Lỗi: Together AI returns 401 Unauthorized
```bash
# API key sai hoặc expired
# Giải pháp:
1. Vào https://api.together.xyz/settings/api-keys
2. Xóa key cũ
3. Tạo key mới
4. Update lại .env
5. Rebuild
```

### Lỗi: Together AI returns 429
```bash
# Rate limit exceeded (hiếm khi xảy ra với 60 req/min)
# Hệ thống tự động fallback to Groq → Gemini
# Không cần can thiệp
```

---

## 📈 MONITORING

Theo dõi usage tại Together AI dashboard:
- **Usage**: https://api.together.xyz/settings/billing
- **Requests**: Xem realtime requests/min
- **Tokens**: Kiểm tra còn bao nhiêu tokens trong tháng

**Lưu ý**: Nếu gần hết quota (>80%), chuẩn bị account dự phòng hoặc upgrade.

---

## 🎯 KẾT LUẬN

**Together AI** giải quyết triệt để vấn đề Groq 429 rate limit:
- ✅ 60 req/min (gấp 4 lần Groq)
- ✅ Hoàn toàn miễn phí
- ✅ Không cần credit card
- ✅ Setup < 5 phút
- ✅ Đủ mạnh cho 100+ students đồng thời

**Hành động ngay**:
1. Đăng ký Together AI: https://api.together.xyz/signup
2. Lấy API key
3. Thêm vào `.env`
4. Rebuild & test

**Support**: Nếu có vấn đề, check console logs và tham khảo Troubleshooting section.
