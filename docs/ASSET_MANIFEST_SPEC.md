# 📐 MASTER ASSET MANIFEST SPECIFICATION (W33+)

> **Authoritative Invariant**: This manifest is derived strictly from **Production Runtime Truth** (Task 22).
> **Anti-Alias Invariant**: Generating assets by `cp` or alias copying is **strictly prohibited**. Every asset must be created using its declared production tool and verified with generation logs.

---

## 1. 🖼️ VISUAL ASSETS MANIFEST (Images & SVGs)

| Slot / Cambridge Part | Required Count | Distinctness Rule | Naming Convention | Production Tool | Target R2 Path |
|---|---|---|---|---|---|
| **Webtoon Story Panels** (`gear1_webtoon`) | Exactly 5 PNGs | 5 DISTINCT 3D Pixar renders | `webtoon_scene_1.png` → `scene_5.png` | `generate_image` (Flux Pro / Imagen 3) | `engquest/images/week{N}/webtoon_scene_{1..5}.png` |
| **Story Cover** (`gear3_retell`, `boss_reading`) | Exactly 1 JPG | 1 DISTINCT cover art | `read_cover_w{N}.jpg` | `generate_image` | `engquest/images/week{N}/read_cover_w{N}.jpg` |
| **CLIL Knowledge Cover** (`gear4_clil`, `science_lab`) | Exactly 1 JPG | 1 DISTINCT science art | `explore_cover_w{N}.jpg` | `generate_image` | `engquest/images/week{N}/explore_cover_w{N}.jpg` |
| **Singapore Math Bar Models** (`math_quest`) | Exactly 5 SVGs | 5 DISTINCT SVG diagrams | `barmodel_w{N}_adv_p1.svg` → `p5.svg` | `scripts/generate_bar_models.mjs` | `engquest/images/week{N}/barmodel_w{N}_adv_p{1..5}.svg` |
| **Cambridge Listening P1 Scene** (`boss_listening`) | Exactly 1 JPG | Dedicated 6-character scene | `w{N}_listening_p1_scene.jpg` | `generate_image` | `engquest/images/week{N}/w{N}_listening_p1_scene.jpg` |
| **Cambridge Listening P3 Cards** (`boss_listening`) | Exactly 8 JPGs | 8 DISTINCT location/item cards | `card_a.jpg` → `card_h.jpg` | `generate_image` | `engquest/images/week{N}/card_{a..h}.jpg` |
| **Cambridge Speaking P1 Pair** (`weekly_review`) | Exactly 2 JPGs | 2 DISTINCT scene variations (A & B) | `w{N}_diff_scene_a.jpg`, `_b.jpg` | `generate_image` (Seed editing) | `engquest/images/week{N}/w{N}_diff_scene_{a,b}.jpg` |
| **3-Panel Story Writer** (`story_writer`, `boss_reading P7`) | Exactly 3 PNGs | References Webtoon Panels 1, 2, 3 | Dynamic reference to `webtoon_scene_1..3.png` | Native Webtoon Asset Wire | Referenced from Webtoon set |

---

## 2. 🎧 AUDIO ASSETS MANIFEST (Static MP3s)

| Slot / Cambridge Part | Required Count | Voice Profile | Naming Convention | Production Tool | Target R2 Path |
|---|---|---|---|---|---|
| **Voice Shadowing Sentences** (`gear2_karaoke`) | 8–14 MP3s | `en-US-Journey-F` | `shadowing_1.mp3` → `shadowing_{N}.mp3` | Google Cloud TTS Engine | `engquest/audio/week{N}/shadowing_{1..N}.mp3` |
| **Full Story Narration** (`gear3_retell`) | Exactly 1 MP3 | `en-US-Journey-F` | `read_full.mp3` | Google Cloud TTS Engine | `engquest/audio/week{N}/read_full.mp3` |
| **CLIL Knowledge Article** (`gear4_clil`, `science_report`) | Exactly 1 MP3 | `en-US-Journey-F` | `explore.mp3` | Google Cloud TTS Engine | `engquest/audio/week{N}/explore.mp3` |
| **Dictation Cards** (`word_blitz`, `science_lab`) | Exactly 5 MP3s | `en-US-Neural2-F` | `dictation_1.mp3` → `dictation_5.mp3` | Google Cloud TTS Engine | `engquest/audio/week{N}/dictation_{1..5}.mp3` |
| **Listening P1 Full Passage** (`boss_listening`) | Exactly 1 MP3 | Multi-speaker dialog | `listening_p1_full.mp3` | Cambridge Audio Pipeline | `engquest/audio/week{N}/listening_p1_full.mp3` |
| **Listening P2 Notepad Audio** (`boss_listening`) | Exactly 1 MP3 | `en-US-Neural2-D` (Man) | `listening_p2_full.mp3` | Google Cloud TTS Engine | `engquest/audio/week{N}/listening_p2_full.mp3` |
| **Listening P3 Items Audio** (`boss_listening`) | Exactly 5 MP3s | `en-US-Neural2-D` | `listening_p3_item1.mp3` → `item5.mp3` | Google Cloud TTS Engine | `engquest/audio/week{N}/listening_p3_item{1..5}.mp3` |
| **Listening P5 Instructions** (`boss_listening`) | Exactly 5 MP3s | `en-US-Journey-F` | `listening_p5_inst1.mp3` → `inst5.mp3` | Google Cloud TTS Engine | `engquest/audio/week{N}/listening_p5_inst{1..5}.mp3` |

---

## 3. 🛡️ ASSET PRODUCTION INTEGRITY & ANTI-ALIAS VALIDATION

1. **Byte-Identity Collision Check**:
   - For every asset in Week N, `SHA256(Asset_W{N}) !== SHA256(Asset_W{M})` where $M \ne N$.
   - Within Week N, distinct semantic slots (e.g. `webtoon_scene_1` through `scene_5`, `barmodel_p1` through `p5`) must have **distinct SHA-256 hashes**.
2. **CDN Reachability Assertion**:
   - Every asset must exist locally in `public/` and resolve `HTTP 200` on the Cloudflare R2 bucket.
