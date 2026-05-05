#!/usr/bin/env python3
"""
Test parse of W28 standalone DOCX.
Run from project root: python3 test_parse_w28.py
"""
import sys, json
sys.path.insert(0, 'scripts')
import parse_docx_lessons as pml

DOCX = 'Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/lesson_plans/output/W28_Lesson_Plan.docx'
doc, paras, body_items, para_to_bi = pml.load_doc(DOCX)
ranges, order = pml.find_week_ranges(paras)
wstart, wend = ranges[28]
result = pml.process_week(doc, paras, body_items, para_to_bi, 28, wstart, wend)

print('Keys:', list(result.keys()))
print('Sessions:', len(result['sessions']))
print('Vocab_tiers type:', type(result['vocab_tiers']), 'len:', len(result['vocab_tiers']))
print('Vocab_tiers[0]:', json.dumps(result['vocab_tiers'][0], ensure_ascii=False)[:200])
print()
for s in result['sessions']:
    parts_titles = [p['title'] for p in s['parts']]
    print('Session %d: %d parts' % (s['session'], len(parts_titles)))
    for t in parts_titles:
        print('   ', t[:70])
print()
print('Answer key lines:', len(result['answer_key']))
print('Task cards lines:', len(result['task_cards']))
print('Video prompts keys:', list(result.get('video_prompts', {}).keys()))
