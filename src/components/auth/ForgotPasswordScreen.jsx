import React, { useState } from 'react';
import { Mail, Key, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Lock, Globe } from 'lucide-react';
import axios from 'axios';

const text = {
  vi: {
    title: 'Quên Mật Khẩu',
    subtitle: 'Đặt lại mật khẩu của bạn',
    step1Desc: 'Nhập email đã đăng ký. Chúng tôi sẽ gửi mã OTP để xác minh.',
    step2Desc: 'Nhập mã OTP 6 số đã được gửi đến email',
    step3Desc: 'Tạo mật khẩu mới cho tài khoản của bạn',
    emailPlaceholder: 'email@example.com',
    otpPlaceholder: '000000',
    newPassPlaceholder: 'Mật khẩu mới (tối thiểu 6 ký tự)',
    confirmPassPlaceholder: 'Xác nhận mật khẩu mới',
    sendOTP: 'Gửi mã OTP',
    verifyOTP: 'Xác minh OTP',
    resetPassword: 'Đặt lại mật khẩu',
    resendOTP: 'Gửi lại mã OTP',
    backToLogin: 'Quay lại đăng nhập',
    otpSent: 'Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.',
    verifySuccess: 'Xác minh thành công! Vui lòng tạo mật khẩu mới.',
    resetSuccess: '✅ Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.',
    errorEmail: 'Vui lòng nhập email',
    errorOTP: 'Vui lòng nhập mã OTP 6 số',
    errorPassLength: 'Mật khẩu phải có ít nhất 6 ký tự',
    errorPassMismatch: 'Mật khẩu xác nhận không khớp',
    errorInvalidOTP: 'Mã OTP không hợp lệ hoặc đã hết hạn.',
    errorGeneric: 'Có lỗi xảy ra. Vui lòng thử lại.',
  },
  en: {
    title: 'Forgot Password',
    subtitle: 'Reset your password',
    step1Desc: 'Enter your registered email. We will send an OTP code for verification.',
    step2Desc: 'Enter the 6-digit OTP code sent to email',
    step3Desc: 'Create a new password for your account',
    emailPlaceholder: 'email@example.com',
    otpPlaceholder: '000000',
    newPassPlaceholder: 'New password (minimum 6 characters)',
    confirmPassPlaceholder: 'Confirm new password',
    sendOTP: 'Send OTP',
    verifyOTP: 'Verify OTP',
    resetPassword: 'Reset Password',
    resendOTP: 'Resend OTP',
    backToLogin: 'Back to Login',
    otpSent: 'OTP code has been sent to your email. Please check your inbox.',
    verifySuccess: 'Verification successful! Please create a new password.',
    resetSuccess: '✅ Password reset successful! Please login with your new password.',
    errorEmail: 'Please enter your email',
    errorOTP: 'Please enter 6-digit OTP code',
    errorPassLength: 'Password must be at least 6 characters',
    errorPassMismatch: 'Password confirmation does not match',
    errorInvalidOTP: 'Invalid or expired OTP code.',
    errorGeneric: 'An error occurred. Please try again.',
  }
};

const ForgotPasswordScreen = ({ onBack }) => {
  const [lang, setLang] = useState('vi');
  const t = text[lang];
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const apiBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  // Step 1: Request OTP
  const handleRequestOTP = async () => {
    setError('');
    setSuccess('');
    if (!email) {
      setError(t.errorEmail);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiBaseURL}/password-reset/request`, { email });
      setSuccess(t.otpSent);
      setStep(2);
      
      // Development mode: show OTP in console
      if (res.data._dev_otp) {
        console.log('🔑 Development OTP:', res.data._dev_otp);
        setError(`DEV MODE - OTP: ${res.data._dev_otp}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async () => {
    setError('');
    setSuccess('');
    if (!otp || otp.length !== 6) {
      setError(t.errorOTP);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiBaseURL}/password-reset/verify`, { email, otp });
      setResetToken(res.data.resetToken);
      setSuccess(t.verifySuccess);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || t.errorInvalidOTP);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    setError('');
    setSuccess('');
    
    if (!newPassword || newPassword.length < 6) {
      setError(t.errorPassLength);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError(t.errorPassMismatch);
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${apiBaseURL}/password-reset/reset`, {
        resetToken,
        newPassword,
      });
      setSuccess(t.resetSuccess);
      setTimeout(() => onBack(), 2000);
    } catch (err) {
      setError(err.response?.data?.message || t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white flex flex-col relative min-h-[500px]">
        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-all"
        >
          <Globe size={14} />
          {lang === 'vi' ? 'EN' : 'VI'}
        </button>

        {/* Header */}
        <div className="bg-indigo-600 p-8 text-center relative overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <Lock className="w-12 h-12 mx-auto mb-2 text-white opacity-90" />
          <h1 className="text-2xl font-black text-white tracking-tight mb-1 relative z-10">
            {t.title}
          </h1>
          <p className="text-indigo-200 font-bold text-xs uppercase tracking-widest relative z-10">
            {t.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-5 flex-1 flex flex-col">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all ${
                  s === step ? 'bg-indigo-600 text-white scale-110' :
                  s < step ? 'bg-green-500 text-white' :
                  'bg-slate-200 text-slate-400'
                }`}>
                  {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                    s < step ? 'bg-green-500' : 'bg-slate-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Email */}
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <p className="text-sm text-slate-600 text-center">
                {t.step1Desc}
              </p>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleRequestOTP()}
                  className="w-full pl-12 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  placeholder={t.emailPlaceholder}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <p className="text-sm text-slate-600 text-center">
                {t.step2Desc} <strong>{email}</strong>
              </p>
              <div className="relative group">
                <Key className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyPress={(e) => e.key === 'Enter' && handleVerifyOTP()}
                  className="w-full pl-12 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-700 text-center text-2xl tracking-widest outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  placeholder={t.otpPlaceholder}
                  maxLength={6}
                  disabled={loading}
                />
              </div>
              <button
                onClick={() => { setStep(1); setOtp(''); setError(''); setSuccess(''); }}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold text-center w-full"
              >
                {t.resendOTP}
              </button>
            </div>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <p className="text-sm text-slate-600 text-center">
                {t.step3Desc}
              </p>
              <div className="relative group">
                <Key className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  placeholder={t.newPassPlaceholder}
                  disabled={loading}
                />
              </div>
              <div className="relative group">
                <Key className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleResetPassword()}
                  className="w-full pl-12 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  placeholder={t.confirmPassPlaceholder}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Error/Success Messages */}
          {error && (
            <div className="text-center text-rose-500 text-xs font-bold bg-rose-50 p-3 rounded-xl border border-rose-100 flex items-center justify-center gap-2 animate-in fade-in">
              <AlertCircle size={14} /> {error}
            </div>
          )}
          
          {success && (
            <div className="text-center text-green-600 text-xs font-bold bg-green-50 p-3 rounded-xl border border-green-100 flex items-center justify-center gap-2 animate-in fade-in">
              <CheckCircle size={14} /> {success}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 mt-auto">
            <button
              onClick={
                step === 1 ? handleRequestOTP :
                step === 2 ? handleVerifyOTP :
                handleResetPassword
              }
              disabled={loading}
              className="w-full py-4 rounded-xl font-black text-white text-lg shadow-lg shadow-indigo-200 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:shadow-none transition-all transform active:scale-95 flex items-center justify-center group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {lang === 'vi' ? 'Đang xử lý...' : 'Processing...'}
                </span>
              ) : (
                <>
                  {step === 1 && t.sendOTP}
                  {step === 2 && t.verifyOTP}
                  {step === 3 && t.resetPassword}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <button
              onClick={onBack}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-slate-600 border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> {t.backToLogin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
