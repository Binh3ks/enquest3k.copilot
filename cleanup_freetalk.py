#!/usr/bin/env python3
"""Clean up FreeTalkTab.jsx: remove conversation_cards logic, fix mode init, expose spark_talk for all weeks."""
import re

FILE = "/Users/binhnguyen/Downloads/Engquest3k/src/modules/ai_tutor/tabs/FreeTalkTab.jsx"

with open(FILE, "r", encoding="utf-8") as f:
    src = f.read()

original_len = len(src)

# ─────────────────────────────────────────────────────────────────────────────
# 1. Remove idleBlocked + old mode useState block (keep activeActivityId etc.)
# ─────────────────────────────────────────────────────────────────────────────
old_state_block = """  const idleBlocked = weekNumber <= 7;

  const [mode, setMode] = useState(idleBlocked ? 'selecting_conversation' : 'idle'); // 'idle' | 'selecting_conversation' | 'in_conversation' | 'translation_help'
  const [activeActivityId, setActiveActivityId] = useState(null); // conversation card ID
  const [turnCount, setTurnCount] = useState(0); // Turn counter for CURRENT MODE
  // 🎮 Game / scenario state (used by word chain, 20Q, and compatibility checks)
  const [activeGame, setActiveGame] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);
  
  // 💬 CONVERSATION CARDS STATE
  const [activeConversation, setActiveConversation] = useState(null); // { cardId, currentExchange, totalExchanges, card }

  // 💬 SPARK TALK STATE
  const [activeSpark, setActiveSpark] = useState(null); // { sparkId, card, sparkTurnCount }
  
  const [modeTurnLimits] = useState({
    translation_help: Infinity, // 🚀 No limit for translation
    in_conversation: Infinity,  // 💬 No limit - structured dialogue completes based on exchanges
    idle: 15,                   // 💬 Free chat mode
  });"""

new_state_block = """  // 💬 SPARK TALK MODE STATE (init as 'idle'; useEffect below syncs to 'selecting_spark' once weekData loads)
  const [mode, setMode] = useState('idle'); // 'idle' | 'selecting_spark' | 'in_spark' | 'translation_help'
  const [activeActivityId, setActiveActivityId] = useState(null);
  const [turnCount, setTurnCount] = useState(0);
  // 🎮 Game / scenario state (used by word chain, 20Q, and compatibility checks)
  const [activeGame, setActiveGame] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);

  // 💬 SPARK TALK STATE
  const [activeSpark, setActiveSpark] = useState(null); // { sparkId, card, sparkTurnCount }
  
  const [modeTurnLimits] = useState({
    translation_help: Infinity,
    idle: 15,
  });"""

if old_state_block in src:
    src = src.replace(old_state_block, new_state_block, 1)
    print("✅ 1. Replaced state block")
else:
    print("❌ 1. State block NOT found — check manually")

# ─────────────────────────────────────────────────────────────────────────────
# 2. Remove conversationCards declaration + change sparkTalks/useSparkTalk block
#    → add useEffect for mode sync after sparkTalks is computed
# ─────────────────────────────────────────────────────────────────────────────
old_sparktalk_block = """  // 💬 Get conversation cards from weekRealData
  const conversationCards = weekRealData?.conversation_cards || [];

  // 💬 SPARK TALK: AI-driven personal expression bridged from the week's story
  // Prefer spark_talk over conversation_cards for W1-7
  const sparkTalks = weekRealData?.spark_talk || [];
  const useSparkTalk = sparkTalks.length > 0;
  """

new_sparktalk_block = """  // 💬 SPARK TALK: AI-driven personal expression bridged from the week's story
  const sparkTalks = weekRealData?.spark_talk || [];

  // Fix: useState('idle') ran before weekRealData was computed. Sync correct mode here.
  useEffect(() => {
    const selectionModes = ['idle', 'selecting_spark'];
    if (!selectionModes.includes(mode)) return; // Don't interrupt active conversations
    setMode(sparkTalks.length > 0 ? 'selecting_spark' : 'idle');
  }, [weekNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  """

if old_sparktalk_block in src:
    src = src.replace(old_sparktalk_block, new_sparktalk_block, 1)
    print("✅ 2. Replaced sparkTalks block + added useEffect")
else:
    print("❌ 2. sparkTalks block NOT found — check manually")

# ─────────────────────────────────────────────────────────────────────────────
# 3. Remove the entire in_conversation validation block (lines ~892-1050)
#    Start: "      // 💬 CONVERSATION CARDS: Validate student response during ongoing conversation"
#    End:   "      }\n      \n      // 🔥 STEP 1: Detect START_ROLEPLAY"
# ─────────────────────────────────────────────────────────────────────────────
cc_start = "      // 💬 CONVERSATION CARDS: Validate student response during ongoing conversation\n      if (mode === 'in_conversation' && activeConversation && !userMessage.startsWith('START_')) {"
cc_end = "      // 🔥 STEP 1: Detect START_ROLEPLAY and update LOCAL variable immediately"

if cc_start in src and cc_end in src:
    # Find the block and remove it
    idx_start = src.index(cc_start)
    idx_end = src.index(cc_end)
    src = src[:idx_start] + "\n      " + src[idx_end:]
    print("✅ 3. Removed in_conversation block")
else:
    print("❌ 3. Could not find in_conversation block markers")
    if cc_start not in src:
        print("   Missing start marker")
    if cc_end not in src:
        print("   Missing end marker (maybe uses different emoji)")

# ─────────────────────────────────────────────────────────────────────────────
# 4. Fix idleBlocked references that remain
# ─────────────────────────────────────────────────────────────────────────────
# a. In-spark timeout reset
src = src.replace(
    "setMode(idleBlocked ? defaultSelectMode : 'idle');\n            setActiveActivityId(null);\n            setTurnCount(0);\n            const sparkScore",
    "setMode(sparkTalks.length > 0 ? 'selecting_spark' : 'idle');\n            setActiveActivityId(null);\n            setTurnCount(0);\n            const sparkScore",
    1
)
print("✅ 4a. Fixed in-spark timeout setMode")

# b. In the roleplay-end block (line ~1122)
src = src.replace(
    "        setMode(idleBlocked ? 'selecting_conversation' : 'idle');\n        setActiveActivityId(null);\n        setTurnCount(0);\n        return;\n      }\n      \n      // ⚠️ Game turn limit removed",
    "        setMode(sparkTalks.length > 0 ? 'selecting_spark' : 'idle');\n        setActiveActivityId(null);\n        setTurnCount(0);\n        return;\n      }\n      \n      // ⚠️ Game turn limit removed",
    1
)
print("✅ 4b. Fixed roleplay-end setMode")

# c. Any other idleBlocked references
remaining_idle = src.count("idleBlocked")
if remaining_idle > 0:
    print(f"⚠️  {remaining_idle} 'idleBlocked' references still remain — fixing...")
    src = src.replace("idleBlocked ? defaultSelectMode : 'idle'", "sparkTalks.length > 0 ? 'selecting_spark' : 'idle'")
    src = src.replace("idleBlocked ? 'selecting_conversation' : 'idle'", "sparkTalks.length > 0 ? 'selecting_spark' : 'idle'")
    src = src.replace("idleBlocked ? defaultSelectMode : 'idle'", "sparkTalks.length > 0 ? 'selecting_spark' : 'idle'")
    print(f"   Remaining after fix: {src.count('idleBlocked')}")

# ─────────────────────────────────────────────────────────────────────────────
# 5. Remove handleConversationSelect function
# ─────────────────────────────────────────────────────────────────────────────
old_handle_conv = """  // ❌ handleGameSelect removed - Games moved to GameHub
  // ❌ handleRoleplaySelect removed - Roleplay deprecated, replaced by Conversation Cards
  
  // 💬 CONVERSATION CARDS: Handle conversation selection
  const handleConversationSelect = (cardId) => {
    const card = conversationCards.find(c => c.id === cardId);
    if (card) {
      handleSendMessage(`START_CONVERSATION: ${cardId}`);
    }
  };

  const handleStopActivity = () => {
    setMode(idleBlocked ? defaultSelectMode : 'idle');
    setActiveActivityId(null);
    setTurnCount(0);
    setActiveConversation(null);
    setActiveSpark(null);
    handleSendMessage('Stop');
  };"""

new_handle_conv = """  // ❌ handleGameSelect removed - Games moved to GameHub

  const handleStopActivity = () => {
    setMode(sparkTalks.length > 0 ? 'selecting_spark' : 'idle');
    setActiveActivityId(null);
    setTurnCount(0);
    setActiveSpark(null);
    handleSendMessage('Stop');
  };"""

if old_handle_conv in src:
    src = src.replace(old_handle_conv, new_handle_conv, 1)
    print("✅ 5. Removed handleConversationSelect, fixed handleStopActivity")
else:
    print("❌ 5. handleConversationSelect block NOT found")

# ─────────────────────────────────────────────────────────────────────────────
# 6. Fix mode checks that reference in_conversation or activeConversation
# ─────────────────────────────────────────────────────────────────────────────
# Stop button condition
src = src.replace(
    "(mode === 'playing_game' || mode === 'in_conversation' || mode === 'in_spark')",
    "(mode === 'playing_game' || mode === 'in_spark')"
)
print("✅ 6a. Fixed stop button mode check")

# Stats display with in_conversation
src = src.replace(
    "mode === 'in_conversation' ? `💬 Conversation: ${activeConversation?.currentExchange || 0}/${activeConversation?.totalExchanges || 0}` : '🎭 Roleplay'",
    "'✨ Spark Talk'"
)
print("✅ 6b. Fixed stats display")

# shouldHideHints
src = src.replace(
    "  const shouldHideHints = mode === 'in_conversation' || mode === 'in_spark';",
    "  const shouldHideHints = mode === 'in_spark';"
)
src = src.replace(
    "  const shouldHideHints = mode === 'in_conversation';",
    "  const shouldHideHints = mode === 'in_spark';"
)
print("✅ 6c. Fixed shouldHideHints")

# Line 303 area: mode !== 'selecting_game' && mode !== 'selecting_conversation'
src = src.replace(
    "mode !== 'selecting_game' && mode !== 'selecting_conversation'",
    "mode !== 'selecting_game' && mode !== 'selecting_spark'"
)
print("✅ 6d. Fixed mode guard")

# isInGameOrRoleplay check
src = src.replace(
    "const isInGameOrRoleplay = mode === 'in_conversation';",
    "const isInGameOrRoleplay = mode === 'in_spark';"
)
src = src.replace(
    "const wasInGameOrRoleplay = mode === 'in_conversation';",
    "const wasInGameOrRoleplay = mode === 'in_spark';"
)
print("✅ 6e. Fixed isInGameOrRoleplay")

# ─────────────────────────────────────────────────────────────────────────────
# 7. Remove actionClick setActiveConversation reference
# ─────────────────────────────────────────────────────────────────────────────
src = src.replace(
    "    setActiveConversation(null); // 💬 Clear conversation state\n    ",
    "    "
)
src = src.replace("    setActiveConversation(null); // 💬 Reset conversation state\n", "")
print("✅ 7. Removed setActiveConversation from actionClick")

# ─────────────────────────────────────────────────────────────────────────────
# 8. Remove the selecting_conversation UI block in JSX
# ─────────────────────────────────────────────────────────────────────────────
# Find and remove the conversation cards selection JSX block
ui_start = "        {/* 💬 CONVERSATION CARDS SELECTION (legacy fallback) */}\n        {mode === 'selecting_conversation' && ("
ui_end_marker = "        )}\n        \n        {/* ❌ REMOVED:"

if ui_start in src:
    idx_start = src.index(ui_start)
    idx_end = src.index(ui_end_marker, idx_start)
    src = src[:idx_start] + src[idx_end:]
    print("✅ 8. Removed selecting_conversation UI block")
else:
    # Try alternate marker
    ui_start2 = "        {/* 💬 CONVERSATION CARDS SELECTION */}\n        {mode === 'selecting_conversation' && ("
    if ui_start2 in src:
        idx_start = src.index(ui_start2)
        idx_end = src.index(ui_end_marker, idx_start)
        src = src[:idx_start] + src[idx_end:]
        print("✅ 8. Removed selecting_conversation UI block (v2)")
    else:
        print("❌ 8. Could not find selecting_conversation UI block")

# ─────────────────────────────────────────────────────────────────────────────
# 9. Remove START_CONVERSATION: handler from handleSendMessage
# ─────────────────────────────────────────────────────────────────────────────
sc_start = "      if (userMessage.startsWith('START_CONVERSATION:')) {"
sc_end_marker = "      if (userMessage.startsWith('START_SPARK:')) {"

if sc_start in src and sc_end_marker in src:
    idx_start = src.index(sc_start)
    idx_end = src.index(sc_end_marker)
    if idx_start < idx_end:
        src = src[:idx_start] + src[idx_end:]
        print("✅ 9. Removed START_CONVERSATION handler")
    else:
        print("⚠️  9. START_CONVERSATION comes AFTER START_SPARK — order unexpected, skipping")
else:
    print("❌ 9. Could not find START_CONVERSATION block markers")
    if sc_start not in src:
        print("   Missing START_CONVERSATION start")
    if sc_end_marker not in src:
        print("   Missing START_SPARK marker (maybe already removed?)")

# ─────────────────────────────────────────────────────────────────────────────
# Verify no more references
# ─────────────────────────────────────────────────────────────────────────────
checks = [
    ("idleBlocked", "idleBlocked references"),
    ("activeConversation", "activeConversation references"),
    ("conversationCards", "conversationCards references"),
    ("selecting_conversation", "selecting_conversation references"),
    ("in_conversation", "in_conversation references"),
    ("handleConversationSelect", "handleConversationSelect references"),
]
print("\n── Remaining references check ──")
for term, label in checks:
    count = src.count(term)
    status = "✅ 0" if count == 0 else f"⚠️  {count}"
    print(f"  {status}  {label}")

# ─────────────────────────────────────────────────────────────────────────────
# Write back
# ─────────────────────────────────────────────────────────────────────────────
with open(FILE, "w", encoding="utf-8") as f:
    f.write(src)

print(f"\n✅ Done. File changed from {original_len} → {len(src)} bytes ({len(src)-original_len:+d})")
