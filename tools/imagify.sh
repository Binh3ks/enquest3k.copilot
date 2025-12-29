#!/bin/bash
# Script để tự động tải ảnh từ API Gemini/Imagen sau khi nhận JSON Prompts từ Admin Studio.

# Đọc JSON từ STDIN
json_input=$(cat)

if [ -z "$json_input" ]; then
    echo "Lỗi: Không có dữ liệu JSON nào được cung cấp. Hãy copy JSON từ Studio và dán lại."
    exit 1
fi

# 1. TRÍCH XUẤT THÔNG TIN CẦN THIẾT TỪ JSON
week_id=$(echo "$json_input" | jq -r '.weekId')
tasks=$(echo "$json_input" | jq -c '.tasks[]')

if [ -z "$week_id" ] || [ "$tasks" = "null" ]; then
    echo "Lỗi: Cấu trúc JSON không hợp lệ. Vui lòng kiểm tra lại JSON đầu vào."
    exit 1
fi

# Khai báo biến
IMAGE_DIR="./public/images/week$week_id"
mkdir -p "$IMAGE_DIR"
API_URL="https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key="
# API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=" # Dùng cho Gemini 2.5 Image

echo "Bắt đầu tải ảnh cho Tuần $week_id vào thư mục $IMAGE_DIR..."
echo "--------------------------------------------------------"

for task_json in $tasks; do
    # Tách các trường cần thiết
    filename=$(echo "$task_json" | jq -r '.filename')
    prompt=$(echo "$task_json" | jq -r '.prompt')
    word=$(echo "$task_json" | jq -r '.word')
    
    echo "⏳ Đang tạo ảnh cho từ: $word (File: $filename)"

    # PAYLOAD IMAGEN 4.0
    PAYLOAD=$(jq -n --arg p "$prompt" '{
        "instances": {
            "prompt": $p
        },
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": "16:9" 
        }
    }')
    
    # Thực hiện gọi API và lưu trữ phản hồi (Server-side download)
    API_RESPONSE=$(curl -s -X POST "$API_URL" \
        -H 'Content-Type: application/json' \
        -d "$PAYLOAD")

    # Trích xuất base64 data
    BASE64_DATA=$(echo "$API_RESPONSE" | jq -r '.predictions[0].bytesBase64Encoded')
    
    if [ -z "$BASE64_DATA" ] || [ "$BASE64_DATA" = "null" ]; then
        echo "❌ Lỗi: Không nhận được dữ liệu ảnh base64 hoặc lỗi server cho $word."
        echo "Chi tiết: $API_RESPONSE"
        continue
    fi
    
    # Giải mã base64 và lưu vào file
    # Tên file sẽ bị thay đổi thành .png vì API trả về định dạng PNG.
    CLEAN_FILENAME=$(echo "$filename" | sed 's/\..*$/.png/')
    echo "$BASE64_DATA" | base64 --decode > "$IMAGE_DIR/$CLEAN_FILENAME"
    
    if [ $? -eq 0 ]; then
        echo "✅ Hoàn tất tải ảnh và lưu tại: $IMAGE_DIR/$CLEAN_FILENAME"
    else
        echo "❌ Lỗi khi giải mã base64 hoặc lưu file cho $word."
    fi

done

echo "--------------------------------------------------------"
echo "TẤT CẢ TÁC VỤ TẢI ẢNH ĐÃ HOÀN TẤT. VUI LÒNG RELOAD BROWSER"

# Sửa lại image_url trong data file để khớp với tên file .png mới (Nếu cần)
# Ví dụ: sửa image_url: "/images/week1/student.jpg" thành "/images/week1/student.png"

