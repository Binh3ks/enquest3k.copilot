import React, { useState, useEffect } from 'react';
import { X, Users, Send, TrendingDown, AlertCircle, Clock, Star } from 'lucide-react';
import { teacherAPI } from '../../services/api';

const TeacherPanel = ({ isOpen, onClose }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetail, setStudentDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadMyStudents();
    }
  }, [isOpen]);

  const loadMyStudents = async () => {
    setLoading(true);
    try {
      const response = await teacherAPI.getMyStudents();
      setStudents(response.data || []);
    } catch (error) {
      console.error('Failed to load students:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentDetail = async (studentId) => {
    setLoading(true);
    try {
      const response = await teacherAPI.getStudentDetail(studentId);
      setStudentDetail(response.data);
      setSelectedStudent(studentId);
    } catch (error) {
      console.error('Failed to load student detail:', error);
      alert('Failed to load student details');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedStudent) return;

    setLoading(true);
    try {
      await teacherAPI.sendMessage(selectedStudent, message, 'Message from Teacher');
      alert('Message sent!');
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const getAlertLevel = (student) => {
    const daysInactive = Math.floor(student.days_inactive || 0);
    if (daysInactive > 7) return { level: 'critical', color: 'red', text: `Inactive ${daysInactive}d` };
    if (daysInactive > 3) return { level: 'warning', color: 'yellow', text: `Inactive ${daysInactive}d` };
    return { level: 'ok', color: 'green', text: 'Active' };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 w-[95vw] h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h2 className="font-black text-xl leading-none text-white">TEACHER PANEL</h2>
              <p className="text-xs text-white/80 font-mono mt-1">My Students ({students.length})</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Student List */}
          <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto shrink-0">
            <div className="p-4 space-y-2">
              {loading && students.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Loading...</p>
              ) : students.length === 0 ? (
                <p className="text-gray-400 text-center py-8 italic">No students assigned yet</p>
              ) : (
                students.map(student => {
                  const alert = getAlertLevel(student);
                  const isSelected = selectedStudent === student.student_id;

                  return (
                    <button
                      key={student.student_id}
                      onClick={() => loadStudentDetail(student.student_id)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        isSelected 
                          ? 'bg-indigo-600 shadow-lg' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {student.avatar_url && (
                          <img src={student.avatar_url} className="w-10 h-10 rounded-full" alt="" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white truncate">{student.student_name}</p>
                          <p className="text-xs text-gray-300">Week {student.current_week || 1}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2 py-1 rounded font-bold ${
                          alert.color === 'red' ? 'bg-red-500/20 text-red-300' :
                          alert.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {alert.text}
                        </span>
                        {student.unread_messages_from_teacher > 0 && (
                          <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                            {student.unread_messages_from_teacher} unread
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel - Student Detail */}
          <div className="flex-1 bg-gray-900 overflow-y-auto">
            {loading && selectedStudent ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p className="font-bold">Loading student details...</p>
              </div>
            ) : !studentDetail ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Users size={64} className="mb-4 opacity-20" />
                <p className="text-lg font-bold">Select a student to view details</p>
              </div>
            ) : (
              <div className="p-8 space-y-6">
                {/* Student Header */}
                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    {studentDetail.student.avatar_url && (
                      <img 
                        src={studentDetail.student.avatar_url} 
                        className="w-16 h-16 rounded-full border-2 border-indigo-400" 
                        alt="" 
                      />
                    )}
                    <div>
                      <h3 className="text-2xl font-black text-white">{studentDetail.student.username}</h3>
                      <p className="text-gray-400">{studentDetail.student.email}</p>
                      <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-bold ${
                        studentDetail.student.plan === 'premium' 
                          ? 'bg-yellow-500/20 text-yellow-300' 
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {studentDetail.student.plan?.toUpperCase() || 'FREE'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Weekly Progress */}
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-4">Weekly Progress</h4>
                  <div className="space-y-3">
                    {studentDetail.weekProgress.map(week => {
                      const maxStars = 45; // Assuming 15 stations × 3 stars
                      const percentage = Math.round((week.total_stars / maxStars) * 100);
                      
                      return (
                        <div key={week.week_id} className="flex items-center gap-4">
                          <div className="w-16 text-sm font-bold text-gray-400">
                            Week {week.week_id}
                          </div>
                          <div className="flex-1">
                            <div className="h-8 bg-gray-700 rounded-lg overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-end pr-3"
                                style={{ width: `${percentage}%` }}
                              >
                                {percentage > 20 && (
                                  <span className="text-white text-xs font-bold">
                                    {percentage}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star size={16} className="fill-current" />
                            <span className="font-bold text-sm">{week.total_stars}/{maxStars}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Station Details (Current Week) */}
                {studentDetail.stationDetails && studentDetail.stationDetails.length > 0 && (
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">
                      Station Breakdown (Week {studentDetail.currentWeek})
                    </h4>
                    <div className="space-y-2">
                      {studentDetail.stationDetails.map((station, i) => {
                        const starsEarned = station.score >= 90 ? 3 : station.score >= 80 ? 2 : station.score >= 60 ? 1 : 0;
                        
                        return (
                          <div key={i} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                            <div>
                              <p className="font-bold text-white capitalize">
                                {station.station_type?.replace('_', ' ')}
                              </p>
                              <p className="text-xs text-gray-400">
                                {station.attempts || 1} attempt{station.attempts !== 1 ? 's' : ''}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-2xl font-bold text-white">{station.score}%</span>
                              <div className="flex gap-0.5">
                                {[1, 2, 3].map(star => (
                                  <Star 
                                    key={star} 
                                    size={16} 
                                    className={star <= starsEarned ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Send Message */}
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Send size={18}/> Send Message
                  </h4>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full p-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none min-h-[120px] resize-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || loading}
                    className="mt-3 w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send size={18}/> Send Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPanel;
