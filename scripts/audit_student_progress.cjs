const { Pool } = require('pg');
const pool = new Pool({
  host: 'aws-1-ap-northeast-1.pooler.supabase.com',
  user: 'postgres.dlvjqdyvatceidzeyfnq',
  password: '!4hqV$bpceK!?KR',
  port: 5432,
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
});

(async () => {
  try {
    // Inspect users table columns first
    const cols = await pool.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'users' ORDER BY ordinal_position
    `);
    console.log('=== users table columns ===');
    console.log(cols.rows.map(r => r.column_name).join(', '));

    const r = await pool.query(`
      SELECT u.id, u.username, u.email, u.role, u.plan,
             COUNT(DISTINCT sp.week_id) AS weeks_with_progress,
             COUNT(*) AS total_saves,
             SUM(CASE WHEN sp.is_completed THEN 1 ELSE 0 END) AS completed_saves,
             COUNT(DISTINCT sp.station_key) AS unique_stations,
             MAX(sp.updated_at) AS last_save
      FROM users u
      LEFT JOIN station_progress sp ON sp.user_id = u.id
      WHERE u.role = 'student'
      GROUP BY u.id, u.username, u.email, u.role, u.plan
      HAVING COUNT(sp.id) > 0
      ORDER BY total_saves DESC
    `);
    console.log(`\n=== ${r.rows.length} students with progress data ===`);
    console.table(r.rows.map(s => ({
      id: s.id,
      username: s.username,
      role: s.role,
      plan: s.plan,
      weeks: s.weeks_with_progress,
      saves: s.total_saves,
      completed: s.completed_saves,
      unique_stations: s.unique_stations,
      last_save: s.last_save ? new Date(s.last_save).toISOString().slice(0, 10) : '-'
    })));

    const dist = await pool.query(`
      WITH per_week AS (
        SELECT user_id, week_id,
               COUNT(*) AS saves,
               SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) AS completed
        FROM station_progress
        GROUP BY user_id, week_id
      )
      SELECT week_id, COUNT(DISTINCT user_id) AS students, SUM(saves) AS total_saves, SUM(completed) AS completed
      FROM per_week
      GROUP BY week_id
      ORDER BY week_id
    `);
    console.log('\n=== Per-week progress distribution (W1-W35) ===');
    console.table(dist.rows);

    const keys = await pool.query(`
      SELECT station_key, COUNT(*) AS n
      FROM station_progress
      GROUP BY station_key
      ORDER BY n DESC
      LIMIT 60
    `);
    console.log('\n=== Top 60 station_keys in DB ===');
    console.table(keys.rows);

    // Look for keys that look orphan (don't end in _easy and aren't in our known set)
    const known = new Set([
      'daily_watch', 'video_challenge', 'writing',
      'ask_ai', 'explore',
      'game_word_match', 'game_word_power', 'game_logic', 'game_hub',
      'vocab_mastery', 'grammar_lab',
      'skill_dictation', 'skill_reading', 'production_mindmap',
      'skill_shadowing', 'review_session', 'self_regulation',
      'word_match', 'read_explore', 'word_power', 'logic_lab',
      'ai_story', 'ai_freetalk', 'ai_pronunciation',
    ]);
    const allKeys = await pool.query(`SELECT DISTINCT station_key FROM station_progress`);
    const orphan = allKeys.rows.map(r => r.station_key).filter(k =>
      !known.has(k) && !k.endsWith('_easy')
    );
    console.log('\n=== Orphan keys (no _easy suffix, not in known set) ===');
    console.log(orphan);
    console.log('Count:', orphan.length);

    await pool.end();
  } catch (e) { console.error('ERROR:', e.message); process.exit(1); }
})();
