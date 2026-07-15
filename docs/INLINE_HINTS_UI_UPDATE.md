# Inline Hints UI Update - May 8, 2026

## Summary
Redesigned Video Challenge writing interface to show word/phrase hints **inline next to each blank** instead of requiring scroll to bottom. This improves UX by reducing cognitive load and scroll fatigue.

---

## ✨ NEW UI FEATURES:

### 1. **💡 Hint Button Per Blank**
- Each blank now has a small yellow 💡 button next to it
- Click to toggle popup with relevant words
- Active state: amber-500 with scale effect
- Inactive state: amber-100 hover effect

### 2. **Inline Popup Hints**
- Appears directly below the blank (no scroll needed!)
- Contains:
  - **🔄 Review words** (cumulative from previous week) - Blue badges
  - **📚 This week's words** (first 12 words) - Amber badges
  - **⚠️ Warning**: "Tự gõ vào ô trên, không click được!" (Type manually, no clicking!)
- Popup is z-50 with shadow-2xl for clear visibility
- Close button (✕) in top-right corner

### 3. **Wider Input Fields**
- Old: Fixed `w-24` (96px) - too narrow for phrases
- New: Dynamic width `min-w-[120px] max-w-[300px]`
- Auto-expands based on content: `width: ${Math.max(120, content.length * 10)}px`
- White background (`bg-white/80`) for better contrast
- Rounded corners with px-2 py-1 padding

### 4. **Info Banner (Top)**
- Blue gradient banner explaining inline hints
- Message: "Bấm nút 💡 bên cạnh mỗi ô để xem gợi ý từ"
- Replaces old metacognitive prompt about remembering last week

### 5. **Optional Full Vocab Bank (Hidden)**
- Collapsed by default with "📚 Xem tất cả từ vựng" toggle
- Shown in neutral slate colors (not prominent amber)
- Reference-only view (no click-to-insert in new design)

---

## 🎯 PEDAGOGICAL BENEFITS:

### **Reduced Cognitive Load**
- No need to remember words while scrolling
- Context-aware hints right where needed
- Visual proximity reduces working memory burden

### **Scaffolding Aligned with ZPD**
- Students choose when to reveal hints (metacognitive control)
- Inline position makes support feel "just-in-time"
- Still requires typing (no click-to-insert) = active processing

### **Better User Flow**
- Blank → Attempt → Stuck? → Click 💡 → See hints → Type → Continue
- No context switching between top/bottom of screen

### **Encourages Try-First Behavior**
- Hints are hidden by default per blank
- Must actively click to reveal
- Warning message reinforces manual typing

---

## 🔧 TECHNICAL CHANGES:

### **State Management:**
```javascript
const [activeBlankHint, setActiveBlankHint] = useState(null); // { frameIndex, blankIndex }
```
- Tracks which blank's hint popup is currently open
- Format: string `"${frameIndex}-${blankIndex}"` (e.g., "0-2" for frame 0, blank 2)
- Only one popup open at a time

### **Input Width Logic:**
```javascript
style={{ width: `${Math.max(120, (frameInputs[fi]?.[pi]?.length || 3) * 10)}px` }}
```
- Min 120px (fits short words like "walked")
- Max 300px (fits long phrases like "Last Saturday morning")
- Dynamic: 10px per character typed

### **Popup Positioning:**
```css
className="absolute top-full left-0 mt-2 z-50"
```
- `top-full`: Positioned below the input
- `left-0`: Left-aligned with blank
- `mt-2`: 8px gap for visual separation
- `z-50`: Above all other content

### **Word Distribution:**
- Shows first 12 words from `vocabulary_bank.words` array
- Shows up to 3 cumulative review words (if exists)
- All words are already shuffled + distractors mixed (per W26-31 data structure)

---

## 📐 UI SPECS:

### **Hint Button:**
- Size: `w-7 h-7` (28x28px)
- Emoji: 💡 (yellow bulb)
- Active: `bg-amber-500 text-white shadow-lg scale-110`
- Inactive: `bg-amber-100 text-amber-600 hover:bg-amber-200`

### **Popup:**
- Min width: 280px
- Max width: 400px
- Max height: 200px (scroll if needed)
- Border: 2px amber-300
- Shadow: shadow-2xl
- Padding: p-3

### **Word Badges:**
- Review words: `bg-blue-50 text-blue-800 border-blue-200`
- This week: `bg-amber-50 text-amber-900 border-amber-200`
- Font: text-xs (12px)
- Padding: px-2 py-1

### **Frame Container:**
- Old: `p-3` with gap-1
- New: `p-4` with gap-2 (more breathing room)
- Background unchanged: indigo-50 when filled, slate-50 when empty

---

## 🔄 BACKWARD COMPATIBILITY:

### **Data Structure:**
- **NO CHANGES** to writing.js files needed
- Uses existing `content.hints.vocabulary_bank.words` array
- Uses existing `cumulative_review_words` array
- Works with all W1-31 content

### **Global Vocab Bank:**
- Still available via "📚 Xem tất cả từ vựng" toggle
- Hidden by default (not prominent)
- Reference-only (no click-to-insert functionality)

### **Model Paragraph:**
- Unchanged - still works as before
- Shows below inline hints section

---

## 🚀 USER INTERACTION FLOW:

1. **Student sees blank:** `Last ___ [💡]`
2. **Tries to type:** Enters guess
3. **Stuck? Clicks 💡:** Popup appears with 8-12 words
4. **Reads hints:** Sees "Saturday", "Sunday", "Friday" options
5. **Types manually:** Enters "Saturday" into blank (must type, not click)
6. **Popup auto-closes:** Can click 💡 again to reopen if needed
7. **Moves to next blank:** Repeats process

---

## 📊 EXPECTED UX IMPROVEMENTS:

- **30-50% reduction** in scroll events during writing
- **Faster task completion** (no context switching)
- **Higher engagement** with hints (easier access)
- **Better mobile experience** (no long scroll on small screens)

---

## 🎨 VISUAL COMPARISON:

### **OLD UI:**
```
[Input: Last ___] [Input: I ___] [Input: to ___]
                    ↓ (scroll down)
[💡 Need help? Click for word bank]
   ↓ Click
[Big box with all 40 words, scroll again]
```

### **NEW UI:**
```
[Input: Last ___] [💡] ← Click here
          ↓ Popup opens right below
    [💡 Gợi ý: Saturday, Sunday, Friday, week...]
    
[Input: I ___] [💡]
[Input: to ___] [💡]
```

---

## 🧪 TESTING CHECKLIST:

- [✅] Build compiles without errors
- [ ] Test on desktop Chrome/Firefox/Safari
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Test with long phrases (Advanced mode W26-31)
- [ ] Test with cumulative review words (W27-31)
- [ ] Test popup positioning on last frame (shouldn't go off-screen)
- [ ] Test rapid clicking between different blanks
- [ ] Test typing long text in dynamic width input

---

## 📝 FUTURE ENHANCEMENTS:

### **Smart Word Filtering (v2.0):**
- Analyze blank context to show only relevant words
- E.g., verb blank → show only verbs
- Noun blank → show only nouns
- Requires NLP or manual tagging

### **Adaptive Hint Count:**
- W1-8 (HIGH): Show 5-6 words per blank (more support)
- W26+ (LOW): Show 8-12 words (current)
- W32+ (MINIMAL): Show 3-4 words (challenge)

### **Hint Usage Tracking:**
- Track how many times student clicks 💡
- Show encouragement: "You only used 2 hints this week! 🎉"
- Feed into Adaptive Fading system

### **Keyboard Shortcuts:**
- `Ctrl/Cmd + H`: Toggle hint for focused blank
- `Esc`: Close hint popup
- `Tab`: Move to next blank

---

## 📚 RELATED FILES:

- `/src/modules/video/VideoChallenge.jsx` - Main UI component
- `/src/data/weeks*/week_*/writing.js` - Content files (unchanged)
- `/docs/SCAFFOLDING_SYSTEM.md` - Pedagogical framework

---

**Commit:** [NEXT] feat(ui): Add inline hints per blank + wider inputs  
**Author:** GitHub Copilot AI Assistant  
**Date:** May 8, 2026  
**Build:** ✓ 7.04s success
