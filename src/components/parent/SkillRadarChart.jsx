import React, { useMemo } from 'react';

/**
 * SkillRadarChart — SVG radar chart for 4 skills (Listening, Reading, Writing, Speaking).
 * Score 0–5 per axis. Pure SVG, no dependencies.
 *
 * Props:
 *   skills: { listening: number, reading: number, writing: number, speaking: number }
 *   size: chart size in px (default 220)
 */

const LABELS = [
  { key: 'listening', label: '🎧 Listening', angle: -90 },
  { key: 'reading',   label: '📖 Reading',   angle: 0 },
  { key: 'speaking',  label: '🎙️ Speaking',  angle: 90 },
  { key: 'writing',   label: '✏️ Writing',   angle: 180 },
];

const MAX_SCORE = 5;

export default function SkillRadarChart({ skills = {}, size = 220 }) {
  const center = size / 2;
  const radius = (size / 2) - 36;

  // Convert angle + score to SVG point
  const getPoint = (angleDeg, score) => {
    const r = (score / MAX_SCORE) * radius;
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  // Grid rings (1–5)
  const rings = useMemo(() => {
    return [1, 2, 3, 4, 5].map(level => {
      const r = (level / MAX_SCORE) * radius;
      return (
        <polygon
          key={level}
          points={LABELS.map(l => {
            const p = getPoint(l.angle, level);
            return `${p.x},${p.y}`;
          }).join(' ')}
          fill="none"
          stroke="rgba(99, 102, 241, 0.12)"
          strokeWidth={level === 5 ? 1.5 : 0.8}
        />
      );
    });
  }, [radius]); // eslint-disable-line react-hooks/exhaustive-deps

  // Data polygon
  const dataPoints = LABELS.map(l => {
    const score = Math.min(MAX_SCORE, Math.max(0, skills[l.key] || 0));
    return getPoint(l.angle, score);
  });

  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Axis lines
  const axes = LABELS.map(l => {
    const p = getPoint(l.angle, MAX_SCORE);
    return (
      <line
        key={l.key}
        x1={center}
        y1={center}
        x2={p.x}
        y2={p.y}
        stroke="rgba(99, 102, 241, 0.15)"
        strokeWidth={0.8}
      />
    );
  });

  // Labels
  const labels = LABELS.map(l => {
    const p = getPoint(l.angle, MAX_SCORE + 1.2);
    const score = skills[l.key] || 0;
    return (
      <text
        key={l.key}
        x={p.x}
        y={p.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fontWeight="700"
        fill="#475569"
      >
        {l.label}
        <tspan x={p.x} dy="14" fontSize="13" fontWeight="800" fill="#4338ca">
          {score}/{MAX_SCORE}
        </tspan>
      </text>
    );
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="skill-radar-chart"
      style={{ display: 'block', margin: '0 auto' }}
    >
      {/* Grid */}
      {rings}

      {/* Axes */}
      {axes}

      {/* Data fill */}
      <polygon
        points={dataPolygon}
        fill="rgba(99, 102, 241, 0.15)"
        stroke="#6366f1"
        strokeWidth={2}
        strokeLinejoin="round"
      >
        <animate
          attributeName="opacity"
          from="0"
          to="1"
          dur="0.6s"
          fill="freeze"
        />
      </polygon>

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="#6366f1"
          stroke="white"
          strokeWidth={2}
        >
          <animate
            attributeName="r"
            from="0"
            to="4"
            dur="0.4s"
            begin={`${i * 0.1}s`}
            fill="freeze"
          />
        </circle>
      ))}

      {/* Labels */}
      {labels}
    </svg>
  );
}
