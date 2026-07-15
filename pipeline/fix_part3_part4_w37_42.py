#!/usr/bin/env python3
"""
fix_part3_part4_w37_42.py
Expands PART 3 L2/L3/L4 to 10 items, L5 to 5 items.
Fixes PART 4 dictation blank + Sub-total.
Applies to W37-42 sessions AND sessions_2.
"""

import json
import re
from pathlib import Path

LESSONS_DIRS = [
    Path('public/data/lessons'),
    Path('mcp-server/data/lessons'),
]

# ─────────────────────────────────────────────────────────────────────────────
# CONTENT DATA — per (week, session, level)
# Each level entry:
#   'add': lines to insert BEFORE the old sub-total line
#   'old_sub': the current (wrong) sub-total to replace
#   'new_sub': the correct sub-total
#   'replace_header': if set, replaces the whole level block
#   'replace_content': full replacement content (header + items + sub-total)
# ─────────────────────────────────────────────────────────────────────────────

ADDITIONS = {

# ══════════════════════════════════════════════════════════════════════════════
# W37 S1 — Living vs Non-Living
# ══════════════════════════════════════════════════════════════════════════════
(37, 1, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. All living things are able to reproduce.  ___',
        '8. A robot that moves is classified as a living organism.  ___',
        '9. A plant is non-living because it cannot walk or run.  ___',
        '10. A flame grows and moves, so scientists say it is a living thing.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(37, 1, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. A flower grows toward the light _____________ it needs sunlight to survive.',
        '10. A fish is a living organism _____________ it breathes, grows, and reproduces.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(37, 1, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. not / do / things / breathe / Non-living   →   ___________________________________',
        '7. need / organisms / food / Living / and / water   →   ___________________________________',
        '8. plants / can / Animals / reproduce / and   →   ___________________________________',
        '9. is / breathing / a / of / things / characteristic / Living   →   ___________________________________',
        '10. thing / rock / living / A / not / a / is   →   ___________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(37, 1, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence explaining the DIFFERENCE between a living and non-living thing:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W37 S2 — Organism, classify, evidence
# ══════════════════════════════════════════════════════════════════════════════
(37, 2, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. Plants _____________ to the sun by turning their leaves toward it.',
        '10. The scientist needs more _____________ before writing her conclusion.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(37, 2, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. Nutrition gives living things the energy they need to survive.  ___',
        '8. Scientists must always investigate before classifying something.  ___',
        '9. A living organism can survive for a long time without any nutrition.  ___',
        '10. "Therefore" and "because" always appear in the same position in a sentence.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(37, 2, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. Living organisms need nutrition because ________________________________________.',
        '7. When scientists find enough evidence, they can ________________________________________.',
        '8. A butterfly is classified as an organism because ________________________________________.',
        '9. Scientists classify animals into groups; therefore, ________________________________________.',
        '10. A dog responds to its environment because ________________________________________.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(37, 2, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence using both "investigate" and "evidence":',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W37 S3 — Investigation, conclusion, evidence
# ══════════════════════════════════════════════════════════════════════════════
(37, 3, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. After careful investigation, the scientist wrote a _____________ about the rock.',
        '10. A plant _____________ to sunlight by turning its leaves toward it.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(37, 3, 'L3'): {
    'replace_header': '[O] L3 — Put the investigation steps in order. Write 1-5. (5 items)',
    'replace_content': [
        '[O] L3 — Fill in the blank: choose "because" or "therefore" (10 items)',
        '1. A cat is a living thing _____________ it breathes, grows, and moves.',
        '2. A rock cannot grow or breathe; _____________ , it is non-living.',
        '3. The scientist investigated carefully _____________ she needed evidence.',
        '4. There was no movement or growth; _____________ , the stone was non-living.',
        '5. Living things need food _____________ they require energy to survive.',
        '6. A fish is a living organism _____________ it can reproduce and grow.',
        '7. The evidence was clear; _____________ , the detective wrote her conclusion.',
        '8. Plants grow toward sunlight _____________ they need energy to survive.',
        '9. A fire moves and grows; _____________ , some students think it is living.',
        '10. The scientist found strong evidence; _____________ , she reached a conclusion.',
        '[ Sub-total: ___ / 10 ]',
    ],
},
(37, 3, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. A rock is non-living; therefore, it cannot breathes. → ___________________________________',
        '7. Living things needs energy from food to survival. → ___________________________________',
        '8. The scientist investigate the evidence and reach a conclusion. → ___________________________________',
        '9. A butterfly are a living organism that can reproduced. → ___________________________________',
        '10. Non-living things breathes and grows, so they is alive. → ___________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(37, 3, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a conclusion sentence for a science investigation:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W38 S1 — Animal groups (mammal, reptile, amphibian, insect, bird, fish)
# ══════════════════════════════════════════════════════════════════════════════
(38, 1, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. A bat is a mammal because it has fur and feeds its young with milk.  ___',
        '8. All animals that live in water are classified as fish.  ___',
        '9. An eagle and a penguin both belong to the bird group.  ___',
        '10. All reptiles can live in water and on land, just like amphibians.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(38, 1, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. A bee _____________ (has / have) two pairs of wings and six legs.',
        '10. A crocodile _____________ (lay / lays) its eggs on the river bank.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(38, 1, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. warm-blooded / Mammals / are / fur / have / and   →   ___________________________________',
        '7. gills / through / Fish / breathe   →   ___________________________________',
        '8. smooth / have / Amphibians / skin / moist   →   ___________________________________',
        '9. insects / six / All / legs / have   →   ___________________________________',
        '10. cold-blooded / snake / is / A / a / reptile   →   ___________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(38, 1, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence describing the main difference between a mammal and a reptile:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W38 S2 — Vertebrate, classify, scales, feathers, fur, spine, species
# ══════════════════════════════════════════════════════════════════════════════
(38, 2, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. A snake and a bird are both _____________ s — they both have a backbone.',
        '10. There are thousands of _____________ of beetles alone in the insect group.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(38, 2, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. Mammals are vertebrates because they have a spine running down their backs.  ___',
        '8. All animals with scales belong exclusively to the reptile group.  ___',
        '9. A butterfly has a spine, which is why it is classified as a vertebrate.  ___',
        '10. A blue whale and a tiny bat are both mammals from the same species.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(38, 2, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. A snake has scales and is cold-blooded; therefore, ________________________________________.',
        '7. All vertebrates are special because ________________________________________.',
        '8. There are millions of animal species; therefore, ________________________________________.',
        '9. A shark belongs to the fish group because ________________________________________.',
        '10. Scientists classify animals so that ________________________________________.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(38, 2, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence classifying an animal from your country:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W38 S3 — Review animal groups
# ══════════════════════════════════════════════════════════════════════════════
(38, 3, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. A bee and an ant are _____________ s — they have six legs and a segmented body.',
        '10. Scientists _____________ all animals with a backbone as vertebrates.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(38, 3, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. An insect are a vertebrate because it has a backbone. → ___________________________________',
        '7. Feathers help birds stay cold in the winter. → ___________________________________',
        '8. A goldfish breathe through its lungs. → ___________________________________',
        '9. Reptiles and birds is both warm-blooded vertebrates. → ___________________________________',
        '10. A dolphin belong to the fish group because it lives in the ocean. → ___________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(38, 3, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Mammals vs Insects:  Similarity: _______________   Difference: _______________',
        '6. Fish vs Amphibians:  Similarity: _______________   Difference: _______________',
        '7. Birds vs Mammals:  Similarity: _______________   Difference: _______________',
        '8. Reptiles vs Amphibians:  Similarity: _______________   Difference: _______________',
        '9. Insects vs Reptiles:  Similarity: _______________   Difference: _______________',
        '10. Fish vs Birds:  Similarity: _______________   Difference: _______________',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(38, 3, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 3 ]',
    'add': [
        '4. Write a sentence using "classify" and an animal group:',
        '   _______________________________________________________________________',
        '5. Write a sentence describing what all vertebrates have in common:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W39 S1 — Oviparous, viviparous, hatch, embryo, offspring
# ══════════════════════════════════════════════════════════════════════════════
(39, 1, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. A shark is viviparous because it gives birth to live young.  ___',
        '8. All reptiles give birth to live young inside the mother.  ___',
        '9. The embryo inside an egg develops before hatching.  ___',
        '10. Only birds protect their offspring after they hatch.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(39, 1, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. A hen lays eggs, _____________ a cat gives birth to live young.',
        '10. _____________ birds and crocodiles, most mammals do not lay eggs.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(39, 1, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. eggs / their / in / Parents / incubate / nest / the   →   ___________________________________',
        '7. breaks / baby / The / shell / the / out / of   →   ___________________________________',
        '8. hatch / the / egg / from / Chicks   →   ___________________________________',
        '9. live / birth / Dolphins / young / to / give   →   ___________________________________',
        '10. young / their / parents / protect / offspring / All   →   ___________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(39, 1, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence comparing an oviparous and a viviparous animal:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W39 S2 — Incubate, nest, shell, offspring, compare, alike, unlike
# ══════════════════════════════════════════════════════════════════════════════
(39, 2, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. When we _____________ birds and mammals, we find important differences.',
        '10. A penguin and a hen are _____________ because both are oviparous birds.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(39, 2, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. When we compare a bird and a dog, we find that only the bird lays eggs.  ___',
        '8. A nest is always built by the mother alone in every species.  ___',
        '9. Comparing two things always shows they are the same.  ___',
        '10. Birds and reptiles are alike in that both groups are viviparous.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(39, 2, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. Birds and fish are alike because ________________________________________.',
        '7. Unlike birds, fish ________________________________________.',
        '8. A snake and a hen are similar because ________________________________________.',
        '9. When we compare a dog and a hen, we see that ________________________________________.',
        '10. Both reptiles and birds ________________________________________.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(39, 2, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence comparing two animals using "but":',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W39 S3 — Review reproduction
# ══════════════════════════════════════════════════════════════════════════════
(39, 3, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. A hen incubates its eggs by putting them in cold water.  → ___________________________________',
        '8. The embryo breaks out of the mother in oviparous animals. → ___________________________________',
        '9. Both birds and all mammals lays eggs to reproduce. → ___________________________________',
        '10. Oviparous animals gives birth to live young. → ___________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(39, 3, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. Penguin ↔ dolphin — dolphin gives birth:',
        '   _____________ a penguin, a dolphin __________________________________________ .',
        '8. Snake ↔ cat — both reproduce differently:',
        '   _____________ .',
        '9. Turtle ↔ whale:',
        '   _____________ .',
        '10. Hen ↔ elephant:',
        '   _____________ .',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(39, 3, 'L4'): {
    'replace_header': '[O] L4 — Put the egg life cycle in order. Write 1-5. (5 items)',
    'replace_content': [
        '[O] L4 — Fill in the blank — choose the correct word (10 items)',
        '1. A hen is _____________ (oviparous / viviparous) because it lays eggs.',
        '2. A cat is _____________ (oviparous / viviparous) because it gives birth to live young.',
        '3. Baby birds _____________ (hatch / hibernate) from their eggs.',
        '4. The mother hen _____________ (incubates / ignores) her eggs to keep them warm.',
        '5. A bird builds a _____________ (nest / hive) to protect its eggs.',
        '6. The hard outer cover of a bird egg is the _____________ (shell / skin).',
        '7. A tiny life growing inside an egg is called an _____________ (embryo / organism).',
        '8. The young of any animal are called its _____________ (offspring / organisms).',
        '9. A dolphin _____________ (lays eggs / gives birth) to live young.',
        '10. _____________ (Oviparous / Viviparous) animals develop inside the mother.',
        '[ Sub-total: ___ / 10 ]',
    ],
},
(39, 3, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 3 ]',
    'add': [
        '4. Write a sentence about how birds incubate their eggs:',
        '   _______________________________________________________________________',
        '5. Write a sentence comparing oviparous and viviparous animals using "but":',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W40 S1 — Habitats, adapt, desert, rainforest, Arctic, comparatives
# ══════════════════════════════════════════════════════════════════════════════
(40, 1, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. The Amazon Rainforest is the largest tropical rainforest in the world.  ___',
        '8. Animals choose which habitat to live in by themselves every year.  ___',
        '9. The ocean is an aquatic habitat where sharks and whales live.  ___',
        '10. A camel\'s hump helps it store water so it can survive in the cold Arctic.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(40, 1, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. A mountain is _____________ (cold → ?) than a valley.',
        '10. The Sahara Desert is _____________ (large → ?) than any single rainforest.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(40, 1, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. environments / Animals / adapt / to / their   →   ___________________________________',
        '7. very / cold / is / The / Arctic   →   ___________________________________',
        '8. wet / is / hotter / and / The / rainforest   →   ___________________________________',
        '9. natural / home / habitat / animal\'s / is / an / The   →   ___________________________________',
        '10. in / survive / every / Animals / cannot / habitat   →   ___________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(40, 1, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence about an animal that is adapted to an extreme habitat:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W40 S2 — Adapt, environment, wetland, grassland, comparatives
# ══════════════════════════════════════════════════════════════════════════════
(40, 2, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. The Sahara is the _____________ desert — it has very little rain each year.',
        '10. An animal that _____________ to its environment is more likely to survive.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(40, 2, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. Lions and zebras both live on the grasslands of Africa.  ___',
        '8. Wetlands are too dry for frogs and crabs to live in.  ___',
        '9. An environment includes the air, water, land, and living things around you.  ___',
        '10. Animals that cannot adapt to their environment will eventually not survive.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(40, 2, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. The Pacific Ocean is __________ than the Atlantic Ocean. (wide)',
        '7. A wetland is __________ than a desert. (wet)',
        '8. The grassland is __________ than the rainforest. (dry)',
        '9. The valley is __________ than the mountain. (low)',
        '10. The Arctic is __________ than the grassland. (cold)',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(40, 2, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence about an animal that lives in the wetland habitat:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W40 S3 — Review habitats and comparatives
# ══════════════════════════════════════════════════════════════════════════════
(40, 3, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. All animals in the ocean lives on the surface. → ___________________________________',
        '8. The grassland are a wet habitat where fish live. → ___________________________________',
        '9. A fish can survive in the hottest desert. → ___________________________________',
        '10. Lions and zebras adapts perfectly to the grassland environment. → ___________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(40, 3, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. rainforest → grassland (wet):  The rainforest is __________ than the grassland.',
        '8. grassland → wetland (dry):  The grassland is __________ than the wetland.',
        '9. Arctic → grassland (cold):  The Arctic is __________ than the grassland.',
        '10. Pacific Ocean → river (wide):  The Pacific Ocean is __________ than any river.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(40, 3, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. wet → _____________ than',
        '7. tall → _____________ than',
        '8. large → _____________ than',
        '9. small → _____________ than',
        '10. long → _____________ than',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(40, 3, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 3 ]',
    'add': [
        '4. Write a sentence using "adapt" and "survive":',
        '   _______________________________________________________________________',
        '5. Write a sentence about your favourite habitat using two adjectives:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W41 S1 — Life cycle: egg, larva, pupa, adult, metamorphosis, tadpole
# ══════════════════════════════════════════════════════════════════════════════
(41, 1, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. The adult butterfly can lay eggs to start the life cycle again.  ___',
        '8. A caterpillar goes through metamorphosis to become an adult butterfly.  ___',
        '9. All insects have exactly the same four-stage life cycle as a butterfly.  ___',
        '10. A butterfly\'s life cycle has exactly three stages: egg, larva, and adult.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(41, 1, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. _____________ the caterpillar wraps itself in a cocoon, the pupa forms inside.',
        '10. _____________ the butterfly is free, it finds a mate and lays eggs to begin the cycle again.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(41, 1, 'L4'): {
    'replace_header': '[O] L4 — Put the butterfly life cycle in order. Write 1-4. (4 items)',
    'replace_content': [
        '[O] L4 — Fill in the blank — choose the correct word (10 items)',
        '1. The first stage of a butterfly\'s life is the _____________ (egg / pupa) stage.',
        '2. A baby caterpillar is the _____________ (larva / adult) stage.',
        '3. The caterpillar wraps itself into a _____________ (pupa / egg) to change.',
        '4. The full-grown butterfly is the _____________ (adult / larva) stage.',
        '5. The _____________ (caterpillar / butterfly) eats leaves and grows bigger.',
        '6. The complete journey from birth to adult is called the life _____________ (cycle / stage).',
        '7. The change from caterpillar to butterfly is called _____________ (metamorphosis / adaptation).',
        '8. A baby frog before it grows legs is called a _____________ (tadpole / caterpillar).',
        '9. The butterfly life cycle has _____________ (four / two) stages.',
        '10. In the pupa stage, the caterpillar _____________ (transforms / adapts) completely.',
        '[ Sub-total: ___ / 10 ]',
    ],
},
(41, 1, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence explaining why metamorphosis is important for a butterfly:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W41 S2 — Metamorphosis, tadpole, seedling, transform, sequence, cycle
# ══════════════════════════════════════════════════════════════════════════════
(41, 2, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. A baby plant growing out of a seed in the soil is a _____________ .',
        '10. Each _____________ of the life cycle must happen in the correct order.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(41, 2, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. A butterfly goes through complete metamorphosis: egg, larva, pupa, adult.  ___',
        '8. A seedling is the first stage of a plant\'s life cycle.  ___',
        '9. The pupa stage is always the longest stage in every butterfly\'s life.  ___',
        '10. All animals go through metamorphosis at some point in their life cycle.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(41, 2, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. The life cycle of a plant begins with a ________________________________________.',
        '7. A tadpole goes through metamorphosis; therefore, ________________________________________.',
        '8. When a caterpillar is in the pupa stage, it ________________________________________.',
        '9. A seedling grows from a seed because ________________________________________.',
        '10. The life cycle is complete when the adult ________________________________________.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(41, 2, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 3 ]',
    'add': [
        '4. Write a sentence using "complete metamorphosis":',
        '   _______________________________________________________________________',
        '5. Write a sentence about the life cycle of a plant from seed to adult:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W41 S3 — Review life cycles, sequence words
# ══════════════════════════════════════════════════════════════════════════════
(41, 3, 'L2'): {
    'replace_header': '[O] L2 — Put the frog life cycle in order. Write 1-5. (5 items)',
    'replace_content': [
        '[O] L2 — Fill in the blank — sequence words (First / Then / Next / Finally) (10 items)',
        '1. _____________ , a butterfly lays a tiny egg on a leaf.',
        '2. _____________ , the egg hatches and a tiny caterpillar comes out.',
        '3. _____________ , the caterpillar eats leaves and grows bigger.',
        '4. _____________ , the caterpillar wraps itself into a pupa.',
        '5. _____________ , the adult butterfly breaks out of the pupa.',
        '6. _____________ , the adult butterfly lays eggs to start the cycle again.',
        '7. _____________ , a tiny tadpole hatches from the egg in the water.',
        '8. _____________ , the tadpole grows back legs.',
        '9. _____________ , the froglet climbs out of the water.',
        '10. _____________ , the adult frog lays eggs to begin a new cycle.',
        '[ Sub-total: ___ / 10 ]',
    ],
},
(41, 3, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. After that, _____________________________________________________________ .',
        '8. Then, __________________________________________________________________ .',
        '9. Next, __________________________________________________________________ .',
        '10. Finally, _______________________________________________________________ .',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(41, 3, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. The tadpole transforms into a butterfly after many weeks. → ___________________________________',
        '7. Finally come the caterpillar stage, and then the egg stage. → ___________________________________',
        '8. The life cycle is complete when the caterpillar lays eggs. → ___________________________________',
        '9. A sequence is a group of steps in the wrongs order. → ___________________________________',
        '10. An adult frog transforms from a pupa inside a cocoon. → ___________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(41, 3, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence about why life cycles are important for the survival of a species:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W42 S1 — Water cycle: evaporation, condensation, precipitation, vapor
# ══════════════════════════════════════════════════════════════════════════════
(42, 1, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. Water vapor rises into the sky and cools to form clouds through condensation.  ___',
        '8. Runoff is when rain water sinks straight down into the soil to become groundwater.  ___',
        '9. The water cycle is driven by energy from the sun.  ___',
        '10. Precipitation always falls as rain and can never fall as snow or hail.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(42, 1, 'L3'): {
    'replace_header': '[O] L3 — Put the water cycle steps in order. Write 1-5. (5 items)',
    'replace_content': [
        '[O] L3 — Fill in the blank — choose the correct word (10 items)',
        '1. Water _____________ (evaporates / condenses) when sunlight heats it and turns it into vapor.',
        '2. Water _____________ (evaporates / condenses) when vapor cools and forms tiny drops.',
        '3. _____________ (Precipitation / Evaporation) is rain, snow, or hail falling from clouds.',
        '4. Water in the form of invisible gas is called _____________ (vapor / cloud).',
        '5. The continuous journey of water is called the _____________ (water cycle / water stage).',
        '6. Water gathering in rivers after rain is called _____________ (collection / runoff).',
        '7. Water that flows over the land into rivers is called _____________ (runoff / groundwater).',
        '8. Water that soaks into the soil is called _____________ (groundwater / precipitation).',
        '9. Tiny water drops in the sky form a _____________ (cloud / vapor).',
        '10. The energy from the _____________ (sun / moon) starts the water cycle.',
        '[ Sub-total: ___ / 10 ]',
    ],
},
(42, 1, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. Groundwater _____________ (collect / collects) deep under the soil.',
        '10. The water cycle _____________ (continue / continues) without stopping.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(42, 1, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence explaining why the water cycle is important for all living things:',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W42 S2 — Absorb, release, temperature, sunlight, cloud, runoff, continuous
# ══════════════════════════════════════════════════════════════════════════════
(42, 2, 'L2'): {
    'old_sub': '[ Sub-total: ___ / 8 ]',
    'add': [
        '9. After rain falls, _____________ flows over the ground into rivers and streams.',
        '10. The water cycle is a _____________ process that helps all living things survive.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(42, 2, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. Runoff occurs when rain water flows over the surface of the land.  ___',
        '8. Evaporation happens more slowly when the temperature is very high.  ___',
        '9. The sun gives the energy that starts evaporation in the water cycle.  ___',
        '10. Clouds absorb precipitation from the ground to form rain.  ___',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(42, 2, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. Groundwater forms when ________________________________________.',
        '7. Sunlight is important for the water cycle because ________________________________________.',
        '8. The water cycle is never-ending because ________________________________________.',
        '9. When it rains heavily, runoff ________________________________________.',
        '10. Evaporation starts when ________________________________________.',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(42, 2, 'L5'): {
    'old_sub': '[ Sub-total: ___ / 4 ]',
    'add': [
        '5. Write a sentence about why the water cycle is called "continuous":',
        '   _______________________________________________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 5 ]',
},

# ══════════════════════════════════════════════════════════════════════════════
# W42 S3 — Review water cycle
# ══════════════════════════════════════════════════════════════════════════════
(42, 3, 'L2'): {
    'replace_header': '[O] L2 — Write the four stages of the water cycle in order (4 items)',
    'replace_content': [
        '[O] L2 — Fill in the blank — sequence words for the water cycle (10 items)',
        '1. _____________ , sunlight heats the water in the ocean.',
        '2. _____________ , water evaporates and rises as vapor.',
        '3. _____________ , the vapor cools and forms clouds (condensation).',
        '4. _____________ , rain or snow falls from the clouds (precipitation).',
        '5. _____________ , water collects in rivers and lakes.',
        '6. _____________ , some water soaks into the ground as groundwater.',
        '7. _____________ , the cycle begins again with more evaporation.',
        '8. _____________ , water flows down rivers and back to the sea.',
        '9. _____________ , the vapor in the air forms bigger clouds.',
        '10. _____________ , new water vapor rises and the cycle continues.',
        '[ Sub-total: ___ / 10 ]',
    ],
},
(42, 3, 'L3'): {
    'old_sub': '[ Sub-total: ___ / 6 ]',
    'add': [
        '7. After that, ____________________________________________________________ .',
        '8. Then, _________________________________________________________________ .',
        '9. Next, _________________________________________________________________ .',
        '10. Finally, ______________________________________________________________ .',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
(42, 3, 'L4'): {
    'old_sub': '[ Sub-total: ___ / 5 ]',
    'add': [
        '6. Vapor condenses because it get warmer in the clouds. → ___________________________________',
        '7. The water cycle it never stops; it is continuous. → ___________________________________',
        '8. Collection happens when water flows over the surface of the land. → ___________________________________',
        '9. Groundwater soak into the sky as vapor. → ___________________________________',
        '10. The stages of the water cycle does not repeat. → ___________________________________',
    ],
    'new_sub': '[ Sub-total: ___ / 10 ]',
},
# W42 S3 L5 already has 5 items — no change needed
}

# ─────────────────────────────────────────────────────────────────────────────
# PART 3 TOTAL fixes: map (week, session) → old_total_line → new_total_line
# ─────────────────────────────────────────────────────────────────────────────
PART3_TOTALS = {
    (37, 1): ('[ PART 3 TOTAL: ___ / 33 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (37, 2): ('[ PART 3 TOTAL: ___ / 33 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (37, 3): ('[ PART 3 TOTAL: ___ / 32 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (38, 1): ('[ PART 3 TOTAL: ___ / 33 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (38, 2): ('[ PART 3 TOTAL: ___ / 33 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (38, 3): ('[ PART 3 TOTAL: ___ / 30 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (39, 1): ('[ PART 3 TOTAL: ___ / 33 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (39, 2): ('[ PART 3 TOTAL: ___ / 33 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (39, 3): ('[ PART 3 TOTAL: ___ / 30 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (40, 1): ('[ PART 3 TOTAL: ___ / 33 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (40, 2): ('[ PART 3 TOTAL: ___ / 33 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (40, 3): ('[ PART 3 TOTAL: ___ / 30 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (41, 1): ('[ PART 3 TOTAL: ___ / 32 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (41, 2): ('[ PART 3 TOTAL: ___ / 32 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (41, 3): ('[ PART 3 TOTAL: ___ / 30 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (42, 1): ('[ PART 3 TOTAL: ___ / 33 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (42, 2): ('[ PART 3 TOTAL: ___ / 33 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
    (42, 3): ('[ PART 3 TOTAL: ___ / 30 ]', '[ PART 3 TOTAL: ___ / 45 ]'),
}

# ─────────────────────────────────────────────────────────────────────────────
# Core helpers
# ─────────────────────────────────────────────────────────────────────────────

def strip_markers(line):
    """Strip [O]/[ALL] prefix for matching."""
    return re.sub(r'^\[(?:O|ALL)\]\s*', '', line.strip())


def apply_level_addition(content, level_tag, entry):
    """Insert 'add' lines before 'old_sub' within the L<n> block."""
    old_sub = entry['old_sub']
    new_items = entry['add']
    new_sub = entry['new_sub']
    result = []
    # Track whether we're inside the target level block
    in_level = False
    level_re = re.compile(r'^' + re.escape(level_tag) + r'\s*[—\-]')
    next_level_re = re.compile(r'^L[1-5]\s*[—\-]')
    for line in content:
        bare = strip_markers(line)
        if level_re.match(bare):
            in_level = True
            result.append(line)
            continue
        if in_level and next_level_re.match(bare) and not level_re.match(bare):
            in_level = False
        if in_level and line.strip() == old_sub:
            result.extend(new_items)
            result.append(new_sub)
            in_level = False
            continue
        result.append(line)
    return result


def apply_level_replacement(content, replace_header, replace_content):
    """Replace the entire level block (from header to its sub-total)."""
    # Strip [O]/[ALL] prefix from the search header using regex (not lstrip)
    rh_clean = re.sub(r'^\[(?:O|ALL)\]\s*', '', replace_header)
    result = []
    i = 0
    while i < len(content):
        bare = strip_markers(content[i])
        # Find the level header to replace
        if bare.startswith(rh_clean):
            # Skip the old block until we find the old sub-total
            i += 1
            while i < len(content):
                if re.match(r'^\[?\s*Sub-total', content[i].strip()):
                    i += 1  # skip old sub-total
                    break
                # also stop if a new level header starts
                bare2 = strip_markers(content[i])
                if re.match(r'^L[1-5]\s*[—\-]', bare2) and i > 0:
                    break
                i += 1
            # Insert replacement
            result.extend(replace_content)
            result.append('')  # blank separator
        else:
            result.append(content[i])
            i += 1
    return result


def fix_part3(content, week, session):
    """Apply all L2/L3/L4/L5 changes for this session."""
    for level_tag in ('L2', 'L3', 'L4', 'L5'):
        key = (week, session, level_tag)
        if key not in ADDITIONS:
            continue
        entry = ADDITIONS[key]
        if 'replace_header' in entry:
            content = apply_level_replacement(
                content,
                entry['replace_header'],
                entry['replace_content'],
            )
        else:
            content = apply_level_addition(content, level_tag, entry)
    # Fix PART 3 TOTAL
    total_key = (week, session)
    if total_key in PART3_TOTALS:
        old_t, new_t = PART3_TOTALS[total_key]
        content = [new_t if l.strip() == old_t else l for l in content]
    return content


def fix_part4(content):
    """Add dictation blank + Sub-total to PART 4 if missing."""
    # If already has a dictation blank line (1. ___) and sub-total, skip
    has_blank = any('____' in l and l.strip().startswith('1.') for l in content)
    has_sub = any('Sub-total' in l for l in content)
    result = []
    for line in content:
        if line.strip() == 'D. Dictation:':
            result.append('D. Dictation (teacher reads twice — students write 1 sentence):')
            if not has_blank:
                result.append('1. ________________________________________________________________')
        else:
            result.append(line)
    if not has_sub:
        result.append('[ Sub-total: ___ / 5 ]')
    return result


def fix_sessions_list(sessions_list, week_num):
    for sess in sessions_list:
        sn = sess.get('session', 0)
        for p in sess.get('parts', []):
            title = p['title']
            if title.startswith('PART 3'):
                p['content'] = fix_part3(p['content'], week_num, sn)
            if title.startswith('PART 4'):
                p['content'] = fix_part4(p['content'])


def load_week(wk):
    path = LESSONS_DIRS[0] / ('W%d.json' % wk)
    return json.loads(path.read_text(encoding='utf-8'))


def save_week(wk, data):
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    for d in LESSONS_DIRS:
        p = d / ('W%d.json' % wk)
        if p.exists():
            p.write_text(payload, encoding='utf-8')


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def main():
    for wk in range(37, 43):
        print('── W%d ──' % wk)
        data = load_week(wk)
        for key in ('sessions', 'sessions_2', 'sessions_5'):
            if key in data and isinstance(data[key], list):
                fix_sessions_list(data[key], wk)
        save_week(wk, data)

        # Quick verification
        d2 = load_week(wk)
        for sess in d2['sessions']:
            sn = sess['session']
            for p in sess['parts']:
                title = p['title']
                if title.startswith('PART 3'):
                    level_counts = {}
                    cur = None
                    for l in p['content']:
                        bare = re.sub(r'^\[(?:O|ALL)\]\s*', '', l.strip())
                        m = re.match(r'^(L[1-5])\s*[—\-]', bare)
                        if m:
                            cur = m.group(1)
                            level_counts[cur] = 0
                        elif cur and re.match(r'^\d+\.', bare):
                            level_counts[cur] += 1
                    total_line = next((l for l in p['content'] if 'PART 3 TOTAL' in l), None)
                    ok = all(level_counts.get(lv, 0) == (10 if lv != 'L5' else 5)
                             for lv in ['L1', 'L2', 'L3', 'L4', 'L5'])
                    total_ok = total_line and '45' in total_line
                    status = '✓' if ok and total_ok else '✗'
                    print('  S%d PART3: %s | counts=%s | total=%s' % (sn, status, level_counts, total_line))
                if title.startswith('PART 4'):
                    has_blank = any('____' in l and l.strip().startswith('1.') for l in p['content'])
                    has_sub = any('Sub-total' in l for l in p['content'])
                    status = '✓' if has_blank and has_sub else '✗'
                    print('  S%d PART4: %s (blank=%s sub=%s)' % (sn, status, has_blank, has_sub))
        print()
    print('Done.')


if __name__ == '__main__':
    main()
