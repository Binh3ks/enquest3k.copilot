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
  const vocab = (ctx.vocabList || []).slice(0, 5).map(v => v.word).join(', ');
  const level = weekId <= 14 ? 'beginner' : weekId <= 50 ? 'intermediate' : 'advanced';
  
  const history = (ctx.conversationHistory || [])
    .map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`)
    .join('\n');

  const prompt = level === 'beginner'
    ? `Warm tutor for 6-year-old (Week ${weekId}: "${topic}").

${history}
Student: ${userMessage}

Reply naturally in 1 short sentence. Stay on topic "${topic}". Ask 1 simple question about "${topic}".
Tutor:`
    : level === 'intermediate'
    ? `Friendly tutor (Week ${weekId}). Topic: ${topic}

${history}
Student: ${userMessage}

Reply in 2-3 sentences. End with question.
Tutor:`
    : `Week ${weekId}. ${history}
Student: ${userMessage}

Reply naturally. Ask follow-up.
Tutor:`;

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
    // Beginner topics - starters MUST talk about the topic
    const base = [
      { id: 'school', label: '📚 At School', starter: 'I am at school.' },
      { id: 'home', label: '🏠 My Home', starter: 'I see my home.' },
      { id: 'family', label: '👨‍👩‍👧 My Family', starter: 'I see my family.' },
      { id: 'friend', label: '👫 My Friend', starter: 'I have a friend.' },
      { id: 'pet', label: '🐕 My Pet', starter: 'I see my pet.' },
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
  
  // If generating opening, create simple topic-specific starter
  if (ctx.generateOpening) {
    const starters = {
      school: 'I am at school.',
      home: 'I see my home.',
      family: 'I see my family.',
      friend: 'I have a friend.',
      pet: 'I see my pet.',
      toy: 'I see my toy.'
    };
    
    const starter = starters[topic] || `I see ${topic}.`;
    return { text: starter, provider: 'Static', duration: 0 };
  }
  
  // Continue existing story - natural progression
  const story = storyParts.map(p => `${p.role === 'user' ? 'Child' : 'Tutor'}: ${p.text}`).join('\n');
  
  const prompt = level === 'beginner'
    ? `Story about "${topic}" (Week ${weekId}).

${story}

Add 1 short sentence about "${topic}" (3-5 words). Keep talking about ${topic}, not other things.

Format:
STORY: [sentence about ${topic}]
QUESTIONS: [question?] | [question?]
HINTS: [word] | [word] | [word]`
    : `Continue story (1-2 sentences):

${story}

Format: STORY: [text] | QUESTIONS: [q1] [q2] | HINTS: [w1] [w2]`;
  
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
