const fs = require("fs");
const path = require("path");

module.exports = {
  name: "agent-finish",
  description: "Ket thuc task, chay quality gate va cap nhat he thong memory.",
  async handler(args, context) {
    return "=== 🤖 AGENTOS TERMINATION WORKFLOW ===\n\nPlease perform the following steps:\n1. Run your validation scripts (e.g., `bash production_kit/tools/code_quality_gate.sh`).\n2. Update `.ai/tasks/DONE.md` with your completed objectives.\n3. Update `.ai/memory/CURRENT.md` with the new system state.\n4. Provide a Conventional Commit message for your changes.\n\nMemory updates required to maintain consistent state for OpenHands and other agents.";
  }
};
