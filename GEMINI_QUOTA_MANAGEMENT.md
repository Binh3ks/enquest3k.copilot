# Gemini API Quota Management - Hướng Dẫn

## Vấn Đề Ban Đầu
- Gemini Free Tier có giới hạn: **60 requests/phút**, **1500 requests/ngày**
- Khi test nhiều lần, dễ vượt quota → lỗi 429 → responses lặp lại vô nghĩa

## Giải Pháp Bền Vững

### 1. **Caching System** (`geminiCache.js`)
- **Cache responses** trong 10 phút
- Câu hỏi tương tự = không gọi API lại
- Tiết kiệm: ~60-70% API calls

**Ví dụ:**
```javascript
// Lần 1: Gọi API
"How many pencils do you have?" → Gemini API → "I have 5 pencils"

// Lần 2 (trong 10 phút): Dùng cache
"How many pencils do you have?" → Cache → "I have 5 pencils" (không tốn quota)
```

### 2. **Rate Limiting**
- **Tự động đợi** nếu vượt 50 requests/phút (để an toàn)
- **Track daily counter** qua localStorage
- **Tự động reset** vào 00:00 mỗi ngày

### 3. **Smart Fallbacks**
- Thay vì "I understand! Tell me more about that." (vô nghĩa)
- Fallback **context-aware**:
  - Chat về family → "Tell me more about your family members!"
  - Chat có số → "5! That's a good number. What about it?"
  - Math Week 1-10 → "Tom has 3 apples. Mary has 4 apples..."
  - Story → Dựa vào nhân vật học sinh vừa viết

### 4. **Quota Monitor** (góc dưới phải màn hình)
- Hiển thị **real-time** số requests còn lại
- Màu xanh = OK, vàng = thận trọng, đỏ = sắp hết
- Thời gian reset quota
- ⚠️ Warning khi quota thấp

## Cách Sử Dụng

### Khi Quota Hết
1. **Không cần lo lắng**: Hệ thống tự động dùng cache + smart fallbacks
2. **Đợi 1 phút** nếu hết quota per-minute
3. **Đợi đến 00:00** nếu hết quota daily (hiếm khi xảy ra)

### Tạo API Key Mới (Nếu Cần)
1. Vào: https://aistudio.google.com/apikey
2. Click "Create API Key"
3. Paste vào `/Engquest3k/.env`:
   ```env
   VITE_GEMINI_API_KEY=YOUR_NEW_KEY_HERE
   ```
4. Restart server: `npm run dev`

### Clear Cache (Reset Toàn Bộ)
```javascript
// Trong browser console (F12)
localStorage.clear();
location.reload();
```

## Technical Details

### Cache Key Generation
```javascript
// Chat: scenario + weekId + userMessage
chat_scenario-general_weekId-1_userMsg-Hello

// Math: weekId + difficulty + mathTopic
math_weekId-1_diff-beginner_topic-counting

// Story: weekId + storyType + lastUserText (50 chars)
story_weekId-8_type-creative_last-The cat jumps...
```

### Rate Limit Algorithm
```javascript
1. Lưu timestamp mỗi request
2. Xóa timestamps > 60 giây
3. Nếu còn < 50 requests trong 60s cuối → OK
4. Nếu >= 50 → Đợi đến khi timestamp đầu tiên > 60s
```

### Daily Counter Storage
```json
{
  "count": 145,
  "resetTime": 1735248000000  // 00:00 ngày mai (timestamp)
}
```

## Monitoring

### Console Logs
```
[Cache HIT] chat_scenario-general_weekId-1... ✅ Không tốn quota
[Rate Limit] OK - Minute: 23/50, Day: 456/1200 ✅ An toàn
[Rate Limit] Too many requests. Wait 8s ⚠️ Tự động đợi
[Quota Exceeded] Try again after: 00:00 ❌ Hết quota daily
```

### UI Monitor (góc dưới phải)
- **Green bars**: Quota tốt (>50%)
- **Yellow bars**: Cần thận trọng (20-50%)
- **Red bars**: Sắp hết (<20%)
- **Orange warning**: Quota thấp, đang dùng fallbacks

## Best Practices

### Cho Người Dùng
- Đợi AI trả lời xong mới hỏi tiếp (tránh spam)
- Câu hỏi tương tự = dùng cache (10 phút)
- Nếu thấy fallback responses = quota hết, thử lại sau 1 phút

### Cho Dev
- **Không disable cache** khi test (trừ khi debug)
- **Test với nhiều scenarios khác nhau** (cache key khác nhau)
- **Monitor console logs** để biết cache hit rate
- **Clear localStorage** sau khi update cache logic

## Troubleshooting

### "Cứ lặp lại câu cũ?"
→ Quota hết, đang dùng fallbacks. Đợi 1 phút hoặc clear cache.

### "Response chậm?"
→ Rate limit đang đợi. Bình thường, hệ thống tự động xử lý.

### "Cache không work?"
→ Check console logs. Nếu thấy `[Cache HIT]` = cache đang hoạt động.

### "Muốn force API call không dùng cache?"
```javascript
// Thêm timestamp vào params
generateChatResponse({ 
  userMessage: "Hello", 
  _nocache: Date.now() 
});
```

## Future Enhancements
- [ ] Multi-API-key rotation (xen kẽ nhiều keys)
- [ ] Server-side API calls (hide key, unlimited quota với paid plan)
- [ ] Persistent cache (IndexedDB, survive page refresh)
- [ ] Streaming responses (token-by-token)
- [ ] A/B testing cache duration (5 min vs 10 min vs 30 min)

---

**TL;DR**: Quota hết = bình thường. Hệ thống tự cache + fallbacks thông minh. Monitor góc dưới phải để track. Clear localStorage nếu muốn reset.
