# ENGQUEST3K — ASSET NAMING CONVENTION & PRODUCTION SPECIFICATION
> **Target Audience:** Content Creators, Graphic Designers, Audio Engineers, Data Entry Team  
> **Applicable Weeks:** Week 34 through Week 72 (Mass Production Pipeline)  
> **Storage Backend:** Cloudflare R2 CDN (`https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev`)

---

## 1. GENERAL NAMING RULE PATTERN

All asset filenames must strictly adhere to the lower-case snake_case convention with explicit week prefixes:

```text
public/images/week[XX]/w[XX]_[hub]_[station]_[description].[png|jpg|svg]
```

Where:
- `[XX]` = 2-digit week number padded with zero (e.g. `34`, `35`, `36`)
- `[hub]` = `hub1` (Reading/Writing), `hub2` (Listening/Arena), `hub3` (Writing Studio), `hub4` (Speaking)
- `[station]` = `webtoon`, `rw_p1`, `rw_p7`, `listening_p1`, `listening_p3`, `listening_p5`, `speaking_p1`, `speaking_p3`
- `[description]` = Concise, semantic object descriptor in English

---

## 2. IMAGE ASSET DIRECTORY & NAMING SPECIFICATIONS

### HUB 1: READING & WRITING STUDIO
| Sub-tab / Station | File Location & Naming Pattern | Format / Aspect Ratio | Prompt / Art Style Standard |
| :--- | :--- | :--- | :--- |
| **📖 Story Time** (3D Webtoon) | `public/images/week[XX]/webtoon_scene_[1-5].png` | PNG / JPG (4:3) | 3D Pixar render, vibrant colors, soft studio lighting. No text. |
| **🧩 Word Match** (R&W Part 1) | `public/images/week[XX]/w[XX]_rw_p1_[word_name].jpg` | JPG (1:1) | 3D Pixar isolated object render on clean background. |
| **📝 Story Detective** (R&W Part 5) | `public/images/week[XX]/w[XX]_rw_p5_passage_header.jpg` | JPG (16:9) | Pixar 3D full-bleed narrative cover header. |

### HUB 2: ARENA GAMES & LISTENING MISSIONS
| Sub-tab / Station | File Location & Naming Pattern | Format / Aspect Ratio | Prompt / Art Style Standard |
| :--- | :--- | :--- | :--- |
| **🔗 Draw the Lines** (List P1) | `public/images/week[XX]/w[XX]_listening_p1_scene.jpg` | JPG (16:9) | 3D Pixar multi-character scene with 5 identifiable targets. |
| **🔍 Item Hunt** (List P3 Cards A-H) | `public/images/week[XX]/card_[item_name].[jpg/png]` | JPG & PNG (1:1) | 3D Pixar single object card. Must export both PNG and JPG. |
| **🖼️ Picture Quiz** (List P4 Cards A/B/C) | `public/images/week[XX]/w[XX]_listening_p4_q[1-3]_[a/b/c].jpg` | JPG (4:3) | 3D Pixar scene illustrating specific distractor options. |
| **🎨 Magic Color** (List P5 Line Art) | `public/images/week[XX]/w[XX]_listening_p5_lineart.svg` | SVG (Vector) | Clean monochrome vector contours (`stroke="#0f172a"`). |
| **📐 Bar Model Quest** (Singapore Math) | `public/images/week[XX]/barmodel_w[XX]_[adv/easy]_p[1-5].svg` | SVG (Vector) | Custom 5 Bar Model SVG diagrams per week per mode. |

### HUB 3: STORY WRITING STUDIO
| Sub-tab / Station | File Location & Naming Pattern | Format / Aspect Ratio | Prompt / Art Style Standard |
| :--- | :--- | :--- | :--- |
| **📝 Story Writing Studio** (R&W Part 7) | `public/images/week[XX]/writing_panel_[1-3].png` | PNG / JPG (4:3) | 3D Pixar sequential 3-panel narrative story panels. |

### HUB 4: NOVA TALK SHOW & SPEAKING STUDIO
| Sub-tab / Station | File Location & Naming Pattern | Format / Aspect Ratio | Prompt / Art Style Standard |
| :--- | :--- | :--- | :--- |
| **🖼️ Picture Story** (Speaking Part 3) | `public/images/week[XX]/speaking_panel_[1-4].png` | PNG / JPG (4:3) | 3D Pixar sequential 4-panel narrative story panels. |
| **🔍 Find Differences** (Speaking Part 1) | `public/images/week[XX]/w[XX]_speaking_p1_diff_[a/b].jpg` | JPG (4:3) | Side-by-side 3D Pixar scenes containing exactly 4 visual differences. |

---

## 3. AUDIO ASSET & TTS CACHING NAMING SPECIFICATIONS

System audio paths are dynamically generated or prefetched to R2 CDN based on station keys:

- **Station Key Prefix**: `tts_[station]_[text_hash]_[voice]`
- **Voice Mapping Standard**:
  - `en-US-Journey-F`: Main Narration, Webtoon Stories, Shadowing, Podcast.
  - `en-US-Neural2-F`: Vocabulary, Dictation, Word Match.
  - `en-US-Neural2-D`: Listening Questions, Magic Color, Nova Live Q&A.

---

## 4. CONTENT CHECKLIST BEFORE COMMIT

Every new week folder (`public/images/week[XX]/` and `src/data/weeks/week_[XX]/`) must satisfy:
1. `npm run audit:chunks` $\rightarrow$ 0 ESL chunking errors.
2. `npm run audit:week [XX]` $\rightarrow$ 0 schema errors, 0 missing `definition_en`.
3. `node scripts/validate_week.mjs [XX]` $\rightarrow$ All 6 Gatekeepers PASSED 100%.
