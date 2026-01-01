import fs from "fs";
import path from "path";
import { globSync } from "glob";

/**
 * ENGQUEST Copilot Context Builder (LOW-NOISE)
 * - Reads patterns from docs/context-sources.md (lines starting with "- ")
 * - Builds copilot-context.md with aggressive noise filtering
 */

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, "copilot-context.md");
const SOURCES_FILE = path.join(ROOT, "docs/context-sources.md");

// Hard limits
const MAX_FILES = 60;              // avoid exploding if patterns match too much
const MAX_TOTAL_LINES = 2200;      // overall output cap
const MAX_LINES_PER_FILE = 260;    // per file cap (default)
const MAX_LINES_PER_FILE_SUMMARY = 140;
const KEEP_NEARBY_AFTER_HEADING = 3;

// File mode detection
function getModeByFilename(file) {
  const f = file.toLowerCase();

  if (
    f.includes("ai_tutor") ||
    f.includes("tutor") ||
    f.includes("pedagogy") ||
    f.includes("content-aware") ||
    f.includes("artifact") ||
    f.includes("critical_fix") ||
    f.includes("emergency_fix")
  ) return "pedagogy";

  if (f.includes("implementation_plan") || f.includes("progress_")) {
    return "plan";
  }

  if (f.includes("review") || f.includes("final_update") || f.includes("readiness")) {
    return "summary";
  }

  return "default";
}

function readSources() {
  if (!fs.existsSync(SOURCES_FILE)) {
    console.error(`❌ Missing ${SOURCES_FILE}`);
    process.exit(1);
  }
  const text = fs.readFileSync(SOURCES_FILE, "utf8");
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "));

  return lines.map((l) => l.replace(/^- /, "").trim()).filter(Boolean);
}

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

// --------- Noise filters ---------
function normLine(s) {
  return s
    .replace(/\u200b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isCodeFence(line) {
  return line.trim().startsWith("```") || line.trim().startsWith("~~~");
}

function isHeading(line) {
  return line.trim().startsWith("#");
}

function isBullet(line) {
  const t = line.trim();
  return t.startsWith("- ") || t.startsWith("* ") || /^\d+\.\s/.test(t);
}

function isChecklist(line) {
  return /^\s*-\s*\[[ xX]\]\s+/.test(line);
}

function isTableRow(line) {
  const t = line.trim();
  return t.includes("|") && /^\|?.*\|.*\|?$/.test(t);
}

function isTableSeparator(line) {
  const t = line.trim();
  return /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(t);
}

function isLinky(line) {
  const t = line.trim();
  if (!t) return false;
  if (/^https?:\/\/\S+$/.test(t)) return true;
  if (/^\[.*\]\(https?:\/\/.*\)$/.test(t)) return true;
  return false;
}

function isNoisyBoilerplate(line) {
  const t = line.trim().toLowerCase();

  if (t.includes("react + vite")) return true;
  if (t.includes("fast refresh")) return true;
  if (t.includes("eslint configuration")) return true;
  if (t.includes("babel") && t.includes("swc")) return true;

  if (t === "##" || t === "#") return true;
  if (/^[-_]{3,}$/.test(t)) return true;

  if (t.includes("open in")) return true;

  return false;
}

function isTooLong(line) {
  return line.length > 180;
}

function looksImportantText(line) {
  const t = line.toLowerCase();
  return (
    t.includes("goal") ||
    t.includes("objective") ||
    t.includes("success") ||
    t.includes("constraint") ||
    t.includes("rule") ||
    t.includes("must") ||
    t.includes("mandatory") ||
    t.includes("critical") ||
    t.includes("do not") ||
    t.includes("banned") ||
    t.includes("validation") ||
    t.includes("checklist") ||
    t.includes("fix") ||
    t.includes("next step") ||
    t.includes("risk") ||
    t.includes("mitigation")
  );
}

function isStructured(line) {
  return isHeading(line) || isBullet(line) || isChecklist(line) || isTableRow(line);
}

function makePusher(outArr) {
  const seen = new Set();
  return (raw) => {
    if (!raw) return;
    const n = normLine(raw);
    if (!n) return;
    if (seen.has(n)) return;
    seen.add(n);
    outArr.push(raw);
  };
}

// --------- Extractors ---------
function extractDefault(content) {
  const lines = content.split("\n");
  const out = [];
  const push = makePusher(out);

  let inCode = false;
  let tableLines = 0;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (isCodeFence(raw)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    if (!line) continue;
    if (isLinky(raw)) continue;
    if (isNoisyBoilerplate(raw)) continue;
    if (isTooLong(line)) continue;

    if (isTableRow(raw)) {
      if (isTableSeparator(raw)) continue;
      if (tableLines < 8) push(raw);
      tableLines++;
      continue;
    }

    if (isStructured(raw)) {
      push(raw);

      if (isHeading(raw)) {
        let kept = 0;
        for (let j = 1; j <= 8; j++) {
          const nxt = lines[i + j];
          if (!nxt) break;
          const nt = nxt.trim();
          if (!nt) continue;
          if (isCodeFence(nxt)) break;
          if (isLinky(nxt) || isNoisyBoilerplate(nxt) || isTooLong(nt)) continue;

          if (isBullet(nxt) || isChecklist(nxt)) {
            push(nxt);
            kept++;
            if (kept >= KEEP_NEARBY_AFTER_HEADING) break;
          } else if (looksImportantText(nxt) && nt.length <= 120) {
            push(nxt);
          }
        }
      }
      continue;
    }

    if (looksImportantText(raw) && line.length <= 120) {
      push(raw);
    }
  }

  return out.slice(0, MAX_LINES_PER_FILE).join("\n").trim();
}

function extractPedagogy(content) {
  const lines = content.split("\n");
  const out = [];
  const push = makePusher(out);

  let inCode = false;
  let tableLines = 0;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (isCodeFence(raw)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    if (!line) continue;
    if (isLinky(raw)) continue;
    if (isNoisyBoilerplate(raw)) continue;

    if (isTableRow(raw)) {
      if (isTableSeparator(raw)) continue;
      if (tableLines < 10) push(raw);
      tableLines++;
      continue;
    }

    if (isHeading(raw) || isBullet(raw) || isChecklist(raw)) {
      if (!isTooLong(line) || looksImportantText(raw)) push(raw);
      continue;
    }

    if (looksImportantText(raw) && line.length <= 160) {
      push(raw);
    }
  }

  return out.slice(0, MAX_LINES_PER_FILE).join("\n").trim();
}

function extractPlan(content) {
  const allowHeadingKeywords = [
    "priority",
    "gaps",
    "objectives",
    "success",
    "schedule",
    "deliverables",
    "risk",
    "mitigation",
    "next steps",
    "recommendation",
    "decision",
    "blocking",
  ];

  const lines = content.split("\n");
  const out = [];
  const push = makePusher(out);

  let inCode = false;
  let tableLines = 0;
  let keepMode = false;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (isCodeFence(raw)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    if (!line) continue;
    if (isLinky(raw)) continue;
    if (isNoisyBoilerplate(raw)) continue;

    if (isHeading(raw)) {
      const lower = line.toLowerCase();
      keepMode = allowHeadingKeywords.some((k) => lower.includes(k));
      if (keepMode || line.startsWith("# ")) push(raw);
      continue;
    }

    if (isTableRow(raw)) {
      if (isTableSeparator(raw)) continue;
      if (tableLines < 8) push(raw);
      tableLines++;
      continue;
    }

    if (isBullet(raw) || isChecklist(raw)) {
      if (keepMode || looksImportantText(raw)) {
        if (line.length <= 220) push(raw);
      }
      continue;
    }

    if (looksImportantText(raw) && line.length <= 160) {
      push(raw);
    }
  }

  return out.slice(0, MAX_LINES_PER_FILE).join("\n").trim();
}

function extractSummary(content) {
  const lines = content.split("\n");
  const out = [];
  const push = makePusher(out);

  let inCode = false;
  let tableLines = 0;

  const focusKeywords = [
    "executive summary",
    "what was done",
    "major enhancements",
    "fix applied",
    "critical fix",
    "checklist",
    "production readiness",
    "final verdict",
    "next steps",
    "files updated",
  ];

  let keepMode = false;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    const lower = line.toLowerCase();

    if (isCodeFence(raw)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    if (!line) continue;
    if (isLinky(raw)) continue;
    if (isNoisyBoilerplate(raw)) continue;

    if (isHeading(raw)) {
      keepMode = focusKeywords.some((k) => lower.includes(k));
      if (line.startsWith("# ")) push(raw);
      else if (keepMode) push(raw);
      continue;
    }

    if (isTableRow(raw)) {
      if (isTableSeparator(raw)) continue;
      if (tableLines < 8) push(raw);
      tableLines++;
      continue;
    }

    if (isBullet(raw) || isChecklist(raw)) {
      if (keepMode || looksImportantText(raw)) {
        if (line.length <= 220) push(raw);
      }
      continue;
    }

    if ((keepMode || looksImportantText(raw)) && line.length <= 160) {
      push(raw);
    }
  }

  return out.slice(0, MAX_LINES_PER_FILE_SUMMARY).join("\n").trim();
}

function extractByMode(mode, content) {
  if (mode === "pedagogy") return extractPedagogy(content);
  if (mode === "plan") return extractPlan(content);
  if (mode === "summary") return extractSummary(content);
  return extractDefault(content);
}

// --------- Build pipeline ---------
function collectFiles(patterns) {
  const all = [];
  const seen = new Set();

  for (const pattern of patterns) {
    const files = globSync(pattern, { cwd: ROOT, nodir: true, dot: false });

    for (const f of files) {
      const normalized = String(f).replace(/\\/g, "/");
      if (seen.has(normalized)) continue;
      seen.add(normalized);

      if (normalized === "copilot-context.md") continue;

      all.push(normalized);
      if (all.length >= MAX_FILES) return all;
    }
  }

  return all;
}

function build() {
  const patterns = readSources();
  const files = collectFiles(patterns);

  let output = `# Project Context (AUTO-GENERATED)\n\n⚠️ DO NOT EDIT MANUALLY\n`;
  let totalLines = output.split("\n").length;

  for (const file of files) {
    const abs = path.join(ROOT, file);
    const content = safeRead(abs);
    if (!content) continue;

    const mode = getModeByFilename(file);
    const extracted = extractByMode(mode, content);
    if (!extracted) continue;

    const block = `\n\n---\n## Source: ${file}\n${extracted}\n`;
    const blockLines = block.split("\n").length;

    if (totalLines + blockLines > MAX_TOTAL_LINES) {
      output += `\n\n---\n## Truncated\n- Reached MAX_TOTAL_LINES=${MAX_TOTAL_LINES}. Tighten patterns in docs/context-sources.md or reduce MAX_FILES.\n`;
      break;
    }

    output += block;
    totalLines += blockLines;
  }

  fs.writeFileSync(OUTPUT, output.trim() + "\n", "utf8");
  console.log("✅ copilot-context.md updated (low-noise)");
  console.log(`📦 Files included: ${files.length}/${MAX_FILES}`);
  console.log(`🧾 Total lines: ${totalLines}/${MAX_TOTAL_LINES}`);
}

build();
