/**
 * Teacher Dashboard - Monitor Student Progress
 * Allows teachers to view student learning progress and AI feedback
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch list of students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setStudents(data || []);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // 2. Fetch progress logs when a student is selected
  const handleSelectStudent = async (studentId) => {
    setSelectedStudent(studentId);
    
    try {
      const { data, error } = await supabase
        .from('progress_logs')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching progress logs:', error);
      setLogs([]);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ 
      padding: '20px', 
      display: 'flex', 
      gap: '20px',
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Left Column: Student List */}
      <div className="student-list" style={{ 
        width: '30%', 
        borderRight: '1px solid #e0e0e0',
        overflowY: 'auto',
        paddingRight: '20px'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>
          Students ({students.length})
        </h2>
        
        {students.length === 0 ? (
          <p style={{ color: '#666' }}>No students found</p>
        ) : (
          students.map(student => (
            <div
              key={student.id}
              onClick={() => handleSelectStudent(student.id)}
              style={{
                padding: '15px',
                marginBottom: '10px',
                cursor: 'pointer',
                borderRadius: '8px',
                background: selectedStudent === student.id ? '#e3f2fd' : 'white',
                border: '1px solid #e0e0e0',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                if (selectedStudent !== student.id) {
                  e.currentTarget.style.background = '#f5f5f5';
                }
              }}
              onMouseLeave={e => {
                if (selectedStudent !== student.id) {
                  e.currentTarget.style.background = 'white';
                }
              }}
            >
              <strong style={{ fontSize: '16px', color: '#333' }}>
                {student.full_name || 'Unnamed Student'}
              </strong>
              <p style={{ 
                margin: '5px 0 0 0', 
                fontSize: '12px', 
                color: '#666' 
              }}>
                Week: {student.current_week || 1}
              </p>
              <p style={{ 
                margin: '5px 0 0 0', 
                fontSize: '11px', 
                color: '#999' 
              }}>
                {new Date(student.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Right Column: Progress Details */}
      <div className="progress-details" style={{ 
        flex: 1,
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>
          Progress Details
        </h2>
        
        {!selectedStudent ? (
          <p style={{ color: '#666' }}>
            Select a student to view their progress details
          </p>
        ) : logs.length === 0 ? (
          <p style={{ color: '#666' }}>
            No progress logs found for this student
          </p>
        ) : (
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ 
                background: '#f5f5f5', 
                textAlign: 'left',
                borderBottom: '2px solid #e0e0e0'
              }}>
                <th style={{ padding: '12px', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '12px', fontWeight: '600' }}>Activity</th>
                <th style={{ padding: '12px', fontWeight: '600' }}>Score</th>
                <th style={{ padding: '12px', fontWeight: '600' }}>AI Feedback</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr 
                  key={log.id} 
                  style={{ borderBottom: '1px solid #e0e0e0' }}
                >
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    {new Date(log.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: '#f0f0f0',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {log.activity_type || 'Unknown'}
                    </span>
                  </td>
                  <td style={{ 
                    padding: '12px', 
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: (log.score || 0) >= 80 ? '#4caf50' : (log.score || 0) >= 60 ? '#ff9800' : '#f44336'
                  }}>
                    {log.score || 0}/100
                  </td>
                  <td style={{ 
                    padding: '12px', 
                    maxWidth: '400px',
                    fontSize: '14px',
                    color: '#555'
                  }}>
                    {log.ai_feedback || 'No feedback'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
