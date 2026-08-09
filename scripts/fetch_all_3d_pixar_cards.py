#!/usr/bin/env python3
import os
import time
import urllib.request
import urllib.parse

tasks = [
    # Week 36 Vocab
    ("public/images/week36/v1_submarine.jpg", "3D render of a cute yellow research submarine deep underwater, Pixar style, coral reef, soft studio lighting, high resolution"),
    ("public/images/week36/v2_buoyancy.jpg", "3D render of a wooden toy boat floating on clear blue water in a glass tank showing buoyancy, Pixar style, soft lighting"),
    ("public/images/week36/v3_cavern.jpg", "3D render of a mysterious glowing deep sea underwater cavern cave, Pixar style, coral and water ripples"),
    ("public/images/week36/v4_displace.jpg", "3D render of water displacing out of a glass beaker into a cylinder, science lab, Pixar style, clean studio background"),
    ("public/images/week36/v5_artifact.jpg", "3D render of an ancient wooden treasure chest overflowing with gold coins and historical artifacts, Pixar style"),
    ("public/images/week36/v6_compass.jpg", "3D render of an ornate vintage golden navigation compass on a wooden table, Pixar style, warm lighting"),
    ("public/images/week36/v7_merchant.jpg", "3D render of a friendly ancient Silk Road merchant with colorful silk rolls and spice sacks, Pixar style"),
    ("public/images/week36/v8_caravan.jpg", "3D render of a camel caravan walking across golden desert sand dunes under sunny blue sky, Pixar style"),
    ("public/images/week36/v9_submersible.jpg", "3D render of a futuristic titanium deep-sea submersible craft underwater with bright headlights, Pixar style"),
    ("public/images/week36/v10_trench.jpg", "3D render of the deep dark ocean Mariana trench floor with bioluminescent glowing deep sea creatures, Pixar style"),
    ("public/images/week36/v11_pressure.jpg", "3D render of a physics pressure gauge measuring water pressure, science laboratory, Pixar style"),
    ("public/images/week36/v12_titanium.jpg", "3D render of a shiny polished metallic titanium metal alloy ingot block, Pixar style, soft studio lighting"),
    ("public/images/week36/v13_diplomat.jpg", "3D render of a Venetian diplomat holding an official paper scroll, imperial palace, Pixar style"),
    ("public/images/week36/v14_explorer.jpg", "3D render of a friendly young boy explorer character holding a map and telescope, Pixar style"),
    ("public/images/week36/v15_expedition.jpg", "3D render of explorers with backpacks climbing a sunny mountain trail on an expedition, Pixar style"),
    ("public/images/week36/v16_discovery.jpg", "3D render of a magnifying glass uncovering a shiny ancient gold coin in dirt, Pixar style"),
    ("public/images/week36/v17_archaeology.jpg", "3D render of an archaeologist brush and shovel excavating ancient ruins, Pixar style"),
    ("public/images/week36/v18_surface.jpg", "3D render of a calm blue ocean water surface with gentle sunlit waves, Pixar style"),
    ("public/images/week36/v19_thruster.jpg", "3D render of a submarine thruster propeller spinning underwater with blue bubbles, Pixar style"),
    ("public/images/week36/v20_manuscript.jpg", "3D render of an ancient parchment manuscript scroll with a feather quill pen, Pixar style"),

    # Week 36 Word Power
    ("public/images/week36/wp1_archimedes.jpg", "3D render of Archimedes buoyancy law experiment with a floating wooden block in a glass water tank, Pixar style"),
    ("public/images/week36/wp2_displace.jpg", "3D render of displaced ocean water pouring out of a beaker, science experiment, Pixar style"),
    ("public/images/week36/wp3_buoyancy.jpg", "3D render of yellow inflatable lift bags floating a heavy wooden box to the ocean surface, Pixar style"),
    ("public/images/week36/wp4_journey.jpg", "3D render of a camel caravan embarking on a long journey across desert sand dunes, Pixar style"),
    ("public/images/week36/wp5_diplomat.jpg", "3D render of an official diplomat shaking hands at an international court, Pixar style"),
    ("public/images/week36/wp6_pressure.jpg", "3D render of a titanium submarine hull withstanding deep sea water pressure, Pixar style"),
    ("public/images/week36/wp7_artifacts.jpg", "3D render of an ancient gold compass discovered inside a sunken wooden chest, Pixar style"),
    ("public/images/week36/wp8_trenches.jpg", "3D render of a research submersible exploring the deep Mariana trench ocean valley, Pixar style"),

    # Week 37 Vocab
    ("public/images/week37/v1_athlete.jpg", "3D render of a young athlete boy tying his sports sneakers on a red running track, Pixar style, warm studio lighting"),
    ("public/images/week37/v2_relay.jpg", "3D render of relay runners passing a yellow baton on a stadium track, Pixar style"),
    ("public/images/week37/v3_baton.jpg", "3D render of a bright yellow sports relay baton, Pixar style, soft studio lighting"),
    ("public/images/week37/v4_stadium.jpg", "3D render of a grand open-air sports stadium with a red track under sunny blue sky, Pixar style"),
    ("public/images/week37/v5_momentum.jpg", "3D render of a sprinter running fast with dynamic speed lines showing kinetic momentum, Pixar style"),
    ("public/images/week37/v6_velocity.jpg", "3D render of a runner sprinting forward with speed vectors showing velocity physics, Pixar style"),
    ("public/images/week37/v7_acceleration.jpg", "3D render of a sprinter bursting forward out of starting blocks, acceleration science, Pixar style"),
    ("public/images/week37/v8_truce.jpg", "3D render of an olive branch wreath and shaking hands representing peace truce, Pixar style"),
    ("public/images/week37/v9_nation.jpg", "3D render of a planet earth globe surrounded by colorful national flags, Pixar style"),
    ("public/images/week37/v10_tradition.jpg", "3D render of a golden Olympic torch with burning flame on a stone pedestal, Pixar style"),
    ("public/images/week37/v11_culture.jpg", "3D render of friendly children in colorful traditional costumes holding hands, Pixar style"),
    ("public/images/week37/v12_unity.jpg", "3D render of diverse children holding hands around a glowing earth globe in unity, Pixar style"),
    ("public/images/week37/v13_altitude.jpg", "3D render of high green mountain peaks in Rift Valley Kenya under morning sky, Pixar style"),
    ("public/images/week37/v14_endurance.jpg", "3D render of a marathon runner running steadily on a long red dirt road, Pixar style"),
    ("public/images/week37/v15_marathon.jpg", "3D render of a group of runners competing in a marathon race, Pixar style"),
    ("public/images/week37/v16_champion.jpg", "3D render of a happy young athlete holding up a golden victory trophy cup, Pixar style"),
    ("public/images/week37/v17_seamlessly.jpg", "3D render of a smooth, perfect relay baton pass between two runners, Pixar style"),
    ("public/images/week37/v18_enthusiastically.jpg", "3D render of excited stadium fans cheering and clapping enthusiastically, Pixar style"),
    ("public/images/week37/v19_politeness.jpg", "3D render of two young rival athletes smiling and shaking hands politely, Pixar style"),
    ("public/images/week37/v20_peacefully.jpg", "3D render of a white dove of peace flying over a sports stadium, Pixar style"),

    # Week 37 Word Power
    ("public/images/week37/wp1_passed_baton.jpg", "3D render of a relay runner passing the baton smoothly to his teammate, Pixar style"),
    ("public/images/week37/wp2_kinetic_momentum.jpg", "3D render of a sprinter maintaining forward kinetic momentum on a running track, Pixar style"),
    ("public/images/week37/wp3_sacred_truce.jpg", "3D render of ancient leaders shaking hands under marble columns for a sacred truce, Pixar style"),
    ("public/images/week37/wp4_home_champions.jpg", "3D render of a welcome arch to Iten Kenya Home of Champions in green hills, Pixar style"),
    ("public/images/week37/wp5_united_peace.jpg", "3D render of international athletes standing together united in peace with national flags, Pixar style"),
    ("public/images/week37/wp6_sprinted_early.jpg", "3D render of a runner sprinting early in the acceleration zone before baton pass, Pixar style"),
    ("public/images/week37/wp7_sat_down_with.jpg", "3D render of a young athlete sitting down with his coach reviewing race strategy, Pixar style"),
    ("public/images/week37/wp8_tired_happy.jpg", "3D render of four happy exhausted relay runners celebrating at the finish line, Pixar style")
]

def download_image(filepath, prompt, retries=3):
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=512&height=512&nologo=true"
    
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    for attempt in range(retries):
        try:
            req = urllib.request.Request(
                url,
                headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
                if len(data) > 5000 and data.startswith(b'\xff\xd8'): # Valid JPEG signature
                    with open(filepath, 'wb') as f:
                        f.write(data)
                    print(f"✅ Saved ({len(data)} bytes) -> {filepath}")
                    return True
                else:
                    print(f"⚠️ Invalid JPEG response ({len(data)} bytes), retrying...")
        except Exception as e:
            print(f"⚠️ Attempt {attempt+1} error for {filepath}: {e}")
        time.sleep(2)
    return False

def main():
    print(f"🚀 Starting download of {len(tasks)} 3D Pixar card images...")
    success = 0
    for idx, (filepath, prompt) in enumerate(tasks):
        print(f"[{idx+1}/{len(tasks)}] Downloading {filepath}...")
        if download_image(filepath, prompt):
            success += 1
        time.sleep(2.5) # Gentle pacing to prevent rate limits
    print(f"🎉 Complete! Downloaded {success}/{len(tasks)} 3D Pixar rendered photo cards.")

if __name__ == '__main__':
    main()
