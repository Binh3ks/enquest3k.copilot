#!/bin/bash
# 🧪 QUICK TEST SCRIPT - Free Talk General Knowledge
# Run this to verify Free Talk improvements

echo "🧪 TESTING FREE TALK - GENERAL KNOWLEDGE & QUESTION-ASKING"
echo "=========================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 CHECKLIST - Test these features:${NC}"
echo ""

echo "✅ 1. AI-GENERATED GREETING (NO HARDCODED)"
echo "   Open AI Tutor → Free Talk tab"
echo "   Expected: AI generates natural greeting like:"
echo "   - 'Hello! I am Ms. Nova. What do you like to do after school?'"
echo "   - 'Hi! I am Ms. Nova, your English friend. What makes you happy?'"
echo "   ❌ NOT EXPECTED: 'Hello! I am Ms. Nova. What is your name?' (old hardcoded)"
echo ""

echo "✅ 2. GENERAL KNOWLEDGE TOPICS (Beyond Week Content)"
echo "   Try asking AI about:"
echo "   - Animals: 'What is your favorite animal?'"
echo "   - Colors: 'What color do you like?'"
echo "   - Weather: 'What is the weather like today?'"
echo "   - Food: 'What food do you like?'"
echo "   Expected: AI answers naturally (e.g., 'I love elephants! They are big and smart.')"
echo ""

echo "✅ 3. QUESTION-ASKING PROMPTS (Turn 3, 6, 9)"
echo "   Count your conversation turns:"
echo "   - Turn 3: AI should say 'What about you? Can you ask me a question?'"
echo "   - Turn 6: AI prompts again"
echo "   - Turn 9: AI prompts again"
echo "   Expected: AI encourages YOU to ask questions (practice forming questions)"
echo ""

echo "✅ 4. AI RESPONDS TO YOUR QUESTIONS"
echo "   When AI says 'Can you ask me a question?', try:"
echo "   - 'What is your favorite color?'"
echo "   - 'Do you like dogs or cats?'"
echo "   - 'What is your favorite food?'"
echo "   Expected: AI answers naturally, then asks you back"
echo ""

echo "✅ 5. CONVERSATION ENDS AT TURN 15"
echo "   Keep talking until Turn 15"
echo "   Expected: AI gives warm closing (no more questions)"
echo "   Example: 'I loved talking with you! Keep practicing English!'"
echo ""

echo -e "${YELLOW}================================================${NC}"
echo -e "${BLUE}🚀 READY TO TEST?${NC}"
echo ""
echo "1. Open browser: http://localhost:5177"
echo "2. Login (or register new user)"
echo "3. Click 'AI Tutor' → 'Free Talk' tab"
echo "4. Follow the checklist above"
echo "5. Report any bugs you find!"
echo ""
echo -e "${GREEN}✅ Backend running: http://localhost:5001${NC}"
echo -e "${GREEN}✅ Frontend running: http://localhost:5177${NC}"
echo ""
echo "================================================"
echo "💡 TIP: Open browser DevTools (F12) → Console"
echo "    Watch for logs like:"
echo "    - '💬 FreeTalk mode - passing context'"
echo "    - '🤖 Full AI Response Object'"
echo "    - '💡 Opening hints (contextual & scrambled)'"
echo ""
echo "🐛 IF YOU SEE BUGS:"
echo "    - Take screenshot"
echo "    - Copy console error messages"
echo "    - Note which turn the bug happened"
echo "    - Report to developer"
echo ""
echo "================================================"
echo "Press CTRL+C to exit this script"
echo "Good luck testing! 🎉"
