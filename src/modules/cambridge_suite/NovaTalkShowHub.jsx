import React, { useState, useEffect } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { Mic, Volume2, Radio, Star, AlertTriangle, MessageSquare, Play, Square, RefreshCw, CheckCircle2 } from 'lucide-react';

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

  // Podcast Shadowing Audio Script
  const shadowingScript = data?.shadowingScript || {
    title: 'Apologizing for Clumsy Mistakes',
    audio_url: '/audio/shadowing_w33.mp3',
    transcript: 'I am so sorry! I broke the clock because I was clumsy in the morning.'
  };

  // Mode 1: Podcast Shadowing Recording Simulation
  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setPodcastScore(null);
    } else {
      setIsRecording(false);
      // Simulate Pronunciation Radar evaluation
      setPodcastScore({
        stars: 3,
        accuracyScore: 92,
        fluencyScore: 88,
        verificationStatus: 'practice_only' // MANDATORY PRACTICE ONLY BADGE
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
      // Auto-lower difficulty tier if student is silent for > 2 turns
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

    // Check dynamic termination criteria (turn 8-20 or maxTurns reached)
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

    // Generate Nova AI response
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
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
        <div>
          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Radio size={14} /> Hub 4: Nova Talk Show & Exam Simulator (W{weekNumber})
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
            Podcast Shadowing & AI Examiner Talk Show
          </h1>
        </div>

        {/* Sub-mode Navigation Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setSubMode('podcast')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
              subMode === 'podcast' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 size={14} /> Podcast Shadowing
          </button>
          <button
            onClick={() => setSubMode('talkshow')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
              subMode === 'talkshow' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare size={14} /> Nova Live Talk Show
          </button>
        </div>
      </div>

      {/* SUB-MODE 1: PODCAST SHADOWING */}
      {subMode === 'podcast' ? (
        <div className="space-y-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-indigo-400 font-bold uppercase">Podcast Studio</span>
              <h3 className="text-xl font-black text-amber-400 mt-1">{shadowingScript.title}</h3>
            </div>

            {/* MANDATORY UNCALIBRATED PRACTICE ONLY BADGE */}
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-mono font-bold flex items-center gap-1">
              <AlertTriangle size={12} /> practice_only
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs text-slate-400 font-bold uppercase mb-2">Transcript Mẫu:</h4>
            <p className="text-lg font-bold text-slate-100 italic">"{shadowingScript.transcript}"</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
            <button
              onClick={handleToggleRecording}
              className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition flex items-center gap-2 shadow-lg ${
                isRecording ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              <Mic size={18} /> {isRecording ? 'Đang Thu Âm (Bấm để dừng)' : 'Bắt Đầu Ghi Âm Nhại Giọng'}
            </button>
          </div>

          {/* Pronunciation Radar Results */}
          {podcastScore && (
            <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-500/40 text-center animate-in fade-in duration-200">
              <h4 className="text-xs text-indigo-300 font-bold uppercase mb-2">Pronunciation Radar Rating:</h4>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(podcastScore.stars)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-200">
                Độ chính xác: <span className="text-emerald-400 font-bold">{podcastScore.accuracyScore}%</span> | Lưu khoát: <span className="text-purple-400 font-bold">{podcastScore.fluencyScore}%</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        /* SUB-MODE 2: NOVA LIVE TALK SHOW (State Machine) */
        <div className="space-y-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-red-400 font-bold uppercase">AI Examiner 1-1 Dialogue</span>
              <h3 className="text-xl font-black text-amber-400 mt-1">Nova Live Talk Show (Turn {turnCount}/{maxTurns})</h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded-lg">
                Difficulty Tier: <span className="text-amber-400 font-bold">{difficultyTier}</span>
              </span>
              {/* MANDATORY PRACTICE ONLY BADGE */}
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-mono font-bold flex items-center gap-1">
                <AlertTriangle size={12} /> practice_only
              </span>
            </div>
          </div>

          {/* Chat History Messages */}
          <div className="space-y-3 max-h-80 overflow-y-auto p-4 bg-slate-950 rounded-xl border border-slate-800">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl max-w-[80%] text-sm font-medium leading-relaxed ${
                  msg.sender === 'nova'
                    ? 'bg-slate-800 text-slate-100 border border-slate-700 self-start'
                    : 'bg-indigo-600 text-white self-end ml-auto'
                }`}
              >
                <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase">
                  {msg.sender === 'nova' ? '🤖 Nova Examiner' : '👤 Student'}
                </div>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Controls */}
          {isTalkshowEnded ? (
            <div className="p-6 bg-slate-950 rounded-2xl border border-amber-500/40 text-center space-y-3">
              <h3 className="text-2xl font-black text-amber-400">🎉 THẺ KẾT QUẢ TẠM THỜI (PRACTICE ONLY)</h3>
              <p className="text-sm text-slate-300">Bạn đã hoàn thành phiên nói hội thoại 1-1 với Nova Examiner!</p>
              <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-mono font-bold">
                Trạng thái: practice_only (Chờ Calibration chính thức)
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={userSpeechInput}
                onChange={(e) => setUserSpeechInput(e.target.value)}
                placeholder="Trả lời bằng giọng nói / gõ văn bản..."
                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
              />
              <button
                onClick={() => handleSendTalkshowMessage(userSpeechInput)}
                className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm transition shadow-md"
              >
                Gửi câu trả lời
              </button>
              <button
                onClick={() => handleSendTalkshowMessage('')}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold rounded-xl text-xs transition"
                title="Giả lập im lặng để test tự hạ độ khó"
              >
                (Bỏ qua / Im lặng)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
