import { extractHintsFromQuestion } from '../../../services/ai_tutor/utils/responseParser';
import { guardResponseObject, extractStudentName, clearFollowUpTracking } from '../../../services/ai_tutor/utils/responseGuard';
import { resetTurnManager, getTurnManager, registerTurnManager, TurnManager } from '../../../services/ai_tutor/turnManager';
import { useState, useEffect, useRef } from 'react';
import { BookOpen, Target, CheckCircle2, Loader2, Volume2, RotateCcw } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import InputBar from '../components/InputBar';
import { NovaEngine } from '../../../services/ai_tutor/novaEngine';
import { textToSpeech } from '../../../services/ai_tutor/ttsEngine';
import useTutorStore from '../../../services/ai_tutor/tutorStore';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';
import week1RealData from '../../../data/weeks/week_01_real'; // 🔥 Import real syllabus
import { getAdaptivePromptAdjustment, getRecommendedScaffoldingLevel } from '../../../services/ai_tutor/learnerProfiler'; // 🔥 NEW
import { week1Objectives } from '../../../data/syllabus/week1_objectives'; // Mission 1
import { mission2Objectives } from '../../../data/syllabus/week1_mission2_objectives'; // Mission 2
import { mission3Objectives } from '../../../data/syllabus/week1_mission3_objectives'; // Mission 3
import { useStationProgress } from '../../../hooks/useStationProgress'; // 🔥 Universal Progress System

/**
 * Story Mission Tab - Guided story-based learning
 * REDESIGNED: Large UI, Navigation, Mission Menu
 */
const StoryMissionTab = () => {
  const { user, currentWeek } = useUserStore();
  
  // 🔥 Universal Progress System Integration
  const weekNumber = parseInt(currentWeek?.replace('week-', '') || '1');
  const { savedData, saveProgress, markComplete } = useStationProgress(weekNumber, 'ai_story');
  
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
  
  // Restore state from Universal Progress System
  const [currentMissionIndex, setCurrentMissionIndex] = useState(savedData.currentMissionIndex || 0);
  const [viewMode, setViewMode] = useState('menu'); // 'menu' or 'mission'
  const [hints, setHints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [missionStatus, setMissionStatus] = useState('not_started');
  const [turnCount, setTurnCount] = useState(savedData.turnCount || 0);
  const [showHints, setShowHints] = useState(false);
  const [silentTurns, setSilentTurns] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [studentName, setStudentName] = useState(savedData.studentName || null); // 🔥 Restore student name
  
  const currentMission = week1RealData.story_missions?.[currentMissionIndex];
  
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const initializingRef = useRef(false);
  
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
    console.log('🧠 NovaEngine initialized for StoryMissionTab');
  }, [currentWeek, user]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize vocab mastery only (NO auto-mission start)
  useEffect(() => {
    if (!initialized && !initializingRef.current) {
      console.log('🚀 StoryMissionTab: Initializing vocab only...');
      initializingRef.current = true;
      
      // 🔥 STEP 4: Initialize vocab mastery with Week 1 target vocabulary
      const week1Vocab = week1RealData.global_vocab || [];
      // Extract just the word strings from vocab objects
      const vocabWords = week1Vocab.map(v => typeof v === 'string' ? v : v.word);
      initVocabMastery(vocabWords);
      console.log('📚 Vocab Mastery Initialized:', vocabWords.length, 'words');
      
      setInitialized(true);
      initializingRef.current = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeMission = async (missionIndex = currentMissionIndex) => {
    console.log('🎯 initializeMission called for Mission', missionIndex + 1);
    
    // 🔥 CRITICAL: Read fresh messages from store, NOT from closure
    const tutorStore = useTutorStore.getState();
    const currentMessages = tutorStore.messages['story'] || [];
    
    console.log('📊 Current state:', { 
      messagesLength: currentMessages.length, 
      missionIndex,
      initialized,
      missionStatus 
    });
    
    // 🔥 CRITICAL: ONLY initialize if NO messages exist
    if (currentMessages.length > 0) {
      console.log('✅ Mission already has', currentMessages.length, 'messages, skipping initialization');
      return;
    }
    
    // 🔥 CRITICAL: Ensure we have the correct mission data
    const currentMission = week1RealData.story_missions?.[missionIndex];
    if (!currentMission) {
      console.error('❌ Mission not found for index:', missionIndex);
      return;
    }
    
    console.log('📋 Initializing Mission:', {
      index: missionIndex,
      id: currentMission.mission_id,
      title: currentMission.title,
      target_vocab: currentMission.target_vocab,
      minimum_turns: currentMission.minimum_turns
    });
    
    console.log('📊 Chat history length before init:', messages.length);
    console.log('🎯 Mission details:', {
      missionId: currentMission.mission_id,
      title: currentMission.title,
      target_vocab: currentMission.target_vocab
    });
    
    // 🔥 ONE BRAIN: Create TurnManager ONCE (the ONLY creation point)
    console.log('🏗️ Creating TurnManager for Mission', currentMission.mission_id);
    
    // 🔥 NEW: Get objectives for Mission 1 (objective-driven mode)
    // 🎯 Load objectives based on mission_id
    let objectives = null;
    let missionVocabulary = null;
    
    if (currentMission.mission_id === 1) {
      objectives = week1Objectives.objectives;
      missionVocabulary = week1Objectives.constraints.vocabulary;
    } else if (currentMission.mission_id === 2) {
      objectives = mission2Objectives.objectives;
      missionVocabulary = mission2Objectives.constraints.vocabulary;
    } else if (currentMission.mission_id === 3) {
      objectives = mission3Objectives.objectives;
      missionVocabulary = mission3Objectives.constraints.vocabulary;
    }
    
    console.log('🎯 Objectives for Mission', currentMission.mission_id, ':', objectives ? 'LOADED (Objective-driven)' : 'LEGACY (Step-based)');
    
    // Inject vocabulary into mission data for prompt builder
    if (missionVocabulary) {
      currentMission.vocabulary = missionVocabulary;
    }
    console.log('🎯 Objectives for Mission', currentMission.mission_id, ':', objectives ? 'LOADED (Objective-driven)' : 'LEGACY (Step-based)');
    
    // 🔥 Create TurnManager with objectives (if available)
    const turnManager = new TurnManager(currentMission.mission_id, currentMission.title, objectives);
    registerTurnManager(turnManager); // Register in singleton registry
    
    try {
      // 🔥 Pass TurnManager to novaEngine via context
      const opening = await novaEngineRef.current.sendToNova({
        mode: 'story',
        userMessage: '', // Empty for opening turn
        chatHistory: [],
        context: {
          missionId: currentMission.mission_id,
          missionIndex: missionIndex,
          turnCount: 1,
          minimumTurns: currentMission?.minimum_turns || 10,
          realSyllabusData: week1RealData,
          studentName: null,
          isOpeningTurn: true,
          turnManager: turnManager, // 🔥 Pass TurnManager reference
          mission: currentMission    // 🔥 Pass mission object for greeting
        }
      });
      
      console.log('🤖 Opening response from AI:', opening);
      
      // 🔥 Apply response guard with TurnManager reference
      const guardContext = {
        studentName: null,
        turnManager: turnManager,
        mission: currentMission,  // 🔥 Pass mission for greeting
        isOpeningTurn: true
      };
      const guardedOpening = guardResponseObject(opening, guardContext, 15);
      
      // 🔥 Mark first step as asked AFTER opening message accepted
      // Only for legacy mode - objective mode doesn't use steps
      if (turnManager.mode === 'step') {
        const firstStep = turnManager.missionSteps[0];
        turnManager.markStepAsked(firstStep.key);
        console.log('✅ Opening step marked as asked:', firstStep.key);
      } else {
        console.log('✅ Objective mode: No step marking needed');
      }
      
      const openingLine = guardedOpening.ai_response || 'Hello! I am Ms. Nova. What is your name?';
      
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
      
      // 🔊 Play opening message with TTS
      try {
        await textToSpeech(openingLine, {
          voice: 'nova',
          autoPlay: true
        });
        console.log('🔊 TTS played successfully');
      } catch (error) {
        console.error('❌ TTS error for opening message:', error);
      }
      
      // 🔥 CRITICAL: Set hints from guarded opening response
      if (guardedOpening.suggested_hints && guardedOpening.suggested_hints.length > 0) {
        const scrambledHints = [...guardedOpening.suggested_hints].sort(() => Math.random() - 0.5);
        setHints(scrambledHints);
        setShowHints(true);
        console.log('💡 Opening hints set:', scrambledHints);
      } else {
        console.warn('⚠️ No hints from opening response');
        setShowHints(false);
      }
    } catch (error) {
      console.error('❌ Error getting opening response:', error);
      // Fallback
      const fallbackLine = 'Hello! I am Ms. Nova, your English teacher. What is your name?';
      addMessage('story', {
        role: 'assistant',
        content: fallbackLine,
        timestamp: Date.now()
      });
      setMissionStatus('started');
      setHints(['My', 'name', 'is', 'I', 'am']);
      setShowHints(true);
    }
  };

  // Handle user message
  const handleSendMessage = async (userMessage) => {
    // 🔥 NEW: Extract student name from message
    const detectedName = extractStudentName(userMessage);
    if (detectedName && !studentName) {
      console.log('✅ Student name detected:', detectedName);
      setStudentName(detectedName);
    }
    
    // 🔥 FLEXIBLE TURN LIMIT: Allow 12-15 turns if conversation is interactive
    const currentTurns = Math.floor(messages.length / 2);
    const minimumTurns = currentMission?.minimum_turns || 10;
    const maximumTurns = currentMission?.maximum_turns || 15; // Soft maximum
    
    // Only block if we've REALLY exceeded maximum (15+ turns)
    if (currentTurns >= maximumTurns) {
      console.log('⛔ Mission completed - maximum turn limit reached:', currentTurns, '/', maximumTurns);
      return; // Don't process any more messages
    }
    
    // Between minimumTurns (10) and maximumTurns (15): Allow continuation
    if (currentTurns >= minimumTurns && currentTurns < maximumTurns) {
      console.log(`✅ Mission extended - interactive conversation: ${currentTurns}/${minimumTurns} (max ${maximumTurns})`);
      // Continue processing - this is good! Student is engaged
    }
    
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
    setTurnCount(prev => {
      const newCount = prev + 1;
      
      // 🔥 Save progress to Universal Progress System (debounced)
      saveProgress({
        turnCount: newCount,
        currentMissionIndex,
        lastMissionId: currentMission?.mission_id,
        studentName: studentName,
        lastInteractionAt: new Date().toISOString()
      });
      
      return newCount;
    });

    // Check if user was silent (very short message after hint shown)
    if (userMessage.trim().split(/\s+/).length <= 2 && showHints) {
      setSilentTurns(prev => prev + 1);
    } else {
      setSilentTurns(0);
    }

    try {
      // 🔥 CRITICAL: Ensure current mission is available
      const currentMission = week1RealData.story_missions?.[currentMissionIndex];
      if (!currentMission) {
        console.error('❌ Current mission not found:', currentMissionIndex);
        return;
      }
      
      console.log('📊 Sending message with mission context:', {
        missionIndex: currentMissionIndex,
        missionId: currentMission.mission_id,
        title: currentMission.title,
        userMessage: userMessage.slice(0, 30) + '...'
      });
      
      // Get week data for context
      const weekData = getCurrentWeekData(currentWeek || 'week-1');
      
      // 🔥 Use REAL SYLLABUS data for Week 1
      const realSyllabusData = (currentWeek === 'week-1' || !currentWeek) ? week1RealData : null;
      
      // 🔥 STEP 3: Get adaptive scaffolding based on learner style
      const learnerStyle = getLearnerStyle();
      const strugglingTurns = getStrugglingTurns();
      const adaptiveScaffolding = getRecommendedScaffoldingLevel(learnerStyle, strugglingTurns);
      
      // 🔥 STEP 4: Get vocab focus prompt for weak words
      const vocabFocusPrompt = getVocabFocusPrompt();
      
      console.log(`📊 Learner Profile: ${learnerStyle} | Scaffolding: ${adaptiveScaffolding} | Struggling: ${strugglingTurns}`);
      console.log(`📚 Vocab Mastery:`, Object.keys(vocabMastery).length, 'words tracked');
      
      // 🔥 CRITICAL FIX: Prepare chat history AFTER adding user message (include it)
      // React state may not update immediately, so manually add userMsg to history
      const chatHistory = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));
      
      console.log('📬 Chat history being sent to AI:', chatHistory.length, 'messages');
      console.log('📝 Last message in history:', chatHistory[chatHistory.length - 1]);

      // 🔥 NEW: Use NovaEngine instead of direct AI call
      const aiResponse = await novaEngineRef.current.sendToNova({
        mode: 'story',
        userMessage,
        chatHistory,
        context: {
          missionId: currentMission.mission_id,
          missionIndex: currentMissionIndex,  // 🔥 CRITICAL: Pass index to select correct mission
          turnCount: turnCount + 1,
          minimumTurns: currentMission?.minimum_turns || 10,
          scaffoldingLevel: adaptiveScaffolding,
          learnerStyle,
          vocabFocusPrompt,
          realSyllabusData,
          studentName: studentName || null,  // 🔥 NEW: Pass student name to AI
          mission: currentMission,           // 🔥 Pass mission object
          turnManager: getTurnManager(currentMission.mission_id) // 🔥 CRITICAL: Pass TurnManager inside context
        }
      });

      // 🔥 DEBUG: Log full AI response
      console.log('🤖 Full AI Response Object:', aiResponse);
      console.log('🤖 Response keys:', Object.keys(aiResponse));

      // 🔥 NEW: Apply response guard BEFORE using the response
      const currentTurnCount = Math.floor(messages.length / 2) + 1;

      const guardContext = {
        studentName: studentName || null,
        turnManager: getTurnManager(currentMission.mission_id),  // 🔥 Get registered TurnManager
        mission: currentMission,  // 🔥 Pass mission object
        isOpeningTurn: false,
        turnCount: currentTurnCount,
        chatHistory: [...messages, userMsg]
      };
      
      const guardedResponse = guardResponseObject(aiResponse, guardContext, 15);
      console.log('🛡️ Response guard applied:', {
        original: aiResponse.ai_response,
        guarded: guardedResponse.ai_response,
        changed: aiResponse.ai_response !== guardedResponse.ai_response,
        hints: guardedResponse.suggested_hints
      });

      // 🔥 CRITICAL: Check turn count before allowing mission close
      const missionMinTurns = currentMission?.minimum_turns || 10;
      const tm = getTurnManager(currentMission.mission_id);
      
      let allStepsAsked = false;
      if (tm) {
        if (tm.mode === 'objective') {
          // Objective mode: Check if at goodbye objective
          const currentObj = tm.getCurrentObjective();
          allStepsAsked = currentObj?.type === 'termination' || currentObj?.id === 'goodbye';
        } else {
          // Legacy mode: Check steps
          allStepsAsked = tm.askedStepKeys.length >= tm.missionSteps.length - 1;
        }
      }
      
      console.log('🎯 Turn Count Analysis:', {
        currentTurn: currentTurnCount,
        minimumTurns: missionMinTurns,
        allStepsAsked: allStepsAsked,
        canClose: currentTurnCount >= missionMinTurns && allStepsAsked
      });
      
      // If trying to close but haven't met minimum turns, override to continue
      if (guardedResponse.mission_status === 'complete' && currentTurnCount < missionMinTurns) {
        console.warn(`⚠️ Cannot close mission: only ${currentTurnCount}/${missionMinTurns} turns completed`);
        guardedResponse.mission_status = 'continue';
        // Keep the conversation going
      }

      // Extract text from guarded response object (support multiple formats)
      // 🔥 Support Artifact v5.0 format: {ack, recast, bridge, question, hints}
      let responseText = '';
      
      if (guardedResponse.format === 'artifact-v5') {
        // NEW: Artifact v5.0 format
        // Combine: ack + recast + bridge + question
        const parts = [];
        if (guardedResponse.ack) parts.push(guardedResponse.ack);
        if (guardedResponse.recast) parts.push(guardedResponse.recast);
        if (guardedResponse.bridge) parts.push(guardedResponse.bridge);
        if (guardedResponse.question) parts.push(guardedResponse.question);
        responseText = parts.join(' ');
        
        console.log('🎯 Artifact v5.0 Response:', {
          ack: guardedResponse.ack,
          recast: guardedResponse.recast,
          bridge: guardedResponse.bridge,
          question: guardedResponse.question,
          combined: responseText
        });
      } else {
        // OLD: Legacy format
        responseText = guardedResponse.ai_response || guardedResponse.response || guardedResponse;
      }
      
      // 🔥 CRITICAL: Set hints from guarded response (ONE BRAIN - hints come from same LLM call)
      const hintsToUse = guardedResponse.hints || guardedResponse.suggested_hints || [];
      if (hintsToUse.length > 0) {
        const scrambledHints = [...hintsToUse].sort(() => Math.random() - 0.5);
        setHints(scrambledHints);
        setShowHints(true);
        console.log('💡 Canonical hints:', scrambledHints);
      }
      
      // 🔥 DEBUG: Check for truncation
      console.log('📝 Extracted Response Text:', responseText);
      console.log('📏 Response length:', responseText?.length || 0);
      console.log('🔚 Response ends with question?', responseText?.includes('?'));
      
      // 🔥 Validate response is complete
      if (!responseText || responseText.length < 10) {
        console.error('❌ Response too short or empty:', responseText);
        throw new Error('AI response too short: ' + responseText);
      }
      
      // 🔥 STEP 4: Track AI suggestions (after receiving response)
      trackVocabUsage(userMessage, { text: responseText, hints: [] });

      // Add AI response to chat
      const aiMsg = {
        role: 'assistant',
        content: responseText,
        timestamp: Date.now()
      };
      addMessage('story', aiMsg);

      // Track current question for scrambled hints
      if (responseText.includes('?')) {
        const questions = responseText.split('?');
        const lastQuestion = questions[questions.length - 2]?.trim();
        if (lastQuestion) {
          setCurrentQuestion(lastQuestion + '?');
        }
      }

      // Auto-play TTS if enabled
      if (autoPlayEnabled) {
        await textToSpeech(responseText, {
          voice: 'nova', // Default voice
          autoPlay: true
        });
      }

      // 🔥 Check if this is a closing turn (only if objective type is "termination")
      // ❌ DON'T hide hints just because no question - could be AI error/fallback
      const hasQuestion = responseText.includes('?');
      
      // Get current objective from TurnManager
      const turnManager = getTurnManager(currentMission.mission_id);
      const currentObjective = turnManager?.getCurrentObjective();
      const isTerminationObjective = currentObjective?.type === 'termination';
      
      if (hasQuestion) {
        setShowHints(true);
      } else if (isTerminationObjective) {
        // Only hide hints if this is the final goodbye objective
        setShowHints(false);
        console.log('🎯 Termination objective - hiding hints');
      } else {
        // ⚠️ No question but not termination - keep showing hints (AI may recover)
        setShowHints(true);
        console.log('⚠️ No question in response but not closing turn - keeping hints visible');
      }

      // 🔥 Check for mission completion
      const minimumTurns = currentMission?.minimum_turns || 10;
      const maximumTurns = currentMission?.maximum_turns || 15;
      const isClosingTurn = !hasQuestion && isTerminationObjective; // Only close if termination objective
      const isAtMinimumTurns = currentTurnCount >= minimumTurns;
      const isPastMaximum = currentTurnCount >= maximumTurns;
      
      console.log(`🎯 Turn ${currentTurnCount}/${minimumTurns} (max ${maximumTurns}) Analysis:`, {
        hasQuestion: responseText.includes('?'),
        isClosingTurn,
        isTerminationObjective,
        currentObjectiveId: currentObjective?.id,
        isAtMinimumTurns,
        isPastMaximum,
        responsePreview: responseText.slice(0, 80)
      });
      
      // Complete mission if:
      // 1. AI gives closing statement (no question) AND reached termination objective, OR
      // 2. Exceeded maximum turns (force close)
      if ((isClosingTurn && isAtMinimumTurns) || isPastMaximum) {
        // Closing statement detected - mission complete
        setMissionStatus('completed');
        setShowHints(false);
        console.log(`✅ Mission completed at turn ${turnCount} (closing: ${isClosingTurn}, max: ${isPastMaximum})`);
        
        // 🔥 Save mission completion to Universal Progress System
        const completedMissions = savedData.completedMissions || [];
        if (!completedMissions.includes(currentMission.mission_id)) {
          completedMissions.push(currentMission.mission_id);
        }
        
        // Calculate score based on turn efficiency (fewer turns = higher score)
        const efficiencyScore = Math.min(100, Math.round((minimumTurns / turnCount) * 100));
        
        saveProgress({
          turnCount,
          currentMissionIndex,
          completedMissions,
          lastCompletedAt: new Date().toISOString(),
          studentName: studentName
        }, completedMissions.length === week1RealData.story_missions?.length, efficiencyScore);
        
        // Mark as complete if all missions done
        if (completedMissions.length === week1RealData.story_missions?.length) {
          markComplete(100);
        }
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('🎯 Starting Mission', mission.mission_id, 'at index', index);
                    console.log('📋 Mission Details:', {
                      title: mission.title,
                      target_vocab: mission.target_vocab,
                      minimum_turns: mission.minimum_turns,
                      greeting: mission.nova_greeting
                    });
                    
                    // 🔥 CRITICAL: Prevent double initialization
                    if (initializingRef.current) {
                      console.log('⚠️ Mission already initializing, ignoring click');
                      return;
                    }
                    
                    // 🔥 CRITICAL: Complete state reset
                    const tutorStore = useTutorStore.getState();
                    tutorStore.clearMessages('story');
                    console.log('🗑️ Cleared messages, current count:', tutorStore.messages.story.length);
                    tutorStore.clearCache();
                    
                    // 🔥 NEW: Reset Turn Manager for this mission
                    const missionId = week1RealData.story_missions?.[index]?.mission_id || index + 1;
                    resetTurnManager(missionId);
                    clearFollowUpTracking(missionId);
                    console.log('🔄 Turn Manager reset for mission', missionId);
                    
                    // Reset all local state
                    setTurnCount(0);
                    setMissionStatus('not_started');
                    setShowHints(false);
                    setHints([]);
                    setCurrentQuestion('');
                    setSilentTurns(0);
                    setInitialized(false);
                    setStudentName(null); // 🔥 NEW: Reset student name
                    initializingRef.current = false;
                    
                    // Set mission and view immediately
                    setCurrentMissionIndex(index);
                    setViewMode('mission');
                    
                    // 🔥 CRITICAL FIX: Pass index directly + verify messages cleared
                    initializingRef.current = true;
                    setTimeout(() => {
                      const freshStore = useTutorStore.getState();
                      console.log('✅ Before init - Story messages:', freshStore.messages.story.length);
                      
                      initializeMission(index).catch(err => {
                        console.error('❌ Mission start error:', err);
                      }).finally(() => {
                        setInitialized(true);
                        initializingRef.current = false;
                      });
                    }, 200); // Longer delay for state sync
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
                        {mission.nova_greeting}
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
                  <p className="text-xs text-gray-500">
                    {currentMission ? `${currentMission.title} - ${currentMission.theme}` : 'Loading...'}
                  </p>
                </div>
              </div>

              {/* Mission Progress */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    useTutorStore.getState().clearMessages('story');
                    
                    // 🔥 NEW: Reset Turn Manager
                    const missionId = currentMission?.mission_id || currentMissionIndex + 1;
                    resetTurnManager(missionId);
                    clearFollowUpTracking(missionId);
                    console.log('🔄 Turn Manager reset for mission', missionId);
                    
                    setInitialized(false);
                    setTurnCount(0);
                    setMissionStatus('not_started');
                    setStudentName(null); // 🔥 NEW: Reset student name
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
                    Turn {turnCount}/{currentMission?.minimum_turns || 10}
                  </span>
                  
                  {/* 🔥 NEW: 15-turn warning for objective mode */}
                  {(() => {
                    const tm = getTurnManager(currentMission?.mission_id);
                    if (tm?.mode === 'objective' && tm.turnCount >= 12 && tm.turnCount < 15) {
                      return (
                        <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full animate-pulse">
                          ⏰ Wrapping up soon
                        </span>
                      );
                    }
                    return null;
                  })()}
                </div>
                
                {/* 🔥 NEW: Objective progress indicator */}
                {(() => {
                  const tm = getTurnManager(currentMission?.mission_id);
                  if (tm?.mode === 'objective') {
                    const progress = `${tm.completedObjectives.length}/${tm.objectives.length}`;
                    return (
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 size={16} className="text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">
                          {progress} objectives
                        </span>
                      </div>
                    );
                  }
                  return null;
                })()}
                
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

          {/* AI-Generated Hints Only */}
          {showHints && hints.length > 0 && (
            <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-200">
              <div className="flex items-center space-x-2 mb-3">
                <Target size={16} className="text-yellow-600" />
                <span className="text-base font-medium text-yellow-700">💡 Need help? Try these words:</span>
              </div>
              <div className="flex flex-wrap gap-3"> {/* More gap between buttons */}
                {hints.map((hint, index) => (
                  <button
                    key={index}
                    onClick={() => handleHintClick(hint)}
                    className="px-5 py-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg text-lg font-semibold transition-colors border border-yellow-300 hover:border-yellow-400"> {/* Bigger buttons and text */}
                    {hint}
                  </button>
                ))}
              </div>
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
