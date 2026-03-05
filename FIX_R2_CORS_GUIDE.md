# 🔧 FIX R2 CORS ERROR - HƯỚNG DẪN

## 🚨 VẤN ĐỀ
Console log hiển thị:
```
Access to fetch at 'https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/ai_tutor_cache/...' 
from origin 'https://enquest3k.pages.dev' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Nguyên nhân**: R2 bucket chưa được config CORS headers để cho phép Cloudflare Pages access.

---

## ✅ GIẢI PHÁP: CONFIG R2 CORS

### **Bước 1: Vào Cloudflare Dashboard**
1. Đăng nhập: https://dash.cloudflare.com
2. Chọn account có R2 bucket
3. Vào **R2** section (sidebar trái)

### **Bước 2: Tìm bucket `TTS_BUCKET`**
- Bucket name: Kiểm tra trong `cloudflare-worker/wrangler.toml`
- Hoặc check trong Worker logs/settings

### **Bước 3: Add CORS Rule**
Click vào bucket → **Settings** → **CORS Policy** → **Add CORS policy**

**Paste config này:**

```json
[
  {
    "AllowedOrigins": [
      "https://enquest3k.pages.dev",
      "https://*.pages.dev",
      "http://localhost:5173",
      "http://localhost:*"
    ],
    "AllowedMethods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": [
      "ETag",
      "Content-Length",
      "Content-Type",
      "X-Cache",
      "X-TTS-Source"
    ],
    "MaxAgeSeconds": 86400
  }
]
```

### **Bước 4: Save & Deploy**
- Click **Save**
- CORS sẽ có hiệu lực ngay lập tức (no redeploy needed)

---

## 🧪 TEST CORS SAU KHI FIX

### **Test trong browser console:**
```javascript
fetch('https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week1/read_1.mp3')
  .then(r => console.log('✅ CORS OK:', r.status))
  .catch(e => console.error('❌ CORS FAIL:', e));
```

**Expected result**: 
- ✅ Response 200/404 (OK - có thể file không tồn tại nhưng CORS đã pass)
- ❌ CORS error → CORS vẫn chưa config đúng

---

## 🔍 ALTERNATIVE: Check Current CORS Config

**Dùng curl để kiểm tra CORS headers:**
```bash
curl -I -X OPTIONS \
  -H "Origin: https://enquest3k.pages.dev" \
  -H "Access-Control-Request-Method: GET" \
  https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week1/test.mp3
```

**Nếu CORS đã config đúng, sẽ thấy:**
```
Access-Control-Allow-Origin: https://enquest3k.pages.dev
Access-Control-Allow-Methods: GET, HEAD, PUT, POST, DELETE
Access-Control-Allow-Headers: *
```

---

## 📝 NOTES

### **Nếu không có quyền access R2 dashboard:**
1. Ask team owner để add CORS config
2. Hoặc dùng Wrangler CLI:
   ```bash
   cd cloudflare-worker
   wrangler r2 bucket cors put TTS_BUCKET --config cors-config.json
   ```

### **File cors-config.json:**
```json
{
  "corsRules": [
    {
      "allowedOrigins": [
        "https://enquest3k.pages.dev",
        "https://*.pages.dev",
        "http://localhost:5173"
      ],
      "allowedMethods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
      "allowedHeaders": ["*"],
      "exposeHeaders": ["ETag", "Content-Length", "X-Cache"],
      "maxAgeSeconds": 86400
    }
  ]
}
```

---

## ✅ EXPECTED BEHAVIOR AFTER FIX

### **Console logs should show:**
```
[TTS] Trying R2 CDN for week 1 advanced...
[TTS] ✅ R2 CDN success (~100ms)
✅ Audio playback ended
```

**No more:**
```
❌ R2 CDN MISS: Failed to fetch
```

---

## 🚀 SUMMARY OF ALL FIXES (March 5, 2026)

| Issue | Fix | Status |
|-------|-----|--------|
| 405 Error - Pronunciation API | Use `${API_BASE_URL}/pronunciation/evaluate-deepgram` | ✅ Fixed |
| 405 Error - Cache Audio API | Use `${API_BASE_URL}/cache/audio` | ✅ Fixed |
| Kokoro references in logs | Update ttsPreload.js to "Deepgram" | ✅ Fixed |
| R2 CORS blocking | Add CORS policy in R2 bucket | ⚠️ Needs manual config |

---

**Last Updated**: March 5, 2026  
**Related Files**:
- [PronunciationTab.jsx](src/modules/ai_tutor/tabs/PronunciationTab.jsx)
- [ttsEngine.js](src/services/ai_tutor/ttsEngine.js)
- [ttsPreload.js](src/services/ttsPreload.js)
- [cloudflare-worker/tts-worker.js](cloudflare-worker/tts-worker.js)
