import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, X, BrainCircuit, Mic, MicOff, Loader2, MessageCircle, Volume2, Play, Shuffle, BookText, Sword, PenTool, Award, CheckCircle, XCircle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';

const AITutor = ({ weekData, isVi = false, learningMode = 'advanced' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [rolePlayScenario, setRolePlayScenario] = useState(null);
  const [turnCount, setTurnCount] = useState(0);
  
  // Pronunciation state
  const [pronWord, setPronWord] = useState(null);
  const [pronScore, setPronScore] = useState(null);
  const [pronAttempts, setPronAttempts] = useState(0);
  
  // Story builder state
  const [storyParts, setStoryParts] = useState([]);
  const [storyInput, setStoryInput] = useState("");
  
  // Debate state
  const [debateTopic, setDebateTopic] = useState(null);
  const [debateMessages, setDebateMessages] = useState([]);
  const [debateInput, setDebateInput] = useState("");
  
  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizMessages, setQuizMessages] = useState([]);
  
  const scrollRef = useRef(null);
  const messageHistoryRef = useRef([]);
  const recognitionRef = useRef(null);
  const weekTopicRef = useRef("");

  // Extract dynamic data from weekData
  const vocabList = weekData?.stations?.new_words?.vocab || [];
  const weekTitle = weekData?.weekTitle_en || "English Learning";
  const weekId = weekData?.weekId || 1;
  
  // Update week topic for context
  useEffect(() => {
    weekTopicRef.current = weekTitle;
  }, [weekTitle]);
  
  // Role-play scenarios for speaking practice
  const rolePlayScenarios = [
    { id: 1, title: "Ordering Food", prompt: "You are at a restaurant. Order a meal in English.", context: "restaurant" },
    { id: 2, title: "Asking Directions", prompt: "Ask for directions to the library.", context: "navigation" },
    { id: 3, title: "Shopping", prompt: "You want to buy a t-shirt. Ask about size and price.", context: "shopping" },
    { id: 4, title: "Making Friends", prompt: "Introduce yourself to a new classmate.", context: "social" },
    { id: 5, title: "At the Doctor", prompt: "You don't feel well. Describe your symptoms.", context: "health" },
    { id: 6, title: "Job Interview", prompt: "You're applying for a part-time job. Answer questions.", context: "work" }
  ];
  
  // Debate topics (contextual to learning level)
  const debateTopics = [
    { id: 1, topic: "City life is better than countryside life", difficulty: "beginner" },
    { id: 2, topic: "Students should have homework every day", difficulty: "beginner" },
    { id: 3, topic: "Technology makes people less social", difficulty: "intermediate" },
    { id: 4, topic: "Online learning is better than classroom learning", difficulty: "intermediate" },
    { id: 5, topic: "Animals should not be kept in zoos", difficulty: "advanced" },
    { id: 6, topic: "Social media does more harm than good", difficulty: "advanced" }
  ];

  // Initialize Web Speech API
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in this browser. Try Chrome or Edge.');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const startRolePlay = (scenario) => {
    setRolePlayScenario(scenario);
    setTurnCount(0);
    const openings = {
      restaurant: "Welcome to our restaurant! What would you like to order today?",
      navigation: "Hello! Are you lost? Where do you need to go?",
      shopping: "Hi there! Looking for something special today?",
      social: "Hey! I haven't seen you before. Are you new here?",
      health: "Good morning. Please have a seat. How are you feeling today?",
      work: "Thank you for coming in today. Tell me a bit about yourself."
    };
    const startMsg = openings[scenario.context] || "Let's start!";
    messageHistoryRef.current = [
      { role: 'system', content: `You are a friendly native English speaker in this scenario: ${scenario.prompt}. Have a natural conversation. Ask follow-up questions. Be encouraging but realistic. Keep responses to 2-3 sentences maximum. Help the student practice real conversation skills. Topic context: ${weekTopicRef.current}.` }
    ];
    setChatMessages([{ role: 'ai', text: startMsg }]);
    messageHistoryRef.current.push({ role: 'assistant', content: startMsg });
  };

  const generateContextualResponse = (userMsg, history) => {
    const lowerMsg = userMsg.toLowerCase();
    const conversationLength = history.filter(m => m.role === 'user').length;
    
    // Analyze user intent and context
    const isQuestion = lowerMsg.includes('?') || lowerMsg.startsWith('what') || lowerMsg.startsWith('how') || lowerMsg.startsWith('where');
    const isShort = userMsg.split(' ').length < 4;
    
    // Build contextual response based on conversation flow
    let response = "";
    
    if (rolePlayScenario) {
      // Roleplay responses
      const ctx = rolePlayScenario.context;
      if (conversationLength < 3) {
        // Early conversation - encourage details
        if (ctx === 'restaurant') {
          response = isShort ? "Great choice! Would you like that with fries or salad?" : "Sounds delicious! Anything to drink with that?";
        } else if (ctx === 'navigation') {
          response = "Okay, go straight for two blocks and turn left. Do you know the big park?";
        } else if (ctx === 'shopping') {
          response = isShort ? "Perfect! What size do you wear?" : "We have that in several colors. Which one do you like?";
        } else if (ctx === 'social') {
          response = "Nice to meet you! Where are you from?";
        } else if (ctx === 'health') {
          response = "I see. How long have you felt this way?";
        } else {
          response = "Interesting! Can you tell me more about that?";
        }
      } else if (conversationLength < 6) {
        // Mid conversation - keep it going
        response = isQuestion ? "That's a good question! Let me think... yes, absolutely!" : "I understand. What else would you like to know?";
      } else {
        // Wrap up naturally
        response = "Great talking with you! You're doing really well. One more thing - " + (ctx === 'restaurant' ? "how was everything?" : "any other questions?");
      }
    } else {
      // Free chat - week topic focus
      if (lowerMsg.includes('grammar') || lowerMsg.includes('there was') || lowerMsg.includes('there were')) {
        response = `Good question! In "${weekTopicRef.current}", we use past tense. "There WAS" for one thing, "There WERE" for many. Can you make a sentence about the story?`;
      } else if (lowerMsg.includes('vocab') || lowerMsg.includes('word') || lowerMsg.includes('mean')) {
        if (vocabList.length > 0) {
          const word = vocabList[Math.floor(Math.random() * vocabList.length)];
          response = `Let me teach you! "${word.word}" means ${word.definition_en}. Can you use it in a sentence?`;
        } else {
          response = "Ask me about any word you don't understand!";
        }
      } else if (conversationLength < 2) {
        response = `Hi! Let's talk about "${weekTopicRef.current}". What do you think about it?`;
      } else if (conversationLength < 5) {
        response = isShort ? "Interesting! Can you explain more?" : "I like your thinking! What else can you tell me?";
      } else if (conversationLength < 8) {
        response = `Great job practicing! By the way, have you learned any new words from "${weekTopicRef.current}"?`;
      } else {
        response = "You're doing amazing! Want to try a roleplay scenario or keep chatting?";
      }
    }
    
    return response;
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    setChatLoading(true);
    setTurnCount(prev => prev + 1);

    try {
      // Add to conversation memory
      messageHistoryRef.current.push({ role: 'user', content: userMsg });
      
      // Generate contextual response
      const aiResponse = generateContextualResponse(userMsg, messageHistoryRef.current);
      
      setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      messageHistoryRef.current.push({ role: 'assistant', content: aiResponse });
      
      // Speak response (remove emojis)
      speakText(aiResponse.replace(/[🐾✨💪📚]/g, ''));
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = "Sorry, I didn't catch that. Can you say it again?";
      setChatMessages(prev => [...prev, { role: 'ai', text: errorMsg }]);
    }
    setChatLoading(false);
  };

  const handleGrammarAnswer = (selectedAnswer) => {
    if (!grammarExercises || grammarExercises.length === 0) return;
    const exercise = grammarExercises[grammarIndex];
    setGrammarAnswers(prev => ({ ...prev, [exercise.id]: selectedAnswer }));
    
    if (selectedAnswer === exercise.answer) {
      speakText("Correct!");
    } else {
      speakText("Try again!");
    }
  };

  const handleQuizAnswer = (selectedOption) => {
    if (!vocabList || vocabList.length === 0) return;
    const correctWord = vocabList[quizIndex];
    if (selectedOption === correctWord?.definition_en) {
      setQuizScore(prev => prev + 1);
      speakText("Correct!");
    } else {
      speakText("Wrong answer, try next!");
    }
    if (quizIndex < Math.min(vocabList.length - 1, 4)) {
      setQuizIndex(prev => prev + 1);
    }
  };

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center z-[100] border-4 border-white transition-all group hover:scale-110">
        <Bot size={32} className="group-hover:rotate-12 transition-transform"/>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[420px] h-[700px] bg-white rounded-[40px] shadow-2xl flex flex-col z-[100] border-4 border-indigo-50 overflow-hidden animate-in slide-in-from-right-10 duration-300">
      {/* HEADER */}
      <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <BrainCircuit size={24}/>
          <div className="font-black text-sm uppercase">Professor Paws</div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 p-1 rounded-lg transition-all"><X size={20}/></button>
      </div>

      {/* TABS */}
      <div className="flex bg-indigo-50 p-2 gap-1 shrink-0 border-b border-indigo-200">
        {[
          { id: 'chat', icon: MessageCircle, label: 'Chat' },
          { id: 'grammar', icon: BookOpen, label: 'Grammar' },
          { id: 'vocab', icon: Lightbulb, label: 'Vocab' },
          { id: 'quiz', icon: HelpCircle, label: 'Quiz' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-black uppercase transition-all ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            <tab.icon size={14}/>
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
              <div className="text-center py-6 space-y-4">
                <p className="text-3xl mb-2">🐾</p>
                <p className="text-sm font-black text-slate-800">Hi! I'm Professor Paws!</p>
                <p className="text-xs text-slate-600 mt-1 px-4">I can help with grammar, vocabulary, and speaking practice!</p>
                
                {/* Roleplay scenarios */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-black text-indigo-600 uppercase">🎭 Speaking Practice</p>
                  {rolePlayScenarios.map(scenario => (
                    <button
                      key={scenario.id}
                      onClick={() => startRolePlay(scenario)}
                      className="w-full p-2 bg-white border-2 border-indigo-100 rounded-lg text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 transition-all flex items-center justify-between"
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
            {chatMessages.length > 0 && rolePlayScenario && (
              <div className="text-center py-2">
                <button onClick={() => { setRolePlayScenario(null); setChatMessages([]); messageHistoryRef.current = []; }} className="text-xs text-slate-500 hover:text-indigo-600 font-bold">
                  <Shuffle size={12} className="inline mr-1"/>Change Scenario
                </button>
              </div>
            )}
            <div ref={scrollRef} />
          </>
        )}

        {/* GRAMMAR TAB */}
        {activeTab === 'grammar' && (
          <div className="space-y-4">
            {grammarExercises && grammarExercises.length > 0 ? (
              <>
                <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200">
                  <p className="text-xs font-black text-indigo-700 mb-2">EXERCISE {grammarIndex + 1}/{grammarExercises.length}</p>
                  <p className="text-sm font-bold text-slate-800">{grammarExercises[grammarIndex].question}</p>
                  {grammarExercises[grammarIndex].hint && <p className="text-xs text-indigo-600 mt-2 font-bold">💡 {grammarExercises[grammarIndex].hint}</p>}
                </div>
                <div className="space-y-2">
                  {grammarExercises[grammarIndex].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleGrammarAnswer(opt)}
                      className={`w-full p-3 rounded-xl font-bold text-sm transition-all border-2 ${grammarAnswers[grammarExercises[grammarIndex].id] === opt ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {grammarIndex < grammarExercises.length - 1 && (
                  <button onClick={() => setGrammarIndex(prev => prev + 1)} className="w-full bg-indigo-600 text-white p-2 rounded-lg font-black text-xs uppercase hover:bg-indigo-700">
                    Next Exercise
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <BookOpen size={32} className="mx-auto mb-2 opacity-50"/>
                <p className="text-xs font-bold">No grammar exercises available for this week</p>
              </div>
            )}
          </div>
        )}

        {/* VOCAB TAB */}
        {activeTab === 'vocab' && (
          <div className="space-y-3">
            {vocabList && vocabList.length > 0 ? (
              vocabList.map((word, idx) => (
                <div key={idx} className={`bg-white p-3 rounded-xl border-2 ${idx === vocabIndex ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200'}`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-black text-slate-800 text-sm uppercase">{word.word}</p>
                      {word.pronunciation && <p className="text-xs text-slate-500 italic">{word.pronunciation}</p>}
                    </div>
                    <button onClick={() => speakText(word.word)} className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200">
                      <Volume2 size={14}/>
                    </button>
                  </div>
                  {word.definition_en && <p className="text-xs font-bold text-indigo-700 mb-1">EN: {word.definition_en}</p>}
                  {word.definition_vi && <p className="text-xs font-bold text-rose-600 mb-1">VI: {word.definition_vi}</p>}
                  {word.example && <p className="text-xs text-slate-600 italic">Example: {word.example}</p>}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Lightbulb size={32} className="mx-auto mb-2 opacity-50"/>
                <p className="text-xs font-bold">No vocabulary available for this week</p>
              </div>
            )}
          </div>
        )}

        {/* QUIZ TAB */}
        {activeTab === 'quiz' && (
          <div className="space-y-4">
            {vocabList && vocabList.length > 0 ? (
              <>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <p className="text-xs font-black text-amber-700 mb-2">QUESTION {quizIndex + 1}/{Math.min(vocabList.length, 5)}</p>
                  <p className="text-sm font-bold text-slate-800">What does "{vocabList[quizIndex]?.word}" mean?</p>
                </div>
                <div className="space-y-2">
                  {[vocabList[quizIndex]?.definition_en, vocabList[(quizIndex + 1) % vocabList.length]?.definition_en, vocabList[(quizIndex + 2) % vocabList.length]?.definition_en]
                    .filter(Boolean)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(opt)}
                        className="w-full p-3 rounded-xl font-bold text-sm bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-300 transition-all active:scale-95"
                      >
                        {opt}
                      </button>
                    ))}
                </div>
                {quizIndex >= Math.min(vocabList.length - 1, 4) && (
                  <div className="bg-green-50 p-3 rounded-xl border border-green-200 text-center">
                    <p className="text-xs font-black text-green-700">SCORE: {quizScore}/{Math.min(vocabList.length, 5)}</p>
                    <button onClick={() => { setQuizIndex(0); setQuizScore(0); }} className="mt-2 w-full bg-green-600 text-white p-2 rounded-lg font-black text-xs uppercase hover:bg-green-700">
                      Restart Quiz
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <HelpCircle size={32} className="mx-auto mb-2 opacity-50"/>
                <p className="text-xs font-bold">No quiz available for this week</p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* CHAT INPUT (only show in chat tab) */}
      {activeTab === 'chat' && (
        <div className="p-3 bg-white border-t flex gap-2 shrink-0">
          <button
            onClick={toggleVoiceInput}
            className={`p-2.5 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600'}`}
            title="Voice input"
          >
            {isListening ? <MicOff size={16}/> : <Mic size={16}/>}
          </button>
          <input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendChat()}
            placeholder={isListening ? "Listening..." : "Ask me..."}
            className="flex-1 p-2.5 bg-slate-50 border-2 border-slate-200 rounded-[15px] outline-none text-xs font-bold focus:border-indigo-300"
            disabled={isListening}
          />
          <button
            onClick={handleSendChat}
            disabled={chatLoading || isListening}
            className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            {chatLoading ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
          </button>
        </div>
      )}
    </div>
  );
};

export default AITutor;
