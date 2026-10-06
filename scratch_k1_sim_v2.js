function computeAllocations(currentWeekId, targetSize, getAvailableCount) {
  const sources = [
    { weekId: currentWeekId, weight: 0.60 },
    { weekId: currentWeekId - 1, weight: 0.20 },
    { weekId: currentWeekId - 2, weight: 0.12 },
    { weekId: currentWeekId - 3, weight: 0.08 }
  ];

  // 1. Check availability
  sources.forEach(s => {
    // Treat invalid week IDs (<= 0) as unavailable
    if (s.weekId <= 0) {
      s.available = 0;
    } else {
      s.available = getAvailableCount(s.weekId);
    }
    s.hasData = s.available > 0;
  });

  const validSources = sources.filter(s => s.hasData);
  if (validSources.length === 0) {
    return { allocations: [], error: true, message: "No data available at all" };
  }

  // 2. Calculate shortfall
  let shortfall = 0;
  let validWeightSum = 0;
  sources.forEach(s => {
    if (!s.hasData) shortfall += s.weight;
    else validWeightSum += s.weight;
  });

  // 3. Distribute shortfall proportionally
  let totalCount = 0;
  sources.forEach(s => {
    if (s.hasData) {
      s.finalWeight = s.weight + shortfall * (s.weight / validWeightSum);
      s.count = Math.min(Math.round(targetSize * s.finalWeight), s.available);
      totalCount += s.count;
    } else {
      s.count = 0;
    }
  });

  // 4. Adjust rounding differences
  let diff = targetSize - totalCount;
  if (diff > 0) {
    validSources.sort((a, b) => b.weight - a.weight);
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

console.log("=== CASE E: W1 vocab (current = W1, no valid n-1/n-2/n-3) ===");
// target 18 (vocab), W1=36, others will be short-circuited by weekId <= 0 check
console.log(computeAllocations(1, 18, (w) => {
    if (w <= 0) throw new Error("CRASH! Should not fetch w <= 0");
    return w === 1 ? 36 : 0;
}));

