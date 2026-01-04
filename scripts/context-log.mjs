// scripts/context-log.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTEXT_PATH = path.resolve(__dirname, "..", "docs", "ai_application_context.md");
const marker = "<!-- AUTO_GENERATED_DEVELOPMENT_LOG -->";

const msg = process.argv.slice(2).join(" ").trim();
if (!msg) {
  console.error("Usage: node scripts/context-log.mjs <log message>");
  process.exit(1);
}

if (!fs.existsSync(CONTEXT_PATH)) {
  console.error(`Missing: ${CONTEXT_PATH}`);
  process.exit(1);
}

let text = fs.readFileSync(CONTEXT_PATH, "utf8");

// 1) Update Last Updated
const now = new Date().toISOString();
text = text.replace(
  /_Last Updated:\s*.*?_/,
  `_Last Updated: ${now}_`
);

// 2) Append log entry under marker
const idx = text.indexOf(marker);
if (idx === -1) {
  console.error(`Marker not found: ${marker}`);
  process.exit(1);
}

const timestamp = now.replace("T", " ").replace(/\.\d{3}Z/, "");
const entry = `- ${timestamp}: ${msg}\n`;

// Insert right after marker line
const parts = text.split(marker);
let after = parts[1] ?? "";
after = after.replace(/^\s*\n?/, "\n"); // ensure newline
after = entry + after;

// 3) Keep only last 12 entries (most recent first)
const lines = after.split("\n");
const kept = [];
let count = 0;
for (const line of lines) {
  if (line.trim().startsWith("- ")) {
    if (count < 12) kept.push(line);
    count++;
  } else {
    kept.push(line);
  }
}
after = kept.join("\n");

text = parts[0] + marker + after;

fs.writeFileSync(CONTEXT_PATH, text, "utf8");
console.log(`✅ Updated context log: ${CONTEXT_PATH}`);
console.log(`📝 Entry: ${entry.trim()}`);
