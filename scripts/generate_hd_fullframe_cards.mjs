import fs from 'fs';
import path from 'path';

// HD Full-Frame Card Illustration Generator for Week 36 and Week 37
const w36Cards = [
  // Vocab
  { file: "v1_submarine.jpg", word: "Submarine", def: "Research vessel deep underwater", theme: "ocean", bg1: "#0284c7", bg2: "#0f172a", icon: "🚢", detail: "DEEP OCEAN SUBMARINE" },
  { file: "v2_buoyancy.jpg", word: "Buoyancy", def: "Upward fluid force lifting objects", theme: "ocean", bg1: "#0ea5e9", bg2: "#0369a1", icon: "⚖️", detail: "UPWARD BUOYANT FORCE" },
  { file: "v3_cavern.jpg", word: "Cavern", def: "Large underwater ocean cave", theme: "ocean", bg1: "#1e1b4b", bg2: "#312e81", icon: "🌌", textCol: "#c7d2fe", detail: "MYSTERIOUS OCEAN CAVERN" },
  { file: "v4_displace.jpg", word: "Displace", def: "Water pushed out by volume", theme: "ocean", bg1: "#06b6d4", bg2: "#0e7490", icon: "🌊", detail: "WATER DISPLACEMENT" },
  { file: "v5_artifact.jpg", word: "Artifact", def: "Ancient historical relic chest", theme: "history", bg1: "#78350f", bg2: "#b45309", icon: "🏺", textCol: "#fef3c7", detail: "ANCIENT HISTORICAL RELIC" },
  { file: "v6_compass.jpg", word: "Compass", def: "Gold magnetic navigation tool", theme: "history", bg1: "#d97706", bg2: "#92400e", icon: "🧭", textCol: "#fef3c7", detail: "GOLD NAVIGATION COMPASS" },
  { file: "v7_merchant.jpg", word: "Merchant", def: "International Silk Road trader", theme: "history", bg1: "#9a3412", bg2: "#c2410c", icon: "🐫", textCol: "#ffedd5", detail: "SILK ROAD MERCHANT" },
  { file: "v8_caravan.jpg", word: "Caravan", def: "Desert camel trading team", theme: "history", bg1: "#ea580c", bg2: "#b45309", icon: "🏜️", textCol: "#ffedd5", detail: "DESERT CAMEL CARAVAN" },
  { file: "v9_submersible.jpg", word: "Submersible", def: "Titanium deep sea craft", theme: "ocean", bg1: "#0f766e", bg2: "#134e4a", icon: "🤿", detail: "TITANIUM SUBMERSIBLE" },
  { file: "v10_trench.jpg", word: "Trench", def: "Mariana Trench ocean valley", theme: "ocean", bg1: "#09090b", bg2: "#18181b", icon: "🌋", textCol: "#e4e4e7", detail: "MARIANA DEEP TRENCH" },
  { file: "v11_pressure.jpg", word: "Pressure", def: "Immense physical deep sea force", theme: "ocean", bg1: "#3f3f46", bg2: "#18181b", icon: "⚙️", textCol: "#e4e4e7", detail: "OCEAN WATER PRESSURE" },
  { file: "v12_titanium.jpg", word: "Titanium", def: "Strong pressure resistant metal", theme: "ocean", bg1: "#52525b", bg2: "#27272a", icon: "🛡️", textCol: "#f4f4f5", detail: "STRONG TITANIUM METAL" },
  { file: "v13_diplomat.jpg", word: "Diplomat", def: "Official international envoy", theme: "history", bg1: "#4338ca", bg2: "#312e81", icon: "📜", textCol: "#e0e7ff", detail: "OFFICIAL DIPLOMAT" },
  { file: "v14_explorer.jpg", word: "Explorer", def: "Discoverer of unknown lands", theme: "history", bg1: "#15803d", bg2: "#14532d", icon: "🧭", textCol: "#dcfce7", detail: "GLOBAL EXPLORER" },
  { file: "v15_expedition.jpg", word: "Expedition", def: "Organized exploration journey", theme: "history", bg1: "#16a34a", bg2: "#15803d", icon: "🥾", textCol: "#dcfce7", detail: "EXPLORATION EXPEDITION" },
  { file: "v16_discovery.jpg", word: "Discovery", def: "Finding new historical treasure", theme: "history", bg1: "#ca8a04", bg2: "#854d0e", icon: "💡", textCol: "#fef9c3", detail: "HISTORICAL DISCOVERY" },
  { file: "v17_archaeology.jpg", word: "Archaeology", def: "Study of history via artifacts", theme: "history", bg1: "#a16207", bg2: "#713f12", icon: "⛏️", textCol: "#fef9c3", detail: "ARCHAEOLOGY DIG SITE" },
  { file: "v18_surface.jpg", word: "Surface", def: "Top ocean sea level layer", theme: "ocean", bg1: "#0284c7", bg2: "#0369a1", icon: "🌅", detail: "OCEAN WATER SURFACE" },
  { file: "v19_thruster.jpg", word: "Thruster", def: "Submarine directional engine", theme: "ocean", bg1: "#dc2626", bg2: "#991b1b", icon: "🚀", textCol: "#fee2e2", detail: "SUBMARINE THRUSTER" },
  { file: "v20_manuscript.jpg", word: "Manuscript", def: "Ancient parchment document", theme: "history", bg1: "#854d0e", bg2: "#543310", icon: "📖", textCol: "#fef9c3", detail: "ANCIENT MANUSCRIPT" },
  // Word Power
  { file: "wp1_archimedes.jpg", word: "Apply Archimedes Principle", def: "Physics fluid buoyancy law", theme: "science", bg1: "#0284c7", bg2: "#0f172a", icon: "⚖️", detail: "ARCHIMEDES PRINCIPLE" },
  { file: "wp2_displace.jpg", word: "Displace Seawater", def: "Pushing water for upward lift", theme: "science", bg1: "#06b6d4", bg2: "#0e7490", icon: "🌊", detail: "DISPLACE SEAWATER" },
  { file: "wp3_buoyancy.jpg", word: "Achieve Neutral Buoyancy", def: "Perfect floatation balance", theme: "science", bg1: "#38bdf8", bg2: "#0284c7", icon: "🎈", detail: "NEUTRAL BUOYANCY" },
  { file: "wp4_journey.jpg", word: "Embark on a Journey", def: "Start major expedition", theme: "history", bg1: "#f59e0b", bg2: "#b45309", icon: "🐫", textCol: "#fffbeb", detail: "EMBARK ON JOURNEY" },
  { file: "wp5_diplomat.jpg", word: "Serve as a Diplomat", def: "International governance role", theme: "history", bg1: "#4338ca", bg2: "#312e81", icon: "📜", textCol: "#e0e7ff", detail: "SERVE AS DIPLOMAT" },
  { file: "wp6_pressure.jpg", word: "Withstand Extreme Pressure", def: "Resist deep ocean force", theme: "science", bg1: "#475569", bg2: "#1e293b", icon: "🛡️", textCol: "#f8fafc", detail: "WITHSTAND PRESSURE" },
  { file: "wp7_artifacts.jpg", word: "Discover Ancient Artifacts", def: "Uncover historical relics", theme: "history", bg1: "#d97706", bg2: "#78350f", icon: "🏆", textCol: "#fffbeb", detail: "DISCOVER ARTIFACTS" },
  { file: "wp8_trenches.jpg", word: "Explore Deep Ocean Trenches", def: "Investigate deep sea floor", theme: "science", bg1: "#0f172a", bg2: "#020617", icon: "🌋", textCol: "#f8fafc", detail: "DEEP OCEAN TRENCHES" }
];

const w37Cards = [
  // Vocab
  { file: "v1_athlete.jpg", word: "Athlete", def: "Sports runner in training", theme: "sports", bg1: "#ea580c", bg2: "#9a3412", icon: "🏃", textCol: "#ffedd5", detail: "DEDICATED ATHLETE" },
  { file: "v2_relay.jpg", word: "Relay", def: "Team race passing baton", theme: "sports", bg1: "#dc2626", bg2: "#991b1b", icon: "🏃‍♂️", textCol: "#fee2e2", detail: "TEAM RELAY RACE" },
  { file: "v3_baton.jpg", word: "Baton", def: "Yellow relay pass stick", theme: "sports", bg1: "#eab308", bg2: "#a16207", icon: "🥢", textCol: "#fef9c3", detail: "RELAY PASS BATON" },
  { file: "v4_stadium.jpg", word: "Stadium", def: "Grand athletic sports arena", theme: "sports", bg1: "#2563eb", bg2: "#1e40af", icon: "🏟️", textCol: "#dbeafe", detail: "ATHLETIC STADIUM" },
  { file: "v5_momentum.jpg", word: "Momentum", def: "Kinetic energy of motion", theme: "sports", bg1: "#8b5cf6", bg2: "#5b21b6", icon: "⚡", textCol: "#f3e8ff", detail: "KINETIC MOMENTUM" },
  { file: "v6_velocity.jpg", word: "Velocity", def: "Speed = distance / time", theme: "sports", bg1: "#06b6d4", bg2: "#155e75", icon: "💨", textCol: "#cffaff", detail: "FORWARD VELOCITY" },
  { file: "v7_acceleration.jpg", word: "Acceleration", def: "Increase in speed over time", theme: "sports", bg1: "#f97316", bg2: "#c2410c", icon: "🔥", textCol: "#ffedd5", detail: "SMOOTH ACCELERATION" },
  { file: "v8_truce.jpg", word: "Truce", def: "Sacred peace agreement", theme: "history", bg1: "#10b981", bg2: "#065f46", icon: "🕊️", textCol: "#d1fae5", detail: "SACRED OLYMPIC TRUCE" },
  { file: "v9_nation.jpg", word: "Nation", def: "Country with own culture", theme: "history", bg1: "#3b82f6", bg2: "#1d4ed8", icon: "🌍", textCol: "#dbeafe", detail: "GLOBAL NATIONS" },
  { file: "v10_tradition.jpg", word: "Tradition", def: "Olympic torch custom", theme: "history", bg1: "#d97706", bg2: "#92400e", icon: "🕯️", textCol: "#fef3c7", detail: "HISTORIC TRADITION" },
  { file: "v11_culture.jpg", word: "Culture", def: "Global customs and heritage", theme: "history", bg1: "#ec4899", bg2: "#9d174d", icon: "🎨", textCol: "#fce7f3", detail: "CULTURAL DIVERSITY" },
  { file: "v12_unity.jpg", word: "Unity", def: "Joined as one in peace", theme: "history", bg1: "#6366f1", bg2: "#3730a3", icon: "🤝", textCol: "#e0e7ff", detail: "GLOBAL UNITY" },
  { file: "v13_altitude.jpg", word: "Altitude", def: "High Rift Valley elevation", theme: "sports", bg1: "#0284c7", bg2: "#075985", icon: "🏔️", textCol: "#e0f2fe", detail: "HIGH ALTITUDE ITEN" },
  { file: "v14_endurance.jpg", word: "Endurance", def: "Long distance stamina", theme: "sports", bg1: "#16a34a", bg2: "#14532d", icon: "🎽", textCol: "#dcfce7", detail: "MARATHON ENDURANCE" },
  { file: "v15_marathon.jpg", word: "Marathon", def: "Long distance running race", theme: "sports", bg1: "#f43f5e", bg2: "#9f1239", icon: "🏅", textCol: "#ffe4e6", detail: "GLOBAL MARATHON" },
  { file: "v16_champion.jpg", word: "Champion", def: "Top winner with trophy", theme: "sports", bg1: "#eab308", bg2: "#854d0e", icon: "🏆", textCol: "#fef9c3", detail: "HOME OF CHAMPIONS" },
  { file: "v17_seamlessly.jpg", word: "Seamlessly", def: "Smooth baton handoff pass", theme: "sports", bg1: "#14b8a6", bg2: "#115e59", icon: "✨", textCol: "#ccfbf1", detail: "SEAMLESS HANDOFF" },
  { file: "v18_enthusiastically.jpg", word: "Enthusiastically", def: "Spectators cheering loud", theme: "sports", bg1: "#f59e0b", bg2: "#92400e", icon: "👏", textCol: "#fef3c7", detail: "CHEERING FANS" },
  { file: "v19_politeness", word: "Politeness", def: "Respectful handshake", theme: "sports", bg1: "#a855f7", bg2: "#6b21a8", icon: "🤝", textCol: "#f3e8ff", detail: "RESPECT & POLITENESS" },
  { file: "v20_peacefully.jpg", word: "Peacefully", def: "United without conflict", theme: "history", bg1: "#10b981", bg2: "#047857", icon: "🕊️", textCol: "#d1fae5", detail: "UNITED PEACEFULLY" },
  // Word Power
  { file: "wp1_passed_baton.jpg", word: "Passed the Baton", def: "Smooth relay exchange", theme: "sports", bg1: "#eab308", bg2: "#854d0e", icon: "🥢", textCol: "#fef9c3", detail: "PASSED THE BATON" },
  { file: "wp2_kinetic_momentum.jpg", word: "Kinetic Momentum", def: "Motion energy of runner", theme: "sports", bg1: "#8b5cf6", bg2: "#4c1d95", icon: "⚡", textCol: "#f3e8ff", detail: "KINETIC MOMENTUM" },
  { file: "wp3_sacred_truce.jpg", word: "Sacred Truce", def: "Olympic peace agreement", theme: "history", bg1: "#10b981", bg2: "#064e3b", icon: "🕊️", textCol: "#d1fae5", detail: "SACRED OLYMPIC TRUCE" },
  { file: "wp4_home_champions.jpg", word: "Home of Champions", def: "Iten Kenya running hub", theme: "sports", bg1: "#ea580c", bg2: "#7c2d12", icon: "🏆", textCol: "#ffedd5", detail: "HOME OF CHAMPIONS" },
  { file: "wp5_united_peace.jpg", word: "United in Peace", def: "Global harmony across borders", theme: "history", bg1: "#6366f1", bg2: "#312e81", icon: "🤝", textCol: "#e0e7ff", detail: "UNITED IN PEACE" },
  { file: "wp6_sprinted_early.jpg", word: "Sprinted Early", def: "Accelerating before pass", theme: "sports", bg1: "#f97316", bg2: "#9a3412", icon: "🔥", textCol: "#ffedd5", detail: "SPRINTED EARLY" },
  { file: "wp7_sat_down_with.jpg", word: "Sat Down With", def: "Meeting coach for strategy", theme: "sports", bg1: "#14b8a6", bg2: "#0f766e", icon: "💬", textCol: "#ccfbf1", detail: "SAT DOWN WITH" },
  { file: "wp8_tired_happy.jpg", word: "Were Tired but Happy", def: "Joyful victory at finish line", theme: "sports", bg1: "#f43f5e", bg2: "#881337", icon: "😊", textCol: "#ffe4e6", detail: "TIRED BUT HAPPY" }
];

function generateHDSVGCard(item) {
  const textColor = item.textCol || "#ffffff";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.bg1}"/>
      <stop offset="100%" stop-color="${item.bg2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Full Frame Rich Background -->
  <rect width="600" height="600" fill="url(#bgGrad)"/>
  <circle cx="300" cy="240" r="220" fill="url(#glow)"/>

  <!-- Decorative Pattern Rings -->
  <circle cx="300" cy="240" r="170" fill="none" stroke="#ffffff" stroke-opacity="0.15" stroke-width="4" stroke-dasharray="12 12"/>
  <circle cx="300" cy="240" r="140" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2"/>

  <!-- Central Focal Illustration Container -->
  <circle cx="300" cy="240" r="120" fill="#ffffff" fill-opacity="0.2" filter="url(#cardShadow)"/>
  <circle cx="300" cy="240" r="105" fill="#ffffff" fill-opacity="0.95"/>

  <!-- High Definition Subject Icon -->
  <text x="300" y="265" font-size="110" text-anchor="middle" dominant-baseline="central">${item.icon}</text>

  <!-- Word Title Banner -->
  <rect x="40" y="420" width="520" height="135" rx="20" fill="#000000" fill-opacity="0.35" filter="url(#cardShadow)"/>
  <text x="300" y="465" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="900" fill="${textColor}" text-anchor="middle" letter-spacing="1">${item.word.toUpperCase()}</text>
  <text x="300" y="505" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#ffffff" fill-opacity="0.85" text-anchor="middle" letter-spacing="0.5">${item.def.toUpperCase()}</text>
  <text x="300" y="533" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="${textColor}" fill-opacity="0.9" text-anchor="middle" letter-spacing="2">${item.detail}</text>
</svg>`;
}

function processWeekCards(weekNum, list) {
  const dir = `./public/images/week${weekNum}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  for (const item of list) {
    const svgPath = path.join(dir, item.file.replace('.jpg', '.svg'));
    const jpgPath = path.join(dir, item.file);
    const svgContent = generateHDSVGCard(item);
    fs.writeFileSync(svgPath, svgContent, 'utf-8');
  }
  console.log(`✅ Generated ${list.length} HD full-frame card SVGs for Week ${weekNum}`);
}

processWeekCards(36, w36Cards);
processWeekCards(37, w37Cards);
