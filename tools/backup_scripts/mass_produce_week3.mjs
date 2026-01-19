import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const WEEK_ID = 3;
const TOPIC = "My Classroom (School Supplies & Colors)";
const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ ERROR: Missing GEMINI_API_KEY in .env");
    process.exit(1);
}

async function callAI(prompt) {
    console.log("🧠 Sending Prompt to Gemini 2.0 Flash...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json", temperature: 0.7 }
            })
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (err) { throw new Error(err.message); }
}

const PROMPT_V24_2 = `
# ENGQUEST MASTER PROMPT V24.2 (STRICT NODE.JS MODE)
Generate files for Week ${WEEK_ID} - Topic: "${TOPIC}".
Follow "Week 1 Golden Standard" structure exactly.

OUTPUT FORMAT: Return a SINGLE JSON OBJECT where keys are file paths and values are file content (code).

CRITICAL TECH REQUIREMENT:
- In "index.js", ALL imports MUST include the file extension ".js".
- Example: "import vocab from './vocab.js';" (NOT './vocab')
- This is mandatory for Node.js tools to work.

REQUIRED FILES (Keys):
1. "src/data/weeks/week_${String(WEEK_ID).padStart(2, '0')}/vocab.js" (Advanced)
2. "src/data/weeks_easy/week_${String(WEEK_ID).padStart(2, '0')}/vocab.js" (Easy)
3. "src/data/weeks/week_${String(WEEK_ID).padStart(2, '0')}/read.js" (Advanced)
4. "src/data/weeks_easy/week_${String(WEEK_ID).padStart(2, '0')}/read.js" (Easy)
5. "src/data/weeks/week_${String(WEEK_ID).padStart(2, '0')}/grammar.js" (Advanced)
6. "src/data/weeks_easy/week_${String(WEEK_ID).padStart(2, '0')}/grammar.js" (Easy)
7. "src/data/weeks/week_${String(WEEK_ID).padStart(2, '0')}/ask_ai.js" (Advanced)
8. "src/data/weeks_easy/week_${String(WEEK_ID).padStart(2, '0')}/ask_ai.js" (Easy)
9. "src/data/weeks/week_${String(WEEK_ID).padStart(2, '0')}/video_queries.json"
10. "src/data/weeks/week_${String(WEEK_ID).padStart(2, '0')}/dictation.js"
11. "src/data/weeks_easy/week_${String(WEEK_ID).padStart(2, '0')}/dictation.js"
12. "src/data/weeks/week_${String(WEEK_ID).padStart(2, '0')}/word_match.js"
13. "src/data/weeks/week_${String(WEEK_ID).padStart(2, '0')}/writing.js"
14. "src/data/weeks/week_${String(WEEK_ID).padStart(2, '0')}/index.js" (Strict .js imports)
15. "src/data/weeks_easy/week_${String(WEEK_ID).padStart(2, '0')}/index.js" (Strict .js imports)

CONTENT RULES:
- Vocab: pen, bag, book, desk, chair, eraser (not rubber), pencil, ruler, board, computer.
- Grammar: "It is a [noun]", "Is it a [noun]?", "Yes/No".
- Video Queries: MUST append "ESL for kids cartoon" to all queries.
`;

async function generate() {
  console.log(`🚀 STARTING MASS PRODUCTION FOR WEEK ${WEEK_ID}...`);
  try {
    const rawContent = await callAI(PROMPT_V24_2);
    console.log("📥 Parsing Response...");
    let jsonStr = rawContent.trim();
    if (jsonStr.startsWith('```json')) jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '');
    if (jsonStr.startsWith('```')) jsonStr = jsonStr.replace(/```/g, '');
    
    const files = JSON.parse(jsonStr);

    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.resolve(filePath);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      
      let fileContent = content;
      if (filePath.endsWith('.js') && typeof content === 'object') {
         fileContent = `export default ${JSON.stringify(content, null, 2)};`;
      }
      fs.writeFileSync(fullPath, fileContent);
      console.log(`  ✅ Created: ${filePath}`);
    }
    console.log("🎉 Content Generation Complete!");
  } catch (error) {
    console.error("❌ FATAL ERROR:", error.message);
  }
}

generate();
