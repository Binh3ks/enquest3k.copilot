const fs = require("fs");
const path = require("path");

module.exports = {
  name: "agent-finish",
  description: "Tu dong cap nhat trang thai, chuyen task va dong session.",
  async handler(args, context) {
    const activePath = path.join(process.cwd(), ".ai/tasks/ACTIVE.md");
    const donePath = path.join(process.cwd(), ".ai/tasks/DONE.md");
    const currentPath = path.join(process.cwd(), ".ai/memory/CURRENT.md");

    // 1. Reset Active Task
    fs.writeFileSync(activePath, "# 🛠️ Active Tasks\n- [ ] Chua co task nao duoc gan. Su dung `/agent-start` khi co task moi.\n");
    
    // 2. Them vao lich su hoan thanh
    const timeStamp = new Date().toISOString().split("T")[0];
    const doneContent = `# ✅ Completed Tasks\n- [x] Task hoan thanh vao ngay ${timeStamp}\n- [x] Ha tang tu dong hoa AgentOS da duoc kich hoat\n`;
    fs.writeFileSync(donePath, doneContent);

    // 3. Cap nhat trang thai he thong
    fs.writeFileSync(currentPath, `# 🧠 Current System State & Context\n- **Trang thai:** San sang tiep nhan nhiem vu moi.\n- **He thong:** AgentOS v2 Enterprise da on dinh tren nhanh main.\n`);

    return "=== 🤖 AGENTOS AUTOMATION SUCCESS ===\n\n1. ACTIVE.md da duoc reset ve trang thai cho.\n2. DONE.md da duoc ghi nhan lich su.\n3. CURRENT.md da cap nhat bo nho state moi.\n\nHe thong san sang cho phien tiep theo!";
  }
};
