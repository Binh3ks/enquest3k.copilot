#!/usr/bin/env python3
import os
import time
import urllib.request
import urllib.parse

# 56 Pixar 3D Flashcards for W36 & W37 following User's 3 Formula Templates (CT1, CT2, CT3)

flashcards = [
    # --- WEEK 36 NEW WORDS (20 items) ---
    # CT1: Objects / Icons
    ("public/images/week36/v1_submarine.jpg", "Cute 3D icon of a bright yellow research submarine with glowing round headlights and tiny mechanical arm, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render, high detail, sharp focus. No text", 101),
    ("public/images/week36/v2_buoyancy.jpg", "Cute 3D icon of a physics experiment with a clear glass tank of blue water showing a wooden toy block floating with an upward glowing arrow, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render, high detail. No text", 102),
    ("public/images/week36/v3_cavern.jpg", "Cute 3D illustration of a beautiful ocean cavern cave entrance with sunlit blue water beams and tiny colorful corals, Pixar animation style, vibrant bright colors, soft clean studio lighting, clean light background, 3d render. No text", 103),
    ("public/images/week36/v4_displace.jpg", "Cute 3D icon of a glass beaker overflowing with blue water as a shiny metal weight is lowered inside, ocean physics experiment, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text", 104),
    ("public/images/week36/v5_artifact.jpg", "Cute 3D icon of an ancient wooden treasure chest overflowing with shiny gold coins and a golden crown, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text", 105),
    ("public/images/week36/v6_compass.jpg", "Cute 3D icon of an ornate golden navigation compass with a glowing blue magnetic needle, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text", 106),

    # CT2: Characters
    ("public/images/week36/v7_merchant.jpg", "Cute 3D character portrait of a friendly ancient Silk Road merchant wearing colorful robes holding silk rolls, Pixar animation style, bright cheery lighting, vibrant colors, centered view, isolated on clean light background. No text", 107),

    # CT3: Actions / Concepts
    ("public/images/week36/v8_caravan.jpg", "Cute 3D illustration of a friendly camel caravan carrying colorful trade goods marching across golden desert sand dunes under sunny sky, Pixar animation style, vibrant bright colors, soft studio lighting, clean simple background. No text", 108),

    # CT1: Objects / Icons
    ("public/images/week36/v9_submersible.jpg", "Cute 3D icon of a sleek titanium deep-sea submersible craft with bright headlights, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text", 109),
    ("public/images/week36/v10_trench.jpg", "Cute 3D illustration of a deep sea ocean trench floor with glowing bioluminescent fish and hydrothermal vents, Pixar animation style, vibrant bright colors, soft clean studio lighting, clean simple background. No text", 110),
    ("public/images/week36/v11_pressure.jpg", "Cute 3D icon of a physics pressure gauge meter with a bright red indicator needle, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text", 111),
    ("public/images/week36/v12_titanium.jpg", "Cute 3D icon of a shiny metallic titanium metal ingot bar, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text", 112),

    # CT2: Characters
    ("public/images/week36/v13_diplomat.jpg", "Cute 3D character portrait of an official diplomat in colorful Venetian robes holding a golden parchment scroll, smiling friendly, Pixar animation style, bright cheery lighting, vibrant colors, centered view, isolated on clean light background. No text", 113),
    ("public/images/week36/v14_explorer.jpg", "Cute 3D character portrait of a cheerful young boy explorer wearing a backpack holding a brass telescope, Pixar animation style, bright cheery lighting, vibrant colors, centered view, isolated on clean light background. No text", 114),

    # CT3: Actions / Concepts
    ("public/images/week36/v15_expedition.jpg", "Cute 3D illustration of two young happy explorers with backpacks hiking up a sunny mountain trail, Pixar animation style, vibrant bright colors, soft studio lighting, clean simple background. No text", 115),

    # CT1: Objects / Icons
    ("public/images/week36/v16_discovery.jpg", "Cute 3D icon of a magnifying glass magnifying a shiny gold coin in soil, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text", 116),
    ("public/images/week36/v17_archaeology.jpg", "Cute 3D icon of an archaeologist trowel and brush excavating a ancient golden relic, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text", 117),
    ("public/images/week36/v18_surface.jpg", "Cute 3D illustration of calm sunlit blue ocean water surface level under golden sky, Pixar animation style, vibrant bright colors, soft clean studio lighting, clean simple background. No text", 118),
    ("public/images/week36/v19_thruster.jpg", "Cute 3D icon of a yellow submarine underwater propeller engine thruster motor with spinning brass blades and glowing water bubbles, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text", 119),
    ("public/images/week36/v20_manuscript.jpg", "Cute 3D icon of an ancient rolled parchment manuscript scroll with a feather quill pen, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text", 120),

    # --- WEEK 36 WORD POWER (8 items) ---
    ("public/images/week36/wp1_archimedes.jpg", "Cute 3D icon of a physics buoyancy experiment showing a floating wooden block in a glass water tank with upward arrows, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on solid light background, 3d render. No text", 121),
    ("public/images/week36/wp2_displace.jpg", "Cute 3D icon of yellow inflatable air bags under ocean water displacing seawater to lift a wooden chest, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on solid light background, 3d render. No text", 122),
    ("public/images/week36/wp3_buoyancy.jpg", "Cute 3D illustration of a research submarine floating suspended in mid-water achieving neutral buoyancy balance, Pixar animation style, vibrant bright colors, soft studio lighting, clean light background. No text", 123),
    ("public/images/week36/wp4_journey.jpg", "Cute 3D illustration of Marco Polo camel caravan embarking on a long journey across golden sand dunes under sunny blue sky, Pixar animation style, vibrant bright colors, soft studio lighting, clean simple background. No text", 124),
    ("public/images/week36/wp5_diplomat.jpg", "Cute 3D character portrait of an official diplomat in colorful Venetian robes presenting a parchment scroll with red wax seal, Pixar animation style, bright cheery lighting, vibrant colors, centered view, isolated on clean light background. No text", 125),
    ("public/images/week36/wp6_pressure.jpg", "Cute 3D illustration of a sleek titanium research submersible withstanding deep ocean pressure underwater with bright headlights, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 126),
    ("public/images/week36/wp7_artifacts.jpg", "Cute 3D icon of ancient golden artifacts including a golden compass and crown inside a wooden chest, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on solid light background, 3d render. No text", 127),
    ("public/images/week36/wp8_trenches.jpg", "Cute 3D illustration of a deep-sea submersible exploring Mariana Trench ocean floor with bioluminescent fish, Pixar animation style, vibrant bright colors, soft studio lighting, clean simple background. No text", 128),

    # --- WEEK 37 NEW WORDS (20 items) ---
    # CT2: Characters / Person
    ("public/images/week37/v1_athlete.jpg", "Cute 3D character portrait of a young boy athlete wearing a bright red track uniform, smiling confidently, Pixar animation style, vibrant bright colors, soft studio lighting, centered pose, clean background. No text", 129),

    # CT3: Actions / Concepts
    ("public/images/week37/v2_relay.jpg", "Cute 3D illustration of close-up hands passing a bright yellow baton in a relay race, Pixar animation style, vibrant bright colors, soft studio lighting, simple clean background. No text", 130),

    # CT1: Objects / Icons
    ("public/images/week37/v3_baton.jpg", "Cute 3D icon of a bright yellow metallic relay race baton, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text", 131),
    ("public/images/week37/v4_stadium.jpg", "Cute 3D illustration of a grand open-air sports stadium with red running tracks under sunny blue sky, Pixar animation style, vibrant bright colors, soft studio lighting, clean simple background. No text", 132),

    # CT3: Actions / Concepts
    ("public/images/week37/v5_momentum.jpg", "Cute 3D illustration of a sprinter running at full speed on a track with bright blue motion trails showing kinetic momentum, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 133),
    ("public/images/week37/v6_velocity.jpg", "Cute 3D illustration of a runner sprinting forward on a red track with speed indicator arrows showing velocity motion, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 134),
    ("public/images/week37/v7_acceleration.jpg", "Cute 3D illustration of a runner bursting out of starting blocks on an athletic track showing acceleration, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 135),

    # CT1: Objects / Icons
    ("public/images/week37/v8_truce.jpg", "Cute 3D icon of two friendly hands shaking warmly over a green olive branch wreath, symbol of peace truce, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on solid light background, 3d render. No text", 136),
    ("public/images/week37/v9_nation.jpg", "Cute 3D icon of a bright colorful planet Earth globe with tiny national flags popping out around it, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on clean white background, high detail. No text", 137),
    ("public/images/week37/v10_tradition.jpg", "Cute 3D icon of a golden Olympic torch with a bright glowing orange flame, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on solid light background, 3d render. No text", 138),

    # CT3: Actions / Concepts
    ("public/images/week37/v11_culture.jpg", "Cute 3D illustration of cheerful children from different countries dressed in colorful traditional clothing holding hands, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 139),
    ("public/images/week37/v12_unity.jpg", "Cute 3D illustration of diverse happy children holding hands in a circle around a bright earth globe, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 140),

    # CT1: Objects / Icons
    ("public/images/week37/v13_altitude.jpg", "Cute 3D illustration of high green mountain peaks in Iten Kenya under morning sunrise clouds showing high altitude, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 141),

    # CT3: Actions / Concepts
    ("public/images/week37/v14_endurance.jpg", "Cute 3D illustration of a marathon runner running steadily along a dirt road through green hills showing endurance, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 142),
    ("public/images/week37/v15_marathon.jpg", "Cute 3D illustration of a large group of marathon runners competing in a city street race, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 143),

    # CT2: Characters / Person
    ("public/images/week37/v16_champion.jpg", "Cute 3D character portrait of a happy young boy athlete raising a shiny golden victory trophy cup high as champion, Pixar animation style, bright cheery lighting, vibrant colors, centered view, isolated on clean light background. No text", 144),

    # CT3: Actions / Concepts
    ("public/images/week37/v17_seamlessly.jpg", "Cute 3D illustration of two runners passing a bright yellow baton smoothly without stopping, Pixar animation style, vibrant bright colors, soft studio lighting, clean light background. No text", 145),
    ("public/images/week37/v18_enthusiastically.jpg", "Cute 3D illustration of stadium fans in crowds cheering, waving flags, and clapping enthusiastically, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 146),
    ("public/images/week37/v19_politeness.jpg", "Cute 3D character illustration of two young rival runners smiling warmly and shaking hands with mutual respect after a race, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 147),
    ("public/images/week37/v20_peacefully.jpg", "Cute 3D illustration of a white dove of peace flying in blue sky over a sports stadium, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 148),

    # --- WEEK 37 WORD POWER (8 items) ---
    ("public/images/week37/wp1_passed_baton.jpg", "Cute 3D illustration of a runner passing a yellow baton cleanly to a teammate in exchange zone, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 149),
    ("public/images/week37/wp2_kinetic_momentum.jpg", "Cute 3D illustration of a runner sprinting at full speed on a track with bright blue motion trails showing kinetic momentum, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 150),
    ("public/images/week37/wp3_sacred_truce.jpg", "Cute 3D illustration of two Greek leaders in white robes shaking hands warmly under a marble column arch with olive wreaths, Pixar animation style, bright cheery lighting, clean background. No text", 151),
    ("public/images/week37/wp4_home_champions.jpg", "Cute 3D illustration of the iconic green welcome arch of Iten Kenya with happy runners sprinting down a sunny road under bright blue sky, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 152),
    ("public/images/week37/wp5_united_peace.jpg", "Cute 3D illustration of international athletes holding national flags together in a sunny stadium celebrating peace, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 153),
    ("public/images/week37/wp6_sprinted_early.jpg", "Cute 3D illustration of a female runner sprinting fast out of starting position on a red running track, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 154),
    ("public/images/week37/wp7_sat_down_with.jpg", "Cute 3D illustration of a young athlete sitting down on a track bench with his coach reviewing race strategy on a clipboard, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 155),
    ("public/images/week37/wp8_tired_happy.jpg", "Cute 3D illustration of four happy relay team runners sitting together at the finish line smiling and celebrating victory, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text", 156)
]

def fetch(filepath, prompt, seed):
    encoded = urllib.parse.quote(prompt + ", bright lighting, high contrast, clean white background, centered 3D render, sharp focus, 8k")
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=512&height=512&nologo=true&seed={seed}"
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=35) as resp:
                data = resp.read()
                if len(data) > 15000 and data.startswith(b'\xff\xd8'):
                    os.makedirs(os.path.dirname(filepath), exist_ok=True)
                    with open(filepath, 'wb') as f:
                        f.write(data)
                    print(f"✅ Saved 3D Pixar Flashcard ({len(data)} B) -> {filepath}")
                    return True
        except Exception as e:
            print(f"⚠️ Attempt {attempt+1} retry for {filepath}: {e}")
        time.sleep(3)
    return False

def main():
    print(f"🚀 Rebuilding {len(flashcards)} Pixar 3D Flashcards (CT1/CT2/CT3 Templates)...")
    for idx, (filepath, prompt, seed) in enumerate(flashcards):
        print(f"[{idx+1}/{len(flashcards)}] Fetching {filepath}...")
        fetch(filepath, prompt, seed)
        time.sleep(2.5)
    print("🎉 All 56 Pixar 3D Flashcards successfully rebuilt!")

if __name__ == '__main__':
    main()
