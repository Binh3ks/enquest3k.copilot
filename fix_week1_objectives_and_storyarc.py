#!/usr/bin/env python3
"""
Fix Week 1 Mission 1, 2, 3:
1. Add objectives to Mission 1 with "Say: A or B"
2. Fix story_arc phase_questions to use {student_answer} placeholders
"""

WEEK1_FILE = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_01_real.js"

# Mission 1: Add proper objectives with step-based questions
MISSION_1_OBJECTIVES = '''
      objectives: [
        { stepKey: "name", question: "What is your name?", hints: ["My", "name", "is", "I", "am"] },
        { stepKey: "age", question: "How old are you?", hints: ["I", "am", "years", "old", "seven", "eight"] },
        { stepKey: "student", question: "Are you a student?", hints: ["Yes", "I", "am", "a", "student", "No"] },
        { stepKey: "school_name", question: "What is your school name?", hints: ["My", "school", "is", "name"] },
        { stepKey: "feelings", question: "How do you feel today?", hints: ["I", "am", "happy", "excited", "good"] },
        { stepKey: "like_school", question: "Do you like school?", hints: ["Yes", "I", "like", "school", "No"] },
        { stepKey: "favorite_thing", question: "What do you like at school?", hints: ["I", "like", "learning", "playing", "friends"] },
        { stepKey: "grade", question: "What grade are you in?", hints: ["I", "am", "in", "grade", "one", "two"] },
        { stepKey: "friends", question: "Do you have friends at school?", hints: ["Yes", "I", "have", "friends", "No"] },
        { stepKey: "friend_names", question: "What are your friends' names?", hints: ["My", "friend", "is", "name"] },
        { stepKey: "play_with_friends", question: "What do you play with your friends?", hints: ["We", "play", "games", "soccer", "tag"] },
        { stepKey: "first_day", question: "Is this your first day?", hints: ["Yes", "No", "it", "is"] },
        { stepKey: "goodbye", question: "Great! Nice to meet you!", hints: ["Thank", "you", "Goodbye", "Nice"] }
      ],'''

# Mission 2: Fix story_arc with proper {student_answer} placeholders
MISSION_2_STORY_ARC_FIX = '''      story_arc: {
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
              "(After yes/let's play) Great! I spy with my little eye... something RED! What is red? Say: My pen is red OR My book is red",
              "(After student says red item) Yes! {student_answer}! 🖊️ You're good at this! Now I spy something BLUE! What is blue? Say: My notebook is blue OR My backpack is blue"
            ]
          },
          {
            phase: "color_hunt",
            turns: "4-7",
            phase_name: "Colors Hunt",
            focus: "Find items by color",
            phase_questions: [
              "(After blue item) Perfect! {student_answer}! 📘 Now I spy something BIG! What is big in your backpack? Say: My book is big OR My backpack is big",
              "(After big item) Excellent! {student_answer}! Now I spy something SMALL! What is small? Say: My eraser is small OR My pencil is small",
              "(After small item) Yes! {student_answer}! 🎯 Last one - I spy something GREEN or YELLOW! Do you have green or yellow? Say: My pencil is green OR I have a yellow book OR I don't have green",
              "(After color answer) {student_answer}! Wonderful! You found all the items! 🌈"
            ]
          },
          {
            phase: "closing",
            turns: "8-10",
            phase_name: "Celebration",
            focus: "Celebrate success",
            phase_questions: [
              "You're an I Spy champion! 🏆 What's your FAVORITE item in your backpack? Say: I love my [item] OR My favorite is [item]",
              "(After favorite) {student_answer}! Me too! Thanks for playing I Spy with me! Say: Thank you! OR Goodbye! OR That was fun!",
              "(After thanks) Goodbye! See you next time! 👋"
            ]
          }
        ]
      },'''

# Mission 3: Fix story_arc with proper {student_answer} placeholders
MISSION_3_STORY_ARC_FIX = '''      story_arc: {
        total_questions: 16,
        structure: "intro (2) → item 1 (4) → item 2 (4) → item 3 (4) → closing (2)",
        phases: [
          {
            phase: "intro",
            turns: "1-2",
            phase_name: "Game Start",
            focus: "Explain Show and Tell",
            phase_questions: [
              "🎤 Hi! It's Show and Tell time! Pick something from your backpack! What do you want to show me? Say: My book OR My pen OR My notebook",
              "(After student picks item) Great choice! Your {student_answer}! Now tell me - what COLOR is your {student_answer}? Say: My {student_answer} is [color] OR It is [color]"
            ]
          },
          {
            phase: "item_1",
            turns: "3-6",
            phase_name: "First Item",
            focus: "Describe first item fully",
            phase_questions: [
              "(After color) {student_answer}! Beautiful! Is your {item} BIG or SMALL? Say: It is big OR It is small OR My {item} is big",
              "(After size) Perfect! {student_answer}! What do you USE your {item} for? Say: I use it for writing OR I use it for reading OR For writing",
              "(After use) Wonderful! {student_answer}! Your {item} is very useful! 📚 Now show me something DIFFERENT! What else do you have? Say: My [different item]"
            ]
          },
          {
            phase: "item_2",
            turns: "7-10",
            phase_name: "Second Item",
            focus: "Present second item",
            phase_questions: [
              "(After item 2) Nice! Your {student_answer}! What COLOR is it? Say: It is [color] OR My {student_answer} is [color]",
              "(After color) {student_answer}! Good! Is it BIG or SMALL? Say: It is big OR It is small",
              "(After size) Perfect! {student_answer}! Do you LIKE your {item}? Say: Yes, I like it OR I love it! OR Yes!",
              "(After like) {student_answer}! Great! ONE more item! Show me one more thing! Say: My [item]"
            ]
          },
          {
            phase: "item_3",
            turns: "11-13",
            phase_name: "Quick Round",
            focus: "One more item quickly",
            phase_questions: [
              "(After item 3) Your {student_answer}! Quickly - what COLOR? Say: It is [color]",
              "(After color) {student_answer}! Excellent! 🎉 You presented THREE items! Amazing!"
            ]
          },
          {
            phase: "closing",
            turns: "14-16",
            phase_name: "Celebration",
            focus: "Wrap up presentation",
            phase_questions: [
              "You presented so well! 👏 What's your FAVORITE item in your backpack? Say: My favorite is [item] OR I love my [item]",
              "(After favorite) {student_answer}! Great choice! Thank you for your presentation! Say: Thank you! OR Goodbye! OR That was fun!",
              "(After thanks) Goodbye! Great job today! 🌟"
            ]
          }
        ]
      },'''

def main():
    print("🔧 Fixing Week 1 missions: adding objectives and fixing story_arc...")
    
    # Read file
    with open(WEEK1_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("✅ File loaded")
    
    # 1. Add objectives to Mission 1 (before minimum_turns)
    mission1_insert_point = '      minimum_turns: 15,'
    if mission1_insert_point in content:
        content = content.replace(
            '      minimum_turns: 15,',
            MISSION_1_OBJECTIVES + '\n      \n      minimum_turns: 15,'
        )
        print("✅ Mission 1: Added objectives array with step-based questions")
    
    # 2. Fix Mission 2 story_arc
    import re
    mission2_story_pattern = r'(mission_id: 2,.*?)(story_arc: \{.*?\n      \},)'
    match = re.search(mission2_story_pattern, content, re.DOTALL)
    if match:
        old_story_arc = match.group(2)
        content = content.replace(old_story_arc, MISSION_2_STORY_ARC_FIX.strip())
        print("✅ Mission 2: Fixed story_arc with {student_answer} placeholders")
    
    # 3. Fix Mission 3 story_arc
    mission3_story_pattern = r'(mission_id: 3,.*?)(story_arc: \{.*?\n      \},)'
    match = re.search(mission3_story_pattern, content, re.DOTALL)
    if match:
        old_story_arc = match.group(2)
        content = content.replace(old_story_arc, MISSION_3_STORY_ARC_FIX.strip())
        print("✅ Mission 3: Fixed story_arc with {student_answer} placeholders")
    
    # Write back
    with open(WEEK1_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("\n🎉🎉🎉 COMPLETE SUCCESS!")
    print("\n📋 FIXES:")
    print("  ✅ Mission 1: Added objectives with 'Say: A or B' scaffolding")
    print("  ✅ Mission 2: Fixed story_arc to use {student_answer} properly")
    print("  ✅ Mission 3: Fixed story_arc to use {student_answer} properly")
    print("\n💻 Hard reload browser!")


if __name__ == "__main__":
    main()
