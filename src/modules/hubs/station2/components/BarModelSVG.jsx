import React from 'react';

/**
 * Interactive SVG Renderer for Singapore Bar Models.
 * Renders Part-Whole and Comparison Bar Models dynamically.
 */
export function BarModelSVG({ modelData }) {
  if (!modelData) return null;

  const { type = 'part_whole', bars = [], totalLabel = '' } = modelData;

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
      <svg
        viewBox="0 0 400 180"
        className="w-full h-auto max-h-[220px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {type === 'part_whole' && (
          <g>
            {/* Main Combined Bar */}
            <g transform="translate(40, 50)">
              {bars.map((bar, idx) => {
                const totalWidth = 320;
                const width = (bar.value / 100) * totalWidth;
                const xOffset = bars
                  .slice(0, idx)
                  .reduce((acc, b) => acc + (b.value / 100) * totalWidth, 0);

                return (
                  <g key={idx}>
                    <rect
                      x={xOffset}
                      y={0}
                      width={width}
                      height={44}
                      fill={bar.color || (idx === 0 ? '#4f46e5' : '#06b6d4')}
                      stroke="#1e293b"
                      strokeWidth="2"
                      rx="4"
                    />
                    <text
                      x={xOffset + width / 2}
                      y={26}
                      fill="#ffffff"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {bar.label}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Total Bracket Line */}
            {totalLabel && (
              <g transform="translate(40, 110)">
                <path
                  d="M 0 0 L 0 15 L 160 25 L 320 15 L 320 0"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2"
                />
                <text
                  x="160"
                  y="45"
                  fill="#d97706"
                  fontSize="16"
                  fontWeight="extrabold"
                  textAnchor="middle"
                >
                  Total: {totalLabel}
                </text>
              </g>
            )}
          </g>
        )}

        {type === 'comparison' && (
          <g>
            {/* Bar 1 */}
            <g transform="translate(40, 30)">
              <text x="-30" y="24" fill="#94a3b8" fontSize="12" fontWeight="bold">
                {bars[0]?.name || 'A'}
              </text>
              <rect
                x="0"
                y="0"
                width={bars[0]?.width || 240}
                height={36}
                fill="#4f46e5"
                rx="4"
              />
              <text
                x={(bars[0]?.width || 240) / 2}
                y="22"
                fill="#fff"
                fontSize="13"
                fontWeight="bold"
                textAnchor="middle"
              >
                {bars[0]?.label}
              </text>
            </g>

            {/* Bar 2 */}
            <g transform="translate(40, 85)">
              <text x="-30" y="24" fill="#94a3b8" fontSize="12" fontWeight="bold">
                {bars[1]?.name || 'B'}
              </text>
              <rect
                x="0"
                y="0"
                width={bars[1]?.width || 160}
                height={36}
                fill="#06b6d4"
                rx="4"
              />
              <text
                x={(bars[1]?.width || 160) / 2}
                y="22"
                fill="#fff"
                fontSize="13"
                fontWeight="bold"
                textAnchor="middle"
              >
                {bars[1]?.label}
              </text>
            </g>

            {/* Difference Bracket */}
            <g transform="translate(200, 45)">
              <line x1="0" y1="0" x2="80" y2="0" stroke="#f43f5e" strokeDasharray="4" strokeWidth="2" />
              <line x1="0" y1="40" x2="80" y2="40" stroke="#f43f5e" strokeDasharray="4" strokeWidth="2" />
              <text x="40" y="24" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">
                Difference: ?
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
