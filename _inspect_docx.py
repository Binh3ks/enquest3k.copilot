#!/usr/bin/env python3
import sys, re
sys.path.insert(0, 'scripts')
import parse_docx_lessons as pml

FILE = 'Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W25-36.docx'
doc, paras, body_items, para_to_bi = pml.load_doc(FILE)
ranges, order = pml.find_week_ranges(paras)

for wnum in [31, 35, 36]:
    wstart, wend = ranges[wnum]
    ss = pml.find_session_starts(paras, wstart, wend)
    print('W%d session_starts: %s' % (wnum, ss))
    for sn in [1, 2, 3]:
        s_start = ss.get(sn)
        if s_start is None:
            continue
        # Next session start or wend
        s_end = ss.get(sn+1) or wend
        print('  W%d S%d range [%d, %d]' % (wnum, sn, s_start, s_end))
        # Find SPEAKING CHECKPOINT
        found = False
        for i in range(s_start, s_end):
            t = paras[i][0]
            if re.search(r'SPEAKING CHECKPOINT', t, re.I):
                print('    CKPT at [%d]: %s' % (i, t[:80]))
                # Show next 5 lines
                for j in range(i+1, min(i+6, s_end)):
                    tt = paras[j][0]
                    if tt:
                        print('      [%d] %s' % (j, tt[:80]))
                found = True
                break
        if not found:
            print('    NO SPEAKING CHECKPOINT found in session range')
    print()
