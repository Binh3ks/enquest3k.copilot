import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * ParentPINGate — 4-digit PIN modal for parent/teacher features
 * 
 * Used for:
 * - Unlocking locked quests
 * - Accessing Settings (mode change, reports)
 * - Future: time limits, content controls
 * 
 * PIN stored in localStorage (default: 0000 if not set during onboarding)
 */

const PIN_STORAGE_KEY = 'engquest_parent_pin';
const PIN_LENGTH = 4;

export function getParentPIN() {
  return localStorage.getItem(PIN_STORAGE_KEY) || '0000';
}

export function setParentPIN(pin) {
  localStorage.setItem(PIN_STORAGE_KEY, pin);
}

export function isPINSet() {
  const pin = localStorage.getItem(PIN_STORAGE_KEY);
  return pin && pin !== '0000';
}

export default function ParentPINGate({ 
  isOpen, 
  onClose, 
  onSuccess, 
  title, 
  subtitle,
  allowMathBypass = false // STRICT DEFAULT: false for Quest Map / Hard Lock. Only true for Settings / External Links
}) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setDigits(['', '', '', '']);
      setError(false);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDigitChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setError(false);

    // Auto-advance to next input
    if (value && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 4 digits entered
    if (value && index === PIN_LENGTH - 1) {
      const enteredPIN = newDigits.join('');
      const correctPIN = getParentPIN();
      
      if (enteredPIN === correctPIN) {
        onSuccess?.();
        onClose?.();
      } else {
        setError(true);
        setShaking(true);
        setTimeout(() => {
          setShaking(false);
          setDigits(['', '', '', '']);
          inputRefs.current[0]?.focus();
        }, 600);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[9998] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center transition-transform ${
          shaking ? 'animate-[shake_0.5s_ease-in-out]' : ''
        }`}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-500 rounded-xl hover:bg-slate-100 transition"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl">
          🔒
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-slate-800 mb-1">
          {title || 'Nhờ ba/mẹ nhập mã PIN'}
        </h3>
        <p className="text-sm font-medium text-slate-400 mb-6">
          {subtitle || 'Nhập mã PIN 4 số để tiếp tục'}
        </p>

        {/* PIN inputs */}
        <div className="flex items-center justify-center gap-3 mb-4">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={el => inputRefs.current[i] = el}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleDigitChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className={`w-14 h-14 text-center text-2xl font-black rounded-2xl border-2 outline-none transition-all ${
                error
                  ? 'border-red-400 bg-red-50 text-red-600'
                  : digit
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-slate-50 text-slate-800 focus:border-indigo-400 focus:bg-white'
              }`}
              autoComplete="off"
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm font-bold text-red-500 mb-4 animate-[fadeIn_0.3s_ease-out]">
            ❌ Mã PIN không đúng. Thử lại nhé!
          </p>
        )}

        {/* Switch to Math Challenge ONLY when allowMathBypass is explicitly enabled (Settings / External Links) */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          {allowMathBypass ? (
            <button
              type="button"
              onClick={() => {
                const isMultiplication = Math.random() > 0.5;
                let promptText = '';
                let expectedAnswer = 0;

                if (isMultiplication) {
                  const num1 = Math.floor(Math.random() * 35) + 34; // 34..68
                  const num2 = Math.floor(Math.random() * 4) + 6;   // 6..9
                  expectedAnswer = num1 * num2;
                  promptText = `👤 Dành cho Phụ huynh: Hãy giải phép tính sau để xác nhận quyền người lớn:\n\n${num1} × ${num2} = ?`;
                } else {
                  const num1 = Math.floor(Math.random() * 250) + 135; // 135..384
                  const num2 = Math.floor(Math.random() * 130) + 68;  // 68..197
                  expectedAnswer = num1 + num2;
                  promptText = `👤 Dành cho Phụ huynh: Hãy giải phép tính sau để xác nhận quyền người lớn:\n\n${num1} + ${num2} = ?`;
                }

                const ans = prompt(promptText);
                if (ans && parseInt(ans.trim(), 10) === expectedAnswer) {
                  onSuccess?.();
                  onClose?.();
                } else if (ans !== null) {
                  alert('❌ Câu trả lời chưa chính xác.');
                }
              }}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
            >
              🧮 Giải toán phụ huynh (Apple Gate)
            </button>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400">
              🔒 Chỉ phụ huynh có mã PIN mới được mở
            </span>
          )}
          <span className="text-[11px] font-medium text-slate-300">
            Mặc định: 0000
          </span>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-6px); }
          30%, 70% { transform: translateX(6px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
