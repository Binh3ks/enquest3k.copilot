import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIRS = [
    path.join(process.cwd(), 'src/data/weeks'),
    path.join(process.cwd(), 'src/data/weeks_easy')
];

console.log("🛠  Starting Data Normalization (Fixing missing .js extensions)...");

DATA_DIRS.forEach(baseDir => {
    if (!fs.existsSync(baseDir)) return;
    
    const items = fs.readdirSync(baseDir);
    items.forEach(item => {
        const fullPath = path.join(baseDir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            const indexFile = path.join(fullPath, 'index.js');
            if (fs.existsSync(indexFile)) {
                let content = fs.readFileSync(indexFile, 'utf8');
                // Regex tim cac lenh import from './abc' ma chua co .js
                const newContent = content.replace(/from\s+['"]\.\/([^'"]+)['"];/g, (match, p1) => {
                    if (p1.endsWith('.js')) return match;
                    return `from './${p1}.js';`;
                });
                
                if (content !== newContent) {
                    fs.writeFileSync(indexFile, newContent);
                    console.log(`✅ Fixed imports in: ${item}/index.js`);
                }
            }
        }
    });
});
console.log("🎉 Data normalization complete.");
