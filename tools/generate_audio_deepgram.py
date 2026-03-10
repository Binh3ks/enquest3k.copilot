"""
ENGQUEST3K — DEEPGRAM AUDIO GENERATION SCRIPT (v1.0, Feb 2026)

PURPOSE:
  Generate TTS audio for all stations using Deepgram (primary) with automatic
  R2 upload. Detects missing audio on R2 and fills gaps without re-generating
  files that already exist.

TTS ENGINE TIER ORDER:
  1. Deepgram Aura-2 (primary — ~300ms, $0.0043/min, crisp quality)
  2. Google Text-to-Speech (fallback — voice continuity with existing files)
  3. HF Kokoro (manual fallback — use --kokoro flag for specific files)

VOICE MAPPING (per station type → matching gender):
  narration  (male stories)  → aura-2-orion-en   / en-US-Neural2-D
  vocabulary (female vocab)  → aura-2-asteria-en  / en-US-Neural2-F
  dictation  (female neutral)→ aura-2-luna-en     / en-US-Neural2-F
  questions  (male logic)    → aura-2-zeus-en     / en-US-Neural2-D
  mindmap    (male branches) → aura-2-helios-en   / en-US-Neural2-D

USAGE:
  # Generate missing audio for a week (check R2, generate what's absent):
  python3 tools/generate_audio_deepgram.py <week>
  python3 tools/generate_audio_deepgram.py 3

  # Generate for ALL weeks 1-7:
  python3 tools/generate_audio_deepgram.py all

  # Force-regenerate even if file already exists locally/on R2:
  python3 tools/generate_audio_deepgram.py 3 --force

  # Only a specific station:
  python3 tools/generate_audio_deepgram.py 3 --station ask_ai

  # Use HF Kokoro instead of Deepgram (manual fallback):
  python3 tools/generate_audio_deepgram.py 3 --kokoro

  # Skip R2 check (only check local public/audio/ folder):
  python3 tools/generate_audio_deepgram.py 3 --local-only

  # Generate + upload to R2 in one command:
  python3 tools/generate_audio_deepgram.py 3 --upload

  # Easy mode:
  python3 tools/generate_audio_deepgram.py 3 --mode easy

  # Both modes:
  python3 tools/generate_audio_deepgram.py 3 --mode all
"""

import os
import re
import json
import sys
import time
import argparse
import subprocess
from pathlib import Path

# ─── Load environment ────────────────────────────────────────────────────────
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # .env loading optional if keys already exported

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY", "")
GOOGLE_API_KEY   = os.getenv("GOOGLE_TTS_API_KEY") or os.getenv("VITE_GOOGLE_TTS_API_KEY", "")
HF_SPACE_URL     = os.getenv("TTS_HF_SPACE", "https://binh3k-engquest3k.hf.space")
R2_CDN_URL       = "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev"
R2_BUCKET        = "engquest-audio"

# ─── Deepgram voice models ───────────────────────────────────────────────────
# Maps station role → (deepgram_model, google_neural2_voice, gender)
VOICE_MAP = {
    # role            deepgram model          Google Neural2 voice    gender
    "narration" : ("aura-orion-en",   "en-US-Neural2-D", "male"),
    "vocabulary": ("aura-asteria-en", "en-US-Neural2-F", "female"),
    "dictation" : ("aura-luna-en",    "en-US-Neural2-F", "female"),
    "questions" : ("aura-zeus-en",    "en-US-Neural2-D", "male"),
    "mindmap"   : ("aura-asteria-en", "en-US-Neural2-F", "female"),
}

# Kokoro voice map (HF Space uses voice name param)
KOKORO_VOICE_MAP = {
    "male"  : "am_adam",     # clear US male
    "female": "af_sarah",    # clear US female
}


# ─────────────────────────────────────────────────────────────────────────────
#  TTS ENGINES
# ─────────────────────────────────────────────────────────────────────────────

def tts_deepgram(text: str, model: str, output_path: Path, speed: float = 1.0) -> bool:
    """Generate audio with Deepgram Aura-2. Returns True on success."""
    import urllib.request
    import urllib.error

    if not DEEPGRAM_API_KEY:
        return False

    # Append trailing period + pause to prevent Deepgram from clipping the last syllable
    padded_text = text.rstrip()
    if not padded_text.endswith(('.', '!', '?', ',')):
        padded_text += '.'
    padded_text += ' ...'

    url = f"https://api.deepgram.com/v1/speak?model={model}&encoding=mp3"
    data = json.dumps({"text": padded_text}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Token {DEEPGRAM_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            audio_bytes = resp.read()
        if len(audio_bytes) < 500:   # sanity check – Deepgram returns non-empty MP3
            print(f"    ⚠️  Deepgram returned suspiciously small file ({len(audio_bytes)}B)")
            return False
        output_path.write_bytes(audio_bytes)
        return True
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"    ❌ Deepgram HTTP {e.code}: {body[:120]}")
        return False
    except Exception as e:
        print(f"    ❌ Deepgram error: {e}")
        return False


def tts_google(text: str, voice_name: str, output_path: Path, speed: float = 1.0) -> bool:
    """Generate audio with Google TTS REST API. Returns True on success."""
    import urllib.request
    import urllib.error
    import base64

    if not GOOGLE_API_KEY:
        return False

    lang = "en-GB" if "GB" in voice_name else "en-US"
    url = f"https://texttospeech.googleapis.com/v1/text:synthesize?key={GOOGLE_API_KEY}"
    payload = {
        "input": {"text": text},
        "voice": {"languageCode": lang, "name": voice_name},
        "audioConfig": {"audioEncoding": "MP3", "speakingRate": speed},
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url, data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            result = json.loads(resp.read())
        audio_bytes = base64.b64decode(result["audioContent"])
        output_path.write_bytes(audio_bytes)
        return True
    except Exception as e:
        print(f"    ❌ Google TTS error: {e}")
        return False


def tts_kokoro_hf(text: str, gender: str, output_path: Path, speed: float = 1.0) -> bool:
    """Generate audio with HF Kokoro Space. Returns True on success."""
    import urllib.request
    import urllib.parse

    voice = KOKORO_VOICE_MAP.get(gender, "am_adam")
    params = urllib.parse.urlencode({"text": text, "voice": voice})
    url = f"{HF_SPACE_URL}/tts?{params}"
    try:
        with urllib.request.urlopen(url, timeout=30) as resp:
            audio_bytes = resp.read()
        if len(audio_bytes) < 500:
            return False
        output_path.write_bytes(audio_bytes)
        return True
    except Exception as e:
        print(f"    ❌ HF Kokoro error: {e}")
        return False


# ─────────────────────────────────────────────────────────────────────────────
#  VOICE CONFIG LOADING
# ─────────────────────────────────────────────────────────────────────────────

_DEFAULT_VOICE_CONFIG = {
    "narration" : "en-US-Neural2-D",   # → aura-orion-en (male)
    "vocabulary": "en-US-Neural2-F",   # → aura-asteria-en (female)
    "dictation" : "en-US-Neural2-C",   # → aura-luna-en (female)
    "questions" : "en-US-Neural2-J",   # → aura-zeus-en (male)
    "mindmap"   : "en-US-Neural2-F",   # → aura-asteria-en (female, clear)
}

# Google Neural2 voice → (deepgram model, gender)
_GOOGLE_TO_DEEPGRAM = {
    # US Male
    "en-US-Neural2-D": ("aura-orion-en",   "male"),
    "en-US-Neural2-J": ("aura-zeus-en",    "male"),
    # US Female
    "en-US-Neural2-F": ("aura-asteria-en", "female"),
    "en-US-Neural2-C": ("aura-luna-en",    "female"),
    "en-US-Neural2-E": ("aura-stella-en",  "female"),
    # UK Male
    "en-GB-Neural2-D": ("aura-orion-en",   "male"),
    "en-GB-Neural2-B": ("aura-helios-en",  "male"),
    # UK Female (Google marks these as A/C = female, B/D = male)
    "en-GB-Neural2-A": ("aura-asteria-en", "female"),
    "en-GB-Neural2-C": ("aura-luna-en",    "female"),
}


def _google_voice_to_deepgram(google_voice: str):
    """Return (deepgram_model, gender) for a Google Neural2 voice name."""
    if google_voice in _GOOGLE_TO_DEEPGRAM:
        return _GOOGLE_TO_DEEPGRAM[google_voice]
    # Heuristic: Neural2-D/J/B = male, otherwise female
    if google_voice.endswith("-D") or google_voice.endswith("-J") or google_voice.endswith("-B"):
        return ("aura-orion-en", "male")
    return ("aura-asteria-en", "female")


def load_voice_config(index_js_path: Path) -> dict:
    """Parse voiceConfig block from week index.js."""
    config = dict(_DEFAULT_VOICE_CONFIG)
    if not index_js_path.exists():
        return config
    try:
        content = index_js_path.read_text(encoding="utf-8")
        m = re.search(r"voiceConfig\s*:\s*({[\s\S]*?})", content)
        if not m:
            return config
        s = m.group(1)
        s = re.sub(r"//.*", "", s)
        s = re.sub(r"(\w+)\s*:", r'"\1":', s)
        s = s.replace("'", '"')
        s = re.sub(r",\s*([}\]])", r"\1", s)
        parsed = json.loads(s)
        config.update(parsed)
    except Exception:
        pass
    return config


# ─────────────────────────────────────────────────────────────────────────────
#  TASK SCANNING  (identical logic to generate_audio_final.py)
# ─────────────────────────────────────────────────────────────────────────────

def scan_for_tasks(data_path: Path, voice_config: dict) -> list:
    """
    Scan week data files → return list of task dicts:
      { text, google_voice, deepgram_model, gender, filename, station }
    """
    tasks = []
    if not data_path.exists():
        print(f"  ⚠️  Data directory not found: {data_path}")
        return []

    # ── Helpers ──────────────────────────────────────────────────────────────
    def _task(text: str, role: str, filename: str, station: str):
        google_voice = voice_config.get(role, _DEFAULT_VOICE_CONFIG.get(role, "en-US-Neural2-D"))
        deepgram_model, gender = _google_voice_to_deepgram(google_voice)
        tasks.append({
            "text": text.strip(),
            "google_voice": google_voice,
            "deepgram_model": deepgram_model,
            "gender": gender,
            "filename": filename,
            "station": station,
        })

    # ── Station extractors ────────────────────────────────────────────────────

    def extract_vocab(content, file_path):
        base = file_path.stem

        if base == "word_power":
            # Match objects starting with {word:, {phrase:, OR {id: (newer format)
            for obj in re.findall(r'{\s*(?:id|word|phrase)\s*:.*?}', content, re.DOTALL):
                phrase_m = re.search(r'(?:phrase|word)\s*:\s*["\']([^"\']*)["\']', obj)
                def_m    = re.search(r'definition_en\s*:\s*["\']([^"\']*)["\']', obj)
                ex_m     = re.search(r'(?:example_en|example)\s*:\s*["\']([^"\']*)["\']', obj)
                coll_m   = re.search(r'(?:collocation_en|collocation)\s*:\s*["\']([^"\']*)["\']', obj)
                model_m  = re.search(r'(?:model_sentence_en|model_sentence|model_usage)\s*:\s*["\']([^"\']*)["\']', obj)
                if not phrase_m:
                    continue
                phrase = phrase_m.group(1).strip()
                slug   = phrase.lower().replace(' ', '_').replace('?', '').replace("'", '')
                _task(phrase, "vocabulary", f"wordpower_{slug}.mp3", base)
                if def_m:   _task(def_m.group(1).strip(),   "vocabulary", f"wordpower_def_{slug}.mp3", base)
                if ex_m:    _task(ex_m.group(1).strip(),    "vocabulary", f"wordpower_ex_{slug}.mp3", base)
                if coll_m:
                    coll = coll_m.group(1).strip()
                    if not coll.startswith('/'):
                        _task(coll, "vocabulary", f"wordpower_coll_{slug}.mp3", base)
                if model_m: _task(model_m.group(1).strip(), "vocabulary", f"wordpower_model_{slug}.mp3", base)
            return

        # vocab.js
        for obj in re.findall(r'{\s*id:.*?}', content, re.DOTALL):
            word_m = re.search(r'word\s*:\s*["\'](.* ?)["\']', obj)
            def_m  = re.search(r'definition_en\s*:\s*["\'](.* ?)["\']', obj)
            ex_m   = re.search(r'example\s*:\s*["\'](.* ?)["\']', obj)
            coll_m = re.search(r'collocation\s*:\s*["\'](.* ?)["\']', obj)
            if not word_m:
                continue
            word = word_m.group(1)
            slug = word.lower().replace(' ', '_').replace('?', '')
            _task(word, "vocabulary", f"vocab_{slug}.mp3", base)
            if def_m:  _task(def_m.group(1),  "vocabulary", f"vocab_def_{slug}.mp3", base)
            if ex_m:   _task(ex_m.group(1),   "vocabulary", f"vocab_ex_{slug}.mp3", base)
            if coll_m: _task(coll_m.group(1), "vocabulary", f"vocab_coll_{slug}.mp3", base)

    def extract_read_explore(content, file_path):
        sentences = re.findall(r'sentence\s*:\s*["\']([^"\']+)["\']', content)
        if sentences:
            text = ' '.join(sentences)
        else:
            # Quote-type-aware: backtick first (can contain any quotes), then double, then single
            m = re.search(r'content_en\s*:\s*`([\s\S]*?)`', content)
            if not m:
                m = re.search(r'content_en\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"', content, re.DOTALL)
            if not m:
                m = re.search(r"content_en\s*:\s*'([^'\\]*(?:\\.[^'\\]*)*)'", content, re.DOTALL)
            if not m:
                return
            text = m.group(1)
            text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
            text = re.sub(r"<.*?>", "", text)
            text = text.replace('\n', ' ').strip()
        fname = "read_explore_main.mp3" if file_path.stem == "read" else "explore_main.mp3"
        _task(text, "narration", fname, "read_explore")

    def extract_dictation(content, file_path):
        for i, m in enumerate(re.findall(r'(?:text_en|sentence|text)\s*:\s*["\']([^"\']+)["\']', content)):
            _task(m, "dictation", f"dictation_{i+1}.mp3", "dictation")

    def extract_questions(content, file_path):
        name = file_path.stem
        if name == "ask_ai":
            for i, m in enumerate(re.findall(r'answer\s*:\s*\[\s*["\']([^"\']+)["\']', content)):
                _task(m, "questions", f"ask_ai_{i+1}.mp3", name)
        else:
            # Use backreference (\1) so opening quote matches closing quote.
            # This prevents apostrophes inside text (e.g. o'clock) from
            # being mistaken for the closing delimiter.
            for i, (_, text) in enumerate(re.findall(r'(?:description_en|question_en|question|prompt)\s*:\s*(["\'])(.+?)\1', content)):
                _task(text, "questions", f"{name}_{i+1}.mp3", name)

    def extract_shadowing(content, file_path):
        lines = re.findall(r'(?:text_en|text)\s*:\s*["\'](.*?)["\']', content)
        for i, t in enumerate(lines):
            _task(t, "narration", f"shadowing_{i+1}.mp3", "shadowing")
        if lines:
            _task(" ".join(lines), "narration", "shadowing_full.mp3", "shadowing")

    def extract_mindmap(content, file_path):
        # ── Center stems ────────────────────────────────────────────────────
        cs = re.search(r'centerStems\s*:\s*\[([\s\S]*?)\]', content)
        if cs:
            cs_text = cs.group(1)
            # Try object format first: { text: "...", audio: "..." }
            obj_stems = re.findall(r'{\s*text:\s*["\']([^"\']+)["\']', cs_text)
            if obj_stems:
                stem_list = obj_stems
            else:
                # Fallback: plain string array format: "I am ___.", "..."
                # Line-anchored to safely grab only pure string values
                stem_list = [
                    s for s in re.findall(r'^\s*["\']([^"\']+)["\'],?\s*$', cs_text, re.MULTILINE)
                    if not s.startswith('/audio/')
                ]
            for i, t in enumerate(stem_list):
                # Skip stems that contain ___ blanks — they don't form
                # readable sentences without the branch word filled in.
                if '___' in t:
                    continue
                clean = re.sub(r'\.\s*$', '', t.strip())
                if clean:
                    _task(clean + ".", "mindmap", f"mindmap_stem_{i+1}.mp3", "mindmap")

        # ── Branch labels ────────────────────────────────────────────────────
        bl_start = re.search(r'branchLabels\s*:\s*{', content)
        if not bl_start:
            return
        pos = bl_start.end(); depth = 1; i = pos
        while depth > 0 and i < len(content):
            if content[i] == '{': depth += 1
            elif content[i] == '}': depth -= 1
            i += 1
        branch_section = content[pos:i-1]

        lines = branch_section.split('\n')
        arrays = []; cur_key = None; cur_arr = []; in_arr = False; bcount = 0
        for line in lines:
            km = re.match(r'\s*["\'](.*?)["\']\s*:\s*\[', line)
            if km:
                if cur_key and cur_arr: arrays.append((cur_key, '\n'.join(cur_arr)))
                cur_key = km.group(1); cur_arr = [line]; in_arr = True
                bcount = line.count('[') - line.count(']')
            elif in_arr:
                cur_arr.append(line); bcount += line.count('[') - line.count(']')
                if bcount == 0 and ']' in line: in_arr = False
        if cur_key and cur_arr: arrays.append((cur_key, '\n'.join(cur_arr)))

        idx = 1
        for _, arr_content in arrays:
            # Try object format: { text: "playing games", audio: "..." }
            obj_branches = re.findall(r'{\s*text:\s*["\']([^"\']+)["\']', arr_content)
            if obj_branches:
                branch_list = obj_branches
            else:
                # Fallback: plain string entries (each line is just a "value")
                # Use line-anchored regex to avoid capturing the key definition line
                branch_list = [
                    s for s in re.findall(r'^\s*["\']([^"\']+)["\'],?\s*$', arr_content, re.MULTILINE)
                    if not s.startswith('/audio/')
                ]
            for t in branch_list:
                _task(t.strip(), "mindmap", f"mindmap_branch_{idx}.mp3", "mindmap"); idx += 1

    # ── File → scanner map ────────────────────────────────────────────────────
    scanners = {
        "vocab.js":      extract_vocab,
        "word_power.js": extract_vocab,
        "read.js":       extract_read_explore,
        "explore.js":    extract_read_explore,
        "dictation.js":  extract_dictation,
        "ask_ai.js":     extract_questions,
        "logic.js":      extract_questions,
        "shadowing.js":  extract_shadowing,
        "mindmap.js":    extract_mindmap,
    }

    for js_file in sorted(data_path.glob("*.js")):
        if js_file.name in scanners:
            print(f"  → {js_file.name}")
            content = js_file.read_text(encoding="utf-8")
            scanners[js_file.name](content, js_file)

    return tasks


# ─────────────────────────────────────────────────────────────────────────────
#  R2 CHECK
# ─────────────────────────────────────────────────────────────────────────────

def file_exists_on_r2(r2_key: str) -> bool:
    """HEAD request to R2 CDN to check if a file exists."""
    import urllib.request
    url = f"{R2_CDN_URL}/{r2_key}"
    try:
        req = urllib.request.Request(url, method="HEAD")
        with urllib.request.urlopen(req, timeout=5) as resp:
            return resp.status == 200
    except Exception:
        return False


def upload_to_r2(local_path: Path, r2_key: str) -> bool:
    """Upload a file to R2 using wrangler CLI."""
    try:
        result = subprocess.run(
            ["npx", "wrangler", "r2", "object", "put",
             f"{R2_BUCKET}/{r2_key}", f"--file={local_path}", "--remote"],
            capture_output=True, text=True, timeout=30,
        )
        return result.returncode == 0
    except Exception as e:
        print(f"    ❌ wrangler upload error: {e}")
        return False


# ─────────────────────────────────────────────────────────────────────────────
#  MAIN GENERATION LOGIC
# ─────────────────────────────────────────────────────────────────────────────

def run_for_week_mode(
    week: int, mode: str,
    *,
    force: bool = False,
    local_only: bool = False,
    auto_upload: bool = False,
    use_kokoro: bool = False,
    use_google_first: bool = False,
    station_filter: str | None = None,
    speed: float = 1.0,
):
    """Process one week × mode combination."""
    root = Path(__file__).parent.parent.resolve()
    data_dir_name  = "weeks" if mode == "advanced" else "weeks_easy"
    week_padded = str(week).zfill(2)  # Use zero-padding for consistency (week09, week10)
    audio_dir_name = f"week{week_padded}" if mode == "advanced" else f"week{week_padded}_easy"

    data_path  = root / "src" / "data" / data_dir_name / f"week_{week_padded}"
    audio_path = root / "public" / "audio" / audio_dir_name
    audio_path.mkdir(parents=True, exist_ok=True)

    voice_config = load_voice_config(data_path / "index.js")
    tasks = scan_for_tasks(data_path, voice_config)

    if station_filter:
        tasks = [t for t in tasks if t["station"] == station_filter]
        print(f"  🔍 Filtered to station '{station_filter}': {len(tasks)} tasks")

    if not tasks:
        print(f"  🤷 No tasks found — skipping.")
        return 0, 0, 0

    generated = skipped = failed = 0

    for i, task in enumerate(tasks, 1):
        filename   = task["filename"]
        local_file = audio_path / filename
        r2_key     = f"audio/{audio_dir_name}/{filename}"
        prefix     = f"  [{i}/{len(tasks)}]"

        # ── Decide whether to generate ────────────────────────────────────────
        if not force:
            if local_file.exists():
                skipped += 1
                continue
            if not local_only and file_exists_on_r2(r2_key):
                print(f"  {prefix} ☁️  R2 exists, skip: {filename}")
                skipped += 1
                continue

        text  = task["text"]
        model = task["deepgram_model"]
        gv    = task["google_voice"]
        gend  = task["gender"]

        print(f"  {prefix} 🎙️  {filename}  [{model if not use_kokoro else 'kokoro'}]")

        success = False

        if use_kokoro:
            # Manual Kokoro fallback mode
            success = tts_kokoro_hf(text, gend, local_file, speed)
            if not success:
                print(f"    ⚠️  Kokoro failed, trying Deepgram...")
                success = tts_deepgram(text, model, local_file, speed)
        elif use_google_first:
            # Google TTS first (supports speakingRate for speed control)
            success = tts_google(text, gv, local_file, speed)
            if not success:
                print(f"    ⚠️  Google failed, trying Deepgram...")
                success = tts_deepgram(text, model, local_file, speed)
            if not success:
                print(f"    ⚠️  Deepgram failed too, trying HF Kokoro...")
                success = tts_kokoro_hf(text, gend, local_file, speed)
        else:
            # Normal tier: Deepgram → Google → Kokoro
            success = tts_deepgram(text, model, local_file, speed)
            if not success and GOOGLE_API_KEY:
                print(f"    ⚠️  Deepgram failed, trying Google TTS...")
                success = tts_google(text, gv, local_file, speed)
            if not success:
                print(f"    ⚠️  Google failed too, trying HF Kokoro...")
                success = tts_kokoro_hf(text, gend, local_file, speed)

        if success:
            generated += 1
            if auto_upload:
                ok = upload_to_r2(local_file, r2_key)
                print(f"    {'☁️  R2 ✅' if ok else '☁️  R2 ❌ upload failed'}: {r2_key}")
        else:
            print(f"    ❌ ALL ENGINES FAILED for {filename} — text: {text[:60]}")
            failed += 1

        # Small delay to respect Deepgram rate limits
        time.sleep(0.05)

    return generated, skipped, failed


# ─────────────────────────────────────────────────────────────────────────────
#  R2 BULK UPLOAD  (post-generation)
# ─────────────────────────────────────────────────────────────────────────────

def upload_week_to_r2(week: int, modes: list[str]):
    """Upload all locally generated files for a week to R2."""
    root       = Path(__file__).parent.parent.resolve()
    uploaded   = 0
    failed_up  = 0
    for mode in modes:
        audio_dir = f"week{week}" if mode == "advanced" else f"week{week}_easy"
        local_dir = root / "public" / "audio" / audio_dir
        if not local_dir.exists():
            continue
        for mp3 in sorted(local_dir.glob("*.mp3")):
            r2_key = f"audio/{audio_dir}/{mp3.name}"
            ok = upload_to_r2(mp3, r2_key)
            status = "✅" if ok else "❌"
            print(f"  {status} {r2_key}")
            if ok: uploaded += 1
            else:  failed_up += 1
    return uploaded, failed_up


# ─────────────────────────────────────────────────────────────────────────────
#  CLI
# ─────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="EngQuest3K Deepgram Audio Generator",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("week",
        help="Week number (1-7) or 'all' to process all weeks 1-7")
    parser.add_argument("--mode", default="all",
        choices=["advanced", "easy", "all"],
        help="Learning mode (default: all = advanced + easy)")
    parser.add_argument("--station",
        help="Only generate for this station (e.g. ask_ai, vocab, mindmap)")
    parser.add_argument("--force", action="store_true",
        help="Re-generate even if file already exists locally / on R2")
    parser.add_argument("--local-only", action="store_true",
        help="Skip R2 existence check; only check local public/audio/ folder")
    parser.add_argument("--upload", action="store_true",
        help="Upload each generated file to R2 immediately after creation")
    parser.add_argument("--upload-all", action="store_true",
        help="After generation, bulk-upload ALL local files for the week to R2")
    parser.add_argument("--kokoro", action="store_true",
        help="Use HF Kokoro as primary engine (manual fallback mode)")
    parser.add_argument("--google-first", action="store_true",
        help="Use Google TTS as primary engine (supports speakingRate for speed control)")
    parser.add_argument("--speed", type=float, default=1.0,
        help="Speaking rate (0.5-2.0, default 1.0). Lower = slower. E.g. 0.85. Only effective with Google TTS (--google-first)")
    args = parser.parse_args()

    # ── Validate API keys ─────────────────────────────────────────────────────
    if not args.kokoro and not DEEPGRAM_API_KEY:
        print("❌  DEEPGRAM_API_KEY not set. Add it to .env or export it.")
        print("    Fallback: use --kokoro flag to use HF Kokoro instead.")
        sys.exit(1)

    if args.kokoro:
        print(f"🎙️  Engine: HF Kokoro ({HF_SPACE_URL})")
    else:
        print(f"🎙️  Engine: Deepgram Aura-2 (primary) → Google TTS → HF Kokoro")

    # ── Weeks ─────────────────────────────────────────────────────────────────
    if args.week == "all":
        weeks = list(range(1, 8))   # 1–7
    else:
        try:
            weeks = [int(args.week)]
        except ValueError:
            print(f"❌  Invalid week '{args.week}'. Use 1-7 or 'all'.")
            sys.exit(1)

    modes = ["advanced", "easy"] if args.mode == "all" else [args.mode]

    total_gen = total_skip = total_fail = 0

    for week in weeks:
        for mode in modes:
            print(f"\n{'─'*50}")
            print(f"  Week {week} / {mode.upper()}")
            print(f"{'─'*50}")
            g, s, f = run_for_week_mode(
                week, mode,
                force=args.force,
                local_only=args.local_only,
                auto_upload=args.upload,
                use_kokoro=args.kokoro,
                station_filter=args.station,
                speed=args.speed,
            )
            total_gen  += g
            total_skip += s
            total_fail += f

        if args.upload_all:
            print(f"\n📤 Bulk upload week {week} to R2...")
            up, uf = upload_week_to_r2(week, modes)
            print(f"  ✅ Uploaded {up}, ❌ Failed {uf}")

    print(f"\n{'='*50}")
    print(f"  DONE")
    print(f"  ✅  Generated : {total_gen}")
    print(f"  ⏭️   Skipped   : {total_skip}")
    print(f"  ❌  Failed    : {total_fail}")
    print(f"{'='*50}")

    if total_gen > 0 and not args.upload and not args.upload_all:
        print("\n💡 TIP: Run with --upload to push to R2 automatically,")
        print("        or: bash tools/upload_audio_to_r2.sh <week>")


if __name__ == "__main__":
    main()
