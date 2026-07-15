import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, CreditCard, Copy, User, Users, Plus, Minus, Sparkles } from 'lucide-react';
import { paymentAPI } from '../../services/api';
import { useUserStore } from '../../stores/useUserStore';

// ─── Plan catalogue ───────────────────────────────────────────────────────────
const B2C = {
  student_monthly: { id: 'student_monthly', planKey: 'student', name: 'HỌC SINH', priceNum: 99000,  priceLabel: '99,000đ',  period: '/tháng', isYearly: false, badge: null,             seats: 0 },
  student_yearly:  { id: 'student_yearly',  planKey: 'student', name: 'HỌC SINH', priceNum: 890000, priceLabel: '890,000đ', period: '/năm',   isYearly: true,  badge: 'Tiết kiệm 25%',  seats: 0 },
};

// B2C Family plans: 2HS (sibling) and 4HS (family/friends)
// Sibling monthly: 2×99k×0.85 = 168k  → ~84k/HS (-15%)
// Sibling yearly:  168k×9   = 1.512M → ~63k/HS/tháng
// Family monthly:  4×99k×0.8 = 316k  → ~79k/HS (-20%)
// Family yearly:   316k×9   = 2.844M → ~59k/HS/tháng
const FAMILY = {
  sibling_monthly: {
    id: 'sibling_monthly', planKey: 'sibling', name: 'ANH EM (2 HS)',
    priceNum: 168000, priceLabel: '168,000đ', period: '/tháng', isYearly: false,
    badge: 'Giảm 15%', seats: 2, perStudent: '~84k/HS/tháng',
  },
  sibling_yearly: {
    id: 'sibling_yearly', planKey: 'sibling', name: 'ANH EM (2 HS)',
    priceNum: 1512000, priceLabel: '1,512,000đ', period: '/năm', isYearly: true,
    badge: 'Tiết kiệm ~37%', seats: 2, perStudent: '~63k/HS/tháng',
  },
  family_monthly: {
    id: 'family_monthly', planKey: 'family', name: 'GIA ĐÌNH (4 HS)',
    priceNum: 316000, priceLabel: '316,000đ', period: '/tháng', isYearly: false,
    badge: 'Giảm 20%', seats: 4, perStudent: '~79k/HS/tháng',
  },
  family_yearly: {
    id: 'family_yearly', planKey: 'family', name: 'GIA ĐÌNH (4 HS)',
    priceNum: 2844000, priceLabel: '2,844,000đ', period: '/năm', isYearly: true,
    badge: 'Tiết kiệm ~40%', seats: 4, perStudent: '~59k/HS/tháng',
  },
};

// B2B tiers: Option 2 pricing (89k×HS + 99k×GV/tháng)
// Starter 1+5:       89k×5  + 99k×1  = 544k   → ~109k/HS [bait — đắt hơn lẻ → đẩy lên Pro]
// Pro 1(max2)+20:    69k×20 + 99k×1  = 1.479M → ~74k/HS  [main hook, -25% vs lẻ]
// Nhóm 3(max5)+60:   49k×60 + 99k×3  = 3.237M → ~54k/HS  [-45%]
// Center 10(max15)+200: 39k×200+99k×10 = 8.79M → ~44k/HS  [-55%]
// Yearly = ×9 tháng (tặng 3 tháng ~25% tiết kiệm)
const B2B = {
  teacher_starter: {
    id: 'teacher_starter', planKey: 'teacher_starter',
    name: 'GV Starter', teachers: 1, max_teachers: 1, seats: 5,
    priceNum: 544000, priceLabel: '544,000đ', extra_seat: 89000,
    badge: 'Khởi đầu', perStudent: '~109k/HS',
  },
  teacher_pro: {
    id: 'teacher_pro', planKey: 'teacher_pro',
    name: 'GV Pro', teachers: 1, max_teachers: 2, seats: 20,
    priceNum: 1479000, priceLabel: '1,479,000đ', extra_seat: 69000,
    badge: '✨ Giá trị nhất', perStudent: '~74k/HS',
  },
  team: {
    id: 'team', planKey: 'team',
    name: 'Nhóm', teachers: 3, max_teachers: 5, seats: 60,
    priceNum: 3237000, priceLabel: '3,237,000đ', extra_seat: 49000,
    badge: 'Tiết kiệm 45%', perStudent: '~54k/HS',
  },
  center: {
    id: 'center', planKey: 'center',
    name: 'Trung tâm', teachers: 10, max_teachers: 15, seats: 200,
    priceNum: 8790000, priceLabel: '8,790,000đ', extra_seat: 39000,
    badge: 'Tiết kiệm 55%', perStudent: '~44k/HS',
  },
};

const B2C_FEATURES = ['Toàn bộ 156 tuần học', 'AI Tutor không giới hạn', 'In & xuất bài tập', 'Free Talk nâng cao', 'Không quảng cáo'];
const B2B_FEATURES = ['Lesson Plans 156 tuần đầy đủ', 'Teacher Dashboard + theo dõi tiến độ HS', 'AI Tutor + Free Talk cho học sinh', 'In & xuất bài tập không giới hạn', 'Quản lý nhiều lớp — nhiều trình độ'];

const BANK = { name: 'Techcombank (TCB)', account: '9968255825', holder: 'NGUYỄN THỊ DUYÊN' };
const vietQrUrl = (amount, info) =>
  `https://img.vietqr.io/image/TCB-${BANK.account}-compact.png?amount=${amount}&addInfo=${encodeURIComponent(info)}&accountName=${encodeURIComponent(BANK.holder)}`;

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [step, setStep]               = useState(1); // 1: plan  2: payment  3: done
  const [type, setType]               = useState('b2c');   // 'b2c' | 'b2b'
  const [selectedPlan, setSelectedPlan] = useState('student_monthly');
  const [extraSeats, setExtraSeats]   = useState(0);
  const [copied, setCopied]           = useState(false);
  const [transferNote, setTransferNote] = useState('');
  const [b2bBilling, setB2bBilling]   = useState('monthly'); // 'monthly' | 'yearly'
  const currentUser = useUserStore(state => state.currentUser);

  // Compute plan values needed by the useEffect (must be before any early return)
  const isB2B   = type === 'b2b';
  const plans   = isB2B ? B2B : { ...B2C, ...FAMILY };
  const plan    = plans[selectedPlan] || Object.values(plans)[0];

  // MUST be before early return — Rules of Hooks
  useEffect(() => {
    if (!isOpen) return;
    const billing = isB2B && b2bBilling === 'yearly' ? ' YEARLY' : '';
    setTransferNote(`EQ ${plan.planKey.toUpperCase()}${billing} ${currentUser?.username?.toUpperCase() || ''}`);
  }, [isOpen, selectedPlan, b2bBilling, isB2B, currentUser?.username, plan?.planKey]);

  if (!isOpen) return null;

  const totalSeats = isB2B ? plan.seats + extraSeats : 0;
  const billingMonths = isB2B && b2bBilling === 'yearly' ? 9 : 1;
  const monthlyTotal = isB2B ? plan.priceNum + extraSeats * (plan.extra_seat || 0) : plan.priceNum;
  const totalPrice = monthlyTotal * billingMonths;

  const fmt = (n) => n.toLocaleString('vi-VN') + 'đ';

  const handleTypeSwitch = (t) => {
    setType(t);
    setSelectedPlan(t === 'b2b' ? 'teacher_starter' : 'student_monthly');
    setExtraSeats(0);
    setB2bBilling('monthly');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleConfirm = async () => {
    if (!currentUser?.username) { alert('Vui lòng đăng nhập trước!'); return; }
    try {
      await paymentAPI.createRequest(plan.planKey, totalPrice, billingMonths, extraSeats, transferNote);
      setStep(3);
    } catch (err) {
      console.error('Payment request error:', err);
      const msg = err.response?.data?.message || err.message || 'Lỗi không xác định';
      // Show error but still let user proceed to step 3 (they already transferred)
      alert('⚠ Ghi nhận yêu cầu thất bại: ' + msg + '\n\nBạn đã chuyển khoản rồi — chủ sẽ kích hoạt thủ công sau khi xác nhận.');
      setStep(3);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in-95">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">

        {/* ── Left panel ── */}
        <div className="w-full md:w-72 shrink-0 bg-indigo-900 p-6 text-white flex flex-col relative overflow-y-auto">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 20% 50%, #818cf8 0%, transparent 60%), radial-gradient(circle at 80% 20%, #6366f1 0%, transparent 50%)"}} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={20} className="text-yellow-400" />
              <span className="text-yellow-400 font-black text-xs tracking-widest uppercase">EngQuest Pro</span>
            </div>
            <h2 className="text-3xl font-black leading-tight mb-3">Mở khóa<br/>tương lai</h2>
            <p className="text-indigo-200 text-sm">Đầu tư vào hành trình học tiếng Anh đỉnh cao cho con em bạn.</p>
          </div>
          <ul className="relative space-y-3 mt-6">
            {(isB2B ? B2B_FEATURES : B2C_FEATURES).map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                <span className="p-1.5 bg-white/15 rounded-lg shrink-0"><Check size={12} /></span>
                {f}
              </li>
            ))}
          </ul>

          {/* ── Credentials block ── */}
          <div className="relative mt-5 p-4 bg-white/10 rounded-2xl border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-300 text-base">🏅</span>
              <p className="text-xs font-black text-yellow-300 uppercase tracking-wider">Xây dựng bởi chuyên gia</p>
            </div>
            <p className="text-indigo-100 text-xs leading-relaxed font-medium">
              Là công trình cả đời, toàn bộ 156 tuần nội dung do <strong className="text-white">chuyên gia ESL &amp; phiên dịch viên cabin hàng đầu Việt Nam với 30 năm kinh nghiệm</strong> trực tiếp viết &amp; kiểm duyệt theo chuẩn <strong className="text-white">Cambridge</strong>.
            </p>
          </div>

          <div className="relative mt-4 p-4 bg-white/10 rounded-2xl text-center">
            <p className="text-xs text-indigo-300 mb-1">Dùng thử miễn phí</p>
            <p className="font-black text-lg">14 ngày — 4 tuần theo Placement Test</p>
            <p className="text-xs text-indigo-300 mt-1">Không cần thẻ tín dụng</p>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
          <div className="p-6 pb-0 shrink-0">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white hover:bg-slate-100 rounded-full shadow transition-colors z-10"><X size={18} /></button>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              {['Chọn gói', 'Thanh toán', 'Xong'].map((s, i) => (
                <React.Fragment key={i}>
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${step === i+1 ? 'text-indigo-600' : step > i+1 ? 'text-green-600' : 'text-slate-400'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${step === i+1 ? 'bg-indigo-600 text-white' : step > i+1 ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-400'}`}>{step > i+1 ? '✓' : i+1}</span>
                    {s}
                  </div>
                  {i < 2 && <div className={`flex-1 h-0.5 ${step > i+1 ? 'bg-green-300' : 'bg-slate-200'}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 pt-2">

            {/* ─ STEP 1: Plan selection ─ */}
            {step === 1 && (
              <div className="space-y-5">
                {/* Type toggle */}
                <div className="flex gap-2 p-1 bg-slate-200 rounded-xl w-fit">
                  <button onClick={() => handleTypeSwitch('b2c')} className={`px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${type==='b2c' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>
                    <User size={15}/> Cá nhân / Phụ huynh
                  </button>
                  <button onClick={() => handleTypeSwitch('b2b')} className={`px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${type==='b2b' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>
                    <Users size={15}/> Giáo viên / Trung tâm
                  </button>
                </div>

                {/* B2C Plans */}
                {type === 'b2c' && (
                  <div className="space-y-4">
                    {/* Individual plans */}
                    <div className="grid grid-cols-2 gap-3">
                      {Object.values(B2C).map(p => (
                        <button key={p.id} onClick={() => setSelectedPlan(p.id)}
                          className={`relative text-left rounded-2xl p-5 border-2 transition-all ${selectedPlan===p.id ? 'border-indigo-500 bg-white shadow-lg ring-1 ring-indigo-400' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
                          {p.badge && <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-green-500 text-white text-[10px] font-black rounded-full uppercase">{p.badge}</span>}
                          <p className="font-black text-slate-500 text-xs uppercase tracking-wider mb-1">{p.isYearly ? 'Năm' : 'Tháng'}</p>
                          <p className="text-2xl font-black text-indigo-700">{p.priceLabel}</p>
                          <p className="text-xs text-slate-400 font-medium">{p.period}</p>
                          {p.isYearly && <p className="mt-2 text-xs text-green-700 font-bold bg-green-50 rounded-lg px-2 py-1">≈ 74,200đ/tháng</p>}
                          <div className={`mt-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan===p.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                            {selectedPlan===p.id && <Check size={11} className="text-white"/>}
                          </div>
                        </button>
                      ))}
                    </div>
                    {/* Family plan */}
                    <div className="relative p-1 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl border-2 border-violet-200">
                      <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-violet-600 text-white text-[10px] font-black rounded-full uppercase">👨‍👩‍👧‍👦 Gói Gia Đình</span>
                      <div className="grid grid-cols-2 gap-2 p-2 pt-3">
                        {/* Sibling 2HS */}
                        <div className="col-span-2 px-1 pt-1">
                          <p className="text-[9px] font-black text-violet-400 uppercase tracking-wider mb-1">Anh em · 2 HS (-15%)</p>
                        </div>
                        {[FAMILY.sibling_monthly, FAMILY.sibling_yearly].map(p => (
                          <button key={p.id} onClick={() => setSelectedPlan(p.id)}
                            className={`relative text-left rounded-xl p-4 border-2 transition-all ${selectedPlan===p.id ? 'border-violet-500 bg-white shadow-md ring-1 ring-violet-400' : 'border-violet-100 bg-white/70 hover:border-violet-300'}`}>
                            {p.badge && <span className="absolute -top-2 left-3 px-1.5 py-0.5 bg-violet-400 text-white text-[9px] font-black rounded-full uppercase">{p.badge}</span>}
                            <p className="font-black text-slate-500 text-xs uppercase tracking-wider mb-1">{p.isYearly ? 'Năm' : 'Tháng'}</p>
                            <p className="text-xl font-black text-violet-700">{p.priceLabel}</p>
                            <p className="text-xs text-slate-400 font-medium">{p.period}</p>
                            <p className="mt-1 text-xs text-violet-700 font-bold">{p.perStudent}</p>
                            <div className={`mt-2 w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPlan===p.id ? 'border-violet-600 bg-violet-600' : 'border-slate-300'}`}>
                              {selectedPlan===p.id && <Check size={10} className="text-white"/>}
                            </div>
                          </button>
                        ))}
                        {/* Family 4HS */}
                        <div className="col-span-2 px-1 pt-2">
                          <p className="text-[9px] font-black text-fuchsia-400 uppercase tracking-wider mb-1">Gia đình / Nhóm bạn · 4 HS (-20%)</p>
                        </div>
                        {[FAMILY.family_monthly, FAMILY.family_yearly].map(p => (
                          <button key={p.id} onClick={() => setSelectedPlan(p.id)}
                            className={`relative text-left rounded-xl p-4 border-2 transition-all ${selectedPlan===p.id ? 'border-fuchsia-500 bg-white shadow-md ring-1 ring-fuchsia-400' : 'border-violet-100 bg-white/70 hover:border-fuchsia-300'}`}>
                            {p.badge && <span className="absolute -top-2 left-3 px-1.5 py-0.5 bg-fuchsia-500 text-white text-[9px] font-black rounded-full uppercase">{p.badge}</span>}
                            <p className="font-black text-slate-500 text-xs uppercase tracking-wider mb-1">{p.isYearly ? 'Năm' : 'Tháng'}</p>
                            <p className="text-xl font-black text-fuchsia-700">{p.priceLabel}</p>
                            <p className="text-xs text-slate-400 font-medium">{p.period}</p>
                            <p className="mt-1 text-xs text-fuchsia-700 font-bold">{p.perStudent}</p>
                            <div className={`mt-2 w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPlan===p.id ? 'border-fuchsia-600 bg-fuchsia-600' : 'border-slate-300'}`}>
                              {selectedPlan===p.id && <Check size={10} className="text-white"/>}
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-400 text-center pb-2">Mỗi HS có tài khoản riêng biệt — mời thêm bạn học cùng!</p>
                    </div>
                  </div>
                )}

                {/* B2B Plans */}
                {type === 'b2b' && (
                  <div className="space-y-3">
                    {/* GV Individual — materials only (no student seats) */}
                    <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                      <span className="text-xl">📚</span>
                      <div className="flex-1">
                        <p className="text-xs font-black text-amber-800">Chỉ cần tài liệu GV? Dùng gói Cá nhân 99k/tháng</p>
                        <p className="text-[10px] text-amber-600 mt-0.5">50+ Lesson Plans · Worksheet in sẵn · Syllabus 156 tuần · 3 video chanting</p>
                      </div>
                      <button onClick={() => { handleTypeSwitch('b2c'); setSelectedPlan('student_monthly'); }}
                        className="text-[10px] font-black text-amber-700 border border-amber-400 px-2 py-1 rounded-lg hover:bg-amber-100 whitespace-nowrap">
                        Xem →
                      </button>
                    </div>
                    {/* Monthly / Yearly billing toggle */}
                    <div className="flex items-center gap-2 p-1 bg-slate-200 rounded-xl w-fit">
                      <button onClick={() => setB2bBilling('monthly')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${b2bBilling==='monthly' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>Theo tháng</button>
                      <button onClick={() => setB2bBilling('yearly')} className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${b2bBilling==='yearly' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>
                        Theo năm <span className="text-green-600 font-black">-25%</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {Object.values(B2B).map(p => {
                        const displayPrice = b2bBilling === 'yearly' ? p.priceNum * 9 : p.priceNum;
                        const displayPeriod = b2bBilling === 'yearly' ? '/năm' : '/tháng';
                        const gvLabel = p.max_teachers && p.max_teachers > p.teachers
                          ? `${p.teachers} (tối đa ${p.max_teachers})`
                          : `${p.teachers}`;
                        return (
                          <button key={p.id} onClick={() => { setSelectedPlan(p.id); setExtraSeats(0); }}
                            className={`relative text-left rounded-2xl p-4 border-2 transition-all ${selectedPlan===p.id ? 'border-indigo-500 bg-white shadow-lg ring-1 ring-indigo-400' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
                            {p.badge && <span className="absolute -top-2.5 left-3 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded-full uppercase">{p.badge}</span>}
                            <p className="font-black text-slate-700 text-sm">{p.name}</p>
                            <p className="text-xl font-black text-indigo-700 mt-1">
                              {displayPrice.toLocaleString('vi-VN')}đ<span className="text-xs text-slate-400 font-normal">{displayPeriod}</span>
                            </p>
                            <p className="text-xs text-slate-500 mt-1 font-semibold">
                              <Users size={11} className="inline mr-1"/>{gvLabel} GV · {p.seats} HS
                            </p>
                            <p className="text-xs text-green-700 font-bold mt-1">
                              {b2bBilling === 'yearly' && p.seats > 0
                                ? `~${Math.round(p.priceNum * 9 / p.seats / 12 / 1000)}k/HS/tháng`
                                : p.perStudent}
                            </p>
                            <div className={`mt-2 w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPlan===p.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                              {selectedPlan===p.id && <Check size={9} className="text-white"/>}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Extra seats add-on */}
                    {selectedPlan && (
                      <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-700 text-sm">Thêm học sinh</p>
                          <p className="text-xs text-slate-400">+{(plan.extra_seat || 0).toLocaleString('vi-VN')}đ/HS/tháng</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setExtraSeats(s => Math.max(0, s-1))} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"><Minus size={14}/></button>
                          <span className="w-8 text-center font-black text-lg">{extraSeats}</span>
                          <button onClick={() => setExtraSeats(s => s+1)} className="w-8 h-8 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold"><Plus size={14}/></button>
                        </div>
                      </div>
                    )}

                    {/* Total summary */}
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <div className="flex justify-between text-sm font-semibold text-slate-600">
                        <span>Gói {plan.name}{b2bBilling === 'yearly' ? ' (×9 tháng · 3 tháng miễn phí)' : ''}</span>
                        <span>{fmt(plan.priceNum * billingMonths)}</span>
                      </div>
                      {extraSeats > 0 && (
                        <div className="flex justify-between text-sm font-semibold text-slate-600 mt-1">
                          <span>+{extraSeats} HS thêm{b2bBilling === 'yearly' ? ' (×9)' : ''}</span>
                          <span>{fmt(extraSeats * (plan.extra_seat || 0) * billingMonths)}</span>
                        </div>
                      )}
                      {b2bBilling === 'yearly' && (
                        <div className="flex justify-between text-xs text-green-700 font-bold mt-1">
                          <span>🎉 3 tháng miễn phí</span>
                          <span>~{fmt(monthlyTotal * 3)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-black text-indigo-700 mt-2 pt-2 border-t border-indigo-200">
                        <span>Tổng ({plan.teachers} GV · {totalSeats} HS)</span>
                        <span>{fmt(totalPrice)}/{b2bBilling === 'yearly' ? 'năm' : 'tháng'}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button onClick={() => setStep(2)} className="w-full mt-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95">
                  Tiếp tục thanh toán <ArrowRight size={20} />
                </button>
              </div>
            )}

            {/* ─ STEP 2: Bank transfer ─ */}
            {step === 2 && (
              <div className="max-w-sm mx-auto w-full space-y-4">
                <div>
                  <h3 className="text-xl font-black text-slate-800">Chuyển khoản ngân hàng</h3>
                  <p className="text-sm text-slate-500 mt-1">Vui lòng chuyển <strong className="text-indigo-600">{fmt(totalPrice)}</strong>{isB2B ? ` (${plan.teachers} GV · ${totalSeats} HS)` : ''} đến tài khoản sau:</p>
                </div>

                {/* QR Code — prominent */}
                <div className="flex flex-col items-center bg-white border-2 border-indigo-100 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-black text-indigo-600 uppercase mb-3">Quét QR để chuyển tiền nhanh nhất</p>
                  <img
                    src={vietQrUrl(totalPrice, transferNote)}
                    alt="QR chuyển khoản"
                    className="w-52 h-52 rounded-xl border border-slate-200"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  <p className="text-xs text-slate-400 mt-2">Mở app ngân hàng → Quét QR → Kiểm tra số tiền → Chuyển</p>
                </div>

                {/* Bank details */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Hoặc chuyển khoản thủ công</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0"><CreditCard className="text-green-600" size={18}/></div>
                    <div><p className="text-xs text-slate-400">Ngân hàng</p><p className="font-bold text-slate-800">{BANK.name}</p></div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Số tài khoản</p>
                    <div className="flex gap-2">
                      <code className="flex-1 p-3 bg-slate-100 rounded-lg font-mono font-black text-lg text-slate-700 select-all">{BANK.account}</code>
                      <button onClick={() => handleCopy(BANK.account)} className="p-3 bg-slate-100 hover:bg-indigo-100 text-slate-500 hover:text-indigo-600 rounded-lg transition-colors">
                        {copied ? <Check size={18} className="text-green-600"/> : <Copy size={18}/>}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Chủ tài khoản</p>
                    <p className="font-black text-slate-800">{BANK.holder}</p>
                  </div>
                </div>

                {/* Transfer note — readonly, mandatory */}
                <div className="p-3 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                  <p className="text-[10px] font-black text-yellow-700 uppercase mb-1">⚠ Nội dung chuyển khoản (BẮT BUỘC)</p>
                  <div className="flex gap-2">
                    <code className="flex-1 p-2 bg-white border border-yellow-200 rounded-lg text-sm font-black text-yellow-800 text-center select-all break-all">{transferNote}</code>
                    <button onClick={() => handleCopy(transferNote)} className="p-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg transition-colors shrink-0">
                      {copied ? <Check size={16} className="text-green-600"/> : <Copy size={16}/>}
                    </button>
                  </div>
                  <p className="text-[10px] text-yellow-600 mt-1">Gồm tên gói + username ({currentUser?.username}) — Admin dùng để xác nhận thanh toán</p>
                </div>

                <p className="text-xs text-slate-400 text-center">Sau khi chuyển tiền, bấm xác nhận bên dưới để Admin được thông báo.<br/>Gói thường được kích hoạt trong 1 giờ làm việc.</p>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">Quay lại</button>
                  <button onClick={handleConfirm} className="flex-[2] py-3 bg-green-600 hover:bg-green-700 text-white font-black rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95">
                    Tôi đã chuyển khoản <Check size={18}/>
                  </button>
                </div>
              </div>
            )}

            {/* ─ STEP 3: Done ─ */}
            {step === 3 && (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Check size={48} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Yêu cầu đã gửi!</h3>
                <p className="text-slate-500 max-w-xs mx-auto mb-8 text-sm leading-relaxed">Yêu cầu đã được ghi nhận trong hệ thống. Gói sẽ được kích hoạt tự động sau khi Admin xác minh — thường trong vòng 1 giờ.</p>
                <button onClick={() => { onClose(); setStep(1); }} className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">Đã hiểu</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;

