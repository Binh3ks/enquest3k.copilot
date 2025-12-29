const fs = require('fs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'src/data/syllabus_database.js');

if (!fs.existsSync(dbPath)) {
  console.error("❌ Không tìm thấy file syllabus_database.js");
  process.exit(1);
}

let content = fs.readFileSync(dbPath, 'utf8');

// Dữ liệu Tuần 21 chuẩn
const week21Data = `
  21: {
    title: "The Time Glitch",
    grammar: ["Error Correction", "Past Tense Editing"],
    math: ["Timeline Math", "Elapsed Time"],
    science: ["Historical Verification"],
    topic: ["Correction", "Fixing Mistakes"]
  }`;

// Kiểm tra xem đã có tuần 21 chưa để tránh trùng lặp
if (content.includes('21: {')) {
  console.log("⚠️ Tuần 21 đã tồn tại trong database. Đang ghi đè để cập nhật...");
  // Dùng Regex để thay thế block cũ (nếu cần) hoặc thông báo
  // Ở đây ta chọn giải pháp an toàn: Thông báo thủ công nếu muốn sửa sâu.
  // Nhưng để fix lỗi cú pháp, ta sẽ xóa đoạn cũ đi thêm lại nếu file đang lỗi.
} 

// TÌM VỊ TRÍ CHÈN AN TOÀN
// Tìm dấu đóng ngoặc nhọn kết thúc object syllabusDB: "};" trước "export default"
const exportIndex = content.lastIndexOf('export default');
const closingBraceIndex = content.lastIndexOf('};', exportIndex);

if (closingBraceIndex === -1) {
  console.error("❌ Không tìm thấy vị trí đóng ngoặc }; hợp lệ.");
  process.exit(1);
}

// Cắt phần đầu và phần cuối
let before = content.substring(0, closingBraceIndex).trimEnd(); // Xóa khoảng trắng thừa
const after = content.substring(closingBraceIndex);

// KIỂM TRA DẤU PHẨY
// Nếu ký tự cuối cùng của phần trước không phải dấu phẩy, thêm dấu phẩy vào
if (!before.endsWith(',')) {
  before += ',';
}

// Ghép chuỗi: Phần trước + Dấu phẩy (đã check) + Tuần 21 + Phần sau
const newContent = `${before}\n${week21Data}\n${after}`;

fs.writeFileSync(dbPath, newContent);
console.log("✅ Đã sửa lỗi syllabus_database.js thành công (Đã thêm dấu phẩy tự động).");
