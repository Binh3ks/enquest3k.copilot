const modules = import.meta.glob('./week_*.js', { eager: true });
const weeks = [];
for (const path in modules) {
  const mod = modules[path];
  weeks.push(mod.default || mod);
}
export default weeks.sort((a, b) => a.weekId - b.weekId);
