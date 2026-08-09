import fs from 'fs';
import path from 'path';

// Pure 3D Pixar image fetcher using standard prompt structure from Production_FINAL_DEPRECATED/IMAGE PROMPTS
const tasks = [
  // Week 36 Covers & STEM/Social
  { file: "public/images/week36/read_stem_w36.jpg", prompt: "Cute 3D render of a yellow research submarine diving in a deep ocean cavern 300 metres below the surface discovering an ancient wooden treasure chest, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/read_social_w36.jpg", prompt: "Cute 3D render of Marco Polo riding a camel leading a caravan along the ancient Silk Road desert, merchant bazaar in background, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/explore_w36.jpg", prompt: "Cute 3D render of a futuristic deep-sea submersible craft exploring the Mariana Trench ocean floor with glowing deep sea creatures, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },

  // Week 36 Vocab
  { file: "public/images/week36/v1_submarine.jpg", prompt: "Cute 3D render of a bright yellow research submarine operating deep underwater, mechanical arm and glowing headlights, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v2_buoyancy.jpg", prompt: "Cute 3D render of a wooden toy block floating gracefully on top of clear blue water in a transparent glass container showing upward buoyant force, science lab setting, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v3_cavern.jpg", prompt: "Cute 3D render of a large underwater ocean cavern cave with glowing blue light beams and coral formations, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v4_displace.jpg", prompt: "Cute 3D render of a clear glass beaker overflowing with blue water as a metal weight is lowered inside displacing water, science experiment, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v5_artifact.jpg", prompt: "Cute 3D render of an ancient wooden treasure chest overflowing with shiny gold coins, crown, and historical relics, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v6_compass.jpg", prompt: "Cute 3D render of an ornate golden magnetic navigation compass resting on an ancient map, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v7_merchant.jpg", prompt: "Cute 3D render of a friendly ancient Silk Road merchant character wearing colorful robes holding rolls of silk and spice bags, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v8_caravan.jpg", prompt: "Cute 3D render of a camel caravan carrying trade goods marching across golden desert sand dunes under sunny blue sky, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v9_submersible.jpg", prompt: "Cute 3D render of a sleek titanium deep-sea submersible craft exploring dark ocean waters with bright headlights, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v10_trench.jpg", prompt: "Cute 3D render of a deep ocean trench floor with glowing bioluminescent deep sea fish and hydrothermal vents, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v11_pressure.jpg", prompt: "Cute 3D render of a pressure gauge dial measuring deep ocean water pressure with a red indicator needle, physics laboratory, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v12_titanium.jpg", prompt: "Cute 3D render of a shiny polished metallic titanium metal ingot bar resting on dark velvet, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v13_diplomat.jpg", prompt: "Cute 3D render of an official diplomat character in historical Venetian robes holding a golden parchment scroll in a grand palace, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v14_explorer.jpg", prompt: "Cute 3D render of a cheerful young boy explorer character wearing a backpack holding a brass telescope and map, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v15_expedition.jpg", prompt: "Cute 3D render of young explorers with backpacks hiking up a sunny mountain trail on an adventure expedition, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v16_discovery.jpg", prompt: "Cute 3D render of a magnifying glass magnifying a shiny gold coin partially buried in rich brown soil, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v17_archaeology.jpg", prompt: "Cute 3D render of an archaeologist brush and trowel tool excavating ancient golden relics from dusty ruins, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v18_surface.jpg", prompt: "Cute 3D render of calm blue ocean water surface level with gentle sunlit waves under golden sky, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v19_thruster.jpg", prompt: "Cute 3D render of a submarine underwater propeller thruster motor spinning fast with blue bubbles, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/v20_manuscript.jpg", prompt: "Cute 3D render of an ancient rolled parchment manuscript scroll with a feather quill pen on a wooden table, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },

  // Week 36 Word Power
  { file: "public/images/week36/wp1_archimedes.jpg", prompt: "Cute 3D render of Archimedes buoyancy law experiment with a floating wooden block in a clear glass tank of water, science lab, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/wp2_displace.jpg", prompt: "Cute 3D render of ocean water displacing into a measuring cylinder as an object lowers in, science experiment, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/wp3_buoyancy.jpg", prompt: "Cute 3D render of yellow inflatable lift bags floating a heavy wooden chest safely off seafloor to water surface, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/wp4_journey.jpg", prompt: "Cute 3D render of Marco Polo camel caravan embarking on a long journey across golden desert sand dunes, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/wp5_diplomat.jpg", prompt: "Cute 3D render of Marco Polo as an official diplomat presenting a scroll to an emperor in imperial palace, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/wp6_pressure.jpg", prompt: "Cute 3D render of a titanium submarine hull withstanding deep sea ocean pressure underwater, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/wp7_artifacts.jpg", prompt: "Cute 3D render of a golden ancient compass discovered inside a wooden chest under water, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week36/wp8_trenches.jpg", prompt: "Cute 3D render of a research submersible diving down into a deep ocean trench valley, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },

  // Week 37 Covers & STEM/Social
  { file: "public/images/week37/read_stem_w37.jpg", prompt: "Cute 3D render of a sports day relay race team at a stadium, runners passing a yellow baton smoothly on a red athletic track under sunny sky, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/read_social_w37.jpg", prompt: "Cute 3D render of ancient Olympic Games in Olympia Greece, athletes running and leaders declaring an Olympic peace truce with olive wreaths, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/explore_w37.jpg", prompt: "Cute 3D render of young athletes running on red dirt paths high in Iten Kenya Rift Valley mountains under sunrise, Home of Champions, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },

  // Week 37 Vocab
  { file: "public/images/week37/v1_athlete.jpg", prompt: "Cute 3D render of a young athlete boy tying his red sports sneakers on a red running track, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v2_relay.jpg", prompt: "Cute 3D render of a relay race runner handing off a yellow baton to his teammate on an athletic track, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v3_baton.jpg", prompt: "Cute 3D render of a bright yellow athletic sports relay baton held in a hand on a red running track, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v4_stadium.jpg", prompt: "Cute 3D render of a grand open-air sports stadium with red running tracks under sunny blue sky, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v5_momentum.jpg", prompt: "Cute 3D render of a sprinter athlete running fast with dynamic speed trails showing kinetic momentum, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v6_velocity.jpg", prompt: "Cute 3D render of a runner sprinting forward with speed arrows showing velocity motion, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v7_acceleration.jpg", prompt: "Cute 3D render of a sprinter bursting forward out of starting blocks with explosive speed acceleration, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v8_truce.jpg", prompt: "Cute 3D render of an olive branch wreath and two hands shaking in peace representing Olympic truce, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v9_nation.jpg", prompt: "Cute 3D render of a planet earth globe surrounded by colorful national flags of different nations, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v10_tradition.jpg", prompt: "Cute 3D render of a golden Olympic torch with a bright burning flame on a stone pedestal, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v11_culture.jpg", prompt: "Cute 3D render of cheerful children from different countries in traditional national costumes holding hands, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v12_unity.jpg", prompt: "Cute 3D render of diverse children holding hands around a glowing earth globe in global unity, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v13_altitude.jpg", prompt: "Cute 3D render of high green mountain peaks in Iten Kenya under morning sunrise clouds, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v14_endurance.jpg", prompt: "Cute 3D render of a marathon runner running steadily down a long dirt road through green hills showing endurance, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v15_marathon.jpg", prompt: "Cute 3D render of a large group of marathon runners competing in a race through city streets, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v16_champion.jpg", prompt: "Cute 3D render of a happy young boy athlete raising a golden victory trophy cup high as champion, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v17_seamlessly.jpg", prompt: "Cute 3D render of a close-up of a smooth, perfect baton handoff pass between two relay runners, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v18_enthusiastically.jpg", prompt: "Cute 3D render of excited stadium fans in crowds cheering, waving flags, and clapping enthusiastically, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v19_politeness.jpg", prompt: "Cute 3D render of two young rival runners smiling and shaking hands politely after a race, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/v20_peacefully.jpg", prompt: "Cute 3D render of a white dove of peace flying in blue sky over a sports stadium with colorful flags, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },

  // Week 37 Word Power
  { file: "public/images/week37/wp1_passed_baton.jpg", prompt: "Cute 3D render of a relay runner passing the yellow baton smoothly to his teammate in exchange zone, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/wp2_kinetic_momentum.jpg", prompt: "Cute 3D render of a runner maintaining high kinetic momentum while sprinting forward on track, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/wp3_sacred_truce.jpg", prompt: "Cute 3D render of ancient Greek leaders shaking hands under marble columns for a sacred truce, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/wp4_home_champions.jpg", prompt: "Cute 3D render of the famous welcome arch to Iten Kenya Home of Champions in green hills, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/wp5_united_peace.jpg", prompt: "Cute 3D render of international athletes from different countries standing together united in peace, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/wp6_sprinted_early.jpg", prompt: "Cute 3D render of a runner sprinting early in acceleration zone before receiving the baton, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/wp7_sat_down_with.jpg", prompt: "Cute 3D render of a young athlete sitting down with his coach reviewing race strategy on a clipboard, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." },
  { file: "public/images/week37/wp8_tired_happy.jpg", prompt: "Cute 3D render of four tired but happy relay team runners celebrating together at the finish line, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image." }
];

async function fetchImage(prompt, outputPath, idx) {
  const seed = 50000 + idx * 17;
  const encoded = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&nologo=true&seed=${seed}`;
  try {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const res = await fetch(url);
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 10000 && buf[0] === 0xff && buf[1] === 0xd8) {
      fs.writeFileSync(outputPath, buf);
      console.log(`✅ [${idx + 1}/${tasks.length}] Saved (${buf.length} B) -> ${outputPath}`);
      return true;
    }
  } catch (err) {
    console.error(`Error ${outputPath}:`, err.message);
  }
  return false;
}

async function main() {
  console.log(`🚀 Fetching ${tasks.length} pure 3D Pixar character/object renders...`);
  let ok = 0;
  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i];
    const success = await fetchImage(t.prompt, t.file, i);
    if (success) ok++;
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log(`🎉 Downloaded ${ok}/${tasks.length} pure 3D Pixar images.`);
}

main();
