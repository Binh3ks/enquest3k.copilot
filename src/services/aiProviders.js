/**
 * AI Provider System for EngQuest
 * Simple, clean, lets AI do its job
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// ============================================
// CONFIG
// ============================================

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY;

const geminiAI = GEMINI_KEY ? new GoogleGenerativeAI(GEMINI_KEY) : null;
const geminiModel = geminiAI?.getGenerativeModel({ model: 'gemini-2.5-flash' });

export const PROVIDERS = {
  gemini: { name: 'Gemini 2.5 Flash', quotaPerDay: 1500 },
  groq: { name: 'Groq Llama 3.1', quotaPerDay: 14400 },
  fallback: { name: 'Offline Mode', quotaPerDay: Infinity }
};

// Simple tracking
let dailyCount = { gemini: 0, groq: 0 };
let errorCount = { gemini: 0, groq: 0 };

// ============================================
// PROVIDER CALLS
// ============================================

async function callGemini(prompt) {
  if (!geminiModel) throw new Error('No Gemini API key');
  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}

async function callGroq(prompt) {
  if (!GROQ_KEY) throw new Error('No Groq API key');
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.8
    })
  });
  
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Groq ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// ============================================
// MAIN API - Try providers in order
// ============================================

async function callAI(prompt, type = 'chat') {
  const startTime = Date.now();
  
  // Try Gemini first
  if (GEMINI_KEY && errorCount.gemini < 3 && dailyCount.gemini < 1500) {
    try {
      console.log('[AI] Trying Gemini...');
      const result = await callGemini(prompt);
      dailyCount.gemini++;
      errorCount.gemini = 0;
      console.log(`[AI] Gemini OK in ${Date.now() - startTime}ms`);
      return { text: result, provider: 'Gemini 2.5 Flash', duration: Date.now() - startTime };
    } catch (err) {
      console.error('[AI] Gemini failed:', err.message);
      errorCount.gemini++;
    }
  }
  
  // Try Groq second
  if (GROQ_KEY && errorCount.groq < 3 && dailyCount.groq < 14400) {
    try {
      console.log('[AI] Trying Groq...');
      const result = await callGroq(prompt);
      dailyCount.groq++;
      errorCount.groq = 0;
      console.log(`[AI] Groq OK in ${Date.now() - startTime}ms`);
      return { text: result, provider: 'Groq Llama 3.1', duration: Date.now() - startTime };
    } catch (err) {
      console.error('[AI] Groq failed:', err.message);
      errorCount.groq++;
    }
  }
  
  // Fallback - return error message so user knows AI is offline
  console.warn('[AI] All providers failed, using fallback');
  return { 
    text: "I'm having trouble connecting right now. Please try again in a moment!", 
    provider: 'Offline', 
    duration: 0 
  };
}

// ============================================
// CHAT - Simple, short responses for kids
// ============================================

export async function chatAI(userMessage, ctx = {}) {
  const weekId = ctx.weekId || 1;
  const topic = ctx.scenario?.title || ctx.weekInfo?.topic?.[0] || 'English';
  const grammar = ctx.weekInfo?.grammar?.join(', ') || '';
  const math = ctx.weekInfo?.math || 'counting';
  const science = ctx.weekInfo?.science || 'observation';
  const level = weekId <= 14 ? 'beginner' : weekId <= 50 ? 'intermediate' : 'advanced';
  
  // Build conversation as simple text
  const history = (ctx.conversationHistory || [])
    .map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`)
    .join('\n');

  // Week-specific vocab hints (first 5 words)
  const vocabHints = (ctx.vocabList || []).slice(0, 5).map(v => v.word).join(', ');

  // Length guide based on level
  const lengthGuide = level === 'beginner' 
    ? 'Reply in 1-2 SHORT sentences. Use simple words. Include counting (numbers 1-10) and science concepts naturally when relevant. ALWAYS end with a simple question.'
    : level === 'intermediate'
    ? 'Reply in 2-3 sentences. Keep it simple. End with a follow-up question.'
    : 'Reply naturally. Ask a follow-up question.';

  const grammarContext = grammar ? `\nGrammar: ${grammar}` : '';
  const vocabContext = vocabHints ? `\nVocabulary: ${vocabHints}` : '';
  const mathContext = level === 'beginner' ? `\nMath: ${math} (include counting naturally)` : '';
  const scienceContext = level === 'beginner' ? `\nScience: ${science} (mention naturally)` : '';

  const prompt = `Friendly tutor for ${level} ESL child (Week ${weekId}).
Topic: ${topic}${grammarContext}${vocabContext}${mathContext}${scienceContext}

${history}
Student: ${userMessage}

${lengthGuide}
Tutor:`;

  console.log('[Chat Prompt]', prompt);
  return callAI(prompt, 'chat');
}

// ============================================
// MATH - Word problems with unit requirement
// ============================================

export async function mathAI(ctx = {}) {
  const mathTopic = ctx.weekInfo?.math?.join(', ') || 'addition and subtraction';
  const previousQ = (ctx.previousProblems || []).slice(-2).join(' | ');
  
  const prompt = `Create a simple math word problem for a child about: ${mathTopic}
${previousQ ? `Don't repeat: ${previousQ}` : ''}

Format:
PROBLEM: [short question with a story]
ANSWER: [number WITH unit, like "5 apples" or "10 pencils"]
EXPLANATION: [simple math like "3 + 2 = 5"]
HINT: [reminder: "Remember to include the unit!"]`;

  const result = await callAI(prompt, 'math');
  
  // Parse response
  const text = result.text;
  const problem = text.match(/PROBLEM:\s*(.+?)(?=ANSWER:|$)/s)?.[1]?.trim() || text;
  const answer = text.match(/ANSWER:\s*(.+?)(?=EXPLANATION:|$)/s)?.[1]?.trim() || '';
  const explanation = text.match(/EXPLANATION:\s*(.+?)(?=HINT:|$)/s)?.[1]?.trim() || '';
  
  return {
    ...result,
    question: problem,
    answer,
    explanation,
    hint: "💡 Remember: Answer with a number AND unit (like '5 apples')"
  };
}

// ============================================
// SCIENCE - Varied questions, no repeats
// ============================================

export async function scienceAI(ctx = {}) {
  const scienceTopic = ctx.weekInfo?.science?.join(', ') || 'nature';
  const previousQ = (ctx.previousQuestions || []).slice(-3).join(' | ');
  
  const prompt = `Create a simple science question for a child about: ${scienceTopic}
${previousQ ? `IMPORTANT - Don't ask about: ${previousQ}` : ''}

Format:
QUESTION: [different question, not about ${previousQ || 'nothing'}]
ANSWER: [correct answer - 1-3 words]
OPTIONS: [2-3 choices separated by comma]`;

  const result = await callAI(prompt, 'science');
  
  const text = result.text;
  const question = text.match(/QUESTION:\s*(.+?)(?=ANSWER:|$)/s)?.[1]?.trim() || text;
  const answer = text.match(/ANSWER:\s*(.+?)(?=OPTIONS:|$)/s)?.[1]?.trim() || '';
  const options = text.match(/OPTIONS:\s*(.+?)$/s)?.[1]?.trim().split(/[,\n]/).map(o => o.trim()).filter(Boolean) || [];
  
  return {
    ...result,
    q: question,
    a: answer,
    options
  };
}

// ============================================
// STORY TOPICS - Relatable scenarios for kids 6-12
// ============================================

export function getStoryTopics(weekId, weekInfo = {}) {
  // Use week-specific topic if available
  const weekTopic = weekInfo.topic?.[0];
  
  if (weekId <= 14) {
    // Topics MUST match their context - no mixing!
    const base = [
      { id: 'school', label: '📚 At School', starter: 'I am at school.' },
      { id: 'home', label: '🏠 My Home', starter: 'I am at home.' },
      { id: 'family', label: '👨‍👩‍👧 My Family', starter: 'I see my family.' },
      { id: 'friend', label: '👫 My Friend', starter: 'I have a friend.' },
      { id: 'pet', label: '🐕 My Pet', starter: 'I have a pet.' },
      { id: 'toy', label: '🧸 My Toy', starter: 'I see my toy.' }
    ];
    return weekTopic ? [{ id: 'week', label: `📖 ${weekTopic}`, starter: `I see ${weekTopic.toLowerCase()}.` }, ...base] : base;
  } else if (weekId <= 50) {
    const base = [
      { id: 'beach', label: '🏖️ Beach Adventure', starter: 'Last weekend, my family went to the beach. The weather was perfect.' },
      { id: 'zoo', label: '🦁 Zoo Discovery', starter: 'Yesterday, I visited the zoo. I saw some amazing animals.' },
      { id: 'mystery', label: '🔍 Mystery', starter: 'Something strange happened at school today. Everyone was talking about it.' },
      { id: 'invention', label: '💡 My Invention', starter: 'I have an idea for a new invention. It will help people.' },
      { id: 'nature', label: '🌿 Nature Walk', starter: 'I went for a walk in the forest. I discovered something interesting.' }
    ];
    return weekTopic ? [{ id: 'week', label: `📖 ${weekTopic}`, starter: `Let me tell you about ${weekTopic.toLowerCase()}. It's fascinating.` }, ...base] : base;
  } else {
    const base = [
      { id: 'scifi', label: '🚀 Sci-Fi Story', starter: 'In the year 2100, technology has changed everything. Let me describe my world.' },
      { id: 'debate', label: '⚖️ Debate Topic', starter: 'There is an important question we need to discuss. What do you think?' },
      { id: 'ethics', label: '🤔 Ethical Dilemma', starter: 'Imagine you face a difficult choice. What is the right thing to do?' },
      { id: 'future', label: '🔮 Future Vision', starter: 'What will the world look like in 50 years? Let me share my thoughts.' }
    ];
    return weekTopic ? [{ id: 'week', label: `📖 ${weekTopic}`, starter: `Let's explore ${weekTopic.toLowerCase()} in depth. Consider this...` }, ...base] : base;
  }
}

// ============================================
// STORY - With guiding questions for kids
// ============================================

export async function storyAI(storyParts, ctx = {}) {
  const weekId = ctx.weekId || 1;
  const level = weekId <= 14 ? 'beginner' : weekId <= 50 ? 'intermediate' : 'advanced';
  const topic = ctx.storyTopic || 'beach';
  const weekTitle = ctx.weekTitle || 'English Learning';
  const weekVocab = (ctx.vocabList || []).slice(0, 10).map(v => v.word).join(', ');
  
  // If generating opening, create week-specific starter
  if (ctx.generateOpening) {
    let prompt;
    
    if (level === 'beginner') {
      // Week 1-14: EXTREMELY simple, 1 sentence only
      prompt = `Write ONE very simple sentence (3-5 words ONLY) about "${topic}" for a 6-year-old beginner in Week ${weekId}.
Week ${weekId} vocabulary: ${weekVocab}
Week topic: ${weekTitle}

RULES:
- Use ONLY present simple: "I have...", "I am...", "I see..."
- Maximum 5 words
- Use ONLY words from vocabulary list
- NO complex ideas, NO past tense

EXAMPLES:
- "I have a dog."
- "I am a student."
- "I see the teacher."

Write ONE sentence now (3-5 words):`;
    } else if (level === 'intermediate') {
      prompt = `Write 1-2 short sentences about "${topic}" for an intermediate student in Week ${weekId}.
Week topic: ${weekTitle}
Vocabulary: ${weekVocab}
Use present or present progressive tense.
Keep it simple and engaging.`;
    } else {
      prompt = `Write 2-3 sentences about "${topic}" for an advanced student in Week ${weekId}.
Week topic: ${weekTitle}
Make it interesting and use varied vocabulary.`;
    }
    
    return callAI(prompt, 'story');
  }
  
  // Continue existing story WITH TOPIC CONTEXT
  const story = storyParts.map(p => `${p.role === 'user' ? 'Child' : 'Tutor'}: ${p.text}`).join('\n');
  
  // Guiding questions format - help kids think about what to say
  const formatGuide = level === 'beginner'
    ? `You are helping a 6-year-old (Week ${weekId}: "${weekTitle}").

📖 STORY TOPIC: "${topic}"
Vocabulary ONLY: ${weekVocab}

STAY ON TOPIC "${topic}"! Your sentence MUST be about ${topic}:
- If topic=home → talk ONLY about home
- If topic=school → talk ONLY about school
- If topic=family → talk ONLY about family
- If topic=pet → talk ONLY about pet
- If topic=toy → talk ONLY about toy

Add ONE sentence (3-5 words) about ${topic}.
Use ONLY: ${weekVocab}
Present simple ONLY: "I have", "I am", "I see"

Format:
STORY: [3-5 words about ${topic}]
QUESTIONS: [YES/NO about ${topic}?] | [YES/NO about ${topic}?]
HINTS: [word1] | [word2] | [word3]

Example for "home":
STORY: I see my home.
QUESTIONS: Is your home big? | Do you have a book at home?
HINTS: book | name | student`
    : level === 'intermediate'
    ? `Continue this story with 1-2 sentences. Ask 1-2 questions to guide the child's next response.

Format:
STORY: [1-2 sentences]
QUESTIONS: [1-2 guiding questions]
HINTS: [3-4 vocabulary words]`
    : `Continue the story naturally with 2-3 sentences. Suggest vocabulary if helpful.`;
  
  const prompt = `${formatGuide}

Story so far:
${story}

Continue now:`;

  const result = await callAI(prompt, 'story');
  
  // Parse response
  const text = result.text;
  
  // Extract STORY part
  const storyMatch = text.match(/STORY:\s*(.+?)(?=QUESTIONS:|HINTS:|$)/is);
  // Extract QUESTIONS (guiding questions)
  const questionsMatch = text.match(/QUESTIONS:\s*(.+?)(?=HINTS:|$)/is);
  // Extract HINTS
  const hintsMatch = text.match(/HINTS:\s*(.+?)$/is);
  
  // Clean story text
  let storyText = storyMatch 
    ? storyMatch[1].trim()
    : text
        .replace(/STORY:\s*/i, '')
        .replace(/QUESTIONS:\s*.+$/is, '')
        .replace(/HINTS:\s*.+$/is, '')
        .replace(/^Tutor:\s*/i, '')
        .trim();
  
  let questions = null;
  let hints = null;
  
  // Parse guiding questions
  if (questionsMatch) {
    questions = questionsMatch[1]
      .split(/[|]/)
      .map(q => q.trim())
      .filter(q => q && q.length > 3 && q.length < 80)
      .slice(0, 3);
  }
  
  // Parse hints/word suggestions
  if (hintsMatch) {
    hints = hintsMatch[1]
      .split(/[|,،]/)
      .map(h => h.trim().toLowerCase())
      .filter(h => h && h.length > 1 && h.length < 25)
      .slice(0, 4);
  }
  
  // Default fallbacks based on topic
  const topicDefaults = {
    beach: {
      questions: ['Did you swim in the water?', 'Did you build a sandcastle?', 'Was the water cold or warm?'],
      hints: ['sandcastle', 'waves', 'sunny', 'swim']
    },
    zoo: {
      questions: ['What animal did you see?', 'Was it big or small?', 'Did you take a photo?'],
      hints: ['lion', 'elephant', 'monkey', 'tiger']
    },
    pet: {
      questions: ['What does your pet like to eat?', 'Does your pet like to play?', 'Where does your pet sleep?'],
      hints: ['cute', 'fluffy', 'play', 'sleep']
    },
    birthday: {
      questions: ['What gifts did you get?', 'Did you eat cake?', 'What games did you play?'],
      hints: ['cake', 'presents', 'balloons', 'happy']
    },
    school: {
      questions: ['What happened?', 'Who was with you?', 'Was it funny or exciting?'],
      hints: ['friend', 'teacher', 'funny', 'happy']
    },
    picnic: {
      questions: ['What food did you bring?', 'Did you play any games?', 'Was the weather nice?'],
      hints: ['sandwich', 'fruit', 'sunny', 'fun']
    }
  };
  
  const defaults = topicDefaults[topic] || topicDefaults.beach;
  
  if (!questions || questions.length === 0) {
    questions = defaults.questions;
  }
  if (!hints || hints.length === 0) {
    hints = defaults.hints;
  }
  
  return {
    ...result,
    text: storyText,
    questions,
    hints
  };
}

// ============================================
// DEBATE - Friendly discussion, SHORT responses
// ============================================

export async function debateAI(userArgument, ctx = {}) {
  const topic = ctx.topic || 'Is homework good?';
  const weekId = ctx.weekId || 15;
  const level = weekId <= 30 ? 'beginner' : weekId <= 60 ? 'intermediate' : 'advanced';
  
  const history = (ctx.debateHistory || [])
    .map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.text}`)
    .join('\n');

  // Length guide - shorter for lower levels
  const lengthGuide = level === 'beginner'
    ? 'Reply in 2-3 SHORT sentences. Use simple words. Ask ONE simple question.'
    : level === 'intermediate'
    ? 'Reply in 3-4 sentences. Keep vocabulary appropriate.'
    : 'Reply naturally but concisely.';

  const prompt = `Friendly debate with an ESL child (Week ${weekId}, ${level}) about: "${topic}"

${history}
Student: ${userArgument}

${lengthGuide}
Tutor:`;

  return callAI(prompt, 'debate');
}

// ============================================
// UTILITIES
// ============================================

export function validateMathAnswer(userAnswer, correctAnswer) {
  const userClean = userAnswer.toLowerCase().replace(/[^a-z0-9]/g, '');
  const correctClean = correctAnswer.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Extract number from correct answer
  const num = correctClean.match(/\d+/)?.[0];
  if (!num) return userClean === correctClean;
  
  return userClean.includes(num);
}

export function getProviderStatus() {
  return {
    gemini: {
      name: 'Gemini 2.5 Flash',
      available: !!GEMINI_KEY && errorCount.gemini < 3,
      dailyUsed: dailyCount.gemini,
      dailyLimit: 1500,
      errors: errorCount.gemini
    },
    groq: {
      name: 'Groq Llama 3.1',
      available: !!GROQ_KEY && errorCount.groq < 3,
      dailyUsed: dailyCount.groq,
      dailyLimit: 14400,
      errors: errorCount.groq
    },
    fallback: {
      name: 'Offline Mode',
      available: true,
      dailyUsed: 0,
      dailyLimit: Infinity,
      errors: 0
    }
  };
}

export function getActiveProvider() {
  if (GEMINI_KEY && errorCount.gemini < 3) return 'gemini';
  if (GROQ_KEY && errorCount.groq < 3) return 'groq';
  return 'fallback';
}

export function resetProviderErrors() {
  errorCount = { gemini: 0, groq: 0 };
  console.log('[AI] Errors reset');
}

export function resetDailyCounts() {
  dailyCount = { gemini: 0, groq: 0 };
  console.log('[AI] Daily counts reset');
}

export default { chatAI, mathAI, scienceAI, storyAI, debateAI };
