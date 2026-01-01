#!/bin/bash

# scripts/mem-chat.sh - Ghi insights từ chat session + rebuild context

echo "🧠 CHAT SESSION MEMORY CAPTURE"
echo "================================"

echo "1️⃣ Adding chat insights..."
npm run memory:chat

echo ""
echo "2️⃣ Rebuilding context..."
npm run context:build

echo ""
echo "✅ COMPLETE! Chat insights saved to memory & context updated."
echo ""
echo "📋 Next steps:"
echo "   - Open new Copilot chat"  
echo "   - Use: @workspace #file:copilot-context.md"
echo ""