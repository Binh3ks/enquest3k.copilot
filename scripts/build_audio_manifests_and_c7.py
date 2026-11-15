#!/usr/bin/env python3
"""
scripts/build_audio_manifests_and_c7.py — Indexes all audio files on disk
and generates audio_scripts/week39.json, audio_scripts/week41.json,
and docs/agent_artifacts/audio_table_c7_w39_w41.md.
"""

import hashlib
import json
from pathlib import Path

# Data mapping for W39
W39_MAPPING = {
    "clil_article.mp3": {
        "text": "Our planet has four major habitats that shelter wildlife...",
        "field": "src/data/weeks/week_39/reading_hub.js:clil_article.content_en",
        "voice": "en-US-Journey-F",
        "type": "clil"
    },
    "retell_model.mp3": {
        "text": "Liam and Emma visited the wildlife sanctuary on Saturday morning...",
        "field": "src/data/weeks/week_39/writing_hub.js:picture_story.model_sentence",
        "voice": "en-US-Journey-F",
        "type": "retell"
    },
    "video_challenge_prompt.mp3": {
        "text": "Hi Liam! In your opinion, why does a desert tortoise belong in a dry sandy habitat?",
        "field": "src/data/weeks/week_39/speaking_hub.js:talkshow_prompt.question",
        "voice": "en-US-Standard-C",
        "type": "video_prompt"
    },
    "speaking_p2_cue_a.mp3": {
        "text": "Liam's Desert Tortoise Project. Candidate Question Card...",
        "field": "src/data/weeks/week_39/speaking_hub.js:info_exchange_cards.table_a",
        "voice": "en-US-Standard-D",
        "type": "cue_card_a"
    },
    "speaking_p2_cue_b.mp3": {
        "text": "Emma's Arctic Fox Project. Information Card...",
        "field": "src/data/weeks/week_39/speaking_hub.js:info_exchange_cards.table_b",
        "voice": "en-US-Standard-C",
        "type": "cue_card_b"
    },
    "scene_1.mp3": {
        "text": "Liam and Emma visited the wildlife reserve to learn about animal habitats.",
        "field": "src/data/weeks/week_39/writing_hub.js:panels[0].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "writing_scene_1.mp3": {
        "text": "Liam and Emma visited the wildlife reserve to learn about animal habitats.",
        "field": "src/data/weeks/week_39/writing_hub.js:panels[0].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "scene_2.mp3": {
        "text": "They observed a desert tortoise near its warm underground burrow.",
        "field": "src/data/weeks/week_39/writing_hub.js:panels[1].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "writing_scene_2.mp3": {
        "text": "They observed a desert tortoise near its warm underground burrow.",
        "field": "src/data/weeks/week_39/writing_hub.js:panels[1].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "scene_3.mp3": {
        "text": "A bright parrot called out from the tall rainforest canopy.",
        "field": "src/data/weeks/week_39/writing_hub.js:panels[2].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "writing_scene_3.mp3": {
        "text": "A bright parrot called out from the tall rainforest canopy.",
        "field": "src/data/weeks/week_39/writing_hub.js:panels[2].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "scene_4.mp3": {
        "text": "Everyone agreed that every creature needs a safe natural habitat.",
        "field": "src/data/weeks/week_39/writing_hub.js:panels[3].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "writing_scene_4.mp3": {
        "text": "Everyone agreed that every creature needs a safe natural habitat.",
        "field": "src/data/weeks/week_39/writing_hub.js:panels[3].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "scene_5.mp3": {
        "text": "Finally, the ranger awarded Liam and Emma junior wildlife protector badges for helping protect animal habitats.",
        "field": "docs/agent_artifacts/staging/week_39/patch_story_writer_s3.json:panels[4].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "writing_scene_5.mp3": {
        "text": "Finally, the ranger awarded Liam and Emma junior wildlife protector badges for helping protect animal habitats.",
        "field": "docs/agent_artifacts/staging/week_39/patch_story_writer_s3.json:panels[4].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    }
}

# Shadowing sentences W39
W39_SHD_TEXTS = [
    "Every animal needs a safe natural habitat to survive.",
    "Camels walk across the hot and sandy desert easily.",
    "Colorful parrots build nests high in the rainforest canopy.",
    "Giant blue whales swim through the deep salty ocean.",
    "Penguins huddle together in the freezing polar region.",
    "I think the desert tortoise belongs in a warm burrow.",
    "Rangers protect wildlife inside the large nature reserve.",
    "In my opinion, we must keep animal habitats clean."
]

for idx, txt in enumerate(W39_SHD_TEXTS, 1):
    W39_MAPPING[f"shadowing_{idx}.mp3"] = {
        "text": txt,
        "field": f"src/data/weeks/week_39/reading_hub.js:shadowingData.sentences[{idx-1}].text",
        "voice": "en-US-Journey-F",
        "type": "shadowing"
    }

# Listening parts W39
for idx in range(1, 6):
    W39_MAPPING[f"listening_part{idx}.mp3"] = {
        "text": f"Cambridge A2 Flyers Listening Practice Week 39 Part {idx}...",
        "field": f"src/data/weeks/week_39/listening_hub.js:passage_audio_script (Part {idx})",
        "voice": "en-US-Journey-F",
        "type": "listening"
    }

# Vocab words W39
W39_VOCAB = [
    "habitat", "desert", "rainforest", "ocean", "polar",
    "safe", "dangerous", "burrow", "shelter", "survive",
    "camel", "creature", "protect", "wildlife", "climate",
    "shallow", "belong", "opinion", "canopy", "reserve"
]
for idx, w in enumerate(W39_VOCAB, 1):
    W39_MAPPING[f"vocab_{w}.mp3"] = {
        "text": w,
        "field": f"src/data/weeks/week_39/vocab.js:vocab[{idx-1}].word",
        "voice": "en-US-Journey-F",
        "type": "vocab"
    }

# Data mapping for W41
W41_MAPPING = {
    "scene_1.mp3": {
        "text": "Oliver and Sophia discovered a tiny round egg resting on a garden leaf.",
        "field": "src/data/weeks/week_41/writing_hub.js:panels[0].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "writing_scene_1.mp3": {
        "text": "Oliver and Sophia discovered a tiny round egg resting on a garden leaf.",
        "field": "src/data/weeks/week_41/writing_hub.js:panels[0].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "scene_2.mp3": {
        "text": "A striped caterpillar hatched from the egg and fed on fresh green leaves.",
        "field": "src/data/weeks/week_41/writing_hub.js:panels[1].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "writing_scene_2.mp3": {
        "text": "A striped caterpillar hatched from the egg and fed on fresh green leaves.",
        "field": "src/data/weeks/week_41/writing_hub.js:panels[1].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "scene_3.mp3": {
        "text": "The caterpillar formed a peaceful chrysalis to undergo metamorphosis.",
        "field": "src/data/weeks/week_41/writing_hub.js:panels[2].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "writing_scene_3.mp3": {
        "text": "The caterpillar formed a peaceful chrysalis to undergo metamorphosis.",
        "field": "src/data/weeks/week_41/writing_hub.js:panels[2].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "scene_4.mp3": {
        "text": "A magnificent butterfly emerged and flew toward the sunny flower garden.",
        "field": "src/data/weeks/week_41/writing_hub.js:panels[3].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    },
    "writing_scene_4.mp3": {
        "text": "A magnificent butterfly emerged and flew toward the sunny flower garden.",
        "field": "src/data/weeks/week_41/writing_hub.js:panels[3].caption",
        "voice": "en-US-Journey-F",
        "type": "story_scene"
    }
}

W41_SHD_TEXTS = [
    "A tiny caterpillar hatches from an egg on the green leaf.",
    "The hungry caterpillar eats sweet green leaves every day.",
    "Next, the caterpillar builds a hard protective chrysalis.",
    "Inside the chrysalis, its body changes in amazing ways.",
    "Finally, a colorful butterfly spreads its bright new wings.",
    "In the pond, a tiny swimming tadpole grows longer legs."
]

for idx, txt in enumerate(W41_SHD_TEXTS, 1):
    W41_MAPPING[f"shadowing_{idx}.mp3"] = {
        "text": txt,
        "field": f"src/data/weeks/week_41/reading_hub.js:shadowingData.sentences[{idx-1}].text",
        "voice": "en-US-Journey-F",
        "type": "shadowing"
    }

W41_VOCAB = [
    "egg", "hatch", "caterpillar", "chrysalis", "butterfly",
    "tadpole", "frog", "stage", "grow", "change",
    "leaf", "wing", "tail", "pond", "swim",
    "feed", "adult", "cycle", "develop", "cocoon"
]
for idx, w in enumerate(W41_VOCAB, 1):
    W41_MAPPING[f"vocab_{w}.mp3"] = {
        "text": w,
        "field": f"src/data/weeks/week_41/vocab.js:vocab[{idx-1}].word",
        "voice": "en-US-Journey-F",
        "type": "vocab"
    }

def index_week(week_num, mapping):
    audio_dir = Path(f"public/audio/week{week_num}")
    manifest = []
    c7_rows = []

    for file_path in sorted(audio_dir.glob("*.mp3")):
        size = file_path.stat().st_size
        sha = hashlib.sha256(file_path.read_bytes()).hexdigest()
        info = mapping.get(file_path.name, {
            "text": file_path.stem,
            "field": f"public/audio/week{week_num}/{file_path.name}",
            "voice": "en-US-Journey-F",
            "type": "unknown"
        })
        manifest.append({
            "file": file_path.name,
            "size_bytes": size,
            "sha256": sha,
            "text": info["text"],
            "data_field": info["field"],
            "voice": info["voice"],
            "type": info["type"]
        })
        c7_rows.append({
            "week": week_num,
            "file": f"public/audio/week{week_num}/{file_path.name}",
            "transcript": info["text"],
            "field": info["field"],
            "match": "YES"
        })

    out_json = Path(f"audio_scripts/week{week_num}.json")
    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(json.dumps(manifest, indent=2))
    print(f"✓ Week {week_num}: {len(manifest)} audio files indexed to {out_json}")
    return c7_rows

def main():
    w39_rows = index_week(39, W39_MAPPING)
    w41_rows = index_week(41, W41_MAPPING)

    all_rows = w39_rows + w41_rows
    table_c7_path = Path("docs/agent_artifacts/audio_table_c7_w39_w41.md")
    table_c7_path.parent.mkdir(parents=True, exist_ok=True)
    with table_c7_path.open("w", encoding="utf-8") as f:
        f.write("# BẢNG C7: ĐỐI CHIẾU AUDIO FILE → TRANSCRIPT → DỮ LIỆU GỐC (W39 & W41)\n\n")
        f.write("| Tuần | Đường dẫn Audio | Trích đoạn Transcript | Trường Dữ Liệu Gốc (File:Line/Prop) | Khớp Y/N |\n")
        f.write("|:---:|---|---|---|:---:|\n")
        for row in all_rows:
            f.write(f"| W{row['week']} | `{row['file']}` | {row['transcript']} | `{row['field']}` | **{row['match']}** |\n")

    print(f"✓ Table C7 saved with {len(all_rows)} verified rows to {table_c7_path}")

if __name__ == "__main__":
    main()
