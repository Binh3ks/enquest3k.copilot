import { extractHintsFromQuestion } from '../../../services/ai_tutor/utils/responseParser';
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
import { useStationProgress } from '../../../hooks/useStationProgress'; // 🔥 Universal Progress System
import { useLocation } from 'react-router-dom'; // 🔥 Get weekId from URL pathname
import { FREE_TALK_ACTIONS, GAME_OPTIONS, ROLEPLAY_SCENARIOS } from '../../../config/freeTalkConfig'; // 🎮 FREE TALK 3.0

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
  const [turnCount, setTurnCount] = useState(0); // Game turn counter
  
  // 🔥 Dynamic week data selection
  const weekRealData = weekNumber === 1 ? week1RealData : weekNumber === 2 ? week2RealData : weekNumber === 3 ? week3RealData : week4RealData;
  
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
          await textToSpeech(greetingText, {
            voice: 'nova',
            autoPlay: true
          });
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
    // 🔥 HARD STOP: Block sending if already at/past turn 15
    const currentTurnCount = Math.floor(messages.length / 2);
    if (currentTurnCount >= 15) {
      console.log('⛔ FreeTalk: Turn 15 reached - conversation ended');
      return; // Don't process any more messages
    }
    
    // Add user message to chat
    const userMsg = {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };
    addMessage("freetalk", userMsg);
    setIsLoading(true);
    
    // 🎮 Increment turn count if in game/roleplay mode
    if (mode === 'playing_game' || mode === 'playing_roleplay') {
      setTurnCount(prev => prev + 1);
      
      // Auto-exit after 15 turns
      if (turnCount >= 15) {
        setMode('idle');
        setActiveActivityId(null);
        setTurnCount(0);
      }
    }
    
    setMessageCount(prev => {
      const newCount = prev + 1;
      
      // 🔥 Save progress to Universal Progress System (debounced)
      saveProgress({
        totalTurns: newCount,
        conversationTopic: conversationTopic || userMessage.split(' ')[0],
        lastMessageAt: new Date().toISOString(),
        vocabUsed: savedData.vocabUsed || []
      }, false, Math.min(100, newCount * 5)); // Score based on engagement
      
      return newCount;
    });

    // Detect topic from first user message
    if (messageCount === 0 && userMessage.length > 10) {
      setConversationTopic(userMessage.split(' ')[0]);
    }

    try {
      // Calculate turn count
      const turnCount = Math.floor((messages.length + 1) / 2); // +1 for user message just added
      console.log('📊 FreeTalk Turn Count:', turnCount);
      
      // Prepare chat history
      const chatHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // 🔥 NEW: Use NovaEngine - AI tự quyết định khi nào nên đề nghị HS đặt câu hỏi
      const aiResponse = await novaEngineRef.current.sendToNova({
        mode: 'freetalk',
        weekId: weekNumberRef.current,  // 🔥 V27: Pass weekId for freetalk_knowledge
        userMessage,
        chatHistory,
        context: {
          turnCount,
          scaffoldingLevel: 2,
          conversationTopic
        }
      });

      // 🔥 DEBUG: Log full AI response
      console.log('🤖 FreeTalk Full AI Response Object:', aiResponse);
      console.log('🤖 FreeTalk Response keys:', Object.keys(aiResponse));

      // Extract text from response object (support multiple formats)
      let responseText = aiResponse.ai_response || aiResponse.response || aiResponse;
      
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
      
      // 🔥 CHECK: If this is turn 14+ and AI didn't close properly, force closure
      const finalTurnCount = Math.floor((messages.length + 2) / 2); // +2 for user + AI messages just added
      console.log('📊 Final turn count after AI response:', finalTurnCount);
      
      let closingMessage = null;
      
      if (finalTurnCount >= 14) {
        if (responseText.includes('?')) {
          // AI still asking questions at turn 14+ - force close
          console.log('⚠️ AI asked question at turn', finalTurnCount, '- forcing closure');
          
          closingMessage = `I loved talking with you today! You did a great job practicing English. Keep learning and see you next time!`;
          
          const closureMsg = {
            role: 'assistant',
            content: closingMessage,
            timestamp: Date.now() + 1000
          };
          
          setTimeout(async () => {
            addMessage("freetalk", closureMsg);
            setShowHints(false); // Hide hints on closure
            
            // 🔊 Play closing message TTS
            try {
              console.log('🔊 Playing CLOSING message TTS');
              await textToSpeech(closingMessage, {
                voice: 'nova',
                autoPlay: true
              });
            } catch (error) {
              console.error('❌ TTS error for closing message:', error);
            }
          }, 1000);
        } else {
          // AI properly closed - hide hints
          setShowHints(false);
          console.log('✅ Conversation properly closed at turn', finalTurnCount);
        }
      }

      // 🔊 ALWAYS auto-play TTS for AI responses
      try {
        console.log('🎤 FreeTalkTab: Playing AI response TTS...');
        await textToSpeech(responseText, {
          voice: 'nova',
          autoPlay: true
        });
      } catch (error) {
        console.error('❌ TTS error for AI response:', error);
      }

      // 🔥 Use AI-generated contextual hints that match the question (SCRAMBLED)
      // Only show hints if this is NOT a closing turn
      if (responseText.includes('?') && aiResponse.suggested_hints && aiResponse.suggested_hints.length > 0) {
        // 🔥 Scramble hints for better learning experience
        const scrambledHints = [...aiResponse.suggested_hints].sort(() => Math.random() - 0.5);
        setHints(scrambledHints);
        setShowHints(true);
        console.log('💡 FreeTalk AI hints (scrambled):', scrambledHints);
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
    if (actionId === 'translate') {
      setMode('translation_help');
      handleSendMessage('Translate this for me...');
    } else if (actionId === 'play_game') {
      setMode('selecting_game');
    } else if (actionId === 'role_play') {
      setMode('selecting_roleplay');
    } else if (actionId === 'ask_any') {
      setMode('asking_any');
      handleSendMessage('I have a question!');
    }
  };

  const handleGameSelect = (gameId) => {
    const game = GAME_OPTIONS.find(g => g.id === gameId);
    if (game) {
      // DON'T change mode yet - let AI response determine mode
      // Just send the game start command
      handleSendMessage(`START_GAME: ${game.label_en}`);
      
      // Set mode AFTER message sent (will trigger on AI response)
      setTimeout(() => {
        setMode('playing_game');
        setActiveActivityId(gameId);
        setTurnCount(0);
      }, 100);
    }
  };

  const handleRoleplaySelect = (roleplayId) => {
    const roleplay = ROLEPLAY_SCENARIOS.find(r => r.id === roleplayId);
    if (roleplay) {
      // DON'T change mode yet - let AI response determine mode
      handleSendMessage(`START_ROLEPLAY: ${roleplay.label_en}`);
      
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
    handleSendMessage('Stop');
  };

  // Check if hints should be hidden (during gameplay)
  const shouldHideHints = mode === 'playing_game' || mode === 'playing_roleplay';


  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Free Talk</h2>
              <p className="text-xs text-gray-500">Let's chat naturally!</p>
            </div>
          </div>

          {/* Conversation Stats */}
          <div className="flex items-center space-x-3">
            {/* 🎮 STOP BUTTON (only show during gameplay) */}
            {(mode === 'playing_game' || mode === 'playing_roleplay') && (
              <button
                onClick={handleStopActivity}
                className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 rounded-full transition-colors border border-red-300"
              >
                <X size={14} className="text-red-600" />
                <span className="text-xs font-medium text-red-700">Stop Game</span>
              </button>
            )}
            
            <div className="flex items-center space-x-1">
              <Heart size={16} className="text-pink-500" />
              <span className="text-sm font-medium text-gray-700">{messageCount}</span>
            </div>
            {conversationTopic && (
              <div className="bg-blue-100 px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-blue-700">
                  Topic: {conversationTopic}
                </span>
              </div>
            )}
            {/* Show active activity badge */}
            {activeActivityId && (
              <div className="bg-purple-100 px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-purple-700">
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
        className="flex-1 overflow-y-auto px-6 py-4 space-y-2"
      >
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
            pedagogyNote={msg.pedagogyNote}
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
              {ROLEPLAY_SCENARIOS.map((roleplay) => (
                <button
                  key={roleplay.id}
                  onClick={() => handleRoleplaySelect(roleplay.id)}
                  className="bg-gradient-to-br from-pink-100 to-pink-200 hover:from-pink-200 hover:to-pink-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center border-2 border-pink-300"
                >
                  <div className="text-3xl mb-2">{roleplay.icon}</div>
                  <div className="text-sm font-bold text-pink-800">{roleplay.label_vi}</div>
                  <div className="text-xs text-pink-600 mt-1">{roleplay.label_en}</div>
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

      {/* ✨ FREE TALK 2.0: STARTER PROMPTS - REPLACED BY FIXED ACTION BAR */}
      {/* 🎮 FREE TALK 3.0: FIXED ACTION BAR */}
      <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-purple-200">
        <div className="flex items-center gap-1 mb-1.5">
          <Sparkles size={14} className="text-purple-500" />
          <span className="text-xs font-semibold text-purple-700">
            🎯 Choose an action:
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {FREE_TALK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.id)}
              disabled={isLoading}
              className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all transform hover:scale-105 shadow-sm hover:shadow-md ${
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
          ))}
        </div>
      </div>

      {/* 🔥 Hint chips removed - not needed for games/roleplay */}

      {/* Input Area */}
      <InputBar
        onSend={handleSendMessage}
        disabled={isLoading || Math.floor(messages.length / 2) >= 14}
        placeholder={
          Math.floor(messages.length / 2) >= 14
            ? "Conversation complete! Great job practicing English!"
            : "Speak or share your thoughts..."
        }
        showVoiceInput={Math.floor(messages.length / 2) < 14}
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
      {Math.floor(messages.length / 2) >= 14 && (
        <div className="bg-gradient-to-r from-green-100 to-blue-100 px-4 py-3 text-center border-t-2 border-green-300">
          <p className="text-sm font-semibold text-green-700 flex items-center justify-center space-x-2">
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>Conversation Complete! You practiced English wonderfully!</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
          </p>
        </div>
      )}
    </div>
  );
};

export default FreeTalkTab;
