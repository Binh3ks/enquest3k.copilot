# 🚀 AI TUTOR V5 - QUICK TESTING GUIDE

## ⚡ Start Server
```bash
npm run dev
```
Open: http://localhost:5175/

## 🎯 Test Widget (30 seconds)

1. **Click floating button** (purple circle, bottom-right) ✅
2. **Widget opens** with 5 tabs ✅

## 📝 Test Each Tab (2 minutes each)

### 1. 📖 Story Mission
- **Opens with:** "Hello! I'm Ms. Nova, your classmate! What is your name?"
- **Test:** Type your name → AI asks about classroom → Use "desk" or "teacher" → Mission advances
- **Listen for:** TTS voice playing automatically

### 2. 💬 Free Talk
- **Opens with:** Random greeting (e.g., "What makes you happy?")
- **Test:** Chat casually → AI responds naturally → Weaves in school vocabulary
- **Try:** Make grammar error → AI recasts without saying "wrong"

### 3. 🎤 Pronunciation
- **Opens with:** 10 Week 1 words
- **Test:** Click 🔊 button → Hear TTS → Click "Next" → Repeat
- **Check:** All 10 words: student, teacher, school, classroom, backpack, book, notebook, library, scientist, name

### 4. 🧠 Quiz
- **Opens with:** 5 multiple-choice questions
- **Test:** Answer questions → Get immediate feedback (visual + audio)
- **Check:** Score tracking, completion screen, reset button

### 5. 🗣️ Debate
- **Opens with:** School-themed opinion (e.g., "Science is the most interesting subject")
- **Test:** Click Agree/Disagree → Explain why → AI presents counter-argument
- **Check:** No judgment, celebrates reasoning

## ✅ Success Checklist

- [ ] Widget opens immediately when button clicked
- [ ] All 5 tabs switch without errors
- [ ] AI responds in 1-3 seconds (Groq fast!)
- [ ] TTS plays automatically on AI responses
- [ ] Conversations feel warm and encouraging
- [ ] No "wrong" or "incorrect" appears
- [ ] State persists when switching tabs

## 🐛 If Something Breaks

### Check Console (F12)
- Red errors? → API key issue
- Yellow warnings? → Safe to ignore

### API Keys
Check `API keys.txt` has:
- ✅ Groq API key (primary AI)
- ✅ Gemini API key (fallback AI)
- ✅ OpenAI API key (TTS fallback)

### Network Tab
- Failed API calls? → Check key validity
- Timeout? → Try Gemini fallback

### Restart Server
```bash
# Kill and restart
Ctrl+C
npm run dev
```

## 🎉 What's New vs. Before

| Before | After |
|--------|-------|
| Placeholder: "Welcome! Tell me your name!" | Real AI conversation with missions |
| No TTS | 4-layer TTS with auto-play |
| No Week 1 data | All 10 vocabulary words integrated |
| No Ms. Nova persona | Warm, encouraging, uses Recast |
| Static responses | Dynamic Groq/Gemini AI |

## 📊 Expected Performance

- **AI Response:** 1-3 seconds (Groq) / 3-5 seconds (Gemini fallback)
- **TTS Playback:** Instant (cached) / 1-2 seconds (generation)
- **Tab Switch:** <100ms
- **Widget Open/Close:** <50ms

## 🎯 Testing Scenarios

### Scenario 1: Complete Story Mission (5 minutes)
```
You: My name is Alex
AI: Nice to meet you, Alex! What do you see in your classroom?
You: I see desks and books
AI: Great! You used 'classroom'! What's in your backpack?
You: I have notebooks
AI: Wonderful! Do you go to the library?
You: Yes, I love reading
AI: What do you want to be when you grow up?
You: A scientist!
AI: Mission complete! 🎉
```

### Scenario 2: Test Recast (Free Talk)
```
You: I have 9 age
AI: Oh, you are 9 years old! That's a great age. (← Recast, no "wrong")
You: Yes, I like go school
AI: You like going to school! That's wonderful. What's your favorite subject?
```

### Scenario 3: Pronunciation Practice
- Click 🔊 for "student" → Hear /ˈstuːdənt/
- Click 🔊 for "library" → Hear /ˈlaɪbreri/
- Repeat for all 10 words
- Completion: "Great job! You practiced 10 words!"

### Scenario 4: Quiz All Correct
- Q1: "student" = Học sinh ✅
- Q2: "teacher" = Giáo viên ✅
- Q3: "library" = Thư viện ✅
- Q4: "backpack" = Ba lô ✅
- Q5: "scientist" = Nhà khoa học ✅
- Score: 5/5 → Trophy appears

### Scenario 5: Debate Different Opinions
```
AI: I think science is the most interesting subject. Do you agree?
You: I disagree because I like art more
AI: That's a great point! Art is so creative. But science helps us understand the world, right?
You: Yes, but art makes me feel happy
AI: You're absolutely right! Both are important! 🎨🔬
```

## 📦 Files to Review

### Core Files
- `src/modules/ai_tutor/AITutorWidget.jsx` - Widget orchestrator
- `src/modules/ai_tutor/tabs/StoryMissionTab.jsx` - Story with missions
- `src/modules/ai_tutor/tabs/FreeTalkTab.jsx` - Casual conversation
- `src/modules/ai_tutor/tabs/PronunciationTab.jsx` - Word practice
- `src/modules/ai_tutor/tabs/QuizTab.jsx` - Auto-generated quizzes
- `src/modules/ai_tutor/tabs/DebateTab.jsx` - Opinion sharing

### Services
- `src/services/ai_tutor/aiRouter.js` - Groq/Gemini routing
- `src/services/ai_tutor/ttsEngine.js` - 4-layer TTS
- `src/services/ai_tutor/tutorStore.js` - Global state
- `src/services/ai_tutor/promptLibrary.js` - Ms. Nova prompts

### Data
- `src/data/weeks/week_01/vocab.js` - 10 vocabulary words
- `src/data/weeks/week_01/read.js` - "Alex's School Day" story
- `src/data/weeks/week_01/index.js` - Week data aggregator

## 🎉 Result

✅ All 5 tabs fully functional  
✅ Week 1 syllabus integrated  
✅ Ms. Nova persona active  
✅ Groq/Gemini AI working  
✅ TTS auto-play enabled  
✅ Recast technique implemented  

**Status:** READY FOR PRODUCTION TESTING 🚀

---

**Quick Test:** Open http://localhost:5175/ → Click floating button → Click each tab → Chat naturally → Enjoy! 😊
