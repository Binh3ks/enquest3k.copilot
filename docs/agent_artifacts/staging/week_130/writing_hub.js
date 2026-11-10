/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 130 | Theme: "Opinion Project 3: Comparing Global Approaches" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.865Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 130,
  "theme": "Opinion Project 3: Comparing Global Approaches",
  "cefr_level": "B1+ Academic",
  "picture_story": {
    "title": "Comparative Analysis of International Device Legislation",
    "prompt_en": "Look at the four panels. Write a comparative essay paragraph synthesizing French and American statutory approaches to student mobile devices. Use comparative connectors ('in contrast to', 'whereas', 'on the other hand') and legal terminology. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn bài luận so sánh tổng hợp các cách tiếp cận luật pháp của Pháp và Hoa Kỳ đối với thiết bị di động của học sinh. Sử dụng từ nối so sánh ('in contrast to', 'whereas', 'on the other hand') và thuật ngữ pháp lý. Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "In contrast to France's centralized legislation, which completely bans personal smartphones on school campuses, Florida adopted a targeted statutory framework. French policymakers enacted an absolute prohibition to eliminate cyberbullying and restore academic concentration. Whereas Florida's legislation specifically restricts access to algorithmic social media networks during instructional hours, both jurisdictions provide clear medical exemptions to safeguard student health.",
    "word_bank": [
      "comparative",
      "legislation",
      "ban",
      "jurisdiction",
      "enforcement",
      "policy",
      "compliance",
      "statute",
      "restriction",
      "exemption"
    ],
    "sentence_frames": [
      "In contrast to France's nationwide ban, Florida adopted a targeted ___ framework.",
      "French policymakers enacted strict ___ to eliminate classroom distractions.",
      "Whereas France prohibits all devices, Florida restricts access to social ___ apps.",
      "Ultimately, both legal models grant statutory ___ for verified medical needs."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: The French Centralized Prohibition",
        "title_vi": "Khung 1: Lệnh Cấm Tập Trung Của Pháp",
        "image_url": "/images/week130/writing_panel_1.png",
        "image_prompt": "French middle school students placing their mobile phones into numbered secure wooden lockers in the school foyer.",
        "caption": "France enacted a nationwide statute prohibiting devices across all school grounds.",
        "sentence_frame": "French legislation [imposes an absolute nationwide ban] on [personal mobile devices in schools].",
        "pills": [
          "imposes an absolute nationwide ban",
          "personal mobile devices in schools",
          "centralized statutory code",
          "prohibits playground usage"
        ],
        "connectors": [
          "First,",
          "Under French law,",
          "In the French model,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Florida's Social Media Statute",
        "title_vi": "Khung 2: Đạo Luật Mạng Xã Hội Của Florida",
        "image_url": "/images/week130/writing_panel_2.png",
        "image_prompt": "A state legislative chamber with voting boards displaying bill titles on youth digital platform access.",
        "caption": "Florida's statute specifically restricts minor social media platform accounts.",
        "sentence_frame": "Florida lawmakers [passed targeted legislation] that [restricts minor social media access].",
        "pills": [
          "passed targeted legislation",
          "restricts minor social media access",
          "algorithmic platform safeguards",
          "district-level enforcement"
        ],
        "connectors": [
          "In contrast,",
          "Whereas Florida,",
          "On the other hand,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Statutory Exemptions for Medical Needs",
        "title_vi": "Khung 3: Các Miễn Trừ Pháp Lý Cho Nhu Cầu Y Tế",
        "image_url": "/images/week130/writing_panel_3.png",
        "image_prompt": "A school nurse reviewing a student's continuous glucose monitoring smartphone app with medical permission forms.",
        "caption": "Statutes provide legal exemptions for students requiring continuous medical monitoring.",
        "sentence_frame": "Both jurisdictions [grant official statutory exemptions] for [students with documented medical needs].",
        "pills": [
          "grant official statutory exemptions",
          "students with documented medical needs",
          "glucose monitoring devices",
          "essential health protections"
        ],
        "connectors": [
          "Importantly,",
          "In both jurisdictions,",
          "Furthermore,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Comparative Governance Insights",
        "title_vi": "Khung 4: Những Góc Nhìn Quản Trị So Sánh",
        "image_url": "/images/week130/writing_panel_4.png",
        "image_prompt": "A global comparative law seminar with international flags and presentation screens showing youth policy metrics.",
        "caption": "Comparing legal cultures illuminates diverse paths to digital governance.",
        "sentence_frame": "Comparative legal analysis [reveals how diverse cultures] address [shared modern technological challenges].",
        "pills": [
          "reveals how diverse cultures",
          "shared modern technological challenges",
          "balances freedom and safety",
          "effective public governance"
        ],
        "connectors": [
          "In conclusion,",
          "Ultimately,",
          "Consequently,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Describing the French Model",
        "image_url": "/images/week130/writing_panel_1.png",
        "caption": "France enacted a nationwide statute prohibiting devices across all school grounds.",
        "frame_L1": "France has a nationwide law. It bans all mobile phones in elementary and middle schools.",
        "connectors": [
          "First,",
          "Under French law,",
          "In France,"
        ],
        "sentence_hint": "Write 2 sentences describing France's absolute device ban.",
        "ordered_chips": [
          "French national legislation",
          "completely bans mobile phones",
          "across all school grounds",
          "during instructional hours."
        ],
        "pills": [
          "French national legislation",
          "completely bans mobile phones",
          "across school grounds",
          "instructional hours"
        ],
        "sentence_frame": "French legislation [imposes an absolute nationwide ban] on [personal mobile devices in schools]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Introducing the Florida Approach",
        "image_url": "/images/week130/writing_panel_2.png",
        "caption": "Florida's statute specifically restricts minor social media platform accounts.",
        "frame_L1": "In contrast, Florida passed a different law. It restricts youth access to social media apps during class.",
        "connectors": [
          "In contrast,",
          "Whereas Florida,",
          "On the other hand,"
        ],
        "sentence_hint": "Write 2 sentences contrasting Florida's targeted policy with France's ban.",
        "pills": [
          "in contrast",
          "Florida passed a law",
          "restricts social media",
          "during class hours"
        ],
        "sentence_frame": "Florida lawmakers [passed targeted legislation] that [restricts minor social media access]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Identifying Shared Safeguards",
        "image_url": "/images/week130/writing_panel_3.png",
        "caption": "Statutes provide legal exemptions for students requiring continuous medical monitoring.",
        "frame_L1": "Both laws provide medical exemptions. Students with health monitoring devices can use phones safely.",
        "connectors": [
          "Importantly,",
          "Furthermore,",
          "In both jurisdictions,"
        ],
        "sentence_hint": "Write 2 sentences describing how medical exemptions protect students.",
        "pills": [
          "both laws provide exemptions",
          "health monitoring devices",
          "use phones safely",
          "essential protection"
        ],
        "sentence_frame": "Both jurisdictions [grant official statutory exemptions] for [students with documented medical needs]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Synthesizing Comparative Governance",
        "image_url": "/images/week130/writing_panel_4.png",
        "caption": "Comparing legal cultures illuminates diverse paths to digital governance.",
        "frame_L1": "Comparative law shows different solutions. Governments can balance technological access with student focus.",
        "connectors": [
          "In conclusion,",
          "Ultimately,",
          "Consequently,"
        ],
        "sentence_hint": "Write 2 sentences summarizing the broader lessons of comparative policy analysis.",
        "pills": [
          "comparative law insights",
          "different regulatory paths",
          "balance access and focus",
          "modern public governance"
        ],
        "sentence_frame": "Comparative legal analysis [reveals how diverse cultures] address [shared modern technological challenges]."
      }
    ]
  }
};
export default writingHubData;
