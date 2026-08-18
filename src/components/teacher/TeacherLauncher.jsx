import React, { useState, useEffect } from 'react';
import TeacherPanel from './TeacherPanel';
import { Users, Mail } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import { teacherAPI } from '../../services/api';

const STAFF_ROLES = ['teacher', 'admin', 'super_admin', 'team_leader', 'center_director'];

const TeacherLauncher = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const currentUser = useUserStore(state => state.currentUser);
  const isTeacherPanelOpen = useUserStore(state => state.isTeacherPanelOpen);
  const setTeacherPanelOpen = useUserStore(state => state.setTeacherPanelOpen);
  const isTeacher = STAFF_ROLES.includes(currentUser?.role);

  useEffect(() => {
    const handler = () => setTeacherPanelOpen(true);
    window.addEventListener('open-teacher-panel', handler);
    return () => window.removeEventListener('open-teacher-panel', handler);
  }, [setTeacherPanelOpen]);

  // Poll for unread messages (silently in background)
  useEffect(() => {
    if (!isTeacher) return;

    const fetchUnread = async () => {
      try {
        const response = await teacherAPI.getUnreadCount();
        setUnreadCount(response?.data?.count || 0);
      } catch (_) {
        setUnreadCount(0);
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 30000); // Poll every 30s

    return () => clearInterval(interval);
  }, [isTeacher]);

  if (!isTeacher) return null;

  return (
    <>
      <button 
        onClick={() => setTeacherPanelOpen(true)}
        className="fixed bottom-4 right-20 z-[9999] w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 border-white cursor-pointer no-print group relative"
        title="Teacher Panel - My Students"
      >
        <Users className="w-6 h-6 group-hover:rotate-6 transition-transform" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isTeacherPanelOpen && (
        <TeacherPanel 
          isOpen={isTeacherPanelOpen} 
          onClose={() => setTeacherPanelOpen(false)} 
        />
      )}
    </>
  );
};

export default TeacherLauncher;
