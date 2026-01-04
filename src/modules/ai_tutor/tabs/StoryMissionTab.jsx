import { useState, useEffect, useRef } from 'react';
import { BookOpen, Target, CheckCircle2, Loader2, Volume2 } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import InputBar from '../components/InputBar';
import HintChips from '../components/HintChips';
import { sendToAI } from '../../../services/ai_tutor/aiRouter';
import { textToSpeech } from '../../../services/ai_tutor/ttsEngine';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
import { buildStoryPrompt } from '../../../services/ai_tutor/promptLibrary';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';

/**
 * Story Mission Tab - Guided story-based learning
 * Students complete missions using target vocabulary
 */
const StoryMissionTab = () => {
  const { user, currentWeek } = useUserStore();
  
  // Separate selectors to prevent infinite re-renders
  const messages = useTutorStore(state => state.messages['story'] || []);
  const addMessage = useTutorStore(state => state.addMessage);
  const autoPlayEnabled = useTutorStore(state => state.autoPlayEnabled);
  const preferences = useTutorStore(state => state.preferences);
  
  const [hints, setHints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [missionStatus, setMissionStatus] = useState('not_started');
  const [turnCount, setTurnCount] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [silentTurns, setSilentTurns] = useState(0);
  const [initialized, setInitialized] = useState(false);
  
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize mission
  useEffect(() => {
    if (!initialized) {
      initializeMission();
      setInitialized(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeMission = () => {
    if (messages.length === 0) {
      const welcomeMessage = {
        role: 'assistant',
        content: `🌟 Welcome to Story Mission! I'm Ms. Nova, and today we're going on an adventure!\n\nReady to start? Tell me your name!`,
        timestamp: Date.now()
      };
      addMessage('story', welcomeMessage);
      setMissionStatus('started');
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
    addMessage('story', userMsg);
    setIsLoading(true);
    setTurnCount(prev => prev + 1);

    // Check if user was silent (very short message after hint shown)
    if (userMessage.trim().split(/\s+/).length <= 2 && showHints) {
      setSilentTurns(prev => prev + 1);
    } else {
      setSilentTurns(0);
    }

    try {
      // Get week data for context
      const weekData = getCurrentWeekData(currentWeek || 'week-1');
      
      // Build prompt using V5 promptLibrary
      const systemPrompt = buildStoryPrompt({
        weekData,
        userName: user?.name || 'Student',
        userAge: user?.age || 8,
        scaffoldingLevel: preferences.scaffoldingLevel || 2
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
        mode: 'story'
      });

      // Add AI response to chat
      const aiMsg = {
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now()
      };
      addMessage('story', aiMsg);

      // Auto-play TTS if enabled
      if (autoPlayEnabled) {
        await textToSpeech(aiResponse, {
          voice: preferences.voice || 'nova',
          autoPlay: true
        });
      }

      // Generate hints based on AI response (simple extraction)
      const hintMatches = aiResponse.match(/Use: "([^"]+)"/g);
      if (hintMatches) {
        const extractedHints = hintMatches.map(h => h.replace('Use: "', '').replace('"', ''));
        setHints(extractedHints);
        if (silentTurns >= 1 || turnCount >= 2) {
          setShowHints(true);
        }
      }

      // Check for mission completion
      if (aiResponse.includes('mission complete') || aiResponse.includes('completed the mission')) {
        setMissionStatus('completed');
      }

    } catch (error) {
      console.error('Story Mission Error:', error);
      const errorMsg = {
        role: 'assistant',
        content: "Oops! Let's try that again. What were you saying?",
        timestamp: Date.now()
      };
      addMessage('story', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle hint click
  const handleHintClick = (hint) => {
    // Remove "Use: " prefix if present
    const cleanHint = hint.replace(/^Use:\s*/i, '');
    handleSendMessage(cleanHint);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Mission Header */}
      <div className="bg-white border-b border-purple-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <BookOpen size={20} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Story Mission</h2>
              <p className="text-xs text-gray-500">Week {currentWeek} Adventure</p>
            </div>
          </div>

          {/* Mission Progress */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Target size={16} className="text-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                Turn {turnCount}
              </span>
            </div>
            
            {missionStatus === 'completed' && (
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <CheckCircle2 size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-700">Complete!</span>
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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Loader2 className="text-white animate-spin" size={20} />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <p className="text-sm text-gray-500">Ms. Nova is thinking...</p>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Hints Area */}
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
        disabled={isLoading || missionStatus === 'completed'}
        placeholder={
          missionStatus === 'completed' 
            ? 'Mission complete! Great job!' 
            : 'Speak or type your answer...'
        }
        showVoiceInput={true}
      />
    </div>
  );
};

export default StoryMissionTab;
