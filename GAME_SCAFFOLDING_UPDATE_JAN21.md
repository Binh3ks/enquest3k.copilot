# Week 5 Game Scaffolding Update - Jan 21, 2026

## Issues Found During Testing

### 1. **Word Chain** - Not using Week 5 vocabulary
- AI said "Rainbow" instead of house-related words
- Didn't explain rules clearly
- No scaffolding/hints for young children

### 2. **20 Questions** - Not enough guidance
- Children couldn't guess without hints
- Need structured progression of clues

### 3. **Sentence Builder** - Too open-ended
- Need specific word choices
- Require clearer pattern guidance

## Solutions Implemented

### Updated `gamePromptBuilder.js`

All three games now have **comprehensive scaffolding**:

#### **Word Chain 🔗**
- **Rule reminder every turn**: "Remember: Your word must start with [LETTER]"
- **Progressive hints**:
  - Rounds 1-3: Always give 2-3 example words
  - Rounds 4-7: Give hint if student hesitates
  - Rounds 8-10: Only hint if mistake
- **Error explanation**: "Oops! [WORD] starts with [X], but we need [Y]"
- **Vocabulary locked**: Only Week 5 house words (bedroom, kitchen, lamp, etc.)

#### **20 Questions ❓**
- **Clear Yes/No structure**: Teach question patterns
- **Progressive hints**:
  - Questions 1-2: Model good questions ("Try: Is it big?")
  - Questions 3-5: Category hints ("Think about furniture...")
  - Questions 6-8: Location hints ("You sleep near it...")
  - Questions 9-10: Very direct ("It starts with L...")
- **Offer choices**: "Is it a LAMP or a SOFA?"
- **Celebration on success**: "YES! You got it! It's a LAMP! 🎉"

#### **Sentence Builder 🧩**
- **Pattern reminder every turn**: "Use: There is a ___ in my ___"
- **Progressive hints**:
  - Rounds 1-2: Give 3 word choices every time
  - Rounds 3-4: Show pattern examples
  - Rounds 5-6: Give 2 choices if stuck
  - Rounds 7-10: Only hint on grammar mistakes
- **Repeat sentence**: "We have: 'There is a...'"
- **Guide next word**: "What comes next? A room word!"

### Updated `freeTalkModes.js`

#### **First Message Structure** (START_GAME)
1. ✅ Warm greeting: "Let's play Word Chain! 🔗"
2. ✅ **EXPLAIN RULES CLEARLY** for 6-12 year olds:
   - Word Chain: "I say a word. You say a word that STARTS with my word's LAST LETTER!"
   - 20 Questions: "I'm thinking of a house object. Ask me YES/NO questions!"
   - Sentence Builder: "Let's build a sentence together! I start, you add next word!"
3. ✅ **Give example**: "I say BEDROOM (ends with M) → You say MIRROR (starts with M)"
4. ✅ Show "Round 1/10" and start challenge
5. ✅ **Always provide 2-3 word hints** in first message

#### **Vocabulary Restriction**
- Added explicit rule: "ONLY use words related to: ${theme}"
- Blocked random words: "DO NOT use words like Rainbow, Elephant"
- Listed available vocabulary: bedroom, kitchen, bathroom, living room, door, window, lamp, sofa, table, chair

#### **Every Turn Requirements**
- Show "Round X/10" in EVERY response
- Remind the rule (especially rounds 1-5)
- Provide hints with specific word choices
- If wrong: Explain why + remind rule + give hint + allow retry
- If right: Celebrate + explain why correct + move to next round

## Testing Checklist

### Word Chain Test:
- [ ] AI explains: "Your word must start with last letter of my word"
- [ ] AI gives example: "BEDROOM → MIRROR → ROOF"
- [ ] AI only uses house vocabulary (no "Rainbow")
- [ ] Rounds 1-3: Always shows 2-3 word hints
- [ ] If wrong: Explains which letter needed
- [ ] Shows "Round X/10" every turn

### 20 Questions Test:
- [ ] AI explains: "I'm thinking of object. Ask YES/NO questions"
- [ ] AI thinks of house object (lamp, sofa, bed, table, chair)
- [ ] AI gives progressive hints (category → location → direct)
- [ ] If stuck: Offers 2 choices "LAMP or SOFA?"
- [ ] Celebrates correct guess with emoji
- [ ] Shows "Round X/10" every turn

### Sentence Builder Test:
- [ ] AI explains: "We build sentence together word-by-word"
- [ ] AI shows pattern: "There is a ___ in my ___"
- [ ] Rounds 1-2: Always gives 3 word choices
- [ ] AI repeats sentence so far each turn
- [ ] AI guides next word type: "A room word!" or "A furniture word!"
- [ ] Shows "Round X/10" every turn

## Expected Improvements

### Before Fix:
```
AI: "I say Rainbow! Your turn..."  ❌ (Not Week 5 vocab)
Student: "bed"
AI: "Oops! That starts with B, not W!"  ❌ (No hint given)
```

### After Fix:
```
AI: "Let's play Word Chain! 🔗 I say a word, you say a word that STARTS 
with my word's LAST LETTER! Example: BEDROOM (ends M) → MIRROR (starts M).
Round 1/10: I say KITCHEN! Your turn! (Hint: Try NIGHT or NURSE)"

Student: "bed"
AI: "Oops! BED starts with B, but KITCHEN ends with N. We need a word 
that starts with N! Round 1/10: Try: NIGHT, NURSE, or NOSE. What's your answer?"
```

## Scaffolding Philosophy

Following syllabus Stage 1 guidance (Weeks 1-54):
- **Always provide support** for young ESL learners (A0-A1)
- **Model good answers** before expecting production
- **Give 2-3 choices** instead of open-ended questions
- **Celebrate attempts** over perfection
- **Explain rules repeatedly** - children need repetition
- **Use emojis** for visual engagement
- **Keep language simple** (4-6 word sentences)

## Vocabulary Locking

Week 5 vocabulary ONLY:
- ✅ bedroom, kitchen, bathroom, living room
- ✅ door, window, lamp, sofa, table, chair
- ❌ rainbow, elephant, random words

## Files Changed

1. **src/services/ai_tutor/gamePromptBuilder.js**
   - Updated all 3 game prompts with scaffolding structure
   - Added progressive hint system (rounds 1-3, 4-7, 8-10)
   - Added explicit rule reminders
   - Added response structure guidelines

2. **src/services/ai_tutor/freeTalkModes.js**
   - Updated START_GAME handler first message structure
   - Added rule explanation requirement
   - Added example requirement
   - Added vocabulary restriction rules
   - Added every-turn requirements

## Next Steps

1. **Test all 3 games** with Week 5 content
2. **Verify vocabulary stays within theme**
3. **Check scaffolding progression** (hints decrease over rounds)
4. **Confirm rules explained clearly** in first message
5. **Validate children can play successfully** with guidance

---

**Ready for testing!** Games now provide structured guidance appropriate for 6-12 year old ESL learners at A0-A1 level. 🎉
