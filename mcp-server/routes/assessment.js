/* eslint-env node */
const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const { sendPushToParent } = require('../utils/pushNotify');

const router = express.Router();

/**
 * GET /api/assessment/pending
 * Check if a periodic assessment is due for the current student.
 * Due when: distinct weeks completed is a multiple of 4 AND no assessment taken for that block yet.
 * Uses weeks_completed (COUNT DISTINCT) — not MAX week_id — so placement-test students are handled correctly.
 * Returns: { due: bool, block: int, weeks: int[], already_taken: bool }
 */
router.get('/pending', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Count distinct weeks with REAL progress (score > 0 OR is_completed).
    // A week is "completed" only when the student actually answered/submitted something.
    // This prevents counting weeks where the student merely opened a station (score=0 row).
    // Require at least 2 such stations per week so opening 1 page doesn't count.
    const wpResult = await db.query(
      `SELECT
         COUNT(DISTINCT week_id)::int AS weeks_completed,
         ARRAY_AGG(DISTINCT week_id ORDER BY week_id) AS week_ids
       FROM (
         SELECT week_id
         FROM station_progress
         WHERE user_id = $1 AND (score > 0 OR is_completed = true)
         GROUP BY week_id
         HAVING COUNT(*) >= 2
       ) completed_weeks`,
      [userId]
    );
    const weeksCompleted = wpResult.rows[0]?.weeks_completed || 0;
    const weekIds = wpResult.rows[0]?.week_ids || [];

    if (weeksCompleted < 4) {
      return res.json({ due: false, block: 0, weeks: [], already_taken: false });
    }

    // Block = Math.floor(weeksCompleted / 4)
    // e.g. 4 weeks done → block 1, 8 weeks done → block 2
    const block = Math.floor(weeksCompleted / 4);

    // The 4 weeks that make up this block (by position in learning history, not by week number)
    const blockStart = (block - 1) * 4; // 0-indexed start in weekIds array
    const blockWeeks = weekIds.slice(blockStart, blockStart + 4);
    // Fallback to last 4 if slice is empty
    const weeks = blockWeeks.length === 4 ? blockWeeks : weekIds.slice(-4);
    const triggerWeek = weeks[weeks.length - 1] || weeksCompleted;

    // Check if already taken
    const existingResult = await db.query(
      `SELECT id FROM periodic_assessments WHERE user_id = $1 AND block = $2`,
      [userId, block]
    );
    const alreadyTaken = existingResult.rows.length > 0;

    res.json({ due: !alreadyTaken, block, weeks, already_taken: alreadyTaken, trigger_week: triggerWeek });
  } catch (err) {
    console.error('Assessment pending error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/assessment/submit
 * Save a completed assessment.
 * Body: { block, trigger_week, correct, total }
 */
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { block, trigger_week, correct, total } = req.body;

    if (!block || total == null || correct == null) {
      return res.status(400).json({ message: 'block, correct, total required' });
    }

    // Server-side guard: reject if student has zero real activity (prevents fake auto-submits)
    const activityCheck = await db.query(
      `SELECT COUNT(*)::int AS cnt FROM station_progress WHERE user_id = $1 AND score > 0`,
      [userId]
    );
    if ((activityCheck.rows[0]?.cnt || 0) === 0) {
      return res.status(400).json({ message: 'No activity to assess' });
    }

    const total_pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Upsert: if retaken, update
    await db.query(
      `INSERT INTO periodic_assessments (user_id, block, trigger_week, correct, total, total_pct, taken_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (user_id, block) DO UPDATE
         SET correct = $4, total = $5, total_pct = $6, trigger_week = $3, taken_at = NOW()`,
      [userId, block, trigger_week || block * 4, correct, total, total_pct]
    );

    // Return updated history
    const history = await db.query(
      `SELECT block, trigger_week, correct, total, total_pct, taken_at
       FROM periodic_assessments WHERE user_id = $1 ORDER BY block`,
      [userId]
    );

    res.json({ success: true, score_pct: total_pct, history: history.rows });

    // Notify parent (fire-and-forget)
    const grade = total_pct >= 90 ? '🏆 Xuất sắc!' : total_pct >= 70 ? '⭐ Tốt lắm!' : total_pct >= 50 ? '📚 Cần ôn thêm' : '💪 Cố gắng lên!';
    const studentInfo = await db.query('SELECT username FROM users WHERE id = $1', [userId]);
    const studentName = studentInfo.rows[0]?.username || 'Học sinh';
    sendPushToParent(userId, {
      title: '📝 Mini Quiz đã hoàn thành!',
      body: `${studentName} vừa làm xong Mini Quiz #${block} — Điểm: ${total_pct}% ${grade}`,
      url: '/dashboard',
      tag: `quiz-${userId}-${block}`,
    }).catch(() => {});
  } catch (err) {
    console.error('Assessment submit error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/assessment/history
 * Get all past assessments + real-time progress stats for the current student (self-view).
 */
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      `SELECT block, trigger_week, correct, total, total_pct, taken_at
       FROM periodic_assessments WHERE user_id = $1 ORDER BY block`,
      [userId]
    );

    // Rich stats from station_progress (same as getChildDashboard)
    const stats = await db.query(
      `SELECT
         COUNT(DISTINCT week_id) FILTER (WHERE score > 0 OR is_completed = true)::int AS weeks_completed,
         COALESCE(MAX(week_id), 1)::int AS current_week,
         COUNT(*) FILTER (WHERE score >= 80)::int AS mastered_stations,
         COUNT(*) FILTER (WHERE score >= 40 AND score < 80)::int AS learning_stations,
         COUNT(*) FILTER (WHERE score > 0 AND score < 40)::int AS needs_review_stations,
         COUNT(*) FILTER (WHERE station_key ILIKE '%speak%' AND (score > 0 OR is_completed = true))::int AS speaking_sessions,
         COALESCE(AVG(CASE WHEN station_key ILIKE '%writ%' AND score > 0 THEN score END), 0)::int AS avg_writing_score
       FROM station_progress WHERE user_id = $1`,
      [userId]
    );

    const cpResult = await db.query(
      `SELECT week_num, passed, results, taken_at FROM checkpoint_results WHERE user_id = $1 ORDER BY week_num`,
      [userId]
    );

    res.json({ assessments: result.rows, stats: stats.rows[0] || {}, checkpoints: cpResult.rows });
  } catch (err) {
    console.error('Assessment history error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/assessment/student/:studentId
 * Teacher view: get a student's assessment history.
 */
router.get('/student/:studentId', authMiddleware, async (req, res) => {
  try {
    const { studentId } = req.params;
    const result = await db.query(
      `SELECT block, trigger_week, correct, total, total_pct, taken_at
       FROM periodic_assessments WHERE user_id = $1 ORDER BY block`,
      [studentId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Assessment student history error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/assessment/child/:childId
 * Parent view: get a child's assessment history + basic progress summary.
 * Verifies the requesting user is the parent of childId.
 */
router.get('/child/:childId', authMiddleware, async (req, res) => {
  try {
    const parentId = req.user.id;
    const { childId } = req.params;

    // Verify ownership
    const ownerCheck = await db.query(
      `SELECT id, username FROM users WHERE id = $1 AND parent_id = $2`,
      [childId, parentId]
    );
    if (ownerCheck.rows.length === 0) {
      return res.status(403).json({ message: 'Not your child account.' });
    }
    const childUsername = ownerCheck.rows[0].username;

    // Assessment history
    const assessments = await db.query(
      `SELECT block, trigger_week, correct, total, total_pct, taken_at
       FROM periodic_assessments WHERE user_id = $1 ORDER BY block`,
      [childId]
    );

    // Major Checkpoint results (W14/26/36/54)
    const checkpoints = await db.query(
      `SELECT week_num, passed, results, taken_at FROM checkpoint_results WHERE user_id = $1 ORDER BY week_num`,
      [childId]
    );

    // Basic progress summary from station_progress
    const progress = await db.query(
      `SELECT
         COUNT(DISTINCT week_id) FILTER (WHERE score > 0 OR is_completed = true)::int AS weeks_completed,
         COALESCE(MAX(week_id), 1)::int AS current_week,
         COUNT(*)::int AS total_stations,
         COUNT(*) FILTER (WHERE score >= 80)::int AS mastered_stations,
         COUNT(*) FILTER (WHERE score >= 40 AND score < 80)::int AS learning_stations,
         COUNT(*) FILTER (WHERE score > 0 AND score < 40)::int AS needs_review_stations,
         COUNT(*) FILTER (WHERE station_key ILIKE '%speak%' AND (score > 0 OR is_completed = true))::int AS speaking_sessions,
         COUNT(*) FILTER (WHERE station_key ILIKE '%writ%' AND score > 0)::int AS writing_count,
         COALESCE(AVG(CASE WHEN station_key ILIKE '%writ%' AND score > 0 THEN score END), 0)::int AS avg_writing_score,
         COALESCE(MAX(updated_at), NOW()) AS last_active
       FROM station_progress WHERE user_id = $1`,
      [childId]
    );

    // Study streak: count consecutive days with station activity ending today/yesterday
    const streakResult = await db.query(
      `WITH daily AS (
         SELECT DATE(updated_at AT TIME ZONE 'Asia/Ho_Chi_Minh') AS day
         FROM station_progress
         WHERE user_id = $1 AND (score > 0 OR is_completed = true)
         GROUP BY 1
       ),
       numbered AS (
         SELECT day, ROW_NUMBER() OVER (ORDER BY day DESC) AS rn FROM daily
       ),
       streak AS (
         SELECT COUNT(*) AS days FROM numbered
         WHERE day >= CURRENT_DATE - (rn - 1) * INTERVAL '1 day'
       )
       SELECT COALESCE((SELECT days FROM streak), 0)::int AS streak_days`,
      [childId]
    );
    const streakDays = streakResult.rows[0]?.streak_days || 0;
    res.json({
      child_id: parseInt(childId),
      child_name: childUsername,
      assessments: assessments.rows,
      checkpoints: checkpoints.rows,
      progress: progress.rows[0],
      streak_days: streakDays,
      last_active: progress.rows[0]?.last_active || null,
    });
  } catch (err) {
    console.error('Assessment child error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/assessment/checkpoint
 * Save a MAJOR Checkpoint result (W14 / W26 / W36 / W54).
 * Called by the frontend when CheckpointAssessment completes.
 * Body: { week_num, passed, results }
 */
router.post('/checkpoint', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { week_num, passed, results } = req.body;
    const VALID_WEEKS = [14, 26, 36, 54];
    if (!VALID_WEEKS.includes(Number(week_num))) {
      return res.status(400).json({ message: 'week_num must be 14, 26, 36, or 54' });
    }
    await db.query(
      `INSERT INTO checkpoint_results (user_id, week_num, passed, results, taken_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id, week_num) DO UPDATE
         SET passed = $3, results = $4, taken_at = NOW()`,
      [userId, Number(week_num), !!passed, JSON.stringify(results || [])]
    );
    const updated = await db.query(
      `SELECT week_num, passed, results, taken_at FROM checkpoint_results WHERE user_id = $1 ORDER BY week_num`,
      [userId]
    );
    res.json({ success: true, checkpoints: updated.rows });

    // Notify parent (fire-and-forget)
    const studentInfo = await db.query('SELECT username FROM users WHERE id = $1', [userId]);
    const studentName = studentInfo.rows[0]?.username || 'Học sinh';
    sendPushToParent(userId, {
      title: '🏆 Checkpoint đã hoàn thành!',
      body: `${studentName} vừa hoàn thành Checkpoint Tuần ${week_num} — ${passed ? '✅ Đạt' : '⚠️ Chưa đạt'}`,
      url: '/dashboard',
      tag: `checkpoint-${userId}-${week_num}`,
    }).catch(() => {});
  } catch (err) {
    console.error('Checkpoint save error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/assessment/checkpoints
 * Get all major checkpoint results for the current student.
 */
router.get('/checkpoints', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT week_num, passed, results, taken_at FROM checkpoint_results WHERE user_id = $1 ORDER BY week_num`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/assessment/checkpoints/child/:childId
 * Parent view: get checkpoint results for a child.
 */
router.get('/checkpoints/child/:childId', authMiddleware, async (req, res) => {
  try {
    const { childId } = req.params;
    const ownerCheck = await db.query(
      `SELECT id FROM users WHERE id = $1 AND parent_id = $2`,
      [childId, req.user.id]
    );
    if (ownerCheck.rows.length === 0) return res.status(403).json({ message: 'Not your child.' });
    const result = await db.query(
      `SELECT week_num, passed, results, taken_at FROM checkpoint_results WHERE user_id = $1 ORDER BY week_num`,
      [childId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/assessment/checkpoints/student/:studentId
 * Teacher view: get checkpoint results for a student.
 */
router.get('/checkpoints/student/:studentId', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT week_num, passed, results, taken_at FROM checkpoint_results WHERE user_id = $1 ORDER BY week_num`,
      [req.params.studentId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
