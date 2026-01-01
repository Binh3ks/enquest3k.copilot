# IMAGE GENERATION STRATEGY - UPDATED (Dec 30, 2025)

## CORRECTION: Pricing Information Update

**Previous information was INCORRECT.** Imagen 3 Fast @ $0.01 does NOT exist in Google's API.

## Available Options (Dec 2025)

### Option 1: Nano Banana / Gemini 3 Pro Image (FREE) 🍌

**What it is:**
- Free image generation in Google AI Studio / Gemini Chat
- Model: `gemini-3-pro-image-preview`
- The "Bananas" you saw in Gemini interface

**Pricing:**
- Free tier: Available with rate limits
- Paid tier: $0.134 per 1K/2K image (1024x1024 or 2048x2048)
- **For 144 weeks free tier:** $0 (if within limits)

**Rate Limits:**
- Free: Limited images per day (TBD - need to test)
- Paid: Higher limits

**Quality:**
- Resolution: 1024x1024 (1K) or 2048x2048 (2K) or 4096x4096 (4K)
- Style: Optimized for educational illustrations
- **Good enough for:** Vocabulary words, simple concepts

**How to use:**
1. **Manual:** Use Gemini Chat interface (Tạo hình ảnh button)
2. **Automated:** Use Gemini API with image generation endpoint
3. **Batch:** Script loop to generate + download images

**Pros:**
- ✅ **MIỄN PHÍ** (if within free limits)
- ✅ Same quality as Imagen 3
- ✅ Integrated with Gemini prompt engineering

**Cons:**
- ❌ Rate limits on free tier
- ❌ Need automation script (not batch_manager.js compatible)
- ❌ May require paid tier for 2,880 images

---

### Option 2: Imagen 3 (Current Implementation - Paid)

**What it is:**
- Google Vertex AI Imagen 3 API
- Model: `imagen-3.0-generate-002`
- Currently used in batch_manager.js

**Pricing:**
- **$0.03 per image** (NOT $0.02 as previously stated)
- 144 weeks: 2,880 images × $0.03 = **$86.40**

**Quality:**
- Resolution: 1024x1024 PNG
- Current Week 19 images: ~400-800KB per file
- Quality: High, suitable for educational use

**Pros:**
- ✅ Already integrated (batch_manager.js works)
- ✅ Reliable, production-ready
- ✅ Batch processing support
- ✅ Known quality level (Week 19 validated)

**Cons:**
- ❌ Costs $86.40 for 144 weeks
- ❌ Not the cheapest option

---

### Option 3: Imagen 4 Fast (Newer, Cheaper than Imagen 4)

**What it is:**
- Latest fast image generation model
- Model: `imagen-4.0-fast-generate-001`

**Pricing:**
- **$0.02 per image**
- 144 weeks: 2,880 images × $0.02 = **$57.60**

**Quality:**
- Resolution: 1024x1024
- Quality: Between Imagen 3 and Imagen 4
- **Better than Imagen 3** with faster generation

**Pros:**
- ✅ $28.80 cheaper than Imagen 3
- ✅ Better quality than Imagen 3
- ✅ Faster generation (good for batch)
- ✅ Compatible with batch_manager.js (just change model name)

**Cons:**
- ❌ Still costs money ($57.60)
- ❌ Need to test quality first

---

### Option 4: Imagen 4 Standard (Highest Quality)

**What it is:**
- Latest standard quality image model
- Model: `imagen-4.0-generate-001`

**Pricing:**
- **$0.04 per image**
- 144 weeks: 2,880 images × $0.04 = **$115.20**

**Quality:**
- Highest quality available
- Photorealistic rendering
- Best text rendering

**Pros:**
- ✅ Best quality
- ✅ Best for complex scenes

**Cons:**
- ❌ **2x cost** vs Imagen 4 Fast
- ❌ **Overkill** for simple vocab images
- ❌ NOT RECOMMENDED for this app

---

## Cost Comparison Table

| Option | Cost/Image | Total (144 weeks) | Quality | Speed | Free Option? |
|--------|-----------|------------------|---------|-------|-------------|
| **Nano Banana (Free)** | **$0** | **$0*** | Good | Normal | **✅ YES** |
| Nano Banana (Paid) | $0.134 | $385.92 | Good | Normal | ❌ |
| Imagen 4 Fast | $0.02 | $57.60 | Better | Fast | ❌ |
| Imagen 3 (Current) | $0.03 | $86.40 | Good | Normal | ❌ |
| Imagen 4 Standard | $0.04 | $115.20 | Best | Slow | ❌ |

*If within free tier rate limits

---

## RECOMMENDED STRATEGY

### Phase 1: Test Nano Banana Free Tier (Week 1-5)

**Goal:** Determine if free tier is sufficient

**Steps:**
1. Create automation script: `tools/generate_nano_banana_images.js`
2. Use Gemini API with free tier
3. Generate images for Weeks 1-5 (100 images)
4. Track rate limits and daily caps
5. Compare quality with current Imagen 3 images

**Success Criteria:**
- ✅ Can generate 20 images/day consistently
- ✅ Quality matches or exceeds Week 19 images
- ✅ No blocking errors

**If successful:** Continue with Nano Banana free tier for all 144 weeks

**If rate-limited:** Move to Phase 2

---

### Phase 2: Switch to Imagen 4 Fast (Week 6+)

**If free tier insufficient:**

**Update batch_manager.js:**
```javascript
// Line 14 - Change model
const API_MODEL = "imagen-4.0-fast-generate-001"; // Imagen 4 Fast ($0.02/img)
```

**Cost for remaining weeks:**
- Weeks 6-144: 139 weeks × 20 images = 2,780 images
- Cost: 2,780 × $0.02 = **$55.60**

**Total cost (Phase 1 + 2):** $0 + $55.60 = **$55.60**

**Savings vs Imagen 3:** $86.40 - $55.60 = **$30.80 saved (36%)**

---

### Phase 3: Hybrid Strategy (BEST)

**Maximize free tier, minimize paid costs:**

**Workflow:**
1. **Daily free quota:** Use Nano Banana free tier (10-20 images/day)
2. **Batch processing:** Use Imagen 4 Fast for bulk generation
3. **Critical images:** Use Imagen 4 Standard for cover images only

**Example Week:**
- Cover images (2): Imagen 4 Standard ($0.08)
- Vocab images (10): Nano Banana Free ($0)
- Word Power images (3): Imagen 4 Fast ($0.06)
- **Total per week:** $0.14 (vs $0.60 Imagen 3)

**Total for 144 weeks:** ~$20-30 (depending on free tier usage)

---

## STORY MISSION AUDIO - CORRECTED STRATEGY

### Problem Identified

**User is RIGHT:** Text is NOT fixed due to placeholders:
```javascript
aiPrompt: "{{name}}! What a cool name! I once had a student named {{name}}..."
```

### CANNOT Pre-Generate Audio

**Why:**
- Each student has different name, age, teacher, subject
- Placeholders change per user
- Pre-recorded audio would say "bracket bracket name bracket bracket"

### SOLUTION: Runtime TTS

**Architecture:**
```javascript
// StoryMissionEngine.js - Generate audio at runtime
async start() {
  const step = this.mission.steps[0];
  
  // 1. Replace placeholders with actual context
  const personalizedText = step.aiPrompt
    .replace(/{{name}}/g, this.state.studentContext.name)
    .replace(/{{age}}/g, this.state.studentContext.age)
    .replace(/{{teacherName}}/g, this.state.studentContext.teacherName)
    .replace(/{{subject}}/g, this.state.studentContext.subject);
  
  // 2. Generate TTS audio on-the-fly
  const audioBlob = await generateTTS(personalizedText, {
    voice: 'nova',  // OpenAI TTS
    speed: 1.0
  });
  
  // 3. Play audio
  await playAudio(audioBlob);
  
  return {
    story_beat: personalizedText,
    task: step.expected.type === "short_answer" ? "What is your name?" : "",
    scaffold: { hints: step.hints }
  };
}
```

**TTS Options:**

| Provider | Cost | Quality | Speed | Voice |
|----------|------|---------|-------|-------|
| OpenAI TTS | $15/1M chars | Excellent | Fast | nova (female) |
| Google TTS Neural2 | $16/1M chars, FREE 1M/month | Good | Fast | en-US-Neural2-F |
| ElevenLabs | $22/1M chars | Best | Medium | Custom voices |

**Recommended:** OpenAI TTS with `nova` voice (warm, educational tone matching Ms. Nova personality)

**Cost Estimate:**
- Average beat: 45 words = ~200 characters
- Per mission: 6-8 beats × 200 chars = 1,200-1,600 chars
- Per student completing all 432 missions: ~600,000 chars
- **100 students:** 60M chars = $0.90 (OpenAI TTS)
- **1,000 students:** 600M chars = $9.00

**Implementation:**
```javascript
// tools/tts_realtime.js
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateStoryMissionAudio(text, options = {}) {
  const response = await openai.audio.speech.create({
    model: 'tts-1',  // or 'tts-1-hd' for higher quality
    voice: options.voice || 'nova',
    input: text,
    speed: options.speed || 1.0
  });
  
  const audioBuffer = Buffer.from(await response.arrayBuffer());
  return audioBuffer;
}
```

**UI Integration:**
```jsx
// StoryMissionTab.jsx
const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

const handleGenerateAudio = async (text) => {
  setIsGeneratingAudio(true);
  try {
    const audioBlob = await generateStoryMissionAudio(text);
    const audioUrl = URL.createObjectURL(audioBlob);
    audioRef.current.src = audioUrl;
    await audioRef.current.play();
  } catch (error) {
    console.error('TTS failed:', error);
    // Fallback: Show text without audio
  } finally {
    setIsGeneratingAudio(false);
  }
};
```

**Cache Strategy (Optional):**
- Cache common phrases: "What's your name?", "How old are you?"
- Only generate unique parts with placeholders
- Reduces TTS calls by ~30%

---

## VALIDATION MISSION - PURPOSE

**Script:** `tools/validate_missions.js`

**What it does:**
Checks mission data structure BEFORE generating assets (audio/images)

**10 Validation Checks:**

1. **File Existence**
   ```bash
   ✅ week1_easy.js exists
   ✅ week1_normal.js exists
   ✅ week1_challenge.js exists
   ```

2. **Step Count**
   ```bash
   ✅ Easy: 6 steps (correct)
   ✅ Normal: 6 steps (correct)
   ✅ Challenge: 8 steps (correct)
   ```

3. **Word Count (AI Beats)**
   ```bash
   ✅ Step 1: 42 words (within 30-50 range)
   ❌ Step 3: 25 words (TOO SHORT, need 30+)
   ```

4. **Vocabulary Scope**
   ```bash
   ✅ All words from Week 1 syllabus only
   ❌ Found "archaeologist" (Week 19 word, not allowed in Week 1)
   ```

5. **Grammar Scope**
   ```bash
   ✅ Only present simple used
   ❌ Found past tense "went" (not allowed until Week 10)
   ```

6. **Scaffold Completeness**
   ```bash
   ✅ hints: ["My", "name", "is"]
   ✅ repair: "Try saying: My name is ___"
   ✅ modelSentence: "My name is Alex."
   ✅ modelModify: "Now say YOUR name..."
   ```

7. **Success Criteria**
   ```bash
   ✅ mustUseWords: ["name", "my", "is"] (4+ words required)
   ❌ mustUseWords: ["name"] (TOO FEW, need 4+)
   ```

8. **Placeholders**
   ```bash
   ✅ {{name}} used correctly
   ✅ {{age}} used correctly
   ❌ {{favorite_color}} (INVALID placeholder, not in schema)
   ```

9. **Personality Elements**
   ```bash
   ✅ Emoji found: 🌟
   ✅ Dad joke found: "You know what?"
   ❌ No personality detected (text too formal)
   ```

10. **Schema Compliance**
    ```bash
    ✅ Matches missionSchema.js structure
    ❌ Missing field: expected.type
    ```

**Exit Codes:**
- `0`: All validations passed ✅
- `1`: One or more validations failed ❌

**Usage:**
```bash
# Validate single week
node tools/validate_missions.js 1

# Validate range
node tools/validate_missions.js 1 20

# Validate all
node tools/validate_missions.js --all
```

**Why it's important:**
- Prevents generating audio for bad text (wasted TTS calls)
- Prevents generating images for wrong vocabulary
- Catches errors early (before mass production)
- Ensures consistency across 144 weeks

---

## ACTION ITEMS

### Immediate (This Week):

1. **Test Nano Banana Free Tier**
   - [ ] Create Google AI Studio project
   - [ ] Test image generation (10 vocab words)
   - [ ] Document rate limits
   - [ ] Compare quality with Week 19 images

2. **Remove Pricing from Prompt V23**
   - [ ] Delete Section 8.1-8.6 pricing content
   - [ ] Move to separate `COST_ANALYSIS.md`
   - [ ] Keep only data structure + workflow info

3. **Update Story Mission Audio Strategy**
   - [ ] Remove `create_story_mission_audio_tasks.js` plan
   - [ ] Implement `generateStoryMissionAudio()` runtime TTS
   - [ ] Update `StoryMissionEngine.js` to call TTS
   - [ ] Test with Week 1 mission

4. **Create Validation Script**
   - [ ] Build `tools/validate_missions.js`
   - [ ] Test with Week 1 data
   - [ ] Document all 10 checks

### Next Week:

5. **Decide on Image Strategy**
   - [ ] If Nano Banana works: Scale to Week 2-5
   - [ ] If rate-limited: Switch to Imagen 4 Fast
   - [ ] Update batch_manager.js accordingly

6. **Mass Production Prep**
   - [ ] Finalize validation checklist
   - [ ] Create generation workflow script
   - [ ] Test end-to-end for Week 2

---

## SUMMARY

**Key Corrections:**
1. ✅ "Bananas" = Nano Banana (FREE option exists!)
2. ✅ Imagen 3 Fast @ $0.01 does NOT exist (I was wrong)
3. ✅ Story Mission audio MUST be runtime TTS (not pre-generated)
4. ✅ Pricing info should NOT be in Master Prompt V23

**Best Strategy:**
- **Images:** Test Nano Banana free, fallback to Imagen 4 Fast
- **Audio:** Runtime TTS with OpenAI `nova` voice
- **Cost:** $0-30 for images + $9-90 for audio (per 1000 students)
