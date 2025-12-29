import json
import os
import argparse
import sys
from pathlib import Path

# Thử import thư viện OpenAI, nếu chưa có thì báo lỗi thân thiện
try:
    from openai import OpenAI
except ImportError:
    print("❌ LỖI: Chưa cài thư viện OpenAI. Hãy chạy: pip install openai")
    sys.exit(1)

def generate_audio(tasks_file, provider, voice_name):
    # 1. Đọc danh sách task
    if not os.path.exists(tasks_file):
        print(f"❌ Không tìm thấy file task: {tasks_file}")
        return

    with open(tasks_file, 'r', encoding='utf-8') as f:
        tasks = json.load(f)

    print(f"🚀 BẮT ĐẦU XỬ LÝ {len(tasks)} FILE AUDIO...")
    print(f"   Provider: {provider} | Voice: {voice_name}")
    print(f"   Nguyên tắc: BỎ QUA (SKIP) nếu file đã tồn tại.\n")

    client = None
    if provider == 'openai':
        api_key = os.environ.get("OPENAI_API_KEY")
        if not api_key:
            print("❌ LỖI: Thiếu biến môi trường OPENAI_API_KEY")
            return
        client = OpenAI(api_key=api_key)

    count_skipped = 0
    count_generated = 0
    count_error = 0

    for i, task in enumerate(tasks):
        text = task.get('text', '').strip()
        # Lấy đường dẫn tuyệt đối từ JSON
        output_path = task.get('output_path')
        
        # Override voice nếu task có chỉ định riêng (ví dụ Nam/Nữ)
        # Tuy nhiên với OpenAI thường chỉ dùng 1 voice 'alloy' hoặc 'nova' cho thống nhất, 
        # trừ khi bạn muốn map cụ thể. Ở đây ta dùng voice chung từ tham số dòng lệnh cho đơn giản.
        # Hoặc logic map: Neural2-D (Male) -> alloy, Neural2-F (Female) -> nova.
        current_voice = voice_name
        if provider == 'openai':
            if "Neural2-F" in task.get('voice', ''): current_voice = "nova" # Nữ
            elif "Neural2-D" in task.get('voice', ''): current_voice = "alloy" # Nam
            elif "Neural2-E" in task.get('voice', ''): current_voice = "echo" # Trầm

        if not text or not output_path:
            continue

        # --- LOGIC SKIP QUAN TRỌNG ---
        # ✅ FIX: Kiểm tra FILE tồn tại (không phải folder), và có kích thước > 0
        if os.path.isfile(output_path) and os.path.getsize(output_path) > 0:
            # print(f"   ⏭️  [SKIP] {os.path.basename(output_path)}")
            count_skipped += 1
            continue

        # Tạo thư mục cha nếu chưa có
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        print(f"   🎙️  [{i+1}/{len(tasks)}] Generating: {os.path.basename(output_path)}...")
        
        try:
            if provider == 'openai':
                response = client.audio.speech.create(
                    model="tts-1",
                    voice=current_voice,
                    input=text
                )
                response.stream_to_file(output_path)
                count_generated += 1
            else:
                print("Provider not supported in this script version.")
                break
        except Exception as e:
            print(f"   ❌ Lỗi tạo file {output_path}: {e}")
            count_error += 1

    print("\n================ TỔNG KẾT ================")
    print(f"⏭️  Đã bỏ qua (Có sẵn): {count_skipped}")
    print(f"✅ Đã tạo mới        : {count_generated}")
    print(f"❌ Lỗi               : {count_error}")
    print("==========================================")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--provider", default="openai")
    parser.add_argument("--voice", default="alloy")
    args = parser.parse_args()

    tasks_file = os.path.join(os.getcwd(), 'tools', 'audio_tasks.json')
    generate_audio(tasks_file, args.provider, args.voice)
