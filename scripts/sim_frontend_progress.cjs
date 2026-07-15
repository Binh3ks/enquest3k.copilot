/**
 * Simulate EXACTLY what the frontend computes for each (user, week) pair.
 * 
 * This is the canonical test of "would Kim/Kay/etc see their progress?"
 * 
 * Simulates:
 *   1. App.jsx normalize (with strip _easy fix) → weekProgress state
 *   2. useUserStore.recalculateWeekCompletion → weekCompletion[weekId]
 *   3. STATIONS.filter(s => weekProgress[s.key] >= 50) → station grid
 */
const { Pool } = require('pg');
const pool = new Pool({
  host: 'aws-1-ap-northeast-1.pooler.supabase.com',
  user: 'postgres.dlvjqdyvatceidzeyfnq',
  password: '!4hqV$bpceK!?KR',
  port: 5432,
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
});

const STATION_ID_TO_TAB = {
  'daily_watch': 'daily_watch', 'video_challenge': 'writing',
  'ask_ai': 'ask_ai', 'explore': 'explore',
  'game_word_match': 'word_match', 'game_word_power': 'word_power',
  'game_logic': 'logic_lab', 'game_hub': 'game_hub',
  'vocab_mastery': 'new_words', 'grammar_lab': 'grammar',
  'skill_dictation': 'dictation', 'skill_reading': 'read_explore',
  'production_mindmap': 'mindmap_speaking',
  'skill_shadowing': 'shadowing', 'review_session': 'review',
  'self_regulation': 'self_regulation'
};

const STATIONS = [
  {key:'read_explore'}, {key:'new_words'}, {key:'word_match'}, {key:'daily_watch'},
  {key:'word_power'}, {key:'grammar'}, {key:'logic_lab'}, {key:'mindmap_speaking'},
  {key:'ask_ai'}, {key:'dictation'}, {key:'shadowing'}, {key:'writing'},
  {key:'explore'}, {key:'game_hub'}, {key:'self_regulation'}, {key:'review'}
];

function simulate(weekData, mode) {
  // 1. App.jsx normalize (with strip _easy fix)
  const weekProgress = Object.entries(weekData).reduce((acc, [stationKey, value]) => {
    const baseKey = stationKey.endsWith('_easy') ? stationKey.slice(0, -5) : stationKey;
    const tabKey = STATION_ID_TO_TAB[baseKey] || baseKey;
    const percent = value.progressPercent ?? value.score ?? (value.isCompleted ? 100 : 0) ?? 0;
    acc[tabKey] = percent;
    return acc;
  }, {});

  // 2. recalculateWeekCompletion(mode-aware filter on cache)
  const modeProgress = Object.fromEntries(
    Object.entries(weekData).filter(([key]) =>
      mode === 'easy' ? key.endsWith('_easy') : !key.endsWith('_easy')
    )
  );
  const stations = Object.values(modeProgress);
  const totalScore = stations.reduce((acc, s) => acc + (s.score || 0), 0);
  const weekCompletion = stations.length > 0 ? Math.round(totalScore / stations.length) : 0;

  // 3. station grid (>= 50%)
  const completedStations = STATIONS.filter(s => (weekProgress[s.key] || 0) >= 50);

  return {
    weekCompletion,
    completedStations: completedStations.length,
    totalStations: STATIONS.length,
    stationList: completedStations.map(s => `${s.key}(${weekProgress[s.key]})`).join(',')
  };
}

(async () => {
  try {
    // For each student with progress, simulate all weeks in their mode
    const r = await pool.query(`
      SELECT u.id, u.username,
             sp.week_id, sp.station_key, sp.is_completed, sp.score, sp.progress_percent
      FROM users u
      JOIN station_progress sp ON sp.user_id = u.id
      WHERE u.role = 'student'
      ORDER BY u.id, sp.week_id, sp.station_key
    `);
    
    // Group by user+week
    const grouped = {};
    for (const row of r.rows) {
      const k = `${row.id}|${row.week_id}`;
      if (!grouped[k]) grouped[k] = { user: row.username, week: row.week_id, data: {} };
      grouped[k].data[row.station_key] = {
        isCompleted: row.is_completed,
        score: row.score,
        progressPercent: row.progress_percent
      };
    }

    console.log('=== Per-student-per-week progress as frontend would display ===\n');
    let totalProblems = 0;
    const summary = [];
    for (const k of Object.keys(grouped).sort()) {
      const { user, week, data } = grouped[k];
      // For each user, derive mode from the keys present:
      // - if data has _easy keys → assume easy mode
      // - if data has ADV keys only → ADV mode
      const hasEasy = Object.keys(data).some(k => k.endsWith('_easy'));
      const hasAdv = Object.keys(data).some(k => !k.endsWith('_easy'));
      const mode = hasEasy ? 'easy' : 'advanced';
      
      const sim = simulate(data, mode);
      console.log(`${user} W${week} [${mode}]: weekCompletion=${sim.weekCompletion}%, stations=${sim.completedStations}/${sim.totalStations} ${sim.stationList ? '['+sim.stationList+']' : ''}`);
      summary.push({ user, week, mode, ...sim });
    }
    
    // Summary: count how many (user, week) pairs would show 0% despite having data
    const zeroShown = summary.filter(s => s.weekCompletion === 0 && Object.keys(grouped[`${s.user}|${s.week}`].data).length > 0);
    console.log(`\n=== ${zeroShown.length} (user, week) pairs show 0% despite having data ===`);
    if (zeroShown.length) {
      console.log('This indicates a frontend mapping bug. Details:');
      for (const z of zeroShown) {
        const data = grouped[`${z.user}|${z.week}`].data;
        console.log(`  ${z.user} W${z.week} (${z.mode}): ${Object.keys(data).length} saves, weekCompletion=0`);
      }
    } else {
      console.log('✓ All (user, week) pairs correctly compute non-zero completion.');
    }
    
    await pool.end();
  } catch (e) { console.error('ERROR:', e.message); process.exit(1); }
})();
