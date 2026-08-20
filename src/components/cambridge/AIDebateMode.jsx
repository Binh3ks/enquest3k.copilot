import React, { useState, useRef, useMemo } from 'react';
import { MessageSquare, Mic, MicOff, Volume2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Trophy, Send, HelpCircle, Lightbulb, Award } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';
import CompletionModal from '../common/CompletionModal';

export default function AIDebateMode({ debateTopics, weekNumber = 33, ageModeOverride = null }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const userAge = currentUser?.age || currentUser?.childAge || 7;
  const isModeA = ageModeOverride ? ageModeOverride === 'modeA' : userAge <= 8; // Mode A: 6-8yo, Mode B: 9-10yo

  const defaultTopic = {
    id: "debate_w33_01",
    topic_title: isModeA ? "Corridor Safety: Sharing Ideas on Walking vs Running" : "School Corridors: Running vs Walking Debate",
    nova_statement: isModeA 
      ? "Running in the corridor is fast and fun! Why do you think walking carefully might be a better idea?" 
      : "I think running in the corridor is fun! It is a great way to get to the playground quickly and play with friends.",
    expected_counter_points: ["Running on wet floors causes dangerous slips", "You can bump into friends", "Walking calmly keeps everyone safe"],
    suggested_discourse_markers: isModeA ? [
      "I think it's safer to...",
      "I have a different idea because...",
      "One reason is..."
    ] : [
      "I understand your point, but...",
      "I disagree with Nova because...",
      "In my opinion, if a student...",
      "For example, walking carefully..."
    ],
    sample_rebuttal: isModeA 
      ? "I think it's safer to walk because the floor can be wet and slippery."
      : "I understand your point, but running inside is dangerous. If the floor is wet, you can slip, fall down, and hurt your knee."
  };

  const topic = (debateTopics && debateTopics[0]) || defaultTopic;

  const [isPlayingNova, setIsPlayingNova] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userSpeechText, setUserSpeechText] = useState('');
  const [debateScore, setDebateScore] = useState(null);
  const [showSampleHint, setShowSampleHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [debateStep, setDebateStep] = useState(1); // 1=Position, 2=Build, 3=Deliver
  const [selectedPosition, setSelectedPosition] = useState(null); // 'agree'|'disagree'
  const [showModelDialogue, setShowModelDialogue] = useState(false);
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
      alert('Speech Recognition is not supported in this browser. Please type your idea in the box.');
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
    const wordCount = words.length;

    if (isModeA) {
      // ── MODE A (6-8yo): Encouraging Opinion Sharing Rubric ──
      const hasIdea = wordCount >= 3;
      const hasReason = /\b(because|so|to|since|causes|makes)\b/i.test(lower);
      const totalScore = Math.min(100, (hasIdea ? 60 : 30) + (hasReason ? 40 : 20));

      const result = {
        score: totalScore,
        claimScore: 50,
        reasonScore: 50,
        evidenceScore: 0,
        hasPosition: true,
        hasReason,
        hasEvidence: true,
        wordCount,
        aiFeedback: "🌟 Wonderful idea sharing! Nova loves your thoughtful suggestion for keeping the corridor safe!"
      };

      setDebateScore(result);
      setIsCompleted(true);
      fireCelebrationConfetti('AIDebate_Complete');
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(50);
      return;
    }

    // ── MODE B (9-10yo): C.R.E DEBATE RUBRIC ENGINE (A2 Flyers Standard) ──
    if (wordCount < 5) {
      setDebateScore({
        score: 30,
        claimScore: 10,
        reasonScore: 10,
        evidenceScore: 10,
        hasPosition: false,
        hasReason: false,
        hasEvidence: false,
        wordCount,
        aiFeedback: "⚠️ Argument too short: Please speak or write a complete sentence explaining your viewpoint."
      });
      return;
    }

    // Criteria 1: Claim / Position (30%)
    const hasPosition = /\b(i\s+disagree|i\s+understand|i\s+do\s+not\s+agree|i\s+agree|my\s+opinion|i\s+believe|i\s+think|my\s+view)\b/i.test(lower);
    const claimScore = hasPosition ? 30 : 0;

    // Criteria 2: Reason / Causal Connectors (40%)
    const hasReason = /\b(because|so\s+that|since|due\s+to|as\s+a\s+result|therefore|however|on\s+the\s+other\s+hand)\b/i.test(lower);
    const reasonScore = hasReason ? 40 : 10;

    // Criteria 3: Evidence / Safety Context (30%)
    const hasEvidence = /\b(friction|slip|slipped|slippery|wet\s+floor|puddle|dangerous|danger|accident|hazard|rubber|grip|sock|wood|injury|hurt|fall|fall\s+down|safe|safety|rules?|nurse|bandage)\b/i.test(lower);
    const evidenceScore = hasEvidence ? 30 : 10;

    const totalScore = Math.min(100, claimScore + reasonScore + evidenceScore);

    let aiFeedback = "";
    if (!hasPosition) {
      aiFeedback = "⚠️ Unclear Position: Start with 'I understand your point, but...' or 'In my opinion...' to state your position clearly.";
    } else if (!hasReason) {
      aiFeedback = "⚠️ Missing Causal Reason: Good position! Add 'because' or 'however' to explain why running in corridors is unsafe.";
    } else if (!hasEvidence) {
      aiFeedback = "⚠️ Needs Safety Evidence: Good reasoning! Add a real example like 'slip on wet floor' or 'hurt knee' to support your argument.";
    } else {
      aiFeedback = "🌟 Brilliant C.R.E Debate! You clearly stated your position (Claim), explained why (Reason), and supported it with safety facts (Evidence).";
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

  const modeAStarters = [
    "I think it's safer to...",
    "I have a different idea because...",
    "One reason is..."
  ];

  const activeStarters = isModeA ? modeAStarters : (topic.suggested_discourse_markers || [
    "I understand your point, but...",
    "I disagree with Nova because...",
    "In my opinion, if a student...",
    "For example, walking carefully..."
  ]);

  // ─── Argument Meter: Real-time C.R.E detection ────────────────────────────
  const argumentMeter = useMemo(() => {
    const lower = userSpeechText.toLowerCase();
    const hasClaim = /\b(i\s+disagree|i\s+understand|i\s+think|i\s+believe|my\s+opinion|in\s+my\s+opinion|i\s+have\s+a\s+different)\b/i.test(lower);
    const hasReason = /\b(because|so\s+that|since|due\s+to|as\s+a\s+result|therefore|however|on\s+the\s+other\s+hand)\b/i.test(lower);
    const hasEvidence = /\b(slip|slippery|wet\s+floor|dangerous|accident|rubber|nurse|bandage|safe|safety|friction|hurt|fall)\b/i.test(lower);
    // "Good Listener" badge: starts with acknowledgement of Nova's point
    const isGoodListener = /^(i\s+understand|that[''']?s\s+true|i\s+see\s+your|good\s+point)/i.test(lower.trim());
    return { hasClaim, hasReason, hasEvidence, isGoodListener };
  }, [userSpeechText]);

  // Mode A argument meter (Idea + Reason only)
  const modeAMeter = useMemo(() => {
    const lower = userSpeechText.toLowerCase();
    const hasIdea = userSpeechText.trim().length > 5;
    const hasReason = /\b(because|so|to|since|safer|better|help)\b/i.test(lower);
    return { hasIdea, hasReason };
  }, [userSpeechText]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-purple-200 shadow-md font-sans text-slate-900 space-y-6">
      <CompletionModal
        isOpen={isCompleted}
        onClose={() => setIsCompleted(false)}
        score={debateScore?.score || 100}
        stars={3}
        xpEarned={isModeA ? 50 : 60}
        activityTitle={isModeA ? "Opinion Sharing Circle" : "AI Debate Arena Challenge"}
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare size={13} /> {isModeA ? '💬 OPINION SHARING CIRCLE (AGES 6-8)' : '⚔️ AI DEBATE ARENA (AGES 9-10)'}
            </span>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md text-[10px] font-bold">
              {isModeA ? 'Mode A: Gentle Circle' : 'Mode B: C.R.E Debate'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">{topic.topic_title}</h3>
        </div>
        {debateScore && (
          <button
            onClick={handleRestart}
            className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-black rounded-xl border border-purple-200 flex items-center gap-1 transition"
          >
            <RefreshCw size={12} /> {isModeA ? 'Share Again' : 'Debate Again'}
          </button>
        )}
      </div>

      {/* Nova's Provocative / Encouraging Statement Card */}
      <div className="p-5 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl shadow-xl border border-purple-800/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-black text-xs text-white shadow-md">
              🤖
            </span>
            <span className="text-xs font-black text-purple-200 uppercase tracking-wide">
              {isModeA ? "Nova's Question for You:" : "Nova's Opening Argument:"}
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

      {/* Student Opinion / Counter-Argument Studio */}
      <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" />
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">
              {isModeA ? 'Your Idea:' : 'Your Counter-Argument:'}
            </h4>
          </div>

          <button
            onClick={() => setShowSampleHint(!showSampleHint)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <Lightbulb size={13} /> {showSampleHint ? 'Hide Guidance' : 'Sentence Starters & Guidance'}
          </button>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 3-STEP DEBATE SCAFFOLD                                  */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
          {[1,2,3].map(s => (
            <button key={s} type="button" onClick={() => setDebateStep(s)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border transition ${
                debateStep === s
                  ? 'bg-purple-600 text-white border-purple-700 shadow-md'
                  : s < debateStep
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}>
              {s < debateStep ? '✓' : s} {s===1 ? 'Position' : s===2 ? 'Build' : 'Deliver'}
            </button>
          ))}
        </div>

        {/* STEP 1: Choose Position */}
        {debateStep === 1 && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in">
            <span className="text-xs font-black uppercase text-slate-700 tracking-wider block">
              Step 1 — Choose your position:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button type="button"
                onClick={() => { setSelectedPosition('agree'); setUserSpeechText(isModeA ? "I think it's safer to walk carefully because " : "I agree that walking carefully is much safer because "); setDebateStep(2); }}
                className={`p-4 rounded-2xl border-2 text-left transition font-bold text-sm space-y-1 ${
                  selectedPosition === 'agree' ? 'bg-emerald-100 border-emerald-500 shadow-md' : 'bg-white border-slate-200 hover:border-emerald-300'
                }`}>
                <span className="text-emerald-600 text-base">✅ {isModeA ? "Share Idea: Walk Carefully" : "I agree"}</span>
                <p className="text-xs text-slate-700">{isModeA ? '"I think it\'s safer to walk carefully because we stay safe."' : '"Walking carefully is safer because running can cause accidents."'}</p>
              </button>
              <button type="button"
                onClick={() => { setSelectedPosition('disagree'); setUserSpeechText(isModeA ? "I have a different idea because " : "I understand your point, but I disagree because "); setDebateStep(2); }}
                className={`p-4 rounded-2xl border-2 text-left transition font-bold text-sm space-y-1 ${
                  selectedPosition === 'disagree' ? 'bg-purple-100 border-purple-500 shadow-md' : 'bg-white border-slate-200 hover:border-rose-300'
                }`}>
                <span className={isModeA ? "text-purple-700 text-base" : "text-rose-600 text-base"}>
                  {isModeA ? "💡 Share Different Idea" : "🚶 I disagree"}
                </span>
                <p className="text-xs text-slate-700">
                  {isModeA ? '"I have a different idea because running on wet floors can cause slips."' : '"I understand your point, but running is risky because friction is reduced on wet floors."'}
                </p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Build Argument with Chunk Ecosystem */}
        {debateStep === 2 && (
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-purple-900 tracking-wider flex items-center gap-1">
                <Sparkles size={14} className="text-purple-600" /> Step 2 — Build your argument:
              </span>
              <button type="button" onClick={() => setDebateStep(3)}
                className="text-[10px] font-black text-purple-600 hover:text-purple-800 border border-purple-300 px-2 py-0.5 rounded-lg">
                Next: Deliver ▶
              </button>
            </div>

            {/* 4 Chunk Groups in 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* 🎯 Claim Starters */}
              <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-200 space-y-1.5">
                <span className="text-[9px] font-black uppercase text-indigo-900 block">
                  {isModeA ? "💬 Idea Starters:" : "🎯 Claim Starters:"}
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeStarters.map((c,i) => (
                    <button key={i} type="button" onClick={() => setUserSpeechText(prev => prev ? `${prev} ${c}` : c)}
                      className="px-2 py-0.5 bg-white hover:bg-indigo-100 text-indigo-950 border border-indigo-300 rounded-md text-[10px] font-bold transition active:scale-95">
                      +{c}
                    </button>
                  ))}
                </div>
              </div>

              {/* 🔗 Reason Connectors */}
              <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 space-y-1.5">
                <span className="text-[9px] font-black uppercase text-blue-900 block">🔗 Connectors:</span>
                <div className="flex flex-wrap gap-1">
                  {["because", "however", "therefore", "as a result", "on the other hand"].map((c,i) => (
                    <button key={i} type="button" onClick={() => setUserSpeechText(prev => prev ? `${prev} ${c}` : c)}
                      className="px-2 py-0.5 bg-white hover:bg-blue-100 text-blue-950 border border-blue-300 rounded-md text-[10px] font-bold transition active:scale-95">
                      +{c}
                    </button>
                  ))}
                </div>
              </div>

              {/* 🔬 Science Evidence */}
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1.5">
                <span className="text-[9px] font-black uppercase text-emerald-900 block">🔬 Science Evidence:</span>
                <div className="flex flex-wrap gap-1">
                  {["water reduces friction", "wet floor is slippery", "rubber shoes grip better", "friction prevents sliding"].map((c,i) => (
                    <button key={i} type="button" onClick={() => setUserSpeechText(prev => prev ? `${prev} ${c}` : c)}
                      className="px-2 py-0.5 bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-md text-[10px] font-bold transition active:scale-95">
                      +{c}
                    </button>
                  ))}
                </div>
              </div>

              {/* ⚠️ Consequences */}
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5">
                <span className="text-[9px] font-black uppercase text-amber-900 block">⚠️ Consequences:</span>
                <div className="flex flex-wrap gap-1">
                  {["causing students to slip", "hurt their knee badly", "a dangerous accident", "visit the school nurse"].map((c,i) => (
                    <button key={i} type="button" onClick={() => setUserSpeechText(prev => prev ? `${prev} ${c}` : c)}
                      className="px-2 py-0.5 bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-md text-[10px] font-bold transition active:scale-95">
                      +{c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-time C.R.E Argument Meter */}
            <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-black uppercase text-slate-600 tracking-wider">
                {isModeA ? '📊 Idea Tracker:' : '📊 Argument Meter (C.R.E):'}
              </span>
              {isModeA ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black border text-center ${
                    modeAMeter.hasIdea ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>💡 Idea {modeAMeter.hasIdea ? '✓' : '○'}</div>
                  <div className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black border text-center ${
                    modeAMeter.hasReason ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>🔗 Reason {modeAMeter.hasReason ? '✓' : '○'}</div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  <div className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black border text-center ${
                    argumentMeter.hasClaim ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>🎯 Claim {argumentMeter.hasClaim ? '✓' : '○'}</div>
                  <div className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black border text-center ${
                    argumentMeter.hasReason ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>🔗 Reason {argumentMeter.hasReason ? '✓' : '○'}</div>
                  <div className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black border text-center ${
                    argumentMeter.hasEvidence ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>🔬 Evidence {argumentMeter.hasEvidence ? '✓' : '○'}</div>
                </div>
              )}
            </div>

            {/* Model Dialogue (collapsible) */}
            <div className="border border-indigo-200 rounded-xl overflow-hidden">
              <button type="button" onClick={() => setShowModelDialogue(!showModelDialogue)}
                className="w-full flex items-center justify-between px-3 py-2 bg-indigo-50 text-indigo-900 text-xs font-black hover:bg-indigo-100 transition">
                <span>📖 Model Debate Dialogue (Nova ↔ Champion)</span>
                <span>{showModelDialogue ? '▲ Hide' : '▼ Show'}</span>
              </button>
              {showModelDialogue && (
                <div className="p-3 bg-white space-y-2 text-xs">
                  {[
                    { speaker: '🤖 Nova', color: 'purple', text: '"Running in the corridor is fast and fun! It is a great way to get to the playground quickly."' },
                    { speaker: '🏆 Champion', color: 'emerald', text: '"I understand your point, but running is dangerous. Water reduces friction on the wet floor."' },
                    { speaker: '🤖 Nova', color: 'purple', text: '"Hmm, that is a good point! But what if students are careful?"' },
                    { speaker: '🏆 Champion', color: 'emerald', text: '"Therefore, walking carefully in rubber shoes is always safer — it prevents slipping and accidents."' },
                  ].map((line, i) => (
                    <div key={i} className={`flex items-start gap-2 p-2 bg-${line.color}-50 rounded-xl border border-${line.color}-200`}>
                      <span className={`font-black text-${line.color}-900 shrink-0`}>{line.speaker}:</span>
                      <span className={`text-${line.color}-800 font-medium italic`}>{line.text}</span>
                      <button type="button" onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(line.text.replace(/"/g,''));
                        utterance.lang = 'en-US';
                        window.speechSynthesis.speak(utterance);
                      }} className={`ml-auto shrink-0 p-1 bg-${line.color}-200 rounded-lg hover:bg-${line.color}-300 transition`}>
                        <Volume2 size={11} className={`text-${line.color}-700`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Deliver — textarea + mic */}
        {debateStep === 3 && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-700 tracking-wider">Step 3 — Deliver your argument:</span>
              <button type="button" onClick={() => setDebateStep(2)}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800">◀ Back to Build</button>
            </div>
            <textarea
              rows={4}
              value={userSpeechText}
              onChange={(e) => setUserSpeechText(e.target.value)}
              placeholder={isModeA ? "Record or type your idea for Nova here..." : "Record your speech or type your counter-argument in English here..."}
              className="w-full p-4 bg-white rounded-2xl border border-slate-300 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            />

            <div className="flex items-center justify-between flex-wrap gap-2">
              <button
                type="button"
                onClick={handleToggleMic}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                }`}
              >
                {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
                {isRecording ? 'Stop Recording' : '🎤 Speak Idea (Micro)'}
              </button>

              <button
                type="button"
                onClick={handleEvaluateRebuttal}
                disabled={!userSpeechText.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md transition flex items-center gap-2 active:scale-95"
              >
                <Send size={14} /> {isModeA ? 'Share My Idea' : 'Submit & Analyze Argument'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Evaluation Scorecard */}
      {debateScore && (
        <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50/60 rounded-3xl border border-purple-200 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="text-amber-500" size={18} />
              <h4 className="text-sm font-black text-purple-950 uppercase tracking-wide">
                {isModeA ? 'Opinion Feedback:' : `AI Debate Scorecard (C.R.E Standard): ${debateScore.score}/100`}
              </h4>
            </div>
            <span className="px-2.5 py-0.5 bg-purple-200 text-purple-900 rounded-md font-mono text-xs font-black">
              {debateScore.wordCount} words
            </span>
          </div>

          {!isModeA && (
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
          )}

          <div className="text-xs font-semibold text-purple-950 bg-white/90 p-3.5 rounded-2xl border border-purple-200 shadow-sm leading-relaxed">
            {debateScore.aiFeedback}
          </div>
        </div>
      )}
    </div>
  );
}

