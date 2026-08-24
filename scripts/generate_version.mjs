#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let commitHash = 'unknown';
let commitMsg = '';
try {
  commitHash = execSync('git rev-parse HEAD', { cwd: rootDir, encoding: 'utf8' }).trim();
  commitMsg = execSync('git log -1 --pretty=%B', { cwd: rootDir, encoding: 'utf8' }).trim().split('\n')[0];
} catch (e) {
  console.warn('Could not determine git hash:', e.message);
}

const versionData = {
  commit: commitHash,
  git_commit: commitHash,
  shortCommit: commitHash.slice(0, 8),
  message: commitMsg,
  builtAt: new Date().toISOString(),
  build_timestamp: new Date().toISOString(),
  env: process.env.NODE_ENV || 'production'
};

const publicPath = path.join(rootDir, 'public/version.json');
fs.writeFileSync(publicPath, JSON.stringify(versionData, null, 2), 'utf8');

const distPath = path.join(rootDir, 'dist/version.json');
if (fs.existsSync(path.join(rootDir, 'dist'))) {
  fs.writeFileSync(distPath, JSON.stringify(versionData, null, 2), 'utf8');
}

console.log(`✅ Version stamp generated: ${commitHash.slice(0, 8)} (${versionData.builtAt})`);
