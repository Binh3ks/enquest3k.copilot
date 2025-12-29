# AI Tutor với Gemini API - Hướng Dẫn Setup

## ✅ Hoàn Thành
AI Tutor đã được nâng cấp với Google Gemini AI (FREE):

### Cải Tiến Chính:
1. **Chat Thông Minh**: Không lặp lại câu hỏi, context-aware conversations
2. **Math Problems Contextual**: Như sách giáo khoa Singapore/US
   - Yêu cầu đơn vị: "5 pencils" không chỉ "5"
   - Validate lời văn hoàn chỉnh
3. **Grammar-Aware**: Chỉ dùng ngữ pháp đã học (Week 8: Present Simple, KHÔNG past tense)
4. **Story Builder**: AI tiếp câu chuyện tự nhiên theo level
5. **Debate Natural**: Phản hồi thông minh, không template cứng

---

## 🚀 Setup (3 Bước)

### Bước 1: Lấy API Key (FREE)
1. Mở: https://makersuite.google.com/app/apikey
2. Đăng nhập Google
3. Click **"Create API Key"**
4. Copy API key

### Bước 2: Thêm vào .env
Mở file `/Engquest3k/.env` và thêm:
```
VITE_GEMINI_API_KEY=AIzaSy...your_key_here
```

### Bước 3: Restart Dev Server
```bash
cd Engquest3k
npm run dev
```

---

## ✨ Tính Năng Mới

### Math Quiz - Contextual Problems
❌ **Trước**: "I have 3 pencils. I get 2 more. How many?"
✅ **Sau**: "Maria is the class monitor. She counts 3 red pencils and 4 blue pencils in the pencil box. How many pencils are there in total?"

**Validation**:
- ❌ "7" → "Remember to include the UNIT!"
- ✅ "7 pencils" → "Correct! 🎉"

### Chat - No Repetition
❌ **Trước**: 
```
AI: What's your favorite subject? Why?
Student: Math
AI: What's your favorite subject? Why? (lặp lại)
```

✅ **Sau**:
```
AI: What's your favorite subject? Why?
Student: Math
AI: That's great! What do you like most about math?
Student: Numbers
AI: Numbers are fun! Can you solve a problem for me?
```

### Story Builder - Grammar-Aware
Week 8 (chưa học past tense):
❌ **Trước**: "Once there **was** a cat..." (dùng past tense)
✅ **Sau**: "There **is** a cat. The cat **sees** a bird." (present simple)

### Science Stories
Week 8 topic: Living/Non-living
```
AI: A scientist looks at a plant.
Student: The plant has green leaves
AI: Yes! The plant is a living thing. It needs water and sun. What happens next?
```

---

## 🔧 Troubleshooting

### Lỗi "API Key Invalid"
- Kiểm tra key có đúng format: `AIzaSy...`
- Đảm bảo không có dấu cách thừa
- Restart dev server sau khi thêm key

### Responses Bị Chậm
- Gemini free tier có rate limit
- Đợi 1-2 giây giữa các câu hỏi
- Nếu quá chậm, AI sẽ dùng fallback responses

### Grammar Không Đúng Level
- Kiểm tra `syllabus_database.js` có grammar rules chính xác
- Week 1-14: Chỉ present simple
- Week 15+: Có thể dùng past tense

---

## 📊 API Usage (Free Tier)
- **60 requests/minute**: Đủ cho 1-2 học sinh dùng đồng thời
- **1500 requests/day**: Rất nhiều cho development
- **Không cần credit card**: Hoàn toàn free

---

## 🎯 Testing Checklist

### Chat Tab:
- [ ] Conversation không lặp lại câu hỏi
- [ ] Tối thiểu 10 turns trước khi kết thúc
- [ ] Dùng từ vựng của tuần
- [ ] Math Helper scenario hoạt động

### Quiz Tab - Math:
- [ ] Word problems có context (tên người, tình huống)
- [ ] Validate yêu cầu đơn vị (7 pencils, không chỉ 7)
- [ ] Mỗi câu khác nhau (không lặp lại)
- [ ] Explanation hiển thị khi sai

### Story Tab:
- [ ] Beginner: Câu đơn giản, present tense
- [ ] Science mode: Dùng khoa học của tuần
- [ ] AI tiếp câu tự nhiên, không lặp template

### Debate Tab:
- [ ] Locked cho week < 15
- [ ] Phản hồi tự nhiên, không cứng nhắc
- [ ] Tối thiểu 5-10 turns tùy level

---

## 💡 Tips Development

### Test với Week 8:
```javascript
// Week 8: Classroom Inventory
// Grammar: Plurals, Present Simple
// Math: Grouping
// Science: Living/Non-living
```

**Expected behaviors**:
- Math: "Maria counts 3 desks and 4 chairs. How many items?"
- NO past tense: "was", "were", "had"
- Vocabulary: desk, chair, pencil, eraser, book

### Test với Week 20:
```javascript
// Week 20: The Old Town  
// Grammar: There was/were (PAST ALLOWED)
// Topic: History
```

**Expected behaviors**:
- Can use past tense now
- More complex vocabulary
- Longer conversations (12+ turns)

---

## 📝 Notes
- API key lưu trong `.env` (đã ignore trong git)
- Service file: `/src/services/geminiService.js`
- Fallback responses nếu API fail
- Tất cả responses cache trong conversation history

Cần help gì thêm? 🚀
