# 🧠📐 LOGIC LAB DUAL-TAB BLUEPRINT - Singapore Math Integration

**Version**: 1.0  
**Date**: March 14, 2026  
**Applied from**: Week 16+  
**Purpose**: Tách biệt rõ ràng Logic/Science vs Singapore Math trong Logic Lab Station

---

## 🎯 CORE PHILOSOPHY

### **Problem Statement:**
Logic Lab hiện tại MIX cả toán (math type) và logic (logic type) trong cùng 1 tab, dẫn đến:
- ❌ Học sinh không phân biệt được "toán" vs "tư duy logic"
- ❌ Thiếu phương pháp Singapore Math đặc trưng (Bar Model, CPA)
- ❌ Từ vựng toán chưa được highlight riêng
- ❌ Overlap với word problems gây lặp lại

### **Solution: DUAL SUB-TAB Architecture**

```
┌─────────────────────────────────────────┐
│          LOGIC LAB STATION              │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐   ┌─────────────┐    │
│  │  🧠 Logic   │   │ 📐 Singapore │    │
│  │  & Science  │   │     Math     │    │
│  └─────────────┘   └─────────────┘    │
│   5-10 problems      5-10 problems     │
│   (Phase dependent)  (Phase dependent) │
└─────────────────────────────────────────┘
```

---

## 📂 FILE STRUCTURE

### **Current (BEFORE):**
```javascript
// src/data/weeks/week_XX.js
logic_lab: {
  puzzles: [
    { type: "math", ... },      // ❌ Mixed together
    { type: "logic", ... },     // ❌ No clear separation
    { type: "pattern", ... }
  ]
}
```

### **New (AFTER):**
```javascript
// src/data/weeks/week_XX.js
logic_lab: {
  // 🧠 Sub-tab 1: Logic & Science (Critical Thinking)
  logic_science: {
    title_en: "Logic & Science",
    title_vi: "Logic & Khoa học",
    problems: [
      {
        id: 1,
        type: "pattern",           // sequence, classification, deduction
        question_en: "...",
        answer: [...],
        reasoning_type: "deductive" // inductive, deductive, abductive
      }
    ]
  },
  
  // 📐 Sub-tab 2: Singapore Math (CPA + Bar Model)
  singapore_math: {
    title_en: "Singapore Math",
    title_vi: "Toán Singapore",
    problems: [
      {
        id: 1,
        type: "part_whole",        // part_whole, comparison, missing_part, groups, before_after
        question_en: "...",
        question_vi: "...",
        answer: ["8 eggs", "eight eggs"], // 🔥 MANDATORY: Must include unit
        
        // 🔥 Bar Model (Static SVG path)
        bar_model: "/images/week16/bar_model_q1.svg",
        
        // 🔥 CPA Stage
        cpa_stage: "pictorial",    // concrete, pictorial, abstract
        
        // 🔥 Math Vocabulary Highlight
        math_vocab: ["total", "part", "whole", "plus"],
        
        hint_en: "Think: Part 1 + Part 2 = Whole",
        hint_vi: "Nghĩ: Phần 1 + Phần 2 = Tổng"
      }
    ]
  }
}
```

---

## 🧠 SUB-TAB 1: LOGIC & SCIENCE

### **Content Focus:**
- ✅ Critical thinking (diễn giải logic, phản biện)
- ✅ Patterns & Sequences (quy luật)
- ✅ Science facts (khoa học cơ bản)
- ✅ Classification (phân loại)
- ✅ Deductive reasoning (suy luận)

### **Forbidden:**
- ❌ NO arithmetic word problems (để cho Singapore Math tab)
- ❌ NO bar models
- ❌ NO unit calculations (eggs, meters, etc.)

### **Question Types:**

| Type | Example | Expected Answer | Reasoning Type |
|------|---------|-----------------|----------------|
| **pattern** | "Red, Blue, Red, Blue, Red... next?" | "Blue" | Inductive |
| **sequence** | "Monday, Tuesday, ?, Thursday" | "Wednesday" | Sequential |
| **logic_yesno** | "T-Rex eats meat. Is it a vegetarian?" | "No" | Deductive |
| **classification** | "Which is NOT a fruit: Apple, Carrot, Banana?" | "Carrot" | Categorical |
| **science_fact** | "Do plants need sunlight?" | "Yes" | Factual |
| **tool_function** | "What tool makes small things big?" | "Magnifying glass" | Functional |
| **cause_effect** | "Ice melts. Why?" | "Heat" / "It's warm" | Causal |

### **Content Scaffolding by Phase:**

#### **Phase 1 (Weeks 1-54): 5 problems/week**
- Focus: **Visual patterns, Yes/No logic, Simple classification**
- Example:
  1. Pattern: "⭐🌙⭐🌙⭐ ... next?" → "🌙"
  2. Logic: "Cats say 'meow'. Do dogs say 'meow'?" → "No"
  3. Science: "Is the sun hot?" → "Yes"
  4. Tool: "Scissors can ___?" → "cut"
  5. Sequence: "1, 2, 3, ___?" → "4"

#### **Phase 2 (Weeks 55-120): 7 problems/week**
- Focus: **Multi-step patterns, If-then logic, Science concepts**
- Example:
  1. Pattern: "AB, ABC, ABCD, ___?" → "ABCDE"
  2. Logic: "If it rains, roads are wet. Roads are wet. Did it rain?" → "Maybe" (teach fallacy)
  3. Science: "Which state is water at 0°C?" → "Ice/Solid"
  4. Classification: "Mammals: Dog, Cat, ___? (Bird/Dolphin)" → "Dolphin"
  5. Cause: "Plants die without water. Why?" → "They need water to live"
  6. Deduction: "All mammals have lungs. Whales are mammals. Do whales have lungs?" → "Yes"
  7. Analogy: "Hot is to cold as day is to ___?" → "night"

#### **Phase 3 (Weeks 121+): 10 problems/week**
- Focus: **Critical thinking, Logical fallacies, Data interpretation**
- Example:
  1. Fallacy: "Everyone says it, so it's true." What's wrong? → "Appeal to popularity"
  2. Chart: "Bar chart shows: Red=10, Blue=15. Which is more?" → "Blue"
  3. Venn diagram: "A∩B = 5, A only = 3. Total in A?" → "8"
  4. Syllogism: "All A are B. Some C are A. Are some C B?" → "Yes"
  5. Hypothesis: "If plants grow faster with music, what should we test?" → "Play music to plants"
  ... (5 more complex problems)

---

## 📐 SUB-TAB 2: SINGAPORE MATH

### **Content Focus:**
- ✅ Word problems with **Bar Model** visualization
- ✅ **CPA approach** (Concrete → Pictorial → Abstract progression)
- ✅ **Math vocabulary** in English (total, part, difference, taller, etc.)
- ✅ Unit-based answers (MANDATORY: "8 eggs" not just "8")
- ✅ Singapore Math question types (Part-Whole, Comparison, Missing Part, Groups, Before-After)

### **Forbidden:**
- ❌ NO pure logic (Yes/No questions without numbers)
- ❌ NO science facts
- ❌ NO patterns without numerical reasoning

### **Singapore Math Question Types:**

#### **1. PART-PART-WHOLE (Addition)**
```javascript
{
  type: "part_whole",
  question_en: "Sarah has 5 red apples and 3 green apples. How many apples in total?",
  question_vi: "Sarah có 5 táo đỏ và 3 táo xanh. Tổng cộng bao nhiêu táo?",
  bar_model: "/images/week_XX/bar_part_whole_q1.svg",
  /*
    Bar Model:
    ┌─────────────────────────┐
    │  Red: 5  │  Green: 3   │  → ? apples
    └─────────────────────────┘
       Part 1      Part 2       Whole
  */
  answer: ["8 apples", "eight apples"],
  cpa_stage: "pictorial",
  math_vocab: ["total", "part", "whole", "in total"],
  hint_en: "Think: Part 1 + Part 2 = Whole",
  hint_vi: "Nghĩ: Phần 1 + Phần 2 = Tổng"
}
```

#### **2. COMPARISON MODEL (Subtraction for Difference)**
```javascript
{
  type: "comparison",
  question_en: "The old tree is 15 meters tall. The young tree is 9 meters tall. How much taller is the old tree?",
  question_vi: "Cây già cao 15 mét. Cây non cao 9 mét. Cây già cao hơn bao nhiêu mét?",
  bar_model: "/images/week_XX/bar_comparison_q2.svg",
  /*
    Bar Model:
    Old tree:  ████████████████  (15 m)
    Young:     ██████████        (9 m)
               └────────┘
               Difference = ?
  */
  answer: ["6 meters", "6 metres", "6 m"],
  cpa_stage: "pictorial",
  math_vocab: ["taller", "difference", "compare", "how much"],
  hint_en: "Think: 15 - 9 = ?",
  hint_vi: "Nghĩ: 15 - 9 = ?"
}
```

#### **3. MISSING PART (Subtraction to find unknown part)**
```javascript
{
  type: "missing_part",
  question_en: "A basket has 12 fruits. Some are oranges, and 5 are apples. How many oranges?",
  question_vi: "Rổ có 12 trái. Một số là cam, và 5 là táo. Có bao nhiêu cam?",
  bar_model: "/images/week_XX/bar_missing_part_q3.svg",
  /*
    Bar Model:
    Total: 12 fruits
    ┌─────────────────────┐
    │ Oranges: ? │ Apples: 5 │
    └─────────────────────┘
  */
  answer: ["7 oranges", "seven oranges"],
  cpa_stage: "abstract",
  math_vocab: ["some", "total", "missing part", "how many"],
  hint_en: "Think: Total - Apples = Oranges",
  hint_vi: "Nghĩ: Tổng - Táo = Cam"
}
```

#### **4. GROUPS (Multiplication as repeated addition)**
```javascript
{
  type: "groups",
  question_en: "There are 4 baskets. Each basket has 3 balls. How many balls in total?",
  question_vi: "Có 4 rổ. Mỗi rổ có 3 quả bóng. Tổng cộng bao nhiêu quả bóng?",
  bar_model: "/images/week_XX/bar_groups_q4.svg",
  /*
    Bar Model:
    Basket 1:  ███  (3 balls)
    Basket 2:  ███  (3 balls)
    Basket 3:  ███  (3 balls)
    Basket 4:  ███  (3 balls)
               ────
    Total:     ? balls
  */
  answer: ["12 balls", "twelve balls"],
  cpa_stage: "concrete",
  math_vocab: ["each", "groups", "times", "in total"],
  hint_en: "Think: 3 + 3 + 3 + 3 = ? or 4 × 3 = ?",
  hint_vi: "Nghĩ: 3 + 3 + 3 + 3 = ? hoặc 4 × 3 = ?"
}
```

#### **5. BEFORE-AFTER (Time/Sequence subtraction)**
```javascript
{
  type: "before_after",
  question_en: "Lisa went back 50 years from the year 2026. What year did she arrive?",
  question_vi: "Lisa quay lại 50 năm từ năm 2026. Cô ấy đến năm nào?",
  bar_model: "/images/week_XX/bar_timeline_q5.svg",
  /*
    Timeline:
    Present: 2026
       ↓
    Go back: 50 years
       ↓
    Past: ?
    
    ←───── 50 years ─────→
    [  ?  ]         [2026]
  */
  answer: ["1976", "year 1976"],
  cpa_stage: "abstract",
  math_vocab: ["go back", "subtract", "timeline", "before"],
  hint_en: "Think: 2026 - 50 = ?",
  hint_vi: "Nghĩ: 2026 - 50 = ?"
}
```

### **Content Scaffolding by Phase:**

#### **Phase 1 (Weeks 1-54): 5 problems/week**
**Math Skills**: Addition/Subtraction within 20, Simple multiplication (2×, 5×)  
**CPA Focus**: Concrete & Pictorial (use bar models heavily)  
**Units Required**: Always include units (eggs, apples, meters, kg, etc.)

Example Week 16 (Phase 1):
1. **Part-Whole**: "5 eggs + 3 eggs = ? total" → "8 eggs"
2. **Comparison**: "Tree A is 10m, Tree B is 6m. How much taller?" → "4 meters"
3. **Missing Part**: "10 books - 3 read = ? left" → "7 books"
4. **Groups**: "2 boxes × 4 pencils each = ?" → "8 pencils"
5. **Before-After**: "100 years before 2000 = ?" → "1900"

#### **Phase 2 (Weeks 55-120): 7 problems/week**
**Math Skills**: Multi-step word problems, Fractions (1/2, 1/4), Decimals (money), Area/Perimeter  
**CPA Focus**: Pictorial & Abstract (transition to mental models)  
**Singapore Methods**: Introduce model method for algebra-like problems

Example Week 80 (Phase 2):
1. "Johnny has $5.50. He buys a pen for $2.30. How much left?" → "$3.20"
2. "A rectangle is 8cm × 5cm. What's the area?" → "40 cm²"
3. "Half of 16 apples = ?" → "8 apples"
4. "Bus has 24 people. 1/3 get off. How many left?" → "16 people"
5. "Box A = 12kg, Box B = 3kg less. How heavy is B?" → "9 kg"
6. "3 groups of 7 + 2 groups of 5 = ? total" → "31"
7. "Timeline: 1950 → +30 years → ?" → "1980"

#### **Phase 3 (Weeks 121+): 10 problems/week**
**Math Skills**: Ratios, Percentages, Algebra (model method), Mean/Median, Complex multi-step  
**CPA Focus**: Abstract thinking with minimal visual aids  
**Critical Application**: Real-world scenarios (shopping, travel, data)

Example Week 150 (Phase 3):
1. "Price $80, discount 25%. Pay how much?" → "$60"
2. "Boys:Girls = 3:2. Total 30 students. How many boys?" → "18 boys"
3. "Data: 5, 8, 12, 15, 20. Find the median." → "12"
4. "John is 3 times older than Mary. Together they are 32. John's age?" → "24 years"
5. "Speed 60 km/h for 2.5 hours. Distance?" → "150 km"
... (5 more complex problems)

---

## 🎨 BAR MODEL SVG TEMPLATES

### **Template 1: Part-Part-Whole**
```svg
<!-- /images/templates/bar_part_whole.svg -->
<svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
  <!-- Part 1 -->
  <rect x="20" y="40" width="150" height="50" fill="#FFE5B4" stroke="#FF9800" stroke-width="2"/>
  <text x="95" y="70" text-anchor="middle" font-size="16" font-weight="bold">Part 1: 5</text>
  
  <!-- Part 2 -->
  <rect x="170" y="40" width="90" height="50" fill="#B4E5FF" stroke="#2196F3" stroke-width="2"/>
  <text x="215" y="70" text-anchor="middle" font-size="16" font-weight="bold">Part 2: 3</text>
  
  <!-- Arrow to Whole -->
  <path d="M 280 65 L 300 65" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrowhead)"/>
  <text x="320" y="70" font-size="18" font-weight="bold" fill="#4CAF50">? total</text>
  
  <!-- Label -->
  <text x="20" y="110" font-size="12" fill="#666">Part 1 + Part 2 = Whole</text>
</svg>
```

### **Template 2: Comparison**
```svg
<!-- /images/templates/bar_comparison.svg -->
<svg width="400" height="150" xmlns="http://www.w3.org/2000/svg">
  <!-- Bar A (longer) -->
  <rect x="20" y="30" width="300" height="40" fill="#FFE5B4" stroke="#FF9800" stroke-width="2"/>
  <text x="170" y="55" text-anchor="middle" font-size="16" font-weight="bold">Bar A: 15</text>
  
  <!-- Bar B (shorter) -->
  <rect x="20" y="80" width="180" height="40" fill="#B4E5FF" stroke="#2196F3" stroke-width="2"/>
  <text x="110" y="105" text-anchor="middle" font-size="16" font-weight="bold">Bar B: 9</text>
  
  <!-- Difference bracket -->
  <line x1="200" y1="80" x2="200" y2="70" stroke="#4CAF50" stroke-width="2"/>
  <line x1="200" y1="70" x2="320" y2="70" stroke="#4CAF50" stroke-width="2"/>
  <line x1="320" y1="70" x2="320" y2="30" stroke="#4CAF50" stroke-width="2"/>
  <text x="260" y="65" font-size="14" fill="#4CAF50" font-weight="bold">Difference = ?</text>
</svg>
```

### **Template 3: Missing Part**
```svg
<!-- /images/templates/bar_missing_part.svg -->
<svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
  <!-- Total bar outline -->
  <rect x="20" y="40" width="300" height="50" fill="none" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
  <text x="170" y="25" text-anchor="middle" font-size="14" fill="#666">Total: 12</text>
  
  <!-- Known part -->
  <rect x="220" y="40" width="100" height="50" fill="#B4E5FF" stroke="#2196F3" stroke-width="2"/>
  <text x="270" y="70" text-anchor="middle" font-size="16" font-weight="bold">Known: 5</text>
  
  <!-- Unknown part (question mark) -->
  <rect x="20" y="40" width="200" height="50" fill="#FFE5E5" stroke="#F44336" stroke-width="2"/>
  <text x="120" y="75" text-anchor="middle" font-size="28" font-weight="bold" fill="#F44336">?</text>
</svg>
```

---

## 📖 MATH VOCABULARY PROGRESSION

### **MANDATORY Vocabulary Introduction Schedule:**

| Week Range | Phase | New Math Vocab (English) | Vietnamese Translation |
|------------|-------|--------------------------|------------------------|
| **1-10** | P1 | plus, minus, equals, total, how many | cộng, trừ, bằng, tổng, bao nhiêu |
| **11-20** | P1 | more, less, part, whole, each | nhiều hơn, ít hơn, phần, tổng thể, mỗi |
| **21-30** | P1 | groups, times, add, subtract, number | nhóm, lần (nhân), cộng, trừ, số |
| **31-40** | P1 | count, first, second, last, before, after | đếm, thứ nhất, thứ hai, cuối, trước, sau |
| **41-54** | P1 | half, double, pair, single, together | một nửa, gấp đôi, cặp, đơn, cùng nhau |
| **55-70** | P2 | difference, compare, taller, shorter, heavier | hiệu số, so sánh, cao hơn, thấp hơn, nặng hơn |
| **71-85** | P2 | lighter, wider, longer, same, equal | nhẹ hơn, rộng hơn, dài hơn, giống nhau, bằng nhau |
| **86-100** | P2 | multiply, divide, remainder, altogether | nhân, chia, số dư, tổng cộng |
| **101-120** | P2 | fraction, quarter, decimal, point, digit | phân số, một phần tư, số thập phân, dấu chấm, chữ số |
| **121-135** | P3 | ratio, proportion, percentage, average, mean | tỉ lệ, tỷ lệ, phần trăm, trung bình, trung bình cộng |
| **136-150** | P3 | median, mode, range, data, chart | trung vị, mode, khoảng, dữ liệu, biểu đồ |
| **151-156** | P3 | equation, variable, solve, substitute, simplify | phương trình, biến số, giải, thay thế, rút gọn |

---

## 🔧 IMPLEMENTATION CODE STRUCTURE

### **LogicLab.jsx Component Update:**

```jsx
// src/modules/logic/LogicLab.jsx
import React, { useState } from 'react';
import { Brain, Calculator } from 'lucide-react';

const LogicLab = ({ data, themeColor, isVi, onToggleLang }) => {
  const [activeSubTab, setActiveSubTab] = useState('logic_science'); // or 'singapore_math'
  
  const subTabs = [
    { 
      id: 'logic_science', 
      label_en: 'Logic & Science', 
      label_vi: 'Logic & Khoa học',
      icon: Brain,
      color: 'violet'
    },
    { 
      id: 'singapore_math', 
      label_en: 'Singapore Math', 
      label_vi: 'Toán Singapore',
      icon: Calculator,
      color: 'emerald'
    }
  ];
  
  const currentData = data[activeSubTab];
  
  return (
    <div className="space-y-6">
      {/* Sub-tab Switcher */}
      <div className="flex gap-3 bg-white p-2 rounded-xl border-2 border-slate-200">
        {subTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all ${
              activeSubTab === tab.id 
                ? `bg-${tab.color}-500 text-white shadow-md` 
                : `bg-slate-50 text-slate-600 hover:bg-slate-100`
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{isVi ? tab.label_vi : tab.label_en}</span>
          </button>
        ))}
      </div>
      
      {/* Problem List */}
      <div className="space-y-4">
        {currentData?.problems?.map((problem, idx) => (
          <div key={problem.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            {/* Question */}
            <p className="text-xl font-bold text-slate-800 mb-3">
              {isVi ? problem.question_vi : problem.question_en}
            </p>
            
            {/* Bar Model (Singapore Math only) */}
            {activeSubTab === 'singapore_math' && problem.bar_model && (
              <img 
                src={problem.bar_model} 
                alt="Bar Model" 
                className="w-full max-w-md mx-auto my-4 rounded-lg"
              />
            )}
            
            {/* Math Vocabulary Highlight (Singapore Math only) */}
            {activeSubTab === 'singapore_math' && problem.math_vocab && (
              <div className="flex flex-wrap gap-2 mb-3">
                {problem.math_vocab.map(word => (
                  <span key={word} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                    📘 {word}
                  </span>
                ))}
              </div>
            )}
            
            {/* Input & Check logic remains same... */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogicLab;
```

---

## ✅ VALIDATION RULES

### **Logic & Science Sub-tab:**
1. ✅ NO arithmetic word problems with units
2. ✅ NO bar models or visual math tools
3. ✅ Focus on YES/NO, pattern completion, classification
4. ✅ Answers can be non-numeric ("Blue", "No", "Magnifying glass")
5. ✅ Must have reasoning_type field (deductive, inductive, etc.)

### **Singapore Math Sub-tab:**
1. ✅ MUST have numerical answer with unit ("8 eggs", "6 meters")
2. ✅ MUST have bar_model path (even if simple)
3. ✅ MUST have cpa_stage specified
4. ✅ MUST have math_vocab array (min 3 words)
5. ✅ Question type must be one of: part_whole, comparison, missing_part, groups, before_after
6. ✅ Hint must guide through Singapore Math thinking ("Think: Part 1 + Part 2 = Whole")

---

## 📊 PRODUCTION CHECKLIST (Mass Production)

### **For Content Creators:**

When creating Week XX content:

#### **Step 1: Determine Phase & Counts**
- [ ] Check week number → Phase 1/2/3
- [ ] Logic & Science: 5 (P1), 7 (P2), 10 (P3) problems
- [ ] Singapore Math: 5 (P1), 7 (P2), 10 (P3) problems

#### **Step 2: Logic & Science Problems**
- [ ] Use question types: pattern, sequence, logic_yesno, classification, science_fact, tool_function, cause_effect
- [ ] NO arithmetic word problems
- [ ] NO units in answers (unless it's a classification of units)
- [ ] Include reasoning_type
- [ ] Ensure variety (not all patterns, not all yes/no)

#### **Step 3: Singapore Math Problems**
- [ ] Use question types: part_whole, comparison, missing_part, groups, before_after
- [ ] Create/assign bar_model SVG path
- [ ] Specify cpa_stage (concrete for Phase 1, abstract for Phase 3)
- [ ] List 3-5 math_vocab words
- [ ] MANDATORY: Include unit in answer ("8 eggs" not "8")
- [ ] Align difficulty with VN/Singapore curriculum for that age

**Scaffolded Difficulty Standard (for new production W22+):**
- W22-24: 5 problems, >=2 question types, Advanced language moderately denser than Easy.
- W25-32: 5 problems, >=3 question types, include missing_part, larger number ranges.
- W33-40: 5 problems, >=4 question types, include groups + missing_part, more multi-step reasoning.
- W41-54: 5 problems, full 5-type coverage across set, stronger abstract framing in Advanced.
- W55-120: 7 problems, transition to Phase 2 topics (fractions, ratio intro, simple equations).
- W121+: 10 problems, Phase 3 topics (algebraic model method, ratio/percent, abstract-first).

**Advanced Language Rule (W22+):**
- Advanced must be harder in BOTH math structure and language depth.
- Use reasoning markers such as: while, after, before, remaining, difference, each, ratio, fraction.
- Do not make Advanced by length alone; require deeper inference and clearer multi-step cues.

**Bar Model Rule (W22+):**
- Keep deterministic naming in production: barmodel_wNN_adv_p1..p5 and barmodel_wNN_easy_p1..p5.
- Use versioned files (_vN.jpg) whenever a bar model is regenerated.
- Ensure every bar_model path resolves to a real image file before release.

#### **Step 4: Cross-Check for Overlap**
- [ ] NO identical contexts between the 2 sub-tabs
- [ ] If both use same theme (e.g., "dinosaurs"), ensure different approaches:
  - Logic: "T-Rex eats meat → vegetarian?" (deductive)
  - Math: "5 T-Rex eggs + 3 more = ? total" (arithmetic)

#### **Step 5: Grammar Alignment**
- [ ] Use week's grammar focus in questions (e.g., Week 16 = Past Simple)
- [ ] Example: "He **had** 5 apples. He **ate** 2. How many **left**?"

---

## 🎯 EXAMPLE: Week 16 FINAL Content

### **Logic & Science Sub-tab (5 problems):**

1. **Pattern**: "Past, Present, Future, Past, Present... What is next?"  
   Answer: "Future" | Type: sequence | Reasoning: inductive

2. **Logic Yes/No**: "T-Rex eats meat. Is T-Rex a vegetarian?"  
   Answer: "No" | Type: logic_yesno | Reasoning: deductive

3. **Science Fact**: "Do plants need sunlight to grow?"  
   Answer: "Yes" | Type: science_fact | Reasoning: factual

4. **Tool Function**: "Which tool makes small things look BIG?"  
   Answer: "Magnifying glass" | Type: tool_function | Reasoning: functional

5. **Classification**: "Which is NOT a dinosaur: T-Rex, Triceratops, Dragon?"  
   Answer: "Dragon" | Type: classification | Reasoning: categorical

### **Singapore Math Sub-tab (5 problems):**

1. **Part-Whole**: "T-Rex had 5 eggs in the morning. She laid 3 more in the afternoon. How many eggs in total?"  
   Answer: "8 eggs" | Bar Model: part_whole_q1.svg | CPA: pictorial | Vocab: total, part, whole, more

2. **Comparison**: "Old castle is 15 meters tall. New castle is 9 meters tall. How much taller is the old castle?"  
   Answer: "6 meters" | Bar Model: comparison_q2.svg | CPA: pictorial | Vocab: taller, difference, compare

3. **Missing Part**: "Time machine has 12 buttons. 5 are blue. How many are red?"  
   Answer: "7 red buttons" | Bar Model: missing_part_q3.svg | CPA: abstract | Vocab: some, total, missing part

4. **Groups**: "There are 3 knights. Each knight has 2 swords. How many swords in total?"  
   Answer: "6 swords" | Bar Model: groups_q4.svg | CPA: concrete | Vocab: each, groups, times, total

5. **Before-After**: "Max went back 200 years from 2026. What year did he arrive?"  
   Answer: "1826" | Bar Model: timeline_q5.svg | CPA: abstract | Vocab: go back, subtract, timeline, past

---

## 🚀 DEPLOYMENT TIMELINE

1. **Week 16** (March 2026): Pilot implementation
2. **Week 17-20**: Refine based on feedback
3. **Week 21+**: Full rollout with mass production

---

## 📞 CONTACT FOR QUESTIONS

If content creators have questions:
- Logic & Science unclear? → Check reasoning_type examples above
- Singapore Math bar model unclear? → Use provided SVG templates
- Difficulty too hard/easy? → Reference VN/Singapore curriculum table

---

**END OF BLUEPRINT**
