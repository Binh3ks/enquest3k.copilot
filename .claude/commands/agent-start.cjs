const fs = require("fs");
const path = require("path");

// CANONICAL MEMORY ROOT — hardcoded to project absolute path so /start works
// from any cwd (Claude Code may run agents from any working directory).
const MEMORY_ROOT = "/Users/binhnguyen/projects/Engquest3k/.ai";

module.exports = {
  name: "agent-start",
  description: "Khoi dong phien lam viec moi, nap toan bo context va memory cua AgentOS.",
  async handler(args, context) {
    const specPath = path.join(MEMORY_ROOT, "AGENTOS_SPEC.md");
    const memoryPath = path.join(MEMORY_ROOT, "memory/CURRENT.md");
    const tasksPath = path.join(MEMORY_ROOT, "tasks/ACTIVE.md");
    const claudePath = path.join(MEMORY_ROOT, "..", "CLAUDE.md");

    let output = "=== 🤖 AGENTOS INITIALIZED ===\n";
    if (fs.existsSync(specPath)) output += "\n SPEC LOADED:\n" + fs.readFileSync(specPath, "utf8");
    if (fs.existsSync(memoryPath)) output += "\n MEMORY LOADED:\n" + fs.readFileSync(memoryPath, "utf8");
    if (fs.existsSync(tasksPath)) output += "\n TASKS LOADED:\n" + fs.readFileSync(tasksPath, "utf8");
    if (fs.existsSync(claudePath)) output += "\n TOOLS LOADED:\n" + fs.readFileSync(claudePath, "utf8").slice(0, 500) + "...";

    return output + "\n\nAgentOS has fully synchronized your context. Ready for your instructions!";
  },
};