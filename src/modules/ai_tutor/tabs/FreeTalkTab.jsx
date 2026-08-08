import { extractHintsFromQuestion } from '../../../services/ai_tutor/utils/responseParser';
import { generateHints, isPerson as isPersonCheck } from '../../../services/ai_tutor/utils/hintGenerator'; // 🎯 DYNAMIC HINTS
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Heart, Sparkles, Loader2, Volume2, X } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import InputBar from '../components/InputBar';
import HintChips from '../components/HintChips';
import { NovaEngine } from '../../../services/ai_tutor/novaEngine';
import { textToSpeech } from '../../../services/ai_tutor/ttsEngine';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';
import week1RealData from '../../../data/weeks/week_01_real';
import week2RealData from '../../../data/weeks/week_02_real';
import week3RealData from '../../../data/weeks/week_03_real'; // Week 3 syllabus
import week4RealData from '../../../data/weeks/week_04_real'; // Week 4 syllabus
import week5RealData from '../../../data/weeks/week_05_real'; // Week 5 syllabus
import week6RealData from '../../../data/weeks/week_06_real'; // Week 6 syllabus
import week7RealData from '../../../data/weeks/week_07_real'; // Week 7 syllabus
import week8RealData from '../../../data/weeks/week_08_real'; // Week 8 syllabus
import week9RealData from '../../../data/weeks/week_09_real'; // Week 9 syllabus - City Sounds & Sights
import week10RealData from '../../../data/weeks/week_10_real'; // Week 10 syllabus - The Farm Adventure
import week11RealData from '../../../data/weeks/week_11_real'; // Week 11 syllabus - Weekend Fun Spots
import week12RealData from '../../../data/weeks/week_12_real'; // Week 12 syllabus - The Talent Show
import week13RealData from '../../../data/weeks/week_13_real'; // Week 13 syllabus - Daily Routines
import week14RealData from '../../../data/weeks/week_14_real'; // Week 14 syllabus - Welcome to My World
import week15RealData from '../../../data/weeks/week_15_real'; // Week 15 syllabus - The Busy Park 🏞️
import week16RealData from '../../../data/weeks/week_16_real'; // Week 16 syllabus - Sports Commentary 🏃‍♂️
import week17RealData from '../../../data/weeks/week_17_real'; // Week 17 syllabus - Weather & Clothes ☂️
import week18RealData from '../../../data/weeks/week_18_real'; // Week 18 syllabus - The Live Reporter
import week19RealData from '../../../data/weeks/week_19_real'; // Week 19 syllabus - When I Was Small
import week20RealData from '../../../data/weeks/week_20_real'; // Week 20 syllabus - The Old Town Mystery
import week21RealData from '../../../data/weeks/week_21_real'; // Week 21 syllabus - Yesterday's Diary
import week22RealData from '../../../data/weeks/week_22_real'; // Week 22 syllabus - The Time Detective
import week23RealData from '../../../data/weeks/week_23_real'; // Week 23 syllabus - The Art Class
import week24RealData from '../../../data/weeks/week_24_real'; // Week 24 syllabus - Feelings in the Past
import week25RealData from '../../../data/weeks/week_25_real'; // Week 25 syllabus - The Sequence Challenge
import week26RealData from '../../../data/weeks/week_26_real'; // Week 26 syllabus - My Weekend Comic Strip
import week27RealData from '../../../data/weeks/week_27/week_27_real'; // Week 27 syllabus - Maya's Growing Plant
import week28RealData from '../../../data/weeks/week_28_real'; // Week 28 syllabus - The Tortoise and the Hare
import week29RealData from '../../../data/weeks/week_29/week_29_real'; // Week 29 syllabus - Off We Go! Irregular Verbs 1
import week30RealData from '../../../data/weeks/week_30/week_30_real'; // Week 30 syllabus - The Perfect Picnic Irregular Verbs 2
import week31RealData from '../../../data/weeks/week_31/week_31_real'; // Week 31 syllabus - The Senses Irregular Verbs 3
import week32RealData from '../../../data/weeks/week_32/week_32_real'; // Week 32 syllabus
import week33RealData from '../../../data/weeks/week_33/week_33_real'; // Week 33 syllabus - The Mistake Irregular Verbs 5 - The Busy Day Irregular Verbs 4
import week34RealData from '../../../data/weeks/week_34/week_34_real'; // Week 34 syllabus - Storytelling Fable
import week35RealData from '../../../data/weeks/week_35/week_35_real'; // Week 35 syllabus - Environmental Issues
import week36RealData from '../../../data/weeks/week_36_real?v=10'; // Week 36 syllabus - Adventure Stories (CACHE BUST)
import week37RealData from '../../../data/weeks/week_37_real'; // Week 37 syllabus - The Sports Day Challenge
import { useStationProgress } from '../../../hooks/useStationProgress'; // 🔥 Universal Progress System
import { useLocation } from 'react-router-dom'; // 🔥 Get weekId from URL pathname
import { FREE_TALK_ACTIONS } from '../../../config/freeTalkConfig'; // 💬 CHAT ACTIONS
import TTSSettingsPanel from '../components/TTSSettingsPanel';

/**
 * 🔧 Clean numbered list artifacts from AI responses before TTS
 * Removes leading numbers like "1. ", "2. ", "3. " that AI sometimes copies from prompts
 * @param {string} text - AI response text
 * @returns {string} Cleaned text without leading numbers
 */
function cleanNumberedListArtifacts(text) {
  if (!text || typeof text !== 'string') return text;
  
  // Remove leading numbers at start of text: "1. Topic xyz" → "Topic xyz"
  // Also handles multiple leading numbers in sentence starts
  return text
    .replace(/^\d+\.\s+/gm, '') // Remove "1. ", "2. ", etc. at line starts
    .replace(/\s+\d+\.\s+/g, ' ') // Remove " 1. ", " 2. " in middle of text
    .trim();
}

/**
 * Free Talk Tab - Casual conversation with subtle vocabulary scaffolding
 * Students chat naturally while Nova guides toward target vocabulary
 */

/**
 * Detect if student's message is off-topic for the current spark card.
 * Returns true only when the message has NO connection to the spark topic.
 * Lenient: scaffold starter patterns OR any topic keyword = on-topic.
 */
function isSparkOffTopic(message, card) {
  if (!message || !card) return false;
  const msg = message.trim();

  // Scaffold frame starters — student is trying to answer → always on-topic
  if (/^(my |i am |i'm |i can |i like |i love |i want |he is |she is |they are |it is |we are )/i.test(msg)) return false;

  // Collect topic keywords: title + vocab_focus + frame hints + template content words
  // Supports both W30 format (template/hints) and W31 format (prompt_en/hint_en/target_vocab)
  const topicWords = new Set();
  (card.title || '').toLowerCase().split(/\s+/).forEach(w => topicWords.add(w));
  (card.vocab_focus || []).forEach(w => topicWords.add(String(w).toLowerCase()));
  (card.target_vocab || []).forEach(w => topicWords.add(String(w).toLowerCase()));
  (card.frames || []).forEach(f => {
    // W30 format: { hints: [...], template: '...' }
    (f.hints || []).forEach(h => topicWords.add(String(h).toLowerCase()));
    (f.template || '').toLowerCase().replace(/___/g, '').split(/\s+/)
      .filter(w => w.length > 2).forEach(w => topicWords.add(w));
    // W31 format: { prompt_en: '...', hint_en: '...', target_vocab: [...] }
    (f.prompt_en || '').toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/)
      .filter(w => w.length > 2).forEach(w => topicWords.add(w));
    if (f.hint_en) {
      f.hint_en.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/)
        .filter(w => w.length > 2).forEach(w => topicWords.add(w));
    }
    (f.target_vocab || []).forEach(w => topicWords.add(String(w).toLowerCase()));
  });
  // Remove meaningless stop words so they don't accidentally match
  ['the', 'are', 'and', 'your', 'very', 'for', 'to', 'a', 'an'].forEach(w => topicWords.delete(w));

  const msgWords = msg.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);

  // 1-2 word answers from A0 students — too short to judge, let through
  if (msgWords.length <= 2) return false;

  // Any content word match → on-topic
  if (msgWords.some(w => topicWords.has(w))) return false;

}

function getMaxTurnsForWeek(weekNum, isRetell = false) {
  const w = Number(weekNum) || 1;
  if (isRetell) {
    if (w <= 5) return 6;
    if (w <= 14) return 8;
    if (w <= 28) return 10;
    if (w <= 42) return 12;
    return 14;
  }
  // Personal Application (Mission 3 & Free Talk)
  if (w <= 5) return 4;
  if (w <= 14) return 6;
  if (w <= 28) return 8;
  if (w <= 42) return 10;
  return 12;
}

const extractSayOptions = (text) => {
  if (!text) return [];
  const sayMatch = text.match(/\bSay:\s*([^.]+)/i);
  if (!sayMatch) return [];
  const optionsStr = sayMatch[1].trim();
  const parts = optionsStr.split(/\b,\s*or\s+|\bor\s+/i);
  return parts.map(p => p.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
};


/**
 * Generate a contextual follow-up question from a scaffold frame template.
 * Used as fallback for old-format weeks (scaffold_frames strings) without frame.follow_up_q.
 */
function generateFollowUpFromTemplate(template) {
  if (!template) return 'Tell me more about yourself! 😊';
  const t = template.replace(/___/g, '').trim();
  const myXIs = t.match(/^My (.+?) (?:is|are)\s*$/i);
  if (myXIs) return `What is your ${myXIs[1].toLowerCase()} like? Tell me! 😊`;
  const myFav = t.match(/^My (?:favourite|favorite) (.+?) (?:is|are)\s*$/i);
  if (myFav) return `Tell me about your favourite ${myFav[1].toLowerCase()}! ⭐`;
  const iLikeBec = t.match(/^I (?:like|love) (.+?) because\s*$/i);
  if (iLikeBec) return `Why do you ${t.toLowerCase().startsWith('i love') ? 'love' : 'like'} ${iLikeBec[1].toLowerCase()}? 💬`;
  const iWantBe = t.match(/^I want to be/i);
  if (iWantBe) return `What do you want to be when you grow up? 🌟`;
  const iCan = t.match(/^I can\s*$/i);
  if (iCan) return `What can you do really well? 💪`;
  const theyCan = t.match(/^They can\s*$/i);
  if (theyCan) return `What amazing things can they do? 💪`;
  const iAdmire = t.match(/^I admire/i);
  if (iAdmire) return `Why do you admire them? Tell me! ⭐`;
  return `Tell me more! What else did you see or do on your adventure? 😊`;
}

// Strip emoji characters before sending to TTS engine
const stripEmojiForTTS = (text) => {
  if (!text) return text;
  return text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{231A}-\u{231B}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2614}-\u{2615}\u{2648}-\u{2653}\u{267F}\u{2693}\u{26A1}\u{26AA}-\u{26AB}\u{26BD}-\u{26BE}\u{26C4}-\u{26C5}\u{26CE}\u{26D4}\u{26EA}\u{26F2}-\u{26F3}\u{26F5}\u{26FA}\u{26FD}\u{2702}\u{2705}\u{2708}-\u{270D}\u{270F}\u{2712}\u{2714}\u{2716}\u{271D}\u{2721}\u{2728}\u{2733}-\u{2734}\u{2744}\u{2747}\u{274C}\u{274E}\u{2753}-\u{2755}\u{2757}\u{2763}-\u{2764}\u{2795}-\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}\u{FE0F}\u{20E3}]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
};

const FreeTalkTab = () => {
  const { user } = useUserStore();
  const location = useLocation(); // 🔥 Get location from react-router
  // 🔥 Parse weekId from pathname: /week/2/read_explore -> 2
  const pathMatch = location.pathname.match(/\/week\/(\d+)/);
  const weekNumber = pathMatch ? parseInt(pathMatch[1]) : 1;
  console.log('🔥 FreeTalkTab pathname:', location.pathname, 'weekNumber:', weekNumber);
  const currentWeek = `week-${weekNumber}`; // 🔥 Construct currentWeek
  
  // 🔥 Universal Progress System Integration
  const { savedData, saveProgress, markComplete } = useStationProgress(weekNumber, 'ai_freetalk');
  
  // Separate selectors to prevent infinite re-renders
  const messages = useTutorStore(state => state.messages['freetalk'] || []);
  const addMessage = useTutorStore(state => state.addMessage);
  const autoPlayEnabled = useTutorStore(state => state.autoPlayEnabled);
  // 💡 Hint fade: W1-16 auto-show, W17+ hidden
  const storeHintsEnabled = useTutorStore(state => state.showHints);
  
  const [hints, setHints] = useState([]);
  const hintSelectRef = useRef(null); // ref to InputBar's setMessage
  const [isLoading, setIsLoading] = useState(false);
  const [conversationTopic, setConversationTopic] = useState(savedData.conversationTopic || '');
  const [showHints, setShowHints] = useState(false);
  const [messageCount, setMessageCount] = useState(savedData.totalTurns || 0);
  const [initialized, setInitialized] = useState(false);
  
  // � ROLEPLAY & CHAT STATE MANAGEMENT
  // W1-7: No idle free chat - force Conversation Cards first
  // 💬 SPARK TALK MODE STATE (init as 'idle'; useEffect below syncs to 'selecting_spark' once weekData loads)
  const [mode, setMode] = useState('idle'); // 'idle' | 'selecting_spark' | 'in_spark' | 'translation_help'
  const [activeActivityId, setActiveActivityId] = useState(null);
  const [turnCount, setTurnCount] = useState(0);
  // 🎮 Game / scenario state (used by word chain, 20Q, and compatibility checks)
  const [activeGame, setActiveGame] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);

  // 💬 SPARK TALK STATE
  const [activeSpark, setActiveSpark] = useState(null); // { sparkId, card, sparkTurnCount }
  const activeSparkDataRef = useRef(null); // Synchronous ref for spark data — always current, no React batching lag
  const [activeSparkFrame, setActiveSparkFrame] = useState(null); // Current frame {template, follow_up_q, hints}
  
  const [modeTurnLimits] = useState({
    translation_help: Infinity,
    idle: 15,
  });
  
  // 🔥 Dynamic week data selection (Fallback: Week 7 - Golden Standard) [v2.0]
  const weekRealData = weekNumber === 1 ? week1RealData : weekNumber === 2 ? week2RealData : weekNumber === 3 ? week3RealData : weekNumber === 4 ? week4RealData : weekNumber === 5 ? week5RealData : weekNumber === 6 ? week6RealData : weekNumber === 7 ? week7RealData : weekNumber === 8 ? week8RealData : weekNumber === 9 ? week9RealData : weekNumber === 10 ? week10RealData : weekNumber === 11 ? week11RealData : weekNumber === 12 ? week12RealData : weekNumber === 13 ? week13RealData : weekNumber === 14 ? week14RealData : weekNumber === 15 ? week15RealData : weekNumber === 16 ? week16RealData : weekNumber === 17 ? week17RealData : weekNumber === 18 ? week18RealData : weekNumber === 19 ? week19RealData : weekNumber === 20 ? week20RealData : weekNumber === 21 ? week21RealData : weekNumber === 22 ? week22RealData : weekNumber === 23 ? week23RealData : weekNumber === 24 ? week24RealData : weekNumber === 25 ? week25RealData : weekNumber === 26 ? week26RealData : weekNumber === 27 ? week27RealData : weekNumber === 28 ? week28RealData : weekNumber === 29 ? week29RealData : weekNumber === 30 ? week30RealData : weekNumber === 31 ? week31RealData : weekNumber === 32 ? week32RealData : weekNumber === 33 ? week33RealData : weekNumber === 34 ? week34RealData : weekNumber === 35 ? week35RealData : weekNumber === 36 ? week36RealData : weekNumber === 37 ? week37RealData : week7RealData;
  
  // 🎭 Get roleplays from weekRealData (NEW SYSTEM - NOT from dynamicRoleplays.js!)
  const dynamicRoleplays = weekRealData?.roleplay_scenarios || [];
  
  // 💬 SPARK TALK: AI-driven personal expression bridged from the week's story
  const sparkTalks = weekRealData?.spark_talk || [];

  // Sync mode when weekData loads: useState runs before weekRealData is computed
  // (weekRealData is a synchronous ternary but useState init already fired)
  useEffect(() => {
    const selectionModes = ['idle', 'selecting_spark'];
    if (!selectionModes.includes(mode)) return; // Don't interrupt active conversations
    setMode(sparkTalks.length > 0 ? 'selecting_spark' : 'idle');
  }, [weekNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const initializingRef = useRef(false); // 🔥 Prevent double initialization
  
  // 🔥 NEW: Initialize NovaEngine instance
  const novaEngineRef = useRef(null);
  
  // 🔥 Store weekNumber in ref to avoid closure issues
  const weekNumberRef = useRef(weekNumber);
  useEffect(() => {
    weekNumberRef.current = weekNumber;
  }, [weekNumber]);
  
  // Initialize NovaEngine when component mounts or week changes
  useEffect(() => {
    const initNovaEngine = async () => {
      const userProfile = {
        name: user?.display_name || user?.name || user?.username || 'Student',
        age: user?.age || 8
      };
      
      novaEngineRef.current = new NovaEngine(weekRealData, userProfile);
      console.log('🧠 NovaEngine initialized for FreeTalkTab with weekRealData:', weekRealData?.title);
      
      // 🔥 AFTER NovaEngine is ready, initialize conversation
      if (!initialized && !initializingRef.current) {
        initializingRef.current = true;
        setInitialized(false);
        setMessageCount(0);
        setConversationTopic('');
        
        initializeConversation().catch(err => {
          console.error('❌ initializeConversation error:', err);
          initializingRef.current = false;
        }).finally(() => {
          setInitialized(true);
        });
      }
    };
    
    initNovaEngine();
  }, [currentWeek, user]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeConversation = async () => {
    // 🔥 ALWAYS initialize fresh conversation - no caching
    console.log('🔄 FreeTalkTab: Starting fresh conversation with AI-generated greeting');
    console.log('🔥 DEBUG: weekNumberRef.current at initializeConversation:', weekNumberRef.current);
    
    try {
      // Get week data for AI context
      const weekData = await getCurrentWeekData(currentWeek || 'week-1');
      
      // 🔥 NEW: Let AI generate natural opening (NO hardcoded greetings)
      const aiResponse = await novaEngineRef.current.sendToNova({
        mode: 'freetalk',
        weekId: weekNumberRef.current,  // 🔥 V27: Pass weekId for freetalk_knowledge
        userMessage: '[SYSTEM: Start conversation with natural greeting]',
        chatHistory: [],
        context: {
          turnCount: 0,
          scaffoldingLevel: weekNumberRef.current <= 14 ? 1 : weekNumberRef.current <= 42 ? 2 : weekNumberRef.current <= 78 ? 3 : 4,
          conversationTopic: 'opening',
          isOpeningTurn: true,
          weekTitle: weekRealData?.week_title_en || '',
          storyCharacter: weekRealData?.story_missions?.[0]?.story_character?.name || ''
        }
      });
      
      // 🔥 NARRATIVE-AWARE GREETING: use AI response, fallback to hardcoded narrative greeting
      const weekTitle = weekRealData?.week_title_en || '';
      const storyChar = weekRealData?.story_missions?.[0]?.story_character?.name || '';
      // Use AI-generated greeting when available; fallback to story-bridge hardcoded text
      let greetingText;
      if (aiResponse?.message && aiResponse.message.trim().length > 0) {
        greetingText = aiResponse.message;
        console.log('💬 FreeTalkTab: Using AI-generated greeting');
      } else if (storyChar && storyChar !== 'Nova') {
        greetingText = `Hi! We just learned about ${storyChar}! 📖 Now it's YOUR turn to tell me about yourself!`;
        console.log('💬 FreeTalkTab: Using narrative story-bridge greeting');
      } else if (weekTitle) {
        greetingText = `Hi! I'm Nova ⭐ Let's have a free chat! Pick something below 👇`;
        console.log('💬 FreeTalkTab: Using free-talk fallback greeting');
      } else {
        greetingText = "Hello! I'm Nova ⭐. Let's chat! 👇";
        console.log('💬 FreeTalkTab: Using default greeting');
      }

      addMessage('freetalk', { role: 'assistant', content: greetingText, timestamp: Date.now() });

      // 🔥 Opening hints: prefer AI hints → week vocab starter words → fallback
      let contextualHints;
      if (aiResponse?.suggested_hints && aiResponse.suggested_hints.length > 0) {
        contextualHints = aiResponse.suggested_hints.sort(() => Math.random() - 0.5);
      } else {
        // Build scaffold hints from week vocab (first 3 words student should know)
        const weekVocab = weekRealData?.target_vocab || [];
        const vocabWords = weekVocab.slice(0, 6).map(v => typeof v === 'string' ? v : v.word).filter(Boolean);
        const starterWords = ['My', 'I', 'am', 'is', ...vocabWords].slice(0, 5);
        contextualHints = starterWords.length >= 3 ? starterWords : ['My', 'name', 'is', 'I', 'am'];
      }
      
      setHints(contextualHints);
      setShowHints(true);
      console.log('💡 Opening hints (contextual & scrambled):', contextualHints);
      
      // 🔊 Play TTS for opening message (static cache)
      if (autoPlayEnabled) {
        try {
          // 🎯 Static cache for hardcoded greeting
          const greetingContext = {
            type: 'freetalk_greeting',
            weekNum: weekNumberRef.current,
            subType: 'opening'
          };
          await textToSpeech(greetingText, { 
            autoPlay: true, 
            preferredLayer: 'auto', 
            mode: 'conversation',
            context: greetingContext
          });
          console.log('🔊 TTS played successfully (static cache)');
        } catch (error) {
          console.error('❌ TTS error:', error);
        }
      }
    } catch (error) {
      console.error('❌ Error generating AI greeting:', error);
      
      // Fallback to simple greeting if AI fails
      const fallbackGreeting = "Hello! I'm Nova ⭐. Let's chat! 👇";
      const welcomeMessage = {
        role: 'assistant',
        content: fallbackGreeting,
        timestamp: Date.now()
      };
      addMessage("freetalk", welcomeMessage);
      setHints(['My', 'name', 'is', 'I', 'am']);
      setShowHints(true);
    }
  };

  // Handle user message
  const handleSendMessage = async (userMessage) => {
    // 🔥 PER-MODE TURN LIMIT: Check limit for current mode
    const currentModeLimit = modeTurnLimits[mode] || 15;
    
    if (turnCount >= currentModeLimit && currentModeLimit !== Infinity) {
      console.log(`⛔ FreeTalk: ${mode} mode limit reached (${currentModeLimit} turns) - cannot send more messages in this mode`);
      return; // Don't process any more messages in this mode
    }
    
    // Add user message to chat
    const userMsg = {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };
    addMessage("freetalk", userMsg);
    setIsLoading(true);
    
    // 🎮 Increment turn count for ALL modes (except selecting menus)
    if (mode !== 'selecting_game' && mode !== 'selecting_spark') {
      setTurnCount(prev => prev + 1);
      
      // Auto-exit after reaching limit
      if (turnCount + 1 >= currentModeLimit && currentModeLimit !== Infinity) {
        console.log(`✅ ${mode} mode complete at ${turnCount + 1}/${currentModeLimit} turns`);
        // Don't reset immediately - let closing message play first
      }
    }
    
    // Update message count
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    
    // 🔥 Save progress to Universal Progress System (debounced) - OUTSIDE setState
    // Track which target vocab words the student used
    const targetVocab = (weekRealData?.target_vocab || weekRealData?.global_vocab || [])
      .map(v => (typeof v === 'string' ? v : v?.word)).filter(Boolean);
    const msgLower = userMessage.toLowerCase();
    const usedNow = targetVocab.filter(w => msgLower.includes(w.toLowerCase()));
    const updatedVocabUsed = [...new Set([...(savedData.vocabUsed || []), ...usedNow])];

    saveProgress({
      totalTurns: newCount,
      conversationTopic: conversationTopic || userMessage.split(' ')[0],
      lastMessageAt: new Date().toISOString(),
      vocabUsed: updatedVocabUsed
    }, false, Math.min(100, newCount * 5)); // Score based on engagement

    // Detect topic from first user message
    if (messageCount === 0 && userMessage.length > 10) {
      setConversationTopic(userMessage.split(' ')[0]);
    }
    
    try {
      // ⚡ INSTANT MODE SWITCH: Allow immediate mode change on first button click
      const isModeSwitchCommand = userMessage === 'Translate this for me...' || userMessage === 'I have a question!';
      if (isModeSwitchCommand && mode === 'in_spark') {
        // Exit spark immediately when switching modes
        setActiveSpark(null);
        setMode('idle');
        setActiveActivityId(null);
        setTurnCount(0);
      }
      let effectiveGame = activeGame; // 🎮 Track active game across turns
      let effectiveScenario = null; // 🎭 Track roleplay scenario (for removed roleplay feature - kept for compatibility)
      
      // 🎮 WORD CHAIN - INITIAL HINTS GENERATION (for START_GAME)
      let initialGameHints = null;
      if (userMessage.startsWith('START_GAME: word_chain')) {
        // Load cumulative vocab pool
        const currentWeek = weekNumberRef.current || 1;
        const cumulativeVocab = [];
        
        for (let w = 1; w <= currentWeek; w++) {
          try {
            const weekModule = await import(`../../../data/weeks/week_${String(w).padStart(2, '0')}_real.js`);
            const weekData = weekModule.default || weekModule[`week${w}RealData`];
            if (weekData?.target_vocab) {
              const vocabWords = weekData.target_vocab.map(v => 
                typeof v === 'string' ? v : v.word
              ).filter(Boolean);
              cumulativeVocab.push(...vocabWords);
            }
          } catch (err) {
            console.warn(`Could not load vocab from week ${w}:`, err);
          }
        }
        
        const basicA0Words = [
          'yes', 'no', 'hi', 'bye', 'thanks', 'sorry', 'hello', 'goodbye',
          'boy', 'girl', 'cat', 'dog', 'mom', 'dad', 'home', 'school',
          'red', 'blue', 'big', 'small', 'happy', 'sad', 'good', 'bad'
        ];
        
        const fullVocabPool = [...new Set([...cumulativeVocab, ...basicA0Words])];
        
        // Pick a random starter word
        const starterWord = fullVocabPool[Math.floor(Math.random() * fullVocabPool.length)];
        const starterLetter = starterWord.charAt(starterWord.length - 1).toUpperCase();
        
        // Generate 3 hints containing the starter letter
        let hints = fullVocabPool.filter(w => w.toUpperCase().includes(starterLetter)).slice(0, 3);
        if (hints.length === 0) hints = ['try', 'again', 'please'];
        
        initialGameHints = {
          starterWord: starterWord.toUpperCase(),
          starterLetter,
          validatedHints: hints
        };
        
        console.log('🎮 Initial Game Hints Generated:', initialGameHints);
      }
      
      // 🎯 20 QUESTIONS - INITIAL HINTS GENERATION (for START_GAME)
      if (userMessage.startsWith('START_GAME: twenty_questions') || userMessage.startsWith('START_GAME: guess it!')) {
        // This will be set later after secretObject is selected (see below)
        // We'll generate hints in the START_GAME detection block
      }
      
      // 🎮 DETECT START_GAME: Set activeGame state to persist game context
      if (userMessage.startsWith('START_GAME:')) {
        const gameNameRaw = userMessage.split(':')[1]?.trim();
        const gameIdMap = {
          'word_chain': 'word_chain',
          'twenty_questions': 'twenty_questions',
          'guess it!': 'twenty_questions',
          'sentence_builder': 'sentence_builder'
        };
        const gameId = gameIdMap[gameNameRaw?.toLowerCase()] || gameNameRaw;
        
        // 🎲 For 20 Questions, pre-select secret object from CUMULATIVE NOUNS
        let secretObject = null;
        if (gameId === 'twenty_questions') {
          // Import getCumulativeNouns to get ALL nouns from Week 1 → current
          const { getCumulativeNouns } = await import('../../../config/gameAdaptation.js');
          const weekNumber = weekNumberRef.current || 5;

          // Get cumulative nouns (Week 1 → current week)
          const allowedObjects = getCumulativeNouns(weekNumber);

          if (allowedObjects.length > 0) {
            secretObject = allowedObjects[Math.floor(Math.random() * allowedObjects.length)];
            console.log('🎲 20 Questions: Selected from CUMULATIVE NOUNS:', secretObject, 'Week:', weekNumber, 'Total nouns:', allowedObjects.length);
          } else {
            // Fallback (should never happen)
            secretObject = 'book';
            console.log('🎲 20 Questions: Fallback to "book"');
          }
          
          // 🎯 Generate initial hints DYNAMICALLY (NO HARDCODING!)
          const initialHints = generateHints(secretObject);
          const isPerson = isPersonCheck(secretObject);
          
          initialGameHints = {
            secretObject,
            initialHints,
            isPerson
          };
          
          console.log('🎯 20Q Initial Hints Generated DYNAMICALLY:', initialGameHints);
        }
        
        effectiveGame = { id: gameId, secretObject, turnCount: 0 };
        setActiveGame(effectiveGame);
        console.log('🎮 Game started:', effectiveGame);
      }
      
      // 🎮 WORD CHAIN VALIDATION: Check if student's answer is valid
      let validationResult = null;
      const lastAIMsg = messages[messages.length - 1]?.content || '';
      const isInWordChain = lastAIMsg.includes('Find word with') || lastAIMsg.includes('Word Chain');
      
      if (isInWordChain && !userMessage.startsWith('START_')) {
        // Extract required letter from AI message
        const letterMatch = lastAIMsg.match(/Find word with ([A-Z])!/i);
        if (letterMatch) {
          const requiredLetter = letterMatch[1].toUpperCase();
          const studentWord = userMessage.trim().toUpperCase();
          const hasLetter = studentWord.includes(requiredLetter);
          
          // 🎯 TRACK ROUND NUMBER from AI message
          const roundMatch = lastAIMsg.match(/Round (\d+)\/20/i);
          const currentRound = roundMatch ? parseInt(roundMatch[1]) : 1;
          
          // 🎯 CUMULATIVE VOCAB POOL (Scaffolding Strategy)
          // Collect vocab from Week 1 to current week (not just current week)
          const currentWeek = weekNumberRef.current || 1;
          const cumulativeVocab = [];
          
          // Add vocab from all previous weeks (Week 1 to current)
          for (let w = 1; w <= currentWeek; w++) {
            try {
              const weekModule = await import(`../../../data/weeks/week_${String(w).padStart(2, '0')}_real.js`);
              const weekData = weekModule.default || weekModule[`week${w}RealData`];
              if (weekData?.target_vocab) {
                const vocabWords = weekData.target_vocab.map(v => 
                  typeof v === 'string' ? v : v.word
                ).filter(Boolean);
                cumulativeVocab.push(...vocabWords);
              }
            } catch (err) {
              console.warn(`Could not load vocab from week ${w}:`, err);
            }
          }
          
          // Add basic A0-level words if cumulative vocab is small
          const basicA0Words = [
            'yes', 'no', 'hi', 'bye', 'thanks', 'sorry', 'hello', 'goodbye',
            'boy', 'girl', 'cat', 'dog', 'mom', 'dad', 'home', 'school',
            'red', 'blue', 'big', 'small', 'happy', 'sad', 'good', 'bad'
          ];
          
          const fullVocabPool = [...new Set([...cumulativeVocab, ...basicA0Words])];
          
          console.log('🎓 Cumulative Vocab Pool:', {
            currentWeek,
            totalWords: fullVocabPool.length,
            sample: fullVocabPool.slice(0, 10)
          });
          
          // 🔍 CORRECT LOGIC: If student is RIGHT, pick AI's next word
          // If student is WRONG, keep same required letter for retry
          let aiNextWord, aiNextLetter, validatedHints;
          
          if (hasLetter) {
            // ✅ Student CORRECT: Pick new word from student's last letter
            const nextLetter = studentWord.charAt(studentWord.length - 1);
            const candidateWords = fullVocabPool.filter(w => w.toUpperCase().includes(nextLetter));
            
            if (candidateWords.length > 0) {
              // 🎯 DIVERSIFY: Prefer words ending with DIFFERENT letters to avoid loops
              const wordsWithDifferentEndings = candidateWords.filter(w => 
                w.charAt(w.length - 1).toUpperCase() !== nextLetter
              );
              
              // Use diversified list if available, fallback to all candidates
              const pickList = wordsWithDifferentEndings.length >= 3 ? wordsWithDifferentEndings : candidateWords;
              aiNextWord = pickList[Math.floor(Math.random() * pickList.length)].toUpperCase();
              aiNextLetter = aiNextWord.charAt(aiNextWord.length - 1);
              
              // ✅ FIX: Generate hints that ACTUALLY contain AI's next letter
              const hintsPool = fullVocabPool.filter(w => {
                const upperW = w.toUpperCase();
                return upperW.includes(aiNextLetter) && upperW !== aiNextWord;
              });
              validatedHints = hintsPool.slice(0, 3).map(w => w.toLowerCase());
              
              // Fallback if not enough hints
              if (validatedHints.length < 3) {
                validatedHints = [...validatedHints, 'try', 'again'].slice(0, 3);
              }
            }
          } else {
            // ❌ Student WRONG: Keep same required letter, regenerate hints
            aiNextWord = null;
            aiNextLetter = requiredLetter;
            
            // ✅ FIX: Only suggest words that ACTUALLY contain the required letter
            const hintsPool = fullVocabPool.filter(w => {
              const upperW = w.toUpperCase();
              return upperW.includes(requiredLetter);
            });
            validatedHints = hintsPool.slice(0, 3).map(w => w.toLowerCase());
            
            // Fallback if no valid hints
            if (validatedHints.length === 0) {
              validatedHints = ['try', 'again', 'please'];
            }
          }
          
          console.log('🔍 Word Chain Validation:', {
            requiredLetter,
            studentWord,
            hasLetter,
            studentWordSpelled: studentWord.split('').join('-'),
            aiNextWord,
            aiNextLetter,
            validatedHints,
            vocabPoolSize: fullVocabPool.length
          });
          
          validationResult = {
            isCorrect: hasLetter,
            requiredLetter,
            studentWord,
            studentWordSpelled: studentWord.split('').join('-'),
            aiNextWord,  // Word AI will say next (if student correct)
            aiNextLetter,  // Letter for next round
            validatedHints,  // 🎯 CODE-VALIDATED hints (for NEXT round)
            roundNumber: currentRound  // Current round number
          };
        }
      }
      
      // 🎯 20 QUESTIONS: Code-level validation (AI CANNOT override!)
      let twentyQuestionsValidation = null;
      const isIn20Questions = effectiveGame?.id === 'twenty_questions' && effectiveGame?.secretObject;
      
      console.log('🔍 20Q Validation Check:', {
        effectiveGameId: effectiveGame?.id,
        hasSecret: !!effectiveGame?.secretObject,
        secretObject: effectiveGame?.secretObject,
        isIn20Questions,
        userMessage: userMessage.slice(0, 30)
      });
      
      if (isIn20Questions && !userMessage.startsWith('START_')) {
        const currentSecret = effectiveGame.secretObject.toLowerCase();
        const studentMsg = userMessage.toLowerCase().trim();
        const cleanedGuess = studentMsg.replace(/^(is it |it's |its |a |an |the |my )/gi, '').replace(/[?!.,]/g, '').trim();

        // Import getCumulativeNouns for allowed objects
        const { getCumulativeNouns } = await import('../../../config/gameAdaptation.js');
        const weekNumber = weekNumberRef.current || 5;
        const allowedObjects = getCumulativeNouns(weekNumber);

        // 🎯 Detect YES/NO questions by structure (not just punctuation)
        // Speech recognition may use "!" instead of "?" for questions
        // MUST BE DEFINED FIRST - used in isYesNoWithAnswer below
        const questionStarters = ['is it', 'is he', 'is she', 'is this', 'is that',
                                  'does it', 'does he', 'does she',
                                  'can it', 'can i', 'can you',
                                  'do you', 'are they', 'are you'];
        const startsWithQuestion = questionStarters.some(q => studentMsg.startsWith(q));
        const isYesNoQuestion = startsWithQuestion || studentMsg.endsWith("?");

        // 🎯 Check guess type
        // ✅ FIX: Only treat as guess if it's the MAIN answer (not part of a question)
        // Questions like "Is it a photo?" or "Can you see the photo?" should be YES/NO, not guesses
        const isDirectGuess = (cleanedGuess === currentSecret) || 
                              (studentMsg === currentSecret) ||
                              (studentMsg === `a ${currentSecret}`) ||
                              (studentMsg === `an ${currentSecret}`) ||
                              (studentMsg === `the ${currentSecret}`);
        
        // Only treat as correct guess if it's a direct answer, NOT a question
        const isCorrectGuess = isDirectGuess && !studentMsg.includes("?");
        
        // 🎯 NEW: Detect YES/NO question that contains the correct answer
        // Example: "Is it my brother?" or "Can I see outside through it!" (note: speech may use !)
        // When question contains the secret, it should end the round
        const isYesNoWithAnswer = (studentMsg.endsWith("?") || startsWithQuestion) && (
          studentMsg.includes(currentSecret) ||
          studentMsg.includes(`my ${currentSecret}`) ||
          studentMsg.includes(`your ${currentSecret}`) ||
          studentMsg.includes(`a ${currentSecret}`) ||
          studentMsg.includes(`an ${currentSecret}`) ||
          studentMsg.includes(`the ${currentSecret}`)
        );
        
        const isGiveUp = studentMsg.includes("what is it") || studentMsg.includes("i don't know") ||
                         studentMsg.includes("tell me") || studentMsg.includes("give up") ||
                         studentMsg.includes("không biết") || studentMsg.includes("cho biết");

        // Pick NEW secret for next round (used for correct guess or give up)
        const remainingObjects = allowedObjects.filter(obj => obj.toLowerCase() !== currentSecret);
        const newSecret = remainingObjects.length > 0
          ? remainingObjects[Math.floor(Math.random() * remainingObjects.length)]
          : allowedObjects[0];

        // 🎯 Generate hints DYNAMICALLY for the new object (NO HARDCODING!)
        const newHints = generateHints(newSecret);
        const isPerson = isPersonCheck(newSecret);
        const currentSecretIsPerson = isPersonCheck(currentSecret);

        console.log('🎯 20Q CODE Validation:', {
          currentSecret,
          cleanedGuess,
          studentMsg,
          isCorrectGuess,
          isYesNoWithAnswer,
          isGiveUp,
          isYesNoQuestion,
          newSecret,
          newHints
        });

        if (isCorrectGuess || isYesNoWithAnswer) {
          // ✅ CORRECT GUESS - Update state and prepare response
          effectiveGame = { ...effectiveGame, secretObject: newSecret, turnCount: (effectiveGame.turnCount || 0) + 1 };
          setActiveGame(effectiveGame);

          twentyQuestionsValidation = {
            type: 'correct',
            currentSecret,
            studentGuess: cleanedGuess,
            newSecret,
            newHints,
            isPerson,
            turnCount: effectiveGame.turnCount
          };
          
          console.log('🎉 20Q CORRECT GUESS - Validation created:', twentyQuestionsValidation);
        } else if (isGiveUp) {
          // 🏳️ GIVE UP - Reveal and start new round
          effectiveGame = { ...effectiveGame, secretObject: newSecret, turnCount: (effectiveGame.turnCount || 0) + 1 };
          setActiveGame(effectiveGame);

          twentyQuestionsValidation = {
            type: 'giveup',
            currentSecret,
            newSecret,
            newHints,
            isPerson,
            turnCount: effectiveGame.turnCount
          };
        } else if (isYesNoQuestion) {
          // ❓ YES/NO QUESTION - Let AI answer (maintain same turn count)
          twentyQuestionsValidation = {
            type: 'yesno',
            currentSecret,
            studentQuestion: studentMsg,
            allowedObjects,
            isPerson: currentSecretIsPerson,
            turnCount: (effectiveGame.turnCount || 0) + 1  // Increment for display, but don't update state yet
          };
        } else {
          // ❌ WRONG GUESS - Give hint (maintain same turn count)
          twentyQuestionsValidation = {
            type: 'wrong',
            currentSecret,
            studentGuess: cleanedGuess,
            hint: currentSecret.charAt(0).toUpperCase(),
            isPerson: currentSecretIsPerson,
            turnCount: (effectiveGame.turnCount || 0) + 1  // Increment for display
          };
        }
      }

      if (userMessage.startsWith('START_SPARK:')) {
        const sparkId = userMessage.split(':')[1]?.trim();
        const spark = sparkTalks.find(s => String(s.id) === sparkId);
        if (spark) {
          console.log('💬 Starting Spark Talk:', sparkId);
          // Sync update: ref is available immediately, state updates on next render.
          // This ensures the spark block (which fires on the NEXT user message) sees correct spark data.
          activeSparkDataRef.current = spark;
          setActiveSpark({ sparkId, card: spark, sparkTurnCount: 0 });
          setActiveActivityId(sparkId);
          setTurnCount(0);
          setMode('in_spark');

          // 💬 SPARK TALK OPENING: Use bridge + seed directly — no AI call needed.
          // Calling AI here caused Nova to interpret [SPARK_TALK_START] as a student message
          // and respond to it instead of asking the seed question.
          const firstFramePrompt = (spark.frames && spark.frames.length > 0) ? spark.frames[0].prompt_en : null;
          const seedQ = spark.seed_question || spark.text_en || spark.prompt_en || '';
          const sparkOpeningText = firstFramePrompt || (spark.bridge ? `${spark.bridge} ${seedQ}` : seedQ);

          addMessage('freetalk', { role: 'assistant', content: sparkOpeningText, timestamp: Date.now() });

          // Opening hints: normalize frames, set initial frame, show word options from first frame
          // Supports two formats:
          //   - W30 reference: [{ template, follow_up_q, hints, hint_en }]
          //   - W31 format:    [{ frame, prompt_en, hint_en, target_vocab }]
          const rawFrames = (spark.frames || [])
            || (spark.scaffold_frames || []).map(f => ({ template: f, follow_up_q: null, hints: [] }));
          const normalizedFrames = rawFrames.map(f => {
            // W31 format: { frame: N, prompt_en: "...", hint_en: "..." }
            if (f.frame !== undefined && f.prompt_en) {
              return {
                template: f.prompt_en,
                follow_up_q: f.prompt_en,
                prompt_en: f.prompt_en,
                hints: f.target_vocab || [],
                hint_en: f.hint_en || null,
              };
            }
            return f;
          });
          setActiveSparkFrame(normalizedFrames[0] || null);
          const wkOpen = weekNumberRef.current;
          if (wkOpen <= 10) {
            // W1-10: Raw hint words — render layer converts to full sentences + makes them clickable
            const frame0 = normalizedFrames[0];
            const openingHints = frame0?.hints?.length > 0
              ? frame0.hints
              : normalizedFrames.map(f => f.template || f).filter(Boolean).slice(0, 3);
            if (openingHints.length > 0) { setHints(openingHints); setShowHints(true); }
          } else if (wkOpen <= 20) {
            // W11-20: Word hints only — student knows the pattern, just needs vocabulary
            const wordHints = normalizedFrames[0]?.hints || [];
            if (wordHints.length > 0) { setHints(wordHints); setShowHints(true); }
            else { setShowHints(false); }
          } else {
            const sayOptions = extractSayOptions(sparkOpeningText);
            if (sayOptions.length > 0) {
              setHints(sayOptions); setShowHints(true);
            } else {
              const h = normalizedFrames[0]?.hint_en;
              if (h) { setHints([h]); setShowHints(true); }
              else { setHints([]); setShowHints(false); }
            }
          }

          if (autoPlayEnabled) {
            try {
              await textToSpeech(cleanNumberedListArtifacts(sparkOpeningText), {
                autoPlay: true, preferredLayer: 'auto', mode: 'conversation'
              });
            } catch (err) { console.error('❌ Spark Talk TTS error:', err); }
          }

          setIsLoading(false);
          return;
        }
      }

      // 💬 SPARK TALK: In-spark turn — check if we've reached the target turns and end naturally
      if (mode === 'in_spark' && activeSpark && !userMessage.startsWith('START_')) {
        // Use ref for spark data to avoid stale closure from React's async state batching.
        const sparkData = activeSparkDataRef.current || activeSpark.card || activeSpark;
        const newSparkTurn = (activeSpark.sparkTurnCount || 0) + 1;
        setActiveSpark(prev => ({ ...prev, sparkTurnCount: newSparkTurn }));

        const targetTurns = sparkData.turns || getMaxTurnsForWeek(weekNumberRef.current);

        // ✅ DETERMINISTIC SPARK FOLLOW-UP: All weeks — skip AI, use scaffold frame directly
        if (true) { // deterministic for all weeks
          // Normalize: support W30 format {template,follow_up_q,hints} AND W31 format {frame,prompt_en,hint_en}
          const rawFrames = (sparkData.frames || [])
            .map(f => {
              // W31 format: { frame: N, prompt_en: "...", hint_en: "..." }
              if (f.frame !== undefined && f.prompt_en) {
                return { template: f.prompt_en, follow_up_q: null, hints: [], hint_en: f.hint_en || null };
              }
              return f;
            });
          // Sequential progression with cycling: advance through frames[1..N-1], then cycle back
          // Always cycle (modulo) — this handles any number of frames gracefully
          // Turn 1 → frame[1], Turn 2 → frame[2], Turn N → frame[N], Turn N+1 → frame[1]
          // hasCycled: we've gone past rawFrames.length (used all frames at least once)
          const cycleLen = Math.max(1, rawFrames.length - 1); // frames 1..N-1
          const frameIndex = ((newSparkTurn - 1) % cycleLen) + 1;
          const currentFrame = rawFrames[frameIndex] ?? rawFrames[rawFrames.length - 1] ?? null;
          const hasCycled = newSparkTurn > rawFrames.length;

          // ── ACK + RECAST from student's actual answer ──
          const buildRecast = (msg) => {
            const m = msg.replace(/[.!?]+$/, '').trim();
            // Shift person: I→you, my→your, me→you
            const shift = (str) => str.toLowerCase()
              .replace(/\bmy\b/g, 'your').replace(/\bi\b/g, 'you').replace(/\bme\b/g, 'you');
            // My X is/was Y → Your X is/was Y!
            const myXisY = m.match(/^My (.+?) (?:is|are|was|were) (.+)$/i);
            if (myXisY) return `Your ${shift(myXisY[1])} ${/was|were/i.test(myXisY[0]) ? 'was' : 'is'} ${shift(myXisY[2])}!`;
            // I am / I'm X → You are X!
            const iAm = m.match(/^I(?:'m| am) (.+)$/i);
            if (iAm) return `You are ${shift(iAm[1])}!`;
            // I like/love/enjoy X → You love X!
            const iLike = m.match(/^I (?:like|love|enjoy) (.+?)(?:\s+because.+)?$/i);
            if (iLike) return `You love ${shift(iLike[1])}!`;
            // He/She/It/They is/are/was/were X → same subject + shifted predicate
            const heIs = m.match(/^(He|She|It|They) (?:is|are|was|were) (.+)$/i);
            if (heIs) return `${heIs[1]} ${/was|were/i.test(heIs[0]) ? 'was' : 'is'} ${shift(heIs[2])}!`;
            // I can X → You can X!
            const iCan = m.match(/^I can (.+)$/i);
            if (iCan) return `You can ${shift(iCan[1])}!`;
            // I want to be X → You want to be a X!
            const iWant = m.match(/^I want to be (?:a |an )?(.+)$/i);
            if (iWant) return `You want to be a ${shift(iWant[1])}!`;
            // General I + any verb (handles past tense: I went, I saw, I felt…)
            const iGeneral = m.match(/^I (\w+)(.*)?$/i);
            if (iGeneral) return `You ${iGeneral[1].toLowerCase()}${iGeneral[2] ? shift(iGeneral[2]) : ''}!`;
            // Short answers ≤3 words: apply person-shift then capitalize
            if (m.split(/\s+/).length <= 3) {
              const shifted = shift(m);
              return `${shifted.charAt(0).toUpperCase() + shifted.slice(1)}!`;
            }
            return null;
          };

          // ✅ FINAL TURN: ACK + warm farewell
          // Non-cycling (targetTurns <= frames): farewell when target reached
          // Cycling (targetTurns > frames): farewell when one cycle complete AND target reached
          const farewell = hasCycled
            ? (newSparkTurn - rawFrames.length) >= (targetTurns - rawFrames.length)
            : newSparkTurn >= targetTurns;
          if (farewell) {
            const recast = buildRecast(userMessage);
            const sparkTitle = sparkData.title || 'English';
            const farewellText = `Amazing ${sparkTitle}! You are so good at English! I am really proud of you! See you next time!`;
            const closingText = recast ? `${recast} ${farewellText}` : farewellText;
            addMessage('freetalk', { role: 'assistant', content: closingText + ' 🎉👋', timestamp: Date.now() });
            setHints([]); setShowHints(false); setActiveSparkFrame(null);
            try {
              await textToSpeech(stripEmojiForTTS(cleanNumberedListArtifacts(closingText)), { autoPlay: true, preferredLayer: 'auto', mode: 'conversation' });
            } catch (e) { /* ignore */ }
            setTimeout(() => {
              setActiveSpark(null);
              setMode(sparkTalks.length > 0 ? 'selecting_spark' : 'idle');
              setActiveActivityId(null);
              setTurnCount(0);
              const sparkScore = Math.min(100, newSparkTurn * 12);
              saveProgress({ ...savedData, lastSparkAt: new Date().toISOString() }, true, sparkScore);
              markComplete(sparkScore);
            }, 4000);
            setIsLoading(false);
            return;
          }

          // ── Build follow-up question: use frame.follow_up_q, or generate from template ──
          let question;
          if (hasCycled) {
            // Extra cycling: prefer extra_questions if available, else cycle through frame follow_up_q
            const extraQs = sparkData.extra_questions || [];
            if (extraQs.length > 0) {
              const cycleLen2 = extraQs.length;
              const extraIndex = (newSparkTurn - rawFrames.length - 1) % cycleLen2;
              question = extraQs[extraIndex >= 0 ? extraIndex : extraIndex + cycleLen2];
            } else {
              // No extra_questions: cycle through frame follow_up_q of cycling frames
              const cyclingFrame = rawFrames[frameIndex];
              question = cyclingFrame?.follow_up_q
                || cyclingFrame?.prompt_en
                || generateFollowUpFromTemplate(cyclingFrame?.template || sparkData.seed_question || '');
            }
          } else if (currentFrame?.prompt_en) {
            question = currentFrame.prompt_en;
          } else if (currentFrame?.follow_up_q) {
            question = currentFrame.follow_up_q;
          } else if (currentFrame?.template) {
            question = currentFrame.template;
          } else {
            question = generateFollowUpFromTemplate('');
          }

          const recast = buildRecast(userMessage);
          const offTopic = isSparkOffTopic(userMessage, sparkData);
          const topicTitle = sparkData.title || 'our topic';

          // Model full sentence: threshold-based by week level
          const wkCurrent = weekNumberRef.current;
          let detModelPart = '';
          if (!hasCycled && currentFrame?.template?.includes('___') && currentFrame?.hints?.length > 0) {
            const studentWords = userMessage.trim().split(/\s+/).filter(Boolean).length;
            // W1-20: model for ≤3-word answers (student answered short/with single word only)
            // W21-26: model for ≤2-word answers (mostly independent, minimal scaffolding)
            const modelThreshold = wkCurrent <= 20 ? 3 : 2;
            if (studentWords <= modelThreshold) {
              const msgLower = userMessage.toLowerCase().replace(/[.!?,]+$/, '').trim();
              const matchedHint = currentFrame.hints.find(h => msgLower.includes(h.toLowerCase())) || currentFrame.hints[0];
              const modeled = currentFrame.template.replace('___', matchedHint);
              // Only show model sentence if student's answer differs from the modeled sentence
              const modeledNorm = modeled.toLowerCase().replace(/[.!?,]+$/, '').trim();
              if (msgLower !== modeledNorm) {
                detModelPart = ` Try saying: "${modeled}!"`;
              }
            }
          }

          const deterministicResponse = offTopic
            ? (recast ? `${recast} Let's talk about ${topicTitle}! ${question}` : `Hmm! Let's talk about ${topicTitle}! ${question}`)
            : (recast ? `${recast}${detModelPart} ${question}` : question);
          const aiMsg = { role: 'assistant', content: deterministicResponse, timestamp: Date.now() };
          addMessage('freetalk', aiMsg);

          // Update active frame so word chip clicks can auto-complete the template
          setActiveSparkFrame(currentFrame || null);

          // Hints: 3-phase scaffolding by week
          const sayFollowOptions = extractSayOptions(deterministicResponse);
          if (sayFollowOptions.length > 0) {
            setHints(sayFollowOptions); setShowHints(true);
          } else if (!hasCycled && currentFrame?.hint_en) {
            setHints([currentFrame.hint_en]); setShowHints(true);
          } else {
            setHints([]); setShowHints(false);
          }

          // TTS
          try {
            const cleaned = stripEmojiForTTS(cleanNumberedListArtifacts(deterministicResponse));
            await textToSpeech(cleaned, { autoPlay: true, preferredLayer: 'auto', mode: 'conversation' });
          } catch (e) {
            console.error('❌ TTS error (spark deterministic):', e);
          }

          setIsLoading(false);
          return; // ← skip AI call entirely
        }

        // W27+: After target turns, let AI close naturally then reset
        if (newSparkTurn >= targetTurns) {
          setTimeout(() => {
            setActiveSpark(null);
            setMode(sparkTalks.length > 0 ? 'selecting_spark' : 'idle');
            setActiveActivityId(null);
            setTurnCount(0);
            const sparkScore = Math.min(100, newSparkTurn * 12);
            saveProgress({ ...savedData, lastSparkAt: new Date().toISOString() }, true, sparkScore);
            markComplete(sparkScore);
          }, 4000);
        }
        // W27+: Fall through to normal AI call below
      }


      // �🔥 STEP 1: Detect START_ROLEPLAY and update LOCAL variable immediately
      if (userMessage.startsWith('START_ROLEPLAY:')) {
        const roleNameRaw = userMessage.split(':')[1]?.trim();
        console.log('🔍 DEBUG: START_ROLEPLAY detected, roleNameRaw:', roleNameRaw);
        console.log('🔍 DEBUG: weekRealData.roleplay_scenarios:', weekRealData.roleplay_scenarios);
        
        // 🔥 NEW: Find scenario by title_en (NOT hardcoded roleIdMap!)
        const scenario = weekRealData.roleplay_scenarios?.find(s => 
          s.title_en?.toLowerCase() === roleNameRaw?.toLowerCase()
        );
        console.log('🔍 DEBUG: Found scenario:', scenario);
        
        if (scenario) {
          console.log('🎭 Setting effectiveScenario (LOCAL VAR):', scenario.id);
          effectiveScenario = scenario; // Update local variable IMMEDIATELY
        } else {
          console.error('❌ Scenario NOT FOUND for roleNameRaw:', roleNameRaw);
        }
      }
      // IMPORTANT: effectiveScenario is now correctly set regardless of setState async behavior
      
      // Calculate turn count
      const turnCount = Math.floor((messages.length + 1) / 2); // +1 for user message just added
      console.log('📊 FreeTalk Turn Count:', turnCount);
      
      // Prepare chat history
      const chatHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // 🔥 Use NovaEngine for all free talk interactions
      console.log('🎯 FreeTalk mode:', mode);

      // 🔥 NEW: Use NovaEngine - AI tự quyết định khi nào nên đề nghị HS đặt câu hỏi
      const aiResponse = await novaEngineRef.current.sendToNova({
        mode: mode === 'translation_help' ? 'translation_help' : 'freetalk',  // 🔥 Pass ACTUAL mode
        weekId: weekNumberRef.current,  // 🔥 V27: Pass weekId for freetalk_knowledge
        userMessage,
        chatHistory,
        context: {
          turnCount,
          scaffoldingLevel: weekNumberRef.current <= 14 ? 1 : weekNumberRef.current <= 42 ? 2 : weekNumberRef.current <= 78 ? 3 : 4,
          conversationTopic,
          weekData: weekRealData,
          activeGame: effectiveGame,  // 🎮 Pass active game state (persists across turns)
          lastUserMessage: userMessage,  // 🔥 STEP 1: Pass for guardrail detection
          wordChainValidation: validationResult,  // 🎮 Pass validation result to AI (ongoing game)
          initialGameHints: initialGameHints,  // 🎮 Pass initial hints for game start (CODE-GENERATED)
          twentyQuestionsValidation: twentyQuestionsValidation,  // 🎯 20 QUESTIONS: Code-validated result
          // 💬 SPARK TALK: pass spark context so AI continues the topic correctly
          ...(mode === 'in_spark' && activeSpark ? {
            storyBridge: sparkData.bridge || '',
            sparkSeed: sparkData.seed_question || '',
            scaffoldFrames: sparkData.scaffold_frames || [],
            vocabFocus: sparkData.vocab_focus || [],
          } : {})
        }
      });

      // 🔥 DEBUG: Log full AI response
      console.log('🤖 FreeTalk Full AI Response Object:', aiResponse);
      console.log('🤖 FreeTalk Response keys:', Object.keys(aiResponse));

      // Extract text from response object (support multiple formats)
      // 🎭 Auto-end roleplay after 19 turns
      if (mode === 'in_spark' && turnCount >= 19) {
        console.log('🎯 Roleplay ending after 19 turns');
        const endingMessage = {
          role: 'assistant',
          content: "Wonderful job! You practiced so many English words today! 🎉 I'm so proud of you! Want to play again with a different room?",
          timestamp: Date.now()
        };
        addMessage('freetalk', endingMessage);
        // 🔥 Save roleplay completion
        const completedRoleplays = [...(savedData.completedRoleplays || [])];
        const scenarioId = activeActivityId || activeScenario?.id || 'unknown';
        if (!completedRoleplays.find(r => r.scenarioId === scenarioId)) {
          completedRoleplays.push({ scenarioId, turns: turnCount, completedAt: new Date().toISOString() });
        }
        const rpScore = Math.min(100, completedRoleplays.length * 20);
        saveProgress({ ...savedData, completedRoleplays, lastCompletedAt: new Date().toISOString() }, true, rpScore);
        markComplete(rpScore);

        setMode('selecting_spark');
        setActiveActivityId(null);
        setTurnCount(0);
        return;
      }
      
      // ⚠️ Game turn limit removed - Games moved to GameHub
      
      // 🔥 FIXED: Extract text from multiple response formats
      let responseText = '';
      
      // V27 format: {ack, recast, encouragement, question}
      if (aiResponse.format === 'v27' || aiResponse.teacher_question) {
        const ack = aiResponse.ack || aiResponse.teacher_ack || '';
        const recast = aiResponse.recast || aiResponse.teacher_recast || '';
        const encouragement = aiResponse.encouragement || aiResponse.teacher_encouragement || '';
        const question = aiResponse.question || aiResponse.teacher_question || '';
        responseText = [ack, recast, encouragement, question].filter(Boolean).join(' ');
      }
      // Artifact v5 format: {ack, recast, bridge, question}
      else if (aiResponse.ack || aiResponse.question) {
        const parts = [
          aiResponse.ack || '',
          aiResponse.recast || '',
          aiResponse.bridge || '',
          aiResponse.question || ''
        ].filter(Boolean);
        responseText = parts.join(' ');
      }
      // Standard format: ai_response string
      else {
        responseText = aiResponse.ai_response || aiResponse.response || aiResponse;
      }
      
      // Ensure responseText is a string
      if (typeof responseText !== 'string') {
        console.error('❌ responseText is not a string:', responseText);
        responseText = String(responseText || 'Sorry, I had trouble understanding. Can you say that again?');
      }
      
      responseText = responseText.trim();

      const chatHistoryText = messages.map(m => m.content.toLowerCase()).join(' ');
      const responseTextLower = responseText.toLowerCase();
      
      // Common repeated questions to detect
      const repeatedQuestionDetected = 
        (responseTextLower.includes('what is your name') && chatHistoryText.includes('what is your name')) ||
        (responseTextLower.includes('how old are you') && chatHistoryText.includes('how old are you')) ||
        (responseTextLower.includes('are you a student') && chatHistoryText.includes('are you a student'));
      
      if (repeatedQuestionDetected) {
        console.log('⚠️ AI REPEATED A QUESTION - forcing closure instead');
        responseText = `I loved our conversation! You did a wonderful job practicing English today. Keep learning and see you next time!`;
      }
      
      // 🔥 DEBUG: Check for truncation  
      console.log('📝 FreeTalk Extracted Response Text:', responseText);
      console.log('📏 FreeTalk Response length:', responseText?.length || 0);
      console.log('🔚 FreeTalk Response ends with question?', responseText?.includes('?'));
      
      // 💬 SPARK POST-PROCESSING (W27+): clean ack + model sentence + sequential scaffold Q
      if (mode === 'in_spark' && activeSpark) {
        const rawFrames = activeSpark.card?.frames
          || (activeSpark.card?.scaffold_frames || []).map(f => ({ template: f, follow_up_q: null, hints: [] }));
        const targetTurns = activeSpark.card?.turns || getMaxTurnsForWeek(weekNumberRef.current);
        const turnIdx = (activeSpark.sparkTurnCount || 0) + 1;
        const isClosingTurn = turnIdx >= targetTurns;

        if (isClosingTurn) {
          // Final turn: extract non-generic AI ack then append fixed warm farewell
          let closingAck = '';
          const firstAck5 = responseText.match(/^([^.!?]{2,}[.!])/);
          if (firstAck5) {
            const cand = firstAck5[1].trim();
            const isGeneric5 = /^(good|nice|great|wow|yes|ok|okay|cool|well|yay|right|sure|awesome|perfect|excellent)\.?!?$/i.test(cand.replace(/!/g, '').trim());
            const isParseErr = /^(Good! Tell me more|Tell me more)\.?$/i.test(cand);
            if (!isGeneric5 && !isParseErr) closingAck = cand + ' ';
          }
          responseText = `${closingAck}Amazing! You spoke so well today! I am very proud of you! 🎉`;
        } else {
          // Regular turn: ack + optional model sentence + sequential scaffold question
          const frameIdx = Math.min(turnIdx, rawFrames.length - 1);
          const scaffoldQ = rawFrames[frameIdx]?.follow_up_q
            || generateFollowUpFromTemplate(rawFrames[frameIdx]?.template || '');

          // Ack: prefer AI first sentence; reject generic 1-word acks — mirror student instead
          let ack = '';
          const firstAck = responseText.match(/^([^.!?]{2,}[.!])/);
          if (firstAck) {
            const candidate = firstAck[1].trim();
            const isGenericAck = /^(good|nice|great|wow|yes|ok|okay|cool|well|yay|right|oh|sure|awesome|perfect|excellent)\.?!?$/i.test(candidate.replace(/!/g, '').trim());
            const isParseFailure = /^(Good! Tell me more|Tell me more)\.?$/i.test(candidate);
            if (!isGenericAck && !isParseFailure) ack = candidate;
          }
          // Fallback: mirror student's own words — apply person-shift (I→you, my→your)
          if (!ack) {
            const w = userMessage.replace(/[.!?]+$/, '').trim();
            if (/^(yes|yeah|yep)/i.test(w)) ack = 'Great!';
            else if (/^(no|nope)/i.test(w)) ack = 'OK!';
            else if (w.length >= 2 && w.length <= 50) {
              const shifted = w.toLowerCase()
                .replace(/\bmy\b/g, 'your').replace(/\bi\b/g, 'you').replace(/\bme\b/g, 'you');
              ack = `${shifted.charAt(0).toUpperCase() + shifted.slice(1)}!`;
            } else ack = 'Nice!';
          }

          // Model sentence: for 1-word answers, show the correct full sentence using hints
          const studentWordCount = userMessage.trim().split(/\s+/).filter(Boolean).length;
          const prevFrame = rawFrames[Math.max(0, frameIdx - 1)];
          let modelPart = '';
          if (studentWordCount === 1 && prevFrame?.template?.includes('___') && prevFrame?.hints?.length > 0) {
            const msgLower = userMessage.toLowerCase().replace(/[.!?,]+$/, '').trim();
            const matchedHint = prevFrame.hints.find(h => msgLower.includes(h.toLowerCase())) || prevFrame.hints[0];
            const modeled = prevFrame.template.replace('___', matchedHint);
            const modeledNorm = modeled.toLowerCase().replace(/[.!?,]+$/, '').trim();
            if (msgLower !== modeledNorm) {
              modelPart = ` Try saying: "${modeled}!"`;
            }
          }

          responseText = `${ack}${modelPart} ${scaffoldQ}`;
        }
      }

      // �🔥 Validate response is complete
      if (!responseText || responseText.length < 10) {
        console.error('❌ FreeTalk Response too short or empty:', responseText);
        throw new Error('AI response too short: ' + responseText);
      }

      // Add AI response to chat
      const aiMsg = {
        role: 'assistant',
        content: responseText,
        timestamp: Date.now()
      };
      addMessage("freetalk", aiMsg);

      // 🔊 ALWAYS auto-play TTS for AI responses (clean numbered artifacts first)
      try {
        console.log('🎤 FreeTalkTab: Playing AI response TTS...');
        const cleanedResponse = cleanNumberedListArtifacts(responseText);
        await textToSpeech(cleanedResponse, { autoPlay: true, preferredLayer: 'auto', mode: 'conversation' });
      } catch (error) {
        console.error('❌ TTS error for AI response:', error);
      }
      
      // ⚠️ GUARDRAIL: If AI responded in Vietnamese, replace with English reminder
      // ✅ EXCEPTION: Allow Vietnamese in translation mode or when response IS a translation
      const hasVietnamese = /[À-ỹẠ-ỹ]/.test(responseText);
      const isTranslationMode = mode === 'translation_help';
      const isTranslationResponse =
        responseText.toLowerCase().includes('in vietnamese') ||
        responseText.toLowerCase().includes("that's right") ||
        responseText.toLowerCase().includes('correct') ||
        /\b(=|means?)\s+[a-zA-ZÀ-ỹẠ-ỹ]/i.test(responseText);
      if (hasVietnamese && !isTranslationMode && !isTranslationResponse) {
        const englishReminder = "I'm your English teacher! Let's speak in English. What do you want to talk about?";
        aiMsg.content = englishReminder;
        // Update last message in store
        const currentMessages = useTutorStore.getState().messages['freetalk'] || [];
        if (currentMessages.length > 0) {
          currentMessages[currentMessages.length - 1].content = englishReminder;
        }
      }

      // 🔥 Use AI-generated contextual hints that match the question (SCRAMBLED)
      // Support both 'hints' and 'suggested_hints' field names
      const aiHints = aiResponse.hints || aiResponse.suggested_hints || [];
      
      // 💬 SPARK TALK HINTS: 3-phase scaffolding
      // W1-10: Full sentence scaffold frames
      // W11-20: Word hints only (frame.hints)
      // W21+: No hints — free response, AI responds to actual content
      const isInSpark = mode === 'in_spark';
      const wk = weekNumberRef.current;
      if (isInSpark) {
        if (wk >= 21) {
          // W21+: No hints — student speaks freely
          setHints([]); setShowHints(false);
        } else if (activeSpark?.card?.scaffold_frames?.length > 0 || activeSpark?.card?.frames?.length > 0) {
          const rawFrames = activeSpark.card.frames
            || (activeSpark.card.scaffold_frames || []).map(f => ({ template: f, hints: [] }));
          if (wk <= 10) {
            // W1-10: Full sentence scaffold — sort by relevance to Nova's question
            const frames = rawFrames.map(f => f.template || f).filter(Boolean);
            const fullResponse = (aiResponse.ai_response || responseText).toLowerCase();
            const lastQMatch = fullResponse.match(/[^.!?]*\?[^.!?]*$/);
            if (!lastQMatch) {
              setHints(frames);
            } else {
              const questionText = lastQMatch[0];
              const scored = frames.map((frame, idx) => {
                const words = frame.toLowerCase().replace(/___/g, '').split(/\s+/).filter(w => w.length > 4);
                const score = words.filter(w => questionText.includes(w)).length;
                return { frame, score, idx };
              });
              scored.sort((a, b) => b.score - a.score || a.idx - b.idx);
              setHints(scored.map(s => s.frame));
            }
            setShowHints(storeHintsEnabled);
          } else {
            // W11-20: Word hints from current frame only
            const activeFrameHints = activeSparkFrame?.hints || rawFrames[0]?.hints || [];
            const wordHints = activeFrameHints.length > 0 ? activeFrameHints : (aiHints.length > 0 ? aiHints : []);
            setHints(wordHints); setShowHints(wordHints.length > 0 && storeHintsEnabled);
          }
          console.log(`💬 Spark hints (W${wk}):`, wk <= 10 ? 'full scaffold' : 'word hints');
        } else if (aiHints.length > 0 && wk <= 20) {
          setHints(aiHints); setShowHints(true);
        } else {
          setHints([]); setShowHints(false);
        }
      } else if (aiHints.length > 0) {
        // Chat mode: Show hints if question detected
        setHints(aiHints);
        setShowHints(true);
        console.log('💡 FreeTalk AI hints (scrambled):', aiHints);
      } else if (responseText.includes('?')) {
        // 🔥 BETTER fallback: Extract hints from question using utility
        const vocab = weekRealData.target_vocab?.map(v => v.word) || [];
        const contextualHints = extractHintsFromQuestion(responseText, vocab);
        setHints(contextualHints);
        setShowHints(true);
        console.log('💡 FreeTalk extracted hints:', contextualHints);
        console.log('📝 Question:', responseText.slice(-80));
      } else {
        // Closing turn - no hints
        setShowHints(false);
        console.log('🎯 Closing turn detected - no hints needed');
      }

    } catch (error) {
      console.error('Free Talk Error:', error);
      const errorMsg = {
        role: 'assistant',
        content: "Oops! Let me try again. What did you say?",
        timestamp: Date.now()
      };
      addMessage("freetalk", errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle hint click — in spark mode, word chips auto-complete the active frame template
  const handleHintClick = (hint) => {
    const cleanHint = hint.replace(/^Use:\s*/i, '');
    if (mode === 'in_spark' && activeSparkFrame?.template?.includes('___')) {
      // Fill input bar with completed sentence (student reviews before sending)
      const completed = activeSparkFrame.template.replace('___', cleanHint);
      hintSelectRef.current?.(completed);
    } else {
      hintSelectRef.current?.(cleanHint);
    }
  };

  // 🎮 FREE TALK 3.0 HANDLERS
  const handleActionClick = (actionId) => {
    // 🔥 CRITICAL FIX: Clear game/roleplay state FIRST before any other actions
    const wasInGameOrRoleplay = mode === 'in_spark';
    
    // Reset turn count when switching modes
    setTurnCount(0);
    
    // 🚨 CRITICAL: Clear active activity when switching modes
    setActiveActivityId(null);
    setActiveSpark(null);
    
    if (actionId === 'translate') {
      setMode('translation_help');
      setTimeout(() => handleSendMessage('Translate this for me...'), 50);
    } else if (actionId === 'conversation') {
      setMode('selecting_spark');
    }
    
    // 🔥 If switching from conversation, force refresh
    if (wasInGameOrRoleplay) {
      console.log(`🔄 Switching from ${mode} to ${actionId} - forcing state refresh`);
    }
  };

  // ❌ handleGameSelect removed - Games moved to GameHub

  const handleStopActivity = () => {
    setMode(sparkTalks.length > 0 ? 'selecting_spark' : 'idle');
    setActiveActivityId(null);
    setTurnCount(0);
    setActiveSpark(null);
    handleSendMessage('Stop');
  };

  // 💬 SPARK TALK: Handle spark card selection
  const handleSparkSelect = (sparkId) => {
    handleSendMessage(`START_SPARK: ${sparkId}`);
  };

  // Check if hints should be hidden (during gameplay)
  const shouldHideHints = mode === 'in_spark';


  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle size={14} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">Free Talk</h2>
              <p className="text-[10px] text-gray-500">Let's chat naturally!</p>
            </div>
          </div>

          {/* TTS Settings */}
          <TTSSettingsPanel compact={true} />

          {/* Conversation Stats */}
          <div className="flex items-center space-x-2">
            {/* 🎮 STOP BUTTON (only show during gameplay/conversation) */}
            {(mode === 'playing_game' || mode === 'in_spark') && (
              <button
                onClick={handleStopActivity}
                className="flex items-center gap-1 px-2 py-0.5 bg-red-100 hover:bg-red-200 rounded-full transition-colors border border-red-300"
              >
                <X size={12} className="text-red-600" />
                <span className="text-[10px] font-medium text-red-700">Stop</span>
              </button>
            )}
            
            <div className="flex items-center space-x-1">
              <Heart size={14} className="text-pink-500" />
              <span className="text-xs font-medium text-gray-700">{messageCount}</span>
            </div>
            {conversationTopic && (
              <div className="bg-blue-100 px-2 py-0.5 rounded-full">
                <span className="text-[10px] font-medium text-blue-700">
                  Topic: {conversationTopic}
                </span>
              </div>
            )}
            {/* Show active activity badge */}
            {activeActivityId && (
              <div className="bg-purple-100 px-2 py-0.5 rounded-full">
                <span className="text-[10px] font-medium text-purple-700">
                  {mode === 'playing_game' ? '🎮 Game' : '✨ Spark Talk'}: Turn {turnCount}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-3 py-2 space-y-1"
      >
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
            pedagogyNote={msg.pedagogyNote}
            hints={msg.role === 'assistant' && index === messages.length - 1 && showHints && storeHintsEnabled ? hints : []}
            mode={mode}
            onPlay={(text) => textToSpeech(text, { autoPlay: true, mode: 'conversation' })}
          />
        ))}
        
        {/* ❌ GAME SELECTION REMOVED - Games moved to GameHub */}
        {/* ❌ ROLEPLAY REMOVED - Replaced by Conversation Cards (more reliable, no AI hallucination) */}
        
        {/* 💬 SPARK TALK SELECTION */}
        {mode === 'selecting_spark' && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-purple-200">
                <p className="text-sm font-semibold text-purple-700">✨ Pick a topic to talk about YOU!</p>
                <p className="text-xs text-purple-500 mt-0.5">Inspired by this week's story</p>
              </div>
            </div>
            {sparkTalks.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {sparkTalks.map((spark) => (
                  <button
                    key={spark.id}
                    onClick={() => handleSparkSelect(spark.id)}
                    className="bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center border-2 border-purple-300"
                  >
                    <div className="text-3xl mb-2">{spark.emoji || '✨'}</div>
                    <div className="text-sm font-bold text-purple-800">{spark.title || spark.title_en || spark.text_en || 'Topic'}</div>
                    <div className="text-xs text-purple-600 mt-1 leading-tight">
                      {(spark.seed_question || spark.text_en || spark.prompt_en || '')?.slice(0, 40)}...
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        )}
        
        {/* ❌ REMOVED: "Nova is listening..." animation (performance issue) */}
        
        <div ref={chatEndRef} />
      </div>

      {/* ⚠️ Hints — auto-shown W1-16, manual button W17+ */}
      {showHints && storeHintsEnabled && hints.length > 0 && (
        <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-center space-x-1 mb-2">
            <span className="text-xs font-medium text-yellow-700">
              {(hints[0]?.includes('___') || (mode === 'in_spark' && weekNumber <= 10 && activeSparkFrame?.template?.includes('___')))
                ? '💡 Try saying:'
                : '💡 Try these words:'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {hints.map((hint, i) => {
              const isTemplateHint = hint.includes('___');
              const isSparkHint = !isTemplateHint && mode === 'in_spark' && activeSparkFrame?.template?.includes('___');
              // W1-10: display full completed sentence; W11-20: display raw word
              const displayText = isSparkHint && weekNumber <= 10
                ? activeSparkFrame.template.replace('___', hint)
                : hint;
              return (isTemplateHint || isSparkHint)
                ? <button key={i} onClick={() => handleHintClick(hint)}
                    className="px-3 py-1.5 bg-yellow-200 text-yellow-900 rounded-lg text-xs font-semibold border border-yellow-400 cursor-pointer hover:bg-yellow-300 active:scale-95 transition-all text-left">
                    {displayText}
                  </button>
                : <span key={i} className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-semibold border border-yellow-300 select-none">
                    {hint}
                  </span>;
            })}
          </div>
        </div>
      )}
      {showHints && !storeHintsEnabled && hints.length > 0 && (
        <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-yellow-700">
              {(hints[0]?.includes('___') || (mode === 'in_spark' && weekNumber <= 10 && activeSparkFrame?.template?.includes('___')))
                ? '💡 Try saying:'
                : '💡 Try these words:'}
            </span>
            <button onClick={() => setShowHints(false)} className="text-[10px] text-yellow-600 hover:text-yellow-800 font-bold">Hide ✕</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {hints.map((hint, i) => {
              const isTemplateHint = hint.includes('___');
              const isSparkHint = !isTemplateHint && mode === 'in_spark' && activeSparkFrame?.template?.includes('___');
              // W1-10: display full completed sentence; W11-20: display raw word
              const displayText = isSparkHint && weekNumber <= 10
                ? activeSparkFrame.template.replace('___', hint)
                : hint;
              return (isTemplateHint || isSparkHint)
                ? <button key={i} onClick={() => handleHintClick(hint)}
                    className="px-3 py-1.5 bg-yellow-200 text-yellow-900 rounded-lg text-xs font-semibold border border-yellow-400 cursor-pointer hover:bg-yellow-300 active:scale-95 transition-all text-left">
                    {displayText}
                  </button>
                : <span key={i} className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-semibold border border-yellow-300 select-none">
                    {hint}
                  </span>;
            })}
          </div>
        </div>
      )}
      {!showHints && hints.length > 0 && (
        <div className="px-4 py-1.5 border-t border-slate-100 flex justify-center">
          <button onClick={() => setShowHints(true)}
            className="text-[11px] font-bold text-yellow-600 hover:text-yellow-800 px-3 py-1 rounded-lg hover:bg-yellow-50 transition-colors">
            💡 Show Hints
          </button>
        </div>
      )}

      {/* ✨ FREE TALK 2.0: STARTER PROMPTS - REPLACED BY FIXED ACTION BAR */}
      {/* 🎮 FREE TALK 3.0: FIXED ACTION BAR */}
      <div className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-purple-200">
        <div className="flex items-center gap-1 mb-1">
          <Sparkles size={12} className="text-purple-500" />
          <span className="text-[10px] font-semibold text-purple-700">
            🎯 Choose:
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {FREE_TALK_ACTIONS.map((action) => {
            // Check if CURRENT mode has reached its limit
            const currentModeLimit = modeTurnLimits[mode] || 15;
            const isCurrentModeLimitReached = turnCount >= currentModeLimit && currentModeLimit !== Infinity;
            
            // Buttons should be disabled if:
            // 1. Loading, OR
            // 2. Current mode has reached its limit (but can still switch to other modes)
            const shouldDisable = isLoading;
            
            return (
              <button
                key={action.id}
                onClick={() => handleActionClick(action.id)}
                disabled={shouldDisable}
                className={`px-1.5 py-1 rounded-lg text-[10px] font-medium transition-all transform hover:scale-105 shadow-sm hover:shadow-md ${
                  action.type === 'system'
                    ? 'bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-800 border-2 border-blue-300'
                    : action.type === 'menu' && action.id === 'role_play'
                    ? 'bg-gradient-to-r from-pink-100 to-pink-200 hover:from-pink-200 hover:to-pink-300 text-pink-800 border-2 border-pink-300'
                    : 'bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-800 border-2 border-purple-300'
                }`}
              >
                <div className="text-base">{action.icon}</div>
                <div className="text-[10px] leading-tight">{action.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Area */}
      <InputBar
        onSend={handleSendMessage}
        onHintSelect={hintSelectRef}
        disabled={isLoading || (turnCount >= (modeTurnLimits[mode] || 15) && (modeTurnLimits[mode] || 15) !== Infinity)}
        placeholder={
          turnCount >= (modeTurnLimits[mode] || 15) && (modeTurnLimits[mode] || 15) !== Infinity
            ? `${mode === 'translation_help' ? 'Translation' : mode === 'playing_game' ? 'Game' : mode === 'playing_roleplay' ? 'Roleplay' : 'Chat'} complete! Switch to another mode above!`
            : "Speak or share your thoughts..."
        }
        showVoiceInput={turnCount < (modeTurnLimits[mode] || 15) || (modeTurnLimits[mode] || 15) === Infinity}
      />

      {/* Encouragement Footer */}
      {messageCount > 5 && messageCount < 28 && (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-center">
          <p className="text-xs text-gray-600 flex items-center justify-center space-x-1">
            <Sparkles size={14} className="text-purple-500" />
            <span>You're doing great! Keep talking!</span>
            <Sparkles size={14} className="text-blue-500" />
          </p>
        </div>
      )}
      
      {/* Completion Message */}
      {turnCount >= (modeTurnLimits[mode] || 15) && (modeTurnLimits[mode] || 15) !== Infinity && (
        <div className="bg-gradient-to-r from-green-100 to-blue-100 px-4 py-3 text-center border-t-2 border-green-300">
          <p className="text-sm font-semibold text-green-700 flex items-center justify-center space-x-2">
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>
              {mode === 'translation_help' ? 'Translation session' : 
               mode === 'playing_game' ? 'Game' : 
               'Chat'} complete! 
              Switch to another activity above! 🎉
            </span>
            <Heart size={16} className="text-red-500 fill-red-500" />
          </p>
        </div>
      )}
    </div>
  );
};

export default FreeTalkTab;
