import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, X, BrainCircuit, Mic, MicOff, Loader2, MessageCircle, Volume2, Play, Shuffle, BookText, Sword, PenTool, Award, CheckCircle, XCircle, RotateCcw, Calculator, FlaskConical } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import syllabusDB from '../../data/syllabus_database';
import { analyzeAnswer } from '../../utils/smartCheck';
import { 
  chatAI, 
  mathAI, 
  scienceAI,
  storyAI,
  debateAI,
  getActiveProvider,
  validateMathAnswer,
  getStoryTopics
} from '../../services/aiProviders';

const AITutor = ({ weekData, isVi = false, learningMode = 'advanced' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [isChatListening, setIsChatListening] = useState(false);
  const [rolePlayScenario, setRolePlayScenario] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null); // Track if any scenario is active
  const [turnCount, setTurnCount] = useState(0);
  
  // Pronunciation state
  const [pronWord, setPronWord] = useState(null);
  const [pronScore, setPronScore] = useState(null);
  const [pronAttempts, setPronAttempts] = useState(0);
  const [isPronListening, setIsPronListening] = useState(false);
  
  // Story builder state
  const [storyParts, setStoryParts] = useState([]);
  const [storyInput, setStoryInput] = useState("");
  const [storyLevel, setStoryLevel] = useState('beginner');
  const [storyType, setStoryType] = useState('creative'); // creative, science
  const [isStoryListening, setIsStoryListening] = useState(false);
  
  // Debate state
  const [debateTopic, setDebateTopic] = useState(null);
  const [debateMessages, setDebateMessages] = useState([]);
  const [debateInput, setDebateInput] = useState("");
  const [isDebateListening, setIsDebateListening] = useState(false);
  
  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizMessages, setQuizMessages] = useState([]);
  const [quizInput, setQuizInput] = useState("");
  const [isQuizListening, setIsQuizListening] = useState(false);
  const [quizSubject, setQuizSubject] = useState('vocabulary'); // vocabulary, math, science
  const [quizMode, setQuizMode] = useState('current'); // current (week only) or review (cumulative)
  const [currentQuizData, setCurrentQuizData] = useState(null); // Store current question data
  const [previousProblems, setPreviousProblems] = useState([]); // Track used math problems
  const [previousQuestions, setPreviousQuestions] = useState([]); // Track used science questions
  const [isQuizLoading, setIsQuizLoading] = useState(false); // Loading state for quiz start
  
  // Story guiding state
  const [storyQuestions, setStoryQuestions] = useState(null); // Guiding questions
  const [storyHints, setStoryHints] = useState(null); // Word hints
  const [storyTopic, setStoryTopic] = useState(null);
  
  const scrollRef = useRef(null);
  const messageHistoryRef = useRef([]);
  const recognitionRef = useRef(null);
  const weekTopicRef = useRef("");

  // Extract dynamic data
  const vocabList = weekData?.stations?.new_words?.vocab || [];
  const weekTitle = weekData?.weekTitle_en || "English Learning";
  const weekId = weekData?.weekId || 1;
  
  // Get syllabus info and determine level
  const weekInfo = syllabusDB[weekId] || {};
  const weekLevel = weekId <= 14 ? 'beginner' : weekId <= 50 ? 'intermediate' : 'advanced';
  const MAX_TURNS = weekLevel === 'beginner' ? 10 : weekLevel === 'intermediate' ? 12 : 15;
  
  // Build cumulative syllabus context (weeks 1 to current)
  const syllabusContext = Object.keys(syllabusDB)
    .filter(k => parseInt(k) <= weekId && parseInt(k) > 0)
    .map(k => {
      const w = syllabusDB[k];
      return `W${k}:${w.grammar?.join('/')},${w.math?.join('/')},${w.science?.join('/')}`;
    })
    .join(';');
  
  // Get cumulative vocab list for review mode (all weeks up to current)
  const cumulativeVocab = React.useMemo(() => {
    const allVocab = [];
    // This would need to be implemented by loading all week data
    // For now, just use current week + suggest implementing cumulative loading
    return vocabList;
  }, [vocabList]);
  
  // Filter simple vocab for pronunciation
  const simpleVocab = vocabList.filter(v => v.word && v.word.length <= (weekId <= 14 ? 6 : 10));
  
  useEffect(() => {
    weekTopicRef.current = weekTitle;
  }, [weekTitle]);
  
  // Roleplay scenarios (filtered by week)
  const allRolePlayScenarios = [
    { id: 1, title: "At School", prompt: "School conversation", context: "school", minWeek: 1 },
    { id: 2, title: "With Family", prompt: "Family talk", context: "family", minWeek: 1 },
    { id: 3, title: "Math Helper", prompt: "Solving math problems", context: "math", minWeek: 1 },
    { id: 4, title: "Shopping", prompt: "Buying things", context: "shopping", minWeek: 8 },
    { id: 5, title: "Asking Directions", prompt: "Navigation help", context: "navigation", minWeek: 15 },
    { id: 6, title: "Ordering Food", prompt: "Restaurant", context: "restaurant", minWeek: 15 },
    { id: 7, title: "Making Friends", prompt: "Social intro", context: "social", minWeek: 15 },
    { id: 8, title: "At the Doctor", prompt: "Health", context: "health", minWeek: 30 }
  ];
  const rolePlayScenarios = allRolePlayScenarios.filter(s => weekId >= s.minWeek);
  
  // Debate topics (filtered by week - no debate before week 15)
  const generateDebateTopics = () => {
    if (weekId < 15) return [];
    
    const topics = [];
    
    // Week-specific topics from syllabus
    if (weekId === 9 || weekId === 10) {
      topics.push({ id: 1, topic: "City life is better than countryside", minTurns: 5 });
    }
    if (weekId >= 11 && weekId <= 14) {
      topics.push({ id: 2, topic: "Which community helper is most important?", minTurns: 5 });
    }
    
    // General topics by level
    if (weekId >= 15 && weekId <= 30) {
      topics.push(
        { id: 3, topic: "Is homework helpful or not?", minTurns: 5 },
        { id: 4, topic: "What's the best school subject?", minTurns: 5 }
      );
    }
    if (weekId >= 31 && weekId <= 80) {
      topics.push(
        { id: 5, topic: "Online learning vs classroom learning", minTurns: 8 },
        { id: 6, topic: "Should students have pets in classroom?", minTurns: 8 }
      );
    }
    if (weekId >= 81) {
      topics.push(
        { id: 7, topic: "Technology makes people less social", minTurns: 10 },
        { id: 8, topic: "Social media: helpful or harmful?", minTurns: 10 }
      );
    }
    
    return topics;
  };
  const debateTopics = generateDebateTopics();

  // Web Speech API setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onend = () => {
        setIsChatListening(false);
        setIsPronListening(false);
        setIsStoryListening(false);
        setIsDebateListening(false);
        setIsQuizListening(false);
      };
      recognitionRef.current.onerror = () => {
        setIsChatListening(false);
        setIsPronListening(false);
        setIsStoryListening(false);
        setIsDebateListening(false);
        setIsQuizListening(false);
      };
    }
  }, []);

  const toggleChatVoice = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Try Chrome or Edge.');
      return;
    }
    if (isChatListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(transcript);
      };
      recognitionRef.current.start();
      setIsChatListening(true);
    }
  };

  const toggleQuizVoice = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Try Chrome or Edge.');
      return;
    }
    if (isQuizListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuizInput(transcript);
      };
      recognitionRef.current.start();
      setIsQuizListening(true);
    }
  };

  const toggleStoryVoice = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Try Chrome or Edge.');
      return;
    }
    if (isStoryListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setStoryInput(transcript);
      };
      recognitionRef.current.start();
      setIsStoryListening(true);
    }
  };

  const toggleDebateVoice = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Try Chrome or Edge.');
      return;
    }
    if (isDebateListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setDebateInput(transcript);
      };
      recognitionRef.current.start();
      setIsDebateListening(true);
    }
  };

  // CHAT HANDLERS
  const startRolePlay = (scenario) => {
    setRolePlayScenario(scenario);
    setActiveScenario(scenario); // Mark scenario as active
    setTurnCount(0);
    
    // Context-aware openings based on week topic
    const openings = {
      school: weekId <= 3 ? "What do you do at school?" : "Tell me about your favorite school subject!",
      family: weekId === 2 ? "Who is in your family?" : weekId <= 14 ? "How many people are in your family?" : "What do you like about your family?",
      math: weekId <= 8 ? "Let's count items! How many pencils do you have?" : "Let's solve a problem! If you have 5 apples and eat 2, how many left?",
      restaurant: "Welcome! What would you like to eat today?",
      navigation: "Where do you want to go?",
      shopping: "What do you want to buy?",
      social: "Hi! What's your name?",
      health: weekId <= 6 ? "Do you feel healthy?" : "What do you eat for breakfast?"
    };
    const startMsg = openings[scenario.context] || `Let's practice! ${scenario.context}`;
    messageHistoryRef.current = [];
    setChatMessages([{ role: 'ai', text: startMsg }]);
    messageHistoryRef.current.push({ role: 'assistant', content: startMsg });
  };

  const generateResponse = async (userMsg) => {
    // AI keeps asking until student stops - no turn limit
    
    // Use Multi-Provider AI API
    try {
      const result = await chatAI(userMsg, {
        conversationHistory: messageHistoryRef.current,
        scenario: rolePlayScenario,
        weekInfo,
        vocabList,
        weekId,
        weekTitle
      });
      console.log(`[Chat] Provider: ${result.provider}, Time: ${result.duration}ms`);
      // TTS - read AI response
      speakText(result.text);
      return result.text;
    } catch (error) {
      console.error('Chat error:', error);
      return "Tell me more about that!";
    }
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput;
    
    // SmartCheck grammar before sending
    const checkResult = analyzeAnswer(userMsg, [], 'critical');
    if (checkResult.status === 'warning') {
      // Show warning but still send
      setChatMessages(prev => [...prev, { role: 'user', text: userMsg }, { role: 'system', text: `⚠️ ${checkResult.message}` }]);
    } else {
      setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    }
    
    setChatInput("");
    setChatLoading(true);
    setTurnCount(prev => prev + 1);

    messageHistoryRef.current.push({ role: 'user', content: userMsg });
    
    try {
      const result = await chatAI(userMsg, {
        conversationHistory: messageHistoryRef.current,
        scenario: rolePlayScenario,
        weekInfo,
        vocabList,
        weekId,
        weekTitle,
        syllabusContext
      });
      console.log(`[Chat] Provider: ${result.provider}, Time: ${result.duration}ms`);
      setChatMessages(prev => [...prev, { role: 'ai', text: result.text, provider: result.provider }]);
      messageHistoryRef.current.push({ role: 'assistant', content: result.text });
      speakText(result.text);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble. Can you try again?" }]);
    } finally {
      setChatLoading(false);
    }
  };

  // PRONUNCIATION HANDLERS
  const startPronunciation = () => {
    if (vocabList.length === 0) return;
    const word = vocabList[Math.floor(Math.random() * vocabList.length)];
    setPronWord(word);
    setPronScore(null);
    setPronAttempts(0);
    speakText(`Say the word: ${word.word}`);
  };

  const checkPronunciation = () => {
    if (!recognitionRef.current || !pronWord) return;
    
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const confidence = event.results[0][0].confidence;
      
      if (transcript.includes(pronWord.word.toLowerCase())) {
        const score = Math.round(confidence * 100);
        setPronScore(score);
        setPronAttempts(prev => prev + 1);
        speakText(score >= 80 ? "Excellent!" : score >= 60 ? "Good! Try again." : "Keep practicing!");
      } else {
        setPronScore(20);
        speakText(`I heard "${transcript}". Try: ${pronWord.word}`);
      }
      setIsPronListening(false);
    };
    
    recognitionRef.current.start();
    setIsPronListening(true);
  };

  // STORY BUILDER HANDLERS
  // Initial questions MUST stay on topic
  const topicStarterQuestions = {
    school: ['Is the school big?', 'Do you see a teacher?', 'Do you have books at school?'],
    home: ['Is your home big?', 'Do you see books at home?', 'Is your home nice?'],
    family: ['Is your family big?', 'Do you see your family?', 'Are they nice?'],
    friend: ['Is your friend nice?', 'Is your friend a student?', 'Do you see your friend?'],
    pet: ['Is your pet big?', 'Is your pet nice?', 'Do you have a name for your pet?'],
    toy: ['Is your toy big?', 'Is your toy nice?', 'Do you see your toy?'],
    week: ['Is it nice?', 'Do you see it?', 'Is it big?']
  };

  const startStory = async (topic) => {
    // topic is an object from getStoryTopics(): { id, label, starter }
    setStoryTopic(topic);
    setStoryLevel(weekLevel);
    setStoryType('creative');
    setStoryQuestions(topicStarterQuestions[topic.id] || topicStarterQuestions.beach);
    
    // Use week vocab for hints (first 8 simple words)
    const weekHints = vocabList
      .filter(v => v.word && v.word.length <= 8)
      .slice(0, 8)
      .map(v => v.word);
    setStoryHints(weekHints.length > 0 ? weekHints : ['fun', 'happy', 'nice', 'big']);
    
    // Generate AI opening based on week topic/title instead of hardcoded starter
    console.log(`[Story] Week ${weekId} - Generating opening for: ${topic.label}`);
    
    try {
      // Use AI to generate week-aware opening
      const result = await storyAI([], {
        storyTopic: topic.id,
        weekInfo,
        vocabList,
        weekId,
        weekTitle,
        generateOpening: true
      });
      
      const aiStart = result.text || topic.starter;
      console.log(`[Story] AI generated opening: "${aiStart}"`);
      setStoryParts([{ role: 'ai', text: aiStart }]);
      speakText(aiStart);
    } catch (error) {
      console.error('[Story] Failed to generate AI opening, using fallback:', error);
      // Fallback to topic starter
      setStoryParts([{ role: 'ai', text: topic.starter }]);
      speakText(topic.starter);
    }
  };

  const addStoryPart = async () => {
    if (!storyInput.trim()) return;
    const userPart = storyInput;
    
    // SmartCheck grammar
    const checkResult = analyzeAnswer(userPart, [], 'critical');
    if (checkResult.status === 'warning') {
      setStoryParts(prev => [...prev, 
        { role: 'user', text: userPart },
        { role: 'system', text: `⚠️ ${checkResult.message}` }
      ]);
    } else {
      setStoryParts(prev => [...prev, { role: 'user', text: userPart }]);
    }
    
    setStoryInput("");
    setStoryQuestions(null);
    setStoryHints(null);
    
    console.log('[Story] User added:', userPart);
    console.log('[Story] Calling Gemini API...');
    console.log('[Story] Context:', { weekId, storyTopic: storyTopic?.id, weekLevel });
    
    try {
      const result = await storyAI(
        [...storyParts, { role: 'user', text: userPart }],
        {
          storyTopic: storyTopic?.id || 'beach',
          weekInfo,
          vocabList,
          weekId,
          weekTitle
        }
      );
      const aiContinuation = result.text;
      console.log(`[Story] Provider: ${result.provider}, Response: ${aiContinuation}`);
      
      // Save guiding questions and hints
      if (result.questions && result.questions.length > 0) {
        setStoryQuestions(result.questions);
      }
      if (result.hints && result.hints.length > 0) {
        setStoryHints(result.hints);
      }
      
      // TTS - read story continuation then first question
      speakText(aiContinuation);
      
      setTimeout(() => {
        setStoryParts(prev => [...prev, { role: 'ai', text: aiContinuation }]);
      }, 600);
    } catch (error) {
      console.error('[Story] API call FAILED:', error.message);
      console.error('[Story] Full error:', error);
      
      // Smart fallback with guiding questions
      const fallback = 'That sounds great! What happened next?';
      console.log('[Story] Using fallback:', fallback);
      setStoryParts(prev => [...prev, { role: 'ai', text: fallback }]);
      setStoryQuestions(['What did you see?', 'How did you feel?', 'What did you do?']);
      setStoryHints(['happy', 'fun', 'nice', 'big']);
    }
  };

  // DEBATE HANDLERS
  const startDebate = (topic) => {
    setDebateTopic(topic);
    const msg = `Let's debate: "${topic.topic}". Do you agree or disagree?`;
    setDebateMessages([{ role: 'ai', text: msg }]);
    speakText("What's your opinion?");
  };

  const sendDebateMessage = async () => {
    if (!debateInput.trim()) return;
    const userMsg = debateInput;
    
    // SmartCheck grammar
    const checkResult = analyzeAnswer(userMsg, [], 'critical');
    if (checkResult.status === 'warning') {
      setDebateMessages(prev => [...prev, 
        { role: 'user', text: userMsg },
        { role: 'system', text: `⚠️ ${checkResult.message}` }
      ]);
    } else {
      setDebateMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    }
    setDebateInput("");
    
    const turnNum = debateMessages.filter(m => m.role === 'user').length + 1;
    
    try {
      const result = await debateAI(userMsg, {
        topic: debateTopic.topic,
        debateHistory: debateMessages,
        weekInfo,
        weekId,
        turnNumber: turnNum
      });
      console.log(`[Debate] Provider: ${result.provider}`);
      
      // TTS - read debate response
      speakText(result.text);
      
      setTimeout(() => {
        setDebateMessages(prev => [...prev, { role: 'ai', text: result.text }]);
      }, 800);
    } catch (error) {
      console.error('Debate error:', error);
      // Fallback
      setTimeout(() => {
        const fallback = turnNum <= 3
          ? "That's an interesting point. Can you explain more?"
          : "Great argument! You're thinking critically!";
        setDebateMessages(prev => [...prev, { role: 'ai', text: fallback }]);
      }, 800);
    }
  };

  // QUIZ HELPERS - Generate questions by subject
  const generateMathQuestion = (index) => {
    const mathTopics = weekInfo.math || [];
    const topicStr = mathTopics.join(', ');
    
    if (weekLevel === 'beginner') {
      const problems = [
        { q: "I have 3 pencils. I get 2 more. How many pencils?", a: "5" },
        { q: "There are 4 desks and 3 chairs. How many items?", a: "7" },
        { q: "I count 5 books. I give away 2. How many left?", a: "3" },
        { q: "In the classroom, 6 students and 4 teachers. Total people?", a: "10" },
        { q: "A box has 8 crayons. I add 1 more. Total?", a: "9" }
      ];
      return problems[index % problems.length];
    } else if (weekLevel === 'intermediate') {
      const problems = [
        { q: "A farm has 12 chickens. 5 fly away. How many remain?", a: "7" },
        { q: "Each of 4 students has 3 books. Total books?", a: "12" },
        { q: "If 15 apples are shared by 3 friends equally, how many each?", a: "5" },
        { q: "A class has 8 groups of 2 students. Total students?", a: "16" },
        { q: "I walk 6 blocks north, then 4 blocks south. How far from start?", a: "2" }
      ];
      return problems[index % problems.length];
    } else {
      const problems = [
        { q: "A store has 48 items. They sell 24 and get 20 more. Total now?", a: "44" },
        { q: "If traveling 60 km at 30 km/h, how many hours?", a: "2" },
        { q: "A garden is 12m long and 8m wide. What's the area?", a: "96" },
        { q: "Convert 3.5 hours to minutes.", a: "210" },
        { q: "If 75% of 80 students pass, how many passed?", a: "60" }
      ];
      return problems[index % problems.length];
    }
  };

  const generateScienceQuestion = (index) => {
    const scienceTopics = weekInfo.science || [];
    
    if (weekLevel === 'beginner') {
      const questions = [
        { q: "A pencil is living or non-living?", a: "non-living", options: ["living", "non-living"] },
        { q: "True or False: A ruler is a scientist tool.", a: "true", options: ["true", "false"] },
        { q: "What do plants need to grow? Water, sun, or both?", a: "both", options: ["water", "sun", "both"] },
        { q: "Is a tree living or non-living?", a: "living", options: ["living", "non-living"] },
        { q: "True or False: A rock can grow.", a: "false", options: ["true", "false"] }
      ];
      return questions[index % questions.length];
    } else if (weekLevel === 'intermediate') {
      const questions = [
        { q: "In the food chain, what do plants do? Make energy or eat animals?", a: "make energy", options: ["make energy", "eat animals"] },
        { q: "Sound travels through: air, water, or both?", a: "both", options: ["air", "water", "both"] },
        { q: "The life cycle of a butterfly: egg, larva, pupa, then what?", a: "adult", options: ["egg", "adult", "larva"] },
        { q: "True or False: All living things need oxygen.", a: "true", options: ["true", "false"] },
        { q: "Plants make food using: photosynthesis or respiration?", a: "photosynthesis", options: ["photosynthesis", "respiration"] }
      ];
      return questions[index % questions.length];
    } else {
      const questions = [
        { q: "What is the powerhouse of the cell?", a: "mitochondria", options: ["nucleus", "mitochondria", "ribosome"] },
        { q: "True or False: Energy cannot be created or destroyed.", a: "true", options: ["true", "false"] },
        { q: "Ecosystems are balanced by: producers, consumers, and what?", a: "decomposers", options: ["decomposers", "predators", "plants"] },
        { q: "The process of water cycling through Earth is called what?", a: "water cycle", options: ["water cycle", "photosynthesis", "respiration"] },
        { q: "True or False: Climate and weather are the same thing.", a: "false", options: ["true", "false"] }
      ];
      return questions[index % questions.length];
    }
  };

  // QUIZ HANDLERS
  const startConversationalQuiz = async (subject = 'vocabulary') => {
    console.log(`[Quiz] Starting ${subject} quiz (${quizMode} mode) for Week ${weekId}`);
    setIsQuizLoading(true);
    setQuizSubject(subject);
    setQuizIndex(0);
    setQuizScore(0);
    setPreviousProblems([]);
    setPreviousQuestions([]);
    
    try {
      if (subject === 'vocabulary') {
        // Use cumulative vocab for review mode, current week for current mode
        const activeVocab = quizMode === 'review' ? cumulativeVocab : vocabList;
        if (activeVocab.length === 0) {
          setQuizMessages([{ role: 'ai', text: "No vocabulary available." }]);
          return;
        }
        const firstWord = activeVocab[0];
        const def = weekLevel === 'beginner' ? firstWord.definition_en?.split('.')[0] : firstWord.definition_en;
        const msg = `Let's play! I'll describe words. Ready? ${def}. What's the word?`;
        setCurrentQuizData({ answer: firstWord.word, type: 'vocab' });
        setQuizMessages([{ role: 'ai', text: msg }]);
        speakText(msg);
      } else if (subject === 'math') {
        try {
          console.log('[Quiz] Calling AI for math problem...');
          const problem = await mathAI({
            weekInfo,
            vocabList,
            weekId,
            difficulty: weekLevel,
            previousProblems: []
          });
          console.log(`[Quiz] Provider: ${getActiveProvider()}, Generated:`, problem.question);
          setCurrentQuizData(problem);
          setPreviousProblems([problem.question]);
          const msg = `Math time! ${problem.question}`;
          setQuizMessages([
            { role: 'ai', text: msg },
            { role: 'hint', text: problem.hint || "💡 Answer with number AND unit!" }
          ]);
          speakText(msg);
        } catch (error) {
          console.error('[Quiz] Gemini API error:', error);
          setQuizMessages([{ role: 'ai', text: "Let's start with an easy problem!" }]);
        }
      } else if (subject === 'science') {
        try {
          console.log('[Quiz] Calling AI for science question...');
          const question = await scienceAI({
            weekInfo,
            weekId,
            difficulty: weekLevel,
            previousQuestions: []
          });
          console.log(`[Quiz] Provider: ${getActiveProvider()}, Generated:`, question);
          // Handle both old format (q, a) and new format
          const scienceQ = question.q || question.question;
          const scienceA = question.a || question.answer;
          const msg = `Science quiz! ${scienceQ}`;
          setCurrentQuizData({ ...question, q: scienceQ, a: scienceA });
          setQuizMessages([{ role: 'ai', text: msg }]);
          speakText(msg);
        } catch (error) {
          console.error('[Quiz] Gemini API error:', error);
          // Safe fallback
          const fallbackMsg = "Science quiz! Is a dog living or non-living?";
          setCurrentQuizData({ q: "Is a dog living or non-living?", a: "living", options: ["living", "non-living"] });
          setQuizMessages([{ role: 'ai', text: fallbackMsg }]);
          speakText(fallbackMsg);
        }
      }
    } finally {
      setIsQuizLoading(false);
    }
  };

  const answerQuiz = async () => {
    if (!quizInput.trim()) return;
    const answer = quizInput.trim();
    
    // Use cumulative vocab for review mode
    const activeVocab = quizMode === 'review' ? cumulativeVocab : vocabList;
    
    // SmartCheck for grammar (only for non-math answers)
    if (quizSubject !== 'math') {
      const checkResult = analyzeAnswer(answer, [], 'critical');
      if (checkResult.status === 'warning') {
        setQuizMessages(prev => [...prev, { role: 'system', text: `⚠️ ${checkResult.message}` }]);
      }
    }
    let isCorrect = false;
    let correctAnswer = "";
    let feedback = "";
    
    if (quizSubject === 'vocabulary') {
      const currentWord = activeVocab[quizIndex];
      correctAnswer = currentWord.word;
      isCorrect = answer.toLowerCase() === currentWord.word.toLowerCase();
      feedback = isCorrect ? "Correct! 🎉" : `It was "${correctAnswer}". Keep going!`;
    } else if (quizSubject === 'math') {
      correctAnswer = currentQuizData?.answer || '';
      isCorrect = validateMathAnswer(answer, correctAnswer);
      
      if (isCorrect) {
        feedback = `Correct! 🎉 ${currentQuizData?.explanation || ''}`;
      } else {
        const hasNumber = answer.match(/\d+/);
        if (hasNumber && !answer.match(/[a-z]/i)) {
          feedback = `Remember to include the UNIT! The answer is "${correctAnswer}"`;
        } else {
          feedback = `Not quite. The answer is "${correctAnswer}". ${currentQuizData?.explanation || ''}`;
        }
      }
    } else if (quizSubject === 'science') {
      correctAnswer = currentQuizData?.a || '';
      isCorrect = answer.toLowerCase().includes(correctAnswer.toLowerCase());
      feedback = isCorrect ? "Correct! 🎉" : `The answer is "${correctAnswer}". Keep learning!`;
    }
    
    setQuizMessages(prev => [...prev, 
      { role: 'user', text: quizInput },
      { role: 'ai', text: feedback }
    ]);
    setQuizInput("");
    
    // TTS - read short feedback only (not full explanation)
    speakText(isCorrect ? "Correct!" : "Not quite.");
    
    if (isCorrect) setQuizScore(prev => prev + 1);
    
    const maxQuestions = quizSubject === 'vocabulary' ? Math.min(activeVocab.length, 5) : 5;
    
    if (quizIndex < maxQuestions - 1) {
      setTimeout(async () => {
        try {
          if (quizSubject === 'vocabulary') {
            const nextWord = activeVocab[quizIndex + 1];
            const def = weekLevel === 'beginner' ? nextWord.definition_en?.split('.')[0] : nextWord.definition_en;
            const nextQ = `Next: ${def}. What word?`;
            setCurrentQuizData({ answer: nextWord.word, type: 'vocab' });
            setQuizMessages(prev => [...prev, { role: 'ai', text: nextQ }]);
            // TTS - read next question
            speakText(nextQ);
          } else if (quizSubject === 'math') {
            console.log('[Quiz] Generating next math problem...');
            const problem = await mathAI({
              weekInfo,
              vocabList,
              weekId,
              difficulty: weekLevel,
              previousProblems
            });
            console.log('[Quiz] Generated:', problem.question);
            setCurrentQuizData(problem);
            setPreviousProblems(prev => [...prev, problem.question]);
            setQuizMessages(prev => [...prev, 
              { role: 'ai', text: problem.question },
              { role: 'hint', text: problem.hint || "💡 Answer with number AND unit!" }
            ]);
            // TTS - read math question
            speakText(problem.question);
          } else if (quizSubject === 'science') {
            const question = await scienceAI({ 
              weekInfo, 
              weekId, 
              difficulty: weekLevel,
              previousQuestions 
            });
            setCurrentQuizData(question);
            setPreviousQuestions(prev => [...prev, question.q]);
            setQuizMessages(prev => [...prev, { role: 'ai', text: question.q }]);
            // TTS - read science question
            speakText(question.q);
          }
        } catch (error) {
          console.error('Quiz generation error:', error);
        }
      }, 1500);
      setQuizIndex(prev => prev + 1);
    } else {
      setTimeout(() => {
        const finalMsg = `Done! Score: ${quizScore + (isCorrect ? 1 : 0)}/${maxQuestions}`;
        setQuizMessages(prev => [...prev, { role: 'ai', text: finalMsg }]);
        speakText(finalMsg);
      }, 1500);
    }
  };

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages, storyParts, debateMessages, quizMessages]);

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center z-[100] border-4 border-white transition-all group hover:scale-110">
        <Bot size={32} className="group-hover:rotate-12 transition-transform"/>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[440px] h-[720px] bg-white rounded-[40px] shadow-2xl flex flex-col z-[100] border-4 border-indigo-50 overflow-hidden animate-in slide-in-from-right duration-300">
      {/* HEADER */}
      <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <BrainCircuit size={24}/>
          <div className="font-black text-sm uppercase">Professor Paws</div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 p-1 rounded-lg transition-all"><X size={20}/></button>
      </div>

      {/* TABS */}
      <div className="flex bg-indigo-50 p-2 gap-1 shrink-0 border-b border-indigo-200 overflow-x-auto">
        {[
          { id: 'chat', icon: MessageCircle, label: 'Chat' },
          { id: 'pronunciation', icon: Volume2, label: 'Pronunciation' },
          { id: 'quiz', icon: Award, label: 'Quiz' },
          { id: 'story', icon: BookText, label: 'Story' },
          { id: 'debate', icon: Sword, label: 'Debate' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-[10px] font-black uppercase transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            <tab.icon size={12}/>
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">

        {/* CHAT TAB */}
        {activeTab === 'chat' && (
          <>
            {chatMessages.length === 0 && (
              <div className="text-center py-6 space-y-3">
                <p className="text-3xl">🐾</p>
                <p className="text-sm font-black text-slate-800">Hi! I'm Professor Paws!</p>
                <p className="text-xs text-slate-600 px-4">Let's practice conversation!</p>
                
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-black text-indigo-600 uppercase">🎭 Roleplay Scenarios</p>
                  {rolePlayScenarios.slice(0, 4).map(scenario => (
                    <button
                      key={scenario.id}
                      onClick={() => startRolePlay(scenario)}
                      className="w-full p-2 bg-white border-2 border-indigo-100 rounded-lg text-xs font-bold text-slate-700 hover:bg-indigo-50 transition-all flex items-center justify-between"
                    >
                      <span>{scenario.title}</span>
                      <Play size={12} className="text-indigo-600"/>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-[20px] text-sm font-bold shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-indigo-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {rolePlayScenario && turnCount > 0 && (
              <div className="text-center py-2">
                <button onClick={() => { setRolePlayScenario(null); setChatMessages([]); messageHistoryRef.current = []; setTurnCount(0); }} className="text-xs text-slate-500 hover:text-indigo-600 font-bold flex items-center justify-center gap-1 mx-auto">
                  <Shuffle size={12}/>Change Scenario
                </button>
              </div>
            )}
            {activeScenario && chatMessages.length === 0 && (
              <button 
                onClick={() => { setChatMessages([]); setActiveScenario(null); setRolePlayScenario(null); messageHistoryRef.current = []; setTurnCount(0); }}
                className="w-full p-2 text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center justify-center gap-1 transition-all"
              >
                <RotateCcw size={12}/>Back to Chat Menu
              </button>
            )}
            <div ref={scrollRef} />
          </>
        )}

        {/* PRONUNCIATION TAB */}
        {activeTab === 'pronunciation' && (
          <div className="space-y-4 text-center">
            {!pronWord ? (
              <>
                <Volume2 size={48} className="mx-auto text-indigo-600 opacity-50"/>
                <p className="text-sm font-bold text-slate-700">Practice pronunciation with vocabulary!</p>
                <button onClick={startPronunciation} className="w-full bg-indigo-600 text-white p-3 rounded-xl font-black text-sm uppercase hover:bg-indigo-700 flex items-center justify-center gap-2">
                  <Play size={16}/>Start Practice
                </button>
              </>
            ) : (
              <>
                <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-200">
                  <p className="text-xs font-black text-indigo-600 uppercase mb-2">Say This Word:</p>
                  <p className="text-3xl font-black text-slate-800 mb-2">{pronWord.word}</p>
                  {pronWord.pronunciation && <p className="text-sm text-slate-500 italic">{pronWord.pronunciation}</p>}
                  <button onClick={() => speakText(pronWord.word)} className="mt-3 p-2 bg-white rounded-lg hover:bg-indigo-100 transition-all">
                    <Volume2 size={20} className="mx-auto text-indigo-600"/>
                  </button>
                </div>
                
                {pronScore !== null && (
                  <div className={`p-4 rounded-xl border-2 ${pronScore >= 80 ? 'bg-green-50 border-green-200' : pronScore >= 60 ? 'bg-yellow-50 border-yellow-200' : 'bg-orange-50 border-orange-200'}`}>
                    <p className="text-2xl font-black mb-1">{pronScore}%</p>
                    <p className="text-xs font-bold">{pronScore >= 80 ? 'Excellent!' : pronScore >= 60 ? 'Good! Try again.' : 'Keep practicing!'}</p>
                    <p className="text-xs text-slate-500 mt-1">Attempts: {pronAttempts}</p>
                  </div>
                )}
                
                <button 
                  onClick={checkPronunciation} 
                  disabled={isPronListening}
                  className={`w-full p-4 rounded-xl font-black text-white flex items-center justify-center gap-2 transition-all ${isPronListening ? 'bg-red-500 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {isPronListening ? <><MicOff size={18}/>Recording...</> : <><Mic size={18}/>Record Pronunciation</>}
                </button>
                
                <button onClick={startPronunciation} className="w-full p-2 text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center justify-center gap-1">
                  <RotateCcw size={12}/>Try Another Word
                </button>
              </>
            )}
          </div>
        )}

        {/* QUIZ TAB */}
        {activeTab === 'quiz' && (
          <div className="space-y-3">
            {quizMessages.length === 0 ? (
              <div className="text-center py-6">
                <Award size={48} className="mx-auto text-amber-500 opacity-50 mb-3"/>
                <p className="text-sm font-bold text-slate-700 mb-2">Multi-Subject Quiz!</p>
                <p className="text-xs text-slate-600 mb-4 px-4">Choose a subject to test your knowledge</p>
                
                <div className="space-y-2">
                  {/* Quiz Mode Toggle */}
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setQuizMode('current')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${quizMode === 'current' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      This Week
                    </button>
                    <button
                      onClick={() => setQuizMode('review')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${quizMode === 'review' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      Review All (W1-{weekId})
                    </button>
                  </div>
                  
                  <button
                    onClick={() => startConversationalQuiz('vocabulary')}
                    disabled={isQuizLoading}
                    className="w-full p-3 bg-amber-500 text-white rounded-xl font-black text-sm uppercase hover:bg-amber-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isQuizLoading ? <><span className="animate-spin">⏳</span>Loading...</> : <><Award size={16}/>Vocabulary Quiz</>}
                  </button>
                  <button
                    onClick={() => startConversationalQuiz('math')}
                    disabled={isQuizLoading}
                    className="w-full p-3 bg-blue-500 text-white rounded-xl font-black text-sm uppercase hover:bg-blue-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isQuizLoading ? <><span className="animate-spin">⏳</span>Loading...</> : <><Calculator size={16}/>Math Quiz</>}
                  </button>
                  <button
                    onClick={() => startConversationalQuiz('science')}
                    disabled={isQuizLoading}
                    className="w-full p-3 bg-green-500 text-white rounded-xl font-black text-sm uppercase hover:bg-green-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isQuizLoading ? <><span className="animate-spin">⏳</span>Loading...</> : <><FlaskConical size={16}/>Science Quiz</>}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {quizMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : m.role === 'hint' ? 'justify-center' : 'justify-start'}`}>
                    {m.role === 'hint' ? (
                      <div className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-[10px] font-bold text-amber-600">
                        {m.text}
                      </div>
                    ) : (
                      <div className={`max-w-[85%] p-3 rounded-[20px] text-sm font-bold shadow-sm ${m.role === 'user' ? 'bg-amber-500 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-amber-200'}`}>
                        {m.text}
                      </div>
                    )}
                  </div>
                ))}
                <button 
                  onClick={() => { setQuizMessages([]); setQuizSubject(''); setCurrentQuizData(null); setQuizInput(''); }}
                  className="w-full p-2 text-xs font-bold text-slate-500 hover:text-amber-600 flex items-center justify-center gap-1"
                >
                  <RotateCcw size={12}/>Back to Quiz Menu
                </button>
                <div ref={scrollRef} />
              </>
            )}
          </div>
        )}

        {/* STORY BUILDER TAB */}
        {activeTab === 'story' && (
          <div className="space-y-3">
            {storyParts.length === 0 ? (
              <div className="text-center py-6">
                <BookText size={48} className="mx-auto text-purple-600 opacity-50 mb-3"/>
                <p className="text-sm font-bold text-slate-700 mb-2">📖 Let's Write a Story!</p>
                <p className="text-xs text-slate-600 mb-3 px-4">Pick a topic you like:</p>
                
                <div className="space-y-2">
                  {getStoryTopics(weekId, weekInfo).map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => startStory(topic)}
                      className="w-full p-3 bg-white border-2 border-purple-100 rounded-xl text-sm font-bold text-slate-700 hover:bg-purple-50 hover:border-purple-300 transition-all flex items-center gap-3"
                    >
                      <span className="text-xl">{topic.label.split(' ')[0]}</span>
                      <span>{topic.label.split(' ').slice(1).join(' ')}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Story topic badge */}
                {storyTopic && (
                  <div className="text-center text-xs text-purple-600 font-bold">
                    {storyTopic.label}
                  </div>
                )}
                
                {storyParts.map((part, i) => (
                  <div key={i} className={`p-3 rounded-xl ${
                    part.role === 'system'
                      ? 'bg-amber-50 border-2 border-amber-200 text-amber-700 text-xs'
                      : part.role === 'ai'
                      ? 'bg-purple-50 border-2 border-purple-200 text-purple-900'
                      : 'bg-white border-2 border-slate-200 text-slate-800'
                  }`}>
                    <p className="text-sm font-bold">{part.text}</p>
                  </div>
                ))}
                
                {/* Guiding Questions - help kids know what to say */}
                {storyQuestions && storyQuestions.length > 0 && (
                  <div className="p-3 bg-green-50 border-2 border-green-200 rounded-xl">
                    <p className="text-[10px] font-black text-green-600 mb-2">💬 Think about these questions:</p>
                    <div className="space-y-1">
                      {storyQuestions.map((q, i) => (
                        <p key={i} className="text-xs text-green-700 font-medium">• {q}</p>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Word hints to help vocabulary */}
                {storyHints && storyHints.length > 0 && (
                  <div className="p-2 bg-amber-50 border-2 border-amber-200 rounded-xl">
                    <p className="text-[10px] font-black text-amber-600 mb-1">🔤 Words you can use:</p>
                    <div className="flex flex-wrap gap-1">
                      {storyHints.map((word, i) => (
                        <button 
                          key={i}
                          onClick={() => setStoryInput(prev => prev + (prev ? ' ' : '') + word)}
                          className="px-2 py-1 bg-white border border-amber-300 rounded-lg text-xs font-bold text-amber-700 hover:bg-amber-100 transition-all"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => { setStoryParts([]); setStoryInput(''); setStoryQuestions(null); setStoryHints(null); setStoryTopic(null); }}
                  className="w-full p-2 text-xs font-bold text-slate-500 hover:text-purple-600 flex items-center justify-center gap-1"
                >
                  <RotateCcw size={12}/>Start New Story
                </button>
                <div ref={scrollRef} />
              </>
            )}
          </div>
        )}

        {/* DEBATE TAB */}
        {activeTab === 'debate' && (
          <div className="space-y-3">
            {weekId < 15 ? (
              <div className="text-center py-12">
                <Sword size={48} className="mx-auto text-slate-300 mb-3"/>
                <p className="text-sm font-bold text-slate-600 mb-2">🔒 Debate Locked</p>
                <p className="text-xs text-slate-500 px-6">Debates are available starting Week 15. Keep learning!</p>
              </div>
            ) : !debateTopic ? (
              <div className="text-center py-6">
                <Sword size={48} className="mx-auto text-rose-600 opacity-50 mb-3"/>
                <p className="text-sm font-bold text-slate-700 mb-4">Choose a Debate Topic</p>
                {debateTopics.slice(0, 4).map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => startDebate(topic)}
                    className="w-full p-3 mb-2 bg-white border-2 border-rose-100 rounded-xl text-xs font-bold text-slate-700 hover:bg-rose-50 transition-all text-left"
                  >
                    <span className="block text-rose-600 text-[10px] uppercase font-black mb-1">Min {topic.minTurns} turns</span>
                    {topic.topic}
                  </button>
                ))}
              </div>
            ) : (
              <>
                {debateMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-[20px] text-sm font-bold shadow-sm ${m.role === 'user' ? 'bg-rose-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-rose-200'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <button onClick={() => { setDebateTopic(null); setDebateMessages([]); }} className="w-full p-2 text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center justify-center gap-1">
                  <Shuffle size={12}/>Change Topic
                </button>
                <div ref={scrollRef} />
              </>
            )}
          </div>
        )}

      </div>

      {/* INPUT SECTIONS */}
      {activeTab === 'chat' && rolePlayScenario && (
        <div className="p-3 bg-white border-t shrink-0">
          <div className="flex gap-2 items-center mb-2">
            <div className="flex-1 bg-indigo-50 rounded-lg p-2 text-[10px] font-bold text-indigo-600 flex items-center gap-1">
              <Mic size={12}/> <span>Speak English! Practice makes perfect!</span>
            </div>
          </div>
          <div className="flex gap-2">
          <button
            onClick={toggleChatVoice}
            className={`p-2.5 rounded-full transition-all ${isChatListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600'}`}
          >
            {isChatListening ? <MicOff size={16}/> : <Mic size={16}/>}
          </button>
          <input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendChat()}
            placeholder={isChatListening ? "Listening..." : "Type or speak..."}
            className="flex-1 p-2.5 bg-slate-50 border-2 border-slate-200 rounded-[15px] outline-none text-xs font-bold focus:border-indigo-300"
            disabled={isChatListening}
          />
          <button
            onClick={handleSendChat}
            disabled={chatLoading || isChatListening}
            className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            {chatLoading ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
          </button>
          </div>
        </div>
      )}

      {activeTab === 'story' && storyParts.length > 0 && (
        <div className="p-3 bg-white border-t shrink-0">
          <div className="flex gap-2 items-center mb-2">
            <div className="flex-1 bg-purple-50 rounded-lg p-2 text-[10px] font-bold text-purple-600 flex items-center gap-1">
              <Mic size={12}/> <span>Tip: Use voice for better speaking practice!</span>
            </div>
          </div>
          <div className="flex gap-2">
          <button
            onClick={toggleStoryVoice}
            className={`p-2.5 rounded-full transition-all ${isStoryListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-purple-100 hover:text-purple-600'}`}
          >
            {isStoryListening ? <MicOff size={16}/> : <Mic size={16}/>}
          </button>
          <input
            value={storyInput}
            onChange={e => setStoryInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addStoryPart()}
            placeholder={isStoryListening ? "Listening..." : "Type or speak..."}
            className="flex-1 p-2.5 bg-slate-50 border-2 border-slate-200 rounded-[15px] outline-none text-xs font-bold focus:border-purple-300"
            disabled={isStoryListening}
          />
          <button
            onClick={addStoryPart}
            disabled={isStoryListening}
            className="p-2.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 transition-all"
          >
            <Send size={16}/>
          </button>
          </div>
        </div>
      )}

      {activeTab === 'debate' && debateTopic && (
        <div className="p-3 bg-white border-t flex gap-2 shrink-0">
          <button
            onClick={toggleDebateVoice}
            className={`p-2.5 rounded-full transition-all ${isDebateListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-600'}`}
          >
            {isDebateListening ? <MicOff size={16}/> : <Mic size={16}/>}
          </button>
          <input
            value={debateInput}
            onChange={e => setDebateInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendDebateMessage()}
            placeholder={isDebateListening ? "Listening..." : "Type or speak..."}
            className="flex-1 p-2.5 bg-slate-50 border-2 border-slate-200 rounded-[15px] outline-none text-xs font-bold focus:border-rose-300"
            disabled={isDebateListening}
          />
          <button
            onClick={sendDebateMessage}
            disabled={isDebateListening}
            className="p-2.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 disabled:opacity-50 transition-all"
          >
            <Send size={16}/>
          </button>
        </div>
      )}

      {activeTab === 'quiz' && quizMessages.length > 0 && quizIndex < Math.min(vocabList.length, 5) && (
        <div className="p-3 bg-white border-t flex gap-2 shrink-0">
          <button
            onClick={toggleQuizVoice}
            className={`p-2.5 rounded-full transition-all ${isQuizListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-600'}`}
          >
            {isQuizListening ? <MicOff size={16}/> : <Mic size={16}/>}
          </button>
          <input
            value={quizInput}
            onChange={e => setQuizInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && answerQuiz()}
            placeholder={isQuizListening ? "Listening..." : "Type or speak..."}
            className="flex-1 p-2.5 bg-slate-50 border-2 border-slate-200 rounded-[15px] outline-none text-xs font-bold focus:border-amber-300"
            disabled={isQuizListening}
          />
          <button
            onClick={answerQuiz}
            disabled={isQuizListening}
            className="p-2.5 bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:opacity-50 transition-all"
          >
            <Send size={16}/>
          </button>
        </div>
      )}
    </div>
  );
};

export default AITutor;
