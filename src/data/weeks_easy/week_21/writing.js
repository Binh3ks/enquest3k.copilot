export default {
  title: "Max's Diary - Yesterday",
  min_words: 30,
  instruction_en: "Write about what you did yesterday using past tense!",
  instruction_vi: "Viết về những gì bạn đã làm hôm qua bằng thì quá khứ!",
  prompt_en: "What did you do in the morning? After school? In the evening?",
  prompt_vi: "Buổi sáng bạn đã làm gì? Sau trường? Tối thì sao?",
  topic_talk_prompt: "What did you do yesterday — morning, afternoon, and evening?",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "Yesterday I **woke up early** and **brushed my teeth**.",
      "answers": [
        "woke up early",
        "brushed my teeth"
      ]
    },
    {
      "template": "I **packed my bag** and **walked to school** with my friend.",
      "answers": [
        "packed my bag",
        "walked to school"
      ]
    },
    {
      "template": "At school, I listened carefully to my teacher.",
      "answers": [
        "listened carefully"
      ]
    },
    {
      "template": "**At break time**, I **played soccer**. I **shouted with excitement** when we scored a goal!",
      "answers": [
        "At break time",
        "played soccer",
        "shouted with excitement"
      ]
    },
    {
      "template": "After school, I **helped my mother prepare dinner**. Then I **cleaned my room**.",
      "answers": [
        "helped my mother prepare dinner",
        "cleaned my room"
      ]
    },
    {
      "template": "In the evening, I **looked at the stars** and **counted ten** of them. Then I **started to fall asleep**.",
      "answers": [
        "looked at the stars",
        "counted ten",
        "started to fall asleep"
      ]
    }
  ],
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "woke up early",
    "brushed my teeth",
    "packed my bag",
    "walked to school",
    "listened carefully",
    "At break time",
    "played soccer",
    "shouted with excitement",
    "helped my mother prepare dinner",
    "cleaned my room",
    "looked at the stars",
    "counted ten",
    "started to fall asleep"
  ]
};
