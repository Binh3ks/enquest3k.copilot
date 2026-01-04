import { User, Sparkles } from 'lucide-react';

/**
 * ChatBubble - Displays a single message in the chat
 * @param {Object} props
 * @param {string} props.role - 'user' | 'assistant'
 * @param {string|Object} props.content - Message text or AI response object
 * @param {number} props.timestamp - Message timestamp
 * @param {string} props.pedagogyNote - Optional pedagogy note for debugging
 */
const ChatBubble = ({ role, content, timestamp, pedagogyNote }) => {
  const isAssistant = role === 'assistant';
  
  // 🔥 Handle both string and object content (for backwards compatibility)
  const messageText = typeof content === 'string' 
    ? content 
    : content?.ai_response || content?.content || JSON.stringify(content);
  
  return (
    <div className={`flex items-start space-x-3 mb-4 ${isAssistant ? '' : 'flex-row-reverse space-x-reverse'}`}>
      {/* Avatar */}
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
        ${isAssistant 
          ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
          : 'bg-blue-500'
        }
      `}>
        {isAssistant ? (
          <Sparkles className="text-white" size={20} />
        ) : (
          <User className="text-white" size={20} />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[70%] ${isAssistant ? '' : 'flex justify-end'}`}>
        <div className={`
          rounded-2xl px-4 py-3 shadow-sm
          ${isAssistant 
            ? 'bg-white text-gray-800 rounded-tl-sm' 
            : 'bg-blue-500 text-white rounded-tr-sm'
          }
        `}>
          {/* Message Text */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {messageText}
          </p>
          
          {/* Timestamp */}
          <p className={`
            text-xs mt-1 
            ${isAssistant ? 'text-gray-400' : 'text-blue-100'}
          `}>
            {new Date(timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>

          {/* Pedagogy Note (Debug Mode) */}
          {pedagogyNote && import.meta.env.DEV && (
            <div className="mt-2 pt-2 border-t border-gray-200">
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
