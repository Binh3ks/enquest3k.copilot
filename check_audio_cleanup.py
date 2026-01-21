#!/usr/bin/env python3
"""Check which audio files should be deleted (no URLs in code)"""
import os
import re

def analyze_mode(mode='advanced'):
    folder = 'public/audio/week5' if mode == 'advanced' else 'public/audio/week5_easy'
    data_folder = 'src/data/weeks/week_05' if mode == 'advanced' else 'src/data/weeks_easy/week_05'
    
    print("=" * 70)
    print(f"{mode.upper()} MODE - Audio Cleanup Analysis")
    print("=" * 70)
    
    # List all actual audio files
    audio_files = set(os.listdir(folder))
    print(f"\nTotal audio files: {len(audio_files)}")
    
    # Extract URLs from data files
    urls_in_code = set()
    
    # vocab.js
    with open(f'{data_folder}/vocab.js') as f:
        content = f.read()
        pattern = f'/audio/week5{"_easy" if mode == "easy" else ""}/(vocab_[^"]+\.mp3)'
        for match in re.findall(pattern, content):
            urls_in_code.add(match)
    
    # word_power.js
    with open(f'{data_folder}/word_power.js') as f:
        content = f.read()
        pattern = f'/audio/week5{"_easy" if mode == "easy" else ""}/(wordpower_[^"]+\.mp3)'
        for match in re.findall(pattern, content):
            urls_in_code.add(match)
    
    # shadowing.js
    with open(f'{data_folder}/shadowing.js') as f:
        content = f.read()
        pattern = f'/audio/week5{"_easy" if mode == "easy" else ""}/(shadowing_[^"]+\.mp3)'
        for match in re.findall(pattern, content):
            urls_in_code.add(match)
    
    # ask_ai.js
    with open(f'{data_folder}/ask_ai.js') as f:
        content = f.read()
        pattern = f'/audio/week5{"_easy" if mode == "easy" else ""}/(ask_ai_[^"]+\.mp3)'
        for match in re.findall(pattern, content):
            urls_in_code.add(match)
    
    # logic.js
    with open(f'{data_folder}/logic.js') as f:
        content = f.read()
        pattern = f'/audio/week5{"_easy" if mode == "easy" else ""}/(logic_[^"]+\.mp3)'
        for match in re.findall(pattern, content):
            urls_in_code.add(match)
    
    # mindmap.js
    with open(f'{data_folder}/mindmap.js') as f:
        content = f.read()
        pattern = f'/audio/week5{"_easy" if mode == "easy" else ""}/(mindmap_[^"]+\.mp3)'
        for match in re.findall(pattern, content):
            urls_in_code.add(match)
    
    print(f"Total URLs in code: {len(urls_in_code)}")
    
    # Find files without URLs
    files_no_url = audio_files - urls_in_code
    print(f"\nFiles WITHOUT URLs ({len(files_no_url)}):")
    for f in sorted(files_no_url):
        print(f"  - {f}")
    
    # Categorize files without URLs
    categories = {}
    for f in files_no_url:
        prefix = f.split('_')[0]
        categories[prefix] = categories.get(prefix, 0) + 1
    
    if categories:
        print(f"\nBy category:")
        for cat, count in sorted(categories.items()):
            print(f"  {cat}: {count} files")
    
    expected = 138 if mode == 'advanced' else 134
    print(f"\nAsset Inventory expected: {expected} files")
    print(f"Current: {len(audio_files)} files")
    print(f"Keep (with URLs): {len(urls_in_code)} files")
    print(f"Delete (no URLs): {len(files_no_url)} files")
    print(f"After cleanup: {len(urls_in_code)} files")
    
    return sorted(files_no_url), folder

if __name__ == "__main__":
    # Analyze both modes
    adv_to_delete, adv_folder = analyze_mode('advanced')
    print("\n")
    easy_to_delete, easy_folder = analyze_mode('easy')
    
    print("\n" + "=" * 70)
    print("CLEANUP SUMMARY")
    print("=" * 70)
    print(f"\nAdvanced: Delete {len(adv_to_delete)} files")
    print(f"Easy: Delete {len(easy_to_delete)} files")
    print(f"Total to delete: {len(adv_to_delete) + len(easy_to_delete)} files")
    
    # Ask confirmation
    print("\nProceed with deletion? (yes/no): ", end='')
    response = input().strip().lower()
    
    if response == 'yes':
        deleted_count = 0
        for f in adv_to_delete:
            os.remove(f'{adv_folder}/{f}')
            deleted_count += 1
        for f in easy_to_delete:
            os.remove(f'{easy_folder}/{f}')
            deleted_count += 1
        
        print(f"\n✅ Deleted {deleted_count} files")
        
        # Verify final counts
        adv_final = len(os.listdir(adv_folder))
        easy_final = len(os.listdir(easy_folder))
        print(f"\nFinal counts:")
        print(f"  Advanced: {adv_final} files (expected: 138)")
        print(f"  Easy: {easy_final} files (expected: 134)")
    else:
        print("\n❌ Cleanup cancelled")
