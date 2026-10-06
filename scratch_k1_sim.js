function computeAllocations(currentWeekId, targetSize, getAvailableCount) {
  const sources = [
    { weekId: currentWeekId, originalWeight: 0.6 },
    { weekId: currentWeekId - 1, originalWeight: 0.2 },
    { weekId: currentWeekId - 2, originalWeight: 0.12 },
    { weekId: currentWeekId - 3, originalWeight: 0.08 }
  ];

  // Check availability (assume available if > 0)
  for (const s of sources) {
    s.available = getAvailableCount(s.weekId);
    s.hasData = s.available > 0;
  }

  const validSources = sources.filter(s => s.hasData);
  
  if (validSources.length === 0) {
    return { allocations: [], error: true, message: "No data available at all" };
  }

  let shortfall = 0;
  let validWeightSum = 0;

  for (const s of sources) {
    if (!s.hasData) {
      shortfall += s.originalWeight;
    } else {
      validWeightSum += s.originalWeight;
    }
  }

  // Distribute shortfall proportionally among valid sources
  let totalCount = 0;
  for (const s of sources) {
    if (s.hasData) {
      s.finalWeight = s.originalWeight + shortfall * (s.originalWeight / validWeightSum);
      s.count = Math.round(targetSize * s.finalWeight);
      // Cap at available if needed? The requirement says just proportional distribution
      // For now, let's assume available >= count. If not, could be an issue, but let's stick to the prompt.
      s.count = Math.min(s.count, s.available); 
      totalCount += s.count;
    } else {
      s.finalWeight = 0;
      s.count = 0;
    }
  }

  // Fix rounding errors to match targetSize exactly
  // If we are short, add to the valid source with highest original weight
  let diff = targetSize - totalCount;
  if (diff > 0) {
      validSources.sort((a,b) => b.originalWeight - a.originalWeight);
      for (const s of validSources) {
          const space = s.available - s.count;
          if (space > 0) {
              const add = Math.min(space, diff);
              s.count += add;
              diff -= add;
              if (diff === 0) break;
          }
      }
  }

  return {
    allocations: sources.filter(s => s.count > 0).map(s => ({
      weekId: s.weekId,
      count: s.count,
      graceDegraded: shortfall > 0
    })),
    error: false
  };
}

// Simulations
console.log("=== CASE A: Only current lacks data (W36 grammar) ===");
// target 8, current (W36) = 0, W35=5, W34=5, W33=5
console.log(computeAllocations(36, 8, (w) => w === 36 ? 0 : 5));

console.log("\n=== CASE B: 2 weeks lack data (W36 + W35 missing) ===");
// target 8, W36=0, W35=0, W34=5, W33=5
console.log(computeAllocations(36, 8, (w) => (w === 36 || w === 35) ? 0 : 5));

console.log("\n=== CASE C: First week of chapter (W33, W32/31/30 missing) ===");
// target 18 (vocab), W33=36, others 0
console.log(computeAllocations(33, 18, (w) => w === 33 ? 36 : 0));

console.log("\n=== CASE D: Error case (All missing) ===");
console.log(computeAllocations(36, 8, (w) => 0));

