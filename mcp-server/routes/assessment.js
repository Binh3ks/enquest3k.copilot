/* eslint-env node */
const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * GET /api/assessment/pending
 * Check if a periodic assessment is due for the current student.
 * Due when: current_week is a multiple of 4 AND no assessment taken for that block yet.
 * Returns: { due: bool, block: int, weeks: int[], already_taken: bool }
 */
router.get('/pending', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get student's current max week from station_progress
    const wpResult = await db.query(
      `SELECT COALESCE(MAX(week_id), 0) AS current_week FROM station_progress WHERE user_id = $1`,
      [userId]
    );
    const currentWeek = parseInt(wpResult.rows[0]?.current_week) || 0;

    if (currentWeek < 4) {
      return res.json({ due: false, block: 0, weeks: [], already_taken: false });
    }

    // Block = Math.floor(currentWeek / 4)  e.g. week 4-7 → block 1, week 8-11 → block 2
    const block = Math.floor(currentWeek / 4);
    const blockEnd = block * 4;
    const blockStart = blockEnd - 3;
    const weeks = [blockStart, blockStart + 1, blockStart + 2, blockEnd];

    // Check if already taken
    const existingResult = await db.query(
      `SELECT id FROM periodic_assessments WHERE user_id = $1 AND block = $2`,
      [userId, block]
    );
    const alreadyTaken = existingResult.rows.length > 0;

    res.json({ due: !alreadyTaken, block, weeks, already_taken: alreadyTaken, trigger_week: blockEnd });
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
  } catch (err) {
    console.error('Assessment submit error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/assessment/history
 * Get all past assessments for the current student.
 */
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      `SELECT block, trigger_week, correct, total, total_pct, taken_at
       FROM periodic_assessments WHERE user_id = $1 ORDER BY block`,
      [userId]
    );
    res.json(result.rows);
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

module.exports = router;
