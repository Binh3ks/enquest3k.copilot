#!/usr/bin/env python3
"""
Generate image prompt TXT files for W28-31.
Based on PRECISE audit of referenced vs existing files.
Output: week_28_image_prompts_missing.txt, week_29_image_prompts.txt,
        week_30_image_prompts.txt, week_31_image_prompts.txt

COUNTS (from _audit_images_precise.py):
  W28: 14 missing
  W29: 26 missing
  W30: 17 missing
  W31: 47 missing
"""

PREFIX = "Hãy tạo các hình ảnh 3D sống động sau đây."
SUFFIX = "No text or letters in the image."
STYLE  = "Cute 3D render, Pixar animation style, vibrant colors, soft studio lighting, clean background."
STYLE_SIMPLE = "Cute 3D render, Pixar animation style, bright primary colors, clean simple background."
STYLE_S = STYLE_SIMPLE


def p(n, filename, description):
    return f"{n}. {PREFIX} Filename: {filename}. {description} {SUFFIX}"


THEME28 = "tortoise and hare race story, forest setting,"
THEME29 = "magic carpet trip, tropical islands and ocean,"
THEME30 = "picnic in the park, community helpers,"
THEME31 = "colourful outdoor market, traditional crafts and materials,"

# ─────────────────────────────────────────────────────────────────────────────
# WEEK 28 — 14 MISSING (transport vocab + 2 WP + 4 station covers)
# ─────────────────────────────────────────────────────────────────────────────
W28_MISSING = [
    # 8 transport vocab images
    ("car.jpg",         "A shiny red family car parked on a sunny road, clean and cheerful, bright sky. " + STYLE),
    ("bus.jpg",         "A big yellow school bus stopped at a bus stop, doors open, colourful and friendly. " + STYLE),
    ("train.jpg",       "A sleek passenger train moving along curved tracks through green hills, windows lit. " + STYLE),
    ("boat.jpg",        "A cheerful wooden boat with white sails floating on calm blue water, sunshine reflecting. " + STYLE),
    ("bicycle.jpg",     "A bright blue bicycle leaning against a sunny park fence, basket on front, flowers nearby. " + STYLE),
    ("taxi.jpg",        "A bright yellow taxi cab on a city street, door open, friendly driver waving. " + STYLE),
    ("motorbike.jpg",   "A sporty orange motorbike parked on a clean road, shiny chrome details, colourful helmet on seat. " + STYLE),
    ("ship.jpg",        "A large white cruise ship sailing on a blue ocean, flags flying, cheerful and grand. " + STYLE),
    # 2 word_power.js images (W7/W8 = transport collocations)
    ("wordpower_w7.jpg", "[COLLOCATION: go by car / travel by car] A happy family sitting inside a bright red car, seatbelts on, smiling, about to start a road trip. " + STYLE),
    ("wordpower_w8.jpg", "[COLLOCATION: take the bus / catch the bus] A child running to a yellow bus stop, arm raised excitedly, bus doors just opening, sunny morning. " + STYLE),
    # 4 station covers
    ("grammar_cover_w28.jpg", f"Educational station cover: {THEME28} animal characters with speech bubbles showing 'fast' and 'slowly', adverb of manner theme, cheerful classroom style. " + STYLE),
    ("logic_cover_w28.jpg",   f"Educational station cover: {THEME28} puzzle pieces forming a forest race path, tortoise and hare solving clues, bright and engaging. " + STYLE),
    ("math_cover_w28.jpg",    f"Educational station cover: {THEME28} numbers and shapes on a race track, stopwatch and finish line, colourful math theme. " + STYLE),
    ("wordmatch_cover_w28.jpg", f"Educational station cover: {THEME28} word cards floating like racing flags, matching arrows between two columns, colourful game-show style. " + STYLE),
]

# ─────────────────────────────────────────────────────────────────────────────
# WEEK 29 — 26 MISSING
# Magic Carpet Trip / Jobs   Grammar: Simple Past (went/saw/felt)
# (vocab_adventure, read_cover_w29, explore_cover_w29 already exist → excluded)
# ─────────────────────────────────────────────────────────────────────────────
W29_ALL = [
    # 17 vocab images (excluding vocab_adventure.jpg which already exists)
    ("vocab_magic.jpg",    "A glowing swirl of sparkles and stars forming a magical aura around a small wand, golden fairy-tale light. " + STYLE),
    ("vocab_carpet.jpg",   "A colourful ornate flying carpet soaring through a blue sky with clouds, tassels fluttering, magical glow underneath. " + STYLE),
    ("vocab_island.jpg",   "A small tropical island surrounded by bright turquoise ocean, palm trees, white sandy beach, birds flying, sunny day. " + STYLE),
    ("vocab_trip.jpg",     "A happy child with a backpack at a departure gate, suitcase beside them, sense of adventure. " + STYLE),
    ("vocab_dolphin.jpg",  "A friendly smiling dolphin leaping joyfully out of sparkling ocean waves, sunshine and blue sky behind. " + STYLE),
    ("vocab_wonderful.jpg","A child with wide eyes and a huge smile, arms spread wide in amazement, surrounded by colourful sparkles. " + STYLE),
    ("vocab_tiny.jpg",     "A tiny mouse sitting next to a large apple for size comparison, cute and curious, clear size contrast. " + STYLE),
    ("vocab_photo.jpg",    "A child holding up a polaroid photograph showing a colourful adventure scene, happy and proud. " + STYLE),
    ("vocab_creature.jpg", "A friendly fantasy creature — a small dragon-like animal with big eyes and colourful scales — in a forest clearing. " + STYLE),
    ("vocab_coast.jpg",    "A beautiful coastal cliff with crashing waves below, lighthouse in the distance, seagulls flying, golden afternoon light. " + STYLE),
    ("vocab_pilot.jpg",    "A smiling pilot in uniform and cap standing beside an airplane, thumbs up, blue sky and clouds behind. " + STYLE),
    ("vocab_doctor.jpg",   "A friendly doctor in a white coat with a stethoscope, smiling warmly, clean bright medical office. " + STYLE),
    ("vocab_farmer.jpg",   "A cheerful farmer in overalls and straw hat standing in a green field, holding a basket of vegetables. " + STYLE),
    ("vocab_teacher.jpg",  "A kind teacher at a classroom whiteboard, pointing to colourful letters, children raising hands. " + STYLE),
    ("vocab_driver.jpg",   "A friendly bus driver in uniform behind a large steering wheel, waving, bright bus interior. " + STYLE),
    ("vocab_nurse.jpg",    "A caring nurse in scrubs with a clipboard, smiling gently, hospital corridor with soft lighting. " + STYLE),
    ("vocab_station.jpg",  "A busy train station with a large clock, colourful trains on platforms, passengers with luggage. " + STYLE),
    # 2 word_power.js images
    ("wordpower_w7.jpg", "[COLLOCATION: work as a pilot / become a pilot] A young person in a pilot uniform standing confidently in front of a large airplane, cap on, holding a flight log. " + STYLE),
    ("wordpower_w8.jpg", "[COLLOCATION: the doctor said / my doctor told me] A friendly doctor in white coat speaking kindly to a child patient, stethoscope around neck, cosy examination room. " + STYLE),
    # 1 wordmatch + 3 station covers + 3 mission badges
    ("wordmatch_cover_w29.jpg", f"Educational station cover: {THEME29} word cards shaped like luggage tags floating in sky, matching arrows, colourful game-show style. " + STYLE),
    ("grammar_cover_w29.jpg",   f"Educational station cover: {THEME29} past tense verb cards on a magic carpet scroll, Simple Past highlighted, cheerful style. " + STYLE),
    ("logic_cover_w29.jpg",     f"Educational station cover: {THEME29} puzzle map of islands connected by dotted paths, child with magnifying glass, bright adventure theme. " + STYLE),
    ("math_cover_w29.jpg",      f"Educational station cover: {THEME29} numbers floating like stars above clouds, math symbols on flying carpets, fun and colourful. " + STYLE),
    ("mission1_cover.jpg",      f"Educational mission badge: {THEME29} gold badge with number 1, magic carpet and sparkles, sense of achievement. " + STYLE),
    ("mission2_cover.jpg",      f"Educational mission badge: {THEME29} silver badge with number 2, island and ocean, sense of discovery. " + STYLE),
    ("mission3_cover.jpg",      f"Educational mission badge: {THEME29} bronze badge with number 3, community helpers in a circle, sense of teamwork. " + STYLE),
]

# ─────────────────────────────────────────────────────────────────────────────
# WEEK 30 — 17 MISSING
# Picnic / Jobs   Grammar: Simple Past irregular (went, ate, drank)
# ─────────────────────────────────────────────────────────────────────────────
W30_ALL = [
    # 6 jobs vocab (the ONLY vocab with image_url in W30 — picnic words have no images)
    ("engineer.jpg",    "A friendly engineer in a hard hat and safety vest, holding blueprints, construction site behind. " + STYLE),
    ("scientist.jpg",   "A young scientist in a white lab coat holding a colourful bubbling test tube, bright lab setting. " + STYLE),
    ("artist.jpg",      "A cheerful artist in a paint-splattered smock, holding a palette and brush, colourful canvas on an easel. " + STYLE),
    ("dentist.jpg",     "A kind dentist in scrubs with a dental mirror, smiling at a young patient in the chair. " + STYLE),
    ("firefighter.jpg", "A brave firefighter in full gear holding a fire hose, red fire truck behind, strong confident pose. " + STYLE),
    ("chef.jpg",        "A happy chef in a tall white hat and apron, stirring a steaming pot, professional kitchen. " + STYLE),
    # 2 covers
    ("read_cover_w30.jpg",    f"Storybook cover: {THEME30} cheerful family on a colourful blanket, basket open, children and parents smiling, warm sunshine. " + STYLE),
    ("explore_cover_w30.jpg", f"Educational cover: {THEME30} six community helpers arranged in a friendly circle, each in uniform, globe in the centre. " + STYLE),
    # 2 word_power.js images
    ("wordpower_w7.jpg", "[COLLOCATION: an engineer builds / work as an engineer] A civil engineer pointing at a bridge blueprint, hard hat on, confident smile, cranes visible behind. " + STYLE),
    ("wordpower_w8.jpg", "[COLLOCATION: the chef cooks / cook a meal] A head chef plating a beautiful dish in a restaurant kitchen, flames on the stove, focused expression. " + STYLE),
    # 1 wordmatch + 3 station covers + 3 mission badges
    ("wordmatch_cover_w30.jpg", f"Educational station cover: {THEME30} word cards shaped like sandwich slices matching in pairs, colourful game-show style. " + STYLE),
    ("grammar_cover_w30.jpg",   f"Educational station cover: {THEME30} irregular past tense verb cards around a picnic basket, grammar rule highlighted. " + STYLE),
    ("logic_cover_w30.jpg",     f"Educational station cover: {THEME30} puzzle pieces shaped like food items connecting together, child with magnifying glass. " + STYLE),
    ("math_cover_w30.jpg",      f"Educational station cover: {THEME30} food items in groups with math symbols, colourful bar chart of favourite foods. " + STYLE),
    ("mission1_cover.jpg",      f"Educational mission badge: {THEME30} gold badge with number 1, picnic basket and sunshine, achievement feeling. " + STYLE),
    ("mission2_cover.jpg",      f"Educational mission badge: {THEME30} silver badge with number 2, community helpers, discovery feeling. " + STYLE),
    ("mission3_cover.jpg",      f"Educational mission badge: {THEME30} bronze badge with number 3, food and market stall, teamwork feeling. " + STYLE),
]

# ─────────────────────────────────────────────────────────────────────────────
# WEEK 31 — 47 MISSING
# Market / Materials / Senses   Grammar: made of + material
# ─────────────────────────────────────────────────────────────────────────────
W31_ALL = [
    # 18 vocab_ images (advanced mode)
    ("vocab_market.jpg",     "A vibrant outdoor market with colourful stalls, fresh produce, friendly vendors, warm morning light. " + STYLE),
    ("vocab_colourful.jpg",  "A market stall covered in bright colourful fruits — red apples, orange mangoes, yellow bananas, purple grapes — beautifully arranged. " + STYLE),
    ("vocab_seller.jpg",     "A friendly market seller behind a stall, holding up fresh vegetables, smiling at customers. " + STYLE),
    ("vocab_price.jpg",      "A price tag on a market stall, vendor and customer talking, small scale and produce on the counter. " + STYLE),
    ("vocab_stall.jpg",      "A market stall with a striped canopy, goods displayed neatly, hand-written sign, warm lighting. " + STYLE),
    ("vocab_fresh.jpg",      "A basket of freshly-picked vegetables — tomatoes, carrots, leafy greens — glistening with water droplets. " + STYLE),
    ("vocab_texture.jpg",    "Close-up of a child touching different surfaces — rough wood, smooth stone, soft cotton — wonder expression. " + STYLE),
    ("vocab_sweet.jpg",      "A child tasting honey from a spoon with a big happy smile, golden honey jar nearby, warm lighting. " + STYLE),
    ("vocab_cloth.jpg",      "Colourful bolts of fabric on a market stall — reds, blues, yellows — neatly rolled, hand touching soft material. " + STYLE),
    ("vocab_pot.jpg",        "Handmade clay pots at a market stall, various sizes, earthy tones, warm afternoon light. " + STYLE),
    ("vocab_sculpture.jpg",  "A beautiful carved wooden sculpture at a market stall, intricate patterns, artisan's hands nearby. " + STYLE),
    ("vocab_wood.jpg",       "A close-up of a beautifully carved wooden shelf with leaf patterns, rich brown tones, grain visible. " + STYLE),
    ("vocab_metal.jpg",      "A shiny metal bowl on a market counter, metallic surface catching light, cool blue-grey reflective tones. " + STYLE),
    ("vocab_plastic.jpg",    "Colourful plastic containers and cups in red, yellow and blue, neatly stacked on a bright shelf. " + STYLE),
    ("vocab_glass.jpg",      "A row of clear glass jars filled with golden honey at a market stall, sunlight sparkling through glass. " + STYLE),
    ("vocab_stone.jpg",      "A heavy stone bowl on a market table, grey and smooth, pestle resting inside, natural earthy surroundings. " + STYLE),
    ("vocab_cotton.jpg",     "Soft cotton scarves in every colour draped over a market rack, gentle fabric texture visible. " + STYLE),
    ("vocab_breeze.jpg",     "Fabric and flags at a market gently blowing in a warm breeze, sunny and peaceful scene. " + STYLE),
    # 6 bare material images (easy mode, no vocab_ prefix)
    ("wood.jpg",    "A smooth wooden shelf with carved leaf patterns, rich brown grain, warm soft lighting, simple background. " + STYLE_S),
    ("metal.jpg",   "A shiny metal bowl on a table, cool grey reflective surface, clean simple background. " + STYLE_S),
    ("plastic.jpg", "Bright plastic cups in red, yellow and blue, simple shapes, clean bright background. " + STYLE_S),
    ("glass.jpg",   "A clear glass jar with golden honey, light sparkling through, simple clean background. " + STYLE_S),
    ("stone.jpg",   "A grey stone bowl on a wooden surface, round and heavy-looking, simple earthy background. " + STYLE_S),
    ("cotton.jpg",  "A soft blue cotton scarf draped over a rail, fabric texture visible, clean simple background. " + STYLE_S),
    # 2 covers
    ("read_cover_w31.jpg",    f"Storybook cover: {THEME31} a child touching a beautiful cotton cloth, warm afternoon light, sense of discovery. " + STYLE),
    ("explore_cover_w31.jpg", f"Educational cover: {THEME31} different materials — wood, metal, plastic, glass, stone, cotton — as labelled objects on a display table, clear and colourful. " + STYLE),
    # 2 word_power.js images
    ("wordpower_w7.jpg", "[COLLOCATION: made of wood / wooden shelf / carved from wood] A craftsman carving patterns into a wooden shelf, wood shavings around, warm workshop light. " + STYLE),
    ("wordpower_w8.jpg", "[COLLOCATION: made of metal / metal gate / steel and iron] A blacksmith shaping a metal gate at a forge, sparks flying, dramatic lighting. " + STYLE),
    # 2 wp_ sense collocations
    ("wp_hear_bird_sing.jpg",  "[COLLOCATION: hear a bird sing] A child in a park, head tilted, eyes closed, listening to a colourful bird singing in a tree above. " + STYLE),
    ("wp_smell_fresh_air.jpg", "[COLLOCATION: smell the fresh air] A child at a market, face lifted upward, eyes closed, breathing deeply, surrounded by flowers and spice stalls. " + STYLE),
    # 1 wordmatch + 2 wordmatch (adv + easy) + 3 station covers (adv + easy variants)
    ("wordmatch_cover_w31.jpg",  f"Educational station cover: {THEME31} word cards shaped like price tags matching in pairs, arrows between columns, game-show style. " + STYLE),
    ("wordmatch_cover_easy.jpg", f"Educational station cover (easy): {THEME31} simpler word cards with pictures matching to words, bright primary colours. " + STYLE_S),
    ("grammar_cover_w31.jpg",    f"Educational station cover: {THEME31} 'made of ___' sentence frames on material swatches — wood, metal, cotton, stone — grammar rule highlighted. " + STYLE),
    ("logic_cover_w31.jpg",      f"Educational station cover: {THEME31} child sorting market items by material into labelled bins, puzzle-solving expression. " + STYLE),
    ("math_cover_w31.jpg",       f"Educational station cover: {THEME31} bar chart of popular market materials, colourful bars with numbers. " + STYLE),
    ("math_cover_easy.jpg",      f"Educational station cover (easy): {THEME31} simple counting activity with market items in groups, bright and cheerful. " + STYLE_S),
    ("logiclab_cover_easy.jpg",  f"Educational station cover (easy logic): {THEME31} simple sorting game with pictures of wood/metal/cotton/plastic, bright primary colours. " + STYLE_S),
    # Logic lab question images (easy mode)
    ("logic_q1_easy.jpg",   f"Simple question image: {THEME31} a wooden chair next to a metal spoon, clear objects on light background, no text. " + STYLE_S),
    ("logic_q2_easy.jpg",   f"Simple question image: {THEME31} a cotton shirt next to a plastic bottle, clear objects, no text. " + STYLE_S),
    # Science question images (easy mode)
    ("science_q3_easy.jpg", f"Simple educational image: {THEME31} a glass window next to a stone wall — materials comparison, no text. " + STYLE_S),
    ("science_q4_easy.jpg", f"Simple educational image: {THEME31} a shiny metal gate in a market — metallic surface clearly visible, no text. " + STYLE_S),
    ("science_q5_easy.jpg", f"Simple educational image: {THEME31} cotton scarves blowing in the breeze at a market stall, soft and colourful, no text. " + STYLE_S),
    # SparkTalk discussion images
    ("sparktalk_1.jpg", f"Discussion prompt image: {THEME31} two children at a market debating which material is best, empty speech bubbles, friendly curious expressions. " + STYLE),
    ("sparktalk_2.jpg", f"Discussion prompt image: {THEME31} a child holding a stone bowl and a plastic bowl to compare, curious expression, market stall behind. " + STYLE),
    # 3 mission badges
    ("mission1_cover.jpg", f"Educational mission badge: {THEME31} gold badge with number 1, market stall and colourful fabrics, achievement feeling. " + STYLE),
    ("mission2_cover.jpg", f"Educational mission badge: {THEME31} silver badge with number 2, materials sorted by type, discovery feeling. " + STYLE),
    ("mission3_cover.jpg", f"Educational mission badge: {THEME31} bronze badge with number 3, senses at a market, teamwork feeling. " + STYLE),
]


def write_prompts(filename, week_label, items):
    lines = [f"=== IMAGE PROMPTS — {week_label} ===", f"Total: {len(items)} images", ""]
    for i, (fname, desc) in enumerate(items, 1):
        lines.append(p(i, fname, desc))
    content = "\n".join(lines) + "\n"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ {filename} — {len(items)} prompts")


write_prompts("week_28_image_prompts_missing.txt", "WEEK 28 — Missing Images (Transport + WP)", W28_MISSING)
write_prompts("week_29_image_prompts.txt",         "WEEK 29 — Magic Carpet / Jobs (Full)",      W29_ALL)
write_prompts("week_30_image_prompts.txt",         "WEEK 30 — Picnic / Jobs / Food (Full)",     W30_ALL)
write_prompts("week_31_image_prompts.txt",         "WEEK 31 — Market / Materials / Senses (Full)", W31_ALL)

print()
print("Summary:")
print(f"  W28 missing : {len(W28_MISSING)} prompts → week_28_image_prompts_missing.txt")
print(f"  W29 full    : {len(W29_ALL)} prompts → week_29_image_prompts.txt")
print(f"  W30 full    : {len(W30_ALL)} prompts → week_30_image_prompts.txt")
print(f"  W31 full    : {len(W31_ALL)} prompts → week_31_image_prompts.txt")
