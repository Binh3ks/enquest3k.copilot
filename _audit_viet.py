import json, re

with open('mcp-server/data/lessons/W28.json', encoding='utf-8') as f:
    d = json.load(f)

print('=== All [O] lines ===')
for key in ['sessions', 'sessions_2', 'sessions_5']:
    for s in d.get(key, []):
        for p in s.get('parts', []):
            for i, ln in enumerate(p.get('content', [])):
                if '[O]' in str(ln):
                    print(f'{key} S{s["session"]} [{p["title"][:25]}] L{i}: {repr(str(ln))[:110]}')

print()
print('=== Vietnamese text ===')
viet_chars = re.compile(r'[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]', re.I)

for key in ['sessions', 'sessions_2', 'sessions_5']:
    for s in d.get(key, []):
        for p in s.get('parts', []):
            for i, ln in enumerate(p.get('content', [])):
                if viet_chars.search(str(ln)):
                    print(f'{key} S{s["session"]} [{p["title"][:25]}] L{i}: {repr(str(ln))[:110]}')

for tc in d.get('teacher_contents', []):
    sn = tc.get('session', '?')
    for field in ['listening_script', 'speaking_notes', 'stem_extension', 'in_class_speaking', 'vc_answer_key']:
        val = str(tc.get(field, ''))
        if viet_chars.search(val):
            for i, ln in enumerate(val.split('\n')):
                if viet_chars.search(ln):
                    print(f'teacher_contents S{sn} [{field}] L{i}: {repr(ln)[:110]}')
