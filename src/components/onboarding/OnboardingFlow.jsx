import React, { useState, useEffect, useCallback } from 'react';
import LexioMascot from '../mascot/LexioMascot';
import VoiceConsentStep, { setVoiceConsent } from './VoiceConsent';
import { setParentPIN } from '../common/ParentPINGate';
import { useUserStore } from '../../stores/useUserStore';
import './OnboardingFlow.css';

/**
 * OnboardingFlow — 7-step first-time experience (revised per critique)
 * 
 * Step 1: "Hi! I'm Lexio!" — Enter name
 * Step 2: Parent Checkpoint — How long learning English + set PIN
 * Step 3: "How old are you?" — Age group
 * Step 4: Adaptive Mini-Quest — 3 micro-tasks (placement + teach interaction)
 * Step 5: Voice Consent — Permission to record (legal compliance)
 * Step 6: "Meet Nova!" — Shadowing demo
 * Step 7: "Your Quest Map" — Ready!
 */

const STEPS = [
  { id: 'welcome', title: 'Meet Lexio' },
  { id: 'parent', title: 'Parent Info' },
  { id: 'age', title: 'About You' },
  { id: 'placement', title: 'Try It!' },
  { id: 'consent', title: 'Voice Permission' },
  { id: 'nova', title: 'Meet Nova' },
  { id: 'ready', title: 'Ready!' },
];

const AGE_OPTIONS = [
  { label: '6-7', value: '6-7', emoji: '🧒' },
  { label: '8-9', value: '8-9', emoji: '👦' },
  { label: '10-11', value: '10-11', emoji: '🧑' },
];

const ENG_DURATION_OPTIONS = [
  { label: 'Chưa học bao giờ', value: 'none', emoji: '🌱' },
  { label: 'Dưới 1 năm', value: 'lt1', emoji: '🌿' },
  { label: '1-2 năm', value: '1-2', emoji: '🌳' },
  { label: 'Trên 2 năm', value: 'gt2', emoji: '🏆' },
];

// Mini-Quest placement items
const PLACEMENT_TASKS = [
  {
    id: 'read',
    type: 'image_match',
    sentence: 'The cat is sleeping on the bed.',
    options: [
      { text: 'A cat on a bed', correct: true, emoji: '🐱🛏️' },
      { text: 'A dog in a park', correct: false, emoji: '🐕🌳' },
    ],
  },
  {
    id: 'listen',
    type: 'audio_match',
    audioText: 'She is reading a book.',
    options: [
      { text: 'She is reading a book.', correct: true },
      { text: 'She is riding a bike.', correct: false },
    ],
  },
  {
    id: 'speak',
    type: 'say_word',
    word: 'Hello',
    emoji: '👋',
  },
];

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedAge, setSelectedAge] = useState(null);
  const [engDuration, setEngDuration] = useState(null);
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Placement state
  const [placementIndex, setPlacementIndex] = useState(0);
  const [placementResults, setPlacementResults] = useState([]);
  const [placementDone, setPlacementDone] = useState(false);

  const updateProfile = useUserStore(s => s.updateProfile);
  const toggleLearningMode = useUserStore(s => s.toggleLearningMode);
  const learningMode = useUserStore(s => s.learningMode);

  const goNext = useCallback(() => {
    if (step >= STEPS.length - 1) {
      // Complete onboarding — determine mode
      if (name.trim()) {
        updateProfile?.({ displayName: name.trim() });
      }
      
      // Determine recommended mode from placement + parent input
      const correctCount = placementResults.filter(r => r.correct).length;
      const isAdvanced = (engDuration === 'gt2' || engDuration === '1-2') && correctCount >= 2;
      const recommendedMode = isAdvanced ? 'advanced' : 'easy';
      
      // Set mode if different from current
      if (learningMode !== recommendedMode) {
        toggleLearningMode?.();
      }
      
      localStorage.setItem('engquest_onboarded', '1');
      localStorage.setItem('engquest_placement_mode', recommendedMode);
      onComplete?.();
      return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(s => s + 1);
      setIsTransitioning(false);
    }, 300);
  }, [step, name, onComplete, updateProfile, placementResults, engDuration, learningMode, toggleLearningMode]);

  const goBack = () => {
    if (step > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(s => s - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Placement task handler
  const handlePlacementAnswer = (correct) => {
    const newResults = [...placementResults, { taskId: PLACEMENT_TASKS[placementIndex].id, correct }];
    setPlacementResults(newResults);
    
    if (placementIndex < PLACEMENT_TASKS.length - 1) {
      setPlacementIndex(i => i + 1);
    } else {
      setPlacementDone(true);
      setTimeout(goNext, 1200);
    }
  };

  // PIN change handler
  const handlePinChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...pinDigits];
    newDigits[index] = value;
    setPinDigits(newDigits);
  };

  const savePIN = () => {
    const pin = pinDigits.join('');
    if (pin.length === 4) {
      setParentPIN(pin);
      setShowPinSetup(false);
    }
  };

  return (
    <div className="onboarding-overlay">
      <div className={`onboarding-card ${isTransitioning ? 'onboarding-transitioning' : ''}`}>
        {/* Progress dots */}
        <div className="onboarding-progress">
          {STEPS.map((s, i) => (
            <div key={s.id} className={`onboarding-dot ${i === step ? 'active' : i < step ? 'done' : ''}`} />
          ))}
        </div>

        {/* Skip button */}
        <button
          className="onboarding-skip"
          onClick={() => {
            localStorage.setItem('engquest_onboarded', '1');
            onComplete?.();
          }}
        >
          Skip
        </button>

        {/* Step Content */}
        <div className="onboarding-content">
          {/* === STEP 1: Welcome === */}
          {step === 0 && (
            <div className="onboarding-step">
              <LexioMascot size={140} mood="waving" className="onboarding-mascot" />
              <h1 className="onboarding-title">Hi! I'm Lexio! 🦊</h1>
              <p className="onboarding-subtitle">I'm your English learning buddy!</p>
              <div className="onboarding-input-group">
                <label className="onboarding-label">What's your name?</label>
                <input
                  type="text"
                  className="onboarding-input"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && name.trim() && goNext()}
                  autoFocus
                  maxLength={20}
                />
              </div>
              <button className="onboarding-btn-primary" onClick={goNext} disabled={!name.trim()}>
                Nice to meet you! →
              </button>
            </div>
          )}

          {/* === STEP 2: Parent Checkpoint === */}
          {step === 1 && (
            <div className="onboarding-step">
              <div style={{ fontSize: 48, marginBottom: 12 }}>👋</div>
              <h1 className="onboarding-title">Chào ba/mẹ!</h1>
              <p className="onboarding-subtitle">
                {name} đã học tiếng Anh được bao lâu rồi?
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', marginBottom: 16 }}>
                {ENG_DURATION_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`onboarding-age-btn ${engDuration === opt.value ? 'selected' : ''}`}
                    onClick={() => setEngDuration(opt.value)}
                    style={{ padding: '12px 8px' }}
                  >
                    <span style={{ fontSize: 24 }}>{opt.emoji}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#334155' }}>{opt.label}</span>
                  </button>
                ))}
              </div>

              {/* PIN setup toggle */}
              {!showPinSetup ? (
                <button
                  onClick={() => setShowPinSetup(true)}
                  style={{
                    width: '100%', padding: '10px', background: '#f8fafc', border: '1px solid #e2e8f0',
                    borderRadius: 12, fontSize: 12, fontWeight: 700, color: '#64748b', cursor: 'pointer',
                    marginBottom: 16, textAlign: 'center',
                  }}
                >
                  🔒 Đặt mã PIN phụ huynh (tùy chọn)
                </button>
              ) : (
                <div style={{
                  width: '100%', padding: 16, background: '#f8fafc', border: '2px solid #e2e8f0',
                  borderRadius: 16, marginBottom: 16, textAlign: 'center',
                }}>
                  <p style={{ fontSize: 12, fontWeight: 800, color: '#64748b', marginBottom: 10 }}>
                    Đặt mã PIN 4 số
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
                    {pinDigits.map((d, i) => (
                      <input
                        key={i}
                        type="tel"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={e => handlePinChange(i, e.target.value)}
                        style={{
                          width: 44, height: 44, textAlign: 'center', fontSize: 20, fontWeight: 800,
                          borderRadius: 12, border: '2px solid #cbd5e1', outline: 'none',
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={savePIN}
                    disabled={pinDigits.join('').length < 4}
                    style={{
                      padding: '8px 20px', background: pinDigits.join('').length === 4 ? '#6366f1' : '#e2e8f0',
                      color: pinDigits.join('').length === 4 ? 'white' : '#94a3b8',
                      borderRadius: 10, border: 'none', fontSize: 12, fontWeight: 800, cursor: 'pointer',
                    }}
                  >
                    ✅ Lưu PIN
                  </button>
                </div>
              )}

              <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginBottom: 16, fontStyle: 'italic' }}>
                Thông tin này giúp Lexio chọn bài phù hợp cho con.
              </p>

              <button className="onboarding-btn-primary" onClick={goNext} disabled={!engDuration}>
                Tiếp tục →
              </button>
            </div>
          )}

          {/* === STEP 3: Age === */}
          {step === 2 && (
            <div className="onboarding-step">
              <LexioMascot size={100} mood="happy" className="onboarding-mascot" />
              <h1 className="onboarding-title">Great, {name}! 🎉</h1>
              <p className="onboarding-subtitle">How old are you?</p>
              <div className="onboarding-age-grid">
                {AGE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`onboarding-age-btn ${selectedAge === opt.value ? 'selected' : ''}`}
                    onClick={() => setSelectedAge(opt.value)}
                  >
                    <span className="onboarding-age-emoji">{opt.emoji}</span>
                    <span className="onboarding-age-label">{opt.label}</span>
                  </button>
                ))}
              </div>
              <button className="onboarding-btn-primary" onClick={goNext} disabled={!selectedAge}>
                Continue →
              </button>
            </div>
          )}

          {/* === STEP 4: Adaptive Mini-Quest (Placement) === */}
          {step === 3 && (
            <div className="onboarding-step">
              <LexioMascot 
                size={72} 
                mood={placementDone ? 'celebrate' : 'encourage'} 
                className="onboarding-mascot" 
              />
              
              {!placementDone ? (
                <>
                  <h1 className="onboarding-title">Try It! 👆</h1>
                  <p className="onboarding-subtitle" style={{ marginBottom: 12 }}>
                    Task {placementIndex + 1} of {PLACEMENT_TASKS.length}
                  </p>

                  {/* Progress bar */}
                  <div style={{
                    width: '100%', height: 6, background: '#e2e8f0', borderRadius: 3,
                    marginBottom: 20, overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', background: 'linear-gradient(90deg, #6366f1, #4f46e5)',
                      borderRadius: 3, transition: 'width 0.5s ease',
                      width: `${(placementIndex / PLACEMENT_TASKS.length) * 100}%`,
                    }} />
                  </div>

                  {/* Current task */}
                  {(() => {
                    const task = PLACEMENT_TASKS[placementIndex];
                    
                    if (task.type === 'image_match') {
                      return (
                        <div style={{ width: '100%' }}>
                          <p style={{ fontSize: 15, fontWeight: 700, color: '#334155', marginBottom: 16, textAlign: 'center' }}>
                            "{task.sentence}"
                          </p>
                          <p style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 12 }}>
                            Which picture matches? 👇
                          </p>
                          <div style={{ display: 'flex', gap: 12 }}>
                            {task.options.map((opt, i) => (
                              <button
                                key={i}
                                onClick={() => handlePlacementAnswer(opt.correct)}
                                style={{
                                  flex: 1, padding: 20, background: '#f8fafc', border: '2px solid #e2e8f0',
                                  borderRadius: 16, cursor: 'pointer', textAlign: 'center',
                                  transition: 'all 0.2s',
                                }}
                                onMouseOver={e => { e.target.style.borderColor = '#6366f1'; e.target.style.background = '#eef2ff'; }}
                                onMouseOut={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; }}
                              >
                                <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>{opt.emoji}</span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#334155' }}>{opt.text}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    if (task.type === 'audio_match') {
                      return (
                        <div style={{ width: '100%' }}>
                          <p style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 12 }}>
                            🔊 Listen and choose the correct sentence:
                          </p>
                          <div style={{
                            padding: 16, background: '#eef2ff', borderRadius: 16, marginBottom: 16,
                            textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#4338ca',
                          }}>
                            🔊 "{task.audioText}"
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {task.options.map((opt, i) => (
                              <button
                                key={i}
                                onClick={() => handlePlacementAnswer(opt.correct)}
                                style={{
                                  padding: '14px 20px', background: 'white', border: '2px solid #e2e8f0',
                                  borderRadius: 14, cursor: 'pointer', fontSize: 14, fontWeight: 700,
                                  color: '#334155', textAlign: 'left', transition: 'all 0.2s',
                                }}
                                onMouseOver={e => { e.target.style.borderColor = '#6366f1'; }}
                                onMouseOut={e => { e.target.style.borderColor = '#e2e8f0'; }}
                              >
                                {opt.text}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    if (task.type === 'say_word') {
                      return (
                        <div style={{ width: '100%', textAlign: 'center' }}>
                          <p style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 12 }}>
                            Say this word out loud! 🗣️
                          </p>
                          <div style={{
                            padding: 24, background: '#f0fdf4', borderRadius: 20, marginBottom: 20,
                            fontSize: 36, fontWeight: 900, color: '#166534',
                          }}>
                            {task.emoji} {task.word}
                          </div>
                          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button
                              onClick={() => handlePlacementAnswer(true)}
                              style={{
                                padding: '12px 24px', background: '#10b981', color: 'white',
                                borderRadius: 14, border: 'none', fontSize: 14, fontWeight: 800, cursor: 'pointer',
                              }}
                            >
                              ✅ I said it!
                            </button>
                            <button
                              onClick={() => handlePlacementAnswer(false)}
                              style={{
                                padding: '12px 24px', background: '#f1f5f9', color: '#64748b',
                                borderRadius: 14, border: '2px solid #e2e8f0', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                              }}
                            >
                              Skip
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })()}
                </>
              ) : (
                <div className="onboarding-success" style={{ marginTop: 16 }}>
                  <span style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>🌟</span>
                  <span style={{ fontSize: 18, fontWeight: 800 }}>Amazing! Great job, {name}!</span>
                </div>
              )}
            </div>
          )}

          {/* === STEP 5: Voice Consent === */}
          {step === 4 && (
            <VoiceConsentStep
              onAccept={() => {
                setVoiceConsent(true);
                goNext();
              }}
              onDecline={() => {
                setVoiceConsent(false);
                goNext();
              }}
            />
          )}

          {/* === STEP 6: Meet Nova === */}
          {step === 5 && (
            <div className="onboarding-step">
              <LexioMascot size={80} mood="listening" className="onboarding-mascot" />
              <h1 className="onboarding-title">Meet Nova! 🎤</h1>
              <p className="onboarding-subtitle">Nova reads stories for you. Listen and repeat!</p>
              <div className="onboarding-nova-demo">
                <div className="onboarding-nova-bubble">
                  <span className="onboarding-nova-icon">🔊</span>
                  <span className="onboarding-nova-text">"Jake was walking carefully down the corridor."</span>
                </div>
                <p className="onboarding-hint">
                  In the app, you'll shadow Nova's voice to improve your English!
                </p>
              </div>
              <button className="onboarding-btn-primary" onClick={goNext}>
                Cool! Let's go! →
              </button>
            </div>
          )}

          {/* === STEP 7: Ready === */}
          {step === 6 && (
            <div className="onboarding-step">
              <LexioMascot size={120} mood="celebrate" className="onboarding-mascot" />
              <h1 className="onboarding-title">You're Ready! 🚀</h1>
              <p className="onboarding-subtitle">
                Each week, you have 5 quests. Complete them to become an English star!
              </p>
              <div className="onboarding-quest-preview">
                {['🔍 Explorer', '🎙️ Storyteller', '⚔️ Word Hero', '✏️ Creator', '🏆 Final Challenge'].map((q, i) => (
                  <div key={i} className="onboarding-quest-item">
                    <div className={`onboarding-quest-dot ${i === 0 ? 'active' : ''}`} />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
              <button className="onboarding-btn-primary onboarding-btn-glow" onClick={goNext}>
                Start My First Quest! 🎉
              </button>
            </div>
          )}
        </div>

        {/* Back button */}
        {step > 0 && (
          <button className="onboarding-btn-back" onClick={goBack}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
