# 🚨 Emergency Fix: Tailwind v3 Setup

**Situation:** Nếu app bị lỗi CSS hoặc styling mất, chạy lệnh dưới để khôi phục Tailwind v3.

## Quick Fix Command

```bash
# Từ thư mục Engquest3k, chạy FIX option:
cd /Users/binhnguyen/Downloads/engquest3k_new/Engquest3k
./tools/project_manager.sh
# Chọn option: 3 (FIX)
```

Hoặc chạy trực tiếp:

```bash
cd /Users/binhnguyen/Downloads/engquest3k_new/Engquest3k

# 1. Clean install
rm -rf node_modules package-lock.json .vite

# 2. Install base dependencies
npm install

# 3. Install Tailwind v3 (KHÔNG v4)
npm install -D tailwindcss@3 postcss@8 autoprefixer@10

# 4. Update PostCSS config
cat > postcss.config.cjs <<'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF

# 5. Update src/index.css
cat > src/index.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-50 text-slate-800 antialiased;
  }
}

/* --- UI STYLES --- */
.btn-3d { transition: all 0.1s; transform: translateY(0); box-shadow: 0 4px 0 0 rgba(0,0,0,0.2); }
.btn-3d:active { transform: translateY(4px); box-shadow: 0 0 0 0 rgba(0,0,0,0.2); }
.card-3d { background-color: white; border-width: 2px; border-radius: 1rem; box-shadow: 0 6px 0 0 rgba(0,0,0,0.1); transition: all 0.3s; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.dict-popup { animation: popIn 0.2s ease-out forwards; }
@keyframes popIn { 0% { opacity: 0; transform: scale(0.9) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }

@media print {
  @page { margin: 1cm; size: A4 portrait; }
  html, body {
    height: auto !important;
    overflow: visible !important;
    background: white !important;
    color: black !important;
  }
  .screen-only { display: none !important; }
  .printable-worksheet { 
    display: block !important; 
    width: 100%;
    position: relative; 
  }
  .section-container {
    break-inside: avoid;
    margin-bottom: 1.5rem;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 1.5rem;
  }
  .force-break-before { page-break-before: always; }
}

.perspective-1000 { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
EOF

# 6. Start dev server
npm run dev
```

## Why Tailwind v3?

- ✅ **Hỗ trợ dynamic classes**: `bg-${themeColor}-500` hoạt động trong code
- ✅ **@apply directive hoạt động** trong `@layer` blocks
- ✅ **Tất cả colors, icons, styling lên ngay lập tức**
- ❌ v4 + `@tailwindcss/postcss` không hỗ trợ dynamic class generation từ template literals

## What This Script Does

1. **Cleans** node_modules, cache, lockfiles
2. **Installs** Tailwind v3 (not v4)
3. **Configures** PostCSS with standard tailwindcss plugin
4. **Corrects** src/index.css to use `@tailwind` directives
5. **Ensures** tailwind.config.js exists with safelist for dynamic colors

## After Fix

```bash
npm run dev
# App runs on http://localhost:5174
```

All styles, card colors, tab icons, and designs should be fully restored! 🎉
