import { useState, useEffect, useRef } from 'react';
import { BookOpen, Target, CheckCircle2, Loader2, Volume2, RotateCcw } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import InputBar from '../components/InputBar';
import HintChips from '../components/HintChips';
import { sendToAI } from '../../../services/ai_tutor/aiRouter';
import { textToSpeech } from '../../../services/ai_tutor/ttsEngine';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
import { buildStoryPrompt } from '../../../services/ai_tutor/promptLibrary';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';
import week1RealData from '../../../data/weeks/week_01_real'; // 🔥 Import real syllabus
import { getAdaptivePromptAdjustment, getRecommendedScaffoldingLevel } from '../../../services/ai_tutor/learnerProfiler'; // 🔥 NEW

/**
 * Story Mission Tab - Guided story-based learning
 * REDESIGNED: Large UI, Navigation, Mission Menu
 */
const StoryMissionTab = () => {
  const { user, currentWeek } = useUserStore();
  
  // Separate selectors to prevent infinite re-renders
  const messages = useTutorStore(state => state.messages['story'] || []);
  const addMessage = useTutorStore(state => state.addMessage);
  const autoPlayEnabled = useTutorStore(state => state.autoPlayEnabled);
  const recordTurn = useTutorStore(state => state.recordTurn);
  const getLearnerStyle = useTutorStore(state => state.getLearnerStyle);
  const getStrugglingTurns = useTutorStore(state => state.getStrugglingTurns);
  const initVocabMastery = useTutorStore(state => state.initVocabMastery);
  const trackVocabUsage = useTutorStore(state => state.trackVocabUsage);
  const getVocabFocusPrompt = useTutorStore(state => state.getVocabFocusPrompt);
  const vocabMastery = useTutorStore(state => state.vocabMastery);
  
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [viewMode, setViewMode] = useState('menu'); // 'menu' or 'mission'
  const [hints, setHints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [missionStatus, setMissionStatus] = useState('not_started');
  const [turnCount, setTurnCount] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [silentTurns, setSilentTurns] = useState(0);
  const [initialized, setInitialized] = useState(false);
  
  const currentMission = week1RealData.story_missions?.[currentMissionIndex];
  
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const initializingRef = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize mission with REAL SYLLABUS
  useEffect(() => {
    if (!initialized && !initializingRef.current) {
      console.log('🚀 StoryMissionTab: Initializing mission...');
      initializingRef.current = true; // 🔥 Mark as initializing
      
      // 🔥 STEP 4: Initialize vocab mastery with Week 1 target vocabulary
      const week1Vocab = week1RealData.global_vocab || [];
      // Extract just the word strings from vocab objects
      const vocabWords = week1Vocab.map(v => typeof v === 'string' ? v : v.word);
      initVocabMastery(vocabWords);
      console.log('📚 Vocab Mastery Initialized:', vocabWords.length, 'words');
      
      initializeMission().catch(err => {
        console.error('❌ initializeMission error:', err);
        initializingRef.current = false; // Reset on error
      }).finally(() => {
        setInitialized(true);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeMission = async () => {
    console.log('🎯 initializeMission called, messages.length:', messages.length);
    
    // 🔥 Use mission-specific opening line (no emoji)
    const missionKey = currentMissionIndex === 0 ? 'mission_1' : currentMissionIndex === 1 ? 'mission_2' : 'mission_3';
    const openingLine = week1RealData.nova_instructions.opening_lines_by_mission?.[missionKey];
    
    if (!openingLine) {
      console.error('❌ Opening line not found for', missionKey);
      return;
    }
    
    console.log('📝 Opening line (Mission', currentMissionIndex + 1, '):', openingLine);
    
    // Check if already initialized
    if (messages.length > 0) {
      console.log('✅ Story mission already initialized, skipping message add but will play TTS');
      
      // 🔊 ALWAYS play opening message with TTS
      try {
        console.log('🎤 About to call textToSpeech with:', { 
          text: openingLine.substring(0, 50) + '...', 
          voice: 'nova' 
        });
        await textToSpeech(openingLine, {
          voice: 'nova',
          autoPlay: true
        });
        console.log('🔊 TTS played successfully');
      } catch (error) {
        console.error('❌ TTS error for opening message:', error);
      }
      return;
    }
    
    // Add opening message
    const welcomeMessage = {
      role: 'assistant',
      content: openingLine,
      timestamp: Date.now()
    };
    console.log('💬 Adding welcome message to chat...');
    addMessage('story', welcomeMessage);
    setMissionStatus('started');
    console.log('✅ Message added, mission status set to started');
    
    // 🔊 ALWAYS play opening message with TTS (even if message already exists)
    try {
      console.log('🎤 About to call textToSpeech with:', { 
        text: openingLine.substring(0, 50) + '...', 
        voice: 'nova' 
      });
      await textToSpeech(openingLine, {
        voice: 'nova',
        autoPlay: true
      });
      console.log('🔊 TTS played successfully');
    } catch (error) {
      console.error('❌ TTS error for opening message:', error);
    }
    
    // Set hints from syllabus
    setHints([
      'Say: "I am [your name]"',
      'Example: "I am Alex"',
      'Use "I am" to introduce yourself'
    ]);
  };

  // Handle user message
  const handleSendMessage = async (userMessage) => {
    // 🔥 STEP 3: Record turn for learner profiling
    const usedScaffold = showHints; // Student saw hints before answering
    recordTurn(userMessage, usedScaffold);
    
    // 🔥 STEP 4: Track vocab usage from user input
    trackVocabUsage(userMessage);
    
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
      
      // 🔥 Use REAL SYLLABUS data for Week 1
      const realSyllabusData = (currentWeek === 'week-1' || !currentWeek) ? week1RealData : null;
      
      // 🔥 STEP 3: Get adaptive scaffolding based on learner style
      const learnerStyle = getLearnerStyle();
      const strugglingTurns = getStrugglingTurns();
      const adaptiveScaffolding = getRecommendedScaffoldingLevel(learnerStyle, strugglingTurns);
      const adaptivePromptAdjustment = getAdaptivePromptAdjustment(learnerStyle);
      
      // 🔥 STEP 4: Get vocab focus prompt for weak words
      const vocabFocusPrompt = getVocabFocusPrompt();
      
      console.log(`📊 Learner Profile: ${learnerStyle} | Scaffolding: ${adaptiveScaffolding} | Struggling: ${strugglingTurns}`);
      console.log(`📚 Vocab Mastery:`, Object.keys(vocabMastery).length, 'words tracked');
      
      // Build prompt using V5 promptLibrary with REAL SYLLABUS + current mission
      const systemPrompt = buildStoryPrompt({
        weekData: null, // Legacy parameter
        userName: user?.name || 'Student',
        userAge: user?.age || 8,
        scaffoldingLevel: adaptiveScaffolding,
        realSyllabusData: week1RealData,
        currentMissionIndex // 🔥 Pass current mission index
      }) + '\n\n' + adaptivePromptAdjustment + vocabFocusPrompt;
      
      console.log('📝 System prompt generated for mission', currentMissionIndex + 1);

      // Prepare chat history
      const chatHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // Call AI Router (Groq → Gemini fallback) with Grammar Guard
      const aiResponse = await sendToAI({
        systemPrompt,
        chatHistory,
        userMessage,
        weekId: 1, // Week 1 grammar scope (present simple only)
        mode: 'story'
      });

      // Extract text from response object (support multiple formats)
      const responseText = aiResponse.ai_response || aiResponse.response || aiResponse;
      
      // 🔥 STEP 4: Track AI suggestions (after receiving response)
      trackVocabUsage(userMessage, { text: responseText, hints: [] });

      // Add AI response to chat
      const aiMsg = {
        role: 'assistant',
        content: responseText,
        timestamp: Date.now()
      };
      addMessage('story', aiMsg);

      // Auto-play TTS if enabled
      if (autoPlayEnabled) {
        await textToSpeech(responseText, {
          voice: 'nova', // Default voice
          autoPlay: true
        });
      }

      // Generate hints based on AI response (simple extraction)
      const hintMatches = responseText.match(/Use: "([^"]+)"/g);
      if (hintMatches) {
        const extractedHints = hintMatches.map(h => h.replace('Use: "', '').replace('"', ''));
        setHints(extractedHints);
        if (silentTurns >= 1 || turnCount >= 2) {
          setShowHints(true);
        }
      }

      // Check for mission completion
      if (responseText.includes('mission complete') || responseText.includes('completed the mission')) {
        setMissionStatus('completed');
      }

    } catch (error) {
      console.error('❌ Story Mission Error:', error);
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
      {viewMode === 'menu' ? (
        // MISSION MENU VIEW - Large Cards
        <>
          <div className="bg-white border-b border-purple-200 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BookOpen size={24} className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Story Mission</h2>
                <p className="text-sm text-gray-500">Week {currentWeek} - Choose Your Mission</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-4">
              {week1RealData.story_missions?.map((mission, index) => (
                <div
                  key={mission.mission_id}
                  onClick={() => {
                    console.log('🎯 Starting mission', index + 1);
                    setCurrentMissionIndex(index);
                    setViewMode('mission');
                    useTutorStore.getState().clearMessages('story');
                    setInitialized(false);
                    initializingRef.current = false;
                    setTurnCount(0);
                    setMissionStatus('not_started');
                    setShowHints(false);
                    // Initialize mission after state update
                    setTimeout(() => {
                      if (!initializingRef.current) {
                        initializingRef.current = true;
                        initializeMission().catch(err => {
                          console.error('❌ Mission start error:', err);
                          initializingRef.current = false;
                        }).finally(() => {
                          setInitialized(true);
                        });
                      }
                    }, 100);
                  }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {mission.mission_id}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                        {mission.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {mission.scenario}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                          <Target size={12} />
                          <span>{mission.minimum_turns} turns</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                          <BookOpen size={12} />
                          <span>{mission.target_vocab.length} words</span>
                        </div>
                        <div className="flex-1"></div>
                        <div className="text-purple-500 font-medium">
                          Start Mission →
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {mission.target_vocab.slice(0, 4).map((word, i) => (
                          <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {word}
                          </span>
                        ))}
                        {mission.target_vocab.length > 4 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            +{mission.target_vocab.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // MISSION CONVERSATION VIEW - Existing UI
        <>
          {/* Mission Header */}
          <div className="bg-white border-b border-purple-200 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setViewMode('menu')}
                  className="w-10 h-10 bg-purple-100 hover:bg-purple-200 rounded-full flex items-center justify-center transition-colors"
                  title="Back to menu"
                >
                  <span className="text-purple-600 text-lg">←</span>
                </button>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Story Mission {currentMissionIndex + 1}</h2>
                  <p className="text-xs text-gray-500">{currentMission?.title || 'Loading...'}</p>
                </div>
              </div>

              {/* Mission Progress */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    useTutorStore.getState().clearMessages('story');
                    setInitialized(false);
                    setTurnCount(0);
                    setMissionStatus('not_started');
                  }}
                  className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors text-sm"
                  title="Clear chat and restart"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
                
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

          {/* Mission Description */}
          {currentMission && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 border-b border-purple-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentMission.scenario}
              </p>
              <div className="mt-2 flex items-center space-x-2 text-xs text-purple-700">
                <Target size={12} />
                <span>Minimum {currentMission.minimum_turns} turns</span>
                <span className="ml-2">•</span>
                <span>{currentMission.target_vocab.join(', ')}</span>
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
        </>
      )}
    </div>
  );
};

export default StoryMissionTab;
