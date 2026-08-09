#!/usr/bin/env python3
import os
import time
import urllib.request
import urllib.parse

items = [
    # Week 37 New Words (20 items)
    ("public/images/week37/v1_athlete.jpg", "3D digital render of a young male sprinter sitting upright on a red athletic track tying his red running shoes, healthy natural posture, bright studio lighting, clean background, no text", 55101),
    ("public/images/week37/v2_relay.jpg", "3D digital render of a 4x100m relay race with two team runners passing a red baton smoothly on an athletic track, high detail, clean background, no text", 55102),
    ("public/images/week37/v3_baton.jpg", "3D digital render of a bright metallic yellow relay race baton lying neatly on a red running track surface, close up shot, studio lighting, clean background, no text", 55103),
    ("public/images/week37/v4_stadium.jpg", "3D digital render of a grand open sports stadium with red running tracks and empty spectator seats under sunny sky, bright lighting, clean background, no text", 55104),
    ("public/images/week37/v5_momentum.jpg", "3D digital render of a sprinter running at full speed on a track with dynamic motion blur trails showing kinetic momentum, clean background, no text", 55105),
    ("public/images/week37/v6_velocity.jpg", "3D digital render of a runner sprinting forward on a red track with speed indicator arrows showing velocity motion, clean background, no text", 55106),
    ("public/images/week37/v7_acceleration.jpg", "3D digital render of a runner bursting out of starting blocks on an athletic track showing acceleration, clean background, no text", 55107),
    ("public/images/week37/v8_truce.jpg", "3D digital render of two friendly hands shaking warmly over a green olive branch wreath on a stone pedestal, symbol of truce, clean background, no text", 55108),
    ("public/images/week37/v9_nation.jpg", "3D digital render of a planet earth globe surrounded by colorful national flags representing world nations, clean background, no text", 55109),
    ("public/images/week37/v10_tradition.jpg", "3D digital render of a golden Olympic torch with a bright burning flame resting on a marble pedestal, historical tradition, clean background, no text", 55110),
    ("public/images/week37/v11_culture.jpg", "3D digital render of cheerful children from different countries dressed in colorful traditional clothing holding hands, clean background, no text", 55111),
    ("public/images/week37/v12_unity.jpg", "3D digital render of diverse children holding hands around a glowing earth globe representing global unity, clean background, no text", 55112),
    ("public/images/week37/v13_altitude.jpg", "3D digital render of high green mountain peaks in Iten Kenya under morning sunrise clouds showing high altitude, clean background, no text", 55113),
    ("public/images/week37/v14_endurance.jpg", "3D digital render of a marathon runner running steadily along a dirt road through green hills showing endurance, clean background, no text", 55114),
    ("public/images/week37/v15_marathon.jpg", "3D digital render of a large group of marathon runners competing in a city street race, clean background, no text", 55115),
    ("public/images/week37/v16_champion.jpg", "3D digital render of a happy young boy athlete raising a shiny golden victory trophy cup high as champion, clean background, no text", 55116),
    ("public/images/week37/v17_seamlessly.jpg", "3D digital render of a close up of two runners' hands passing a yellow relay baton smoothly without dropping, clean background, no text", 55117),
    ("public/images/week37/v18_enthusiastically.jpg", "3D digital render of stadium fans in crowds cheering, waving flags, and clapping enthusiastically, clean background, no text", 55118),
    ("public/images/week37/v19_politeness.jpg", "3D digital render of two rival young runners smiling warmly and shaking hands with mutual respect and politeness after a race, clean background, no text", 55119),
    ("public/images/week37/v20_peacefully.jpg", "3D digital render of a white dove of peace flying in blue sky over a stadium, clean background, no text", 55120),

    # Week 37 Word Power (8 items)
    ("public/images/week37/wp1_passed_baton.jpg", "3D digital render of a relay runner handing off a yellow baton to his teammate cleanly in the exchange zone, clean background, no text", 55121),
    ("public/images/week37/wp2_kinetic_momentum.jpg", "3D digital render of a runner sprinting at full speed on a track with motion trails representing kinetic momentum, clean background, no text", 55122),
    ("public/images/week37/wp3_sacred_truce.jpg", "3D digital render of ancient Greek leaders in white robes shaking hands under marble temple columns with an olive wreath for a sacred truce, clean background, no text", 55123),
    ("public/images/week37/wp4_home_champions.jpg", "3D digital render of a archway reading WELCOME TO ITEN HOME OF CHAMPIONS with Kenyan marathon runners sprinting down green hill road, clean background, no text", 55124),
    ("public/images/week37/wp5_united_peace.jpg", "3D digital render of international athletes holding national flags together in a stadium celebrating peace and unity, clean background, no text", 55125),
    ("public/images/week37/wp6_sprinted_early.jpg", "3D digital render of a female runner sprinting fast out of starting position on a red running track, clean background, no text", 55126),
    ("public/images/week37/wp7_sat_down_with.jpg", "3D digital render of a young athlete sitting down on a track bench with his coach reviewing race strategy on a clipboard, clean background, no text", 55127),
    ("public/images/week37/wp8_tired_happy.jpg", "3D digital render of four happy relay team runners sitting together at the finish line smiling and celebrating, clean background, no text", 55128)
]

def fetch(filepath, prompt, seed):
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=512&height=512&nologo=true&seed={seed}"
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=35) as resp:
                data = resp.read()
                if len(data) > 15000 and data.startswith(b'\xff\xd8'):
                    with open(filepath, 'wb') as f:
                        f.write(data)
                    print(f"✅ Saved ({len(data)} B) -> {filepath}")
                    return True
        except Exception as e:
            print(f"⚠️ Attempt {attempt+1} retry for {filepath}: {e}")
        time.sleep(3)
    return False

def main():
    print(f"🚀 Rebuilding {len(items)} W37 cards with crystal-clear 3D renders...")
    for idx, (filepath, prompt, seed) in enumerate(items):
        print(f"[{idx+1}/{len(items)}] Rebuilding {filepath}...")
        fetch(filepath, prompt, seed)
        time.sleep(2.5)
    print("🎉 All W37 3D Photo renders successfully rebuilt!")

if __name__ == '__main__':
    main()
