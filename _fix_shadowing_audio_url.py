"""
Fix: Remove audio_url from all shadowing.js sentence objects.
This forces the Cloudflare Worker to use hash-based R2 paths,
ensuring TTS audio always matches the current text.
"""
import os
import re
import glob

def fix_shadowing_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Remove audio_url from inside sentence objects (lines with { id: N, text: ..., audio_url: "..." })
    # Pattern: audio_url: "...", at the end of the property (with comma or end of object)
    # Also handles audio_url as the last property before }
    
    # Remove ", audio_url: '...' " or ", audio_url: \"...\""
    content = re.sub(r',\s*audio_url:\s*["\'][^"\']*["\']', '', content)
    
    # Remove audio_url at beginning of object (unlikely but safe)
    content = re.sub(r'audio_url:\s*["\'][^"\']*["\'],?\s*', '', content)
    
    # Remove audio_full at top level (prevents fallback to stale MP3 for full playback)
    # Keep as comment to preserve knowledge of old path
    # Actually, let's keep audio_full for now since it's the full recording feature
    # Only removing from sentence objects
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Find all shadowing.js files in both modes
patterns = [
    'src/data/weeks/week_*/shadowing.js',
    'src/data/weeks_easy/week_*/shadowing.js',
]

fixed = []
skipped = []

for pattern in patterns:
    for filepath in sorted(glob.glob(pattern)):
        if 'OLD' in filepath or 'BACKUP' in filepath:
            continue
        
        # Check if it has any audio_url in sentence objects (not just comments)
        with open(filepath) as f:
            content = f.read()
        
        # Find actual audio_url in data (not in comments)
        non_comment = re.sub(r'//.*', '', content)
        has_audio_url = bool(re.search(r'audio_url\s*:', non_comment))
        
        if not has_audio_url:
            skipped.append(filepath)
            continue
        
        if fix_shadowing_file(filepath):
            fixed.append(filepath)
            print(f"✅ Fixed: {filepath}")
        else:
            skipped.append(filepath)

print(f"\n✅ Fixed {len(fixed)} files")
print(f"⏭️  Skipped (no audio_url): {len(skipped)} files")

# Verify fix
print("\n--- Verifying no audio_url left in sentences ---")
any_remaining = False
for pattern in patterns:
    for filepath in sorted(glob.glob(pattern)):
        if 'OLD' in filepath or 'BACKUP' in filepath:
            continue
        with open(filepath) as f:
            content = f.read()
        non_comment = re.sub(r'//.*', '', content)
        if re.search(r'audio_url\s*:', non_comment):
            print(f"⚠️  STILL HAS audio_url: {filepath}")
            any_remaining = True

if not any_remaining:
    print("✅ All clean! No audio_url remaining in sentence objects.")
