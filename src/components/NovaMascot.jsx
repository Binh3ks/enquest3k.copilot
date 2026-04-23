import novaLogoSrc from '../assets/nova-logo.png';

/**
 * NovaMascot — Nova the turtle mascot for Lexio
 *
 * Uses the official Logo_Rùa Nova_new.png brand asset.
 *
 * Props:
 *   size      {number}  Width in px. Height auto (image natural ratio).
 *   animate   {boolean} Enable nova-float animation.
 *   mood      {string}  Reserved for future expression variants (ignored for now).
 *   className {string}
 *
 * Usage:
 *   <NovaMascot size={80} />
 *   <NovaMascot size={110} animate />
 */

const NovaMascot = ({ size = 80, animate = false, mood = 'happy', className = '' }) => (
  <img
    src={novaLogoSrc}
    alt="Nova mascot"
    width={size}
    style={{ width: size, height: 'auto', display: 'inline-block' }}
    className={`select-none ${animate ? 'nova-float' : ''} ${className}`}
    draggable={false}
  />
);

export default NovaMascot;

