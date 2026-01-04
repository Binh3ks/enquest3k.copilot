// --- PROGRESS LOGIC CORE ---

import { loadAllUsers, saveUserToDB } from './userStorage';

// Hàm này tính toán và lưu tiến độ vào data của user hiện tại
// Nó không thay đổi UI trực tiếp mà chỉ update dữ liệu nền
export const saveStationProgress = (currentUser, weekId, stationKey, percent) => {
    if (!currentUser || !currentUser.name) return null;

    try {
        // 1. Lấy DB User bằng helper để đảm bảo key nhất quán
        const allUsers = loadAllUsers();
        const username = currentUser.name.toLowerCase();
        const user = allUsers[username];

        if (!user) return null;

        // 2. Khởi tạo cấu trúc lưu trữ nếu chưa có
        if (!user.progress) user.progress = {};
        if (!user.progress[weekId]) user.progress[weekId] = {};

        const oldPercent = user.progress[weekId][stationKey] || 0;

        // 3. Logic: Chỉ cập nhật nếu điểm cao hơn (để không bị tụt)
        if (percent > oldPercent) {
            user.progress[weekId][stationKey] = percent;
            
            // 4. Tính toán Gamification (Thưởng sao)
            // Cứ mỗi lần đạt mốc 100% của 1 trạm -> Thưởng 5 sao
            if (percent === 100 && oldPercent < 100) {
                user.stats = user.stats || {};
                user.stats.stars = (user.stats.stars || 0) + 5;
            }

            // 5. Lưu lại bằng helper
            allUsers[username] = user;
            saveUserToDB(username, user);
            
            // Trả về user mới để App cập nhật State
            return user;
        }
    } catch (e) {
        console.error("Save progress error", e);
    }
    return null; // Không có thay đổi
};

// Hàm lấy % hoàn thành của cả tuần (dùng cho Progress Bar ở Sidebar)
export const getWeekProgress = (user, weekId) => {
    if (!user || !user.progress || !user.progress[weekId]) return 0;
    
    // Giả sử 1 tuần có 12 trạm chính
    const TOTAL_STATIONS = 12; 
    const progressData = user.progress[weekId];
    
    // Cộng tổng % các trạm đã làm
    let totalPercent = 0;
    Object.values(progressData).forEach(p => totalPercent += p);
    
    // Chia trung bình
    return Math.min(100, Math.round(totalPercent / TOTAL_STATIONS));
};
