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
      className="fixed top-[12px] z-50 transition-all duration-300 shadow-lg hover:shadow-purple-500/60"
      style={{ right: '180px' }}
      aria-label="Open AI Tutor"
    >
      {/* Main Button - Compact size */}
      <div className="relative px-3 py-1.5 rounded-lg flex items-center gap-1.5 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:scale-105 active:scale-95 transition-transform duration-200">
        {/* Icon */}
        <Sparkles className="text-white animate-pulse" size={16} />
        
        {/* Text */}
        <div className="flex flex-col leading-tight">
          <span className="text-white font-black text-xs">Ms. Nova</span>
          <span className="text-white/90 font-bold text-[9px]">Talk with me!</span>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 hover:opacity-30 blur-lg transition-opacity duration-300" />
      </div>
    </button>
  );
};

export default FloatingButton;
