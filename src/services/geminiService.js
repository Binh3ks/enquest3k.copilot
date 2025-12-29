import { GoogleGenerativeAI } from '@google/generative-ai';
import geminiCache from './geminiCache.js';

// Initialize Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDemoKeyForDevelopment';
const genAI = new GoogleGenerativeAI(API_KEY);

// Use Gemini 2.5 Flash (latest available model - fast and free)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Enhanced fallback responses based on context
const smartFallbacks = {
  chat: (userMsg, weekId) => {
    if (userMsg.toLowerCase().includes('family')) return "Tell me more about your family members!";
    if (userMsg.toLowerCase().includes('like')) return "That's interesting! What else do you like?";
    if (userMsg.toLowerCase().match(/\d+/)) return `${userMsg.match(/\d+/)[0]}! That's a good number. What about it?`;
    return weekId <= 8 ? "Great! Can you tell me more?" : "Interesting point! Continue your story.";
  },
  math: (weekId) => ({
    question: weekId <= 10 
      ? "Tom has 3 apples. Mary has 4 apples. How many apples do they have?"
      : "A box has 6 pencils. You buy 3 boxes. How many pencils in total?",
    answer: weekId <= 10 ? "7 apples" : "18 pencils",
    explanation: weekId <= 10 ? "3 + 4 = 7" : "6 × 3 = 18"
  }),
  story: (lastText, weekId) => {
    const match = lastText?.match(/\b(cat|dog|boy|girl|bird|friend|tree|sun)\b/i);
    const subject = match ? match[0] : "something";
    return weekId <= 14 
      ? `The ${subject} is happy. It smiles.` 
      : `Then the ${subject} discovers something new.`;
  }
};

/**
 * Generate AI response for chat/roleplay scenarios
 */
export async function generateChatResponse({
  userMessage,
  conversationHistory = [],
  scenario = null,
  weekInfo = {},
  vocabList = [],
  weekId = 1,
  weekTitle = '',
  syllabusContext = ''
}) {
  const grammarRules = weekInfo.grammar?.join('/') || 'present simple';
  const vocab = vocabList.slice(0, 8).map(v => v.word).join(', ');
  const topic = weekInfo.topic?.join('/') || 'general';
  
  const systemPrompt = `Professor Paws, ESL tutor for Week ${weekId}.
Syllabus learned: ${syllabusContext}
Current: ${grammarRules}. Vocab: ${vocab}. Topic: ${topic}
Scenario: ${scenario?.context || 'general'}

Reply in 1-2 simple sentences using ONLY ${grammarRules}. Ask a follow-up question.

Student: ${userMessage}
Professor Paws:`;

  // Generate cache key
  const cacheKey = geminiCache.generateCacheKey('chat', {
    userMessage,
    scenario: scenario?.title,
    weekId
  });
  
  // Check cache first
  const cached = geminiCache.get(cacheKey);
  if (cached) return cached;
  
  try {
    // Check rate limit before API call
    await geminiCache.checkRateLimit();
    
    const result = await model.generateContent(systemPrompt);
    const response = result.response;
    const text = response.text();
    
    // Cache the response
    geminiCache.set(cacheKey, text);
    
    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Handle quota errors
    if (error.message === 'DAILY_QUOTA_EXCEEDED' || error.toString().includes('429')) {
      const quota = geminiCache.getRemainingQuota();
      console.error('[Quota Exceeded] Try again after:', quota.resetTime);
      return `🔄 API quota reached. Smart fallback: ${smartFallbacks.chat(userMessage, weekId)}`;
    }
    
    return smartFallbacks.chat(userMessage, weekId);
  }
}

/**
 * Generate math word problem (Singapore/US textbook style)
 */
export async function generateMathProblem({
  weekInfo = {},
  vocabList = [],
  weekId = 1,
  difficulty = 'beginner',
  previousProblems = []
}) {
  const mathTopic = weekInfo.math?.join(', ') || 'counting';
  const contextWords = vocabList.slice(0, 10).map(v => v.word).join(', ');
  const grammarRules = weekInfo.grammar?.join(', ') || 'present simple';
  
  // Grammar-aware constraints
  let grammarConstraint = '';
  if (weekId <= 14) {
    grammarConstraint = 'CRITICAL: Use ONLY present simple (is, are, have, has). NO past tense!';
  } else if (weekId <= 25) {
    grammarConstraint = 'Use present simple or present continuous. NO past tense yet!';
  } else {
    grammarConstraint = 'Can use simple past if needed for context.';
  }
  
  const systemPrompt = `You are an ESL math tutor creating engaging word problems for Week ${weekId} students.

🎯 CORE REQUIREMENTS:
${grammarConstraint}
✅ Math Topic: ${mathTopic}
📚 Vocabulary: Use naturally - ${contextWords}
🎓 Difficulty: ${difficulty}
🌍 Style: Like Singapore or US Common Core textbook (real-world contexts)
💯 Answer Format: MUST include UNIT (e.g., "7 pencils", "15 books", "3 groups")

📋 EXAMPLES FOR YOUR LEVEL:
${difficulty === 'beginner' 
  ? `- "Maria has 3 pencils. Tom has 2 pencils. How many pencils do they have altogether?" → Answer: "5 pencils"
- "There are 4 red apples and 3 green apples on the table. How many apples are there?" → Answer: "7 apples"`
  : `- "The teacher gives 6 notebooks to each student. There are 5 students. How many notebooks in total?" → Answer: "30 notebooks"
- "A book costs 8 dollars. Sarah buys 4 books. How much money does Sarah spend?" → Answer: "32 dollars"`
}

⚠️ AVOID REPEATING:
${previousProblems.slice(-3).join(' | ') || '(none yet)'}

Generate ONE problem. Format EXACTLY:
PROBLEM: [Your creative problem here]
ANSWER: [number + unit]
EXPLANATION: [1-2 sentence explanation]

PROBLEM:`;

  const cacheKey = geminiCache.generateCacheKey('math', { weekId, difficulty, mathTopic });
  const cached = geminiCache.get(cacheKey);
  if (cached) return cached;
  
  try {
    await geminiCache.checkRateLimit();
    
    const apiResult = await model.generateContent(systemPrompt);
    const text = apiResult.response.text();
    
    // Parse response more robustly
    const fullText = 'PROBLEM: ' + text; // Add prefix since model only generates the problem part
    const problemMatch = fullText.match(/PROBLEM:\s*(.+?)(?=ANSWER:|$)/s);
    const answerMatch = fullText.match(/ANSWER:\s*(.+?)(?=EXPLANATION:|$)/s);
    const explanationMatch = fullText.match(/EXPLANATION:\s*(.+?)$/s);
    
    const parsed = {
      question: problemMatch ? problemMatch[1].trim() : text.substring(0, 200),
      answer: answerMatch ? answerMatch[1].trim() : '',
      explanation: explanationMatch ? explanationMatch[1].trim() : ''
    };
    
    geminiCache.set(cacheKey, parsed);
    return parsed;
  } catch (error) {
    console.error('Gemini Math Error:', error);
    return smartFallbacks.math(weekId);
  }
}

/**
 * Generate science quiz question
 */
export async function generateScienceQuestion({
  weekInfo = {},
  weekId = 1,
  difficulty = 'beginner'
}) {
  const scienceTopic = weekInfo.science?.join(', ') || 'basic observation';
  const grammarRules = weekInfo.grammar?.join(', ') || 'present simple';
  
  const systemPrompt = `Create a science question for Week ${weekId} ESL students.

Science Topic: ${scienceTopic}
Grammar: ONLY ${grammarRules}
Difficulty: ${difficulty}

Format (choose one type):
1. True/False: "A pencil is a living thing. True or False?"
2. Multiple choice: "What do plants need? A) Water B) Sun C) Both A and B"
3. Simple answer: "Is a tree living or non-living?"

Generate ONE question with answer:
QUESTION: [question]
ANSWER: [correct answer]
OPTIONS: [if multiple choice, list A, B, C]`;

  const cacheKey = geminiCache.generateCacheKey('science', { weekId, scienceTopic, difficulty });
  const cached = geminiCache.get(cacheKey);
  if (cached) return cached;
  
  try {
    await geminiCache.checkRateLimit();
    
    const apiResult = await model.generateContent(systemPrompt);
    const text = apiResult.response.text();
    
    const questionMatch = text.match(/QUESTION:\s*(.+?)(?=ANSWER:|$)/s);
    const answerMatch = text.match(/ANSWER:\s*(.+?)(?=OPTIONS:|$)/s);
    const optionsMatch = text.match(/OPTIONS:\s*(.+?)$/s);
    
    const parsed = {
      q: questionMatch ? questionMatch[1].trim() : text,
      a: answerMatch ? answerMatch[1].trim().toLowerCase() : '',
      options: optionsMatch ? optionsMatch[1].trim().split(/[\,\n]/).map(o => o.trim()) : []
    };
    
    geminiCache.set(cacheKey, parsed);
    return parsed;
  } catch (error) {
    console.error('Gemini Science Error:', error);
    return {
      q: "Is a pencil living or non-living?",
      a: "non-living",
      options: ["living", "non-living"]
    };
  }
}

/**
 * Continue a story (Creative or Science)
 */
export async function continueStory({
  storyParts = [],
  storyType = 'creative',
  weekInfo = {},
  vocabList = [],
  weekId = 1,
  difficulty = 'beginner'
}) {
  const grammarRules = weekInfo.grammar?.join(', ') || 'present simple';
  const scienceTopic = weekInfo.science?.[0] || 'nature';
  const mathTopic = weekInfo.math?.[0] || 'numbers';
  const contextWords = vocabList.slice(0, 8).map(v => v.word).join(', ');
  const storyHistory = storyParts.map(p => 
    `${p.role === 'user' ? 'Student' : 'AI'}: ${p.text}`
  ).join('\n');
  
  // Strict grammar enforcement based on week
  let grammarGuidance = '';
  if (weekId <= 14) {
    grammarGuidance = 'CRITICAL: Use ONLY present simple tense (I am, she has, they play). NO past tense (was/were/had/did)!';
  } else if (weekId <= 30) {
    grammarGuidance = 'Use present simple and present continuous. Past tense NOT allowed yet.';
  } else if (weekId <= 50) {
    grammarGuidance = 'Use present and past simple. Present perfect NOT allowed yet.';
  } else {
    grammarGuidance = 'All grammar structures allowed.';
  }
  
  const systemPrompt = storyType === 'science'
    ? `You are a creative storyteller for young English learners (Week ${weekId}).

🎯 STORY TYPE: Educational Science Story
📚 Science Topic: ${scienceTopic}
🎓 Difficulty: ${difficulty}
✅ Grammar Rules: ${grammarRules}
⚠️ ${grammarGuidance}
📖 Use these words naturally: ${contextWords}

📝 Story so far:
${storyHistory}

🎨 YOUR TASK:
1. Continue the story with 1-2 engaging sentences
2. Make it educational - explain ${scienceTopic} concepts through story
3. Use ONLY grammar the student has learned: ${grammarRules}
4. ${difficulty === 'beginner' ? 'Keep sentences SHORT (5-8 words each)' : 'Use varied sentence structures'}
5. Make it interesting! Kids should want to continue.
6. Include cause and effect, wonder, or discovery

Example style: "The plant grows tall. It needs water and sun. What makes it green?"

Continue the story NOW (DO NOT explain, just write the story):`
    : `You are a creative storyteller for young English learners (Week ${weekId}).

🎯 STORY TYPE: Creative Adventure
🎓 Difficulty: ${difficulty}
✅ Grammar Rules: ${grammarRules}
⚠️ ${grammarGuidance}
📖 Use these words naturally: ${contextWords}

📝 Story so far:
${storyHistory}

🎨 YOUR TASK:
1. Continue the story with 1-2 exciting sentences
2. Add imagination, emotions, or surprises
3. Use ONLY grammar the student has learned: ${grammarRules}
4. ${difficulty === 'beginner' ? 'Keep sentences SHORT (5-8 words each)' : 'Use rich descriptions'}
5. Make kids curious about what happens next
6. Build on what the student wrote - acknowledge their contribution

Example styles:
- Beginner: "The cat jumps high. It sees a bird. The bird sings."
- Intermediate: "The mysterious box opens slowly. Inside, there is a glowing key."

Continue the story NOW (DO NOT explain, just write the story):`;

  const cacheKey = geminiCache.generateCacheKey('story', {
    storyType,
    weekId,
    difficulty,
    lastUserText: storyParts.filter(p => p.role === 'user').pop()?.text.substring(0, 50)
  });
  const cached = geminiCache.get(cacheKey);
  if (cached) return cached;
  
  try {
    await geminiCache.checkRateLimit();
    
    console.log(`[Gemini Story] Week ${weekId}, Type: ${storyType}, Level: ${difficulty}`);
    const result = await model.generateContent(systemPrompt);
    const continuation = result.response.text().trim();
    console.log(`[Gemini Story] Generated: "${continuation.substring(0, 80)}..."`);
    
      geminiCache.set(cacheKey, continuation);
    return continuation;
  } catch (error) {
    console.error('[Gemini Story] API Error:', error.message);
    
    // Smart fallback based on context
    const lastUserText = storyParts.filter(p => p.role === 'user').pop()?.text || '';
    return smartFallbacks.story(lastUserText, weekId);
  }
}

/**
 * Generate debate response
 */
export async function generateDebateResponse({
  topic = '',
  userArgument = '',
  debateHistory = [],
  weekInfo = {},
  weekId = 1,
  turnNumber = 1
}) {
  const grammarRules = weekInfo.grammar?.join(', ') || 'present simple';
  const historyText = debateHistory.slice(-4).map(m => 
    `${m.role === 'user' ? 'Student' : 'Professor Paws'}: ${m.text}`
  ).join('\n');
  
  const systemPrompt = `You are Professor Paws in a debate for Week ${weekId} students.

Topic: "${topic}"
Grammar: ${grammarRules}
Turn: ${turnNumber}/10

Previous arguments:
${historyText}

Student argument: ${userArgument}

Your response should:
1. ${turnNumber <= 3 ? 'Acknowledge and counter-argue' : turnNumber <= 7 ? 'Challenge with questions' : 'Summarize both sides'}
2. Use ONLY ${grammarRules} grammar
3. Keep it 2-3 sentences
4. Be encouraging

Professor Paws:`;

  const cacheKey = geminiCache.generateCacheKey('debate', {
    topic,
    weekId,
    turnNumber,
    lastArg: userArgument.substring(0, 50)
  });
  const cached = geminiCache.get(cacheKey);
  if (cached) return cached;
  
  try {
    await geminiCache.checkRateLimit();
    
    const result = await model.generateContent(systemPrompt);
    const text = result.response.text().trim();
    
    geminiCache.set(cacheKey, text);
    return text;
  } catch (error) {
    console.error('Gemini Debate Error:', error);
    return turnNumber <= 3 
      ? "That's an interesting point. However, have you considered the other side?"
      : "Great argument! You're thinking critically!";
  }
}

/**
 * Validate math answer (checks for unit)
 */
export function validateMathAnswer(userAnswer, correctAnswer) {
  const userClean = userAnswer.toLowerCase().trim();
  const correctClean = correctAnswer.toLowerCase().trim();
  
  // Check if contains the number
  const numberMatch = correctClean.match(/\d+/);
  if (!numberMatch) return false;
  
  const number = numberMatch[0];
  const hasNumber = userClean.includes(number);
  
  // Check if contains unit (plural or singular)
  const unitMatch = correctClean.match(/[a-z]+/);
  if (unitMatch) {
    const unit = unitMatch[0];
    const unitSingular = unit.replace(/s$/, '');
    const hasUnit = userClean.includes(unit) || userClean.includes(unitSingular);
    
    return hasNumber && hasUnit;
  }
  
  return hasNumber;
}
