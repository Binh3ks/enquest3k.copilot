import os
import sys
import glob
import re

# Tự động detect thư mục gốc của project (nơi chứa script này)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_PATH = os.path.join(SCRIPT_DIR, "public", "images")

def process_folder_by_prompt(folder_name, prompt_file):
    # Kiểm tra file prompt có tồn tại không
    if not os.path.exists(prompt_file):
        print(f"⚠️ File prompt không tồn tại: {prompt_file}")
        print(f"   Bỏ qua thư mục: {folder_name}")
        return
    
    folder_path = os.path.join(BASE_PATH, folder_name)
    if not os.path.exists(folder_path):
        print(f"⚠️ Thư mục không tồn tại: {folder_path}")
        return

    print(f"--- Đang xử lý thư mục: {folder_name} ---")

    # Đọc danh sách filename từ file prompt (theo thứ tự)
    filenames = []
    with open(prompt_file, 'r', encoding='utf-8') as f:
        for line in f:
            match = re.search(r'Filename: ([^\.]+\.jpg)', line)
            if match:
                filenames.append(match.group(1))

    # Lấy danh sách file ảnh hiện có và parse số thứ tự từ tên file
    image_files = [fn for fn in os.listdir(folder_path) if fn.lower().endswith(('.png', '.jpg', '.jpeg'))]
    
    # Tạo dict mapping: số thứ tự -> tên file
    file_map = {}
    for fname in image_files:
        # Parse số thứ tự đầu tiên trong tên file (vd: 1_1... -> 1, 13_13... -> 13)
        match = re.match(r'^(\d+)_', fname)
        if match:
            idx = int(match.group(1))
            file_map[idx] = fname
    
    # Đổi tên file theo mapping số thứ tự
    for prompt_idx, new_filename in enumerate(filenames, start=1):
        if prompt_idx in file_map:
            old_filename = file_map[prompt_idx]
            old_path = os.path.join(folder_path, old_filename)
            new_path = os.path.join(folder_path, new_filename)
            
            if old_path != new_path:
                # Nếu file đích đã tồn tại, thêm hậu tố để tránh ghi đè
                counter = 1
                final_path = new_path
                while os.path.exists(final_path):
                    final_path = os.path.join(folder_path, f"{os.path.splitext(new_filename)[0]}_{counter}.jpg")
                    counter += 1
                os.rename(old_path, final_path)
                print(f"✅ Đã đổi: {old_filename} -> {os.path.basename(final_path)}")
        else:
            print(f"⚠️ Không tìm thấy file với số thứ tự {prompt_idx} cho prompt: {new_filename}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Sử dụng: python auto_rename.py [Số tuần]")
        print("Ví dụ: python auto_rename.py 6")
        sys.exit(1)

    week_num = sys.argv[1]
    
    # Chuẩn hóa số tuần
    week_num_clean = str(int(week_num))  # Bỏ số 0: "07" -> "7" (cho file prompt)
    week_num_padded = week_num.zfill(2)  # Thêm số 0: "7" -> "07" (format có số 0)

    # Đường dẫn file prompt (dùng week_7 không có số 0)
    prompt_adv = os.path.join(SCRIPT_DIR, "MASS_Final", "Image prompts", f"week_{week_num_clean}_image_prompts.txt")
    prompt_easy = os.path.join(SCRIPT_DIR, "MASS_Final", "Image prompts", f"week_{week_num_clean}_easy_image_prompts.txt")

    # Kiểm tra thư mục nào tồn tại (có số 0 hoặc không số 0)
    folder_with_zero = f"week{week_num_padded}"  # week07
    folder_no_zero = f"week{week_num_clean}"     # week7
    
    # Ưu tiên folder có số 0, fallback về không số 0
    if os.path.exists(os.path.join(BASE_PATH, folder_with_zero)):
        process_folder_by_prompt(folder_with_zero, prompt_adv)
        process_folder_by_prompt(f"{folder_with_zero}_easy", prompt_easy)
    elif os.path.exists(os.path.join(BASE_PATH, folder_no_zero)):
        print(f"⚠️ Tìm thấy thư mục {folder_no_zero} (không có số 0)")
        process_folder_by_prompt(folder_no_zero, prompt_adv)
        process_folder_by_prompt(f"{folder_no_zero}_easy", prompt_easy)
    else:
        print(f"⚠️ Không tìm thấy thư mục week{week_num_padded} hoặc week{week_num_clean}")
