import useTutorStore from '../../services/ai_tutor/tutorStore';
import FloatingButton from './components/FloatingButton';
import TutorWindow from './components/TutorWindow';

/**
 * AITutorWidget - Global Floating AI Tutor
 * Premium V5 Architecture
 * 
 * Features:
 * - Floating button accessible from all pages
 * - Persistent conversation state
 * - 5-tab mini-dashboard (Story, Chat, Speak, Quiz, Debate)
 * - Multi-provider AI (Groq → Gemini fallback)
 * - 4-layer TTS system with auto-play
 * - Resizable window (normal/large modes)
 */
const AITutorWidget = () => {
  const { isWidgetOpen } = useTutorStore();

  return (
    <>
      {/* Floating Button - Always Visible */}
      <FloatingButton />
      
      {/* Tutor Window - Visible When Open */}
      {isWidgetOpen && <TutorWindow />}
    </>
  );
};

export default AITutorWidget;
