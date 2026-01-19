import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const weekIdArg = process.argv[2];
if (!weekIdArg) {
  console.error("❌ Usage: node tools/update_db_smart.js <weekId>");
  process.exit(1);
}

const WEEK_ID = parseInt(weekIdArg, 10);
const DB_PATH = path.join(ROOT, 'src', 'data', 'syllabus_database.js');

function updateDB() {
  console.log(`📊 Updating Database for Week ${WEEK_ID}...`);
  
  if (!fs.existsSync(DB_PATH)) {
    console.error("❌ Database file not found:", DB_PATH);
    return;
  }

  let content = fs.readFileSync(DB_PATH, 'utf-8');

  // Check if week already exists
  if (content.includes(`id: ${WEEK_ID},`)) {
    console.log(`⚠️  Week ${WEEK_ID} already exists in database. Skipping.`);
    return;
  }

  // Define new entry template
  const newEntry = `
  {
    id: ${WEEK_ID},
    title: "Week ${WEEK_ID}",
    level: "A0",
    description: "Generated Content",
    folder: "week_${String(WEEK_ID).padStart(2, '0')}",
    stations: [
      { id: 'daily_watch', type: 'video', status: 'ready' },
      { id: 'vocab_mastery', type: 'vocab', status: 'ready' },
      { id: 'ai_story', type: 'story', status: 'ready' },
      { id: 'skill_reading', type: 'reading', status: 'ready' },
      { id: 'grammar_lab', type: 'grammar', status: 'ready' }
    ]
  },`;

  // Insert before the closing array bracket of export const syllabusDB
  // Look for the last "];" or just "]" at the end of the structure
  const lastBracketIndex = content.lastIndexOf(']');
  
  if (lastBracketIndex !== -1) {
    const before = content.substring(0, lastBracketIndex);
    const after = content.substring(lastBracketIndex);
    
    // Add comma if previous entry doesn't have it
    const trimmedBefore = before.trim();
    const needsComma = !trimmedBefore.endsWith(',') && !trimmedBefore.endsWith('[');
    
    const insertion = (needsComma ? ',' : '') + newEntry;
    const newContent = before + insertion + "\n" + after;
    
    fs.writeFileSync(DB_PATH, newContent, 'utf-8');
    console.log("✅ Database updated successfully.");
  } else {
    console.error("❌ Could not parse syllabus_database.js structure.");
  }
}

updateDB();
