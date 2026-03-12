#!/usr/bin/env python3
import re
import json

# Advanced read.js content
advanced_text = """Today, our class is visiting the park. The park is very busy! Many people are enjoying their day. A young boy is running after his dog near the trees. The dog is barking happily. An elderly man is sitting on a wooden bench. He is reading his newspaper peacefully. Two women are jogging around the path. They are wearing bright sports clothes and listening to music. Near the fountain, some children are playing with water. They are laughing and splashing each other. A family is having a picnic on the grass. They are eating sandwiches and drinking juice. The mother is spreading a blanket. The father is unpacking the food basket. A little girl is walking her puppy on a leash. The puppy is pulling her toward the flowers. Three teenagers are flying colorful kites in the open field. The kites are dancing in the wind beautifully. Some people are relaxing under the shade of big trees. They are enjoying the cool breeze. Everyone is having a wonderful time. The park is full of life and happiness. I am observing everything carefully for my homework. This is the best school trip ever!"""

# Easy read.js content
easy_text = """Today I am going to the park with my family. The park is busy and fun! I am walking with my mom. She is holding my hand. My dad is jogging ahead of us. He is wearing his blue shirt. I see a boy. He is running very fast! His dog is running too. An old man is sitting on a bench. He is reading a book. Near the fountain, some kids are playing. They are laughing and happy. I want to play too! My family is having a picnic now. We are eating yummy sandwiches. I am drinking apple juice. My sister is flying her red kite. It is going very high! The kite is beautiful. I am relaxing on the grass. The grass is soft and green. I see flowers everywhere. A girl is walking her small dog. The dog is cute! I am having so much fun. The park is my favorite place!"""

def extract_sentences(text):
    # Remove markdown bold markers
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    # Split by sentence endings
    sentences = re.split(r'(?<=[.!?])\s+', text)
    return [s.strip() for s in sentences if s.strip()]

advanced_sentences = extract_sentences(advanced_text)[:22]  # Use first 22
easy_sentences = extract_sentences(easy_text)[:17]  # Use first 17

print(f"Advanced: {len(advanced_sentences)} sentences")
print(f"Easy: {len(easy_sentences)} sentences")
print("\n=== ADVANCED SENTENCES ===")
for i, s in enumerate(advanced_sentences, 1):
    print(f"{i}. {s}")

print("\n=== EASY SENTENCES ===")
for i, s in enumerate(easy_sentences, 1):
    print(f"{i}. {s}")

# Now generate dictation.js files
def generate_dictation_js(sentences, mode="advanced"):
    lines = ["export default {"]
    lines.append('  title: "Dictation Practice",')
    
    if mode == "advanced":
        lines.append('  image_url: "/images/week15/dictation_cover_w15.jpg",')
        lines.append('  audio_url: "/audio/week15/dictation_main.mp3",')
    else:
        lines.append('  image_url: "/images/week15_easy/dictation_cover_w15.jpg",')
        lines.append('  audio_url: "/audio/week15_easy/dictation_main.mp3",')
    
    lines.append("  sentences: [")
    
    for i, sentence in enumerate(sentences, 1):
        lines.append("    {")
        lines.append(f"      id: {i},")
        lines.append(f'      text: "{sentence}",')
        if mode == "advanced":
            lines.append(f'      audio: "/audio/week15/dictation_s{i}.mp3"')
        else:
            lines.append(f'      audio: "/audio/week15_easy/dictation_s{i}.mp3"')
        lines.append("    }" + ("," if i < len(sentences) else ""))
    
    lines.append("  ]")
    lines.append("};")
    return "\n".join(lines)

# Generate shadowing.js files
def generate_shadowing_js(sentences, mode="advanced"):
    lines = ["export default {"]
    lines.append('  title: "Sentence Shadowing",')
    
    if mode == "advanced":
        lines.append('  image_url: "/images/week15/shadowing_cover_w15.jpg",')
        lines.append('  audio_url: "/audio/week15/shadowing_main.mp3",')
        lines.append('  audio_full: "/audio/week15/shadowing_full.mp3",')
    else:
        lines.append('  image_url: "/images/week15_easy/shadowing_cover_w15.jpg",')
        lines.append('  audio_url: "/audio/week15_easy/shadowing_main.mp3",')
        lines.append('  audio_full: "/audio/week15_easy/shadowing_full.mp3",')
    
    lines.append("  sentences: [")
    
    for i, sentence in enumerate(sentences, 1):
        lines.append("    {")
        lines.append(f"      id: {i},")
        lines.append(f'      text: "{sentence}",')
        if mode == "advanced":
            lines.append(f'      audio: "/audio/week15/shadowing_s{i}.mp3"')
        else:
            lines.append(f'      audio: "/audio/week15_easy/shadowing_s{i}.mp3"')
        lines.append("    }" + ("," if i < len(sentences) else ""))
    
    lines.append("  ]")
    lines.append("};")
    return "\n".join(lines)

# Write files
with open("week15_dictation_advanced.js", "w") as f:
    f.write(generate_dictation_js(advanced_sentences, "advanced"))

with open("week15_dictation_easy.js", "w") as f:
    f.write(generate_dictation_js(easy_sentences, "easy"))

with open("week15_shadowing_advanced.js", "w") as f:
    f.write(generate_shadowing_js(advanced_sentences, "advanced"))

with open("week15_shadowing_easy.js", "w") as f:
    f.write(generate_shadowing_js(easy_sentences, "easy"))

print("\n✅ Generated dictation and shadowing files!")
