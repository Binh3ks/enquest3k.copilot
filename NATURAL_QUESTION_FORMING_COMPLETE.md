# ✅ HOÀN THÀNH - QUESTION FORMING TỰ NHIÊN

**Date:** January 8, 2026 - 9:15 AM  
**Changes:** Free Talk + Story Mission - Natural question-asking logic

---

## 🎯 **VẤN ĐỀ ĐÃ KHẮC PHỤC:**

### **Trước đây (GƯỢNG ÉP):**
```
Turn 1: AI: "You like pizza. Do you have a pet?"
Turn 2: Student: "No"
Turn 3: AI: "You are 10! What about you? Can you ask me a question?" ⚠️ GỌN ÉP
Turn 4: Student: "bird"
Turn 5: AI: "You like birds! What about you? Can you ask me a question?" ⚠️ LẶP LẠI
```

**Vấn đề:**
- Cố định turns 3, 6, 9 → không tự nhiên
- AI lặp lại "Can you ask me a question?" quá nhiều
- Học sinh chưa kịp hiểu đã bị ép hỏi lại
- Không phù hợp với flow hội thoại thực tế

---

## ✅ **SAU KHI SỬA (TỰ NHIÊN):**

### **AI tự quyết định KHI NÀO thích hợp:**
```
Turn 1: AI: "Hello! What do you like to do after school?"
Turn 2: Student: "I like to play soccer"
Turn 3: AI: "Soccer is fun! Do you play with friends?"
Turn 4: Student: "Yes, my friends"
Turn 5: AI: "That's great! You told me a lot. What question do YOU have for me?" ✅ TỰ NHIÊN
Turn 6: Student: "What is your favorite sport?"
Turn 7: AI: "I love swimming! It's relaxing. Do you like swimming too?"
```

**Cải thiện:**
- ✅ AI đợi 3-4 câu trả lời trước khi đề nghị học sinh hỏi lại
- ✅ Lời mời tự nhiên: "You told me a lot! What question do YOU have for me?"
- ✅ Không cố định turn nào phải hỏi
- ✅ AI trả lời câu hỏi của học sinh tự nhiên, sau đó hỏi lại
- ✅ Flow hội thoại mượt mà hơn

---

## 🔧 **CHI TIẾT KỸ THUẬT:**

### **1. Free Talk - Xóa logic cố định turns**

**File:** `FreeTalkTab.jsx`

**Trước:**
```javascript
const shouldPromptQuestion = [3, 6, 9].includes(turnCount); // ⚠️ Cố định
```

**Sau:**
```javascript
// ✅ AI tự quyết định - không cần shouldPromptQuestion
const aiResponse = await novaEngineRef.current.sendToNova({
  mode: 'freetalk',
  userMessage,
  chatHistory,
  context: { turnCount, scaffoldingLevel: 2, conversationTopic }
});
```

---

### **2. Prompt AI - Hướng dẫn tự nhiên hơn**

**File:** `tutorPrompts.js`

**Prompt mới cho Free Talk:**
```
🎯 NATURAL QUESTION-ASKING PRACTICE:
- After 3-4 student answers, YOU CAN (not must) naturally invite them to ask YOU
- Make it smooth: "You told me a lot! Now, do YOU have a question for me?"
- Or: "That's interesting! What would you like to know about me?"
- Don't force it every turn - only when conversation feels right
- If student already asks questions naturally, keep answering and engaging
```

**Ví dụ response tự nhiên:**
```json
{
  "ai_response": "Wow, you told me so much! I want to know more about YOU. What question do you have for me?",
  "suggested_hints": ["What", "is", "your", "favorite", "do", "you"]
}
```

---

### **3. Story Mission - Logic tương tự**

**Prompt mới cho Story Mission:**
```
🎯 NATURAL QUESTION-ASKING PRACTICE (Story Mission):
- This is a GUIDED conversation with 10 minimum turns
- Around turn 4-6: You CAN naturally invite student to ask YOU about the mission topic
- Make it smooth: "You're learning so well! Do YOU have a question about [mission topic] for me?"
- Don't force it - only if timing feels natural
- Keep conversation focused on mission topics
```

**Ví dụ trong Mission "First Day at School":**
```
Turn 1: AI: "Hello! I am Ms. Nova. What is your name?"
Turn 2: Student: "My name is Alex"
Turn 3: AI: "Nice to meet you, Alex! How old are you?"
Turn 4: Student: "I am 10 years old"
Turn 5: AI: "You're 10! Are you a student here?"
Turn 6: Student: "Yes, I am"
Turn 7: AI: "You know a lot about school! Do YOU have a question about school for me?" ✅ NATURAL
Turn 8: Student: "Do you like school?"
Turn 9: AI: "Yes! I love teaching. What is your favorite subject?"
Turn 10: Student: "English"
Turn 11: AI: "Wonderful! You did great today. See you next time!"
```

---

## 📊 **SO SÁNH TRƯỚC/SAU:**

| **Tiêu chí** | **Trước (Cố định turns 3, 6, 9)** | **Sau (AI tự quyết định)** |
|-------------|----------------------------------|----------------------------|
| **Timing** | Cố định turn 3, 6, 9 | Sau 3-4 câu trả lời (linh hoạt) |
| **Tần suất** | 3 lần mỗi 15 turns (20%) | 1-2 lần (10-15%) khi thích hợp |
| **Lời mời** | "What about you? Can you ask me a question?" (lặp) | Đa dạng: "You told me a lot! What question do YOU have?" |
| **Tự nhiên** | ❌ Gượng ép | ✅ Mượt mà |
| **Student experience** | ⚠️ Bị áp lực | ✅ Thoải mái |

---

## 🎯 **BENEFITS (LỢI ÍCH):**

### **1. Học sinh thoải mái hơn:**
- Không bị ép phải hỏi ngay lập tức
- Có thời gian hiểu hội thoại trước khi đặt câu hỏi
- Cảm giác tự nhiên như nói chuyện thật

### **2. AI thông minh hơn:**
- Biết đợi timing thích hợp
- Không lặp lại câu mời quá nhiều
- Trả lời câu hỏi của học sinh chuyên nghiệp

### **3. Luyện question forming hiệu quả hơn:**
- Học sinh chủ động hơn
- Câu hỏi có ngữ cảnh rõ ràng
- Practice cả ASKING và ANSWERING

---

## 🧪 **TEST NGAY:**

### **Free Talk Test:**
1. Mở AI Tutor → Free Talk
2. Trả lời 3-4 câu hỏi của AI
3. Quan sát: AI có tự nhiên đề nghị bạn hỏi lại không?
4. Kiểm tra: Không còn cố định turn 3, 6, 9

### **Story Mission Test:**
1. Mở AI Tutor → Story Mission → Mission 1
2. Trả lời các câu hỏi về "First Day at School"
3. Quan sát: Around turn 5-7, AI có đề nghị bạn hỏi không?
4. Thử hỏi AI: "Do you like school?"
5. Xem AI trả lời thế nào

---

## ✅ **CHECKLIST HOÀN THÀNH:**

- ✅ Xóa logic cố định turns 3, 6, 9 ở Free Talk
- ✅ AI tự quyết định timing tự nhiên
- ✅ Prompt hướng dẫn AI mời học sinh hỏi một cách mượt mà
- ✅ Thêm logic tương tự cho Story Mission
- ✅ AI trả lời câu hỏi của học sinh chuyên nghiệp
- ✅ Không còn lặp lại "Can you ask me a question?"
- ✅ Flow hội thoại tự nhiên hơn nhiều

---

## 🚀 **NEXT STEPS:**

### **BẠN TEST NGAY (5 phút):**
1. Refresh browser: http://localhost:5177
2. Vào Free Talk → chat bình thường
3. Quan sát: AI có mời bạn hỏi TỰ NHIÊN không? (không còn cố định turn 3)
4. Vào Story Mission → chat
5. Xem AI có đề nghị bạn hỏi về mission topic không?

### **NẾU OK:**
✅ Mass production ready!

### **NẾU CÓ BUG:**
❌ Báo lại ngay để fix!

---

## 💡 **GHI CHÚ:**

**Tại sao không cố định turns nữa?**
- Mỗi học sinh khác nhau → timing khác nhau
- Hội thoại thật không có quy tắc cứng nhắc
- AI giờ thông minh hơn → biết đợi lúc phù hợp

**AI quyết định thế nào?**
- Sau 3-4 câu trả lời liên tiếp của học sinh
- Khi học sinh đã chia sẻ đủ thông tin
- Khi câu chuyện cần thay đổi hướng
- Không quá thường xuyên (tránh làm phiền)

**Học sinh vẫn luyện question forming?**
- ✅ CÓ! Nhưng tự nhiên hơn
- AI vẫn khuyến khích học sinh hỏi
- Chỉ là không ép buộc ở turn cố định

---

**SIGN-OFF:**
- ✅ Free Talk: Natural question-asking ✓
- ✅ Story Mission: Natural question-asking ✓
- ✅ No more forced turns 3, 6, 9 ✓
- ✅ Smooth conversation flow ✓

**Status:** Ready for testing on localhost:5177
