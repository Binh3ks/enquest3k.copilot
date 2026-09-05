import React, { useState, useCallback } from 'react';
import { PenTool, ChevronDown, ChevronUp, CheckCircle, Send } from 'lucide-react';
import './QuickWritePanel.css';

/**
 * QuickWritePanel — Collapsible mini-writing panel embedded in quests.
 * Encourages daily micro-writing with scaffold pills.
 *
 * Props:
 *   prompt       — Writing prompt text (e.g. "Write 1 sentence about what happened")
 *   scaffoldPills — Array of word/phrase suggestions student can tap to insert
 *   minWords     — Minimum words required (default 3)
 *   maxWords     — Maximum words (default 20)
 *   onSubmit     — (text: string) => void — called when student submits
 *   isLiteMode   — If true, show Draw & Say (placeholder for W01–W16)
 */

export default function QuickWritePanel({
  prompt = 'Write 1 sentence about what you learned.',
  scaffoldPills = [],
  minWords = 3,
  maxWords = 20,
  onSubmit,
  isLiteMode = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const isValid = wordCount >= minWords && wordCount <= maxWords;

  const handlePillClick = useCallback((pill) => {
    setText(prev => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed} ${pill}` : pill;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isValid || submitted) return;
    setSubmitted(true);
    onSubmit?.(text.trim());
  }, [isValid, submitted, text, onSubmit]);

  // Lite Mode: Draw & Say placeholder
  if (isLiteMode) {
    return (
      <div className="qw-container qw-lite">
        <div className="qw-header" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="qw-header-left">
            <PenTool size={14} />
            <span>🎨 Draw & Say</span>
          </div>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isExpanded && (
          <div className="qw-lite-content">
            <p className="qw-lite-text">Vẽ một bức tranh và nói 1 câu tiếng Anh! 🖍️</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`qw-container ${submitted ? 'qw-submitted' : ''}`}>
      {/* Collapsible header */}
      <div className="qw-header" onClick={() => !submitted && setIsExpanded(!isExpanded)}>
        <div className="qw-header-left">
          {submitted ? <CheckCircle size={14} /> : <PenTool size={14} />}
          <span>{submitted ? 'Quick Write ✅' : '✏️ Quick Write'}</span>
        </div>
        {!submitted && (isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
      </div>

      {/* Expanded content */}
      {isExpanded && !submitted && (
        <div className="qw-body">
          <p className="qw-prompt">{prompt}</p>

          {/* Scaffold pills */}
          {scaffoldPills.length > 0 && (
            <div className="qw-pills">
              {scaffoldPills.map((pill, i) => (
                <button
                  key={i}
                  type="button"
                  className="qw-pill"
                  onClick={() => handlePillClick(pill)}
                >
                  {pill}
                </button>
              ))}
            </div>
          )}

          {/* Text area */}
          <textarea
            className="qw-textarea"
            placeholder="Write here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
          />

          {/* Word count + submit */}
          <div className="qw-footer">
            <span className={`qw-word-count ${isValid ? 'qw-valid' : ''}`}>
              {wordCount}/{maxWords} từ {wordCount < minWords && `(tối thiểu ${minWords})`}
            </span>
            <button
              type="button"
              className="qw-submit-btn"
              onClick={handleSubmit}
              disabled={!isValid}
            >
              <Send size={14} />
              <span>Gửi</span>
            </button>
          </div>
        </div>
      )}

      {/* Submitted feedback */}
      {submitted && (
        <div className="qw-feedback">
          <span>Tuyệt vời! Bạn đã viết {wordCount} từ! 🌟</span>
        </div>
      )}
    </div>
  );
}
