import React from 'react';

/**
 * Calculates proportional widths and percentages for Part-Whole Bar Models
 * @param {Array<{ value: number, label: string, color?: string }>} bars
 * @param {number} totalWidth (default: 380)
 * @returns {Array<{ width: number, percent: number, xOffset: number, label: string, color?: string }>}
 */
export function calculateBarModelProportions(bars = [], totalWidth = 380) {
  const totalSum = bars.reduce((acc, b) => acc + (Number(b.value) || 0), 0) || 100;
  return bars.map((bar, idx) => {
    const rawVal = Number(bar.value) || 0;
    const ratio = totalSum > 0 ? rawVal / totalSum : 1 / (bars.length || 1);
    const percent = Math.round(ratio * 100);
    const width = ratio * totalWidth;
    const xOffset = bars
      .slice(0, idx)
      .reduce((acc, b) => {
        const bVal = Number(b.value) || 0;
        const bRatio = totalSum > 0 ? bVal / totalSum : 1 / (bars.length || 1);
        return acc + bRatio * totalWidth;
      }, 0);

    return {
      ...bar,
      percent,
      width,
      xOffset,
    };
  });
}

/**
 * Interactive SVG Renderer for Singapore Bar Models.
 * Renders Part-Whole and Comparison Bar Models dynamically.
 */
export function BarModelSVG({ modelData }) {
  if (!modelData) return null;

  const { type = 'part_whole', bars = [], totalLabel = '' } = modelData;
  const computedBars = calculateBarModelProportions(bars, 380);

  return (
    <div className="w-full bg-slate-50 p-1 sm:p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
      <svg
        viewBox="0 0 400 170"
        className="w-full h-auto max-h-[260px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {type === 'part_whole' && (
          <g>
            {/* Main Combined Bar */}
            <g transform="translate(10, 35)">
              {computedBars.map((bar, idx) => {
                return (
                  <g key={idx}>
                    <rect
                      x={bar.xOffset}
                      y={0}
                      width={bar.width}
                      height={50}
                      fill={bar.color || (idx === 0 ? '#4f46e5' : '#06b6d4')}
                      stroke="#1e293b"
                      strokeWidth="2.5"
                      rx="6"
                    />
                    <text
                      x={bar.xOffset + bar.width / 2}
                      y={31}
                      fill="#ffffff"
                      fontSize="17"
                      fontWeight="900"
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
              <g transform="translate(10, 100)">
                <path
                  d="M 0 0 L 0 15 L 190 25 L 380 15 L 380 0"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.5"
                />
                <text
                  x="190"
                  y="48"
                  fill="#d97706"
                  fontSize="18"
                  fontWeight="900"
                  textAnchor="middle"
                >
                  Total: {totalLabel}
                </text>
              </g>
            )}
          </g>
        )}

        {type === 'comparison' && (() => {
          const compBars = calculateBarModelProportions(bars, 380);
          return (
            <g>
              {/* Bar 1 */}
              <g transform="translate(10, 25)">
                <rect
                  x="0"
                  y="0"
                  width={compBars[0]?.width || 380}
                  height={46}
                  fill={compBars[0]?.color || '#4f46e5'}
                  stroke="#1e293b"
                  strokeWidth="2.5"
                  rx="6"
                />
                <text
                  x={(compBars[0]?.width || 380) / 2}
                  y="29"
                  fill="#ffffff"
                  fontSize="17"
                  fontWeight="900"
                  textAnchor="middle"
                >
                  {compBars[0]?.label}
                </text>
              </g>

              {/* Bar 2 */}
              {compBars[1] && (
                <g transform="translate(10, 85)">
                  <rect
                    x="0"
                    y="0"
                    width={compBars[1].width}
                    height={46}
                    fill={compBars[1]?.color || '#06b6d4'}
                    stroke="#1e293b"
                    strokeWidth="2.5"
                    rx="6"
                  />
                  <text
                    x={compBars[1].width / 2}
                    y="29"
                    fill="#ffffff"
                    fontSize="17"
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    {compBars[1]?.label}
                  </text>
                </g>
              )}
            </g>
          );
        })()}
      </svg>
    </div>
  );
}
