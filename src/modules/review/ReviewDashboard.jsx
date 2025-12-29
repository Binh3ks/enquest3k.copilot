import React, { useState, useEffect } from 'react';
import { User, Calendar, ListOrdered, Star, Hash, List, Activity, Trophy, ArrowRight, XCircle, CheckCircle, Lock as LockIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewDrill from './ReviewDrill';

// Thêm prop onWeekComplete
const ReviewDashboard = ({ userId, isAuthenticated, themeColor, reviewItems, setReviewItems, onWeekComplete }) => {
    const [isVi, setIsVi] = useState(false); 
    const [activeDrillItem, setActiveDrillItem] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const currentWeekId = parseInt(params.weekId || 1);

    const handleCompleteDrill = (completedId) => {
        console.log('[ReviewDashboard] Item completed:', completedId);
        const newItems = reviewItems.filter(item => item.id !== completedId);
        setReviewItems(newItems);
        setActiveDrillItem(null);
        console.log('[ReviewDashboard] Remaining items:', newItems.length);
    }

    const itemsLeft = reviewItems.length;
    
    // LOGIC: CHỈ MỞ KHI KHÔNG CÒN BÀI TẬP NÀO (100% DONE)
    const canContinue = itemsLeft === 0;

    // Tính % hoàn thành để hiển thị Progress Bar (Giả định tổng 8 câu để hiển thị đẹp)
    const displayProgress = Math.max(5, ((8 - itemsLeft) / 8) * 100);

    // Notify parent (App) that review for this week is complete so it can persist the status
    useEffect(() => {
        if (canContinue && typeof onWeekComplete === 'function') {
            try {
                console.log('[ReviewDashboard] Calling onWeekComplete for week', currentWeekId);
                onWeekComplete(currentWeekId);
            } catch (e) {
                console.error('[ReviewDashboard] onWeekComplete error', e);
            }
        }
    }, [canContinue, currentWeekId]);

    const handleNextLesson = (e) => {
        e?.preventDefault();
        console.log('[ReviewDashboard] handleNextLesson clicked, canContinue=', canContinue, 'weekId=', currentWeekId);
        if (canContinue) {
            console.log('[ReviewDashboard] Navigating to /week/' + currentWeekId + '/read_explore');
            navigate(`/week/${currentWeekId}/read_explore`);
        } else {
            console.warn('[ReviewDashboard] Cannot proceed: still have', itemsLeft, 'items left');
        }
    };

    const ReviewItem = ({ item, onClick }) => (
        <div 
            className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all cursor-pointer group"
            onClick={onClick}
        >
            <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${item.type === 'Word' ? 'bg-orange-100 text-orange-500' : 'bg-rose-100 text-rose-500'} group-hover:scale-110 transition-transform`}>
                    {item.type === 'Word' ? <Star className="w-5 h-5" /> : <Hash className="w-5 h-5" />}
                </div>
                <div>
                    <p className="font-bold text-slate-800 text-base">{item.content}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{item.subType || item.type}</p>
                </div>
            </div>
            <button className={`text-xs font-black px-3 py-1.5 rounded-lg border-2 transition-colors ${item.type === 'Word' ? 'border-orange-100 text-orange-500 group-hover:bg-orange-500 group-hover:text-white' : 'border-rose-100 text-rose-500 group-hover:bg-rose-500 group-hover:text-white'}`}>
                {isVi ? 'ÔN NGAY' : 'REVIEW'}
            </button>
        </div>
    );

    return (
        <div className="p-4 md:p-6 space-y-6 bg-slate-50 min-h-[80vh]">
            {activeDrillItem && (
                <ReviewDrill 
                    item={activeDrillItem} 
                    themeColor={activeDrillItem.type === 'Word' ? 'orange' : 'rose'}
                    onComplete={handleCompleteDrill}
                    onCancel={() => setActiveDrillItem(null)}
                />
            )}

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center mb-2">
                        <Activity className="w-8 h-8 mr-3 text-orange-500" /> 
                        {isVi ? 'SRS Review' : 'SRS Review Dashboard'}
                    </h1>
                    <p className="text-slate-500 font-medium text-sm">User ID: <span className="font-mono text-slate-700 bg-slate-200 px-1 rounded">{userId?.slice(0,8)}...</span></p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remaining</p>
                    <p className="text-4xl font-black text-slate-800">{itemsLeft}<span className="text-lg text-slate-400 font-bold"> Items</span></p>
                </div>
            </div>
            
            {/* PROGRESS SECTION */}
            <div className={`p-6 rounded-2xl border-2 ${canContinue ? 'bg-green-50 border-green-200' : 'bg-white border-orange-200'} transition-colors`}>
                <h3 className={`text-lg font-black mb-2 flex items-center ${canContinue ? 'text-green-700' : 'text-orange-600'}`}>
                    {canContinue ? <CheckCircle className="w-6 h-6 mr-2"/> : <Calendar className="w-6 h-6 mr-2"/>}
                    {isVi ? 'Trạng thái Ôn tập' : 'Review Status'}
                </h3>
                
                <p className="text-sm font-bold text-slate-600 mb-4">
                    {canContinue 
                        ? (isVi ? "Tuyệt vời! Bạn đã hoàn thành tất cả bài ôn tập." : "Excellent! All review tasks completed.")
                        : (isVi ? `Bạn phải hoàn thành HẾT ${itemsLeft} bài tập còn lại để mở khóa.` : `You must complete ALL ${itemsLeft} remaining tasks to unlock.`)
                    }
                </p>

                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-4">
                    {/* Thanh progress lấp đầy 100% khi itemsLeft = 0 */}
                    <div className={`h-full transition-all duration-500 ${canContinue ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${canContinue ? 100 : displayProgress}%` }}></div>
                </div>

                <button 
                    type="button"
                    onClick={handleNextLesson} 
                    disabled={!canContinue}
                    style={{ pointerEvents: canContinue ? 'auto' : 'none' }}
                    className={`w-full py-4 rounded-xl font-black text-white flex items-center justify-center transition-all cursor-pointer ${canContinue ? 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-green-200 hover:-translate-y-1 active:scale-95' : 'bg-slate-300 opacity-50'}`}
                >
                    {canContinue ? (
                        <>
                            {isVi ? 'VÀO HỌC BÀI MỚI' : 'START NEW LESSON'} 
                            <ArrowRight className="w-5 h-5 ml-2"/>
                        </>
                    ) : (
                        <span className="flex items-center text-slate-500">
                            <LockIcon className="w-4 h-4 mr-2"/> 
                            {isVi ? 'HOÀN THÀNH ĐỂ MỞ KHÓA' : 'COMPLETE ALL TO UNLOCK'}
                        </span>
                    )}
                </button>
            </div>

            {/* LIST */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">
                    {isVi ? 'Danh sách bài tập' : 'Review Tasks Queue'}
                </h3>
                {itemsLeft > 0 ? (
                    <div className="grid gap-3">
                        {reviewItems.map((item) => (
                            <ReviewItem key={item.id} item={item} onClick={() => setActiveDrillItem(item)} />
                        ))}
                    </div>
                ) : (
                    <div className="p-10 text-center bg-white rounded-2xl border-2 border-dashed border-green-200">
                        <Trophy className="w-12 h-12 mx-auto text-yellow-400 mb-3"/>
                        <p className="font-bold text-slate-600">All tasks done! You are a true scholar.</p>
                    </div>
                )}
            </div>

        </div>
    );
};
export default ReviewDashboard;
