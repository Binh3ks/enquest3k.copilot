import { User, Sparkles } from 'lucide-react';

/**
 * ChatBubble - Displays a single message in the chat
 * @param {Object} props
 * @param {string} props.role - 'user' | 'assistant'
 * @param {string|Object} props.content - Message text or AI response object
 * @param {number} props.timestamp - Message timestamp
 * @param {string} props.pedagogyNote - Optional pedagogy note for debugging
 * @param {Array<string>} props.hints - Optional hints to display after AI message
 */
const ChatBubble = ({ role, content, timestamp, pedagogyNote, hints = [] }) => {
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
          {/* Message Text */}
          <p className="text-base leading-relaxed whitespace-pre-wrap font-semibold">
            {messageText}
          </p>
          
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

      {/* 💡 Hints - Show immediately after AI question */}
      {isAssistant && hints.length > 0 && (
        <div className="mt-1 bg-yellow-50 border border-yellow-300 rounded-lg px-2 py-1.5 shadow-sm">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-[10px] font-semibold text-yellow-700">💡 Hints:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {hints.map((hint, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-white border border-yellow-300 rounded-full text-sm font-semibold text-gray-800 shadow-sm"
              >
                {hint}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
