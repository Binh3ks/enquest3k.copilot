#!/usr/bin/env python3
import os
import time
import urllib.request
import urllib.parse

tasks = [
    # Week 36 Vocab
    ("public/images/week36/v1_submarine.jpg", "A high-tech yellow research submarine vehicle with glowing headlights diving under deep blue ocean water near vibrant coral reefs, 3D Pixar animation style, highly detailed, 4k"),
    ("public/images/week36/v2_buoyancy.jpg", "A wooden toy boat floating gracefully on top of clear blue water inside a glass tank showing upward buoyancy force, warm lighting, 3D Pixar style, high quality"),
    ("public/images/week36/v3_cavern.jpg", "A massive glowing underwater ocean cave cavern with deep blue water, sun rays beaming down, corals and sea plants, 3D Pixar style, 4k"),
    ("public/images/week36/v4_displace.jpg", "A clear glass physics beaker overflowing with blue water as a heavy metal ball drops inside displacing water, science laboratory, 3D Pixar render"),
    ("public/images/week36/v5_artifact.jpg", "An ancient wooden pirate treasure chest overflowing with gold coins, golden crown, and ancient relics on sandy beach, 3D Pixar style"),
    ("public/images/week36/v6_compass.jpg", "An ornate shiny golden navigation compass with magnetic needle resting on a vintage world map, warm cozy lighting, 3D Pixar style"),
    ("public/images/week36/v7_merchant.jpg", "A friendly ancient Silk Road merchant character wearing colorful robes holding rolls of fine silk and bags of spices, 3D Pixar character render"),
    ("public/images/week36/v8_caravan.jpg", "A camel caravan team carrying trade goods marching across golden desert sand dunes under sunny blue sky, 3D Pixar render, high detail"),
    ("public/images/week36/v9_submersible.jpg", "A futuristic titanium deep-sea submersible craft exploring the dark ocean floor with bright headlights, 3D Pixar style"),
    ("public/images/week36/v10_trench.jpg", "A deep underwater ocean canyon trench floor with glowing bioluminescent deep sea creatures and glowing fish, 3D Pixar style"),
    ("public/images/week36/v11_pressure.jpg", "A physics pressure gauge meter dial with a red needle measuring intense underwater pressure, science lab setting, 3D Pixar render"),
    ("public/images/week36/v12_titanium.jpg", "A shiny polished silver titanium metal ingot bar resting on a dark velvet surface with metallic reflections, 3D Pixar style"),
    ("public/images/week36/v13_diplomat.jpg", "An official ambassador diplomat character in rich historical attire holding an official golden scroll in a grand marble hall, 3D Pixar render"),
    ("public/images/week36/v14_explorer.jpg", "A young boy explorer character wearing a hat and backpack holding a telescope and map, cute 3D Pixar animation style"),
    ("public/images/week36/v15_expedition.jpg", "A group of young explorers with backpacks hiking up a sunny mountain path on an adventure expedition, 3D Pixar style"),
    ("public/images/week36/v16_discovery.jpg", "A magnifying glass focusing on a shiny golden coin half buried in rich brown soil, 3D Pixar style"),
    ("public/images/week36/v17_archaeology.jpg", "An archaeologist brush and trowel tool excavating ancient golden artifacts from dusty ground, 3D Pixar style"),
    ("public/images/week36/v18_surface.jpg", "Clear blue ocean water surface level with gentle sunlit waves under golden morning sky, 3D Pixar render"),
    ("public/images/week36/v19_thruster.jpg", "A submarine thruster motor propeller spinning underwater creating a trail of blue water bubbles, 3D Pixar style"),
    ("public/images/week36/v20_manuscript.jpg", "An ancient rolled parchment manuscript scroll with a feather quill pen on a wooden table, 3D Pixar render"),

    # Week 36 Word Power
    ("public/images/week36/wp1_archimedes.jpg", "3D Pixar render of Archimedes buoyancy experiment showing a floating wooden block in a transparent glass tank of water"),
    ("public/images/week36/wp2_displace.jpg", "3D Pixar render of ocean water displacing into a measuring cylinder, science experiment"),
    ("public/images/week36/wp3_buoyancy.jpg", "3D Pixar render of inflatable lift bags floating a heavy wooden chest safely to the sea surface"),
    ("public/images/week36/wp4_journey.jpg", "3D Pixar render of Marco Polo camel caravan embarking on a long journey across desert sand dunes"),
    ("public/images/week36/wp5_diplomat.jpg", "3D Pixar render of Marco Polo as an official diplomat presenting a scroll to an emperor"),
    ("public/images/week36/wp6_pressure.jpg", "3D Pixar render of a spherical titanium submersible hull withstanding deep sea ocean pressure"),
    ("public/images/week36/wp7_artifacts.jpg", "3D Pixar render of a golden ancient compass discovered inside a wooden chest under water"),
    ("public/images/week36/wp8_trenches.jpg", "3D Pixar render of a research submersible diving down into a deep ocean trench valley"),

    # Week 37 Vocab
    ("public/images/week37/v1_athlete.jpg", "A young athlete boy tying his bright red running shoes on a red sports track, cute 3D Pixar render"),
    ("public/images/week37/v2_relay.jpg", "A relay race runner handing off a yellow baton to his teammate on a red athletic track in a sports stadium, 3D Pixar style"),
    ("public/images/week37/v3_baton.jpg", "A bright yellow athletic sports relay baton held in a hand on a red running track, 3D Pixar style"),
    ("public/images/week37/v4_stadium.jpg", "A grand open-air sports stadium with red running tracks, green grass field, under sunny blue sky, 3D Pixar style"),
    ("public/images/week37/v5_momentum.jpg", "A sprinter athlete running fast with blue energy speed trails showing kinetic momentum, 3D Pixar render"),
    ("public/images/week37/v6_velocity.jpg", "A runner sprinting forward with speed arrows showing velocity motion, 3D Pixar render"),
    ("public/images/week37/v7_acceleration.jpg", "A runner bursting forward out of starting blocks with explosive speed acceleration, 3D Pixar render"),
    ("public/images/week37/v8_truce.jpg", "An olive branch wreath and two hands shaking in peace representing Olympic truce, 3D Pixar render"),
    ("public/images/week37/v9_nation.jpg", "A planet earth globe surrounded by colorful national flags of different nations, 3D Pixar style"),
    ("public/images/week37/v10_tradition.jpg", "A golden Olympic torch with a bright burning orange flame on a stone pedestal, 3D Pixar render"),
    ("public/images/week37/v11_culture.jpg", "Cheerful children from different countries in traditional national costumes holding hands, 3D Pixar style"),
    ("public/images/week37/v12_unity.jpg", "Diverse children holding hands around a glowing earth globe in global unity, 3D Pixar style"),
    ("public/images/week37/v13_altitude.jpg", "High green mountain peaks in Iten Kenya under morning sunrise clouds, 3D Pixar style"),
    ("public/images/week37/v14_endurance.jpg", "A marathon runner running steadily down a long dirt road through green hills showing endurance, 3D Pixar render"),
    ("public/images/week37/v15_marathon.jpg", "A large group of marathon runners competing in a race through city streets, 3D Pixar style"),
    ("public/images/week37/v16_champion.jpg", "A happy young boy athlete raising a golden victory trophy cup high as champion, 3D Pixar render"),
    ("public/images/week37/v17_seamlessly.jpg", "A close-up of a smooth, perfect baton handoff pass between two relay runners, 3D Pixar style"),
    ("public/images/week37/v18_enthusiastically.jpg", "Excited stadium fans in crowds cheering, waving flags, and clapping enthusiastically, 3D Pixar style"),
    ("public/images/week37/v19_politeness.jpg", "Two young rival runners smiling and shaking hands politely after a race, 3D Pixar render"),
    ("public/images/week37/v20_peacefully.jpg", "A white dove of peace flying in blue sky over a sports stadium with colorful flags, 3D Pixar render"),

    # Week 37 Word Power
    ("public/images/week37/wp1_passed_baton.jpg", "3D Pixar render of a relay runner passing the yellow baton smoothly to his teammate in exchange zone"),
    ("public/images/week37/wp2_kinetic_momentum.jpg", "3D Pixar render of a runner maintaining high kinetic momentum while sprinting forward"),
    ("public/images/week37/wp3_sacred_truce.jpg", "3D Pixar render of ancient Greek leaders shaking hands under marble columns for a sacred truce"),
    ("public/images/week37/wp4_home_champions.jpg", "3D Pixar render of the famous welcome arch to Iten Kenya Home of Champions in green hills"),
    ("public/images/week37/wp5_united_peace.jpg", "3D Pixar render of international athletes from different countries standing together united in peace"),
    ("public/images/week37/wp6_sprinted_early.jpg", "3D Pixar render of a runner sprinting early in acceleration zone before receiving the baton"),
    ("public/images/week37/wp7_sat_down_with.jpg", "3D Pixar render of a young athlete sitting down with his coach reviewing race strategy on a clipboard"),
    ("public/images/week37/wp8_tired_happy.jpg", "3D Pixar render of four tired but happy relay team runners celebrating together at the finish line")
]

def is_valid(filepath):
    if not os.path.exists(filepath):
        return False
    size = os.path.getsize(filepath)
    if size < 10000: # If less than 10KB it might be partial or error JSON
        return False
    try:
        with open(filepath, 'rb') as f:
            header = f.read(2)
            return header == b'\xff\xd8' # Valid JPEG header
    except:
        return False

def download_file(filepath, prompt, seed):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=512&height=512&nologo=true&seed={seed}"
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
                if len(data) > 10000 and data.startswith(b'\xff\xd8'):
                    with open(filepath, 'wb') as f:
                        f.write(data)
                    print(f"✅ Downloaded ({len(data)} bytes) -> {filepath}")
                    return True
        except Exception as e:
            print(f"⚠️ Attempt {attempt+1} failed for {filepath}: {e}")
        time.sleep(3)
    return False

def main():
    missing_tasks = [(fp, p, i) for i, (fp, p) in enumerate(tasks) if not is_valid(fp)]
    print(f"🔍 Found {len(missing_tasks)} / {len(tasks)} missing or incomplete card images.")
    
    if not missing_tasks:
        print("🎉 ALL 56 3D Pixar card images are 100% complete and valid!")
        return

    for idx, (filepath, prompt, orig_idx) in enumerate(missing_tasks):
        print(f"[{idx+1}/{len(missing_tasks)}] Filling {filepath}...")
        download_file(filepath, prompt, seed=7777 + orig_idx * 13)
        time.sleep(4) # 4s pacing to guarantee no 429 rate limit

    # Re-check
    remaining = [fp for fp, _ in tasks if not is_valid(fp)]
    print(f"🏁 Final check: {len(remaining)} remaining invalid files.")

if __name__ == '__main__':
    main()
