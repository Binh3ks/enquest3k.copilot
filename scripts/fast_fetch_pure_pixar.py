#!/usr/bin/env python3
import os
import time
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor

tasks = [
  # Week 36 Covers & STEM/Social
  ("public/images/week36/read_stem_w36.jpg", "Cute 3D render of a yellow research submarine diving in a deep ocean cavern 300 metres below the surface discovering an ancient wooden treasure chest, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/read_social_w36.jpg", "Cute 3D render of Marco Polo riding a camel leading a caravan along the ancient Silk Road desert, merchant bazaar in background, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/explore_w36.jpg", "Cute 3D render of a futuristic deep-sea submersible craft exploring the Mariana Trench ocean floor with glowing deep sea creatures, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),

  # Week 36 Vocab
  ("public/images/week36/v1_submarine.jpg", "Cute 3D render of a bright yellow research submarine operating deep underwater, mechanical arm and glowing headlights, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v2_buoyancy.jpg", "Cute 3D render of a wooden toy block floating gracefully on top of clear blue water in a transparent glass container showing upward buoyant force, science lab setting, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v3_cavern.jpg", "Cute 3D render of a large underwater ocean cavern cave with glowing blue light beams and coral formations, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v4_displace.jpg", "Cute 3D render of a clear glass beaker overflowing with blue water as a metal weight is lowered inside displacing water, science experiment, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v5_artifact.jpg", "Cute 3D render of an ancient wooden treasure chest overflowing with shiny gold coins, crown, and historical relics, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v6_compass.jpg", "Cute 3D render of an ornate golden magnetic navigation compass resting on an ancient map, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v7_merchant.jpg", "Cute 3D render of a friendly ancient Silk Road merchant character wearing colorful robes holding rolls of silk and spice bags, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v8_caravan.jpg", "Cute 3D render of a camel caravan carrying trade goods marching across golden desert sand dunes under sunny blue sky, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v9_submersible.jpg", "Cute 3D render of a sleek titanium deep-sea submersible craft exploring dark ocean waters with bright headlights, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v10_trench.jpg", "Cute 3D render of a deep ocean trench floor with glowing bioluminescent deep sea fish and hydrothermal vents, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v11_pressure.jpg", "Cute 3D render of a pressure gauge dial measuring deep ocean water pressure with a red indicator needle, physics laboratory, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v12_titanium.jpg", "Cute 3D render of a shiny polished metallic titanium metal ingot bar resting on dark velvet, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v13_diplomat.jpg", "Cute 3D render of an official diplomat character in historical Venetian robes holding a golden parchment scroll in a grand palace, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v14_explorer.jpg", "Cute 3D render of a cheerful young boy explorer character wearing a backpack holding a brass telescope and map, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v15_expedition.jpg", "Cute 3D render of young explorers with backpacks hiking up a scenic mountain trail on an adventure expedition, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v16_discovery.jpg", "Cute 3D render of a magnifying glass magnifying a shiny gold coin partially buried in rich brown soil, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v17_archaeology.jpg", "Cute 3D render of an archaeologist brush and trowel tool excavating ancient golden relics from dusty ruins, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v18_surface.jpg", "Cute 3D render of calm blue ocean water surface level with gentle sunlit waves under golden sky, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v19_thruster.jpg", "Cute 3D render of a submarine underwater propeller thruster motor spinning fast with blue bubbles, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/v20_manuscript.jpg", "Cute 3D render of an ancient rolled parchment manuscript scroll with a feather quill pen on a wooden table, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),

  # Week 36 Word Power
  ("public/images/week36/wp1_archimedes.jpg", "Cute 3D render of Archimedes buoyancy law experiment with a floating wooden block in a clear glass tank of water, science lab, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/wp2_displace.jpg", "Cute 3D render of ocean water displacing into a measuring cylinder as an object lowers in, science experiment, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/wp3_buoyancy.jpg", "Cute 3D render of yellow inflatable lift bags floating a heavy wooden chest safely off seafloor to water surface, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/wp4_journey.jpg", "Cute 3D render of Marco Polo camel caravan embarking on a long journey across golden desert sand dunes, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/wp5_diplomat.jpg", "Cute 3D render of Marco Polo as an official diplomat presenting a scroll to an emperor in imperial palace, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/wp6_pressure.jpg", "Cute 3D render of a titanium submarine hull withstanding deep sea ocean pressure underwater, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/wp7_artifacts.jpg", "Cute 3D render of a golden ancient compass discovered inside a wooden chest under water, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week36/wp8_trenches.jpg", "Cute 3D render of a research submersible diving down into a deep ocean trench valley, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),

  # Week 37 Covers & STEM/Social
  ("public/images/week37/read_stem_w37.jpg", "Cute 3D render of a sports day relay race team at a stadium, runners passing a yellow baton smoothly on a red athletic track under sunny sky, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/read_social_w37.jpg", "Cute 3D render of ancient Olympic Games in Olympia Greece, athletes running and leaders declaring an Olympic peace truce with olive wreaths, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/explore_w37.jpg", "Cute 3D render of young athletes running on red dirt paths high in Iten Kenya Rift Valley mountains under sunrise, Home of Champions, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),

  # Week 37 Vocab
  ("public/images/week37/v1_athlete.jpg", "Cute 3D render of a young athlete boy tying his red sports sneakers on a red running track, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v2_relay.jpg", "Cute 3D render of a relay race runner handing off a yellow baton to his teammate on an athletic track, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v3_baton.jpg", "Cute 3D render of a bright yellow athletic sports relay baton held in a hand on a red running track, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v4_stadium.jpg", "Cute 3D render of a grand open-air sports stadium with red running tracks under sunny blue sky, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v5_momentum.jpg", "Cute 3D render of a sprinter athlete running fast with dynamic speed trails showing kinetic momentum, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v6_velocity.jpg", "Cute 3D render of a runner sprinting forward with speed arrows showing velocity motion, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v7_acceleration.jpg", "Cute 3D render of a sprinter bursting forward out of starting blocks with explosive speed acceleration, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v8_truce.jpg", "Cute 3D render of an olive branch wreath and two hands shaking in peace representing Olympic truce, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v9_nation.jpg", "Cute 3D render of a planet earth globe surrounded by colorful national flags of different nations, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v10_tradition.jpg", "Cute 3D render of a golden Olympic torch with a bright burning flame on a stone pedestal, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v11_culture.jpg", "Cute 3D render of cheerful children from different countries in traditional national costumes holding hands, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v12_unity.jpg", "Cute 3D render of diverse children holding hands around a glowing earth globe in global unity, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v13_altitude.jpg", "Cute 3D render of high green mountain peaks in Iten Kenya under morning sunrise clouds, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v14_endurance.jpg", "Cute 3D render of a marathon runner running steadily down a long dirt road through green hills showing endurance, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v15_marathon.jpg", "Cute 3D render of a large group of marathon runners competing in a race through city streets, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v16_champion.jpg", "Cute 3D render of a happy young boy athlete raising a golden victory trophy cup high as champion, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v17_seamlessly.jpg", "Cute 3D render of a close-up of a smooth, perfect baton handoff pass between two relay runners, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v18_enthusiastically.jpg", "Cute 3D render of excited stadium fans in crowds cheering, waving flags, and clapping enthusiastically, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v19_politeness.jpg", "Cute 3D render of two young rival runners smiling and shaking hands politely after a race, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/v20_peacefully.jpg", "Cute 3D render of a white dove of peace flying in blue sky over a sports stadium with colorful flags, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),

  # Week 37 Word Power
  ("public/images/week37/wp1_passed_baton.jpg", "Cute 3D render of a relay runner passing the yellow baton smoothly to his teammate in exchange zone, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/wp2_kinetic_momentum.jpg", "Cute 3D render of a runner maintaining high kinetic momentum while sprinting forward on track, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/wp3_sacred_truce.jpg", "Cute 3D render of ancient Greek leaders shaking hands under marble columns for a sacred truce, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/wp4_home_champions.jpg", "Cute 3D render of the famous welcome arch to Iten Kenya Home of Champions in green hills, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/wp5_united_peace.jpg", "Cute 3D render of international athletes from different countries standing together united in peace, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/wp6_sprinted_early.jpg", "Cute 3D render of a runner sprinting early in acceleration zone before receiving the baton, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/wp7_sat_down_with.jpg", "Cute 3D render of a young athlete sitting down with his coach reviewing race strategy on a clipboard, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
  ("public/images/week37/wp8_tired_happy.jpg", "Cute 3D render of four tired but happy relay team runners celebrating together at the finish line, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image.")
]

def is_valid(filepath):
    if not os.path.exists(filepath):
        return False
    size = os.path.getsize(filepath)
    if size < 12000:
        return False
    try:
        with open(filepath, 'rb') as f:
            header = f.read(2)
            return header == b'\xff\xd8'
    except:
        return False

def fetch_single(item_tuple):
    filepath, prompt, idx = item_tuple
    if is_valid(filepath):
        return True, filepath, "Already valid"
    
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    seed = 60000 + idx * 23
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=512&height=512&nologo=true&seed={seed}"
    
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                buf = resp.read()
                if len(buf) > 12000 and buf.startswith(b'\xff\xd8'):
                    with open(filepath, 'wb') as f:
                        f.write(buf)
                    return True, filepath, f"Saved {len(buf)} bytes"
        except Exception as e:
            pass
        time.sleep(2)
    return False, filepath, "Failed after retries"

def main():
    work_list = [(fp, p, i) for i, (fp, p) in enumerate(tasks) if not is_valid(fp)]
    print(f"🚀 {len(work_list)} / {len(tasks)} pure 3D Pixar card images need fetching...")
    
    if not work_list:
        print("🎉 ALL 62 pure 3D Pixar card images are 100% complete and valid!")
        return

    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = executor.map(fetch_single, work_list)
        for ok, fp, msg in futures:
            status = "✅" if ok else "❌"
            print(f"{status} {fp} -> {msg}")
            time.sleep(1.5)

    remaining = [fp for fp, _ in tasks if not is_valid(fp)]
    print(f"🏁 Final state: {len(remaining)} missing files.")

if __name__ == '__main__':
    main()
