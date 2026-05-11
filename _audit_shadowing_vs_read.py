import os
import re

def extract_read_title(filepath):
    try:
        content = open(filepath).read()
        m = re.search(r'title:\s*["\']([^"\']+)["\']', content)
        return m.group(1) if m else None
    except:
        return None

def extract_shadowing_sentences(filepath):
    try:
        content = open(filepath).read()
        # Match text_en or text field values (quoted)
        texts = re.findall(r'"text(?:_en)?":\s*"([^"]+)"', content)
        return texts
    except:
        return []

def extract_read_sentences(filepath):
    try:
        content = open(filepath).read()
        m = re.search(r'content_en:\s*"(.*?)"(?=,\s*\n|\s*content_vi)', content, re.DOTALL)
        if not m:
            # try backtick
            m = re.search(r'content_en:\s*`(.*?)`', content, re.DOTALL)
        if m:
            text = m.group(1).replace('**', '').replace('\n', ' ')
            return re.sub(r'\s+', ' ', text).strip()
    except:
        pass
    return None

problems = []

for mode_dir in ['weeks_easy', 'weeks']:
    base = f'src/data/{mode_dir}'
    if not os.path.exists(base):
        continue
    for week_dir in sorted(os.listdir(base)):
        if not week_dir.startswith('week_') or 'OLD' in week_dir or 'BACKUP' in week_dir:
            continue
        shadow_path = f'{base}/{week_dir}/shadowing.js'
        read_path = f'{base}/{week_dir}/read.js'
        if not os.path.exists(shadow_path) or not os.path.exists(read_path):
            continue

        shadow_sentences = extract_shadowing_sentences(shadow_path)
        read_text = extract_read_sentences(read_path)
        read_title = extract_read_title(read_path)
        shadow_title_m = re.search(r'title:\s*["\']([^"\']+)["\']', open(shadow_path).read())
        shadow_title = shadow_title_m.group(1) if shadow_title_m else None

        if not shadow_sentences:
            problems.append(f"NO_SENTENCES [{mode_dir}/{week_dir}]")
            continue

        # Check title match
        if read_title and shadow_title and read_title.lower() != shadow_title.lower():
            problems.append(f"TITLE_MISMATCH [{mode_dir}/{week_dir}] read='{read_title}' shadow='{shadow_title}'")

        # Check if shadowing sentence 1 appears in read text
        if read_text and shadow_sentences:
            s1 = shadow_sentences[0].replace('**', '').strip()
            if s1 and s1.lower() not in read_text.lower():
                problems.append(f"S1_NOT_IN_READ [{mode_dir}/{week_dir}] shadow_s1='{s1[:80]}' | read_start='{read_text[:80]}'")

for p in problems:
    print(p)
print(f"\nTotal issues: {len(problems)}")
