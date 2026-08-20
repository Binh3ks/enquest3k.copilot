import React from 'react';
import LexioMascot from '../mascot/LexioMascot';

/**
 * VoiceConsent — Onboarding step for voice recording permission
 * 
 * Required by Vietnamese data protection law (Nghị định 13/2023)
 * for children under 16 years old.
 * 
 * If declined:
 * - Speaking features (Retell, Shadowing recording) are disabled
 * - Listening playback remains fully functional
 * - Can be re-enabled in Settings at any time
 */

const VOICE_CONSENT_KEY = 'engquest_voice_consent';

export function hasVoiceConsent() {
  return localStorage.getItem(VOICE_CONSENT_KEY) === 'granted';
}

export function setVoiceConsent(granted) {
  localStorage.setItem(VOICE_CONSENT_KEY, granted ? 'granted' : 'denied');
}

export function isVoiceConsentPending() {
  return !localStorage.getItem(VOICE_CONSENT_KEY);
}

export default function VoiceConsentStep({ onAccept, onDecline }) {
  return (
    <div className="onboarding-step">
      <LexioMascot size={80} mood="listening" className="onboarding-mascot" />
      
      <h1 className="onboarding-title">Cho phép ghi âm 🎤</h1>
      <p className="onboarding-subtitle" style={{ marginBottom: 16 }}>
        Lexio cần nghe giọng của con để giúp con luyện phát âm tiếng Anh.
      </p>

      {/* Guarantees */}
      <div style={{
        width: '100%',
        background: '#f0fdf4',
        border: '2px solid #bbf7d0',
        borderRadius: 16,
        padding: '16px 20px',
        marginBottom: 20,
        textAlign: 'left',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span>✅</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#166534' }}>
            Giọng nói chỉ được xử lý trên thiết bị này
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span>✅</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#166534' }}>
            Không lưu trữ trên máy chủ
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>✅</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#166534' }}>
            Ba/mẹ có thể tắt bất cứ lúc nào trong Cài đặt
          </span>
        </div>
      </div>

      {/* Parent notice */}
      <p style={{
        fontSize: 12,
        fontWeight: 600,
        color: '#94a3b8',
        marginBottom: 20,
        fontStyle: 'italic',
      }}>
        👤 Phụ huynh: Theo Nghị định 13/2023, cần sự đồng ý của ba/mẹ trước khi ứng dụng sử dụng micro để ghi âm giọng nói trẻ em.
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 12, width: '100%' }}>
        <button
          onClick={onDecline}
          style={{
            flex: 1,
            padding: '14px 16px',
            background: '#f1f5f9',
            color: '#64748b',
            fontSize: 14,
            fontWeight: 700,
            border: '2px solid #e2e8f0',
            borderRadius: 14,
            cursor: 'pointer',
          }}
        >
          Từ chối
        </button>
        <button
          onClick={onAccept}
          className="onboarding-btn-primary"
          style={{
            flex: 2,
            margin: 0,
          }}
        >
          ✅ Đồng ý
        </button>
      </div>
    </div>
  );
}
