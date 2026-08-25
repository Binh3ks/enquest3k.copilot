#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

const sceneFiles = [
  'public/images/week33/writing_panel_1.png',
  'public/images/week33/writing_panel_2.png',
  'public/images/week33/writing_panel_3.png',
  'public/images/week34/webtoon_scene_1.png',
  'public/images/week34/webtoon_scene_2.png',
  'public/images/week34/webtoon_scene_3.png',
  'public/images/week34/webtoon_scene_4.png',
  'public/images/week34/webtoon_scene_5.png',
];

sceneFiles.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${relPath}`);
    return;
  }

  // Get current dimensions
  const outW = execSync(`sips -g pixelWidth "${fullPath}"`).toString();
  const outH = execSync(`sips -g pixelHeight "${fullPath}"`).toString();
  const wMatch = outW.match(/pixelWidth:\s*(\d+)/);
  const hMatch = outH.match(/pixelHeight:\s*(\d+)/);
  if (!wMatch || !hMatch) return;

  const curW = parseInt(wMatch[1], 10);
  const curH = parseInt(hMatch[1], 10);

  // Compute 16:9 crop centered
  let targetCropW = curW;
  let targetCropH = Math.round(curW * (9 / 16));

  if (targetCropH > curH) {
    targetCropH = curH;
    targetCropW = Math.round(curH * (16 / 9));
  }

  console.log(`Processing ${relPath}: current ${curW}x${curH} -> crop to ${targetCropW}x${targetCropH} -> resample to 1152x648`);
  execSync(`sips --cropToHeightWidth ${targetCropH} ${targetCropW} "${fullPath}"`);
  execSync(`sips --resampleHeightWidth 648 1152 "${fullPath}"`);
});

console.log('✅ All story scene images converted to 1152x648 (16:9)!');
