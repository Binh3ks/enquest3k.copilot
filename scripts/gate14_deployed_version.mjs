import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log(`========================================================================`);
console.log(`🛡️  GATE 14: DEPLOYED VERSION STAMP & VERIFICATION AUDIT`);
console.log(`========================================================================`);

let errors = [];

const versionPath = path.join(rootDir, 'public', 'version.json');
if (!fs.existsSync(versionPath)) {
  errors.push(`public/version.json does not exist. Run node scripts/generate_version.mjs first.`);
} else {
  try {
    const raw = fs.readFileSync(versionPath, 'utf8');
    const data = JSON.parse(raw);
    if (!data.git_commit) errors.push(`public/version.json missing 'git_commit'`);
    if (!data.build_timestamp) errors.push(`public/version.json missing 'build_timestamp'`);
    console.log(`ℹ️  Current Local Build Version: commit ${data.git_commit} (${data.build_timestamp})`);
  } catch (e) {
    errors.push(`public/version.json is invalid JSON: ${e.message}`);
  }
}

// Check index.html for __APP_VERSION__
const indexPath = path.join(rootDir, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
if (!indexHtml.includes('__APP_VERSION__')) {
  errors.push(`index.html does not expose window.__APP_VERSION__`);
}

if (errors.length > 0) {
  console.error(`\n❌ GATE 14 FAILED with ${errors.length} errors:`);
  errors.forEach((err, idx) => console.error(`   ${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 14 PASSED: Version Stamp & Verification Engine 100% Ready!`);
  process.exit(0);
}
