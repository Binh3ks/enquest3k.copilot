const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = {
  name: "agent-finish",
  description: "Dong session — append task vao DONE.md, update CURRENT.md, reset ACTIVE.md.",
  async handler(args, context) {
    const cwd = process.cwd();
    const ts = new Date().toISOString().split("T")[0];
    const today = new Date().toISOString();

    const activePath = path.join(cwd, ".ai/tasks/ACTIVE.md");
    const donePath = path.join(cwd, ".ai/tasks/DONE.md");
    const currentPath = path.join(cwd, ".ai/memory/CURRENT.md");
    const historyPath = path.join(cwd, ".ai/memory/HISTORY.md");
    const sessionPath = path.join(cwd, ".ai/memory/SESSION.md");

    let output = "=== AGENTOS SESSION CLOSE ===\n";
    let activeContent = "";
    try { activeContent = fs.readFileSync(activePath, "utf8"); } catch {}
    let doneContent = "";
    try { doneContent = fs.readFileSync(donePath, "utf8"); } catch {}
    let currentContent = "";
    try { currentContent = fs.readFileSync(currentPath, "utf8"); } catch {}

    // Extract done tasks from ACTIVE.md (lines starting with - [x])
    const doneTasks = activeContent.split("\n").filter(l => /^\s*- \[x\]/.test(l));
    // Extract pending tasks from ACTIVE.md (lines starting with - [ ])
    const pendingTasks = activeContent.split("\n").filter(l => /^\s*- \[ \]/.test(l));

    // 1. Append completed tasks to DONE.md
    if (doneTasks.length > 0) {
      const doneSection = doneTasks.map(t => t.replace("- [x]", `- [x] ${ts}:`)).join("\n");
      fs.writeFileSync(donePath, doneContent.trimEnd() + "\n" + doneSection + "\n");
      output += `\n1. DONE.md: appended ${doneTasks.length} completed task(s)\n`;
    } else {
      output += "\n1. DONE.md: no completed tasks to append\n";
    }

    // 2. Reset ACTIVE.md — keep only pending tasks
    if (pendingTasks.length > 0) {
      fs.writeFileSync(activePath, "# Active Tasks\n" + pendingTasks.join("\n") + "\n");
      output += `2. ACTIVE.md: kept ${pendingTasks.length} pending task(s)\n`;
    } else {
      fs.writeFileSync(activePath, "# Active Tasks\n- [ ] No tasks assigned. Use `/agent-start` when ready.\n");
      output += "2. ACTIVE.md: reset to idle\n";
    }

    // 3. Update CURRENT.md status section
    const statusLine = `Updated: ${today}`;
    const autoMarker = "## Auto Status (REPLACED on git commit/push";
    const markerIdx = currentContent.indexOf(autoMarker);
    let branch = 'unknown';
    let recent = '';
    try {
      branch = execSync('git branch --show-current', { cwd, encoding: 'utf8', timeout: 5000 }).trim() || 'unknown';
      recent = execSync('git log --oneline -3', { cwd, encoding: 'utf8', timeout: 5000 }).trim();
    } catch {}
    const statusBlock = `## Auto Status (REPLACED on git commit/push — manual sections above are preserved)\n\n${statusLine}\nBranch: \`${branch}\`` + (recent ? `\n\nRecent:\n${recent}\n` : '\n');
    let newCurrent;
    if (markerIdx !== -1) {
      const headingStart = currentContent.lastIndexOf("\n## ", markerIdx);
      const replaceStart = headingStart === -1 ? markerIdx : headingStart + 1;
      const before = currentContent.slice(0, replaceStart).trimEnd();
      newCurrent = before + '\n\n---\n\n' + statusBlock;
    } else {
      newCurrent = currentContent.trimEnd() + '\n\n---\n\n' + statusBlock;
    }
    fs.writeFileSync(currentPath, newCurrent);
    output += "3. CURRENT.md: status updated\n";

    // 4. Append one-liner to HISTORY.md (ensure trailing newline to avoid merge with last line)
    const histLine = `${ts} | EngQuest3K | session closed | pending: ${pendingTasks.length} tasks remaining`;
    if (fs.existsSync(historyPath)) {
      const existing = fs.readFileSync(historyPath, "utf8");
      const needsNewline = existing.length > 0 && !existing.endsWith("\n");
      fs.appendFileSync(historyPath, (needsNewline ? "\n" : "") + histLine + "\n");
    } else {
      fs.writeFileSync(historyPath, "# Session History (one-liner per session)\n\n" + histLine + "\n");
    }
    output += `4. HISTORY.md: one-liner appended\n`;

    output += "\nSession closed. Next agent: read .ai/memory/CURRENT.md + .ai/tasks/ACTIVE.md to resume.\n";
    return output;
  },
};
