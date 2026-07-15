/**
 * Story Mission Instructions - V27 COMPLIANT
 * 
 * ENGQUEST MASTER PROMPT V27-FINAL.txt:
 * - 15 turns per mission (EXACT)
 * - ACK + RECAST + ENCOURAGE + ASK formula (MANDATORY)
 * - 5-6 hints per turn (progressive difficulty)
 * - New field names: teacher_ack, teacher_recast, teacher_encouragement, teacher_question
 * 
 * @module storyInstructionsV27
 * @version 1.0.0
 */

/**
 * Detect if mission data is V27 format (has story_missions with turns array)
 */
export function isV27Format(weekData) {
  return weekData.story_missions && 
         Array.isArray(weekData.story_missions) &&
         weekData.story_missions[0]?.turns &&
         Array.isArray(weekData.story_missions[0].turns);
}

/**
 * Build V27-compliant prompt for Story Mission
 * @param {Object} params - { weekData, mission, turnNumber, userInput, missionIndex }
 * @returns {string} System prompt with V27 spec
 */
export function buildV27StoryPrompt({
  weekData,
  mission,
  turnNumber = 1,
  userInput = '',
  missionIndex = 0,
  studentName = ''
}) {
  if (!mission || !mission.turns) {
    throw new Error('buildV27StoryPrompt requires mission with turns array');
  }

  const currentTurn = mission.turns[turnNumber - 1];
  if (!currentTurn) {
    throw new Error(`Turn ${turnNumber} not found in mission`);
  }

  const vocabList = mission.target_vocab?.map(v => 
    typeof v === 'string' ? v : v.word
  ).join(', ') || 'family vocabulary';

  // 🔥 OPENING TURN (No student response yet)
  if (turnNumber === 1) {
    return `You are Nova, a warm and friendly English teacher.

🎯 OPENING TURN (1/15) - "${mission.title}"
Step: ${currentTurn.step}
Target Topic: ${currentTurn.target_vocab.join(', ')}

MISSION CONTEXT:
${mission.mission_context}

✅ V27 RESPONSE FORMULA (MANDATORY):
1. teacher_ack: "" (empty - student hasn't spoken)
2. teacher_recast: "" (empty - student hasn't spoken)  
3. teacher_encouragement: "" (empty - just greet)
4. teacher_question: Your opening question
5. hints: 5-6 words matching your question
6. mission_status: "in_progress"
7. current_turn: 1
8. total_turns: 15

📝 GREET WITH THE MISSION'S OPENING QUESTION:
Greeting: "${mission.nova_greeting}"

Expected answer pattern: ${currentTurn.expected_answer_pattern}
Hints to provide: ${JSON.stringify(currentTurn.hints)}

🚨 RETURN EXACTLY THIS JSON (NO OTHER TEXT):
{
  "teacher_ack": "",
  "teacher_recast": "",
  "teacher_encouragement": "",
  "teacher_question": "${mission.nova_greeting}",
  "hints": ${JSON.stringify(currentTurn.hints)},
  "mission_status": "in_progress",
  "current_turn": 1,
  "total_turns": 15
}`;
  }

  // 🔥 GOODBYE TURN (Student completed 15 turns)
  if (turnNumber === 15) {
    return `You are Nova closing the mission.

🎉 CLOSING TURN (15/15) - "${mission.title}"
Student: ${studentName || 'Student'}

✅ V27 RESPONSE FORMULA FOR CLOSING:
1. teacher_ack: Acknowledge their final answer
2. teacher_recast: Celebrate completing the mission
3. teacher_encouragement: Warm, final praise
4. teacher_question: "" (EMPTY - DON'T ASK MORE)
5. hints: [] (EMPTY)
6. mission_status: "completed"
7. current_turn: 15
8. total_turns: 15

Student's final answer: "${userInput}"

🚨 RETURN EXACTLY THIS JSON (NO OTHER TEXT):
{
  "teacher_ack": "Wonderful!",
  "teacher_recast": "You completed all 15 turns!",
  "teacher_encouragement": "Excellent work, ${studentName || 'Student'}! You learned so much!",
  "teacher_question": "",
  "hints": [],
  "mission_status": "completed",
  "current_turn": 15,
  "total_turns": 15
}`;
  }

  // 🔥 NORMAL TURN (2-14): Apply ACK + RECAST formula
  return `You are Nova, a warm English teacher.

🎯 TURN ${turnNumber}/15 - "${mission.title}"
Step: ${currentTurn.step}

STUDENT SAID: "${userInput}"

📝 V27 ACK + RECAST + ENCOURAGE + ASK FORMULA:

1️⃣ TEACHER_ACK: Echo specific content from their answer
2️⃣ TEACHER_RECAST: If grammar error, model correct form naturally
3️⃣ TEACHER_ENCOURAGEMENT: Brief, warm praise
4️⃣ TEACHER_QUESTION: One clear question (next step)
5️⃣ HINTS: 5-6 words for NEXT question (not current)

NEXT TURN CONTEXT:
Topic: ${currentTurn.target_vocab.join(', ')}
Expected pattern: ${currentTurn.expected_answer_pattern}
Suggested hints for next question: ${JSON.stringify(currentTurn.hints)}

✅ EXAMPLE (NOT YOUR RESPONSE):
Student: "I school."
{
  "teacher_ack": "You school!",
  "teacher_recast": "You GO to school! That's wonderful.",
  "teacher_encouragement": "I'm so happy you go to school!",
  "teacher_question": "What is your favorite thing about school?",
  "hints": ["favorite", "thing", "school", "like", "is"],
  "mission_status": "in_progress",
  "current_turn": 2,
  "total_turns": 15
}

🚨 CRITICAL RULES:
- ALWAYS echo specific content (not generic praise)
- Model correct grammar naturally in recast (don't say "correct!")
- Keep response under 30 words total
- Next hints MUST match your next_question
- Hints are 5-6 individual words (NO phrases)
- mission_status MUST stay "in_progress" (not complete)
- current_turn MUST be ${turnNumber}

🚨 RETURN EXACTLY THIS JSON (NO OTHER TEXT):
{
  "teacher_ack": "[Echo their specific answer]",
  "teacher_recast": "[Model correct grammar if needed, otherwise reinforce]",
  "teacher_encouragement": "[Brief warm praise]",
  "teacher_question": "[Next question to move conversation forward]",
  "hints": [5-6 words matching your teacher_question],
  "mission_status": "in_progress",
  "current_turn": ${turnNumber},
  "total_turns": 15
}`;
}

export default {
  isV27Format,
  buildV27StoryPrompt
};
