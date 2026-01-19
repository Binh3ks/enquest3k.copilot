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
import week1RealData from '../../../data/weeks/week_01_real'; // Week 1 syllabus
import week2RealData from '../../../data/weeks/week_02_real?v=3'; // Week 2 syllabus - CACHE BUST (mission_context added)
import week3RealData from '../../../data/weeks/week_03_real'; // Week 3 syllabus
import week4RealData from '../../../data/weeks/week_04_real'; // Week 4 syllabus
import { getAdaptivePromptAdjustment, getRecommendedScaffoldingLevel } from '../../../services/ai_tutor/learnerProfiler'; // 🔥 NEW
import { useLocation } from 'react-router-dom'; // 🔥 Get weekId from URL pathname

// 🔥 DEBUG: Verify imports loaded correctly
console.log('📦 IMPORTS CHECK:', {
  week1Title: week1RealData?.title || week1RealData?.week_title_en,
  week1Missions: week1RealData?.story_missions?.length,
  week2Title: week2RealData?.title,
  week2Missions: week2RealData?.story_missions?.length,
  week3Title: week3RealData?.title,
  week3Missions: week3RealData?.story_missions?.length,
  week4Title: week4RealData?.title,
  week4Missions: week4RealData?.story_missions?.length
});

// Week 1 Objectives
import { week1Objectives } from '../../../data/syllabus/week1_objectives'; // Week 1 Mission 1
import { mission2Objectives } from '../../../data/syllabus/week1_mission2_objectives'; // Week 1 Mission 2
import { mission3Objectives } from '../../../data/syllabus/week1_mission3_objectives'; // Week 1 Mission 3

// Week 2 Objectives - DISABLED: Using mission_context mode like Week 1 Mission 1
// import { week2Mission1Objectives } from '../../../data/syllabus/week2_mission1_objectives'; // Week 2 Mission 1
// import { week2Mission2Objectives } from '../../../data/syllabus/week2_mission2_objectives'; // Week 2 Mission 2
// import { week2Mission3Objectives } from '../../../data/syllabus/week2_mission3_objectives'; // Week 2 Mission 3

import { useStationProgress } from '../../../hooks/useStationProgress'; // 🔥 Universal Progress System

/**
 * Story Mission Tab - Guided story-based learning
 * REDESIGNED: Large UI, Navigation, Mission Menu
 */
const StoryMissionTab = () => {
  const { user } = useUserStore();
  const location = useLocation(); // 🔥 Get location from react-router
  // 🔥 Parse weekId from pathname: /week/2/read_explore -> 2
  const weekNumber = parseInt(location.pathname.match(/\/week\/(\d+)/)?.[1] || '1');
  const currentWeek = `week-${weekNumber}`; // 🔥 Construct currentWeek
  
  // 🔥 DEBUG: Check what week we're actually on
  console.log('🔍 StoryMissionTab Mounted - Week from URL:', {
    currentWeek,
    pathname: window.location.pathname,
    userName: user?.name
  });
  
  // 🔥 Universal Progress System Integration
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
  // 🔥 FIX: Always start from mission 0 to avoid showing cached missions from other weeks
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
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
  
  // 🔥 Dynamic week data selection based on current week
  const weekRealData = weekNumber === 1 ? week1RealData : weekNumber === 2 ? week2RealData : weekNumber === 3 ? week3RealData : week4RealData;
  const currentMission = weekRealData.story_missions?.[currentMissionIndex];
  
  // 🔥 DEBUG: Log week data on mount
  console.log('🎯 StoryMissionTab - Week Data Check:', {
    weekNumber,
    currentWeek,
    hasWeekData: !!weekRealData,
    weekTitle: weekRealData?.title,
    missionCount: weekRealData?.story_missions?.length,
    missions: weekRealData?.story_missions?.map(m => m.title)
  });
  
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const initializingRef = useRef(false);
  
  // 🔥 NEW: Initialize NovaEngine instance
  const novaEngineRef = useRef(null);
  
  // Initialize NovaEngine when component mounts or week changes
  useEffect(() => {
    const initNovaEngine = async () => {
      const weekData = await getCurrentWeekData(currentWeek || 'week-1');
      const userProfile = {
        name: user?.name || 'Student',
        age: user?.age || 8
      };
      
      novaEngineRef.current = new NovaEngine(weekData, userProfile);
      console.log('🧠 NovaEngine initialized for StoryMissionTab');
    };
    
    initNovaEngine();
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
      
      // 🔥 STEP 4: Initialize vocab mastery with current week's target vocabulary
      const weekVocab = weekRealData.global_vocab || [];
      // Extract just the word strings from vocab objects
      const vocabWords = weekVocab.map(v => typeof v === 'string' ? v : v.word);
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
    const currentMission = weekRealData.story_missions?.[missionIndex];
    if (!currentMission) {
      console.error('❌ Mission not found for index:', missionIndex);
      return;
    }
    
    console.log('📋 Initializing Mission:', {
      index: missionIndex,
      id: currentMission.mission_id,
      title: currentMission.title,
      target_vocab: currentMission.target_vocab || currentMission.vocabulary_focus,
      minimum_turns: currentMission.minimum_turns || 15
    });
    
    console.log('📊 Chat history length before init:', messages.length);
    console.log('🎯 Mission details:', {
      missionId: currentMission.mission_id,
      title: currentMission.title,
      target_vocab: currentMission.target_vocab || currentMission.vocabulary_focus
    });
    
    // 🔥 ONE BRAIN: Create TurnManager ONCE (the ONLY creation point)
    console.log('🏗️ Creating TurnManager for Mission', currentMission.mission_id);
    
    // 🔥 NEW: Get objectives for Mission (objective-driven mode)
    // 🎯 Load objectives based on BOTH week AND mission_id
    let objectives = null;
    let missionVocabulary = null;
    
    // Determine week from currentWeek ('week-1', 'week-2', etc.)
    const weekNum = parseInt(currentWeek.split('-')[1]);
    
    if (weekNum === 1) {
      // Week 1 - Using mission_context mode (same as Week 2)
      // DISABLED objectives: Together AI doesn't follow objective-driven prompts reliably
      // Instead, use mission_context field in week_01_real.js which works perfectly
      objectives = null; // No objectives → Uses mission_context from week_01_real.js
      missionVocabulary = null; // Will use vocabulary from mission data directly
      
      // 🔥 OLD CODE (DISABLED - AI doesn't follow objectives):
      // if (currentMission.mission_id === 1) {
      //   objectives = week1Objectives.objectives;
      //   missionVocabulary = week1Objectives.constraints.vocabulary;
      // } else if (currentMission.mission_id === 2) {
      //   objectives = mission2Objectives.objectives;
      //   missionVocabulary = mission2Objectives.constraints.vocabulary;
      // } else if (currentMission.mission_id === 3) {
      //   objectives = mission3Objectives.objectives;
      //   missionVocabulary = mission3Objectives.constraints.vocabulary;
      // }
    } else if (weekNum === 2) {
      // Week 2 - Using mission_context mode (no objectives)
      // Week 2 missions use mission_context field in week_02_real.js (same as Week 1 Mission 1)
      objectives = null; // No objectives → Uses mission_context from week_02_real.js
      missionVocabulary = null; // Will use vocabulary from mission data directly
    } else if (weekNum >= 3) {
      // Week 3+ - Use objectives from week_XX_real.js
      // These weeks have full objectives array in their story_missions
      objectives = currentMission.objectives || null;
      missionVocabulary = null; // Will use vocabulary from mission data directly
    }
    
    console.log('🎯 Objectives for Week', weekNum, 'Mission', currentMission.mission_id, ':', objectives ? 'LOADED (Objective-driven)' : 'LEGACY (Step-based)');
    
    // Inject vocabulary into mission data for prompt builder
    if (missionVocabulary) {
      currentMission.vocabulary = missionVocabulary;
    }
    
    // 🔥 Create TurnManager with objectives (if available) AND missionData for minimum_turns
    const turnManager = new TurnManager(
      currentMission.mission_id, 
      currentMission.title, 
      objectives, 
      currentMission // Pass full mission data for minimum_turns, maximum_turns
    );
    registerTurnManager(turnManager); // Register in singleton registry
    
    try {
      // 🔥 Pass TurnManager to novaEngine via context
      const opening = await novaEngineRef.current.sendToNova({
        mode: 'story',
        userMessage: '', // Empty for opening turn
        chatHistory: [],
        context: {
          missionData: currentMission, // 🔥 V27 format detection
          missionId: currentMission.mission_id,
          missionIndex: missionIndex,
          turnCount: 1,
          minimumTurns: currentMission?.minimum_turns || 10,
          realSyllabusData: weekRealData,
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
      
      // 🔥 HARDCODE OPENING: Week 4 has objectives, Weeks 1-3 have complete greetings
      let openingLine;
      let firstObjectiveHints;
      
      if (objectives && objectives.length > 0) {
        // Week 4 style: Use question_variants if available
        const missionGreeting = currentMission.nova_greeting || 'Hi! I\'m Ms. Nova!';
        
        // 🔥 NEW: Get variant from TurnManager
        const variant = turnManager.getQuestionVariant();
        if (variant) {
          openingLine = `${missionGreeting} ${variant.question}`;
          firstObjectiveHints = variant.hints || ['My', 'name', 'is', 'I', 'am'];
          console.log('🎲 Week 4 opening with variant:', variant.question);
        } else {
          // Fallback to canonical
          const firstObjective = objectives[0];
          const firstQuestion = firstObjective.canonical_question || 'How are you?';
          openingLine = `${missionGreeting} ${firstQuestion}`;
          firstObjectiveHints = firstObjective.hints || guardedOpening.suggested_hints || ['My', 'name', 'is', 'I', 'am'];
          console.log('🎯 Week 4 style opening (greeting + canonical question):', openingLine);
        }
      } else {
        // Weeks 1-3 style: Use complete nova_greeting as-is
        openingLine = currentMission.nova_greeting || 'Hello! I am Ms. Nova, your English teacher. What is your name?';
        firstObjectiveHints = currentMission.default_hints || guardedOpening.suggested_hints || ['My', 'name', 'is', 'I', 'am'];
        console.log('🎯 Weeks 1-3 style opening (complete greeting):', openingLine);
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
      
      // 🔥 CRITICAL: Set hints from FIRST OBJECTIVE (not AI response)
      const scrambledHints = [...firstObjectiveHints].sort(() => Math.random() - 0.5);
      setHints(scrambledHints);
      setShowHints(true);
      console.log('💡 Opening hints set:', scrambledHints);
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
      const currentMission = weekRealData.story_missions?.[currentMissionIndex];
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
      const weekData = await getCurrentWeekData(currentWeek || 'week-1');
      
      // 🔥 Use REAL SYLLABUS data for current week
      const realSyllabusData = weekRealData;
      
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
      
      // 🔥 NEW: Log full conversation for debugging
      console.log('\n📜 === FULL CONVERSATION HISTORY ===');
      chatHistory.forEach((msg, idx) => {
        const speaker = msg.role === 'assistant' ? '🤖 Ms. Nova' : '👤 Student';
        console.log(`${idx + 1}. ${speaker}: "${msg.content}"`);
      });
      console.log('📜 === END CONVERSATION HISTORY ===\n');

      // 🔥 Get TurnManager for context (but don't process turn yet - let AI handle it)
      const tm = getTurnManager(currentMission.mission_id);

      // 🔥 NEW: Use NovaEngine instead of direct AI call
      const aiResponse = await novaEngineRef.current.sendToNova({
        mode: 'story',
        userMessage,
        chatHistory,
        context: {
          missionData: currentMission, // 🔥 V27 format detection
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
          turnManager: tm // 🔥 CRITICAL: Pass TurnManager inside context (use updated tm)
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
      // Reuse 'tm' variable from line 477 (already declared above)
      
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
      
      console.log('🎤 === NOVA SPEECH ANALYSIS ===');
      console.log('📦 Raw AI Response Object:', guardedResponse);
      console.log('📊 Response format:', guardedResponse.format || 'legacy');
      
      if (guardedResponse.format === 'artifact-v5') {
        // NEW: Artifact v5.0 format
        // Combine: ack + recast + bridge + question
        const parts = [];
        if (guardedResponse.ack) parts.push(guardedResponse.ack);
        if (guardedResponse.recast) {
          // 🔥 ENFORCE PUNCTUATION: recast must end with ! or .
          let recast = guardedResponse.recast.trim();
          if (!recast.match(/[.!?]$/)) {
            recast += '!';
            console.log('✅ Added punctuation to recast:', recast);
          }
          parts.push(recast);
        }
        if (guardedResponse.bridge) parts.push(guardedResponse.bridge);
        if (guardedResponse.question) parts.push(guardedResponse.question);
        responseText = parts.join(' ');
        
        console.log('🎯 Artifact v5.0 Response Components:');
        console.log('  ACK:', guardedResponse.ack || '(none)');
        console.log('  RECAST:', guardedResponse.recast || '(none)');
        console.log('  BRIDGE:', guardedResponse.bridge || '(none)');
        console.log('  QUESTION:', guardedResponse.question || '(none)');
        console.log('  COMBINED:', responseText);
      } else {
        // OLD: Legacy format
        responseText = guardedResponse.ai_response || guardedResponse.response || guardedResponse;
        console.log('📜 Legacy format - Full text:', responseText);
      }
      console.log('🎤 === END SPEECH ANALYSIS ===\n');
      
      // 🔥 CRITICAL: Set hints based on mission structure
      // Reuse 'tm' variable from above (already declared at line ~501)
      const currentObjective = tm?.getCurrentObjective();
      
      let objectiveHints;
      if (currentObjective && (currentObjective.hints || currentObjective.defaultHints || currentObjective.question_variants)) {
        // Week 4 style: Has objectives
        // 🔥 NEW: Try to get variant hints first (for question_variants structure)
        const variant = tm.getQuestionVariant();
        if (variant && variant.hints) {
          objectiveHints = variant.hints;
          console.log('💡 Using variant hints:', objectiveHints);
        } else {
          // Fallback to objective hints
          objectiveHints = currentObjective.hints || currentObjective.defaultHints;
          console.log('💡 Using objective hints:', objectiveHints);
        }
      } else {
        // Week 1, 3 style: No objectives, use AI-generated hints from response
        objectiveHints = guardedResponse.suggested_hints || guardedResponse.hints || ['I', 'am', 'my', 'is'];
        console.log('💡 Using AI-generated hints:', objectiveHints);
      }
      
      // 🔥 VALIDATION: Ensure AI uses EXACT question (variant or canonical)
      // Priority: goodbye_message > question_variants > canonical_question > AI-generated
      let targetQuestion = null;
      
      // 🔥 SPECIAL: Check for goodbye/termination objective first
      if (currentObjective && (currentObjective.type === 'termination' || currentObjective.stepKey === 'goodbye' || currentObjective.id === 'goodbye')) {
        const goodbyeMessage = currentObjective.goodbye_en || currentObjective.goodbye || 
                              "Great job! You did amazing! Keep practicing English. Goodbye!";
        responseText = goodbyeMessage;
        console.log('👋 Using goodbye message:', goodbyeMessage);
      } else {
        // Check for question_variants first (Week 4 Mission 3 style)
        const variant = tm?.getQuestionVariant();
        if (variant && variant.question) {
          targetQuestion = variant.question;
          console.log('🎲 Using variant question:', targetQuestion);
        } else if (currentObjective?.canonical_question) {
          targetQuestion = currentObjective.canonical_question;
          console.log('🎯 Using canonical question:', targetQuestion);
        }
        
        if (targetQuestion && responseText) {
          // 🔥 CRITICAL: Check multiple questions FIRST (before checking if target is included)
          const questionCount = (responseText.match(/\?/g) || []).length;
          
          if (questionCount > 1) {
            console.warn('⚠️ Multiple questions detected! Keeping only target:', targetQuestion);
            // Find which question mark corresponds to our target question
            const questions = responseText.split('?').map(q => q.trim() + '?');
            const targetIndex = questions.findIndex(q => q.includes(targetQuestion.replace('?', '')));
            
            // Extract ack + recast (everything before all questions)
            const allQuestionsStart = responseText.indexOf('?');
            const beforeAllQuestions = responseText.substring(0, allQuestionsStart).split('?')[0];
            const sentences = beforeAllQuestions.split(/[.!]\s+/).filter(p => p.trim());
            
            let ackRecast = '';
            if (guardedResponse.ack && guardedResponse.recast) {
              let recast = guardedResponse.recast.trim();
              if (!recast.match(/[.!]$/)) recast += '.';
              ackRecast = `${guardedResponse.ack} ${recast}`;
            } else if (sentences.length >= 2) {
              ackRecast = sentences[0] + '! ' + sentences[1] + '.';
            } else if (sentences.length === 1) {
              ackRecast = sentences[0] + '.';
            }
            
            responseText = ackRecast ? `${ackRecast} ${targetQuestion}` : targetQuestion;
            console.log('✅ Cleaned to single question:', responseText);
          } else if (!responseText.includes(targetQuestion)) {
            console.warn('⚠️ AI improvised question! Overriding with target:', targetQuestion);
            // Extract ack + recast from AI response (everything before the first question mark)
            const beforeQuestion = responseText.split('?')[0];
            const sentences = beforeQuestion.split(/[.!]\s+/).filter(p => p.trim());
            
            // Use artifact v5 format: ACK + RECAST
            let ackRecast = '';
            if (guardedResponse.ack && guardedResponse.recast) {
              // Ensure recast ends with punctuation
              let recast = guardedResponse.recast.trim();
              if (!recast.match(/[.!]$/)) recast += '.';
              ackRecast = `${guardedResponse.ack} ${recast}`;
            } else if (sentences.length >= 2) {
              // Fallback: first 2 sentences with proper punctuation
              ackRecast = sentences[0] + '! ' + sentences[1] + '.';
            } else if (sentences.length === 1) {
              ackRecast = sentences[0] + '.';
            }
            
            responseText = ackRecast ? `${ackRecast} ${targetQuestion}` : targetQuestion;
            console.log('✅ Fixed response:', responseText);
          } else {
            // Single question and correct, check punctuation in recast
            const parts = responseText.split('?')[0].split(/([.!])\s+/);
            if (parts.length >= 3) {
              // Has ACK + RECAST, ensure punctuation
              const fixed = responseText.replace(/([a-zA-Z])\s+([A-Z])/g, '$1. $2');
              if (fixed !== responseText) {
                responseText = fixed;
                console.log('✅ Added missing punctuation:', responseText);
              }
            }
          }
        }
      }
      
      const scrambledHints = [...objectiveHints].sort(() => Math.random() - 0.5);
      setHints(scrambledHints);
      setShowHints(true);
      console.log('💡 Hints from OBJECTIVE:', currentObjective?.stepKey, '|', scrambledHints);
      
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

      // 🗣️ LOG AI SPEECH
      console.log('\n💬 === AI SPEECH ===');
      console.log('🤖 Nova says:', responseText);
      console.log('💬 === END SPEECH ===\n');
      
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
      
      // Reuse currentObjective from above (already declared)
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
        }, completedMissions.length === weekRealData.story_missions?.length, efficiencyScore);
        
        // Mark as complete if all missions done
        if (completedMissions.length === weekRealData.story_missions?.length) {
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
              {weekRealData.story_missions?.map((mission, index) => (
                <div
                  key={mission.mission_id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('🎯 Starting Mission', mission.mission_id, 'at index', index);
                    console.log('📋 Mission Details:', {
                      title: mission.title,
                      target_vocab: mission.target_vocab || mission.vocabulary_focus,
                      minimum_turns: mission.minimum_turns || 15,
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
                    const missionId = weekRealData.story_missions?.[index]?.mission_id || index + 1;
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
                          <span>{mission.minimum_turns || 15} turns</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                          <BookOpen size={12} />
                          <span>{(mission.target_vocab || mission.vocabulary_focus || []).length} words</span>
                        </div>
                        <div className="flex-1"></div>
                        <div className="text-purple-500 font-medium">
                          Start Mission →
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {(mission.target_vocab || mission.vocabulary_focus || []).slice(0, 4).map((word, i) => (
                          <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {word}
                          </span>
                        ))}  
                        {(mission.target_vocab || mission.vocabulary_focus || []).length > 4 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            +{(mission.target_vocab || mission.vocabulary_focus || []).length - 4} more
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
          <div className="bg-white border-b border-purple-200 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('menu')}
                  className="w-8 h-8 bg-purple-100 hover:bg-purple-200 rounded-full flex items-center justify-center transition-colors"
                  title="Back to menu"
                >
                  <span className="text-purple-600 text-sm">←</span>
                </button>
                <div>
                  <h2 className="text-sm font-bold text-gray-800">Story Mission {currentMissionIndex + 1}</h2>
                  <p className="text-xs text-gray-500">
                    {currentMission ? `${currentMission.title} - ${currentMission.theme}` : 'Loading...'}
                  </p>
                </div>
              </div>

              {/* Mission Progress */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    useTutorStore.getState().clearMessages('story');
                    
                    // 🔥 NEW: Reset Turn Manager
                    const missionId = currentMission?.mission_id || currentMissionIndex + 1;
                    resetTurnManager(missionId);
                    clearFollowUpTracking(missionId);
                    
                    // 🔥 NEW: Increment attempt for variant selection
                    try {
                      const key = `mission_${missionId}_attempt`;
                      const current = parseInt(localStorage.getItem(key) || '0');
                      localStorage.setItem(key, String(current + 1));
                      console.log(`🔄 Mission ${missionId} attempt incremented to ${current + 1}`);
                    } catch (error) {
                      console.warn('Could not increment attempt:', error);
                    }
                    
                    console.log('🔄 Turn Manager reset for mission', missionId);
                    
                    setInitialized(false);
                    setTurnCount(0);
                    setMissionStatus('not_started');
                    setStudentName(null); // 🔥 NEW: Reset student name
                    
                    // 🔥 Re-initialize mission with new variant
                    console.log('🔄 Re-initializing mission with new variant...');
                    initializeMission(currentMissionIndex).catch(err => {
                      console.error('❌ Re-init error:', err);
                    });
                  }}
                  className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors text-xs"
                  title="Clear chat and restart"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
                
                <div className="flex items-center space-x-1.5">
                  <Target size={14} className="text-purple-600" />
                  <span className="text-xs font-medium text-gray-700">
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
            <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
              <div className="flex items-center space-x-1 mb-2">
                <Target size={14} className="text-yellow-600" />
                <span className="text-xs font-medium text-yellow-700">💡 Need help? Try these words:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {hints.map((hint, index) => (
                  <button
                    key={index}
                    onClick={() => handleHintClick(hint)}
                    className="px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg text-xs font-semibold transition-colors border border-yellow-300 hover:border-yellow-400">
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
