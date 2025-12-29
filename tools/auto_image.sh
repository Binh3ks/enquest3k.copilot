#!/bin/bash
# Script để tự động tải ảnh từ API Imagine 4.0 sau khi nhận JSON Prompts từ Studio.

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
# API URL (Leave Key empty, Canvas will inject it)
API_URL="https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key="

echo "Bắt đầu tải ảnh Imagine 4.0 cho Tuần $week_id vào thư mục $IMAGE_DIR..."
echo "--------------------------------------------------------"

for task_json in $tasks; do
    filename=$(echo "$task_json" | jq -r '.filename')
    prompt=$(echo "$task_json" | jq -r '.prompt')
    word=$(echo "$task_json" | jq -r '.word')
    
    echo "⏳ Đang tạo ảnh cho từ: $word (File: $filename)"

    # PAYLOAD IMAGEN 4.0
    # Đảm bảo aspect ratio 1:1 cho hình ảnh từ vựng.
    PAYLOAD=$(jq -n --arg p "$prompt" '{
        "instances": {
            "prompt": $p
        },
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": "1:1" 
        }
    }')
    
    # Sử dụng exponential backoff cho API call
    MAX_RETRIES=3
    RETRY_DELAY=5
    
    for i in $(seq 1 $MAX_RETRIES); do
        API_RESPONSE=$(curl -s -X POST "$API_URL" \
            -H 'Content-Type: application/json' \
            -d "$PAYLOAD")

        BASE64_DATA=$(echo "$API_RESPONSE" | jq -r '.predictions[0].bytesBase64Encoded')
        
        if [ ! -z "$BASE64_DATA" ] && [ "$BASE64_DATA" != "null" ]; then
            break # Thành công, thoát vòng lặp retry
        fi
        
        if [ $i -lt $MAX_RETRIES ]; then
            echo "⚠️ Lỗi API (Thử lại $i/$MAX_RETRIES sau $RETRY_DELAY giây): Không nhận được base64 data. Phản hồi: $API_RESPONSE"
            sleep $RETRY_DELAY
            RETRY_DELAY=$((RETRY_DELAY * 2))
        else
            echo "❌ Lỗi: Không nhận được dữ liệu ảnh base64 sau $MAX_RETRIES lần thử cho $word. Bỏ qua tác vụ này."
            continue 2 # Tiếp tục vòng lặp task_json
        fi
    done

    # Giải mã base64 và lưu vào file
    # Ensure filename is .png and directory exists
    CLEAN_FILENAME=$(echo "$filename" | sed 's/\..*$/.png/') 
    
    # Kiểm tra nếu giải mã base64 có vấn đề (Mac/Linux compatible)
    echo "$BASE64_DATA" | base64 --decode 2>/dev/null > "$IMAGE_DIR/$CLEAN_FILENAME"
    
    if [ $? -eq 0 ] && [ -s "$IMAGE_DIR/$CLEAN_FILENAME" ]; then
        echo "✅ Hoàn tất tải ảnh và lưu tại: $IMAGE_DIR/$CLEAN_FILENAME"
    else
        echo "❌ Lỗi khi giải mã base64 hoặc lưu file cho $word. Vui lòng kiểm tra lại cài đặt 'base64 --decode' (cần có trên Mac/Linux)."
    fi

done

echo "--------------------------------------------------------"
echo "TẤT CẢ TÁC VỤ TẢI ẢNH ĐÃ HOÀN TẤT. VUI LÒNG RELOAD BROWSER"
