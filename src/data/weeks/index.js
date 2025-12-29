// SMART INDEX SYSTEM - AUTO GENERATED
const advModules = import.meta.glob('./week_*.js', { eager: true });
const easyModules = import.meta.glob('../weeks_easy/week_*.js', { eager: true });

const processModules = () => {
  const weeksMap = new Map();
  for (const path in advModules) {
    const mod = advModules[path];
    const data = mod.default || mod;
    if (data && data.weekId) {
      const id = data.weekId;
      const easyPath = `../weeks_easy/week_${String(id).padStart(2, '0')}.js`;
      const easyMod = easyModules[easyPath];
      const dataEasy = easyMod ? (easyMod.default || easyMod) : null;

      weeksMap.set(id, {
        id: id,
        title_en: data.weekTitle_en || `Week ${id}`,
        title_vi: data.weekTitle_vi || `Tuần ${id}`,
        data: data,
        dataEasy: dataEasy
      });
    }
  }
  return Array.from(weeksMap.values()).sort((a, b) => a.id - b.id);
};

const loadedWeeks = processModules();
const maxWeek = 144;
const existingIds = new Set(loadedWeeks.map(w => w.id));
const placeholders = [];

for (let i = 1; i <= maxWeek; i++) {
  if (!existingIds.has(i)) {
    placeholders.push({
      id: i,
      title_en: `Week ${i}: Coming Soon`,
      title_vi: `Tuần ${i}: Sắp ra mắt`,
      data: null,
      dataEasy: null
    });
  }
}

const weekIndex = [...loadedWeeks, ...placeholders].sort((a, b) => a.id - b.id);
export default weekIndex;
