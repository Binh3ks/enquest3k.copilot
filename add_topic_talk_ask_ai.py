#!/usr/bin/env python3
"""
Add topic_talk_prompt to all ask_ai.js files for weeks 1-29 (ADV + Easy)
Sources: writing.js prompts for weeks 8-29, manual for 1-7
"""
import re, os

PROMPTS_ADV = {
    1: "Tell me about what is in your school bag. What things do you have? What colour are they?",
    2: "Tell me about your family. Who is in your family? What does each person like to do?",
    3: "Tell me about someone in your family. What do they look like? Are they tall or short? What colour is their hair?",
    4: "Tell me about something you love doing. What do you like? Do you like reading, drawing, or playing? Why?",
    5: "Tell me about your home. What rooms does it have? What is in your favourite room?",
    6: "Tell me about your favourite place at home or at school. Where is it? What do you do there?",
    7: "Tell me about something special that belongs to you. What is it? Where do you keep it?",
    8: "Tell me about your classroom. What do you see around you? How many students are in your class?",
    9: "Tell me about a city you know. What sounds can you hear? What can you see on the streets?",
    10: "Tell me about a farm or animals you have seen. What animals were there? What did they do?",
    11: "Tell me about your favourite place to go on weekends. What do you do there? Who do you go with?",
    12: "Tell me about a special talent you have. What are you good at? How did you learn it?",
    13: "Tell me about your daily routine. What do you usually do from morning to night?",
    14: "Tell me about your favourite things — your room, toys, food, and activities. What do you like most?",
    15: "Tell me about what people are doing at a park right now. What activities can you see?",
    16: "Tell me about your favourite sport. What are the players doing? Why do you like it?",
    17: "Tell me about the weather today and what people are wearing. Do you like this kind of weather?",
    18: "Tell me about an interesting event happening in your neighbourhood. What is going on?",
    19: "Tell me about something you did when you were small. What happened? How do you feel about it now?",
    20: "Tell me about a place that looked different in the past. What did it look like before? How is it now?",
    21: "Tell me about what you did yesterday. What happened from morning to night?",
    22: "Tell me about something interesting that happened in the past week. What did you do or see?",
    23: "Tell me about a painting or drawing you like. What do you see in it? What colours are there?",
    24: "Tell me about a time in the past when you felt very happy or very sad. What happened?",
    25: "Tell me about how you do something step by step. What is the process? What happens first?",
    26: "Tell me about what you did last weekend from the beginning to the end. What happened?",
    27: "Tell me about a plant, garden, or living thing you have watched grow. What did you do? What changed?",
    28: "Tell me about a time when you worked slowly and steadily to finish something difficult. What happened in the end?",
    29: "Tell me about a trip or journey you have been on. Where did you go? How did you get there? What did you see or do?",
}

PROMPTS_EASY = {
    1: "Tell me about your school bag. What is inside? What colours do you see?",
    2: "Tell me about your family. Who is in your family? What do they like?",
    3: "Tell me about someone in your family. What do they look like? Are they tall or short?",
    4: "Tell me about something you like doing. Do you like playing, drawing, or singing? Why?",
    5: "Tell me about your home. What rooms are there? What is your favourite room?",
    6: "Tell me about your favourite place. Where is it? What do you do there?",
    7: "Tell me about something special you have. What is it? Where do you keep it?",
    8: "Tell me about your classroom. What do you see? How many children are there?",
    9: "Tell me about a city you know. What do you see? What sounds do you hear?",
    10: "Tell me about an animal you like. What does it look like? What does it eat?",
    11: "Tell me about your favourite place to visit. Where is it? What do you do there?",
    12: "Tell me about something you are good at. What is it? Who taught you?",
    13: "Tell me about your morning. What do you do first? What do you do next?",
    14: "Tell me about one thing you love. What is it? Why do you like it?",
    15: "Tell me about people at the park. What are they doing? Do you like the park?",
    16: "Tell me about a sport you like. What do you do? Who do you play with?",
    17: "Tell me about today's weather. Is it hot, cold, or rainy? What are you wearing?",
    18: "Tell me about something interesting in your neighbourhood. What is happening?",
    19: "Tell me about something you did when you were little. What happened?",
    20: "Tell me about an old place you know. What did it look like before? How is it now?",
    21: "Tell me about what you did yesterday. What happened? What did you eat?",
    22: "Tell me about something that happened this week. What did you do?",
    23: "Tell me about a drawing or painting you like. What do you see in it?",
    24: "Tell me about a time you felt happy or sad. What happened?",
    25: "Tell me about how to make your favourite snack. What do you need? What do you do first?",
    26: "Tell me about your last weekend. What did you do? Was it fun?",
    27: "Tell me about a plant or flower you have seen. What colour is it? Where did it grow?",
    28: "Tell me about a time you worked hard to finish something. What happened?",
    29: "Tell me about a trip or journey you have been on. Where did you go? How did you travel?",
}

def inject_prompt(filepath, prompt):
    if not os.path.exists(filepath):
        print(f"  SKIP (not found): {filepath}")
        return False
    with open(filepath, 'r') as f:
        content = f.read()
    if 'topic_talk_prompt' in content:
        print(f"  SKIP (already has): {filepath}")
        return False

    line_to_add = f'  topic_talk_prompt: "{prompt}",\n'

    # Try after `title:` line (weeks 27, 28, 29 have title)
    if re.search(r'  title: ["\']', content):
        new_content = re.sub(
            r'(  title: ["\'][^"\']+["\'],?\n)',
            r'\1' + line_to_add,
            content, count=1
        )
    elif content.startswith('export default {'):
        # Insert after opening brace on first line
        new_content = 'export default {\n' + line_to_add + content[len('export default {\n'):]
    else:
        print(f"  SKIP (unexpected format): {filepath}")
        return False

    with open(filepath, 'w') as f:
        f.write(new_content)
    print(f"  OK: {filepath}")
    return True

count = 0
for w in range(1, 30):
    wdir = f"week_{w:02d}"
    adv_path = os.path.join("src/data/weeks", wdir, "ask_ai.js")
    easy_path = os.path.join("src/data/weeks_easy", wdir, "ask_ai.js")

    if inject_prompt(adv_path, PROMPTS_ADV[w]):
        count += 1
    if inject_prompt(easy_path, PROMPTS_EASY[w]):
        count += 1

print(f"\nTotal updated: {count} files")
