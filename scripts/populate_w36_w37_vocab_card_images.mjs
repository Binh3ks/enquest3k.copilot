import fs from 'fs';
import path from 'path';

// Generate clean vector card illustrations for W36 and W37 vocab words AND word power collocations
const w36Vocab = [
  { word: "submarine", file: "v1_submarine.jpg", color: "#0284c7", icon: "🚢", text: "SUBMARINE" },
  { word: "buoyancy", file: "v2_buoyancy.jpg", color: "#38bdf8", icon: "⚖️", text: "BUOYANCY" },
  { word: "cavern", file: "v3_cavern.jpg", color: "#1e293b", icon: "🦇", text: "CAVERN" },
  { word: "displace", file: "v4_displace.jpg", color: "#06b6d4", icon: "🌊", text: "DISPLACE" },
  { word: "artifact", file: "v5_artifact.jpg", color: "#d97706", icon: "🏆", text: "ARTIFACT" },
  { word: "compass", file: "v6_compass.jpg", color: "#eab308", icon: "🧭", text: "COMPASS" },
  { word: "merchant", file: "v7_merchant.jpg", color: "#b45309", icon: "🐫", text: "MERCHANT" },
  { word: "caravan", file: "v8_caravan.jpg", color: "#f59e0b", icon: "🏜️", text: "CARAVAN" },
  { word: "submersible", file: "v9_submersible.jpg", color: "#0f766e", icon: "🤿", text: "SUBMERSIBLE" },
  { word: "trench", file: "v10_trench.jpg", color: "#0f172a", icon: "🌋", text: "TRENCH" },
  { word: "pressure", file: "v11_pressure.jpg", color: "#64748b", icon: "⚙️", text: "PRESSURE" },
  { word: "titanium", file: "v12_titanium.jpg", color: "#475569", icon: "🛡️", text: "TITANIUM" },
  { word: "diplomat", file: "v13_diplomat.jpg", color: "#4338ca", icon: "📜", text: "DIPLOMAT" },
  { word: "explorer", file: "v14_explorer.jpg", color: "#15803d", icon: "🧭", text: "EXPLORER" },
  { word: "expedition", file: "v15_expedition.jpg", color: "#16a34a", icon: "🥾", text: "EXPEDITION" },
  { word: "discovery", file: "v16_discovery.jpg", color: "#ca8a04", icon: "💡", text: "DISCOVERY" },
  { word: "archaeology", file: "v17_archaeology.jpg", color: "#a16207", icon: "⛏️", text: "ARCHAEOLOGY" },
  { word: "surface", file: "v18_surface.jpg", color: "#0284c7", icon: "🌅", text: "SURFACE" },
  { word: "thruster", file: "v19_thruster.jpg", color: "#dc2626", icon: "🚀", text: "THRUSTER" },
  { word: "manuscript", file: "v20_manuscript.jpg", color: "#854d0e", icon: "📖", text: "MANUSCRIPT" }
];

const w36WordPower = [
  { word: "Apply Archimedes Principle", file: "wp1_archimedes.jpg", color: "#0284c7", icon: "⚖️", text: "ARCHIMEDES" },
  { word: "Displace Seawater", file: "wp2_displace.jpg", color: "#06b6d4", icon: "🌊", text: "DISPLACE WATER" },
  { word: "Achieve Neutral Buoyancy", file: "wp3_buoyancy.jpg", color: "#38bdf8", icon: "🎈", text: "NEUTRAL BUOYANCY" },
  { word: "Embark on a Journey", file: "wp4_journey.jpg", color: "#f59e0b", icon: "🐫", text: "EMBARK JOURNEY" },
  { word: "Serve as a Diplomat", file: "wp5_diplomat.jpg", color: "#4338ca", icon: "📜", text: "DIPLOMAT ROLE" },
  { word: "Withstand Extreme Pressure", file: "wp6_pressure.jpg", color: "#475569", icon: "🛡️", text: "HIGH PRESSURE" },
  { word: "Discover Ancient Artifacts", file: "wp7_artifacts.jpg", color: "#d97706", icon: "🏆", text: "ANCIENT ARTIFACTS" },
  { word: "Explore Deep Ocean Trenches", file: "wp8_trenches.jpg", color: "#0f172a", icon: "🌋", text: "OCEAN TRENCH" }
];

const w37Vocab = [
  { word: "athlete", file: "v1_athlete.jpg", color: "#ea580c", icon: "🏃", text: "ATHLETE" },
  { word: "relay", file: "v2_relay.jpg", color: "#ef4444", icon: "🏃‍♂️", text: "RELAY" },
  { word: "baton", file: "v3_baton.jpg", color: "#eab308", icon: "🥢", text: "BATON" },
  { word: "stadium", file: "v4_stadium.jpg", color: "#2563eb", icon: "🏟️", text: "STADIUM" },
  { word: "momentum", file: "v5_momentum.jpg", color: "#8b5cf6", icon: "⚡", text: "MOMENTUM" },
  { word: "velocity", file: "v6_velocity.jpg", color: "#06b6d4", icon: "💨", text: "VELOCITY" },
  { word: "acceleration", file: "v7_acceleration.jpg", color: "#f97316", icon: "🔥", text: "ACCELERATION" },
  { word: "truce", file: "v8_truce.jpg", color: "#10b981", icon: "🕊️", text: "TRUCE" },
  { word: "nation", file: "v9_nation.jpg", color: "#3b82f6", icon: "🌍", text: "NATION" },
  { word: "tradition", file: "v10_tradition.jpg", color: "#d97706", icon: "🕯️", text: "TRADITION" },
  { word: "culture", file: "v11_culture.jpg", color: "#ec4899", icon: "🎨", text: "CULTURE" },
  { word: "unity", file: "v12_unity.jpg", color: "#6366f1", icon: "🤝", text: "UNITY" },
  { word: "altitude", file: "v13_altitude.jpg", color: "#0284c7", icon: "🏔️", text: "ALTITUDE" },
  { word: "endurance", file: "v14_endurance.jpg", color: "#16a34a", icon: "🎽", text: "ENDURANCE" },
  { word: "marathon", file: "v15_marathon.jpg", color: "#f43f5e", icon: "🏅", text: "MARATHON" },
  { word: "champion", file: "v16_champion.jpg", color: "#eab308", icon: "🏆", text: "CHAMPION" },
  { word: "seamlessly", file: "v17_seamlessly.jpg", color: "#14b8a6", icon: "✨", text: "SEAMLESSLY" },
  { word: "enthusiastically", file: "v18_enthusiastically.jpg", color: "#f59e0b", icon: "👏", text: "ENTHUSIASTICALLY" },
  { word: "politeness", file: "v19_politeness.jpg", color: "#a855f7", icon: "🤝", text: "POLITENESS" },
  { word: "peacefully", file: "v20_peacefully.jpg", color: "#10b981", icon: "🕊️", text: "PEACEFULLY" }
];

const w37WordPower = [
  { word: "passed the baton", file: "wp1_passed_baton.jpg", color: "#eab308", icon: "🥢", text: "PASS BATON" },
  { word: "kinetic momentum", file: "wp2_kinetic_momentum.jpg", color: "#8b5cf6", icon: "⚡", text: "KINETIC MOMENTUM" },
  { word: "sacred truce", file: "wp3_sacred_truce.jpg", color: "#10b981", icon: "🕊️", text: "SACRED TRUCE" },
  { word: "Home of Champions", file: "wp4_home_champions.jpg", color: "#ea580c", icon: "🏆", text: "HOME OF CHAMPIONS" },
  { word: "united in peace", file: "wp5_united_peace.jpg", color: "#6366f1", icon: "🤝", text: "UNITED IN PEACE" },
  { word: "sprinted early", file: "wp6_sprinted_early.jpg", color: "#f97316", icon: "🔥", text: "SPRINT EARLY" },
  { word: "sat down with", file: "wp7_sat_down_with.jpg", color: "#14b8a6", icon: "💬", text: "SIT DOWN WITH" },
  { word: "were tired but happy", file: "wp8_tired_happy.jpg", color: "#f43f5e", icon: "😊", text: "TIRED BUT HAPPY" }
];

function generateSVGCard(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.color}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${item.color}" stop-opacity="0.35"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="${item.color}" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="400" height="400" rx="32" fill="url(#bg)"/>
  <rect x="20" y="20" width="360" height="360" rx="24" fill="#ffffff" fill-opacity="0.95"/>
  <circle cx="200" cy="180" r="90" fill="${item.color}" fill-opacity="0.12" filter="url(#shadow)"/>
  <text x="200" y="205" font-size="80" text-anchor="middle" dominant-baseline="central">${item.icon}</text>
  <text x="200" y="320" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900" fill="${item.color}" text-anchor="middle" letter-spacing="1.5">${item.text}</text>
</svg>`;
}

function processWeek(weekNum, list) {
  const dir = `./public/images/week${weekNum}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  for (const item of list) {
    const svgPath = path.join(dir, item.file.replace('.jpg', '.svg'));
    const jpgPath = path.join(dir, item.file);
    const svgContent = generateSVGCard(item);
    fs.writeFileSync(svgPath, svgContent, 'utf-8');
    fs.writeFileSync(jpgPath, svgContent, 'utf-8');
  }
  console.log(`✅ Generated card vector illustrations for Week ${weekNum}`);
}

processWeek(36, [...w36Vocab, ...w36WordPower]);
processWeek(37, [...w37Vocab, ...w37WordPower]);
