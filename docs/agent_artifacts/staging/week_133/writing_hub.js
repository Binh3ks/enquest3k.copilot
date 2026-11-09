/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 133 | Theme: "Astrophysics: Black Holes, Galaxies & Gravity" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.318Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 133,
  "theme": "Astrophysics: Black Holes, Galaxies & Gravity",
  "cefr_level": "B2 First",
  "picture_story": {
    "title": "Investigating Black Holes and Gravitational Waves",
    "prompt_en": "Look at the four pictures. Write a formal investigative report about Dr. Carl Sagan-Smith and Zoe Vance detecting gravitational waves from colliding black holes. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Viết bản báo cáo điều tra về Tiến sĩ Carl Sagan-Smith và Zoe Vance phát hiện sóng hấp dẫn từ các lỗ đen va chạm (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Dr. Carl Sagan-Smith and Zoe Vance detected gravitational wave signals at the mountain observatory. First, the submillimeter radio telescope array was calibrated under clear desert skies. Next, laser interferometers recorded spacetime ripples originating from two colliding black holes. After supercomputers reconstructed the glowing event horizon accretion disk, the team published their breakthrough astrophysical study.",
    "word_bank": [
      "astrophysics",
      "galaxy",
      "gravity",
      "singularity",
      "orbit",
      "telescope",
      "data",
      "statistic",
      "percent",
      "study"
    ],
    "sentence_frames": [
      "Initially, astronomers aligned radio ___ dishes to survey deep cosmic fields.",
      "Interferometer telemetry proved that the gravitational wave must have ___ from a black hole merger.",
      "Statistical ___ confirmed that the majority of massive galaxies harbor central singularities.",
      "Ultimately, the research team published their landmark observational ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Telescope Array Alignment",
        "title_vi": "Căn Chỉnh Dàn Kính Thiên Văn",
        "image_url": "/images/week133/writing_panel_1.png",
        "image_prompt": "Two astronomers in warm jackets calibrating large white satellite dish telescopes on a dark mountain under a starry night sky.",
        "caption": "Astronomers calibrated radio telescope dishes on the high plateau.",
        "sentence_frame": "First, the astronomers [calibrated radio telescope dishes] beneath [the starry night sky].",
        "pills": [
          "calibrated radio telescope dishes",
          "the starry night sky",
          "Carl and Zoe",
          "high mountain observatory"
        ],
        "connectors": [
          "First,",
          "Initially,",
          "On Monday evening,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Gravitational Wave Detection",
        "title_vi": "Phát Hiện Sóng Hấp Dẫn",
        "image_url": "/images/week133/writing_panel_2.png",
        "image_prompt": "A computer monitor displaying glowing green wave interference spikes labeled Gravitational Wave Event.",
        "caption": "Laser interferometers detected spacetime ripples from colliding black holes.",
        "sentence_frame": "Next, sensitive laser interferometers [detected spacetime ripples] produced by [two colliding black holes].",
        "pills": [
          "detected spacetime ripples",
          "two colliding black holes",
          "laser interferometry",
          "gravitational signal"
        ],
        "connectors": [
          "Next,",
          "Subsequently,",
          "Shortly afterwards,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Accretion Disk Reconstruction",
        "title_vi": "Tái Tạo Đĩa Bồi Tụ",
        "image_url": "/images/week133/writing_panel_3.png",
        "image_prompt": "A glowing orange and yellow ring of gas surrounding a black circular shadow on a high-resolution simulation monitor.",
        "caption": "Supercomputers reconstructed the glowing ring around the black hole singularity.",
        "sentence_frame": "After that, supercomputers reconstructed [the glowing accretion ring] surrounding [the black hole singularity].",
        "pills": [
          "the glowing accretion ring",
          "the black hole singularity",
          "event horizon",
          "spectroscopic data"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Following data synthesis,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "International Scientific Publication",
        "title_vi": "Công Bố Khoa Học Quốc Tế",
        "image_url": "/images/week133/writing_panel_4.png",
        "image_prompt": "Scientists holding a published astrophysics journal with the black hole image on the cover smiling at a press podium.",
        "caption": "The observatory announced empirical confirmation of general relativity.",
        "sentence_frame": "In the end, the research team [published their breakthrough study] to [international scientific acclaim].",
        "pills": [
          "published their breakthrough study",
          "international scientific acclaim",
          "empirical confirmation",
          "Einstein's relativity verified"
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
        "title": "Observatory Calibration",
        "image_url": "/images/week133/writing_panel_1.png",
        "caption": "Astronomers calibrated radio telescope dishes on the high plateau.",
        "frame_L1": "First, the astronomers aligned the dish antennas. They checked receiver sensitivity under the desert night sky.",
        "connectors": [
          "First,",
          "Initially,",
          "To begin,"
        ],
        "sentence_hint": "Write 2 sentences describing radio telescope calibration.",
        "ordered_chips": [
          "Astronomers aligned",
          "radio telescope antennas",
          "to observe",
          "deep cosmic signals"
        ],
        "pills": [
          "aligned antennas",
          "cosmic signals",
          "Carl and Zoe",
          "desert observatory"
        ],
        "sentence_frame": "First, astronomers aligned [radio telescope antennas] to survey [distant cosmic galaxies]."
      },
      {
        "badge_label": "BUILD",
        "title": "Wave Ripple Detection",
        "image_url": "/images/week133/writing_panel_2.png",
        "caption": "Laser interferometers detected spacetime ripples from colliding black holes.",
        "frame_L1": "Next, the laser sensors recorded a gravitational ripple. The signal must have originated from colliding black holes.",
        "connectors": [
          "Next,",
          "Subsequently,",
          "In addition,"
        ],
        "sentence_hint": "Write 2 sentences about detecting gravitational waves.",
        "pills": [
          "laser sensors",
          "gravitational ripple",
          "must have originated",
          "black holes"
        ],
        "sentence_frame": "Next, laser sensors detected [a gravitational ripple] that [originated from colliding black holes]."
      },
      {
        "badge_label": "WRITE",
        "title": "Event Horizon Imaging",
        "image_url": "/images/week133/writing_panel_3.png",
        "caption": "Supercomputers reconstructed the glowing ring around the black hole singularity.",
        "frame_L1": "After that, supercomputers processed telescope data. They generated a clear image of the glowing event horizon.",
        "connectors": [
          "After that,",
          "Later,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences describing imaging the black hole.",
        "pills": [
          "supercomputers processed",
          "telescope data",
          "glowing image",
          "event horizon"
        ],
        "sentence_frame": "After that, supercomputers processed [telescope data] to image [the glowing event horizon]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Astrophysical Confirmation",
        "image_url": "/images/week133/writing_panel_4.png",
        "caption": "The observatory announced empirical confirmation of general relativity.",
        "frame_L1": "In the end, the scientists published their findings. The observational study confirmed Einstein's theory of general relativity.",
        "connectors": [
          "In the end,",
          "Finally,",
          "As a result,"
        ],
        "sentence_hint": "Write 2 sentences about publishing confirmation of general relativity.",
        "pills": [
          "published findings",
          "observational study",
          "general relativity",
          "scientific breakthrough"
        ],
        "sentence_frame": "In the end, the scientists published [their observational study] confirming [Einstein's general relativity]."
      }
    ]
  }
};
export default writingHubData;
