import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Mic, MicOff } from 'lucide-react';

/**
 * InputBar - Message input with send button and PRIORITY microphone
 * SPEC: Mic button is LARGE by default, only shrinks when user types
 * @param {Object} props
 * @param {Function} props.onSend - Callback when message is sent
 * @param {boolean} props.disabled - Disable input when loading
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.showVoiceInput - Show microphone button (default true)
 */
const InputBar = ({
  onSend,
  disabled = false,
  placeholder = 'Speak or type...',
  showVoiceInput = true,
  onHintSelect = null  // callback(text) — lets parent inject text into input
}) => {
  const [message, setMessage] = useState('');

  // Expose setMessage to parent via onHintSelect
  useEffect(() => {
    if (onHintSelect) {
      onHintSelect.current = (text) => {
        // Strip ___ placeholders for cleaner UX
        const cleaned = text.replace(/\s*___/g, '').trim();
        setMessage(cleaned);
        textareaRef.current?.focus();
      };
    }
  }, [onHintSelect]);
  const [isListening, setIsListening] = useState(false);
  const [shouldAutoSend, setShouldAutoSend] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const textareaRef = useRef(null);

  // Auto-send after voice input completes
  useEffect(() => {
    if (shouldAutoSend && message.trim() && !disabled) {
      console.log('📤 Auto-sending:', message);
      onSend(message.trim());
      setMessage('');
      setShouldAutoSend(false);
      
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [shouldAutoSend, message, disabled, onSend]);

  // Initialize Web Speech API - SIMPLE & STABLE (from V6-FINAL backup)
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('⚠️ Web Speech API not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    
    // 🔥 SIMPLE CONFIG - No continuous, no interim results
    rec.continuous = false; // Records until natural pause (~1-2 seconds silence)
    rec.interimResults = false; // Only get final result
    rec.lang = 'en-US';

    rec.onstart = () => {
      console.log('🎤 Recording started');
    };

    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('📝 Transcript:', transcript);
      setMessage(transcript);
      
      // Auto-send after successful recognition
      setTimeout(() => {
        setShouldAutoSend(true);
      }, 300);
    };

    rec.onend = () => {
      console.log('⏹️ Recording ended');
      setIsListening(false);
    };

    rec.onerror = (event) => {
      console.error('❌ Speech recognition error:', event.error);
      setIsListening(false);
      
      // User-friendly error messages
      if (event.error === 'no-speech') {
        alert('No speech detected. Please try again.');
      } else if (event.error === 'aborted') {
        // Silent - user stopped manually
      } else {
        alert(`Speech recognition error: ${event.error}`);
      }
    };

    setRecognition(rec);

    return () => {
      if (rec) {
        try {
          rec.stop();
        } catch (e) {
          // Already stopped
        }
      }
    };
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  // Handle send
  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // Handle Enter key (Shift+Enter for new line)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle voice input button click - SIMPLIFIED
  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Speech recognition not supported. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      // User clicked stop - abort current recording
      console.log('🛑 User manually stopped recording');
      setIsListening(false);
      
      try {
        recognition.abort(); // Use abort() to cancel without triggering onresult
      } catch (e) {
        console.error('Stop error:', e);
      }
    } else {
      // User clicked start - begin new recording
      console.log('🎤 User started recording');
      setMessage(''); // Clear previous message
      setShouldAutoSend(false);
      
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error('Start error:', error);
        
        // If already running, stop first then retry
        if (error.message && error.message.includes('already started')) {
          try {
            recognition.stop();
            setTimeout(() => {
              recognition.start();
              setIsListening(true);
            }, 200);
          } catch (e) {
            console.error('Retry error:', e);
            alert('Speech recognition is busy. Please try again.');
          }
        } else {
          alert('Could not start speech recognition. Please try again.');
        }
      }
    }
  };

  // Handle keyboard input - stop mic if user starts typing
  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    
    // If user types while mic is on, stop recording
    if (isListening && newMessage.length > message.length) {
      console.log('⌨️ User typing - stopping mic');
      setIsListening(false);
      
      try {
        recognition.abort(); // Cancel without saving
      } catch (e) {
        console.error('Abort error:', e);
      }
    }

    setMessage(newMessage);
  };

  // Determine mic button size (LARGE when no text, small when typing)
  const isMicPriority = message.trim().length === 0;

  return (
    <div className="bg-white border-t border-gray-200 p-6"> {/* Bigger padding */}
      <div className="flex items-end space-x-4"> {/* More space between elements */}
        {/* PRIORITY Microphone Button - LARGE by default */}
        {showVoiceInput && (
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={disabled}
            className={`
              relative flex-shrink-0 rounded-full flex items-center justify-center
              transition-all duration-300 ease-in-out
              ${isMicPriority ? 'w-16 h-16' : 'w-12 h-12'}
              ${isListening
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-xl hover:scale-105'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {/* Waveform effect when listening */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></div>
                <div className="absolute inset-0 rounded-full bg-red-300 animate-pulse"></div>
              </>
            )}

            {/* Icon with bigger sizes */}
            <div className="relative z-10">
              {isListening ? (
                <MicOff size={isMicPriority ? 32 : 24} />
              ) : (
                <Mic size={isMicPriority ? 32 : 24} />
              )}
            </div>
          </button>
        )}

        {/* Text Input - Appears when user types */}
        <div className={`flex-1 relative transition-all duration-300 ${isMicPriority ? 'opacity-70' : 'opacity-100'}`}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={`
              w-full px-6 py-4 pr-12 rounded-2xl border-2 border-gray-300 {/* Bigger padding and border */}
              text-base leading-relaxed {/* Larger text */}
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              resize-none max-h-32 overflow-y-auto
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            `}
          />
        </div>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className={`
            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-300
            ${disabled || !message.trim()
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed scale-90'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-110'
            }
          `}
          aria-label="Send message"
        >
          {disabled ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>

      {/* Dynamic hint text */}
      <p className="text-xs text-gray-400 mt-2 text-center">
        {isListening
          ? '🎤 Listening... Speak naturally, it will auto-stop!'
          : isMicPriority
            ? '🎤 Tap mic to speak • or type to chat'
            : 'Press Enter to send • Shift+Enter for new line'
        }
      </p>

      {/* Speech recognition status indicator */}
      {isListening && (
        <div className="mt-2 flex items-center justify-center space-x-1">
          <div className="w-1 h-3 bg-red-500 rounded animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1 h-4 bg-red-500 rounded animate-pulse" style={{ animationDelay: '100ms' }}></div>
          <div className="w-1 h-5 bg-red-500 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-1 h-4 bg-red-500 rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
          <div className="w-1 h-3 bg-red-500 rounded animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>
      )}
    </div>
  );
};

export default InputBar;
