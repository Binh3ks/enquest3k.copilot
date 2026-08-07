import { User, Sparkles, Volume2 } from 'lucide-react';

/**
 * ChatBubble - Displays a single message in the chat
 * @param {Object} props
 * @param {string} props.role - 'user' | 'assistant'
 * @param {string|Object} props.content - Message text or AI response object
 * @param {number} props.timestamp - Message timestamp
 * @param {string} props.pedagogyNote - Optional pedagogy note for debugging
 * @param {Array<string>} props.hints - Optional hints to display after AI message
 * @param {string} props.mode - Current mode (only show hints in roleplay)
 * @param {Function} props.onPlay - Optional callback to play text via TTS
 */
const ChatBubble = ({ role, content, timestamp, pedagogyNote, hints = [], mode = '', onPlay }) => {
  const isAssistant = role === 'assistant';
  
  // 🔥 Clean content extraction - prevent JSON garbage
  let messageText = '';
  if (typeof content === 'string') {
    messageText = content;
  } else if (content && typeof content === 'object') {
    // Extract clean text from AI response object
    messageText = content.ai_response || content.response || content.content || content.message || '';
    // If still an object, try to stringify cleanly
    if (typeof messageText === 'object') {
      messageText = 'System message processed';
    }
  } else {
    messageText = 'Invalid message';
  }
  
  // Remove any JSON-like patterns that leaked through
  messageText = messageText.replace(/^[\{\[].*[\}\]]$/s, 'Processing...');
  
  return (
    <div className={`flex items-start space-x-2 mb-4 ${isAssistant ? '' : 'flex-row-reverse space-x-reverse'}`}>
      {/* Avatar */}
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
        ${isAssistant 
          ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
          : 'bg-blue-500'
        }
      `}>
        {isAssistant ? (
          <Sparkles className="text-white" size={16} />
        ) : (
          <User className="text-white" size={16} />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[70%] ${isAssistant ? '' : 'flex justify-end'}`}>
        <div className={`
          rounded-2xl px-3 py-2 shadow-sm max-w-[85%]
          ${isAssistant 
            ? 'bg-gradient-to-br from-white to-gray-50 text-gray-800 rounded-tl-md border-l-2 border-purple-400' 
            : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-md shadow-blue-200'
          }
        `}>
          {/* Message Text & Speaker Icon */}
          <div className="flex items-start justify-between gap-2">
            <p className="text-base leading-relaxed whitespace-pre-wrap font-semibold flex-1">
              {messageText}
            </p>
            {isAssistant && (
              <button
                onClick={() => onPlay && onPlay(messageText)}
                className="p-1 text-purple-500 hover:text-purple-700 hover:bg-purple-100 rounded-full transition-colors flex-shrink-0"
                title="Nghe lại phát âm"
              >
                <Volume2 size={18} />
              </button>
            )}
          </div>
          
          {/* Timestamp */}
          <p className={`
            text-xs mt-1 font-medium
            ${isAssistant ? 'text-gray-500' : 'text-blue-200'}
          `}>
            {new Date(timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>

          {/* Pedagogy Note (Debug Mode) */}
          {pedagogyNote && import.meta.env.DEV && (
            <div className="mt-1 pt-1 border-t border-gray-200">
              <p className="text-xs text-purple-600 font-mono">
                📚 {pedagogyNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
