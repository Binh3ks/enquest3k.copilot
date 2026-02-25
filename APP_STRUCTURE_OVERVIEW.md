# ENGQUEST APP STRUCTURE - OVERVIEW (Jan 30, 2026)

## 📁 ROOT STRUCTURE
```
/Users/binhnguyen/Downloads/Engquest3k/
├── src/                    # Source code
│   ├── modules/           # Feature modules (AI Tutor, Games, etc.)
│   ├── services/          # Backend services (AI, TTS, API)
│   ├── stores/            # State management (Zustand)
│   ├── components/        # Reusable UI components
│   ├── config/            # Configuration files
│   ├── data/              # Week data, vocabulary, missions
│   └── utils/             # Helper functions
├── public/                # Static assets
├── assets/                # Voice models (Piper TTS)
└── scripts/               # Build & utility scripts
```

## 🎯 CORE ARCHITECTURE

### 1. **Entry Point**: [src/App.jsx](src/App.jsx)
- Router setup (React Router v6)
- Global layout with Sidebar
- Week-based navigation: `/week/:weekId/:tabKey`
- **AITutorWidget** mounted globally (floating button)

### 2. **State Management**: Zustand
- **useUserStore** ([src/stores/useUserStore.js](src/stores/useUserStore.js))
  - User authentication (login, register, guest)
  - Learning mode toggle
  - Profile management
  - Persisted to localStorage

- **tutorStore** ([src/services/ai_tutor/tutorStore.js](src/services/ai_tutor/tutorStore.js))
  - AI Tutor widget state (open/close)
  - Current tab (story, freetalk, speak, ask, debate)
  - Message history per tab
  - Active mission tracking

### 3. **AI Tutor Module** ([src/modules/ai_tutor/](src/modules/ai_tutor/))
```
ai_tutor/
├── AITutorWidget.jsx          # Global floating widget
├── components/
│   ├── FloatingButton.jsx     # Floating button to open widget
│   ├── TutorWindow.jsx        # Main tutor window (5 tabs)
│   └── ChatBubble.jsx         # Message display component
└── tabs/
    ├── StoryMissionTab.jsx    # Story mission (Oliver's School)
    ├── FreeTalkTab.jsx        # Free talk & games
    ├── SpeakMissionTab.jsx    # Speaking practice
    ├── AskAITab.jsx           # Ask AI questions
    └── DebateTab.jsx          # Debate practice
```

## 🤖 AI SYSTEM ARCHITECTURE

### **AI Router** ([src/services/ai_tutor/aiRouter.js](src/services/ai_tutor/aiRouter.js))
4-layer fallback chain (Updated Jan 30, 2026):
1. **Cerebras** (primary) - Llama 3.3 70B, ultra-fast ⚡⚡⚡
2. **Gemini** (backup 1) - Gemini 1.5 Flash, most reliable
3. **Groq** (backup 2) - Llama 3.3 70B, rate-limited (25 req/min)
4. **Together AI** (backup 3) - Llama 3.3 70B, 60 req/min

See [AI_PROVIDER_CONFIGURATION_JAN30.md](AI_PROVIDER_CONFIGURATION_JAN30.md) for details.

### **Response Flow**:
```
User Input → AI Router → AI Model → Response Guard → Display
                ↓
         freeTalkModes.js (game/roleplay prompts)
                ↓
         gamePromptBuilder.js (week vocab injection)
```

### **Response Guard** ([src/services/ai_tutor/utils/responseGuard.js](src/services/ai_tutor/utils/responseGuard.js))
- Parses JSON responses
- Extracts `ai_response` field
- Validates ACK + RECAST + QUESTION structure
- Removes banned phrases
- Enforces word limits

## 🎮 FREE TALK SYSTEM ([src/modules/ai_tutor/tabs/FreeTalkTab.jsx](src/modules/ai_tutor/tabs/FreeTalkTab.jsx))

### **Modes**:
1. **idle** - Waiting for user to start activity
2. **playing_game** - Word Chain, 20 Questions, Sentence Builder
3. **playing_roleplay** - Immersive scenarios (bedroom, kitchen, etc.)

### **Game System**:
- Prompt builder: [src/services/ai_tutor/gamePromptBuilder.js](src/services/ai_tutor/gamePromptBuilder.js)
- Game config: [src/config/gameAdaptation.js](src/config/gameAdaptation.js)
- Weekly vocabulary injection
- 20-turn limit with auto-ending

### **Response Processing**:
```javascript
aiResponse → guardResponseObject(aiResponse) → Extract text → Display
                                              ↓
                                   ai_response | ack+recast+question
```

## 🎤 TTS SYSTEM ([src/services/voiceService.js](src/services/voiceService.js))

### **4-Layer TTS Stack**:
1. **Piper TTS** (local, primary) - Lessac-high voice model
   - Server: python scripts/tts_server.py (port 8000)
   - Quality: Excellent, offline-capable
   - Cache: In-memory audio storage
2. **Gemini TTS** (backup 1) - Cloud fallback
3. **Web Speech API** (backup 2) - Browser SpeechSynthesis
4. **Silent** (last resort)

### **Voice Service API**:
```javascript
VoiceService.speak(text)           // Auto-play with cache
VoiceService.cleanTextForTTS(text) // Remove emojis, normalize
VoiceService.webFallback(text)     // Browser TTS fallback
```

## 📊 DATA STRUCTURE

### **Week Data** ([src/data/weeks/](src/data/weeks/))
```javascript
{
  week_id: 5,
  theme: "House & Rooms",
  target_vocab: ["bedroom", "kitchen", ...],
  stations: {
    read_explore: {...},
    vocab_power: {...},
    grammar_logic: {...}
  },
  mission_data: {
    steps: [...],
    story_character: {...}
  }
}
```

### **Mission System**:
- **Objective-driven**: Dynamic, AI-controlled flow
- **Step-based**: Fixed steps with canonical questions
- Turn manager: [src/services/ai_tutor/turnManager.js](src/services/ai_tutor/turnManager.js)

## 🐛 KNOWN ISSUES

### ✅ FIXED:
1. **Voice cache issue** - Audio not updating after model change
   - Fix: Added cache buster to voiceService.js

### ⚠️ IN PROGRESS:
2. **JSON display issue** - Game responses showing JSON object
   - Cause: AI returning nested JSON, guard not fully parsing
   - Status: Enhanced guardResponseObject to handle string responses
   - Next: Clear localStorage + test

## 🛠️ DEBUGGING TOOLS

### **Clear Storage**: [clear_all_jan30.html](clear_all_jan30.html)
- Clears localStorage, sessionStorage, cookies, IndexedDB
- Use when: Testing new features, clearing message history

### **Console Logs**:
- `🤖` - AI response data
- `🛡️` - Response guard processing
- `🎤` - TTS/voice service
- `🎮` - Game system
- `📝` - Message content

### **Dev Mode Features**:
- Pedagogy notes visible in chat
- Extended console logging
- TTS status indicators

## 🚀 STARTUP SEQUENCE

1. **Start Dev Server**:
   ```bash
   npm run dev
   ```

2. **Start TTS Server** (optional):
   ```bash
   python3 scripts/tts_server.py
   ```

3. **Access App**:
   - Main: http://localhost:5173
   - Redirects to: /week/1/read_explore

4. **Open AI Tutor**:
   - Click floating button (bottom right)
   - Select tab (Story, Chat, etc.)
   - Start conversation

## 📝 COMMON WORKFLOWS

### **Testing Game Response**:
1. Open FreeTalk tab
2. Click game button (Word Chain, 20 Questions)
3. Check console for:
   - `🤖 FreeTalk Full AI Response Object`
   - `🛡️ Guarded response keys`
   - `📝 FreeTalk Extracted Response Text`
4. Verify ChatBubble displays plain text (not JSON)

### **Debugging Voice Issues**:
1. Check TTS server: `ps -ef | grep tts_server`
2. Test endpoint: `curl http://localhost:8000/tts?text=hello`
3. Check cache: `ls public/audio/cache/`
4. Clear cache: `rm public/audio/cache/*.wav`

### **Clearing User State**:
1. Open [clear_all_jan30.html](clear_all_jan30.html)
2. Click "Clear All Storage"
3. Reload app
4. Login again (or guest mode)

## 🔑 KEY FILES TO KNOW

| File | Purpose |
|------|---------|
| [App.jsx](src/App.jsx) | Main entry point, routing |
| [AITutorWidget.jsx](src/modules/ai_tutor/AITutorWidget.jsx) | Global AI tutor widget |
| [FreeTalkTab.jsx](src/modules/ai_tutor/tabs/FreeTalkTab.jsx) | Free talk & games |
| [ChatBubble.jsx](src/modules/ai_tutor/components/ChatBubble.jsx) | Message display |
| [responseGuard.js](src/services/ai_tutor/utils/responseGuard.js) | Response validation |
| [voiceService.js](src/services/voiceService.js) | TTS management |
| [aiProviders.js](src/services/aiProviders.js) | AI provider routing |
| [tutorStore.js](src/services/ai_tutor/tutorStore.js) | AI tutor state |
| [gamePromptBuilder.js](src/services/ai_tutor/gamePromptBuilder.js) | Game prompt generation |
| [freeTalkModes.js](src/services/ai_tutor/freeTalkModes.js) | Game/roleplay prompts |

---

**Last Updated**: Jan 30, 2026
**Version**: V5 Premium (Artifact-based)
**Status**: Voice ✅ | JSON Issue ⚠️ In Progress
