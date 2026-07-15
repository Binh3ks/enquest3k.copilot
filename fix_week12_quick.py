#!/usr/bin/env python3
"""Quick fix Week 12 vocab and daily_watch files"""

import os

# Week 12: The Talent Show - 10 vocab words
VOCAB_WORDS = [
    {
        "word": "sing",
        "pronunciation": "/sɪŋ/",
        "vi": "hát",
        "en": "to make music with your voice",
        "ex_adv": "Sarah can sing beautifully on stage.",
        "ex_easy": "I can sing happy songs at home.",
        "collocation": "sing a song"
    },
    {
        "word": "dance",
        "pronunciation": "/dæns/",
        "vi": "nhảy, khiêu vũ",
        "en": "to move your body to music",
        "ex_adv": "Tom can dance with energy and style.",
        "ex_easy": "I can dance with my friends.",
        "collocation": "dance to music"
    },
    {
        "word": "run",
        "pronunciation": "/rʌn/",
        "vi": "chạy",
        "en": "to move fast on your feet",
        "ex_adv": "Mike can run faster than anyone in his grade.",
        "ex_easy": "I can run fast in the park.",
        "collocation": "run fast"
    },
    {
        "word": "jump",
        "pronunciation": "/dʒʌmp/",
        "vi": "nhảy lên",
        "en": "to push yourself off the ground",
        "ex_adv": "Lily can jump very high with a rope.",
        "ex_easy": "I can jump high too!",
        "collocation": "jump high"
    },
    {
        "word": "climb",
        "pronunciation": "/klaɪm/",
        "vi": "trèo, leo",
        "en": "to go up using your hands and feet",
        "ex_adv": "Ben can climb the wall quickly during practice.",
        "ex_easy": "I can climb trees in the garden.",
        "collocation": "climb a tree"
    },
    {
        "word": "ride",
        "pronunciation": "/raɪd/",
        "vi": "đi xe, cưỡi",
        "en": "to sit on something and move",
        "ex_adv": "Emma can ride her bike without training wheels.",
        "ex_easy": "I can ride my bike every day.",
        "collocation": "ride a bike"
    },
    {
        "word": "draw",
        "pronunciation": "/drɔː/",
        "vi": "vẽ",
        "en": "to make pictures with a pencil or pen",
        "ex_adv": "Jack can draw amazing animals and people.",
        "ex_easy": "I can draw my family and pets.",
        "collocation": "draw a picture"
    },
    {
        "word": "swim",
        "pronunciation": "/swɪm/",
        "vi": "bơi",
        "en": "to move through water",
        "ex_adv": "Mia can swim across the pool easily.",
        "ex_easy": "I can swim in the summer.",
        "collocation": "swim in the pool"
    },
    {
        "word": "cook",
        "pronunciation": "/kʊk/",
        "vi": "nấu ăn",
        "en": "to make food hot and ready to eat",
        "ex_adv": "Anna can cook simple meals for her family.",
        "ex_easy": "I can cook with my mom.",
        "collocation": "cook dinner"
    },
    {
        "word": "play",
        "pronunciation": "/pleɪ/",
        "vi": "chơi",
        "en": "to do something for fun",
        "ex_adv": "Leo can play the guitar at the talent show.",
        "ex_easy": "I can play games with friends.",
        "collocation": "play games"
    }
]

# Daily Watch videos about talents/abilities
DAILY_WATCH_VIDEOS = [
    {
        "id": 1,
        "title": "What Can You Do? Song for Kids | Simple Questions",
        "videoId": "boeGBLw1p0I",
        "duration": "02:01",
        "sim_duration": 121,
        "thumb": "https://img.youtube.com/vi/boeGBLw1p0I/mqdefault.jpg"
    },
    {
        "id": 2,
        "title": "I Can, I Can't Song | Action Verbs for Kids",
        "videoId": "vQ-aCzGb59s",
        "duration": "02:28",
        "sim_duration": 148,
        "thumb": "https://img.youtube.com/vi/vQ-aCzGb59s/mqdefault.jpg"
    },
    {
        "id": 3,
        "title": "Can You Swim? | Super Simple Songs",
        "videoId": "SwJr5bieKWE",
        "duration": "02:15",
        "sim_duration": 135,
        "thumb": "https://img.youtube.com/vi/SwJr5bieKWE/mqdefault.jpg"
    },
    {
        "id": 4,
        "title": "The Talent Show - Kids Stories Read Aloud",
        "videoId": "5CvABpPv7WY",
        "duration": "04:32",
        "sim_duration": 272,
        "thumb": "https://img.youtube.com/vi/5CvABpPv7WY/mqdefault.jpg"
    },
    {
        "id": 5,
        "title": "Amazing Kids Talent Show Performances",
        "videoId": "9VW8xqx2mFE",
        "duration": "06:18",
        "sim_duration": 378,
        "thumb": "https://img.youtube.com/vi/9VW8xqx2mFE/mqdefault.jpg"
    }
]

def create_vocab_file(mode):
    """Generate vocab.js for Advanced or Easy mode"""
    mode_dir = "weeks" if mode == "advanced" else "weeks_easy"
    folder = f"week12" if mode == "advanced" else "week12_easy"
    
    lines = ["export default {", "  vocab: ["]
    
    for i, word in enumerate(VOCAB_WORDS):
        example = word["ex_adv"] if mode == "advanced" else word["ex_easy"]
        
        item = "    {\n"
        item += f'      id: {i+1},\n'
        item += f'      word: "{word["word"]}",\n'
        item += f'      pronunciation: "{word["pronunciation"]}",\n'
        item += f'      definition_vi: "{word["vi"]}",\n'
        item += f'      definition_en: "{word["en"]}",\n'
        item += f'      example: "{example}",\n'
        item += f'      collocation: "{word["collocation"]}",\n'
        item += f'      image_url: "/images/{folder}/{word["word"]}.jpg",\n'
        item += f'      audio_word: "/audio/{folder}/vocab_{word["word"]}.mp3",\n'
        item += f'      audio_definition: "/audio/{folder}/vocab_def_{word["word"]}.mp3",\n'
        item += f'      audio_example: "/audio/{folder}/vocab_ex_{word["word"]}.mp3",\n'
        item += f'      audio_collocation: "/audio/{folder}/vocab_coll_{word["word"]}.mp3"\n'
        item += "    }"
        
        if i < len(VOCAB_WORDS) - 1:
            item += ","
        
        lines.append(item)
    
    lines.append("  ]")
    lines.append("};")
    
    content = "\n".join(lines)
    
    filepath = f"src/data/{mode_dir}/week_12/vocab.js"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created {filepath}")

def create_daily_watch_file(mode):
    """Generate daily_watch.js for Advanced or Easy mode"""
    mode_dir = "weeks" if mode == "advanced" else "weeks_easy"
    
    lines = ["export default {", "  videos: ["]
    
    for i, video in enumerate(DAILY_WATCH_VIDEOS):
        item = "    { "
        item += f'id: {video["id"]}, '
        item += f'title: "{video["title"]}", '
        item += f'videoId: "{video["videoId"]}", '
        item += f'duration: "{video["duration"]}", '
        item += f'sim_duration: {video["sim_duration"]}, '
        item += f'thumb: "{video["thumb"]}"'
        item += " }"
        
        if i < len(DAILY_WATCH_VIDEOS) - 1:
            item += ","
        
        lines.append(item)
    
    lines.append("  ],")
    lines.append('  bonus_games: [{title: "Game", url: "#", description: "Review"}]')
    lines.append("};")
    
    content = "\n".join(lines)
    
    filepath = f"src/data/{mode_dir}/week_12/daily_watch.js"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created {filepath}")

if __name__ == "__main__":
    print("🔧 Fixing Week 12 vocab and daily_watch files...\n")
    
    # Generate all 4 files
    create_vocab_file("advanced")
    create_vocab_file("easy")
    create_daily_watch_file("advanced")
    create_daily_watch_file("easy")
    
    print("\n✅ Done! Run validation again to check.")
