/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 130 | Theme: "Deep Ocean Exploration & Abyssal Organisms" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.315Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 130,
  "theme": "Deep Ocean Exploration & Abyssal Organisms",
  "cefr_level": "B2 First",
  "picture_story": {
    "title": "Exploring the Hadal Ocean Abyss",
    "prompt_en": "Look at the four pictures. Write a formal investigative report about Dr. Sylvia Brooks and Liam Ross exploring hadal trenches in a titanium submersible. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Viết bản báo cáo điều tra về Tiến sĩ Sylvia Brooks và Liam Ross thám hiểm các rãnh biển sâu trong tàu lặn ti-tan (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Dr. Sylvia Brooks and Liam Ross conducted a deep scientific dive into the hadal ocean trench. First, the titanium submersible descended into freezing darkness past eight thousand meters. Next, external floodlights illuminated hydrothermal chimneys covered with chemosynthetic tubeworms. After robotic claws safely collected delicate benthic specimens, the team published twelve new marine species discoveries.",
    "word_bank": [
      "abyssal",
      "trench",
      "submersible",
      "bioluminescence",
      "hydrothermal",
      "pressure",
      "benthic",
      "specimen",
      "organism",
      "expedition"
    ],
    "sentence_frames": [
      "Initially, the specialized titanium ___ was deployed from the oceanographic vessel.",
      "Pressure monitors indicated that external hydrostatic ___ exceeded one thousand atmospheres.",
      "Robotic claws carefully gathered delicate ___ living near the hydrothermal vent.",
      "Ultimately, the research expedition announced the groundbreaking ___ of new marine life."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Submersible Deployment",
        "title_vi": "Triển Khai Tàu Lặn",
        "image_url": "/images/week130/writing_panel_1.png",
        "image_prompt": "A heavy marine research crane lowering a spherical yellow titanium submersible into dark ocean water.",
        "caption": "A research crane deployed the titanium submersible into the ocean.",
        "sentence_frame": "First, the research crane [deployed the yellow titanium submersible] into the [choppy ocean waters].",
        "pills": [
          "deployed the yellow titanium submersible",
          "choppy ocean waters",
          "Dr. Brooks and Liam",
          "hadal expedition began"
        ],
        "connectors": [
          "First,",
          "Initially,",
          "At the start of the dive,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Midnight Zone Descent",
        "title_vi": "Hành Trình Lặn Vùng Biển Nửa Đêm",
        "image_url": "/images/week130/writing_panel_2.png",
        "image_prompt": "Scientists looking through thick quartz viewports inside the submersible as glowing blue bioluminescent jellyfish pass.",
        "caption": "Bioluminescent jellyfish drifted past the submersible viewport.",
        "sentence_frame": "Next, glowing [bioluminescent marine organisms] drifted past [the thick quartz viewports].",
        "pills": [
          "bioluminescent marine organisms",
          "the thick quartz viewports",
          "midnight zone",
          "freezing darkness"
        ],
        "connectors": [
          "Next,",
          "Subsequently,",
          "As depth increased,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Hydrothermal Vent Discovery",
        "title_vi": "Phát Hiện Miệng Phun Thủy Nhiệt",
        "image_url": "/images/week130/writing_panel_3.png",
        "image_prompt": "Bright submersible spotlights illuminating towering black mineral hydrothermal vents surrounded by white tubeworms.",
        "caption": "Powerful spotlights revealed towering black hydrothermal chimneys.",
        "sentence_frame": "After that, powerful floodlights [illuminated towering hydrothermal vents] surrounded by [dense tubeworm colonies].",
        "pills": [
          "illuminated towering hydrothermal vents",
          "dense tubeworm colonies",
          "superheated mineral fluid",
          "chemosynthetic ecosystem"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Upon reaching the trench floor,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Specimen Sampling and Return",
        "title_vi": "Lấy Mẫu Sinh Học và Trở Về",
        "image_url": "/images/week130/writing_panel_4.png",
        "image_prompt": "A robotic hydraulic arm gently placing a white crustacean into an insulated specimen bio-box on the seabed.",
        "caption": "The robotic arm collected benthic specimens for laboratory analysis.",
        "sentence_frame": "In the end, robotic arms [collected rare benthic specimens] for [international scientific publication].",
        "pills": [
          "collected rare benthic specimens",
          "international scientific publication",
          "specimen bio-box",
          "groundbreaking discoveries"
        ],
        "connectors": [
          "In the end,",
          "Finally,",
          "Consequently,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Submersible Deployment",
        "image_url": "/images/week130/writing_panel_1.png",
        "caption": "A research crane deployed the titanium submersible into the ocean.",
        "frame_L1": "First, the support ship launched the titanium submersible. The crew checked air pressure before descending.",
        "connectors": [
          "First,",
          "Initially,",
          "To begin,"
        ],
        "sentence_hint": "Write 2 sentences describing the submersible deployment into the sea.",
        "ordered_chips": [
          "The research ship launched",
          "the titanium submersible",
          "into the deep ocean",
          "for scientific exploration"
        ],
        "pills": [
          "titanium submersible",
          "support ship",
          "checked pressure",
          "deep descent"
        ],
        "sentence_frame": "First, the research ship [launched the titanium submersible] into the [deep hadal trench]."
      },
      {
        "badge_label": "BUILD",
        "title": "Bioluminescent Encounters",
        "image_url": "/images/week130/writing_panel_2.png",
        "caption": "Bioluminescent jellyfish drifted past the submersible viewport.",
        "frame_L1": "Next, the vessel passed through the midnight zone. Bioluminescent creatures flashed blue light in the pitch-black water.",
        "connectors": [
          "Next,",
          "Subsequently,",
          "In addition,"
        ],
        "sentence_hint": "Write 2 sentences describing bioluminescence in the deep zone.",
        "pills": [
          "midnight zone",
          "bioluminescent creatures",
          "blue light",
          "pitch-black water"
        ],
        "sentence_frame": "Next, the submersible entered [the midnight zone] where [bioluminescent creatures flashed light]."
      },
      {
        "badge_label": "WRITE",
        "title": "Hydrothermal Vent Exploration",
        "image_url": "/images/week130/writing_panel_3.png",
        "caption": "Powerful spotlights revealed towering black hydrothermal chimneys.",
        "frame_L1": "After that, the pilots spotted volcanic hydrothermal vents. Giant tubeworms thrived around the mineral-rich black smoke.",
        "connectors": [
          "After that,",
          "Later,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences describing hydrothermal vents and tubeworms.",
        "pills": [
          "hydrothermal vents",
          "mineral-rich smoke",
          "giant tubeworms",
          "trench floor"
        ],
        "sentence_frame": "After that, the pilots located [hydrothermal vents] surrounded by [giant tubeworms]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Specimen Collection",
        "image_url": "/images/week130/writing_panel_4.png",
        "caption": "The robotic arm collected benthic specimens for laboratory analysis.",
        "frame_L1": "In the end, robotic mechanical claws gathered biological specimens. The expedition confirmed twelve previously undiscovered species.",
        "connectors": [
          "In the end,",
          "Finally,",
          "As a result,"
        ],
        "sentence_hint": "Write 2 sentences about collecting deep-sea specimens.",
        "pills": [
          "robotic claws",
          "biological specimens",
          "undiscovered species",
          "docked safely"
        ],
        "sentence_frame": "In the end, robotic claws [gathered biological specimens] and confirmed [twelve new marine species]."
      }
    ]
  }
};
export default writingHubData;
