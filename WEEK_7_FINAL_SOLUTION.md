# WEEK 7 AI TUTOR - GIẢI PHÁP CUỐI CÙNG

## VẤN ĐỀ GỐC RỄ

AI tự ý tạo câu hỏi NGOÀI kịch bản:
- ❌ "What do you think?" (không có trong objectives/roleplay)
- ❌ "How do you feel?" 
- ❌ "What can I help you with today?"
- ❌ Hỏi tên dù đã ở tuần 7

**Nguyên nhân**: `mission_context` và `guide_rules` KHÔNG ĐỦ STRICT!

## GIẢI PHÁP ÁP DỤNG

### 1. MISSION CONTEXT - Thêm FORBIDDEN List

**Mission 1 - What's in My Backpack:**
```
STRICT GAME RULES:
1. ONLY ask about items IN STUDENT'S BACKPACK
2. Student MUST say: "There is a [item] in my backpack"
3. If yes/no only → prompt full sentence
4. ONE item per question

FORBIDDEN - NEVER ASK:
- "What do you think?" ❌
- "How do you feel?" ❌
- "Do you like...?" ❌
- Personal questions ❌
- Yes/No without grammar practice ❌

ALLOWED QUESTIONS ONLY:
- "What is in your backpack?"
- "Is there a [item]?"
- "Where is your [item]?"
```

**Mission 2 - Classroom Discovery:**
```
STRICT GAME MECHANIC:
1. Point at ONE object
2. Ask: "What is this?"
3. Student: "There is a [item]"
4. "Good!" → Next object
5. REPEAT

FORBIDDEN - NEVER ASK:
- "What do you think?" ❌
- "Do you like classrooms?" ❌
- Personal opinions ❌
- Conversation beyond game ❌

ALLOWED ONLY:
- "(Point) What is this?"
- "(Point) What do you see?"
```

**Mission 3 - Packing Backpack:**
```
STRICT GAME MECHANIC:
1. Name ONE item
2. Student confirms: "There is a..."
3. "Good! Next item..."
4. Continue checklist

FORBIDDEN - NEVER ASK:
- "What do you think?" ❌
- "Do you like...?" ❌
- "Are you ready?" ❌
- Personal feelings ❌

ALLOWED ONLY:
- "Is there a [item]?"
- "Do you have a [item]?"
```

### 2. ROLEPLAY SCENARIOS - Guide Rules STRICT

**Backpack Checker:**
```javascript
guide_rules: "STRICT CHECKLIST GAME: Ask ONE item. Wait for 'There is a...' 
Pattern: 'Is there a [item]?' → Student: 'There is a...' → 'Great!' → Next item. 
FORBIDDEN: Do NOT ask 'What do you think?', 'Do you like...?'. 
STAY IN CHECKLIST MODE!"
```

**Classroom Pointer:**
```javascript
guide_rules: "STRICT POINTING GAME: Point ONE object. Ask 'What is this?'. 
Pattern: Point → 'What is this?' → Student: 'There is a...' → 'Good!' → Next. 
FORBIDDEN: Do NOT ask 'What do you think?', 'How are you?'. 
ONLY point and ask 'What is this?'!"
```

**Supply Shopping:**
```javascript
opening_line: "Welcome to School Supply Shop! What do you need? A pen, a notebook, or a ruler? Choose one!"

guide_rules: "STRICT SHOPPING MODE: Ask what student needs. Then ask details: 'What color?' or 'How many?'. 
ONE item at a time! 
FORBIDDEN: Do NOT ask 'What do you think?', 'What can I help you with?'. 
ONLY ask about specific items and details!"
```

**Classroom Helper:**
```javascript
opening_line: "Oh no! I lost my pen! Where is it? On the desk, in the drawer, or under the chair? Tell me: There is a pen..."

guide_rules: "STRICT FINDING GAME: Ask find ONE item. 
Pattern: 'Where is my [item]?' → Student: 'There is a... on/in...' → 'Thank you!' → Next. 
FORBIDDEN: Do NOT ask 'What can I do for you?', 'What do you think?'. 
ONLY ask 'Where is my [item]?'!"
```

## TẠI SAO WEEK 5 HOẠT ĐỘNG TỐT?

### Week 5 Mission 2 Context:
```javascript
mission_context: `STRICT GAME RULES:
1. Ms. Nova ONLY shines flashlight and asks "What is this?"
2. Student MUST answer: "There is a/an [object]"
3. Ms. Nova corrects a/an errors immediately
4. Then shine on NEXT object

FORBIDDEN:
- Do NOT ask personal questions (age, name, feelings)
- Do NOT change topic
- STAY IN CHARACTER as flashlight explorer

GRAMMAR ENFORCEMENT: Every answer must use "There is a/an..."
`
```

**Điểm khác biệt:**
- ✅ FORBIDDEN list RÕ RÀNG
- ✅ Pattern được định rõ từng bước
- ✅ "STAY IN CHARACTER" / "STAY IN GAME MODE"
- ✅ Không cho phép đổi topic

## KIỂM TRA

### ✅ Expected Behavior:

**Mission 2 - Pointing Game:**
```
AI: "Hi! I'm Ms. Nova! Look at the front! There is a whiteboard here. Do you see it?"
Student: "yes"
AI: "Yes! Good! (Point 👉 at desk) What is this? There is a...?"
Student: "desk"
AI: "Say the full sentence: There is a desk!"
Student: "There is a desk"
AI: "Perfect! (Point 👉 at computer) What is this?"
```

**Roleplay - Classroom Helper:**
```
AI: "Oh no! I lost my pen! Where is it? On the desk, in the drawer, or under the chair?"
Student: "on the desk"
AI: "Say: There is a pen on the desk!"
Student: "There is a pen on the desk"
AI: "Thank you! Now... Where is my ruler? On the chair or in the drawer?"
```

### ❌ Should NEVER happen:

```
AI: "What do you think?" ❌
AI: "How do you feel?" ❌
AI: "What can I help you today?" ❌
AI: "Do you like classrooms?" (in pointing game) ❌
AI: breaks game to chat randomly ❌
```

## KẾT QUẢ MỌng ĐỢI

1. ✅ Tất cả 3 missions: Không hỏi tên, không hỏi cảm xúc
2. ✅ Tất cả 4 roleplays: Follow opening_line và backup_questions
3. ✅ AI chỉ hỏi theo ALLOWED list, không tự sáng tạo
4. ✅ Student thực hành "There is a..." trong mọi câu trả lời
5. ✅ Game flow mượt mà như Week 5

## TẠI SAO CÁCH NÀY HIỆU QUẢ?

**Triết lý thiết kế:**

Week 5 thành công vì:
1. **Constraint-based design**: AI bị giới hạn bởi FORBIDDEN list
2. **Pattern enforcement**: Mỗi game có pattern rõ ràng, bắt buộc
3. **Stay in character**: AI không được phép break character
4. **Example-driven**: Có example_answers trong story_arc

Week 7 ban đầu thất bại vì:
1. ❌ mission_context quá chung chung
2. ❌ Không có FORBIDDEN list
3. ❌ guide_rules không đủ strict
4. ❌ AI có quá nhiều tự do sáng tạo

**Bài học:**
> **AI cần CONSTRAINTS chặt chẽ, không phải freedom!**
> 
> Trong game-based learning, AI phải làm referee/game master STRICT, không phải là conversational partner tự do.

## FILES ĐÃ SỬA

1. [week_07_real.js](src/data/weeks/week_07_real.js)
   - Mission 1-3: mission_context with FORBIDDEN list
   - 4 roleplay_scenarios: STRICT guide_rules
   - Removed all name objectives

2. [clear_cache_week_7_test.html](clear_cache_week_7_test.html)
   - Updated test checklist

## NEXT STEPS

1. Clear cache: [clear_cache_week_7_test.html](clear_cache_week_7_test.html)
2. Test Mission 2: Should NOT ask "What do you think?"
3. Test Roleplay "Classroom Helper": Should start with "Oh no! I lost my pen!"
4. Verify AI stays in game mode throughout

---

**Status**: Ready for final testing! 🎯
