import { Sparkles, X } from 'lucide-react';
import useTutorStore from '../../../services/ai_tutor/tutorStore';

/**
 * FloatingButton - Global AI Tutor Widget Button
 * Appears on all pages, opens the tutor window when clicked
 */
const FloatingButton = () => {
  const { isWidgetOpen, toggleWidget, isAudioPlaying } = useTutorStore();

  // Don't show button when widget is open (X button is in header)
  if (isWidgetOpen) return null;

  return (
    <button
      onClick={toggleWidget}
      className="fixed bottom-6 right-6 z-50 transition-all duration-300 shadow-2xl"
      aria-label="Open AI Tutor"
    >
      {/* Main Button */}
      <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:scale-110 active:scale-95 transition-transform duration-200">
        {/* Icon */}
        <Sparkles className="text-white" size={28} />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 hover:opacity-30 blur-xl transition-opacity duration-300" />
      </div>

      {/* Label */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Ask Ms. Nova 💬
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </div>
    </button>
  );
};

export default FloatingButton;
