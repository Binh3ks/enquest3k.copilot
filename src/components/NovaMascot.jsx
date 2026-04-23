import novaLanding    from '../assets/nova-landing.png';
import novaSidebar    from '../assets/nova-sidebar.png';
import novaHappy      from '../assets/nova-happy.png';
import novaAchieve    from '../assets/nova-achievement.png';
import novaEncourage  from '../assets/nova-encourage.png';
import novaThinking   from '../assets/nova-thinking.png';
import novaLetsgo     from '../assets/nova-letsgo.png';
import novaListening  from '../assets/nova-listening.png';

// mood → PNG mapping (see Các expression trong app.docx)
// 'landing'     → Landing page hero
// 'sidebar'     → Sidebar logo
// 'happy'       → Chào đón đầu buổi học
// 'achievement' → Trả lời đúng / khen ngợi
// 'encourage'   → Trả lời sai / khuyến khích
// 'thinking'    → AI xử lý / loading / câu khó
// 'letsgo'      → Story Mission / Weekly Review boss
// 'listening'   → Dictation / Shadowing

const MOOD_SRC = {
  landing:     novaLanding,
  sidebar:     novaSidebar,
  happy:       novaHappy,
  achievement: novaAchieve,
  encourage:   novaEncourage,
  thinking:    novaThinking,
  letsgo:      novaLetsgo,
  listening:   novaListening,
};

const NovaMascot = ({ size = 80, mood = 'happy', className = '' }) => (
  <img
    src={MOOD_SRC[mood] ?? novaHappy}
    alt="Nova mascot"
    width={size}
    style={{ width: size, height: 'auto', display: 'inline-block' }}
    className={`select-none ${className}`}
    draggable={false}
  />
);

export default NovaMascot;

