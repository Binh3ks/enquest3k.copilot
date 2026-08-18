import React, { useState, useRef } from 'react';
import { MessageSquare, Mic, MicOff, Volume2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Trophy, Send, HelpCircle, Lightbulb } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';
import CompletionModal from '../common/CompletionModal';

export default function AIDebateMode({ debateTopics, weekNumber = 33 }) {
  const defaultTopic = {
    id: "debate_w33_01",
    topic_title: "School Corridors: Free Running or Strict Walking?",
    nova_statement: "I believe students should be allowed to run freely in school corridors because rushing helps everyone get to science class on time and burns excess energy!",
    expected_counter_points: ["Slippery floors cause dangerous accidents", "Running bumps into smaller students", "Walking calmly prevents injuries"],
    suggested_discourse_markers: ["I disagree with Nova because...", "In my opinion, safety is more important...", "For example, running on wet tiles causes slips..."],
    sample_rebuttal: "I disagree with Nova because running fast on polished floors creates low friction. When students rush, they lose balance and hurt themselves or others."
  };

  const topic = (debateTopics && debateTopics[0]) || defaultTopic;

  const [isPlayingNova, setIsPlayingNova] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userSpeechText, setUserSpeechText] = useState('');
  const [debateScore, setDebateScore] = useState(null);
  const [showSampleHint, setShowSampleHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const recognitionRef = useRef(null);

  const handlePlayNova = async () => {
    setIsPlayingNova(true);
    try {
      await VoiceService.speak(topic.nova_statement, 'ask_ai');
    } catch (_) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(topic.nova_statement);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } finally {
      setIsPlayingNova(false);
    }
  };

  const handleToggleMic = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (_) {}
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please type your argument in the box.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript + ' ';
      }
      setUserSpeechText(finalTranscript.trim());
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleEvaluateRebuttal = () => {
    const text = userSpeechText.trim();
    if (!text) return;

    const words = text.split(/\s+/).filter(Boolean);
    const lower = text.toLowerCase();

    // ── C.R.E DEBATE RUBRIC ENGINE (Official Pedagogical Standard) ──
    // Tiêu chí 1: Claim (Lập trường - 30%)
    const hasPosition = /\b(i\s+disagree|i\s+agree|my\s+opinion|i\s+believe|i\s+think|my\s+view|i\s+strongly)\b/i.test(lower);
    const claimScore = hasPosition ? 30 : 10;

    // Tiêu chí 2: Reason (Lý do nhân quả - 40%)
    const hasReason = /\b(because|so\s+that|since|due\s+to|as\s+a\s+result|therefore|for\s+this\s+reason)\b/i.test(lower);
    const reasonScore = hasReason ? 40 : 10;

    // Tiêu chí 3: Evidence / Science Context (Dẫn chứng thực tế - 30%)
    const hasEvidence = /\b(friction|slip|slipped|wet\s+floor|puddle|dangerous|accident|hazard|rubber|grip|sock|wood|injury|hurt|safe|rules?)\b/i.test(lower);
    const evidenceScore = hasEvidence ? 30 : 10;

    // Depth booster
    const wordCount = words.length;
    const totalScore = Math.min(100, claimScore + reasonScore + evidenceScore);

    // Pedagogical Feedback Generation (Nova Coaching)
    let aiFeedback = "";
    if (!hasPosition) {
      aiFeedback = "⚠️ Chưa rõ lập trường: Con hãy bắt đầu bằng 'I disagree with Nova because...' hoặc 'In my opinion...' để nêu rõ quan điểm.";
    } else if (!hasReason) {
      aiFeedback = "⚠️ Thiếu từ nối giải thích: Lập trường của con rất tốt, nhưng hãy thêm từ nối 'because' hoặc 'since' để giải thích nguyên nhân rõ ràng hơn.";
    } else if (!hasEvidence) {
      aiFeedback = "⚠️ Cần thêm dẫn chứng thực tế: Lập luận tốt! Hãy bổ sung thêm từ khóa về khoa học ma sát (friction, wet floor, rubber shoes) để bài phản biện thuyết phục hơn.";
    } else {
      aiFeedback = "🌟 Xuất sắc! Luận điểm chuẩn mực C.R.E: Có lập trường rõ ràng (Claim), giải thích nguyên nhân logic (Reason), và dẫn chứng ma sát thực tế (Evidence).";
    }

    const result = {
      score: totalScore,
      claimScore,
      reasonScore,
      evidenceScore,
      hasPosition,
      hasReason,
      hasEvidence,
      wordCount,
      aiFeedback
    };

    setDebateScore(result);
    if (totalScore >= 70) {
      setIsCompleted(true);
      fireCelebrationConfetti('AIDebate_Complete');
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(60);
    }
  };

  const handleRestart = () => {
    setUserSpeechText('');
    setDebateScore(null);
    setIsCompleted(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-md font-sans text-slate-900 space-y-6">
      <CompletionModal
        isOpen={isCompleted}
        onClose={() => setIsCompleted(false)}
        score={debateScore?.score || 100}
        stars={3}
        xpEarned={60}
        activityTitle="AI Debate Arena Challenge"
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-wrap gap-2">
        <div>
          <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider flex items-center gap-1">
            <MessageSquare size={13} /> AI DEBATE ARENA — CRITICAL DISCOURSE
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">{topic.topic_title}</h3>
        </div>
        {debateScore && (
          <button
            onClick={handleRestart}
            className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-black rounded-xl border border-purple-200 flex items-center gap-1 transition"
          >
            <RefreshCw size={12} /> Debate Again
          </button>
        )}
      </div>

      {/* Nova's Provocative Statement Card */}
      <div className="p-5 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl shadow-xl border border-purple-800/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-black text-xs text-white shadow-md">
              🤖
            </span>
            <span className="text-xs font-black text-purple-200 uppercase tracking-wide">
              Nova's Opening Argument:
            </span>
          </div>

          <button
            onClick={handlePlayNova}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              isPlayingNova ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <Volume2 size={14} /> {isPlayingNova ? 'Speaking...' : 'Listen to Nova'}
          </button>
        </div>

        <p className="text-base sm:text-lg font-bold leading-relaxed text-purple-50 italic">
          &ldquo;{topic.nova_statement}&rdquo;
        </p>
      </div>

      {/* Student Counter-Argument Studio */}
      <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" />
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">
              Your Counter-Rebuttal (Phản biện của bạn):
            </h4>
          </div>

          <button
            onClick={() => setShowSampleHint(!showSampleHint)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <Lightbulb size={13} /> {showSampleHint ? 'Hide Guidance' : 'Sentence Starters & Guidance'}
          </button>
        </div>

        {showSampleHint && (
          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200 text-xs text-indigo-950 space-y-2 animate-in fade-in">
            <div className="font-bold uppercase tracking-wider text-indigo-800">Useful Discourse Phrases:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              {topic.suggested_discourse_markers.map((m, idx) => (
                <li key={idx} className="font-medium font-mono">{m}</li>
              ))}
            </ul>
            <div className="pt-1 text-slate-500 italic">
              💡 Model example: &ldquo;{topic.sample_rebuttal}&rdquo;
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="space-y-3">
          <textarea
            rows={4}
            value={userSpeechText}
            onChange={(e) => setUserSpeechText(e.target.value)}
            placeholder="Record your speech or type your counter-argument here (e.g., 'I disagree with Nova because running on wet tiles causes severe accidents...')..."
            className="w-full p-4 bg-white rounded-2xl border border-slate-300 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          />

          <div className="flex items-center justify-between flex-wrap gap-2">
            <button
              onClick={handleToggleMic}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
              }`}
            >
              {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
              {isRecording ? 'Stop Recording' : '🎤 Speak Argument (Micro)'}
            </button>

            <button
              onClick={handleEvaluateRebuttal}
              disabled={!userSpeechText.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md transition flex items-center gap-2 active:scale-95"
            >
              <Send size={14} /> Submit & Analyze Argument
            </button>
          </div>
        </div>
      </div>

      {/* AI Argument Evaluation Scorecard (C.R.E Standard) */}
      {debateScore && (
        <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50/60 rounded-3xl border border-purple-200 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="text-amber-500" size={18} />
              <h4 className="text-sm font-black text-purple-950 uppercase tracking-wide">
                AI Debate Scorecard (C.R.E Standard): {debateScore.score}/100
              </h4>
            </div>
            <span className="px-2.5 py-0.5 bg-purple-200 text-purple-900 rounded-md font-mono text-xs font-black">
              {debateScore.wordCount} words
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
            <div className={`p-2.5 rounded-xl border ${debateScore.hasPosition ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
              <span className="block text-[10px] font-black uppercase text-slate-500">1. Claim (30%)</span>
              {debateScore.hasPosition ? '✅ Clear Position' : '❌ Missing Position'}
            </div>
            <div className={`p-2.5 rounded-xl border ${debateScore.hasReason ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
              <span className="block text-[10px] font-black uppercase text-slate-500">2. Reason (40%)</span>
              {debateScore.hasReason ? '✅ Causal Connectors' : '❌ Missing "because"'}
            </div>
            <div className={`p-2.5 rounded-xl border ${debateScore.hasEvidence ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
              <span className="block text-[10px] font-black uppercase text-slate-500">3. Evidence (30%)</span>
              {debateScore.hasEvidence ? '✅ Science Evidence' : '❌ Missing CLIL Words'}
            </div>
          </div>

          <div className="text-xs font-semibold text-purple-950 bg-white/90 p-3.5 rounded-2xl border border-purple-200 shadow-sm leading-relaxed">
            {debateScore.aiFeedback}
          </div>
        </div>
      )}
    </div>
  );
}
