# Prompt Restoration Plan

## Vấn Đề Phát Hiện

Migration sang NovaEngine + promptLibraryV2 đã làm mất logic thông minh của AI:

### File CŨ (tutorPrompts.js - 293 lines) ✅ SMART:
- ✅ AI-driven conversation flow
- ✅ Dynamic question generation based on context
- ✅ Smart grammar rules by week
- ✅ Natural topic flow
- ✅ Check conversation history before asking
- ✅ Build on previous answers
- ✅ Varied question templates

### File MỚI (promptLibraryV2.js + modules) ❌ TOO SIMPLE:
- ❌ Quá ngắn gọn (131 lines)
- ❌ Thiếu logic xử lý context
- ❌ Thiếu instruction chi tiết cho AI
- ❌ Không có grammar progression
- ❌ Không có conversation history checking
- ❌ Generic templates (không intelligent)

## Giải Pháp

### Option 1: RESTORE FULL OLD SYSTEM ✅ RECOMMENDED
Thay thế promptLibraryV2.js bằng tutorPrompts.js (đã restore)

**Pros:**
- Logic AI thông minh, đã test kỹ
- Grammar progression rõ ràng
- Natural conversation flow
- Context-aware question generation

**Cons:**
- Bỏ architecture mới (modular)
- Quay lại file lớn hơn (293 lines)

**Implementation:**
1. Update novaEngine.js import tutorPrompts_RESTORED.js
2. Update function calls phù hợp
3. Test với Story Mission và Free Talk

### Option 2: ENHANCE V2 MODULES ⚠️ TIME-CONSUMING
Giữ architecture V2, nhưng thêm logic từ old version

**Pros:**
- Giữ architecture modular
- Token-efficient structure

**Cons:**
- Mất nhiều thời gian
- Risk cao (phải viết lại logic)
- Chưa test

## Quyết Định

**CHỌN OPTION 1: RESTORE FULL OLD SYSTEM**

### Lý do:
1. Old system đã hoạt động tốt (evidence from backup)
2. Logic AI-driven conversation đã được verify
3. Fast recovery (2-3 hours vs 1-2 days)
4. Lower risk
5. Production-ready ngay

### Implementation Steps:

#### Step 1: Update NovaEngine imports
```javascript
// BEFORE (novaEngine.js line 20)
import { buildStoryPrompt, buildFreeTalkPrompt, buildGenericPrompt } from './promptLibraryV2.js';

// AFTER
import { buildPrompt } from './tutorPrompts_RESTORED.js';
```

#### Step 2: Update NovaEngine prompt building
```javascript
// BEFORE
const systemPrompt = buildStoryPrompt({ 
  weekData, 
  userName, 
  userAge, 
  missionId 
});

// AFTER  
const systemPrompt = buildPrompt('story', context, userInput, {
  mission: currentMission,
  storyHistory: chatHistory
});
```

#### Step 3: Rename file
```bash
mv src/services/ai_tutor/tutorPrompts_RESTORED.js src/services/ai_tutor/tutorPrompts.js
```

#### Step 4: Archive V2 system
```bash
mkdir -p src/legacy_archive/prompts_v2
mv src/services/ai_tutor/promptLibraryV2.js src/legacy_archive/prompts_v2/
mv src/services/ai_tutor/prompts/* src/legacy_archive/prompts_v2/
```

#### Step 5: Test thoroughly
- Test Story Mission conversations
- Test Free Talk conversations  
- Test Quiz mode
- Test Debate mode
- Verify grammar constraints work
- Verify hint generation quality

## Expected Improvements After Restoration

### Story Mission:
- ✅ AI checks conversation history before asking
- ✅ Never repeats questions
- ✅ Builds on previous answers naturally
- ✅ Follows mission objectives
- ✅ Grammar scope enforced by week

### Free Talk:
- ✅ 8-14 turn structure enforced
- ✅ Varied question templates
- ✅ Memory of previous answers
- ✅ Natural topic progression
- ✅ Proper closing at turn 14

### All Modes:
- ✅ Smart hint generation (answer options + connecting words)
- ✅ Recast technique properly applied
- ✅ Week-specific grammar rules
- ✅ Context-aware responses
- ✅ Natural conversation flow

## Timeline

- Step 1-4: 1 hour
- Step 5 (Testing): 2 hours
- **Total: 3 hours to full restoration**

## Success Criteria

After restoration, AI should:
1. Ask intelligent, context-aware questions
2. Never repeat questions from history
3. Build on previous student answers
4. Follow mission objectives naturally
5. Enforce grammar scope by week
6. Generate helpful, topic-relevant hints
7. Close conversations naturally

## Rollback Plan

If restoration fails:
1. Keep V2 backup in legacy_archive
2. Can restore V2 anytime
3. Keep both tutorPrompts_RESTORED.js and promptLibraryV2.js for comparison
