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
  showVoiceInput = true 
}) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [shouldAutoSend, setShouldAutoSend] = useState(false); // 🔥 Flag for auto-send
  const [recognition, setRecognition] = useState(null);
  const textareaRef = useRef(null);

  // Auto-send after voice input completes
  useEffect(() => {
    if (shouldAutoSend && message.trim() && !disabled) {
      console.log('🎤 Auto-sending voice input:', message);
      onSend(message.trim());
      setMessage('');
      setShouldAutoSend(false); // Reset flag
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [shouldAutoSend, message, disabled, onSend]);

  // Initialize Web Speech API
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Web Speech API not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setMessage(transcript);
    };

    recognitionInstance.onend = () => {
      console.log('🎤 Voice recognition ended');
      setIsListening(false);
      setShouldAutoSend(true); // 🔥 Trigger auto-send
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
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

  // Handle voice input with Web Speech API
  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setMessage(''); // Clear previous text
      recognition.start();
      setIsListening(true);
    }
  };

  // Determine mic button size (LARGE when no text, small when typing)
  const isMicPriority = message.trim().length === 0;

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex items-end space-x-2">
        {/* PRIORITY Microphone Button - LARGE by default */}
        {showVoiceInput && (
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={disabled}
            className={`
              flex-shrink-0 rounded-full flex items-center justify-center
              transition-all duration-300 ease-in-out
              ${isMicPriority ? 'w-14 h-14' : 'w-10 h-10'}
              ${isListening 
                ? 'bg-red-500 text-white shadow-lg animate-pulse' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-xl hover:scale-105'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? (
              <MicOff size={isMicPriority ? 28 : 20} />
            ) : (
              <Mic size={isMicPriority ? 28 : 20} />
            )}
          </button>
        )}

        {/* Text Input - Appears when user types */}
        <div className={`flex-1 relative transition-all duration-300 ${isMicPriority ? 'opacity-70' : 'opacity-100'}`}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={`
              w-full px-4 py-2 pr-12 rounded-2xl border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              resize-none max-h-32 overflow-y-auto
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            `}
          />
        </div>

        {/* Send Button - Only prominent when text exists */}
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
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>

      {/* Dynamic hint text */}
      <p className="text-xs text-gray-400 mt-2 text-center">
        {isListening 
          ? '🎤 Listening... Speak now!' 
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
