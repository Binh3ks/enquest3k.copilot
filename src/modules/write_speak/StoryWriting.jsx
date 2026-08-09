/**
 * StoryWriting.jsx — Picture-prompt writing tab (W16+).
 *
 * Renders a picture and a writing area scaffolded by the tier:
 *  - Tier 1 (W16-W23): sentence frames + word bank + writing prompts
 *  - Tier 2 (W24-W35): writing prompts + word bank (no frames)
 *  - Tier 3 (W36+): free topic choice (handled by TopicMode below)
 *
 * Saves progress under stationId 'story_writing' via useStationProgress.
 * Triggers tiered rubric scoring (see writingRubric.js scoreWritingTiered).
 *
 * Implementation: see plan /Users/binhnguyen/.claude/plans/refactored-bubbling-comet.md
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart2, Star, ArrowRight, Lightbulb } from 'lucide-react';
import Confetti from 'react-confetti';
import { useStationProgress } from '../../hooks/useStationProgress';
import { scoreWritingTiered } from '../../utils/writingRubric';
import { getImageUrl } from '../../utils/imageUrl';

const StoryWriting = ({ content, themeColor, isVi, onToggleLang, onReportProgress, onGoToSpeak }) => {
  const { weekId } = useParams();
  const currentWeek = parseInt(weekId);
  const pictureMode = content?.story_prompts?.picture_mode;
  const topicMode = content?.story_prompts?.topic_mode;

  // Saved progress lives under stationId 'story_writing'
  const { savedData, saveProgress, markComplete } = useStationProgress(currentWeek, 'story_writing');

  // ── Topic Mode (W36+) ─────────────────────────────────────
  if (topicMode && !pictureMode) {
    return <TopicMode topicMode={topicMode} weekId={currentWeek} savedData={savedData} saveProgress={saveProgress} markComplete={markComplete} isVi={isVi} onReportProgress={onReportProgress} onGoToSpeak={onGoToSpeak} />;
  }

  if (!pictureMode) {
    return (
      <div className="p-10 text-center text-slate-400 font-black italic">
        {isVi ? 'Không có nội dung viết truyện' : 'No story writing content for this week.'}
      </div>
    );
  }

  return <PictureMode pictureMode={pictureMode} content={content} weekId={currentWeek} savedData={savedData} saveProgress={saveProgress} markComplete={markComplete} isVi={isVi} onReportProgress={onReportProgress} onGoToSpeak={onGoToSpeak} themeColor={themeColor} />;
};

// ─────────────────────────────────────────────────────────────
// PictureMode — Tier 1 & Tier 2 (W16-W35)
// ─────────────────────────────────────────────────────────────

const PictureMode = ({ pictureMode, content, weekId, savedData, saveProgress, markComplete, isVi, onReportProgress, onGoToSpeak, themeColor = 'pink' }) => {
  const tier = pictureMode.rubric_tier || 1;
  const allFrames = Array.isArray(pictureMode.sentence_frames) ? pictureMode.sentence_frames : [];

  // Show ALL sentence frames as scaffolding — progression is in min_words/min_sentences, not in hiding frames
  const scaffolding = useMemo(() => ({
    showFrames: allFrames.length,
    minWords: pictureMode.min_words || content?.min_words || 50,
    minSentences: pictureMode.min_sentences || content?.min_sentences || 8,
  }), [allFrames.length, pictureMode.min_words, pictureMode.min_sentences, content?.min_words, content?.min_sentences]);
  const visibleFrames = allFrames;
  const hasFrames = visibleFrames.length > 0;

  // State
  const [text, setText] = useState(savedData?.text || '');
  const [imgSrc, setImgSrc] = useState('');
  const [imgFailed, setImgFailed] = useState(false);
  const [frameInputs, setFrameInputs] = useState(savedData?.frameInputs || {});
  const [rubric, setRubric] = useState(savedData?.rubric || null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [imgZoomed, setImgZoomed] = useState(false);

  // Hydrate from saved
  useEffect(() => {
    if (savedData?.text) setText(savedData.text);
    if (savedData?.frameInputs) setFrameInputs(savedData.frameInputs);
    if (savedData?.rubric) setRubric(savedData.rubric);
  }, [weekId]);

  // Debounced auto-save
  useEffect(() => {
    const t = setTimeout(() => {
      const isComplete = !!rubric && rubric.total >= 6;
      const percent = rubric ? rubric.total * (100 / rubric.maxTotal) : (text.length > 10 ? 30 : 0);
      saveProgress({
        text,
        frameInputs,
        rubric,
      }, isComplete, Math.round(percent));
      if (isComplete) {
        markComplete(Math.round(percent));
      }
      if (onReportProgress) onReportProgress(Math.round(percent));
    }, 1500);
    return () => clearTimeout(t);
  }, [text, frameInputs, rubric]);

  const wordCount = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length, [text]);

  // Image resolution: CDN → local Pages fallback
  useEffect(() => {
    if (!pictureMode.image_url) { setImgFailed(true); return; }
    const cdnUrl = getImageUrl(pictureMode.image_url);
    setImgSrc(cdnUrl);
    setImgFailed(false);
  }, [pictureMode.image_url, weekId]);

  const handleImgError = useCallback(() => {
    // Fallback: if CDN URL (http/https) failed, try relative path directly from site bundle
    if (typeof imgSrc === 'string' && (imgSrc.startsWith('http://') || imgSrc.startsWith('https://'))) {
      setImgSrc(pictureMode.image_url);
    } else {
      setImgFailed(true);
    }
  }, [imgSrc, pictureMode.image_url]);

  const handleSubmit = () => {
    if (wordCount < scaffolding.minWords) return;
    const result = scoreWritingTiered({
      text,
      wordBank: pictureMode.word_bank || [],
      promptEn: pictureMode.writing_prompts?.en || '',
      tier,
      weekNumber: weekId,
    });
    setRubric(result);
    if (result.total >= 8) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Picture */}
      <div className="flex-shrink-0 bg-gradient-to-b from-amber-50 to-white p-3 border-b border-amber-100">
        <div
          className="relative rounded-2xl border-2 border-amber-200 shadow-sm cursor-pointer overflow-hidden"
          onClick={() => imgSrc && !imgFailed && setImgZoomed(true)}
        >
          {imgSrc && !imgFailed ? (
            <img
              src={imgSrc}
              alt={isVi ? 'Tranh viết truyện' : 'Story prompt picture'}
              className="w-full h-auto rounded-xl"
              onError={handleImgError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-amber-400">
              <p className="text-xs">No image</p>
            </div>
          )}
        </div>

        {/* Writing prompts */}
        <div className="mt-2 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
          <p className="text-[10px] font-black uppercase text-amber-600 mb-1 flex items-center gap-1">
            <Lightbulb className="w-3 h-3" />
            {isVi ? 'Gợi ý' : 'Prompts'}
          </p>
          <p className="text-xs text-amber-900 leading-relaxed">
            {isVi ? (pictureMode.writing_prompts?.vi || '') : (pictureMode.writing_prompts?.en || '')}
          </p>
        </div>
      </div>

      {/* Sentence frames — scaffolding for students */}
      {hasFrames && (
        <div className="flex-shrink-0 px-3 py-2 bg-indigo-50 border-b border-indigo-100 space-y-2">
          <p className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">
            {isVi ? '📝 Khung câu gợi ý' : '📝 Sentence Frames'}
            <span className="ml-2 font-normal text-indigo-400">
              {isVi
                ? `viết tối thiểu ${scaffolding.minWords} từ, ${scaffolding.minSentences} câu`
                : `write ${scaffolding.minWords}+ words, ${scaffolding.minSentences}+ sentences`}
            </span>
          </p>
          {visibleFrames.map((frame, fi) => {
            const template = typeof frame === 'string' ? frame : (frame?.template || frame?.text || String(frame || ''));
            const parts = template.split('___');
            return (
              <div key={fi} className="bg-white border border-indigo-200 rounded-xl p-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  {parts.map((p, pi) => (
                    <React.Fragment key={pi}>
                      <span className="text-indigo-900">{p}</span>
                      {pi < parts.length - 1 && (
                        <input
                          type="text"
                          value={frameInputs[`${fi}-${pi}`] || ''}
                          onChange={e => setFrameInputs(prev => ({ ...prev, [`${fi}-${pi}`]: e.target.value }))}
                          placeholder="..."
                          className="min-w-[80px] max-w-[180px] border-b-2 border-indigo-300 bg-white/80 px-1.5 py-0.5 outline-none text-indigo-700 font-bold placeholder:text-slate-300 rounded text-xs"
                          style={{ width: `${Math.max(80, (frameInputs[`${fi}-${pi}`]?.length || 3) * 8)}px` }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Word bank chips — read-only reference for students to type manually */}
      {pictureMode.word_bank && pictureMode.word_bank.length > 0 && (
        <div className="flex-shrink-0 px-3 py-2 bg-slate-50 border-b border-slate-100">
          <p className="text-[10px] font-black uppercase text-slate-500 mb-1.5">
            {isVi ? '💡 Ngân hàng từ (tự gõ vào ô viết)' : '💡 Word bank — use these in your writing'}
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
            {pictureMode.word_bank.map((w, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-white border border-amber-200 text-amber-800 text-[10px] font-medium rounded-full"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Textarea + submit */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3">
        <div className="relative">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={isVi ? 'Viết câu chuyện của em ở đây...' : 'Write your story here...'}
            className="w-full min-h-[180px] p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-400 outline-none resize-y text-sm leading-relaxed text-slate-700"
          />
          {/* Word/sentence progress bar */}
          {(() => {
            const met = wordCount >= scaffolding.minWords;
            return (
              <div className={`flex items-center justify-between mt-2 px-2 py-1.5 rounded-lg border ${met ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-black ${met ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {wordCount}/{scaffolding.minWords} {isVi ? 'từ' : 'words'}
                  </span>
                  <span className={`text-[11px] font-bold ${met ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {met ? '✓' : `→ ${scaffolding.minWords - wordCount} ${isVi ? 'từ nữa' : 'more'}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {met && (
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1"
                    >
                      <BarChart2 size={13} />
                      {isVi ? 'Chấm điểm' : 'Score'}
                    </button>
                  )}
                  {rubric && rubric.total >= 6 && (
                    <button
                      onClick={onGoToSpeak}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs flex items-center gap-1"
                    >
                      {isVi ? 'Kể chuyện' : 'Tell Story'} <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
          </div>

        {/* Rubric result */}
        {rubric && (
          <div className="mt-3 bg-white border-2 border-emerald-200 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <BarChart2 size={14} className="text-emerald-600" />
                <span className="font-black text-emerald-800 uppercase text-xs">
                  {isVi ? 'Kết quả' : 'Score'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {rubric.badge && (
                  <span className="flex items-center gap-1 text-[10px] font-black bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                    <Star size={10} className="fill-yellow-500 text-yellow-500" />
                    {rubric.badge}
                  </span>
                )}
                <span className={`text-xl font-black ${
                  rubric.tier === 'excellent' ? 'text-yellow-600' :
                  rubric.tier === 'good' ? 'text-green-600' : 'text-rose-600'
                }`}>
                  {rubric.total}<span className="text-xs text-slate-400">/{rubric.maxTotal}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(rubric.dimensions).map(([key, dim]) => {
                const labels = { D1: '📋 Task', D2: '📚 Vocab', D3: '✏️ Grammar', D4: '🔗 Link' };
                const colors = { 3: 'bg-green-100 text-green-700', 2: 'bg-amber-100 text-amber-700', 1: 'bg-rose-100 text-rose-700' };
                return (
                  <div key={key} className={`rounded-lg p-2 ${colors[dim.score] || 'bg-slate-100'}`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-black uppercase">{labels[key]}</span>
                      <span className="text-[10px] font-black">{dim.score}/3</span>
                    </div>
                    <p className="text-[9px] leading-relaxed opacity-80">{dim.descriptor}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-50 rounded-lg p-2">
              <p className="text-[9px] font-black uppercase text-slate-400 mb-0.5">
                {isVi ? 'Nhận xét' : 'Feedback'}
              </p>
              <p className="text-[11px] text-slate-700 font-medium leading-relaxed">{rubric.feedback}</p>
            </div>

            {rubric.total >= 8 && (
              <div className="text-center bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-2 border border-amber-200">
                <p className="text-[10px] text-amber-700 font-black">
                  {isVi ? '🎉 Bạn đã unlock thẻ Story Writer mới!' : '🎉 You unlocked a new Story Writer card!'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image lightbox overlay */}
      {imgZoomed && imgSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setImgZoomed(false)}
        >
          <button
            onClick={() => setImgZoomed(false)}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 text-white text-xl font-bold hover:bg-white/40 z-10"
          >
            ✕
          </button>
          <img
            src={imgSrc}
            alt={isVi ? 'Tranh viết truyện' : 'Story prompt picture'}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// TopicMode — Tier 3 (W36+): 2-3 topics, free choice, no time limit
// ─────────────────────────────────────────────────────────────

const TopicMode = ({ topicMode, weekId, savedData, saveProgress, markComplete, isVi, onReportProgress, onGoToSpeak }) => {
  const topics = topicMode.topics || [];
  const [selectedTopicId, setSelectedTopicId] = useState(savedData?.topicId || null);
  const [text, setText] = useState(savedData?.text || '');
  const [rubric, setRubric] = useState(savedData?.rubric || null);

  useEffect(() => {
    if (savedData?.topicId) setSelectedTopicId(savedData.topicId);
    if (savedData?.text) setText(savedData.text);
    if (savedData?.rubric) setRubric(savedData.rubric);
  }, [weekId]);

  // Debounced auto-save
  useEffect(() => {
    if (!selectedTopicId) return;
    const t = setTimeout(() => {
      const isComplete = !!rubric && rubric.total >= 6;
      const percent = rubric ? rubric.total * (100 / rubric.maxTotal) : (text.length > 10 ? 30 : 0);
      saveProgress({ topicId: selectedTopicId, text, rubric }, isComplete, Math.round(percent));
      if (onReportProgress) onReportProgress(Math.round(percent));
    }, 1500);
    return () => clearTimeout(t);
  }, [text, rubric, selectedTopicId]);

  const selectedTopic = topics.find(t => t.id === selectedTopicId);
  const wordCount = useMemo(() => (text || '').trim().split(/\s+/).filter(Boolean).length, [text]);

  const handleSubmit = () => {
    if (wordCount < 10 || !selectedTopic) return;
    const result = scoreWritingTiered({
      text,
      wordBank: selectedTopic.word_bank || [],
      promptEn: selectedTopic.en || '',
      tier: 3,
      weekNumber: weekId,
    });
    setRubric(result);
  };

  if (topics.length === 0) {
    return (
      <div className="p-10 text-center text-slate-400 font-black italic">
        {isVi ? 'Chưa có chủ đề nào' : 'No topics available yet.'}
      </div>
    );
  }

  // Topic selection screen
  if (!selectedTopicId) {
    return (
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-black text-slate-800 uppercase">
          {isVi ? 'Chọn chủ đề' : 'Choose a topic'}
        </h2>
        <p className="text-xs text-slate-500">
          {isVi ? 'Chọn 1 trong các chủ đề sau để viết' : 'Pick one of the following topics to write about'}
        </p>
        {topics.map(topic => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopicId(topic.id)}
            className="w-full text-left p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl hover:border-amber-400 transition-all"
          >
            <p className="font-black text-slate-800 mb-1">{topic.title_en}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{isVi ? topic.vi : topic.en}</p>
          </button>
        ))}
      </div>
    );
  }

  // Writing screen
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 bg-gradient-to-b from-amber-50 to-white p-3 border-b border-amber-100">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-black uppercase text-amber-600">
            {isVi ? 'Chủ đề' : 'Topic'}
          </p>
          <button onClick={() => setSelectedTopicId(null)} className="text-[10px] text-slate-500 underline">
            {isVi ? 'Đổi' : 'Change'}
          </button>
        </div>
        <p className="text-sm font-black text-amber-900 mb-1">{selectedTopic.title_en}</p>
        <p className="text-xs text-amber-800 leading-relaxed">{isVi ? selectedTopic.vi : selectedTopic.en}</p>

        {selectedTopic.word_bank && selectedTopic.word_bank.length > 0 && (
          <div className="mt-2">
            <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
              {isVi ? '💡 Từ vựng (tự gõ vào)' : '💡 Word bank — use these in your writing'}
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
              {selectedTopic.word_bank.map((w, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-white border border-amber-200 text-amber-800 text-[10px] font-medium rounded-full"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-3">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={isVi ? 'Viết bài của em ở đây...' : 'Write your essay here...'}
          className="w-full min-h-[200px] p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-400 outline-none resize-none text-sm leading-relaxed text-slate-700"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] font-bold text-slate-400">
            {wordCount} {isVi ? 'từ' : 'words'}
          </span>
          <div className="flex items-center gap-2">
            {wordCount >= 10 && (
              <button
                onClick={handleSubmit}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1"
              >
                <BarChart2 size={13} />
                {isVi ? 'Chấm điểm' : 'Score'}
              </button>
            )}
            {rubric && rubric.total >= 6 && onGoToSpeak && (
              <button
                onClick={onGoToSpeak}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs flex items-center gap-1"
              >
                {isVi ? 'Kể' : 'Speak'} <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>

        {rubric && (
          <div className="mt-3 bg-white border-2 border-emerald-200 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-emerald-800 uppercase text-xs">
                {isVi ? 'Kết quả' : 'Score'}
              </span>
              <span className={`text-xl font-black ${
                rubric.tier === 'excellent' ? 'text-yellow-600' :
                rubric.tier === 'good' ? 'text-green-600' : 'text-rose-600'
              }`}>
                {rubric.total}<span className="text-xs text-slate-400">/{rubric.maxTotal}</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(rubric.dimensions).map(([key, dim]) => {
                const labels = { D1: '📋 Task', D2: '📚 Vocab', D3: '✏️ Grammar', D4: '🔗 Link' };
                const colors = { 3: 'bg-green-100 text-green-700', 2: 'bg-amber-100 text-amber-700', 1: 'bg-rose-100 text-rose-700' };
                return (
                  <div key={key} className={`rounded-lg p-2 ${colors[dim.score] || 'bg-slate-100'}`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-black uppercase">{labels[key]}</span>
                      <span className="text-[10px] font-black">{dim.score}/3</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-slate-50 rounded-lg p-2">
              <p className="text-[10px] text-slate-700 font-medium">{rubric.feedback}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryWriting;
