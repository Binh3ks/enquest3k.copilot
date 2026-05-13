from _add_clue_and_questions import make_clue_statement, pick_best, _FINITE_VERB_RE

a = "some words on the board"
print("FINITE_VERB match:", _FINITE_VERB_RE.search(a))
print("first word:", a.split()[0].lower())

q = "What does the teacher write?"
best = pick_best(['words', 'some words on the board'])
print("best:", repr(best))
print("stmt:", make_clue_statement(q, best))

# Test ordering issue
import re
ql = q.strip().rstrip('?').lower()
print("ql:", ql)
m = re.match(r"^what (does|did) ((?:(?:the|a|an) )?[\w']+) do\s*(.*)$", ql)
print("what does S do match:", m)
m2 = re.match(r"^what (does|did) ((?:(?:the|a|an) )?[\w']+) (\w+)\s*(.*)$", ql)
print("what does S V match:", m2, "groups:", m2.groups() if m2 else None)
