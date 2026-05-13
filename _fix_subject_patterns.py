#!/usr/bin/env python3
"""Fix subject patterns to allow 2-word subjects like 'Detective Luna'."""
import re

path = '/Users/binhnguyen/Downloads/Engquest3k/_add_clue_and_questions.py'
text = open(path).read()

OLD = r"((?:(?:the|a|an) )?[\w']+"
NEW = r"((?:(?:the|a|an) )?[\w']+(?:\s[\w']+)?"

# Only replace within re.match() patterns (inside string literals in the function)
# Replace all occurrences of the old subject pattern with new
count = text.count(OLD)
print(f"Found {count} occurrences of old pattern")
text2 = text.replace(OLD, NEW)
open(path, 'w').write(text2)
print("Done")
