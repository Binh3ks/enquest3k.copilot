# EngQuest3K — Database Backup & Restore Guide

> Last updated: 2026-05-26

---

## Tổng quan

Hệ thống backup tự động bảo vệ toàn bộ dữ liệu Supabase PostgreSQL:
- **GitHub Actions**: chạy mỗi **15 phút**, commit vào branch `backup`
- Giữ **48 snapshots** gần nhất (~12 tiếng)
- Restore **từng bảng riêng biệt** hoặc toàn bộ cùng lúc

---

## Dữ liệu được backup

| Bảng | Mô tả | Số dòng |
|------|--------|---------|
| `users` | Tài khoản (kèm bcrypt password hash) | ~40 |
| `teacher_assignments` | Quan hệ Giáo viên → Học sinh | ~8 |
| `station_progress` | Tiến độ học tập (quan trọng nhất) | ~1600 |
| `lesson_plans_index` | Index giáo án theo tuần | 156 |
| `lesson_plans` | Nội dung giáo án 156 tuần | 156 |
| `messages` | Tin nhắn giữa GV và HS | — |
| `teacher_session_notes` | Ghi chú buổi học | — |
| `teacher_task_assignments` | Phân công bài tập | — |
| `periodic_assessments` | Đánh giá định kỳ | — |
| `checkpoint_results` | Kết quả checkpoint | — |
| `payment_requests` | Thanh toán | — |
| `student_activity_log` | Nhật ký hoạt động HS | ~122 |
| `manager_teacher_assignments` | Quan hệ Quản lý → GV | — |

---

## Backup thủ công

### Cách 1: GitHub Actions (khuyên dùng)

1. Mở https://github.com/Binh3ks/enquest3k.copilot/actions
2. Chọn workflow **"Database Backup"**
3. Nhấn **"Run workflow"** → **Run workflow**

Backup sẽ chạy ngay lập tức và commit vào branch `backup`.

### Cách 2: Local script

```bash
# Dry run — xem trước
node scripts/backup_db.cjs --dry-run

# Chạy backup
node scripts/backup_db.cjs
```

---

## Restore — Phục hồi dữ liệu

### Liệt kê backup

```bash
# Xem danh sách tất cả backup
node scripts/restore_db.cjs --list

# Preview nội dung backup mới nhất
node scripts/restore_db.cjs --list backups/latest
```

### Restore theo bảng

```bash
# Restore toàn bộ (CẨN THẬN — ghi đè toàn bộ)
node scripts/restore_db.cjs --restore backups/latest

# Chỉ restore tiến độ học sinh (station_progress)
node scripts/restore_db.cjs --restore backups/latest station_progress

# Chỉ restore users (tài khoản + pass)
node scripts/restore_db.cjs --restore backups/latest users

# Chỉ restore giáo án
node scripts/restore_db.cjs --restore backups/latest lesson_plans
node scripts/restore_db.cjs --restore backups/latest lesson_plans_index

# Chỉ restore quan hệ GV-HS
node scripts/restore_db.cjs --restore backups/latest teacher_assignments

# Restore từ file JSON cụ thể
node scripts/restore_db.cjs --restore station_progress ./my_progress.json
```

### Preview trước khi restore

```bash
# Xem backup có gì (không thay đổi gì)
node scripts/restore_db.cjs --preview backups/latest

# Dry run restore 1 bảng
node scripts/restore_db.cjs --restore backups/latest station_progress --dry-run
```

---

## Cấu hình Secrets (GitHub Actions)

Cần thêm **5 secrets** tại GitHub repo → Settings → Secrets and variables → Actions → New repository secret:

| Secret Name | Value |
|-------------|-------|
| `SUPABASE_DB_HOST` | `aws-1-ap-northeast-1.pooler.supabase.com` |
| `SUPABASE_DB_USER` | `postgres.dlvjqdyvatceidzeyfnq` |
| `SUPABASE_DB_PASS` | `!4hqV$bpceK!?KR` |
| `SUPABASE_DB_PORT` | `5432` |
| `SUPABASE_DB_NAME` | `postgres` |

---

## Password — bcrypt hash

- **Mật khẩu được lưu dạng bcrypt hash**, không phải plaintext
- Hash là **so sánh được** — user nhập pass → server hash → so sánh với hash đã lưu → khớp → login
- **Không cần giải mã** — restore hash = khôi phục pass cũ cho tất cả users
- Mỗi user có thể có pass khác nhau (hash khác nhau)

---

## Về Railway endpoint backup

Endpoint `/api/backup/run` trên Railway cho phép backup thủ công qua HTTP:

```bash
curl -X POST https://heartfelt-mindfulness-production-40ff.up.railway.app/api/backup/run \
  -H "X-Admin-Token: <BACKUP_ADMIN_TOKEN>" \
  -H "Content-Type: application/json"
```

Cần set env var `BACKUP_ADMIN_TOKEN` trên Railway dashboard.

---

## Cấu trúc thư mục backup

```
backups/
  2026-05-26T10-00-00/    ← backup cũ
  2026-05-26T13-10-56/    ← backup mới nhất (chạy lúc 13:10)
    users.json
    teacher_assignments.json
    station_progress.json
    lesson_plans_index.json
    lesson_plans.json
    messages.json
    teacher_session_notes.json
    teacher_task_assignments.json
    periodic_assessments.json
    checkpoint_results.json
    payment_requests.json
    push_subscriptions.json
    student_activity_log.json
    metadata.json                  ← thông tin backup (timestamp, version)
  latest -> 2026-05-26T13-10-56/ ← symlink đến backup mới nhất
```

Trên GitHub, các backup được commit vào branch `backup` (tách biệt khỏi `main`).

---

## Khi nào cần restore?

| Tình huống | Bảng cần restore |
|-----------|-----------------|
| Mất tiến độ học sinh | `station_progress` |
| Mất tài khoản / pass | `users` |
| Mất giáo án | `lesson_plans`, `lesson_plans_index` |
| Mất ghép GV-HS | `teacher_assignments` |
| Mất tin nhắn | `messages` |
| Thiên tai mất toàn bộ | *(toàn bộ)* |

---

## Cảnh báo

- **Không restore `users` nếu đang có user mới đăng ký** — sẽ ghi đè
- **Luôn chạy `--preview` trước** khi restore bất kỳ bảng nào
- Backup là **append-only** trên GitHub — không xóa history cũ
- Muốn restore pass cũ → restore bảng `users` → **tất cả user dùng pass cũ được ngay**

---

## Thông tin kỹ thuật

- **Database**: Supabase PostgreSQL (Session Pooler)
- **Host**: `aws-1-ap-northeast-1.pooler.supabase.com:5432`
- **Database**: `postgres`
- **Backup scripts**: `scripts/backup_db.cjs`, `scripts/restore_db.cjs`
- **GitHub workflow**: `.github/workflows/backup.yml`
- **Backup branch**: `backup` (tách biệt khỏi `main`)
- **Tần suất**: mỗi 15 phút
- **Lịch sử**: 48 snapshots (~12 tiếng)
