/* eslint-env node */
const nodemailer = require('nodemailer');

// Email transporter configuration
// Uses Gmail SMTP by default (can be changed to SendGrid/Mailgun)
const createTransporter = () => {
  const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Gmail: use App Password, not regular password
    },
  };

  // If no email config, return mock transporter for development
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('⚠️  [Email] No EMAIL_USER/EMAIL_PASSWORD configured. Using console logging only.');
    return {
      sendMail: async (mailOptions) => {
        console.log('📧 [Email Mock] Would send:', {
          to: mailOptions.to,
          subject: mailOptions.subject,
          text: mailOptions.text,
        });
        return { messageId: 'mock-' + Date.now() };
      },
    };
  }

  return nodemailer.createTransporter(emailConfig);
};

const transporter = createTransporter();

/**
 * Send email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content (optional)
 * @returns {Promise<object>} Send result
 */
async function sendEmail(to, subject, text, html) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@lexio.app',
      to,
      subject,
      text,
      html: html || text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ [Email] Sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ [Email] Send failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send OTP email for password reset
 * @param {string} email - User email
 * @param {string} otp - 6-digit OTP code
 * @returns {Promise<object>}
 */
async function sendPasswordResetOTP(email, otp) {
  const subject = 'Lexio - Mã xác nhận đặt lại mật khẩu';
  
  const text = `
Xin chào,

Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản Lexio.

Mã xác nhận của bạn là: ${otp}

Mã này có hiệu lực trong 15 phút.

Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.

Trân trọng,
Đội ngũ Lexio
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .otp-box { background: #f4f4f4; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0; }
    .otp-code { font-size: 32px; font-weight: bold; color: #4CAF50; letter-spacing: 5px; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Đặt lại mật khẩu Lexio</h2>
    <p>Xin chào,</p>
    <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản Lexio của mình.</p>
    
    <div class="otp-box">
      <p>Mã xác nhận của bạn là:</p>
      <div class="otp-code">${otp}</div>
    </div>
    
    <p><strong>Mã này có hiệu lực trong 15 phút.</strong></p>
    <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
    
    <div class="footer">
      <p>Trân trọng,<br>Đội ngũ Lexio</p>
      <p style="color: #999;">Email này được gửi tự động, vui lòng không trả lời.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return sendEmail(email, subject, text, html);
}

module.exports = {
  sendEmail,
  sendPasswordResetOTP,
};
