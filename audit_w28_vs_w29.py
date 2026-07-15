#!/usr/bin/env python3
"""audit_w28_vs_w29.py - Detailed part content audit W28 vs W29"""
import json

w28 = json.load(open('public/data/lessons/W28.json'))
w29 = json.load(open('public/data/lessons/W29.json'))

# W28 vocab PART 2 titles per session
print('=== W28 PART 2 VOCAB TITLES ===')
for sn in [0, 1, 2]:
    p2_28 = w28['sessions'][sn]['parts'][3]
    print('  S%d: %s' % (sn+1, p2_28['title']))

print()
print('=== W29 PART 1 split point (B. Vocab at line) ===')
for sn in [0, 1, 2]:
    p1 = w29['sessions'][sn]['parts'][2]
    split_idx = None
    for i, line in enumerate(p1['content']):
        if line.startswith('B. Vocabulary'):
            split_idx = i
            break
    print('  S%d: split at line %s (total=%d)' % (sn+1, split_idx, len(p1['content'])))

print()
print('=== W29 PART3 LISTENING content (S1) ===')
p3 = w29['sessions'][0]['parts'][4]
print('Title:', p3['title'])
for line in p3['content']:
    print('  |', line[:100])

print()
print('=== W28 PART4 LISTENING title per session ===')
for sn in [0, 1, 2]:
    p4 = w28['sessions'][sn]['parts'][5]
    print('  S%d: %s' % (sn+1, p4['title']))

print()
print('=== W29 PART5 STEM content (S1) ===')
p5 = w29['sessions'][0]['parts'][6]
print('Title:', p5['title'])
for line in p5['content']:
    print('  |', line[:100])

print()
print('=== W28 PART6 STEM titles ===')
for sn in [0, 1, 2]:
    p6 = w28['sessions'][sn]['parts'][5]
    print('  S%d: %s' % (sn+1, p6['title']))

print()
print('=== W29 PART7 PORTFOLIO (S1) ===')
p7 = w29['sessions'][0]['parts'][8]
print('Title:', p7['title'])
for line in p7['content']:
    print('  |', line[:120])

print()
print('=== W28 PART8 PORTFOLIO titles per session ===')
for sn in [0, 1, 2]:
    p8 = w28['sessions'][sn]['parts'][9]
    print('  S%d: %s' % (sn+1, p8['title']))
    print('   First 2:', w28['sessions'][sn]['parts'][9]['content'][:2])

print()
print('=== W29 task_cards_by_session keys ===')
print(list(w29.get('task_cards_by_session', {}).keys()))
print('=== W28 task_cards_by_session keys ===')
print(list(w28.get('task_cards_by_session', {}).keys()))

print()
print('=== W29 quick_ref ===')
print(w29['quick_ref'])


w28 = json.load(open('public/data/lessons/W28.json'))
w29 = json.load(open('public/data/lessons/W29.json'))

# 1. Top-level keys
k28 = set(w28.keys())
k29 = set(w29.keys())
print('=== TOP-LEVEL KEYS ===')
print('W28 keys:', sorted(k28))
print('W29 keys:', sorted(k29))
print('Missing in W29:', k28 - k29)
print('Extra in W29:', k29 - k28)

# 2. quick_ref
print()
print('=== QUICK_REF ===')
print('W28 keys:', list(w28['quick_ref'].keys()))
print('W29 keys:', list(w29['quick_ref'].keys()))
for k in w28['quick_ref']:
    if k not in w29['quick_ref']:
        print('  MISSING in W29: [%s]' % k)
for k in w29['quick_ref']:
    if k not in w28['quick_ref']:
        print('  EXTRA in W29:   [%s]' % k)

# 3. vocab_tiers
print()
print('=== VOCAB_TIERS ===')
print('W28 count:', len(w28['vocab_tiers']), '| sample keys:', list(w28['vocab_tiers'][0].keys()) if w28['vocab_tiers'] else [])
print('W29 count:', len(w29['vocab_tiers']), '| sample keys:', list(w29['vocab_tiers'][0].keys()) if w29['vocab_tiers'] else [])

# 4. sessions
print()
print('=== SESSIONS STRUCTURE ===')
for label, w in [('W28', w28), ('W29', w29)]:
    ss = w.get('sessions', [])
    s2 = w.get('sessions_2', [])
    s5 = w.get('sessions_5', [])
    print('%s: sessions=%d sessions_2=%d sessions_5=%d' % (label, len(ss), len(s2), len(s5)))
    for s in ss:
        parts = s.get('parts', [])
        print('  S%d: %d parts' % (s['session'], len(parts)))
        for p in parts:
            t = p.get('title', '')
            c = p.get('content', [])
            cl = len(c) if isinstance(c, list) else 'str'
            print('    [%-60s] content_lines=%s' % (t[:60], cl))

# 5. sessions_2 detail
print()
print('=== sessions_2 PART TITLES ===')
for label, w in [('W28', w28), ('W29', w29)]:
    s2 = w.get('sessions_2', [])
    if s2:
        print('%s sessions_2:' % label)
        for s in s2:
            print('  S%d:' % s['session'])
            for p in s.get('parts', []):
                print('    [%s]' % p.get('title','')[:80])
    else:
        print('%s sessions_2: EMPTY' % label)

# 6. sessions_5 detail
print()
print('=== sessions_5 PART TITLES ===')
for label, w in [('W28', w28), ('W29', w29)]:
    s5 = w.get('sessions_5', [])
    if s5:
        print('%s sessions_5:' % label)
        for s in s5:
            print('  S%d:' % s['session'])
            for p in s.get('parts', []):
                print('    [%s]' % p.get('title','')[:80])
    else:
        print('%s sessions_5: EMPTY' % label)

# 7. answer_key
print()
print('=== ANSWER_KEY ===')
print('W28 answer_key lines:', len(w28.get('answer_key', [])))
print('W29 answer_key lines:', len(w29.get('answer_key', [])))
print('W28 answer_key_by_session keys:', list(w28.get('answer_key_by_session', {}).keys()))
print('W29 answer_key_by_session keys:', list(w29.get('answer_key_by_session', {}).keys()))
for sk in ['s1', 's2', 's3']:
    l28 = len(w28.get('answer_key_by_session', {}).get(sk, []))
    l29 = len(w29.get('answer_key_by_session', {}).get(sk, []))
    print('  answer_key_by_session[%s]: W28=%d W29=%d' % (sk, l28, l29))

# 8. task_cards
print()
print('=== TASK_CARDS ===')
print('W28 task_cards lines:', len(w28.get('task_cards', [])))
print('W29 task_cards lines:', len(w29.get('task_cards', [])))
print('W28 task_cards_by_session:', {k: len(v) for k, v in w28.get('task_cards_by_session', {}).items()})
print('W29 task_cards_by_session:', {k: len(v) for k, v in w29.get('task_cards_by_session', {}).items()})

# 9. games
print()
print('=== GAMES ===')
print('W28 games:', len(w28.get('games', [])))
print('W29 games:', len(w29.get('games', [])))
if w28.get('games'):
    print('W28 game[0]:', str(w28['games'][0])[:200])
if w29.get('games'):
    print('W29 game[0]:', str(w29['games'][0])[:200])

# 10. video_prompts
print()
print('=== VIDEO_PROMPTS ===')
vp28 = w28.get('video_prompts', {})
vp29 = w29.get('video_prompts', {})
print('W28 video_prompts keys:', list(vp28.keys()))
print('W29 video_prompts keys:', list(vp29.keys()))
for k in vp28:
    v28 = vp28[k]
    v29 = vp29.get(k, None)
    if v29 is None:
        print('  MISSING in W29: video_prompts[%s]' % k)
    else:
        k28v = set(v28.keys()) if isinstance(v28, dict) else None
        k29v = set(v29.keys()) if isinstance(v29, dict) else None
        if k28v and k29v and k28v != k29v:
            print('  video_prompts[%s]: W28=%s W29=%s' % (k, k28v, k29v))

# 11. teacher_contents
print()
print('=== TEACHER_CONTENTS ===')
for label, w in [('W28', w28), ('W29', w29)]:
    tc = w.get('teacher_contents', [])
    print('%s teacher_contents: %d sessions' % (label, len(tc)))
    for t in tc:
        ls = t.get('listening_script', {})
        fields = {
            'ls.text': len(ls.get('text', '')),
            'ls.dictation': len(ls.get('dictation', [])),
            'speaking_notes': len(t.get('speaking_notes', '')),
            'stem_extension': len(t.get('stem_extension', '')),
            'in_class_speaking': len(t.get('in_class_speaking', '')),
            'vc_answer_key': len(t.get('vc_answer_key', '')),
        }
        print('  S%d: %s' % (t['session'], fields))
