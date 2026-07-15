# 🚀 WEEK 35 SUB-TAB LAUNCH GUIDE
**Big Bang Deployment - Complete Production Workflow**  
**Created:** March 2026 | **Reference:** ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md Section III

---

## 📌 OVERVIEW: BIG BANG SUB-TAB DEPLOYMENT

### Timeline & Strategy
- **Launch Week:** Week 35 ("Environmental Issues")
- **Deployment Model:** Big Bang (all sub-tabs deploy simultaneously)
- **Prior to:** W16 Mass Production (W35 must be complete before starting W16)
- **Stations Affected:** 2 stations (Read & Explore, Logic Lab)
- **Total New Tabs:** 5 (2 in Read & Explore, 3 in Logic Lab)

### Architectural Changes
**Before W35:**
```
Read & Explore: Single tab (narrative story)
Logic Lab: Single tab (15 questions mixed)
```

**After W35 (Permanent):**
```
Read & Explore: 2 tabs
  ├─ Tab 1: STEM Story (science/technology context)
  └─ Tab 2: Social Studies Story (history/geography/culture)

Logic Lab: 3 tabs (15 questions total)
  ├─ Tab 1: Logic & Science (3 questions) ← Same as current
  ├─ Tab 2: Singapore Math (5 questions) ← NEW
  └─ Tab 3: Social Quiz (7 questions) ← NEW
```

---

## 📐 SECTION I: READ & EXPLORE - DUAL TAB STRUCTURE

### A. Tab Configuration

**Tab 1: STEM Story** (Science, Technology, Engineering, Math)
```javascript
// File: src/data/weeks/week_35/read_stem.js
export default {
  tab_id: "stem",
  tab_label: "STEM Story",
  title: "Climate Science: The Greenhouse Effect",
  image_url: "/images/week35/read_stem_cover_w35.jpg",
  content_en: `The Earth's atmosphere acts like a blanket. It traps heat from the sun, keeping our planet warm enough for life. This natural process is called the **greenhouse effect**.

However, human activities like burning fossil fuels release extra carbon dioxide (CO2) into the air. This increases the greenhouse effect, causing global temperatures to rise. Scientists call this **climate change**.

Rising temperatures melt polar ice caps, raise sea levels, and create extreme weather events. To slow climate change, we must reduce carbon emissions by using renewable energy sources like solar and wind power.`,
  content_vi: "Khí quyển Trái Đất hoạt động như một tấm chăn...",
  audio_url: null,
  comprehension_questions: [
    {
      id: 1,
      question_en: "What is the greenhouse effect?",
      answer: ["natural process", "traps heat", "keeps planet warm"],
      hint_en: "Look at the first paragraph",
      hint_vi: "Xem đoạn đầu tiên"
    },
    {
      id: 2,
      question_en: "What causes climate change according to the text?",
      answer: ["extra CO2", "burning fossil fuels", "human activities"],
      hint_en: "Second paragraph mentions human activities",
      hint_vi: "Đoạn hai đề cập hoạt động con người"
    },
    {
      id: 3,
      question_en: "Name two renewable energy sources mentioned.",
      answer: ["solar and wind", "solar power and wind power", "sun and wind"],
      hint_en: "Last sentence of the story",
      hint_vi: "Câu cuối của bài"
    }
  ]
};
```

**Tab 2: Social Studies Story** (History, Geography, Culture)
```javascript
// File: src/data/weeks/week_35/read_social.js
export default {
  tab_id: "social",
  tab_label: "Social Studies",
  title: "The Industrial Revolution: Changing the World",
  image_url: "/images/week35/read_social_cover_w35.jpg",
  content_en: `In the 1700s, most people lived in small villages and farmed for a living. Work was done by hand or with simple tools. This changed dramatically with the **Industrial Revolution**.

New machines like the steam engine powered factories. People moved from countryside to cities to work in these factories. Cities grew rapidly, but working conditions were often dangerous and unhealthy.

The Industrial Revolution brought both progress and problems. It created new jobs and wealth, but also pollution and social inequality. Understanding this period helps us learn from history as we face modern challenges like automation and climate change.`,
  content_vi: "Vào những năm 1700, hầu hết mọi người sống ở làng nhỏ...",
  audio_url: null,
  comprehension_questions: [
    {
      id: 1,
      question_en: "What was life like before the Industrial Revolution?",
      answer: ["people farmed", "lived in villages", "worked by hand"],
      hint_en: "First sentence describes the past",
      hint_vi: "Câu đầu mô tả quá khứ"
    },
    {
      id: 2,
      question_en: "Why did people move to cities?",
      answer: ["to work in factories", "factory jobs", "work in factories"],
      hint_en: "Second paragraph explains migration",
      hint_vi: "Đoạn hai giải thích di cư"
    },
    {
      id: 3,
      question_en: "What problems did the Industrial Revolution cause?",
      answer: ["pollution", "social inequality", "pollution and inequality"],
      hint_en: "Last paragraph mentions negative effects",
      hint_vi: "Đoạn cuối đề cập tác động tiêu cực"
    }
  ]
};
```

### B. Content Creation Rules

**STEM Story Requirements:**
- ✅ Science/Technology/Engineering/Math context (choose ONE domain per week)
- ✅ Vocabulary: 10 bolded STEM terms (e.g., greenhouse effect, carbon dioxide, renewable energy)
- ✅ Reading level: CEFR B1 (complex sentences, academic vocabulary)
- ✅ Length: 150-200 words (3-4 paragraphs)
- ✅ Structure: Introduction → Explanation → Application/Impact
- ✅ Comprehension: 3 questions testing understanding of scientific concepts

**Social Studies Story Requirements:**
- ✅ History/Geography/Culture context (choose ONE domain per week)
- ✅ Vocabulary: 10 bolded social studies terms (e.g., Industrial Revolution, steam engine, inequality)
- ✅ Reading level: CEFR B1 (narrative past tense, cause-effect relationships)
- ✅ Length: 150-200 words (3-4 paragraphs)
- ✅ Structure: Historical context → Events/Changes → Modern relevance
- ✅ Comprehension: 3 questions testing historical/geographical understanding

**Synchronization with Week Theme:**
- Both stories must relate to the week's theme (W35 = "Environmental Issues")
- STEM story: Climate science connection
- Social Studies story: How industrialization created environmental problems
- Stories can reference each other but must be standalone readable

---

## 🧮 SECTION II: LOGIC LAB - TRIPLE TAB STRUCTURE

### A. Tab Configuration & Question Allocation

**Total Questions Per Week:** 15 (unchanged)
**Distribution:**
```
Tab 1: Logic & Science   → 3 questions (20%)
Tab 2: Singapore Math    → 5 questions (33%)
Tab 3: Social Quiz       → 7 questions (47%)
```

### B. Tab 1: Logic & Science (Existing - No Changes)

**File:** `src/data/weeks/week_35/logic.js`

```javascript
export default {
  tab_id: "logic_science",
  tab_label: "Logic & Science",
  puzzles: [
    {
      id: 1,
      type: "logic",
      title_en: "Carbon Footprint Calculation",
      title_vi: "Tính Lượng Khí Thải Carbon",
      question_en: "A car produces 2 kg of CO2 per kilometer. If you drive 15 km to school each day, how much CO2 does your car produce in one week (5 school days)?",
      question_vi: "Một chiếc xe ô tô thải ra 2 kg CO2 mỗi km...",
      answer: ["150", "150 kg", "one hundred fifty kg"],
      hint_en: "Calculate: 2 kg/km × 15 km/day × 5 days",
      hint_vi: "Tính: 2 kg/km × 15 km/ngày × 5 ngày"
    },
    {
      id: 2,
      type: "science",
      title_en: "Recycling Impact",
      title_vi: "Tác Động Tái Chế",
      question_en: "Recycling 1 ton of paper saves 17 trees. If your school recycles 3 tons of paper per year, how many trees are saved?",
      question_vi: "Tái chế 1 tấn giấy cứu được 17 cây...",
      answer: ["51", "51 trees", "fifty-one trees"],
      hint_en: "Multiply 17 × 3",
      hint_vi: "Nhân 17 × 3"
    },
    {
      id: 3,
      type: "pattern",
      title_en: "Temperature Trend",
      title_vi: "Xu Hướng Nhiệt Độ",
      question_en: "Global temperatures increased by 0.2°C each decade from 1980 to 2020. How much did the temperature rise in total?",
      question_vi: "Nhiệt độ toàn cầu tăng 0.2°C mỗi thập kỷ từ 1980 đến 2020...",
      answer: ["0.8", "0.8°C", "0.8 degrees"],
      hint_en: "Count decades: 1980-1990, 1990-2000, 2000-2010, 2010-2020 = 4 decades",
      hint_vi: "Đếm thập kỷ: 4 thập kỷ × 0.2°C"
    }
  ]
};
```

**Rules (Unchanged from current Logic Lab):**
- ✅ 3 questions only
- ✅ Types: logic, science, pattern, math
- ✅ Word problems with full context (not bare calculations)
- ✅ Answers as arrays with multiple accepted formats
- ✅ Theme-aligned (W35 = environmental focus)

---

### C. Tab 2: Singapore Math (NEW)

**File:** `src/data/weeks/week_35/singapore_math.js`

```javascript
export default {
  tab_id: "singapore_math",
  tab_label: "Singapore Math",
  problems: [
    {
      id: 1,
      type: "bar_model",
      title_en: "Plastic Waste Reduction",
      title_vi: "Giảm Rác Thải Nhựa",
      question_en: `A family produces 120 kg of plastic waste per year. After recycling, they reduce waste by 3/5. How much plastic waste do they produce now?`,
      question_vi: "Một gia đình tạo ra 120 kg rác nhựa mỗi năm. Sau khi tái chế...",
      visual_hint: "Bar model: [120 kg] → divide into 5 parts → remove 3 parts",
      answer: ["48", "48 kg", "forty-eight kg"],
      hint_en: "Find 3/5 of 120, then subtract from 120",
      hint_vi: "Tìm 3/5 của 120, rồi trừ đi từ 120",
      solution_steps: [
        "3/5 of 120 = (120 ÷ 5) × 3 = 24 × 3 = 72 kg removed",
        "Remaining waste = 120 - 72 = 48 kg"
      ]
    },
    {
      id: 2,
      type: "model_drawing",
      title_en: "Solar Panel Savings",
      title_vi: "Tiết Kiệm Từ Pin Mặt Trời",
      question_en: `Solar panels cost $3000. They save $50 per month on electricity. How many months until the panels pay for themselves?`,
      question_vi: "Pin mặt trời giá $3000. Chúng tiết kiệm $50/tháng...",
      visual_hint: "Model: Total cost ÷ Monthly savings = Break-even months",
      answer: ["60", "60 months", "sixty months"],
      hint_en: "Divide total cost by monthly savings",
      hint_vi: "Chia tổng chi phí cho tiết kiệm hàng tháng",
      solution_steps: [
        "$3000 ÷ $50 = 60 months",
        "Answer: 60 months (5 years)"
      ]
    },
    {
      id: 3,
      type: "comparison",
      title_en: "Energy Consumption",
      title_vi: "Tiêu Thụ Năng Lượng",
      question_en: `An LED bulb uses 10 watts. An old bulb uses 4 times as much energy. If you run the LED for 5 hours, how much energy does the old bulb use in the same time?`,
      question_vi: "Bóng đèn LED dùng 10 watt. Bóng đèn cũ dùng gấp 4 lần...",
      visual_hint: "Comparison model: LED = 10W, Old = 4 × 10W",
      answer: ["200", "200 watt-hours", "200Wh"],
      hint_en: "Old bulb = 10 × 4 = 40W. Then 40W × 5 hours",
      hint_vi: "Bóng cũ = 10 × 4 = 40W. Rồi 40W × 5 giờ",
      solution_steps: [
        "Old bulb power = 10W × 4 = 40W",
        "Energy used = 40W × 5 hours = 200 watt-hours"
      ]
    },
    {
      id: 4,
      type: "fraction_application",
      title_en: "Water Conservation",
      title_vi: "Bảo Tồn Nước",
      question_en: `A shower uses 2/3 as much water as a bath. If a bath uses 150 liters, how much water does a shower use?`,
      question_vi: "Tắm vòi sen dùng 2/3 lượng nước so với tắm bồn...",
      visual_hint: "Fraction model: Bath [150L] → Split into 3 parts → Take 2 parts",
      answer: ["100", "100 liters", "one hundred liters"],
      hint_en: "Find 2/3 of 150",
      hint_vi: "Tìm 2/3 của 150",
      solution_steps: [
        "150 ÷ 3 = 50 liters (1/3)",
        "50 × 2 = 100 liters (2/3)"
      ]
    },
    {
      id: 5,
      type: "multi_step",
      title_en: "Commute Emissions",
      title_vi: "Khí Thải Đi Lại",
      question_en: `Driving to work produces 5 kg CO2/day. Taking the bus produces 1 kg/day. If you switch to the bus for 20 working days, how much CO2 do you save?`,
      question_vi: "Lái xe đi làm thải 5 kg CO2/ngày. Đi xe buýt thải 1 kg/ngày...",
      visual_hint: "Difference model: (Car - Bus) × Days",
      answer: ["80", "80 kg", "eighty kg"],
      hint_en: "Find daily savings, then multiply by 20 days",
      hint_vi: "Tìm tiết kiệm mỗi ngày, rồi nhân 20 ngày",
      solution_steps: [
        "Daily savings = 5 kg - 1 kg = 4 kg",
        "Total savings = 4 kg × 20 days = 80 kg"
      ]
    }
  ]
};
```

**Singapore Math Characteristics:**
- ✅ **Visual thinking**: Bar models, model drawing, comparison diagrams
- ✅ **Conceptual understanding**: Not just formulas, show WHY steps work
- ✅ **Multi-step problems**: Require 2-3 operations to solve
- ✅ **Real-world application**: Always contextualized (no bare "2/3 of 150 =")
- ✅ **Solution steps**: Include worked examples for learning
- ✅ **Fractions/Ratios**: Heavy emphasis on proportional thinking
- ✅ **5 questions**: More than Logic (3) because Singapore Math is core curriculum

**Visual Hint Guidelines:**
- Describe the mental model students should draw
- Use terms: "Bar model", "Unit model", "Comparison model", "Part-whole model"
- Reference Singapore Math CPA approach (Concrete → Pictorial → Abstract)

---

### D. Tab 3: Social Quiz (NEW)

**File:** `src/data/weeks/week_35/social_quiz.js`

```javascript
export default {
  tab_id: "social_quiz",
  tab_label: "Social Quiz",
  questions: [
    {
      id: 1,
      category: "history",
      title_en: "When did the Industrial Revolution begin?",
      title_vi: "Cách mạng Công nghiệp bắt đầu khi nào?",
      question_en: "The Industrial Revolution started in Britain around which century?",
      question_vi: "Cách mạng Công nghiệp bắt đầu ở Anh vào khoảng thế kỷ nào?",
      options: [
        { id: "A", text_en: "1600s (17th century)", text_vi: "Thế kỷ 17" },
        { id: "B", text_en: "1700s (18th century)", text_vi: "Thế kỷ 18" },
        { id: "C", text_en: "1800s (19th century)", text_vi: "Thế kỷ 19" },
        { id: "D", text_en: "1900s (20th century)", text_vi: "Thế kỷ 20" }
      ],
      correct_answer: "B",
      explanation_en: "The Industrial Revolution began in Britain in the mid-1700s (18th century) with inventions like the steam engine.",
      explanation_vi: "Cách mạng Công nghiệp bắt đầu ở Anh giữa thế kỷ 18 với các phát minh như máy hơi nước."
    },
    {
      id: 2,
      category: "geography",
      title_en: "Country with Highest Renewable Energy",
      title_vi: "Quốc Gia Năng Lượng Tái Tạo Cao Nhất",
      question_en: "Which country gets over 85% of its electricity from renewable sources like geothermal and hydropower?",
      question_vi: "Quốc gia nào có hơn 85% điện năng từ nguồn tái tạo như địa nhiệt và thủy điện?",
      options: [
        { id: "A", text_en: "Iceland", text_vi: "Iceland" },
        { id: "B", text_en: "China", text_vi: "Trung Quốc" },
        { id: "C", text_en: "USA", text_vi: "Mỹ" },
        { id: "D", text_en: "Saudi Arabia", text_vi: "Saudi Arabia" }
      ],
      correct_answer: "A",
      explanation_en: "Iceland uses volcanic geothermal energy and glacial rivers for nearly 100% renewable electricity.",
      explanation_vi: "Iceland dùng năng lượng địa nhiệt từ núi lửa và sông băng cho gần 100% điện tái tạo."
    },
    {
      id: 3,
      category: "culture",
      title_en: "International Environmental Treaty",
      title_vi: "Hiệp Ước Môi Trường Quốc Tế",
      question_en: "The Paris Agreement (2015) aims to limit global warming to how many degrees Celsius?",
      question_vi: "Hiệp định Paris (2015) nhằm giới hạn nóng lên toàn cầu ở mức bao nhiêu độ C?",
      options: [
        { id: "A", text_en: "Below 0.5°C", text_vi: "Dưới 0.5°C" },
        { id: "B", text_en: "Below 1.5°C", text_vi: "Dưới 1.5°C" },
        { id: "C", text_en: "Below 3°C", text_vi: "Dưới 3°C" },
        { id: "D", text_en: "Below 5°C", text_vi: "Dưới 5°C" }
      ],
      correct_answer: "B",
      explanation_en: "The Paris Agreement goal is to keep global temperature rise below 1.5°C compared to pre-industrial levels.",
      explanation_vi: "Mục tiêu Hiệp định Paris là giữ nhiệt độ toàn cầu tăng dưới 1.5°C so với thời tiền công nghiệp."
    },
    {
      id: 4,
      category: "history",
      title_en: "First Earth Day",
      title_vi: "Ngày Trái Đất Đầu Tiên",
      question_en: "When was the first Earth Day celebrated?",
      question_vi: "Ngày Trái Đất đầu tiên được tổ chức khi nào?",
      options: [
        { id: "A", text_en: "1950", text_vi: "1950" },
        { id: "B", text_en: "1970", text_vi: "1970" },
        { id: "C", text_en: "1990", text_vi: "1990" },
        { id: "D", text_en: "2000", text_vi: "2000" }
      ],
      correct_answer: "B",
      explanation_en: "The first Earth Day was April 22, 1970, launching the modern environmental movement.",
      explanation_vi: "Ngày Trái Đất đầu tiên là 22/4/1970, khởi đầu phong trào môi trường hiện đại."
    },
    {
      id: 5,
      category: "geography",
      title_en: "Amazon Rainforest Location",
      title_vi: "Vị Trí Rừng Amazon",
      question_en: "The Amazon Rainforest, called the 'lungs of the Earth', is primarily located in which country?",
      question_vi: "Rừng mưa Amazon, được gọi là 'lá phổi Trái Đất', chủ yếu nằm ở quốc gia nào?",
      options: [
        { id: "A", text_en: "Colombia", text_vi: "Colombia" },
        { id: "B", text_en: "Peru", text_vi: "Peru" },
        { id: "C", text_en: "Brazil", text_vi: "Brazil" },
        { id: "D", text_en: "Venezuela", text_vi: "Venezuela" }
      ],
      correct_answer: "C",
      explanation_en: "About 60% of the Amazon Rainforest is in Brazil, though it spans 9 countries total.",
      explanation_vi: "Khoảng 60% rừng Amazon ở Brazil, dù nó trải dài qua 9 quốc gia."
    },
    {
      id: 6,
      category: "culture",
      title_en: "Recycling Symbol Meaning",
      title_vi: "Ý Nghĩa Biểu Tượng Tái Chế",
      question_en: "What do the three arrows in the recycling symbol represent?",
      question_vi: "Ba mũi tên trong biểu tượng tái chế đại diện cho điều gì?",
      options: [
        { id: "A", text_en: "Reduce, Reuse, Recycle", text_vi: "Giảm, Tái sử dụng, Tái chế" },
        { id: "B", text_en: "Air, Water, Land", text_vi: "Không khí, Nước, Đất" },
        { id: "C", text_en: "Past, Present, Future", text_vi: "Quá khứ, Hiện tại, Tương lai" },
        { id: "D", text_en: "Paper, Plastic, Metal", text_vi: "Giấy, Nhựa, Kim loại" }
      ],
      correct_answer: "A",
      explanation_en: "The three arrows symbolize the 3 R's of waste management: Reduce, Reuse, Recycle.",
      explanation_vi: "Ba mũi tên tượng trưng cho 3 chữ R quản lý rác thải: Giảm, Tái sử dụng, Tái chế."
    },
    {
      id: 7,
      category: "history",
      title_en: "Ozone Layer Protection",
      title_vi: "Bảo Vệ Tầng Ozone",
      question_en: "Which international treaty (1987) successfully reduced chemicals harming the ozone layer?",
      question_vi: "Hiệp ước quốc tế nào (1987) đã thành công trong việc giảm hóa chất phá hủy tầng ozone?",
      options: [
        { id: "A", text_en: "Kyoto Protocol", text_vi: "Nghị định thư Kyoto" },
        { id: "B", text_en: "Montreal Protocol", text_vi: "Nghị định thư Montreal" },
        { id: "C", text_en: "Geneva Convention", text_vi: "Công ước Geneva" },
        { id: "D", text_en: "Copenhagen Accord", text_vi: "Thỏa thuận Copenhagen" }
      ],
      correct_answer: "B",
      explanation_en: "The Montreal Protocol (1987) phased out CFCs and other ozone-depleting substances, successfully healing the ozone hole.",
      explanation_vi: "Nghị định thư Montreal (1987) loại bỏ dần CFC và các chất phá hủy ozone, thành công trong việc hàn gắn lỗ thủng tầng ozone."
    }
  ]
};
```

**Social Quiz Characteristics:**
- ✅ **7 questions**: Most questions because it's knowledge-based (faster to answer than math)
- ✅ **Multiple choice**: 4 options (A/B/C/D) for quick assessment
- ✅ **3 categories**: History (3 Q), Geography (2 Q), Culture (2 Q) — balanced mix
- ✅ **Theme-aligned**: W35 = Environmental Issues (all questions relate)
- ✅ **Explanations**: Every answer includes educational explanation
- ✅ **Bilingual**: questions, options, explanations all EN + VI
- ✅ **Factual accuracy**: Verify all data (dates, percentages, locations) before production

**Category Distribution Guidelines:**
- **History**: Events, movements, treaties, inventions (when did X happen?)
- **Geography**: Locations, natural features, country facts (where is X?)
- **Culture**: Symbols, customs, international agreements (what does X mean?)

---

## 🛠️ SECTION III: TECHNICAL IMPLEMENTATION

### A. File Structure Changes (W35+)

**Before W35:**
```
src/data/weeks/week_N/
├─ read.js                    # Single story
├─ explore.js                 # Single story
├─ logic.js                   # 15 mixed questions
└─ ... (other 13 stations)
```

**After W35:**
```
src/data/weeks/week_N/
├─ read_stem.js               # NEW: STEM story
├─ read_social.js             # NEW: Social Studies story
├─ explore_stem.js            # RENAMED from explore.js (STEM)
├─ explore_social.js          # NEW: Social Studies explore
├─ logic.js                   # MODIFIED: Now 3 questions only
├─ singapore_math.js          # NEW: 5 questions
├─ social_quiz.js             # NEW: 7 questions
└─ ... (other 13 stations unchanged)
```

### B. UI Component Updates Required

**File: `src/components/StoryMissionTab.jsx`** (Read & Explore)

Add tab switching logic:
```jsx
import { useState } from 'react';
import readStem from '../data/weeks/week_35/read_stem.js';
import readSocial from '../data/weeks/week_35/read_social.js';

function ReadExploreStation({ weekNum }) {
  const [activeTab, setActiveTab] = useState('stem');
  
  const content = activeTab === 'stem' ? readStem : readSocial;
  
  return (
    <div>
      {/* Tab Selector */}
      <div className="tab-selector">
        <button 
          onClick={() => setActiveTab('stem')}
          className={activeTab === 'stem' ? 'active' : ''}
        >
          STEM Story
        </button>
        <button 
          onClick={() => setActiveTab('social')}
          className={activeTab === 'social' ? 'active' : ''}
        >
          Social Studies
        </button>
      </div>
      
      {/* Content Display */}
      <StoryContent data={content} />
    </div>
  );
}
```

**File: `src/components/LogicLabStation.jsx`**

Add triple tab logic:
```jsx
import logicScience from '../data/weeks/week_35/logic.js';
import singaporeMath from '../data/weeks/week_35/singapore_math.js';
import socialQuiz from '../data/weeks/week_35/social_quiz.js';

function LogicLabStation({ weekNum }) {
  const [activeTab, setActiveTab] = useState('logic_science');
  
  const tabs = {
    logic_science: { data: logicScience, label: 'Logic & Science' },
    singapore_math: { data: singaporeMath, label: 'Singapore Math' },
    social_quiz: { data: socialQuiz, label: 'Social Quiz' }
  };
  
  return (
    <div>
      {/* Triple Tab Selector */}
      <div className="tab-selector triple">
        {Object.entries(tabs).map(([key, tab]) => (
          <button 
            key={key}
            onClick={() => setActiveTab(key)}
            className={activeTab === key ? 'active' : ''}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Conditional Rendering by Tab Type */}
      {activeTab === 'social_quiz' ? (
        <QuizComponent questions={tabs[activeTab].data.questions} />
      ) : (
        <ProblemComponent problems={tabs[activeTab].data.puzzles || tabs[activeTab].data.problems} />
      )}
    </div>
  );
}
```

### C. Audio Generation Updates

**Total Audio Files Per Week (W35+):**

**Read & Explore (2 stories):**
- read_stem_cover_narration.mp3 (1)
- read_social_cover_narration.mp3 (1)
- **Total:** 2 narrations

**Logic Lab (3 tabs):**
- logic_science: 3 questions × 2 (question + hint) = 6 files
- singapore_math: 5 problems × 2 = 10 files
- social_quiz: 7 questions × 3 (question + 4 options + explanation) = 21 files
- **Total:** 37 files

**Other Stations:** Unchanged (~280 files)

**Grand Total W35+:** ~320 files (slight increase from ~300)

**Audio Script Update:**
```bash
# tools/generate_audio_deepgram.py

# Add logic for multi-file Read & Explore
if station == 'read':
    for story_type in ['stem', 'social']:
        file_path = f"week_{week_num}/read_{story_type}.js"
        # Generate narration for each story
        
# Add logic for singapore_math and social_quiz
if station == 'singapore_math':
    for problem in problems:
        generate_audio(problem['question_en'], f"week_{week_num}_singapore_math_{idx}_question")
        generate_audio(problem['hint_en'], f"week_{week_num}_singapore_math_{idx}_hint")
        
if station == 'social_quiz':
    for question in questions:
        generate_audio(question['question_en'], f"week_{week_num}_social_quiz_{idx}_question")
        for option in question['options']:
            generate_audio(option['text_en'], f"week_{week_num}_social_quiz_{idx}_option_{option['id']}")
        generate_audio(question['explanation_en'], f"week_{week_num}_social_quiz_{idx}_explanation")
```

---

## 📋 SECTION IV: PRODUCTION WORKFLOW FOR W35+

### Step-by-Step Checklist (Updated from Standard Workflow)

**BƯỚC 0: Read References**
- [ ] Read Syllabus Week N theme
- [ ] Read Blueprint V5.0 Section III (Sub-Tab Specifications)
- [ ] Read STEM_INTEGRATION_STRATEGY_W16_ONWARDS.md (if STEM week)
- [ ] Note: W35+ requires 2 Read & Explore stories + 3 Logic Lab tabs

**BƯỚC 1: Create Directories**
```bash
mkdir -p src/data/weeks/week_N src/data/weeks_easy/week_N
```

**BƯỚC 2-2.5: AI Tutor (Unchanged)**
```bash
# Clone Week 7 AI Tutor as usual
cp src/data/weeks/week_07_real.js src/data/weeks/week_N_real.js
# Update metadata.js with week title
```

**BƯỚC 3: Create Advanced Stations (MODIFIED FOR W35+)**

**Standard Stations (12 files - unchanged):**
```bash
# Clone from Week 6 as usual:
vocab.js, word_power.js, grammar.js, dictation.js, shadowing.js, 
word_match.js, ask_ai.js, writing.js, daily_watch.js, mindmap.js,
sentence_unscramble.js, sentence_match.js
```

**MODIFIED: Read & Explore (4 files total):**
```bash
# Instead of read.js + explore.js:
node --input-type=module -e "import generate from './read_stem_template.js'; generate(N)"
# Creates: read_stem.js (STEM story)

node --input-type=module -e "import generate from './read_social_template.js'; generate(N)"  
# Creates: read_social.js (Social Studies story)

node --input-type=module -e "import generate from './explore_stem_template.js'; generate(N)"
# Creates: explore_stem.js (STEM explore)

node --input-type=module -e "import generate from './explore_social_template.js'; generate(N)"
# Creates: explore_social.js (Social Studies explore)
```

**MODIFIED: Logic Lab (3 files total):**
```bash
# Create logic.js (3 questions only)
node --input-type=module -e "import generate from './logic_template.js'; generate(N)"

# Create singapore_math.js (5 problems) - NEW
node --input-type=module -e "import generate from './singapore_math_template.js'; generate(N)"

# Create social_quiz.js (7 questions) - NEW
node --input-type=module -e "import generate from './social_quiz_template.js'; generate(N)"
```

**BƯỚC 4: Create Easy Mode (Same structure as Advanced)**
- Repeat above for `src/data/weeks_easy/week_N/`
- Ensure Easy content = Tier 1 vocabulary (simpler than Advanced)
- Easy Read & Explore stories = personal contexts (not academic)

**BƯỚC 5: Update UI Imports (CRITICAL - NEW IMPORTS)**

**File: `src/data/weeks_easy/week_N/index.js`** (AND `src/data/weeks/week_N/index.js`)
```javascript
// OLD imports (W1-34):
import read from './read.js';
import explore from './explore.js';
import logic from './logic.js';

// NEW imports (W35+):
import readStem from './read_stem.js';
import readSocial from './read_social.js';
import exploreStem from './explore_stem.js';
import exploreSocial from './explore_social.js';
import logic from './logic.js';  // Still exists but 3Q only
import singaporeMath from './singapore_math.js';  // NEW
import socialQuiz from './social_quiz.js';  // NEW

export default {
  // OLD export (W1-34):
  // read: read,
  // explore: explore,
  // logic: logic,
  
  // NEW export (W35+):
  read_stem: readStem,
  read_social: readSocial,
  explore_stem: exploreStem,
  explore_social: exploreSocial,
  logic_science: logic,  // Renamed for clarity
  singapore_math: singaporeMath,
  social_quiz: socialQuiz,
  
  // Other 12 stations unchanged
  vocab: vocab,
  grammar: grammar,
  // ...
};
```

**BƯỚC 6: Generate Audio (MODIFIED SCRIPT)**
```bash
# Use updated audio script that handles multi-file Read & Explore
python tools/generate_audio_deepgram.py --week N --remote

# Verify file count:
# W35+ should have ~320 files (not ~300)
ls -1 public/audio/week_N/*.mp3 | wc -l
```

**BƯỚC 7-10: Images, Videos, Testing, Deploy (Unchanged)**

---

## 🧪 SECTION V: QUALITY ASSURANCE & TESTING

### A. Validation Checklist (W35+ Specific)

**File Count Validation:**
```bash
# Read & Explore: Must have 4 files (not 2)
ls src/data/weeks/week_N/read_*.js | wc -l
# Expected: 2 (read_stem.js, read_social.js)

ls src/data/weeks/week_N/explore_*.js | wc -l
# Expected: 2 (explore_stem.js, explore_social.js)

# Logic Lab: Must have 3 files
ls src/data/weeks/week_N/logic.js src/data/weeks/week_N/singapore_math.js src/data/weeks/week_N/social_quiz.js
# All 3 must exist
```

**Question Count Validation:**
```bash
# Logic & Science: 3 questions
grep -c '"id":' src/data/weeks/week_N/logic.js
# Expected: 3

# Singapore Math: 5 problems
grep -c '"id":' src/data/weeks/week_N/singapore_math.js
# Expected: 5

# Social Quiz: 7 questions
grep -c '"id":' src/data/weeks/week_N/social_quiz.js
# Expected: 7

# TOTAL: 3 + 5 + 7 = 15 ✅
```

**Content Quality Checks:**
```bash
# Read STEM: Must have 10 bolded STEM terms
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_N/read_stem.js | wc -l
# Expected: 10

# Read Social: Must have 10 bolded social studies terms
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_N/read_social.js | wc -l
# Expected: 10

# Singapore Math: All problems must have visual_hint and solution_steps
grep -c 'visual_hint:' src/data/weeks/week_N/singapore_math.js
# Expected: 5

grep -c 'solution_steps:' src/data/weeks/week_N/singapore_math.js
# Expected: 5

# Social Quiz: All questions must have 4 options
grep -c 'options:' src/data/weeks/week_N/social_quiz.js
# Expected: 7
```

### B. Browser Testing Requirements

**Test Cases:**

1. **Tab Switching (Read & Explore):**
   - [ ] Click "STEM Story" → content loads instantly
   - [ ] Click "Social Studies" → content switches
   - [ ] Audio plays correctly for both stories
   - [ ] Progress saves per tab (completing STEM story doesn't auto-complete Social)

2. **Tab Switching (Logic Lab):**
   - [ ] Click "Logic & Science" → 3 questions appear
   - [ ] Click "Singapore Math" → 5 problems appear (with visual hints)
   - [ ] Click "Social Quiz" → 7 multiple choice questions appear
   - [ ] Progress tracks independently per tab

3. **Audio Functionality:**
   - [ ] Read STEM narration plays
   - [ ] Read Social narration plays
   - [ ] Singapore Math hints play correctly
   - [ ] Social Quiz options and explanations play

4. **Mobile Responsiveness:**
   - [ ] Triple tab selector fits on screen (Logic Lab)
   - [ ] Dual tab selector looks clean (Read & Explore)
   - [ ] Buttons are touch-friendly (not too small)

5. **Fallback Prevention:**
   - [ ] Week 35 does NOT fall back to Week 7 content
   - [ ] All tabs show unique Week 35 content (not generic placeholders)

---

## 📅 SECTION VI: DEPLOYMENT TIMELINE & ROLLBACK PLAN

### A. Big Bang Deployment Schedule

**Phase 1: Development & Testing (2 weeks before W35 launch)**
- Week 1: Create W35 content (all 5 new tabs)
- Week 2: QA testing (all validation checks pass)

**Phase 2: Staging Deployment (1 week before W35 launch)**
- Deploy to staging environment
- User acceptance testing (UAT)
- Performance testing (300+ audio files load time)

**Phase 3: Production Deployment (W35 launch day)**
- Deploy at 00:00 UTC (minimize user impact)
- Monitor logs for errors (first 24 hours)
- Hotfix window: 0-4 hours post-launch

**Phase 4: Post-Launch Monitoring (1 week after W35)**
- Track user engagement metrics (which tabs are most used?)
- Gather feedback (are tabs confusing? too many questions?)
- Document lessons learned

### B. Rollback Plan (If Critical Issues Found)

**Trigger Conditions:**
- [ ] Audio fails to load for >50% of users
- [ ] Tab switching causes app crash
- [ ] Content missing (blank screens)
- [ ] Progress tracking fails (users lose completion data)

**Rollback Procedure:**
```bash
# 1. Revert to single-tab version (emergency)
git revert [commit-hash-of-W35-deployment]
git push origin main

# 2. Cloudflare Pages auto-deploys previous version (~2 min)

# 3. Notify users via in-app banner
"We're experiencing technical issues with Week 35. 
 Content has been temporarily rolled back. 
 Your progress is safe. We'll restore full features soon."

# 4. Debug issues in staging, re-deploy when fixed
```

**Communication Plan:**
- Discord announcement: "W35 rollback in progress"
- Email to active users: Apologize + timeline for fix
- Social media: Transparent update on issue

---

## 🎓 SECTION VII: LESSONS FROM WEEK 12 (APPLIED TO W35)

### Critical Lessons to Remember

**Lesson 1: Mode Differentiation (Easy ≠ Advanced)**
- ❌ **Week 12 mistake**: Copied Advanced dictation to Easy mode
- ✅ **W35 prevention**: Generate Easy STEM story independently (simpler vocabulary, personal context)
- Example:
  - Advanced STEM: "The Earth's atmosphere traps heat due to greenhouse gases..."
  - Easy STEM: "The sun makes the Earth warm. Plants need sun to grow..."

**Lesson 2: Audio Cutoff Prevention**
- ❌ **Week 13 mistake**: "o'clock" → truncated to "oh /oh/ /oh/"
- ✅ **W35 prevention**: Preprocess all text before TTS
  - Add trailing silence: `word + ". . . . ."`
  - Handle apostrophes: `text.replace("o'clock", "o clock")`

**Lesson 3: Validation Before Deployment**
- ❌ **Common mistake**: Generate content → deploy → discover bugs in production
- ✅ **W35 workflow**: 
  1. Generate all 5 tabs
  2. Run validation scripts (file count, question count, bolded words)
  3. Browser test (tab switching, audio playback)
  4. THEN deploy

**Lesson 4: UI Import Errors**
- ❌ **Week 7 fallback**: Missing imports cause app to display Week 7 content
- ✅ **W35 prevention**: Triple-check `index.js` exports (7 items for Read/Explore/Logic vs previous 3)

---

## 📚 APPENDIX: REFERENCE MATERIALS

### A. Week 35 Content Theme Examples

**Theme: "Environmental Issues"**

**STEM Story Topics (choose 1):**
- Climate Change & Greenhouse Effect (chosen in example above)
- Renewable Energy Sources (solar, wind, hydro)
- Ocean Acidification & Coral Reefs
- Deforestation & Carbon Cycle

**Social Studies Story Topics (choose 1):**
- Industrial Revolution (chosen in example above)
- History of Environmental Movements
- Sustainable Development Goals (SDGs)
- Indigenous Environmental Knowledge

**Singapore Math Topics (must align with theme):**
- Carbon footprint calculations
- Energy savings word problems
- Waste reduction fractions
- Recycling impact ratios

**Social Quiz Topics:**
- Environmental treaties (Paris Agreement, Montreal Protocol)
- Green landmarks (Amazon, Great Barrier Reef)
- Eco-inventions timeline
- Global geography of climate

### B. Golden Standards for W35+ Production

**Clone From:**
- **Read STEM (NEW)**: Write from scratch using STEM_INTEGRATION_STRATEGY_W16_ONWARDS.md
- **Read Social (NEW)**: Write from scratch using Blueprint V5.0 Section III
- **Singapore Math (NEW)**: Use CPA model (Concrete → Pictorial → Abstract)
- **Social Quiz (NEW)**: Research factual accuracy (Wikipedia, britannica.com)

**DO NOT Clone From:**
- Week 6 logic.js (has 15 questions; W35+ needs 3 only)
- Week 6 read.js (single story; W35+ needs dual stories)

### C. Future Expansion Roadmap

**W36-54 (After W35 Big Bang):**
- All weeks follow W35 structure (5 tabs permanent)
- Gradual complexity increase (Phase 1 → Phase 2 → Phase 3)
- By W54 (end Phase 1): Full B1 CEFR coverage in STEM + Social contexts

**W40 Special Feature:**
- Add Debate Corner (AI Tutor station)
- See: W40_DEBATE_LAUNCH_GUIDE.md (separate document)

**W55+ (Phase 2):**
- Potential 4th tab in Logic Lab: "Critical Thinking Essay Prompts"
- Potential 3rd tab in Read & Explore: "Primary Source Documents"

---

## ✅ W35 PRODUCTION QUICK START SUMMARY

**For agents creating W35+, remember:**

1. **File Count:** 
   - Read & Explore: 4 files (stem + social × 2)
   - Logic Lab: 3 files (logic.js + singapore_math.js + social_quiz.js)

2. **Question Distribution:**
   - Logic & Science: 3
   - Singapore Math: 5
   - Social Quiz: 7
   - TOTAL: 15 ✅

3. **Validation Commands:**
   ```bash
   # Quick check before deploying:
   ls src/data/weeks/week_35/read_*.js | wc -l  # = 2
   ls src/data/weeks/week_35/explore_*.js | wc -l  # = 2
   grep -c '"id":' src/data/weeks/week_35/logic.js  # = 3
   grep -c '"id":' src/data/weeks/week_35/singapore_math.js  # = 5
   grep -c '"id":' src/data/weeks/week_35/social_quiz.js  # = 7
   ```

4. **UI Updates:**
   - Update `index.js`: 7 exports (not 3)
   - Update `StoryMissionTab.jsx`: Add tab switching
   - Update `LogicLabStation.jsx`: Add triple tab logic

5. **Audio Generation:**
   - Use updated `generate_audio_deepgram.py` script
   - Verify ~320 files (not ~300)

**Ready to start W35 production!** 🚀
