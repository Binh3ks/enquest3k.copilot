/**
 * Kawaii chibi avatar layer system.
 * Each layer is an SVG React component.
 * Layers: body → face → hair → outfit → accessory.
 *
 * The avatar is composited in order — first item is bottom, last is on top.
 */

import React from 'react';

const stroke = '#1f2937';
const sw = 2.5;

// ─── Body (base) ─────────────────────────────────────────────────────
export const Body = ({ skin = '#fde6c8' }) => (
  <g>
    {/* Head */}
    <circle cx="100" cy="70" r="40" fill={skin} stroke={stroke} strokeWidth={sw} />
    {/* Neck */}
    <rect x="90" y="105" width="20" height="15" fill={skin} stroke={stroke} strokeWidth={sw} />
    {/* Body/torso (clipped by outfit layer) */}
    <path d="M 60 130 Q 60 115 80 115 L 120 115 Q 140 115 140 130 L 145 200 L 55 200 Z" fill={skin} stroke={stroke} strokeWidth={sw} />
  </g>
);

// ─── Faces (4 expressions) ────────────────────────────────────────────
export const HappyFace = () => (
  <g>
    <ellipse cx="86" cy="68" rx="3" ry="4" fill={stroke} />
    <ellipse cx="114" cy="68" rx="3" ry="4" fill={stroke} />
    <path d="M 90 85 Q 100 95 110 85" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="78" cy="80" rx="4" ry="2.5" fill="#ff8caa" opacity="0.5" />
    <ellipse cx="122" cy="80" rx="4" ry="2.5" fill="#ff8caa" opacity="0.5" />
  </g>
);

export const CoolFace = () => (
  <g>
    <rect x="74" y="63" width="20" height="8" rx="2" fill="#1f2937" />
    <rect x="106" y="63" width="20" height="8" rx="2" fill="#1f2937" />
    <line x1="94" y1="67" x2="106" y2="67" stroke="#1f2937" strokeWidth="2" />
    <path d="M 90 85 Q 100 92 110 85" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
  </g>
);

export const SleepyFace = () => (
  <g>
    <path d="M 80 68 Q 86 65 92 68" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 108 68 Q 114 65 120 68" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="100" cy="85" rx="4" ry="3" fill={stroke} />
    <text x="60" y="55" fontSize="14" fill="#3b82f6">z</text>
    <text x="130" y="50" fontSize="10" fill="#3b82f6">z</text>
  </g>
);

export const ExcitedFace = () => (
  <g>
    <circle cx="86" cy="68" r="5" fill={stroke} />
    <circle cx="114" cy="68" r="5" fill={stroke} />
    <circle cx="86" cy="68" r="2" fill="#fff" />
    <circle cx="114" cy="68" r="2" fill="#fff" />
    <path d="M 88 82 Q 100 100 112 82 L 100 95 Z" fill="#dc2626" />
    <ellipse cx="78" cy="80" rx="4" ry="2.5" fill="#ff8caa" opacity="0.6" />
    <ellipse cx="122" cy="80" rx="4" ry="2.5" fill="#ff8caa" opacity="0.6" />
  </g>
);

export const FACES = { happy: HappyFace, cool: CoolFace, sleepy: SleepyFace, excited: ExcitedFace };

// ─── Hair (4 styles) ────────────────────────────────────────────────
export const ShortHair = ({ color = '#1f2937' }) => (
  <g>
    <path d="M 60 70 Q 58 35 100 30 Q 142 35 140 70 L 140 50 Q 100 45 60 50 Z" fill={color} stroke={stroke} strokeWidth="2" />
  </g>
);

export const LongHair = ({ color = '#92400e' }) => (
  <g>
    <path d="M 60 70 Q 55 30 100 25 Q 145 30 140 70 L 145 130 L 130 130 L 130 50 Q 100 45 70 50 L 70 130 L 55 130 Z" fill={color} stroke={stroke} strokeWidth="2" />
  </g>
);

export const Ponytail = ({ color = '#dc2626' }) => (
  <g>
    <path d="M 60 70 Q 58 35 100 30 Q 142 35 140 70 L 140 50 Q 100 45 60 50 Z" fill={color} stroke={stroke} strokeWidth="2" />
    <ellipse cx="155" cy="90" rx="12" ry="30" fill={color} stroke={stroke} strokeWidth="2" transform="rotate(20 155 90)" />
    <circle cx="148" cy="65" r="6" fill={color} stroke={stroke} strokeWidth="2" />
  </g>
);

export const CurlyHair = ({ color = '#7c3aed' }) => (
  <g>
    <circle cx="70" cy="40" r="14" fill={color} stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="32" r="14" fill={color} stroke={stroke} strokeWidth="2" />
    <circle cx="130" cy="40" r="14" fill={color} stroke={stroke} strokeWidth="2" />
    <circle cx="55" cy="65" r="12" fill={color} stroke={stroke} strokeWidth="2" />
    <circle cx="145" cy="65" r="12" fill={color} stroke={stroke} strokeWidth="2" />
    <circle cx="80" cy="30" r="6" fill={color} stroke={stroke} strokeWidth="2" />
    <circle cx="120" cy="30" r="6" fill={color} stroke={stroke} strokeWidth="2" />
  </g>
);

export const HAIRS = { short: ShortHair, long: LongHair, ponytail: Ponytail, curly: CurlyHair };

// ─── Outfits (4 options) ─────────────────────────────────────────────
export const TShirt = ({ color = '#3b82f6' }) => (
  <g>
    <path d="M 60 130 Q 60 115 80 115 L 120 115 Q 140 115 140 130 L 145 200 L 55 200 Z" fill={color} stroke={stroke} strokeWidth="2" />
  </g>
);

export const Hoodie = ({ color = '#22c55e' }) => (
  <g>
    <path d="M 60 130 Q 60 115 80 115 L 120 115 Q 140 115 140 130 L 145 200 L 55 200 Z" fill={color} stroke={stroke} strokeWidth="2" />
    <path d="M 80 115 Q 100 110 120 115" fill={color} stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="150" rx="15" ry="20" fill={color} stroke={stroke} strokeWidth="2" />
    <line x1="100" y1="115" x2="100" y2="170" stroke={stroke} strokeWidth="2" />
  </g>
);

export const Vest = ({ color = '#dc2626' }) => (
  <g>
    <path d="M 60 130 L 60 200 L 80 200 L 80 130 Q 70 125 60 130 Z" fill={color} stroke={stroke} strokeWidth="2" />
    <path d="M 140 130 L 140 200 L 120 200 L 120 130 Q 130 125 140 130 Z" fill={color} stroke={stroke} strokeWidth="2" />
    <rect x="80" y="130" width="40" height="70" fill="#fff" stroke={stroke} strokeWidth="2" />
  </g>
);

export const Dress = ({ color = '#ec4899' }) => (
  <g>
    <path d="M 60 130 L 55 200 L 145 200 L 140 130 Q 100 140 60 130 Z" fill={color} stroke={stroke} strokeWidth="2" />
    <line x1="60" y1="130" x2="140" y2="130" stroke="#fff" strokeWidth="2" />
  </g>
);

export const OUTFITS = { tshirt: TShirt, hoodie: Hoodie, vest: Vest, dress: Dress };

// ─── Accessories (unlockable items) ──────────────────────────────────
export const NoAccessory = () => null;

export const Crown = () => (
  <g>
    <path d="M 65 50 L 70 25 L 85 45 L 100 15 L 115 45 L 130 25 L 135 50 Z" fill="#fbbf24" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
    <rect x="65" y="50" width="70" height="8" fill="#f59e0b" stroke={stroke} strokeWidth="2" />
    <circle cx="70" cy="25" r="3" fill="#dc2626" />
    <circle cx="100" cy="15" r="3" fill="#3b82f6" />
    <circle cx="130" cy="25" r="3" fill="#22c55e" />
  </g>
);

export const Hat = () => (
  <g>
    <path d="M 60 55 Q 60 20 100 18 Q 140 20 140 55 Z" fill="#16a34a" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="55" rx="45" ry="6" fill="#15803d" stroke={stroke} strokeWidth="2" />
    <rect x="95" y="30" width="10" height="20" fill="#fbbf24" />
  </g>
);

export const Glasses = () => (
  <g>
    <circle cx="86" cy="68" r="9" fill="none" stroke="#1f2937" strokeWidth="3" />
    <circle cx="114" cy="68" r="9" fill="none" stroke="#1f2937" strokeWidth="3" />
    <line x1="95" y1="68" x2="105" y2="68" stroke="#1f2937" strokeWidth="3" />
    <line x1="77" y1="68" x2="70" y2="65" stroke="#1f2937" strokeWidth="3" />
    <line x1="123" y1="68" x2="130" y2="65" stroke="#1f2937" strokeWidth="3" />
  </g>
);

export const StarPin = () => (
  <g>
    <path d="M 130 100 L 134 110 L 144 110 L 136 116 L 139 126 L 130 120 L 121 126 L 124 116 L 116 110 L 126 110 Z" fill="#fbbf24" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
  </g>
);

export const TrophyPin = () => (
  <g>
    <g transform="translate(125 95) scale(0.4)">
      <path d="M 0 0 L 0 50 Q 0 80 30 80 Q 60 80 60 50 L 60 0 Z" fill="#fbbf24" stroke={stroke} strokeWidth="4" />
      <rect x="10" y="80" width="40" height="10" fill="#f59e0b" />
      <rect x="-5" y="90" width="70" height="10" fill="#92400e" />
    </g>
  </g>
);

export const WandPin = () => (
  <g>
    <g transform="translate(125 90) rotate(45)">
      <rect x="0" y="0" width="4" height="35" fill="#92400e" stroke={stroke} strokeWidth="1" />
      <path d="M -6 0 L 2 -10 L 10 0 L 2 10 Z" fill="#a855f7" stroke={stroke} strokeWidth="2" />
      <circle cx="2" cy="0" r="2" fill="#fbbf24" />
    </g>
    <text x="135" y="75" fontSize="14" fill="#fbbf24">✦</text>
  </g>
);

export const ACCESSORIES = {
  none: NoAccessory,
  crown: Crown,
  hat: Hat,
  glasses: Glasses,
  star: StarPin,
  trophy: TrophyPin,
  wand: WandPin,
};

// ─── Compounded avatar ───────────────────────────────────────────────
/**
 * <KawaiiAvatar size={120} config={{ face: 'happy', hair: 'short', outfit: 'tshirt', accessory: 'none' }} />
 */
export default function KawaiiAvatar({ size = 120, config = {}, skin = '#fde6c8' }) {
  const {
    face = 'happy',
    hair = 'short',
    hairColor = '#1f2937',
    outfit = 'tshirt',
    outfitColor = '#3b82f6',
    accessory = 'none',
  } = config;

  const Face = FACES[face] || HappyFace;
  const Hair = HAIRS[hair] || ShortHair;
  const Outfit = OUTFITS[outfit] || TShirt;
  const Acc = ACCESSORIES[accessory] || NoAccessory;

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-label="avatar">
      <rect width="200" height="200" rx="20" fill="#fef3c7" />
      <Body skin={skin} />
      <Outfit color={outfitColor} />
      <Hair color={hairColor} />
      <Face />
      <Acc />
    </svg>
  );
}

// ─── Preset avatar configs the user can pick ─────────────────────────
export const AVATAR_PRESETS = [
  { id: 'p1', face: 'happy',   hair: 'short',    hairColor: '#1f2937', outfit: 'tshirt', outfitColor: '#3b82f6', accessory: 'none' },
  { id: 'p2', face: 'cool',    hair: 'long',     hairColor: '#92400e', outfit: 'hoodie', outfitColor: '#22c55e', accessory: 'glasses' },
  { id: 'p3', face: 'excited', hair: 'ponytail', hairColor: '#dc2626', outfit: 'dress',  outfitColor: '#ec4899', accessory: 'none' },
  { id: 'p4', face: 'sleepy',  hair: 'curly',    hairColor: '#7c3aed', outfit: 'vest',   outfitColor: '#dc2626', accessory: 'none' },
];

// ─── Unlocked accessory catalog ──────────────────────────────────────
export const ACCESSORY_CATALOG = [
  { id: 'crown',  name: 'Crown',           slot: 'head',   unlockHint: 'Complete a collection', icon: '👑' },
  { id: 'hat',    name: 'Explorer Hat',    slot: 'head',   unlockHint: 'Complete 1 collection', icon: '🎩' },
  { id: 'glasses',name: 'Cool Glasses',    slot: 'face',   unlockHint: '7-day streak',         icon: '🕶️' },
  { id: 'star',   name: 'Star Pin',        slot: 'chest',  unlockHint: '50 stars total',       icon: '⭐' },
  { id: 'trophy', name: 'Trophy Pin',      slot: 'chest',  unlockHint: 'First perfect week',   icon: '🏆' },
  { id: 'wand',   name: 'Magic Wand',      slot: 'hand',   unlockHint: 'Master a collection',  icon: '✨' },
];
