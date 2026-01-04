import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Heart, Sparkles, Loader2, Volume2 } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import InputBar from '../components/InputBar';
import HintChips from '../components/HintChips';
import { sendToAI } from '../../../services/ai_tutor/aiRouter';
import { textToSpeech } from '../../../services/ai_tutor/ttsEngine';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
import { buildFreeTalkPrompt } from '../../../services/ai_tutor/promptLibrary';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';

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

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize conversation
  useEffect(() => {
    if (!initialized && !initializingRef.current) {
      initializingRef.current = true; // 🔥 Mark as initializing
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
    // 🔥 Check if we have OLD placeholder messages and clear if needed
    if (messages.length > 0) {
      const firstMsg = messages[0];
      
      // Extract text from content (handle both string and object)
      const contentText = typeof firstMsg.content === 'string' 
        ? firstMsg.content 
        : firstMsg.content?.ai_response || firstMsg.content?.content || '';
      
      // Check if it's old placeholder (not Hero Academy themed)
      const isOldPlaceholder = firstMsg.role === 'assistant' && 
        !contentText.includes('Hero Academy') &&
        (contentText.includes('What makes you happy') || 
         contentText.includes('dream about') ||
         contentText.includes('favorite thing'));
      
      if (isOldPlaceholder) {
        console.log('🧹 FreeTalkTab: Clearing old placeholder messages...');
        useTutorStore.getState().clearMessages('freetalk');
      } else {
        // Already has correct Hero Academy greeting
        console.log('✅ FreeTalkTab: Already has Hero Academy greeting');
        return;
      }
    }
    
    // Add new Hero Academy greeting
    // 🔥 Week 1 themed greetings (Hero Academy context)
    const greetings = [
        `Hi ${user?.name || 'there'}! 🦸‍♀️ I'm Ms. Nova from Hero Academy! What's your superhero power?`,
        `Hello ${user?.name || 'friend'}! 💫 Welcome to Hero Academy! Are you a boy or a girl hero?`,
        `Hey ${user?.name || 'there'}! ✨ I'm your teacher Ms. Nova! How old are you?`,
        `Hi ${user?.name || 'there'}! 🎓 Ready for Hero Academy? What makes you a special student?`,
        `Hello ${user?.name || 'friend'}! 🌟 Tell me about yourself! I'm Ms. Nova, your hero teacher!`
      ];

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      
      const welcomeMessage = {
        role: 'assistant',
        content: randomGreeting,
        timestamp: Date.now()
      };
      addMessage("freetalk", welcomeMessage);
      console.log('💬 FreeTalkTab: Added new Hero Academy greeting');
      
      // 🔊 Play opening with TTS
      try {
        if (autoPlayEnabled) {
          await textToSpeech(randomGreeting, {
            voice: 'nova',
            autoPlay: true
          });
        }
      } catch (error) {
        console.error('TTS error for FreeTalk opening:', error);
      }
  };

  // Handle user message
  const handleSendMessage = async (userMessage) => {
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
      // Get week data for subtle vocabulary guidance
      const weekData = getCurrentWeekData(currentWeek || 'week-1');
      
      // Build prompt using V5 promptLibrary
      const systemPrompt = buildFreeTalkPrompt({
        weekData,
        userName: user?.name || 'Student',
        userAge: user?.age || 8,
        scaffoldingLevel: 2 // Default scaffolding level
      });

      // Prepare chat history
      const chatHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // Call AI Router (Groq → Gemini fallback)
      const aiResponse = await sendToAI({
        systemPrompt,
        chatHistory,
        userMessage,
        mode: 'freetalk'
      });

      // Extract text from response object
      const responseText = aiResponse.ai_response || aiResponse;

      // Add AI response to chat
      const aiMsg = {
        role: 'assistant',
        content: responseText,
        timestamp: Date.now()
      };
      addMessage("freetalk", aiMsg);

      // Auto-play TTS if enabled
      if (autoPlayEnabled) {
        await textToSpeech(responseText, {
          voice: 'nova', // Default voice
          autoPlay: true
        });
      }

      // Extract hints if present
      const hintMatches = responseText.match(/Use: "([^"]+)"/g);
      if (hintMatches) {
        const extractedHints = hintMatches.map(h => h.replace('Use: "', '').replace('"', ''));
        setHints(extractedHints);
        if (userMessage.trim().split(/\s+/).length <= 3 && messageCount > 2) {
          setShowHints(true);
        } else {
          setShowHints(false);
        }
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

      {/* Hints Area (minimal, only when needed) */}
      {showHints && hints.length > 0 && (
        <div className="px-6 py-2">
          <HintChips
            hints={hints}
            onHintClick={handleHintClick}
            show={showHints}
          />
        </div>
      )}

      {/* Input Area */}
      <InputBar
        onSend={handleSendMessage}
        disabled={isLoading}
        placeholder="Speak or share your thoughts..."
        showVoiceInput={true}
      />

      {/* Encouragement Footer */}
      {messageCount > 5 && (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-center">
          <p className="text-xs text-gray-600 flex items-center justify-center space-x-1">
            <Sparkles size={14} className="text-purple-500" />
            <span>You're doing great! Keep talking!</span>
            <Sparkles size={14} className="text-blue-500" />
          </p>
        </div>
      )}
    </div>
  );
};

export default FreeTalkTab;
