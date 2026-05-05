#!/usr/bin/env python3
"""Add Spark Talk follow-up prompt to tutorPrompts.js"""
import re

path = 'src/services/ai_tutor/tutorPrompts.js'
with open(path, encoding='utf-8') as f:
    content = f.read()

# Find the end of the spark opening block (the closing }` and }) inside if(isOpeningTurn)
# We'll insert the follow-up block right after the spark opening if-block closes,
# before the V27 freetalk_knowledge opening questions section.

# Marker: the line that has the V27 comment (with replacement char before emoji)
marker = '    // \ufffd\U0001f525 V27: Use freetalk_knowledge opening questions if available'

if marker not in content:
    print("ERROR: marker not found")
    # Try to find it differently
    idx = content.find('V27: Use freetalk_knowledge opening questions')
    if idx >= 0:
        print("Found at:", idx)
        print(repr(content[idx-10:idx+80]))
    exit(1)

follow_up_block = '''  // 💬 SPARK TALK FOLLOW-UP: Continue spark conversation with scaffold support
  if (options.storyBridge && options.sparkSeed) {
    const scaffoldFrames = options.scaffoldFrames || [];
    const vocabFocus = options.vocabFocus || context.coreVocab.slice(0, 5);
    const sparkTopic = options.sparkSeed;

    const historyText = (options.history || [])
      .slice(-6)
      .map(m => `${m.role === 'assistant' ? 'Nova' : 'Student'}: ${m.content}`)
      .join('\\n');

    return `You are Nova in a Spark Talk conversation (Turn ${turnCount}).

🎯 TOPIC: "${sparkTopic}"
👶 STUDENT: Age ${context.learner.age}, Level ${context.learner.level}
📚 VOCABULARY TO USE: ${vocabFocus.join(', ')}
${scaffoldFrames.length > 0 ? `🗣️ SCAFFOLD FRAMES (use words from these as hints): ${scaffoldFrames.join(' / ')}` : ''}
${srsSection}

CONVERSATION:
${historyText}
Student: ${userInput}

YOUR TURN:
1. Acknowledge what the student said warmly (use their words!).
2. Ask ONE follow-up open-ended question about the same topic.
3. Keep it simple, encouraging. Max 2 sentences.

⚠️ RULES:
- WH-questions only (What, Who, How, Tell me about...)
- ❌ NO yes/no questions
- Hints = key words student needs to answer YOUR question (not generic vocab)
${scaffoldFrames.length > 0 ? `- PRIORITY: pull hint words from scaffold frames: [${scaffoldFrames.join(' / ')}]` : ''}

Return JSON:
{
  "ai_response": "Acknowledgment + follow-up question",
  "suggested_hints": ["words", "from", "scaffold", "frames"]
}`;
  }

  // 🔥 OPENING TURN (non-spark): AI generates natural greeting
  if (isOpeningTurn || turnCount === 0) {
'''

# We need to:
# 1. Close the existing `if (isOpeningTurn || turnCount === 0)` block that wraps the spark opening
# 2. Insert the follow-up block

# The structure currently is:
#   if (isOpeningTurn || turnCount === 0) {
#     if (options.storyBridge && options.sparkSeed) {
#       return `...`;
#     }
#     // V27 comment  <-- marker is here
#     let openingQuestionGuide = '';
#     ...
#   }

# We want to:
#   if (isOpeningTurn || turnCount === 0) {
#     if (options.storyBridge && options.sparkSeed) {
#       return `...`;
#     }
#   }
#   // SPARK FOLLOW-UP block
#   // OPENING TURN (non-spark)
#   if (isOpeningTurn || turnCount === 0) {
#     // V27 comment
#     let openingQuestionGuide = '';
#     ...
#   }

# Find where the spark opening if-block ends: `    }\n\n    // marker`
old_fragment = '    }\n\n    ' + marker[4:]  # strip 4 spaces from marker start
new_fragment = '    }\n  }\n\n' + follow_up_block + '    ' + marker[4:]

if old_fragment not in content:
    print("ERROR: old_fragment not found")
    print("Looking for:", repr(old_fragment[:60]))
    exit(1)

content = content.replace(old_fragment, new_fragment, 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS - spark follow-up prompt added")
