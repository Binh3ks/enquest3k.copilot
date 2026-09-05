import React, { useState, useCallback } from 'react';
import { CheckCircle, XCircle, HelpCircle, MessageCircle, Lightbulb, ChevronRight } from 'lucide-react';
import './InferenceQuestion.css';

/**
 * InferenceQuestion — "Why?" question component for CLIL (Fact Finder).
 * Supports two modes:
 *   1. mcq_with_evidence — MCQ where correct option shows text evidence
 *   2. open_response     — Free text input scored by keyword matching
 *
 * Scaffolding tiers:
 *   Tier 1 (Learn Mode): MCQ + evidence highlight + hint
 *   Tier 2 (Check Mode): MCQ only
 *   Tier 3 (Advanced):   Open response with keyword scoring
 */

export default function InferenceQuestion({
  question,          // { id, text, type, options?, correct?, scaffoldHint?, modelAnswer?, acceptableKeywords? }
  isCheckMode = false,
  onComplete,        // (result: { id, score, isCorrect }) => void
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [openText, setOpenText] = useState('');
  const [openResult, setOpenResult] = useState(null); // { score, matchedKeywords }

  if (!question) return null;

  const isMCQ = question.type === 'mcq_with_evidence';
  const tier = isCheckMode ? 2 : (question.type === 'open_response' ? 3 : 1);

  // ── MCQ Handler ────────────────────────────────────────
  const handleMCQSelect = useCallback((index) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);

    const isCorrect = index === question.correct;
    onComplete?.({
      id: question.id,
      score: isCorrect ? 1 : 0,
      isCorrect,
    });
  }, [answered, question, onComplete]);

  // ── Open Response Handler ──────────────────────────────
  const handleOpenSubmit = useCallback(() => {
    if (!openText.trim()) return;
    setAnswered(true);

    const keywords = question.acceptableKeywords || [];
    const lowerText = openText.toLowerCase();
    const matched = keywords.filter(kw => lowerText.includes(kw.toLowerCase()));
    const score = keywords.length > 0
      ? Math.min(1, matched.length / Math.max(1, Math.ceil(keywords.length * 0.5)))
      : 0.5; // Participation credit if no keywords defined

    setOpenResult({ score, matchedKeywords: matched });
    onComplete?.({
      id: question.id,
      score: Math.round(score * 100) / 100,
      isCorrect: score >= 0.5,
    });
  }, [openText, question, onComplete]);

  return (
    <div className="inf-container">
      {/* Question badge */}
      <div className="inf-badge">
        <MessageCircle size={14} />
        <span>Suy luận (Inference)</span>
      </div>

      {/* Question text */}
      <h3 className="inf-question">{question.text}</h3>

      {/* Hint button — only Tier 1 */}
      {tier === 1 && question.scaffoldHint && !showHint && !answered && (
        <button
          type="button"
          className="inf-hint-btn"
          onClick={() => setShowHint(true)}
        >
          <Lightbulb size={14} />
          <span>Gợi ý</span>
        </button>
      )}

      {showHint && (
        <div className="inf-hint-box">
          <Lightbulb size={14} />
          <span>{question.scaffoldHint}</span>
        </div>
      )}

      {/* ── MCQ Options ── */}
      {isMCQ && question.options && (
        <div className="inf-options">
          {question.options.map((opt, i) => {
            const optText = typeof opt === 'string' ? opt : opt.text;
            const evidence = typeof opt === 'object' ? opt.evidence : null;
            const isSelected = selectedOption === i;
            const isCorrectOption = i === question.correct;

            let optClass = 'inf-option';
            if (answered) {
              if (isCorrectOption) optClass += ' inf-option-correct';
              else if (isSelected && !isCorrectOption) optClass += ' inf-option-wrong';
            } else if (isSelected) {
              optClass += ' inf-option-selected';
            }

            return (
              <button
                key={i}
                type="button"
                className={optClass}
                onClick={() => handleMCQSelect(i)}
                disabled={answered}
              >
                <span className="inf-option-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="inf-option-text">{optText}</span>
                {answered && isCorrectOption && <CheckCircle size={16} className="inf-icon-correct" />}
                {answered && isSelected && !isCorrectOption && <XCircle size={16} className="inf-icon-wrong" />}
                {/* Evidence highlight — Tier 1 only, after answering */}
                {answered && isCorrectOption && evidence && tier === 1 && (
                  <div className="inf-evidence">
                    <span className="inf-evidence-label">📖 Bằng chứng:</span>
                    <span className="inf-evidence-text">{evidence}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Open Response ── */}
      {!isMCQ && (
        <div className="inf-open-response">
          <textarea
            className="inf-textarea"
            placeholder="Viết câu trả lời bằng tiếng Anh..."
            value={openText}
            onChange={(e) => setOpenText(e.target.value)}
            disabled={answered}
            rows={3}
          />
          {!answered ? (
            <button
              type="button"
              className="inf-submit-btn"
              onClick={handleOpenSubmit}
              disabled={!openText.trim()}
            >
              <span>Gửi câu trả lời</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <div className="inf-open-feedback">
              {openResult && openResult.score >= 0.5 ? (
                <div className="inf-feedback-good">
                  <CheckCircle size={16} />
                  <span>Tốt lắm! Từ khóa đúng: {openResult.matchedKeywords.join(', ')}</span>
                </div>
              ) : (
                <div className="inf-feedback-try">
                  <HelpCircle size={16} />
                  <span>Câu trả lời mẫu: {question.modelAnswer}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
