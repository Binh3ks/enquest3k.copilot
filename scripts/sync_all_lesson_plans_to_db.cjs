const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.SUPABASE_DB_HOST || 'aws-1-ap-northeast-1.pooler.supabase.com',
  port: parseInt(process.env.SUPABASE_DB_PORT || '5432'),
  user: process.env.SUPABASE_DB_USER || 'postgres.dlvjqdyvatceidzeyfnq',
  password: process.env.SUPABASE_DB_PASS || '!4hqV$bpceK!?KR',
  database: process.env.SUPABASE_DB_NAME || 'postgres',
  ssl: { rejectUnauthorized: false },
  max: 3,
});

async function syncAllLessonPlansToDB() {
  console.log('⚡ SYNCING ALL UPDATED LESSON PLAN FILES TO SUPABASE POSTGRESQL DB...\n');

  const root = process.cwd();
  const lessonsDir = path.join(root, 'public/data/lessons');
  const files = fs.readdirSync(lessonsDir).filter(f => f.match(/^W\d+\.json$/));

  let synced = 0;

  for (const file of files) {
    const weekNum = parseInt(file.replace(/\D/g, ''), 10);
    const content = JSON.parse(fs.readFileSync(path.join(lessonsDir, file), 'utf8'));

    try {
      await pool.query(
        `INSERT INTO public.lesson_plans (week_num, content)
         VALUES ($1, $2)
         ON CONFLICT (week_num) DO UPDATE SET content = EXCLUDED.content`,
        [weekNum, JSON.stringify(content)]
      );
      synced++;
    } catch (err) {
      console.error(`Error syncing Week ${weekNum}:`, err.message);
    }
  }

  console.log(`\n🎉 DB SYNC COMPLETE: Successfully synced ${synced} lesson plan weeks to production PostgreSQL database!`);
  await pool.end();
}

syncAllLessonPlansToDB();
