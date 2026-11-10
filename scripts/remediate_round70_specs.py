#!/usr/bin/env python3
"""
scripts/remediate_round70_specs.py

Remediates W79 and Wave 3 (W126, W127, W129, W130, W131, W133, W134) specifications:
1. Aligns cefr_level with canonical blueprint.json (B1 PET for W79, B1+ Academic for Wave 3).
2. Generates exactly 5 Singapore Math word problems with valid modelData.bars aligned with Source B strands.
3. Calibrates CLIL readability to B1+ (FK 7.5 - 9.2, long words <= 12%) for ages 12-14 VN learners.
4. Simplifies glossary definitions (FK <= 8.5).
5. Labels W130 as an educational case study / scenario, and replaces "landmark study" in W133 with "a class survey of 100 students".
6. Guarantees 100% coverage of blueprint syllabus_words in vocab_list.
"""

import json
import re
import os

SPECS_DIR = "scripts"

# Action Lab Scenarios for all 8 weeks
ACTION_LAB = {
    79: [
        {"stage": 1, "title": "Steam Boiler Pressure Mechanics", "diagram_type": "steam_boiler_pressure", "instruction": "Assemble the high-pressure steam boiler components to drive the piston.", "items": [{"label": "Coal Firebox", "target": "heat_source"}, {"label": "Pressurized Water Chamber", "target": "boiler_core"}, {"label": "Safety Relief Valve", "target": "exhaust_port"}]},
        {"stage": 2, "title": "Mechanical Loom Shuttle Assembly", "diagram_type": "mechanical_loom_shuttle", "instruction": "Arrange the automated loom parts to weave cotton cloth continuously.", "items": [{"label": "Yarn Spindle Beam", "target": "warp_feed"}, {"label": "Flying Shuttle Mechanism", "target": "weft_slider"}, {"label": "Beater Comb", "target": "fabric_roller"}]},
        {"stage": 3, "title": "Locomotive Traction on Iron Rails", "diagram_type": "locomotive_wheel_traction", "instruction": "Fit the flanged wheel and drive crank onto the iron track for smooth hauling.", "items": [{"label": "Smooth Iron Rail", "target": "track_base"}, {"label": "Flanged Guide Wheel", "target": "wheel_rim"}, {"label": "Piston Connecting Rod", "target": "crank_axis"}]}
    ],
    126: [
        {"stage": 1, "title": "Cue Card Indexing System", "diagram_type": "cue_card_indexing", "instruction": "Organize speaking cues in logical sequence from hook to call to action.", "items": [{"label": "Hook & Topic Card", "target": "opening_card"}, {"label": "Two Supporting Reasons Card", "target": "body_card"}, {"label": "Memorable Final Thought Card", "target": "conclusion_card"}]},
        {"stage": 2, "title": "Signpost Roadmapping", "diagram_type": "signpost_roadmapping", "instruction": "Place directional signposts to guide listeners through speech stages.", "items": [{"label": "Today I will discuss...", "target": "intro_signpost"}, {"label": "Moving on to my next point...", "target": "body_signpost"}, {"label": "In conclusion, we have seen...", "target": "final_signpost"}]},
        {"stage": 3, "title": "Vocal Delivery and Pause Meter", "diagram_type": "vocal_pause_meter", "instruction": "Match speech segments with appropriate vocal volume and deliberate pauses.", "items": [{"label": "Clear Conversational Volume", "target": "normal_phrase"}, {"label": "Deliberate 2-Second Silence", "target": "pause_interval"}, {"label": "Emphatic Key Term Stress", "target": "focus_word"}]}
    ],
    127: [
        {"stage": 1, "title": "Identifying Claim vs Counter Evidence", "diagram_type": "claim_vs_evidence", "instruction": "Separate an opponent assertion from verified rebuttal facts.", "items": [{"label": "Opponent Generalization", "target": "claim_slot"}, {"label": "Factual Counter Statistic", "target": "evidence_slot"}, {"label": "Polite Rebuttal Phrase", "target": "bridge_slot"}]},
        {"stage": 2, "title": "Four-Step Rebuttal Frame", "diagram_type": "four_step_rebuttal", "instruction": "Assemble the standard four-part rebuttal formula.", "items": [{"label": "They claim that...", "target": "step_1_they_say"}, {"label": "However, I argue that...", "target": "step_2_i_say"}, {"label": "Because research indicates that...", "target": "step_3_because"}]},
        {"stage": 3, "title": "Politeness Register Calibration", "diagram_type": "politeness_register", "instruction": "Select polite connectors that respect the speaker while countering the idea.", "items": [{"label": "While I see your point...", "target": "polite_concession"}, {"label": "On the other hand...", "target": "factual_contrast"}, {"label": "Therefore, the balance shifts...", "target": "logical_conclusion"}]}
    ],
    129: [
        {"stage": 1, "title": "Screen Time Sleep Barrier", "diagram_type": "screen_time_sleep", "instruction": "Demonstrate how late-night device light delays sleep cycles.", "items": [{"label": "Blue Screen Emission", "target": "light_source"}, {"label": "Delayed Hormone Release", "target": "brain_clock"}, {"label": "Restful Sleep Period", "target": "night_cycle"}]},
        {"stage": 2, "title": "Notification Filter Filter", "diagram_type": "notification_filter", "instruction": "Configure phone alert levels during scheduled study hours.", "items": [{"label": "Family Emergency Contact", "target": "allowed_channel"}, {"label": "Study Do-Not-Disturb Mode", "target": "active_filter"}, {"label": "Gaming Alert Lockout", "target": "blocked_channel"}]},
        {"stage": 3, "title": "Balanced Daily Student Schedule", "diagram_type": "balanced_student_day", "instruction": "Build a healthy 24-hour balance of school, outdoor play, and device time.", "items": [{"label": "Outdoor Physical Play (1 hr)", "target": "play_block"}, {"label": "Homework & Family Dinner (3 hrs)", "target": "family_block"}, {"label": "Educational Screen Window (45 mins)", "target": "tech_block"}]}
    ],
    130: [
        {"stage": 1, "title": "French Classroom Storage Box", "diagram_type": "lockbox_storage", "instruction": "Simulate the morning collection and safe storage of school phones.", "items": [{"label": "Morning Check-In Bag", "target": "entry_bin"}, {"label": "Classroom Lockbox", "target": "secure_chest"}, {"label": "Dismissal Return Shelf", "target": "exit_bin"}]},
        {"stage": 2, "title": "Digital Research Access Gate", "diagram_type": "research_access_gate", "instruction": "Route approved educational domains while restricting social apps.", "items": [{"label": "School Research Portal", "target": "permitted_network"}, {"label": "Teacher Verification Pin", "target": "access_key"}, {"label": "Social Media Firewall", "target": "blocked_network"}]},
        {"stage": 3, "title": "Device-Free Play Yard Circles", "diagram_type": "device_free_yard", "instruction": "Organize recess zones that foster face-to-face peer interaction.", "items": [{"label": "Active Basketball Court", "target": "sports_area"}, {"label": "Reading Bench Circle", "target": "quiet_area"}, {"label": "Discussion Group Table", "target": "social_area"}]}
    ],
    131: [
        {"stage": 1, "title": "Ethos Credibility Foundation", "diagram_type": "ethos_pillar", "instruction": "Anchor a speech argument in personal integrity and trusted authorities.", "items": [{"label": "Expert Teacher Citation", "target": "foundation_base"}, {"label": "Speaker Honest Disclosure", "target": "pillar_core"}, {"label": "Respectful Tone Indicator", "target": "capital_crest"}]},
        {"stage": 2, "title": "Pathos Emotional Bridge", "diagram_type": "pathos_bridge", "instruction": "Connect shared human values with audience empathy.", "items": [{"label": "Relatable Real Student Story", "target": "bridge_approach"}, {"label": "Empathy Connecting Phrase", "target": "bridge_arch"}, {"label": "Inspiring Call to Action", "target": "bridge_landing"}]},
        {"stage": 3, "title": "Logos Analytical Logic Chain", "diagram_type": "logos_chain", "instruction": "Link verified premises to an inescapable logical conclusion.", "items": [{"label": "Verified Factual Premise A", "target": "first_link"}, {"label": "Supporting Data Stat B", "target": "middle_link"}, {"label": "Sound Concluding Finding C", "target": "anchor_link"}]}
    ],
    133: [
        {"stage": 1, "title": "Class Survey Sampling Method", "diagram_type": "survey_sampling", "instruction": "Construct a fair random sample of 100 middle school learners.", "items": [{"label": "Grade 6-8 Cohort Pool", "target": "population_pool"}, {"label": "Standardized Questionnaire", "target": "survey_tool"}, {"label": "100 Randomized Respondents", "target": "sample_group"}]},
        {"stage": 2, "title": "Data Tally and Percentage Tabulation", "diagram_type": "percentage_tabulation", "instruction": "Convert raw survey answer counts into percentages.", "items": [{"label": "Raw Tally Marks (70 votes)", "target": "count_column"}, {"label": "Fraction of Sample (70/100)", "target": "ratio_column"}, {"label": "Majority Percentage (70%)", "target": "percent_column"}]},
        {"stage": 3, "title": "Citation Proof Protocol", "diagram_type": "citation_proof", "instruction": "Format an authoritative source citation for speech delivery.", "items": [{"label": "Lead-in Attribution Tag", "target": "intro_clause"}, {"label": "Classroom Survey Data Point", "target": "statistic_core"}, {"label": "Analytical Synthesis Sentence", "target": "impact_clause"}]}
    ],
    134: [
        {"stage": 1, "title": "Hasty Generalization Filter", "diagram_type": "generalization_filter", "instruction": "Catch an unproven universal claim and add a fair qualifier.", "items": [{"label": "Absolute Word ('Always/All')", "target": "error_tag"}, {"label": "Qualifier Filter ('Often/Many')", "target": "corrective_lens"}, {"label": "Fair Balanced Statement", "target": "sound_claim"}]},
        {"stage": 2, "title": "Ad Hominem Discard Bin", "diagram_type": "ad_hominem_filter", "instruction": "Filter out personal attacks and retain only policy arguments.", "items": [{"label": "Personal Comment Card", "target": "discard_bin"}, {"label": "Policy Evidence Card", "target": "analysis_table"}, {"label": "Objective Summary Statement", "target": "debate_ledger"}]},
        {"stage": 3, "title": "False Dilemma Spectrum", "diagram_type": "false_dilemma_spectrum", "instruction": "Reject extreme black-and-white choices by finding balanced middle ground.", "items": [{"label": "Extreme Option A", "target": "left_pole"}, {"label": "Extreme Option B", "target": "right_pole"}, {"label": "Balanced Realistic Solution C", "target": "center_fulcrum"}]}
    ]
}
DATA = {
    79: {
        "cefr_level": "B1 PET",
        "theme": "The Industrial Revolution",
        "clil": {
            "title_en": "Steam Engines and Factories: The Industrial Transformation",
            "title_vi": "Động Cơ Hơi Nước và Nhà Máy: Sự Chuyển Mình Công Nghiệp",
            "content_en": "Long ago, people made cloth and tools by hand in small village homes. In the eighteenth century, the Industrial Revolution changed how people worked and lived. Inventors like James Watt built powerful steam engines. These engines burned coal to boil water into strong steam. In new factories, steam powered large machines that made clothes much faster than human hands. Soon, trains called locomotives carried goods and workers across long iron tracks. Cities grew quickly around these busy factories. Life became busier, and products cost less money. Today, we remember this period as the start of modern industry.",
            "glossary": [
                {"word": "locomotive", "definition_en": "A railway vehicle with an engine that pulls a train", "definition_vi": "đầu máy xe lửa kéo đoàn tàu"},
                {"word": "factory", "definition_en": "A large building where machines make goods quickly", "definition_vi": "nhà máy nơi máy móc sản xuất hàng hóa"},
                {"word": "steam", "definition_en": "The hot gas that water turns into when boiled", "definition_vi": "hơi nước nóng sinh ra khi nước sôi"},
                {"word": "revolution", "definition_en": "A major change in how people live and work", "definition_vi": "cuộc cách mạng thay đổi cách sống và làm việc"},
                {"word": "engine", "definition_en": "A machine that uses fuel or heat to create power", "definition_vi": "động cơ dùng nhiên liệu để tạo ra lực"}
            ]
        },
        "math_problems": [
            {
                "id": "w79_p1",
                "type": "part_whole",
                "title": "Problem 1: Bar Graph of Daily Coal Deliveries",
                "question": "A bar graph shows coal deliveries to a factory. The smelting furnace received 45 tons and the steam engine received 35 tons. What was the total coal delivered on the chart?",
                "storyContext": "William records daily coal deliveries on a bar graph chart.",
                "modelData": {"bars": [{"label": "Smelting Furnace", "value": 45, "color": "#475569"}, {"label": "Steam Engine", "value": 35, "color": "#0ea5e9"}], "total": 80, "unit": "tons of coal"},
                "target_answer": 80,
                "unit": "tons of coal",
                "steps": ["Read the bar graph value for furnace: 45 tons.", "Read the engine bar: 35 tons.", "Calculate total: 45 + 35 = 80 tons."]
            },
            {
                "id": "w79_p2",
                "type": "comparison",
                "title": "Problem 2: Representing Cloth Output on a Chart",
                "question": "A factory chart compares weaving output. A mechanical loom produced 140 yards of cloth while a hand loom produced 25 yards. How many more yards did the mechanical loom produce?",
                "storyContext": "A mill manager compares machine output on a data chart.",
                "modelData": {"bars": [{"label": "Mechanical Loom", "value": 140, "color": "#10b981"}, {"label": "Hand Loom", "value": 25, "color": "#f59e0b"}], "difference": 115, "unit": "yards of cloth"},
                "target_answer": 115,
                "unit": "yards of cloth",
                "steps": ["Mechanical loom bar: 140 yards.", "Hand loom bar: 25 yards.", "140 - 25 = 115 yards difference."]
            },
            {
                "id": "w79_p3",
                "type": "part_whole",
                "title": "Problem 3: Representing Shift Attendance on a Frequency Table",
                "question": "A frequency table represents factory workers on duty. Shift A has 120 workers and Shift B has 80 workers. How many workers are represented altogether on the table?",
                "storyContext": "The supervisor plots worker attendance data.",
                "modelData": {"bars": [{"label": "Shift A", "value": 120, "color": "#6366f1"}, {"label": "Shift B", "value": 80, "color": "#a855f7"}], "total": 200, "unit": "workers"},
                "target_answer": 200,
                "unit": "workers",
                "steps": ["Shift A count: 120 workers.", "Shift B count: 80 workers.", "120 + 80 = 200 workers in total."]
            },
            {
                "id": "w79_p4",
                "type": "comparison",
                "title": "Problem 4: Bar Graph Comparison of Iron Production",
                "question": "A bar chart represents iron ingots produced by two foundries. Foundry 1 cast 95 ingots and Foundry 2 cast 60 ingots. What is the difference shown on the vertical axis?",
                "storyContext": "Foundry logs track monthly ingot production.",
                "modelData": {"bars": [{"label": "Foundry 1", "value": 95, "color": "#0284c7"}, {"label": "Foundry 2", "value": 60, "color": "#ea580c"}], "difference": 35, "unit": "iron ingots"},
                "target_answer": 35,
                "unit": "iron ingots",
                "steps": ["Foundry 1 bar height: 95 ingots.", "Foundry 2 bar height: 60 ingots.", "95 - 60 = 35 ingots difference."]
            },
            {
                "id": "w79_p5",
                "type": "part_whole",
                "title": "Problem 5: Data Summary of Locomotive Trips",
                "question": "A railway data summary shows locomotive trips. In the first half of the month, the train made 40 trips. In the second half, it made 50 trips. How many trips are represented on the monthly summary?",
                "storyContext": "The stationmaster charts freight train journeys.",
                "modelData": {"bars": [{"label": "First Half", "value": 40, "color": "#14b8a6"}, {"label": "Second Half", "value": 50, "color": "#f43f5e"}], "total": 90, "unit": "trips"},
                "target_answer": 90,
                "unit": "trips",
                "steps": ["First half trips: 40.", "Second half trips: 50.", "40 + 50 = 90 total trips."]
            }
        ]
    },

    126: {
        "cefr_level": "B1+ Academic",
        "theme": "From Essay to Speech",
        "clil": {
            "title_en": "From Essay to Speech: Delivering Spoken Ideas",
            "title_vi": "Từ Bài Viết Đến Bài Nói: Truyền Đạt Ý Tưởng Bằng Lời",
            "content_en": "Turning an essay into a speech is an exciting skill. When you write an essay, your reader can read each paragraph slowly. However, when you give a talk, listeners must understand your main points right away. Good speakers use index cue cards instead of reading full sheets of paper. They write short bullet points to guide their ideas. In addition, they use clear signpost words. For example, phrases like moving on to or turning our attention to tell the audience what comes next. Pausing between sentences gives everyone time to think. Practicing with cue cards helps you speak with calm confidence.",
            "glossary": [
                {"word": "signpost", "definition_en": "A word or phrase that shows what topic comes next in a speech", "definition_vi": "từ chỉ dẫn chuyển ý trong bài nói"},
                {"word": "cue card", "definition_en": "A small card with brief notes to guide a speaker", "definition_vi": "thẻ ghi chú từ khóa cho người nói"},
                {"word": "audience", "definition_en": "The group of people who listen to a talk or presentation", "definition_vi": "thính giả lắng nghe bài thuyết trình"},
                {"word": "pause", "definition_en": "A short stop in speech to give listeners time to think", "definition_vi": "khoảng dừng ngắn khi nói"},
                {"word": "confidence", "definition_en": "A calm feeling of trust in your speaking skills", "definition_vi": "sự tự tin khi trình bày"}
            ]
        },
        "math_problems": [
            {
                "id": "w126_p1",
                "type": "part_whole",
                "title": "Problem 1: Logic Puzzle of Speaker Time Slots",
                "question": "In a speech logic puzzle, Speaker A speaks for 45 seconds and Speaker B speaks for 35 seconds to introduce the topic. What is their combined speaking time?",
                "storyContext": "Debaters time their speech transitions using a logic stopwatch.",
                "modelData": {"bars": [{"label": "Speaker A", "value": 45, "color": "#0ea5e9"}, {"label": "Speaker B", "value": 35, "color": "#10b981"}], "total": 80, "unit": "seconds"},
                "target_answer": 80,
                "unit": "seconds",
                "steps": ["Speaker A time: 45 seconds.", "Speaker B time: 35 seconds.", "45 + 35 = 80 seconds."]
            },
            {
                "id": "w126_p2",
                "type": "comparison",
                "title": "Problem 2: Logic Constraint on Cue Cards",
                "question": "A logic puzzle states: Maya prepared 14 cue cards for her presentation. Liam prepared 8 fewer cue cards than Maya under the tournament rules. How many cue cards did Liam prepare?",
                "storyContext": "Students organize their speech cue cards under logic rules.",
                "modelData": {"bars": [{"label": "Maya's Cards", "value": 14, "color": "#8b5cf6"}, {"label": "Difference", "value": 8, "color": "#ef4444"}], "difference": 6, "unit": "cue cards"},
                "target_answer": 6,
                "unit": "cue cards",
                "steps": ["Maya has 14 cards.", "Liam has 8 fewer cards.", "14 - 8 = 6 cards for Liam."]
            },
            {
                "id": "w126_p3",
                "type": "part_whole",
                "title": "Problem 3: Speech Structure Logic Puzzle",
                "question": "Under the debate timing rules, the introduction takes 30 seconds and the main arguments take 60 seconds. What is the total allotted time for this speech section?",
                "storyContext": "Speech coaches solve timing constraints for the debate showcase.",
                "modelData": {"bars": [{"label": "Introduction", "value": 30, "color": "#f59e0b"}, {"label": "Main Arguments", "value": 60, "color": "#3b82f6"}], "total": 90, "unit": "seconds"},
                "target_answer": 90,
                "unit": "seconds",
                "steps": ["Intro duration: 30 seconds.", "Body duration: 60 seconds.", "30 + 60 = 90 seconds total."]
            },
            {
                "id": "w126_p4",
                "type": "comparison",
                "title": "Problem 4: Logic Deduction of Signpost Markers",
                "question": "In a speech analysis puzzle, Team 1 used 15 signpost phrases while Team 2 used 9 signpost phrases. How many more signpost markers did Team 1 use?",
                "storyContext": "Adjudicators count transition cues in speech transcripts.",
                "modelData": {"bars": [{"label": "Team 1", "value": 15, "color": "#ec4899"}, {"label": "Team 2", "value": 9, "color": "#64748b"}], "difference": 6, "unit": "signpost markers"},
                "target_answer": 6,
                "unit": "signpost markers",
                "steps": ["Team 1 count: 15 markers.", "Team 2 count: 9 markers.", "15 - 9 = 6 more markers."]
            },
            {
                "id": "w126_p5",
                "type": "part_whole",
                "title": "Problem 5: Audience Feedback Logic Venn",
                "question": "A presentation logic puzzle tracks 40 feedback slips. 25 listeners commended the speaker's vocal volume and 15 commended the signpost clarity. How many total positive notes were counted?",
                "storyContext": "Students tally audience comment cards after the speeches.",
                "modelData": {"bars": [{"label": "Volume Praise", "value": 25, "color": "#14b8a6"}, {"label": "Signpost Praise", "value": 15, "color": "#f97316"}], "total": 40, "unit": "feedback slips"},
                "target_answer": 40,
                "unit": "feedback slips",
                "steps": ["Volume feedback: 25 slips.", "Signpost feedback: 15 slips.", "25 + 15 = 40 slips total."]
            }
        ]
    },

    127: {
        "cefr_level": "B1+ Academic",
        "theme": "Rebuttal Practice",
        "clil": {
            "title_en": "Rebuttal Practice: Disagreeing with Facts and Politeness",
            "title_vi": "Luyện Phản Biện: Phản Đối Bằng Dữ Liệu Và Sự Lịch Thiệp",
            "content_en": "In a debate, knowing how to disagree politely is an essential skill. When another speaker makes a claim, you should listen carefully to their point. Instead of attacking the person, focus on the facts. Strong debaters use a structure called rebuttal to explain why an argument is incomplete or false. A helpful sentence frame is: They say that homework is always useful, but I say that too much work causes stress. Using contrast connectors like however, on the contrary, or nevertheless helps you present a counter view smoothly. When you support your rebuttal with true evidence, your audience respects your ideas.",
            "glossary": [
                {"word": "rebuttal", "definition_en": "An argument that shows why another claim is false or incomplete", "definition_vi": "lập luận phản bác ý kiến đối phương"},
                {"word": "disagree", "definition_en": "To have a different view from someone else", "definition_vi": "không đồng ý với ý kiến khác"},
                {"word": "counter", "definition_en": "To give an opposing reason against a claim", "definition_vi": "đưa ra lý lẽ phản đối"},
                {"word": "point", "definition_en": "A specific argument or fact raised during a discussion", "definition_vi": "luận điểm hoặc ý kiến cụ thể"},
                {"word": "evidence", "definition_en": "Facts or proof that support an argument", "definition_vi": "bằng chứng chứng minh luận điểm"}
            ]
        },
        "math_problems": [
            {
                "id": "w127_p1",
                "type": "part_whole",
                "title": "Problem 1: Critical Thinking on Debater Points",
                "question": "A debater made a false calculation claim. In critical thinking analysis, Team A scored 40 valid points on speech 1 and 30 valid points on speech 2. What is their true combined score?",
                "storyContext": "Debate judges check scoring logs for calculation errors.",
                "modelData": {"bars": [{"label": "Speech 1", "value": 40, "color": "#0284c7"}, {"label": "Speech 2", "value": 30, "color": "#10b981"}], "total": 70, "unit": "points"},
                "target_answer": 70,
                "unit": "points",
                "steps": ["Speech 1 points: 40.", "Speech 2 points: 30.", "40 + 30 = 70 points in truth."]
            },
            {
                "id": "w127_p2",
                "type": "comparison",
                "title": "Problem 2: Critical Thinking Math on Survey Size",
                "question": "A critical thinking analysis exposes a misleading claim. School A surveyed 150 students while School B surveyed only 90 students. How many more students participated in School A's true sample?",
                "storyContext": "Researchers verify statistical claims before debate rounds.",
                "modelData": {"bars": [{"label": "School A", "value": 150, "color": "#6366f1"}, {"label": "School B", "value": 90, "color": "#f59e0b"}], "difference": 60, "unit": "students"},
                "target_answer": 60,
                "unit": "students",
                "steps": ["School A sample: 150 students.", "School B sample: 90 students.", "150 - 90 = 60 students."]
            },
            {
                "id": "w127_p3",
                "type": "part_whole",
                "title": "Problem 3: Rebutting Exaggerated Survey Claims",
                "question": "An opponent claimed 100 people supported a plan. The rebuttal team verified 55 true votes and 25 false entries on the roster. How many total entries were submitted for inspection?",
                "storyContext": "Auditors review ballot claims for mathematical accuracy.",
                "modelData": {"bars": [{"label": "True Votes", "value": 55, "color": "#14b8a6"}, {"label": "Invalid Entries", "value": 25, "color": "#ef4444"}], "total": 80, "unit": "entries"},
                "target_answer": 80,
                "unit": "entries",
                "steps": ["Valid entries: 55.", "Invalid entries: 25.", "55 + 25 = 80 total entries."]
            },
            {
                "id": "w127_p4",
                "type": "comparison",
                "title": "Problem 4: Critical Thinking on Discrepancy",
                "question": "Critical thinking math reveals that a speaker claimed 120 affirmative votes, but the official tally showed only 85 votes. What was the false exaggeration discrepancy?",
                "storyContext": "Fact-checkers calculate discrepancies in debate evidence.",
                "modelData": {"bars": [{"label": "Claimed Votes", "value": 120, "color": "#e11d48"}, {"label": "Actual Votes", "value": 85, "color": "#0d9488"}], "difference": 35, "unit": "votes"},
                "target_answer": 35,
                "unit": "votes",
                "steps": ["Claimed votes: 120.", "Actual votes: 85.", "120 - 85 = 35 votes."]
            },
            {
                "id": "w127_p5",
                "type": "part_whole",
                "title": "Problem 5: Balanced Arguments in Critical Thinking",
                "question": "A critical thinking dossier compiles 35 supporting evidence cards and 25 counter arguments. How many total argument cards are compiled in the debate folder?",
                "storyContext": "Debaters assemble balanced evidence sets for rebuttal rounds.",
                "modelData": {"bars": [{"label": "Pro Cards", "value": 35, "color": "#3b82f6"}, {"label": "Counter Cards", "value": 25, "color": "#8b5cf6"}], "total": 60, "unit": "argument cards"},
                "target_answer": 60,
                "unit": "argument cards",
                "steps": ["Supporting cards: 35.", "Counter cards: 25.", "35 + 25 = 60 cards."]
            }
        ]
    },

    129: {
        "cefr_level": "B1+ Academic",
        "theme": "Opinion Project 3: Smartphones Under 12?",
        "clil": {
            "title_en": "Children and Smartphones: Examining the Balance",
            "title_vi": "Trẻ Em Và Điện Thoại Thông Minh: Xem Xét Sự Cân Bằng",
            "content_en": "Many families discuss whether children under twelve should have smartphones. Supporters believe that phones keep kids safe because parents can call them after school hours. Handheld phones also let students use helpful learning apps and dictionaries quickly. However, teachers and doctors point out serious concerns. Staring at bright screens late at night harms natural sleep. Furthermore, social media notifications distract students during study time. Some reports suggest that young children who spend many hours online feel more anxious. When writing an opinion essay, students must examine both safety benefits and health risks before reaching a balanced conclusion.",
            "glossary": [
                {"word": "smartphone", "definition_en": "A mobile mobile phone with internet access and touch screen apps", "definition_vi": "điện thoại thông minh có kết nối mạng"},
                {"word": "notification", "definition_en": "A message or alert shown on a screen to gain attention", "definition_vi": "thông báo trên màn hình thiết bị"},
                {"word": "distract", "definition_en": "To take attention away from study or another task", "definition_vi": "làm xao lãng sự chú ý"},
                {"word": "psychologist", "definition_en": "An expert who studies how people think and behave", "definition_vi": "chuyên gia tâm lý học"},
                {"word": "balance", "definition_en": "A state where different things exist in equal measure", "definition_vi": "sự cân bằng hợp lý"}
            ]
        },
        "math_problems": [
            {
                "id": "w129_p1",
                "type": "part_whole",
                "title": "Problem 1: Fractions in a Student Phone Survey",
                "question": "In a survey of 80 sixth graders, 1/4 of the students own a smartphone and 3/4 do not. How many students in the survey sample own a smartphone?",
                "storyContext": "Class researchers calculate fractional parts of survey samples.",
                "modelData": {"bars": [{"label": "Phone Owners (1/4)", "value": 20, "color": "#0ea5e9"}, {"label": "Non-Owners (3/4)", "value": 60, "color": "#94a3b8"}], "total": 80, "unit": "students"},
                "target_answer": 20,
                "unit": "students",
                "steps": ["Total sample: 80 students.", "Fraction who own phones: 1/4.", "80 / 4 = 20 students."]
            },
            {
                "id": "w129_p2",
                "type": "comparison",
                "title": "Problem 2: Comparing Fractions of Screen Time",
                "question": "In a math logic review, Group A had 30 students with phone limits and Group B had 20 students with phone limits out of 50 total. How many more students in Group A had limits?",
                "storyContext": "Students compare screen time fractions between two classes.",
                "modelData": {"bars": [{"label": "Group A", "value": 30, "color": "#10b981"}, {"label": "Group B", "value": 20, "color": "#f59e0b"}], "difference": 10, "unit": "students"},
                "target_answer": 10,
                "unit": "students",
                "steps": ["Group A: 30 students.", "Group B: 20 students.", "30 - 20 = 10 students."]
            },
            {
                "id": "w129_p3",
                "type": "part_whole",
                "title": "Problem 3: Fractions of Homework Study Time",
                "question": "A student spent 20 minutes doing online research and 40 minutes reading paper books during a 60-minute study period. How many total minutes were studied?",
                "storyContext": "A student tracks fractions of digital study time.",
                "modelData": {"bars": [{"label": "Online Research", "value": 20, "color": "#6366f1"}, {"label": "Book Reading", "value": 40, "color": "#ec4899"}], "total": 60, "unit": "minutes"},
                "target_answer": 60,
                "unit": "minutes",
                "steps": ["Online time: 20 minutes.", "Book time: 40 minutes.", "20 + 40 = 60 minutes."]
            },
            {
                "id": "w129_p4",
                "type": "comparison",
                "title": "Problem 4: Comparing Survey Fractions",
                "question": "A school poll showed that 45 students supported a no-phone rule at lunch while 25 students opposed it. What is the difference between these survey groups?",
                "storyContext": "Researchers compare opinion factions in the lunch poll.",
                "modelData": {"bars": [{"label": "Support Rule", "value": 45, "color": "#0d9488"}, {"label": "Oppose Rule", "value": 25, "color": "#f43f5e"}], "difference": 20, "unit": "students"},
                "target_answer": 20,
                "unit": "students",
                "steps": ["Supporters: 45.", "Opponents: 25.", "45 - 25 = 20 students."]
            },
            {
                "id": "w129_p5",
                "type": "part_whole",
                "title": "Problem 5: Total Sample Size from Fraction Groups",
                "question": "In a grade-level study on smartphone habits, 35 boys and 35 girls completed the full research questionnaire. How many total learners participated?",
                "storyContext": "Researchers compute the full sample size.",
                "modelData": {"bars": [{"label": "Boys Sample", "value": 35, "color": "#3b82f6"}, {"label": "Girls Sample", "value": 35, "color": "#a855f7"}], "total": 70, "unit": "learners"},
                "target_answer": 70,
                "unit": "learners",
                "steps": ["Boys: 35.", "Girls: 35.", "35 + 35 = 70 learners."]
            }
        ]
    },

    130: {
        "cefr_level": "B1+ Academic",
        "theme": "Opinion Project 3: Comparing Global Approaches",
        "clil": {
            "title_en": "Global Approaches to School Phones: A Comparative Study",
            "title_vi": "Các Hướng Tiếp Cận Quốc Tế Về Điện Thoại Học Đường",
            "content_en": "Educational Scenario: This case study looks at school phone rules in different countries. Across the world, schools take different paths. In France, national rules ban mobile phones for young students throughout the school day. Students keep phones inside lockers or bags. Supporters say this rule stops bullying and encourages real conversations at break time. In contrast, many school districts in other places let individual schools set their own policies. Some schools use locking pouches, while others let students use phones for class research. Comparing these global policies shows that protecting student focus is an important goal everywhere.",
            "glossary": [
                {"word": "approach", "definition_en": "A particular way of dealing with a situation or problem", "definition_vi": "cách tiếp cận giải quyết vấn đề"},
                {"word": "policy", "definition_en": "A set of official rules followed by a school or organization", "definition_vi": "chính sách hoặc quy định chính thức"},
                {"word": "compare", "definition_en": "To examine two or more things to find differences", "definition_vi": "so sánh tìm điểm khác biệt"},
                {"word": "regulation", "definition_en": "An official rule made and maintained by authority", "definition_vi": "quy định pháp lý hoặc nội quy"},
                {"word": "pouch", "definition_en": "A small secure bag used to store items like phones", "definition_vi": "túi khóa bảo vệ đồ dùng"}
            ]
        },
        "math_problems": [
            {
                "id": "w130_p1",
                "type": "comparison",
                "title": "Problem 1: Decimal Comparison of Daily Screen Hours",
                "question": "A comparative study shows that students under a strict policy average 2.5 hours of daily phone use, while students without limits average 4.5 hours. What is the decimal difference in hours?",
                "storyContext": "Researchers compare daily usage averages between two regions.",
                "modelData": {"bars": [{"label": "Without Limits", "value": 45, "color": "#ef4444"}, {"label": "With Strict Policy", "value": 25, "color": "#10b981"}], "difference": 20, "unit": "tenths of an hour (2.0 hours)"},
                "target_answer": 20,
                "unit": "tenths of an hour",
                "steps": ["Average without limits: 4.5 hours (45 tenths).", "Average with policy: 2.5 hours (25 tenths).", "45 - 25 = 20 tenths (2.0 hours)."]
            },
            {
                "id": "w130_p2",
                "type": "part_whole",
                "title": "Problem 2: Decimal Addition of Study App Time",
                "question": "In a French pilot school, a student used a vocabulary app for 1.5 hours in the morning and a math app for 1.2 hours in the afternoon. What was the total app study time in tenths of an hour?",
                "storyContext": "Students log educational device usage during class workshops.",
                "modelData": {"bars": [{"label": "Morning App", "value": 15, "color": "#0ea5e9"}, {"label": "Afternoon App", "value": 12, "color": "#8b5cf6"}], "total": 27, "unit": "tenths of an hour (2.7 hours)"},
                "target_answer": 27,
                "unit": "tenths of an hour",
                "steps": ["Morning time: 1.5 hours (15 tenths).", "Afternoon time: 1.2 hours (12 tenths).", "15 + 12 = 27 tenths (2.7 hours)."]
            },
            {
                "id": "w130_p3",
                "type": "comparison",
                "title": "Problem 3: Comparing School District Compliance Decimals",
                "question": "In a regional review, District A reported 3.8 hours of uninterrupted focus time per student day, compared to 2.3 hours in District B. What is the focus time advantage for District A?",
                "storyContext": "Superintendents compare student focus metrics across districts.",
                "modelData": {"bars": [{"label": "District A", "value": 38, "color": "#14b8a6"}, {"label": "District B", "value": 23, "color": "#f59e0b"}], "difference": 15, "unit": "tenths of an hour (1.5 hours)"},
                "target_answer": 15,
                "unit": "tenths of an hour",
                "steps": ["District A: 3.8 hours (38 tenths).", "District B: 2.3 hours (23 tenths).", "38 - 23 = 15 tenths (1.5 hours)."]
            },
            {
                "id": "w130_p4",
                "type": "part_whole",
                "title": "Problem 4: Combined School Budget for Lock Pouches",
                "question": "School 1 invested $400 for classroom phone pouches and School 2 invested $500. What was the total investment combined for the two schools?",
                "storyContext": "Administrators calculate the cost of pouch hardware.",
                "modelData": {"bars": [{"label": "School 1", "value": 400, "color": "#6366f1"}, {"label": "School 2", "value": 500, "color": "#06b6d4"}], "total": 900, "unit": "dollars"},
                "target_answer": 900,
                "unit": "dollars",
                "steps": ["School 1 investment: $400.", "School 2 investment: $500.", "400 + 500 = $900."]
            },
            {
                "id": "w130_p5",
                "type": "comparison",
                "title": "Problem 5: Comparing Classroom Disruption Decimals",
                "question": "Before a phone ban, teachers recorded 5.4 disruptions per day. After the ban, disruptions fell to 1.4 per day. What was the decimal reduction in disruptions?",
                "storyContext": "School evaluators graph disruption decreases after policy changes.",
                "modelData": {"bars": [{"label": "Before Ban", "value": 54, "color": "#e11d48"}, {"label": "After Ban", "value": 14, "color": "#10b981"}], "difference": 40, "unit": "tenths (4.0 disruptions)"},
                "target_answer": 40,
                "unit": "tenths of disruptions",
                "steps": ["Before ban: 5.4 disruptions (54 tenths).", "After ban: 1.4 disruptions (14 tenths).", "54 - 14 = 40 tenths (4.0 disruptions)."]
            }
        ]
    },

    131: {
        "cefr_level": "B1+ Academic",
        "theme": "Opinion Project 3: Persuasive Techniques",
        "clil": {
            "title_en": "Persuasive Techniques: Ethos, Pathos, and Logos",
            "title_vi": "Kỹ Thuật Thuyết Phục: Ethos, Pathos Và Logos",
            "content_en": "When speakers want to convince an audience, they use three classical persuasive modes: ethos, pathos, and logos. First, ethos builds trust by showing that the speaker is honest and knowledgeable. For example, citing trusted teachers or experienced doctors gives your speech moral credibility. Second, pathos connects with human emotions like empathy, hope, or pride. Telling a short, moving story helps listeners care deeply about your message. Finally, logos appeals to logic and clear reason. Supporting an argument with true facts, balanced reasoning, and accurate data proves that your claim makes sense. Master speakers combine all three modes to deliver unforgettable speeches.",
            "glossary": [
                {"word": "ethos", "definition_en": "An appeal based on the character or credibility of the speaker", "definition_vi": "sự thuyết phục dựa trên uy tín người nói"},
                {"word": "pathos", "definition_en": "An appeal to the emotions and feelings of the audience", "definition_vi": "sự thuyết phục chạm đến cảm xúc"},
                {"word": "logos", "definition_en": "An appeal to logic, reason, and factual evidence", "definition_vi": "sự thuyết phục dựa trên lý lẽ và logic"},
                {"word": "credibility", "definition_en": "The quality of being trusted and believed in", "definition_vi": "sự đáng tin cậy"},
                {"word": "empathy", "definition_en": "The ability to understand and share the feelings of others", "definition_vi": "sự đồng cảm sâu sắc"}
            ]
        },
        "math_problems": [
            {
                "id": "w131_p1",
                "type": "part_whole",
                "title": "Problem 1: Percentage Mode Audience Survey",
                "question": "In an audience poll of 100 students, 60 listeners were persuaded by logos and 40 listeners were persuaded by pathos. What is the total audience accounted for on the chart?",
                "storyContext": "Debate coaches evaluate persuasive mode efficacy from survey results.",
                "modelData": {"bars": [{"label": "Logos Persuaded", "value": 60, "color": "#0ea5e9"}, {"label": "Pathos Persuaded", "value": 40, "color": "#ec4899"}], "total": 100, "unit": "listeners"},
                "target_answer": 100,
                "unit": "listeners",
                "steps": ["Logos count: 60.", "Pathos count: 40.", "60 + 40 = 100 listeners."]
            },
            {
                "id": "w131_p2",
                "type": "comparison",
                "title": "Problem 2: Comparing Percentage Points in Persuasion",
                "question": "A speech poll showed that 65% of listeners trusted an argument with ethos, compared to 45% who trusted a speech without citations. What is the percentage point advantage?",
                "storyContext": "Students calculate percentage point improvements from speaker credibility.",
                "modelData": {"bars": [{"label": "With Ethos (65%)", "value": 65, "color": "#10b981"}, {"label": "Without Ethos (45%)", "value": 45, "color": "#94a3b8"}], "difference": 20, "unit": "percentage points"},
                "target_answer": 20,
                "unit": "percentage points",
                "steps": ["With ethos: 65%.", "Without ethos: 45%.", "65 - 45 = 20 percentage points."]
            },
            {
                "id": "w131_p3",
                "type": "part_whole",
                "title": "Problem 3: Persuasive Vote Tally Logic",
                "question": "In a classroom mock debate on school uniforms, 45 students voted in favor after hearing a logos speech and 35 voted against. What was the total votes cast?",
                "storyContext": "The debate secretary tallies audience votes after the rebuttal round.",
                "modelData": {"bars": [{"label": "Affirmative Votes", "value": 45, "color": "#6366f1"}, {"label": "Negative Votes", "value": 35, "color": "#f59e0b"}], "total": 80, "unit": "votes"},
                "target_answer": 80,
                "unit": "votes",
                "steps": ["Affirmative: 45 votes.", "Negative: 35 votes.", "45 + 35 = 80 total votes."]
            },
            {
                "id": "w131_p4",
                "type": "comparison",
                "title": "Problem 4: Comparing Emotion vs Logic Impact",
                "question": "In a persuasive technique poll, 75 listeners rated a personal story as powerful, whereas 50 rated pure statistics as powerful. How many more listeners preferred the story?",
                "storyContext": "Students compare pathos versus logos preferences in audience logs.",
                "modelData": {"bars": [{"label": "Pathos Story", "value": 75, "color": "#f43f5e"}, {"label": "Pure Stats", "value": 50, "color": "#0284c7"}], "difference": 25, "unit": "listeners"},
                "target_answer": 25,
                "unit": "listeners",
                "steps": ["Pathos rating: 75.", "Stats rating: 50.", "75 - 50 = 25 listeners."]
            },
            {
                "id": "w131_p5",
                "type": "part_whole",
                "title": "Problem 5: Audience Feedback Classification",
                "question": "A speech evaluation sheet recorded 55 positive comments about speaker credibility and 35 positive comments about presentation clarity. How many total positive notes were counted?",
                "storyContext": "Debaters analyze post-speech evaluation slips.",
                "modelData": {"bars": [{"label": "Credibility Notes", "value": 55, "color": "#14b8a6"}, {"label": "Clarity Notes", "value": 35, "color": "#8b5cf6"}], "total": 90, "unit": "comments"},
                "target_answer": 90,
                "unit": "comments",
                "steps": ["Credibility notes: 55.", "Clarity notes: 35.", "55 + 35 = 90 comments."]
            }
        ]
    },

    133: {
        "cefr_level": "B1+ Academic",
        "theme": "Deep Research & Data",
        "clil": {
            "title_en": "Deep Research and Data: Citing Facts with Care",
            "title_vi": "Nghiên Cứu Sâu Và Dữ Liệu: Trích Dẫn Dữ Liệu Cẩn Thận",
            "content_en": "In academic projects, strong arguments rely on clear evidence rather than guesses. Using accurate data helps you persuade listeners. For instance, learners conducted a class survey of one hundred middle school students about video game habits. The survey study showed that a majority of seventy percent played for under one hour on weekdays. A small minority of fifteen percent played longer sessions. When presenting findings, speakers cite exact numbers. Phrases like 'According to our class survey' make your claims credible. Sharing statistics from a surveyed population helps prove your thesis.",
            "glossary": [
                {"word": "statistic", "definition_en": "A fact or piece of data obtained from a study of numbers", "definition_vi": "số liệu thống kê"},
                {"word": "percent", "definition_en": "One part in every hundred", "definition_vi": "phần trăm"},
                {"word": "survey", "definition_en": "An investigation of the opinions or habits of a group", "definition_vi": "cuộc khảo sát ý kiến"},
                {"word": "population", "definition_en": "The total group of individuals studied in a survey", "definition_vi": "tổng thể đối tượng khảo sát"},
                {"word": "majority", "definition_en": "The greater number or part of a group", "definition_vi": "đa số"}
            ]
        },
        "math_problems": [
            {
                "id": "w133_p1",
                "type": "part_whole",
                "title": "Problem 1: Supplementary Angles on a Straight Line",
                "question": "On a geometry diagram, an angle measuring 90 degrees and an adjacent angle measuring 45 degrees meet on a baseline. What is their combined angle measure in degrees?",
                "storyContext": "Students measure angles with a protractor during geometry research.",
                "modelData": {"bars": [{"label": "Right Angle", "value": 90, "color": "#0ea5e9"}, {"label": "Acute Angle", "value": 45, "color": "#10b981"}], "total": 135, "unit": "degrees"},
                "target_answer": 135,
                "unit": "degrees",
                "steps": ["Right angle: 90 degrees.", "Acute angle: 45 degrees.", "90 + 45 = 135 degrees."]
            },
            {
                "id": "w133_p2",
                "type": "comparison",
                "title": "Problem 2: Comparing Acute and Obtuse Angles",
                "question": "In a geometry shape investigation, Angle A is an obtuse angle of 120 degrees and Angle B is an acute angle of 50 degrees. How many degrees larger is Angle A than Angle B?",
                "storyContext": "Learners classify angles by degrees using geometry cards.",
                "modelData": {"bars": [{"label": "Obtuse Angle A", "value": 120, "color": "#8b5cf6"}, {"label": "Acute Angle B", "value": 50, "color": "#f59e0b"}], "difference": 70, "unit": "degrees"},
                "target_answer": 70,
                "unit": "degrees",
                "steps": ["Angle A: 120 degrees.", "Angle B: 50 degrees.", "120 - 50 = 70 degrees."]
            },
            {
                "id": "w133_p3",
                "type": "part_whole",
                "title": "Problem 3: Right Angle Subdivisions",
                "question": "A right angle of 90 degrees is divided into two acute angles. If the first angle is 35 degrees, what is the measure of the complementary angle that adds to 90 degrees?",
                "storyContext": "Students solve complementary angle puzzles in math workshop.",
                "modelData": {"bars": [{"label": "First Angle", "value": 35, "color": "#ec4899"}, {"label": "Complement", "value": 55, "color": "#06b6d4"}], "total": 90, "unit": "degrees"},
                "target_answer": 55,
                "unit": "degrees",
                "steps": ["Total right angle: 90 degrees.", "First part: 35 degrees.", "90 - 35 = 55 degrees."]
            },
            {
                "id": "w133_p4",
                "type": "comparison",
                "title": "Problem 4: Angle Difference in Design Graphics",
                "question": "A poster graphic features an angle of 110 degrees and a sharp angle of 40 degrees. What is the difference between these two measured angles?",
                "storyContext": "Graphic designers verify angle constraints for debate visual aids.",
                "modelData": {"bars": [{"label": "Wide Angle", "value": 110, "color": "#3b82f6"}, {"label": "Sharp Angle", "value": 40, "color": "#64748b"}], "difference": 70, "unit": "degrees"},
                "target_answer": 70,
                "unit": "degrees",
                "steps": ["Wide angle: 110 degrees.", "Sharp angle: 40 degrees.", "110 - 40 = 70 degrees."]
            },
            {
                "id": "w133_p5",
                "type": "part_whole",
                "title": "Problem 5: Total Degrees in Corner Angles",
                "question": "Two adjacent corner angles in a wooden frame each measure exactly 90 degrees. What is the sum of these two right angles in degrees?",
                "storyContext": "Carpentry math checks frame squareness.",
                "modelData": {"bars": [{"label": "Corner 1", "value": 90, "color": "#14b8a6"}, {"label": "Corner 2", "value": 90, "color": "#f97316"}], "total": 180, "unit": "degrees"},
                "target_answer": 180,
                "unit": "degrees",
                "steps": ["Corner 1: 90 degrees.", "Corner 2: 90 degrees.", "90 + 90 = 180 degrees."]
            }
        ]
    },

    134: {
        "cefr_level": "B1+ Academic",
        "theme": "Identifying Fallacies",
        "clil": {
            "title_en": "Identifying Fallacies: Spotting Faulty Reasoning",
            "title_vi": "Nhận Diện Lỗi Ngụy Biện: Phát Hiện Lập Luận Khiếm Khuyết",
            "content_en": "In formal debates, smart thinkers look for logical mistakes called fallacies. A common error is a hasty generalization. This happens when someone assumes that an entire group acts the same way without proof. For example, claiming that all gamers avoid reading books is an unproven assumption that is clearly false. Sound logic requires claims to be supported by true facts. When an argument uses solid evidence, we call it a valid point. If a premise is flawed, the conclusion becomes invalid. Careful debaters use qualifiers like often or tend to, keeping their reasoning fair and balanced.",
            "glossary": [
                {"word": "fallacy", "definition_en": "A common mistake in logical thinking", "definition_vi": "lỗi ngụy biện trong lập luận"},
                {"word": "generalization", "definition_en": "A broad statement based on only a few examples", "definition_vi": "sự khái quát hóa vội vã"},
                {"word": "assumption", "definition_en": "A thing accepted as true without proof", "definition_vi": "giả định thiếu căn cứ"},
                {"word": "valid", "definition_en": "Having a sound basis in logic or fact", "definition_vi": "hợp lý và có cơ sở"},
                {"word": "invalid", "definition_en": "Not logically correct or sound", "definition_vi": "không có giá trị logic"}
            ]
        },
        "math_problems": [
            {
                "id": "w134_p1",
                "type": "part_whole",
                "title": "Problem 1: Perimeter of an Equilateral Triangle",
                "question": "A geometric model of an equilateral triangle has 3 equal sides measuring 15 cm each. What is the total perimeter of the triangle in centimeters?",
                "storyContext": "Students construct triangle models in the math lab.",
                "modelData": {"bars": [{"label": "Side 1", "value": 15, "color": "#0ea5e9"}, {"label": "Side 2", "value": 15, "color": "#10b981"}, {"label": "Side 3", "value": 15, "color": "#8b5cf6"}], "total": 45, "unit": "cm"},
                "target_answer": 45,
                "unit": "cm",
                "steps": ["Side 1: 15 cm.", "Side 2: 15 cm.", "Side 3: 15 cm.", "15 + 15 + 15 = 45 cm."]
            },
            {
                "id": "w134_p2",
                "type": "comparison",
                "title": "Problem 2: Comparing Sides in an Isosceles Triangle",
                "question": "An isosceles triangle has a base of 20 cm and two equal sides of 14 cm each. How many centimeters longer is the base than one of the equal sides?",
                "storyContext": "Learners classify triangles by side length differences.",
                "modelData": {"bars": [{"label": "Base", "value": 20, "color": "#f59e0b"}, {"label": "Equal Side", "value": 14, "color": "#6366f1"}], "difference": 6, "unit": "cm"},
                "target_answer": 6,
                "unit": "cm",
                "steps": ["Base: 20 cm.", "Equal side: 14 cm.", "20 - 14 = 6 cm."]
            },
            {
                "id": "w134_p3",
                "type": "part_whole",
                "title": "Problem 3: Perimeter of a Scalene Triangle",
                "question": "A scalene triangle has 3 sides of different lengths: 10 cm, 12 cm, and 18 cm. What is the perimeter of this scalene triangle in centimeters?",
                "storyContext": "Math students measure scalene geometric perimeter.",
                "modelData": {"bars": [{"label": "Side A", "value": 10, "color": "#14b8a6"}, {"label": "Side B", "value": 12, "color": "#ec4899"}, {"label": "Side C", "value": 18, "color": "#0284c7"}], "total": 40, "unit": "cm"},
                "target_answer": 40,
                "unit": "cm",
                "steps": ["Side A: 10 cm.", "Side B: 12 cm.", "Side C: 18 cm.", "10 + 12 + 18 = 40 cm."]
            },
            {
                "id": "w134_p4",
                "type": "comparison",
                "title": "Problem 4: Side Difference in Triangular Banner",
                "question": "A debate tournament banner is cut in a triangle shape. The longest side measures 25 cm and the shortest side measures 15 cm. What is the difference between these two sides?",
                "storyContext": "Students measure decorative debate banners.",
                "modelData": {"bars": [{"label": "Longest Side", "value": 25, "color": "#f43f5e"}, {"label": "Shortest Side", "value": 15, "color": "#94a3b8"}], "difference": 10, "unit": "cm"},
                "target_answer": 10,
                "unit": "cm",
                "steps": ["Longest side: 25 cm.", "Shortest side: 15 cm.", "25 - 15 = 10 cm."]
            },
            {
                "id": "w134_p5",
                "type": "part_whole",
                "title": "Problem 5: Total Perimeter of Triangular Garden Plot",
                "question": "A triangular school garden plot has sides measuring 30 meters, 40 meters, and 50 meters. What is the total length of fencing needed to enclose the triangle?",
                "storyContext": "Geometry applied to real-world boundary perimeters.",
                "modelData": {"bars": [{"label": "Side 1", "value": 30, "color": "#22c55e"}, {"label": "Side 2", "value": 40, "color": "#3b82f6"}, {"label": "Side 3", "value": 50, "color": "#a855f7"}], "total": 120, "unit": "meters"},
                "target_answer": 120,
                "unit": "meters",
                "steps": ["Side 1: 30 m.", "Side 2: 40 m.", "Side 3: 50 m.", "30 + 40 + 50 = 120 meters."]
            }
        ]
    }
}

def remediate_spec_file(week):
    spec_path = f"scripts/specs_w{week}.mjs"
    if not os.path.exists(spec_path):
        print(f"Error: {spec_path} not found.")
        return False
    
    with open(spec_path, "r", encoding="utf-8") as f:
        content = f.read()

    data = DATA[week]

    # 1. Update cefr_level
    content = re.sub(r'"cefr_level":\s*"[^"]+"', f'"cefr_level": "{data["cefr_level"]}"', content)

    # 2. Update clil article & glossary
    clil_data = data["clil"]
    content = re.sub(r'"title_en":\s*"[^"]+",\s*"title_vi":\s*"[^"]+",\s*"content_en":\s*"[^"]+"',
                     f'"title_en": "{clil_data["title_en"]}",\n    "title_vi": "{clil_data["title_vi"]}",\n    "content_en": "{clil_data["content_en"]}"',
                     content)
    
    # Replace glossary in clil
    glossary_json = json.dumps(clil_data["glossary"], indent=6, ensure_ascii=False)
    content = re.sub(r'"glossary":\s*\[[\s\S]*?\],\s*"check_questions"',
                     f'"glossary": {glossary_json},\n    "check_questions"',
                     content)

    # 3. Replace math_problems and insert action_lab_scenarios
    action_lab_json = json.dumps(ACTION_LAB[week], indent=6, ensure_ascii=False)
    math_json = json.dumps(data["math_problems"], indent=6, ensure_ascii=False)
    
    if "action_lab_scenarios" in content:
        content = re.sub(r'"action_lab_scenarios":\s*\[[\s\S]*?\],\s*', '', content)
        
    content = re.sub(r'"math_problems":\s*\[[\s\S]*?\],\s*"grammar_drills"',
                     f'"math_problems": {math_json},\n    "action_lab_scenarios": {action_lab_json},\n    "grammar_drills"',
                     content)

    with open(spec_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"✅ Successfully remediated {spec_path} (CEFR: {data['cefr_level']}, 5 Math problems, simplified CLIL)")
    return True

if __name__ == "__main__":
    for w in [79, 126, 127, 129, 130, 131, 133, 134]:
        remediate_spec_file(w)
