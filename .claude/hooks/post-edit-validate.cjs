#!/usr/bin/env node
/**
 * PostToolUse hook for Edit/Write — enforces self-improvement loop:
 *   Edit → Auto-lint → Auto-build → Auto-rollback on failure
 *
 * Receives JSON on stdin: { tool_name, tool_input: { file_path, content }, ... }
 * Outputs JSON on stdout: { decision: "block" | "approve", reason: "..." }
 *
 * Exit code 2 = block further actions (per Claude Code hook convention).
 */

const fs = require("fs");
const path = require("path");
const { execSync, spawnSync } = require("child_process");

const PROJECT_ROOT = "/Users/binhnguyen/projects/Engquest3k";
const DEBUG_LOG = "/tmp/hook-debug.log";

function dbg(msg) { fs.appendFileSync(DEBUG_LOG, `[${new Date().toISOString()}] ${msg}\n`); }

// ── TDZ heuristic detector (Lesson-006) ────────────────────────────
// Catches forward references: a useCallback/useMemo that depends on a
// const/let variable declared BELOW it. These pass lint+build but crash
// at runtime ("Cannot access before initialization").
function detectTDZRisk(code) {
  const lines = code.split("\n");
  const results = [];
  const declarations = [];
  lines.forEach((line, i) => {
    const m = line.match(/^[\s]*const\s+(\w+)/);
    if (m) declarations.push({ name: m[1], line: i + 1 });
  });
  lines.forEach((line, i) => {
    if (!/\buseCallback\b|\buseMemo\b/.test(line)) return;
    // Skip import/require lines (e.g., `import { useCallback } from 'react'`)
    if (/^\s*(import|const\s+\{|const\s+\w+\s*=\s*require)/.test(line)) return;
    const block = lines.slice(i, i + 15).join("\n");
    const arrMatches = block.match(/\[\s*([\w\s,.\[\]?'"`]+)\s*\]/g);
    if (!arrMatches || arrMatches.length === 0) return;
    const depsStr = arrMatches[arrMatches.length - 1];
    const deps = depsStr.replace(/^\[|\]$/g, "").split(/[, ]+/).map(s => s.replace(/[.?'"`]/g, "").trim()).filter(Boolean);
    for (const dep of deps) {
      if (/^(true|false|null|undefined|this|state|props|new|import|require|window|document|callback)$/.test(dep)) continue;
      if (dep.includes(".") || dep.includes("[") || /^[0-9'"`]/.test(dep)) continue;
      const decl = declarations.find(d => d.name === dep);
      if (decl && decl.line > i + 1) {
        results.push({ line: i + 1, name: dep, declaredLine: decl.line });
      }
    }
  });
  return results;
}

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  dbg(`RECEIVED ${raw.length} bytes: ${raw.slice(0, 500)}`);
  try {
    const input = JSON.parse(raw || "{}");
    const toolName = input.tool_name || "";
    const filePath = input.tool_input?.file_path || "";

    // Only run on Edit/Write
    if (!["Edit", "Write"].includes(toolName)) return approve("not an edit");

    // Skip non-source files (docs, memory, hooks themselves)
    const skipPatterns = [
      /\.md$/,
      /\.claude\/hooks\//,
      /\.claude\/commands\//,
      /\.claude\/memory\//,
      /\.ai\//,
      /MEMORY\.md$/,
      /lessons\.md$/,
    ];
    if (skipPatterns.some((re) => re.test(filePath))) {
      return approve("non-source file");
    }

    // Only validate JS/JSX/TS/TSX
    if (!/\.(js|jsx|ts|tsx)$/.test(filePath)) {
      return approve("non-JS file");
    }

    if (!fs.existsSync(filePath)) return approve("file does not exist");

    // ── TDZ pre-check (Lesson-006) ─────────────────────────────────
    // Catches forward references BEFORE lint runs: a const/let variable
    // used in a useCallback/useMemo deps array but declared below it.
    // These pass lint+build but crash at runtime.
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const tdzRisks = detectTDZRisk(fileContent);
      if (tdzRisks.length > 0) {
        console.error(`[post-edit-validate] ⚠️  TDZ RISK detected in ${path.relative(PROJECT_ROOT, filePath)}:`);
        for (const r of tdzRisks) {
          console.error(`  line ${r.line}: uses '${r.name}' (declared at line ${r.declaredLine} — below the hook call)`);
        }
        console.error("  → This will crash at runtime with 'Cannot access before initialization'.");
        console.error("  → Fix: move the useCallback/useMemo BELOW the declaration, or use a ref pattern.");
        rollback(filePath, "TDZ risk detected");
        return block(`TDZ RISK in ${path.basename(filePath)}: ${tdzRisks.map(r => `'${r.name}' at line ${r.line} → declared line ${r.declaredLine}`).join("; ")}`);
      }
    } catch (readErr) {
      // If file read fails, skip TDZ check silently
    }

    console.error(`[post-edit-validate] Checking ${path.relative(PROJECT_ROOT, filePath)}...`);

    // Step 1: Lint ONLY the edited file (npm run lint lints everything — use npx eslint directly)
    // --max-warnings 999: only fail on real errors (no-undef, no-unused-vars as error)
    // Pre-existing warnings (react-hooks/exhaustive-deps etc.) must not roll back new code.
    const lintResult = spawnSync(
      "npx",
      ["eslint", "--ext", "js,jsx", "--report-unused-disable-directives", "--max-warnings", "999", filePath],
      { cwd: PROJECT_ROOT, encoding: "utf8", timeout: 60000 }
    );
    dbg(`LINT status=${lintResult.status} stdout=${(lintResult.stdout||"").slice(-1500)} stderr=${(lintResult.stderr||"").slice(-1500)}`);

    if (lintResult.status !== 0) {
      console.error("[post-edit-validate] LINT FAILED:");
      console.error(lintResult.stdout?.slice(-2000) || "");
      console.error(lintResult.stderr?.slice(-2000) || "");
      rollback(filePath, "lint failed");
      return block(
        `LINT FAILED for ${path.relative(PROJECT_ROOT, filePath)}. ` +
          `Auto-rolled back. Run 'npm run lint -- ' + file_path to see errors.`
      );
    }

    // Step 2: Build (only for production code)
    const buildPaths = /src\/(modules|services|components|stores|hooks|config)\//;
    if (buildPaths.test(filePath)) {
      console.error("[post-edit-validate] Running build check...");
      const buildResult = spawnSync("npm", ["run", "build"], {
        cwd: PROJECT_ROOT,
        encoding: "utf8",
        timeout: 300000,
      });

      if (buildResult.status !== 0) {
        console.error("[post-edit-validate] BUILD FAILED:");
        console.error(buildResult.stdout?.slice(-2000) || "");
        console.error(buildResult.stderr?.slice(-2000) || "");
        rollback(filePath, "build failed");
        return block(
          `BUILD FAILED after editing ${path.relative(PROJECT_ROOT, filePath)}. ` +
            `Auto-rolled back. Run 'npm run build' to see errors.`
        );
      }
    }

    // Step 3: Content data validation (Week data files)
    // Detect edits to src/data/weeks/week_NN* or src/data/weeks_easy/week_NN*
    // and run the appropriate validator automatically.
    const weekDataMatch = filePath.match(/src\/data\/(weeks|weeks_easy)\/week_(\d+)/);
    if (weekDataMatch) {
      const weekNum = weekDataMatch[2];
      const basename = path.basename(filePath);

      // 3a: read.js or explore.js → content lint
      if (basename === "read.js" || basename === "explore.js") {
        console.error(`[post-edit-validate] Content lint for week ${weekNum} (${basename})...`);
        const lintResult = spawnSync(
          "npm", ["run", "content:lint", "--", "--week", weekNum, "--errors-only"],
          { cwd: PROJECT_ROOT, encoding: "utf8", timeout: 30000 }
        );
        dbg(`CONTENT_LINT status=${lintResult.status} stdout=${(lintResult.stdout||"").slice(-1000)}`);
        if (lintResult.status !== 0) {
          console.error("[post-edit-validate] CONTENT LINT FAILED:");
          console.error(lintResult.stdout?.slice(-2000) || "");
          rollback(filePath, "content lint failed");
          return block(`CONTENT LINT FAILED for ${basename} (week ${weekNum}). Auto-rolled back. Run 'npm run content:lint -- --week ${weekNum} --errors-only'`);
        }
      }

      // 3b: singapore_math.js → sgmath type validation
      if (basename === "singapore_math.js") {
        console.error(`[post-edit-validate] Singapore Math validation for week ${weekNum}...`);
        const sgResult = spawnSync(
          "node", ["production_kit/tools/validate_sgmath_types.mjs", weekNum],
          { cwd: PROJECT_ROOT, encoding: "utf8", timeout: 15000 }
        );
        dbg(`SGMATH status=${sgResult.status} stdout=${(sgResult.stdout||"").slice(-1000)}`);
        if (sgResult.status !== 0) {
          console.error("[post-edit-validate] SGMATH VALIDATION FAILED:");
          console.error(sgResult.stdout?.slice(-2000) || "");
          rollback(filePath, "sgmath validation failed");
          return block(`SGMATH VALIDATION FAILED for week ${weekNum}. Auto-rolled back. Run 'node production_kit/tools/validate_sgmath_types.mjs ${weekNum}'`);
        }
      }
    }

    // 3c: dictionary.json → dict lint
    if (path.basename(filePath) === "dictionary.json") {
      console.error("[post-edit-validate] Dictionary lint...");
      const dictResult = spawnSync(
        "npm", ["run", "dict:lint", "--", "--errors-only"],
        { cwd: PROJECT_ROOT, encoding: "utf8", timeout: 30000 }
      );
      dbg(`DICT_LINT status=${dictResult.status} stdout=${(dictResult.stdout||"").slice(-1000)}`);
      if (dictResult.status !== 0) {
        console.error("[post-edit-validate] DICT LINT FAILED:");
        console.error(dictResult.stdout?.slice(-2000) || "");
        rollback(filePath, "dict lint failed");
        return block("DICT LINT FAILED for dictionary.json. Auto-rolled back. Run 'npm run dict:lint -- --errors-only'");
      }
    }

    return approve(`lint + build passed for ${path.basename(filePath)}`);
  } catch (err) {
    console.error("[post-edit-validate] Hook error:", err.message);
    return approve("hook error — proceeding");
  }
});

function approve(reason) {
  process.stdout.write(JSON.stringify({ decision: "approve", reason }));
  process.exit(0);
}

function block(reason) {
  process.stdout.write(
    JSON.stringify({
      decision: "block",
      reason,
    })
  );
  process.exit(2);
}

function rollback(filePath, reason) {
  // Try git checkout first (works for tracked files)
  try {
    execSync(`git checkout -- "${filePath}"`, {
      cwd: PROJECT_ROOT,
      stdio: "pipe",
    });
    console.error(`[post-edit-validate] ✓ Rolled back ${path.basename(filePath)} via git checkout (${reason})`);
    return;
  } catch (e) {
    // Fallback: rm (for untracked/new files)
    try {
      execSync(`rm -f "${filePath}"`, { stdio: "pipe" });
      console.error(`[post-edit-validate] ✓ Removed ${path.basename(filePath)} (was untracked, ${reason})`);
    } catch (e2) {
      console.error(`[post-edit-validate] ✗ Rollback FAILED for both git checkout and rm: ${e2.message}`);
    }
  }
}