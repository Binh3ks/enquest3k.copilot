#!/bin/bash

# Script tự động xóa wrapper và flatten cấu trúc thư mục
# Usage: bash flatten_structure.sh

set -e  # Exit on error

WRAPPER="/Users/binhnguyen/Downloads/engquest3k_githubco"
APP_DIR="$WRAPPER/Engquest3k"
TARGET="/Users/binhnguyen/Downloads/Engquest3k"

echo "╔══════════════════════════════════════════╗"
echo "║  FLATTEN STRUCTURE SCRIPT                ║"
echo "║  Remove wrapper, keep app only           ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# Step 1: Kiểm tra wrapper tồn tại
if [ ! -d "$WRAPPER" ]; then
    echo "❌ Wrapper không tồn tại: $WRAPPER"
    exit 1
fi

if [ ! -d "$APP_DIR" ]; then
    echo "❌ App không tồn tại: $APP_DIR"
    exit 1
fi

# Step 2: Hiển thị nội dung wrapper
echo "📁 Nội dung wrapper:"
cd "$WRAPPER"
ls -A
echo ""

# Step 3: Kiểm tra .git
if [ -d "$WRAPPER/.git" ]; then
    echo "⚠️  Phát hiện .git trong wrapper"
    read -p "   Bạn có muốn backup .git vào app? (y/n): " backup_git
else
    echo "✅ Không có .git trong wrapper"
    backup_git="n"
fi
echo ""

# Step 4: Kiểm tra target đã tồn tại chưa
if [ -d "$TARGET" ]; then
    echo "⚠️  Thư mục đích đã tồn tại: $TARGET"
    read -p "   Xóa và tạo mới? (y/n): " overwrite
    if [ "$overwrite" = "y" ]; then
        echo "🗑️  Đang xóa thư mục cũ..."
        rm -rf "$TARGET"
    else
        echo "❌ Hủy bỏ. Vui lòng xóa $TARGET thủ công trước."
        exit 1
    fi
fi
echo ""

# Step 5: Xác nhận cuối
echo "📋 Sắp thực hiện:"
echo "   1. Move: $APP_DIR"
echo "      → $TARGET"
if [ "$backup_git" = "y" ]; then
    echo "   2. Backup .git vào app"
fi
echo "   3. Xóa wrapper: $WRAPPER"
echo ""
read -p "Tiếp tục? (y/n): " confirm

if [ "$confirm" != "y" ]; then
    echo "❌ Hủy bỏ"
    exit 0
fi
echo ""

# Step 6: Move app
echo "🚚 Đang di chuyển app..."
mv "$APP_DIR" "$TARGET"
echo "✅ Đã move app sang $TARGET"

# Step 7: Backup .git nếu cần
if [ "$backup_git" = "y" ] && [ -d "$WRAPPER/.git" ]; then
    echo "💾 Đang backup .git..."
    cp -R "$WRAPPER/.git" "$TARGET/"
    echo "✅ Đã backup .git"
fi

# Step 8: Xóa wrapper
echo "🗑️  Đang xóa wrapper..."
rm -rf "$WRAPPER"
echo "✅ Đã xóa wrapper"

# Step 9: Kiểm tra kết quả
echo ""
echo "╔══════════════════════════════════════════╗"
echo "║  ✅ HOÀN THÀNH                           ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "📁 Cấu trúc mới:"
ls -1 "$TARGET" | head -15
echo ""
echo "🚀 Mở VSCode:"
echo "   code $TARGET"
echo ""
echo "🔧 Hoặc cd vào thư mục:"
echo "   cd $TARGET"
