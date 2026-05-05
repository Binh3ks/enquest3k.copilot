#!/usr/bin/env python3
import sys
sys.path.insert(0, 'scripts')
import parse_docx_lessons as pml
from parse_docx_lessons import tables_in_range, find_section

# W28 per-week DOCX (golden standard)
W28_FILE = 'Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/lesson_plans/output/W28_Lesson_Plan.docx'
doc28, paras28, bi28, p2bi28 = pml.load_doc(W28_FILE)
ranges28, _ = pml.find_week_ranges(paras28)
wstart28, wend28 = ranges28[28]

sec3 = find_section(paras28, wstart28, wend28, r'SECTION\s+3')
sec4 = find_section(paras28, sec3 + 1, wend28, r'SECTION\s+4')
print('=== W28 (per-week DOCX) SECTION 3 tables ===')
for idx, tbl in tables_in_range(doc28, bi28, p2bi28, sec3, sec4 or wend28):
    headers = [c.text.strip() for c in tbl.rows[0].cells]
    print('  Table idx=%d headers=%s rows=%d' % (idx, headers, len(tbl.rows)))
    for row in tbl.rows[:4]:
        cells = [c.text.strip() for c in row.cells]
        print('    ', cells)
    if len(tbl.rows) > 4:
        print('    ... (%d rows total)' % len(tbl.rows))

REF_FILE = 'Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W25-36.docx'
doc, paras, bi, p2bi = pml.load_doc(REF_FILE)
ranges, _ = pml.find_week_ranges(paras)

# Check all weeks 28-36 vocab tables
for wnum in [28, 29, 30, 31, 32, 33, 34, 35, 36]:
    wstart, wend = ranges[wnum]
    sec3 = find_section(paras, wstart, wend, r'SECTION\s+3')
    sec4 = find_section(paras, sec3 + 1, wend, r'SECTION\s+4')
    print('=== W%d (reference DOCX) SECTION 3 tables ===' % wnum)
    for idx, tbl in tables_in_range(doc, bi, p2bi, sec3, sec4 or wend):
        headers = [c.text.strip() for c in tbl.rows[0].cells]
        # Count data rows (skip header)
        data_rows = [r for r in tbl.rows[1:] if any(c.text.strip() for c in r.cells)]
        print('  Table idx=%d headers=%s data_rows=%d' % (idx, headers, len(data_rows)))
    print()
