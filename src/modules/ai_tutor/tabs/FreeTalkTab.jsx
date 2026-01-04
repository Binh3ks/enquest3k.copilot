import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Heart, Sparkles, Loader2 } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import InputBar from '../components/InputBar';
import HintChips from '../components/HintChips';
import sendToNova from '../../../services/ai_tutor/novaEngine';
import { useUserStore } from '../../../stores/useUserStore';

/**
 * Free Talk Tab - Casual conversation with subtle vocabulary scaffolding
 * Students chat naturally while Ms. Nova guides toward target vocabulary
 */
const FreeTalkTab = () => {
  const { user, currentWeek } = useUserStore();
  const [messages, setMessages] = useState([]);
  const [hints, setHints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationTopic, setConversationTopic] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize conversation
  useEffect(() => {
    initializeConversation();
  }, []);

  const initializeConversation = async () => {
    const greetings = [
      `Hi ${user?.name || 'there'}! 🌟 I'm Ms. Nova. What makes you happy?`,
      `Hello ${user?.name || 'friend'}! 💫 What did you dream about last night?`,
      `Hey ${user?.name || 'there'}! ✨ If you could be any animal, which one would you be?`,
      `Hi ${user?.name || 'there'}! 🎨 What's your favorite thing to do after school?`,
      `Hello ${user?.name || 'friend'}! 🌈 Tell me about something cool you saw today!`
    ];

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    const welcomeMessage = {
      role: 'assistant',
      content: randomGreeting,
      timestamp: Date.now()
    };
    setMessages([welcomeMessage]);
  };

  // Handle user message
  const handleSendMessage = async (userMessage) => {
    // Add user message to chat
    const userMsg = {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setMessageCount(prev => prev + 1);

    // Detect topic from first user message
    if (messageCount === 0 && userMessage.length > 10) {
      setConversationTopic(userMessage.split(' ')[0]); // Simple topic extraction
    }

    try {
      // Call Nova Engine
      const response = await sendToNova({
        mode: 'freetalk',
        weekId: currentWeek || 'week-1',
        chatHistory: messages.map(m => ({ role: m.role, content: m.content })),
        userProfile: {
          name: user?.name || 'Student',
          age: user?.age || 8,
          learnerStyle: user?.learnerStyle || 'normal',
          vocabMastery: user?.vocabMastery || {}
        },
        userMessage
      });

      // Add AI response to chat
      const aiMsg = {
        role: 'assistant',
        content: response.ai_response,
        timestamp: Date.now(),
        pedagogyNote: response.pedagogy_note
      };
      setMessages(prev => [...prev, aiMsg]);

      // Update hints (show more sparingly in free talk)
      if (response.suggested_hints && response.suggested_hints.length > 0) {
        setHints(response.suggested_hints);
        // Only show hints if student seems stuck (very short responses)
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
      setMessages(prev => [...prev, errorMsg]);
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
        placeholder="Share your thoughts..."
        showVoiceInput={false}
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
