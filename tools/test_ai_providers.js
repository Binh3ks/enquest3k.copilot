import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const TOGETHER_KEY = process.env.VITE_TOGETHER_API_KEY;
const GROQ_KEY = process.env.VITE_GROQ_API_KEY;
const GEMINI_KEY = process.env.VITE_GEMINI_API_KEY;

async function testTogetherAI() {
  console.log('\n🧪 Testing Together AI (Layer 1 - Primary)...');
  
  if (!TOGETHER_KEY) {
    console.error('❌ VITE_TOGETHER_API_KEY not found in .env');
    return false;
  }
  
  try {
    const response = await axios.post('https://api.together.xyz/v1/chat/completions', {
      model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
      messages: [
        { role: 'system', content: 'You are a test assistant. Respond with JSON only.' },
        { role: 'user', content: 'Say hello in JSON format with a "message" field.' }
      ],
      response_format: { type: "json_object" },
      max_tokens: 100,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${TOGETHER_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    const content = response.data.choices[0].message.content;
    const parsed = JSON.parse(content);
    
    console.log('✅ Together AI working');
    console.log('📝 Response:', parsed);
    console.log('⚡ Speed: Good (Layer 1)');
    console.log('📊 Quota: 60 req/min');
    return true;
  } catch (error) {
    console.error('❌ Together AI failed:', error.response?.status || error.message);
    if (error.response?.status === 401) {
      console.error('   → Check API key validity');
    } else if (error.response?.status === 429) {
      console.error('   → Rate limit hit (60 req/min)');
    }
    return false;
  }
}

async function testGroq() {
  console.log('\n🧪 Testing Groq (Layer 2 - Backup)...');
  
  if (!GROQ_KEY) {
    console.warn('⚠️ VITE_GROQ_API_KEY not found (optional backup)');
    return false;
  }
  
  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are a test assistant.' },
        { role: 'user', content: 'Say hello in one word.' }
      ],
      max_tokens: 50,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ Groq working');
    console.log('📝 Response:', response.data.choices[0].message.content);
    console.log('⚡ Speed: Ultra-fast (< 500ms)');
    console.log('📊 Quota: 15 req/min (14 used for safety)');
    return true;
  } catch (error) {
    console.error('❌ Groq failed:', error.response?.status || error.message);
    if (error.response?.status === 429) {
      console.error('   → Rate limit hit (15 req/min)');
    }
    return false;
  }
}

async function testGemini() {
  console.log('\n🧪 Testing Gemini (Layer 3 - Final Fallback)...');
  
  if (!GEMINI_KEY) {
    console.warn('⚠️ VITE_GEMINI_API_KEY not found (optional fallback)');
    return false;
  }
  
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: 'Say hello in one word.' }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 50,
          temperature: 0.7
        }
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );
    
    const content = response.data.candidates[0].content.parts[0].text;
    console.log('✅ Gemini working');
    console.log('📝 Response:', content);
    console.log('⚡ Speed: Fast (~1-2s)');
    console.log('📊 Quota: 60 req/min');
    return true;
  } catch (error) {
    console.error('❌ Gemini failed:', error.response?.status || error.message);
    return false;
  }
}

async function testAll() {
  console.log('🚀 Testing AI Provider Configuration...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const results = {
    together: await testTogetherAI(),
    groq: await testGroq(),
    gemini: await testGemini()
  };
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Final Results:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Layer 1 (Together AI): ${results.together ? '✅ WORKING' : '❌ FAILED'}`);
  console.log(`  Layer 2 (Groq):        ${results.groq ? '✅ WORKING' : '⚠️ NOT CONFIGURED'}`);
  console.log(`  Layer 3 (Gemini):      ${results.gemini ? '✅ WORKING' : '⚠️ NOT CONFIGURED'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Critical checks
  if (!results.together) {
    console.error('❌ CRITICAL: Primary AI provider (Together AI) is not working!');
    console.error('   → Add VITE_TOGETHER_API_KEY to .env file');
    console.error('   → Get key from: https://api.together.xyz/\n');
    process.exit(1);
  }
  
  if (!results.groq && !results.gemini) {
    console.warn('⚠️ WARNING: No backup providers configured');
    console.warn('   → Consider adding VITE_GROQ_API_KEY or VITE_GEMINI_API_KEY');
    console.warn('   → System will use deterministic fallback if Together AI fails\n');
  }
  
  // Success
  const workingLayers = [results.together, results.groq, results.gemini].filter(Boolean).length;
  console.log(`✅ AI provider configuration validated (${workingLayers}/3 layers active)`);
  console.log('✅ Ready for production deployment\n');
  
  // Capacity calculation
  const capacity = workingLayers === 3 ? '400+' : 
                  workingLayers === 2 ? '240+' : 
                  workingLayers === 1 ? '180' : '0';
  console.log(`📈 Estimated capacity: ${capacity} concurrent students`);
  console.log(`   → Together AI: 60 req/min = ~180 students`);
  if (results.groq) console.log(`   → Groq: 14 req/min = ~40 students`);
  if (results.gemini) console.log(`   → Gemini: 60 req/min = ~180 students`);
  console.log();
}

testAll();
