/**
 * STAGED MOCK EXAM DELIVERABLE: Speaking Paper (Parts 1-4 with Solo-AI Partner Nova)
 * Week: 40 | Level: A2 Flyers | Mode: FULL_MOCK
 * Cumulative Sourcing: Weeks 37, 38, 39, 40
 */

export const speakingHubData = {
  "week": 40,
  "theme": "Beast Battle (Comparisons)",
  "cefr_level": "A2 Flyers",
  "paper": "Speaking",
  "total_parts": 4,
  "approx_minutes": 9,
  "ai_partner": "Nova (Solo-AI Examiner)",
  "find_differences": {
    "part": 1,
    "instructions": "Look at the two pictures. Find 5 differences and describe them to Nova.",
    "examiner_script": "Here are two pictures of the Wildlife Observation Post. They look similar, but some things are different. In Picture A, there is one leopard in the tree, but in Picture B, there are two leopards. Now what other differences can you see?",
    "differences": [
      {
        "id": 1,
        "picture_a": "One leopard is resting on the tree branch",
        "picture_b": "Two leopards are resting on the tree branch"
      },
      {
        "id": 2,
        "picture_a": "The ranger is holding a blue clipboard",
        "picture_b": "The ranger is holding a yellow map"
      },
      {
        "id": 3,
        "picture_a": "The weather is sunny with two white clouds",
        "picture_b": "It is raining with dark grey clouds"
      },
      {
        "id": 4,
        "picture_a": "A brown rabbit is hopping near the burrow",
        "picture_b": "A red fox is peeking out of the burrow"
      },
      {
        "id": 5,
        "picture_a": "The jeep parked by the gate is green",
        "picture_b": "The jeep parked by the gate is red"
      }
    ]
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Liam's Desert Safari",
      "person": "Liam",
      "fields": [
        {
          "id": "location",
          "cue_prompt": "Where / go",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where did Liam go on his safari?",
            "Where is Liam's safari?",
            "Where did Liam go?"
          ],
          "nova_reply": "Liam went to the Red Dune Desert in the north."
        },
        {
          "id": "departure_time",
          "cue_prompt": "What time / start",
          "cue_word": "what time",
          "is_missing": true,
          "acceptable_questions": [
            "What time did the safari start?",
            "What time does it start?",
            "When did the tour begin?"
          ],
          "nova_reply": "His desert safari started at half past seven in the morning."
        },
        {
          "id": "transport",
          "cue_prompt": "How / travel",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How did Liam travel across the desert?",
            "How did he travel?",
            "What transport did he use?"
          ],
          "nova_reply": "He travelled in a strong four-wheel-drive safari jeep."
        },
        {
          "id": "animal_seen",
          "cue_prompt": "What animal / see",
          "cue_word": "what animal",
          "is_missing": true,
          "acceptable_questions": [
            "What animal did Liam see?",
            "Which animals did he see in the desert?",
            "What did he see?"
          ],
          "nova_reply": "He saw three desert foxes with big ears and two camels."
        },
        {
          "id": "weather",
          "cue_prompt": "What / weather like",
          "cue_word": "weather",
          "is_missing": true,
          "acceptable_questions": [
            "What was the weather like?",
            "What was the weather like on the safari?",
            "Was it sunny?"
          ],
          "nova_reply": "It was extremely hot and dry with bright sunshine."
        }
      ]
    },
    "table_b": {
      "title": "Chloe's Rainforest Tour",
      "person": "Chloe",
      "fields": [
        {
          "id": "destination",
          "cue_prompt": "Where / go",
          "cue_word": "where",
          "value": "Emerald Rainforest Reserve",
          "nova_question": "Where did Chloe go on her wildlife tour?",
          "acceptable_answers": [
            "She went to Emerald Rainforest Reserve.",
            "Chloe went to Emerald Rainforest Reserve.",
            "To Emerald Rainforest Reserve."
          ]
        },
        {
          "id": "ticket_cost",
          "cue_prompt": "How much / ticket",
          "cue_word": "how much",
          "value": "12 pounds",
          "nova_question": "How much did Chloe's tour ticket cost?",
          "acceptable_answers": [
            "Her ticket cost 12 pounds.",
            "It was twelve pounds.",
            "12 pounds."
          ]
        },
        {
          "id": "activity",
          "cue_prompt": "What / do",
          "cue_word": "what do",
          "value": "Walked on canopy treetop bridges",
          "nova_question": "What activity did Chloe do in the rainforest?",
          "acceptable_answers": [
            "She walked on canopy treetop bridges.",
            "Chloe walked on treetop bridges.",
            "Walking on canopy bridges."
          ]
        },
        {
          "id": "equipment",
          "cue_prompt": "What / bring",
          "cue_word": "what bring",
          "value": "A raincoat and binoculars",
          "nova_question": "What equipment did Chloe bring with her?",
          "acceptable_answers": [
            "She brought a raincoat and binoculars.",
            "Chloe took a raincoat and binoculars.",
            "A raincoat and binoculars."
          ]
        },
        {
          "id": "duration",
          "cue_prompt": "How long / tour",
          "cue_word": "how long",
          "value": "Four hours",
          "nova_question": "How long did the rainforest tour last?",
          "acceptable_answers": [
            "The tour lasted four hours.",
            "It took four hours.",
            "Four hours."
          ]
        }
      ]
    }
  },
  "picture_story": {
    "part": 3,
    "title": "The Clever Monkey and the Leopard",
    "instructions": "Look at the 5 pictures. They show a story about a monkey in the forest. Tell the story to Nova.",
    "examiner_intro": "These pictures tell a story called 'The Clever Monkey and the Leopard'. Look at picture 1 first. A little monkey is eating sweet figs in a tall tree. A spotted leopard is watching from below. Now you tell the story.",
    "frames": [
      {
        "frame_id": 1,
        "title": "Eating in the Tree",
        "narration_prompt": "The monkey sits high on a green branch eating ripe fruit while a leopard sneaks below.",
        "cue_keywords": [
          "monkey",
          "figs",
          "leopard",
          "branch",
          "hungry"
        ]
      },
      {
        "frame_id": 2,
        "title": "The Leopard Climbs",
        "narration_prompt": "The leopard uses its sharp claws to climb up the rough tree trunk towards the monkey.",
        "cue_keywords": [
          "climb",
          "sharp claws",
          "trunk",
          "creeping",
          "frightened"
        ]
      },
      {
        "frame_id": 3,
        "title": "The Big Jump",
        "narration_prompt": "The agile monkey leaps safely across to a thinner branch that the heavy leopard cannot walk on.",
        "cue_keywords": [
          "jump",
          "agile",
          "thin branch",
          "heavy",
          "safe"
        ]
      },
      {
        "frame_id": 4,
        "title": "The Branch Bends",
        "narration_prompt": "The heavy leopard steps onto the weak branch, but it bends and snaps under its weight.",
        "cue_keywords": [
          "bends",
          "snaps",
          "weight",
          "slip",
          "fall"
        ]
      },
      {
        "frame_id": 5,
        "title": "Safe and Chattering",
        "narration_prompt": "The leopard lands harmlessly into soft river mud, while the clever monkey chatters happily high above.",
        "cue_keywords": [
          "mud",
          "splash",
          "chatter",
          "clever",
          "happy"
        ]
      }
    ]
  },
  "personal_questions": {
    "part": 4,
    "instructions": "Answer Nova's questions about animals, wildlife, and outdoor places.",
    "questions": [
      {
        "id": 1,
        "topic": "Favourite wild animal",
        "question": "What is your favourite wild animal, and why do you like it?",
        "follow_up": "Can that animal run fast or climb trees?"
      },
      {
        "id": 2,
        "topic": "Visiting nature parks",
        "question": "Have you ever visited a wildlife park or a zoo with your family?",
        "follow_up": "What was the most exciting animal you saw there?"
      },
      {
        "id": 3,
        "topic": "Animal habitats",
        "question": "Would you prefer to explore a deep rainforest or a sandy desert?",
        "follow_up": "What warm clothes or equipment would you pack?"
      },
      {
        "id": 4,
        "topic": "Looking after animals",
        "question": "Why is it important to protect wild animals and their natural habitats?",
        "follow_up": "What can children do to help birds and animals in their gardens?"
      }
    ]
  }
};

export default speakingHubData;
