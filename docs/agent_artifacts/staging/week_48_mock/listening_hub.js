/**
 * STAGED MOCK EXAM DELIVERABLE: Listening Paper (All 5 Parts / 25 Items)
 * Week: 48 | Level: A2 Flyers | Mode: FULL_MOCK
 * Cumulative Sourcing: Weeks 45, 46, 47, 48
 */

export const listeningHubData = {
  "week": 48,
  "theme": "Measuring Up (Length)",
  "cefr_level": "A2 Flyers",
  "paper": "Listening",
  "total_parts": 5,
  "total_items": 25,
  "time_allowed_minutes": 25,
  "listening_p1": {
    "part": 1,
    "instructions": "Listen and look. There is one example. Draw lines to match names to the correct people in the picture.",
    "audio_script": "Narrator: Part 1. Listen and look. There is one example.\nMan: Look at the Young Architects Design Studio! The children are building incredible models.\nWoman: Yes! Who is that man near the front chalkboard?\nMan: The man holding a big yellow wooden triangle? That is Michael, our architecture teacher.\nWoman: He is explaining how triangles make structures strong.\nNarrator: Can you see the line? This is an example. Now you listen and draw lines.\n\n[1]\nWoman: Who is that boy measuring a long wooden plank at the craft bench?\nMan: The boy with the striped jumper? That is George. He is using a thirty-centimeter ruler to check the wood.\nWoman: He is measuring very carefully!\n\n[2]\nWoman: Look at that girl painting neat shapes on a square ceramic tile.\nMan: That is Holly. She is painting a repeating sequence of blue diamonds and red circles.\nWoman: Her tile pattern looks beautiful!\n\n[3]\nWoman: Who is the boy stacking wooden rectangular blocks into a tall tower?\nMan: Ah, that is William. He wants his tower to be one meter high.\nWoman: Goodness, that will be taller than the table!\n\n[4]\nWoman: Is that Penny sitting by the window counting shiny green beads?\nMan: Yes, Penny is counting twenty glass beads to complete her circular mosaic design.\nWoman: She has organized them in neat groups of five.\n\n[5]\nWoman: And who is the boy cutting cardboard triangles with silver safety scissors?\nMan: That is Oscar. He is building a cardboard pyramid for his history project.\nWoman: His cardboard edges look perfectly straight.",
    "items": [
      {
        "id": 1,
        "name": "George",
        "location": "boy in striped jumper measuring wooden plank with yellow ruler",
        "x": 240,
        "y": 350,
        "target": "boy measuring plank with yellow ruler"
      },
      {
        "id": 2,
        "name": "Holly",
        "location": "girl painting repeating pattern of shapes on ceramic tile",
        "x": 490,
        "y": 410,
        "target": "girl painting pattern on ceramic tile"
      },
      {
        "id": 3,
        "name": "William",
        "location": "boy stacking rectangular blocks into tall tower on table",
        "x": 740,
        "y": 260,
        "target": "boy stacking blocks into tall tower"
      },
      {
        "id": 4,
        "name": "Penny",
        "location": "girl by window counting green glass beads for mosaic",
        "x": 380,
        "y": 190,
        "target": "girl counting green beads by window"
      },
      {
        "id": 5,
        "name": "Oscar",
        "location": "boy cutting cardboard triangles with silver scissors",
        "x": 860,
        "y": 430,
        "target": "boy cutting cardboard triangles with scissors"
      }
    ],
    "example": {
      "name": "Michael",
      "location": "teacher holding big yellow wooden triangle near board",
      "x": 130,
      "y": 270
    }
  },
  "listening_p2": {
    "part": 2,
    "instructions": "Listen and look. There is one example. Read the notes and fill in the missing information.",
    "audio_script": "Narrator: Part 2. Listen and look. There is one example.\nWoman: Hello! Welcome to the Young Builders and Geometry Club. May I take your details?\nGirl: Yes please, Miss Evans. My first name is Penny.\nWoman: Penny, lovely. Let me record your name.\nNarrator: Can you see the answer? Now you listen and write.\n\n[1]\nWoman: What is your surname, Penny?\nGirl: It is Davis. That is spelled D-A-V-I-S.\nWoman: Thank you, Penny Davis.\n\n[2]\nWoman: How old are you now?\nGirl: I was ten in August, so I am ten years old.\nWoman: Ten years old, excellent.\n\n[3]\nWoman: Which day would you like to come to our geometry workshop?\nGirl: I have swimming on Mondays, so Wednesday afternoon is best for me.\nWoman: Wednesday from four to five fifteen. That is booked.\n\n[4]\nWoman: Which classroom will our club meet in?\nGirl: Is it in Room 5B in the math wing?\nWoman: Yes, Room 5B on the first floor.\n\n[5]\nWoman: What tool must every builder bring to their first project class?\nGirl: Should I bring glue?\nWoman: No, the school provides glue. You must bring a wooden ruler for measuring.\nGirl: Wonderful! I have a sturdy thirty-centimeter wooden ruler in my pencil case.",
    "example": {
      "field": "First name",
      "value": "Penny"
    },
    "items": [
      {
        "id": 1,
        "question": "Surname",
        "prompt": "Surname:",
        "answer": "Davis"
      },
      {
        "id": 2,
        "question": "Age",
        "prompt": "Age:",
        "answer": "10"
      },
      {
        "id": 3,
        "question": "Day of workshop",
        "prompt": "Day of workshop:",
        "answer": "Wednesday"
      },
      {
        "id": 4,
        "question": "Meeting room",
        "prompt": "Meeting room:",
        "answer": "5B"
      },
      {
        "id": 5,
        "question": "Must bring",
        "prompt": "Must bring:",
        "answer": "wooden ruler"
      }
    ]
  },
  "listening_p3": {
    "part": 3,
    "instructions": "Listen and look. Which model did each student construct? Match each student to their model letter (A–H).",
    "audio_script": "Narrator: Part 3. Listen and look. There is one example. Which model did each student construct?\nGirl: Look at all the architectural models on the display table, Mr Foster!\nMan: Our young builders did fantastic work, Holly. George constructed that long suspension bridge using wooden sticks.\nGirl: That bridge has strong rectangular towers! That is letter E.\nNarrator: Can you see the letter E? Now you listen and write a letter in each box.\n\n[1]\nMan: Holly, tell me about your project on the display board.\nGirl: I made a ceramic mosaic star tile with a repeating pattern of triangles and diamonds.\nMan: That colourful star tile is letter B. The symmetry is very impressive!\n\n[2]\nGirl: What about William's model?\nMan: William designed a tall clock tower out of stacked cardboard rectangles and a circular dial.\nGirl: Ah, letter G! It stands eighty centimeters tall on the table.\n\n[3]\nGirl: Look at this neat triangular pyramid tent!\nMan: Penny built that geometric pyramid tent using balsa wood and canvas fabric.\nGirl: That is letter A. It looks like a real explorer camp!\n\n[4]\nMan: Did you see Oscar's clever logic project?\nGirl: The circular maze puzzle where you guide a marble through repeating paths?\nMan: Exactly! That round maze is letter D.\n\n[5]\nGirl: And who constructed that lovely green greenhouse with a triangular glass roof?\nMan: Chloe designed that model greenhouse. She measured every window frame to fit perfectly.\nGirl: Letter F! It looks so bright and sunny.",
    "example": {
      "day_or_item": "George",
      "letter": "E"
    },
    "letters_available": [
      {
        "letter": "A",
        "description": "Geometric pyramid tent with balsa wood frame"
      },
      {
        "letter": "B",
        "description": "Ceramic mosaic star tile with repeating patterns"
      },
      {
        "letter": "C",
        "description": "Cardboard checkerboard with twenty squares"
      },
      {
        "letter": "D",
        "description": "Circular maze puzzle with marble path"
      },
      {
        "letter": "E",
        "description": "Rectangular suspension bridge with towers"
      },
      {
        "letter": "F",
        "description": "Greenhouse model with triangular glass roof"
      },
      {
        "letter": "G",
        "description": "Tall clock tower model with round dial"
      },
      {
        "letter": "H",
        "description": "Cardboard windmill with rotating sails"
      }
    ],
    "items": [
      {
        "id": 1,
        "day_or_item": "Holly",
        "letter": "B",
        "target": "mosaic star tile with repeating patterns"
      },
      {
        "id": 2,
        "day_or_item": "William",
        "letter": "G",
        "target": "tall clock tower model"
      },
      {
        "id": 3,
        "day_or_item": "Penny",
        "letter": "A",
        "target": "geometric pyramid tent"
      },
      {
        "id": 4,
        "day_or_item": "Oscar",
        "letter": "D",
        "target": "circular maze puzzle"
      },
      {
        "id": 5,
        "day_or_item": "Chloe",
        "letter": "F",
        "target": "greenhouse with triangular roof"
      }
    ]
  },
  "listening_p4": {
    "part": 4,
    "instructions": "Listen and look. There is one example. Choose the correct answer (A, B, or C).",
    "audio_script": "Narrator: Part 4. Listen and look. There is one example. What material did William use for his tower walls?\nWoman: Did you make your model tower from plastic bricks, William?\nBoy: No, we used sturdy balsa wood blocks because they are easy to measure and glue.\nWoman: Balsa wood is great for model building.\nNarrator: Can you see the tick? Now you listen and choose the correct answer.\n\n[1] Which shape did William use for the tower base?\nWoman: What shape was the foundation of your tower, William?\nBoy: We tried a circle first, but a wide square block kept the tower much more stable!\nWoman: Yes, a square base provides four strong corners.\n\n[2] How tall was the winning tower?\nWoman: How high was the winning tower in the competition?\nBoy: One team reached fifty centimeters, but George and William's tower measured seventy centimeters tall!\nWoman: Seventy centimeters! That is really tall for wooden blocks.\n\n[3] What colour was George's favorite wooden ruler?\nWoman: Which ruler did George use to measure the planks?\nBoy: He brought a bright yellow wooden ruler marked with millimeters and centimeters.\nWoman: That must have made measuring very clear.\n\n[4] How many blocks did Holly stack in her tower?\nWoman: Did Holly build a high tower as well?\nBoy: Yes! She counted exactly thirty wooden blocks in her sequence before it stopped.\nWoman: Thirty blocks is a lot of counting!\n\n[5] What prize did the best builders receive?\nWoman: Did the teachers give out prizes at the end of the competition?\nBoy: Yes, each winner received a shiny golden ruler award to keep.\nWoman: What a wonderful prize for young architects!",
    "example": {
      "question": "What material did William use for his tower walls?",
      "answer": "C"
    },
    "items": [
      {
        "id": 1,
        "question": "Which shape did William use for the tower base?",
        "options": [
          {
            "letter": "A",
            "text": "A round circular disc"
          },
          {
            "letter": "B",
            "text": "A wide square block"
          },
          {
            "letter": "C",
            "text": "A narrow triangle"
          }
        ],
        "answer": "B"
      },
      {
        "id": 2,
        "question": "How tall was the winning tower?",
        "options": [
          {
            "letter": "A",
            "text": "Fifty centimeters tall"
          },
          {
            "letter": "B",
            "text": "Sixty centimeters tall"
          },
          {
            "letter": "C",
            "text": "Seventy centimeters tall"
          }
        ],
        "answer": "C"
      },
      {
        "id": 3,
        "question": "What colour was George's favorite wooden ruler?",
        "options": [
          {
            "letter": "A",
            "text": "Bright yellow"
          },
          {
            "letter": "B",
            "text": "Dark green"
          },
          {
            "letter": "C",
            "text": "Silver grey"
          }
        ],
        "answer": "A"
      },
      {
        "id": 4,
        "question": "How many blocks did Holly stack in her tower?",
        "options": [
          {
            "letter": "A",
            "text": "Twenty blocks"
          },
          {
            "letter": "B",
            "text": "Thirty blocks"
          },
          {
            "letter": "C",
            "text": "Forty blocks"
          }
        ],
        "answer": "B"
      },
      {
        "id": 5,
        "question": "What prize did the best builders receive?",
        "options": [
          {
            "letter": "A",
            "text": "A golden ruler award"
          },
          {
            "letter": "B",
            "text": "A box of coloured paints"
          },
          {
            "letter": "C",
            "text": "A certificate and book"
          }
        ],
        "answer": "A"
      }
    ]
  },
  "listening_p5": {
    "part": 5,
    "instructions": "Listen and look. There is one example. Colour and write.",
    "audio_script": "Narrator: Part 5. Listen and look. There is one example.\nMan: Welcome to the Architecture and Craft Studio, Holly. Would you like to colour our workshop diagram?\nGirl: Yes please! May I colour the large model triangle sitting on the teacher's desk?\nMan: Sure! Colour that large triangle yellow.\nGirl: Yellow triangle on the desk. Doing that now.\nNarrator: Can you see the yellow triangle? This is an example. Now you listen and colour and write.\n\n[1]\nMan: Now look under the main craft table. There is a rectangular storage box for wooden blocks.\nGirl: I see it. It has two small handles.\nMan: Can you colour that rectangular storage box blue?\nGirl: Blue for the storage box, done!\n\n[2]\nMan: Look on the back wall near the calendar. There is a round clock shaped like a circle.\nGirl: Yes, showing half past two.\nMan: Please colour that round circle clock red.\nGirl: Red makes it stand out clearly.\n\n[3]\nMan: Now I would like you to write a word on the picture.\nGirl: Where should I write it?\nMan: Look at the long cloth banner hanging above the chalkboard.\nGirl: Above the chalkboard? Yes, I see the banner.\nMan: Write the word DESIGN on it in neat capital letters.\nGirl: D-E-S-I-G-N. I have written DESIGN on the banner.\nMan: Perfect!\n\n[4]\nGirl: What should I colour next?\nMan: Look beside the tall bookshelf. There is a long wooden meter ruler leaning against the wall.\nGirl: It is very tall!\nMan: Colour that tall wooden ruler brown.\nGirl: Brown like natural oak wood. Finished.\n\n[5]\nMan: For the last part, look at the square mosaic tile resting on the small display easel.\nGirl: The tile with the star pattern?\nMan: Yes! Colour that square mosaic tile purple.\nGirl: Purple looks brilliant! The whole architecture diagram is complete now.",
    "example": {
      "instruction": "Colour the large model triangle on the teacher's desk yellow",
      "target": "large triangle on teacher's desk",
      "colour": "yellow"
    },
    "items": [
      {
        "id": 1,
        "type": "colour",
        "target": "rectangular storage box under the table",
        "colour": "blue",
        "action": "Colour the rectangular storage box under the table blue"
      },
      {
        "id": 2,
        "type": "colour",
        "target": "round circle clock on the wall",
        "colour": "red",
        "action": "Colour the round circle clock on the wall red"
      },
      {
        "id": 3,
        "type": "write",
        "target": "banner hanging above the chalkboard",
        "text": "DESIGN",
        "action": "Write the word 'DESIGN' on the banner above the chalkboard"
      },
      {
        "id": 4,
        "type": "colour",
        "target": "tall wooden ruler leaning against bookshelf",
        "colour": "brown",
        "action": "Colour the tall wooden ruler leaning against the bookshelf brown"
      },
      {
        "id": 5,
        "type": "colour",
        "target": "square mosaic tile on the display easel",
        "colour": "purple",
        "action": "Colour the square mosaic tile on the display easel purple"
      }
    ]
  }
};

export default listeningHubData;
