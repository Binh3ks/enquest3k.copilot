# 🔑 Hướng Dẫn Lấy Gemini API Key FREE

## Bước 1: Truy cập Google AI Studio
```
https://aistudio.google.com/app/apikey
```

## Bước 2: Tạo API Key
1. Click nút **"Create API key"**
2. Chọn **"Create API key in new project"** (tạo project mới)
3. Đợi vài giây, key sẽ hiện ra (dạng `AIzaSy...`)
4. Click **Copy** để lưu key

## Bước 3: Kiểm Tra Key Restrictions
⚠️ **QUAN TRỌNG**: Key phải KHÔNG bị giới hạn

Vào https://console.cloud.google.com/apis/credentials
- Tìm API key vừa tạo
- Click vào key name
- Phần **API restrictions**:
  - Chọn **"Don't restrict key"** (không giới hạn)
  - HOẶC chỉ allow **"Generative Language API"**
- Phần **Application restrictions**:
  - Chọn **"None"** (không giới hạn IP/referrer)
- Click **Save**

## Bước 4: Copy Key Vào .env
```bash
cd Engquest3k
nano .env
```

Dán key vào:
```
VITE_GEMINI_API_KEY=AIzaSy_YOUR_ACTUAL_KEY_HERE
```

Lưu: `Ctrl+O`, `Enter`, `Ctrl+X`

## Bước 5: Test Thử

### Test 1: Verify key format
Key hợp lệ có dạng:
```
AIzaSyBq8z3A_vspgE8s2lY53iQ7kUhqMCt4tTw
```

### Test 2: Check model availability
Models FREE với AI Studio keys:
- ✅ `gemini-1.5-pro-latest` (best quality, slower)
- ✅ `gemini-1.5-flash-latest` (faster)
- ✅ `gemini-pro` (stable, older)

### Test 3: Quick API test
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

Nếu thành công → nhận JSON response
Nếu lỗi 404 → model name sai
Nếu lỗi 400/403 → key restrictions

## Common Issues

### Lỗi 404: Model not found
**Nguyên nhân**: Model name không tồn tại hoặc key không access được model

**Fix**: Thử đổi model trong `geminiService.js`:
```javascript
// Thử từng model này:
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
// hoặc
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
// hoặc
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
```

### Lỗi 403: Permission denied
**Nguyên nhân**: API key bị restrictions hoặc Generative Language API chưa enable

**Fix**:
1. Vào https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
2. Click **Enable** nếu chưa bật
3. Remove key restrictions (xem Bước 3)

### Lỗi 429: Quota exceeded
**Nguyên nhân**: Vượt free tier limits (60 requests/minute, 1500 requests/day)

**Fix**: Đợi 1 phút rồi thử lại

## Free Tier Limits
- **60 requests/minute**
- **1500 requests/day**
- **Không cần credit card**
- **Không tự động charge**

## Verify Setup
1. Refresh page: `localhost:5176`
2. Mở Console (F12)
3. Click Professor Paws → Story tab
4. Start story và add text
5. Check console logs:
   - ✅ `[Gemini Story] Week 8, Type: creative, Level: beginner`
   - ✅ `[Gemini Story] Generated: "..."`
   - ❌ `[Gemini Story] API Error:` → key có vấn đề

## Support
Nếu vẫn lỗi, gửi screenshot console error để debug!
