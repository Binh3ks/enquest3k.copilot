#!/usr/bin/env python3
"""
SYNC_WEEK_DATA.PY - Smart Week Data Synchronizer
Tự động đồng bộ dictation/shadowing từ read.js và bổ sung audio_url/image_url thiếu
"""

import os
import re
import json
from pathlib import Path

ROOT = Path(__file__).parent.parent
WEEKS_BASE = ROOT / "src/data/weeks"
WEEKS_EASY_BASE = ROOT / "src/data/weeks_easy"

def extract_sentences_from_read(read_content):
    """Trích xuất tất cả câu từ read.js content_en"""
    # Extract content_en
    match = re.search(r'content_en:\s*["\']([^"\']+)["\']', read_content, re.DOTALL)
    if not match:
        match = re.search(r'content_en:\s*`([^`]+)`', read_content, re.DOTALL)
    
    if not match:
        return []
    
    text = match.group(1)
    # Remove ** bold markers
    text = re.sub(r'\*\*', '', text)
    # Split by sentence endings
    sentences = re.split(r'[.!?]+', text)
    sentences = [s.strip() for s in sentences if s.strip()]
    
    return sentences

def sync_dictation(week_num, mode='advanced'):
    """Đồng bộ dictation.js từ read.js"""
    base = WEEKS_EASY_BASE if mode == 'easy' else WEEKS_BASE
    week_folder = base / f"week_{week_num:02d}"
    
    read_path = week_folder / "read.js"
    dictation_path = week_folder / "dictation.js"
    
    if not read_path.exists():
        print(f"❌ {mode}: read.js không tồn tại")
        return False
    
    # Read read.js
    read_content = read_path.read_text(encoding='utf-8')
    sentences = extract_sentences_from_read(read_content)
    
    if not sentences:
        print(f"❌ {mode}: Không trích xuất được câu từ read.js")
        return False
    
    print(f"📊 {mode}: Read.js có {len(sentences)} câu")
    
    # Check current dictation
    if dictation_path.exists():
        dictation_content = dictation_path.read_text(encoding='utf-8')
        current_count = len(re.findall(r'\{\s*id\s*:\s*\d+', dictation_content))
        print(f"📊 {mode}: Dictation.js hiện có {current_count} câu")
        
        if current_count >= len(sentences):
            print(f"✅ {mode}: Dictation.js đã đủ câu")
            return True
    
    # Generate new dictation.js
    dictation_items = []
    for i, sentence in enumerate(sentences, 1):
        dictation_items.append(f'    {{ id: {i}, text: "{sentence}.", meaning: "..." }}')
    
    items_text = ',\n'.join(dictation_items)
    dictation_js = f"""export default {{
  sentences: [
{items_text}
  ]
}};
"""
    
    dictation_path.write_text(dictation_js, encoding='utf-8')
    print(f"✅ {mode}: Đã cập nhật dictation.js với {len(sentences)} câu")
    return True

def sync_shadowing(week_num, mode='advanced'):
    """Đồng bộ shadowing.js từ read.js"""
    base = WEEKS_EASY_BASE if mode == 'easy' else WEEKS_BASE
    week_folder = base / f"week_{week_num:02d}"
    
    read_path = week_folder / "read.js"
    shadowing_path = week_folder / "shadowing.js"
    
    if not read_path.exists():
        print(f"❌ {mode}: read.js không tồn tại")
        return False
    
    # Read read.js
    read_content = read_path.read_text(encoding='utf-8')
    sentences = extract_sentences_from_read(read_content)
    
    # Extract title
    title_match = re.search(r'title:\s*["\']([^"\']+)["\']', read_content)
    title = title_match.group(1) if title_match else "Reading"
    
    if not sentences:
        print(f"❌ {mode}: Không trích xuất được câu từ read.js")
        return False
    
    print(f"📊 {mode}: Read.js có {len(sentences)} câu cho shadowing")
    
    # Check current shadowing
    if shadowing_path.exists():
        shadowing_content = shadowing_path.read_text(encoding='utf-8')
        current_count = len(re.findall(r'\{\s*id\s*:\s*\d+', shadowing_content))
        print(f"📊 {mode}: Shadowing.js hiện có {current_count} câu")
        
        if current_count >= len(sentences):
            print(f"✅ {mode}: Shadowing.js đã đủ câu")
            return True
    
    # Generate new shadowing.js
    week_path = f"week{week_num}" if mode == 'advanced' else f"week{week_num}_easy"
    shadowing_items = []
    for i, sentence in enumerate(sentences, 1):
        shadowing_items.append(
            f'    {{ id: {i}, text: "{sentence}.", vi: "...", audio_url: "/audio/{week_path}/shadowing_{i}.mp3" }}'
        )
    
    items_text = ',\n'.join(shadowing_items)
    shadowing_js = f"""export default {{
  title: "{title}",
  audio_full: "/audio/{week_path}/shadowing_full_w{week_num}.mp3",
  script: [
{items_text}
  ]
}};
"""
    
    shadowing_path.write_text(shadowing_js, encoding='utf-8')
    print(f"✅ {mode}: Đã cập nhật shadowing.js với {len(sentences)} câu")
    return True

def fill_missing_urls(week_num, mode='advanced'):
    """Tự động điền audio_url/image_url còn thiếu"""
    base = WEEKS_EASY_BASE if mode == 'easy' else WEEKS_BASE
    week_folder = base / f"week_{week_num:02d}"
    week_path = f"week{week_num}" if mode == 'advanced' else f"week{week_num}_easy"
    
    files_to_check = ['vocab.js', 'read.js', 'explore.js', 'word_power.js', 'ask_ai.js']
    
    for filename in files_to_check:
        filepath = week_folder / filename
        if not filepath.exists():
            continue
        
        content = filepath.read_text(encoding='utf-8')
        original = content
        
        # Fill missing audio_url (null or empty)
        content = re.sub(
            r'audio_url\s*:\s*(null|""|\'\')',
            f'audio_url: "/audio/{week_path}/placeholder.mp3"',
            content
        )
        
        # Fill missing image_url (empty string)
        if filename == 'vocab.js':
            # For vocab items
            content = re.sub(
                r'(id:\s*(\d+)[^}]*?word:\s*["\']([^"\']+)["\'][^}]*?)image_url:\s*["\']["\']',
                lambda m: f'{m.group(1)}image_url: "/images/{week_path}/{m.group(3).lower()}.jpg"',
                content
            )
        
        if content != original:
            filepath.write_text(content, encoding='utf-8')
            print(f"✅ {mode}: Đã cập nhật URLs trong {filename}")

def main():
    import sys
    if len(sys.argv) < 2:
        print("❌ Usage: python3 tools/sync_week_data.py <week_number>")
        sys.exit(1)
    
    week_num = int(sys.argv[1])
    
    print("=" * 80)
    print(f"🔄 ĐỒNG BỘ DỮ LIỆU TUẦN {week_num}")
    print("=" * 80)
    
    for mode in ['advanced', 'easy']:
        print(f"\n--- {mode.upper()} MODE ---")
        sync_dictation(week_num, mode)
        sync_shadowing(week_num, mode)
        fill_missing_urls(week_num, mode)
    
    print("\n✅ HOÀN TẤT!")

if __name__ == "__main__":
    main()
