import novaHappy     from '../assets/nova-happy.png';
import novaCelebrate from '../assets/nova-celebrate.png';
import novaThinking  from '../assets/nova-thinking.png';

/**
 * NovaMascot — Nova the turtle mascot for Lexio
 *
 * Props:
 *   size      {number}  Width in px. Height auto.
 *   animate   {boolean} Enable nova-float animation.
 *   mood      {string}  'happy' (default) | 'celebrate' | 'thinking'
 *   className {string}
 *
 * mood guide:
 *   'happy'     → Nova_Vui vẻ.png      — landing page, sidebar logo
 *   'celebrate' → Nova_Khen ngợi.png   — student completes a station/tab
 *   'thinking'  → Nova_suy tư.png      — student takes long on a question
 */

const MOOD_SRC = {
  happy:     novaHappy,
  celebrate: novaCelebrate,
  thinking:  novaThinking,
};

const NovaMascot = ({ size = 80, animate = false, mood = 'happy', className = '' }) => (
  <img
    src={MOOD_SRC[mood] ?? novaHappy}
    alt="Nova mascot"
    width={size}
    style={{ width: size, height: 'auto', display: 'inline-block' }}
    className={`select-none ${animate ? 'nova-float' : ''} ${className}`}
    draggable={false}
  />
);

export default NovaMascot;

