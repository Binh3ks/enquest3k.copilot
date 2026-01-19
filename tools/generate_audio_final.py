import os
import re
import json
import sys
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

# --- ENGQUEST3K AUDIO GENERATION SCRIPT (v2, Updated JAN 15, 2026) ---
# 
# Purpose: Generate TTS audio for all stations while cleaning text before TTS
# 
# Key Features:
#   - Removes ** bold markers before TTS (prevents reading asterisks)
#   - Removes ___ blanks before TTS (prevents reading "underscore" 3x)
#   - Correct file naming: read_explore_main.mp3, explore_main.mp3, mindmap_stem_#.mp3, etc.
#   - Google TTS as primary, OpenAI as fallback
#   - Both Advanced and Easy modes
# 
# Usage: python3 tools/generate_audio_final.py <week_number>
# Example: python3 tools/generate_audio_final.py 2
# 
# Next Step: Run `node tools/update_mindmap_audio_urls.js <week_number>` to auto-fill mindmap audio URLs
#

# --- CONFIGURATION ---

# Load environment variables from .env file
load_dotenv()

# Get API keys from environment
GOOGLE_API_KEY = os.getenv("GOOGLE_TTS_API_KEY") or os.getenv("VITE_GOOGLE_TTS_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") or os.getenv("VITE_OPENAI_API_KEY")

# --- SETUP ---

def setup_clients():
    """Initializes and returns all available TTS clients."""
    clients = {}
    # For Google, we just check the key. The client is created per-call.
    if GOOGLE_API_KEY:
        clients['google'] = True
        print("✅ Google TTS credentials found.")
    else:
        print("⚠️ Google TTS credentials (GOOGLE_TTS_API_KEY) not found. Cannot proceed.")
        raise ValueError("Google TTS credentials are required.")

    # For OpenAI, we create a persistent client.
    # if OPENAI_API_KEY:
    #     clients['openai'] = OpenAI(api_key=OPENAI_API_KEY)
    #     print("✅ OpenAI TTS client initialized.")
    # else:
    #     print("⚠️ OpenAI TTS credentials (OPENAI_API_KEY) not found. Fallback may not be available.")
    
    if not clients:
        raise ValueError("No TTS credentials found for Google.")
        
    return clients

# --- TTS Engine Logic ---

def get_google_tts(text, voice_name, output_path):
    """Generates audio using Google TTS REST API with API key."""
    import requests
    
    url = f"https://texttospeech.googleapis.com/v1/text:synthesize?key={GOOGLE_API_KEY}"
    
    payload = {
        "input": {"text": text},
        "voice": {
            "languageCode": "en-US",
            "name": voice_name
        },
        "audioConfig": {
            "audioEncoding": "MP3"
        }
    }
    
    response = requests.post(url, json=payload)
    response.raise_for_status()
    
    audio_content = response.json()["audioContent"]
    import base64
    audio_data = base64.b64decode(audio_content)
    
    with open(output_path, "wb") as out:
        out.write(audio_data)

def get_openai_tts(client, text, voice_name, output_path):
    """Generates audio using OpenAI TTS and saves it."""
    response = client.audio.speech.create(
        model="tts-1",
        voice=voice_name, # e.g., "nova", "alloy"
        input=text
    )
    response.stream_to_file(output_path)

# --- Path and Config Loading ---

def get_project_paths(week, mode):
    """Returns a dictionary of important project paths."""
    root_dir = Path(__file__).parent.parent.resolve()
    week_id_str = f"week_{str(week).zfill(2)}"
    
    data_dir_name = "weeks" if mode == "advanced" else "weeks_easy"
    audio_dir_name = f"week{week}" if mode == "advanced" else f"week{week}_easy"

    return {
        "root": root_dir,
        "data": root_dir / "src" / "data" / data_dir_name / week_id_str,
        "audio": root_dir / "public" / "audio" / audio_dir_name,
    }

def load_voice_config(index_file_path):
    """Loads voice configuration from the week's index.js file."""
    default_config = {
        "narration": "en-US-Neural2-D",
        "vocabulary": "en-US-Neural2-F",
        "dictation": "en-US-Neural2-F",
        "questions": "en-US-Neural2-D",
        "mindmap": "en-US-Neural2-D",
        "openai_voice": "nova" # Default voice for OpenAI
    }
    if not index_file_path.exists():
        print("⚠️  index.js not found, using default voice config.")
        return default_config

    try:
        content = index_file_path.read_text(encoding="utf-8")
        # Use regex to find the voiceConfig object
        match = re.search(r"voiceConfig\s*:\s*({[\s\S]*?})", content)
        if not match:
            print("⚠️  voiceConfig not found in index.js, using default.")
            return default_config

        # This is a simplified and fragile parser. It's good enough for this specific structure.
        config_str = match.group(1)
        # Remove JS comments
        config_str = re.sub(r"//.*", "", config_str)
        # Convert to valid JSON
        config_str = re.sub(r"(\w+)\s*:", r'"\1":', config_str) # Add quotes to keys
        config_str = config_str.replace("'", '"') # Replace single quotes
        config_str = re.sub(r",\s*([}\]])", r"\1", config_str) # Remove trailing commas

        parsed_config = json.loads(config_str)
        # Merge with defaults to ensure all keys are present
        return {**default_config, **parsed_config}

    except Exception as e:
        print(f"⚠️  Error parsing voiceConfig, using default. Error: {e}")
        return default_config

# --- Task Scanning Logic ---

def scan_for_tasks(data_path, voice_config):
    """Scans all .js files in the data path and creates a list of TTS tasks."""
    tasks = []
    if not data_path.exists():
        print(f"❌ Data directory not found: {data_path}")
        return []

    print(f"🔍 Scanning files in: {data_path}")

    # --- Define extraction rules for each station ---
    
    # Vocab Station (new_words / word_power)
    def extract_vocab(content, file_path):
        base_name = file_path.stem
        voice = voice_config.get("vocabulary", "en-US-Neural2-F")
        
        # word_power.js uses different naming convention
        if base_name == "word_power":
            vocab_objects = re.findall(r'{\s*id:.*?}', content, re.DOTALL)
            for obj_text in vocab_objects:
                word_match = re.search(r'word\s*:\s*["\'](.* ?)["\']', obj_text)
                def_match = re.search(r'definition_en\s*:\s*["\'](.* ?)["\']', obj_text)
                ex_match = re.search(r'example\s*:\s*["\'](.* ?)["\']', obj_text)
                model_match = re.search(r'model_sentence\s*:\s*["\'](.* ?)["\']', obj_text)
                coll_match = re.search(r'collocation\s*:\s*["\'](.* ?)["\']', obj_text)
                
                if word_match:
                    word = word_match.group(1)
                    word_clean = word.lower().replace(' ', '_').replace('?', '')
                    
                    tasks.append({"text": word, "voice": voice, "filename": f"wordpower_{word_clean}.mp3", "station": base_name})
                    if def_match:
                        tasks.append({"text": def_match.group(1), "voice": voice, "filename": f"wordpower_def_{word_clean}.mp3", "station": base_name})
                    if ex_match:
                        tasks.append({"text": ex_match.group(1), "voice": voice, "filename": f"wordpower_ex_{word_clean}.mp3", "station": base_name})
                    if model_match:
                        tasks.append({"text": model_match.group(1), "voice": voice, "filename": f"wordpower_model_{word_clean}.mp3", "station": base_name})
                    if coll_match:
                        tasks.append({"text": coll_match.group(1), "voice": voice, "filename": f"wordpower_coll_{word_clean}.mp3", "station": base_name})
            return
        
        # The vocab file is a JS module exporting an array of objects.
        # We can use regex to extract the objects.
        vocab_objects = re.findall(r'{\s*id:.*?}', content, re.DOTALL)

        for obj_text in vocab_objects:
            word_match = re.search(r'word\s*:\s*["\'](.* ?)["\']', obj_text)
            def_match = re.search(r'definition_en\s*:\s*["\'](.* ?)["\']', obj_text)
            ex_match = re.search(r'example\s*:\s*["\'](.* ?)["\']', obj_text)
            coll_match = re.search(r'collocation\s*:\s*["\'](.* ?)["\']', obj_text)

            if word_match:
                word = word_match.group(1)
                word_clean = word.lower().replace(' ', '_').replace('?', '')
                
                tasks.append({"text": word, "voice": voice, "filename": f"vocab_{word_clean}.mp3", "station": base_name})
                if def_match:
                    tasks.append({"text": def_match.group(1), "voice": voice, "filename": f"vocab_def_{word_clean}.mp3", "station": base_name})
                if ex_match:
                    tasks.append({"text": ex_match.group(1), "voice": voice, "filename": f"vocab_ex_{word_clean}.mp3", "station": base_name})
                if coll_match:
                    tasks.append({"text": coll_match.group(1), "voice": voice, "filename": f"vocab_coll_{word_clean}.mp3", "station": base_name})


    # Read Explore Station
    # **Critical**: Clean text before TTS to remove bold markers and blanks
    def extract_read_explore(content, file_path):
        voice = voice_config.get("narration", "en-US-Neural2-D")
        match = re.search(r'content_en\s*:\s*[`"\']([\s\S]*?)[`"\']', content)
        if match:
            # Remove ** bold markers and <...> HTML tags before TTS
            text = match.group(1)
            text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)  # Remove ** markers
            text = re.sub(r"<.*?>", "", text)  # Remove HTML tags
            text = text.replace('\n', ' ').strip()
            # Correct filename based on file type:
            # read.js -> read_explore_main.mp3 (NOT read_main.mp3)
            # explore.js -> explore_main.mp3 (NOT explore_explore_main.mp3)
            if file_path.stem == "read":
                filename = "read_explore_main.mp3"
            else:  # explore.js
                filename = "explore_main.mp3"
            tasks.append({"text": text, "voice": voice, "filename": filename, "station": "read_explore"})

    # Dictation Station
    def extract_dictation(content, file_path):
        voice = voice_config.get("dictation", "en-US-Neural2-F")
        matches = re.findall(r'text\s*:\s*["\'](.*?)["\']', content)
        for i, text in enumerate(matches):
            tasks.append({"text": text, "voice": voice, "filename": f"dictation_{i+1}.mp3", "station": "dictation"})

    # Ask AI & Logic Lab Stations
    def extract_questions(content, file_path):
        voice = voice_config.get("questions", "en-US-Neural2-D")
        station_name = file_path.stem
        
        # Ask AI uses different structure: {answer: [...]} array
        if station_name == "ask_ai":
            # Extract all prompts with their answers
            prompts = re.findall(r'{[\s\S]*?}(?=\s*,|\s*\])', content)
            for i, prompt_text in enumerate(prompts):
                # Extract answer array from this prompt
                answer_match = re.search(r'answer\s*:\s*\[([\s\S]*?)\]', prompt_text)
                if answer_match:
                    # Get first answer from array
                    answers = re.findall(r'["\'](.* ?)["\']', answer_match.group(1))
                    if answers:
                        text = answers[0]
                        tasks.append({"text": text, "voice": voice, "filename": f"{station_name}_{i+1}.mp3", "station": station_name})
        else:
            # Logic lab uses question_en/question/prompt fields
            matches = re.findall(r'(?:question_en|question|prompt)\s*:\s*["\'](.*?)["\']', content)
            for i, text in enumerate(matches):
                tasks.append({"text": text, "voice": voice, "filename": f"{station_name}_{i+1}.mp3", "station": station_name})

    # Shadowing Station
    def extract_shadowing(content, file_path):
        voice = voice_config.get("narration", "en-US-Neural2-D")
        matches = re.findall(r'text\s*:\s*["\'](.*?)["\']', content)
        full_script = []
        for i, text in enumerate(matches):
            full_script.append(text)
            tasks.append({"text": text, "voice": voice, "filename": f"shadowing_{i+1}.mp3", "station": "shadowing"})
        if full_script:
            tasks.append({"text": " ".join(full_script), "voice": voice, "filename": "shadowing_full.mp3", "station": "shadowing"})
            
    # Mindmap Station
    # **Critical**: Remove ___ blanks AND audio URLs before TTS
    def extract_mindmap(content, file_path):
        voice = voice_config.get("mindmap", "en-US-Neural2-D")
        
        # Extract centerStems - only "text" field, not "audio"
        center_stems_match = re.search(r'centerStems\s*:\s*\[([\s\S]*?)\]', content)
        if center_stems_match:
            # Match objects like: { text: "I am ___.", audio: "/audio/..." }
            # Only capture the text value, not audio path
            stem_objects = re.findall(r'{\s*text:\s*["\']([^"\']+)["\']', center_stems_match.group(1))
            for i, text in enumerate(stem_objects):
                # Remove ___ blanks from text before TTS
                # e.g., "This is my ___." -> "This is my."
                clean_text = text.replace("___", "").strip()
                # Remove any trailing periods after blank removal
                clean_text = re.sub(r'\.\s*$', '', clean_text).strip()
                if clean_text:  # Only add if text remains
                    clean_text = clean_text + "."  # Add back single period
                tasks.append({"text": clean_text, "voice": voice, "filename": f"mindmap_stem_{i+1}.mp3", "station": "mindmap"})
        
        # branchLabels: Extract only "text" field from objects
        branch_labels_match = re.search(r'branchLabels\s*:\s*{([\s\S]*?)}\s*}', content)
        if branch_labels_match:
            # Find all arrays in branchLabels
            branch_arrays = re.findall(r'\[([\s\S]*?)\]', branch_labels_match.group(1))
            branch_index = 1
            for array_content in branch_arrays:
                # Extract only text field: { text: "tall", audio: "..." } -> "tall"
                branches = re.findall(r'{\s*text:\s*["\']([^"\']+)["\']', array_content)
                for text in branches:
                    # Clean any remaining markdown or special chars
                    clean_text = text.strip()
                    tasks.append({"text": clean_text, "voice": voice, "filename": f"mindmap_branch_{branch_index}.mp3", "station": "mindmap"})
                    branch_index += 1


    # --- Map filenames to extraction functions ---
    station_scanners = {
        "vocab.js": extract_vocab,
        "word_power.js": extract_vocab,
        "read.js": extract_read_explore,
        "explore.js": extract_read_explore,
        "dictation.js": extract_dictation,
        "ask_ai.js": extract_questions,
        "logic.js": extract_questions,
        "shadowing.js": extract_shadowing,
        "mindmap.js": extract_mindmap,
    }

    for js_file in data_path.glob("*.js"):
        if js_file.name in station_scanners:
            print(f"  -> Processing {js_file.name}")
            content = js_file.read_text(encoding="utf-8")
            station_scanners[js_file.name](content, js_file)

    return tasks


def run_generation_for_mode(week, mode, clients):
    """Runs the full audio generation process for a single mode."""
    print(f"\n{'='*15} RUNNING FOR MODE: {mode.upper()} {'='*15}")
    
    paths = get_project_paths(week, mode)
    paths["audio"].mkdir(parents=True, exist_ok=True)

    voice_config = load_voice_config(paths["data"] / "index.js")
    print(f"🎤 Voice config loaded. Primary engine: Google, Fallback: OpenAI.")

    tasks = scan_for_tasks(paths["data"], voice_config)
    if not tasks:
        print(f"🤷 No tasks found for {mode} mode. Skipping.")
        return

    print(f"📝 Found {len(tasks)} audio tasks to process.")

    total_tasks = len(tasks)
    generated_count = 0
    skipped_count = 0
    fallback_count = 0

    for i, task in enumerate(tasks):
        output_path = paths["audio"] / task["filename"]
        progress = f"[{i+1}/{total_tasks}]"

        if output_path.exists():
            skipped_count += 1
            continue

        try:
            # --- Primary Engine: Google TTS ---
            if 'google' in clients:
                print(f"  {progress} Generating with Google: {task['filename']}...")
                get_google_tts(task["text"], task["voice"], output_path)
                generated_count += 1
                continue # Success, move to next task
            
            # --- Fallback Engine: OpenAI TTS ---
            if 'openai' in clients:
                print(f"  {progress} ⚠️ Google unavailable. Falling back to OpenAI for {task['filename']}...")
                openai_voice = voice_config.get("openai_voice", "nova")
                get_openai_tts(clients['openai'], task["text"], openai_voice, output_path)
                generated_count += 1
                fallback_count += 1
                continue # Success, move to next task

            print(f"  {progress} ❌ No available TTS engine for {task['filename']}.")

        except Exception as e_google:
            # --- Fallback on Google Failure ---
            if 'openai' in clients:
                print(f"    - Google failed: {e_google}. Retrying with OpenAI...")
                try:
                    openai_voice = voice_config.get("openai_voice", "nova")
                    get_openai_tts(clients['openai'], task["text"], openai_voice, output_path)
                    generated_count += 1
                    fallback_count += 1
                except Exception as e_openai:
                    print(f"    - ❌ OpenAI fallback also failed: {e_openai}")
            else:
                print(f"    - ❌ Google failed and no OpenAI fallback is available: {e_google}")

    print("\n--- Mode Generation Complete ---")
    print(f"✅ Generated: {generated_count} files")
    print(f"↪️  Used Fallback (OpenAI): {fallback_count} times")
    print(f"⏭️  Skipped: {skipped_count} files (already exist)")
    print(f"Total: {total_tasks} tasks")
    print(f"Output directory: {paths['audio']}")
    print("-" * (42 + len(mode)))


def validate_audio_urls(week, mode):
    """Kiểm tra mọi câu/từ cần audio trong tuần/mode đều có audio_url. Báo lỗi chi tiết nếu thiếu."""
    import glob
    import json
    from pathlib import Path
    
    errors = []
    data_dir = Path(__file__).parent.parent / 'src/data/weeks' / f'week_{str(week).zfill(2)}' if mode == 'advanced' else Path(__file__).parent.parent / 'src/data/weeks_easy' / f'week_{str(week).zfill(2)}'
    
    # Kiểm tra shadowing
    shadowing_path = data_dir / 'shadowing.js'
    if shadowing_path.exists():
        content = shadowing_path.read_text(encoding='utf-8')
        import re
        matches = re.findall(r'audio_url\s*:\s*["\"](.*?)["\"]', content)
        if not matches or len(matches) == 0:
            errors.append(f"[shadowing.js] Không có audio_url cho bất kỳ câu nào.")
        else:
            for idx, m in enumerate(matches):
                if not m or m == 'null':
                    errors.append(f"[shadowing.js] Câu số {idx+1} thiếu audio_url.")
    # Có thể mở rộng kiểm tra cho các station khác tương tự
    # ...existing code...
    return errors

# --- MAIN SCRIPT ---

def main():
    """Main function to generate audio files."""
    # --- Simplified Argument Handling ---
    if len(sys.argv) != 2:
        print("❌ Incorrect usage.")
        print("✅ Correct usage: python3 tools/generate_audio_final.py <week_number>")
        print("   Example: python3 tools/generate_audio_final.py 2")
        sys.exit(1)

    try:
        week = int(sys.argv[1])
    except ValueError:
        print(f"❌ Invalid week number: '{sys.argv[1]}'. Please provide a number.")
        sys.exit(1)

    print(f"🔥 Starting audio generation for Week {week}.")
    print(f"   (Primary: Google TTS, Fallback: OpenAI TTS)")

    try:
        clients = setup_clients()
        modes_to_run = ["advanced", "easy"]

        # Kiểm tra dữ liệu trước khi tạo audio
        for mode in modes_to_run:
            errors = validate_audio_urls(week, mode)
            if errors:
                print(f"❌ DỮ LIỆU {mode.upper()} TUẦN {week} KHÔNG HỢP LỆ!")
                for err in errors:
                    print("  -", err)
                print("⛔️ Dừng script. Hãy bổ sung audio_url cho tất cả các câu/từ cần audio trước khi tạo file!")
                return

        for mode in modes_to_run:
            run_generation_for_mode(week, mode, clients)

        print("\n🎉🎉 All modes processed successfully! 🎉🎉")

    except ValueError as e:
        print(f"❌ SETUP ERROR: {e}")
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()
