import { extractHintsFromQuestion } from '../../../services/ai_tutor/utils/responseParser';
import { generateHints, isPerson as isPersonCheck } from '../../../services/ai_tutor/utils/hintGenerator'; // 🎯 DYNAMIC HINTS
import { validateExchangeResponse } from '../../../services/ai_tutor/conversationCardBuilder'; // 💬 CONVERSATION CARDS
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
import { useStationProgress } from '../../../hooks/useStationProgress'; // 🔥 Universal Progress System
import { useLocation } from 'react-router-dom'; // 🔥 Get weekId from URL pathname
import { FREE_TALK_ACTIONS, ROLEPLAY_SCENARIOS as STATIC_ROLEPLAY } from '../../../config/freeTalkConfig'; // 🎭 ROLEPLAY & CHAT
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
 * Students chat naturally while Ms. Nova guides toward target vocabulary
 */
const FreeTalkTab = () => {
  const { user } = useUserStore();
  const location = useLocation(); // 🔥 Get location from react-router
  // 🔥 Parse weekId from pathname: /week/2/read_explore -> 2
  const pathMatch = location.pathname.match(/\/week\/(\d+)/);
  const weekNumber = pathMatch ? parseInt(pathMatch[1]) : 1;
  console.log('🔥 FreeTalkTab pathname:', location.pathname, 'weekNumber:', weekNumber);
  const currentWeek = `week-${weekNumber}`; // 🔥 Construct currentWeek
  
  // 🔥 Universal Progress System Integration
  const { savedData, saveProgress } = useStationProgress(weekNumber, 'ai_freetalk');
  
  // Separate selectors to prevent infinite re-renders
  const messages = useTutorStore(state => state.messages['freetalk'] || []);
  const addMessage = useTutorStore(state => state.addMessage);
  const autoPlayEnabled = useTutorStore(state => state.autoPlayEnabled);
  
  const [hints, setHints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationTopic, setConversationTopic] = useState(savedData.conversationTopic || '');
  const [showHints, setShowHints] = useState(false);
  const [messageCount, setMessageCount] = useState(savedData.totalTurns || 0);
  const [initialized, setInitialized] = useState(false);
  
  // � ROLEPLAY & CHAT STATE MANAGEMENT
  const [mode, setMode] = useState('idle'); // 'idle' | 'selecting_roleplay' | 'playing_roleplay' | 'selecting_conversation' | 'in_conversation' | 'asking_any' | 'translation_help'
  const [activeActivityId, setActiveActivityId] = useState(null); // e.g., 'pizza_chef' (roleplay ID) or 'meet_classmate' (conversation ID)
  const [turnCount, setTurnCount] = useState(0); // Turn counter for CURRENT MODE
  const [activeScenario, setActiveScenario] = useState(null); // 🎭 Persist active roleplay scenario across turns
  const [activeGame, setActiveGame] = useState(null); // ⚠️ DEPRECATED - Games moved to GameHub
  
  // 💬 CONVERSATION CARDS STATE
  const [activeConversation, setActiveConversation] = useState(null); // { cardId, currentExchange, totalExchanges, card }
  
  const [modeTurnLimits] = useState({
    translation_help: Infinity, // 🚀 No limit for translation
    playing_roleplay: 10,       // 🎭 10 turns per roleplay scenario (reduced for focused practice)
    in_conversation: Infinity,  // 💬 No limit - structured dialogue completes based on exchanges
    idle: 15,                   // 💬 Free chat mode
    asking_any: Infinity        // 🙋 No limit for questions
  });
  
  // 🔥 Dynamic week data selection (Fallback: Week 7 - Golden Standard) [v2.0]
  const weekRealData = weekNumber === 1 ? week1RealData : weekNumber === 2 ? week2RealData : weekNumber === 3 ? week3RealData : weekNumber === 4 ? week4RealData : weekNumber === 5 ? week5RealData : weekNumber === 6 ? week6RealData : weekNumber === 7 ? week7RealData : weekNumber === 8 ? week8RealData : weekNumber === 9 ? week9RealData : weekNumber === 10 ? week10RealData : weekNumber === 11 ? week11RealData : weekNumber === 12 ? week12RealData : weekNumber === 13 ? week13RealData : weekNumber === 14 ? week14RealData : weekNumber === 15 ? week15RealData : weekNumber === 16 ? week16RealData : weekNumber === 17 ? week17RealData : week7RealData;
  
  // 🎭 Get roleplays from weekRealData (NEW SYSTEM - NOT from dynamicRoleplays.js!)
  const dynamicRoleplays = weekRealData?.roleplay_scenarios || [];
  
  // 💬 Get conversation cards from weekRealData
  const conversationCards = weekRealData?.conversation_cards || [];
  
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
      const weekData = await getCurrentWeekData(currentWeek || 'week-1');
      const userProfile = {
        name: user?.name || 'Student',
        age: user?.age || 8
      };
      
      novaEngineRef.current = new NovaEngine(weekData, userProfile);
      console.log('🧠 NovaEngine initialized for FreeTalkTab, weekNumber:', weekNumberRef.current);
      
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
          scaffoldingLevel: 2,
          conversationTopic: 'opening',
          isOpeningTurn: true
        }
      });
      
      // 🔥 HARDCODED GREETING: Avoid AI inserting random text/numbers
      const greetingText = "Hello! I am Ms. Nova ⭐. Let's chat naturally! 👇";
      
      const welcomeMessage = {
        role: 'assistant',
        content: greetingText,
        timestamp: Date.now()
      };
      addMessage("freetalk", welcomeMessage);
      console.log('💬 FreeTalkTab: Using hardcoded greeting (avoid AI number bug)');
      
      // 🔥 Set contextual hints from AI or extract from greeting
      const contextualHints = (aiResponse.suggested_hints && aiResponse.suggested_hints.length > 0)
        ? aiResponse.suggested_hints.sort(() => Math.random() - 0.5)
        : extractHintsFromQuestion(greetingText, []).sort(() => Math.random() - 0.5);
      
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
      const fallbackGreeting = "Hello! I am Ms. Nova ⭐. Let's chat naturally! 👇";
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
    if (mode !== 'selecting_game' && mode !== 'selecting_roleplay') {
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
    saveProgress({
      totalTurns: newCount,
      conversationTopic: conversationTopic || userMessage.split(' ')[0],
      lastMessageAt: new Date().toISOString(),
      vocabUsed: savedData.vocabUsed || []
    }, false, Math.min(100, newCount * 5)); // Score based on engagement

    // Detect topic from first user message
    if (messageCount === 0 && userMessage.length > 10) {
      setConversationTopic(userMessage.split(' ')[0]);
    }
    
    try {
      // ⚡ INSTANT MODE SWITCH: Allow immediate mode change on first button click
      const isModeSwitchCommand = userMessage === 'Translate this for me...' || userMessage === 'I have a question!';
      if (isModeSwitchCommand && mode === 'in_conversation') {
        // Exit conversation immediately when switching modes
        setActiveConversation(null);
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

      // � CONVERSATION CARDS: Detect START_CONVERSATION and initialize
      let isConversationOpening = false; // 🆕 Track if this is opening message
      let conversationCardId = null; // 🆕 Store cardId for TTS caching
      let conversationVersion = 1; // 🆕 Store version for cache invalidation
      
      if (userMessage.startsWith('START_CONVERSATION:')) {
        const cardId = userMessage.split(':')[1]?.trim();
        const card = conversationCards.find(c => c.id === cardId);
        
        if (card) {
          console.log('💬 Starting conversation card:', cardId);
          isConversationOpening = true; // 🆕 Mark as opening
          conversationCardId = cardId; // 🆕 Store for TTS
          conversationVersion = card.version || 1; // 🆕 Get version from card data
          const conversationState = {
            cardId,
            currentExchange: 0,
            totalExchanges: card.exchanges.length,
            card,
            version: conversationVersion // 🆕 Store version in state
          };
          setActiveConversation(conversationState);
          setMode('in_conversation');
          setActiveActivityId(cardId);
          setTurnCount(0);
        }
      }
      
      // 💬 CONVERSATION CARDS: Validate student response during ongoing conversation
      if (mode === 'in_conversation' && activeConversation && !userMessage.startsWith('START_')) {
        const currentExchange = activeConversation.card.exchanges[activeConversation.currentExchange];
        const validation = validateExchangeResponse(currentExchange, userMessage);
        
        console.log('💬 Conversation validation:', {
          exchange: activeConversation.currentExchange + 1,
          total: activeConversation.totalExchanges,
          isValid: validation.isValid,
          feedback: validation.feedback
        });
        
        if (validation.isValid) {
          // ✅ Valid response - move to next exchange
          const nextExchange = activeConversation.currentExchange + 1;
          
          if (nextExchange >= activeConversation.totalExchanges) {
            // 🎉 Conversation complete!
            const completionMsg = {
              role: 'assistant',
              content: activeConversation.card.completion_message || "Amazing! You completed the conversation! 🎉",
              timestamp: Date.now()
            };
            addMessage('freetalk', completionMsg);
            
            // 🔊 Play TTS for completion message (static cache)
            try {
              const cleanedCompletion = cleanNumberedListArtifacts(completionMsg.content);
              // Static cache: conversation/{cardId}/v{version}/completion.mp3
              const completionContext = {
                type: 'conversation',
                weekNum: weekNumber,
                cardId: activeConversation.cardId,
                version: activeConversation.version || 1, // 🆕 Include version
                subType: 'completion'
              };
              await textToSpeech(cleanedCompletion, { 
                autoPlay: true, 
                preferredLayer: 'auto', 
                mode: 'conversation',
                context: completionContext
              });
            } catch (err) {
              console.error('❌ FreeTalk TTS error:', err);
            }
            
            // Reset conversation state
            setActiveConversation(null);
            setMode('idle');
            setActiveActivityId(null);
            setTurnCount(0);
            
            setIsLoading(false);
            return; // Exit early
          } else {
            // Continue to next exchange
            setActiveConversation({
              ...activeConversation,
              currentExchange: nextExchange
            });
            
            // Send next AI message
            const nextExchangeData = activeConversation.card.exchanges[nextExchange];
            const responseText = `${validation.feedback}\n\n${nextExchangeData.ai}`;
            const aiMsg = {
              role: 'assistant',
              content: responseText,
              timestamp: Date.now()
            };
            addMessage('freetalk', aiMsg);
            
            // 🔊 Play TTS in 2 parts: feedback (dynamic) + AI question (static)
            try {
              const cleanedFeedback = cleanNumberedListArtifacts(validation.feedback);
              const cleanedAI = cleanNumberedListArtifacts(nextExchangeData.ai);
              
              console.log('🎬 Playing 2-part conversation TTS:', {
                part1_feedback: cleanedFeedback.substring(0, 40) + '...',
                part2_ai: cleanedAI.substring(0, 40) + '...'
              });
              
              // PART 1: Feedback (dynamic cache - varies by validation result)
              await textToSpeech(cleanedFeedback, {
                autoPlay: true,
                preferredLayer: 'auto',
                mode: 'conversation',
                context: {} // Dynamic cache
              });
              
              // PART 2: AI question (static cache - same for all students)
              const questionContext = {
                type: 'conversation',
                weekNum: weekNumber,
                cardId: activeConversation.cardId,
                version: activeConversation.version || 1, // 🆕 Include version
                questionNum: nextExchange + 1,
                subType: 'question'
              };
              await textToSpeech(cleanedAI, {
                autoPlay: true,
                preferredLayer: 'auto',
                mode: 'conversation',
                context: questionContext
              });
              
              console.log('🔊 Conversation TTS played successfully (2 parts)');
            } catch (err) {
              console.error('❌ FreeTalk TTS error:', err);
            }
            
            setIsLoading(false);
            return; // Exit early
          }
        } else {
          // ❌ Invalid response - give feedback and wait for retry
          const feedbackText = validation.feedback + " Try again! 💪";
          const feedbackMsg = {
            role: 'assistant',
            content: feedbackText,
            timestamp: Date.now()
          };
          addMessage('freetalk', feedbackMsg);
          
          // 🔊 Play TTS for feedback (instant mode, clean numbered artifacts)
          try {
            const cleanedFeedback = cleanNumberedListArtifacts(feedbackText);
            await textToSpeech(cleanedFeedback, { autoPlay: true, preferredLayer: 'auto', mode: 'conversation' });
          } catch (err) {
            console.error('❌ FreeTalk TTS error:', err);
          }
          
          setIsLoading(false);
          return; // Exit early - student must retry
        }
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
          setActiveScenario(scenario);   // Also update state for next turn
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
          scaffoldingLevel: 2,
          conversationTopic,
          weekData: weekRealData,
          activeGame: effectiveGame,  // 🎮 Pass active game state (persists across turns)
          lastUserMessage: userMessage,  // 🔥 STEP 1: Pass for guardrail detection
          wordChainValidation: validationResult,  // 🎮 Pass validation result to AI (ongoing game)
          initialGameHints: initialGameHints,  // 🎮 Pass initial hints for game start (CODE-GENERATED)
          twentyQuestionsValidation: twentyQuestionsValidation  // 🎯 20 QUESTIONS: Code-validated result
        }
      });

      // 🔥 DEBUG: Log full AI response
      console.log('🤖 FreeTalk Full AI Response Object:', aiResponse);
      console.log('🤖 FreeTalk Response keys:', Object.keys(aiResponse));

      // Extract text from response object (support multiple formats)
      // 🎭 Auto-end roleplay after 19 turns
      if (mode === 'playing_roleplay' && turnCount >= 19) {
        console.log('🎯 Roleplay ending after 19 turns');
        const endingMessage = {
          role: 'assistant',
          content: "Wonderful job! You practiced so many English words today! 🎉 I'm so proud of you! Want to play again with a different room?",
          timestamp: Date.now()
        };
        addMessage('freetalk', endingMessage);
        setMode('idle');
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
      
      // 🔥 Validate response is complete
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
        
        // 💬 CONVERSATION CARDS: Use static cache for opening message
        // Use local flags instead of state (React state updates are async)
        if (isConversationOpening && conversationCardId) {
          const openingContext = {
            type: 'conversation',
            weekNum: weekNumber,
            cardId: conversationCardId,
            version: conversationVersion, // 🆕 Include version
            questionNum: 1,
            subType: 'opening'
          };
          console.log('💬 Playing conversation opening with static cache:', openingContext);
          await textToSpeech(cleanedResponse, { 
            autoPlay: true, 
            preferredLayer: 'auto', 
            mode: 'conversation',
            context: openingContext
          });
        } else {
          // Free conversation or other modes - use dynamic cache
          await textToSpeech(cleanedResponse, { autoPlay: true, preferredLayer: 'auto', mode: 'conversation' });
        }
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
      
      // 🎮 GAME/ROLEPLAY MODE: Always show hints if available (AI provides game-specific hints)
      const isInGameOrRoleplay = mode === 'playing_roleplay';
      
      if (isInGameOrRoleplay && aiHints.length > 0) {
        // Game mode: Always show AI-provided hints (game-specific vocabulary)
        setHints(aiHints);
        setShowHints(true);
        console.log('🎮 Game/Roleplay hints (AI-provided):', aiHints);
      } else if (responseText.includes('?') && aiHints.length > 0) {
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

  // Handle hint click
  const handleHintClick = (hint) => {
    const cleanHint = hint.replace(/^Use:\s*/i, '');
    handleSendMessage(cleanHint);
  };

  // 🎮 FREE TALK 3.0 HANDLERS
  const handleActionClick = (actionId) => {
    // 🔥 CRITICAL FIX: Clear game/roleplay state FIRST before any other actions
    const wasInGameOrRoleplay = mode === 'playing_roleplay' || mode === 'in_conversation';
    
    // Reset turn count when switching modes
    setTurnCount(0);
    
    // 🚨 CRITICAL: Clear roleplay scenario AND active activity when switching modes
    setActiveScenario(null);
    setActiveActivityId(null);
    setActiveConversation(null); // 💬 Clear conversation state
    
    if (actionId === 'translate') {
      setMode('translation_help');
      // 🔥 FIX: Always trigger message even if coming from roleplay
      setTimeout(() => handleSendMessage('Translate this for me...'), 50);
    } else if (actionId === 'conversation') {
      setMode('selecting_conversation');
    } else if (actionId === 'ask_any') {
      setMode('asking_any');
      setTimeout(() => handleSendMessage('I have a question!'), 50);
    }
    
    // 🔥 If switching from roleplay, force refresh
    if (wasInGameOrRoleplay) {
      console.log(`🔄 Switching from ${mode} to ${actionId} - forcing state refresh`);
    }
  };

  // ❌ handleGameSelect removed - Games moved to GameHub
  // ❌ handleRoleplaySelect removed - Roleplay deprecated, replaced by Conversation Cards
  
  // 💬 CONVERSATION CARDS: Handle conversation selection
  const handleConversationSelect = (cardId) => {
    const card = conversationCards.find(c => c.id === cardId);
    if (card) {
      handleSendMessage(`START_CONVERSATION: ${cardId}`);
    }
  };

  const handleStopActivity = () => {
    setMode('idle');
    setActiveActivityId(null);
    setTurnCount(0);
    setActiveScenario(null); // 🎭 Reset roleplay state
    setActiveGame(null); // 🎮 Reset game state
    setActiveConversation(null); // 💬 Reset conversation state
    handleSendMessage('Stop');
  };

  // Check if hints should be hidden (during gameplay)
  const shouldHideHints = mode === 'playing_roleplay';


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
            {(mode === 'playing_game' || mode === 'playing_roleplay' || mode === 'in_conversation') && (
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
                  {mode === 'playing_game' ? '🎮 Game' : mode === 'in_conversation' ? `💬 Conversation: ${activeConversation?.currentExchange || 0}/${activeConversation?.totalExchanges || 0}` : '🎭 Roleplay'}: Turn {turnCount}
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
            hints={msg.role === 'assistant' && index === messages.length - 1 && showHints ? hints : []}
            mode={mode}
          />
        ))}
        
        {/* ❌ GAME SELECTION REMOVED - Games moved to GameHub */}
        {/* ❌ ROLEPLAY REMOVED - Replaced by Conversation Cards (more reliable, no AI hallucination) */}
        
        {/* 💬 CONVERSATION CARDS SELECTION */}
        {mode === 'selecting_conversation' && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                <p className="text-sm font-semibold text-blue-700">💬 Choose a conversation to practice!</p>
              </div>
            </div>
            {conversationCards.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {conversationCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleConversationSelect(card.id)}
                    className="bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center border-2 border-blue-300"
                  >
                    <div className="text-3xl mb-2">{card.emoji}</div>
                    <div className="text-sm font-bold text-blue-800">{card.title}</div>
                    <div className="text-xs text-blue-600 mt-1">{card.exchanges.length} exchanges</div>
                    <div className="text-xs text-blue-500 mt-0.5">{card.difficulty}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No conversation cards available for this week yet.</p>
                <p className="text-xs mt-1">Try Week 3 or later!</p>
              </div>
            )}
          </div>
        )}
        
        {/* ❌ REMOVED: "Ms. Nova is listening..." animation (performance issue) */}
        
        <div ref={chatEndRef} />
      </div>

      {/* ⚠️ Hints removed - Conversation Cards already show hints in chat bubbles */}

      {/* ✨ FREE TALK 2.0: STARTER PROMPTS - REPLACED BY FIXED ACTION BAR */}
      {/* 🎮 FREE TALK 3.0: FIXED ACTION BAR */}
      <div className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-purple-200">
        <div className="flex items-center gap-1 mb-1">
          <Sparkles size={12} className="text-purple-500" />
          <span className="text-[10px] font-semibold text-purple-700">
            🎯 Choose:
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
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
               mode === 'playing_roleplay' ? 'Roleplay' : 'Chat'} complete! 
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
