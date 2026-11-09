/**
 * STAGED MOCK EXAM DELIVERABLE: Speaking Paper (Parts 1-4 with Solo-AI Partner Nova)
 * Week: 48 | Level: A2 Flyers | Mode: FULL_MOCK
 * Cumulative Sourcing: Weeks 45, 46, 47, 48
 */

export const speakingHubData = {
  "week": 48,
  "theme": "Measuring Up (Length)",
  "cefr_level": "A2 Flyers",
  "paper": "Speaking",
  "total_parts": 4,
  "approx_minutes": 9,
  "ai_partner": "Nova (Solo-AI Examiner)",
  "find_differences": {
    "part": 1,
    "instructions": "Look at the two pictures. Find 5 differences and describe them to Nova.",
    "examiner_script": "Here are two pictures of the Architecture and Geometry Studio. They look similar, but some things are different. In Picture A, the teacher is holding a big triangle, but in Picture B, the teacher is holding a big square. Now what other differences can you see?",
    "differences": [
      {
        "id": 1,
        "picture_a": "The teacher is holding a big yellow triangle",
        "picture_b": "The teacher is holding a big yellow square"
      },
      {
        "id": 2,
        "picture_a": "There is a blue rectangular storage box under the table",
        "picture_b": "There is a red circular basket under the table"
      },
      {
        "id": 3,
        "picture_a": "The boy is measuring a wooden plank with a yellow ruler",
        "picture_b": "The boy is cutting paper with silver scissors"
      },
      {
        "id": 4,
        "picture_a": "The clock on the wall shows half past two",
        "picture_b": "The clock on the wall shows quarter past four"
      },
      {
        "id": 5,
        "picture_a": "The wooden tower on the bench has six blocks",
        "picture_b": "The wooden tower on the bench has eight blocks"
      }
    ]
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Marcus's Tower Model",
      "person": "Marcus",
      "fields": [
        {
          "id": "location",
          "cue_prompt": "Where / built",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where did Marcus build his tower model?",
            "Where was Marcus's tower built?",
            "Where is the tower model?"
          ],
          "nova_reply": "Marcus built his tower model in the school design laboratory."
        },
        {
          "id": "height",
          "cue_prompt": "How tall / tower",
          "cue_word": "how tall",
          "is_missing": true,
          "acceptable_questions": [
            "How tall is the tower model?",
            "How tall is Marcus's tower?",
            "What is the height of the tower?"
          ],
          "nova_reply": "His tower model is seventy-five centimeters tall."
        },
        {
          "id": "material",
          "cue_prompt": "What material / use",
          "cue_word": "what material",
          "is_missing": true,
          "acceptable_questions": [
            "What material did Marcus use?",
            "What did he use to build the tower?",
            "What is the tower made of?"
          ],
          "nova_reply": "He used thirty rectangular balsa wood blocks."
        },
        {
          "id": "time_taken",
          "cue_prompt": "How long / take",
          "cue_word": "how long",
          "is_missing": true,
          "acceptable_questions": [
            "How long did it take to build?",
            "How long did Marcus take?",
            "How many hours did it take?"
          ],
          "nova_reply": "It took Marcus two hours to assemble and glue the blocks."
        },
        {
          "id": "prize_won",
          "cue_prompt": "What prize / win",
          "cue_word": "what prize",
          "is_missing": true,
          "acceptable_questions": [
            "What prize did Marcus win?",
            "Did Marcus win a prize?",
            "What award did he get?"
          ],
          "nova_reply": "He won the Junior Architect Gold Badge."
        }
      ]
    },
    "table_b": {
      "title": "Lily's Geometric Kite",
      "person": "Lily",
      "fields": [
        {
          "id": "shape",
          "cue_prompt": "What shape / kite",
          "cue_word": "what shape",
          "value": "A diamond with two triangles",
          "nova_question": "What shape is Lily's geometric kite?",
          "acceptable_answers": [
            "Her kite is a diamond with two triangles.",
            "It is a diamond with two triangles.",
            "A diamond with two triangles."
          ]
        },
        {
          "id": "tail_length",
          "cue_prompt": "How long / tail",
          "cue_word": "how long",
          "value": "One meter and twenty centimeters",
          "nova_question": "How long is the kite's ribbon tail?",
          "acceptable_answers": [
            "The tail is one meter and twenty centimeters long.",
            "It is one meter and twenty centimeters.",
            "One meter twenty centimeters."
          ]
        },
        {
          "id": "colors",
          "cue_prompt": "What colours / kite",
          "cue_word": "what colours",
          "value": "Bright red and yellow stripes",
          "nova_question": "What colours did Lily paint on her kite?",
          "acceptable_answers": [
            "She painted bright red and yellow stripes.",
            "Her kite has red and yellow stripes.",
            "Bright red and yellow stripes."
          ]
        },
        {
          "id": "location",
          "cue_prompt": "Where / fly",
          "cue_word": "where fly",
          "value": "Sunny Hill Park",
          "nova_question": "Where did Lily fly her geometric kite?",
          "acceptable_answers": [
            "She flew her kite at Sunny Hill Park.",
            "At Sunny Hill Park.",
            "Sunny Hill Park."
          ]
        },
        {
          "id": "cost",
          "cue_prompt": "How much / cost",
          "cue_word": "how much",
          "value": "Five pounds",
          "nova_question": "How much did the materials cost?",
          "acceptable_answers": [
            "The materials cost five pounds.",
            "It cost five pounds.",
            "Five pounds."
          ]
        }
      ]
    }
  },
  "picture_story": {
    "part": 3,
    "title": "The Lost Blue Ruler",
    "instructions": "Look at the 5 pictures. They show a story about finding a lost ruler. Tell the story to Nova.",
    "examiner_intro": "These pictures tell a story called 'The Lost Blue Ruler'. Look at picture 1 first. William is sitting at his craft desk, but he cannot find his blue measuring ruler. Now you tell the story.",
    "frames": [
      {
        "frame_id": 1,
        "title": "Looking for the Ruler",
        "narration_prompt": "William searches through his pencil case and under his drawing paper, but his blue ruler is missing.",
        "cue_keywords": [
          "search",
          "pencil case",
          "blue ruler",
          "missing",
          "worried"
        ]
      },
      {
        "frame_id": 2,
        "title": "Asking Friends",
        "narration_prompt": "He asks Holly and Penny if they have seen his ruler on the geometry craft table.",
        "cue_keywords": [
          "ask",
          "friends",
          "table",
          "help",
          "look"
        ]
      },
      {
        "frame_id": 3,
        "title": "Spotting Something Blue",
        "narration_prompt": "Holly spots a bright blue corner poking out from behind the tall wooden block tower.",
        "cue_keywords": [
          "spot",
          "corner",
          "behind",
          "tower",
          "blocks"
        ]
      },
      {
        "frame_id": 4,
        "title": "Carefully Retrieving It",
        "narration_prompt": "William carefully slides the ruler out without knocking over the tall tower.",
        "cue_keywords": [
          "slide",
          "careful",
          "steady",
          "balance",
          "relief"
        ]
      },
      {
        "frame_id": 5,
        "title": "Measuring Together",
        "narration_prompt": "With his ruler back, William and his friends finish measuring their project happily.",
        "cue_keywords": [
          "measure",
          "finish",
          "project",
          "happy",
          "success"
        ]
      }
    ]
  },
  "personal_questions": {
    "part": 4,
    "instructions": "Answer Nova's questions about shapes, building, and measurement.",
    "questions": [
      {
        "id": 1,
        "topic": "Favourite shapes",
        "question": "What is your favourite geometric shape, and what objects around your home have that shape?",
        "follow_up": "Do you prefer drawing circles or straight rectangles?"
      },
      {
        "id": 2,
        "topic": "Building models",
        "question": "Do you like building things with toy blocks, cardboard, or wooden sticks?",
        "follow_up": "What is the tallest or most interesting thing you have ever built?"
      },
      {
        "id": 3,
        "topic": "Measuring things",
        "question": "When do you use a ruler at school or at home?",
        "follow_up": "Have you ever measured how tall you are on a wall chart?"
      },
      {
        "id": 4,
        "topic": "Logic and puzzles",
        "question": "Do you enjoy solving jigsaw puzzles or pattern games with friends?",
        "follow_up": "Who helps you when a puzzle is very tricky?"
      }
    ]
  }
};

export default speakingHubData;
