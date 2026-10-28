#!/usr/bin/env python3
"""
Generate missing static MP3 audios for Week 34:
- scene_1.mp3, scene_2.mp3, scene_3.mp3, scene_4.mp3 (Scene Explorer D1)
- info_exchange_intro_p1.mp3, info_exchange_intro_p2.mp3 (Info Exchange Intros)
- info_exchange_q1.mp3, info_exchange_q2.mp3, info_exchange_q3.mp3, info_exchange_q4.mp3 (Examiner Questions)
"""

import asyncio
import os
import edge_tts

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public/audio/week34")
os.makedirs(OUT_DIR, exist_ok=True)

AUDIOS = [
    # Scene Explorer (Narrator - GuyNeural)
    {
        "file": "scene_1.mp3",
        "text": "On a warm afternoon, the mighty lion was sleeping peacefully under the trees.",
        "voice": "en-US-GuyNeural",
        "rate": "-4%"
    },
    {
        "file": "scene_2.mp3",
        "text": "While the lion was resting, a tiny mouse ran across the lion's big front paw.",
        "voice": "en-US-GuyNeural",
        "rate": "-4%"
    },
    {
        "file": "scene_3.mp3",
        "text": "The mouse begged for mercy and promised to help the lion one day if he let him go.",
        "voice": "en-US-GuyNeural",
        "rate": "-4%"
    },
    {
        "file": "scene_4.mp3",
        "text": "Later, hunters trapped the lion in a heavy net, and the brave mouse chewed the ropes to free him.",
        "voice": "en-US-GuyNeural",
        "rate": "-4%"
    },

    # Info Exchange Intros (Examiner Nova - AriaNeural)
    {
        "file": "info_exchange_intro_p1.mp3",
        "text": "I don't know anything about Leo the Lion, but you do. I'm going to ask you some questions.",
        "voice": "en-US-AriaNeural",
        "rate": "-4%"
    },
    {
        "file": "info_exchange_intro_p2.mp3",
        "text": "Now, you don't know anything about Milo the Mouse, so you ask me some questions.",
        "voice": "en-US-AriaNeural",
        "rate": "-4%"
    },

    # Info Exchange Examiner Questions (Examiner Nova - AriaNeural)
    {
        "file": "info_exchange_q1.mp3",
        "text": "Where does the mouse live?",
        "voice": "en-US-AriaNeural",
        "rate": "-4%"
    },
    {
        "file": "info_exchange_q2.mp3",
        "text": "What is the mouse's special skill?",
        "voice": "en-US-AriaNeural",
        "rate": "-4%"
    },
    {
        "file": "info_exchange_q3.mp3",
        "text": "Who is the mouse's best friend?",
        "voice": "en-US-AriaNeural",
        "rate": "-4%"
    },
    {
        "file": "info_exchange_q4.mp3",
        "text": "How did the mouse help the lion?",
        "voice": "en-US-AriaNeural",
        "rate": "-4%"
    }
]

async def generate_all():
    print(f"Generating {len(AUDIOS)} static audio files into {OUT_DIR}...")
    for item in AUDIOS:
        out_path = os.path.join(OUT_DIR, item["file"])
        communicate = edge_tts.Communicate(item["text"], item["voice"], rate=item["rate"])
        await communicate.save(out_path)
        size = os.path.getsize(out_path)
        print(f"  ✅ Generated {item['file']} ({size} bytes) [{item['voice']}]")
    print("Done!")

if __name__ == "__main__":
    asyncio.run(generate_all())
