#!/usr/bin/env node
/**
 * Manual memory update script for EngQuest3K AgentOS
 *
 * Usage: node scripts/update_memory.js
 *
 * Updates:
 * 1. .ai/memory/CURRENT.md — git status, recent commits, branch info
 * 2. .ai/memory/HISTORY.md — one-liner per commit
 * 3. .ai/tasks/DONE.md — move completed tasks from ACTIVE.md
 *
 * Run after each commit/push to keep memory in sync.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = '/Users/binhnguyen/projects/Engquest3k';
const AI_ROOT = path.join(PROJECT_ROOT, '.ai');

// Helper: run git command
function git(cmd) {
  try {
    return execSync(cmd, { cwd: PROJECT_ROOT, encoding: 'utf8', timeout: 5000 }).trim();
  } catch {
    return '';
  }
}

// Helper: get current timestamp
function timestamp() {
  return new Date().toISOString();
}

// Helper: get date string (YYYY-MM-DD)
function dateStr() {
  return new Date().toISOString().split('T')[0];
}

// ── 1. Update HISTORY.md ─────────────────────────────────────────────
function updateHistory() {
  const historyPath = path.join(AI_ROOT, 'memory/HISTORY.md');
  const commitMsg = git('git log -1 --format="%s"');
  const branch = git('git branch --show-current') || 'main';

  if (!commitMsg) {
    console.log('[history] No commit found, skipping');
    return;
  }

  const entry = `${dateStr()} | ${branch} | ${commitMsg}`;

  let content = '';
  if (fs.existsSync(historyPath)) {
    content = fs.readFileSync(historyPath, 'utf8');
  }

  // Avoid duplicate entries
  if (content.includes(commitMsg)) {
    console.log('[history] Entry already exists, skipping');
    return;
  }

  // Append new entry
  const needsNewline = content.length > 0 && !content.endsWith('\n');
  fs.appendFileSync(historyPath, (needsNewline ? '\n' : '') + entry + '\n');
  console.log(`[history] ✓ Added: ${entry}`);
}

// ── 2. Update CURRENT.md ─────────────────────────────────────────────
function updateCurrent() {
  const currentPath = path.join(AI_ROOT, 'memory/CURRENT.md');

  // Read existing content
  let content = '';
  if (fs.existsSync(currentPath)) {
    content = fs.readFileSync(currentPath, 'utf8');
  }

  // Extract manual sections (before "## Auto Status")
  const autoMarker = '## Auto Status';
  const markerIdx = content.indexOf(autoMarker);
  let manualSection = '';

  if (markerIdx !== -1) {
    // Find the last ## heading before auto status
    const beforeAuto = content.slice(0, markerIdx);
    const lastHeading = beforeAuto.lastIndexOf('\n## ');
    manualSection = lastHeading !== -1 ? beforeAuto.slice(0, lastHeading).trimEnd() : beforeAuto.trimEnd();
  } else {
    // Take everything but remove excessive --- lines
    manualSection = content
      .split('\n')
      .filter((line, i, arr) => {
        // Remove consecutive --- lines
        if (line.trim() === '---') {
          const prev = arr[i - 1]?.trim();
          const next = arr[i + 1]?.trim();
          // Keep --- only if it's between non-empty lines
          return prev && next && prev !== '---' && next !== '---';
        }
        return true;
      })
      .join('\n')
      .trimEnd();
  }

  // Gather git info
  const branch = git('git branch --show-current') || 'main';
  const recentCommits = git('git log --oneline -5');
  const isClean = git('git status --porcelain') === '';
  const lastCommit = git('git log -1 --format="%h %s (%ad)" --date=short');

  // Build auto status block
  const autoStatus = `---

## Auto Status (auto-updated on commit)

**Updated:** ${timestamp()}
**Branch:** \`${branch}\`
**Working tree:** ${isClean ? 'Clean' : 'Dirty'}
**Last commit:** ${lastCommit}

### Recent commits
\`\`\`
${recentCommits}
\`\`\`

### Active Tasks
${getActiveTasks()}

### Pending Items (from manual section)
${getPendingItems(manualSection)}
`;

  // Combine: manual section + auto status
  const newContent = manualSection + '\n\n' + autoStatus;

  fs.writeFileSync(currentPath, newContent);
  console.log('[current] ✓ Updated CURRENT.md');
}

// ── 3. Update DONE.md ────────────────────────────────────────────────
function updateDone() {
  const activePath = path.join(AI_ROOT, 'tasks/ACTIVE.md');
  const donePath = path.join(AI_ROOT, 'tasks/DONE.md');

  if (!fs.existsSync(activePath)) {
    console.log('[done] No ACTIVE.md found, skipping');
    return;
  }

  const activeContent = fs.readFileSync(activePath, 'utf8');
  const lines = activeContent.split('\n');

  // Find completed tasks (marked with [x])
  const completed = lines.filter(l => /^\s*- \[x\]/.test(l));
  const pending = lines.filter(l => /^\s*- \[ \]/.test(l));

  if (completed.length === 0) {
    console.log('[done] No completed tasks to move');
    return;
  }

  // Read existing DONE.md
  let doneContent = '';
  if (fs.existsSync(donePath)) {
    doneContent = fs.readFileSync(donePath, 'utf8');
  }

  // Add completed tasks with timestamp
  const timestamped = completed.map(t =>
    t.replace('- [x]', `- [x] ${dateStr()}:`)
  );

  const needsNewline = doneContent.length > 0 && !doneContent.endsWith('\n');
  fs.appendFileSync(donePath, (needsNewline ? '\n' : '') + timestamped.join('\n') + '\n');

  // Update ACTIVE.md with only pending tasks
  const newActive = pending.length > 0
    ? '# Active Tasks\n' + pending.join('\n') + '\n'
    : '# Active Tasks\n- [ ] No tasks assigned. Use `/agent-start` when ready.\n';

  fs.writeFileSync(activePath, newActive);
  console.log(`[done] ✓ Moved ${completed.length} task(s) to DONE.md`);
}

// ── Helpers ──────────────────────────────────────────────────────────

function getActiveTasks() {
  const activePath = path.join(AI_ROOT, 'tasks/ACTIVE.md');
  if (!fs.existsSync(activePath)) return '- No active tasks';

  const content = fs.readFileSync(activePath, 'utf8');
  const tasks = content.split('\n').filter(l => /^\s*- \[ \]/.test(l));

  if (tasks.length === 0) return '- No active tasks';
  return tasks.map(t => `- ${t.replace(/^- \[ \] /, '')}`).join('\n');
}

function getPendingItems(manualSection) {
  // Extract pending items from manual section
  const lines = manualSection.split('\n');
  const pending = [];
  let inPending = false;

  for (const line of lines) {
    if (line.includes('Pending') || line.includes('TODO') || line.includes('TODO')) {
      inPending = true;
      continue;
    }
    if (inPending && line.startsWith('- ')) {
      pending.push(line);
    }
  }

  return pending.length > 0 ? pending.join('\n') : '- None';
}

// ── Main ─────────────────────────────────────────────────────────────

console.log('=== EngQuest3K Memory Update ===\n');

try {
  updateHistory();
  updateCurrent();
  updateDone();
  console.log('\n✓ Memory updated successfully');
} catch (err) {
  console.error('\n✗ Error:', err.message);
  process.exit(1);
}
