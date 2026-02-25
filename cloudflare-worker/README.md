# EngQuest TTS Worker — Hướng dẫn Deploy

## Kiến trúc

```
App → api-tts.bkbacademy.vn (Worker)
         ├── R2 cache HIT  → audio <100ms ✅
         └── R2 cache MISS → Google TTS ~300ms → save R2 → audio ✅
```

**Lợi ích:**
- `GOOGLE_TTS_API_KEY` nằm trong Worker Secret — không bao giờ lộ trong browser bundle
- Cross-user R2 cache: học sinh A tạo → học sinh B lấy lại miễn phí
- Sau 1-2 tuần dùng, ~80% requests là R2 cache hit (<100ms)

---

## Bước 1: Cài Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

---

## Bước 2: Kiểm tra tên R2 Bucket

Vào Cloudflare Dashboard → R2 → xem tên bucket đang dùng.
Nếu tên khác `engquest-tts`, sửa `bucket_name` trong `wrangler.toml`.

---

## Bước 3: Set Secret (API key ẩn hoàn toàn)

```bash
cd cloudflare-worker
wrangler secret put GOOGLE_TTS_API_KEY
# Paste: AIzaSyBKYuYuGW6c8gbkmeJVdCRKb15MXcdPmH8
```

---

## Bước 4: Deploy Worker

```bash
wrangler deploy
```

Output sẽ cho URL dạng: `https://engquest-tts-worker.<your-subdomain>.workers.dev`

---

## Bước 5: Test Worker

```bash
# Test health
curl https://engquest-tts-worker.<subdomain>.workers.dev/health

# Test TTS (MISS → gọi Google TTS, lưu R2)
curl -o /tmp/test.mp3 "https://engquest-tts-worker.<subdomain>.workers.dev/tts?text=Hello+student&station=ai_tutor"
file /tmp/test.mp3   # phải là: MPEG audio

# Test TTS lần 2 (HIT → lấy từ R2)
curl -I "https://engquest-tts-worker.<subdomain>.workers.dev/tts?text=Hello+student&station=ai_tutor"
# Header X-Cache: HIT ✅
```

---

## Bước 6: Custom Domain `api-tts.bkbacademy.vn`

1. Cloudflare Dashboard → Workers & Pages → **engquest-tts-worker**
2. Tab **Settings** → **Triggers** → **Add Custom Domain**
3. Nhập: `api-tts.bkbacademy.vn` → Add

4. Cập nhật `.env` trong project:
```
VITE_TTS_WORKER_URL=https://api-tts.bkbacademy.vn
```

5. Restart `npm run dev`

---

## Bước 7: R2 Lifecycle Rule (tự dọn rác sau 30 ngày)

Cloudflare Dashboard → R2 → bucket → **Settings** → **Object Lifecycle**:
- Rule name: `cleanup-dynamic-tts`
- Prefix: `dynamic/`
- Action: **Delete** after **30 days** of last access

Static files (`week1/`, `week2/`...) không có prefix `dynamic/` → không bị xóa.

---

## Cấu trúc R2 sau khi chạy

```
engquest-tts/
├── week1/          ← static pre-generated (không bị lifecycle xóa)
├── week2/
├── ...
└── dynamic/
    ├── ai_tutor/   ← {sha256(text|voice)}.mp3 (lifecycle 30 ngày)
    ├── freetalk/
    ├── gamehub/
    └── ask_ai/
```

---

## Endpoint API

| Endpoint | Method | Params | Mô tả |
|---|---|---|---|
| `/health` | GET | — | Kiểm tra Worker hoạt động |
| `/tts` | GET | `text`, `station`, `voice` (optional) | Lấy audio MP3 |

**Voice mặc định:** `en-US-Journey-F`  
**Voices khác:** `en-US-Neural2-F`, `en-US-Neural2-C`, `en-US-Journey-D` (male)
