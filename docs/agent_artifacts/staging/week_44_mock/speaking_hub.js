/**
 * STAGED MOCK EXAM DELIVERABLE: Speaking Paper (Parts 1-4 with Solo-AI Partner Nova)
 * Week: 44 | Level: A2 Flyers | Mode: FULL_MOCK
 * Cumulative Sourcing: Weeks 41, 42, 43, 44
 */

export const speakingHubData = {
  "week": 44,
  "theme": "The Cookie Monster (Subtraction Language)",
  "cefr_level": "A2 Flyers",
  "paper": "Speaking",
  "total_parts": 4,
  "approx_minutes": 9,
  "ai_partner": "Nova (Solo-AI Examiner)",
  "find_differences": {
    "part": 1,
    "instructions": "Look at the two pictures. Find 5 differences and describe them to Nova.",
    "examiner_script": "Here are two pictures of the Science Discovery Laboratory. They look similar, but some things are different. In Picture A, there is one chrysalis hanging on the twig, but in Picture B, there are two chrysalises. Now what other differences can you see?",
    "differences": [
      {
        "id": 1,
        "picture_a": "One chrysalis is hanging on the wooden twig",
        "picture_b": "Two chrysalises are hanging on the wooden twig"
      },
      {
        "id": 2,
        "picture_a": "The boy is holding a round cookie on a plate",
        "picture_b": "The boy is holding a glass test tube"
      },
      {
        "id": 3,
        "picture_a": "The poster on the wall shows a blue rain cloud",
        "picture_b": "The poster on the wall shows a yellow sun"
      },
      {
        "id": 4,
        "picture_a": "There are four marbles on the wooden scale",
        "picture_b": "There are six marbles on the wooden scale"
      },
      {
        "id": 5,
        "picture_a": "The clock on the wall shows half past two",
        "picture_b": "The clock on the wall shows quarter past three"
      }
    ]
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Leo's Butterfly Garden",
      "person": "Leo",
      "fields": [
        {
          "id": "location",
          "cue_prompt": "Where / garden",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where is Leo's butterfly garden?",
            "Where did Leo go?",
            "Where is the garden?"
          ],
          "nova_reply": "Leo's butterfly garden is at the Riverside Botanical Park."
        },
        {
          "id": "ticket_price",
          "cue_prompt": "How much / ticket",
          "cue_word": "how much",
          "is_missing": true,
          "acceptable_questions": [
            "How much was the ticket?",
            "How much did Leo's ticket cost?",
            "What was the price of the ticket?"
          ],
          "nova_reply": "The child ticket cost four pounds fifty."
        },
        {
          "id": "activity",
          "cue_prompt": "What / observe",
          "cue_word": "what observe",
          "is_missing": true,
          "acceptable_questions": [
            "What did Leo observe?",
            "What did he see in the garden?",
            "What did Leo watch?"
          ],
          "nova_reply": "He observed sixty colourful swallowtail butterflies feeding on nectar."
        },
        {
          "id": "equipment",
          "cue_prompt": "What / bring",
          "cue_word": "what bring",
          "is_missing": true,
          "acceptable_questions": [
            "What did Leo bring with him?",
            "What equipment did he bring?",
            "What did he take?"
          ],
          "nova_reply": "He brought a magnifying glass and a nature sketchbook."
        },
        {
          "id": "opening_hours",
          "cue_prompt": "What time / open",
          "cue_word": "what time open",
          "is_missing": true,
          "acceptable_questions": [
            "What time does the garden open?",
            "When does it open?",
            "What are the opening hours?"
          ],
          "nova_reply": "The botanical butterfly garden opens at ten o'clock every morning."
        }
      ]
    },
    "table_b": {
      "title": "Anna's Water Cycle Project",
      "person": "Anna",
      "fields": [
        {
          "id": "topic",
          "cue_prompt": "What / project topic",
          "cue_word": "what topic",
          "value": "How Clouds and Rain Form",
          "nova_question": "What was the topic of Anna's science project?",
          "acceptable_answers": [
            "Her topic was How Clouds and Rain Form.",
            "It was about How Clouds and Rain Form.",
            "How Clouds and Rain Form."
          ]
        },
        {
          "id": "materials",
          "cue_prompt": "What materials / use",
          "cue_word": "materials",
          "value": "A glass jar, warm water, and ice cubes",
          "nova_question": "What materials did Anna use for her experiment?",
          "acceptable_answers": [
            "She used a glass jar, warm water, and ice cubes.",
            "Anna used a glass jar, warm water, and ice cubes.",
            "A glass jar, warm water, and ice."
          ]
        },
        {
          "id": "result",
          "cue_prompt": "What / happened",
          "cue_word": "what happened",
          "value": "Tiny water drops fell like gentle rain",
          "nova_question": "What happened during Anna's experiment?",
          "acceptable_answers": [
            "Tiny water drops fell like gentle rain.",
            "Water drops fell inside the jar.",
            "Tiny water drops fell like rain."
          ]
        },
        {
          "id": "room_number",
          "cue_prompt": "Which / room",
          "cue_word": "which room",
          "value": "Science Lab 4B",
          "nova_question": "Which room was Anna's project presented in?",
          "acceptable_answers": [
            "It was presented in Science Lab 4B.",
            "In Science Lab 4B.",
            "Science Lab 4B."
          ]
        },
        {
          "id": "award_won",
          "cue_prompt": "What prize / win",
          "cue_word": "what prize",
          "value": "First Prize Gold Shield",
          "nova_question": "What prize did Anna win for her project?",
          "acceptable_answers": [
            "She won the First Prize Gold Shield.",
            "Anna won First Prize Gold Shield.",
            "The First Prize Gold Shield."
          ]
        }
      ]
    }
  },
  "picture_story": {
    "part": 3,
    "title": "The Missing Biscuit Mystery",
    "instructions": "Look at the 5 pictures. They show a story about missing biscuits. Tell the story to Nova.",
    "examiner_intro": "These pictures tell a story called 'The Missing Biscuit Mystery'. Look at picture 1 first. Clara and Toby baked twelve warm chocolate cookies and left them on the kitchen table. Now you tell the story.",
    "frames": [
      {
        "frame_id": 1,
        "title": "Baking the Cookies",
        "narration_prompt": "Clara and Toby place a fresh tray of twelve chocolate biscuits on the kitchen table to cool.",
        "cue_keywords": [
          "bake",
          "twelve cookies",
          "tray",
          "kitchen",
          "smell"
        ]
      },
      {
        "frame_id": 2,
        "title": "The Sneaky Puppy",
        "narration_prompt": "While the children are outside washing their hands, their mischievous puppy Barnaby sneaks into the kitchen.",
        "cue_keywords": [
          "puppy",
          "sneak",
          "table",
          "hungry",
          "sniff"
        ]
      },
      {
        "frame_id": 3,
        "title": "Counting the Leftovers",
        "narration_prompt": "When the children return, Clara counts the cookies and realizes three are missing from the tray.",
        "cue_keywords": [
          "count",
          "missing",
          "nine cookies",
          "subtract",
          "surprised"
        ]
      },
      {
        "frame_id": 4,
        "title": "Following the Crumbs",
        "narration_prompt": "Toby spots a trail of sweet chocolate crumbs leading under the dining room armchair.",
        "cue_keywords": [
          "crumbs",
          "trail",
          "floor",
          "follow",
          "armchair"
        ]
      },
      {
        "frame_id": 5,
        "title": "The Sleepy Cookie Monster",
        "narration_prompt": "They find puppy Barnaby curled up asleep with a full tummy, looking like a little cookie monster.",
        "cue_keywords": [
          "asleep",
          "tummy",
          "cookie monster",
          "laugh",
          "happy"
        ]
      }
    ]
  },
  "personal_questions": {
    "part": 4,
    "instructions": "Answer Nova's questions about nature, school subjects, and snacks.",
    "questions": [
      {
        "id": 1,
        "topic": "Favourite school subject",
        "question": "Do you prefer science experiments or math puzzles at school?",
        "follow_up": "What is the most interesting project you have done in that subject?"
      },
      {
        "id": 2,
        "topic": "Insects and nature",
        "question": "Have you ever observed a butterfly or caterpillar in your garden or a park?",
        "follow_up": "What did it look like and what was it doing?"
      },
      {
        "id": 3,
        "topic": "Rainy days",
        "question": "What do you like to do on days when it rains heavily outside?",
        "follow_up": "Do you like playing board games or reading books indoors?"
      },
      {
        "id": 4,
        "topic": "Baking and sharing snacks",
        "question": "Do you enjoy baking cookies or snacks with your family?",
        "follow_up": "Who do you like to share your favourite treats with?"
      }
    ]
  }
};

export default speakingHubData;
