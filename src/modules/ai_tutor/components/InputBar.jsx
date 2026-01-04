import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Mic, MicOff } from 'lucide-react';

/**
 * InputBar - Message input with send button and voice input
 * @param {Object} props
 * @param {Function} props.onSend - Callback when message is sent
 * @param {boolean} props.disabled - Disable input when loading
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.showVoiceInput - Show microphone button
 */
const InputBar = ({ 
  onSend, 
  disabled = false, 
  placeholder = 'Type your message...', 
  showVoiceInput = false 
}) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef(null);

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

  // Handle voice input (placeholder - to be implemented)
  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // TODO: Implement Web Speech API
    console.log('Voice input:', isListening ? 'stopped' : 'started');
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex items-end space-x-2">
        {/* Voice Input Button */}
        {showVoiceInput && (
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={disabled}
            className={`
              flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-200
              ${isListening 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            aria-label="Voice input"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        )}

        {/* Text Input */}
        <div className="flex-1 relative">
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

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className={`
            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-200
            ${disabled || !message.trim()
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105'
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

      {/* Hint text */}
      <p className="text-xs text-gray-400 mt-2 text-center">
        Press Enter to send • Shift+Enter for new line
      </p>
    </div>
  );
};

export default InputBar;
