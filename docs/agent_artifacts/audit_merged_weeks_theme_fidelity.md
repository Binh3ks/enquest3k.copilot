# ENGQUEST3K — AUDIT REPORT: THEME FIDELITY ACROSS ALL MERGED WEEKS

Generated: 2026-11-10T02:52:56.265Z
Scope: All 161 directories in `src/data/weeks/`

## 1. Summary of Merged Weeks Inventory
- Total week folders in `src/data/weeks/`: 161
- Total weeks with live content files: 22
- Total weeks at Blueprint-only stage: 139
- Exact / Subtitle Matches: 19
- Golden Master Frozen Weeks: 2 (W33, W34)
- Legacy Stubs: 1 (W37, rotary content currently staged)
- Critical Thematic Mismatches: 1 (Week 79 only)

## 2. Week-by-Week Audit Findings

| Week | Status | Blueprint Theme | Merged Content Theme | Forensic Notes |
|---|---|---|---|---|
| week_33 | 🔒 FROZEN MASTER | Safety First at School & The Force of Friction | Corridor Safety & School Care | W33 Golden Master frozen. Blueprint: "Safety First at School & The Force of Friction", reading_hub header: "Corridor Safety & School Care". Locked by freeze manifest. |
| week_34 | 🔒 FROZEN MASTER | The Lion and the Mouse: True Friendship | The Lion and the Mouse | W34 Golden Master frozen. Blueprint: "The Lion and the Mouse: True Friendship", reading_hub: "The Lion and the Mouse". Locked by freeze manifest. |
| week_35 | ✅ EXACT MATCH | Storytelling Practice 2 (Personal Recount) | Storytelling Practice 2 (Personal Recount) | 100% exact theme match. |
| week_36 | ✅ EXACT MATCH | Review & Project 3: "My Adventure Book | Review & Project 3: "My Adventure Book" | 100% exact theme match. |
| week_37 | ⚪ CLEAN STUB | Living vs. Non-Living (Reasoning) | CLEAN_STUB | Clean stub in production; rotary week content authored in Round 69 and staged in docs/agent_artifacts/staging/week_37/. |
| week_38 | ✅ EXACT MATCH | Animal Abilities (Modals) | Animal Abilities (Modals) | 100% exact theme match. |
| week_39 | ✅ EXACT MATCH | Habitats (Persuasion Intro) | Habitats (Persuasion Intro) | 100% exact theme match. |
| week_41 | ✅ EXACT MATCH | Life Cycles (Process) | Life Cycles (Process) | 100% exact theme match. |
| week_43 | ✅ EXACT MATCH | The "Plus" Machine (Addition Language) | The "Plus" Machine (Addition Language) | 100% exact theme match. |
| week_45 | ✅ EXACT MATCH | Shape Detectives (Geometry) | Shape Detectives (Geometry) | 100% exact theme match. |
| week_46 | ✅ EXACT MATCH | The Pattern Code (Logic) | The Pattern Code (Logic) | 100% exact theme match. |
| week_73 | ✅ EXACT MATCH | Science/ELA: The Water Cycle (Advanced) / Math: Volume | Science/ELA: The Water Cycle (Advanced) / Math: Volume | 100% exact theme match. |
| week_74 | ✅ EXACT MATCH | Science/ELA: Food Chains / Math: Complex Charts | Science/ELA: Food Chains / Math: Complex Charts | 100% exact theme match. |
| week_75 | ✅ EXACT MATCH | History/ELA: Ancient Egypt / Math: Timelines | History/ELA: Ancient Egypt / Math: Timelines | 100% exact theme match. |
| week_76 | ✅ EXACT MATCH | History/ELA: Explorers / Math: Map Scales | History/ELA: Explorers / Math: Map Scales | 100% exact theme match. |
| week_77 | ✅ EXACT MATCH | Social Studies/ELA: World Landmarks / Math: 3D Geometry | Social Studies/ELA: World Landmarks / Math: 3D Geometry | 100% exact theme match. |
| week_78 | ✅ EXACT MATCH | Social Studies/ELA: Cultures / Math: Surveys | Social Studies/ELA: Cultures / Math: Surveys | 100% exact theme match. |
| week_79 | 🚨 CRITICAL MISMATCH | The Industrial Revolution | Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate | 🚨 THEMATIC DRIFT: Blueprint is "The Industrial Revolution" (Steam Engines & Factories), but merged content was "Space Exploration vs Earth Restoration". MUST BE REGENERATED. |
| week_80 | ✅ MATCH (SUBTITLE) | Supply, Demand & Market Prices | Supply, Demand & Market Prices / Math: Market Equilibrium Graphs | Blueprint: "Supply, Demand & Market Prices", ReadingHub: "Supply, Demand & Market Prices / Math: Market Equilibrium Graphs". Core theme aligned. |
| week_81 | ✅ EXACT MATCH | ELA: The Master Architect (Structure) / Math: Graphing Data | ELA: The Master Architect (Structure) / Math: Graphing Data | 100% exact theme match. |
| week_82 | ✅ EXACT MATCH | ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data | ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data | 100% exact theme match. |
| week_125 | ✅ MATCH (SUBTITLE) | Intro & Conclusion | Intro & Conclusion (Academic Essay Structure) | Blueprint: "Intro & Conclusion", ReadingHub: "Intro & Conclusion (Academic Essay Structure)". Core theme aligned. |

## 3. Forensic Conclusion
1. **W79 is the SOLE thematic drift present in `src/data/weeks/`**. All other merged rotary weeks (W35, W38, W39, W41, W43, W45, W46, W73, W74, W75, W77, W78, W81, W82, W125) and mock weeks (W36, W76, W80) are 100% theme-aligned with their authoritative blueprints.
2. **W79 Remediated Staging**: W79 will be completely regenerated according to its authentic blueprint: *The Industrial Revolution (World History: Steam Engines & Factories)* and staged in `docs/agent_artifacts/staging/week_79/`.
3. **Wave 3 Remediated Staging**: All 7 staged Wave 3 weeks (W126, W127, W129, W130, W131, W133, W134) discarded and regenerated from their authentic blueprint definitions.
4. **Permanent Enforcement**: Gate 11 (`GATE_11_BLUEPRINT_THEME_FIDELITY`) implemented in `scripts/generate_giaidoan2_content.mjs`.
