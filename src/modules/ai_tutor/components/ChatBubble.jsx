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
    <div className={`flex items-start space-x-4 mb-8 ${isAssistant ? '' : 'flex-row-reverse space-x-reverse'}`}> {/* More spacing between messages */}
      {/* Avatar */}
      <div className={`
        flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center {/* Bigger avatar */}
        ${isAssistant 
          ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
          : 'bg-blue-500'
        }
      `}>
        {isAssistant ? (
          <Sparkles className="text-white" size={24} />
        ) : (
          <User className="text-white" size={24} />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[70%] ${isAssistant ? '' : 'flex justify-end'}`}>
        <div className={`
          rounded-3xl px-6 py-5 shadow-lg max-w-[85%] {/* Bigger padding, better shadow, wider max-width */}
          ${isAssistant 
            ? 'bg-gradient-to-br from-white to-gray-50 text-gray-800 rounded-tl-md border-l-4 border-purple-400' 
            : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-md shadow-blue-200'
          }
        `}>
          {/* Message Text with larger font */}
          <p className="text-xl leading-relaxed whitespace-pre-wrap font-medium"> {/* Even bigger text */}
            {messageText}
          </p>
          
          {/* Timestamp */}
          <p className={`
            text-base mt-3 font-medium {/* Bigger timestamp with more margin */}
            ${isAssistant ? 'text-gray-500' : 'text-blue-200'}
          `}>
            {new Date(timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>

          {/* Pedagogy Note (Debug Mode) */}
          {pedagogyNote && import.meta.env.DEV && (
            <div className="mt-3 pt-3 border-t border-gray-200"> {/* Bigger spacing */}
              <p className="text-sm text-purple-600 font-mono"> {/* Bigger debug text */}
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
