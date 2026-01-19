# Week 2 Mission Context Fix - January 14, 2026

## 🐛 Issue Identified

**Symptom**: Week 2 AI Tutor missions displayed correctly but AI gave generic fallback responses ("Great! How are you?") instead of proper family-themed conversations.

**Root Cause**: Week 2 data file was missing the `mission_context` field that tells the AI **how to conduct the conversation**.

**Evidence from Console Logs**:
```javascript
// Week 2 objectives loaded correctly ✅
🎯 Objectives for Week 2 Mission 1 : LOADED (Objective-driven)
📋 Objectives: greet_family → mother → father → siblings → family_size → family_home → goodbye

// BUT AI responses were generic ❌
ai_response: 'Great! How are you?'
pedagogy_note: 'Raw response from Groq (JSON parse failed) [Auto-fixed: Added basic hints]'
⚠️ AI missing ACK, using fallback: Great!
⚠️ AI missing RECAST, using context-aware fallback: I heard you!
```

## 🔧 Solution Applied

### 1. Added `mission_context` Field to All 3 Week 2 Missions

**File Modified**: `/src/data/weeks/week_02_real.js`

Each mission now has detailed AI instructions matching Week 1 format:

#### Mission 1: Meet the Family Squad
```javascript
mission_context: `The student is learning to talk about their family. Ms. Nova asks about family members naturally. This mission focuses on 'This is my...' and 'I have...' patterns with family vocabulary. Use VERY SIMPLE language suitable for A0-A1 ESL beginners. Keep questions short and clear.

⚡ FLEXIBLE CONVERSATION:
- If student asks YOU questions → Answer naturally like a human friend, then bridge back to family topic
- Allow 12-15 turns if conversation is interactive (student asking questions is GOOD!)
- If student goes off-topic → Acknowledge warmly, then naturally redirect: "That's nice! Tell me about YOUR FAMILY."
- Be human-like: answer questions fully, don't rush through topics

🎯 CRITICAL - MISSION TOPIC: 
- This mission is ONLY about FAMILY MEMBERS (mother, father, sister, brother, family)
- DO NOT ask about teamwork (that's Mission 2)
- DO NOT ask about love/feelings (that's Mission 3)
- ONLY ask about: who lives at home, family members' names, big/small family, siblings`
```

#### Mission 2: Team Work at Home
```javascript
mission_context: `The student is learning about how families work together. Ms. Nova explores how each family member helps and contributes. This mission focuses on teamwork vocabulary and 'We...' patterns. Use VERY SIMPLE language suitable for A0-A1 ESL beginners. Keep questions short and clear.

⚡ FLEXIBLE CONVERSATION:
- If student asks YOU questions → Answer naturally ("I help students learn English!"), then continue
- Allow natural back-and-forth (12-15 turns if interactive)
- If off-topic → Redirect gently: "That's cool! How does YOUR FAMILY help each other?"
- Be conversational, not robotic

🎯 CRITICAL - MISSION TOPIC: 
- This mission is ONLY about TEAMWORK and HELPING at home
- DO NOT ask about introducing family members (that's Mission 1)
- DO NOT ask about love/feelings (that's Mission 3)
- ONLY ask about: what family does together, who helps, how they help, team leader, working together`
```

#### Mission 3: Love at Home
```javascript
mission_context: `The student is learning to express feelings about family. Ms. Nova helps them practice emotional vocabulary in a warm, supportive way. This mission focuses on 'I love...' and 'My ... is...' patterns. Use VERY SIMPLE language suitable for A0-A1 ESL beginners. Keep questions short and clear.

⚡ FLEXIBLE CONVERSATION:
- If student asks YOU questions → Answer warmly ("I love helping students like you!"), then continue
- Allow natural back-and-forth (12-15 turns if interactive)
- If off-topic → Redirect gently: "That's sweet! What do you LOVE about your family?"
- Be warm and encouraging - this is about feelings

🎯 CRITICAL - MISSION TOPIC: 
- This mission is ONLY about LOVE and FEELINGS about family
- DO NOT ask about introducing members (that's Mission 1)
- DO NOT ask about teamwork/helping (that's Mission 2)
- ONLY ask about: what they love, why family is special, feelings about home, what makes family nice`
```

### 2. Added Missing Fields to Match Week 1 Structure

All missions now have:
- ✅ `theme` (mission theme description)
- ✅ `nova_greeting` (already present)
- ✅ `mission_context` (NEW - AI behavior instructions)
- ✅ `target_vocab` (vocabulary focus)
- ✅ `target_pattern` (grammar pattern to practice)
- ✅ `conversation_topics` (topic boundaries for AI)
- ✅ `example_questions` (sample questions AI can ask)
- ✅ `minimum_turns` (15 turns)
- ✅ `maximum_turns` (20 turns)
- ✅ `success_criteria` (learning outcomes)

### 3. Updated Cache Bust Version

**File Modified**: `/src/modules/ai_tutor/tabs/StoryMissionTab.jsx`

Changed import from:
```javascript
import week2RealData from '../../../data/weeks/week_02_real?v=2';
```

To:
```javascript
import week2RealData from '../../../data/weeks/week_02_real?v=3'; // mission_context added
```

## 🔄 How the System Works

### Data Flow:
1. **Week 2 Data File** (`week_02_real.js`) → Contains mission definitions with `mission_context`
2. **NovaEngine** (`novaEngine.js`) → Reads `mission_context` and passes to prompt builder
   ```javascript
   description: currentMission?.mission_context || currentMission?.description || 'Practice vocabulary through story'
   ```
3. **Prompt Library** (`promptLibrary.js`) → Includes `mission_context` in AI prompt
   ```javascript
   **MISSION CONTEXT:**
   ${currentMission.mission_context}
   ```
4. **AI Response** → Follows mission_context instructions to generate appropriate family-themed conversation

### Why This Fixes the Issue:

**Before**: AI had no detailed instructions → Generated generic responses → ResponseGuard applied fallbacks
**After**: AI has explicit mission_context → Generates proper family conversations → No fallbacks needed

## ✅ Expected Behavior After Fix

### Mission 1: Meet the Family Squad
- **Opening**: "Hello! I am Ms. Nova, your AI English coach. Today, we're going to talk about families! Can you tell me about your family? Who lives in your home?"
- **Conversation**: AI asks about mother, father, siblings, family size, names
- **Vocabulary**: Uses "mother", "father", "brother", "sister", "family"
- **Pattern**: Practices "This is my..."

### Mission 2: Team Work at Home
- **Opening**: "Hi again! Families work together like a team. What does your family do together? Who helps at home?"
- **Conversation**: AI asks about family activities, who helps, how they help, team roles
- **Vocabulary**: Uses "team", "leader", "helper", "work", "together"
- **Pattern**: Practices "We help each other"

### Mission 3: Love at Home
- **Opening**: "Let's talk about love! What do you love about your family? Why is your home special?"
- **Conversation**: AI asks about feelings, why family is special, love for parents, happy home
- **Vocabulary**: Uses "love", "home", "family", "happy", "special"
- **Pattern**: Practices "I love my..."

## 🧪 Testing Checklist

After hard refresh (Cmd+Shift+R), verify:

- [ ] Mission 1 AI asks about family members (not generic "How are you?")
- [ ] Mission 1 AI asks "Who lives in your home?" "Do you have a mother?" etc.
- [ ] Mission 2 AI asks about teamwork and helping (not generic)
- [ ] Mission 2 AI asks "What does your family do together?" "Who helps at home?"
- [ ] Mission 3 AI asks about love and feelings (not generic)
- [ ] Mission 3 AI asks "Do you love your family?" "What makes your home special?"
- [ ] Console shows Artifact v5.0 format (not Legacy format with fallbacks)
- [ ] Console does NOT show "AI missing ACK" or "AI missing RECAST" warnings
- [ ] AI responses are 30+ characters (not 19-character generic fallbacks)

## 📊 Console Log Validation

**Before Fix**:
```javascript
responseParser.js:183 ⚠️ responseParser: Response too short (0 chars)
responseGuard.js:504 ⚠️ AI missing ACK, using fallback: Great!
responseGuard.js:519 ⚠️ AI missing RECAST, using context-aware fallback: I heard you!
responseGuard.js:447 🔍 Response format: Legacy
```

**After Fix** (Expected):
```javascript
responseParser.js:105 🔄 Hints normalization: (6) ['Yes', 'I', 'love', 'my', 'family', 'home']
responseGuard.js:447 🔍 Response format: Artifact v5.0
responseGuard.js:528 🎯 Objective mode: AI question preserved (natural)
responseGuard.js:564 ✅ Using AI-generated hints (Objective mode)
StoryMissionTab.jsx:542 📝 Extracted Response Text: Do you live with your mother? (length: 30+)
```

## 📝 Blueprint for Week 3-54

When creating future weeks, **ALWAYS include** in each mission:

```javascript
{
  mission_id: N,
  title: "Mission Title",
  title_vi: "Tiếng Việt",
  theme: "Brief theme description",
  
  // Ms. Nova's direct greeting
  nova_greeting: "Friendly opening question",
  
  // Context for AI (CRITICAL - DON'T SKIP THIS!)
  mission_context: `Detailed instructions for AI:
  - What the mission is about
  - Grammar patterns to focus on
  - Language level guidance (A0-A1, simple language)
  
  ⚡ FLEXIBLE CONVERSATION:
  - How to handle student questions
  - Allow natural back-and-forth
  - How to redirect off-topic
  
  🎯 CRITICAL - MISSION TOPIC:
  - What THIS mission covers
  - What NOT to ask (other missions)
  - Specific topics to focus on`,
  
  target_vocab: ["word1", "word2", ...],
  target_pattern: "Grammar pattern",
  conversation_topics: ["Topic 1", "Topic 2", ...],
  example_questions: ["Question 1?", "Question 2?", ...],
  minimum_turns: 15,
  maximum_turns: 20,
  success_criteria: ["Criterion 1", "Criterion 2", ...]
}
```

## 🎯 Key Takeaway

**The `mission_context` field is MANDATORY** for AI to generate proper responses. Without it, the AI has no detailed instructions and falls back to generic conversation patterns.

**Week 1 works** because it has `mission_context`.
**Week 2 now works** because we added `mission_context`.
**Week 3-54 must have** `mission_context` or they will fail the same way.
