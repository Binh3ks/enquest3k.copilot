import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Bot, User, RotateCcw, CheckCircle, HelpCircle, Lightbulb, AlertTriangle, Volume2, MessageSquare } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';
import { useUserStore } from '../../stores/useUserStore';
import { useStationProgress } from '../../hooks/useStationProgress';
import { useParams } from 'react-router-dom';

// ─── Main Component ────────────────────────────────────────────────────────
// (TopicTalkMode removed — free speaking owned by AI Tutor: Story Mission + Free Talk)

const AskAi = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const { weekId } = useParams();
  const { learningMode } = useUserStore();
  
  // 🔥 Universal Progress System Integration
  const { savedData, saveProgress, markComplete } = useStationProgress(
    parseInt(weekId), 
    'ask_ai'
  );
  
  const [currentPromptIdx, setCurrentPromptIdx] = useState(savedData.currentPromptIdx || 0);
  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState(savedData.feedback || null);
  const [history, setHistory] = useState(savedData.history || []);
  const [showHint, setShowHint] = useState(false);
  const [completedPrompts, setCompletedPrompts] = useState(() => new Set(savedData.completedPrompts || []));
  const [wrongCount, setWrongCount] = useState(savedData.wrongCount || 0);
  const [hasMicUsed, setHasMicUsed] = useState(false);
  // Scaffold selection: check correct/wrong on click, show green/red + full sentence
  const [selectedWord, setSelectedWord] = useState(null);    // W1-33 word bank
  const [wordFeedback, setWordFeedback] = useState(null);   // null | 'correct' | 'wrong'
  const [responseTimes, setResponseTimes] = useState(savedData.responseTimes || []);
  const promptShownRef = useRef(Date.now());
  // BUG FIX (Jun 7, 2026): re-sync state from savedData when store populates async.
  // Direct useState(value) only uses value on first render. If fetchWeekProgress
  // hasn't returned yet, these states stay at defaults even after the store fills.
  const hasRestoredAskAi = useRef(false);
  useEffect(() => {
    if (hasRestoredAskAi.current) return;
    if (!savedData._savedAt) return;
    hasRestoredAskAi.current = true;
    if (savedData.feedback != null) setFeedback(savedData.feedback);
    if (savedData.history?.length) setHistory(savedData.history);
    if (savedData.completedPrompts?.length) setCompletedPrompts(new Set(savedData.completedPrompts));
    if (savedData.wrongCount) setWrongCount(savedData.wrongCount);
    if (savedData.responseTimes?.length) setResponseTimes(savedData.responseTimes);
  }, [savedData]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const totalPrompts = data?.prompts?.length || 0;
      const finalScore = totalPrompts > 0 ? Math.round((completedPrompts.size / totalPrompts) * 100) : 0;
      const isAllComplete = totalPrompts > 0 && completedPrompts.size === totalPrompts;
      const avgResponseTime = responseTimes.length > 0
        ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length * 10) / 10
        : null;

      saveProgress({
        currentPromptIdx,
        history,
        completedPrompts: [...completedPrompts],
        feedback,
        wrongCount,
        responseTimes,
        avgResponseTime,
      }, isAllComplete, finalScore);

      if (isAllComplete) markComplete(finalScore);
    }, 1500);

    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPromptIdx, history, completedPrompts, feedback, wrongCount, responseTimes]);


  const prompts = data?.prompts || data?.situations || [];
  if (!data || !prompts.length) return <div className="p-10 text-center animate-pulse text-slate-400">Loading Ask AI...</div>;

  const currentPrompt = prompts[currentPromptIdx] || prompts[0];
  const isLast = currentPromptIdx === prompts.length - 1;

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition 
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)() 
    : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputVal(transcript); 
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
  }

  const toggleListen = () => {
    if (!recognition) { alert("Browser not supported"); return; }
    if (isListening) {
      recognition.stop();
      setIsListening(false); // Stop the recording animation
    } else { 
      setIsListening(true); 
      setHasMicUsed(true); // Mark that mic has been used
      recognition.start(); 
    }
  };

  const handleWordSelect = (word) => {
    const correctWord = currentPrompt.correctWord;
    const isCorrect = !correctWord || word.toUpperCase() === correctWord.toUpperCase();
    setSelectedWord(word);
    setWordFeedback(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect && correctWord) {
      // Pre-fill with correct word so student can try again
      setSelectedWord(correctWord);
    }
  };

  const handleCheck = () => {
    if (!inputVal.trim()) return;

    // Track response time (reflex — seconds from prompt shown to first submission)
    const responseTimeSec = Number(((Date.now() - promptShownRef.current) / 1000).toFixed(1));

    // Construct target answer fallback if currentPrompt.answer is missing
    let targetAnswer = currentPrompt.answer;
    if (!targetAnswer && currentPrompt.question_frame && (currentPrompt.correctWord || selectedWord)) {
      targetAnswer = currentPrompt.question_frame.replace('___', currentPrompt.correctWord || selectedWord);
    }
    if (!targetAnswer) {
      targetAnswer = inputVal;
    }

    // Evaluate answer against target
    const result = analyzeAnswer(inputVal, targetAnswer, 'speech'); 
    
    let msg = "";
    let isPass = false;

    if (result.isCorrect || result.status === 'perfect' || result.status === 'good') {
        msg = isVi ? "Tuyệt vời! Chính xác." : "Perfect!";
        isPass = true;
    } else if (result.status === 'warning') {
        msg = result.message;
        isPass = false; 
    } else {
        msg = isVi ? "Chưa đúng mẫu câu. Hãy kiểm tra lại!" : "Incorrect structure or spelling.";
        isPass = false;
    }

    setFeedback({ ...result, message: msg, isPass });
    
    if (isPass) {
        speakText(isVi ? "Giỏi lắm!" : "Excellent!");
        const newHistory = [...history, { q: currentPrompt.context_en || currentPrompt.nova_says, a: inputVal, responseTime: responseTimeSec }];
        setHistory(newHistory);
        setResponseTimes(prev => [...prev, responseTimeSec]);

        const newCompleted = new Set(completedPrompts);
        newCompleted.add(currentPromptIdx);
        setCompletedPrompts(newCompleted);
    } else {
        setWrongCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setInputVal('');
    setShowHint(false);
    setWrongCount(0);
    setHasMicUsed(false);
    setSelectedWord(null);
    setWordFeedback(null);
    promptShownRef.current = Date.now(); // Reset reflex timer for next prompt
    if (!isLast) {
      const newIndex = currentPromptIdx + 1;
      setCurrentPromptIdx(newIndex);
    }
  };

  return (
    <div className="pb-24 max-w-3xl mx-auto">
      {/* Instruction Bar */}
      <div className={`mb-4 p-4 bg-gradient-to-r from-${themeColor}-50 to-indigo-50 rounded-2xl border-2 border-${themeColor}-200 text-center`}>
        <p className="text-base font-black text-slate-700">
          {isVi ? '🎤 Đọc, chọn gợi ý, rồi bấm Mic nói câu hỏi' : '🎤 Read the cue, pick a scaffold, then press Mic to speak'}
        </p>
        <p className="text-xs font-bold text-slate-500 mt-1">
          {isVi ? 'BẮT BUỘC nói bằng Mic trước → sau đó mới sửa và Check' : 'You MUST speak first via Mic → then edit spelling & Check'}
        </p>
      </div>

      <div className={`bg-${themeColor}-50 p-6 rounded-3xl border-2 border-${themeColor}-100 mb-6 shadow-sm`}>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full bg-${themeColor}-100 flex items-center justify-center`}>
                    <Bot className={`w-7 h-7 text-${themeColor}-600`} />
                </div>
                <div>
                    <h2 className={`text-xl font-black text-${themeColor}-800`}>ASK AI - Situation {currentPromptIdx + 1}/{data.prompts.length}</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Critical Inquiry</p>
                </div>
            </div>
            <button onClick={onToggleLang} className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-500">{isVi ? 'EN' : 'VI'}</button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-6 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400"></div>

            {/* Speaker button */}
            <button 
                onClick={() => {
                    const textToSpeak = currentPrompt.nova_says || currentPrompt.context_en || (Array.isArray(currentPrompt.answer) ? currentPrompt.answer.join(", or, ") : currentPrompt.answer) || '';
                    if (textToSpeak) {
                        speakText(textToSpeak, currentPrompt.audio_url || null, 1.0, null, 'ask_ai', parseInt(weekId), learningMode || 'advanced');
                    }
                }}
                className={`absolute top-4 left-4 w-10 h-10 rounded-full bg-${themeColor}-100 hover:bg-${themeColor}-200 flex items-center justify-center transition-colors`}
                title={isVi ? "Nghe câu tình huống" : "Listen to situation"}
            >
                <Volume2 className={`w-5 h-5 text-${themeColor}-600`} />
            </button>
            
            <button 
                onClick={() => setShowHint(!showHint)}
                className="absolute top-4 right-4 text-amber-400 hover:text-amber-500 transition-colors"
                title="Show Hint Pattern"
            >
                <Lightbulb className={`w-6 h-6 ${showHint ? 'fill-amber-400' : ''}`} />
            </button>

            {currentPrompt.nova_says ? (
              /* ── Scaffolded layout (W1-W42) ── */
              <div className="pt-2">
                {/* Nova's speech bubble */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-full bg-${themeColor}-100 flex items-center justify-center flex-shrink-0`}>
                    <Bot className={`w-5 h-5 text-${themeColor}-600`} />
                  </div>
                  <div className={`bg-${themeColor}-50 border border-${themeColor}-200 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs`}>
                    <p className="text-base font-bold text-slate-800">{currentPrompt.nova_says}</p>
                    {isVi && <p className="text-xs text-slate-500 mt-1 italic">{currentPrompt.nova_says_vi}</p>}
                  </div>
                </div>

                {/* Task instruction — only show when present (W1-16) */}
                {currentPrompt.task_en && (
                  <div className="text-center mb-4 px-8">
                    <p className="text-sm font-bold text-slate-500 uppercase mb-1">{isVi ? 'Nhiệm vụ của bạn' : 'Your Task'}</p>
                    <p className="text-base font-black text-slate-800">
                      {isVi ? currentPrompt.task_vi : currentPrompt.task_en}
                    </p>
                  </div>
                )}

                {/* Word bank section — W1-33 */}
                {currentPrompt.question_word_bank && (
                  <div>
                    {currentPrompt.question_word_bank.length === 4 ? (
                      /* W28+: 4 options with aux verbs (wh-word + aux), 2 blanks */
                      <>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2 text-center">
                          {isVi ? 'Chọn từ gợi ý để hỏi (gợi ý — vẫn phải nói bằng Mic)' : 'Pick a starter to ask a question (hint only — Mic required)'}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center mb-3">
                          {currentPrompt.question_word_bank.map((word) => {
                            const isSelected = selectedWord === word;
                            const isCorrect = isSelected && wordFeedback === 'correct';
                            const isWrong = isSelected && wordFeedback === 'wrong';
                            return (
                              <button
                                key={word}
                                onClick={() => handleWordSelect(word)}
                                className={`px-3 py-1.5 rounded-full border-2 text-sm font-bold transition-all ${
                                  isCorrect
                                    ? 'bg-green-500 text-white border-green-500'
                                    : isWrong
                                      ? 'bg-red-500 text-white border-red-500'
                                      : isSelected
                                        ? `bg-${themeColor}-500 text-white border-${themeColor}-500`
                                        : `bg-white border-slate-300 text-slate-600 hover:border-${themeColor}-400`
                                }`}
                              >
                                {word}
                              </button>
                            );
                          })}
                        </div>
                        {/* Question frame + feedback */}
                        {currentPrompt.question_frame && (
                          <div className="mt-3">
                            {wordFeedback === 'correct' ? (
                              /* Correct — green success box */
                              <div className="text-center bg-green-50 rounded-xl px-4 py-3 border-2 border-green-400">
                                <p className="text-xs font-bold text-green-600 uppercase mb-1">
                                  {isVi ? '✓ Đúng! Nói câu này bằng Mic:' : '✓ Correct! Now speak this via Mic:'}
                                </p>
                                <p className="text-lg font-black text-green-800 tracking-wide">
                                  {currentPrompt.question_frame.split('___').map((part, i, arr) =>
                                    i < arr.length - 1
                                      ? <React.Fragment key={i}>{part}<span className="text-green-600 underline font-black">{selectedWord}</span></React.Fragment>
                                      : part
                                  )}
                                </p>
                              </div>
                            ) : wordFeedback === 'wrong' ? (
                              /* Wrong — red error box + correct answer */
                              <div className="text-center bg-red-50 rounded-xl px-4 py-3 border-2 border-red-400">
                                <p className="text-xs font-bold text-red-600 uppercase mb-1">
                                  {isVi ? '✗ Sai! Câu đúng là:' : '✗ Wrong! Correct answer:'}
                                </p>
                                <p className="text-lg font-black text-red-800 tracking-wide">
                                  {currentPrompt.question_frame.split('___').map((part, i, arr) =>
                                    i < arr.length - 1
                                      ? <React.Fragment key={i}>{part}<span className="text-green-600 underline font-black">{currentPrompt.correctWord}</span></React.Fragment>
                                      : part
                                  )}
                                </p>
                                <p className="text-xs text-red-500 mt-1">
                                  {isVi ? '→ Thử chọn từ khác và nói vào Mic' : '→ Pick another word and speak into Mic'}
                                </p>
                              </div>
                            ) : (
                              /* Neutral — show frame with selected word or blank */
                              <div className="text-center bg-indigo-50 rounded-xl px-4 py-3 border border-indigo-100">
                                <p className="text-xs font-bold text-indigo-400 uppercase mb-1">{isVi ? 'Khung câu hỏi' : 'Question Frame'}</p>
                                <p className="text-lg font-black text-indigo-800 tracking-wide">
                                  {selectedWord
                                    ? currentPrompt.question_frame.split('___').map((part, i, arr) =>
                                        i < arr.length - 1
                                          ? <React.Fragment key={i}>{part}<span className={`text-${themeColor}-600 underline font-black`}>{selectedWord}</span></React.Fragment>
                                          : part
                                      )
                                    : currentPrompt.question_frame}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      /* W1-27: 6 wh-word options, 1 blank */
                      <>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2 text-center">
                          {isVi ? 'Chọn từ để hỏi — đúng xanh, sai đỏ (vẫn phải nói bằng Mic)' : 'Pick a question word — green = correct, red = wrong (Mic required)'}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center mb-3">
                          {currentPrompt.question_word_bank.map((word) => {
                            const isSelected = selectedWord === word;
                            const isCorrect = isSelected && wordFeedback === 'correct';
                            const isWrong = isSelected && wordFeedback === 'wrong';
                            return (
                              <button
                                key={word}
                                onClick={() => handleWordSelect(word)}
                                className={`px-3 py-1.5 rounded-full border-2 text-sm font-bold transition-all ${
                                  isCorrect
                                    ? 'bg-green-500 text-white border-green-500'
                                    : isWrong
                                      ? 'bg-red-500 text-white border-red-500'
                                      : isSelected
                                        ? `bg-${themeColor}-500 text-white border-${themeColor}-500`
                                        : `bg-white border-slate-300 text-slate-600 hover:border-${themeColor}-400`
                                }`}
                              >
                                {word}
                              </button>
                            );
                          })}
                        </div>
                        {/* Question frame + feedback */}
                        {currentPrompt.question_frame && (
                          <div className="mt-3">
                            {wordFeedback === 'correct' ? (
                              <div className="text-center bg-green-50 rounded-xl px-4 py-3 border-2 border-green-400">
                                <p className="text-xs font-bold text-green-600 uppercase mb-1">
                                  {isVi ? '✓ Đúng! Nói câu này bằng Mic:' : '✓ Correct! Now speak this via Mic:'}
                                </p>
                                <p className="text-lg font-black text-green-800 tracking-wide">
                                  {currentPrompt.question_frame.split('___').map((part, i, arr) =>
                                    i < arr.length - 1
                                      ? <React.Fragment key={i}>{part}<span className="text-green-600 underline font-black">{selectedWord}</span></React.Fragment>
                                      : part
                                  )}
                                </p>
                              </div>
                            ) : wordFeedback === 'wrong' ? (
                              <div className="text-center bg-red-50 rounded-xl px-4 py-3 border-2 border-red-400">
                                <p className="text-xs font-bold text-red-600 uppercase mb-1">
                                  {isVi ? '✗ Sai! Câu đúng là:' : '✗ Wrong! Correct answer:'}
                                </p>
                                <p className="text-lg font-black text-red-800 tracking-wide">
                                  {currentPrompt.question_frame.split('___').map((part, i, arr) =>
                                    i < arr.length - 1
                                      ? <React.Fragment key={i}>{part}<span className="text-green-600 underline font-black">{currentPrompt.correctWord}</span></React.Fragment>
                                      : part
                                  )}
                                </p>
                                <p className="text-xs text-red-500 mt-1">
                                  {isVi ? '→ Thử chọn từ khác và nói vào Mic' : '→ Pick another word and speak into Mic'}
                                </p>
                              </div>
                            ) : (
                              <div className="text-center bg-indigo-50 rounded-xl px-4 py-3 border border-indigo-100">
                                <p className="text-xs font-bold text-indigo-400 uppercase mb-1">{isVi ? 'Khung câu hỏi' : 'Question Frame'}</p>
                                <p className="text-lg font-black text-indigo-800 tracking-wide">
                                  {selectedWord
                                    ? currentPrompt.question_frame.split('___').map((part, i, arr) =>
                                        i < arr.length - 1
                                          ? <React.Fragment key={i}>{part}<span className={`text-${themeColor}-600 underline font-black`}>{selectedWord}</span></React.Fragment>
                                          : part
                                      )
                                    : currentPrompt.question_frame}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* W1-13 (no word bank): show question frame only */}
                {!currentPrompt.question_word_bank && currentPrompt.question_frame && (
                  <div className="text-center bg-indigo-50 rounded-xl px-4 py-3 border border-indigo-100">
                    <p className="text-xs font-bold text-indigo-400 uppercase mb-2">{isVi ? 'Khung câu hỏi' : 'Question Frame'}</p>
                    <p className="text-lg font-black text-indigo-800 tracking-wide">{currentPrompt.question_frame}</p>
                  </div>
                )}

                {/* Hints / Scaffolds chips — render if hints or scaffolds or question_word_bank present */}
                {((currentPrompt.hints && currentPrompt.hints.length > 0) || showHint) && (
                  <div className="mt-4 text-center">
                    <p className="text-xs font-bold text-amber-600 uppercase mb-2">
                      💡 {isVi ? 'Gợi ý ý tưởng trả lời (Click để điền câu):' : 'Answer Scaffolds & Hints (Click to insert):'}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {(Array.isArray(currentPrompt.hints) ? currentPrompt.hints : [currentPrompt.hint || currentPrompt.hint_word]).filter(Boolean).map((hText, hIdx) => (
                        <button
                          key={hIdx}
                          onClick={() => {
                            setInputVal(hText);
                            setShowHint(true);
                          }}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                        >
                          <span>{hText}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Legacy layout (W43+ or old data) ── */
              <div className="text-center py-4">
                <p className="text-sm font-bold text-slate-400 uppercase mb-2">Context (Tình huống)</p>
                <h3 className="text-2xl font-black text-slate-800 leading-snug mb-2">
                  {isVi ? currentPrompt.context_vi : currentPrompt.context_en}
                </h3>
                {showHint && (
                  <div className="mt-4 inline-block px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-bold border border-amber-100 animate-in fade-in slide-in-from-top-1">
                    💡 Hint: {currentPrompt.hint}
                  </div>
                )}
              </div>
            )}
        </div>
        
        {wrongCount >= 3 && !feedback?.isPass && (
            <div className="mb-4 p-4 bg-rose-50 border border-rose-100 rounded-xl text-center animate-in slide-in-from-top-2">
                <p className="text-xs font-bold text-rose-500 uppercase mb-2">
                    {isVi ? "✅ Các đáp án đúng (Hãy chép lại một câu):" : "✅ Correct Answers (Please type one below):"}
                </p>
                <div className="space-y-1">
                    {(Array.isArray(currentPrompt.answer) ? currentPrompt.answer : [currentPrompt.answer]).map((ans, idx) => (
                        <p key={idx} className="text-base font-black text-rose-700 select-all">
                            {ans}
                        </p>
                    ))}
                </div>
            </div>
        )}

        <div className="relative">
            {/* Prominent Mic Button - Now larger and more visible */}
            <button 
                onClick={toggleListen}
                className={`absolute left-3 top-2 bottom-2 w-16 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isListening 
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg' 
                    : hasMicUsed 
                      ? 'bg-green-500 text-white' 
                      : `bg-gradient-to-br from-${themeColor}-500 to-indigo-500 text-white hover:shadow-lg hover:scale-105`
                }`}
                title={isVi ? "Bấm để nói (BẮT BUỘC)" : "Click to speak (REQUIRED)"}
            >
                <Mic className="w-7 h-7" />
                <span className="text-xs font-bold mt-0.5">{isListening ? 'REC' : hasMicUsed ? '✓' : 'MIC'}</span>
            </button>

            <input 
                type="text" 
                value={inputVal}
                onChange={(e) => { setInputVal(e.target.value); setFeedback(null); }}
                placeholder={
                  hasMicUsed 
                    ? (isVi ? "Chỉnh sửa câu hỏi (Nhớ dấu ?)..." : "Edit your question (Remember ?)...") 
                    : (isVi ? "🔒 BẤM MIC ĐỂ NÓI TRƯỚC!" : "🔒 PRESS MIC TO SPEAK FIRST!")
                }
                className={`w-full p-4 pl-24 pr-32 text-lg font-medium rounded-2xl border-2 outline-none transition-all ${
                  !hasMicUsed 
                    ? 'bg-slate-100 border-slate-300 cursor-not-allowed text-slate-400' 
                    : feedback 
                      ? (feedback.isPass ? 'border-green-500 bg-green-50' : 'border-rose-400 bg-rose-50') 
                      : `border-slate-200 focus:border-${themeColor}-400`
                }`}
                disabled={!hasMicUsed || feedback?.isPass}
                onKeyDown={(e) => e.key === 'Enter' && hasMicUsed && !feedback?.isPass && handleCheck()}
            />

            <div className="absolute right-3 top-3 bottom-3 flex space-x-2">
                {feedback?.isPass ? (
                 isLast ? (
                   <div className="px-4 py-2 bg-green-500 text-white font-bold rounded-xl flex items-center">Done <CheckCircle className="w-4 h-4 ml-2"/></div>
                 ) : (
                   <button onClick={handleNext} className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors">Next</button>
                 )
                ) : (
                    <button onClick={() => handleCheck()} className={`px-6 font-bold rounded-xl text-white transition-colors ${!inputVal.trim() ? 'bg-slate-300 cursor-not-allowed' : `bg-${themeColor}-500 hover:bg-${themeColor}-600`}`}>
                        Check
                    </button>
                )}
            </div>
        </div>

        {feedback && (
            <div className={`mt-4 p-3 rounded-xl text-center text-sm font-bold ${feedback.isPass ? 'text-green-600' : 'text-rose-500'}`}>
                {feedback.message}
            </div>
        )}

      </div>

      {history.length > 0 && (
        <div className="border-t border-slate-200 pt-6">
            <h4 className="text-sm font-black text-slate-400 uppercase mb-4">Completed Inquiries</h4>
            <div className="space-y-3">
                {history.map((h, i) => (
                    <div key={i} className="flex items-start space-x-3 opacity-70">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                            <p className="text-sm text-slate-800 font-bold">"{h.a}"</p>
                            <p className="text-xs text-slate-500 italic">{h.q}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};
export default AskAi;
