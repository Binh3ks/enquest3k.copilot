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
        
        # word_power.js uses different naming convention - extract text content only
        if base_name == "word_power":
            # Match objects by looking for {word: or {phrase: patterns
            vocab_objects = re.findall(r'{\s*(?:word|phrase)\s*:.*?}', content, re.DOTALL)
            for obj_text in vocab_objects:
                # Support both 'phrase' (old) and 'word' (new Week 7+)
                phrase_match = re.search(r'(?:phrase|word)\s*:\s*["\']([^"\']*)["\']', obj_text)
                def_match = re.search(r'definition_en\s*:\s*["\']([^"\']*)["\']', obj_text)
                # Support both 'example' (old) and 'example_en' (new)
                ex_match = re.search(r'(?:example_en|example)\s*:\s*["\']([^"\']*)["\']', obj_text)
                # Support both 'collocation' and 'collocation_en'
                coll_match = re.search(r'(?:collocation_en|collocation)\s*:\s*["\']([^"\']*)["\']', obj_text)
                
                if phrase_match:
                    phrase = phrase_match.group(1).strip()
                    # Clean filename: spaces to underscore, remove quotes and punctuation
                    phrase_clean = phrase.lower().replace(' ', '_').replace('?', '').replace("'", '')
                    
                    tasks.append({"text": phrase, "voice": voice, "filename": f"wordpower_{phrase_clean}.mp3", "station": base_name})
                    if def_match:
                        tasks.append({"text": def_match.group(1).strip(), "voice": voice, "filename": f"wordpower_def_{phrase_clean}.mp3", "station": base_name})
                    if ex_match:
                        tasks.append({"text": ex_match.group(1).strip(), "voice": voice, "filename": f"wordpower_ex_{phrase_clean}.mp3", "station": base_name})
                    if coll_match:
                        # Check if coll_match contains a filename (starts with /) or actual text
                        coll_text = coll_match.group(1).strip()
                        # If it's a path (contains /), skip it
                        if not coll_text.startswith('/'):
                            tasks.append({"text": coll_text, "voice": voice, "filename": f"wordpower_coll_{phrase_clean}.mp3", "station": base_name})
                    # Add model_usage/model_sentence_en field (5th audio)
                    model_match = re.search(r'(?:model_sentence_en|model_usage)\s*:\s*["\']([^"\']*)["\']', obj_text)
                    if model_match:
                        tasks.append({"text": model_match.group(1).strip(), "voice": voice, "filename": f"wordpower_model_{phrase_clean}.mp3", "station": base_name})
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
        
        # Try story array format first (Week 7 format)
        sentences = re.findall(r'sentence\s*:\s*["\']([^"\']+)["\']', content)
        if sentences:
            # Join all sentences into one narration
            text = ' '.join(sentences)
        else:
            # Fallback to content_en format (older weeks)
            match = re.search(r'content_en\s*:\s*[`"\']([\s\S]*?)[`"\']', content)
            if match:
                text = match.group(1)
                text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)  # Remove ** markers
                text = re.sub(r"<.*?>", "", text)  # Remove HTML tags
                text = text.replace('\n', ' ').strip()
            else:
                return  # No content found
        
        # Filename based on file type
        if file_path.stem == "read":
            filename = "read_explore_main.mp3"
        else:  # explore.js
            filename = "explore_main.mp3"
        tasks.append({"text": text, "voice": voice, "filename": filename, "station": "read_explore"})

    # Dictation Station
    def extract_dictation(content, file_path):
        voice = voice_config.get("dictation", "en-US-Neural2-F")
        # Support 'text_en', 'text', and 'sentence' fields
        matches = re.findall(r'(?:text_en|sentence|text)\s*:\s*["\']([^"\']+)["\']', content)
        for i, text in enumerate(matches):
            tasks.append({"text": text, "voice": voice, "filename": f"dictation_{i+1}.mp3", "station": "dictation"})

    # Ask AI & Logic Lab Stations
    def extract_questions(content, file_path):
        voice = voice_config.get("questions", "en-US-Neural2-D")
        station_name = file_path.stem
        
        # Ask AI uses different structure
        if station_name == "ask_ai":
            # Extract context_en fields for questions
            context_matches = re.findall(r'context_en\s*:\s*["\']([^"\']+)["\']', content)
            for i, text in enumerate(context_matches):
                tasks.append({"text": text, "voice": voice, "filename": f"{station_name}_{i+1}.mp3", "station": station_name})
            
            # Extract answer fields (first item from answer array)
            # Pattern: answer: ["First answer", "Second", "Third"]
            answer_matches = re.findall(r'answer\s*:\s*\[\s*["\']([^"\']+)["\']', content)
            for i, text in enumerate(answer_matches):
                tasks.append({"text": text, "voice": voice, "filename": f"{station_name}_answer_{i+1}.mp3", "station": station_name})
        else:
            # Logic lab uses description_en/question_en/question/prompt fields
            matches = re.findall(r'(?:description_en|question_en|question|prompt)\s*:\s*["\'](.*?)["\']', content)
            for i, text in enumerate(matches):
                tasks.append({"text": text, "voice": voice, "filename": f"{station_name}_{i+1}.mp3", "station": station_name})

    # Shadowing Station
    def extract_shadowing(content, file_path):
        voice = voice_config.get("narration", "en-US-Neural2-D")
        # Support 'text_en' and 'text' fields
        matches = re.findall(r'(?:text_en|text)\s*:\s*["\'](.*?)["\']', content)
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
        
        # branchLabels: Extract using brace counting + line-based parsing
        branch_labels_start = re.search(r'branchLabels\s*:\s*{', content)
        if branch_labels_start:
            # Use brace counting to find the matching closing brace
            start_pos = branch_labels_start.end()
            brace_count = 1
            i = start_pos
            while brace_count > 0 and i < len(content):
                if content[i] == '{':
                    brace_count += 1
                elif content[i] == '}':
                    brace_count -= 1
                i += 1
            
            # Extract the full branchLabels content
            branch_section = content[start_pos:i-1]
            
            # Parse arrays line-by-line to avoid regex issues with nested structures
            lines = branch_section.split('\n')
            arrays = []
            current_key = None
            current_array = []
            in_array = False
            bracket_count = 0
            
            for line in lines:
                # Check if this line starts a new array (has key: [ pattern)
                key_match = re.match(r'\s*["\'](.*?)["\']\s*:\s*\[', line)
                if key_match:
                    # Save previous array if exists
                    if current_key and current_array:
                        arrays.append((current_key, '\n'.join(current_array)))
                    current_key = key_match.group(1)
                    current_array = [line]
                    in_array = True
                    bracket_count = line.count('[') - line.count(']')
                elif in_array:
                    current_array.append(line)
                    bracket_count += line.count('[') - line.count(']')
                    if bracket_count == 0 and ']' in line:
                        # Array ended
                        in_array = False
            
            # Don't forget the last array
            if current_key and current_array:
                arrays.append((current_key, '\n'.join(current_array)))
            
            # Now extract text from each array
            branch_index = 1
            for key, array_content in arrays:
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
        # Updated regex to match JS object literal format (no quotes on keys)
        matches = re.findall(r'audio_url\s*:\s*["\']([^"\']+)["\']', content)
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
