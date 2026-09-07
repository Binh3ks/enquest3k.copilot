/**
 * AncientScrollFillGame.jsx — Ancient Scroll Fill (Day 2/5 — Door 3 Integration)
 *
 * Mechanic: Passage gap-fill with tap-to-insert word bank.
 *   - Show a short 3–4 sentence CLIL passage with 5 blanks marked [_N_]
 *   - 8 word tiles in the Word Bank below the passage
 *   - Tap a blank → it highlights (selected)
 *   - Tap a word → it fills the selected blank
 *   - Can tap a filled blank to "unplace" word back to bank
 *   - Submit when all blanks filled — grade & show stars
 *
 * Stars: all 5 = 3★ | 3–4 = 2★ | 1–2 = 1★ | 0 = 0★ (no complete callback)
 */

import React, { useState, useCallback, useMemo } from 'react';
import GameInstructionModal from './GameInstructionModal';
import { HelpCircle } from 'lucide-react';

// ─── Build passage from hub data ──────────────────────────────────────────────

function buildScrollData(vocabItems, grammarSentences) {
  // Prefer grammarSentences as passage source (they're proper Cambridge sentences)
  const sentences = grammarSentences
    .map(s => (typeof s === 'string' ? s : s.sentence || ''))
    .filter(s => s.length > 15)
    .slice(0, 4);

  if (sentences.length < 3 || vocabItems.length < 5) {
    // Default fallback passage (W33 theme)
    return {
      passageTitle: 'The Science of Friction',
      blanks: [
        {
          before: 'Friction is the ',
          answer: 'grip',
          after: ' between your shoes and the floor.',
          idx: 0,
        },
        {
          before: 'When the floor is ',
          answer: 'wet',
          after: ', it becomes very slippery.',
          idx: 1,
        },
        {
          before: 'Rubber soles provide a ',
          answer: 'strong',
          after: ' grip that keeps you balanced.',
          idx: 2,
        },
        {
          before: 'You should walk ',
          answer: 'carefully',
          after: ' in the corridor to stay safe.',
          idx: 3,
        },
        {
          before: 'Always look for the yellow ',
          answer: 'warning',
          after: ' sign on a wet floor.',
          idx: 4,
        },
      ],
      distractors: ['smooth', 'heavy', 'quickly', 'clean'],
    };
  }

  // Build blanks from vocab items — extract the word from a sentence where it appears
  const targetWords = vocabItems
    .filter(v => v.word && v.word.length > 3)
    .slice(0, 5);

  const blanks = [];
  const usedSentences = new Set();

  for (const vocab of targetWords) {
    // Find a sentence containing this word
    const matchSentence = sentences.find(
      s => !usedSentences.has(s) && s.toLowerCase().includes(vocab.word.toLowerCase())
    );
    if (matchSentence) {
      usedSentences.add(matchSentence);
      const wordIdx = matchSentence.toLowerCase().indexOf(vocab.word.toLowerCase());
      blanks.push({
        before: matchSentence.slice(0, wordIdx),
        answer: vocab.word,
        after:  matchSentence.slice(wordIdx + vocab.word.length),
        idx:    blanks.length,
      });
    } else {
      // Use vocab definition as context
      blanks.push({
        before: `The word "${vocab.word}" means: `,
        answer: vocab.definition || vocab.word,
        after:  '.',
        idx:    blanks.length,
      });
    }
    if (blanks.length >= 5) break;
  }

  // Pad to 5 if needed
  while (blanks.length < 5) {
    const filler = targetWords[blanks.length % targetWords.length];
    blanks.push({
      before: 'Another key term is ',
      answer: filler?.word || 'word',
      after:  `, which means ${filler?.definition || 'something important'}.`,
      idx:    blanks.length,
    });
  }

  // 3 distractors = extra vocab words not used as answers
  const answerSet = new Set(blanks.map(b => b.answer.toLowerCase()));
  const distractors = vocabItems
    .filter(v => v.word && !answerSet.has(v.word.toLowerCase()))
    .slice(0, 3)
    .map(v => v.word);
  while (distractors.length < 3) distractors.push(['smooth', 'careful', 'safe'][distractors.length]);

  return {
    passageTitle: 'Vocabulary in Context',
    blanks,
    distractors,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AncientScrollFillGame({
  vocabItems = [],
  grammarSentences = [],
  onComplete,
  duration = 120,
}) {
  const scrollData = useMemo(
    () => buildScrollData(vocabItems, grammarSentences),
    [vocabItems, grammarSentences]
  );

  // Word bank = correct answers + distractors, shuffled
  const initialBank = useMemo(() => {
    const words = [
      ...scrollData.blanks.map(b => b.answer),
      ...scrollData.distractors,
    ].sort(() => Math.random() - 0.5);
    return words;
  }, [scrollData]);

  const [phase, setPhase]                 = useState('intro'); // intro | filling | result
  const [selections, setSelections]       = useState({});      // { [blankIdx]: 'placedWord' }
  const [selectedBlank, setSelectedBlank] = useState(null);    // idx of currently active blank
  const [usedWords, setUsedWords]         = useState(new Set()); // Set of placed words
  const [stars, setStars]                 = useState(0);
  const [submitted, setSubmitted]         = useState(false);
  const [showHelp, setShowHelp]           = useState(false);

  const allFilled = scrollData.blanks.every(b => selections[b.idx] !== undefined);

  // ── Tap blank ─────────────────────────────────────────────────────────────

  const tapBlank = useCallback((idx) => {
    if (submitted) return;
    if (selectedBlank === idx) {
      setSelectedBlank(null); // deselect
    } else {
      setSelectedBlank(idx);
    }
  }, [selectedBlank, submitted]);

  // ── Tap word tile ─────────────────────────────────────────────────────────

  const tapWord = useCallback((word) => {
    if (submitted) return;
    if (usedWords.has(word)) return; // already placed

    if (selectedBlank === null) return; // need to select a blank first

    // Place word into selected blank
    const newSel = { ...selections };
    const displaced = newSel[selectedBlank]; // word previously in this blank
    newSel[selectedBlank] = word;
    setSelections(newSel);

    const newUsed = new Set(usedWords);
    newUsed.add(word);
    if (displaced) newUsed.delete(displaced); // free up displaced word
    setUsedWords(newUsed);

    setSelectedBlank(null);
  }, [selectedBlank, selections, usedWords, submitted]);

  // ── Tap filled blank (to unplace) ─────────────────────────────────────────

  const unplaceBlank = useCallback((idx) => {
    if (submitted) return;
    const word = selections[idx];
    if (!word) return;

    const newSel = { ...selections };
    delete newSel[idx];
    setSelections(newSel);

    const newUsed = new Set(usedWords);
    newUsed.delete(word);
    setUsedWords(newUsed);
    setSelectedBlank(idx); // auto-select the now-empty blank
  }, [selections, usedWords, submitted]);

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(() => {
    if (!allFilled) return;
    let correct = 0;
    for (const blank of scrollData.blanks) {
      if (selections[blank.idx]?.toLowerCase() === blank.answer.toLowerCase()) correct++;
    }
    const earnedStars = correct === 5 ? 3 : correct >= 3 ? 2 : correct >= 1 ? 1 : 0;
    setStars(earnedStars);
    setSubmitted(true);
    setPhase('result');
    setTimeout(() => {
      onComplete && onComplete(earnedStars, { correct, total: 5 });
    }, 2500);
  }, [allFilled, scrollData, selections, onComplete]);

  // ─── INTRO ────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <GameInstructionModal
        isOpen={true}
        isIntro={true}
        gameType="ancient_scroll"
        onStart={() => setPhase('filling')}
      />
    );
  }

  // ─── RESULT ───────────────────────────────────────────────────────────────
  if (phase === 'result') {
    const correct = scrollData.blanks.filter(
      b => selections[b.idx]?.toLowerCase() === b.answer.toLowerCase()
    ).length;

    return (
      <div className="chronicles-game ancient-scroll">
        <div className="cg-result-screen">
          <div className="cg-result-stars">
            {[1, 2, 3].map(n => (
              <span key={n} className={`cg-star ${n <= stars ? 'earned' : 'empty'}`}>★</span>
            ))}
          </div>
          <div className="cg-result-title">
            {stars === 3 ? '📜 Scroll Master!' : stars === 2 ? '🖊️ Good Scholar!' : stars >= 1 ? '📖 Keep Reading!' : '💤 Try Again!'}
          </div>
          <div className="cg-result-stats">
            <span>✅ {correct}/5 correct</span>
          </div>
          {/* Show corrections */}
          <div className="asf-corrections">
            {scrollData.blanks.map(b => {
              const chosen = selections[b.idx];
              const right  = chosen?.toLowerCase() === b.answer.toLowerCase();
              return (
                <div key={b.idx} className={`asf-correction-row ${right ? 'correct' : 'wrong'}`}>
                  <span className="asf-corr-icon">{right ? '✅' : '❌'}</span>
                  <span className="asf-corr-text">
                    {right ? chosen : <><s>{chosen}</s> → <strong>{b.answer}</strong></>}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="cgr-actions" style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {stars === 0 && <button className="cg-retry-btn" onClick={() => setPhase('filling')}>🔄 Retry</button>}
            <button
              className="cg-continue-btn"
              onClick={() => onComplete && onComplete(stars, { correct, total: 5 })}
              disabled={stars === 0}
            >
              {stars > 0 ? '→ Continue' : '🔒 Need at least 1★'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── FILLING ──────────────────────────────────────────────────────────────

  return (
    <div className="chronicles-game ancient-scroll">
      <GameInstructionModal
        isOpen={showHelp}
        isIntro={false}
        gameType="ancient_scroll"
        onClose={() => setShowHelp(false)}
      />

      <div className="asf-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <h3 className="asf-title">📜 {scrollData.passageTitle}</h3>
          <button
            type="button"
            className="cg-help-trigger-btn"
            onClick={() => setShowHelp(true)}
            title="How to play"
          >
            <HelpCircle size={14} />
            <span>How to Play</span>
          </button>
        </div>
        {selectedBlank !== null && (
          <div className="asf-instruction">Tap a word from the bank below to fill blank #{selectedBlank + 1}</div>
        )}
        {selectedBlank === null && !allFilled && (
          <div className="asf-instruction">Tap any blank on the scroll to start filling</div>
        )}
      </div>

      {/* Passage with blanks */}
      <div className="asf-passage">
        {scrollData.blanks.map((blank, i) => {
          const filled    = selections[blank.idx];
          const isSelected = selectedBlank === blank.idx;
          const isCorrect  = submitted && filled?.toLowerCase() === blank.answer.toLowerCase();
          const isWrong    = submitted && filled && !isCorrect;

          return (
            <span key={blank.idx} className="asf-sentence-frag">
              {blank.before}
              <button
                id={`asf-blank-${blank.idx}`}
                className={`asf-blank ${filled ? 'filled' : 'empty'} ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                onClick={() => filled ? unplaceBlank(blank.idx) : tapBlank(blank.idx)}
              >
                {filled || `_${i + 1}_`}
              </button>
              {blank.after}
              {' '}
            </span>
          );
        })}
      </div>

      {/* Word Bank */}
      <div className="asf-word-bank">
        <div className="asf-bank-label">📦 Word Bank</div>
        <div className="asf-tiles">
          {initialBank.map((word) => {
            const placed   = usedWords.has(word);
            const isAnswer = scrollData.blanks.some(b => b.answer.toLowerCase() === word.toLowerCase());
            return (
              <button
                key={word}
                id={`asf-tile-${word}`}
                className={`asf-tile ${placed ? 'placed' : ''} ${selectedBlank !== null && !placed ? 'selectable' : ''}`}
                onClick={() => tapWord(word)}
                disabled={placed}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        id="asf-submit-btn"
        className={`asf-submit-btn ${allFilled ? 'ready' : 'disabled'}`}
        onClick={handleSubmit}
        disabled={!allFilled}
      >
        {allFilled ? '📜 Submit Scroll' : `Fill ${5 - Object.keys(selections).length} more blank(s)`}
      </button>
    </div>
  );
}
