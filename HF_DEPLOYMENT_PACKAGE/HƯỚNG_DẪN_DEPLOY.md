# HƯỚNG DẪN DEPLOY LÊN HUGGING FACE - KHÔNG CẦN CODE
## (Dành cho người không biết lập trình)

---

## 🎯 MỤC TIÊU
Deploy TTS Server của EngQuest lên Hugging Face Spaces (MIỄN PHÍ) để app có thể sử dụng 7 giọng đọc khác nhau.

**Thời gian**: 10-15 phút  
**Chi phí**: $0 (hoàn toàn miễn phí)

---

## 📋 CHUẨN BỊ

### Bạn cần có:
1. ✅ Tài khoản Hugging Face: https://huggingface.co/binh3k (bạn đã có)
2. ✅ Files trong folder `HF_DEPLOYMENT_PACKAGE/` (đã chuẩn bị sẵn)
3. ✅ Trình duyệt web (Chrome, Safari, Firefox đều được)

### Kiểm tra files:
Mở folder `HF_DEPLOYMENT_PACKAGE/` và xác nhận có 4 files:
- ✅ `Dockerfile` (không có đuôi .txt)
- ✅ `app.py`
- ✅ `requirements.txt`
- ✅ `README.md`

---

## 🚀 BƯỚC 1: TẠO SPACE TRÊN HUGGING FACE

### 1.1 Đăng nhập
1. Mở trình duyệt
2. Vào: https://huggingface.co/login
3. Đăng nhập bằng tài khoản của bạn

### 1.2 Tạo Space mới
1. Vào: https://huggingface.co/new-space
2. Điền thông tin:

   **Owner**: Chọn `binh3k` (tên tài khoản của bạn)
   
   **Space name**: Gõ `Engquest3k` (đúng như bạn muốn)
   
   **License**: Chọn `mit`
   
   **Select the Space SDK**: Chọn **Docker** (QUAN TRỌNG!)
   
   **Space hardware**: Chọn **CPU basic - FREE** (miễn phí)
   
   **Visibility**: Chọn **Public** (công khai)
   
   **Space secrets**: Bỏ trống (không cần)

3. Click nút **Create Space** (màu xanh)

### 1.3 Chờ Space được tạo
- Sau khi click, bạn sẽ thấy trang Space của mình
- URL sẽ là: `https://huggingface.co/spaces/binh3k/Engquest3k`
- Lúc này Space vẫn trống, chưa có files

---

## 📤 BƯỚC 2: UPLOAD FILES

### 2.1 Vào phần Files
1. Trong trang Space của bạn, tìm tab **Files** (bên trên)
2. Click vào **Files**
3. Bạn sẽ thấy nút **Add file** hoặc **Upload files**

### 2.2 Upload từng file
Click nút **Add file** → Chọn **Upload files**

#### File 1: Dockerfile
1. Click **browse files** hoặc kéo thả file
2. Chọn file `Dockerfile` từ folder `HF_DEPLOYMENT_PACKAGE/`
3. Ở ô **Commit message**, gõ: `Add Dockerfile`
4. Click **Commit to main**

#### File 2: app.py
1. Lại click **Add file** → **Upload files**
2. Chọn file `app.py`
3. Commit message: `Add app.py - TTS server code`
4. Click **Commit to main**

#### File 3: requirements.txt
1. Lại click **Add file** → **Upload files**
2. Chọn file `requirements.txt`
3. Commit message: `Add requirements.txt`
4. Click **Commit to main**

#### File 4: README.md
1. Lại click **Add file** → **Upload files**
2. Chọn file `README.md`
3. Commit message: `Add README - API documentation`
4. Click **Commit to main**

### 2.3 Kiểm tra files đã upload
Trong tab **Files**, bạn phải thấy 4 files:
- ✅ Dockerfile
- ✅ app.py
- ✅ requirements.txt
- ✅ README.md

---

## ⏳ BƯỚC 3: ĐỢI BUILD (5-10 PHÚT)

### 3.1 Build tự động bắt đầu
- Sau khi upload file cuối cùng, HF Spaces sẽ tự động build
- Bạn sẽ thấy:
  - **Building** (đang xây dựng) - màu vàng/cam
  - Hoặc icon bánh răng quay

### 3.2 Xem logs (tùy chọn)
1. Click tab **Logs** (bên trên)
2. Bạn sẽ thấy dòng chữ chạy (build logs)
3. Chờ cho đến khi thấy:
   ```
   📥 Downloading Kokoro models...
   ✅ Models downloaded successfully
   🎙️ Initializing Kokoro TTS...
   ✅ Kokoro TTS ready (88MB int8 model)
   INFO:     Application startup complete.
   ```

### 3.3 Build thành công
- Sau 5-10 phút, status sẽ đổi thành **Running** (màu xanh)
- Icon bánh răng sẽ thành icon check ✅
- Nếu build thất bại (màu đỏ), xem phần TROUBLESHOOTING bên dưới

---

## ✅ BƯỚC 4: KIỂM TRA HOẠT ĐỘNG

### 4.1 Lấy URL của Space
URL của bạn sẽ là:
```
https://binh3k-engquest3k.hf.space
```

(Format: `https://{username}-{space-name}.hf.space`)

### 4.2 Test qua trình duyệt

#### Test 1: Health check
Mở tab mới, vào URL:
```
https://binh3k-engquest3k.hf.space/health
```

Phải thấy:
```json
{
  "status": "ok",
  "kokoro": "loaded",
  "edge_tts": "available"
}
```

#### Test 2: Test giọng đọc (Read station - af_sky)
Mở URL:
```
https://binh3k-engquest3k.hf.space/tts?text=Hello%20student&station=read
```

Trình duyệt sẽ tự động download file `audio.mp3` → Mở file và nghe thử!

#### Test 3: Test giọng khác (New word - af_bella)
Mở URL:
```
https://binh3k-engquest3k.hf.space/tts?text=Apple&station=new_word
```

Nghe xem giọng có khác giọng trên không (giọng nữ trẻ hơn)

#### Test 4: Test giọng nam (Dictation - am_adam)
Mở URL:
```
https://binh3k-engquest3k.hf.space/tts?text=Listen&station=dictation
```

Phải nghe thấy giọng nam

### 4.3 Nếu tất cả test PASS
🎉 **CHÚC MỪNG!** TTS Server của bạn đã hoạt động!

---

## 📝 BƯỚC 5: CẬP NHẬT FRONTEND (SAU)

Sau khi deploy thành công, cần update frontend để dùng server mới:

### 5.1 Mở file `.env`
Trong folder `Engquest3k/`, tìm file `.env`

### 5.2 Thêm dòng này
```
VITE_TTS_SERVER_URL=https://binh3k-engquest3k.hf.space
```

### 5.3 Restart frontend
```bash
npm run dev
```

### 5.4 Test trong app
- Mở app EngQuest
- Vào AI Tutor → Free Talk
- Ms. Nova nói chuyện → Nghe thử giọng mới

---

## 🔧 TROUBLESHOOTING

### Lỗi 1: Build failed (màu đỏ)

**Nguyên nhân**: Thiếu file hoặc file sai
**Cách fix**:
1. Vào tab **Files**
2. Xóa tất cả files (click 3 chấm → Delete)
3. Upload lại từ đầu (Bước 2)

### Lỗi 2: Health check trả về lỗi

**Nguyên nhân**: Build chưa xong
**Cách fix**:
1. Đợi thêm 2-3 phút
2. Refresh trang
3. Kiểm tra logs (tab Logs)

### Lỗi 3: Space "Sleeping"

**Triệu chứng**: Lần đầu vào chậm (30 giây)
**Giải thích**: Bình thường! FREE tier sẽ sleep sau 1 giờ không dùng
**Không cần fix**: Cloudflare sẽ cache nên không ảnh hưởng user

### Lỗi 4: "Kokoro not loaded"

**Nguyên nhân**: Model download thất bại
**Cách fix**:
1. Vào Settings → Factory reboot
2. Chờ build lại (5-10 phút)

---

## 📞 CẦN GIÚP?

### Nếu bạn gặp vấn đề:

1. **Screenshot màn hình** (chụp lại trang lỗi)
2. **Copy logs** (từ tab Logs)
3. **Gửi cho tôi** để debug

### Hoặc:

Cho tôi quyền access Space:
1. Vào Space Settings
2. Add collaborator: `copilot` hoặc email của tôi
3. Tôi sẽ vào fix trực tiếp

---

## 🎯 TỔNG KẾT

✅ **Đã xong**:
- [ ] Tạo Space trên HF
- [ ] Upload 4 files
- [ ] Đợi build xong
- [ ] Test 7 giọng đọc
- [ ] Cập nhật frontend

✅ **Kết quả**:
- URL: `https://binh3k-engquest3k.hf.space`
- Chi phí: $0/tháng (FREE forever)
- 7 giọng đọc khác nhau cho 7 stations
- Tốc độ: 3-5s (sẽ <100ms sau khi setup Cloudflare)

✅ **Bước tiếp theo**:
- Setup Cloudflare CDN (tùy chọn, để tăng tốc 30x)
- Monitor logs (ngày đầu)
- Ready to launch app! 🚀

---

**LƯU Ý**: Hướng dẫn này dành cho người không biết code. Mọi thao tác đều qua giao diện web, không cần chạy lệnh terminal!
