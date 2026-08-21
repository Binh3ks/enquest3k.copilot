/**
 * Pure helper for bar model ratio calculation
 */
function calculateBarModelProportions(bars = [], totalWidth = 320) {
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

console.log('🧪 Running Unit Tests for Bar Model Proportional Ratio Calculation (P0.3)...\n');

const testCases = [
  { partValue: 40, total: 100, expectedPart: 40, expectedRemainder: 60 },
  { partValue: 25, total: 100, expectedPart: 25, expectedRemainder: 75 },
  { partValue: 70, total: 100, expectedPart: 70, expectedRemainder: 30 },
  { partValue: 15, total: 25, expectedPart: 60, expectedRemainder: 40 },
];

let allPassed = true;

for (const tc of testCases) {
  const remainderValue = tc.total - tc.partValue;
  const bars = [
    { value: tc.partValue, label: `Part: ${tc.partValue}` },
    { value: remainderValue, label: `Remainder: ${remainderValue}` },
  ];

  const results = calculateBarModelProportions(bars, 320);

  const actualPartPercent = results[0].percent;
  const actualRemainderPercent = results[1].percent;

  const passed =
    actualPartPercent === tc.expectedPart &&
    actualRemainderPercent === tc.expectedRemainder;

  if (passed) {
    console.log(`✅ PASS: partValue=${tc.partValue}, total=${tc.total} -> partPercent=${actualPartPercent}%, remainderPercent=${actualRemainderPercent}%`);
  } else {
    console.error(`❌ FAIL: partValue=${tc.partValue}, total=${tc.total} -> Expected ${tc.expectedPart}% / ${tc.expectedRemainder}%, got ${actualPartPercent}% / ${actualRemainderPercent}%`);
    allPassed = false;
  }
}

if (!allPassed) {
  console.error('\n❌ Bar Model Proportional Unit Tests FAILED!');
  process.exit(1);
} else {
  console.log('\n🎉 ALL BAR MODEL RATIO TESTS PASSED (100%)!');
}
