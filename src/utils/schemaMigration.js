/**
 * Auto-migration script for Legacy 16-Station format -> Cambridge 4-Hubs schema (Week 33+)
 * Prevents Infinite Loading and state conflicts when user has stale LocalStorage cache.
 */
export function migrateLegacyStationProgressSchema() {
  try {
    // 1. Migrate Zustand user store ('engquest-user-storage')
    const rawUserStorage = localStorage.getItem('engquest-user-storage');
    if (rawUserStorage) {
      const parsed = JSON.parse(rawUserStorage);
      let modified = false;

      if (parsed?.state?.currentUser) {
        const user = parsed.state.currentUser;
        const lastWeek = parseInt(user.lastWeek || 1);
        const lastStation = user.lastStation;

        if (lastWeek >= 33 && lastStation && !['hub1', 'hub2', 'hub3', 'hub4'].includes(lastStation)) {
          let targetHub = 'hub1';
          if (['grammar', 'logic_lab', 'word_match', 'game_hub'].includes(lastStation)) targetHub = 'hub2';
          else if (['writing', 'dictation'].includes(lastStation)) targetHub = 'hub3';
          else if (['shadowing', 'ask_ai', 'mindmap_speaking'].includes(lastStation)) targetHub = 'hub4';

          user.lastStation = targetHub;
          modified = true;
        }
      }

      // Auto-migrate legacy station keys in progressCache for Week 33+
      if (parsed?.state?.progressCache) {
        const cache = parsed.state.progressCache;
        Object.keys(cache).forEach((wKey) => {
          const wId = parseInt(wKey);
          if (wId >= 33) {
            const weekStations = cache[wKey];
            if (weekStations) {
              const hasLegacy = Object.keys(weekStations).some(k => !k.startsWith('hub'));
              if (hasLegacy) {
                const h1Keys = ['skill_reading', 'explore', 'vocab_mastery', 'read_explore', 'new_words'];
                const h2Keys = ['grammar_lab', 'game_logic', 'game_word_match', 'game_hub', 'grammar', 'logic_lab', 'word_match'];
                const h3Keys = ['video_challenge', 'skill_dictation', 'writing', 'dictation', 'story_writing'];
                const h4Keys = ['skill_shadowing', 'ask_ai', 'production_mindmap', 'shadowing', 'mindmap_speaking'];

                const calcPercent = (keys) => {
                  const items = keys.map(k => weekStations[k]).filter(Boolean);
                  if (!items.length) return 0;
                  const total = items.reduce((sum, item) => sum + (typeof item === 'number' ? item : (item.score || (item.isCompleted ? 100 : 0))), 0);
                  return Math.round(total / items.length);
                };

                if (!weekStations.hub1) weekStations.hub1 = { score: calcPercent(h1Keys), isCompleted: calcPercent(h1Keys) >= 80 };
                if (!weekStations.hub2) weekStations.hub2 = { score: calcPercent(h2Keys), isCompleted: calcPercent(h2Keys) >= 80 };
                if (!weekStations.hub3) weekStations.hub3 = { score: calcPercent(h3Keys), isCompleted: calcPercent(h3Keys) >= 80 };
                if (!weekStations.hub4) weekStations.hub4 = { score: calcPercent(h4Keys), isCompleted: calcPercent(h4Keys) >= 80 };
                modified = true;
              }
            }
          }
        });
      }

      if (modified) {
        localStorage.setItem('engquest-user-storage', JSON.stringify(parsed));
        console.log('[AutoMigration] Successfully migrated legacy station LocalStorage schema to 4-Hubs format!');
      }
    }
  } catch (err) {
    console.warn('[AutoMigration] Schema migration failed, resetting stale legacy cache safely:', err);
  }
}

// Immediately execute schema migration on module load
migrateLegacyStationProgressSchema();
