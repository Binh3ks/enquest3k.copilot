"""
Audit: Compare shadowing.js titles vs read.js titles across all weeks and modes.
Also check if shadowing sentences appear in read content.
"""
import os
import re
import glob

def extract_title(filepath):
    try:
        content = open(filepath).read()
        m = re.search(r'title:\s*["\']([^"\']+)["\']', content)
        return m.group(1) if m else None
    except:
        return None

def extract_script_sentences(filepath):
    """Extract sentences from script or sentences array"""
    try:
        content = open(filepath).read()
        # Match text fields in script/sentences (not 'vi:' values)
        # Pattern: text: "..." or text_en: "..."
        texts = re.findall(r'\btext(?:_en)?:\s*"([^"]+)"', content)
        return texts
    except:
        return []

def extract_read_content(filepath):
    """Extract the full reading text from read.js"""
    try:
        content = open(filepath).read()
        # Try content_en with backtick
        m = re.search(r'content_en:\s*`(.*?)`', content, re.DOTALL)
        if m:
            return m.group(1).replace('**', '').strip()
        # Try content_en with double quote (multiline)
        m = re.search(r'content_en:\s*"((?:[^"\\]|\\.)*)"', content, re.DOTALL)
        if m:
            return m.group(1).replace('**', '').strip()
    except:
        pass
    return None

problems = []
clean = []

for mode_dir in ['weeks_easy', 'weeks']:
    base = f'src/data/{mode_dir}'
    if not os.path.exists(base):
        continue
    for week_dir in sorted(os.listdir(base)):
        if not week_dir.startswith('week_') or 'OLD' in week_dir or 'BACKUP' in week_dir:
            continue
        shadow_path = f'{base}/{week_dir}/shadowing.js'
        read_path = f'{base}/{week_dir}/read.js'
        
        if not os.path.exists(shadow_path):
            problems.append(f"NO_SHADOWING_FILE [{mode_dir}/{week_dir}]")
            continue
        if not os.path.exists(read_path):
            problems.append(f"NO_READ_FILE [{mode_dir}/{week_dir}]")
            continue
        
        shadow_title = extract_title(shadow_path)
        read_title = extract_title(read_path)
        shadow_sentences = extract_script_sentences(shadow_path)
        read_content = extract_read_content(read_path)
        
        if not shadow_sentences:
            problems.append(f"NO_SENTENCES [{mode_dir}/{week_dir}] shadow_title='{shadow_title}'")
            continue
        
        # Check title match
        if read_title and shadow_title:
            rt = read_title.lower().strip()
            st = shadow_title.lower().strip()
            if rt != st:
                # Not necessarily a mismatch - shadowing can have a slightly different title
                # Flag only if they're very different (no common words)
                rt_words = set(rt.split())
                st_words = set(st.split())
                common = rt_words & st_words - {'a', 'an', 'the', 'of', 'at', 'in', 'on', 'my', 'is', 'are', 'was', 'to'}
                if len(common) == 0:
                    problems.append(f"TITLE_MISMATCH [{mode_dir}/{week_dir}] read='{read_title}' | shadow='{shadow_title}'")
        
        # Check if first shadowing sentence appears in read content
        if read_content and shadow_sentences:
            s1 = shadow_sentences[0].replace('**', '').strip()
            # Normalize whitespace
            read_norm = re.sub(r'\s+', ' ', read_content.lower())
            s1_norm = re.sub(r'\s+', ' ', s1.lower())
            
            if s1_norm and len(s1_norm) > 5 and s1_norm not in read_norm:
                # Check partial match (first 20 chars)
                s1_partial = s1_norm[:30]
                if s1_partial not in read_norm:
                    problems.append(f"S1_NOT_IN_READ [{mode_dir}/{week_dir}]\n   shadow_s1='{s1[:80]}'\n   read_start='{read_content[:100]}'")
                    continue
        
        clean.append(f"OK [{mode_dir}/{week_dir}] '{shadow_title}' ({len(shadow_sentences)} sentences)")

print("=== CLEAN ===")
for c in clean:
    print(c)

print("\n=== PROBLEMS ===")
for p in problems:
    print(p)

print(f"\n✅ Clean: {len(clean)} | ⚠️ Problems: {len(problems)}")
