// ENGQUEST3K SINGLE MASS PRODUCTION SCRIPT
// Usage: node tools/generate_week_mass_production.js <week_number>
// This script generates all week content, auto-fills audio_url & image_url, and triggers asset generation.

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const MASTER_PROMPT_PATH = path.join(ROOT, '5. ENGQUEST MASTER PROMPT V25-FINAL.txt');
const SYLLABUS_PATH = path.join(ROOT, '1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');

function pad(num) { return String(num).padStart(2, '0'); }

function autoFillUrls(content, weekNum) {
  // Auto-fill audio_url and image_url fields if missing, using naming convention
  // Use week<ID> format (e.g., week2, week3) to match Week 1 standard
  return content.replace(/audio_url\s*:\s*(null|""|''|undefined)/g, `audio_url: "/audio/week${weekNum}/auto.mp3"`)
                .replace(/image_url\s*:\s*(""|''|null|undefined)/g, `image_url: "/images/week${weekNum}/auto.jpg"`);
}

function writeFile(content, filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Written: ${filePath}`);
}

async function generateWeekMassProduction(weekNum) {
  // 1. Load master prompt & syllabus
  const masterPrompt = fs.readFileSync(MASTER_PROMPT_PATH, 'utf-8');
  const syllabus = fs.readFileSync(SYLLABUS_PATH, 'utf-8');
  // 2. Generate content (call Gemini/OpenAI or use template)
  // ...existing code to call AI and get content for all files...
  // For demo, assume we have fileContents: { [filePath]: content }
  let fileContents = {}; // TODO: integrate AI call here
  // 3. Auto-fill missing URLs
  for (const [filePath, content] of Object.entries(fileContents)) {
    const updated = autoFillUrls(content, weekNum);
    writeFile(updated, filePath);
  }
  // 4. Trigger asset generation
  execSync(`node tools/generate_audio_final.py ${weekNum}`, { stdio: 'inherit', cwd: ROOT });
  execSync(`node tools/generate_images_nano.js ${weekNum}`, { stdio: 'inherit', cwd: ROOT });
  console.log('🎉 All assets generated!');
}

const args = process.argv.slice(2);
const weekNum = parseInt(args[0]);
if (!weekNum || weekNum < 1 || weekNum > 54) {
  console.error('❌ Usage: node tools/generate_week_mass_production.js <week_number>');
  process.exit(1);
}

generateWeekMassProduction(weekNum);