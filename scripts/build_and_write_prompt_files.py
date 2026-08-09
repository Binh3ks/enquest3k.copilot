#!/usr/bin/env python3
import os

w36_prompts = [
    # Covers
    ("read_stem_w36.jpg", "Cute 3D render of a yellow research submarine diving in a deep ocean cavern 300 metres below the surface discovering an ancient wooden treasure chest, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
    ("read_social_w36.jpg", "Cute 3D render of Marco Polo riding a camel leading a caravan along the ancient Silk Road desert, merchant bazaar in background, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
    ("explore_w36.jpg", "Cute 3D render of a futuristic deep-sea submersible craft exploring the Mariana Trench ocean floor with glowing deep sea creatures, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),

    # New Words (CT1/CT2/CT3)
    ("v1_submarine.jpg", "Cute 3D icon of a bright yellow research submarine with glowing round headlights and tiny mechanical arm, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render, high detail, sharp focus. No text or letters in the image."),
    ("v2_buoyancy.jpg", "Cute 3D icon of a physics experiment with a clear glass tank of blue water showing a wooden toy block floating with an upward glowing arrow, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render, high detail. No text or letters in the image."),
    ("v3_cavern.jpg", "Cute 3D illustration of a beautiful ocean cavern cave entrance with sunlit blue water beams and tiny colorful corals, Pixar animation style, vibrant bright colors, soft clean studio lighting, clean light background, 3d render. No text or letters in the image."),
    ("v4_displace.jpg", "Cute 3D icon of a glass beaker overflowing with blue water as a shiny metal weight is lowered inside, ocean physics experiment, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v5_artifact.jpg", "Cute 3D icon of an ancient wooden treasure chest overflowing with shiny gold coins and a golden crown, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v6_compass.jpg", "Cute 3D icon of an ornate golden navigation compass with a glowing blue magnetic needle, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v7_merchant.jpg", "Cute 3D character portrait of a friendly ancient Silk Road merchant wearing colorful robes holding silk rolls, Pixar animation style, bright cheery lighting, vibrant colors, centered view, isolated on clean light background. No text or letters in the image."),
    ("v8_caravan.jpg", "Cute 3D illustration of a friendly camel caravan carrying colorful trade goods marching across golden desert sand dunes under sunny sky, Pixar animation style, vibrant bright colors, soft studio lighting, clean simple background. No text or letters in the image."),
    ("v9_submersible.jpg", "Cute 3D icon of a sleek titanium deep-sea submersible craft with bright headlights, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v10_trench.jpg", "Cute 3D illustration of a deep sea ocean trench floor with glowing bioluminescent fish and hydrothermal vents, Pixar animation style, vibrant bright colors, soft clean studio lighting, clean simple background. No text or letters in the image."),
    ("v11_pressure.jpg", "Cute 3D icon of a physics pressure gauge meter with a bright red indicator needle, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v12_titanium.jpg", "Cute 3D icon of a shiny metallic titanium metal ingot bar, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v13_diplomat.jpg", "Cute 3D character portrait of an official diplomat in colorful Venetian robes holding a golden parchment scroll, smiling friendly, Pixar animation style, bright cheery lighting, vibrant colors, centered view, isolated on clean light background. No text or letters in the image."),
    ("v14_explorer.jpg", "Cute 3D character portrait of a cheerful young boy explorer wearing a backpack holding a brass telescope, Pixar animation style, bright cheery lighting, vibrant colors, centered view, isolated on clean light background. No text or letters in the image."),
    ("v15_expedition.jpg", "Cute 3D illustration of two young happy explorers with backpacks hiking up a sunny mountain trail, Pixar animation style, vibrant bright colors, soft studio lighting, clean simple background. No text or letters in the image."),
    ("v16_discovery.jpg", "Cute 3D icon of a magnifying glass magnifying a shiny gold coin in soil, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v17_archaeology.jpg", "Cute 3D icon of an archaeologist trowel and brush excavating a ancient golden relic, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v18_surface.jpg", "Cute 3D illustration of calm sunlit blue ocean water surface level under golden sky, Pixar animation style, vibrant bright colors, soft clean studio lighting, clean simple background. No text or letters in the image."),
    ("v19_thruster.jpg", "Cute 3D icon of a yellow submarine underwater propeller engine thruster motor with spinning brass blades and glowing water bubbles, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v20_manuscript.jpg", "Cute 3D icon of an ancient rolled parchment manuscript scroll with a feather quill pen, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),

    # Word Power (CT1/CT2/CT3)
    ("wp1_archimedes.jpg", "Cute 3D icon of a physics buoyancy experiment showing a floating wooden block in a glass water tank with upward arrows, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("wp2_displace.jpg", "Cute 3D icon of yellow inflatable air bags under ocean water displacing seawater to lift a wooden chest, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("wp3_buoyancy.jpg", "Cute 3D illustration of a research submarine floating suspended in mid-water achieving neutral buoyancy balance, Pixar animation style, vibrant bright colors, soft studio lighting, clean light background. No text or letters in the image."),
    ("wp4_journey.jpg", "Cute 3D illustration of Marco Polo camel caravan embarking on a long journey across golden sand dunes under sunny blue sky, Pixar animation style, vibrant bright colors, soft studio lighting, clean simple background. No text or letters in the image."),
    ("wp5_diplomat.jpg", "Cute 3D character portrait of an official diplomat in colorful Venetian robes presenting a parchment scroll with red wax seal, Pixar animation style, bright cheery lighting, vibrant colors, centered view, isolated on clean light background. No text or letters in the image."),
    ("wp6_pressure.jpg", "Cute 3D illustration of a sleek titanium research submersible withstanding deep ocean pressure underwater with bright headlights, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("wp7_artifacts.jpg", "Cute 3D icon of ancient golden artifacts including a golden compass and crown inside a wooden chest, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("wp8_trenches.jpg", "Cute 3D illustration of a deep-sea submersible exploring Mariana Trench ocean floor with bioluminescent fish, Pixar animation style, vibrant bright colors, soft studio lighting, clean simple background. No text or letters in the image.")
]

w37_prompts = [
    # Covers
    ("read_stem_w37.jpg", "Cute 3D render of a sports day relay race team at a stadium, runners passing a yellow baton smoothly on a red athletic track under sunny sky, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
    ("read_social_w37.jpg", "Cute 3D render of ancient Olympic Games in Olympia Greece, athletes running and leaders declaring an Olympic peace truce with olive wreaths, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),
    ("explore_w37.jpg", "Cute 3D render of young athletes running on red dirt paths high in Iten Kenya Rift Valley mountains under sunrise, Home of Champions, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image."),

    # New Words (CT1/CT2/CT3)
    ("v1_athlete.jpg", "Cute 3D character portrait of a young boy athlete wearing a bright red track uniform, smiling confidently, Pixar animation style, vibrant bright colors, soft studio lighting, centered pose, clean background. No text or letters in the image."),
    ("v2_relay.jpg", "Cute 3D illustration of close-up hands passing a bright yellow baton in a relay race, Pixar animation style, vibrant bright colors, soft studio lighting, simple clean background. No text or letters in the image."),
    ("v3_baton.jpg", "Cute 3D icon of a bright yellow metallic relay race baton, Pixar animation style, vibrant bright colors, soft clean studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v4_stadium.jpg", "Cute 3D illustration of a grand open-air sports stadium with red running tracks under sunny blue sky, Pixar animation style, vibrant bright colors, soft studio lighting, clean simple background. No text or letters in the image."),
    ("v5_momentum.jpg", "Cute 3D illustration of a sprinter running at full speed on a track with bright blue motion trails showing kinetic momentum, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("v6_velocity.jpg", "Cute 3D illustration of a runner sprinting forward on a red track with speed indicator arrows showing velocity motion, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("v7_acceleration.jpg", "Cute 3D illustration of a runner bursting out of starting blocks on an athletic track showing acceleration, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("v8_truce.jpg", "Cute 3D icon of two friendly hands shaking warmly over a green olive branch wreath, symbol of peace truce, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v9_nation.jpg", "Cute 3D icon of a bright colorful planet Earth globe with tiny national flags popping out around it, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on clean white background, high detail. No text or letters in the image."),
    ("v10_tradition.jpg", "Cute 3D icon of a golden Olympic torch with a bright glowing orange flame, Pixar animation style, vibrant bright colors, soft studio lighting, isolated on solid light background, 3d render. No text or letters in the image."),
    ("v11_culture.jpg", "Cute 3D illustration of cheerful children from different countries dressed in colorful traditional clothing holding hands, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("v12_unity.jpg", "Cute 3D illustration of diverse happy children holding hands in a circle around a bright earth globe, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("v13_altitude.jpg", "Cute 3D illustration of high green mountain peaks in Iten Kenya under morning sunrise clouds showing high altitude, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("v14_endurance.jpg", "Cute 3D illustration of a marathon runner running steadily along a dirt road through green hills showing endurance, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("v15_marathon.jpg", "Cute 3D illustration of a large group of marathon runners competing in a city street race, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("v16_champion.jpg", "Cute 3D character portrait of a happy young boy athlete raising a shiny golden victory trophy cup high as champion, Pixar animation style, bright cheery lighting, vibrant colors, centered view, isolated on clean light background. No text or letters in the image."),
    ("v17_seamlessly.jpg", "Cute 3D illustration of two runners passing a bright yellow baton smoothly without stopping, Pixar animation style, vibrant bright colors, soft studio lighting, clean light background. No text or letters in the image."),
    ("v18_enthusiastically.jpg", "Cute 3D illustration of stadium fans in crowds cheering, waving flags, and clapping enthusiastically, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("v19_politeness.jpg", "Cute 3D character illustration of two young rival runners smiling warmly and shaking hands with mutual respect after a race, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("v20_peacefully.jpg", "Cute 3D illustration of a white dove of peace flying in blue sky over a sports stadium, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),

    # Word Power (CT1/CT2/CT3)
    ("wp1_passed_baton.jpg", "Cute 3D illustration of a runner passing a yellow baton cleanly to a teammate in exchange zone, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("wp2_kinetic_momentum.jpg", "Cute 3D illustration of a runner sprinting at full speed on a track with bright blue motion trails showing kinetic momentum, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("wp3_sacred_truce.jpg", "Cute 3D illustration of two Greek leaders in white robes shaking hands warmly under a marble column arch with olive wreaths, Pixar animation style, bright cheery lighting, clean background. No text or letters in the image."),
    ("wp4_home_champions.jpg", "Cute 3D illustration of the iconic green welcome arch of Iten Kenya with happy runners sprinting down a sunny road under bright blue sky, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("wp5_united_peace.jpg", "Cute 3D illustration of international athletes holding national flags together in a sunny stadium celebrating peace, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("wp6_sprinted_early.jpg", "Cute 3D illustration of a female runner sprinting fast out of starting position on a red running track, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("wp7_sat_down_with.jpg", "Cute 3D illustration of a young athlete sitting down on a track bench with his coach reviewing race strategy on a clipboard, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image."),
    ("wp8_tired_happy.jpg", "Cute 3D illustration of four happy relay team runners sitting together at the finish line smiling and celebrating victory, Pixar animation style, vibrant bright colors, soft studio lighting, clean background. No text or letters in the image.")
]

def write_prompt_file(filepath, prompt_list):
    lines = []
    for idx, (filename, prompt) in enumerate(prompt_list, start=1):
        lines.append(f"{idx}. Hãy tạo các hình ảnh 3D sống động sau đây. Filename: {filename}. {prompt}")
    content = "\n".join(lines) + "\n"
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Successfully wrote {len(prompt_list)} prompts to {filepath}")

def main():
    p36 = "Production_FINAL_DEPRECATED/IMAGE PROMPTS/week_36_image_prompts.txt"
    p37 = "Production_FINAL_DEPRECATED/IMAGE PROMPTS/week_37_image_prompts.txt"
    write_prompt_file(p36, w36_prompts)
    write_prompt_file(p37, w37_prompts)

if __name__ == '__main__':
    main()
