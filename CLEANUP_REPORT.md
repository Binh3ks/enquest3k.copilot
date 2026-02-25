# 🧹 ENGQUEST APP CLEANUP REPORT
**Date**: January 30, 2026  
**Total Cleanup Size**: ~1.17 GB

---

## 📦 1. BACKUP FOLDERS (966 MB) - ❌ DELETE

### Extracted Backup Snapshots
| Folder | Size | Purpose | Status |
|--------|------|---------|--------|
| `backup_snapshot` | 244 MB | SNAPSHOT_W7_W2_Piper_V3.zip extracted | ❌ DELETE |
| `backup_snapshot2` | 184 MB | Not used | ❌ DELETE |
| `backup_w7_w2_piper` | 184 MB | SNAPSHOT_W7_W2_Piper.zip extracted | ❌ DELETE |

**Reason**: These are temporary extracted backups. Original .zip files are in `/Volumes/MY DOCUMENT/Apps/_BACKUPS/`

---

## 🎤 2. VOICE TRAINING DATASETS (554 MB) - ❌ DELETE

### Training Datasets (No longer needed)
| Folder | Size | Purpose | Status |
|--------|------|---------|--------|
| `my_dataset` | 220 MB | Training dataset (main) | ❌ DELETE |
| `my_dataset_mark` | 192 MB | Mark voice training | ❌ DELETE |
| `my_dataset_karen` | 142 MB | Karen voice training | ❌ DELETE |

**Reason**: 
- These datasets were used to train custom Piper TTS voices
- Training is complete, final models are in `assets/models/`
- No longer need raw training data

---

## 🔊 3. PIPER VOICE MODELS (418 MB) - ⚠️ REVIEW

### Current Voice Models
| File | Size | Usage | Recommendation |
|------|------|-------|----------------|
| `en_US-lessac-high.onnx` | 109 MB | ✅ Currently using (Ms. Nova) | ✅ KEEP |
| `en_US-lessac-high.onnx.json` | 4.8 KB | Config for lessac | ✅ KEEP |
| `en_US-ryan-high.onnx` | 115 MB | Male narrator voice | ⚠️ KEEP (future use) |
| `en_US-libritts-high.onnx` | 130 MB | OLD voice (replaced) | ❌ DELETE |
| `en_US-libritts-high.onnx.json` | 20 KB | Config for old voice | ❌ DELETE |
| `nova.onnx` | 60 MB | Custom trained voice? | ⚠️ CHECK USAGE |
| `nova.onnx.json` | 4.1 KB | Config for custom | ⚠️ CHECK USAGE |

**Questions**:
1. Is `nova.onnx` (60MB) being used? Or can delete?
2. Keep `en_US-ryan-high.onnx` for future male narrator?

---

## 📝 4. TRAINING SCRIPTS - ⚠️ REVIEW

### Python Scripts
| File | Purpose | Status |
|------|---------|--------|
| `scripts/prep_dataset.py` | Prepare voice training data | ⚠️ KEEP (might reuse) |
| `scripts/tts_server.py` | ✅ Piper TTS server (ACTIVE) | ✅ KEEP |
| `scripts/RUN_DATASET_PREP.sh` | Shell script for prep | ⚠️ KEEP with prep_dataset.py |

**Recommendation**: Keep scripts for future voice training

---

## 🗂️ 5. LOGS FOLDER (68 KB) - ✅ KEEP

- Size: 68 KB (very small)
- Files: 6 log files
- Useful for debugging
- **Recommendation**: ✅ KEEP

---

## 📊 CLEANUP SUMMARY

### ✅ SAFE TO DELETE NOW (1.12 GB):
```bash
# Backup folders (966 MB)
backup_snapshot/
backup_snapshot2/
backup_w7_w2_piper/

# Voice training datasets (554 MB)
my_dataset/
my_dataset_mark/
my_dataset_karen/

# Old Piper voice model (130 MB)
assets/models/en_US-libritts-high.onnx
assets/models/en_US-libritts-high.onnx.json
```

### ⚠️ NEED YOUR DECISION:

1. **nova.onnx (60 MB)**: Is this custom voice being used?
2. **en_US-ryan-high.onnx (115 MB)**: Keep for future male narrator?

### ✅ MUST KEEP:
- `assets/models/en_US-lessac-high.onnx` (current Ms. Nova voice)
- `scripts/tts_server.py` (TTS server)
- `logs/` (debugging)

---

## 🚀 CLEANUP COMMANDS

### Step 1: Delete Backup Folders (966 MB)
```bash
cd /Users/binhnguyen/Downloads/Engquest3k
rm -rf backup_snapshot backup_snapshot2 backup_w7_w2_piper
```

### Step 2: Delete Training Datasets (554 MB)
```bash
rm -rf my_dataset my_dataset_mark my_dataset_karen
```

### Step 3: Delete Old Voice Model (130 MB)
```bash
rm -f assets/models/en_US-libritts-high.onnx
rm -f assets/models/en_US-libritts-high.onnx.json
```

### Step 4 (Optional): Delete Custom Voice if not used
```bash
# Only if nova.onnx is NOT being used
rm -f assets/models/nova.onnx
rm -f assets/models/nova.onnx.json
```

---

## 📋 AFTER CLEANUP

**Current Size**: ~4.5 GB  
**After Cleanup**: ~3.3 GB  
**Space Saved**: ~1.2 GB

**Final Structure**:
```
Engquest3k/
├── assets/models/
│   ├── en_US-lessac-high.onnx (109MB) ✅ Current voice
│   ├── en_US-ryan-high.onnx (115MB) ⚠️ Keep for future?
│   └── nova.onnx (60MB) ⚠️ Check usage
├── scripts/
│   ├── tts_server.py ✅ Active
│   └── prep_dataset.py ⚠️ Keep for future training
├── src/ ✅ App code
├── public/ ✅ Static assets
└── logs/ ✅ Debug logs (68KB)
```

---

## ❓ QUESTIONS FOR YOU:

1. **nova.onnx**: Có đang dùng không? Xóa được không?
2. **en_US-ryan-high.onnx**: Giữ lại cho male narrator tương lai?
3. **prep_dataset.py**: Giữ để train voice mới sau này?

**Vui lòng confirm để tôi chạy cleanup commands!** ✅
