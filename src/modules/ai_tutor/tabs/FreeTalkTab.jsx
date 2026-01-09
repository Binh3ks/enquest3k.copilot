import { extractHintsFromQuestion } from '../../../services/ai_tutor/utils/responseParser';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Heart, Sparkles, Loader2, Volume2 } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import InputBar from '../components/InputBar';
import HintChips from '../components/HintChips';
import { NovaEngine } from '../../../services/ai_tutor/novaEngine';
import { textToSpeech } from '../../../services/ai_tutor/ttsEngine';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';
import week1RealData from '../../../data/weeks/week_01_real';

/**
 * Free Talk Tab - Casual conversation with subtle vocabulary scaffolding
 * Students chat naturally while Ms. Nova guides toward target vocabulary
 */
const FreeTalkTab = () => {
  const { user, currentWeek } = useUserStore();
  
  // Separate selectors to prevent infinite re-renders
  const messages = useTutorStore(state => state.messages['freetalk'] || []);
  const addMessage = useTutorStore(state => state.addMessage);
  const autoPlayEnabled = useTutorStore(state => state.autoPlayEnabled);
  
  const [hints, setHints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationTopic, setConversationTopic] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [initialized, setInitialized] = useState(false);
  
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const initializingRef = useRef(false); // 🔥 Prevent double initialization
  
  // 🔥 NEW: Initialize NovaEngine instance
  const novaEngineRef = useRef(null);
  
  // Initialize NovaEngine when component mounts or week changes
  useEffect(() => {
    const weekData = getCurrentWeekData(currentWeek || 'week-1');
    const userProfile = {
      name: user?.name || 'Student',
      age: user?.age || 8
    };
    
    novaEngineRef.current = new NovaEngine(weekData, userProfile);
    console.log('🧠 NovaEngine initialized for FreeTalkTab');
  }, [currentWeek, user]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize conversation
  useEffect(() => {
    if (!initialized && !initializingRef.current) {
      initializingRef.current = true; // 🔥 Mark as initializing
      
      // 🔥 FORCE fresh initialization - ignore any cached messages
      setInitialized(false);
      setMessageCount(0);
      setConversationTopic('');
      
      // Note: Hints will be set by initializeConversation() based on opening question
      
      initializeConversation().catch(err => {
        console.error('❌ initializeConversation error:', err);
        initializingRef.current = false; // Reset on error
      }).finally(() => {
        setInitialized(true);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeConversation = async () => {
    // 🔥 ALWAYS initialize fresh conversation - no caching
    console.log('🔄 FreeTalkTab: Starting fresh conversation with AI-generated greeting');
    
    try {
      // Get week data for AI context
      const weekData = getCurrentWeekData(currentWeek || 'week-1');
      
      // 🔥 NEW: Let AI generate natural opening (NO hardcoded greetings)
      const aiResponse = await novaEngineRef.current.sendToNova({
        mode: 'freetalk',
        userMessage: '[SYSTEM: Start conversation with natural greeting]',
        chatHistory: [],
        context: {
          turnCount: 0,
          scaffoldingLevel: 2,
          conversationTopic: 'opening',
          isOpeningTurn: true
        }
      });
      
      const greetingText = aiResponse.ai_response || "Hello! I am Ms. Nova. What is your name?";
      
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
      const fallbackGreeting = "Hello! I am Ms. Nova. What is your name?";
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
    setMessageCount(prev => prev + 1);

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
        const vocab = week1RealData.target_vocab?.map(v => v.word) || [];
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
        content: "That's interesting! Tell me more about that?",
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

      {/* 🔥 Interactive hints area with word suggestions */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle size={18} className="text-blue-500" />
          <span className="text-base font-semibold text-blue-700">
            💡 Try building sentences with these words:
          </span>
        </div>
        {hints.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {hints.map((hint, index) => (
              <button
                key={index}
                onClick={() => handleHintClick(hint)}
                className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-base font-medium transition-colors border border-blue-300 hover:border-blue-400"
              >
                {hint}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {['My', 'name', 'is', 'I', 'am', 'years', 'old', 'like', 'school', 'teacher', 'friend'].map((word, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(word)}
                className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm transition-colors"
              >
                {word}
              </button>
            ))}
          </div>
        )}
      </div>

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
