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

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  try {
    const input = JSON.parse(raw);
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

    console.error(`[post-edit-validate] Checking ${path.relative(PROJECT_ROOT, filePath)}...`);

    // Step 1: Lint ONLY the edited file (npm run lint lints everything — use npx eslint directly)
    // --max-warnings 999: only fail on real errors (no-undef, no-unused-vars as error)
    // Pre-existing warnings (react-hooks/exhaustive-deps etc.) must not roll back new code.
    const lintResult = spawnSync(
      "npx",
      ["eslint", "--ext", "js,jsx", "--report-unused-disable-directives", "--max-warnings", "999", filePath],
      { cwd: PROJECT_ROOT, encoding: "utf8", timeout: 60000 }
    );

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