import fs from 'fs';
import path from 'path';

// Concurrent Node script to generate authentic 3D Pixar style rendered photos for Week 36 and Week 37
const tasks = [
  // Week 36 Vocab
  { file: "public/images/week36/v1_submarine.jpg", prompt: "3D render of a cute yellow research submarine deep underwater, Pixar style, coral reef, soft studio lighting, high resolution" },
  { file: "public/images/week36/v2_buoyancy.jpg", prompt: "3D render of a wooden toy boat floating on clear blue water in a glass tank showing buoyancy, Pixar style, soft lighting" },
  { file: "public/images/week36/v3_cavern.jpg", prompt: "3D render of a mysterious glowing deep sea underwater cavern cave, Pixar style, coral and water ripples" },
  { file: "public/images/week36/v4_displace.jpg", prompt: "3D render of water displacing out of a glass beaker into a cylinder, science lab, Pixar style, clean studio background" },
  { file: "public/images/week36/v5_artifact.jpg", prompt: "3D render of an ancient wooden treasure chest overflowing with gold coins and historical artifacts, Pixar style" },
  { file: "public/images/week36/v6_compass.jpg", prompt: "3D render of an ornate vintage golden navigation compass on a wooden table, Pixar style, warm lighting" },
  { file: "public/images/week36/v7_merchant.jpg", prompt: "3D render of a friendly ancient Silk Road merchant with colorful silk rolls and spice sacks, Pixar style" },
  { file: "public/images/week36/v8_caravan.jpg", prompt: "3D render of a camel caravan walking across golden desert sand dunes under sunny blue sky, Pixar style" },
  { file: "public/images/week36/v9_submersible.jpg", prompt: "3D render of a futuristic titanium deep-sea submersible craft underwater with bright headlights, Pixar style" },
  { file: "public/images/week36/v10_trench.jpg", prompt: "3D render of the deep dark ocean Mariana trench floor with bioluminescent glowing deep sea creatures, Pixar style" },
  { file: "public/images/week36/v11_pressure.jpg", prompt: "3D render of a physics pressure gauge measuring water pressure, science laboratory, Pixar style" },
  { file: "public/images/week36/v12_titanium.jpg", prompt: "3D render of a shiny polished metallic titanium metal alloy ingot block, Pixar style, soft studio lighting" },
  { file: "public/images/week36/v13_diplomat.jpg", prompt: "3D render of a Venetian diplomat holding an official paper scroll, imperial palace, Pixar style" },
  { file: "public/images/week36/v14_explorer.jpg", prompt: "3D render of a friendly young boy explorer character holding a map and telescope, Pixar style" },
  { file: "public/images/week36/v15_expedition.jpg", prompt: "3D render of explorers with backpacks climbing a sunny mountain trail on an expedition, Pixar style" },
  { file: "public/images/week36/v16_discovery.jpg", prompt: "3D render of a magnifying glass uncovering a shiny ancient gold coin in dirt, Pixar style" },
  { file: "public/images/week36/v17_archaeology.jpg", prompt: "3D render of an archaeologist brush and shovel excavating ancient ruins, Pixar style" },
  { file: "public/images/week36/v18_surface.jpg", prompt: "3D render of a calm blue ocean water surface with gentle sunlit waves, Pixar style" },
  { file: "public/images/week36/v19_thruster.jpg", prompt: "3D render of a submarine thruster propeller spinning underwater with blue bubbles, Pixar style" },
  { file: "public/images/week36/v20_manuscript.jpg", prompt: "3D render of an ancient parchment manuscript scroll with a feather quill pen, Pixar style" },

  // Week 36 Word Power
  { file: "public/images/week36/wp1_archimedes.jpg", prompt: "3D render of Archimedes buoyancy law experiment with a floating wooden block in a glass water tank, Pixar style" },
  { file: "public/images/week36/wp2_displace.jpg", prompt: "3D render of displaced ocean water pouring out of a beaker, science experiment, Pixar style" },
  { file: "public/images/week36/wp3_buoyancy.jpg", prompt: "3D render of yellow inflatable lift bags floating a heavy wooden box to the ocean surface, Pixar style" },
  { file: "public/images/week36/wp4_journey.jpg", prompt: "3D render of a camel caravan embarking on a long journey across desert sand dunes, Pixar style" },
  { file: "public/images/week36/wp5_diplomat.jpg", prompt: "3D render of an official diplomat shaking hands at an international court, Pixar style" },
  { file: "public/images/week36/wp6_pressure.jpg", prompt: "3D render of a titanium submarine hull withstanding deep sea water pressure, Pixar style" },
  { file: "public/images/week36/wp7_artifacts.jpg", prompt: "3D render of an ancient gold compass discovered inside a sunken wooden chest, Pixar style" },
  { file: "public/images/week36/wp8_trenches.jpg", prompt: "3D render of a research submersible exploring the deep Mariana trench ocean valley, Pixar style" },

  // Week 37 Vocab
  { file: "public/images/week37/v1_athlete.jpg", prompt: "3D render of a young athlete boy tying his sports sneakers on a red running track, Pixar style, warm studio lighting" },
  { file: "public/images/week37/v2_relay.jpg", prompt: "3D render of relay runners passing a yellow baton on a stadium track, Pixar style" },
  { file: "public/images/week37/v3_baton.jpg", prompt: "3D render of a bright yellow sports relay baton, Pixar style, soft studio lighting" },
  { file: "public/images/week37/v4_stadium.jpg", prompt: "3D render of a grand open-air sports stadium with a red track under sunny blue sky, Pixar style" },
  { file: "public/images/week37/v5_momentum.jpg", prompt: "3D render of a sprinter running fast with dynamic speed lines showing kinetic momentum, Pixar style" },
  { file: "public/images/week37/v6_velocity.jpg", prompt: "3D render of a runner sprinting forward with speed vectors showing velocity physics, Pixar style" },
  { file: "public/images/week37/v7_acceleration.jpg", prompt: "3D render of a sprinter bursting forward out of starting blocks, acceleration science, Pixar style" },
  { file: "public/images/week37/v8_truce.jpg", prompt: "3D render of an olive branch wreath and shaking hands representing peace truce, Pixar style" },
  { file: "public/images/week37/v9_nation.jpg", prompt: "3D render of a planet earth globe surrounded by colorful national flags, Pixar style" },
  { file: "public/images/week37/v10_tradition.jpg", prompt: "3D render of a golden Olympic torch with burning flame on a stone pedestal, Pixar style" },
  { file: "public/images/week37/v11_culture.jpg", prompt: "3D render of friendly children in colorful traditional costumes holding hands, Pixar style" },
  { file: "public/images/week37/v12_unity.jpg", prompt: "3D render of diverse children holding hands around a glowing earth globe in unity, Pixar style" },
  { file: "public/images/week37/v13_altitude.jpg", prompt: "3D render of high green mountain peaks in Rift Valley Kenya under morning sky, Pixar style" },
  { file: "public/images/week37/v14_endurance.jpg", prompt: "3D render of a marathon runner running steadily on a long red dirt road, Pixar style" },
  { file: "public/images/week37/v15_marathon.jpg", prompt: "3D render of a group of runners competing in a marathon race, Pixar style" },
  { file: "public/images/week37/v16_champion.jpg", prompt: "3D render of a happy young athlete holding up a golden victory trophy cup, Pixar style" },
  { file: "public/images/week37/v17_seamlessly.jpg", prompt: "3D render of a smooth, perfect relay baton pass between two runners, Pixar style" },
  { file: "public/images/week37/v18_enthusiastically.jpg", prompt: "3D render of excited stadium fans cheering and clapping enthusiastically, Pixar style" },
  { file: "public/images/week37/v19_politeness.jpg", prompt: "3D render of two young rival athletes smiling and shaking hands politely, Pixar style" },
  { file: "public/images/week37/v20_peacefully.jpg", prompt: "3D render of a white dove of peace flying over a sports stadium, Pixar style" },

  // Week 37 Word Power
  { file: "public/images/week37/wp1_passed_baton.jpg", prompt: "3D render of a relay runner passing the baton smoothly to his teammate, Pixar style" },
  { file: "public/images/week37/wp2_kinetic_momentum.jpg", prompt: "3D render of a sprinter maintaining forward kinetic momentum on a running track, Pixar style" },
  { file: "public/images/week37/wp3_sacred_truce.jpg", prompt: "3D render of ancient leaders shaking hands under marble columns for a sacred truce, Pixar style" },
  { file: "public/images/week37/wp4_home_champions.jpg", prompt: "3D render of a welcome arch to Iten Kenya Home of Champions in green hills, Pixar style" },
  { file: "public/images/week37/wp5_united_peace.jpg", prompt: "3D render of international athletes standing together united in peace with national flags, Pixar style" },
  { file: "public/images/week37/wp6_sprinted_early.jpg", prompt: "3D render of a runner sprinting early in the acceleration zone before baton pass, Pixar style" },
  { file: "public/images/week37/wp7_sat_down_with.jpg", prompt: "3D render of a young athlete sitting down with his coach reviewing race strategy, Pixar style" },
  { file: "public/images/week37/wp8_tired_happy.jpg", prompt: "3D render of four happy exhausted relay runners celebrating at the finish line, Pixar style" }
];

async function fetchImage(prompt, outputPath, index) {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${index * 1000 + 42}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`❌ [${index + 1}/${tasks.length}] Failed ${outputPath}: ${res.status}`);
      return false;
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ [${index + 1}/${tasks.length}] Saved 3D Pixar render (${buffer.length} bytes) -> ${outputPath}`);
    return true;
  } catch (err) {
    console.error(`❌ [${index + 1}/${tasks.length}] Error for ${outputPath}:`, err.message);
    return false;
  }
}

async function runConcurrent(concurrency = 6) {
  console.log(`🚀 Starting parallel generation of ${tasks.length} 3D Pixar card photos (concurrency=${concurrency})...`);
  let idx = 0;
  let completed = 0;

  async function worker() {
    while (idx < tasks.length) {
      const myIdx = idx++;
      const task = tasks[myIdx];
      const ok = await fetchImage(task.prompt, task.file, myIdx);
      if (ok) completed++;
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  console.log(`🎉 Finished! Successfully generated ${completed}/${tasks.length} 3D Pixar card photos.`);
}

runConcurrent(6);
