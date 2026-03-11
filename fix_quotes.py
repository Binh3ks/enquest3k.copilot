#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = "src/data/weeks/week_14/explore.js"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace ALL curly quotes with straight quotes
# Curly double quotes
content = content.replace('\u201c', '"')  # "
content = content.replace('\u201d', '"')  # "

# Curly single quotes  
content = content.replace('\u2018', "'")  # '
content = content.replace('\u2019', "'")  # '

# Now we need to escape the double quotes that are INSIDE the string values
# The issue is in lines like: 
# content_en: "... They describe their talents: "I can sing!" or "I am good at drawing!" ..."
# We need to escape those internal double quotes

import re

# Find content_en and content_vi and escape internal quotes
def escape_internal_quotes(match):
    key = match.group(1)
    value = match.group(2)
    # Escape any double quotes inside the value
    value_escaped = value.replace('\\"', '"').replace('"', '\\"')
    return f'{key}: "{value_escaped}",'

# Pattern to match content_en or content_vi with their values
pattern = r'(content_(?:en|vi)):\s*"([^"]*(?:"[^"]*)*)",'

# This won't work for multiline... let's do it differently
# Split bylines and process content_en and content_vi specially

lines = content.split('\n')
result = []
in_content = False
content_buffer = []
content_key = None

for line in lines:
    stripped = line.strip()
    
    if stripped.startswith('content_en:') or stripped.startswith('content_vi:'):
        # Start of content
        in_content = True
        content_key = 'content_en' if stripped.startswith('content_en:') else 'content_vi'
        # Remove the key part
        content_start = stripped[len(content_key) + 1:].strip()
        if content_start.startswith('"'):
            content_start = content_start[1:]  # Remove opening quote
        content_buffer = [content_start]
        
        # Check if it ends on the same line
        if content_buffer[0].rstrip().endswith('",'):
            # Single line content
            content_text = content_buffer[0][:-2]  # Remove  closing "
,            # Escape internal quotes
            content_text = content_text.replace('"', '\\"')
            result.append(f'  {content_key}: "{content_text}",')
            in_content = False
            content_buffer = []
            content_key = None
    elif in_content:
        if stripped.endswith('",'):
            # End of content
            content_buffer.append(line.rstrip()[:-2])  # Remove closing ",
            # Join all content
            full_content = '\n'.join(content_buffer)[:-1]  # Remove the last opening quote
            # Escape internal quotes
            full_content = full_content.replace('"', '\\"')
            result.append(f'  {content_key}: "{full_content}",')
            in_content = False
            content_buffer = []
            content_key = None
        else:
            content_buffer.append(line.rstrip())
    else:
        result.append(line.rstrip())

content = '\n'.join(result)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed all quotes in explore.js")
