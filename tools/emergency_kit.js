const fs = require('fs');
const path = require('path');

// Định nghĩa nội dung chuẩn cho các file quan trọng
const criticalFiles = {
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EngQuest: Kids Edition</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,

    'vite.config.js': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    historyApiFallback: true,
    open: true,
  },
});`,

    'postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,

    'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',   // Indigo-500
        secondary: '#f59e0b', // Amber-500 
        success: '#22c55e',   // Green-500
        error: '#f43f5e',     // Rose-500
        background: '#f8fafc', // Slate-50
        surface: '#ffffff',
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}`
};

function checkAndFix() {
    console.log("🚑  DANG KIEM TRA SUC KHOE DU AN (HEALTH CHECK)...");
    let fixedCount = 0;
    for (const [fileName, content] of Object.entries(criticalFiles)) {
        const filePath = path.join(process.cwd(), fileName);
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  Phat hien thieu file: ${fileName}`);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅  Da tao lai: ${fileName}`);
            fixedCount++;
        } else {
            console.log(`OK: ${fileName} ton tai.`);
        }
    }
    if (fixedCount > 0) console.log(`\n🎉 DA KHOI PHUC ${fixedCount} FILE QUAN TRONG.`);
    else console.log("\n✨ Du an khoe manh.");
}
checkAndFix();
