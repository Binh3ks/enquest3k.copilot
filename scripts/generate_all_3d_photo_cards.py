#!/usr/bin/env python3
import os
import time
import urllib.request
import urllib.parse

# Complete 3D Digital Photo Cards for W36 & W37 (Vocab & Word Power)
# All prompts follow standard 3D digital character/scene renders with no embedded text badges.

cards = [
    # Week 36 Word Power (8 items)
    ("public/images/week36/wp1_archimedes.jpg", "3D digital render of Archimedes buoyancy law experiment with a floating wooden block in a transparent glass water tank, science lab", 8001),
    ("public/images/week36/wp2_displace.jpg", "3D digital render of ocean water displacing into a measuring cylinder as a metal weight lowers in, physics lab experiment", 8002),
    ("public/images/week36/wp3_buoyancy.jpg", "3D digital render of yellow inflatable lift bags floating a heavy wooden chest safely off seafloor to water surface", 8003),
    ("public/images/week36/wp4_journey.jpg", "3D digital render of Marco Polo camel caravan embarking on a long journey across golden desert sand dunes", 8004),
    ("public/images/week36/wp5_diplomat.jpg", "3D digital render of Marco Polo as an official diplomat presenting a parchment scroll to an emperor in imperial palace", 8005),
    ("public/images/week36/wp6_pressure.jpg", "3D digital render of a titanium submarine hull withstanding deep sea ocean pressure underwater", 8006),
    ("public/images/week36/wp7_artifacts.jpg", "3D digital render of a golden ancient navigation compass discovered inside a wooden chest underwater", 8007),
    ("public/images/week36/wp8_trenches.jpg", "3D digital render of a research submersible diving down into a deep ocean trench valley", 8008),

    # Week 37 New Words (20 items)
    ("public/images/week37/v1_athlete.jpg", "3D digital render of a young athlete boy tying his red sports sneakers on a red running track", 8009),
    ("public/images/week37/v2_relay.jpg", "3D digital render of a relay race runner handing off a yellow baton to his teammate on an athletic track", 8010),
    ("public/images/week37/v3_baton.jpg", "3D digital render of a bright yellow athletic sports relay baton held in a hand on a red running track", 8011),
    ("public/images/week37/v4_stadium.jpg", "3D digital render of a grand open-air sports stadium with red running tracks under sunny blue sky", 8012),
    ("public/images/week37/v5_momentum.jpg", "3D digital render of a sprinter athlete running fast with dynamic speed trails showing kinetic momentum", 8013),
    ("public/images/week37/v6_velocity.jpg", "3D digital render of a runner sprinting forward with speed arrows showing velocity motion", 8014),
    ("public/images/week37/v7_acceleration.jpg", "3D digital render of a sprinter bursting forward out of starting blocks with explosive speed acceleration", 8015),
    ("public/images/week37/v8_truce.jpg", "3D digital render of an olive branch wreath and two hands shaking in peace representing Olympic truce", 8016),
    ("public/images/week37/v9_nation.jpg", "3D digital render of a planet earth globe surrounded by colorful national flags of different nations", 8017),
    ("public/images/week37/v10_tradition.jpg", "3D digital render of a golden Olympic torch with a bright burning flame on a stone pedestal", 8018),
    ("public/images/week37/v11_culture.jpg", "3D digital render of cheerful children from different countries in traditional national costumes holding hands", 8019),
    ("public/images/week37/v12_unity.jpg", "3D digital render of diverse children holding hands around a glowing earth globe in global unity", 8020),
    ("public/images/week37/v13_altitude.jpg", "3D digital render of high green mountain peaks in Iten Kenya under morning sunrise clouds", 8021),
    ("public/images/week37/v14_endurance.jpg", "3D digital render of a marathon runner running steadily down a long dirt road through green hills showing endurance", 8022),
    ("public/images/week37/v15_marathon.jpg", "3D digital render of a large group of marathon runners competing in a race through city streets", 8023),
    ("public/images/week37/v16_champion.jpg", "3D digital render of a happy young boy athlete raising a golden victory trophy cup high as champion", 8024),
    ("public/images/week37/v17_seamlessly.jpg", "3D digital render of a close-up of a smooth, perfect baton handoff pass between two relay runners", 8025),
    ("public/images/week37/v18_enthusiastically.jpg", "3D digital render of excited stadium fans in crowds cheering, waving flags, and clapping enthusiastically", 8026),
    ("public/images/week37/v19_politeness.jpg", "3D digital render of two young rival runners smiling and shaking hands politely after a race", 8027),
    ("public/images/week37/v20_peacefully.jpg", "3D digital render of a white dove of peace flying in blue sky over a sports stadium with colorful flags", 8028),

    # Week 37 Word Power (8 items)
    ("public/images/week37/wp1_passed_baton.jpg", "3D digital render of a relay runner passing the yellow baton smoothly to his teammate in exchange zone", 8029),
    ("public/images/week37/wp2_kinetic_momentum.jpg", "3D digital render of a runner maintaining high kinetic momentum while sprinting forward on track", 8030),
    ("public/images/week37/wp3_sacred_truce.jpg", "3D digital render of ancient Greek leaders shaking hands under marble columns for a sacred truce", 8031),
    ("public/images/week37/wp4_home_champions.jpg", "3D digital render of the famous welcome arch to Iten Kenya Home of Champions in green hills", 8032),
    ("public/images/week37/wp5_united_peace.jpg", "3D digital render of international athletes from different countries standing together united in peace", 8033),
    ("public/images/week37/wp6_sprinted_early.jpg", "3D digital render of a runner sprinting early in acceleration zone before receiving the baton", 8034),
    ("public/images/week37/wp7_sat_down_with.jpg", "3D digital render of a young athlete sitting down with his coach reviewing race strategy on a clipboard", 8035),
    ("public/images/week37/wp8_tired_happy.jpg", "3D digital render of four tired but happy relay team runners celebrating together at the finish line", 8036)
]

def fetch_card(filepath, prompt, seed):
    encoded = urllib.parse.quote(prompt + ", soft studio lighting, vibrant colors, clean background, no text")
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=512&height=512&nologo=true&seed={seed}"
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                buf = resp.read()
                if len(buf) > 15000 and buf.startswith(b'\xff\xd8'):
                    with open(filepath, 'wb') as f:
                        f.write(buf)
                    print(f"✅ Saved 3D Photo Render ({len(buf)} B) -> {filepath}")
                    return True
        except Exception as e:
            print(f"⚠️ Attempt {attempt+1} retry for {filepath}: {e}")
        time.sleep(2)
    return False

def main():
    print(f"🚀 Generating {len(cards)} 3D Digital Photo renders for Word Power & W37 New Words...")
    ok = 0
    for idx, (filepath, prompt, seed) in enumerate(cards):
        print(f"[{idx+1}/{len(cards)}] Fetching {filepath}...")
        if fetch_card(filepath, prompt, seed):
            ok += 1
        time.sleep(2)
    print(f"🎉 Complete! Successfully generated {ok}/{len(cards)} 3D photo cards.")

if __name__ == '__main__':
    main()
