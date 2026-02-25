#!/usr/bin/env python3
"""
REDESIGN Week 1 Mission 2 & 3 with NEW game concepts for first week engagement
"""

WEEK1_FILE = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_01_real.js"

# Mission 2: I SPY Color & Size Game
MISSION_2_NEW = '''    {
      mission_id: 2,
      title: "I Spy Game",
      title_en: "I Spy Color & Size Game",
      title_vi: "Trò Chơi Tìm Đồ Vật",
      theme: "Interactive guessing game about school supplies",
      
      nova_greeting: "🔍 Let's play I Spy! I spy with my little eye... something RED! Can you find it?",
      default_hints: ["My", "pen", "is", "red"],
      
      mission_context: `This is Week 1 Mission 2 - I Spy Game (Color & Size Hunt).

🎮 GAME CONCEPT: Interactive "I Spy" game
Ms. Nova gives CLUES about color/size, student guesses the item!

GAME FLOW:
1. Nova says: "I spy something RED!" 
2. Student guesses: "My pen!" or "Pen!"
3. Nova celebrates and gives NEXT clue
4. Keep going through different colors/sizes

STRICT RULES:
✅ Use "I spy something [COLOR/SIZE]!"
✅ Give clear visual clues (color, size, shape)
✅ Celebrate each correct guess enthusiastically
✅ Move to NEXT item immediately after correct guess

FORBIDDEN:
❌ "Next photo" (no photos in this game!)
❌ "I see someone" (items, not people!)
❌ Asking same item twice

CORRECT FORMAT:
✅ "I spy something RED! What is red?"
✅ "I spy something BIG! What is big?"
✅ "I spy something SMALL and BLUE! What is it?"

HINT STRATEGY:
- Give color/size hints in suggested_hints
- Include item names: ["pen", "red", "My", "is"]
- Focus on visual descriptors

VOCABULARY: backpack, book, notebook, pen, pencil, eraser, red, blue, big, small
PATTERN: "My [item] is [color/size]"`,
      
      target_vocab: ["backpack", "book", "notebook", "pen", "pencil", "eraser", "red", "blue", "big", "small"],
      grammar_pattern: "My [item] is [color/size].",

      objectives: [
        {
          stepKey: "spy_red_item",
          category: "Color Hunt",
          question_variants: [
            {
              question: "I spy with my little eye... something RED! What is red in your backpack?",
              hints: ["My", "pen", "is", "red"]
            },
            {
              question: "I spy something RED! Can you find it?",
              hints: ["pen", "red", "My", "is"]
            }
          ],
          target_keywords: ["pen", "red"],
          ack_options: ["Yes! Red!", "Correct!", "You found it!"],
          recast_templates: [
            "Your pen is red! Great!",
            "Red pen! Perfect!"
          ],
          success_criteria: "Student identifies red item"
        },
        {
          stepKey: "spy_big_item",
          category: "Size Hunt",
          question_variants: [
            {
              question: "Now I spy something BIG! What is big?",
              hints: ["My", "book", "is", "big"]
            },
            {
              question: "I spy something BIG and HEAVY! What is it?",
              hints: ["book", "big", "My"]
            }
          ],
          target_keywords: ["book", "big"],
          ack_options: ["Yes! Big!", "Correct!", "You found it!"],
          recast_templates: [
            "Your book is big! Great!",
            "Big book! Perfect!"
          ],
          success_criteria: "Student identifies big item"
        },
        {
          stepKey: "spy_blue_item",
          category: "Color Hunt",
          question_variants: [
            {
              question: "Next! I spy something BLUE! What is blue?",
              hints: ["My", "notebook", "is", "blue"]
            },
            {
              question: "I spy something BLUE and SMALL! What is it?",
              hints: ["notebook", "blue", "small"]
            }
          ],
          target_keywords: ["notebook", "blue"],
          ack_options: ["Yes! Blue!", "Correct!", "You found it!"],
          recast_templates: [
            "Your notebook is blue! Great!",
            "Blue notebook! Perfect!"
          ],
          success_criteria: "Student identifies blue item"
        },
        {
          stepKey: "spy_small_item",
          category: "Size Hunt",
          question_variants: [
            {
              question: "Now I spy something SMALL! What is small?",
              hints: ["My", "eraser", "is", "small"]
            },
            {
              question: "I spy something tiny! Can you guess?",
              hints: ["eraser", "small", "pencil"]
            }
          ],
          target_keywords: ["eraser", "pencil", "small"],
          ack_options: ["Yes! Small!", "Correct!", "You found it!"],
          recast_templates: [
            "Your eraser is small! Great!",
            "Small eraser! Perfect!"
          ],
          success_criteria: "Student identifies small item"
        }
      ],

      story_character: {
        name: "Ms. Nova",
        personality: "playful, loves I Spy game, gives fun clues",
        backstory: "I love playing I Spy with school supplies! Let's find things by color and size!",
        speaking_style: "enthusiastic, uses 'I spy...' format, celebrates discoveries",
        facts: [
          "I love colorful things!",
          "I'm great at spotting details!",
          "Red is my favorite color!",
          "I spy games are the best!"
        ],
        special_rules: [
          "Always use 'I spy...' format",
          "Give color or size clues",
          "Celebrate each discovery",
          "Move to next item after correct guess"
        ]
      },
      
      opening_narrative: "🔍 Let's play I Spy! I spy with my little eye... something RED! What is red? Say: My pen is red OR My book is red",
      
      story_arc: {
        total_questions: 16,
        structure: "intro (3) → red items (4) → big items (4) → blue items (3) → closing (2)",
        phases: [
          {
            phase: "intro",
            turns: "1-3",
            phase_name: "Game Start",
            focus: "Explain I Spy game",
            phase_questions: [
              "🔍 Hi! Let's play I Spy! Do you know this game? I give clues, you guess! Say: Yes! OR Let's play!",
              "(After yes) Great! I spy with my little eye... something RED! What is red? Say: My pen is red",
              "(After pen) Yes! Your pen is red! 🖊️ You're good at this! Let's find more things!"
            ]
          },
          {
            phase: "color_hunt",
            turns: "4-11",
            phase_name: "Colors Hunt",
            focus: "Find items by color",
            phase_questions: [
              "(After red) Now I spy something BLUE! What is blue? Say: My notebook is blue",
              "(After blue) Perfect! Your notebook is blue! 📘 What else is blue? Say: My backpack OR My pencil",
              "(After item) Nice! Now I spy something GREEN or YELLOW! Do you have something green or yellow? Say: My pencil is green OR I have a yellow book",
              "(After color) Wonderful! You have many colors! 🌈 Now let's find by SIZE!"
            ]
          },
          {
            phase: "size_hunt",
            turns: "12-15",
            phase_name: "Size Hunt",
            focus: "Find items by size",
            phase_questions: [
              "Now I spy something BIG! What is big in your backpack? Say: My book is big",
              "(After big) Yes! Your book is big! 📖 Now I spy something SMALL! What is small? Say: My eraser is small",
              "(After small) Perfect! Your eraser is small! What else is small? Say: My pencil OR My pen",
              "(After small item) Amazing! You found everything! 🎉"
            ]
          },
          {
            phase: "closing",
            turns: "16-18",
            phase_name: "Celebration",
            focus: "Celebrate success",
            phase_questions: [
              "You're an I Spy champion! 🏆 What's your favorite item? Say: I love my [item]",
              "(After favorite) {student_answer}! Me too! Thanks for playing I Spy with me! Say: Thank you! OR Goodbye!",
              "(After thanks) Goodbye! See you next time! 👋"
            ]
          }
        ]
      },
      
      minimum_turns: 12,
      maximum_turns: 18
    }'''

# Mission 3: Show and Tell Game  
MISSION_3_NEW = '''    {
      mission_id: 3,
      title: "Show and Tell",
      title_en: "Show and Tell - Present Your Items",
      title_vi: "Thuyết Trình Đồ Dùng",
      theme: "Presentation game - student presents their school items",
      
      nova_greeting: "🎤 Time for Show and Tell! Pick one thing from your backpack and tell me about it!",
      default_hints: ["My", "book", "is", "big", "blue"],
      
      mission_context: `This is Week 1 Mission 3 - Show and Tell (Presentation Game).

🎮 GAME CONCEPT: Student PRESENTS their school items like Show and Tell
Different from Week 2 grammar game - this is about PRESENTING and DESCRIBING!

GAME FLOW:
1. Nova asks: "Pick something from your backpack!"
2. Student chooses: "My book!"
3. Nova asks: "Tell me about your book! What color is it?"
4. Student describes: "My book is blue!"
5. Nova asks follow-up: "What size? Big or small?"
6. Continue with DIFFERENT items

STRICT RULES:
✅ Student CHOOSES which item to present
✅ Ask about COLOR, SIZE, and USE
✅ Move to DIFFERENT item after 2-3 questions
✅ Encourage full sentences: "My book is big"

FORBIDDEN:
❌ Grammar correction (that's Week 2!)
❌ "My vs Your" errors (no error correction!)
❌ Asking about same item too long

CORRECT FORMAT:
✅ "Pick something from your backpack!"
✅ "Tell me about your [item]! What color is it?"
✅ "Wow! What else do you have? Show me another thing!"

QUESTION PATTERNS:
- "What color is your [item]?" 
- "Is it big or small?"
- "What do you use it for?"
- "Do you like your [item]?"

VOCABULARY: backpack, book, notebook, pen, pencil, eraser, ruler, big, small, red, blue, green
PATTERN: "My [item] is [color/size]. I use it for [purpose]."`,
      
      target_vocab: ["backpack", "book", "notebook", "pen", "pencil", "eraser", "ruler", "big", "small", "red", "blue"],
      grammar_pattern: "My [item] is [adjective]. I use it for...",

      objectives: [
        {
          stepKey: "present_first_item",
          category: "Item Presentation",
          question_variants: [
            {
              question: "Pick something from your backpack! What do you want to show me?",
              hints: ["My", "book", "pen", "notebook"]
            },
            {
              question: "Show and Tell time! What's in your backpack?",
              hints: ["I", "have", "a", "book"]
            }
          ],
          target_keywords: ["book", "pen", "notebook", "pencil"],
          ack_options: ["Great choice!", "Nice!", "I want to hear about it!"],
          recast_templates: [
            "Your {item}! Tell me about it!",
            "A {item}! Interesting!"
          ],
          success_criteria: "Student picks first item"
        },
        {
          stepKey: "describe_color",
          category: "Color Description",
          question_variants: [
            {
              question: "What color is your [item]?",
              hints: ["My", "book", "is", "blue", "red"]
            },
            {
              question: "Tell me the color! Is it red, blue, or green?",
              hints: ["It", "is", "blue"]
            }
          ],
          target_keywords: ["red", "blue", "green", "yellow"],
          ack_options: ["Beautiful!", "I love that color!", "Nice!"],
          recast_templates: [
            "Your {item} is {color}!",
            "{color}! Beautiful!"
          ],
          success_criteria: "Student describes color"
        },
        {
          stepKey: "describe_size",
          category: "Size Description",
          question_variants: [
            {
              question: "Is your [item] big or small?",
              hints: ["My", "book", "is", "big"]
            },
            {
              question: "What about the size? Big or small?",
              hints: ["It", "is", "big", "small"]
            }
          ],
          target_keywords: ["big", "small"],
          ack_options: ["I see!", "Good description!", "Perfect!"],
          recast_templates: [
            "Your {item} is {size}!",
            "{size}! Got it!"
          ],
          success_criteria: "Student describes size"
        },
        {
          stepKey: "present_second_item",
          category: "Item Presentation",
          question_variants: [
            {
              question: "Great! Show me another thing! What else is in your backpack?",
              hints: ["My", "pen", "pencil", "eraser"]
            },
            {
              question: "Pick something different! What else do you have?",
              hints: ["I", "have", "a", "pen"]
            }
          ],
          target_keywords: ["pen", "pencil", "eraser", "ruler"],
          ack_options: ["Another one!", "Show me!", "I'm listening!"],
          recast_templates: [
            "Your {item}! Tell me more!",
            "A {item}! Nice!"
          ],
          success_criteria: "Student picks second item"
        }
      ],

      story_character: {
        name: "Ms. Nova",
        personality: "encouraging teacher, loves presentations, asks follow-up questions",
        backstory: "I love Show and Tell! Everyone's items are interesting! Tell me everything!",
        speaking_style: "supportive, asks clarifying questions, encourages details",
        facts: [
          "I love hearing students present!",
          "Every item has a story!",
          "Colors make things interesting!",
          "Show and Tell is my favorite!"
        ],
        special_rules: [
          "Let student CHOOSE items",
          "Ask about color, size, use",
          "Encourage full sentences",
          "Move to different items after 2-3 questions"
        ]
      },
      
      opening_narrative: "🎤 It's Show and Tell time! Pick something from your backpack and tell me about it! What do you want to show? Say: My book OR My pen",
      
      story_arc: {
        total_questions: 16,
        structure: "intro (2) → item 1 (4) → item 2 (4) → item 3 (4) → closing (2)",
        phases: [
          {
            phase: "intro",
            turns: "1-2",
            phase_name: "Game Start",
            focus: "Explain Show and Tell",
            phase_questions: [
              "🎤 Hi! It's Show and Tell time! Pick something from your backpack! What do you want to show me? Say: My book OR My pen",
              "(After item) Great choice! Your {student_answer}! Let's learn about it!"
            ]
          },
          {
            phase: "item_1",
            turns: "3-7",
            phase_name: "First Item",
            focus: "Describe first item fully",
            phase_questions: [
              "What color is your {item}? Say: My {item} is [color]",
              "(After color) {student_answer}! Beautiful! Is it big or small? Say: It is big OR It is small",
              "(After size) Perfect! What do you use your {item} for? Say: I use it for writing OR I use it for reading",
              "(After use) Wonderful! Your {item} is very useful! 📚"
            ]
          },
          {
            phase: "item_2",
            turns: "8-12",
            phase_name: "Second Item",
            focus: "Present second item",
            phase_questions: [
              "Great! Show me something DIFFERENT! What else is in your backpack? Say: My [different item]",
              "(After item 2) Nice! Your {student_answer}! What color is it? Say: It is [color]",
              "(After color) {student_answer}! Is it big or small? Say: It is big OR It is small",
              "(After size) Perfect! Do you like your {item}? Say: Yes, I like it OR I love it!"
            ]
          },
          {
            phase: "item_3",
            turns: "13-15",
            phase_name: "Quick Round",
            focus: "One more item quickly",
            phase_questions: [
              "One more! Pick ONE more thing! Say: My [item]",
              "(After item 3) Your {student_answer}! Quickly - what color? Say: It is [color]",
              "(After color) {student_answer}! Excellent! 🎉"
            ]
          },
          {
            phase: "closing",
            turns: "16-18",
            phase_name: "Celebration",
            focus: "Wrap up presentation",
            phase_questions: [
              "You presented so well! 👏 What's your FAVORITE item in your backpack? Say: My favorite is [item]",
              "(After favorite) {student_answer}! Great choice! Thank you for your presentation! Say: Thank you! OR Goodbye!",
              "(After thanks) Goodbye! Great job today! 🌟"
            ]
          }
        ]
      },
      
      minimum_turns: 12,
      maximum_turns: 18
    }'''

def main():
    print("🎨 REDESIGNING Week 1 Mission 2 & 3 with NEW engaging games...")
    
    # Read file
    with open(WEEK1_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("✅ File loaded")
    
    # Find Mission 2 start and end
    import re
    mission2_pattern = r'(\s+{\s+mission_id: 2,.*?minimum_turns: \d+,\s+maximum_turns: \d+\s+})'
    mission3_pattern = r'(\s+{\s+mission_id: 3,.*?minimum_turns: \d+,\s+maximum_turns: \d+\s+})'
    
    # Replace Mission 2
    content = re.sub(mission2_pattern, MISSION_2_NEW, content, flags=re.DOTALL)
    print("✅ Mission 2: I SPY Color & Size Game")
    
    # Replace Mission 3
    content = re.sub(mission3_pattern, MISSION_3_NEW, content, flags=re.DOTALL)
    print("✅ Mission 3: Show and Tell Presentation Game")
    
    # Write back
    with open(WEEK1_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("\n🎉🎉🎉 COMPLETE REDESIGN SUCCESS!")
    print("\n📋 NEW WEEK 1 STRUCTURE:")
    print("  ✅ Mission 1: First Day at School (conversation)")
    print("  ✅ Mission 2: I SPY Game (interactive color/size hunt)")
    print("  ✅ Mission 3: Show and Tell (presentation game)")
    print("\n🎯 All missions now UNIQUE and engaging for Week 1!")
    print("💻 Hard reload browser!")


if __name__ == "__main__":
    main()
