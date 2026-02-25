import { extractHintsFromQuestion } from '../../../services/ai_tutor/utils/responseParser';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Heart, Sparkles, Loader2, Volume2, X } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import InputBar from '../components/InputBar';
import HintChips from '../components/HintChips';
import { NovaEngine } from '../../../services/ai_tutor/novaEngine';
import { VoiceService } from '../../../services/voiceService';
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
import { useStationProgress } from '../../../hooks/useStationProgress'; // 🔥 Universal Progress System
import { useLocation } from 'react-router-dom'; // 🔥 Get weekId from URL pathname
import { FREE_TALK_ACTIONS, GAME_OPTIONS } from '../../../config/freeTalkConfig'; // 🎮 FREE TALK 3.0

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
  
  // 🎮 FREE TALK 3.0 STATE MANAGEMENT
  const [mode, setMode] = useState('idle'); // 'idle' | 'selecting_game' | 'selecting_roleplay' | 'playing_game' | 'playing_roleplay' | 'asking_any' | 'translation_help'
  const [activeActivityId, setActiveActivityId] = useState(null); // e.g., 'word_chain', 'pizza_chef'
  const [turnCount, setTurnCount] = useState(0); // Turn counter for CURRENT MODE
  const [activeScenario, setActiveScenario] = useState(null); // 🔥 STEP 1: Persist active roleplay scenario across turns
  const [activeGame, setActiveGame] = useState(null); // 🎮 Persist active game state (game_id, secret_object, etc.)
  const [modeTurnLimits] = useState({
    translation_help: Infinity, // 🚀 No limit for translation
    playing_game: 20,           // 🎮 20 turns per game (3 games total)
    playing_roleplay: 20,       // 🎭 20 turns per roleplay (3 roleplays total)
    idle: 15,                   // 💬 Chat mode
    asking_any: Infinity        // 🙋 No limit for questions
  });
  
  // 🔥 Dynamic week data selection
  const weekRealData = weekNumber === 1 ? week1RealData : weekNumber === 2 ? week2RealData : weekNumber === 3 ? week3RealData : weekNumber === 4 ? week4RealData : weekNumber === 5 ? week5RealData : weekNumber === 6 ? week6RealData : weekNumber === 7 ? week7RealData : week5RealData;
  
  // 🎭 Get roleplays from weekRealData (NEW SYSTEM - NOT from dynamicRoleplays.js!)
  const dynamicRoleplays = weekRealData?.roleplay_scenarios || [];
  
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
      
      const greetingText = aiResponse.ai_response || "Hello! I am Ms. Nova 🌟. Click a button below to Play, Roleplay or Chat! 👇";
      
      const welcomeMessage = {
        role: 'assistant',
        content: greetingText,
        timestamp: Date.now()
      };
      addMessage("freetalk", welcomeMessage);
      console.log('💬 FreeTalkTab: AI generated natural greeting');
      
      // 🔥 Set contextual hints from AI or extract from greeting
      const contextualHints = (aiResponse.suggested_hints && aiResponse.suggested_hints.length > 0)
        ? aiResponse.suggested_hints.sort(() => Math.random() - 0.5)
        : extractHintsFromQuestion(greetingText, []).sort(() => Math.random() - 0.5);
      
      setHints(contextualHints);
      setShowHints(true);
      console.log('💡 Opening hints (contextual & scrambled):', contextualHints);
      
      // 🔊 Play TTS for opening message
      if (autoPlayEnabled) {
        try {
          await VoiceService.speak(greetingText);
          console.log('🔊 TTS played successfully');
        } catch (error) {
          console.error('❌ TTS error:', error);
        }
      }
    } catch (error) {
      console.error('❌ Error generating AI greeting:', error);
      
      // Fallback to simple greeting if AI fails
      const fallbackGreeting = "Hello! I am Ms. Nova 🌟. Click a button below to Play, Roleplay or Chat! 👇";
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
      // 🔥 FIX 1: Use LOCAL VARIABLE to avoid async state bug
      let effectiveScenario = activeScenario; // Start with current state
      let effectiveGame = activeGame; // 🎮 Track active game across turns
      
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
        
        // 🎲 For 20 Questions, pre-select secret object from GAME_TEMPLATES objects ONLY
        let secretObject = null;
        if (gameId === 'twenty_questions') {
          // Import GAME_TEMPLATES to get the ALLOWED objects for this week's 20 Questions
          const { GAME_TEMPLATES } = await import('../../../config/gameAdaptation.js');
          const weekNumber = weekNumberRef.current || 5;
          const gameTemplate = GAME_TEMPLATES[weekNumber];

          // Use ONLY objects defined in GAME_TEMPLATES for 20 Questions
          const allowedObjects = gameTemplate?.games?.twenty_questions?.objects || [];

          if (allowedObjects.length > 0) {
            secretObject = allowedObjects[Math.floor(Math.random() * allowedObjects.length)];
            console.log('🎲 20 Questions: Selected from GAME_TEMPLATES objects:', secretObject, 'Week:', weekNumber, 'Allowed:', allowedObjects);
          } else {
            // Fallback to Week 5 objects if current week not defined
            const fallbackObjects = GAME_TEMPLATES[5]?.games?.twenty_questions?.objects || ['bed', 'sofa', 'lamp', 'table', 'chair'];
            secretObject = fallbackObjects[Math.floor(Math.random() * fallbackObjects.length)];
            console.log('🎲 20 Questions: Using Week 5 fallback objects:', secretObject);
          }
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
              
              // Generate hints for AI's next word's last letter
              validatedHints = fullVocabPool.filter(w => 
                w.toUpperCase().includes(aiNextLetter)
              ).slice(0, 3);
            }
          } else {
            // ❌ Student WRONG: Keep same required letter, regenerate hints
            aiNextWord = null;
            aiNextLetter = requiredLetter;
            validatedHints = fullVocabPool.filter(w => 
              w.toUpperCase().includes(requiredLetter)
            ).slice(0, 3);
          }
          
          // Fallback if no valid hints found
          if (!validatedHints || validatedHints.length === 0) {
            validatedHints = ['try', 'again', 'please'];
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
            validatedHints  // 🎯 CODE-VALIDATED hints (for NEXT round)
          };
        }
      }
      
      // 🎯 20 QUESTIONS: Code-level validation (AI CANNOT override!)
      let twentyQuestionsValidation = null;
      const isIn20Questions = effectiveGame?.id === 'twenty_questions' && effectiveGame?.secretObject;
      if (isIn20Questions && !userMessage.startsWith('START_')) {
        const currentSecret = effectiveGame.secretObject.toLowerCase();
        const studentMsg = userMessage.toLowerCase().trim();
        const cleanedGuess = studentMsg.replace(/^(is it |it's |its |a |an |the |my )/gi, '').replace(/[?!.,]/g, '').trim();

        // Import GAME_TEMPLATES for allowed objects
        const { GAME_TEMPLATES } = await import('../../../config/gameAdaptation.js');
        const weekNumber = weekNumberRef.current || 5;
        const allowedObjects = GAME_TEMPLATES[weekNumber]?.games?.twenty_questions?.objects || [];

        // 🎯 Check guess type
        const isCorrectGuess = cleanedGuess === currentSecret || studentMsg.includes(currentSecret);
        const isGiveUp = studentMsg.includes("what is it") || studentMsg.includes("i don't know") ||
                         studentMsg.includes("tell me") || studentMsg.includes("give up") ||
                         studentMsg.includes("không biết") || studentMsg.includes("cho biết");
        const isYesNoQuestion = studentMsg.includes("is it") || studentMsg.includes("does it") ||
                                studentMsg.includes("can it") || studentMsg.includes("can i") ||
                                studentMsg.endsWith("?");

        // Pick NEW secret for next round (used for correct guess or give up)
        const remainingObjects = allowedObjects.filter(obj => obj.toLowerCase() !== currentSecret);
        const newSecret = remainingObjects.length > 0
          ? remainingObjects[Math.floor(Math.random() * remainingObjects.length)]
          : allowedObjects[0];

        // 🎯 Generate hints for the new object
        const hintMap = {
          'jar': ['It is round like a bottle.', 'You put things inside it.'],
          'book': ['It has many pages.', 'You read stories in it.'],
          'pencil': ['It is long and thin.', 'You write with it.'],
          'paper': ['It is flat and white.', 'You write or draw on it.'],
          'picture': ['It is colorful.', 'You look at it on the wall.'],
          'crayon': ['It is colorful.', 'You draw pictures with it.'],
          'game': ['It is fun!', 'You play it with friends.'],
          'toy': ['It is fun!', 'You play with it.'],
          'pen': ['It is small and long.', 'You write with it.'],
          'desk': ['It has 4 legs.', 'You put your books on it.'],
          'chair': ['It has 4 legs.', 'You sit on it.'],
          'backpack': ['You carry it on your back.', 'You put books inside it.'],
          'mother': ['This person is kind.', 'She takes care of you.'],
          'father': ['This person is strong.', 'He loves you very much.'],
          'brother': ['This person is a boy.', 'He plays with you.'],
          'sister': ['This person is a girl.', 'She is your friend.'],
          'family': ['They live in your house.', 'They love you.'],
          'home': ['It is a place.', 'Your family lives there.']
        };
        const newHints = hintMap[newSecret?.toLowerCase()] || ['It is something special.', 'Can you guess what it is?'];
        const isPerson = ['mother', 'father', 'brother', 'sister', 'grandma', 'grandpa', 'mom', 'dad', 'teacher', 'family'].includes(newSecret?.toLowerCase());

        console.log('🎯 20Q CODE Validation:', {
          currentSecret,
          cleanedGuess,
          studentMsg,
          isCorrectGuess,
          isGiveUp,
          isYesNoQuestion,
          newSecret,
          newHints
        });

        if (isCorrectGuess) {
          // ✅ CORRECT GUESS - Update state and prepare response
          effectiveGame = { ...effectiveGame, secretObject: newSecret, turnCount: (effectiveGame.turnCount || 0) + 1 };
          setActiveGame(effectiveGame);

          twentyQuestionsValidation = {
            type: 'correct',
            currentSecret,
            newSecret,
            newHints,
            isPerson,
            turnCount: effectiveGame.turnCount
          };
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
          // ❓ YES/NO QUESTION - Let AI answer (no skipAI)
          twentyQuestionsValidation = {
            type: 'yesno',
            currentSecret,
            studentQuestion: studentMsg,
            allowedObjects
          };
        } else {
          // ❌ WRONG GUESS - Give hint
          twentyQuestionsValidation = {
            type: 'wrong',
            currentSecret,
            studentGuess: cleanedGuess,
            hint: currentSecret.charAt(0).toUpperCase()
          };
        }
      }

      // 🔥 STEP 1: Detect START_ROLEPLAY and update LOCAL variable immediately
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

      // 🔥 STEP 2: Always use 'freetalk' mode, rely on currentScenario to trigger roleplay
      // NovaEngine only accepts: story, freetalk, pronunciation, quiz, debate
      console.log('🎯 FreeTalk mode: freetalk, effectiveScenario:', effectiveScenario?.id || 'none');
      console.log('🎯 FreeTalk: Passing twentyQuestionsValidation to Nova:', twentyQuestionsValidation);

      // 🔥 NEW: Use NovaEngine - AI tự quyết định khi nào nên đề nghị HS đặt câu hỏi
      const aiResponse = await novaEngineRef.current.sendToNova({
        mode: 'freetalk',  // 🔥 ALWAYS freetalk, scenario detection via context.currentScenario
        weekId: weekNumberRef.current,  // 🔥 V27: Pass weekId for freetalk_knowledge
        userMessage,
        chatHistory,
        context: {
          turnCount,
          scaffoldingLevel: 2,
          conversationTopic,
          weekData: weekRealData,  // 🎮 Pass weekData for game/roleplay content injection
          currentScenario: effectiveScenario,  // 🔥 CRITICAL: Use LOCAL variable, not state!
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
      
      // 🎮 Auto-end game after 19 turns
      if (mode === 'playing_game' && turnCount >= 19) {
        console.log('🎯 Game ending after 19 turns');
        const endingMessage = {
          role: 'assistant',
          content: "Amazing game! You did so well! 🎉 You used so many English words! Want to play another game?",
          timestamp: Date.now()
        };
        addMessage('freetalk', endingMessage);
        setMode('idle');
        setActiveActivityId(null);
        setTurnCount(0);
        return;
      }
      
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
      
      // 🔥 CRITICAL: Check if AI is repeating a question from chat history
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

      // 🔊 ALWAYS auto-play TTS for AI responses
      try {
        console.log('🎤 FreeTalkTab: Playing AI response TTS...');
        await VoiceService.speak(responseText);
      } catch (error) {
        console.error('❌ TTS error for AI response:', error);
      }

      // 🔥 Use AI-generated contextual hints that match the question (SCRAMBLED)
      // Only show hints if this is NOT a closing turn
      // Support both 'hints' and 'suggested_hints' field names
      const aiHints = aiResponse.hints || aiResponse.suggested_hints || [];
      
      if (responseText.includes('?') && aiHints.length > 0) {
        // Hints already scrambled by responseParser.js
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
    const wasInGameOrRoleplay = mode === 'playing_game' || mode === 'playing_roleplay';
    
    // Reset turn count when switching modes
    setTurnCount(0);
    
    // 🚨 CRITICAL: Clear roleplay scenario AND active activity when switching modes
    setActiveScenario(null);
    setActiveActivityId(null);
    
    if (actionId === 'translate') {
      setMode('translation_help');
      // 🔥 FIX: Always trigger message even if coming from game/roleplay
      setTimeout(() => handleSendMessage('Translate this for me...'), 50);
    } else if (actionId === 'play_game') {
      setMode('selecting_game');
    } else if (actionId === 'role_play') {
      setMode('selecting_roleplay');
    } else if (actionId === 'ask_any') {
      setMode('asking_any');
      setTimeout(() => handleSendMessage('I have a question!'), 50);
    }
    
    // 🔥 If switching from game/roleplay, force refresh
    if (wasInGameOrRoleplay) {
      console.log(`🔄 Switching from ${mode} to ${actionId} - forcing state refresh`);
    }
  };

  const handleGameSelect = (gameId) => {
    const game = GAME_OPTIONS.find(g => g.id === gameId);
    if (game) {
      // DON'T change mode yet - let AI response determine mode
      // Just send the game start command with game ID (not label!)
      handleSendMessage(`START_GAME: ${game.id}`);
      
      // Set mode AFTER message sent (will trigger on AI response)
      setTimeout(() => {
        setMode('playing_game');
        setActiveActivityId(gameId);
        setTurnCount(0);
      }, 100);
    }
  };

  const handleRoleplaySelect = (roleplayId) => {
    const roleplay = dynamicRoleplays.find(r => r.id === roleplayId);
    if (roleplay) {
      // DON'T change mode yet - let AI response determine mode
      handleSendMessage(`START_ROLEPLAY: ${roleplay.title_en}`);
      
      // Set mode AFTER message sent
      setTimeout(() => {
        setMode('playing_roleplay');
        setActiveActivityId(roleplayId);
        setTurnCount(0);
      }, 100);
    }
  };

  const handleStopActivity = () => {
    setMode('idle');
    setActiveActivityId(null);
    setTurnCount(0);
    setActiveScenario(null); // 🎭 Reset roleplay state
    setActiveGame(null); // 🎮 Reset game state
    handleSendMessage('Stop');
  };

  // Check if hints should be hidden (during gameplay)
  const shouldHideHints = mode === 'playing_game' || mode === 'playing_roleplay';


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

          {/* Conversation Stats */}
          <div className="flex items-center space-x-2">
            {/* 🎮 STOP BUTTON (only show during gameplay) */}
            {(mode === 'playing_game' || mode === 'playing_roleplay') && (
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
                  {mode === 'playing_game' ? '🎮 Game' : '🎭 Roleplay'}: Turn {turnCount}
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
            hints={[]}
            mode={mode}
          />
        ))}
        
        {/* 🎮 GAME SELECTION CARDS */}
        {mode === 'selecting_game' && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                <p className="text-sm font-semibold text-blue-700">🎮 Choose a game to play!</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {GAME_OPTIONS.map((game) => (
                <button
                  key={game.id}
                  onClick={() => handleGameSelect(game.id)}
                  className="bg-gradient-to-br from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center border-2 border-green-300"
                >
                  <div className="text-3xl mb-2">{game.icon}</div>
                  <div className="text-sm font-bold text-green-800">{game.label_vi}</div>
                  <div className="text-xs text-green-600 mt-1">{game.label_en}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* 🎭 ROLEPLAY SELECTION CARDS */}
        {mode === 'selecting_roleplay' && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                <p className="text-sm font-semibold text-pink-700">🎭 Choose a character to play!</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {dynamicRoleplays.map((roleplay) => (
                <button
                  key={roleplay.id}
                  onClick={() => handleRoleplaySelect(roleplay.id)}
                  className="bg-gradient-to-br from-pink-100 to-pink-200 hover:from-pink-200 hover:to-pink-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center border-2 border-pink-300"
                >
                  <div className="text-3xl mb-2">{roleplay.emoji}</div>
                  <div className="text-sm font-bold text-pink-800">{roleplay.title_vi}</div>
                  <div className="text-xs text-pink-600 mt-1">{roleplay.title_en}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Loader2 className="text-white animate-spin" size={20} />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <p className="text-sm text-gray-500">Ms. Nova is listening...</p>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* 💡 Hints Section - Display below messages, above action tabs */}
      {showHints && hints.length > 0 && (mode === 'playing_game' || mode === 'playing_roleplay') && (
        <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-center space-x-1 mb-2">
            <span className="text-xs font-medium text-yellow-700">💡 Need help? Try these words:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {hints.slice(0, 8).map((hint, index) => (
              <div
                key={index}
                className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-semibold border border-yellow-300 cursor-default">
                {hint}
              </div>
            ))}
          </div>
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
                    : action.type === 'menu' && action.id === 'play_game'
                    ? 'bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 text-green-800 border-2 border-green-300'
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
