import fs from 'fs';
import path from 'path';

const COMPONENT_DIRS = [
  'src/components/cambridge',
  'src/components/zones',
  'src/components/common',
  'src/modules/zones',
  'src/modules/hubs',
  'src/modules/shadowing',
];

const findFiles = (dir) => {
  let r = [];
  if (!fs.existsSync(dir)) return r;
  for (const item of fs.readdirSync(dir)) {
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) r = r.concat(findFiles(p));
    else if (item.endsWith('.jsx') || item.endsWith('.js')) r.push(p);
  }
  return r;
};

const BANNED = new Set([
  'lubricant', 'lubricants', 'lubricating', 'lubrication',
  'kinetic', 'momentum', 'radiation', 'thermal', 'thermodynamic',
  'anachronism', 'anachronistic', 'mechanism', 'mechanisms',
  'predominantly', 'subsequently', 'furthermore', 'moreover', 'henceforth',
  'nevertheless', 'consequently', 'whereby', 'wherein',
  'sterile', 'prohibit', 'prohibits', 'prohibited', 'forbid', 'forbidden',
  'utilize', 'utilization', 'synthesize', 'synthesis', 'phenomenon',
  'infrastructure', 'unprecedented', 'equilibrium', 'paradigm'
]);

let totalFound = 0;
let totalStringsChecked = 0;

for (const dir of COMPONENT_DIRS) {
  for (const file of findFiles(dir)) {
    const raw = fs.readFileSync(file, 'utf-8');
    const regex = /(?:"([^"\\\n]{10,})"|'([^'\\\n]{10,})'|`([^`\\]{10,})`)/g;
    let m;
    while ((m = regex.exec(raw)) !== null) {
      const s = (m[1] || m[2] || m[3] || '').trim();
      // Only skip import paths and URLs
      if (s.startsWith('/') || s.startsWith('http') || s.startsWith('./') || s.startsWith('../')) continue;
      // Do NOT filter out 'flex' or 'grid' substrings!
      totalStringsChecked++;
      
      const words = s.toLowerCase().replace(/[^a-z\s-]/g, ' ').split(/\s+/).filter(Boolean);
      for (const w of words) {
        if (BANNED.has(w)) {
          console.log(`❌ [BANNED WORD FOUND]: '${w}' in ${file}: "${s.slice(0, 80)}"`);
          totalFound++;
        }
      }
    }
  }
}

console.log(`\nTotal strings audited: ${totalStringsChecked}`);
console.log(`Total banned words found: ${totalFound}`);
