// SMART INDEX SYSTEM - LAZY LOADING FOR SCALABILITY
// ⚡ Dynamic import: Only load weeks when needed (NOT eager)
import { weekTitles, getWeekTitle } from './metadata.js';

const advModules = import.meta.glob('./week_*/index.js');
const advModulesFlat = import.meta.glob('./week_*.js');
const easyModules = import.meta.glob('../weeks_easy/week_*.js');
const easyModulesFolder = import.meta.glob('../weeks_easy/**/index.js');

// Cache for loaded week data
const weekCache = new Map();

// Function to dynamically load a specific week
export const loadWeekData = async (weekId, isEasy = false) => {
  const cacheKey = `${weekId}_${isEasy ? 'easy' : 'adv'}`;
  
  // Check cache first
  if (weekCache.has(cacheKey)) {
    return weekCache.get(cacheKey);
  }

  const pad = String(weekId).padStart(2, '0');
  
  try {
    let data = null;
    
    if (isEasy) {
      // Try easy mode (file then folder)
      const easyPathFile = `../weeks_easy/week_${pad}.js`;
      const easyPathFolder = `../weeks_easy/week_${pad}/index.js`;
      
      if (easyModules[easyPathFile]) {
        const mod = await easyModules[easyPathFile]();
        data = mod.default || mod;
      } else if (easyModulesFolder[easyPathFolder]) {
        const mod = await easyModulesFolder[easyPathFolder]();
        data = mod.default || mod;
      }
    } else {
      // Try advanced mode (folder then flat file)
      const advPathFolder = `./week_${pad}/index.js`;
      const advPathFlat = `./week_${pad}.js`;
      
      if (advModules[advPathFolder]) {
        const mod = await advModules[advPathFolder]();
        data = mod.default || mod;
      } else if (advModulesFlat[advPathFlat]) {
        const mod = await advModulesFlat[advPathFlat]();
        data = mod.default || mod;
      }
    }
    
    // Cache the result
    if (data) {
      weekCache.set(cacheKey, data);
    }
    
    return data;
  } catch (error) {
    console.error(`[LazyLoad] Failed to load Week ${weekId} (${isEasy ? 'Easy' : 'Adv'}):`, error);
    // Auto-recover from stale browser module / CDN chunk hash mismatch
    if (typeof window !== 'undefined') {
      const reloadKey = `chunk_reload_${weekId}_${isEasy ? 'easy' : 'adv'}`;
      const lastReload = parseInt(sessionStorage.getItem(reloadKey) || '0', 10);
      if (Date.now() - lastReload > 3000) {
        sessionStorage.setItem(reloadKey, String(Date.now()));
        console.warn('[LazyLoad] Stale chunk detected. Clearing SW cache & reloading page...');
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister())).catch(() => {});
        }
        if ('caches' in window) {
          caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
        }
        setTimeout(() => {
          // Hard reload cleanly without appending trailing query params loop
          window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname;
        }, 100);
        return new Promise(() => {}); // pause execution while browser reloads
      }
    }
    return null;
  }
};

// Generate metadata list without loading full week data
const generateWeekMetadata = () => {
  const weeks = [];
  const maxWeek = 144;
  
  // Extract week IDs from file paths (without loading files)
  const advPaths = [...Object.keys(advModules), ...Object.keys(advModulesFlat)];
  const easyPaths = [...Object.keys(easyModules), ...Object.keys(easyModulesFolder)];
  
  const existingWeeks = new Set();
  advPaths.forEach(path => {
    const match = path.match(/week_(\d+)/);
    if (match) existingWeeks.add(parseInt(match[1]));
  });

  for (let i = 1; i <= maxWeek; i++) {
    const hasData = existingWeeks.has(i);
    const meta = weekTitles[i];
    
    weeks.push({
      id: i,
      title_en: meta?.title_en || (hasData ? `Week ${i}` : `Week ${i}: Coming Soon`),
      title_vi: meta?.title_vi || (hasData ? `Tuần ${i}` : `Tuần ${i}: Sắp ra mắt`),
      hasAdvanced: existingWeeks.has(i),
      hasEasy: easyPaths.some(p => p.includes(`week_${String(i).padStart(2, '0')}`)),
      // Remove data/dataEasy - load on demand only
      loadData: (isEasy) => loadWeekData(i, isEasy)
    });
  }
  
  return weeks;
};

const weekIndex = generateWeekMetadata();
export default weekIndex;
