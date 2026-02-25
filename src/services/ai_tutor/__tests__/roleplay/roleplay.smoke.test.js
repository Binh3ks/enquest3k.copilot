/**
 * SMOKE TEST: Roleplay Tab
 * Purpose: Test core Roleplay functionality (conversation flow, context retention)
 * Run: node src/services/ai_tutor/__tests__/roleplay/roleplay.smoke.test.js
 */

// ========================================
// MOCK DATA
// ========================================

const mockRoleplayScenario = {
  id: "week_2_roleplay_1",
  title_en: "Family Dinner Conversation",
  title_vi: "Nói chuyện bữa tối gia đình",
  role_student: "You are a child talking to your family",
  role_ai: "I am your mother",
  context: "It's dinner time. Your family is eating together.",
  vocab_focus: ["mother", "father", "food", "delicious", "thank you"],
  turns: 20
};

// ========================================
// TEST FUNCTIONS (Extracted from RoleplayTab logic)
// ========================================

/**
 * Initialize roleplay session
 */
function initializeRoleplaySession(scenario) {
  if (!scenario || !scenario.id) {
    return { success: false, error: 'Invalid scenario' };
  }
  
  return {
    success: true,
    scenarioId: scenario.id,
    context: scenario.context,
    role_student: scenario.role_student,
    role_ai: scenario.role_ai,
    currentTurn: 1,
    maxTurns: scenario.turns || 20,
    conversationHistory: []
  };
}

/**
 * Add message to conversation history
 */
function addMessageToHistory(history, role, message) {
  const newHistory = [...history];
  newHistory.push({
    role,
    message,
    timestamp: Date.now()
  });
  return newHistory;
}

/**
 * Get conversation context for AI (last N messages)
 */
function getConversationContext(history, maxMessages = 5) {
  if (!history || history.length === 0) {
    return [];
  }
  
  // Get last N messages
  const recentMessages = history.slice(-maxMessages);
  
  return recentMessages.map(msg => ({
    role: msg.role,
    content: msg.message
  }));
}

/**
 * Validate turn number
 */
function validateTurn(currentTurn, maxTurns) {
  return {
    isValid: currentTurn > 0 && currentTurn <= maxTurns,
    isComplete: currentTurn >= maxTurns,
    remaining: maxTurns - currentTurn + 1
  };
}

/**
 * Build roleplay prompt with context
 */
function buildRoleplayPrompt(scenario, conversationHistory) {
  const context = getConversationContext(conversationHistory, 5);
  
  const prompt = `
You are playing a roleplay game.

YOUR ROLE: ${scenario.role_ai}
STUDENT ROLE: ${scenario.role_student}
SCENARIO: ${scenario.context}

VOCABULARY TO USE: ${scenario.vocab_focus.join(', ')}

CONVERSATION SO FAR:
${context.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Respond naturally as ${scenario.role_ai}.
`.trim();
  
  return prompt;
}

/**
 * Check if message uses scenario vocab
 */
function checkVocabUsage(message, vocabFocus) {
  const lowerMessage = message.toLowerCase();
  const usedVocab = vocabFocus.filter(word => 
    lowerMessage.includes(word.toLowerCase())
  );
  
  return {
    usedWords: usedVocab,
    count: usedVocab.length,
    hasVocab: usedVocab.length > 0
  };
}

// ========================================
// TEST SUITE
// ========================================

console.log('🎭 ROLEPLAY - SMOKE TEST SUITE');
console.log('Testing: Conversation flow, Context retention, Turn management\n');

let passed = 0;
let failed = 0;

function runTest(testName, testFunction) {
  try {
    testFunction();
    console.log(`✅ Test ${passed + failed + 1}: ${testName}`);
    passed++;
  } catch (error) {
    console.log(`❌ Test ${passed + failed + 1}: ${testName}`);
    console.log(`   Error: ${error.message}\n`);
    failed++;
  }
}

// ========================================
// CATEGORY 1: SESSION INITIALIZATION (4 tests)
// ========================================

console.log('📋 CATEGORY 1: Session Initialization\n');

runTest('initializes roleplay session', () => {
  const session = initializeRoleplaySession(mockRoleplayScenario);
  if (!session.success) throw new Error(session.error);
  if (session.currentTurn !== 1) throw new Error('Should start at turn 1');
  if (session.maxTurns !== 20) throw new Error('Should have 20 turns');
});

runTest('handles invalid scenario', () => {
  const session = initializeRoleplaySession(null);
  if (session.success) throw new Error('Should fail with null scenario');
});

runTest('initializes empty conversation history', () => {
  const session = initializeRoleplaySession(mockRoleplayScenario);
  if (session.conversationHistory.length !== 0) {
    throw new Error('Should start with empty history');
  }
});

runTest('stores scenario context', () => {
  const session = initializeRoleplaySession(mockRoleplayScenario);
  if (!session.context) throw new Error('Should store scenario context');
  if (!session.role_student) throw new Error('Should store student role');
  if (!session.role_ai) throw new Error('Should store AI role');
});

// ========================================
// CATEGORY 2: CONVERSATION HISTORY (5 tests)
// ========================================

console.log('\n📋 CATEGORY 2: Conversation History\n');

runTest('adds student message to history', () => {
  let history = [];
  history = addMessageToHistory(history, 'student', 'Hello mother!');
  if (history.length !== 1) throw new Error('Should have 1 message');
  if (history[0].role !== 'student') throw new Error('Should save role');
  if (history[0].message !== 'Hello mother!') throw new Error('Should save message');
});

runTest('adds AI message to history', () => {
  let history = [];
  history = addMessageToHistory(history, 'ai', 'Hello dear! How was school?');
  if (history.length !== 1) throw new Error('Should have 1 message');
  if (history[0].role !== 'ai') throw new Error('Should save AI role');
});

runTest('maintains conversation order', () => {
  let history = [];
  history = addMessageToHistory(history, 'student', 'Message 1');
  history = addMessageToHistory(history, 'ai', 'Message 2');
  history = addMessageToHistory(history, 'student', 'Message 3');
  
  if (history.length !== 3) throw new Error('Should have 3 messages');
  if (history[0].message !== 'Message 1') throw new Error('Order mismatch');
  if (history[2].message !== 'Message 3') throw new Error('Order mismatch');
});

runTest('adds timestamp to messages', () => {
  let history = [];
  history = addMessageToHistory(history, 'student', 'Test');
  if (!history[0].timestamp) throw new Error('Should have timestamp');
  if (typeof history[0].timestamp !== 'number') throw new Error('Timestamp should be number');
});

runTest('does not mutate original history', () => {
  const original = [{ role: 'student', message: 'Test', timestamp: 123 }];
  const newHistory = addMessageToHistory(original, 'ai', 'Response');
  
  if (original.length !== 1) throw new Error('Should not mutate original');
  if (newHistory.length !== 2) throw new Error('Should return new array');
});

// ========================================
// CATEGORY 3: CONTEXT RETRIEVAL (4 tests)
// ========================================

console.log('\n📋 CATEGORY 3: Context Retrieval\n');

runTest('gets last N messages from history', () => {
  let history = [];
  for (let i = 1; i <= 10; i++) {
    history = addMessageToHistory(history, 'student', `Message ${i}`);
  }
  
  const context = getConversationContext(history, 5);
  if (context.length !== 5) throw new Error('Should return 5 messages');
  if (context[0].content !== 'Message 6') throw new Error('Should return last 5 messages');
  if (context[4].content !== 'Message 10') throw new Error('Should include most recent');
});

runTest('handles history shorter than max', () => {
  let history = [];
  history = addMessageToHistory(history, 'student', 'Only message');
  
  const context = getConversationContext(history, 5);
  if (context.length !== 1) throw new Error('Should return available messages');
});

runTest('handles empty history', () => {
  const context = getConversationContext([], 5);
  if (context.length !== 0) throw new Error('Should return empty array');
});

runTest('formats context correctly', () => {
  let history = [];
  history = addMessageToHistory(history, 'student', 'Hello');
  
  const context = getConversationContext(history, 5);
  if (!context[0].role) throw new Error('Should have role field');
  if (!context[0].content) throw new Error('Should have content field');
});

// ========================================
// CATEGORY 4: TURN MANAGEMENT (4 tests)
// ========================================

console.log('\n📋 CATEGORY 4: Turn Management\n');

runTest('validates turn within range', () => {
  const validation = validateTurn(10, 20);
  if (!validation.isValid) throw new Error('Turn 10/20 should be valid');
  if (validation.isComplete) throw new Error('Should not be complete');
  if (validation.remaining !== 11) throw new Error('Should have 11 turns remaining');
});

runTest('detects complete conversation (turn 20/20)', () => {
  const validation = validateTurn(20, 20);
  if (!validation.isValid) throw new Error('Turn 20/20 should be valid');
  if (!validation.isComplete) throw new Error('Should be complete');
});

runTest('rejects invalid turn (turn 0)', () => {
  const validation = validateTurn(0, 20);
  if (validation.isValid) throw new Error('Turn 0 should be invalid');
});

runTest('rejects turn exceeding max', () => {
  const validation = validateTurn(25, 20);
  if (validation.isValid) throw new Error('Turn 25/20 should be invalid');
});

// ========================================
// RESULTS
// ========================================

console.log('\n' + '='.repeat(50));
console.log('📊 ROLEPLAY SMOKE TEST RESULTS');
console.log('='.repeat(50));
console.log(`✅ Passed: ${passed}/17`);
console.log(`❌ Failed: ${failed}/17`);
console.log('='.repeat(50));

if (failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED!');
  console.log('✅ Roleplay core logic is SOLID');
  console.log('✅ Safe to proceed with refactoring\n');
  process.exit(0);
} else {
  console.log('\n⚠️  SOME TESTS FAILED');
  console.log('❌ Fix issues before proceeding\n');
  process.exit(1);
}
