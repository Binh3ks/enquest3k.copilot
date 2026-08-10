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

async function updateDBLessonPlans() {
  console.log('⚡ CONNECTING TO SUPABASE POSTGRESQL DB & UPDATING LESSON PLANS TABLE...\n');

  const root = process.cwd();
  const w37Path = path.join(root, 'public/data/lessons/W37.json');

  if (!fs.existsSync(w37Path)) {
    console.error('❌ public/data/lessons/W37.json not found!');
    process.exit(1);
  }

  const w37Content = JSON.parse(fs.readFileSync(w37Path, 'utf8'));

  try {
    const res = await pool.query(
      'UPDATE public.lesson_plans SET content = $1 WHERE week_num = $2',
      [JSON.stringify(w37Content), 37]
    );

    console.log(`✅ DATABASE UPDATE SUCCESS: Updated ${res.rowCount} row(s) in public.lesson_plans table for Week 37!`);
  } catch (err) {
    console.error('❌ Database update error:', err);
  } finally {
    await pool.end();
  }
}

updateDBLessonPlans();
