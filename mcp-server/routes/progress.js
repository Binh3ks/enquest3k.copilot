/* eslint-env node */
/**
 * PROGRESS ROUTES — V3 Complete Rewrite
 * 
 * Uses station_key (VARCHAR) as the ONLY station identifier.
 * station_id (integer) is completely ignored.
 *
 * Endpoints:
 *   GET  /api/progress/:weekId  — all progress for a week
 *   POST /api/progress/save     — save / upsert progress (primary)
 *   POST /api/progress          — legacy endpoint
 */
const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

console.log('✅ [Progress V3] Route loaded — station_key only, no station_id');

// ------- auth -------
router.use(authMiddleware);

// ────────────────────────────────────────────────
// GET /api/progress/:weekId
// ────────────────────────────────────────────────
router.get('/:weekId', async (req, res) => {
  try {
    const userId = req.user.id;
    const weekId = parseInt(req.params.weekId, 10);

    const { rows } = await db.query(
      `SELECT station_key, data, is_completed, score, progress_percent, updated_at
       FROM station_progress
       WHERE user_id = $1 AND week_id = $2`,
      [userId, weekId]
    );

    const progressMap = {};
    for (const r of rows) {
      progressMap[r.station_key] = {
        data: r.data || {},
        isCompleted: r.is_completed || false,
        score: r.score || 0,
        progressPercent: r.progress_percent || 0,
        updatedAt: r.updated_at,
      };
    }

    res.json(progressMap);
  } catch (err) {
    console.error('[Progress V3 GET] Error:', err.message);
    res.status(500).json({ message: 'Server error fetching progress.' });
  }
});

// ────────────────────────────────────────────────
// POST /api/progress/save  (primary endpoint)
// Body: { weekId, stationId, data, isCompleted, score }
//   stationId is a STRING like "ask_ai", "grammar_lab" etc.
// ────────────────────────────────────────────────
router.post('/save', async (req, res) => {
  try {
    const userId = req.user.id;
    const { weekId, stationId, data, isCompleted, score } = req.body;

    if (!weekId || !stationId) {
      return res.status(400).json({ message: 'Missing weekId or stationId' });
    }

    const stationKey = String(stationId).toLowerCase().trim();
    const safeData = data && typeof data === 'object' ? data : {};
    const safeScore = typeof score === 'number' ? score : 0;
    const safeCompleted = !!isCompleted;
    const pct = safeCompleted ? 100 : (typeof safeData.progressPercent === 'number' ? safeData.progressPercent : 0);

    console.log('[Progress V3 SAVE] user=%d week=%d key=%s score=%d', userId, weekId, stationKey, safeScore);

    const { rows } = await db.query(
      `INSERT INTO station_progress
         (user_id, week_id, station_key, data, is_completed, score, progress_percent, updated_at)
       VALUES ($1, $2, $3, $4::jsonb, $5, $6, $7, NOW())
       ON CONFLICT (user_id, week_id, station_key)
       DO UPDATE SET
         -- BUG FIX (Jun 9, 2026): merge data instead of overwriting. Clients
         -- occasionally save with data: {} for score-only updates; previously
         -- this wiped the rich JSONB (cards, completedWords, frameInputs, etc).
         -- We now shallow-merge: existing keys are preserved unless the new
         -- payload explicitly provides them. _savedAt is always refreshed.
         data             = (station_progress.data::jsonb || $4::jsonb)
                              || jsonb_build_object('_savedAt', to_jsonb(NOW()::text)),
         is_completed     = $5 OR station_progress.is_completed,
         score            = GREATEST(station_progress.score, $6),
         progress_percent = GREATEST(station_progress.progress_percent, $7),
         updated_at       = NOW()
       RETURNING id, station_key, is_completed, score, progress_percent`,
      [userId, weekId, stationKey, JSON.stringify(safeData), safeCompleted, safeScore, pct]
    );

    // 🔥 Auto-log activity so teacher dashboard last_active + Last 7 Days stays current
    // Fire-and-forget: don't block the response if this fails
    db.query(
      `INSERT INTO student_activity_log (user_id, activity_type, week_id, station_type, metadata)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        userId,
        safeCompleted ? 'station_complete' : 'station_progress',
        weekId,
        stationKey,
        JSON.stringify({ score: safeScore, pct })
      ]
    ).catch(e => console.warn('[Progress] activity_log insert failed (non-fatal):', e.message));

    res.status(201).json({ message: 'Saved', progress: rows[0] });
  } catch (err) {
    console.error('[Progress V3 SAVE] Error:', err.message);
    res.status(500).json({ message: 'Server error saving progress.' });
  }
});

// ────────────────────────────────────────────────
// POST /api/progress  (legacy endpoint)
// Body: { weekId, stationKey, progressPercent }
// ────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const { weekId, stationKey, progressPercent } = req.body;

    if (!weekId || !stationKey || progressPercent === undefined) {
      return res.status(400).json({ message: 'Missing weekId, stationKey, or progressPercent' });
    }

    const completed = progressPercent >= 100;

    const { rows } = await db.query(
      `INSERT INTO station_progress
         (user_id, week_id, station_key, progress_percent, is_completed, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (user_id, week_id, station_key)
       DO UPDATE SET
         progress_percent = GREATEST(station_progress.progress_percent, $4),
         is_completed     = $5 OR station_progress.is_completed,
         updated_at       = NOW()
       RETURNING *`,
      [userId, weekId, stationKey, progressPercent, completed]
    );

    res.status(201).json({ message: 'Updated', progress: rows[0] });
  } catch (err) {
    console.error('[Progress V3 POST] Error:', err.message);
    res.status(500).json({ message: 'Server error updating progress.' });
  }
});

module.exports = router;
