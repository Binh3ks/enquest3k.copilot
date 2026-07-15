#!/usr/bin/env python3
"""Remove remaining conversation_cards code from FreeTalkTab.jsx using line-based approach."""

FILE = "/Users/binhnguyen/Downloads/Engquest3k/src/modules/ai_tutor/tabs/FreeTalkTab.jsx"

with open(FILE, "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

def find_line(needle, start=0):
    for i in range(start, len(lines)):
        if needle in lines[i]:
            return i
    return -1

# ─────────────────────────────────────────────────────────────────────────────
# A. Remove the helper functions block + START_CONVERSATION handler
#    Start: "      // 💬 CONVERSATION CARDS: Detect START_CONVERSATION and initialize"
#    (which is also the line before the helpers like extractSayOptions etc.)
#    End (exclusive): "      if (userMessage.startsWith('START_SPARK:')) {"
# ─────────────────────────────────────────────────────────────────────────────
line_cc_detect = find_line("CONVERSATION CARDS: Detect START_CONVERSATION and initialize")
line_spark_start = find_line("if (userMessage.startsWith('START_SPARK:'))")

print(f"A. CC detect at line {line_cc_detect+1}, START_SPARK at line {line_spark_start+1}")

if line_cc_detect >= 0 and line_spark_start >= 0 and line_cc_detect < line_spark_start:
    # Keep lines before the CC block, and lines from START_SPARK onwards
    # But the helpers (extractSayOptions etc.) are still needed for Spark Talk? Let's check.
    # extractSayOptions is not needed anymore (no exchange data)
    # getExchangeHints - not needed
    # stripSayScaffold - not needed
    # cleanAIForTTS - not needed
    # So we can safely remove everything from cc_detect up to (not including) START_SPARK line
    removed = lines[line_cc_detect:line_spark_start]
    lines = lines[:line_cc_detect] + lines[line_spark_start:]
    print(f"✅ A. Removed {len(removed)} lines (CC detect + helpers + START_CONVERSATION handler)")
else:
    print("❌ A. Could not find block boundaries")

# ─────────────────────────────────────────────────────────────────────────────
# B. Remove the in_conversation validation block
#    Start: "      // 💬 CONVERSATION CARDS: Validate student response"
#    End (exclusive): "      // 🔥 STEP 1: Detect START_ROLEPLAY"  (look for STEP 1 or a different marker)
# ─────────────────────────────────────────────────────────────────────────────
line_cc_validate = find_line("CONVERSATION CARDS: Validate student response during ongoing conversation")
# The end marker: look for ROLEPLAY detection start
line_roleplay_detect = find_line("Detect START_ROLEPLAY and update LOCAL variable immediately")

print(f"B. CC validate at line {line_cc_validate+1}, roleplay detect at line {line_roleplay_detect+1}")

if line_cc_validate >= 0 and line_roleplay_detect >= 0 and line_cc_validate < line_roleplay_detect:
    removed = lines[line_cc_validate:line_roleplay_detect]
    lines = lines[:line_cc_validate] + ["\n"] + lines[line_roleplay_detect:]
    print(f"✅ B. Removed {len(removed)} lines (in_conversation validation block)")
else:
    print("❌ B. Could not find in_conversation validation block")

# ─────────────────────────────────────────────────────────────────────────────
# C. Remove conversationCards declaration line
# ─────────────────────────────────────────────────────────────────────────────
line_cc_decl = find_line("const conversationCards = weekRealData?.conversation_cards || [];")
if line_cc_decl >= 0:
    # Remove this line and the comment above it if present
    if "Get conversation cards from weekRealData" in lines[line_cc_decl - 1]:
        lines = lines[:line_cc_decl - 1] + lines[line_cc_decl + 1:]
        print(f"✅ C. Removed conversationCards declaration + comment")
    else:
        lines = lines[:line_cc_decl] + lines[line_cc_decl + 1:]
        print(f"✅ C. Removed conversationCards declaration")
else:
    print("❌ C. conversationCards declaration not found")

# ─────────────────────────────────────────────────────────────────────────────
# D. Remove activeConversation useState line
# ─────────────────────────────────────────────────────────────────────────────
line_ac = find_line("const [activeConversation, setActiveConversation] = useState(null)")
if line_ac >= 0:
    # Remove this line and the comment above it if present
    if "CONVERSATION CARDS STATE" in lines[line_ac - 1]:
        lines = lines[:line_ac - 1] + lines[line_ac + 1:]
        print(f"✅ D. Removed activeConversation state + comment")
    else:
        lines = lines[:line_ac] + lines[line_ac + 1:]
        print(f"✅ D. Removed activeConversation state")
else:
    print("❌ D. activeConversation state not found (may have been removed already by step 1)")

# ─────────────────────────────────────────────────────────────────────────────
# E. Remove handleConversationSelect function (if still present)
# ─────────────────────────────────────────────────────────────────────────────
line_hcs = find_line("handleConversationSelect")
if line_hcs >= 0:
    print(f"⚠️  E. handleConversationSelect still at line {line_hcs+1}")
else:
    print("✅ E. handleConversationSelect already gone")

# ─────────────────────────────────────────────────────────────────────────────
# F. Add useSparkTalk for action button (needed in useEffect and handlers)
#    Make sure sparkTalks is declared BEFORE the useEffect that needs it
# ─────────────────────────────────────────────────────────────────────────────
line_st = find_line("const sparkTalks = weekRealData?.spark_talk || [];")
line_ue = find_line("selectionModes.includes(mode)")
print(f"F. sparkTalks at line {line_st+1}, useEffect at line {line_ue+1}")

# ─────────────────────────────────────────────────────────────────────────────
# G. Fix the 'in_conversation' reference in roleplay-end block (line ~1101)
# ─────────────────────────────────────────────────────────────────────────────
line_rp_end = find_line("mode === 'in_conversation' && turnCount >= 19")
if line_rp_end >= 0:
    lines[line_rp_end] = lines[line_rp_end].replace(
        "mode === 'in_conversation' && turnCount >= 19",
        "mode === 'in_spark' && turnCount >= 19"
    )
    print(f"✅ G. Fixed roleplay-end in_conversation reference at line {line_rp_end+1}")
else:
    print("❌ G. Could not find roleplay-end in_conversation reference")

# ─────────────────────────────────────────────────────────────────────────────
# Write back
# ─────────────────────────────────────────────────────────────────────────────
with open(FILE, "w", encoding="utf-8") as f:
    f.writelines(lines)

# Final check
content = "".join(lines)
checks = [
    ("activeConversation", "activeConversation"),
    ("conversationCards", "conversationCards"),
    ("in_conversation", "in_conversation"),
    ("selecting_conversation", "selecting_conversation"),
    ("idleBlocked", "idleBlocked"),
    ("START_CONVERSATION", "START_CONVERSATION"),
]
print("\n── Final check ──")
for term, label in checks:
    count = content.count(term)
    status = "✅ 0" if count == 0 else f"⚠️  {count}"
    print(f"  {status}  {label}")

print(f"\nFinal file: {len(lines)} lines")
