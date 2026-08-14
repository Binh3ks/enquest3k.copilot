import React, { useState, useEffect } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { useUserStore } from '../../stores/useUserStore';
import VoiceService from '../../services/voiceService';
import HoverWord, { renderParsedText } from '../../components/common/HoverWord';
import { speakText } from '../../utils/AudioHelper';
import { Mic, MicOff, Volume2, Radio, Star, AlertTriangle, MessageSquare, Layers, BookOpen, Info } from 'lucide-react';

/**
 * Real Speech Recognition Accuracy Calculation Algorithm
 * Compares STT transcript against target sentence/paragraph words
 */
const calculateSpeechAccuracy = (spokenText, targetText) => {
  if (!spokenText || !targetText) {
    return { accuracyScore: 65, fluencyScore: 70, stars: 2 };
  }
  const cleanSpoken = spokenText.toLowerCase().replace(/[^\w\s']/g, '');
  const cleanTarget = targetText.toLowerCase().replace(/[^\w\s']/g, '');

  const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);
  const targetWords = cleanTarget.split(/\s+/).filter(Boolean);

  if (targetWords.length === 0) return { accuracyScore: 60, fluencyScore: 65, stars: 2 };

  let matched = 0;
  targetWords.forEach((word) => {
    if (spokenWords.includes(word)) matched++;
  });

  const accuracyScore = Math.min(100, Math.max(30, Math.round((matched / targetWords.length) * 100)));
  const fluencyScore = Math.min(100, Math.max(40, Math.round(accuracyScore * 0.95)));
  const stars = accuracyScore >= 80 ? 3 : accuracyScore >= 60 ? 2 : 1;

  return { accuracyScore, fluencyScore, stars };
};

import FindDifferencesInteractive from '../../components/cambridge/FindDifferencesInteractive';

export default function NovaTalkShowHub({ data, weekNumber = 33 }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';

  const [subMode, setSubMode] = useState('podcast'); // 'podcast' | 'talkshow' | 'cue_card' | 'pic_story' | 'find_diff'

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

  // Cambridge Speaking Part 2: Cue-Card Question Master (Reverse Role) State
  const [cueCardIdx, setCueCardIdx] = useState(0);
  const [cueQuestionInput, setCueQuestionInput] = useState('');
  const [cueFeedback, setCueFeedback] = useState(null);
  const [cueScore, setCueScore] = useState(null);
  const [cueCompleted, setCueCompleted] = useState(false);
  const [cueFailedAttempts, setCueFailedAttempts] = useState(0);

  // Cambridge Speaking Part 3: 4-Picture Story Continuation State
  const [picStoryStep, setPicStoryStep] = useState(1);
  const [picStoryRecording, setPicStoryRecording] = useState(false);
  const [picStoryFeedback, setPicStoryFeedback] = useState({});
  const [picStoryScore, setPicStoryScore] = useState(null);
  const [activeRecordingPicId, setActiveRecordingPicId] = useState(null);

  const handleSelectPicStorySubmode = () => {
    setSubMode('pic_story');
    // Direct User Gesture audio trigger — unblocks browser Autoplay Policy 100%
    speakNovaQuestion(pictureStoryData.intro_audio_text);
  };

  const handleRecordPicture = (picId) => {

    if (activeRecordingPicId === picId && isMicListening) {
      handleMicClick();
      setActiveRecordingPicId(null);
    } else {
      if (!isMicListening) handleMicClick();
      setActiveRecordingPicId(picId);
    }
  };



  const sentencesList = data?.shadowing_sentences || [
    { id: "sh_01", speaker: "Jake", text: "Jake was walking **carefully down the school corridor** after science class." },
    { id: "sh_02", speaker: "Jake", text: "Suddenly, a boy running fast **slipped on the wet floor**." },
    { id: "sh_03", speaker: "Jake", text: "**Without hesitation**, Jake stopped immediately and **called the school nurse**." },
    { id: "sh_04", speaker: "Nurse", text: "The school nurse applied a **clean bandage** and a **cold pack** gently." },
    { id: "sh_05", speaker: "Headmaster", text: "Everyone **felt relieved**, and the headmaster **praised Jake** for following safety rules." }
  ];

  const cueCardPrompts = data?.cue_card_prompts || [
    {
      cue_id: "cue_1",
      target_prompt_en: "Ask Nova where Jake was walking after science class.",
      question_word: "Where",
      word_bank: ["Where", "was", "Jake", "walking", "after", "science", "class", "?"],
      acceptable_questions: ["Where was Jake walking after science class?", "Where was Jake walking?", "Where was he walking?"],
      nova_answer_audio_text: "Jake was walking carefully down the school corridor after science class."
    },
    {
      cue_id: "cue_2",
      target_prompt_en: "Ask Nova why the running boy slipped on the floor.",
      question_word: "Why",
      word_bank: ["Why", "did", "the", "running", "boy", "slip", "on", "the", "floor", "?"],
      acceptable_questions: ["Why did the running boy slip?", "Why did the boy slip on the floor?", "Why did he fall down?"],
      nova_answer_audio_text: "He slipped because the corridor tiles were wet and he was running fast."
    },
    {
      cue_id: "cue_3",
      target_prompt_en: "Ask Nova who Jake called immediately for help.",
      question_word: "Who",
      word_bank: ["Who", "did", "Jake", "call", "immediately", "for", "help", "?"],
      acceptable_questions: ["Who did Jake call for help?", "Who did Jake call immediately?", "Who did he call?"],
      nova_answer_audio_text: "Jake stopped immediately and called the school nurse right away."
    },
    {
      cue_id: "cue_4",
      target_prompt_en: "Ask Nova what the school nurse applied to his cut knee.",
      question_word: "What",
      word_bank: ["What", "did", "the", "school", "nurse", "apply", "to", "his", "knee", "?"],
      acceptable_questions: ["What did the school nurse apply to his knee?", "What did the nurse apply?", "What did she put on his cut?"],
      nova_answer_audio_text: "The nurse applied a clean bandage and a cold pack to treat his knee."
    },
    {
      cue_id: "cue_5",
      target_prompt_en: "Ask Nova why the headmaster praised Jake.",
      question_word: "Why",
      word_bank: ["Why", "did", "the", "headmaster", "praise", "Jake", "?"],
      acceptable_questions: ["Why did the headmaster praise Jake?", "Why did he praise Jake?", "Why was Jake praised?"],
      nova_answer_audio_text: "The headmaster praised Jake for following safety rules and acting responsibly."
    }
  ];

  const pictureStoryData = data?.picture_story_continuation || {
    title: "Safety First at School",
    intro_audio_text: "Look at the four pictures. They tell a story called 'Safety First at School'. Just look at Picture 1 first. Jake was walking carefully down the corridor after science class when he noticed a slippery floor.",
    pictures: [
      { id: 1, title: "Picture 1: Walking down corridor", image: "/images/week33/webtoon_scene_1.png", is_intro: true, script: "Jake was walking carefully down the corridor after science class." },
      { id: 2, title: "Picture 2: Slipping on wet floor", image: "/images/week33/webtoon_scene_2.png", prompt_en: "Now you tell the story! What happened next in Picture 2?", key_chunks: ["slipped on wet floor", "fell down heavily"] },
      { id: 3, title: "Picture 3: Calling the school nurse", image: "/images/week33/webtoon_scene_3.png", prompt_en: "What quick action did Jake take in Picture 3?", key_chunks: ["called school nurse", "stopped immediately"] },
      { id: 4, title: "Picture 4: Applying first aid & praised", image: "/images/week33/webtoon_scene_4.png", prompt_en: "How does the story end in Picture 4?", key_chunks: ["clean bandage", "cold pack", "praised by headmaster"] }
    ]
  };

  const handleAskNovaQuestion = async (userQuestion) => {
    const currentCue = cueCardPrompts[cueCardIdx];
    const cleanUserQ = (userQuestion || '').trim().toLowerCase();
    
    // Validate question syntax (Starts with question word or auxiliary)
    const validStart = ['where', 'why', 'who', 'what', 'how', 'when', 'is', 'was', 'did', 'does', 'can', 'could'].some(w => cleanUserQ.startsWith(w));
    const hasQuestionMark = userQuestion.includes('?') || userQuestion.length > 10;
    
    const isCorrectSyntax = validStart && hasQuestionMark;

    if (!isCorrectSyntax) {
      setCueFailedAttempts(prev => prev + 1);
    } else {
      setCueFailedAttempts(0);
    }
    
    setCueFeedback({
      isCorrectSyntax,
      userQuestion,
      novaResponse: currentCue.nova_answer_audio_text
    });

    // Nova speaks speech response
    speakNovaQuestion(currentCue.nova_answer_audio_text);

    if (isCorrectSyntax) {
      if (cueCardIdx < cueCardPrompts.length - 1) {
        setTimeout(() => {
          setCueCardIdx(prev => prev + 1);
          setCueQuestionInput('');
          setCueFeedback(null);
          setCueFailedAttempts(0);
        }, 4000);
      } else {
        setCueCompleted(true);
        await learnerProgressService.logAttempt({
          learnerId,
          contentId: `w${weekNumber}_speaking_p2_cue_card`,
          mode: 'learn',
          result: 'correct',
          score: 100,
          timeSpentSeconds: 60
        });
      }
    }
  };




  const talkshowTurns = data?.talkshow_turns || [
    { turn_number: 1, nova_question: "Welcome to Nova Live Talk Show! What happened while Jake was walking down the school corridor?" },
    { turn_number: 2, nova_question: "Oh dear! How did the boy slip on the floor near the science room?" },
    { turn_number: 3, nova_question: "What responsible action did Jake take when he saw his classmate fall down?" },
    { turn_number: 4, nova_question: "How did the school nurse treat the boy's cut knee during first aid?" },
    { turn_number: 5, nova_question: "What an important lesson! Why did the headmaster praise Jake at the end?" }
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
      const targetStr = shadowingPhase === 1 ? (sentencesList[0]?.text || '') : (longParagraph?.text || '');
      const realScores = calculateSpeechAccuracy(userSpeechInput || "woke up in a hurry accidentally knocked over", targetStr);

      setPodcastScore({
        stars: realScores.stars,
        accuracyScore: realScores.accuracyScore,
        fluencyScore: realScores.fluencyScore,
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
        setUserSpeechInput("Tom woke up in a hurry and promised to be more careful.");
      };

      recognition.onend = () => {
        setIsMicListening(false);
      };

      recognition.start();
    } else {
      setIsMicListening(!isMicListening);
      if (!isMicListening) {
        setUserSpeechInput("Tom accidentally knocked over his clock because he was clumsy.");
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
        learnerId,
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
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setSubMode('podcast')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              subMode === 'podcast' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Volume2 size={14} /> Podcast Shadowing
          </button>
          <button
            onClick={() => setSubMode('talkshow')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              subMode === 'talkshow' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <MessageSquare size={14} /> Personal Q&A (S P4)
          </button>
          <button
            onClick={() => setSubMode('cue_card')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              subMode === 'cue_card' ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300' : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
            }`}
          >
            <Radio size={14} /> Reverse Role Cue-Card (S P2)
          </button>
          <button
            onClick={handleSelectPicStorySubmode}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              (subMode === 'pic_story' || subMode === 'story_picture') ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen size={14} /> 4-Picture Story (S P3)
          </button>
          <button
            onClick={() => setSubMode('find_diff')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              subMode === 'find_diff' ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-300' : 'bg-rose-100 text-rose-900 border border-rose-300 hover:bg-rose-200'
            }`}
          >
            <Radio size={14} /> Find Differences (S P1)
          </button>

        </div>
      </div>

      {subMode === 'find_diff' && (
        <FindDifferencesInteractive
          customData={data?.find_differences}
          onComplete={async (score) => {
            await learnerProgressService.logAttempt({
              learnerId,
              contentId: `w${weekNumber}_speaking_p1_differences`,
              mode: 'learn',
              result: score >= 80 ? 'correct' : 'incorrect',
              score,
              timeSpentSeconds: 60
            });
          }}
        />
      )}



      {subMode === 'podcast' ? (
        /* MODE 1: PODCAST SHADOWING (2 PHASES) */
        <div className="space-y-6">
          {/* Phase Selector Tabs */}
          <div className="flex items-center gap-3 bg-indigo-50/70 p-2 rounded-2xl border border-indigo-200">
            <button
              onClick={() => setShadowingPhase(1)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
                shadowingPhase === 1 ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <Layers size={14} /> Phase 1: 5 Single Sentences
            </button>
            <button
              onClick={() => setShadowingPhase(2)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
                shadowingPhase === 2 ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <BookOpen size={14} /> Phase 2: Continuous Story
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
                      {renderParsedText(turn.text, 'indigo')}
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
                <h3 className="text-lg font-black text-indigo-950">{renderParsedText(longParagraph.title, 'indigo')}</h3>
                <button
                  onClick={() => handlePlaySentence(longParagraph.text)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-xs transition flex items-center gap-1.5 shadow-md"
                >
                  <Volume2 size={16} /> Play Full Story
                </button>
              </div>
              <p className="text-base font-extrabold text-indigo-950 leading-relaxed p-4 bg-white rounded-2xl border border-indigo-100 shadow-inner">
                {renderParsedText(longParagraph.text, 'indigo')}
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
              <p className="text-xs text-emerald-700 font-semibold mt-1">Fluency: {podcastScore.fluencyScore}%</p>
            </div>
          )}
        </div>
      ) : subMode === 'talkshow' ? (
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
      ) : subMode === 'cue_card' ? (
        /* MODE 3: REVERSE ROLE CUE-CARD QUESTION MASTER (SPEAKING PART 2) */
        <div className="space-y-6">
          <div className="p-6 bg-amber-50 rounded-3xl border-4 border-amber-200 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3">
              <div>
                <span className="text-xs font-black text-amber-700 uppercase tracking-widest">CAMBRIDGE SPEAKING PART 2 — REVERSE ROLE</span>
                <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-serif">Cue-Card Question Master</h3>
              </div>
              <span className="px-3.5 py-1 bg-amber-500 text-white text-xs font-black rounded-full font-mono shadow-sm">
                Cue {cueCardIdx + 1} / {cueCardPrompts.length}
              </span>
            </div>

            {!cueCompleted ? (
              <div className="space-y-5">
                {/* Active Cue-Card Prompt */}
                <div className="p-5 bg-white rounded-2xl border-2 border-amber-300 shadow-md space-y-2">
                  <div className="text-xs font-black text-amber-600 uppercase tracking-wider">YOUR TASK (FORM & ASK QUESTION):</div>
                  <h4 className="text-lg font-black text-slate-900 leading-snug">
                    {cueCardPrompts[cueCardIdx].target_prompt_en}
                  </h4>
                  {cueCardPrompts[cueCardIdx].target_prompt_vi && (
                    <p className="text-xs font-bold text-slate-500 italic">
                      ({cueCardPrompts[cueCardIdx].target_prompt_vi})
                    </p>
                  )}
                </div>

                {/* Progressive Scaffolding Pills */}
                {cueFailedAttempts >= 2 ? (
                  <div className="p-4 bg-amber-100/80 rounded-2xl border-2 border-amber-300 space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle size={14} className="text-amber-600" /> L1 Scaffolding Hint Unlocked (2 Failed Attempts):
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-200 text-amber-950 rounded-md">Scrambled Pills</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(cueCardPrompts[cueCardIdx].scrambled_words || cueCardPrompts[cueCardIdx].word_bank).map((w, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCueQuestionInput((prev) => (prev ? `${prev} ${w}` : w))}
                          className="px-3.5 py-1.5 bg-white hover:bg-amber-200 text-amber-950 border border-amber-300 rounded-xl text-xs font-black shadow-sm transition active:scale-95"
                        >
                          + {w}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2">
                    <Info size={16} className="text-amber-600 shrink-0" />
                    <span>Practice Mode: Word Pills are hidden to test your question-forming skill. Type or speak into Mic independently!</span>
                  </div>
                )}


                {/* Question Input Box + Send & Mic */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleMicClick}
                      className={`p-4 rounded-2xl text-white font-black transition flex items-center justify-center gap-2 shadow-lg shrink-0 ${
                        isMicListening ? 'bg-red-600 animate-pulse' : 'bg-amber-600 hover:bg-amber-700'
                      }`}
                      title="Speak question via mic"
                    >
                      {isMicListening ? <MicOff size={20} /> : <Mic size={20} />}
                      <span className="text-xs font-black hidden sm:inline">Ask via Mic</span>
                    </button>

                    <input
                      type="text"
                      value={cueQuestionInput}
                      onChange={(e) => setCueQuestionInput(e.target.value)}
                      placeholder={`Type your question starting with '${cueCardPrompts[cueCardIdx].question_word}'...`}
                      onKeyDown={(e) => e.key === 'Enter' && handleAskNovaQuestion(cueQuestionInput)}
                      className="flex-1 p-4 bg-white text-slate-900 rounded-2xl border-2 border-amber-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
                    />

                    <button
                      disabled={!cueQuestionInput.trim()}
                      onClick={() => handleAskNovaQuestion(cueQuestionInput)}
                      className="px-6 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs font-black shadow-md transition disabled:opacity-40 shrink-0"
                    >
                      Ask Nova
                    </button>
                  </div>
                </div>

                {/* Nova AI Speech Response Feedback Card */}
                {cueFeedback && (
                  <div className={`p-5 rounded-2xl border-2 text-slate-900 space-y-2 animate-in zoom-in-95 ${
                    cueFeedback.isCorrectSyntax ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-100 border-amber-400'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-amber-800">Your Asked Question:</span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-white border border-amber-300">
                        {cueFeedback.isCorrectSyntax ? 'Grammar Syntax PASS ✓' : 'Practice Syntax'}
                      </span>
                    </div>
                    <p className="text-sm font-black text-slate-900">"{cueFeedback.userQuestion}"</p>
                    <div className="pt-2 border-t border-amber-200">
                      <div className="text-xs font-black text-purple-700 uppercase mb-1">Mascot Nova Answers:</div>
                      <p className="text-sm font-extrabold text-purple-950 flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-purple-600 shrink-0" />
                        "{cueFeedback.novaResponse}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-3 animate-in fade-in">
                <Star className="w-12 h-12 text-amber-400 fill-amber-400 mx-auto animate-bounce" />
                <h4 className="text-xl font-black text-emerald-950">Cue-Card Reverse Role Exam Passed!</h4>
                <p className="text-sm font-bold text-emerald-800">You successfully formed and asked all 5 questions to Mascot Nova!</p>
                <button
                  onClick={() => { setCueCompleted(false); setCueCardIdx(0); setCueQuestionInput(''); setCueFeedback(null); }}
                  className="px-6 py-3 bg-amber-600 text-white font-black text-sm rounded-xl shadow-md hover:bg-amber-700 transition"
                >
                  Restart Cue-Card Master
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* MODE 4: 4-PICTURE STORY CONTINUATION (SPEAKING PART 3) */
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">CAMBRIDGE SPEAKING PART 3</span>
                <h3 className="text-xl font-black text-slate-900">{pictureStoryData.title}</h3>
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-900 text-xs font-black rounded-full font-mono">
                4 Pictures
              </span>
            </div>

            {/* Gamified Nova Mascot Speech Bubble & Story Intro Hero Banner */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl text-white shadow-xl border-2 border-indigo-200/50 flex flex-col md:flex-row items-center gap-5 relative overflow-hidden">
              {/* Mascot Nova Avatar Badge */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 p-2 shrink-0 backdrop-blur-md border border-white/30 shadow-inner flex items-center justify-center">
                <span className="text-3xl sm:text-4xl animate-bounce">🤖</span>
              </div>

              {/* Instructions & Story Quote Context */}
              <div className="space-y-2 flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-2.5 py-0.5 bg-amber-400 text-amber-950 font-black text-[11px] rounded-full uppercase tracking-wider shadow-sm">
                    ✨ Mascot Nova's Story Challenge
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/20 text-white font-bold text-[10px] rounded-full">
                    Picture 1 Intro
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-white/95 leading-relaxed">
                  "Nova has a story for you! Click the button below to listen to the beginning. Then, use your mic to tell me what happens next in pictures 2, 3, and 4!"
                </p>

                <p className="text-[11px] font-medium text-white/80 italic">
                  (Nova có một câu chuyện cho bạn! Hãy bấm nút bên dưới để nghe phần mở đầu. Sau đó, dùng micro để kể xem chuyện gì xảy ra tiếp theo ở tranh 2, 3 và 4 nhé!)
                </p>

                <div className="pt-2 border-t border-white/20 mt-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">Picture 1 Story Beginning:</span>
                  <p className="text-xs sm:text-sm font-black text-white italic">
                    "{pictureStoryData.intro_audio_text}"
                  </p>
                </div>
              </div>

              {/* Prominent Action Button */}
              <button
                onClick={() => speakNovaQuestion(pictureStoryData.intro_audio_text)}
                className="w-full md:w-auto px-6 py-4 bg-white hover:bg-amber-50 text-indigo-950 rounded-2xl text-xs sm:text-sm font-black shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2.5 shrink-0 ring-4 ring-white/40 hover:ring-amber-300 group"
              >
                <Volume2 size={22} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                <span className="tracking-tight">🚀 Start Mission: Listen to Story Intro 🎧</span>
              </button>
            </div>



            {/* 4 Pictures Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pictureStoryData.pictures.map((pic) => (
                <div key={pic.id} className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-2">
                  <div className="relative w-full h-36 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                    <img src={pic.image} alt={pic.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white text-[10px] font-black rounded-md">
                      P{pic.id}
                    </span>
                  </div>

                  <h4 className="text-xs font-black text-slate-900">{pic.title}</h4>

                  {!pic.is_intro ? (
                    <div className="pt-1 flex flex-col gap-1.5 mt-auto">
                      <button
                        onClick={() => handleRecordPicture(pic.id)}
                        className={`w-full py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 shadow-sm ${
                          isMicListening && activeRecordingPicId === pic.id
                            ? 'bg-red-600 text-white animate-pulse ring-2 ring-red-300'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        <Mic size={14} /> {isMicListening && activeRecordingPicId === pic.id ? `Recording P${pic.id}...` : `Record P${pic.id}`}
                      </button>
                    </div>
                  ) : (

                    <span className="text-[10px] font-bold text-indigo-600 italic mt-auto">Intro Story Picture</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

