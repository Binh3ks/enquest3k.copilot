# 🗺️ ENGQUEST3K — DIGITAL SYLLABUS & CURRICULUM BRIDGE (W01–W156)

**Document Reference**: `docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md`  
**Baseline Strategic Document**: `docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt` (Frozen Pedagogical Foundation)  
**System Architecture**: 15 Quests / 5 Zones per Week (1 Day = 1 Zone, 3 Quests/Day)  
**Effective Date**: 2026-09-04  
**Version**: 2.0.0

---

## 1. Architectural Bridge Overview

This document bridges the strategic 3-year curriculum (`1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt`) directly into the software architecture of EngQuest3K. It translates the thematic and grammar roadmap into concrete data structures for the **15 Quests / 5 Zones / 4 Central Hubs** platform.

### The 5 Technical Architectural Fields per Week:
1. `cefr_stage`: CEFR Proficiency Level (Pre-A1 Starters $\rightarrow$ A1 Movers $\rightarrow$ A2 Flyers $\rightarrow$ B1 $\rightarrow$ B1+ $\rightarrow$ B2 EMI).
2. `exam_milestone`: Cambridge Young Learners / KET / PET / Acellus US K-12 benchmark.
3. `clil_stem_module`: Interdisciplinary inquiry theme driving Day 2: **Action Lab** (`science_lab`) and **Discovery Report** (`science_report`).
4. `scaffolding_tier`: Production scaffolding level (Tier 1: Full 1-Tap Pills $\rightarrow$ Tier 2: ESL Collocation Chunks $\rightarrow$ Tier 3: Autonomous CER/Essay).
5. `zone_distribution`: 15-Quest mapping across Zone 1 (Story World), Zone 2 (Knowledge Lab), Zone 3 (Battle Arena), Zone 4 (Creator Studio), and Zone 5 (Boss Castle).

---

## 2. Master Curriculum Overview (156 Weeks across 3 Phases)

```
PHASE 1: FOUNDATIONAL FLUENCY & CAMBRIDGE FLYERS (WEEKS 01–72)
  ├── Block A: The "Here & Now" (W01–W18) ──────────> Pre-A1 Starters Milestone (W16)
  ├── Block B: The "First Steps Back" (W19–W36) ─────> A1 Movers Milestone (W32)
  ├── Block C: CLIL Foundations & Physics (W37–W54) ─> A2 Flyers Entry
  └── Block D: Cambridge Flyers Mastery (W55–W72) ────> ★ NORTH STAR 1: FLYERS 15 SHIELDS (W72)

PHASE 2: ACADEMIC APPLICATION & CLIL STEM (WEEKS 73–120)
  ├── Block E: Logical Reasoning & Math (W73–W88) ───> B1 Preliminary Entry / AWL Tier 2
  ├── Block F: Natural Systems & Society (W89–W104) ──> B1+ Intermediate / CER Framework
  └── Block G: Interdisciplinary Innovation (W105–W120)> KET/PET Benchmark & Lab Reports

PHASE 3: ADVANCED SYNTHESIS, DEBATE & EMI (WEEKS 121–156)
  ├── Cycle 3.1: Tech & Education Debate (W121–W132) ─> 5-Paragraph Argumentative Essay
  ├── Cycle 3.2: Society & Ethics Debate (W133–W144) ─> Cross-Examination & Rebuttal
  └── Cycle 3.3: Capstone & Defense (W145–W156) ──────> ★ NORTH STAR 2: B2 EMI / ACELLUS K-12 READY
```

---

## 3. Detailed Weekly Mapping Matrix (W01–W156)

### PHASE 1: FOUNDATIONAL FLUENCY (Weeks 01–72)

#### Block A: The "Here & Now" — Pre-A1 Starters (Weeks 01–18)
*Focus: Personal identity, family, school objects, daily routines, Present Simple, high-visual scaffolding.*

| Week | Thematic Title | CEFR & Milestone | CLIL STEM Module | Scaffolding Tier | Grammar & Hub Focus |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **W01** | Hello, World! (Identity) | Pre-A1 Starters | Self-Identity & Body Landmarks | Tier 1 (Full) | "I am...", names, age, numbers 1–10; `reading_hub` 1-word touch-and-say |
| **W02** | My Family Squad (Roles) | Pre-A1 Starters | Family Trees & Social Units | Tier 1 (Full) | "This is my...", possessives; `speaking_hub` photo pointing |
| **W03** | The Mirror Game (Appearance) | Pre-A1 Starters | Biology: Human Features | Tier 1 (Full) | "He is tall" vs "She has curly hair"; `listening_hub` color matching |
| **W04** | My Happy Jar (Emotions) | Pre-A1 Starters | Psychology: Basic Emotions | Tier 1 (Full) | "I like + V-ing", feelings; `writing_hub` emotion faces matching |
| **W05** | The Mystery House (Rooms) | Pre-A1 Starters | Architecture: Home Spaces | Tier 1 (Full) | Prepositions of place (in, on, under); `listening_hub` room drag-and-drop |
| **W06** | The Classroom Toolkit | Pre-A1 Starters | Measurement: School Tools | Tier 1 (Full) | "There is / There are...", plurals; `math_quest` counting items 1–20 |
| **W07** | My Neighborhood Map | Pre-A1 Starters | Geography: Local Places | Tier 1 (Full) | Directional words (next to, between); `reading_hub` map icons |
| **W08** | Review & Showcase 1 | Pre-A1 Starters | Portfolio Curation: My Identity | Tier 1 (Full) | Consolidation of Units 1–7; `weekly_review` Starters Speaking Part 1 |
| **W09** | Clockwork Day (Routines) | Pre-A1 $\rightarrow$ A1 | Chronology: Hours & Minutes | Tier 1 (Full) | Present Simple ("I wake up at 7:00"); `listening_hub` audio clock match |
| **W10** | Food Fuel (Nutrition) | Pre-A1 $\rightarrow$ A1 | Biology: Healthy Eating Plate | Tier 1 (Full) | Countable vs Uncountable (apples vs milk); `science_lab` food sort |
| **W11** | Animal Kingdom (Habitats) | Pre-A1 $\rightarrow$ A1 | Zoology: Wild Animal Homes | Tier 1 (Full) | "Can / Cannot", animal abilities; `speaking_hub` animal sounds/shadow |
| **W12** | Weather Wonders (Seasons) | Pre-A1 $\rightarrow$ A1 | Meteorology: Sun, Rain, Wind | Tier 1 (Full) | "It is sunny today", weather adjectives; `math_quest` temperature bar graph |
| **W13** | Clothes for All Seasons | Pre-A1 $\rightarrow$ A1 | Materials: Wool, Cotton, Raincoat| Tier 1 (Full) | "He is wearing...", present continuous; `listening_hub` dress character |
| **W14** | The Action Arena | Pre-A1 $\rightarrow$ A1 | Physics: Pushing and Pulling | Tier 1 (Full) | Present Continuous actions; `science_lab` force experiments |
| **W15** | The Busy Park (Real-time) | A1 Movers Entry | Community: Shared Parks | Tier 2 (Chunks) | Present Continuous dialogue; `gear3_retell` 2-word verb chunks |
| **W16** | **Starters Milestone Showcase** | **★ Starters Shield** | **Starters Capstone Portfolio** | **Tier 1 (Check)** | **Summative Starters Mock: L1–L4, R1–R5, S1–S3; Badge Ceremony** |
| **W17** | Hobbies & Talent Show | A1 Movers | Music & Art: Instruments | Tier 2 (Chunks) | Adverbs of frequency (always, sometimes); `sentence_smash` syntax battle |
| **W18** | Transportation Station | A1 Movers | Engineering: Land, Air, Water | Tier 2 (Chunks) | Means of transport ("by bus, on foot"); `math_quest` vehicle speed graph |

---

#### Block B: The "First Steps Back" — A1 Movers (Weeks 19–36)
*Focus: Past of to be (was/were), Past Simple regular/irregular, narrative sequencing, notepad note-taking.*

| Week | Thematic Title | CEFR & Milestone | CLIL STEM Module | Scaffolding Tier | Grammar & Hub Focus |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **W19** | Yesterday's Ghost Town | A1 Movers | History: Old vs Modern Towns | Tier 2 (Chunks) | "There was / There were", past state; `reading_hub` old town story |
| **W20** | Where Were You? (Alibi) | A1 Movers | Logic: Time Logs & Detective | Tier 2 (Chunks) | Past questions ("Were you at home?"); `info_exchange` detective alibi |
| **W21** | The Dinosaur Dig | A1 Movers | Paleontology: Fossil Hunting | Tier 2 (Chunks) | Past Simple -ed regular verbs; `science_lab` virtual fossil brush |
| **W22** | Castle in the Past | A1 Movers | History: Medieval Castles | Tier 2 (Chunks) | Regular past narrative; `story_writer` 3-picture castle escape |
| **W23** | Yesterday at the Zoo | A1 Movers | Zoology: Animal Behaviors | Tier 2 (Chunks) | Irregular verbs (saw, ate, went); `listening_hub` Movers Part 2 dictation |
| **W24** | The Camping Trip Adventure | A1 Movers | Survival Science: Campfire & Map| Tier 2 (Chunks) | Irregular verbs (made, slept, found); `gear2_karaoke` campfire song |
| **W25** | The Lost Treasure Map | A1 Movers | Geography: Compass Points | Tier 2 (Chunks) | Directional past ("We walked north"); `science_report` treasure log |
| **W26** | A Busy Weekend (Timeline) | A1 Movers | Social Studies: Leisure Time | Tier 2 (Chunks) | Time connectives (First, Then, After that); `gear3_retell` timeline chunks |
| **W27** | Space Explorers (Apollo) | A1 Movers | Astronomy: Moon Landing | Tier 2 (Chunks) | Past Simple questions ("Did they land?"); `broadcast_studio` moon report |
| **W28** | The Great Inventions | A1 Movers | Technology: Wheel to Lightbulb | Tier 2 (Chunks) | Passive hint ("was invented by"); `math_quest` invention timeline bar |
| **W29** | Health & The Human Body | A1 Movers | Anatomy: Bones & Muscles | Tier 2 (Chunks) | Illnesses ("had a cold, hurt my leg"); `info_exchange` doctor clinic cards |
| **W30** | The Clean-Up Hero | A1 Movers | Ecology: Recycling Plastics | Tier 2 (Chunks) | "We collected / We sorted"; `science_lab` sorting trash into bins |
| **W31** | The Rainy Day Mystery | A1 Movers | Meteorology: Water Cycle Intro | Tier 2 (Chunks) | Past Continuous intro ("It was raining"); `reading_hub` rain mystery |
| **W32** | **Movers Milestone Showcase** | **★ Movers Shield** | **Movers Capstone Assessment** | **Tier 2 (Check)** | **Summative Movers Mock: L1–L5, R1–R6, S1–S4; 15-Shield Ceremony** |
| **W33** | **Corridor Safety & Friction** | **A2 Flyers Entry** | **Physics: Friction & Floor Surfaces**| **Tier 2 (Golden)** | **Irregular Past (slipped, broke, hurt); Cambridge Flyers 16-Part Golden Master** |
| **W34** | The Science Fair Challenge | A2 Flyers | Chemistry: Density & Floating | Tier 2 (Chunks) | Comparative / Superlative adjectives; Cambridge Rotation Cycle 2 |
| **W35** | Wild Forest Rangers | A2 Flyers | Ecology: Food Chains & Predators| Tier 2 (Chunks) | Past Continuous + Past Simple ("While Jake was..."); Cycle 3 |
| **W36** | The Hospital Visit | A2 Flyers | Medicine: First Aid & Recovery | Tier 2 (Chunks) | Modal verbs (should, must, have to); Cambridge Rotation Cycle 4 |

---

#### Block C: CLIL Foundations & Scientific Inquiry — A2 Flyers (Weeks 37–54)
*Focus: Authentic Cambridge Flyers 16 Parts, physical science, comparative bar models, 20+ words narrative.*

| Week | Thematic Title | CEFR & Milestone | CLIL STEM Module | Scaffolding Tier | Grammar & Hub Focus |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **W37** | **Full Cambridge Mock 1** | **A2 Flyers Check** | **Interdisciplinary Mock 1** | **Tier 2 (Exam)** | **Full 16-Part Exam Test across all 3 Papers; 15-Shield Evaluation** |
| **W38** | Energy All Around | A2 Flyers | Physics: Solar, Wind, Kinetic | Tier 2 (Chunks) | Cause & effect with *because*; `action_lab` solar panel angle |
| **W39** | Ocean Depths & Coral Reefs | A2 Flyers | Marine Biology: Coral Ecosystems| Tier 2 (Chunks) | Superlatives (*deepest, most dangerous*); `story_writer` submarine dive |
| **W40** | The Secret Garden (Botany) | A2 Flyers | Botany: Seed Germination | Tier 2 (Chunks) | Future with *will* & *going to*; `discovery_report` plant growth chart |
| **W41** | Weather Disasters & Safety | A2 Flyers | Earth Science: Storms & Floods | Tier 2 (Chunks) | Imperatives for safety; `broadcast_studio` weather emergency news |
| **W42** | Simple Machines at Work | A2 Flyers | Engineering: Levers & Pulleys | Tier 2 (Chunks) | "It makes work easier because..."; `action_lab` pulley weight lift |
| **W43** | Ancient Egypt & Pyramids | A2 Flyers | History: Archaeology & Tombs | Tier 2 (Chunks) | Past Simple passive (*were built*); `reading_hub` pyramid cloze |
| **W44** | Maps & Navigation | A2 Flyers | Cartography: Scale & Legends | Tier 2 (Chunks) | Prepositions of movement (*through, across, along*); `math_quest` scale |
| **W45** | The Sound Studio (Acoustics)| A2 Flyers | Physics: Sound Waves & Pitch | Tier 2 (Chunks) | Adverbs of manner (*loudly, softly, clearly*); `action_lab` sound wave frequency |
| **W46** | Light & Shadows | A2 Flyers | Optics: Transparent vs Opaque | Tier 2 (Chunks) | Relative pronouns (*which, that, who*); `discovery_report` shadow length |
| **W47** | Money & The Marketplace | A2 Flyers | Economics: Barter to Currency | Tier 2 (Chunks) | Quantifiers (*a few, several, enough*); `math_quest` multi-step currency |
| **W48** | Food Preservation Science | A2 Flyers | Food Tech: Drying, Salt, Freezing| Tier 2 (Chunks) | Zero Conditional (*If you freeze water, it turns to ice*); `science_lab` |
| **W49** | Animal Camouflage | A2 Flyers | Evolutionary Biology: Adaptation | Tier 2 (Chunks) | Purpose clauses (*in order to, so that*); `story_writer` chameleon hunt |
| **W50** | Transportation of Tomorrow | A2 Flyers | Tech: Electric Cars & Hyperloop | Tier 2 (Chunks) | First Conditional (*If we use clean energy...*); `broadcast_studio` EV car |
| **W51** | Our Solar System | A2 Flyers | Astronomy: Planets & Orbits | Tier 2 (Chunks) | Order of adjectives; `reading_hub` planetary facts extraction |
| **W52** | The Detective's Clues | A2 Flyers | Forensic Science: Fingerprints | Tier 2 (Chunks) | Modal deduction (*must be, can't be*); `info_exchange` suspect cards |
| **W53** | Wonders of the World | A2 Flyers | World Heritage: Taj Mahal, Wall | Tier 2 (Chunks) | Present Perfect intro (*Have you ever visited...?*); `speaking_hub` travel |
| **W54** | **Full Cambridge Mock 2** | **A2 Flyers Check** | **Interdisciplinary Mock 2** | **Tier 2 (Exam)** | **Comprehensive 16-Part Flyers Simulation; Progress Tracker Update** |

---

#### Block D: Cambridge Flyers Mastery — Milestone Target (Weeks 55–72)
*Focus: 100% Flyers Exam compliance, 15 Shields target, fast-paced speed match, full dialogue completion.*

| Week | Thematic Title | CEFR & Milestone | CLIL STEM Module | Scaffolding Tier | Grammar & Hub Focus |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **W55** | Cause & Effect Master | A2 Flyers $\rightarrow$ KET | Logic: Domino Chains in Nature | Tier 2 (Chunks) | Conjunctions *so / because / therefore*; `discovery_report` chain reaction |
| **W56** | Problem & Solution Squad | A2 Flyers $\rightarrow$ KET | Urban Planning: Traffic Jams | Tier 2 (Chunks) | Problem-solution paragraph; `story_writer` bike lane proposal |
| **W57** | Formal Letters & Requests | A2 Flyers $\rightarrow$ KET | Civics: Writing to City Mayor | Tier 2 (Chunks) | Formal register (*Dear Sir/Madam, I would like to...*); `writing_hub` |
| **W58** | The Great Debate (Pets) | A2 Flyers $\rightarrow$ KET | Ethics: Dogs vs Cats as Pets | Tier 2 (Chunks) | Opinion phrases (*In my opinion, I believe*); `broadcast_studio` pet debate |
| **W59** | Water Cycle & Purification | A2 Flyers $\rightarrow$ KET | Chemistry: Filter, Evaporate | Tier 2 (Chunks) | Passive voice in scientific process; `action_lab` sand charcoal filter |
| **W60** | Electricity in Circuits | A2 Flyers $\rightarrow$ KET | Physics: Series & Parallel | Tier 2 (Chunks) | Conditional logic (*If circuit is broken, current stops*); `action_lab` |
| **W61** | Earth's Layers & Volcanoes | A2 Flyers $\rightarrow$ KET | Geology: Crust, Mantle, Core | Tier 2 (Chunks) | Descriptive expository writing; `discovery_report` magma chamber |
| **W62** | Ecosystem Balance & Wolves | A2 Flyers $\rightarrow$ KET | Ecology: Trophic Cascades | Tier 2 (Chunks) | Complex causal chains; `reading_hub` Yellowstone wolf reintroduction |
| **W63** | Human Respiratory System | A2 Flyers $\rightarrow$ KET | Biology: Lungs & Oxygen | Tier 2 (Chunks) | Process explanation; `dictation` lung capacity measurements |
| **W64** | Ancient Rome & Aqueducts | A2 Flyers $\rightarrow$ KET | Engineering History: Waterways | Tier 2 (Chunks) | Past Passive (*aqueducts were constructed*); `math_quest` water volume |
| **W65** | Renewable Energy Transition | A2 Flyers $\rightarrow$ KET | Environmental Science: Turbines | Tier 2 (Chunks) | Persuasive writing; `broadcast_studio` green city presentation |
| **W66** | Space Rovers & Mars Colonization| A2 Flyers $\rightarrow$ KET | Space Exploration: Curiosity | Tier 2 (Chunks) | Future possibilities (*could support human life*); `story_writer` Mars |
| **W67** | The Media & Advertising | A2 Flyers $\rightarrow$ KET | Media Literacy: Slogans & Logos| Tier 2 (Chunks) | Persuasive techniques; `info_exchange` product feature pitch |
| **W68** | Genetics & Hereditary Traits | A2 Flyers $\rightarrow$ KET | Genetics: Eye Color & DNA Intro| Tier 2 (Chunks) | Comparison & probability; `math_quest` Punnett square ratio |
| **W69** | Microscopic World (Bacteria) | A2 Flyers $\rightarrow$ KET | Microbiology: Good vs Bad Germs | Tier 2 (Chunks) | Health advice with modals; `discovery_report` agar plate bacteria |
| **W70** | Cambridge Flyers Intensive 1 | A2 Flyers (Target) | Cambridge Exam Techniques | Tier 2 (Exam) | Listening Parts 1–5 speed tuning; Reading Part 5 text extraction |
| **W71** | Cambridge Flyers Intensive 2 | A2 Flyers (Target) | Cambridge Exam Techniques | Tier 2 (Exam) | Speaking Parts 1–4 examiner roleplay; Writing Part 7 narrative score |
| **W72** | **CAMBRIDGE FLYERS OFFICIAL GATE**| **★ 15 SHIELDS FLYERS**| **OFFICIAL A2 FLYERS EXAM MASTER**| **Tier 2 (Official)**| **Summative Cambridge Flyers Official Benchmark — Goal: 15/15 Shields!** |

---

### PHASE 2: ACADEMIC APPLICATION & CLIL STEM (Weeks 73–120)

#### Block E: Logical Reasoning & Scientific Inquiry — B1 Intermediate (Weeks 73–96)
*Focus: CER (Claim, Evidence, Reasoning), Academic Word List (AWL), passive voice in science, Singapore Math multi-step algebra.*

| Week | Thematic Title | CEFR & Milestone | CLIL STEM Module | Scaffolding Tier | Grammar & Hub Focus |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **W73** | Transition to Academic English | B1 Entry | Academic Inquiry: Scientific Method| Tier 3 (Guided CER)| AWL Vocabulary (*hypothesis, variable, analyze*); `discovery_report` CER |
| **W74** | Plate Tectonics & Earthquakes | B1 Preliminary | Geology: Fault Lines & Richter Scale| Tier 3 (Guided CER)| Passive voice (*plates are forced together*); `action_lab` seismograph |
| **W75** | Photosynthesis & Cellular Energy| B1 Preliminary | Biochemistry: Sunlight to Glucose | Tier 3 (Guided CER)| Chemical formula explanation; `reading_hub` chlorophyll absorption |
| **W76** | Force, Mass & Newton's Laws | B1 Preliminary | Physics: $F=ma$, Inertia | Tier 3 (Guided CER)| Math-language integration; `math_quest` force calculation word problems |
| **W77** | The Water Table & Aquifers | B1 Preliminary | Hydrology: Ground Water Depletion | Tier 3 (Guided CER)| Cause-consequence structure; `discovery_report` aquifer recharge rate |
| **W78** | Global Climates & Biomes | B1 Preliminary | Geography: Rainforest vs Tundra | Tier 3 (Guided CER)| Contrastive essays (*In contrast to tropical biomes...*); `writing_hub` |
| **W79** | The Industrial Revolution | B1 Preliminary | World History: Steam & Factories | Tier 3 (Guided CER)| Historical cause & impact; `broadcast_studio` documentary narration |
| **W80** | Supply, Demand & Market Prices | B1 Preliminary | Economics: Equilibrium Price | Tier 3 (Guided CER)| If-then conditional logic in economics; `math_quest` supply curve graph |
| **W81** | Cellular Biology (Plant vs Animal)| B1 Preliminary | Cytology: Nucleus, Mitochondria | Tier 3 (Guided CER)| Comparative analysis table; `science_lab` cell organelle labeling |
| **W82** | Heat Transfer (Conduction, etc.)| B1 Preliminary | Thermodynamics: Convection Currents| Tier 3 (Guided CER)| Process explanation with transitional signals; `action_lab` thermal leak |
| **W83** | Waves: Sound, Light, Seismic | B1 Preliminary | Wave Mechanics: Frequency, Wave | Tier 3 (Guided CER)| Scientific terminology; `listening_hub` audio spectrum analysis |
| **W84** | World Religions & Cultures | B1 Preliminary | Anthropology: Sacred Architecture | Tier 3 (Guided CER)| Culturally neutral academic discourse; `reading_hub` comparative text |
| **W85** | The Digestive Engine | B1 Preliminary | Physiology: Enzymes & Nutrients | Tier 3 (Guided CER)| Sequence markers (*initially, subsequently, ultimately*); `discovery_report` |
| **W86** | Space Exploration: Telescopes | B1 Preliminary | Astrophysics: Hubble to James Webb | Tier 3 (Guided CER)| Speculative language (*may indicate the presence of*); `broadcast_studio` |
| **W87** | Governments & Democracy | B1 Preliminary | Civics: 3 Branches of Government | Tier 3 (Guided CER)| Legal and political vocabulary; `sentence_smash` checks & balances |
| **W88** | Circular Economy & Waste | B1 Preliminary | Ecology: Cradle to Cradle Design | Tier 3 (Guided CER)| Persuasive essay with policy proposals; `writing_hub` zero-waste plan |
| **W89** | Chemical Reactions & Bonds | B1+ Intermediate | Chemistry: Exothermic vs Endothermic| Tier 3 (Guided CER)| Reaction descriptions; `action_lab` chemical temperature probe |
| **W90** | Genetics: CRISPR & Gene Editing | B1+ Intermediate | Bioethics: Genetic Engineering | Tier 3 (Guided CER)| Ethical debates (*Should scientists modify...?*); `broadcast_studio` |
| **W91** | Globalization & Trade Routes | B1+ Intermediate | Geography: Suez & Panama Canals | Tier 3 (Guided CER)| Economic interdependence; `math_quest` shipping container logistics |
| **W92** | Renewable Energy Storage | B1+ Intermediate | Energy Tech: Lithium Batteries | Tier 3 (Guided CER)| Technical problem-solution synthesis; `discovery_report` battery cycle |
| **W93** | The Human Brain & Neuroplasticity| B1+ Intermediate | Neuroscience: Synapses & Memory | Tier 3 (Guided CER)| Academic reading synthesis across two medical abstracts; `reading_hub` |
| **W94** | Urbanization & Megacities | B1+ Intermediate | Sociology: Slums to Smart Cities | Tier 3 (Guided CER)| Data interpretation from census charts; `math_quest` population density |
| **W95** | Ocean Acidification & Coral Loss| B1+ Intermediate | Marine Chemistry: pH Scale & Carbon | Tier 3 (Guided CER)| Full CER Report with statistical evidence; `discovery_report` |
| **W96** | **Mid-Phase 2 Assessment & KET** | **B1 Benchmark** | **B1 Cambridge KET/PET Mock** | **Tier 3 (Exam)** | **Full B1 Summative Assessment; Academic Writing & Speaking Evaluation** |

---

#### Block F: Interdisciplinary Innovation & Global Systems (Weeks 97–120)
*Focus: Extended expository essays, research synthesis, lab reports, statistical interpretation, PET readiness.*

| Week | Thematic Title | CEFR & Milestone | CLIL STEM Module | Scaffolding Tier | Grammar & Hub Focus |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **W97** | Artificial Intelligence & Algorithms| B1+ Intermediate | Computer Science: Neural Networks | Tier 3 (Autonomous)| Defining abstract concepts (*An algorithm is defined as...*); `action_lab` |
| **W98** | Climate Modeling & Greenhouse Gases| B1+ Intermediate | Climatology: $CO_2$ vs Methane PPM | Tier 3 (Autonomous)| Interpreting multi-line graphs; `discovery_report` temperature anomalies |
| **W99** | Ancient Greece & Philosophical Logic| B1+ Intermediate | Philosophy: Socratic Questioning | Tier 3 (Autonomous)| Rhetorical fallacies; `sentence_smash` syllogism logic structures |
| **W100**| Epidemiology & Pandemic Control | B1+ Intermediate | Public Health: $R_0$ Reproduction | Tier 3 (Autonomous)| Mathematical modeling in health; `math_quest` viral spread rate |
| **W101**| Space Settlement: Moon to Mars | B1+ Intermediate | Aerospace: Life Support Systems | Tier 3 (Autonomous)| Engineering feasibility study; `writing_hub` lunar base proposal |
| **W102**| Cyber Security & Digital Privacy | B1+ Intermediate | InfoSec: Encryption & Data Mining | Tier 3 (Autonomous)| Complex conditionals (*Were user data not encrypted...*); `broadcast_studio` |
| **W103**| Agriculture & GMO Crops | B1+ Intermediate | Agronomy: Food Security vs Ecology | Tier 3 (Autonomous)| Multi-perspective synthesis essay; `reading_hub` drought-resistant rice |
| **W104**| Renewable Energy: Nuclear Power? | B1+ Intermediate | Nuclear Physics: Fission vs Fusion | Tier 3 (Autonomous)| Balanced argument structure (Pros vs Cons); `broadcast_studio` nuclear debate |
| **W105**| Microplastics in Marine Trophic Chains| B1+ Intermediate | Environmental Chemistry: Bioaccumulation| Tier 3 (Autonomous)| Formal laboratory report with methodology; `discovery_report` |
| **W106**| Monetary Policy & Inflation | B1+ Intermediate | Macroeconomics: Central Banks | Tier 3 (Autonomous)| Economic indicators; `math_quest` inflation rate compound calculations |
| **W107**| Quantum Computing Intro | B1+ Intermediate | Quantum Physics: Qubits vs Bits | Tier 3 (Autonomous)| Analogous explanation skills; `broadcast_studio` TED-style youth talk |
| **W108**| Clean Water Desalination | B1+ Intermediate | Chemical Engineering: Reverse Osmosis| Tier 3 (Autonomous)| Process flowchart explanation; `action_lab` membrane pressure simulation |
| **W109**| Evolutionary Biology: Speciation | B1+ Intermediate | Biology: Darwin's Finches & Isolations| Tier 3 (Autonomous)| Academic abstract reading; `reading_hub` Galapagos field notes |
| **W110**| Space Debris & Orbital Cleanup | B1+ Intermediate | Orbital Mechanics: Kessler Syndrome | Tier 3 (Autonomous)| Policy proposal writing; `writing_hub` UN outer space treaty memo |
| **W111**| The Psychology of Learning & Focus | B1+ Intermediate | Cognitive Science: Executive Function| Tier 3 (Autonomous)| Self-regulation research synthesis; `info_exchange` cognitive interview |
| **W112**| Endangered Languages & Culture | B1+ Intermediate | Linguistics: Language Preservation | Tier 3 (Autonomous)| Expository essay on cultural heritage; `broadcast_studio` audio documentary |
| **W113**| Renewable Infrastructure Design | B1+ Intermediate | Civil Engineering: Smart Power Grids | Tier 3 (Autonomous)| Cost-benefit analysis; `math_quest` grid load balancing bar model |
| **W114**| Infectious Diseases & Antibiotics | B1+ Intermediate | Pharmacology: Superbug Resistance | Tier 3 (Autonomous)| Scientific hypothesis testing; `discovery_report` antibiotic resistance |
| **W115**| Autonomous Vehicles & Ethics | B1+ Intermediate | Robotics: The Trolley Problem | Tier 3 (Autonomous)| Ethical reasoning essays; `story_writer` self-driving moral dilemma |
| **W116**| Ocean Currents & El Niño | B1+ Intermediate | Oceanography: Thermohaline Circulation| Tier 3 (Autonomous)| Systems dynamics explanation; `reading_hub` atmospheric teleconnections |
| **W117**| International Space Station Politics| B1+ Intermediate | Geopolitics: Orbital Diplomacy | Tier 3 (Autonomous)| Academic summary of treaties; `sentence_smash` diplomatic clauses |
| **W118**| Biodiversity & Habitat Fragmentation| B1+ Intermediate | Conservation Biology: Wildlife Corridors| Tier 3 (Autonomous)| Environmental impact assessment report; `discovery_report` |
| **W119**| PET Cambridge Academic Benchmark | B1+ Intermediate | Academic English Benchmark | Tier 3 (Exam) | Comprehensive Cambridge PET 4-Skills Evaluation; Score Verification |
| **W120**| **PHASE 2 CAPSTONE LAB SHOWCASE** | **★ B1+ CLIL PASS** | **Student Independent Research Fair** | **Tier 3 (Capstone)**| **Public Presentation of Independent Scientific Paper & Viva Voce Defense** |

---

### PHASE 3: ADVANCED SYNTHESIS, DEBATE & EMI (Weeks 121–156)

#### Block G: Formal Argumentation & Debate (Weeks 121–144)
*Focus: 5-Paragraph Argumentative Essays, Parliamentary Debate (Affirmative/Negative), counterarguments & rebuttals, primary source synthesis.*

| Week | Thematic Debate Project | CEFR & Milestone | Project Research Focus | Scaffolding Tier | Genre & Language Output |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **W121**| Debate 1: Homework in Primary School| B2 Academic | Educational Research: Sleep & Retention| Tier 3 (Debate) | Introduction & Thesis Statement writing; `writing_hub` |
| **W122**| Debate 1: Constructing Arguments | B2 Academic | Empirical Evidence: OECD Pisa Scores | Tier 3 (Debate) | Body Paragraph 1 & 2 (PEEL: Point, Evidence, Explain, Link) |
| **W123**| Debate 1: Anticipating Counterclaims| B2 Academic | Parental Perspective vs Mental Health | Tier 3 (Debate) | Counterargument framing (*Critics contend that... However...*) |
| **W124**| Debate 1: Live Tournament Round 1 | B2 Academic | Formal Debate Protocol (3-min speeches)| Tier 3 (Debate) | `broadcast_studio` Live Affirmative vs Negative debate recording |
| **W125**| Debate 2: Video Games & Cognition | B2 Academic | Neurobiology: Reaction Time vs Addiction| Tier 3 (Debate) | Synthesizing conflicting scientific papers; `reading_hub` |
| **W126**| Debate 2: Data & Statistical Claims | B2 Academic | Screen Time Data & Psychological Health| Tier 3 (Debate) | `math_quest` interpreting correlation vs causation graphs |
| **W127**| Debate 2: Rebuttal & Cross-Exam | B2 Academic | Logical Fallacies (Ad Hominem, Strawman)| Tier 3 (Debate) | `sentence_smash` rapid rebuttal syntax templates |
| **W128**| Debate 2: Live Tournament Round 2 | B2 Academic | Cross-Examination & Speaker Points | Tier 3 (Debate) | `broadcast_studio` debate duel with timer & audience poll |
| **W129**| Debate 3: Smartphones Under 12? | B2 Academic | Developmental Psychology: Social Media | Tier 3 (Debate) | Drafting 5-paragraph position paper; `writing_hub` |
| **W130**| Debate 3: Global Legislative Models | B2 Academic | Comparative Law: France & Florida Bans | Tier 3 (Debate) | Legal precedent citation; `reading_hub` statutory summaries |
| **W131**| Debate 3: Rhetorical Persuasion | B2 Academic | Ethos, Pathos, Logos in Public Speaking| Tier 3 (Debate) | Voice modulation, emphatic stress; `gear2_karaoke` historic speeches |
| **W132**| Debate 3: Live Tournament Round 3 | B2 Academic | Parliamentary Championship Debate | Tier 3 (Debate) | 5-min championship debate match; peer score evaluation |
| **W133**| Project 4: AI in Classroom Testing | B2 Academic | Generative AI & Academic Integrity | Tier 3 (Debate) | Literature review drafting; `discovery_report` AI detector bias |
| **W134**| Project 4: Empirical Survey Design | B2 Academic | Social Survey: Polling School Peers | Tier 3 (Debate) | Questionnaire construction; `info_exchange` survey interviews |
| **W135**| Project 4: Data Visualization Paper | B2 Academic | Statistical Presentation in Essays | Tier 3 (Debate) | Embedding bar charts & callout boxes in academic text |
| **W136**| Project 4: Live Policy Defense | B2 Academic | School Board Mock Public Hearing | Tier 3 (Debate) | `broadcast_studio` presenting policy recommendations to Board |
| **W137**| Acellus US K-12 Science Alignment 1| B2 EMI Ready | US Grade 7 Science: Genetics & Cells | Tier 3 (EMI US) | Acellus lesson comprehension & quiz mastery; `reading_hub` |
| **W138**| Acellus US K-12 Science Alignment 2| B2 EMI Ready | US Grade 7 Science: Earth & Space | Tier 3 (EMI US) | Specialized US science vocabulary & diagram completion |
| **W139**| Acellus US K-12 Social Studies 1 | B2 EMI Ready | US Grade 7 Civics: US Constitution | Tier 3 (EMI US) | Primary text analysis (Bill of Rights, Preamble); `sentence_smash` |
| **W140**| Acellus US K-12 Social Studies 2 | B2 EMI Ready | US Grade 7 History: American Republic | Tier 3 (EMI US) | Historical document DBQ (Document-Based Questions); `writing_hub` |
| **W141**| Acellus US K-12 Mathematics 1 | B2 EMI Ready | Pre-Algebra: Linear Equations & Slope | Tier 3 (EMI US) | English mathematical word problems; `math_quest` $y=mx+b$ |
| **W142**| Acellus US K-12 Mathematics 2 | B2 EMI Ready | Pre-Algebra: Geometry & Coordinate Plane| Tier 3 (EMI US) | Perimeter, Area, Volume explanations; `action_lab` 3D geometry |
| **W143**| Advanced Genre Review: Narrative | B2 Academic | Creative Fiction: Flashbacks & Pacing | Tier 3 (Autonomous)| High-level short story writing ($\ge 200$ words); `story_writer` |
| **W144**| Advanced Genre Review: Expository | B2 Academic | Academic Exposition: Cause & Solution | Tier 3 (Autonomous)| Rigorous expository article with citations; `discovery_report` |

---

#### Block H: Capstone Project, Defense & Graduation (Weeks 145–156)
*Focus: Capstone research project, oral defense, timed writing, Acellus online simulation, graduation showcase.*

| Week | Thematic Milestone | CEFR & Milestone | Capstone Project Focus | Scaffolding Tier | Final Output & Certification |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **W145**| Capstone Project: Topic Selection | B2 EMI Ready | Independent Research: Student Passion | Tier 3 (Capstone)| Research Proposal & Annotated Bibliography (3 academic sources) |
| **W146**| Capstone Project: Methodology | B2 EMI Ready | Research Design: Experiment or Survey | Tier 3 (Capstone)| Methodology section draft; peer review rubric in `info_exchange` |
| **W147**| Capstone Project: Data Collection | B2 EMI Ready | Quantitative / Qualitative Data Log | Tier 3 (Capstone)| Raw data recording; `math_quest` statistical mean, median, mode |
| **W148**| Capstone Project: First Draft | B2 EMI Ready | 1,000-word Academic Paper Draft | Tier 3 (Capstone)| Full manuscript submission: Abstract, Intro, Body, Conclusion |
| **W149**| Capstone Project: Peer Review | B2 EMI Ready | Academic Critique & Revision | Tier 3 (Capstone)| Line-by-line editorial feedback and revisions; citation checking |
| **W150**| Impromptu Speaking & Viva Voce | B2 EMI Ready | Oral Defense Simulation | Tier 3 (Capstone)| `broadcast_studio` answering unscripted academic questions (2 mins) |
| **W151**| Timed Synthesis Essay Writing | B2 EMI Ready | Simulated International Exam (TOEFL/IELTS)| Tier 3 (Capstone)| 45-minute timed essay on unannounced academic prompt; `writing_hub` |
| **W152**| Acellus US K-12 Final Exam Sim | B2 EMI Ready | US Middle School Grade 7/8 Battery | Tier 3 (Capstone)| Simulated US standard test (ELA, Science, Social Studies, Math) |
| **W153**| Slide Deck Design & Presentation | B2 EMI Ready | Visual Rhetoric: Keynote Slide Deck | Tier 3 (Capstone)| 10-slide visual deck synthesis for public defense; `action_lab` |
| **W154**| Dress Rehearsal & Defense | B2 EMI Ready | Formal Academic Presentation (10 mins) | Tier 3 (Capstone)| Complete mock defense recorded with teleprompter & slides |
| **W155**| Graduation Portfolio Curation | B2 EMI Ready | 3-Year Master Learning Portfolio | Tier 3 (Capstone)| Digital compilation: Starters, Movers, Flyers 15 Shields + Capstone |
| **W156**| **GRADUATION CEREMONY & SHOWCASE**| **★ B2 EMI MASTER**| **3-YEAR CAPSTONE PUBLIC DEFENSE** | **★ GRADUATION** | **Public Defense before Academic Board & Parents; B2 EMI Certification!** |

---

## 4. Technical Validation Invariant

1. **Pre-Production Audit**: Any new week generated must validate against the curriculum mapping in this file.
2. **Schema Verification**: Every week file in `src/data/weeks/week_XX/` must reflect the assigned `cefr_stage`, `exam_milestone`, `clil_stem_module`, and `scaffolding_tier`.
3. **No Drift with Baseline**: This document supplements and operationalizes `docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt` without deleting or overwriting the original pedagogical philosophy.
