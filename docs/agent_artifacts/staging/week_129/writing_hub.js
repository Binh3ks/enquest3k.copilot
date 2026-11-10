/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 129 | Theme: "Opinion Project 3: Smartphones Under 12?" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.859Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 129,
  "theme": "Opinion Project 3: Smartphones Under 12?",
  "cefr_level": "B1+ Academic",
  "picture_story": {
    "title": "Structuring an Academic Opinion Essay on Youth Smartphones",
    "prompt_en": "Look at the four panels. Write an opinion essay paragraph evaluating whether personal smartphones should be restricted for children under age twelve. Use evaluative modal expressions ('evidence suggests that', 'it is imperative that') and balanced reasoning. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn bài luận quan điểm đánh giá xem điện thoại thông minh cá nhân có nên bị giới hạn đối với trẻ dưới mười hai tuổi hay không. Sử dụng các cấu trúc đánh giá ('evidence suggests that', 'it is imperative that') và lập luận cân bằng. Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "While smartphones enable parents to maintain contact with children during commutes, evidence suggests that unrestricted access compromises adolescent wellbeing. Pediatric studies demonstrate that late-night screen exposure disrupts essential sleep cycles and increases social anxiety. Therefore, it is imperative that schools and families establish firm boundaries, such as screen-free study hours and age restrictions on social media apps.",
    "word_bank": [
      "adolescent",
      "smartphone",
      "development",
      "screen",
      "attention",
      "pediatric",
      "anxiety",
      "wellbeing",
      "supervision",
      "restriction"
    ],
    "sentence_frames": [
      "While smartphones offer emergency communication, they can disrupt adolescent ___.",
      "Pediatric research indicates that late-night screen use impairs healthy ___.",
      "It is imperative that parents maintain consistent digital ___ at home.",
      "Ultimately, establishing clear ___ protects psychological wellbeing."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: The Safety and Connectivity Claim",
        "title_vi": "Khung 1: Khẳng Định Về An Toàn và Kết Nối",
        "image_url": "/images/week129/writing_panel_1.png",
        "image_prompt": "A young student using a mobile phone to text their mother while standing at a school bus stop in late afternoon.",
        "caption": "Phones allow parents to track transit and coordinate after-school pickups.",
        "sentence_frame": "Smartphones [allow families to maintain direct communication] during [daily school transit].",
        "pills": [
          "allow families to maintain direct communication",
          "daily school transit",
          "emergency parental contact",
          "practical connectivity"
        ],
        "connectors": [
          "On one hand,",
          "Proponents argue that,",
          "First,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Documenting Sleep and Focus Impairment",
        "title_vi": "Khung 2: Ghi Nhận Sự Suy Giảm Giấc Ngủ và Tập Trung",
        "image_url": "/images/week129/writing_panel_2.png",
        "image_prompt": "A child lying awake in a dark bedroom illuminated by the blue glow of a smartphone screen.",
        "caption": "Late-night screen use disrupts melatonin production and vital sleep.",
        "sentence_frame": "Excessive screen usage [disrupts nocturnal sleep cycles] and [impairs classroom cognitive focus].",
        "pills": [
          "disrupts nocturnal sleep cycles",
          "impairs classroom cognitive focus",
          "blue light exposure",
          "triggers social anxiety"
        ],
        "connectors": [
          "However,",
          "In contrast,",
          "On the other hand,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Establishing Healthy Home Boundaries",
        "title_vi": "Khung 3: Thiết Lập Ranh Giới Lành Mạnh Tại Nhà",
        "image_url": "/images/week129/writing_panel_3.png",
        "image_prompt": "A family charging basket in the hallway where parents and children deposit phones before bedtime.",
        "caption": "Establishing screen-free bedrooms protects youth mental wellbeing.",
        "sentence_frame": "Parents [establish screen-free charging zones] to [ensure restorative sleep for children].",
        "pills": [
          "establish screen-free charging zones",
          "ensure restorative sleep for children",
          "parental supervision guidelines",
          "enforce healthy boundaries"
        ],
        "connectors": [
          "Therefore,",
          "To mitigate these harms,",
          "It is imperative that"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Synthesizing a Balanced Recommendation",
        "title_vi": "Khung 4: Tổng Hợp Khuyến Nghị Cân Bằng",
        "image_url": "/images/week129/writing_panel_4.png",
        "image_prompt": "Happy middle school students playing soccer outdoors in a green park while backpacks rest on a bench.",
        "caption": "Balancing technology with outdoor activities fosters healthy development.",
        "sentence_frame": "A balanced lifestyle [combines essential digital moderation] with [active outdoor physical play].",
        "pills": [
          "combines essential digital moderation",
          "active outdoor physical play",
          "protects adolescent wellbeing",
          "fosters healthy development"
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
        "title": "Stage 1: Acknowledging Connectivity",
        "image_url": "/images/week129/writing_panel_1.png",
        "caption": "Phones allow parents to track transit and coordinate after-school pickups.",
        "frame_L1": "Smartphones help children contact parents in emergencies. They make walking home safer.",
        "connectors": [
          "On one hand,",
          "First,",
          "Initially,"
        ],
        "sentence_hint": "Write 2 sentences describing the safety benefits of mobile phones.",
        "ordered_chips": [
          "Smartphones enable children",
          "to contact parents in emergencies",
          "while traveling home",
          "from afternoon school activities."
        ],
        "pills": [
          "contact parents in emergencies",
          "traveling home safely",
          "smartphones enable communication",
          "practical benefit"
        ],
        "sentence_frame": "Smartphones [allow families to maintain direct communication] during [daily school transit]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Highlighting Psychological Risks",
        "image_url": "/images/week129/writing_panel_2.png",
        "caption": "Late-night screen use disrupts melatonin production and vital sleep.",
        "frame_L1": "However, excessive screen time harms sleep. Children stay awake late browsing social media apps.",
        "connectors": [
          "However,",
          "In contrast,",
          "Evidence shows that,"
        ],
        "sentence_hint": "Write 2 sentences explaining how screens impair sleep and attention.",
        "pills": [
          "excessive screen time",
          "harms natural sleep",
          "browsing late at night",
          "impairs classroom focus"
        ],
        "sentence_frame": "Excessive screen usage [disrupts nocturnal sleep cycles] and [impairs classroom cognitive focus]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Proposing Balanced Solutions",
        "image_url": "/images/week129/writing_panel_3.png",
        "caption": "Establishing screen-free bedrooms protects youth mental wellbeing.",
        "frame_L1": "Families should create screen-free bedrooms. Parents must supervise app downloads carefully.",
        "connectors": [
          "Therefore,",
          "It is essential that,",
          "For this reason,"
        ],
        "sentence_hint": "Write 2 sentences suggesting guidelines for healthy phone boundaries.",
        "pills": [
          "screen-free bedrooms",
          "supervise app downloads",
          "create healthy boundaries",
          "protect mental health"
        ],
        "sentence_frame": "Parents [establish screen-free charging zones] to [ensure restorative sleep for children]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Synthesizing the Opinion Conclusion",
        "image_url": "/images/week129/writing_panel_4.png",
        "caption": "Balancing technology with outdoor activities fosters healthy development.",
        "frame_L1": "In conclusion, moderation is the best policy. Children need both technology skills and outdoor active play.",
        "connectors": [
          "In conclusion,",
          "Ultimately,",
          "Consequently,"
        ],
        "sentence_hint": "Write 2 sentences concluding whether smartphones should be restricted or moderated.",
        "pills": [
          "moderation is key",
          "technology skills and play",
          "protect adolescent wellbeing",
          "foster healthy development"
        ],
        "sentence_frame": "A balanced lifestyle [combines essential digital moderation] with [active outdoor physical play]."
      }
    ]
  }
};
export default writingHubData;
