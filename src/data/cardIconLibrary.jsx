/**
 * Kawaii-style SVG icon library for collectible cards.
 * Each icon is a React component returning an inline SVG.
 * Style: round, friendly, bright colors, big eyes, soft strokes.
 *
 * All icons are rendered inside a 200x200 viewBox.
 */

import React from 'react';

const stroke = '#1f2937';
const sw = 3; // stroke width
const skin = '#fde6c8';
const skinDark = '#e8b58a';

// ─── Helpers ────────────────────────────────────────────────────────────
const Face = ({ cx, cy, eyeShift = 0, mouth = 'smile', blush = true }) => {
  const mouths = {
    smile: <path d={`M ${cx - 12 + eyeShift} ${cy + 14} Q ${cx + eyeShift} ${cy + 24} ${cx + 12 + eyeShift} ${cy + 14}`} fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />,
    open: <ellipse cx={cx + eyeShift} cy={cy + 18} rx="8" ry="10" fill="#5b3a2a" />,
    neutral: <line x1={cx - 10 + eyeShift} y1={cy + 16} x2={cx + 10 + eyeShift} y2={cy + 16} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />,
  };
  return (
    <g>
      <circle cx={cx - 18 + eyeShift} cy={cy} r="4" fill={stroke} />
      <circle cx={cx + 18 + eyeShift} cy={cy} r="4" fill={stroke} />
      <circle cx={cx - 16 + eyeShift} cy={cy - 2} r="1.5" fill="#fff" />
      <circle cx={cx + 20 + eyeShift} cy={cy - 2} r="1.5" fill="#fff" />
      {blush && (
        <>
          <ellipse cx={cx - 28 + eyeShift} cy={cy + 10} rx="5" ry="3" fill="#ff8caa" opacity="0.6" />
          <ellipse cx={cx + 28 + eyeShift} cy={cy + 10} rx="5" ry="3" fill="#ff8caa" opacity="0.6" />
        </>
      )}
      {mouths[mouth]}
    </g>
  );
};

// ─── School items ──────────────────────────────────────────────────────
const Notebook = () => (
  <g>
    <rect x="50" y="40" width="100" height="130" rx="10" fill="#fbbf24" stroke={stroke} strokeWidth={sw} />
    <rect x="50" y="40" width="20" height="130" rx="6" fill="#f59e0b" stroke={stroke} strokeWidth={sw} />
    <line x1="80" y1="70" x2="140" y2="70" stroke={stroke} strokeWidth="2" />
    <line x1="80" y1="90" x2="140" y2="90" stroke={stroke} strokeWidth="2" />
    <line x1="80" y1="110" x2="120" y2="110" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={140} mouth="smile" />
  </g>
);
const Pencil = () => (
  <g>
    <path d="M 60 160 L 100 40 L 140 160 Z" fill="#fde68a" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 60 160 L 140 160 L 130 145 L 70 145 Z" fill="#fb7185" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 100 40 L 92 60 L 108 60 Z" fill={skinDark} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 100 40 L 95 50 L 105 50 Z" fill={stroke} />
    <Face cx={100} cy={105} mouth="smile" />
  </g>
);
const Ruler = () => (
  <g>
    <rect x="30" y="80" width="140" height="40" rx="6" fill="#86efac" stroke={stroke} strokeWidth={sw} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line key={i} x1={40 + i * 20} y1="80" x2={40 + i * 20} y2={i % 2 === 0 ? 95 : 90} stroke={stroke} strokeWidth="2" />
    ))}
    <text x="100" y="115" textAnchor="middle" fontSize="14" fontWeight="900" fill={stroke}>30cm</text>
  </g>
);
const Book = () => (
  <g>
    <path d="M 40 60 L 40 160 L 100 170 L 160 160 L 160 60 L 100 70 Z" fill="#fca5a5" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <line x1="100" y1="70" x2="100" y2="170" stroke={stroke} strokeWidth={sw} />
    <line x1="60" y1="90" x2="90" y2="93" stroke={stroke} strokeWidth="2" />
    <line x1="60" y1="110" x2="90" y2="113" stroke={stroke} strokeWidth="2" />
    <line x1="60" y1="130" x2="85" y2="133" stroke={stroke} strokeWidth="2" />
    <line x1="110" y1="93" x2="140" y2="90" stroke={stroke} strokeWidth="2" />
    <line x1="110" y1="113" x2="140" y2="110" stroke={stroke} strokeWidth="2" />
    <line x1="110" y1="133" x2="135" y2="130" stroke={stroke} strokeWidth="2" />
  </g>
);
const Bag = () => (
  <g>
    <rect x="50" y="60" width="100" height="110" rx="12" fill="#60a5fa" stroke={stroke} strokeWidth={sw} />
    <path d="M 75 60 Q 75 35 100 35 Q 125 35 125 60" fill="none" stroke={stroke} strokeWidth={sw} />
    <rect x="80" y="90" width="40" height="35" rx="4" fill="#fde68a" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={140} mouth="smile" />
  </g>
);
const Clock = () => (
  <g>
    <circle cx="100" cy="100" r="60" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <circle cx="100" cy="100" r="50" fill="#fef3c7" />
    {[12, 3, 6, 9].map((h, i) => {
      const angles = [-90, 0, 90, 180];
      const a = (angles[i] * Math.PI) / 180;
      return <circle key={h} cx={100 + 42 * Math.cos(a)} cy={100 + 42 * Math.sin(a)} r="3" fill={stroke} />;
    })}
    <line x1="100" y1="100" x2="100" y2="65" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
    <line x1="100" y1="100" x2="130" y2="100" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="100" r="4" fill={stroke} />
    <ellipse cx="60" cy="145" rx="6" ry="4" fill="#a16207" />
    <ellipse cx="140" cy="155" rx="6" ry="4" fill="#a16207" />
  </g>
);

// ─── Home items ────────────────────────────────────────────────────────
const Home = () => (
  <g>
    <path d="M 40 110 L 100 50 L 160 110 L 160 170 L 40 170 Z" fill="#fcd34d" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 30 115 L 100 45 L 170 115" fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <rect x="80" y="125" width="40" height="45" fill="#92400e" stroke={stroke} strokeWidth={sw} />
    <circle cx="113" cy="148" r="3" fill={stroke} />
    <rect x="55" y="125" width="20" height="20" fill="#bae6fd" stroke={stroke} strokeWidth="2" />
    <rect x="125" y="125" width="20" height="20" fill="#bae6fd" stroke={stroke} strokeWidth="2" />
  </g>
);
const Bed = () => (
  <g>
    <rect x="30" y="120" width="140" height="40" rx="6" fill="#f9a8d4" stroke={stroke} strokeWidth={sw} />
    <rect x="30" y="100" width="60" height="30" rx="4" fill="#fde68a" stroke={stroke} strokeWidth={sw} />
    <rect x="30" y="160" width="140" height="15" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <Face cx={60} cy={120} mouth="smile" />
  </g>
);
const Lamp = () => (
  <g>
    <path d="M 60 80 L 140 80 L 120 50 L 80 50 Z" fill="#fde68a" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <rect x="98" y="80" width="4" height="80" fill={stroke} />
    <rect x="80" y="160" width="40" height="10" rx="2" fill={stroke} />
    <line x1="100" y1="40" x2="100" y2="30" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="28" r="3" fill="#fbbf24" />
    <line x1="80" y1="50" x2="70" y2="40" stroke="#fbbf24" strokeWidth="2" />
    <line x1="120" y1="50" x2="130" y2="40" stroke="#fbbf24" strokeWidth="2" />
  </g>
);
const Chair = () => (
  <g>
    <rect x="60" y="80" width="80" height="60" rx="4" fill="#fcd34d" stroke={stroke} strokeWidth={sw} />
    <rect x="60" y="50" width="80" height="35" rx="4" fill="#fde68a" stroke={stroke} strokeWidth={sw} />
    <line x1="70" y1="140" x2="70" y2="170" stroke={stroke} strokeWidth="4" />
    <line x1="130" y1="140" x2="130" y2="170" stroke={stroke} strokeWidth="4" />
  </g>
);
const Door = () => (
  <g>
    <rect x="60" y="40" width="80" height="140" rx="4" fill="#a16207" stroke={stroke} strokeWidth={sw} />
    <rect x="68" y="50" width="64" height="120" fill="none" stroke={stroke} strokeWidth="2" />
    <circle cx="125" cy="115" r="4" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
    <line x1="78" y1="60" x2="78" y2="160" stroke={stroke} strokeWidth="1" />
  </g>
);
const Window = () => (
  <g>
    <rect x="40" y="40" width="120" height="120" rx="4" fill="#bae6fd" stroke={stroke} strokeWidth={sw} />
    <line x1="100" y1="40" x2="100" y2="160" stroke={stroke} strokeWidth={sw} />
    <line x1="40" y1="100" x2="160" y2="100" stroke={stroke} strokeWidth={sw} />
    <circle cx="100" cy="100" r="14" fill="#fde68a" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={100} mouth="smile" eyeShift={0} />
  </g>
);

// ─── Playground / Kids ────────────────────────────────────────────────
const Child1 = () => (
  <g>
    <circle cx="100" cy="80" r="35" fill={skin} stroke={stroke} strokeWidth={sw} />
    <path d="M 65 75 Q 65 40 100 40 Q 135 40 135 75 L 130 70 Q 100 60 70 70 Z" fill="#1f2937" />
    <Face cx={100} cy={85} mouth="smile" />
    <rect x="75" y="115" width="50" height="50" rx="6" fill="#60a5fa" stroke={stroke} strokeWidth={sw} />
    <line x1="75" y1="135" x2="125" y2="135" stroke="#1e3a8a" strokeWidth="2" />
  </g>
);
const Child2 = () => (
  <g>
    <circle cx="100" cy="80" r="35" fill={skin} stroke={stroke} strokeWidth={sw} />
    <path d="M 70 60 Q 70 50 90 48 Q 90 35 100 38 Q 110 35 110 48 Q 130 50 130 60 Q 130 75 100 80 Q 70 75 70 60" fill="#dc2626" stroke={stroke} strokeWidth="2" />
    <path d="M 70 60 Q 100 80 130 60" fill="none" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={85} mouth="smile" />
    <rect x="75" y="115" width="50" height="50" rx="6" fill="#f472b6" stroke={stroke} strokeWidth={sw} />
    <path d="M 75 135 L 125 135 M 100 115 L 100 165" stroke="#be185d" strokeWidth="2" />
  </g>
);
const Ball = () => (
  <g>
    <circle cx="100" cy="100" r="55" fill="#fb923c" stroke={stroke} strokeWidth={sw} />
    <path d="M 45 100 Q 100 80 155 100" fill="none" stroke={stroke} strokeWidth="2" />
    <path d="M 45 100 Q 100 120 155 100" fill="none" stroke={stroke} strokeWidth="2" />
    <path d="M 100 45 Q 80 100 100 155" fill="none" stroke={stroke} strokeWidth="2" />
    <path d="M 100 45 Q 120 100 100 155" fill="none" stroke={stroke} strokeWidth="2" />
  </g>
);
const Kite = () => (
  <g>
    <path d="M 100 30 L 130 80 L 100 130 L 70 80 Z" fill="#ec4899" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <line x1="100" y1="30" x2="100" y2="130" stroke={stroke} strokeWidth="2" />
    <line x1="70" y1="80" x2="130" y2="80" stroke={stroke} strokeWidth="2" />
    <path d="M 100 130 Q 95 150 105 165 Q 115 175 100 180 Q 85 175 95 165" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
    <path d="M 100 30 Q 50 60 30 90" fill="none" stroke={stroke} strokeWidth="2" />
  </g>
);
const Swing = () => (
  <g>
    <line x1="50" y1="40" x2="150" y2="40" stroke={stroke} strokeWidth="3" />
    <line x1="60" y1="40" x2="60" y2="120" stroke={stroke} strokeWidth="2" />
    <line x1="140" y1="40" x2="140" y2="120" stroke={stroke} strokeWidth="2" />
    <rect x="55" y="120" width="90" height="15" rx="3" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="70" r="20" fill={skin} stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={70} mouth="smile" />
    <rect x="85" y="90" width="30" height="30" rx="3" fill="#60a5fa" stroke={stroke} strokeWidth="2" />
  </g>
);
const Slide = () => (
  <g>
    <path d="M 50 50 L 50 110 L 160 160" fill="none" stroke="#fb7185" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 50 50 L 50 110 L 160 160" fill="none" stroke={stroke} strokeWidth="2" />
    <line x1="50" y1="110" x2="60" y2="100" stroke={stroke} strokeWidth="2" />
    <line x1="40" y1="160" x2="70" y2="160" stroke={stroke} strokeWidth="2" />
    <line x1="40" y1="170" x2="70" y2="170" stroke={stroke} strokeWidth="2" />
    <rect x="120" y="155" width="40" height="20" fill="#86efac" stroke={stroke} strokeWidth="2" />
  </g>
);

// ─── Domestic animals ──────────────────────────────────────────────────
const Cat = () => (
  <g>
    <path d="M 60 70 L 55 35 L 80 60 L 120 60 L 145 35 L 140 70" fill="#a8a29e" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <ellipse cx="100" cy="100" rx="50" ry="40" fill="#a8a29e" stroke={stroke} strokeWidth={sw} />
    <Face cx={100} cy={95} mouth="smile" />
    <path d="M 90 115 L 100 122 L 110 115" fill="none" stroke={stroke} strokeWidth="2" />
    <line x1="75" y1="105" x2="60" y2="103" stroke={stroke} strokeWidth="2" />
    <line x1="75" y1="112" x2="60" y2="115" stroke={stroke} strokeWidth="2" />
    <line x1="125" y1="105" x2="140" y2="103" stroke={stroke} strokeWidth="2" />
    <line x1="125" y1="112" x2="140" y2="115" stroke={stroke} strokeWidth="2" />
  </g>
);
const Dog = () => (
  <g>
    <ellipse cx="60" cy="70" rx="20" ry="30" fill="#92400e" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="140" cy="70" rx="20" ry="30" fill="#92400e" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="100" cy="100" rx="55" ry="50" fill="#fcd34d" stroke={stroke} strokeWidth={sw} />
    <Face cx={100} cy={95} mouth="open" />
    <path d="M 75 125 Q 100 135 125 125" fill="#7c2d12" stroke={stroke} strokeWidth="2" />
  </g>
);
const Bird = () => (
  <g>
    <ellipse cx="100" cy="110" rx="45" ry="35" fill="#60a5fa" stroke={stroke} strokeWidth={sw} />
    <circle cx="80" cy="90" r="20" fill="#60a5fa" stroke={stroke} strokeWidth={sw} />
    <Face cx={80} cy={88} mouth="smile" />
    <path d="M 65 90 L 50 85 L 65 95 Z" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
    <path d="M 100 110 Q 120 130 140 110" fill="#3b82f6" stroke={stroke} strokeWidth="2" />
  </g>
);
const Rabbit = () => (
  <g>
    <ellipse cx="80" cy="55" rx="10" ry="35" fill="#f9a8d4" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="120" cy="55" rx="10" ry="35" fill="#f9a8d4" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="80" cy="55" rx="4" ry="25" fill="#ec4899" />
    <ellipse cx="120" cy="55" rx="4" ry="25" fill="#ec4899" />
    <circle cx="100" cy="110" r="40" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <Face cx={100} cy={108} mouth="smile" />
    <path d="M 92 122 L 100 128 L 108 122" fill="#ec4899" stroke={stroke} strokeWidth="2" />
  </g>
);
const Fish = () => (
  <g>
    <ellipse cx="100" cy="100" rx="50" ry="25" fill="#60a5fa" stroke={stroke} strokeWidth={sw} />
    <path d="M 50 100 L 30 80 L 30 120 Z" fill="#60a5fa" stroke={stroke} strokeWidth={sw} />
    <circle cx="125" cy="95" r="5" fill={stroke} />
    <path d="M 90 85 Q 100 80 110 85" fill="none" stroke={stroke} strokeWidth="2" />
    <ellipse cx="80" cy="100" rx="3" ry="6" fill="#93c5fd" />
    <ellipse cx="100" cy="100" rx="3" ry="6" fill="#93c5fd" />
  </g>
);
const Turtle = () => (
  <g>
    <ellipse cx="100" cy="115" rx="55" ry="35" fill="#86efac" stroke={stroke} strokeWidth={sw} />
    <circle cx="100" cy="105" r="35" fill="#22c55e" stroke={stroke} strokeWidth={sw} />
    <path d="M 80 105 L 100 90 L 120 105 L 100 120 Z" fill="#16a34a" stroke={stroke} strokeWidth="2" />
    <line x1="100" y1="80" x2="100" y2="130" stroke={stroke} strokeWidth="2" />
    <line x1="65" y1="105" x2="135" y2="105" stroke={stroke} strokeWidth="2" />
    <circle cx="65" cy="80" r="15" fill="#86efac" stroke={stroke} strokeWidth="2" />
    <circle cx="135" cy="80" r="15" fill="#86efac" stroke={stroke} strokeWidth="2" />
    <circle cx="65" cy="80" r="3" fill={stroke} />
    <circle cx="135" cy="80" r="3" fill={stroke} />
  </g>
);

// ─── Wild animals ──────────────────────────────────────────────────────
const Lion = () => (
  <g>
    <circle cx="100" cy="100" r="60" fill="#f59e0b" stroke={stroke} strokeWidth={sw} />
    {Array.from({ length: 16 }, (_, i) => {
      const a = (i * 22.5 * Math.PI) / 180;
      return (
        <circle
          key={i}
          cx={100 + 55 * Math.cos(a)}
          cy={100 + 55 * Math.sin(a)}
          r="14"
          fill="#d97706"
          stroke={stroke}
          strokeWidth="2"
        />
      );
    })}
    <circle cx="100" cy="100" r="40" fill="#fde68a" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={100} mouth="smile" />
  </g>
);
const Elephant = () => (
  <g>
    <ellipse cx="100" cy="100" rx="55" ry="50" fill="#94a3b8" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="50" cy="100" rx="18" ry="22" fill="#94a3b8" stroke={stroke} strokeWidth={sw} />
    <path d="M 50 100 Q 30 100 25 120 Q 20 145 40 150" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    <Face cx={100} cy={95} mouth="smile" />
    <ellipse cx="155" cy="65" rx="12" ry="20" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
  </g>
);
const Monkey = () => (
  <g>
    <circle cx="100" cy="100" r="50" fill="#92400e" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="100" cy="115" rx="35" ry="25" fill="#fde68a" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={95} mouth="smile" blush={false} />
    <circle cx="65" cy="80" r="12" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <circle cx="135" cy="80" r="12" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <circle cx="65" cy="80" r="6" fill="#fde68a" />
    <circle cx="135" cy="80" r="6" fill="#fde68a" />
  </g>
);
const Giraffe = () => (
  <g>
    <rect x="80" y="40" width="35" height="80" fill="#fde68a" stroke={stroke} strokeWidth={sw} rx="4" />
    <circle cx="100" cy="60" r="5" fill="#92400e" />
    <circle cx="100" cy="75" r="5" fill="#92400e" />
    <line x1="100" y1="40" x2="100" y2="25" stroke={stroke} strokeWidth="3" />
    <circle cx="95" cy="22" r="4" fill="#92400e" />
    <circle cx="105" cy="22" r="4" fill="#92400e" />
    <Face cx={97} cy={55} mouth="smile" />
    <ellipse cx="130" cy="130" rx="45" ry="30" fill="#fde68a" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="115" cy="135" rx="6" ry="8" fill="#92400e" />
    <ellipse cx="140" cy="135" rx="6" ry="8" fill="#92400e" />
  </g>
);
const Zebra = () => (
  <g>
    <ellipse cx="100" cy="110" rx="55" ry="40" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="55" cy="100" rx="20" ry="25" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <line x1="65" y1="80" x2="60" y2="125" stroke={stroke} strokeWidth="3" />
    <line x1="78" y1="80" x2="73" y2="125" stroke={stroke} strokeWidth="3" />
    <line x1="95" y1="80" x2="92" y2="140" stroke={stroke} strokeWidth="3" />
    <line x1="115" y1="80" x2="115" y2="140" stroke={stroke} strokeWidth="3" />
    <line x1="130" y1="80" x2="130" y2="140" stroke={stroke} strokeWidth="3" />
    <line x1="145" y1="80" x2="148" y2="125" stroke={stroke} strokeWidth="3" />
    <Face cx={55} cy={100} mouth="smile" blush={false} />
    <ellipse cx="155" cy="80" rx="8" ry="15" fill="#fff" stroke={stroke} strokeWidth="2" />
  </g>
);
const Bear = () => (
  <g>
    <circle cx="65" cy="60" r="20" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <circle cx="135" cy="60" r="20" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <circle cx="65" cy="60" r="10" fill="#fde68a" />
    <circle cx="135" cy="60" r="10" fill="#fde68a" />
    <ellipse cx="100" cy="105" rx="50" ry="45" fill="#92400e" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="100" cy="120" rx="25" ry="20" fill="#fde68a" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={100} mouth="smile" />
    <ellipse cx="100" cy="115" rx="5" ry="3" fill={stroke} />
  </g>
);

// ─── Nature ────────────────────────────────────────────────────────────
const Flower = () => (
  <g>
    <line x1="100" y1="100" x2="100" y2="180" stroke="#16a34a" strokeWidth="4" />
    <ellipse cx="80" cy="140" rx="15" ry="8" fill="#22c55e" stroke={stroke} strokeWidth="2" transform="rotate(-30 80 140)" />
    {[0, 1, 2, 3, 4].map((i) => {
      const a = (i * 72 * Math.PI) / 180;
      return <circle key={i} cx={100 + 25 * Math.cos(a)} cy={75 + 25 * Math.sin(a)} r="22" fill="#fb7185" stroke={stroke} strokeWidth="2" />;
    })}
    <circle cx="100" cy="75" r="20" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={75} mouth="smile" />
  </g>
);
const Tree = () => (
  <g>
    <rect x="90" y="120" width="20" height="60" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="100" r="50" fill="#22c55e" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="100" r="35" fill="#16a34a" stroke={stroke} strokeWidth="2" />
    <ellipse cx="85" cy="90" rx="8" ry="5" fill="#86efac" />
    <ellipse cx="115" cy="110" rx="8" ry="5" fill="#86efac" />
  </g>
);
const Leaf = () => (
  <g>
    <path d="M 60 140 Q 100 30 160 80 Q 130 160 60 140 Z" fill="#22c55e" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 60 140 Q 100 100 160 80" fill="none" stroke={stroke} strokeWidth="2" />
    <line x1="80" y1="120" x2="90" y2="105" stroke={stroke} strokeWidth="2" />
    <line x1="100" y1="130" x2="110" y2="110" stroke={stroke} strokeWidth="2" />
    <line x1="120" y1="120" x2="130" y2="100" stroke={stroke} strokeWidth="2" />
  </g>
);
const Grass = () => (
  <g>
    <line x1="40" y1="180" x2="40" y2="120" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    <line x1="60" y1="180" x2="55" y2="110" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    <line x1="80" y1="180" x2="85" y2="115" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    <line x1="100" y1="180" x2="100" y2="105" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    <line x1="120" y1="180" x2="115" y2="115" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    <line x1="140" y1="180" x2="145" y2="110" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    <line x1="160" y1="180" x2="160" y2="120" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
  </g>
);
const Seed = () => (
  <g>
    <ellipse cx="100" cy="110" rx="30" ry="40" fill="#92400e" stroke={stroke} strokeWidth={sw} />
    <path d="M 100 70 L 90 50 L 100 40 L 110 50 Z" fill="#22c55e" stroke={stroke} strokeWidth="2" />
    <line x1="100" y1="75" x2="100" y2="40" stroke="#16a34a" strokeWidth="2" />
  </g>
);
const Sun = () => (
  <g>
    <circle cx="100" cy="100" r="40" fill="#fbbf24" stroke={stroke} strokeWidth={sw} />
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i * 30 * Math.PI) / 180;
      return <line key={i} x1={100 + 50 * Math.cos(a)} y1={100 + 50 * Math.sin(a)} x2={100 + 70 * Math.cos(a)} y2={100 + 70 * Math.sin(a)} stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />;
    })}
    <Face cx={100} cy={100} mouth="smile" />
  </g>
);

// ─── Food ──────────────────────────────────────────────────────────────
const Apple = () => (
  <g>
    <path d="M 100 60 Q 60 50 50 100 Q 50 160 100 170 Q 150 160 150 100 Q 140 50 100 60 Z" fill="#dc2626" stroke={stroke} strokeWidth={sw} />
    <path d="M 100 60 L 100 40 Q 90 30 100 25" fill="none" stroke={stroke} strokeWidth="3" />
    <ellipse cx="85" cy="75" rx="8" ry="5" fill="#ef4444" />
    <ellipse cx="110" cy="40" rx="10" ry="5" fill="#22c55e" stroke={stroke} strokeWidth="2" />
  </g>
);
const Bread = () => (
  <g>
    <path d="M 40 100 Q 40 60 100 60 Q 160 60 160 100 L 155 150 Q 100 160 45 150 Z" fill="#fde68a" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <line x1="80" y1="80" x2="85" y2="70" stroke={stroke} strokeWidth="2" />
    <line x1="100" y1="80" x2="100" y2="65" stroke={stroke} strokeWidth="2" />
    <line x1="120" y1="80" x2="115" y2="70" stroke={stroke} strokeWidth="2" />
  </g>
);
const Rice = () => (
  <g>
    <ellipse cx="100" cy="130" rx="60" ry="20" fill="#fff" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="110" rx="55" ry="35" fill="#fff" stroke={stroke} strokeWidth={sw} />
    {[[80, 100], [95, 95], [110, 100], [125, 95], [100, 85]].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill="#fef3c7" stroke={stroke} strokeWidth="1" />
    ))}
  </g>
);
const Milk = () => (
  <g>
    <path d="M 70 50 L 70 30 L 130 30 L 130 50 L 140 60 L 140 170 L 60 170 L 60 60 Z" fill="#fff" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <rect x="65" y="90" width="70" height="50" fill="#dbeafe" stroke={stroke} strokeWidth="2" />
    <text x="100" y="120" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1e3a8a">MILK</text>
  </g>
);
const Cake = () => (
  <g>
    <ellipse cx="100" cy="160" rx="55" ry="10" fill="#a16207" />
    <rect x="50" y="110" width="100" height="50" fill="#fbcfe8" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="100" cy="110" rx="50" ry="12" fill="#f9a8d4" stroke={stroke} strokeWidth="2" />
    <rect x="95" y="60" width="10" height="50" fill="#fde68a" />
    <path d="M 100 60 Q 95 50 100 45 Q 105 50 100 60" fill="#fb923c" stroke={stroke} strokeWidth="2" />
  </g>
);
const Banana = () => (
  <g>
    <path d="M 40 130 Q 60 50 160 70 Q 150 80 130 75 Q 90 80 50 130 Z" fill="#fbbf24" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 40 130 L 35 145 L 55 130" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <line x1="80" y1="100" x2="90" y2="105" stroke={stroke} strokeWidth="2" />
  </g>
);

// ─── Body parts ────────────────────────────────────────────────────────
const Heart = () => (
  <g>
    <path d="M 100 160 Q 30 110 30 70 Q 30 40 60 40 Q 80 40 100 70 Q 120 40 140 40 Q 170 40 170 70 Q 170 110 100 160 Z" fill="#ef4444" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <ellipse cx="75" cy="65" rx="10" ry="6" fill="#fb7185" />
  </g>
);
const Tooth = () => (
  <g>
    <path d="M 60 50 Q 60 30 100 30 Q 140 30 140 50 L 130 160 L 115 130 L 100 160 L 85 130 L 70 160 Z" fill="#fff" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
  </g>
);
const Eye = () => (
  <g>
    <path d="M 30 100 Q 100 30 170 100 Q 100 170 30 100 Z" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <circle cx="100" cy="100" r="35" fill="#3b82f6" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="100" r="15" fill={stroke} />
    <circle cx="92" cy="92" r="6" fill="#fff" />
    <circle cx="108" cy="108" r="3" fill="#fff" />
  </g>
);
const Ear = () => (
  <g>
    <path d="M 70 50 Q 50 80 60 130 Q 70 170 100 170 Q 130 170 140 130 Q 150 80 130 50 Q 100 30 70 50 Z" fill="#fbbf24" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 80 70 Q 70 100 80 140 Q 100 150 120 140 Q 130 100 120 70 Q 100 60 80 70 Z" fill="#fde68a" stroke={stroke} strokeWidth="2" />
  </g>
);
const Hand = () => (
  <g>
    <ellipse cx="100" cy="100" rx="35" ry="50" fill={skin} stroke={stroke} strokeWidth={sw} />
    <ellipse cx="100" cy="55" rx="25" ry="15" fill={skin} stroke={stroke} strokeWidth="2" />
    {[0, 1, 2, 3, 4].map((i) => (
      <ellipse key={i} cx={75 + i * 12} cy={70 + (i === 0 ? 0 : 5)} rx="5" ry="12" fill={skin} stroke={stroke} strokeWidth="2" />
    ))}
  </g>
);
const Foot = () => (
  <g>
    <ellipse cx="100" cy="120" rx="45" ry="30" fill={skin} stroke={stroke} strokeWidth={sw} />
    <ellipse cx="100" cy="90" rx="35" ry="20" fill={skin} stroke={stroke} strokeWidth={sw} />
    {[0, 1, 2, 3, 4].map((i) => (
      <circle key={i} cx={80 + i * 10} cy={75} r="4" fill={skin} stroke={stroke} strokeWidth="2" />
    ))}
  </g>
);

// ─── City & transport ─────────────────────────────────────────────────
const Car = () => (
  <g>
    <path d="M 30 130 L 30 100 Q 40 80 70 80 L 130 80 Q 160 80 170 100 L 170 130 Z" fill="#ef4444" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 60 80 L 60 60 L 140 60 L 140 80" fill="#fca5a5" stroke={stroke} strokeWidth={sw} />
    <line x1="100" y1="60" x2="100" y2="80" stroke={stroke} strokeWidth="2" />
    <circle cx="60" cy="140" r="15" fill={stroke} />
    <circle cx="60" cy="140" r="6" fill="#94a3b8" />
    <circle cx="140" cy="140" r="15" fill={stroke} />
    <circle cx="140" cy="140" r="6" fill="#94a3b8" />
  </g>
);
const Bus = () => (
  <g>
    <rect x="30" y="60" width="140" height="80" rx="8" fill="#3b82f6" stroke={stroke} strokeWidth={sw} />
    <rect x="40" y="70" width="30" height="25" fill="#bae6fd" stroke={stroke} strokeWidth="2" />
    <rect x="80" y="70" width="30" height="25" fill="#bae6fd" stroke={stroke} strokeWidth="2" />
    <rect x="120" y="70" width="40" height="25" fill="#bae6fd" stroke={stroke} strokeWidth="2" />
    <rect x="40" y="105" width="120" height="15" fill="#fbbf24" />
    <circle cx="55" cy="145" r="12" fill={stroke} />
    <circle cx="145" cy="145" r="12" fill={stroke} />
  </g>
);
const Shop = () => (
  <g>
    <path d="M 30 90 L 50 60 L 150 60 L 170 90" fill="#ec4899" stroke={stroke} strokeWidth={sw} />
    <line x1="40" y1="75" x2="160" y2="75" stroke="#fff" strokeWidth="2" />
    <rect x="40" y="90" width="120" height="80" fill="#fde68a" stroke={stroke} strokeWidth={sw} />
    <rect x="80" y="120" width="40" height="50" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <rect x="50" y="100" width="20" height="15" fill="#fff" stroke={stroke} strokeWidth="1" />
    <rect x="130" y="100" width="20" height="15" fill="#fff" stroke={stroke} strokeWidth="1" />
  </g>
);
const Park = () => (
  <g>
    <circle cx="60" cy="130" r="35" fill="#22c55e" stroke={stroke} strokeWidth="2" />
    <rect x="55" y="130" width="10" height="40" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <circle cx="140" cy="120" r="40" fill="#16a34a" stroke={stroke} strokeWidth="2" />
    <rect x="135" y="120" width="10" height="50" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="170" rx="60" ry="8" fill="#86efac" stroke={stroke} strokeWidth="2" />
  </g>
);
const Road = () => (
  <g>
    <path d="M 30 80 L 170 80 L 180 180 L 20 180 Z" fill="#475569" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <line x1="100" y1="100" x2="100" y2="115" stroke="#fbbf24" strokeWidth="4" />
    <line x1="100" y1="130" x2="100" y2="145" stroke="#fbbf24" strokeWidth="4" />
    <line x1="100" y1="160" x2="100" y2="175" stroke="#fbbf24" strokeWidth="4" />
  </g>
);
const Sign = () => (
  <g>
    <rect x="95" y="80" width="10" height="100" fill="#71717a" stroke={stroke} strokeWidth="2" />
    <rect x="40" y="50" width="120" height="50" rx="4" fill="#22c55e" stroke={stroke} strokeWidth={sw} />
    <text x="100" y="85" textAnchor="middle" fontSize="28" fontWeight="900" fill="#fff">STOP</text>
  </g>
);

// ─── Weather ───────────────────────────────────────────────────────────
const Cloud = () => (
  <g>
    <circle cx="80" cy="100" r="30" fill="#e2e8f0" stroke={stroke} strokeWidth="2" />
    <circle cx="120" cy="100" r="35" fill="#e2e8f0" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="115" rx="55" ry="20" fill="#e2e8f0" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={100} mouth="smile" blush={false} />
  </g>
);
const Rain = () => (
  <g>
    <circle cx="80" cy="80" r="25" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <circle cx="120" cy="80" r="30" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="90" rx="45" ry="15" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    {[[60, 110], [80, 130], [100, 110], [120, 130], [140, 110], [70, 150], [130, 150]].map(([x, y], i) => (
      <line key={i} x1={x} y1={y} x2={x - 5} y2={y + 15} stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
    ))}
  </g>
);
const Snow = () => (
  <g>
    <circle cx="80" cy="80" r="25" fill="#e2e8f0" stroke={stroke} strokeWidth="2" />
    <circle cx="120" cy="80" r="30" fill="#e2e8f0" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="90" rx="45" ry="15" fill="#e2e8f0" stroke={stroke} strokeWidth="2" />
    {[[60, 110], [80, 130], [100, 110], [120, 130], [140, 110], [70, 150], [130, 150]].map(([x, y], i) => (
      <text key={i} x={x} y={y + 10} textAnchor="middle" fontSize="20" fill="#3b82f6">❄</text>
    ))}
  </g>
);
const Wind = () => (
  <g>
    <path d="M 30 70 Q 100 50 130 70 L 150 65 Q 155 70 150 75 L 110 75" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
    <path d="M 30 110 Q 100 90 140 110 L 165 105 Q 170 110 165 115 L 120 115" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
    <path d="M 30 150 Q 100 130 130 150 L 145 145 Q 150 150 145 155 L 110 155" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
  </g>
);
const Storm = () => (
  <g>
    <circle cx="80" cy="70" r="25" fill="#475569" stroke={stroke} strokeWidth="2" />
    <circle cx="120" cy="70" r="30" fill="#475569" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="80" rx="45" ry="15" fill="#475569" stroke={stroke} strokeWidth="2" />
    <path d="M 95 95 L 80 130 L 95 130 L 85 160 L 110 120 L 95 120 Z" fill="#fbbf24" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
  </g>
);

// ─── Celebrations ─────────────────────────────────────────────────────
const Gift = () => (
  <g>
    <rect x="40" y="100" width="120" height="70" fill="#ec4899" stroke={stroke} strokeWidth={sw} />
    <rect x="40" y="80" width="120" height="25" fill="#f472b6" stroke={stroke} strokeWidth={sw} />
    <rect x="90" y="80" width="20" height="90" fill="#fde68a" stroke={stroke} strokeWidth="2" />
    <path d="M 100 80 Q 80 50 70 70 Q 65 80 100 80 Q 135 80 130 70 Q 120 50 100 80" fill="#fde68a" stroke={stroke} strokeWidth="2" />
  </g>
);
const Balloon = () => (
  <g>
    <ellipse cx="80" cy="80" rx="22" ry="28" fill="#ef4444" stroke={stroke} strokeWidth="2" />
    <ellipse cx="120" cy="70" rx="22" ry="28" fill="#3b82f6" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="100" rx="22" ry="28" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
    <line x1="80" y1="108" x2="80" y2="170" stroke={stroke} strokeWidth="1" />
    <line x1="120" y1="98" x2="120" y2="170" stroke={stroke} strokeWidth="1" />
    <line x1="100" y1="128" x2="100" y2="170" stroke={stroke} strokeWidth="1" />
  </g>
);
const Candle = () => (
  <g>
    <rect x="90" y="100" width="20" height="60" fill="#fde68a" stroke={stroke} strokeWidth="2" />
    <line x1="100" y1="100" x2="100" y2="80" stroke={stroke} strokeWidth="2" />
    <path d="M 100 80 Q 90 70 100 60 Q 110 70 100 80" fill="#fb923c" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="165" rx="35" ry="8" fill="#a16207" />
  </g>
);
const Flag = () => (
  <g>
    <line x1="60" y1="30" x2="60" y2="170" stroke={stroke} strokeWidth="3" />
    <path d="M 60 40 L 130 50 L 110 75 L 130 100 L 60 90 Z" fill="#dc2626" stroke={stroke} strokeWidth="2" />
    <circle cx="95" cy="70" r="8" fill="#fbbf24" stroke={stroke} strokeWidth="1" />
  </g>
);
const Party = () => (
  <g>
    <path d="M 70 50 L 80 80 L 50 75 Z" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
    <path d="M 130 50 L 120 80 L 150 75 Z" fill="#3b82f6" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="110" rx="50" ry="35" fill="#fde68a" stroke={stroke} strokeWidth="2" />
    <text x="100" y="125" textAnchor="middle" fontSize="30">🎉</text>
  </g>
);

// ─── Sports ───────────────────────────────────────────────────────────
const Soccer = () => <Ball />;
const Basket = () => (
  <g>
    <circle cx="100" cy="100" r="50" fill="#f97316" stroke={stroke} strokeWidth={sw} />
    <path d="M 50 100 Q 100 75 150 100 M 50 100 Q 100 125 150 100 M 100 50 Q 75 100 100 150 M 100 50 Q 125 100 100 150" stroke={stroke} strokeWidth="2" fill="none" />
  </g>
);
const Tennis = () => (
  <g>
    <circle cx="100" cy="100" r="35" fill="#dcfce7" stroke={stroke} strokeWidth={sw} />
    <path d="M 70 85 Q 100 100 130 85 M 70 115 Q 100 100 130 115" fill="none" stroke="#fff" strokeWidth="3" />
  </g>
);
const Swim = () => (
  <g>
    <circle cx="100" cy="80" r="30" fill={skin} stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="60" rx="35" ry="10" fill="#3b82f6" stroke={stroke} strokeWidth="2" />
    <path d="M 30 130 Q 50 110 70 130 Q 90 150 110 130 Q 130 110 150 130 Q 170 150 170 130" fill="none" stroke="#3b82f6" strokeWidth="4" />
  </g>
);
const Run = () => (
  <g>
    <circle cx="80" cy="60" r="18" fill={skin} stroke={stroke} strokeWidth="2" />
    <line x1="80" y1="80" x2="80" y2="120" stroke="#3b82f6" strokeWidth="6" />
    <line x1="80" y1="100" x2="60" y2="130" stroke="#3b82f6" strokeWidth="6" />
    <line x1="80" y1="100" x2="100" y2="90" stroke="#3b82f6" strokeWidth="6" />
    <line x1="80" y1="120" x2="65" y2="155" stroke="#3b82f6" strokeWidth="6" />
    <line x1="80" y1="120" x2="95" y2="155" stroke="#3b82f6" strokeWidth="6" />
  </g>
);
const Jump = () => (
  <g>
    <line x1="100" y1="80" x2="100" y2="40" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="60" r="20" fill={skin} stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={62} mouth="smile" />
    <line x1="100" y1="80" x2="85" y2="120" stroke="#ec4899" strokeWidth="6" />
    <line x1="100" y1="80" x2="115" y2="120" stroke="#ec4899" strokeWidth="6" />
    <line x1="85" y1="120" x2="80" y2="160" stroke="#3b82f6" strokeWidth="6" />
    <line x1="115" y1="120" x2="120" y2="160" stroke="#3b82f6" strokeWidth="6" />
  </g>
);

// ─── Music & arts ─────────────────────────────────────────────────────
const Piano = () => (
  <g>
    <rect x="30" y="70" width="140" height="90" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <rect x="30" y="70" width="140" height="20" fill="#1f2937" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <line key={i} x1={30 + i * 20} y1="70" x2={30 + i * 20} y2="160" stroke={stroke} strokeWidth="1" />
    ))}
    {[0, 1, 3, 4, 5].map((i) => (
      <rect key={i} x={45 + i * 20} y="90" width="10" height="35" fill="#1f2937" />
    ))}
  </g>
);
const Guitar = () => (
  <g>
    <ellipse cx="100" cy="120" rx="40" ry="50" fill="#d97706" stroke={stroke} strokeWidth={sw} />
    <circle cx="100" cy="120" r="15" fill="#92400e" />
    <rect x="95" y="40" width="10" height="80" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <rect x="80" y="30" width="40" height="15" fill="#1f2937" />
  </g>
);
const Drum = () => (
  <g>
    <ellipse cx="100" cy="80" rx="50" ry="15" fill="#fde68a" stroke={stroke} strokeWidth="2" />
    <rect x="50" y="80" width="100" height="60" fill="#dc2626" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="100" cy="140" rx="50" ry="15" fill="#fde68a" stroke={stroke} strokeWidth="2" />
    {[60, 100, 140].map((y, i) => (
      <line key={i} x1="50" y1={y} x2="150" y2={y} stroke="#fbbf24" strokeWidth="2" />
    ))}
  </g>
);
const Paint = () => (
  <g>
    <rect x="40" y="100" width="120" height="60" fill="#fde68a" stroke={stroke} strokeWidth="2" />
    <circle cx="60" cy="100" r="12" fill="#ef4444" />
    <circle cx="90" cy="100" r="12" fill="#fbbf24" />
    <circle cx="120" cy="100" r="12" fill="#22c55e" />
    <circle cx="150" cy="100" r="12" fill="#3b82f6" />
    <ellipse cx="100" cy="60" rx="15" ry="20" fill="#dbeafe" stroke={stroke} strokeWidth="2" />
  </g>
);
const Draw = () => (
  <g>
    <rect x="30" y="40" width="140" height="120" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <line x1="50" y1="60" x2="150" y2="60" stroke="#ef4444" strokeWidth="3" />
    <line x1="50" y1="90" x2="120" y2="90" stroke="#3b82f6" strokeWidth="3" />
    <line x1="50" y1="120" x2="150" y2="120" stroke="#22c55e" strokeWidth="3" />
    <path d="M 140 130 Q 100 150 70 130" fill="none" stroke="#a855f7" strokeWidth="3" />
  </g>
);
const Sing = () => (
  <g>
    <circle cx="100" cy="100" r="50" fill={skin} stroke={stroke} strokeWidth={sw} />
    <Face cx={100} cy={100} mouth="open" />
    <text x="50" y="60" fontSize="30" fill="#ec4899">♪</text>
    <text x="150" y="80" fontSize="30" fill="#3b82f6">♫</text>
    <text x="40" y="140" fontSize="20" fill="#fbbf24">♪</text>
  </g>
);

// ─── World & travel ───────────────────────────────────────────────────
const Globe = () => (
  <g>
    <circle cx="100" cy="100" r="60" fill="#3b82f6" stroke={stroke} strokeWidth={sw} />
    <path d="M 40 100 Q 100 80 160 100" fill="none" stroke="#fff" strokeWidth="2" />
    <path d="M 40 100 Q 100 120 160 100" fill="none" stroke="#fff" strokeWidth="2" />
    <ellipse cx="100" cy="100" rx="25" ry="60" fill="none" stroke="#fff" strokeWidth="2" />
    <path d="M 70 70 Q 80 90 70 100 Q 60 110 70 130" fill="#22c55e" stroke={stroke} strokeWidth="1" />
    <path d="M 130 70 Q 140 90 130 100 Q 120 110 130 130" fill="#22c55e" stroke={stroke} strokeWidth="1" />
  </g>
);
const Plane = () => (
  <g>
    <path d="M 30 100 L 160 80 L 170 100 L 160 120 Z" fill="#fff" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 80 80 L 110 30 L 130 35 L 120 85 Z" fill="#bae6fd" stroke={stroke} strokeWidth="2" />
    <path d="M 80 120 L 110 170 L 130 165 L 120 115 Z" fill="#bae6fd" stroke={stroke} strokeWidth="2" />
    <circle cx="145" cy="100" r="5" fill={stroke} />
  </g>
);
const Map = () => (
  <g>
    <path d="M 30 50 L 70 30 L 130 50 L 170 30 L 170 170 L 130 150 L 70 170 L 30 150 Z" fill="#fde68a" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <line x1="30" y1="100" x2="170" y2="100" stroke={stroke} strokeWidth="2" />
    <line x1="100" y1="50" x2="100" y2="170" stroke={stroke} strokeWidth="2" />
    <text x="55" y="80" fontSize="20">🏔️</text>
    <text x="125" y="80" fontSize="20">🏖️</text>
    <text x="55" y="140" fontSize="20">🏛️</text>
    <text x="125" y="140" fontSize="20">🌋</text>
  </g>
);
const Compass = () => (
  <g>
    <circle cx="100" cy="100" r="60" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <circle cx="100" cy="100" r="50" fill="#dbeafe" />
    <text x="100" y="55" textAnchor="middle" fontSize="14" fontWeight="900" fill={stroke}>N</text>
    <text x="100" y="155" textAnchor="middle" fontSize="14" fontWeight="900" fill={stroke}>S</text>
    <text x="50" y="105" textAnchor="middle" fontSize="14" fontWeight="900" fill={stroke}>W</text>
    <text x="150" y="105" textAnchor="middle" fontSize="14" fontWeight="900" fill={stroke}>E</text>
    <path d="M 100 60 L 110 100 L 100 140 L 90 100 Z" fill="#dc2626" stroke={stroke} strokeWidth="2" />
  </g>
);
const Camera = () => (
  <g>
    <rect x="30" y="70" width="140" height="80" rx="6" fill={stroke} />
    <rect x="70" y="55" width="60" height="20" fill={stroke} />
    <circle cx="100" cy="110" r="25" fill="#94a3b8" stroke="#fff" strokeWidth="3" />
    <circle cx="100" cy="110" r="15" fill={stroke} />
    <circle cx="50" cy="85" r="3" fill="#ef4444" />
  </g>
);

// ─── Jobs ─────────────────────────────────────────────────────────────
const Doctor = () => (
  <g>
    <circle cx="100" cy="80" r="35" fill={skin} stroke={stroke} strokeWidth={sw} />
    <Face cx={100} cy={80} mouth="smile" />
    <rect x="70" y="115" width="60" height="65" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <line x1="70" y1="135" x2="130" y2="135" stroke="#ef4444" strokeWidth="6" />
    <line x1="90" y1="115" x2="90" y2="135" stroke="#ef4444" strokeWidth="6" />
    <line x1="110" y1="115" x2="110" y2="135" stroke="#ef4444" strokeWidth="6" />
  </g>
);
const Teacher = () => (
  <g>
    <circle cx="100" cy="80" r="35" fill={skin} stroke={stroke} strokeWidth={sw} />
    <path d="M 70 50 Q 70 30 100 30 Q 130 30 130 50 L 130 70" fill="#1f2937" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={80} mouth="smile" />
    <rect x="70" y="115" width="60" height="65" fill="#7c3aed" stroke={stroke} strokeWidth={sw} />
    <circle cx="100" cy="148" r="4" fill="#fbbf24" />
  </g>
);
const Police = () => (
  <g>
    <circle cx="100" cy="80" r="35" fill={skin} stroke={stroke} strokeWidth={sw} />
    <path d="M 65 60 L 65 30 L 135 30 L 135 60 Z" fill="#1e3a8a" stroke={stroke} strokeWidth="2" />
    <path d="M 65 40 L 135 40 L 140 30 L 60 30 Z" fill="#1e3a8a" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={80} mouth="smile" />
    <rect x="70" y="115" width="60" height="65" fill="#1e3a8a" stroke={stroke} strokeWidth={sw} />
    <text x="100" y="155" textAnchor="middle" fontSize="20" fill="#fbbf24">★</text>
  </g>
);
const Cook = () => (
  <g>
    <circle cx="100" cy="80" r="35" fill={skin} stroke={stroke} strokeWidth={sw} />
    <path d="M 65 35 Q 100 10 135 35 L 130 65 L 70 65 Z" fill="#fff" stroke={stroke} strokeWidth="2" />
    <rect x="70" y="65" width="60" height="10" fill="#fff" />
    <Face cx={100} cy={80} mouth="smile" />
    <rect x="70" y="115" width="60" height="65" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <line x1="70" y1="135" x2="130" y2="135" stroke="#1f2937" strokeWidth="2" />
  </g>
);
const Farmer = () => (
  <g>
    <circle cx="100" cy="80" r="35" fill={skin} stroke={stroke} strokeWidth={sw} />
    <path d="M 60 60 L 100 25 L 140 60 Z" fill="#a16207" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="60" rx="40" ry="8" fill="#a16207" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={80} mouth="smile" />
    <rect x="70" y="115" width="60" height="65" fill="#22c55e" stroke={stroke} strokeWidth={sw} />
  </g>
);
const Driver = () => (
  <g>
    <circle cx="100" cy="80" r="35" fill={skin} stroke={stroke} strokeWidth={sw} />
    <path d="M 65 50 Q 100 25 135 50 L 130 70 L 70 70 Z" fill="#ef4444" stroke={stroke} strokeWidth="2" />
    <text x="100" y="65" textAnchor="middle" fontSize="18" fill="#fff">★</text>
    <Face cx={100} cy={80} mouth="smile" />
    <rect x="70" y="115" width="60" height="65" fill="#ef4444" stroke={stroke} strokeWidth={sw} />
  </g>
);

// ─── Tech ─────────────────────────────────────────────────────────────
const Phone = () => (
  <g>
    <rect x="70" y="30" width="60" height="140" rx="8" fill="#1f2937" stroke={stroke} strokeWidth={sw} />
    <rect x="76" y="45" width="48" height="100" fill="#3b82f6" />
    <Face cx={100} cy={95} mouth="smile" />
    <circle cx="100" cy="160" r="3" fill="#94a3b8" />
  </g>
);
const Tablet = () => (
  <g>
    <rect x="40" y="40" width="120" height="140" rx="6" fill="#1f2937" stroke={stroke} strokeWidth={sw} />
    <rect x="48" y="50" width="104" height="120" fill="#3b82f6" />
    <Face cx={100} cy={110} mouth="smile" />
  </g>
);
const Laptop = () => (
  <g>
    <rect x="30" y="60" width="140" height="90" rx="4" fill="#1f2937" stroke={stroke} strokeWidth={sw} />
    <rect x="40" y="70" width="120" height="70" fill="#3b82f6" />
    <path d="M 20 150 L 180 150 L 170 170 L 30 170 Z" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={105} mouth="smile" />
  </g>
);
const Headset = () => (
  <g>
    <path d="M 50 100 Q 50 40 100 40 Q 150 40 150 100" fill="none" stroke={stroke} strokeWidth="4" />
    <rect x="40" y="90" width="25" height="40" rx="4" fill="#ef4444" stroke={stroke} strokeWidth="2" />
    <rect x="135" y="90" width="25" height="40" rx="4" fill="#ef4444" stroke={stroke} strokeWidth="2" />
    <path d="M 150 130 Q 160 145 145 155" fill="none" stroke={stroke} strokeWidth="3" />
    <circle cx="145" cy="158" r="4" fill="#ef4444" />
  </g>
);
const Robot = () => (
  <g>
    <rect x="60" y="50" width="80" height="80" rx="8" fill="#94a3b8" stroke={stroke} strokeWidth={sw} />
    <rect x="70" y="65" width="60" height="20" fill="#1f2937" />
    <circle cx="85" cy="75" r="5" fill="#fbbf24" />
    <circle cx="115" cy="75" r="5" fill="#fbbf24" />
    <rect x="80" y="95" width="40" height="20" rx="3" fill="#1f2937" />
    <line x1="80" y1="130" x2="60" y2="160" stroke={stroke} strokeWidth="4" />
    <line x1="120" y1="130" x2="140" y2="160" stroke={stroke} strokeWidth="4" />
    <rect x="85" y="130" width="30" height="40" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
  </g>
);
const Drone = () => (
  <g>
    <ellipse cx="100" cy="100" rx="40" ry="15" fill="#1f2937" stroke={stroke} strokeWidth="2" />
    <ellipse cx="50" cy="50" rx="25" ry="6" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <ellipse cx="150" cy="50" rx="25" ry="6" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <ellipse cx="50" cy="150" rx="25" ry="6" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <ellipse cx="150" cy="150" rx="25" ry="6" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <line x1="50" y1="100" x2="50" y2="50" stroke={stroke} strokeWidth="2" />
    <line x1="150" y1="100" x2="150" y2="50" stroke={stroke} strokeWidth="2" />
    <line x1="50" y1="100" x2="50" y2="150" stroke={stroke} strokeWidth="2" />
    <line x1="150" y1="100" x2="150" y2="150" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="100" r="8" fill="#ef4444" />
  </g>
);

// ─── Storytime ────────────────────────────────────────────────────────
const Castle = () => (
  <g>
    <rect x="40" y="100" width="120" height="80" fill="#94a3b8" stroke={stroke} strokeWidth={sw} />
    <rect x="30" y="70" width="20" height="30" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <rect x="150" y="70" width="20" height="30" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <path d="M 25 70 L 35 50 L 45 70 Z" fill="#dc2626" stroke={stroke} strokeWidth="2" />
    <path d="M 145 70 L 155 50 L 165 70 Z" fill="#dc2626" stroke={stroke} strokeWidth="2" />
    <path d="M 95 70 L 100 50 L 105 70 Z" fill="#dc2626" stroke={stroke} strokeWidth="2" />
    <rect x="80" y="130" width="40" height="50" fill="#92400e" stroke={stroke} strokeWidth="2" />
  </g>
);
const Dragon = () => (
  <g>
    <ellipse cx="120" cy="100" rx="50" ry="30" fill="#22c55e" stroke={stroke} strokeWidth={sw} />
    <circle cx="65" cy="100" r="30" fill="#22c55e" stroke={stroke} strokeWidth={sw} />
    <path d="M 40 90 L 25 80 M 40 100 L 20 100 M 40 110 L 25 120" stroke="#22c55e" strokeWidth="3" />
    <circle cx="60" cy="95" r="3" fill={stroke} />
    <path d="M 160 95 Q 180 100 170 110" fill="#ef4444" stroke={stroke} strokeWidth="2" />
  </g>
);
const Wizard = () => (
  <g>
    <path d="M 80 50 L 100 20 L 120 50 Z" fill="#7c3aed" stroke={stroke} strokeWidth={sw} />
    <circle cx="100" cy="50" r="3" fill="#fbbf24" />
    <circle cx="100" cy="90" r="25" fill={skin} stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={88} mouth="neutral" />
    <path d="M 80 110 Q 100 105 120 110 L 130 180 L 70 180 Z" fill="#7c3aed" stroke={stroke} strokeWidth={sw} />
    <line x1="140" y1="120" x2="160" y2="100" stroke="#92400e" strokeWidth="4" />
    <circle cx="160" cy="100" r="6" fill="#fbbf24" />
  </g>
);
const Treasure = () => (
  <g>
    <rect x="40" y="100" width="120" height="70" fill="#92400e" stroke={stroke} strokeWidth={sw} />
    <path d="M 40 100 Q 100 70 160 100 L 155 95 Q 100 65 45 95 Z" fill="#d97706" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="135" r="8" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
    <rect x="96" y="135" width="8" height="15" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
    <circle cx="60" cy="140" r="6" fill="#fbbf24" />
    <circle cx="140" cy="140" r="6" fill="#fbbf24" />
  </g>
);
const Sword = () => (
  <g>
    <line x1="50" y1="160" x2="150" y2="60" stroke="#94a3b8" strokeWidth="14" strokeLinecap="round" />
    <line x1="50" y1="160" x2="150" y2="60" stroke="#fff" strokeWidth="4" />
    <rect x="40" y="145" width="30" height="6" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <circle cx="55" cy="148" r="4" fill="#fbbf24" />
  </g>
);
const Magic = () => (
  <g>
    <text x="100" y="120" textAnchor="middle" fontSize="100" fill="#a855f7">✨</text>
    <text x="50" y="60" fontSize="30" fill="#fbbf24">★</text>
    <text x="150" y="60" fontSize="30" fill="#ec4899">★</text>
    <text x="50" y="170" fontSize="30" fill="#3b82f6">★</text>
    <text x="150" y="170" fontSize="30" fill="#22c55e">★</text>
  </g>
);

// ─── Ocean ────────────────────────────────────────────────────────────
const Dolphin = () => (
  <g>
    <path d="M 30 100 Q 50 60 100 60 Q 150 60 170 100 Q 150 140 100 140 Q 50 140 30 100" fill="#94a3b8" stroke={stroke} strokeWidth={sw} />
    <path d="M 130 80 L 160 50 L 160 100 Z" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <circle cx="70" cy="90" r="3" fill={stroke} />
    <path d="M 30 100 Q 25 90 20 95" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <path d="M 30 100 Q 50 110 70 105" fill="none" stroke={stroke} strokeWidth="2" />
  </g>
);
const Whale = () => (
  <g>
    <ellipse cx="100" cy="100" rx="70" ry="35" fill="#3b82f6" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="60" cy="100" rx="20" ry="22" fill="#3b82f6" stroke={stroke} strokeWidth="2" />
    <circle cx="50" cy="95" r="3" fill={stroke} />
    <path d="M 50 105 Q 30 100 20 110" fill="none" stroke={stroke} strokeWidth="2" />
    <path d="M 150 65 L 170 50 L 165 75" fill="#3b82f6" stroke={stroke} strokeWidth="2" />
    <ellipse cx="120" cy="115" rx="15" ry="3" fill="#1e3a8a" />
  </g>
);
const Shark = () => (
  <g>
    <path d="M 30 100 Q 50 70 130 70 Q 160 80 170 100 Q 160 120 130 130 Q 50 130 30 100" fill="#64748b" stroke={stroke} strokeWidth={sw} />
    <path d="M 130 70 L 145 40 L 155 65" fill="#64748b" stroke={stroke} strokeWidth="2" />
    <circle cx="55" cy="95" r="3" fill={stroke} />
    <path d="M 70 110 L 80 100 L 85 110 L 95 100 L 100 110 L 110 100 L 115 110" fill="#fff" stroke={stroke} strokeWidth="2" />
  </g>
);
const Octopus = () => (
  <g>
    <ellipse cx="100" cy="80" rx="50" ry="45" fill="#ec4899" stroke={stroke} strokeWidth={sw} />
    <Face cx={100} cy={75} mouth="smile" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const a = (i * 22.5 * Math.PI) / 180;
      return <line key={i} x1={100} y1={120} x2={100 + 50 * Math.cos(a)} y2={120 + 50 * Math.sin(a)} stroke="#ec4899" strokeWidth="8" strokeLinecap="round" />;
    })}
  </g>
);
const Starfish = () => (
  <g>
    <path d="M 100 30 L 115 80 L 165 90 L 130 125 L 140 175 L 100 145 L 60 175 L 70 125 L 35 90 L 85 80 Z" fill="#f97316" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    {[[100, 60], [85, 95], [115, 95], [100, 110]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" fill="#fff" />
    ))}
  </g>
);
const Crab = () => (
  <g>
    <ellipse cx="100" cy="100" rx="50" ry="35" fill="#ef4444" stroke={stroke} strokeWidth={sw} />
    <Face cx={100} cy={95} mouth="smile" />
    <line x1="50" y1="90" x2="30" y2="70" stroke="#ef4444" strokeWidth="6" />
    <line x1="50" y1="100" x2="25" y2="100" stroke="#ef4444" strokeWidth="6" />
    <line x1="150" y1="90" x2="170" y2="70" stroke="#ef4444" strokeWidth="6" />
    <line x1="150" y1="100" x2="175" y2="100" stroke="#ef4444" strokeWidth="6" />
    <line x1="55" y1="135" x2="40" y2="160" stroke="#ef4444" strokeWidth="6" />
    <line x1="145" y1="135" x2="160" y2="160" stroke="#ef4444" strokeWidth="6" />
    <circle cx="30" cy="70" r="6" fill="#ef4444" stroke={stroke} strokeWidth="2" />
    <circle cx="170" cy="70" r="6" fill="#ef4444" stroke={stroke} strokeWidth="2" />
  </g>
);

// ─── Environment ──────────────────────────────────────────────────────
const Recycle = () => (
  <g>
    <path d="M 100 50 L 130 100 L 100 100 Z" fill="#22c55e" stroke={stroke} strokeWidth="2" />
    <path d="M 60 110 L 100 110 L 100 140 Z" fill="#22c55e" stroke={stroke} strokeWidth="2" />
    <path d="M 140 110 L 130 145 L 100 140 Z" fill="#22c55e" stroke={stroke} strokeWidth="2" />
  </g>
);
const Earth = () => <Globe />;
const Plant = () => (
  <g>
    <ellipse cx="100" cy="160" rx="40" ry="10" fill="#92400e" />
    <path d="M 100 160 L 100 100" stroke="#16a34a" strokeWidth="4" />
    <ellipse cx="80" cy="120" rx="20" ry="12" fill="#22c55e" stroke={stroke} strokeWidth="2" transform="rotate(-30 80 120)" />
    <ellipse cx="120" cy="100" rx="20" ry="12" fill="#22c55e" stroke={stroke} strokeWidth="2" transform="rotate(30 120 100)" />
    <circle cx="100" cy="80" r="15" fill="#ec4899" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="80" r="5" fill="#fbbf24" />
  </g>
);
const Windmill = () => (
  <g>
    <rect x="80" y="100" width="40" height="80" fill="#fff" stroke={stroke} strokeWidth="2" />
    <rect x="75" y="100" width="50" height="15" fill="#ef4444" />
    <line x1="100" y1="100" x2="100" y2="60" stroke={stroke} strokeWidth="3" />
    <ellipse cx="100" cy="55" rx="35" ry="6" fill="#fff" stroke={stroke} strokeWidth="2" transform="rotate(30 100 55)" />
    <ellipse cx="100" cy="55" rx="35" ry="6" fill="#fff" stroke={stroke} strokeWidth="2" transform="rotate(150 100 55)" />
    <circle cx="100" cy="55" r="6" fill="#1f2937" />
  </g>
);
const Solar = () => (
  <g>
    <Sun />
    <rect x="60" y="120" width="80" height="50" fill="#1e3a8a" stroke={stroke} strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={65 + i * 18} y={125} width="14" height="14" fill="#1f2937" />
    ))}
  </g>
);
const Drop = () => (
  <g>
    <path d="M 100 50 Q 60 110 60 140 Q 60 170 100 170 Q 140 170 140 140 Q 140 110 100 50 Z" fill="#3b82f6" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <ellipse cx="80" cy="120" rx="10" ry="20" fill="#93c5fd" />
  </g>
);

// ─── Space ────────────────────────────────────────────────────────────
const Rocket = () => (
  <g>
    <path d="M 100 30 Q 70 80 70 150 L 130 150 Q 130 80 100 30 Z" fill="#fff" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <circle cx="100" cy="80" r="12" fill="#3b82f6" stroke={stroke} strokeWidth="2" />
    <path d="M 70 130 L 50 160 L 70 150 Z" fill="#ef4444" stroke={stroke} strokeWidth="2" />
    <path d="M 130 130 L 150 160 L 130 150 Z" fill="#ef4444" stroke={stroke} strokeWidth="2" />
    <path d="M 80 150 L 80 180 L 90 165 L 100 180 L 110 165 L 120 180 L 120 150" fill="#fb923c" />
  </g>
);
const Planet = () => (
  <g>
    <circle cx="100" cy="100" r="50" fill="#a855f7" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="100" cy="100" rx="80" ry="15" fill="none" stroke="#fbbf24" strokeWidth="6" transform="rotate(-20 100 100)" />
    <circle cx="80" cy="85" r="8" fill="#7e22ce" />
    <circle cx="120" cy="110" r="6" fill="#7e22ce" />
  </g>
);
const Star = () => (
  <g>
    <path d="M 100 30 L 115 80 L 165 90 L 130 125 L 140 175 L 100 145 L 60 175 L 70 125 L 35 90 L 85 80 Z" fill="#fbbf24" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
    <Face cx={100} cy={110} mouth="smile" />
  </g>
);
const Moon = () => (
  <g>
    <circle cx="100" cy="100" r="60" fill="#fef3c7" stroke={stroke} strokeWidth={sw} />
    <circle cx="80" cy="80" r="10" fill="#d1d5db" />
    <circle cx="115" cy="100" r="8" fill="#d1d5db" />
    <circle cx="90" cy="125" r="6" fill="#d1d5db" />
    <Face cx={100} cy={100} mouth="smile" />
  </g>
);
const Astronaut = () => (
  <g>
    <ellipse cx="100" cy="80" rx="35" ry="40" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <circle cx="100" cy="75" r="20" fill="#3b82f6" stroke={stroke} strokeWidth="2" />
    <Face cx={100} cy={75} mouth="smile" blush={false} />
    <rect x="70" y="120" width="60" height="60" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <rect x="80" y="140" width="40" height="20" fill="#ef4444" />
    <text x="100" y="155" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">USA</text>
  </g>
);
const Alien = () => (
  <g>
    <ellipse cx="100" cy="90" rx="35" ry="45" fill="#22c55e" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="88" cy="80" rx="8" ry="10" fill="#1f2937" />
    <ellipse cx="112" cy="80" rx="8" ry="10" fill="#1f2937" />
    <ellipse cx="88" cy="80" rx="3" ry="5" fill="#fff" />
    <ellipse cx="112" cy="80" rx="3" ry="5" fill="#fff" />
    <line x1="90" y1="100" x2="110" y2="100" stroke={stroke} strokeWidth="2" />
    <line x1="100" y1="40" x2="100" y2="20" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="20" r="5" fill="#22c55e" stroke={stroke} strokeWidth="2" />
  </g>
);

// ─── Heroes ───────────────────────────────────────────────────────────
const Hero = () => (
  <g>
    <circle cx="100" cy="80" r="35" fill={skin} stroke={stroke} strokeWidth={sw} />
    <Face cx={100} cy={80} mouth="smile" />
    <rect x="65" y="115" width="70" height="65" rx="4" fill="#dc2626" stroke={stroke} strokeWidth={sw} />
    <path d="M 100 125 L 80 155 L 100 145 L 120 155 Z" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
    <path d="M 70 50 L 80 60 L 100 30 L 120 60 L 130 50" fill="none" stroke="#ef4444" strokeWidth="3" />
  </g>
);
const Shield = () => (
  <g>
    <path d="M 100 30 L 160 50 L 160 120 Q 100 170 40 120 L 40 50 Z" fill="#3b82f6" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 100 30 L 100 170 M 40 50 L 160 50" stroke="#fff" strokeWidth="3" />
    <circle cx="100" cy="100" r="20" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
  </g>
);
const Crown = () => (
  <g>
    <path d="M 40 130 L 50 60 L 80 100 L 100 40 L 120 100 L 150 60 L 160 130 Z" fill="#fbbf24" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <rect x="40" y="130" width="120" height="30" fill="#f59e0b" stroke={stroke} strokeWidth="2" />
    <circle cx="50" cy="60" r="6" fill="#dc2626" />
    <circle cx="100" cy="40" r="6" fill="#3b82f6" />
    <circle cx="150" cy="60" r="6" fill="#22c55e" />
    <circle cx="70" cy="145" r="4" fill="#dc2626" />
    <circle cx="100" cy="145" r="4" fill="#3b82f6" />
    <circle cx="130" cy="145" r="4" fill="#22c55e" />
  </g>
);
const Cape = () => (
  <g>
    <path d="M 60 50 Q 40 100 30 180 L 80 130 Z" fill="#dc2626" stroke={stroke} strokeWidth="2" />
    <path d="M 140 50 Q 160 100 170 180 L 120 130 Z" fill="#dc2626" stroke={stroke} strokeWidth="2" />
    <path d="M 100 50 L 60 70 L 100 90 L 140 70 Z" fill="#ef4444" stroke={stroke} strokeWidth="2" />
    <path d="M 80 90 L 100 130 L 120 90" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
  </g>
);
const Medal = () => (
  <g>
    <line x1="70" y1="30" x2="100" y2="100" stroke="#3b82f6" strokeWidth="8" />
    <line x1="130" y1="30" x2="100" y2="100" stroke="#dc2626" strokeWidth="8" />
    <circle cx="100" cy="130" r="35" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="130" r="20" fill="#f59e0b" />
    <text x="100" y="140" textAnchor="middle" fontSize="24" fontWeight="900" fill="#fff">1</text>
  </g>
);
const Ribbon = () => (
  <g>
    <circle cx="100" cy="90" r="40" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
    <path d="M 80 130 L 60 180 L 90 165 L 100 180" fill="#dc2626" stroke={stroke} strokeWidth="2" />
    <path d="M 120 130 L 140 180 L 110 165 L 100 180" fill="#dc2626" stroke={stroke} strokeWidth="2" />
    <text x="100" y="100" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">★</text>
  </g>
);

// ─── Mysteries ────────────────────────────────────────────────────────
const Magnifier = () => (
  <g>
    <line x1="130" y1="130" x2="170" y2="170" stroke="#92400e" strokeWidth="10" strokeLinecap="round" />
    <circle cx="100" cy="100" r="50" fill="none" stroke="#1f2937" strokeWidth="8" />
    <circle cx="100" cy="100" r="40" fill="#bae6fd" opacity="0.4" />
    <text x="100" y="115" textAnchor="middle" fontSize="30" fill="#1f2937">?</text>
  </g>
);
const Key = () => (
  <g>
    <circle cx="60" cy="100" r="30" fill="none" stroke="#fbbf24" strokeWidth="10" />
    <line x1="90" y1="100" x2="170" y2="100" stroke="#fbbf24" strokeWidth="10" />
    <line x1="140" y1="100" x2="140" y2="120" stroke="#fbbf24" strokeWidth="10" />
    <line x1="160" y1="100" x2="160" y2="125" stroke="#fbbf24" strokeWidth="10" />
  </g>
);
const Lock = () => (
  <g>
    <path d="M 70 100 Q 70 50 100 50 Q 130 50 130 100" fill="none" stroke="#94a3b8" strokeWidth="10" />
    <rect x="50" y="100" width="100" height="70" rx="4" fill="#1f2937" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="130" r="6" fill="#fbbf24" />
    <line x1="100" y1="135" x2="100" y2="155" stroke="#fbbf24" strokeWidth="3" />
  </g>
);
const Puzzle = () => (
  <g>
    <path d="M 50 50 L 100 50 Q 90 70 100 90 L 150 90 Q 130 100 150 110 L 150 150 L 110 150 Q 100 130 90 150 L 50 150 Z" fill="#a855f7" stroke={stroke} strokeWidth={sw} />
    <path d="M 60 70 Q 70 60 80 70" fill="none" stroke={stroke} strokeWidth="2" />
  </g>
);
const Mystery = () => (
  <g>
    <text x="100" y="130" textAnchor="middle" fontSize="120" fill="#1f2937">?</text>
    <circle cx="100" cy="100" r="80" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="8 6" />
  </g>
);

// ─── Culture ──────────────────────────────────────────────────────────
const Mask = () => (
  <g>
    <ellipse cx="100" cy="100" rx="50" ry="65" fill="#fff" stroke={stroke} strokeWidth={sw} />
    <ellipse cx="85" cy="90" rx="8" ry="12" fill={stroke} />
    <ellipse cx="115" cy="90" rx="8" ry="12" fill={stroke} />
    <path d="M 85 130 Q 100 140 115 130" fill="#dc2626" stroke={stroke} strokeWidth="2" />
    <path d="M 60 100 L 30 80 M 140 100 L 170 80" stroke="#fbbf24" strokeWidth="3" />
  </g>
);
const Lantern = () => (
  <g>
    <line x1="100" y1="20" x2="100" y2="60" stroke={stroke} strokeWidth="2" />
    <ellipse cx="100" cy="110" rx="40" ry="50" fill="#dc2626" stroke={stroke} strokeWidth={sw} />
    <line x1="60" y1="110" x2="140" y2="110" stroke="#fbbf24" strokeWidth="2" />
    <line x1="60" y1="80" x2="140" y2="80" stroke="#fbbf24" strokeWidth="2" />
    <line x1="60" y1="140" x2="140" y2="140" stroke="#fbbf24" strokeWidth="2" />
    <text x="100" y="120" textAnchor="middle" fontSize="30" fill="#fbbf24">福</text>
  </g>
);
const Firework = () => (
  <g>
    {Array.from({ length: 16 }, (_, i) => {
      const a = (i * 22.5 * Math.PI) / 180;
      return <line key={i} x1={100} y1={100} x2={100 + 60 * Math.cos(a)} y2={100 + 60 * Math.sin(a)} stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />;
    })}
    <circle cx="100" cy="100" r="15" fill="#ef4444" />
    <circle cx="100" cy="100" r="8" fill="#fbbf24" />
  </g>
);
const Costume = () => (
  <g>
    <path d="M 60 60 Q 100 30 140 60 L 150 180 L 50 180 Z" fill="#a855f7" stroke={stroke} strokeWidth={sw} />
    <path d="M 75 50 Q 100 20 125 50" fill="none" stroke="#fbbf24" strokeWidth="3" />
    <circle cx="100" cy="100" r="8" fill="#fbbf24" stroke={stroke} strokeWidth="2" />
  </g>
);
const Dance = () => (
  <g>
    <circle cx="100" cy="70" r="20" fill={skin} stroke={stroke} strokeWidth="2" />
    <line x1="100" y1="90" x2="100" y2="130" stroke="#ec4899" strokeWidth="6" />
    <line x1="100" y1="100" x2="80" y2="120" stroke="#ec4899" strokeWidth="6" />
    <line x1="100" y1="100" x2="130" y2="80" stroke="#ec4899" strokeWidth="6" />
    <line x1="100" y1="130" x2="80" y2="165" stroke="#3b82f6" strokeWidth="6" />
    <line x1="100" y1="130" x2="125" y2="160" stroke="#3b82f6" strokeWidth="6" />
  </g>
);

// ─── Future ───────────────────────────────────────────────────────────
const Crystal = () => (
  <g>
    <path d="M 100 30 L 130 80 L 130 130 L 100 170 L 70 130 L 70 80 Z" fill="#a855f7" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 100 30 L 100 170 M 70 80 L 130 80 M 70 130 L 130 130" stroke="#fff" strokeWidth="2" opacity="0.6" />
  </g>
);
const Lightbulb = () => (
  <g>
    <circle cx="100" cy="90" r="45" fill="#fbbf24" stroke={stroke} strokeWidth={sw} />
    <rect x="85" y="135" width="30" height="20" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <line x1="85" y1="145" x2="115" y2="145" stroke={stroke} strokeWidth="2" />
    <line x1="85" y1="152" x2="115" y2="152" stroke={stroke} strokeWidth="2" />
    {[[60, 60], [140, 60], [50, 100], [150, 100], [60, 130], [140, 130]].map(([x, y], i) => (
      <line key={i} x1={x} y1={y} x2={x + (x < 100 ? -10 : 10)} y2={y - 15} stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
    ))}
  </g>
);
const Idea = () => (
  <g>
    <ellipse cx="100" cy="110" rx="60" ry="20" fill="#fff" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="80" r="30" fill="#fff" stroke={stroke} strokeWidth="2" />
    <text x="100" y="92" textAnchor="middle" fontSize="30" fontWeight="900" fill="#ef4444">!</text>
  </g>
);

// ─── Master minds ─────────────────────────────────────────────────────
const Brain = () => (
  <g>
    <path d="M 60 50 Q 40 60 50 100 Q 40 140 70 150 Q 80 170 100 160 Q 120 170 130 150 Q 160 140 150 100 Q 160 60 140 50 Q 100 30 60 50 Z" fill="#f9a8d4" stroke={stroke} strokeWidth={sw} />
    <path d="M 80 80 Q 100 70 120 80 M 80 100 Q 100 95 120 100 M 80 120 Q 100 115 120 120" stroke={stroke} strokeWidth="2" fill="none" />
  </g>
);
const Gear = () => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      return <rect key={i} x={95} y={25} width="10" height="25" fill="#94a3b8" stroke={stroke} strokeWidth="2" transform={`rotate(${i * 45} 100 100)`} />;
    })}
    <circle cx="100" cy="100" r="40" fill="#94a3b8" stroke={stroke} strokeWidth="2" />
    <circle cx="100" cy="100" r="15" fill="#fff" stroke={stroke} strokeWidth="2" />
  </g>
);
const Atom = () => (
  <g>
    <circle cx="100" cy="100" r="8" fill="#3b82f6" />
    <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#3b82f6" strokeWidth="3" transform="rotate(0 100 100)" />
    <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#3b82f6" strokeWidth="3" transform="rotate(60 100 100)" />
    <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#3b82f6" strokeWidth="3" transform="rotate(-60 100 100)" />
    <circle cx="160" cy="100" r="5" fill="#3b82f6" />
    <circle cx="70" cy="148" r="5" fill="#3b82f6" />
    <circle cx="70" cy="52" r="5" fill="#3b82f6" />
  </g>
);
const Graph = () => (
  <g>
    <line x1="30" y1="170" x2="170" y2="170" stroke={stroke} strokeWidth="2" />
    <line x1="30" y1="170" x2="30" y2="30" stroke={stroke} strokeWidth="2" />
    <polyline points="40,140 70,110 100,80 130,90 160,50" fill="none" stroke="#22c55e" strokeWidth="4" />
    <circle cx="40" cy="140" r="5" fill="#22c55e" />
    <circle cx="70" cy="110" r="5" fill="#22c55e" />
    <circle cx="100" cy="80" r="5" fill="#22c55e" />
    <circle cx="130" cy="90" r="5" fill="#22c55e" />
    <circle cx="160" cy="50" r="5" fill="#22c55e" />
  </g>
);
const Lab = () => (
  <g>
    <path d="M 80 50 L 80 100 L 50 160 L 150 160 L 120 100 L 120 50 Z" fill="#bae6fd" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <line x1="70" y1="50" x2="130" y2="50" stroke={stroke} strokeWidth="3" />
    <circle cx="100" cy="140" r="8" fill="#22c55e" />
    <circle cx="85" cy="150" r="5" fill="#ef4444" />
    <circle cx="115" cy="150" r="5" fill="#fbbf24" />
  </g>
);

// ─── Champion ─────────────────────────────────────────────────────────
const Trophy = () => (
  <g>
    <path d="M 60 50 L 60 100 Q 60 140 100 140 Q 140 140 140 100 L 140 50 Z" fill="#fbbf24" stroke={stroke} strokeWidth={sw} />
    <path d="M 60 70 Q 30 70 30 100 Q 30 120 60 120" fill="none" stroke={stroke} strokeWidth="4" />
    <path d="M 140 70 Q 170 70 170 100 Q 170 120 140 120" fill="none" stroke={stroke} strokeWidth="4" />
    <rect x="70" y="140" width="60" height="20" fill="#f59e0b" stroke={stroke} strokeWidth="2" />
    <rect x="50" y="160" width="100" height="20" fill="#92400e" stroke={stroke} strokeWidth="2" />
    <text x="100" y="100" textAnchor="middle" fontSize="24" fontWeight="900" fill="#fff">★</text>
  </g>
);
const Gem = () => (
  <g>
    <path d="M 60 80 L 100 40 L 140 80 L 100 170 Z" fill="#a855f7" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M 60 80 L 140 80 L 100 110 Z" fill="#7e22ce" />
    <path d="M 100 40 L 100 110" stroke="#fff" strokeWidth="2" />
  </g>
);

// ─── Map iconId → component ──────────────────────────────────────────
const ICON_MAP = {
  // School
  notebook: Notebook, pencil: Pencil, ruler: Ruler, book: Book, bag: Bag, clock: Clock,
  // Home
  home: Home, bed: Bed, lamp: Lamp, chair: Chair, door: Door, window: Window,
  // Kids
  child1: Child1, child2: Child2, ball: Ball, kite: Kite, swing: Swing, slide: Slide,
  // Domestic
  cat: Cat, dog: Dog, bird: Bird, rabbit: Rabbit, fish: Fish, turtle: Turtle,
  // Wild
  lion: Lion, elephant: Elephant, monkey: Monkey, giraffe: Giraffe, zebra: Zebra, bear: Bear,
  // Nature
  flower: Flower, tree: Tree, leaf: Leaf, grass: Grass, seed: Seed, sun: Sun,
  // Food
  apple: Apple, bread: Bread, rice: Rice, milk: Milk, cake: Cake, banana: Banana,
  // Body
  heart: Heart, tooth: Tooth, eye: Eye, ear: Ear, hand: Hand, foot: Foot,
  // City
  car: Car, bus: Bus, shop: Shop, park: Park, road: Road, sign: Sign,
  // Weather
  cloud: Cloud, rain: Rain, snow: Snow, wind: Wind, storm: Storm,
  // Celebrations
  gift: Gift, balloon: Balloon, candle: Candle, flag: Flag, party: Party,
  // Sports
  soccer: Soccer, basket: Basket, tennis: Tennis, swim: Swim, run: Run, jump: Jump,
  // Arts
  piano: Piano, guitar: Guitar, drum: Drum, paint: Paint, draw: Draw, sing: Sing,
  // Travel
  globe: Globe, plane: Plane, map: Map, compass: Compass, camera: Camera,
  // Jobs
  doctor: Doctor, teacher: Teacher, police: Police, cook: Cook, farmer: Farmer, driver: Driver,
  // Tech
  phone: Phone, tablet: Tablet, laptop: Laptop, headset: Headset, robot: Robot, drone: Drone,
  // Story
  castle: Castle, dragon: Dragon, wizard: Wizard, treasure: Treasure, sword: Sword, magic: Magic,
  // Ocean
  dolphin: Dolphin, whale: Whale, shark: Shark, octopus: Octopus, starfish: Starfish, crab: Crab,
  // Environment
  recycle: Recycle, earth: Earth, plant: Plant, windmill: Windmill, solar: Solar, drop: Drop,
  // Space
  rocket: Rocket, planet: Planet, star: Star, moon: Moon, astronaut: Astronaut, alien: Alien,
  // Heroes
  hero: Hero, shield: Shield, crown: Crown, cape: Cape, medal: Medal, ribbon: Ribbon,
  // Mystery
  magnifier: Magnifier, key: Key, lock: Lock, puzzle: Puzzle, mystery: Mystery,
  // Culture
  mask: Mask, music: Sing, dance: Dance, costume: Costume, lantern: Lantern, firework: Firework,
  // Future
  crystal: Crystal, lightbulb: Lightbulb, idea: Idea,
  // Mind
  brain: Brain, gear: Gear, atom: Atom, graph: Graph, lab: Lab,
  // Champion
  trophy: Trophy, gem: Gem,
};

export function CardIcon({ iconId, size = 200, accent = 'sky' }) {
  const Icon = ICON_MAP[iconId];
  if (!Icon) return null;
  // Slight accent background per collection
  const bgMap = {
    sky: '#e0f2fe', rose: '#fce7f3', amber: '#fef3c7', emerald: '#d1fae5',
    orange: '#ffedd5', green: '#dcfce7', red: '#fee2e2', pink: '#fce7f3',
    slate: '#e2e8f0', cyan: '#cffafe', fuchsia: '#fae8ff', lime: '#ecfccb',
    violet: '#ede9fe', teal: '#ccfbf1', blue: '#dbeafe', indigo: '#e0e7ff',
  };
  const bg = bgMap[accent] || '#f1f5f9';
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-label={iconId}>
      <rect x="0" y="0" width="200" height="200" rx="16" fill={bg} />
      <Icon />
    </svg>
  );
}
