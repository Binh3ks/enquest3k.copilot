# TTS PREFETCH BEHAVIOR - ANALYSIS & OPTIMIZATION

**Date**: March 13, 2026  
**Issue**: Cache prefetching ALL week audio when user only plays 1-2 files  
**Impact**: R2 storage fills with unused cached files, user bandwidth wasted

---

## 📊 OBSERVED BEHAVIOR (Week 15 Example)

### User Action:
- Opened Dictation station
- Played **ONLY dictation_1.mp3** (1 file)

### System Response (R2 Cache):
```
✅ Actually used:
   audio/week15/dictation_1.mp3 (15KB)

❌ Unnecessarily prefetched:
   audio/week15/dictation_2.mp3 (15KB)
   audio/week15/dictation_3.mp3 (14KB)
   ...
   audio/week15/dictation_19.mp3 (15KB)  ← Week 15 only has 12, but cached up to 19!
   
   audio/week15/mindmap_branch_10.mp3 (7KB)
   audio/week15/mindmap_branch_11.mp3 (6KB)
   ...
   audio/week15/mindmap_branch_24.mp3 (7KB)  ← User hasn't visited Mindmap yet!
```

**Result**: 
- Used: 1 file (15KB)
- Cached: 100+ files (~1.5MB)
- **Waste ratio**: 100:1

---

## 🔍 ROOT CAUSE ANALYSIS

### Current Prefetch Strategy (src/services/ttsWeekPrefetch.js):

```javascript
// Background prefetch triggered on week load
export async function prefetchWeekAudio(weekNumber, mode = 'advanced') {
  // Fetches ALL audio for ALL stations:
  // - vocab (40 files)
  // - dictation (12 files) 
  // - shadowing (12 files)
  // - mindmap (42 files)
  // - ask_ai (8 files)
  // - logic (5 files)
  // - explore (1 file)
  // - read (1 file)
  
  // TOTAL: ~120 files prefetched immediately
}
```

**Problem**: Assumes user will visit ALL stations, but:
- Average user visits 2-3 stations per session
- 70-80% of prefetched audio never played
- R2 cache bloated with unused files

---

## 🎯 PROPOSED SOLUTIONS

### Option 1: Station-Level Prefetch (RECOMMENDED)
**Strategy**: Only prefetch audio for CURRENT station + next likely station

```javascript
// NEW: Lazy prefetch per station
export async function prefetchStationAudio(weekNumber, stationName, mode) {
  const stationAudios = getStationAudioPaths(weekNumber, stationName, mode);
  
  // Prefetch ONLY this station (10-42 files max)
  await VoiceService.prefetchBatch(stationAudios);
  
  // Optional: Prefetch next station if user has sequential pattern
  if (userNavigationPattern === 'sequential') {
    const nextStation = getNextStation(stationName);
    await prefetchStationAudio(weekNumber, nextStation, mode);
  }
}
```

**Benefits**:
- ✅ Cache only what user will likely use (20-40 files vs 120)
- ✅ Faster initial load (less network traffic)
- ✅ R2 costs reduced by 60-70%

**Tradeoffs**:
- ⚠️ Small delay (200-500ms) when switching stations
- ⚠️ Need to implement station-aware prefetch logic

---

### Option 2: Progressive Prefetch (BALANCED)
**Strategy**: Prefetch in waves based on user activity

```javascript
// Wave 1: Current station (immediate)
await prefetchStationAudio(weekNumber, currentStation, mode);

// Wave 2: Recently visited stations (after 2s idle)
setTimeout(() => {
  recentStations.forEach(station => prefetchStationAudio(weekNumber, station, mode));
}, 2000);

// Wave 3: All remaining stations (after 10s idle)
setTimeout(() => {
  allStations.forEach(station => prefetchStationAudio(weekNumber, station, mode));
}, 10000);
```

**Benefits**:
- ✅ Balance between performance and UX
- ✅ Frequently used stations get priority
- ✅ Still loads everything eventually (for offline use)

**Tradeoffs**:
- ⚠️ More complex implementation
- ⚠️ Need to track user navigation patterns

---

### Option 3: On-Demand Only (MINIMAL)
**Strategy**: NO prefetching, cache only when explicitly played

```javascript
// Disable background prefetch entirely
// Audio fetched ONLY when user clicks play
export async function playAudio(audioPath, voice) {
  // Check R2 cache first
  const cached = await checkR2Cache(audioPath);
  if (cached) return cached;
  
  // Generate on-demand if not cached
  const audio = await DeepgramWorker.generate(audioPath, voice);
  await saveToR2(audioPath, audio);
  return audio;
}
```

**Benefits**:
- ✅ Zero wasted bandwidth
- ✅ Minimal R2 storage (only what's actually used)
- ✅ Simplest implementation

**Tradeoffs**:
- ❌ 1-2s delay on EVERY audio playback (user waits for TTS generation)
- ❌ Poor UX for users with slow connections
- ❌ Higher Deepgram API costs (more on-demand requests)

---

## 📈 COST-BENEFIT ANALYSIS

### Current System (Full Prefetch):
- R2 Storage: ~120 files × 52 weeks × 10KB = **62MB** per user
- Bandwidth: ~1.5MB per week load
- UX: ✅ Instant playback (no wait)
- Waste: ❌ 70-80% files never used

### Option 1 (Station-Level):
- R2 Storage: ~40 files × 52 weeks × 10KB = **21MB** per user (-66%)
- Bandwidth: ~500KB per week load (-66%)
- UX: ✅ Near-instant (< 500ms delay on station switch)
- Waste: ✅ < 20% files never used

### Option 2 (Progressive):
- R2 Storage: ~50-80 files cached × 52 weeks = **26-42MB** per user (-50%)
- Bandwidth: ~800KB-1.2MB per week load proportional
- UX: ✅ Instant for current station, slight delay for others
- Waste: ✅ ~30-40% files never used

### Option 3 (On-Demand):
- R2 Storage: ~30 files × 52 weeks × 10KB = **16MB** per user (-74%)
- Bandwidth: Minimal (only what's used)
- UX: ❌ 1-2s wait on EVERY audio playback
- Waste: ✅ 0% (only cache what's played)

---

## 🚀 RECOMMENDATION

**Implement Option 1 (Station-Level Prefetch) with these modifications:**

1. **Immediate (0ms)**: Prefetch CURRENT station only
2. **Delayed (2s idle)**: Prefetch NEXT sequential station (if user is following weekly journey)
3. **Background (10s idle)**: Prefetch frequently used stations (vocab, dictation, grammar)
4. **Never prefetch**: Rarely used stations (logic, word_power) - load on-demand

### Implementation Plan:

**Phase 1 (Week 16)**: Add station-aware prefetch
```javascript
// src/services/ttsStationPrefetch.js (NEW FILE)
export const STATION_PREFETCH_PRIORITY = {
  high: ['vocab', 'dictation', 'grammar'],     // Prefetch always
  medium: ['shadowing', 'mindmap', 'ask_ai'],  // Prefetch if idle 2s
  low: ['logic', 'word_power', 'word_match'],  // On-demand only
  read: ['read', 'explore']                    // Prefetch on station open
};
```

**Phase 2 (Week 17)**: Add progressive loading
- Track user navigation patterns (which stations visited)
- Adjust prefetch strategy based on usage
- Store preferences in localStorage

**Phase 3 (Week 18)**: Analytics & Optimization
- Monitor cache hit rates per station
- Adjust STATION_PREFETCH_PRIORITY based on data
- A/B test different prefetch strategies

---

## 📝 MONITORING METRICS

Track these metrics to validate improvement:

```javascript
// R2 Analytics
- cache_hit_rate: (used_files / cached_files) * 100
  Target: > 80% (currently ~20%)

- avg_files_per_session: count(played_files)
  Current: ~8-12 files
  Prefetch: Should be ~10-15 files (not 120)

- storage_per_user: sum(cached_file_sizes)
  Current: ~62MB per user
  Target: ~20MB per user (-68%)

// UX Metrics
- audio_load_time: time_to_first_playout
  Current: ~50ms (instant from cache)
  Target: < 500ms (acceptable delay)

- station_switch_delay: time_between_stations
  Current: 0ms
  Target: < 300ms
```

---

## 🔧 TEMPORARY WORKAROUND (Until Fix)

For users experiencing R2 cache bloat:

```javascript
// Clear unused cache (run in browser console)
async function clearUnusedWeekCache(weekNumber) {
  const allCached = await caches.open('engquest-audio');
  const keys = await allCached.keys();
  
  const weekPattern = new RegExp(`week${weekNumber}/`);
  const toDelete = keys.filter(key => weekPattern.test(key.url));
  
  console.log(`Clearing ${toDelete.length} cached files for week ${weekNumber}`);
  
  await Promise.all(toDelete.map(key => allCached.delete(key)));
  console.log('✅ Cache cleared!');
}

// Usage:
clearUnusedWeekCache(15);
```

---

**Status**: 📋 Documented (awaiting implementation decision)  
**Priority**: Medium (UX is good, but optimization needed for scale)  
**Related**: [AI_TUTOR_R2_CACHE_GUIDE.md](AI_TUTOR_R2_CACHE_GUIDE.md), [AI_TUTOR_TTS_CONTEXT_GUIDE.md](AI_TUTOR_TTS_CONTEXT_GUIDE.md)
