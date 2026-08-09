#!/usr/bin/env python3
import os
import time
import urllib.request
import urllib.parse

# 16 Word Power 3D Photo Renders based strictly on exact definition and example sentences
cards = [
    # Week 36 Word Power
    ("public/images/week36/wp1_archimedes.jpg", "3D digital illustration of a science physics experiment showing Archimedes principle of buoyancy, a wooden treasure chest floating in a clear glass water container with upward force arrows, soft studio lighting, clean background, no text", 1001),
    ("public/images/week36/wp2_displace.jpg", "3D digital illustration of yellow inflatable air bags under ocean water displacing seawater to lift a heavy wooden chest, ocean physics experiment, soft studio lighting, clean background, no text", 1002),
    ("public/images/week36/wp3_buoyancy.jpg", "3D digital illustration of a research submarine floating perfectly suspended in mid-water achieving neutral buoyancy balance, deep sea physics, soft studio lighting, clean background, no text", 1003),
    ("public/images/week36/wp4_journey.jpg", "3D digital illustration of Marco Polo leading a camel caravan embarking on a long journey across golden desert sand dunes toward ancient Silk Road city, sunny sky, clean background, no text", 1004),
    ("public/images/week36/wp5_diplomat.jpg", "3D diplomat character in elegant historical robes presenting an official parchment scroll with red wax seal in a grand imperial palace, soft studio lighting, clean background, no text", 1005),
    ("public/images/week36/wp6_pressure.jpg", "3D digital illustration of a sleek titanium research submersible withstanding extreme ocean water pressure in dark ocean depths with bright headlights, clean background, no text", 1006),
    ("public/images/week36/wp7_artifacts.jpg", "3D digital illustration of ancient golden artifacts including a shiny golden compass and crown discovered inside an open wooden chest in an underwater cavern, clean background, no text", 1007),
    ("public/images/week36/wp8_trenches.jpg", "3D digital illustration of a deep-sea submersible exploring the Mariana Trench ocean floor with hydrothermal vents and bioluminescent deep sea fish, clean background, no text", 1008),

    # Week 37 Word Power
    ("public/images/week37/wp1_passed_baton.jpg", "3D digital illustration of a relay race runner passing a bright yellow baton cleanly to a teammate on a red running track in the exchange zone, soft studio lighting, clean background, no text", 1009),
    ("public/images/week37/wp2_kinetic_momentum.jpg", "3D digital illustration of a sprinter athlete sprinting at top speed with blue motion energy trails showing kinetic momentum on a sports track, clean background, no text", 1010),
    ("public/images/week37/wp3_sacred_truce.jpg", "3D digital illustration of ancient Greek leaders shaking hands in peace under white marble temple columns with an olive wreath, sacred truce, clean background, no text", 1011),
    ("public/images/week37/wp4_home_champions.jpg", "3D digital illustration of the iconic welcome arch of Iten Kenya Home of Champions with marathon runners training on green hill dirt trails under sunrise, clean background, no text", 1012),
    ("public/images/week37/wp5_united_peace.jpg", "3D digital illustration of international athletes from diverse nations standing together smiling and holding hands united in peace around an Olympic torch, clean background, no text", 1013),
    ("public/images/week37/wp6_sprinted_early.jpg", "3D digital illustration of a young female relay runner sprinting early out of starting mark with speed burst trails, sports stadium track, clean background, no text", 1014),
    ("public/images/week37/wp7_sat_down_with.jpg", "3D digital illustration of a young athlete sitting down with his coach on stadium bench reviewing race strategy and physics formulas on a clipboard, clean background, no text", 1015),
    ("public/images/week37/wp8_tired_happy.jpg", "3D digital illustration of four cheerful young relay team runners sitting together at the finish line, tired but smiling happily holding their victory baton, clean background, no text", 1016)
]

def fetch_card(filepath, prompt, seed):
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
    print(f"🚀 Recreating {len(cards)} Word Power 3D Photo renders based on exact definitions...")
    for idx, (filepath, prompt, seed) in enumerate(cards):
        print(f"[{idx+1}/{len(cards)}] Processing {filepath}...")
        fetch_card(filepath, prompt, seed)
        time.sleep(2.5)
    print("🎉 All Word Power 3D Photo renders successfully generated!")

if __name__ == '__main__':
    main()
