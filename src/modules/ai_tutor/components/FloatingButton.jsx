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
      className="fixed top-[56px] z-50 transition-all duration-300 shadow-md hover:shadow-purple-500/50"
      style={{ left: 'calc(288px + (100vw - 288px) / 2)', transform: 'translateX(-50%)' }}
      aria-label="Open AI Tutor"
    >
      {/* Main Button - compact */}
      <div className="relative px-4 py-1.5 rounded-lg flex items-center gap-2 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:scale-105 active:scale-95 transition-transform duration-200">
        {/* Icon */}
        <Sparkles className="text-white animate-pulse" size={16} />
        
        {/* Text */}
        <div className="flex flex-col leading-tight">
          <span className="text-white font-black text-sm">Nova</span>
          <span className="text-white/90 font-bold text-[10px]">Talk with me!</span>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 hover:opacity-30 blur-lg transition-opacity duration-300" />
      </div>
    </button>
  );
};

export default FloatingButton;
