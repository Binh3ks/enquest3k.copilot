import fs from 'fs';
import path from 'path';

function checkCaseSensitivity(dir) {
  if (!fs.existsSync(dir)) return;
  const filesOnDisk = fs.readdirSync(dir);
  console.log('\nChecking directory:', dir);
  console.log('Files on disk:', filesOnDisk);

  const jsFiles = filesOnDisk.filter(f => f.endsWith('.js'));
  jsFiles.forEach(jsFile => {
    const text = fs.readFileSync(path.join(dir, jsFile), 'utf8');
    const imports = Array.from(text.matchAll(/import\s+(?:[\s\S]*?\s+from\s+)?['"]\.\/([^'"]+)['"]/g)).map(m => m[1]);
    imports.forEach(imp => {
      const fileName = imp.endsWith('.js') ? imp : imp + '.js';
      if (!filesOnDisk.includes(fileName)) {
        console.error(`  ❌ [${jsFile}] CASE OR PATH MISMATCH: '${imp}' -> expected file '${fileName}' on disk`);
      } else {
        console.log(`  ✔ [${jsFile}] Match: '${imp}'`);
      }
    });
  });
}

checkCaseSensitivity('./src/data/weeks/week_37');
checkCaseSensitivity('./src/data/weeks_easy/week_37');
