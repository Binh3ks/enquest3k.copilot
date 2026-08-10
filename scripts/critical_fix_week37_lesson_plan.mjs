// Critical Fix Script for Week 37 Lesson Plan Data & Phrase Banks
// Directly updates public/data/lessons/W37.json, public/data/lessonPlans.json, and mcp-server/data/lessons/W37.json

import fs from 'fs';
import path from 'path';

function fixW37Content(rawText) {
  let text = rawText;

  // 1. Fix Script Line: move "is" outside for [10] and [16], remove double "It It"
  text = text.replace(
    /A \[10\] ____+ because it/g,
    'A [10] ________________________________________ is special because it'
  );
  text = text.replace(
    /But \[15\] ____+ \[16\] ____+ thing\.\s*It/g,
    'But [15] ________________________________________ is [16] ________________________________________. It'
  );
  text = text.replace(/It It \[17\]/g, 'It [17]');

  // 2. Fix Phrase Bank line
  // [2]: "Next year, he" -> "Yesterday, I was"
  text = text.replace(/\[2\] \(Next year, he /g, '[2] (Yesterday, I was ');
  text = text.replace(/\[2\] \(Next year, I will /g, '[2] (Yesterday, I was ');

  // [10]: "(a small rock / a living thing / a plastic chair)"
  text = text.replace(
    /\[10\] \(small rock is \/ living thing is \/ plastic chair is\)/g,
    '[10] (a small rock / a living thing / a plastic chair)'
  );
  text = text.replace(
    /\[10\] \(small rock \/ living thing \/ plastic chair\)/g,
    '[10] (a small rock / a living thing / a plastic chair)'
  );

  // [14]: "instance, a chair" -> "example, a plant"
  text = text.replace(/instance, a chair/g, 'example, a plant');
  text = text.replace(/instance, a dog/g, 'example, a plant');

  // [16]: "(a non-living thing / a living thing / a natural object)"
  text = text.replace(
    /\[16\] \(is a non-living \/ is a very \/ is a fast\)/g,
    '[16] (a non-living thing / a living thing / a natural object)'
  );

  // 3. Fix Answer Key line if present
  text = text.replace(/\[2\] Next year, he/g, '[2] Yesterday, I was');
  text = text.replace(/\[10\] small rock is/g, '[10] a small rock');
  text = text.replace(/\[14\] instance, a chair/g, '[14] example, a plant');
  text = text.replace(/\[16\] is a non-living/g, '[16] a non-living thing');

  return text;
}

async function executeCriticalFix() {
  const root = process.cwd();
  console.log('⚡ EXECUTING CRITICAL FIX FOR WEEK 37 LESSON PLAN DATA (ALL LOCATIONS)...\n');

  const targets = [
    path.join(root, 'public/data/lessons/W37.json'),
    path.join(root, 'public/data/lessonPlans.json'),
    path.join(root, 'mcp-server/data/lessons/W37.json')
  ];

  let modifiedCount = 0;

  for (const filePath of targets) {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      const fixed = fixW37Content(raw);
      if (fixed !== raw) {
        fs.writeFileSync(filePath, fixed, 'utf8');
        console.log(`✅ Fixed Week 37 data in: ${path.relative(root, filePath)}`);
        modifiedCount++;
      } else {
        console.log(`ℹ️ No un-fixed W37 targets found in: ${path.relative(root, filePath)}`);
      }
    }
  }

  // Also clean any remaining orphaned verbs across all json files in public/data/lessons and mcp-server/data/lessons
  const dirs = [
    path.join(root, 'public/data/lessons'),
    path.join(root, 'mcp-server/data/lessons')
  ];

  for (const dir of dirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
      for (const file of files) {
        const fp = path.join(dir, file);
        const raw = fs.readFileSync(fp, 'utf8');
        const fixed = fixW37Content(raw);
        if (fixed !== raw) {
          fs.writeFileSync(fp, fixed, 'utf8');
        }
      }
    }
  }

  console.log(`\n🎉 CRITICAL FIX COMPLETED across ${modifiedCount} primary targets and all lesson repositories!`);
}

executeCriticalFix().catch(console.error);
