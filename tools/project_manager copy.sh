#!/bin/bash

# =========================================================================
# ENGQUEST PROJECT MANAGER (v4.2 - HỆ THỐNG CỨU HỘ VÀ BACKUP NÂNG CAO)
# - Đảm bảo Backup/Restore luôn chứa tất cả các file/folder (trừ node_modules)
# - Chế độ Restore: Xóa đè các file gốc để thay thế code.
# - Chế độ Fix: Tự động sửa lỗi môi trường Vite/Plugin.
# =========================================================================

BACKUP_DIR="/Users/binhnguyen/Downloads/_BACKUPS"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILENAME="SNAPSHOT_${TIMESTAMP}.zip"
# Danh sách các mục CẦN LOẠI TRỪ khỏi file nén
EXCLUDE_LIST="./node_modules/* ./.git/* ./.DS_Store ./.debris/* ./package-lock.json ./yarn.lock"

# --- CHỨC NĂNG 1: BACKUP (Quét toàn bộ thư mục trừ EXCLUDE) ---
function run_backup() {
    echo "=========================================="
    echo ">>> BẮT ĐẦU BACKUP VÀO $BACKUP_DIR"
    echo "=========================================="
    mkdir -p "$BACKUP_DIR"
    
    # Sử dụng find và xargs để xây dựng danh sách file/folder, loại trừ thư mục chính
    echo "Đang nén toàn bộ dự án ngoại trừ node_modules..."
    find . -path "./node_modules" -prune -o -path "./.git" -prune -o -path "./.debris" -prune -o -type f -print0 | xargs -0 zip -r "${BACKUP_DIR}/${BACKUP_FILENAME}" 
    
    if [ $? -eq 0 ]; then
        echo "✅ BACKUP THÀNH CÔNG: ${BACKUP_DIR}/${BACKUP_FILENAME}"
    else
        echo "❌ LỖI: Không thể tạo file backup."
    fi
}

# --- CHỨC NĂNG 2: RESTORE (Phương pháp Swap An Toàn - Xóa đè code cũ) ---
function run_restore() {
    echo "=========================================="
    echo ">>> CHẾ ĐỘ RESTORE: Khôi Phục Code Ghi Đè"
    echo "=========================================="
    
    if [ ! "$(ls -A ${BACKUP_DIR})" ]; then
        echo "❌ LỖI: Thư mục backup rỗng. Không có gì để khôi phục."
        return
    fi

    echo "Chọn file backup để khôi phục (ví dụ: SNAPSHOT_20230101_120000.zip):"
    ls -l "${BACKUP_DIR}" | grep "SNAPSHOT"
    read -p "Nhập tên file backup: " RESTORE_FILE
    
    FULL_PATH="${BACKUP_DIR}/${RESTORE_FILE}"

    if [ ! -f "$FULL_PATH" ]; then
        echo "❌ LỖI: Không tìm thấy file $RESTORE_FILE."
        return
    fi

    # LỆNH PHẢN BIỆN: XÓA CÁC FILE CỐ ĐỊNH TRONG BẢN KHÔI PHỤC (để tránh lỗi code cũ dư thừa)
    echo ">>> Đang xóa các file/folder code cũ để đảm bảo thay thế hoàn toàn..."
    rm -rf src tools public
    rm -f package.json vite.config.js tailwind.config.js index.html
    
    echo ">>> Đang giải nén file $RESTORE_FILE (Ghi đè/Khôi phục hoàn toàn code)..."
    unzip -o "$FULL_PATH" -d .
    
    if [ $? -eq 0 ]; then
        echo "✅ KHÔI PHỤC CODE THÀNH CÔNG. Code đã được cập nhật."
        echo "================================================================"
        echo "⚠️ BẮT BUỘC: Cần chạy chế độ [3] FIX để cài lại Dependencies (npm install)."
        echo "Lý do: File backup KHÔNG chứa node_modules, cần cài lại cho đúng môi trường Node hiện tại."
        echo "================================================================"
    else
        echo "❌ LỖI: Giải nén thất bại."
    fi
}

# --- CHỨC NĂNG 3: FIX (Sửa lỗi môi trường Node/Vite) ---
function run_fix() {
    echo "=========================================="
    echo ">>> CHẾ ĐỘ FIX (Sửa lỗi Node/Vite/Dependencies)"
    echo "=========================================="
    
    echo "1. Xóa các thư mục không ổn định..."
    rm -rf node_modules .vite/ package-lock.json yarn.lock
    
    echo "2. Cài đặt lại Dependencies Gốc..."
    npm install
    
    # Sửa lỗi chính xác: Nâng cấp Vite và Plugin React (Giải quyết xung đột Node v25/ARM64)
    echo "3. Nâng cấp Vite và React Plugin (FIX XUNG ĐỘT)..."
    npm update vite @vitejs/plugin-react
    
    # Bổ sung logic kiểm tra và tạo lại index.html
    if [ ! -f index.html ]; then
        echo "4. ❗ CẢNH BÁO: Không tìm thấy index.html. Đang tạo lại file cơ bản..."
        echo '<!DOCTYPE html><html lang="en"><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>' > index.html
    fi

    echo "✅ FIX HOÀN TẤT. Vui lòng chạy npm run dev."
}

# --- MENU CHÍNH ---
function show_menu() {
    echo "=========================================="
    echo "   QUẢN LÝ DỰ ÁN ENGQUEST"
    echo "=========================================="
    echo "1) Backup (Tạo Snapshot Mới)"
    echo "2) Restore (Khôi phục từ File Zip)"
    echo "3) FIX (Sửa lỗi môi trường/Dependencies)"
    echo "4) Chạy App (npm run dev)"
    echo "q) Thoát"
    echo "------------------------------------------"
}

while true; do
    show_menu
    read -p "Chọn tác vụ: " choice
    case "$choice" in
        1) run_backup ;;
        2) run_restore ;;
        3) run_fix ;;
        4) npm run dev ;;
        q) exit 0 ;;
        *) echo "Lựa chọn không hợp lệ. Vui lòng thử lại." ;;
    esac
    echo ""
done
