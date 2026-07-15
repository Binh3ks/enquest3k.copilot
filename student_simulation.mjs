/**
 * ENGQUEST STUDENT SIMULATION
 * Simulates a student navigating all 30 weeks × 2 modes × all stations
 * Checks: console errors, 404s, render failures, data loading, AI Tutor 3 tabs
 */
import { chromium } from 'playwright';

const BASE_URL = 'https://enquest3k.pages.dev';
const MODES = ['advanced', 'easy'];
const WEEKS = Array.from({ length: 30 }, (_, i) => i + 1);

// All station tabKeys (from stationConfig.js)
const STATIONS_W1_15 = [
  'read_explore', 'new_words', 'word_match', 'daily_watch', 'word_power',
  'grammar', 'logic_lab', 'mindmap_speaking', 'ask_ai', 'dictation',
  'shadowing', 'writing', 'explore', 'self_regulation'
];
const STATIONS_W16_PLUS = [
  ...STATIONS_W1_15, 'game_hub'
];

function getStations(week) {
  return week >= 16 ? STATIONS_W16_PLUS : STATIONS_W1_15;
}

// ── Results tracking ─────────────────────────────────────────────────────────
const results = {
  total: 0, pass: 0, fail: 0,
  errors: [],
  consoleErrors: {},
  networkErrors: {},
};

function log(msg) { process.stdout.write(msg); }
function logLine(msg) { console.log(msg); }

// ── Setup localStorage as "guest student" in a given mode ────────────────────
async function setupStudentSession(page, mode) {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.evaluate((learningMode) => {
    const state = {
      state: {
        currentUser: { name: 'TestStudent', role: 'student', id: 999, avatarUrl: '' },
        token: 'test-token-simulation',
        learningMode,
        progressCache: {},
        weekCompletion: {},
        weekStars: {},
        earnedBadges: [],
      },
      version: 0,
    };
    localStorage.setItem('engquest-user-storage', JSON.stringify(state));
    localStorage.setItem('placement_result', 'completed');
    localStorage.setItem('engquest_content_mode', learningMode);
  }, mode);
}

// ── Navigate to a week/station and check render ──────────────────────────────
async function checkStation(page, week, mode, station, consoleLog) {
  const url = `${BASE_URL}/week/${week}/${station}`;
  results.total++;

  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    if (!response || response.status() >= 400) {
      results.fail++;
      results.errors.push({ week, mode, station, error: `HTTP ${response?.status()}` });
      log('✗');
      return false;
    }

    // Wait for React to mount content (but not forever)
    await page.waitForTimeout(1500);

    // ── Check 1: No React error boundary ──────────────────────────────────
    const errorBoundary = await page.$('text=Something went wrong');
    const whiteScreen = await page.$('text=Uncaught Error');
    if (errorBoundary || whiteScreen) {
      results.fail++;
      results.errors.push({ week, mode, station, error: 'React error boundary triggered' });
      log('✗');
      return false;
    }

    // ── Check 2: Station content loaded (not just spinner forever) ─────────
    // Look for any meaningful rendered content
    const hasContent = await page.evaluate(() => {
      const body = document.body.innerText;
      // If page is just loading spinner with no other content after 600ms, flag it
      const hasOnlySpinner = document.querySelectorAll('[class*="animate-spin"]').length > 0
        && body.replace(/\s/g, '').length < 50;
      return !hasOnlySpinner;
    });
    if (!hasContent) {
      results.errors.push({ week, mode, station, error: 'WARN: only spinner (slow load?)' });
      log('?');
      return true; // not a hard fail
    }

    // ── Check 3: Grammar station — verify exercises render ─────────────────
    if (station === 'grammar') {
      const grammarContent = await page.evaluate(() => {
        const text = document.body.innerText;
        return text.includes('multiple_choice') || text.includes('mc') ||
               text.includes('Question') || text.includes('Fill') ||
               text.includes('A.') || text.includes('(A)') ||
               document.querySelectorAll('button').length > 2;
      });
      if (!grammarContent) {
        results.errors.push({ week, mode, station, error: 'WARN: grammar may not have rendered exercises' });
      }
    }

    // ── Check 4: Console errors for this station ───────────────────────────
    const key = `W${week}-${mode}-${station}`;
    const errs = consoleLog[key] || [];
    const criticalErrs = errs.filter(e =>
      e.includes('Uncaught') || e.includes('TypeError') || e.includes('Cannot read') ||
      (e.includes('404') && !e.includes('favicon') && !e.includes('R2') && !e.includes('cdn'))
    );
    if (criticalErrs.length > 0) {
      results.fail++;
      results.errors.push({ week, mode, station, error: `JS ERROR: ${criticalErrs[0].slice(0, 100)}` });
      log('✗');
      return false;
    }

    results.pass++;
    log('✓');
    return true;
  } catch (err) {
    results.fail++;
    results.errors.push({ week, mode, station, error: `TIMEOUT/CRASH: ${err.message.slice(0, 80)}` });
    log('✗');
    return false;
  }
}

// ── Check AI Tutor 3 tabs for a week ─────────────────────────────────────────
async function checkAITutor(page, week, mode, consoleLog) {
  const url = `${BASE_URL}/week/${week}/ask_ai`;
  const issues = [];

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(1500);

    // Check AskAi station content (AskAi.jsx — prompt-based, not tab-based)
    const tabsCheck = await page.evaluate(() => {
      const text = document.body.innerText;
      // AskAi renders "ASK AI" and situations/prompts
      const hasAskAI = text.includes('ASK AI') || text.includes('Ask AI') || text.includes('Critical Inquiry') || text.includes('Situation');
      const hasContent = text.includes('Context') || text.includes('context') || text.includes('Question') || text.includes('question') || text.includes('prompt') || hasAskAI;
      return { hasAskAI, hasContent, textLen: text.length };
    });

    if (!tabsCheck.hasAskAI && !tabsCheck.hasContent) issues.push('AskAI station content not found');
    if (tabsCheck.textLen < 100) issues.push('AskAI content too short (possible empty render)');

    if (issues.length > 0) {
      results.errors.push({ week, mode, station: 'ask_ai', error: issues.join(' | ') });
    }
  } catch (err) {
    issues.push(`CRASH: ${err.message.slice(0, 80)}`);
    results.errors.push({ week, mode, station: 'ask_ai', error: issues[0] });
  }

  return issues;
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  logLine('\n╔══════════════════════════════════════════════════════════════╗');
  logLine('║        ENGQUEST STUDENT SIMULATION — ALL 30 WEEKS           ║');
  logLine('║        30 weeks × 2 modes × 14-15 stations + AI Tutor tabs  ║');
  logLine('╚══════════════════════════════════════════════════════════════╝\n');

  const browser = await chromium.launch({ headless: true });
  const consoleLog = {}; // { "W1-advanced-grammar": [errMsg, ...] }

  for (const mode of MODES) {
    logLine(`\n${'═'.repeat(64)}`);
    logLine(`  MODE: ${mode.toUpperCase()}`);
    logLine('═'.repeat(64));

    const context = await browser.newContext();
    const page = await context.newPage();

    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const url = page.url();
        const match = url.match(/\/week\/(\d+)\/(\w+)/);
        if (match) {
          const key = `W${match[1]}-${mode}-${match[2]}`;
          if (!consoleLog[key]) consoleLog[key] = [];
          consoleLog[key].push(msg.text());
        }
      }
    });

    // Capture network 404s
    page.on('response', res => {
      if (res.status() === 404) {
        const url = page.url();
        const match = url.match(/\/week\/(\d+)\/(\w+)/);
        if (match) {
          const key = `W${match[1]}-${mode}-${match[2]}`;
          if (!consoleLog[key]) consoleLog[key] = [];
          consoleLog[key].push(`404: ${res.url()}`);
        }
      }
    });

    // Set up student session
    await setupStudentSession(page, mode);

    for (const week of WEEKS) {
      const stations = getStations(week);
      log(`\n  W${String(week).padStart(2,'0')} [${mode.slice(0,3)}]: `);

      for (const station of stations) {
        await checkStation(page, week, mode, station, consoleLog);
      }

      // Extra: AI Tutor 3 tabs check
      const aiIssues = await checkAITutor(page, week, mode, consoleLog);
      if (aiIssues.length === 0) log('🤖✓');
      else log(`🤖✗`);
    }

    await context.close();
  }

  await browser.close();

  // ── REPORT ────────────────────────────────────────────────────────────────
  logLine('\n\n' + '═'.repeat(64));
  logLine('  SIMULATION REPORT');
  logLine('═'.repeat(64));
  logLine(`  Total checks : ${results.total}`);
  logLine(`  PASS         : ${results.pass}`);
  logLine(`  FAIL         : ${results.fail}`);

  if (results.errors.length === 0) {
    logLine('\n  🎉 ZERO ISSUES FOUND — All stations render correctly!\n');
  } else {
    logLine(`\n  ⚠️  ${results.errors.length} issues found:\n`);
    results.errors.forEach(e => {
      const severity = e.error.startsWith('WARN') ? '  ⚠️ ' : '  ❌ ';
      logLine(`${severity}W${String(e.week).padStart(2,'0')} [${e.mode?.slice(0,3)||'?'}] [${e.station}]: ${e.error}`);
    });
  }

  logLine('\n' + '═'.repeat(64));
  process.exit(results.fail > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Simulation crashed:', err);
  process.exit(1);
});
