const fs = require("fs");
const path = require("path");

module.exports = {
  name: "agent-start",
  description: "Khoi dong phien lam viec moi, nap toan bo context va memory cua AgentOS.",
  async handler(args, context) {
    const specPath = path.join(process.cwd(), ".ai/AGENTOS_SPEC.md");
    const memoryPath = path.join(process.cwd(), ".ai/memory/CURRENT.md");
    const tasksPath = path.join(process.cwd(), ".ai/tasks/ACTIVE.md");
    const claudePath = path.join(process.cwd(), "CLAUDE.md");

    let output = "=== 🤖 AGENTOS INITIALIZED ===\n";
    if (fs.existsSync(specPath)) output += "\n SPEC LOADED:\n" + fs.readFileSync(specPath, "utf8");
    if (fs.existsSync(memoryPath)) output += "\n MEMORY LOADED:\n" + fs.readFileSync(memoryPath, "utf8");
    if (fs.existsSync(tasksPath)) output += "\n TASKS LOADED:\n" + fs.readFileSync(tasksPath, "utf8");
    if (fs.existsSync(claudePath)) output += "\n TOOLS LOADED:\n" + fs.readFileSync(claudePath, "utf8").slice(0, 500) + "...";

    return output + "\n\nAgentOS has fully synchronized your context. Ready for your instructions!";
  }
};
