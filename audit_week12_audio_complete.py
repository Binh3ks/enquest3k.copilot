#!/usr/bin/env python3
"""
WEEK 12 AUDIO COMPLETE AUDIT
Comprehensive check of ALL audio files in ALL stations for both modes
"""

import os
import re
from pathlib import Path
from datetime import datetime

def check_station_audio(mode, week_num=12):
    """Check all audio files for a given mode"""
    root = Path(__file__).parent
    
    # Paths
    if mode == "advanced":
        data_path = root / "src/data/weeks" / f"week_{week_num:02d}"
        audio_path = root / "public/audio" / f"week{week_num:02d}"
    else:
        data_path = root / "src/data/weeks_easy" / f"week_{week_num:02d}"
        audio_path = root / "public/audio" / f"week{week_num:02d}_easy"
    
    print(f"\n{'='*70}")
    print(f"  WEEK {week_num} - {mode.upper()} MODE")
    print(f"{'='*70}")
    
    # Station definitions with expected audio patterns
    stations = {
        "read.js": {
            "patterns": ["read_explore_main.mp3"],
            "regex": r'content_en\s*:\s*["`]([^"`]+)["`]'
        },
        "explore.js": {
            "patterns": ["explore_main.mp3"],
            "regex": r'content_en\s*:\s*["`]([^"`]+)["`]'
        },
        "dictation.js": {
            "patterns": [f"dictation_{i}.mp3" for i in range(1, 15)],  # Max 14
            "regex": r'text\s*:\s*["\']([^"\']+)["\']'
        },
        "shadowing.js": {
            "patterns": [f"shadowing_{i}.mp3" for i in range(1, 15)] + ["shadowing_full.mp3"],
            "regex": r'text\s*:\s*["\']([^"\']+)["\']'
        },
        "vocab.js": {
            "patterns": ["vocab_*.mp3"],  # Multiple files
            "regex": r'word\s*:\s*["\']([^"\']+)["\']'
        },
        "word_power.js": {
            "patterns": ["vocab_*.mp3"],
            "regex": r'word\s*:\s*["\']([^"\']+)["\']'
        },
        "ask_ai.js": {
            "patterns": ["ask_ai_*.mp3"],
            "regex": r'answer\s*:\s*\[\s*["\']([^"\']+)["\']'
        },
        "logic.js": {
            "patterns": ["logic_*.mp3"],
            "regex": r'question_en\s*:\s*["\']([^"\']+)["\']'
        },
        "mindmap.js": {
            "patterns": ["mindmap_stem_*.mp3", "mindmap_branch_*.mp3"],
            "regex": r'text\s*:\s*["\']([^"\']+)["\']'
        },
    }
    
    issues = []
    total_files = 0
    old_files = 0
    missing_files = 0
    
    for station_file, config in stations.items():
        station_path = data_path / station_file
        if not station_path.exists():
            print(f"\n⚠️  {station_file}: FILE NOT FOUND")
            continue
        
        print(f"\n📄 {station_file}")
        
        # Read content
        content = station_path.read_text(encoding='utf-8')
        
        # Count expected sentences/items
        matches = re.findall(config["regex"], content, re.DOTALL)
        expected_count = len(matches)
        
        # Check audio files
        station_name = station_file.replace('.js', '')
        
        if station_name in ["dictation", "shadowing"]:
            # Check numbered files
            audio_files = []
            for i in range(1, expected_count + 1):
                audio_file = audio_path / f"{station_name}_{i}.mp3"
                if audio_file.exists():
                    stat = audio_file.stat()
                    mtime = datetime.fromtimestamp(stat.st_mtime)
                    size = stat.st_size
                    audio_files.append((audio_file.name, mtime, size))
                else:
                    missing_files += 1
                    issues.append(f"❌ MISSING: {station_name}_{i}.mp3")
            
            # Check if old (before today)
            today = datetime.now().date()
            for fname, mtime, size in audio_files:
                total_files += 1
                if mtime.date() < today:
                    old_files += 1
                    issues.append(f"⏰ OLD: {fname} ({mtime.strftime('%b %d %H:%M')})")
                else:
                    print(f"  ✅ {fname}: {mtime.strftime('%b %d %H:%M')} ({size:,} bytes)")
        
        elif station_name in ["read", "explore"]:
            # Single main file
            if station_name == "read":
                audio_file = audio_path / "read_explore_main.mp3"
            else:
                audio_file = audio_path / "explore_main.mp3"
            
            if audio_file.exists():
                stat = audio_file.stat()
                mtime = datetime.fromtimestamp(stat.st_mtime)
                size = stat.st_size
                total_files += 1
                
                today = datetime.now().date()
                if mtime.date() < today:
                    old_files += 1
                    issues.append(f"⏰ OLD: {audio_file.name} ({mtime.strftime('%b %d %H:%M')})")
                else:
                    print(f"  ✅ {audio_file.name}: {mtime.strftime('%b %d %H:%M')} ({size:,} bytes)")
            else:
                missing_files += 1
                issues.append(f"❌ MISSING: {audio_file.name}")
        
        else:
            # Wildcard files (vocab, ask_ai, logic, mindmap)
            pattern = config["patterns"][0]
            if "*" in pattern:
                prefix = pattern.split("*")[0]
                matching_files = sorted(audio_path.glob(f"{prefix}*.mp3"))
                
                if not matching_files:
                    issues.append(f"⚠️  No audio files found for {station_file}")
                else:
                    # Just show count and newest file
                    newest = max(matching_files, key=lambda p: p.stat().st_mtime)
                    stat = newest.stat()
                    mtime = datetime.fromtimestamp(stat.st_mtime)
                    print(f"  ✅ {len(matching_files)} files, newest: {newest.name} ({mtime.strftime('%b %d %H:%M')})")
                    total_files += len(matching_files)
    
    # Summary
    print(f"\n{'='*70}")
    print(f"SUMMARY - {mode.upper()}")
    print(f"{'='*70}")
    print(f"Total audio files checked: {total_files}")
    print(f"Old files (before today): {old_files}")
    print(f"Missing files: {missing_files}")
    
    if issues:
        print(f"\n⚠️  ISSUES FOUND ({len(issues)}):")
        for issue in issues:
            print(f"  {issue}")
    else:
        print(f"\n✅ ALL AUDIO FILES UP TO DATE!")
    
    return issues

# Run audit
if __name__ == "__main__":
    issues_adv = check_station_audio("advanced", 12)
    issues_easy = check_station_audio("easy", 12)
    
    print(f"\n{'='*70}")
    print(f"FINAL REPORT")
    print(f"{'='*70}")
    print(f"Advanced mode issues: {len(issues_adv)}")
    print(f"Easy mode issues: {len(issues_easy)}")
    
    if not issues_adv and not issues_easy:
        print(f"\n🎉 ALL AUDIO FILES ARE CORRECT AND UP TO DATE!")
    else:
        print(f"\n⚠️  TOTAL ISSUES: {len(issues_adv) + len(issues_easy)}")
