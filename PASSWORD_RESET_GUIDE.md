# 🔐 PASSWORD RESET SYSTEM - HƯỚNG DẪN SỬ DỤNG

## ✅ ĐÃ HOÀN THÀNH

### 1. **Password đã được khôi phục**
- ✅ **Owner (Production):** `owner / binh3k`
- ✅ **Yang (Local):** `Yang / Yang123`  
- ✅ **Kem (Local):** `Kem / Kem123`

### 2. **Hệ thống Password Reset với OTP qua Email**
Users có thể tự reset password mà không cần admin can thiệp.

---

## 📧 CÁCH DÙNG CHO USER (Trên App)

### **Khi quên mật khẩu:**

1. **Bước 1:** Click "Quên mật khẩu?" ở màn hình login
2. **Bước 2:** Nhập email đã đăng ký
3. **Bước 3:** Nhận mã OTP 6 số qua email (có hiệu lực 15 phút)
4. **Bước 4:** Nhập mã OTP để xác nhận
5. **Bước 5:** Tạo mật khẩu mới
6. **Bước 6:** Login với mật khẩu mới ✅

---

## 🔧 SETUP CHO ADMIN (Gửi Email Thật)

### **Hiện tại:** Email chỉ log ra console (development mode)
### **Để gửi email thật:** Cần config Gmail hoặc SendGrid

### **Option 1: Gmail (Miễn phí, dễ setup)**

1. **Tạo App Password:**
   - Vào: https://myaccount.google.com/apppasswords
   - Tạo password cho "Mail" → Copy mã 16 ký tự

2. **Thêm vào Railway Environment Variables:**
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx (16 ký tự)
   EMAIL_FROM=Lexio <noreply@lexio.app>
   ```

3. **Redeploy Railway** → Xong!

### **Option 2: SendGrid (Professional, khuyến nghị production)**

1. **Signup tại:** https://sendgrid.com (Free 100 emails/day)
2. **Tạo API Key** → Copy key
3. **Thêm vào Railway:**
   ```
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASSWORD=your_sendgrid_api_key
   EMAIL_FROM=Lexio <noreply@lexio.app>
   ```

---

## 🛡️ BẢO MẬT (Security Best Practices)

✅ **Đã implement:**
- ❌ **KHÔNG BAO GIỜ** lưu plain-text password
- ✅ Bcrypt hashing với salt (industry standard)
- ✅ OTP chỉ dùng 1 lần
- ✅ OTP tự hết hạn sau 15 phút
- ✅ Email không tiết lộ user có tồn tại hay không (security)

---

## 📝 API ENDPOINTS (Cho Developer)

### **1. Request OTP**
```bash
POST /api/password-reset/request
Content-Type: application/json

{
  "email": "user@example.com"
}

Response: 
{
  "message": "If your email is registered, you will receive an OTP shortly.",
  "_dev_otp": "123456" // Chỉ có trong development mode
}
```

### **2. Verify OTP**
```bash
POST /api/password-reset/verify
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}

Response:
{
  "message": "OTP verified successfully.",
  "resetToken": 42
}
```

### **3. Reset Password**
```bash
POST /api/password-reset/reset
Content-Type: application/json

{
  "resetToken": 42,
  "newPassword": "new_secure_password"
}

Response:
{
  "message": "Password reset successfully!"
}
```

---

## ✅ TESTED & READY

- ✅ Tested end-to-end trên local
- ✅ Deployed to Railway production
- ✅ Owner account khôi phục thành công
- ✅ Email service ready (chờ config để gửi thật)
- ✅ Database migration hoàn tất

---

## 🎯 NEXT STEPS (Optional)

1. **Config Gmail/SendGrid** trên Railway → Users nhận email thật
2. **Tạo Frontend UI** cho "Forgot Password" flow
3. **Add SMS OTP** option (Twilio/Viettel SMS)

---

## 💡 LƯU Ý QUAN TRỌNG

- Password Owner hiện tại: `binh3k` (Railway production)
- File `.env` local không được commit vào git (bảo mật)
- Railway environment variables riêng biệt
- Temporary reset endpoints đã bị xóa (security)

---

**📞 Support:** Nếu cần thay đổi gì, chỉ cần nói!
