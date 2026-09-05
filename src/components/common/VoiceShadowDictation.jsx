import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Volume2, CheckCircle2, AlertCircle, Sparkles, HelpCircle, RotateCcw, ChevronRight, ChevronLeft, Mic, Trophy } from 'lucide-react';
import { playButtonClick, playCorrectSound, playVictoryFanfare } from '../../utils/soundEffects';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import './VoiceShadowDictation.css';

/**
 * VoiceShadowDictation — 3-Step Dictation Engine for Gear 2 (Voice Shadow)
 * 1. Step 1: Authentic Two-Play Listening (student listens without seeing full text)
 * 2. Step 2: Visual Diff Verification (color-coded word diff: Green=Correct, Red=Typo/Missing)
 * 3. Step 3: Listen & Shadow Loop (target speech model + recording reinforcement)
 */
export default function VoiceShadowDictation({
  sentence = '',
  sentenceIdx = 0,
  totalSentences = 1,
  activeWeek = 33,
  onCompleteSentence,
  onNext,
  onPrev,
}) {
  const cleanTargetText = useMemo(() => {
    return (sentence || '').replace(/\*\*/g, '').trim();
  }, [sentence]);

  const targetWords = useMemo(() => {
    return cleanTargetText.split(/\s+/).filter(Boolean);
  }, [cleanTargetText]);

  const [userInput, setUserInput] = useState('');
  const [playCount, setPlayCount] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [diffResult, setDiffResult] = useState(null); // { score, words: [], isPerfect }
  const [hasChecked, setHasChecked] = useState(false);

  // Reset when sentence index changes
  useEffect(() => {
    setUserInput('');
    setPlayCount(0);
    setDiffResult(null);
    setHasChecked(false);
    setShowHint(false);
    setIsPlayingAudio(false);
  }, [sentenceIdx, cleanTargetText]);

  // Audio Playback
  const handlePlayAudio = (speed = playbackSpeed) => {
    playButtonClick();
    setIsPlayingAudio(true);
    setPlayCount(prev => prev + 1);

    const sentenceAudioUrl = `/audio/week${activeWeek || 33}/shadowing_${sentenceIdx + 1}.mp3`;

    speakText(
      cleanTargetText,
      sentenceAudioUrl,
      speed,
      () => {
        setIsPlayingAudio(false);
      },
      'shadowing',
      activeWeek
    );
  };

  // Generate Word Skeleton Hint (e.g. "Jake was walking" -> "J___ w__ w______")
  const wordSkeletonHint = useMemo(() => {
    return targetWords
      .map(word => {
        const punctuation = word.match(/[.,!?;:]+$/)?.[0] || '';
        const core = word.replace(/[.,!?;:]+$/, '');
        if (core.length <= 1) return word;
        return core[0] + '_'.repeat(core.length - 1) + punctuation;
      })
      .join(' ');
  }, [targetWords]);

  // Levenshtein distance helper for fuzzy typo detection
  const levenshteinDistance = (a, b) => {
    const matrix = Array.from({ length: a.length + 1 }, () => []);
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1].toLowerCase() === b[j - 1].toLowerCase() ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[a.length][b.length];
  };

  // Diff verification engine
  const handleCheckDictation = () => {
    playButtonClick();
    if (!userInput.trim()) return;

    const userWords = userInput.trim().split(/\s+/).filter(Boolean);
    const results = [];
    let correctCount = 0;

    targetWords.forEach((targetWord, idx) => {
      const userWord = userWords[idx] || '';
      const cleanTarget = targetWord.replace(/[.,!?;:"]+/g, '').toLowerCase();
      const cleanUser = userWord.replace(/[.,!?;:"]+/g, '').toLowerCase();

      if (!userWord) {
        // Missing word
        results.push({
          type: 'missing',
          expected: targetWord,
          actual: '',
          message: 'Missing word',
        });
      } else if (cleanUser === cleanTarget) {
        // Correct (check case difference as minor warning)
        correctCount += 1;
        const isCaseExact = userWord.replace(/[.,!?;:"]+/g, '') === targetWord.replace(/[.,!?;:"]+/g, '');
        results.push({
          type: isCaseExact ? 'correct' : 'case_warn',
          expected: targetWord,
          actual: userWord,
          message: isCaseExact ? 'Correct' : 'Check capitalization',
        });
      } else {
        // Check if typo (distance <= 2)
        const dist = levenshteinDistance(cleanUser, cleanTarget);
        if (dist <= 2) {
          results.push({
            type: 'typo',
            expected: targetWord,
            actual: userWord,
            message: `Spelling typo (expected "${targetWord}")`,
          });
        } else {
          results.push({
            type: 'wrong',
            expected: targetWord,
            actual: userWord,
            message: `Wrong word (expected "${targetWord}")`,
          });
        }
      }
    });

    // Handle any extra words typed beyond target length
    if (userWords.length > targetWords.length) {
      for (let i = targetWords.length; i < userWords.length; i++) {
        results.push({
          type: 'extra',
          expected: '',
          actual: userWords[i],
          message: 'Extra word',
        });
      }
    }

    const accuracyScore = Math.round((correctCount / targetWords.length) * 100);
    const isPerfect = accuracyScore === 100 && userWords.length === targetWords.length;

    setDiffResult({
      score: accuracyScore,
      words: results,
      isPerfect,
    });
    setHasChecked(true);

    if (isPerfect) {
      playCorrectSound();
      fireCelebrationConfetti('Dictation_100');
      onCompleteSentence?.({ sentenceIdx, score: 100 });
    } else if (accuracyScore >= 70) {
      playCorrectSound();
      onCompleteSentence?.({ sentenceIdx, score: accuracyScore });
    }
  };

  const handleRetry = () => {
    playButtonClick();
    setHasChecked(false);
    setDiffResult(null);
  };

  return (
    <div className="vsd-container">
      {/* Header Bar */}
      <div className="vsd-header">
        <div className="vsd-badge-group">
          <span className="vsd-pill vsd-pill-badge">
            ✍️ DICTATION NOTEPAD
          </span>
          <span className="vsd-stepper-label">
            Sentence {sentenceIdx + 1} of {totalSentences}
          </span>
        </div>

        {/* Audio Listen Controls */}
        <div className="vsd-audio-controls">
          <div className="vsd-speed-toggle">
            <button
              type="button"
              className={`vsd-speed-btn ${playbackSpeed === 1.0 ? 'active' : ''}`}
              onClick={() => {
                setPlaybackSpeed(1.0);
                handlePlayAudio(1.0);
              }}
            >
              1.0x Normal
            </button>
            <button
              type="button"
              className={`vsd-speed-btn ${playbackSpeed === 0.8 ? 'active' : ''}`}
              onClick={() => {
                setPlaybackSpeed(0.8);
                handlePlayAudio(0.8);
              }}
              title="Slow speed for catching word endings"
            >
              🐢 0.8x Slow
            </button>
          </div>

          <button
            type="button"
            onClick={() => handlePlayAudio(playbackSpeed)}
            disabled={isPlayingAudio}
            className={`vsd-listen-btn ${isPlayingAudio ? 'playing' : ''}`}
          >
            <Volume2 size={16} />
            <span>{isPlayingAudio ? 'Listening...' : playCount === 0 ? '🔊 Listen (Play 1)' : `🔊 Listen (${playCount} plays)`}</span>
          </button>
        </div>
      </div>

      {/* Writing Pad Card */}
      <div className="vsd-pad-card">
        <div className="vsd-pad-instruction">
          <div className="vsd-instruction-text">
            <span>🎧 <strong>Listen to the audio</strong> and write the complete sentence below:</span>
          </div>
          <button
            type="button"
            onClick={() => setShowHint(prev => !prev)}
            className="vsd-hint-toggle"
          >
            <HelpCircle size={14} />
            <span>{showHint ? 'Hide Hint' : '💡 Show Word Hint'}</span>
          </button>
        </div>

        {/* Word Skeleton Hint Box */}
        {showHint && (
          <div className="vsd-hint-box">
            <span className="vsd-hint-title">Word Structure:</span>
            <span className="vsd-hint-content">{wordSkeletonHint}</span>
          </div>
        )}

        {/* Input Textarea / Notepad View */}
        {!hasChecked ? (
          <div className="vsd-input-area">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type what you hear here... (e.g. Jake was walking...)"
              rows={3}
              className="vsd-textarea"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleCheckDictation();
                }
              }}
            />
            <div className="vsd-input-footer">
              <span className="vsd-word-count">
                {userInput.trim() ? userInput.trim().split(/\s+/).length : 0} / {targetWords.length} words
              </span>
              <button
                type="button"
                onClick={handleCheckDictation}
                disabled={!userInput.trim()}
                className="vsd-check-btn"
              >
                <CheckCircle2 size={16} /> Check My Dictation
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Visual Diff Verification Result */
          <div className="vsd-diff-area">
            <div className="vsd-score-banner">
              <div className="vsd-score-pill">
                {diffResult?.isPerfect ? (
                  <span className="vsd-score-perfect">🎉 100% PERFECT SPELLING!</span>
                ) : diffResult?.score >= 70 ? (
                  <span className="vsd-score-good">✨ {diffResult?.score}% ACCURACY — Great Effort!</span>
                ) : (
                  <span className="vsd-score-retry">💪 {diffResult?.score}% — Listen again to fix errors!</span>
                )}
              </div>
              <span className="vsd-diff-legend">
                <span className="legend-item legend-green">🟢 Correct</span>
                <span className="legend-item legend-red">🔴 Typo / Missing</span>
              </span>
            </div>

            {/* Word Chips Diff Display */}
            <div className="vsd-diff-words">
              {diffResult?.words.map((item, idx) => {
                if (item.type === 'correct') {
                  return (
                    <span key={idx} className="vsd-word-chip vsd-word-correct" title="Correct spelling">
                      ✓ {item.actual}
                    </span>
                  );
                }
                if (item.type === 'case_warn') {
                  return (
                    <span key={idx} className="vsd-word-chip vsd-word-case" title={`Check capital letter: ${item.expected}`}>
                      ⚠️ {item.actual} <small>({item.expected})</small>
                    </span>
                  );
                }
                if (item.type === 'typo') {
                  return (
                    <span key={idx} className="vsd-word-chip vsd-word-typo" title={`Spelling typo. Expected: "${item.expected}"`}>
                      <s className="vsd-strike">{item.actual}</s>
                      <span className="vsd-expected">➔ {item.expected}</span>
                    </span>
                  );
                }
                if (item.type === 'missing') {
                  return (
                    <span key={idx} className="vsd-word-chip vsd-word-missing" title="You missed this word">
                      + [{item.expected}]
                    </span>
                  );
                }
                return (
                  <span key={idx} className="vsd-word-chip vsd-word-wrong" title={item.message}>
                    <s className="vsd-strike">{item.actual}</s>
                    {item.expected && <span className="vsd-expected">➔ {item.expected}</span>}
                  </span>
                );
              })}
            </div>

            {/* Target Native Sentence Reference */}
            <div className="vsd-target-ref">
              <span className="vsd-ref-label">Target Model:</span>
              <span className="vsd-ref-text">{cleanTargetText}</span>
              <button
                type="button"
                onClick={() => handlePlayAudio(1.0)}
                className="vsd-ref-listen"
              >
                <Volume2 size={13} /> Listen Model
              </button>
            </div>

            {/* Diff Actions */}
            <div className="vsd-diff-actions">
              <button
                type="button"
                onClick={handleRetry}
                className="vsd-action-secondary"
              >
                <RotateCcw size={14} /> Try Typing Again
              </button>

              {onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="vsd-action-primary"
                >
                  <span>Next Sentence</span>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="vsd-nav-footer">
        <button
          type="button"
          onClick={onPrev}
          disabled={sentenceIdx === 0}
          className="vsd-nav-btn"
        >
          <ChevronLeft size={14} /> Previous
        </button>

        <span className="vsd-nav-counter">
          {sentenceIdx + 1} / {totalSentences}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={sentenceIdx === totalSentences - 1 && !diffResult?.isPerfect}
          className="vsd-nav-btn"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
