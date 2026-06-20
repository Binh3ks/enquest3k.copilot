import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const INPUT = path.join(ROOT, 'src/data/video_transcripts.json');
const OUTPUT = path.join(ROOT, 'src/data/video_transcripts_cleaned.json');

function cleanText(text) {
  if (!text) return '';
  let cleaned = text;
  cleaned = cleaned.replace(/\bD hey\b/gi, 'Hey');
  cleaned = cleaned.replace(/\bD he\b/gi, 'He');
  cleaned = cleaned.replace(/\bD it\b/gi, 'It');
  cleaned = cleaned.replace(/\bD they\b/gi, 'They');
  cleaned = cleaned.replace(/\bD I\b/g, 'I');
  cleaned = cleaned.replace(/\bIm\b/g, "I'm");
  cleaned = cleaned.replace(/\bIve\b/g, "I've");
  cleaned = cleaned.replace(/\bIll\b/g, "I'll");
  cleaned = cleaned.replace(/\bId\b/g, "I'd");
  cleaned = cleaned.replace(/\bdont\b/g, "don't");
  cleaned = cleaned.replace(/\bcant\b/g, "can't");
  cleaned = cleaned.replace(/\bwont\b/g, "won't");
  cleaned = cleaned.replace(/\bisnt\b/g, "isn't");
  cleaned = cleaned.replace(/\bdidnt\b/g, "didn't");
  cleaned = cleaned.replace(/\bdoesnt\b/g, "doesn't");
  cleaned = cleaned.replace(/\bcouldnt\b/g, "couldn't");
  cleaned = cleaned.replace(/\bwouldnt\b/g, "wouldn't");
  cleaned = cleaned.replace(/\bshes\b/g, "she's");
  cleaned = cleaned.replace(/\bhes\b/g, "he's");
  cleaned = cleaned.replace(/\bwhos\b/g, "who's");
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  if (cleaned.length > 0) {
    cleaned = cleaned[0].toUpperCase() + cleaned.slice(1);
  }
  if (cleaned.length > 0 && !/[.!?]$/.test(cleaned)) {
    cleaned += '.';
  }
  return cleaned;
}

const data = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
const cleaned = {};
let total = 0, errors = 0;

for (const [videoId, entry] of Object.entries(data)) {
  if (entry.error) {
    cleaned[videoId] = { error: entry.error, videoId };
    errors++;
    continue;
  }
  total++;
  const fullTextRaw = entry.segments.map(s => s.text).join(' ');
  const fullTextCleaned = cleanText(fullTextRaw);
  cleaned[videoId] = {
    text: fullTextCleaned,
    segments: entry.segments.map(s => ({
      text: cleanText(s.text),
      start: s.start,
      duration: s.duration,
    })),
    fetchedAt: new Date().toISOString(),
  };
}

fs.writeFileSync(OUTPUT, JSON.stringify(cleaned, null, 2), 'utf8');
console.log(`Processed ${total} videos, ${errors} errors`);
console.log(`Output: ${OUTPUT}`);
