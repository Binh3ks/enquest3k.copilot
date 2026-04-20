#!/usr/bin/env python3
"""Test iterating body elements in order"""
import docx
from lxml import etree

WNS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

def cell_texts(tbl_el):
    rows = tbl_el.findall(f'.//{{{WNS}}}tr')
    if not rows:
        return []
    cells = rows[0].findall(f'.//{{{WNS}}}t')
    return [c.text or '' for c in cells]

doc = docx.Document('Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W01-24.docx')
count = 0
for el in doc.element.body:
    tag = el.tag.split('}')[1] if '}' in el.tag else el.tag
    if tag == 'p':
        texts = [r.text or '' for r in el.findall(f'.//{{{WNS}}}t')]
        t = ''.join(texts).strip()
        if t:
            print(f'P: {repr(t[:90])}')
    elif tag == 'tbl':
        cells = cell_texts(el)
        print(f'TBL: {repr(" | ".join(cells)[:90])}')
    count += 1
    if count > 80:
        break
