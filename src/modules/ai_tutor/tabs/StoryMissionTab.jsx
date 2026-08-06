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
import week5RealData from '../../../data/weeks/week_05_real'; // Week 5 syllabus
import week6RealData from '../../../data/weeks/week_06_real'; // Week 6 syllabus
import week7RealData from '../../../data/weeks/week_07_real'; // Week 7 syllabus
import week8RealData from '../../../data/weeks/week_08_real'; // Week 8 syllabus
import week9RealData from '../../../data/weeks/week_09_real'; // Week 9 syllabus - City Sounds & Sights
import week10RealData from '../../../data/weeks/week_10_real'; // Week 10 syllabus - The Farm Adventure
import week11RealData from '../../../data/weeks/week_11_real'; // Week 11 syllabus - Weekend Fun Spots
import week12RealData from '../../../data/weeks/week_12_real'; // Week 12 syllabus - The Talent Show
import week13RealData from '../../../data/weeks/week_13_real'; // Week 13 syllabus - Daily Routines
import week14RealData from '../../../data/weeks/week_14_real'; // Week 14 syllabus - Welcome to My World
import week15RealData from '../../../data/weeks/week_15_real'; // Week 15 syllabus - The Busy Park
import week16RealData from '../../../data/weeks/week_16_real'; // Week 16 syllabus - Sports Commentary
import week17RealData from '../../../data/weeks/week_17_real'; // Week 17 syllabus - Weather & Clothes
import week18RealData from '../../../data/weeks/week_18_real'; // Week 18 syllabus - The Live Reporter
import week19RealData from '../../../data/weeks/week_19_real'; // Week 19 syllabus - When I Was Small
import week20RealData from '../../../data/weeks/week_20_real'; // Week 20 syllabus - The Old Town Mystery
import week21RealData from '../../../data/weeks/week_21_real'; // Week 21 syllabus - Yesterday's Diary
import week22RealData from '../../../data/weeks/week_22_real'; // Week 22 syllabus - The Time Detective
import week23RealData from '../../../data/weeks/week_23_real'; // Week 23 syllabus - The Art Class
import week24RealData from '../../../data/weeks/week_24_real'; // Week 24 syllabus - Feelings in the Past
import week25RealData from '../../../data/weeks/week_25_real'; // Week 25 syllabus - The Sequence Challenge
import week26RealData from '../../../data/weeks/week_26_real'; // Week 26 syllabus - My Weekend Comic Strip
import week27RealData from '../../../data/weeks/week_27/week_27_real'; // Week 27 syllabus - Maya's Growing Plant
import week28RealData from '../../../data/weeks/week_28_real'; // Week 28 syllabus - The Tortoise and the Hare
import week29RealData from '../../../data/weeks/week_29/week_29_real'; // Week 29 syllabus - Off We Go! Irregular Verbs 1
import week30RealData from '../../../data/weeks/week_30/week_30_real'; // Week 30 syllabus - The Perfect Picnic Irregular Verbs 2
import week31RealData from '../../../data/weeks/week_31/week_31_real'; // Week 31 syllabus - The Senses Irregular Verbs 3
import week32RealData from '../../../data/weeks/week_32/week_32_real'; // Week 32 syllabus
import week33RealData from '../../../data/weeks/week_33/week_33_real'; // Week 33 syllabus - The Mistake Irregular Verbs 5 - The Busy Day Irregular Verbs 4
import week34RealData from '../../../data/weeks/week_34/week_34_real'; // Week 34 syllabus - Storytelling Fable
import week35RealData from '../../../data/weeks/week_35/week_35_real'; // Week 35 syllabus - Environmental Issues
import week36RealData from '../../../data/weeks/week_36_real?v=10'; // Week 36 syllabus - Adventure Stories (CACHE BUST)
import { getAdaptivePromptAdjustment, getRecommendedScaffoldingLevel } from '../../../services/ai_tutor/learnerProfiler'; // 🔥 NEW
import { useLocation } from 'react-router-dom'; // 🔥 Get weekId from URL pathname
import TTSSettingsPanel from '../components/TTSSettingsPanel';
import { checkGrammarGuard } from '../../../pages/GameHub/hooks/useGameValidation'; // 🔥 Grammar guard

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
    userName: user?.display_name || user?.name || user?.username
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
  // 💡 Hint fade: W1-16 hints auto-show, W17+ hints hidden (set by App.jsx → setHintsForWeek)
  const storeHintsEnabled = useTutorStore(state => state.showHints);

  // 💡 Extract "Say: A or B or C" → sentence-level hint chips
  const extractSayOptions = (text) => {
    const match = text?.match(/ Say:\s*(.+?)$/is);
    if (!match) return [];
    const raw = match[1].split(/\s+or\s+/i).map(s => s.trim()).filter(Boolean);
    // Filter out fill-blank templates — students should read the Say: instruction in the chat,
    // not click a chip with "___" in it. Complete sentences only become chips.
    return raw.filter(s => !s.includes('___'));
  };
  // 💡 Strip "Say: ..." from chat display (W17+); TTS keeps raw text
  const stripSayScaffold = (text) => text?.replace(/ Say:.*$/is, '').trim() ?? text;
  // 💡 For TTS: only strip "Say: ___" fill-blank templates (sound like silence)
  const cleanAIForTTS = (text) => {
    const m = text?.match(/ Say:\s*(.+?)$/is);
    if (!m) return text;
    return m[1].includes('___') ? stripSayScaffold(text) : text;
  };

  const getMaxTurnsForMission = (mission, weekNum) => {
    if (!mission) return 8;
    const turnsInMission = mission.turns || (mission.maximum_turns < 20 ? mission.maximum_turns : null);
    if (turnsInMission) return turnsInMission;
    
    const isRetell = mission.type === 'retell' || mission.mission_id === 1 || mission.mission_id === 2;
    const w = Number(weekNum) || 1;
    if (isRetell) {
      if (w <= 5) return 6;
      if (w <= 14) return 8;
      if (w <= 28) return 10;
      if (w <= 42) return 12;
      return 14;
    } else {
      if (w <= 5) return 4;
      if (w <= 14) return 6;
      if (w <= 28) return 8;
      if (w <= 42) return 10;
      return 12;
    }
  };

  // Restore state from Universal Progress System
  // 🔥 FIX: Always start from mission 0 to avoid showing cached missions from other weeks
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  // 🔥 Sprint 5-A: Auto-start Mission 0 on first open (no prior progress this week)
  const hasNoProgress = !savedData.completedMissions || savedData.completedMissions.length === 0;
  const [viewMode, setViewMode] = useState(hasNoProgress ? 'mission' : 'menu'); // 'menu' or 'mission'
  const [hints, setHints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [missionStatus, setMissionStatus] = useState('not_started');
  const [turnCount, setTurnCount] = useState(savedData.turnCount || 0);
  const [showHints, setShowHints] = useState(false);
  const [silentTurns, setSilentTurns] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [studentName, setStudentName] = useState(savedData.studentName || user?.display_name || user?.name || user?.username || null); // Pre-seed from profile display name
  
  // 🔥 Dynamic week data selection based on current week (Fallback: Week 7 - Golden Standard)
  const weekRealData = weekNumber === 1 ? week1RealData : weekNumber === 2 ? week2RealData : weekNumber === 3 ? week3RealData : weekNumber === 4 ? week4RealData : weekNumber === 5 ? week5RealData : weekNumber === 6 ? week6RealData : weekNumber === 7 ? week7RealData : weekNumber === 8 ? week8RealData : weekNumber === 9 ? week9RealData : weekNumber === 10 ? week10RealData : weekNumber === 11 ? week11RealData : weekNumber === 12 ? week12RealData : weekNumber === 13 ? week13RealData : weekNumber === 14 ? week14RealData : weekNumber === 15 ? week15RealData : weekNumber === 16 ? week16RealData : weekNumber === 17 ? week17RealData : weekNumber === 18 ? week18RealData : weekNumber === 19 ? week19RealData : weekNumber === 20 ? week20RealData : weekNumber === 21 ? week21RealData : weekNumber === 22 ? week22RealData : weekNumber === 23 ? week23RealData : weekNumber === 24 ? week24RealData : weekNumber === 25 ? week25RealData : weekNumber === 26 ? week26RealData : weekNumber === 27 ? week27RealData : weekNumber === 28 ? week28RealData : weekNumber === 29 ? week29RealData : weekNumber === 30 ? week30RealData : weekNumber === 31 ? week31RealData : weekNumber === 32 ? week32RealData : weekNumber === 33 ? week33RealData : weekNumber === 34 ? week34RealData : weekNumber === 35 ? week35RealData : weekNumber === 36 ? week36RealData : week7RealData;
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
      const userProfile = {
        name: user?.display_name || user?.name || user?.username || 'Student',
        age: user?.age || 8
      };
      
      novaEngineRef.current = new NovaEngine(weekRealData, userProfile);
      console.log('🧠 NovaEngine initialized for StoryMissionTab with weekRealData:', weekRealData?.title);
    };
    
    initNovaEngine();
  }, [currentWeek, user, weekRealData]);

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

  // 🔥 Sprint 5-A: Auto-start Mission 0 when viewMode launches as 'mission' (no prior menu click)
  useEffect(() => {
    if (viewMode !== 'mission') return;
    const currentMessages = useTutorStore.getState().messages['story'] || [];
    if (currentMessages.length > 0) return; // already has content
    if (initializingRef.current) return;

    console.log('🚀 Sprint 5-A: Auto-starting Mission', currentMissionIndex + 1);
    const missionId = weekRealData.story_missions?.[currentMissionIndex]?.mission_id || currentMissionIndex + 1;
    resetTurnManager(missionId);
    clearFollowUpTracking(missionId);
    setTurnCount(0);
    setMissionStatus('not_started');
    setShowHints(false);
    setHints([]);
    setCurrentQuestion('');
    setSilentTurns(0);
    setStudentName(null);
    initializingRef.current = true;
    setTimeout(() => {
      initializeMission(currentMissionIndex).catch(err => {
        console.error('❌ Auto-start mission error:', err);
      }).finally(() => {
        setInitialized(true);
        initializingRef.current = false;
      });
    }, 200);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

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
    
    // 🔥 NEW: Skip TurnManager for story_arc missions (they use story_arc + Card Mode instead)
    let turnManager = null;
    if (!currentMission.story_arc) {
      // 🔥 Create TurnManager with objectives (if available) AND missionData for minimum_turns
      turnManager = new TurnManager(
        currentMission.mission_id, 
        currentMission.title, 
        objectives, 
        currentMission // Pass full mission data for minimum_turns, maximum_turns
      );
      registerTurnManager(turnManager); // Register in singleton registry
      console.log('✅ TurnManager created for objective/step-based mission');
    } else {
      console.log('⏩ Skipping TurnManager - Mission has story_character (uses story_arc)');
    }
    
    try {
      // 🔥 Pass TurnManager to novaEngine via context
      const opening = await novaEngineRef.current.sendToNova({
        mode: 'story',
        userMessage: '', // Empty for opening turn
        chatHistory: [],
        context: {
          missionData: currentMission, // 🔥 V27 format detection (for tutorPrompts options.mission)
          currentMission: currentMission, // 🔥 CRITICAL: For Priority 0 story_character check!
          missionId: currentMission.mission_id,
          missionIndex: missionIndex,
          turnCount: 1,
          minimumTurns: currentMission?.minimum_turns || 10,
          realSyllabusData: weekRealData,
          studentName: null,
          isOpeningTurn: true,
          turnManager: turnManager, // 🔥 Pass TurnManager reference
          mission: currentMission    // 🔥 Pass mission object for greeting (legacy support)
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
      if (turnManager && turnManager.mode === 'step' && turnManager.missionSteps.length > 0) {
        const firstStep = turnManager.missionSteps[0];
        turnManager.markStepAsked(firstStep.key);
        console.log('✅ Opening step marked as asked:', firstStep.key);
      } else {
        console.log('✅ Objective/Story mode: No step marking needed');
      }
      
      // 🔥 HARDCODE OPENING: Week 4 has objectives, Weeks 1-3 have complete greetings
      let openingLine;
      let firstObjectiveHints;
      
      if (objectives && objectives.length > 0) {
        // Week 4+ style: Use question_variants if available
        const missionGreeting = currentMission.nova_greeting || 'Hi! I\'m Nova!';
        
        // 🔥 NEW: Get variant from TurnManager (if available)
        const variant = turnManager?.getQuestionVariant();
        if (variant) {
          openingLine = `${missionGreeting} ${variant.question}`;
          firstObjectiveHints = variant.hints || ['My', 'name', 'is', 'I', 'am'];
          console.log('🎲 Week 4 opening with variant:', variant.question);
        } else {
          // Fallback to canonical or question_variants
          const firstObjective = objectives[0];
          const firstQuestion = firstObjective.canonical_question || 
                               (firstObjective.question_variants && firstObjective.question_variants[0]?.question) || 
                               'How are you?';
          openingLine = `${missionGreeting} ${firstQuestion}`;
          
          // 🔥 FIX: Extract hints from question_variants structure (Week 5+)
          if (firstObjective.question_variants && firstObjective.question_variants[0]?.hints) {
            firstObjectiveHints = firstObjective.question_variants[0].hints;
          } else if (firstObjective.hints) {
            firstObjectiveHints = firstObjective.hints;
          } else {
            firstObjectiveHints = ['My', 'name', 'is', 'I', 'am'];
          }
          console.log('🎯 Week 4+ opening (greeting + question):', openingLine, '| Hints:', firstObjectiveHints);
        }
      } else {
        // Weeks 1-3/5 style: PRIORITY: opening_narrative > nova_greeting
        if (currentMission.opening_narrative) {
          openingLine = currentMission.opening_narrative;
          console.log('🎯 Using opening_narrative (NEW STORY MODE):', openingLine);
        } else if (currentMission.nova_greeting) {
          openingLine = currentMission.nova_greeting;
          console.log('🎯 Using nova_greeting (LEGACY):', openingLine);
        } else {
          openingLine = 'Hello! I am Nova, your English teacher. What is your name?';
          console.log('⚠️ Using fallback greeting');
        }
        
        // 🔥 PRIORITY: Use default_hints if available (matches opening question)
        // 💡 Priority: extract from opening_narrative Say: options, else default_hints, else suggested_hints
        const openingSayHints = extractSayOptions(openingLine);
        firstObjectiveHints = openingSayHints.length > 0
          ? openingSayHints
          : (currentMission.default_hints || guardedOpening.suggested_hints || ['My', 'name', 'is', 'I', 'am']);
        console.log('💡 Opening hints:', firstObjectiveHints);
      }

      // 💡 Strip "Say: ..." from display for W17+; TTS always uses raw openingLine
      const displayOpeningLine = storeHintsEnabled ? openingLine : stripSayScaffold(openingLine);

      // Add opening message
      const welcomeMessage = {
        role: 'assistant',
        content: displayOpeningLine,
        timestamp: Date.now()
      };
      console.log('💬 Adding welcome message to chat...');
      addMessage('story', welcomeMessage);
      setMissionStatus('started');
      console.log('✅ Message added, mission status set to started');
      
      // 🔊 Play opening message with TTS (raw text for cache key; cleanAIForTTS strips ___ templates)
      try {
        await textToSpeech(cleanAIForTTS(openingLine), {
          autoPlay: true,
          mode: 'conversation',
          preferredLayer: 'auto',
          context: {
            type: 'story',
            weekNum: weekNumber,
            stationId: `mission${currentMission.mission_id || missionIndex + 1}`,
            subType: 'opening'
          }
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
      const fallbackLine = 'Hello! I am Nova, your English teacher. What is your name?';
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
      // 🔥 GRAMMAR GUARD: Check tense restrictions before processing
      const grammarCheck = checkGrammarGuard(userMessage, weekNumber);
      if (!grammarCheck.valid) {
        console.warn('⚠️ Grammar guard blocked:', grammarCheck.error);
        
        // Add error message to chat
        const errorMsg = {
          role: 'assistant',
          content: `⚠️ ${grammarCheck.error} Try using present tense!`,
          timestamp: Date.now(),
          isError: true
        };
        addMessage('story', errorMsg);
        setIsLoading(false);
        return; // Stop processing
      }
      
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
        hasStoryCharacter: !!currentMission.story_character,
        storyCharacterName: currentMission.story_character?.name || 'MISSING',
        userMessage: userMessage.slice(0, 30) + '...'
      });
      console.log('🎭 Story Character Data:', currentMission.story_character);
      
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
        const speaker = msg.role === 'assistant' ? '🤖 Nova' : '👤 Student';
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
          mission: currentMission,           // 🔥 Pass mission object (legacy)
          currentMission: currentMission,    // 🔥 CRITICAL: Pass with this field name for PRIORITY 0 check!
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
        mission: currentMission,  // 🔥 Pass mission object (legacy)
        missionData: currentMission,  // 🔥 CRITICAL: responseGuard checks missionData.story_character!
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

      // 🔥 STORY CHARACTER / STORY ARC MODE: Skip all objective logic, use AI response as-is!
      if (currentMission.story_character || currentMission.character || currentMission.story_arc) {
        console.log('🎭 Story character mode: Using AI response directly (no override)');
        
        // 🃏 CARD MODE: Use pre-computed response directly — guard may have mangled it with "Nice!"
        // aiResponse.ai_response is already clean (echo-ack built-in from novaEngine Card Mode)
        let responseText = aiResponse.ai_response || guardedResponse.ai_response || guardedResponse.combined;
        
        // 🎯 DETECT: Is this from story_arc (code-generated) or AI-generated?
        const isFromStoryArc = aiResponse.skipAI === true;
        console.log('🔍 Response source:', isFromStoryArc ? 'story_arc (static)' : 'AI (dynamic)');
        
        // 💡 Prefer sentence-level hints from "Say: A or B or C" in AI text
        const sayHints = extractSayOptions(responseText);
        const hints = sayHints.length > 0
          ? sayHints
          : (guardedResponse.hints || guardedResponse.suggested_hints || []);
        
        // 🔥 CHECK MAXIMUM TURNS (enforce week tier turn limit)
        const maxTurns = getMaxTurnsForMission(currentMission, weekNumber);
        const nextTurn = turnCount + 1;
        const isPastMax = nextTurn >= maxTurns;
        
        if (isPastMax) {
          // Reached maximum - check if response is goodbye
          const isGoodbye = responseText.toLowerCase().includes('goodbye') || 
                           responseText.toLowerCase().includes('bye') ||
                           !responseText.includes('?');
          
          if (!isGoodbye) {
            console.log(`⚠️ Turn ${nextTurn}/${maxTurns} reached but no goodbye - forcing mission end`);
            const topic = currentMission.title || currentMission.theme || 'today\'s lesson';
            responseText = `Amazing job today! You did so well with "${topic}"! I really enjoyed chatting with you! Goodbye!`;
          }
          
          console.log(`🏁 Mission ending at turn ${nextTurn}/${maxTurns}`);
          setMissionStatus('completed');
          setShowHints(false);
        }
        
        // 💡 Strip "Say: ..." from chat display for W17+; TTS uses raw responseText
        const displayResponseText = storeHintsEnabled ? responseText : stripSayScaffold(responseText);

        // Add AI message to chat
        const aiMsg = {
          role: 'assistant',
          content: displayResponseText,
          timestamp: new Date().toISOString(),
          hints: hints
        };
        addMessage('story', aiMsg);  // 🔥 FIX: Use addMessage helper, not setMessages!
        
        // TTS - Play AI response with context-aware caching
        // 🔥 When mission ends (isPastMax), ALWAYS use single TTS with goodbye responseText
        //    (never use 2-part path — aiResponse.question is the continuation, not the goodbye)
        if (responseText) {
          try {
            if (!isPastMax && isFromStoryArc && aiResponse.recast && aiResponse.question) {
              // 🎯 Story arc mode (mid-mission): Play TWO separate TTS calls
              
              // Build recast part: "You are 7 years old!" + "Amazing!"
              const recastPart = `${aiResponse.recast}! ${aiResponse.ack}`;
              
              console.log('🎬 Playing 2-part TTS:', {
                part1_recast: recastPart.substring(0, 50),
                part2_question: aiResponse.question.substring(0, 50)
              });
              
              // PART 1: Play recast + ack (dynamic cache - varies by student answer)
              await textToSpeech(recastPart, {
                autoPlay: true,
                mode: 'conversation',
                preferredLayer: 'auto',
                context: {} // Dynamic cache (hash-based)
              });
              
              // PART 2: Play question (static cache - same for all students)
              const questionContext = {
                type: 'story',
                weekNum: weekNumber,
                stationId: `mission${currentMission.mission_id || currentMissionIndex + 1}`,
                questionId: `q${nextTurn}`,
                subType: 'question'
              };
              
              await textToSpeech(cleanAIForTTS(aiResponse.question), {
                autoPlay: true,
                mode: 'conversation',
                preferredLayer: 'auto',
                context: questionContext
              });
              
              console.log('🔊 TTS played successfully (2 parts)');
            } else {
              // 🎯 Goodbye / AI-generated / final turn: Play full responseText as single TTS (no static cache lookup)
              await textToSpeech(cleanAIForTTS(responseText), {
                autoPlay: true,
                mode: 'conversation',
                preferredLayer: 'auto',
                context: {} // Dynamic cache only — avoids hanging on missing static cache files
              });
              console.log('🔊 TTS played successfully (single, dynamic)');
            }
          } catch (ttsError) {
            console.warn('⚠️ TTS failed:', ttsError.message);
          }
        }
        
        // Show hints only if question detected AND not at max turns
        if (responseText.includes('?') && hints.length > 0 && !isPastMax) {
          setHints(hints);
          setShowHints(true);
        }
        
        // Increment turn count
        setTurnCount(nextTurn);

        // 🔥 Save progress on mission completion in story_character mode
        if (isPastMax) {
          const completedMissions = savedData.completedMissions || [];
          if (!completedMissions.includes(currentMission.mission_id)) {
            completedMissions.push(currentMission.mission_id);
          }
          const efficiencyScore = Math.min(100, Math.round((maxTurns / nextTurn) * 100));
          const missionScores = { ...(savedData.missionScores || {}) };
          missionScores[currentMission.mission_id] = efficiencyScore;
          const allDone = completedMissions.length === weekRealData.story_missions?.length;
          saveProgress({
            turnCount: nextTurn,
            currentMissionIndex,
            completedMissions,
            missionScores,
            lastCompletedAt: new Date().toISOString(),
            studentName: studentName
          }, allDone, efficiencyScore);
          if (allDone) markComplete(100);
        }
        
        return; // 🔥 EXIT EARLY - skip all objective logic below!
      }

      // 🔥 OBJECTIVE MODE (old missions): Continue with normal logic...
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
        // Week 1, 2, 3 style: No objectives, use AI-generated hints from response
        // 🔥 AI will read phase_questions hints from prompt and return them in suggested_hints
        objectiveHints = guardedResponse.suggested_hints || guardedResponse.hints || ['I', 'am', 'my', 'is'];
        console.log('💡 Using AI-generated hints (from phase_questions):', objectiveHints);
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
          } else if (!responseText.includes(targetQuestion) && !(currentMission.story_character || currentMission.character || currentMission.story_arc)) {
            // 🔥 ONLY override if NOT using story_character (old objective system)
            // Story character mode: Trust AI completely, no override!
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
      
      // 💡 Prefer sentence-level hints extracted from "Say: A or B or C" in responseText
      const sayScrHints = extractSayOptions(responseText);
      const finalObjHints = sayScrHints.length > 0 ? sayScrHints : objectiveHints;
      const scrambledHints = [...finalObjHints].sort(() => Math.random() - 0.5);
      setHints(scrambledHints);
      setShowHints(true);
      console.log('💡 Hints from OBJECTIVE/Say:', currentObjective?.stepKey, '|', scrambledHints);
      
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

      // 💡 Strip "Say: ..." from display for W17+; TTS uses raw responseText
      const displayRespText = storeHintsEnabled ? responseText : stripSayScaffold(responseText);

      // Add AI response to chat
      const aiMsg = {
        role: 'assistant',
        content: displayRespText,
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
      
      // Auto-play TTS if enabled (objective mode - legacy)
      if (autoPlayEnabled) {
        // 🎯 Objective mode responses are usually AI-generated (dynamic)
        // Only use static cache if we can confirm it's from hardcoded content
        const ttsContext = {}; // Default: dynamic cache
        
        await textToSpeech(cleanAIForTTS(responseText), {
          autoPlay: true,
          mode: 'conversation',
          preferredLayer: 'auto',
          context: ttsContext
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
        
        // Track per-mission scores in a map
        const missionScores = { ...(savedData.missionScores || {}) };
        missionScores[currentMission.mission_id] = efficiencyScore;
        
        saveProgress({
          turnCount,
          currentMissionIndex,
          completedMissions,
          missionScores,
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
                  className={`bg-white rounded-xl p-6 shadow-lg border transition-all duration-200 cursor-pointer group ${
                    (savedData.completedMissions || []).includes(mission.mission_id)
                      ? 'border-green-300 bg-green-50 hover:border-green-400'
                      : 'border-purple-100 hover:border-purple-300 hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg ${
                      (savedData.completedMissions || []).includes(mission.mission_id)
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                        : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`}>
                      {(savedData.completedMissions || []).includes(mission.mission_id)
                        ? <CheckCircle2 size={28} />
                        : mission.mission_id}
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
                        {(savedData.completedMissions || []).includes(mission.mission_id) ? (
                          <div className="text-green-600 font-medium flex items-center space-x-1">
                            <CheckCircle2 size={14} />
                            <span>Completed ✓</span>
                          </div>
                        ) : (
                          <div className="text-purple-500 font-medium">
                            Start Mission →
                          </div>
                        )}
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

              {/* TTS Settings */}
              <TTSSettingsPanel compact={true} />

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
                    Turn {turnCount}/{getMaxTurnsForMission(currentMission, weekNumber)}
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
                
                {/* 🔥 NEW: Objective progress indicator (HIDDEN for story_character mode) */}
                {(() => {
                  // Don't show objectives counter if story_character or story_arc exists
                  if (currentMission?.story_character || currentMission?.character || currentMission?.story_arc) {
                    return null;
                  }
                  
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
            
            {/* ❌ REMOVED: "Ms. Nova is thinking..." animation (performance issue) */}
            
            <div ref={chatEndRef} />
          </div>

          {/* AI-Generated Hints Only — hidden W17+ unless user requests */}
          {showHints && storeHintsEnabled && hints.length > 0 && (
            <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
              <div className="flex items-center space-x-1 mb-2">
                <Target size={14} className="text-yellow-600" />
                <span className="text-xs font-medium text-yellow-700">💡 Need help? Try these words:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {hints.map((hint, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-semibold border border-yellow-300 cursor-default">
                    {hint}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 💡 Manual hint toggle for W17+ (storeHintsEnabled = false) */}
          {showHints && !storeHintsEnabled && hints.length > 0 && (
            <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <Target size={14} className="text-yellow-600" />
                  <span className="text-xs font-medium text-yellow-700">💡 Hints (great for self-study!)</span>
                </div>
                <button onClick={() => setShowHints(false)} className="text-[10px] text-yellow-600 hover:text-yellow-800 font-bold">Hide ✕</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {hints.map((hint, index) => (
                  <div key={index} className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-semibold border border-yellow-300 cursor-default">{hint}</div>
                ))}
              </div>
            </div>
          )}
          {!showHints && hints.length > 0 && missionStatus !== 'completed' && (
            <div className="px-4 py-1.5 border-t border-slate-100 flex justify-center">
              <button onClick={() => setShowHints(true)}
                className="text-[11px] font-bold text-yellow-600 hover:text-yellow-800 px-3 py-1 rounded-lg hover:bg-yellow-50 transition-colors">
                💡 Show Hints
              </button>
            </div>
          )}

          {/* Input Area — show completion banner when done, normal input otherwise */}
          {missionStatus === 'completed' ? (
            <div className="bg-green-50 border-t border-green-200 px-6 py-4 flex items-center justify-center space-x-3">
              <CheckCircle2 size={22} className="text-green-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-green-700">Mission Complete! Great job! 🎉</p>
                <p className="text-xs text-green-600">Go back to the menu to try the next mission.</p>
              </div>
            </div>
          ) : (
            <InputBar
              onSend={handleSendMessage}
              disabled={isLoading}
              placeholder="Speak or type your answer..."
              showVoiceInput={true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default StoryMissionTab;
