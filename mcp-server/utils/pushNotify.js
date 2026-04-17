/* eslint-env node */
const webpush = require('web-push');
const db = require('../config/db');

const VAPID_PUBLIC  = process.env.VAPID_PUBLIC_KEY  || 'BFunRX86ZCgafYpyjjGXGdPCnY8q9wasbfTAzNBP4tyLJ8gfvYlcJdTXRcjvUo_CF3ThzCUirMUXq0_KLCoYcrQ';
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY || 'DpDxx6RdQqk-6XO7fsrQ6eMoKHPRxxN1ZOfsQI5AKCY';
const VAPID_EMAIL   = process.env.VAPID_EMAIL       || 'mailto:admin@engquest.local';

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC, VAPID_PRIVATE);

/** Send a push notification to all super_admin and admin users who have subscribed. */
async function sendPushToAdmins(payload) {
  try {
    const subs = await db.query(
      `SELECT ps.subscription_json, ps.endpoint
       FROM push_subscriptions ps
       JOIN users u ON u.username = ps.username
       WHERE u.role IN ('super_admin', 'admin')`
    );
    if (subs.rowCount === 0) return;

    const pushPayload = JSON.stringify(payload);
    for (const row of subs.rows) {
      try {
        const sub = JSON.parse(row.subscription_json);
        await webpush.sendNotification(sub, pushPayload);
      } catch (e) {
        // Subscription expired or invalid — clean it up
        if (e.statusCode === 410 || e.statusCode === 404) {
          await db.query('DELETE FROM push_subscriptions WHERE endpoint = $1', [row.endpoint]);
        } else {
          console.error('[Push] sendNotification error:', e.message);
        }
      }
    }
  } catch (err) {
    console.error('[Push] sendPushToAdmins error:', err.message);
  }
}

module.exports = { sendPushToAdmins, VAPID_PUBLIC };
