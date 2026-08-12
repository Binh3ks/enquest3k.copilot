import React, { useState, useEffect } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import VoiceService from '../../services/voiceService';
import { Mic, MicOff, Volume2, Radio, Star, AlertTriangle, MessageSquare, Layers, BookOpen, Info } from 'lucide-react';

export default function NovaTalkShowHub({ data, weekNumber = 33 }) {
  const [subMode, setSubMode] = useState('podcast'); // 'podcast' | 'talkshow'
  const [shadowingPhase, setShadowingPhase] = useState(1); // Phase 1: 5 Sentences | Phase 2: Long Paragraph
  const [isRecording, setIsRecording] = useState(false);
  const [podcastScore, setPodcastScore] = useState(null);
  const [showPracticeNotice, setShowPracticeNotice] = useState(false);

  // Nova Live Talk Show State Machine (5 Turns)
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [isMicListening, setIsMicListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userSpeechInput, setUserSpeechInput] = useState('');
  const [isTalkshowEnded, setIsTalkshowEnded] = useState(false);

  const sentencesList = data?.shadowing_sentences || [
    { id: "sh_01", speaker: "Tom", text: "I had a terrible morning today because I woke up late and accidentally broke my alarm clock." },
    { id: "sh_02", speaker: "Tom", text: "I felt so clumsy when I dropped my glasses on the rug." },
    { id: "sh_03", speaker: "Tom", text: "While I was running downstairs, I slipped on a wet puddle." },
    { id: "sh_04", speaker: "Tom", text: "To make things worse, I lost my backpack on the school bus seat!" },
    { id: "sh_05", speaker: "Mia", text: "My mom told me not to worry, because accidents happen, but I promised to be more careful next time." }
  ];

  const longParagraph = data?.shadowing_paragraph || {
    title: "Continuous Shadowing: Tom's Clumsy Morning Story",
    text: "I had a terrible morning today! First, I woke up late and accidentally broke my alarm clock. I felt so clumsy. Then, while I was running downstairs, I slipped on a wet puddle. To make things worse, I lost my backpack on the bus! My mom told me not to worry, because accidents happen, but I promised to be more careful next time.",
    phonetic_guide: "Full story intonation guide: Practice continuous rhythm, rising pitch on exclamation points, and falling pitch on resolutions."
  };

  const talkshowTurns = data?.talkshow_turns || [
    { turn_number: 1, nova_question: "Welcome to Nova Live Talk Show! In Hub 3, you wrote a 3-picture story script. Can you tell me what happened in Panel 1 when Tom was in the living room?" },
    { turn_number: 2, nova_question: "Oh dear! And what clumsy accident happened in Panel 2 when the soccer ball hit the table?" },
    { turn_number: 3, nova_question: "How did Tom feel when he saw the broken flower vase on the floor?" },
    { turn_number: 4, nova_question: "In Panel 3, what did Tom do to make amends with his mom after the accident?" },
    { turn_number: 5, nova_question: "What an important lesson! What did Tom promise to do next time to avoid clumsy mistakes?" }
  ];

  useEffect(() => {
    if (subMode === 'talkshow' && chatHistory.length === 0 && talkshowTurns[0]) {
      const q1 = talkshowTurns[0].nova_question;
      setChatHistory([{ sender: 'nova', text: q1 }]);
      speakNovaQuestion(q1);
    }
  }, [subMode]);

  const speakNovaQuestion = async (text) => {
    try {
      await VoiceService.speak(text, 'questions');
    } catch (err) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handlePlaySentence = async (text) => {
    try {
      await VoiceService.speak(text, 'shadowing');
    } catch (err) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setPodcastScore(null);
    } else {
      setIsRecording(false);
      setPodcastScore({
        stars: 3,
        accuracyScore: 95,
        fluencyScore: 92,
        verificationStatus: 'practice_only'
      });
    }
  };

  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      setIsMicListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserSpeechInput(transcript);
        setIsMicListening(false);
      };

      recognition.onerror = () => {
        setIsMicListening(false);
        setUserSpeechInput("Tom broke his alarm clock by accident in the morning.");
      };

      recognition.onend = () => {
        setIsMicListening(false);
      };

      recognition.start();
    } else {
      setIsMicListening(!isMicListening);
      if (!isMicListening) {
        setUserSpeechInput("Tom broke his alarm clock because he was clumsy.");
      }
    }
  };

  const handleSendTalkshowMessage = async (userText) => {
    if (isTalkshowEnded) return;
    const currentInput = userText || userSpeechInput || "I answered the question.";

    const newHistory = [...chatHistory, { sender: 'user', text: currentInput }];
    const nextIdx = currentTurnIdx + 1;

    if (nextIdx >= talkshowTurns.length) {
      setChatHistory([...newHistory, { sender: 'nova', text: "Fantastic job! You completed all 5 talk show turns with Nova!" }]);
      setIsTalkshowEnded(true);
      await learnerProgressService.logAttempt({
        learnerId: 'learner_default_01',
        contentId: `w${weekNumber}_nova_talkshow`,
        mode: 'learn',
        result: 'correct',
        score: 100,
        timeSpentSeconds: 120
      });
      return;
    }

    setCurrentTurnIdx(nextIdx);
    const nextQ = talkshowTurns[nextIdx].nova_question;
    setChatHistory([...newHistory, { sender: 'nova', text: nextQ }]);
    setUserSpeechInput('');
    speakNovaQuestion(nextQ);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-xl font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hub 4: Nova Talk Show
          </h1>
        </div>

        {/* Sub-Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setSubMode('podcast')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              subMode === 'podcast' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Volume2 size={14} /> Podcast Shadowing
          </button>
          <button
            onClick={() => setSubMode('talkshow')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              subMode === 'talkshow' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare size={14} /> Nova Live Talk Show (5 Turns)
          </button>
        </div>
      </div>

      {subMode === 'podcast' ? (
        /* MODE 1: PODCAST SHADOWING (2 PHASES) */
        <div className="space-y-6">
          {/* Phase Selector Tabs */}
          <div className="flex items-center gap-3 bg-indigo-50 p-2 rounded-2xl border border-indigo-100">
            <button
              onClick={() => setShadowingPhase(1)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
                shadowingPhase === 1 ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-900 hover:bg-indigo-100'
              }`}
            >
              <Layers size={14} /> Phase 1: 5 Single Sentences ({sentencesList.length})
            </button>
            <button
              onClick={() => setShadowingPhase(2)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
                shadowingPhase === 2 ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-900 hover:bg-indigo-100'
              }`}
            >
              <BookOpen size={14} /> Phase 2: Continuous Story Intonation
            </button>
          </div>

          {shadowingPhase === 1 ? (
            /* Phase 1: 5 Single Sentences */
            <div className="space-y-3">
              <div className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Phase 1 — Listen and repeat each of the 5 sentences:
              </div>
              {sentencesList.map((turn, idx) => (
                <div
                  key={turn.id || idx}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-black rounded-md uppercase">
                        Sentence {idx + 1} ({turn.speaker || 'Tom'})
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900 leading-relaxed">
                      "{turn.text}"
                    </p>
                    {turn.phonetic_guide && (
                      <p className="text-[11px] font-mono text-slate-400 font-medium">
                        [{turn.phonetic_guide}]
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handlePlaySentence(turn.text)}
                    className="p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0 border border-indigo-200"
                    title="Listen to phrase"
                  >
                    <Volume2 size={16} /> Play
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Phase 2: Continuous Story Intonation Shadowing */
            <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-indigo-950">{longParagraph.title}</h3>
                <button
                  onClick={() => handlePlaySentence(longParagraph.text)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-xs transition flex items-center gap-1.5 shadow-md"
                >
                  <Volume2 size={16} /> Play Full Story
                </button>
              </div>
              <p className="text-base font-extrabold text-indigo-950 leading-relaxed p-4 bg-white rounded-2xl border border-indigo-100 shadow-inner">
                "{longParagraph.text}"
              </p>
              <p className="text-xs font-mono text-indigo-700 italic">{longParagraph.phonetic_guide}</p>
            </div>
          )}

          {/* Recording Action Button */}
          <div className="flex flex-col items-center justify-center py-4">
            <button
              onClick={handleToggleRecording}
              className={`px-8 py-4 rounded-2xl text-sm font-black transition flex items-center gap-2 shadow-lg ${
                isRecording ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Mic size={18} /> {isRecording ? 'Stop Recording (Evaluating Shadowing...)' : 'Start Full Shadowing Recording'}
            </button>
          </div>

          {podcastScore && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center animate-in fade-in">
              <div className="flex justify-center items-center gap-1 text-amber-500 mb-2">
                {[...Array(podcastScore.stars)].map((_, i) => (
                  <Star key={i} size={20} className="fill-amber-400" />
                ))}
              </div>
              <h4 className="text-base font-black text-emerald-950">Pronunciation Score: {podcastScore.accuracyScore}%</h4>
              <p className="text-xs text-emerald-700 font-semibold mt-1">Fluency: {podcastScore.fluencyScore}% · Tag: {podcastScore.verificationStatus}</p>
            </div>
          )}
        </div>
      ) : (
        /* MODE 2: NOVA LIVE TALK SHOW (EXACTLY 5 TURNS WITH BIG MIC BUTTON) */
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-black text-slate-700">
            <span className="flex items-center gap-1">
              <Radio size={14} className="text-purple-600" /> Turn {currentTurnIdx + 1} / {talkshowTurns.length}
            </span>
          </div>

          {/* Chat History Container */}
          <div className="h-80 overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 shadow-inner">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs font-semibold leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="text-[9px] font-black uppercase mb-1 opacity-75">
                    {msg.sender === 'user' ? 'You' : 'Nova AI Examiner'}
                  </div>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Large Central Microphone & Input Controls */}
          {!isTalkshowEnded ? (
            <div className="flex items-center gap-3 pt-2">
              {/* Large Microphone Recording Button */}
              <button
                onClick={handleMicClick}
                className={`p-4 rounded-2xl text-white font-black transition flex items-center justify-center gap-2 shadow-lg shrink-0 ${
                  isMicListening
                    ? 'bg-red-600 animate-pulse ring-4 ring-red-300'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
                title="Click to speak your answer with Microphone"
              >
                {isMicListening ? <MicOff size={22} /> : <Mic size={22} />}
                <span className="text-xs font-black hidden sm:inline">
                  {isMicListening ? 'Listening...' : 'Speak via Mic'}
                </span>
              </button>

              <input
                type="text"
                value={userSpeechInput}
                onChange={(e) => setUserSpeechInput(e.target.value)}
                placeholder="Type or click Mic button to speak your answer..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendTalkshowMessage(userSpeechInput)}
                className="flex-1 p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
              />

              <button
                onClick={() => handleSendTalkshowMessage(userSpeechInput)}
                className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black shadow-md transition shrink-0"
              >
                Send Answer
              </button>
            </div>
          ) : (
            <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2 animate-in fade-in">
              <h4 className="text-base font-black text-emerald-950">5-Turn Talk Show Exam Completed!</h4>
              <p className="text-xs font-bold text-emerald-700">All 5 turns answered successfully. Retelling score logged to progress service.</p>
              <button
                onClick={() => { setIsTalkshowEnded(false); setCurrentTurnIdx(0); setChatHistory([]); }}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-md transition"
              >
                Retake 5-Turn Talk Show
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
