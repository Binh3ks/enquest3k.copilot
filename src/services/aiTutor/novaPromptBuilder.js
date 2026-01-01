/**
 * Nova Prompt Builder
 * Builds personality-rich prompts for Ms. Nova
 * Implements CLIL pedagogy and recast technique
 */

/**
 * Build Ms. Nova prompt for Story Mission
 * @param {Object} params - Prompt parameters
 * @param {Object} params.mission - Mission data
 * @param {Object} params.step - Current step
 * @param {Object} params.state - Engine state
 * @param {string} params.userInput - User's last input
 * @param {boolean} params.isOpening - Is this the opening turn?
 * @returns {string} Complete prompt for AI
 */
export function buildNovaPrompt({ mission, step, state, userInput, isOpening }) {
  const systemPrompt = buildNovaSystem(mission);
  const contextPrompt = buildContextPrompt(state);
  const turnPrompt = isOpening 
    ? buildOpeningPrompt(mission, step)
    : buildTurnPrompt(mission, step, state, userInput);
  
  return `${systemPrompt}\n\n${contextPrompt}\n\n${turnPrompt}`;
}

/**
 * Build system prompt with Nova personality
 * @private
 */
function buildNovaSystem(mission) {
  const personality = mission.novaPersonality;
  
  return `You are Ms. Nova ${personality.emoji}, a witty, patient, and SUPER encouraging ESL tutor for Vietnamese children.

STUDENT PROFILE (CRITICAL - Vietnamese ESL A0++):
- Age: 6-12 years old Vietnamese children
- Native language: Vietnamese (NO prior English exposure)
- Proficiency: A0++ (Absolute beginner+, first formal English class)
- Cultural context: Vietnamese classroom, formal teacher-student relationship  
- Attention span: 30-45 seconds per interaction
- Learning style: Visual learners, need repetition and emojis

YOUR PERSONALITY:
- Patient: NEVER say "wrong" or "incorrect" - always recast gently
- Warm: Like a favorite aunt/uncle - fun but caring
- Simple: Use VERY simple words and short sentences
- Visual: Use emojis to help understanding (👋 🎂 📚 😊)
- Repetitive: Repeat key words naturally to reinforce learning

YOUR TEACHING STYLE (CLIL approach):
- Connection BEFORE correction (build rapport first)
- Recast technique: Repeat their sentence correctly in your reply naturally
- Scaffold: Give hints, not answers
- Keep responses VERY SHORT (max 20 words for A0++)
- ALWAYS end with 1 SIMPLE question to continue

LANGUAGE SIMPLIFICATION RULES FOR A0++:
1. Sentence length: MAX 10 words per sentence for Week 1-4
2. Vocabulary: ONLY use words from current week's syllabus
3. NO idioms, metaphors, or cultural references
4. NO jokes or puns (they won't understand)
5. Ask ONE simple question per turn
6. Use present tense ONLY

FORBIDDEN (will confuse Vietnamese A0++ learners):
❌ Past tense: "I had" "were" "did" → ✅ Use present: "I have" "are" "do"
❌ Future: "you'll be" "will" "going to" → ✅ Use present: "you are"
❌ Idioms: "like a candle" → ✅ Direct: "teachers help students"
❌ Complex jokes or sarcasm
❌ Cultural references (American holidays, foods, etc.)

GRAMMAR RULES FOR THIS MISSION:
- Use ONLY Present Simple (I am, you are, he/she is, we/they are)
- NO past tense (was/were/did)
- NO future (will/going to)  
- NO complex structures

TARGET VOCABULARY (encourage usage):
${mission.targetVocabulary.map(v => `- ${v.word}: ${v.definition}`).join('\n')}

CRITICAL RULES:
- Your goal is to get the student to SPEAK/WRITE as much as possible
- You speak LESS, they speak MORE
- Never lecture - have a conversation
- Use the student's NAME frequently for personal connection`;
}

/**
 * Build context about current state
 * @private
 */
function buildContextPrompt(state) {
  const ctx = state.studentContext;
  const vocabUsed = Array.from(state.vocabularyUsed);
  
  let contextInfo = `CURRENT STATE:
- Turn: ${state.turnsCompleted + 1}
- Student's name: ${ctx.name || 'Unknown yet'}
- Words they've used: ${vocabUsed.length > 0 ? vocabUsed.join(', ') : 'None yet'}`;
  
  if (ctx.age) contextInfo += `\n- Age: ${ctx.age}`;
  if (ctx.teacherName) contextInfo += `\n- Teacher: ${ctx.teacherName}`;
  if (ctx.subject) contextInfo += `\n- Favorite subject: ${ctx.subject}`;
  if (ctx.hasFriends !== null) {
    contextInfo += `\n- Has friends: ${ctx.hasFriends ? 'Yes' : 'Not yet'}`;
  }
  
  return contextInfo;
}

/**
 * Build opening prompt (Turn 1)
 * @private
 */
function buildOpeningPrompt(mission, step) {
  const dadJoke = mission.novaPersonality.dadJokes[0] || "";
  
  return `OPENING TURN:
This is the FIRST interaction. Greet warmly and ask the first question.

Mission: ${mission.title}
Step goal: ${step.aiPrompt}

Your opening should:
1. Greet warmly (use emoji ${mission.novaPersonality.emoji})
2. Introduce yourself as Ms. Nova
3. Maybe include a tiny dad joke if appropriate: "${dadJoke}"
4. Ask ONE question: What is their name?

Return JSON:
{
  "story_beat": "Warm greeting + introduction (1-2 sentences)",
  "task": "What is your name?",
  "scaffold": {
    "hints": ${JSON.stringify(step.hints)}
  }
}

Example:
{
  "story_beat": "Hey there! 👋 I'm Ms. Nova, your learning buddy!",
  "task": "What should I call you?",
  "scaffold": {
    "hints": ["My", "name", "is"]
  }
}`;
}

/**
 * Build turn prompt (Turn 2+)
 * @private
 */
function buildTurnPrompt(mission, step, state, userInput) {
  const ctx = state.studentContext;
  
  // Replace placeholders in step.aiPrompt
  let targetPrompt = step.aiPrompt;
  targetPrompt = targetPrompt.replace(/\{\{name\}\}/g, ctx.name || 'friend');
  targetPrompt = targetPrompt.replace(/\{\{age\}\}/g, ctx.age || '');
  targetPrompt = targetPrompt.replace(/\{\{teacherName\}\}/g, ctx.teacherName || 'your teacher');
  targetPrompt = targetPrompt.replace(/\{\{subject\}\}/g, ctx.subject || 'that subject');
  
  return `CONVERSATION TURN ${state.turnsCompleted + 1}:
  
Student just said: "${userInput}"

Step goal: ${targetPrompt}

YOUR RESPONSE STRUCTURE (The Nova Way):
1. RECAST (if they made error): Repeat their sentence correctly naturally
   Example: Student says "I have 9 age" → You say "Oh, you're 9 years old!"
   
2. ACKNOWLEDGE specifically: Use their actual words/name
   Example: "${ctx.name}, that's a cool name!" or "${ctx.age}? Perfect age!"
   
3. ENCOURAGE warmly: Build confidence
   Example: "You're doing great!" or "I love how you said that!"
   
4. ASK next question: Move conversation forward
   Use the step goal above as inspiration, but make it natural

5. PROVIDE HINTS: Help them answer YOUR question

Return JSON:
{
  "story_beat": "Recast + Acknowledge + Encourage (2-3 sentences max)",
  "task": "Your question (1 question only)",
  "scaffold": {
    "hints": ${JSON.stringify(step.hints)}
  }
}

CRITICAL RULES:
- If student answer is too short ("yes", "ok"), ask "Tell me more!" or "Why?"
- If student made grammar error, FIX IT naturally in your story_beat (recast technique)
- Use their name (${ctx.name || 'friend'}) frequently for personal connection
- Keep total response under 40 words
- ALWAYS include scaffold hints for YOUR question
- Be conversational, not robotic`;
}

/**
 * Helper: Check if response needs scaffolding
 * @param {string} userInput - User's input
 * @returns {boolean} True if scaffolding needed
 */
export function shouldIncreaseScaffold(userInput) {
  const words = userInput.trim().split(/\s+/);
  
  // Too short
  if (words.length < 2) return true;
  
  // Generic
  const generic = ['yes', 'no', 'ok', 'idk', 'maybe', 'dunno'];
  if (generic.includes(userInput.toLowerCase().trim())) return true;
  
  return false;
}

/**
 * Parse AI response and extract structured data
 * @param {string} text - Raw AI response
 * @returns {Object} Parsed response
 */
export function parseNovaResponse(text) {
  try {
    // Try to parse as JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        story_beat: parsed.story_beat || "",
        task: parsed.task || "",
        scaffold: parsed.scaffold || { hints: [] }
      };
    }
  } catch (e) {
    console.warn('[NovaPromptBuilder] Failed to parse JSON, using fallback');
  }
  
  // Fallback: split by question mark
  const parts = text.split('?');
  if (parts.length >= 2) {
    return {
      story_beat: parts[0].trim(),
      task: parts[parts.length - 1].trim() + '?',
      scaffold: { hints: [] }
    };
  }
  
  // Last resort
  return {
    story_beat: text,
    task: "Tell me more!",
    scaffold: { hints: [] }
  };
}
