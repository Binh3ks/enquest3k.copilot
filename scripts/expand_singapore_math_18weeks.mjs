#!/usr/bin/env node
/**
 * scripts/expand_singapore_math_18weeks.mjs
 *
 * Expands singapore_math from 2/5 to 5/5 across the 18 live production weeks:
 * W35, W38, W39, W41, W43, W45, W46, W73, W74, W75, W76, W77, W78, W79, W80, W81, W82, W125.
 *
 * Requirements:
 * 1. Do NOT touch existing 2 questions — only append 3 new ones (id: 3, 4, 5).
 * 2. Theme & CLIL alignment matching week's curriculum.
 * 3. Wave 3 schema: correctAnswer, target_answer, problemText, question, unit, hintText, steps, modelData.
 * 4. Resolvable via station2Adapters.js resolveNumericAnswer (zero fallback-to-10).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

export const NEW_MATH_QUESTIONS = {
  35: [
    {
      id: 3,
      title: "Problem 3: Travel Journal Stamps (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "Liam pasted 18 souvenir stamps in chapter one and 24 stamps in chapter two of his travel journal. His goal is 60 stamps. How many more stamps does Liam need to reach his goal?",
      question: "Liam pasted 18 souvenir stamps in chapter one and 24 stamps in chapter two of his travel journal. His goal is 60 stamps. How many more stamps does Liam need to reach his goal?",
      correctAnswer: 18,
      target_answer: 18,
      unit: "stamps",
      hintText: "Add chapter one (18) and chapter two (24) first. Then subtract from the 60-stamp goal.",
      steps: [
        "Current stamps: 18 + 24 = 42 stamps.",
        "Remaining needed: 60 - 42 = 18 stamps."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Ch 1: 18", value: 18, color: "#4f46e5" },
          { label: "Ch 2: 24", value: 24, color: "#06b6d4" },
          { label: "Needed: 18", value: 18, color: "#94a3b8" }
        ],
        totalLabel: "Goal: 60 stamps"
      }
    },
    {
      id: 4,
      title: "Problem 4: Historic Artifact Sketches (Comparison)",
      difficulty: "easy",
      type: "comparison",
      problemText: "In his sketchbook, Noah drew 32 castle towers and 19 historic bridges during his holiday. How many more castle towers did he draw than historic bridges?",
      question: "In his sketchbook, Noah drew 32 castle towers and 19 historic bridges during his holiday. How many more castle towers did he draw than historic bridges?",
      correctAnswer: 13,
      target_answer: 13,
      unit: "sketches",
      hintText: "Subtract the number of historic bridges (19) from castle towers (32).",
      steps: [
        "Castle towers: 32.",
        "Historic bridges: 19.",
        "Difference: 32 - 19 = 13 more towers."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Towers: 32", value: 32, color: "#0ea5e9" },
          { label: "Bridges: 19", value: 19, color: "#ef4444" }
        ],
        differenceLabel: "13 more towers"
      }
    },
    {
      id: 5,
      title: "Problem 5: Memory Exhibit Visitors (Part-Whole)",
      difficulty: "easy",
      type: "part_whole",
      problemText: "At the local memory exhibit, 48 visitors arrived before noon and 37 visitors arrived in the afternoon. How many visitors explored the exhibit in total?",
      question: "At the local memory exhibit, 48 visitors arrived before noon and 37 visitors arrived in the afternoon. How many visitors explored the exhibit in total?",
      correctAnswer: 85,
      target_answer: 85,
      unit: "visitors",
      hintText: "Add morning visitors (48) and afternoon visitors (37) together.",
      steps: [
        "Morning attendance: 48 visitors.",
        "Afternoon attendance: 37 visitors.",
        "Total attendance: 48 + 37 = 85 visitors."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Morning: 48", value: 48, color: "#3b82f6" },
          { label: "Afternoon: 37", value: 37, color: "#10b981" }
        ],
        totalLabel: "Total: 85 visitors"
      }
    }
  ],

  38: [
    {
      id: 3,
      title: "Problem 3: Diving Depth Comparison (Comparison)",
      difficulty: "easy",
      type: "comparison",
      problemText: "An emperor penguin can dive to a depth of 65 meters, while a sea otter dives to 25 meters. How many meters deeper can the emperor penguin dive than the sea otter?",
      question: "An emperor penguin can dive to a depth of 65 meters, while a sea otter dives to 25 meters. How many meters deeper can the emperor penguin dive than the sea otter?",
      correctAnswer: 40,
      target_answer: 40,
      unit: "meters",
      hintText: "Subtract sea otter depth (25) from emperor penguin depth (65).",
      steps: [
        "Penguin diving depth: 65 m.",
        "Sea otter diving depth: 25 m.",
        "Difference: 65 - 25 = 40 meters deeper."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Penguin: 65m", value: 65, color: "#0284c7" },
          { label: "Otter: 25m", value: 25, color: "#f59e0b" }
        ],
        differenceLabel: "40 meters deeper"
      }
    },
    {
      id: 4,
      title: "Problem 4: Migrating Flight Leg (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "An Arctic tern flew 45 kilometers in the morning and 55 kilometers in the afternoon. The total leg of its daily journey is 130 kilometers. How many kilometers must it still fly to finish the day's flight?",
      question: "An Arctic tern flew 45 kilometers in the morning and 55 kilometers in the afternoon. The total leg of its daily journey is 130 kilometers. How many kilometers must it still fly to finish the day's flight?",
      correctAnswer: 30,
      target_answer: 30,
      unit: "km",
      hintText: "Add morning (45) and afternoon (55) distance first. Then subtract from the 130 km target.",
      steps: [
        "Distance flown: 45 + 55 = 100 km.",
        "Remaining distance: 130 - 100 = 30 km."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Morning: 45km", value: 45, color: "#6366f1" },
          { label: "Afternoon: 55km", value: 55, color: "#14b8a6" },
          { label: "Remaining: 30km", value: 30, color: "#cbd5e1" }
        ],
        totalLabel: "Target: 130 km"
      }
    },
    {
      id: 5,
      title: "Problem 5: Dolphin Pod Census (Part-Whole)",
      difficulty: "easy",
      type: "part_whole",
      problemText: "Marine biologists spotted a coastal pod with 14 adult dolphins and 8 calves swimming together. How many dolphins were in the pod altogether?",
      question: "Marine biologists spotted a coastal pod with 14 adult dolphins and 8 calves swimming together. How many dolphins were in the pod altogether?",
      correctAnswer: 22,
      target_answer: 22,
      unit: "dolphins",
      hintText: "Add adult dolphins (14) and young calves (8) together.",
      steps: [
        "Adult dolphins: 14.",
        "Calves: 8.",
        "Total pod count: 14 + 8 = 22 dolphins."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Adults: 14", value: 14, color: "#3b82f6" },
          { label: "Calves: 8", value: 8, color: "#93c5fd" }
        ],
        totalLabel: "Pod: 22 dolphins"
      }
    }
  ],

  39: [
    {
      id: 3,
      title: "Problem 3: Mangrove Seedling Restoration (Part-Whole)",
      difficulty: "easy",
      type: "part_whole",
      problemText: "Conservation volunteers planted 52 mangrove seedlings along the shore and 38 seedlings along the river estuary. How many mangrove seedlings were planted in total?",
      question: "Conservation volunteers planted 52 mangrove seedlings along the shore and 38 seedlings along the river estuary. How many mangrove seedlings were planted in total?",
      correctAnswer: 90,
      target_answer: 90,
      unit: "seedlings",
      hintText: "Add shoreline seedlings (52) and estuary seedlings (38) together.",
      steps: [
        "Shoreline planting: 52 seedlings.",
        "Estuary planting: 38 seedlings.",
        "Total planted: 52 + 38 = 90 seedlings."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Shore: 52", value: 52, color: "#059669" },
          { label: "Estuary: 38", value: 38, color: "#10b981" }
        ],
        totalLabel: "Total: 90 seedlings"
      }
    },
    {
      id: 4,
      title: "Problem 4: Mountain Sanctuary Animals (Comparison)",
      difficulty: "easy",
      type: "comparison",
      problemText: "In the alpine habitat zone, rangers documented 46 bighorn sheep and 28 mountain goats. How many more bighorn sheep were documented than mountain goats?",
      question: "In the alpine habitat zone, rangers documented 46 bighorn sheep and 28 mountain goats. How many more bighorn sheep were documented than mountain goats?",
      correctAnswer: 18,
      target_answer: 18,
      unit: "animals",
      hintText: "Subtract mountain goats (28) from bighorn sheep (46).",
      steps: [
        "Bighorn sheep: 46.",
        "Mountain goats: 28.",
        "Difference: 46 - 28 = 18 more sheep."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Sheep: 46", value: 46, color: "#d97706" },
          { label: "Goats: 28", value: 28, color: "#64748b" }
        ],
        differenceLabel: "18 more sheep"
      }
    },
    {
      id: 5,
      title: "Problem 5: Freshwater Wetland Capacity (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "A freshwater wetland habitat can accommodate 80 water birds. Currently, there are 25 mallards and 35 herons living there. How many more water birds can the wetland shelter before reaching capacity?",
      question: "A freshwater wetland habitat can accommodate 80 water birds. Currently, there are 25 mallards and 35 herons living there. How many more water birds can the wetland shelter before reaching capacity?",
      correctAnswer: 20,
      target_answer: 20,
      unit: "birds",
      hintText: "Add resident mallards (25) and herons (35) first. Then subtract from total capacity (80).",
      steps: [
        "Current resident birds: 25 + 35 = 60 birds.",
        "Remaining capacity: 80 - 60 = 20 birds."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Mallards: 25", value: 25, color: "#2563eb" },
          { label: "Herons: 35", value: 35, color: "#06b6d4" },
          { label: "Capacity: 20", value: 20, color: "#cbd5e1" }
        ],
        totalLabel: "Max: 80 birds"
      }
    }
  ],

  41: [
    {
      id: 3,
      title: "Problem 3: Chrysalis Observation Count (Part-Whole)",
      difficulty: "easy",
      type: "part_whole",
      problemText: "Student botanists counted 27 butterfly chrysalises in the greenhouse and 33 chrysalises in the outdoor garden. How many chrysalises did they count in total?",
      question: "Student botanists counted 27 butterfly chrysalises in the greenhouse and 33 chrysalises in the outdoor garden. How many chrysalises did they count in total?",
      correctAnswer: 60,
      target_answer: 60,
      unit: "chrysalises",
      hintText: "Add greenhouse count (27) and outdoor garden count (33) together.",
      steps: [
        "Greenhouse: 27 chrysalises.",
        "Outdoor garden: 33 chrysalises.",
        "Total observed: 27 + 33 = 60 chrysalises."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Greenhouse: 27", value: 27, color: "#16a34a" },
          { label: "Garden: 33", value: 33, color: "#84cc16" }
        ],
        totalLabel: "Total: 60 chrysalises"
      }
    },
    {
      id: 4,
      title: "Problem 4: Seedling Height Growth (Comparison)",
      difficulty: "easy",
      type: "comparison",
      problemText: "A sunflower seedling grew to 42 centimeters in three weeks, while a bean seedling grew to 26 centimeters. How many centimeters taller is the sunflower seedling?",
      question: "A sunflower seedling grew to 42 centimeters in three weeks, while a bean seedling grew to 26 centimeters. How many centimeters taller is the sunflower seedling?",
      correctAnswer: 16,
      target_answer: 16,
      unit: "cm",
      hintText: "Subtract bean height (26) from sunflower height (42).",
      steps: [
        "Sunflower height: 42 cm.",
        "Bean seedling height: 26 cm.",
        "Height difference: 42 - 26 = 16 cm."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Sunflower: 42cm", value: 42, color: "#eab308" },
          { label: "Bean: 26cm", value: 26, color: "#65a30d" }
        ],
        differenceLabel: "16 cm taller"
      }
    },
    {
      id: 5,
      title: "Problem 5: Sprouting Seeds Experiment (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "In a biology tray containing 75 bean seeds, 28 seeds sprouted on day three and 32 seeds sprouted on day four. How many seeds have not sprouted yet?",
      question: "In a biology tray containing 75 bean seeds, 28 seeds sprouted on day three and 32 seeds sprouted on day four. How many seeds have not sprouted yet?",
      correctAnswer: 15,
      target_answer: 15,
      unit: "seeds",
      hintText: "Add day three (28) and day four (32) sprouted seeds first. Then subtract from 75 total seeds.",
      steps: [
        "Sprouted seeds: 28 + 32 = 60 seeds.",
        "Unsprouted seeds: 75 - 60 = 15 seeds."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Day 3: 28", value: 28, color: "#4ade80" },
          { label: "Day 4: 32", value: 32, color: "#22c55e" },
          { label: "Unsprouted: 15", value: 15, color: "#94a3b8" }
        ],
        totalLabel: "Total: 75 seeds"
      }
    }
  ],

  43: [
    {
      id: 3,
      title: "Problem 3: Gear Wheel Teeth Difference (Comparison)",
      difficulty: "easy",
      type: "comparison",
      problemText: "The primary gear inside the Plus Machine has 48 teeth, while the secondary drive gear has 33 teeth. How many more teeth does the primary gear have than the secondary gear?",
      question: "The primary gear inside the Plus Machine has 48 teeth, while the secondary drive gear has 33 teeth. How many more teeth does the primary gear have than the secondary gear?",
      correctAnswer: 15,
      target_answer: 15,
      unit: "teeth",
      hintText: "Subtract secondary gear teeth (33) from primary gear teeth (48).",
      steps: [
        "Primary gear: 48 teeth.",
        "Secondary gear: 33 teeth.",
        "Difference: 48 - 33 = 15 teeth."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Primary: 48", value: 48, color: "#6366f1" },
          { label: "Secondary: 33", value: 33, color: "#f97316" }
        ],
        differenceLabel: "15 more teeth"
      }
    },
    {
      id: 4,
      title: "Problem 4: Laboratory Battery Cells (Part-Whole)",
      difficulty: "easy",
      type: "part_whole",
      problemText: "The engineering lab connected a battery pack with 36 lithium cells and another pack with 24 alkaline cells. How many cells were connected in total?",
      question: "The engineering lab connected a battery pack with 36 lithium cells and another pack with 24 alkaline cells. How many cells were connected in total?",
      correctAnswer: 60,
      target_answer: 60,
      unit: "cells",
      hintText: "Add lithium cells (36) and alkaline cells (24) together.",
      steps: [
        "Lithium pack: 36 cells.",
        "Alkaline pack: 24 cells.",
        "Combined count: 36 + 24 = 60 cells."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Lithium: 36", value: 36, color: "#06b6d4" },
          { label: "Alkaline: 24", value: 24, color: "#8b5cf6" }
        ],
        totalLabel: "Total: 60 cells"
      }
    },
    {
      id: 5,
      title: "Problem 5: Sorter Tray Marbles (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "A digital marble sorter needs 90 marbles to complete its test cycle. Maya loaded 34 silver marbles and Leo loaded 26 copper marbles. How many more marbles are needed to reach 90?",
      question: "A digital marble sorter needs 90 marbles to complete its test cycle. Maya loaded 34 silver marbles and Leo loaded 26 copper marbles. How many more marbles are needed to reach 90?",
      correctAnswer: 30,
      target_answer: 30,
      unit: "marbles",
      hintText: "Add loaded silver (34) and copper (26) marbles first. Then subtract from the 90-marble goal.",
      steps: [
        "Loaded marbles: 34 + 26 = 60 marbles.",
        "Remaining needed: 90 - 60 = 30 marbles."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Silver: 34", value: 34, color: "#94a3b8" },
          { label: "Copper: 26", value: 26, color: "#d97706" },
          { label: "Remaining: 30", value: 30, color: "#e2e8f0" }
        ],
        totalLabel: "Goal: 90 marbles"
      }
    }
  ],

  45: [
    {
      id: 3,
      title: "Problem 3: Equilateral Triangle Perimeter (Part-Whole)",
      difficulty: "easy",
      type: "part_whole",
      problemText: "An architectural warning sign is shaped like an equilateral triangle with three equal sides of 35 centimeters each. What is the total perimeter around the sign?",
      question: "An architectural warning sign is shaped like an equilateral triangle with three equal sides of 35 centimeters each. What is the total perimeter around the sign?",
      correctAnswer: 105,
      target_answer: 105,
      unit: "cm",
      hintText: "Add the three equal sides together (35 + 35 + 35).",
      steps: [
        "Three sides: 35 cm each.",
        "Perimeter: 35 + 35 + 35 = 105 cm."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Side 1: 35", value: 35, color: "#eab308" },
          { label: "Side 2: 35", value: 35, color: "#f59e0b" },
          { label: "Side 3: 35", value: 35, color: "#d97706" }
        ],
        totalLabel: "Perimeter: 105 cm"
      }
    },
    {
      id: 4,
      title: "Problem 4: Polygon Side Count Comparison (Comparison)",
      difficulty: "medium",
      type: "comparison",
      problemText: "A regular octagon has 8 sides and a regular hexagon has 6 sides. If a classroom model has 5 octagons (40 sides in total) and 4 hexagons (24 sides in total), how many more total sides do the octagons have?",
      question: "A regular octagon has 8 sides and a regular hexagon has 6 sides. If a classroom model has 5 octagons (40 sides in total) and 4 hexagons (24 sides in total), how many more total sides do the octagons have?",
      correctAnswer: 16,
      target_answer: 16,
      unit: "sides",
      hintText: "Subtract hexagon side total (24) from octagon side total (40).",
      steps: [
        "Octagons total: 5 x 8 = 40 sides.",
        "Hexagons total: 4 x 6 = 24 sides.",
        "Difference: 40 - 24 = 16 more sides."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Octagons: 40", value: 40, color: "#3b82f6" },
          { label: "Hexagons: 24", value: 24, color: "#10b981" }
        ],
        differenceLabel: "16 more sides"
      }
    },
    {
      id: 5,
      title: "Problem 5: Picture Frame Border (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "Detective Sam uses 80 centimeters of wooden molding to border a rectangular picture frame. The frame has two horizontal sides of 25 centimeters each. What is the combined length of the two vertical sides?",
      question: "Detective Sam uses 80 centimeters of wooden molding to border a rectangular picture frame. The frame has two horizontal sides of 25 centimeters each. What is the combined length of the two vertical sides?",
      correctAnswer: 30,
      target_answer: 30,
      unit: "cm",
      hintText: "Add the two horizontal sides (25 + 25 = 50). Then subtract from the total perimeter of 80 cm.",
      steps: [
        "Horizontal sides combined: 25 + 25 = 50 cm.",
        "Vertical sides combined: 80 - 50 = 30 cm."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Horizontal: 50cm", value: 50, color: "#8b5cf6" },
          { label: "Vertical: 30cm", value: 30, color: "#ec4899" }
        ],
        totalLabel: "Perimeter: 80 cm"
      }
    }
  ],

  46: [
    {
      id: 3,
      title: "Problem 3: Binary Code Matrix Grid (Part-Whole)",
      difficulty: "easy",
      type: "part_whole",
      problemText: "In a digital puzzle matrix, there are 54 green code chips and 46 gold code chips. How many total code chips are inserted into the matrix?",
      question: "In a digital puzzle matrix, there are 54 green code chips and 46 gold code chips. How many total code chips are inserted into the matrix?",
      correctAnswer: 100,
      target_answer: 100,
      unit: "chips",
      hintText: "Add green code chips (54) and gold code chips (46) together.",
      steps: [
        "Green chips: 54.",
        "Gold chips: 46.",
        "Total code chips: 54 + 46 = 100 chips."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Green: 54", value: 54, color: "#10b981" },
          { label: "Gold: 46", value: 46, color: "#f59e0b" }
        ],
        totalLabel: "Total: 100 chips"
      }
    },
    {
      id: 4,
      title: "Problem 4: Logic Algorithm Cycles (Comparison)",
      difficulty: "easy",
      type: "comparison",
      problemText: "Algorithm Alpha completed 72 logic cycles in one minute, while Algorithm Beta completed 48 logic cycles. How many more cycles did Algorithm Alpha complete?",
      question: "Algorithm Alpha completed 72 logic cycles in one minute, while Algorithm Beta completed 48 logic cycles. How many more cycles did Algorithm Alpha complete?",
      correctAnswer: 24,
      target_answer: 24,
      unit: "cycles",
      hintText: "Subtract Algorithm Beta cycles (48) from Algorithm Alpha cycles (72).",
      steps: [
        "Algorithm Alpha: 72 cycles.",
        "Algorithm Beta: 48 cycles.",
        "Difference: 72 - 48 = 24 more cycles."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Alpha: 72", value: 72, color: "#6366f1" },
          { label: "Beta: 48", value: 48, color: "#64748b" }
        ],
        differenceLabel: "24 more cycles"
      }
    },
    {
      id: 5,
      title: "Problem 5: Pattern Bead Necklace Goal (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "Sophia needs 120 patterned beads to finish an ornamental code belt. She has strung 45 striped beads and 40 dotted beads. How many more beads must she string?",
      question: "Sophia needs 120 patterned beads to finish an ornamental code belt. She has strung 45 striped beads and 40 dotted beads. How many more beads must she string?",
      correctAnswer: 35,
      target_answer: 35,
      unit: "beads",
      hintText: "Add striped beads (45) and dotted beads (40) first. Then subtract from the 120-bead goal.",
      steps: [
        "Strung beads: 45 + 40 = 85 beads.",
        "Remaining needed: 120 - 85 = 35 beads."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Striped: 45", value: 45, color: "#ec4899" },
          { label: "Dotted: 40", value: 40, color: "#8b5cf6" },
          { label: "Needed: 35", value: 35, color: "#cbd5e1" }
        ],
        totalLabel: "Goal: 120 beads"
      }
    }
  ],

  73: [
    {
      id: 3,
      title: "Problem 3: Reservoir Filtration Capacity (Part-Whole)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "A modern water treatment station operates three filtration tanks holding 220, 180, and 150 cubic meters of purified water. What is the combined capacity of all three tanks?",
      question: "A modern water treatment station operates three filtration tanks holding 220, 180, and 150 cubic meters of purified water. What is the combined capacity of all three tanks?",
      correctAnswer: 550,
      target_answer: 550,
      unit: "cubic meters",
      hintText: "Add the capacities of Tank 1 (220), Tank 2 (180), and Tank 3 (150) together.",
      steps: [
        "Tanks 1 and 2: 220 + 180 = 400 m³.",
        "Add Tank 3: 400 + 150 = 550 m³."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Tank 1: 220m³", value: 220, color: "#0284c7" },
          { label: "Tank 2: 180m³", value: 180, color: "#0ea5e9" },
          { label: "Tank 3: 150m³", value: 150, color: "#38bdf8" }
        ],
        totalLabel: "Total: 550 m³"
      }
    },
    {
      id: 4,
      title: "Problem 4: Precipitation Inflow Variance (Comparison)",
      difficulty: "medium",
      type: "comparison",
      problemText: "During a storm, Catchment Area East collected 340 cubic meters of rainwater, whereas Catchment Area West collected 195 cubic meters. What is the difference in volume collected?",
      question: "During a storm, Catchment Area East collected 340 cubic meters of rainwater, whereas Catchment Area West collected 195 cubic meters. What is the difference in volume collected?",
      correctAnswer: 145,
      target_answer: 145,
      unit: "cubic meters",
      hintText: "Subtract West volume (195) from East volume (340).",
      steps: [
        "East catchment: 340 m³.",
        "West catchment: 195 m³.",
        "Volume difference: 340 - 195 = 145 m³."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "East: 340m³", value: 340, color: "#2563eb" },
          { label: "West: 195m³", value: 195, color: "#64748b" }
        ],
        differenceLabel: "145 m³ difference"
      }
    },
    {
      id: 5,
      title: "Problem 5: Aquifer Storage Depletion (Multi-Step)",
      difficulty: "hard",
      type: "part_whole",
      problemText: "An underground aquifer reservoir holds 600 cubic meters of emergency water. Engineers pumped out 175 cubic meters on Wednesday and 225 cubic meters on Thursday for irrigation. How many cubic meters of water remain in the reservoir?",
      question: "An underground aquifer reservoir holds 600 cubic meters of emergency water. Engineers pumped out 175 cubic meters on Wednesday and 225 cubic meters on Thursday for irrigation. How many cubic meters of water remain in the reservoir?",
      correctAnswer: 200,
      target_answer: 200,
      unit: "cubic meters",
      hintText: "Add Wednesday (175) and Thursday (225) pumped amounts first. Then subtract from total volume (600).",
      steps: [
        "Water pumped: 175 + 225 = 400 m³.",
        "Remaining reserve: 600 - 400 = 200 m³."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Wed: 175m³", value: 175, color: "#0d9488" },
          { label: "Thu: 225m³", value: 225, color: "#14b8a6" },
          { label: "Remaining: 200m³", value: 200, color: "#cbd5e1" }
        ],
        totalLabel: "Total: 600 m³"
      }
    }
  ],

  74: [
    {
      id: 3,
      title: "Problem 3: Invertebrate Biomass Census (Part-Whole)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "An ecological survey recorded 240 grams of insect biomass, 160 grams of crustacean biomass, and 120 grams of mollusk biomass per square meter. What is the total invertebrate biomass?",
      question: "An ecological survey recorded 240 grams of insect biomass, 160 grams of crustacean biomass, and 120 grams of mollusk biomass per square meter. What is the total invertebrate biomass?",
      correctAnswer: 520,
      target_answer: 520,
      unit: "grams",
      hintText: "Add insect biomass (240), crustacean biomass (160), and mollusk biomass (120) together.",
      steps: [
        "Insects and crustaceans: 240 + 160 = 400 g.",
        "Add mollusks: 400 + 120 = 520 g."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Insects: 240g", value: 240, color: "#16a34a" },
          { label: "Crustaceans: 160g", value: 160, color: "#059669" },
          { label: "Mollusks: 120g", value: 120, color: "#10b981" }
        ],
        totalLabel: "Total: 520 g"
      }
    },
    {
      id: 4,
      title: "Problem 4: Primary Producers Energy Yield (Comparison)",
      difficulty: "medium",
      type: "comparison",
      problemText: "Grassland Plot Alpha produced 450 kilocalories of vegetative energy per square meter, while Shrubland Plot Beta produced 275 kilocalories. How many more kilocalories were produced in Plot Alpha?",
      question: "Grassland Plot Alpha produced 450 kilocalories of vegetative energy per square meter, while Shrubland Plot Beta produced 275 kilocalories. How many more kilocalories were produced in Plot Alpha?",
      correctAnswer: 175,
      target_answer: 175,
      unit: "kcal",
      hintText: "Subtract Plot Beta energy (275) from Plot Alpha energy (450).",
      steps: [
        "Plot Alpha yield: 450 kcal.",
        "Plot Beta yield: 275 kcal.",
        "Difference: 450 - 275 = 175 kcal."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Plot Alpha: 450", value: 450, color: "#84cc16" },
          { label: "Plot Beta: 275", value: 275, color: "#a16207" }
        ],
        differenceLabel: "175 kcal difference"
      }
    },
    {
      id: 5,
      title: "Problem 5: Apex Predator Prey Tracking (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "A tracked hawk consumed 80 small rodents in a month. Field observations identified 32 field mice and 28 voles. The remaining prey were shrews. How many shrews did the hawk consume?",
      question: "A tracked hawk consumed 80 small rodents in a month. Field observations identified 32 field mice and 28 voles. The remaining prey were shrews. How many shrews did the hawk consume?",
      correctAnswer: 20,
      target_answer: 20,
      unit: "shrews",
      hintText: "Add field mice (32) and voles (28) first. Then subtract from total prey (80).",
      steps: [
        "Mice and voles: 32 + 28 = 60 rodents.",
        "Shrews: 80 - 60 = 20 shrews."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Mice: 32", value: 32, color: "#6366f1" },
          { label: "Voles: 28", value: 28, color: "#8b5cf6" },
          { label: "Shrews: 20", value: 20, color: "#cbd5e1" }
        ],
        totalLabel: "Total: 80 prey"
      }
    }
  ],

  75: [
    {
      id: 3,
      title: "Problem 3: Temple Sanctuary Construction (Part-Whole)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "The construction of a grand temple sanctuary took 45 years under Pharaoh Ahmose and an additional 35 years under Pharaoh Amenhotep. How many years did the full construction project span?",
      question: "The construction of a grand temple sanctuary took 45 years under Pharaoh Ahmose and an additional 35 years under Pharaoh Amenhotep. How many years did the full construction project span?",
      correctAnswer: 80,
      target_answer: 80,
      unit: "years",
      hintText: "Add the years under Pharaoh Ahmose (45) and Pharaoh Amenhotep (35) together.",
      steps: [
        "Ahmose era: 45 years.",
        "Amenhotep era: 35 years.",
        "Total duration: 45 + 35 = 80 years."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Ahmose: 45y", value: 45, color: "#f59e0b" },
          { label: "Amenhotep: 35y", value: 35, color: "#d97706" }
        ],
        totalLabel: "Total: 80 years"
      }
    },
    {
      id: 4,
      title: "Problem 4: Monument Height Comparison (Comparison)",
      difficulty: "easy",
      type: "comparison",
      problemText: "The Great Pyramid originally stood at 146 meters tall, while the neighboring Pyramid of Menkaure reached 65 meters. What was the difference in height between the two monuments?",
      question: "The Great Pyramid originally stood at 146 meters tall, while the neighboring Pyramid of Menkaure reached 65 meters. What was the difference in height between the two monuments?",
      correctAnswer: 81,
      target_answer: 81,
      unit: "meters",
      hintText: "Subtract Menkaure height (65) from Great Pyramid height (146).",
      steps: [
        "Great Pyramid: 146 m.",
        "Menkaure Pyramid: 65 m.",
        "Height difference: 146 - 65 = 81 meters."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Great: 146m", value: 146, color: "#d97706" },
          { label: "Menkaure: 65m", value: 65, color: "#b45309" }
        ],
        differenceLabel: "81 meters taller"
      }
    },
    {
      id: 5,
      title: "Problem 5: Valley Excavation Field Season (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "An archaeology mission planned a 90-day field season. The team spent 28 days cataloging inscriptions and 37 days mapping royal tombs. How many days remained for artifact preservation?",
      question: "An archaeology mission planned a 90-day field season. The team spent 28 days cataloging inscriptions and 37 days mapping royal tombs. How many days remained for artifact preservation?",
      correctAnswer: 25,
      target_answer: 25,
      unit: "days",
      hintText: "Add inscription days (28) and mapping days (37) first. Then subtract from total season (90 days).",
      steps: [
        "Documented days: 28 + 37 = 65 days.",
        "Remaining preservation days: 90 - 65 = 25 days."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Inscriptions: 28d", value: 28, color: "#78716c" },
          { label: "Mapping: 37d", value: 37, color: "#a8a29e" },
          { label: "Preservation: 25d", value: 25, color: "#e7e5e4" }
        ],
        totalLabel: "Season: 90 days"
      }
    }
  ],

  76: [
    {
      id: 3,
      title: "Problem 3: Archipelago Expedition Distance (Part-Whole)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "A sailing vessel covered 140 nautical miles through the western sound and 175 nautical miles along the outer reefs. What was the total distance covered across both legs?",
      question: "A sailing vessel covered 140 nautical miles through the western sound and 175 nautical miles along the outer reefs. What was the total distance covered across both legs?",
      correctAnswer: 315,
      target_answer: 315,
      unit: "nautical miles",
      hintText: "Add sound distance (140) and reef distance (175) together.",
      steps: [
        "Western sound leg: 140 nm.",
        "Outer reef leg: 175 nm.",
        "Total distance: 140 + 175 = 315 nautical miles."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Sound: 140nm", value: 140, color: "#0284c7" },
          { label: "Reefs: 175nm", value: 175, color: "#0369a1" }
        ],
        totalLabel: "Total: 315 nm"
      }
    },
    {
      id: 4,
      title: "Problem 4: Coastline Survey Margin (Comparison)",
      difficulty: "medium",
      type: "comparison",
      problemText: "Surveyor Elena mapped 320 kilometers of northern coastline, while her colleague mapped 245 kilometers of southern coastline. How many more kilometers did Elena survey?",
      question: "Surveyor Elena mapped 320 kilometers of northern coastline, while her colleague mapped 245 kilometers of southern coastline. How many more kilometers did Elena survey?",
      correctAnswer: 75,
      target_answer: 75,
      unit: "km",
      hintText: "Subtract southern survey (245) from northern survey (320).",
      steps: [
        "Northern survey: 320 km.",
        "Southern survey: 245 km.",
        "Difference: 320 - 245 = 75 kilometers."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "North: 320km", value: 320, color: "#2563eb" },
          { label: "South: 245km", value: 245, color: "#475569" }
        ],
        differenceLabel: "75 km difference"
      }
    },
    {
      id: 5,
      title: "Problem 5: Voyage Provisions Allocation (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "An exploration caravel stocked 450 barrels of provisions for a transatlantic voyage. The crew consumed 130 barrels in month one and 160 barrels in month two. How many barrels remained for month three?",
      question: "An exploration caravel stocked 450 barrels of provisions for a transatlantic voyage. The crew consumed 130 barrels in month one and 160 barrels in month two. How many barrels remained for month three?",
      correctAnswer: 160,
      target_answer: 160,
      unit: "barrels",
      hintText: "Add month one (130) and month two (160) consumption first. Then subtract from total stock (450).",
      steps: [
        "Barrels consumed: 130 + 160 = 290 barrels.",
        "Remaining barrels: 450 - 290 = 160 barrels."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Month 1: 130", value: 130, color: "#d97706" },
          { label: "Month 2: 160", value: 160, color: "#b45309" },
          { label: "Remaining: 160", value: 160, color: "#e2e8f0" }
        ],
        totalLabel: "Total: 450 barrels"
      }
    }
  ],

  77: [
    {
      id: 3,
      title: "Problem 3: Colosseum Tier Arch Count (Part-Whole)",
      difficulty: "easy",
      type: "part_whole",
      problemText: "The lower tier of an ancient arena structure features 80 exterior stone arches and the middle tier features 80 matching arches. How many arches are built across both tiers combined?",
      question: "The lower tier of an ancient arena structure features 80 exterior stone arches and the middle tier features 80 matching arches. How many arches are built across both tiers combined?",
      correctAnswer: 160,
      target_answer: 160,
      unit: "arches",
      hintText: "Add the 80 lower tier arches and 80 middle tier arches together.",
      steps: [
        "Lower tier: 80 arches.",
        "Middle tier: 80 arches.",
        "Total arches: 80 + 80 = 160 arches."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Lower: 80", value: 80, color: "#78716c" },
          { label: "Middle: 80", value: 80, color: "#a8a29e" }
        ],
        totalLabel: "Total: 160 arches"
      }
    },
    {
      id: 4,
      title: "Problem 4: Monument Height Differential (Comparison)",
      difficulty: "medium",
      type: "comparison",
      problemText: "The Eiffel Tower in Paris rises to 330 meters, while the statue tower in the park stands 95 meters tall. How much taller is the Eiffel Tower?",
      question: "The Eiffel Tower in Paris rises to 330 meters, while the statue tower in the park stands 95 meters tall. How much taller is the Eiffel Tower?",
      correctAnswer: 235,
      target_answer: 235,
      unit: "meters",
      hintText: "Subtract statue tower height (95) from Eiffel Tower height (330).",
      steps: [
        "Eiffel Tower: 330 m.",
        "Statue tower: 95 m.",
        "Difference: 330 - 95 = 235 meters."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Eiffel: 330m", value: 330, color: "#475569" },
          { label: "Statue: 95m", value: 95, color: "#94a3b8" }
        ],
        differenceLabel: "235 meters taller"
      }
    },
    {
      id: 5,
      title: "Problem 5: Geometric Block Assembly (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "A stonemason needs 250 carved stone blocks to build a vaulted rotunda arch. She prepared 85 blocks on Monday and 95 blocks on Tuesday. How many more blocks must she carve to complete the assembly?",
      question: "A stonemason needs 250 carved stone blocks to build a vaulted rotunda arch. She prepared 85 blocks on Monday and 95 blocks on Tuesday. How many more blocks must she carve to complete the assembly?",
      correctAnswer: 70,
      target_answer: 70,
      unit: "blocks",
      hintText: "Add Monday (85) and Tuesday (95) blocks first. Then subtract from total required (250).",
      steps: [
        "Blocks prepared: 85 + 95 = 180 blocks.",
        "Remaining needed: 250 - 180 = 70 blocks."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Mon: 85", value: 85, color: "#d97706" },
          { label: "Tue: 95", value: 95, color: "#f59e0b" },
          { label: "Needed: 70", value: 70, color: "#e2e8f0" }
        ],
        totalLabel: "Goal: 250 blocks"
      }
    }
  ],

  78: [
    {
      id: 3,
      title: "Problem 3: Cultural Fair Pavilion Visitors (Part-Whole)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "At the multicultural heritage fair, 185 guests attended the folklore pavilion and 165 guests visited the culinary arts tent. What was the combined attendance across both exhibits?",
      question: "At the multicultural heritage fair, 185 guests attended the folklore pavilion and 165 guests visited the culinary arts tent. What was the combined attendance across both exhibits?",
      correctAnswer: 350,
      target_answer: 350,
      unit: "attendees",
      hintText: "Add folklore pavilion attendance (185) and culinary tent attendance (165) together.",
      steps: [
        "Folklore pavilion: 185 attendees.",
        "Culinary tent: 165 attendees.",
        "Total attendance: 185 + 165 = 350 attendees."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Folklore: 185", value: 185, color: "#dc2626" },
          { label: "Culinary: 165", value: 165, color: "#ea580c" }
        ],
        totalLabel: "Total: 350 attendees"
      }
    },
    {
      id: 4,
      title: "Problem 4: Language Workshop Survey Margin (Comparison)",
      difficulty: "medium",
      type: "comparison",
      problemText: "In a student survey on language electives, 140 learners chose Spanish conversation and 85 learners chose Mandarin calligraphy. How many more students selected Spanish?",
      question: "In a student survey on language electives, 140 learners chose Spanish conversation and 85 learners chose Mandarin calligraphy. How many more students selected Spanish?",
      correctAnswer: 55,
      target_answer: 55,
      unit: "students",
      hintText: "Subtract Mandarin learners (85) from Spanish learners (140).",
      steps: [
        "Spanish conversation: 140 students.",
        "Mandarin calligraphy: 85 students.",
        "Difference: 140 - 85 = 55 students."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Spanish: 140", value: 140, color: "#2563eb" },
          { label: "Mandarin: 85", value: 85, color: "#059669" }
        ],
        differenceLabel: "55 more students"
      }
    },
    {
      id: 5,
      title: "Problem 5: Community Heritage Parade (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "The youth council registered 300 participants for the annual heritage parade. In the first cohort, 110 musicians marched, and in the second cohort, 125 dancers performed. How many participants marched in the final community cohort?",
      question: "The youth council registered 300 participants for the annual heritage parade. In the first cohort, 110 musicians marched, and in the second cohort, 125 dancers performed. How many participants marched in the final community cohort?",
      correctAnswer: 65,
      target_answer: 65,
      unit: "participants",
      hintText: "Add musicians (110) and dancers (125) first. Then subtract from total 300 participants.",
      steps: [
        "Musicians and dancers: 110 + 125 = 235 participants.",
        "Final cohort: 300 - 235 = 65 participants."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Musicians: 110", value: 110, color: "#7c3aed" },
          { label: "Dancers: 125", value: 125, color: "#db2777" },
          { label: "Community: 65", value: 65, color: "#e2e8f0" }
        ],
        totalLabel: "Total: 300 parade members"
      }
    }
  ],

  79: [
    {
      id: 3,
      title: "Problem 3: Clean Energy Micro-Grid Investment (Part-Whole)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "A regional environmental trust granted 140 million dollars to coastal wind turbine arrays and 110 million dollars to solar battery storage. What was the total green energy investment in millions of dollars?",
      question: "A regional environmental trust granted 140 million dollars to coastal wind turbine arrays and 110 million dollars to solar battery storage. What was the total green energy investment in millions of dollars?",
      correctAnswer: 250,
      target_answer: 250,
      unit: "million dollars",
      hintText: "Add wind array grant (140) and solar storage grant (110) together.",
      steps: [
        "Wind turbine grant: 140 million.",
        "Solar storage grant: 110 million.",
        "Total investment: 140 + 110 = 250 million dollars."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Wind: $140M", value: 140, color: "#0284c7" },
          { label: "Solar: $110M", value: 110, color: "#eab308" }
        ],
        totalLabel: "Total: $250M"
      }
    },
    {
      id: 4,
      title: "Problem 4: Industrial Carbon Capture Margin (Comparison)",
      difficulty: "medium",
      type: "comparison",
      problemText: "Facility Alpha removed 280 metric tons of atmospheric carbon, while Facility Beta captured 165 metric tons. How many more metric tons did Facility Alpha capture?",
      question: "Facility Alpha removed 280 metric tons of atmospheric carbon, while Facility Beta captured 165 metric tons. How many more metric tons did Facility Alpha capture?",
      correctAnswer: 115,
      target_answer: 115,
      unit: "metric tons",
      hintText: "Subtract Facility Beta capture (165) from Facility Alpha capture (280).",
      steps: [
        "Facility Alpha: 280 metric tons.",
        "Facility Beta: 165 metric tons.",
        "Difference: 280 - 165 = 115 metric tons."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Alpha: 280t", value: 280, color: "#16a34a" },
          { label: "Beta: 165t", value: 165, color: "#64748b" }
        ],
        differenceLabel: "115 metric tons more"
      }
    },
    {
      id: 5,
      title: "Problem 5: Wetland Restoration Seasonal Goal (Multi-Step)",
      difficulty: "hard",
      type: "part_whole",
      problemText: "A national park authority set a seasonal goal to restore 500 hectares of degraded wetlands. Technicians rehabilitated 160 hectares in spring and 210 hectares in summer. How many hectares remain to be restored in autumn?",
      question: "A national park authority set a seasonal goal to restore 500 hectares of degraded wetlands. Technicians rehabilitated 160 hectares in spring and 210 hectares in summer. How many hectares remain to be restored in autumn?",
      correctAnswer: 130,
      target_answer: 130,
      unit: "hectares",
      hintText: "Add spring (160) and summer (210) rehabilitated hectares first. Then subtract from total 500 hectares.",
      steps: [
        "Restored so far: 160 + 210 = 370 hectares.",
        "Remaining for autumn: 500 - 370 = 130 hectares."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Spring: 160ha", value: 160, color: "#22c55e" },
          { label: "Summer: 210ha", value: 210, color: "#15803d" },
          { label: "Autumn: 130ha", value: 130, color: "#ca8a04" }
        ],
        totalLabel: "Goal: 500 ha"
      }
    }
  ],

  80: [
    {
      id: 3,
      title: "Problem 3: Wholesale Market Supply Total (Part-Whole)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "A local agricultural co-op delivered 260 crates of organic apples and 190 crates of citrus fruits to the central exchange. How many total crates of fruit were supplied to the market?",
      question: "A local agricultural co-op delivered 260 crates of organic apples and 190 crates of citrus fruits to the central exchange. How many total crates of fruit were supplied to the market?",
      correctAnswer: 450,
      target_answer: 450,
      unit: "crates",
      hintText: "Add apple crates (260) and citrus crates (190) together.",
      steps: [
        "Apple supply: 260 crates.",
        "Citrus supply: 190 crates.",
        "Total market supply: 260 + 190 = 450 crates."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Apples: 260", value: 260, color: "#ef4444" },
          { label: "Citrus: 190", value: 190, color: "#f97316" }
        ],
        totalLabel: "Total: 450 crates"
      }
    },
    {
      id: 4,
      title: "Problem 4: Equilibrium Price Shift (Comparison)",
      difficulty: "easy",
      type: "comparison",
      problemText: "During high holiday demand, the price of festive honey jars rose to 45 dollars, compared to the off-season equilibrium price of 28 dollars. What was the price increase in dollars?",
      question: "During high holiday demand, the price of festive honey jars rose to 45 dollars, compared to the off-season equilibrium price of 28 dollars. What was the price increase in dollars?",
      correctAnswer: 17,
      target_answer: 17,
      unit: "dollars",
      hintText: "Subtract off-season price (28) from peak holiday price (45).",
      steps: [
        "Peak holiday price: $45.",
        "Off-season price: $28.",
        "Price difference: 45 - 28 = 17 dollars."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Peak: $45", value: 45, color: "#eab308" },
          { label: "Off-season: $28", value: 28, color: "#64748b" }
        ],
        differenceLabel: "$17 price increase"
      }
    },
    {
      id: 5,
      title: "Problem 5: Artisan Bakery Production Batch (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "An artisan bakery produced 400 loaves of sourdough bread. Morning retail customers bought 175 loaves, and lunch catering orders took 145 loaves. How many loaves remained for evening discount sales?",
      question: "An artisan bakery produced 400 loaves of sourdough bread. Morning retail customers bought 175 loaves, and lunch catering orders took 145 loaves. How many loaves remained for evening discount sales?",
      correctAnswer: 80,
      target_answer: 80,
      unit: "loaves",
      hintText: "Add morning sales (175) and catering sales (145) first. Then subtract from total production (400).",
      steps: [
        "Sold loaves: 175 + 145 = 320 loaves.",
        "Remaining for evening: 400 - 320 = 80 loaves."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Morning: 175", value: 175, color: "#d97706" },
          { label: "Catering: 145", value: 145, color: "#b45309" },
          { label: "Evening: 80", value: 80, color: "#fed7aa" }
        ],
        totalLabel: "Batch: 400 loaves"
      }
    }
  ],

  81: [
    {
      id: 3,
      title: "Problem 3: Atrium Pillar Load Capacity (Part-Whole)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "A grand atrium pavilion rests on two primary load-bearing pillars. The north pillar supports 280 kilonewtons of weight and the south pillar supports 220 kilonewtons. What is the combined load supported by both pillars?",
      question: "A grand atrium pavilion rests on two primary load-bearing pillars. The north pillar supports 280 kilonewtons of weight and the south pillar supports 220 kilonewtons. What is the combined load supported by both pillars?",
      correctAnswer: 500,
      target_answer: 500,
      unit: "kilonewtons",
      hintText: "Add the north pillar load (280) and south pillar load (220) together.",
      steps: [
        "North pillar: 280 kN.",
        "South pillar: 220 kN.",
        "Combined structural load: 280 + 220 = 500 kilonewtons."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "North: 280kN", value: 280, color: "#475569" },
          { label: "South: 220kN", value: 220, color: "#64748b" }
        ],
        totalLabel: "Total: 500 kN"
      }
    },
    {
      id: 4,
      title: "Problem 4: Drafting Revision Expansion (Comparison)",
      difficulty: "medium",
      type: "comparison",
      problemText: "Elena's revised second draft of her architectural research essay contains 680 words, whereas her preliminary first draft contained 490 words. How many words did Elena add during revision?",
      question: "Elena's revised second draft of her architectural research essay contains 680 words, whereas her preliminary first draft contained 490 words. How many words did Elena add during revision?",
      correctAnswer: 190,
      target_answer: 190,
      unit: "words",
      hintText: "Subtract first draft words (490) from second draft words (680).",
      steps: [
        "Second draft: 680 words.",
        "First draft: 490 words.",
        "Words added: 680 - 490 = 190 words."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Draft 2: 680", value: 680, color: "#2563eb" },
          { label: "Draft 1: 490", value: 490, color: "#94a3b8" }
        ],
        differenceLabel: "190 words added"
      }
    },
    {
      id: 5,
      title: "Problem 5: Blueprint Measurement Framing (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "A structural blueprint specifies a corridor gallery length of 850 centimeters. The construction crew framed 310 centimeters on day one and 340 centimeters on day two. How many centimeters remain to be framed on day three?",
      question: "A structural blueprint specifies a corridor gallery length of 850 centimeters. The construction crew framed 310 centimeters on day one and 340 centimeters on day two. How many centimeters remain to be framed on day three?",
      correctAnswer: 200,
      target_answer: 200,
      unit: "cm",
      hintText: "Add day one (310) and day two (340) framing first. Then subtract from 850 cm specified length.",
      steps: [
        "Framed so far: 310 + 340 = 650 cm.",
        "Remaining to frame: 850 - 650 = 200 cm."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Day 1: 310cm", value: 310, color: "#0891b2" },
          { label: "Day 2: 340cm", value: 340, color: "#06b6d4" },
          { label: "Day 3: 200cm", value: 200, color: "#cbd5e1" }
        ],
        totalLabel: "Spec: 850 cm"
      }
    }
  ],

  82: [
    {
      id: 3,
      title: "Problem 3: International Flight Duration (Part-Whole)",
      difficulty: "easy",
      type: "part_whole",
      problemText: "Travel vlogger Marcus logged 14 flight hours from London to Singapore and 8 flight hours from Singapore to Sydney. What was his total flight duration in hours?",
      question: "Travel vlogger Marcus logged 14 flight hours from London to Singapore and 8 flight hours from Singapore to Sydney. What was his total flight duration in hours?",
      correctAnswer: 22,
      target_answer: 22,
      unit: "hours",
      hintText: "Add leg one (14) and leg two (8) flight hours together.",
      steps: [
        "London to Singapore: 14 hours.",
        "Singapore to Sydney: 8 hours.",
        "Total flight time: 14 + 8 = 22 hours."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Leg 1: 14h", value: 14, color: "#0284c7" },
          { label: "Leg 2: 8h", value: 8, color: "#0ea5e9" }
        ],
        totalLabel: "Total: 22 hours"
      }
    },
    {
      id: 4,
      title: "Problem 4: Video Engagement Variance (Comparison)",
      difficulty: "medium",
      type: "comparison",
      problemText: "Episode 5 on desert wildlife generated 420 viewer comments, while Episode 6 on canyon hiking generated 275 comments. How many more comments were posted on Episode 5?",
      question: "Episode 5 on desert wildlife generated 420 viewer comments, while Episode 6 on canyon hiking generated 275 comments. How many more comments were posted on Episode 5?",
      correctAnswer: 145,
      target_answer: 145,
      unit: "comments",
      hintText: "Subtract Episode 6 comments (275) from Episode 5 comments (420).",
      steps: [
        "Episode 5 comments: 420.",
        "Episode 6 comments: 275.",
        "Difference: 420 - 275 = 145 more comments."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Ep 5: 420", value: 420, color: "#d97706" },
          { label: "Ep 6: 275", value: 275, color: "#78716c" }
        ],
        differenceLabel: "145 more comments"
      }
    },
    {
      id: 5,
      title: "Problem 5: Equipment Production Budget (Multi-Step)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "Chloe set an equipment production budget of 900 dollars. She purchased a compact drone for 380 dollars and a directional microphone for 240 dollars. How much budget remains for video editing software?",
      question: "Chloe set an equipment production budget of 900 dollars. She purchased a compact drone for 380 dollars and a directional microphone for 240 dollars. How much budget remains for video editing software?",
      correctAnswer: 280,
      target_answer: 280,
      unit: "dollars",
      hintText: "Add drone cost (380) and microphone cost (240) first. Then subtract from total budget (900).",
      steps: [
        "Spent on hardware: 380 + 240 = 620 dollars.",
        "Remaining budget: 900 - 620 = 280 dollars."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Drone: $380", value: 380, color: "#4f46e5" },
          { label: "Mic: $240", value: 240, color: "#06b6d4" },
          { label: "Software: $280", value: 280, color: "#e2e8f0" }
        ],
        totalLabel: "Budget: $900"
      }
    }
  ],

  125: [
    {
      id: 3,
      title: "Problem 3: Academic Journal Database Index (Part-Whole)",
      difficulty: "medium",
      type: "part_whole",
      problemText: "A university digital library added 360 peer-reviewed journal papers in humanities and 440 papers in natural sciences this semester. How many total scholarly papers were indexed?",
      question: "A university digital library added 360 peer-reviewed journal papers in humanities and 440 papers in natural sciences this semester. How many total scholarly papers were indexed?",
      correctAnswer: 800,
      target_answer: 800,
      unit: "papers",
      hintText: "Add humanities papers (360) and natural science papers (440) together.",
      steps: [
        "Humanities collection: 360 papers.",
        "Sciences collection: 440 papers.",
        "Total papers indexed: 360 + 440 = 800 papers."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Humanities: 360", value: 360, color: "#4338ca" },
          { label: "Sciences: 440", value: 440, color: "#0284c7" }
        ],
        totalLabel: "Total: 800 papers"
      }
    },
    {
      id: 4,
      title: "Problem 4: Debate Adjudication Score Margin (Comparison)",
      difficulty: "medium",
      type: "comparison",
      problemText: "Team Affirmative scored 285 total rubric points across all speaking criteria, while Team Negative scored 248 points. By how many rubric points did Team Affirmative win the round?",
      question: "Team Affirmative scored 285 total rubric points across all speaking criteria, while Team Negative scored 248 points. By how many rubric points did Team Affirmative win the round?",
      correctAnswer: 37,
      target_answer: 37,
      unit: "points",
      hintText: "Subtract Negative points (248) from Affirmative points (285).",
      steps: [
        "Affirmative score: 285 points.",
        "Negative score: 248 points.",
        "Winning margin: 285 - 248 = 37 points."
      ],
      modelData: {
        type: "comparison",
        bars: [
          { label: "Affirmative: 285", value: 285, color: "#16a34a" },
          { label: "Negative: 248", value: 248, color: "#dc2626" }
        ],
        differenceLabel: "37 points margin"
      }
    },
    {
      id: 5,
      title: "Problem 5: Dissertation Chapter Word Allocation (Multi-Step)",
      difficulty: "hard",
      type: "part_whole",
      problemText: "A senior academic thesis has a mandated limit of 1,200 words for its synthesis chapter. The literature review occupies 480 words and the methodology takes 420 words. How many words are allocated to the concluding evaluation?",
      question: "A senior academic thesis has a mandated limit of 1,200 words for its synthesis chapter. The literature review occupies 480 words and the methodology takes 420 words. How many words are allocated to the concluding evaluation?",
      correctAnswer: 300,
      target_answer: 300,
      unit: "words",
      hintText: "Add literature review (480) and methodology (420) first. Then subtract from the 1,200-word limit.",
      steps: [
        "Review and methodology: 480 + 420 = 900 words.",
        "Concluding evaluation: 1200 - 900 = 300 words."
      ],
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Lit Review: 480w", value: 480, color: "#6366f1" },
          { label: "Methodology: 420w", value: 420, color: "#06b6d4" },
          { label: "Evaluation: 300w", value: 300, color: "#cbd5e1" }
        ],
        totalLabel: "Limit: 1200 words"
      }
    }
  ]
};

const WEEKS = [35, 38, 39, 41, 43, 45, 46, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 125];

console.log('========================================================================');
console.log('APPLYING SINGAPORE MATH EXPANSION: 2/5 -> 5/5 ACROSS 18 PRODUCTION WEEKS');
console.log('========================================================================');

const results = [];

for (const w of WEEKS) {
  const filePath = path.join(ROOT_DIR, `src/data/weeks/week_${w}/skill_practice_hub.js`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const rawBefore = fs.readFileSync(filePath, 'utf8');
  const linesBefore = rawBefore.split('\n').length;

  // Dynamically import to inspect existing questions
  const mod = await import(`file://${filePath}?t=${Date.now()}`);
  const data = mod.skillPracticeHubData || mod.default;
  if (!data || !Array.isArray(data.singapore_math)) {
    throw new Error(`W${w}: skillPracticeHubData.singapore_math is not an array`);
  }

  const originalCount = data.singapore_math.length;
  if (originalCount !== 2) {
    throw new Error(`W${w}: Expected exactly 2 existing questions, but found ${originalCount}`);
  }

  const newItems = NEW_MATH_QUESTIONS[w];
  if (!newItems || newItems.length !== 3) {
    throw new Error(`W${w}: Missing 3 new math questions in generator table`);
  }

  // Construct updated data object
  const updatedData = {
    ...data,
    singapore_math: [
      ...data.singapore_math, // Rule 2: DO NOT touch existing 2 questions
      ...newItems             // Rule 1: Append 3 new questions
    ]
  };

  // Re-serialize cleanly matching existing format
  const serialized = `/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: ${w} | Theme: ${JSON.stringify(data.theme || '')} | CEFR: ${JSON.stringify(data.cefr_level || '')}
 * Updated: ${new Date().toISOString()} (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 */

export const skillPracticeHubData = ${JSON.stringify(updatedData, null, 2)};
export default skillPracticeHubData;
`;

  fs.writeFileSync(filePath, serialized, 'utf8');
  const linesAfter = serialized.split('\n').length;
  const deltaLines = linesAfter - linesBefore;

  results.push({
    week: w,
    originalCount,
    newCount: updatedData.singapore_math.length,
    linesBefore,
    linesAfter,
    deltaLines
  });

  console.log(`✓ W${w.toString().padStart(3, ' ')}: math ${originalCount} -> ${updatedData.singapore_math.length} (lines: ${linesBefore} -> ${linesAfter}, delta: +${deltaLines})`);
}

console.log('\n========================================================================');
console.log('SUMMARY OF LINE DELTAS ACROSS ALL 18 WEEKS:');
console.log('========================================================================');
results.forEach(r => {
  console.log(`Week ${r.week.toString().padStart(3, ' ')}: lines ${r.linesBefore} -> ${r.linesAfter} (delta: +${r.deltaLines}) | math count: ${r.newCount}/5`);
});
