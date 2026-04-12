#!/usr/bin/env node
/**
 * Clear all progress data for a specific user
 * Usage: node clear_progress.js [username]
 */

const db = require('./config/db');

async function clearProgress(username = 'owner') {
  try {
    console.log(`🔄 Clearing all progress for user: ${username}`);
    
    // Get user ID
    const userResult = await db.query(
      'SELECT id, username FROM users WHERE username = $1',
      [username]
    );
    
    if (userResult.rows.length === 0) {
      console.error(`❌ User "${username}" not found`);
      process.exit(1);
    }
    
    const userId = userResult.rows[0].id;
    console.log(`✅ Found user ID: ${userId}`);
    
    // Show current progress count
    const countResult = await db.query(
      'SELECT COUNT(*) FROM station_progress WHERE user_id = $1',
      [userId]
    );
    console.log(`📊 Current progress records: ${countResult.rows[0].count}`);
    
    // Delete all progress
    const deleteResult = await db.query(
      'DELETE FROM station_progress WHERE user_id = $1',
      [userId]
    );
    console.log(`✅ Deleted ${deleteResult.rowCount} progress records`);
    
    console.log(`\n🎉 Success! All progress cleared for user "${username}"`);
    console.log(`💡 Tip: Refresh your browser (Cmd+R) to see clean state`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Get username from command line or use default
const username = process.argv[2] || 'owner';
clearProgress(username);
