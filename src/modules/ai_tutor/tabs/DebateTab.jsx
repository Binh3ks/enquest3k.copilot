import { useState, useEffect, useRef } from 'react';
import { Users, ThumbsUp, ThumbsDown, Lightbulb, Loader2 } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import InputBar from '../components/InputBar';
import { sendToAI } from '../../../services/ai_tutor/aiRouter';
import { textToSpeech } from '../../../services/ai_tutor/ttsEngine';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
import { buildPersonaDescription, MODE_PROMPTS } from '../../../services/ai_tutor/promptLibrary';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';

/**
 * Debate Tab - Practice expressing opinions and reasoning
 * Age-appropriate debates on week's topic
 */
const DebateTab = () => {
  const { user, currentWeek } = useUserStore();
  
  // Separate selectors to prevent infinite re-renders
  const messages = useTutorStore(state => state.messages['debate'] || []);
  const addMessage = useTutorStore(state => state.addMessage);
  const autoPlayEnabled = useTutorStore(state => state.autoPlayEnabled);
  
  const [isLoading, setIsLoading] = useState(false);
  const [debateTopic, setDebateTopic] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [turnCount, setTurnCount] = useState(0);
  const [initialized, setInitialized] = useState(false);
  
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load week data and initialize debate
  useEffect(() => {
    if (!initialized) {
      const data = getCurrentWeekData(currentWeek || 'week-1');
      initializeDebate(data);
      setInitialized(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeek]);

  const initializeDebate = (data) => {
    if (messages.length === 0) {
      const topics = generateDebateTopics(data?.topic || 'Animals');
      const selectedTopic = topics[Math.floor(Math.random() * topics.length)];
      setDebateTopic(selectedTopic);

      const welcomeMessage = {
        role: 'assistant',
        content: `👋 Hi ${user?.name || 'there'}! Let's have a friendly debate!\n\n🤔 Here's what I think: "${selectedTopic}"\n\nDo you agree or disagree? Why?`,
        timestamp: Date.now()
      };
      addMessage("debate", welcomeMessage);
    }
  };

  const generateDebateTopics = (weekTopic) => {
    const topicMap = {
      'Animals': [
        'Dogs are better pets than cats',
        'Wild animals should live in zoos',
        'All animals should be vegetarian',
        'Birds are the most interesting animals'
      ],
      'Family': [
        'Older siblings should help with chores more',
        'Everyone should have a pet at home',
        'Family dinners are important every day'
      ],
      'Food': [
        'Pizza is the best food ever',
        'Vegetables are more important than fruits',
        'Breakfast is the most important meal'
      ],
      'School': [
        'School should start later in the morning',
        'Homework is helpful for learning',
        'Art class is as important as math'
      ],
      'default': [
        'Books are better than movies',
        'Summer is better than winter',
        'Playing outside is more fun than video games'
      ]
    };

    return topicMap[weekTopic] || topicMap['default'];
  };

  // Handle position selection
  const handlePositionSelect = (position) => {
    setUserPosition(position);
    const positionMessage = position === 'agree' 
      ? 'I agree!' 
      : 'I disagree!';
    handleSendMessage(positionMessage);
  };

  // Handle user message
  const handleSendMessage = async (userMessage) => {
    // Add user message to chat
    const userMsg = {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };
    addMessage("debate", userMsg);
    setIsLoading(true);
    setTurnCount(prev => prev + 1);

    try {
      // Build debate prompt
      const persona = buildPersonaDescription();
      const debatePrompt = MODE_PROMPTS.debate.systemAddition;
      const weekDataInfo = getCurrentWeekData(currentWeek || 'week-1');
      
      // Support both global_vocab and vocabulary fields
      const vocabArray = weekDataInfo?.global_vocab || weekDataInfo?.vocabulary || [];
      const vocabList = vocabArray.map(v => v.word).join(', ') || 'student, teacher, school, classroom, backpack, book, notebook, library, scientist';
      
      const systemPrompt = `${persona}

**MODE: DEBATE**
${debatePrompt}

**DEBATE TOPIC:** ${debateTopic}
**STUDENT POSITION:** ${userPosition || 'unknown'}
**WEEK VOCAB (Week 1 - The Young Scholar):** ${vocabList}
**ALLOWED GRAMMAR:** Simple present only (be, have, like)

**CRITICAL RULES:**
- Keep responses under 20 words
- Ask ONE follow-up question
- Celebrate student's opinion: "That's a great point!"
- Gently challenge with counter-perspective
- Use Recast if grammar errors occur

Keep responses short (2-3 sentences). Be encouraging!`;

      // Prepare chat history
      const chatHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // Call AI Router
      const aiResponse = await sendToAI({
        systemPrompt,
        chatHistory,
        userMessage,
        mode: 'debate'
      });

      // Extract text from response object
      const responseText = aiResponse.ai_response || aiResponse;

      // Add AI response to chat
      const aiMsg = {
        role: 'assistant',
        content: responseText,
        timestamp: Date.now()
      };
      addMessage("debate", aiMsg);

      // Auto-play TTS if enabled
      if (autoPlayEnabled) {
        await textToSpeech(responseText, {
          voice: 'nova', // Default voice
          autoPlay: true
        });
      }

    } catch (error) {
      console.error('Debate Error:', error);
      const errorMsg = {
        role: 'assistant',
        content: "That's a good point! Tell me more about why you think that.",
        timestamp: Date.now()
      };
      addMessage("debate", errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-red-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Users size={20} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Friendly Debate</h2>
              <p className="text-xs text-gray-500">Share your opinion!</p>
            </div>
          </div>

          {/* Turn Counter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              {turnCount} {turnCount === 1 ? 'turn' : 'turns'}
            </span>
          </div>
        </div>
      </div>

      {/* Debate Topic Card (shown initially) */}
      {!userPosition && debateTopic && (
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb size={20} className="text-orange-600" />
                <h3 className="font-bold text-gray-800">Debate Topic:</h3>
              </div>
              <p className="text-xl font-medium text-gray-800 mb-4">
                "{debateTopic}"
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handlePositionSelect('agree')}
                  className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <ThumbsUp size={20} />
                  <span>I Agree</span>
                </button>
                <button
                  onClick={() => handlePositionSelect('disagree')}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <ThumbsDown size={20} />
                  <span>I Disagree</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <Loader2 className="text-white animate-spin" size={20} />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <p className="text-sm text-gray-500">Ms. Nova is thinking...</p>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Helpful Phrases */}
      {userPosition && turnCount < 3 && (
        <div className="px-6 py-3 bg-yellow-50 border-t border-yellow-200">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-medium text-yellow-800 mb-2">💡 Helpful phrases:</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-700 border border-yellow-300">
                I think...
              </span>
              <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-700 border border-yellow-300">
                Because...
              </span>
              <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-700 border border-yellow-300">
                In my opinion...
              </span>
              <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-700 border border-yellow-300">
                For example...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <InputBar
        onSend={handleSendMessage}
        disabled={isLoading || !userPosition}
        placeholder={userPosition ? 'Speak or explain your opinion...' : 'Choose agree or disagree first'}
        showVoiceInput={true}
      />

      {/* Encouragement */}
      {turnCount >= 5 && (
        <div className="bg-gradient-to-r from-red-100 to-orange-100 px-4 py-2 text-center">
          <p className="text-xs text-gray-700">
            🌟 Great debate! You're learning to express your ideas clearly!
          </p>
        </div>
      )}
    </div>
  );
};

export default DebateTab;
