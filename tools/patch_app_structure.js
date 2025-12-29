const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// Thêm imports mới
const imports = `
import MindMapSpeaking from './modules/production/MindMapSpeaking';
import GameHub from './modules/games/GameHub';
import AITutor from './modules/ai_tutor/AITutor';
`;
content = content.replace("import ReadingExplore", imports + "import ReadingExplore");

// Cập nhật ModuleComponents
content = content.replace(
  "self_regulation: SelfRegulation", 
  "self_regulation: SelfRegulation,\n  mindmap_speaking: MindMapSpeaking,\n  game_hub: GameHub"
);

// Cập nhật STATIONS array - Chèn mindmap_speaking sau grammar
const newStations = `
  { key: 'grammar', icon: Hash, title_en: 'Grammar', color: 'rose' },
  { key: 'mindmap_speaking', icon: Cpu, title_en: 'Mindmap', color: 'indigo' },`;
content = content.replace("{ key: 'grammar', icon: Hash, title_en: 'Grammar', color: 'rose' },", newStations);

// Chèn game_hub cuối danh sách
const gameStation = `{ key: 'game_hub', icon: Gamepad2, title_en: 'Game Hub', color: 'amber' },\n  { key: 'self_regulation'`;
content = content.replace("{ key: 'self_regulation'", gameStation);

// Chèn AI Tutor vào layout (cuối thẻ div chính)
content = content.replace("</main>", "</main>\n      <AITutor weekData={weekData} isEasy={learningMode === 'easy'} />");

fs.writeFileSync(path, content);
console.log(" ✅ App.jsx patched successfully with new modules.");
