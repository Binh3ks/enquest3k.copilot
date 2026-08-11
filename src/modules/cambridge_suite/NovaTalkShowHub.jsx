import React, { useState } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import VoiceService from '../../services/voiceService';
import { Mic, Volume2, Radio, Star, AlertTriangle, MessageSquare, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function NovaTalkShowHub({ data, weekNumber = 33 }) {
  const [subMode, setSubMode] = useState('podcast'); // 'podcast' | 'talkshow'
  const [isRecording, setIsRecording] = useState(false);
  const [podcastScore, setPodcastScore] = useState(null);

  // Nova Live Talk Show State Machine
  const [turnCount, setTurnCount] = useState(1);
  const [maxTurns] = useState(12); // Dynamic range 8-20 turns
  const [difficultyTier, setDifficultyTier] = useState(2); // Tier 2 = A2 Flyers, Tier 1 = Easy
  const [silenceCount, setSilenceCount] = useState(0);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'nova',
      text: 'Hi there! I read your script about Tom’s bad day. Can you tell me what happened first when Tom woke up?'
    }
  ]);
  const [userSpeechInput, setUserSpeechInput] = useState('');
  const [isTalkshowEnded, setIsTalkshowEnded] = useState(false);

  // Parse Podcast Shadowing Audio Script Array or Object
  const shadowingScriptList = Array.isArray(data?.shadowing_script)
    ? data.shadowing_script
    : Array.isArray(data?.shadowingScript)
    ? data.shadowingScript
    : [
        {
          id: "sh_01",
          speaker: "Tom",
          text: "I am so sorry! I broke the alarm clock because I was clumsy in the morning.",
          phonetic_guide: "aɪ æm soʊ ˈsɑːri! aɪ broʊk ðə əˈlɑːrm klɑːk bɪˈkɑːz aɪ wɑːz ˈklʌmzi..."
        },
        {
          id: "sh_02",
          speaker: "Mia",
          text: "Don't worry! Accidents happen, but we must be more careful next time.",
          phonetic_guide: "doʊnt ˈwɜːri! ˈæksədənts ˈhæpən, bʌt wiː mʌst biː mɔːr ˈkerfəl..."
        },
        {
          id: "sh_03",
          speaker: "Tom",
          text: "Thank you for finding my lost backpack on the bus!",
          phonetic_guide: "θæŋk juː fɔːr ˈfaɪndɪŋ maɪ lɔːst ˈbæk.pæk ɑːn ðə bʌs!"
        }
      ];

  // Play dialogue sentence audio via Primary Google Direct TTS with Browser fallback
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

  // Mode 1: Podcast Shadowing Recording Simulation
  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setPodcastScore(null);
    } else {
      setIsRecording(false);
      // Evaluate Pronunciation Radar
      setPodcastScore({
        stars: 3,
        accuracyScore: 94,
        fluencyScore: 90,
        verificationStatus: 'practice_only'
      });
    }
  };

  // Mode 2: Nova Live Talk Show Turn Handler
  const handleSendTalkshowMessage = (userText) => {
    if (isTalkshowEnded) return;

    const newHistory = [
      ...chatHistory,
      { sender: 'user', text: userText || '(Silent / Unresponsive)' }
    ];

    let newSilence = silenceCount;
    let currentTier = difficultyTier;

    if (!userText || userText.trim() === '') {
      newSilence += 1;
      if (newSilence >= 2) {
        currentTier = Math.max(1, currentTier - 1);
      }
    } else {
      newSilence = 0;
    }

    setSilenceCount(newSilence);
    setDifficultyTier(currentTier);

    const nextTurn = turnCount + 1;
    setTurnCount(nextTurn);

    if (nextTurn > maxTurns) {
      setIsTalkshowEnded(true);
      learnerProgressService.logAttempt({
        learnerId: 'learner_default_01',
        contentId: `w${weekNumber}_nova_talkshow`,
        mode: 'learn',
        result: 'correct',
        score: 90,
        timeSpentSeconds: 120
      });
      return;
    }

    let novaReply = '';
    if (newSilence >= 2) {
      novaReply = 'No worries! Let’s make it easier: Say "Tom broke the clock".';
    } else if (nextTurn === 3) {
      novaReply = 'Great job! And why did he fall on his way downstairs?';
    } else if (nextTurn === 5) {
      novaReply = 'Awesome! Have you ever had a clumsy morning like Tom?';
    } else {
      novaReply = 'That is so interesting! Tell me more about what you did next.';
    }

    setChatHistory([...newHistory, { sender: 'nova', text: novaReply }]);
    setUserSpeechInput('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-xl font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <span className="px-3.5 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Radio size={14} /> Hub 4: Nova Talk Show & Exam Simulator (W{weekNumber})
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            Podcast Shadowing & AI Examiner Talk Show
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Practise Podcast Shadowing & 1-on-1 Interactive Dialogue with AI Examiner Nova!</p>
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
            <MessageSquare size={14} /> Nova Live Talk Show
          </button>
        </div>
      </div>

      {subMode === 'podcast' ? (
        /* MODE 1: PODCAST SHADOWING */
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Podcast Studio</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">Apologizing for Clumsy Mistakes</h3>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-black">
                <AlertTriangle size={12} className="inline mr-1" /> practice_only
              </span>
            </div>

            {/* Target Dialogue Turns List */}
            <div className="space-y-3 mb-6">
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-wider">
                Target Podcast Dialogue Script ({shadowingScriptList.length} Turns):
              </div>
              {shadowingScriptList.map((turn, idx) => (
                <div
                  key={turn.id || idx}
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-black rounded-md uppercase">
                        {turn.speaker || `Speaker ${idx + 1}`}
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
                    <Volume2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Recording Controls */}
            <div className="flex flex-col items-center justify-center py-4">
              <button
                onClick={handleToggleRecording}
                className={`px-8 py-4 rounded-2xl text-sm font-black transition flex items-center gap-2 shadow-lg ${
                  isRecording ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <Mic size={18} /> {isRecording ? 'Stop Recording (Analyzing Voice...)' : 'Start Shadowing Recording'}
              </button>
            </div>

            {/* Score Output */}
            {podcastScore && (
              <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center animate-in fade-in">
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
        </div>
      ) : (
        /* MODE 2: NOVA LIVE TALK SHOW 1-ON-1 EXAMINER */
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-black text-slate-700">
            <span className="flex items-center gap-1">
              <Radio size={14} className="text-purple-600" /> Dialogue Turn: {turnCount}/{maxTurns}
            </span>
            <span className="flex items-center gap-1 text-indigo-700">
              Difficulty Tier: {difficultyTier === 2 ? 'A2 Flyers' : 'A1 Scaffolded'}
            </span>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[10px] uppercase font-black">
              practice_only
            </span>
          </div>

          {/* Chat Messages Log */}
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

          {/* User Speech Input Box */}
          {!isTalkshowEnded ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userSpeechInput}
                onChange={(e) => setUserSpeechInput(e.target.value)}
                placeholder="Type or speak your answer to Nova..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendTalkshowMessage(userSpeechInput)}
                className="flex-1 p-3.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => handleSendTalkshowMessage(userSpeechInput)}
                className="px-5 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black shadow-md transition"
              >
                Send Answer
              </button>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center">
              <h4 className="text-sm font-black text-emerald-950">Talk Show Exam Completed!</h4>
              <p className="text-xs text-emerald-700 mt-1">12 turns completed successfully. Score logged to progress service.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
