// scripts/add-memory.mjs
import fs from "fs";
import path from "path";

const memoryFile = path.resolve("docs/memory.md");

const input = process.argv.slice(2).join(" ").trim();

if (!input) {
  console.error("❌ No memory content provided.");
  console.error('Usage: npm run memory:add "Decision: ..."');
  process.exit(1);
}

// Parse type
const match = input.match(/^(Decision|Rule|Constraint|Fact):\s*(.+)$/i);

if (!match) {
  console.error("❌ Invalid memory format.");
  console.error("Required format:");
  console.error('  Decision: ...');
  console.error('  Rule: ...');
  console.error('  Constraint: ...');
  console.error('  Fact: ...');
  process.exit(1);
}

const [, rawType, content] = match;
const type = rawType.charAt(0).toUpperCase() + rawType.slice(1).toLowerCase();
const date = new Date().toISOString().split("T")[0];

const entry = `
### ${type} (${date})
- ${content}
`.trimStart();

// Ensure file exists
if (!fs.existsSync(memoryFile)) {
  fs.writeFileSync(memoryFile, "# Project Memory\n\n");
}

// Append
fs.appendFileSync(memoryFile, "\n" + entry + "\n");

console.log("✅ Memory saved to docs/memory.md");
