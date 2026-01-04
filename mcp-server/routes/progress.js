/* eslint-env node */
const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes in this file are protected by the authMiddleware
router.use(authMiddleware);

// GET /api/progress/:weekId
// Fetches all progress for the logged-in user for a specific week.
router.get('/:weekId', async (req, res) => {
  const { weekId } = req.params;
  const userId = req.user.id; // User ID from the authenticated token

  try {
    const progressResult = await db.query(
      'SELECT station_key, progress_percent FROM station_progress WHERE user_id = $1 AND week_id = $2',
      [userId, weekId]
    );

    // Transform the array of rows into a more useful object format (e.g., { read_explore: 80, word_power: 50 })
    const progressMap = progressResult.rows.reduce((acc, row) => {
      acc[row.station_key] = row.progress_percent;
      return acc;
    }, {});

    res.json(progressMap);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Server error while fetching progress.' });
  }
});

// POST /api/progress
// Creates or updates a progress entry for a station.
router.post('/', async (req, res) => {
  const { weekId, stationKey, progressPercent } = req.body;
  const userId = req.user.id;

  if (!weekId || !stationKey || progressPercent === undefined) {
    return res.status(400).json({ message: 'Missing required fields: weekId, stationKey, progressPercent.' });
  }

  try {
    // This is an "upsert" operation. It tries to INSERT a new row.
    // If the (user_id, week_id, station_key) combination already exists (violating the UNIQUE constraint),
    // it will UPDATE the existing row instead.
    const result = await db.query(
      `
      INSERT INTO station_progress (user_id, week_id, station_key, progress_percent)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, week_id, station_key)
      DO UPDATE SET progress_percent = EXCLUDED.progress_percent, last_updated = CURRENT_TIMESTAMP
      RETURNING *;
      `,
      [userId, weekId, stationKey, progressPercent]
    );

    res.status(201).json({
      message: 'Progress updated successfully!',
      progress: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Server error while updating progress.' });
  }
});

module.exports = router;
