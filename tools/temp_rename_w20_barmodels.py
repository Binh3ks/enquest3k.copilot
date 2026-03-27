import os
import re

BASE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public", "images")

def rename_week20_barmodels():
    folder_path = os.path.join(BASE_PATH, "week20")
    if not os.path.exists(folder_path):
        print(f"⚠️ Thư mục không tồn tại: {folder_path}")
        return
    
    # Map file prefixes to bar model filenames (assuming ADVANCED mode)
    rename_map = {
        "old_1.jpg": "barmodel_w20_adv_p1.jpg",
        "new_1.jpg": "barmodel_w20_adv_p2.jpg",
        "building_1.jpg": "barmodel_w20_adv_p3.jpg",
        "tree_1.jpg": "barmodel_w20_adv_p4.jpg",
        "river_1.jpg": "barmodel_w20_adv_p5.jpg"
    }
    
    print("\n--- RENAME WEEK 20 BAR MODELS (ADVANCED) ---")
    success = 0
    for old_name, new_name in rename_map.items():
        old_path = os.path.join(folder_path, old_name)
        new_path = os.path.join(folder_path, new_name)
        
        if os.path.exists(old_path):
            os.rename(old_path, new_path)
            print(f"✅ {old_name} → {new_name}")
            success += 1
        else:
            print(f"⚠️ File not found: {old_name}")
    
    print(f"\n✨ Hoàn thành: {success}/{len(rename_map)} file được đổi tên")
    print(f"📁 Files are now in {folder_path}")

if __name__ == "__main__":
    rename_week20_barmodels()
