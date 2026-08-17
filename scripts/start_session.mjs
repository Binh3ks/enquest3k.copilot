import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const handoffsDir = path.join(rootDir, '.agents', 'handoffs');
const latestPath = path.join(handoffsDir, 'latest_handoff.md');

function getGitInfo() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    const lastCommit = execSync('git log -n 1 --oneline', { encoding: 'utf8' }).trim();
    const status = execSync('git status --short', { encoding: 'utf8' }).trim();
    return { branch, lastCommit, status };
  } catch (err) {
    return { branch: 'unknown', lastCommit: 'none', status: 'unknown' };
  }
}

const { branch, lastCommit, status } = getGitInfo();

console.log('===================================================');
console.log('🚀 SESSION START INITIALIZATION BRIEFING');
console.log('===================================================');
console.log(`📍 Active Branch: ${branch}`);
console.log(`📌 Latest Commit: ${lastCommit}`);
console.log(`📂 Git Status: ${status ? status.split('\n').length + ' modified/untracked files' : 'Clean working tree'}`);

if (fs.existsSync(latestPath)) {
  console.log('\n📄 HANDOFF CONTEXT LOADED FROM PREVIOUS SESSION:');
  console.log('---------------------------------------------------');
  const content = fs.readFileSync(latestPath, 'utf8');
  console.log(content);
} else {
  console.log('\n⚠️ No previous handoff report found at .agents/handoffs/latest_handoff.md');
}

console.log('===================================================');
console.log('✅ READY FOR NEXT USER INSTRUCTIONS');
console.log('===================================================');
