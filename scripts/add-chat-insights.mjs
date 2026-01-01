#!/usr/bin/env node
// scripts/add-chat-insights.mjs
// Tool để thêm insights quan trọng từ chat sessions vào memory

import fs from "fs";
import path from "path";

const memoryFile = path.resolve("docs/memory.md");

// Chat insights từ session hiện tại
const chatInsights = [
  {
    type: "Discovery",
    content: "copilot-context.md outdated - Shows Week 2-17 MISSING but Week 2 actually complete with full structure (Advanced + Easy modes, voice config, AI Tutor checklist)."
  },
  {
    type: "Decision", 
    content: "Memory system needs chat session insights capture - Important discussions, design decisions, and implementation considerations from chat sessions must be preserved in memory for future reference."
  },
  {
    type: "Fact",
    content: "Week 2 has unique AI Tutor features - Special checklist in AITutor.jsx (line 1053) with tips and learning objectives specific to family vocabulary and Present Continuous grammar."
  },
  {
    type: "Rule",
    content: "Context rebuild required after major discoveries - When significant gaps found between documentation and reality, immediate context rebuild needed to sync copilot knowledge with actual project state."
  },
  {
    type: "Discovery",
    content: "Week 2 audio tasks generated in tools/audio_tasks.json for mindmap branches (week2_easy) - Shows asset generation pipeline working for completed weeks."
  },
  {
    type: "Constraint",
    content: "Memory entries in project_manager.sh were hardcoded and outdated - Need dynamic system to capture real-time project insights and decisions from active development sessions."
  },
  {
    type: "Decision",
    content: "Manual memory curation essential - Critical insights from chat sessions about project structure, implementation gaps, and strategic decisions must be manually reviewed and added to memory system."
  },
  {
    type: "Fact",
    content: "Week 2 structure complete - 14 station files in both modes: read.js, vocab.js, grammar.js, ask_ai.js, logic.js, dictation.js, shadowing.js, writing.js, explore.js, word_power.js, daily_watch.js, word_match.js, mindmap.js, index.js."
  },
  {
    type: "Rule",
    content: "Chat session memory capture workflow - (1) Review chat for insights (2) Add to add-chat-insights.mjs (3) Run script to append to memory (4) Rebuild context for next session."
  }
];

const date = new Date().toISOString().split("T")[0];

function addChatInsights() {
  console.log("🧠 Adding chat session insights to memory...");
  
  // Ensure memory file exists
  if (!fs.existsSync(memoryFile)) {
    fs.writeFileSync(memoryFile, "# Project Memory\n\n");
  }

  let addedCount = 0;
  const existingContent = fs.readFileSync(memoryFile, "utf8");
  
  for (const insight of chatInsights) {
    const entry = `
### ${insight.type} (${date})
- ${insight.content}
`.trimStart();

    // Check if this insight already exists (avoid duplicates)
    if (!existingContent.includes(insight.content)) {
      fs.appendFileSync(memoryFile, "\n" + entry + "\n");
      addedCount++;
      console.log(`✅ Added: ${insight.type} - ${insight.content.substring(0, 50)}...`);
    } else {
      console.log(`⏭️  Skip: ${insight.type} - Already exists`);
    }
  }
  
  console.log(`\n🎯 Summary: ${addedCount}/${chatInsights.length} new insights added to memory.md`);
  console.log("💡 Next: Run 'npm run context:build' or './scripts/mem.sh' to update copilot-context.md");
}

// Auto-run if called directly
if (process.argv[1] === import.meta.url.replace('file://', '')) {
  addChatInsights();
}

export { addChatInsights, chatInsights };