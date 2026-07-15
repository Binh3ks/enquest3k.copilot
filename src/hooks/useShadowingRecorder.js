import { useState, useRef, useCallback, useEffect } from 'react';
import { saveRecording, loadRecording, loadAllRecordingsForWeek } from '../utils/shadowingStorage';
import apiClient from '../services/api';

/**
 * useShadowingRecorder — Recording + scoring hook for shadowing station.
 *
 * Uses Deepgram STT (primary) with Web Speech API fallback.
 * Recordings persist to IndexedDB via shadowingStorage.js.
 */
export function useShadowingRecorder(weekId) {
  const [isRecording, setIsRecording] = useState(false);
  const [activeRecordId, setActiveRecordId] = useState(null);
  const [recordings, setRecordings] = useState({}); // { [sentenceId]: blobUrl }
  const [scores, setScores] = useState({});          // { [sentenceId]: { score, feedback, transcript } }

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recognitionRef = useRef(null);

  // Load all recordings + scores from IndexedDB on mount
  useEffect(() => {
    if (!weekId) return;
    loadAllRecordingsForWeek(weekId).then(blobs => {
      if (Object.keys(blobs).length > 0) {
        setRecordings(prev => ({ ...prev, ...blobs }));
      }
    });
    // Load scores from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem(`shadowing_scores_${weekId}`) || '{}');
      if (Object.keys(saved).length > 0) setScores(saved);
    } catch { /* ignore */ }
  }, [weekId]);

  // Persist scores to localStorage
  useEffect(() => {
    if (!weekId || Object.keys(scores).length === 0) return;
    try { localStorage.setItem(`shadowing_scores_${weekId}`, JSON.stringify(scores)); } catch { /* ignore */ }
  }, [scores, weekId]);

  // Score via Deepgram STT (primary)
  const scoreWithDeepgram = async (audioBlob, targetText, sentenceId) => {
    try {
      const formData = new FormData();
      const typedBlob = audioBlob instanceof Blob ? new Blob([audioBlob], {type: audioBlob.type || 'audio/webm'}) : audioBlob;
      formData.append('audio', typedBlob, 'recording.webm');
      formData.append('targetText', targetText);
      formData.append('mode', 'sentence');

      console.log('[ShadowingRecorder] Submitting to Deepgram:', JSON.stringify({
        targetText: formData.get('targetText'),
        audioBlobSize: formData.get('audio')?.size,
        audioBlobType: formData.get('audio')?.type,
        mode: formData.get('mode'),
        baseURL: apiClient.defaults.baseURL,
        fullURL: `${apiClient.defaults.baseURL}/pronunciation/evaluate-deepgram`,
      }, null, 2));
      const res = await apiClient.post('/pronunciation/evaluate-deepgram', formData);
      const data = res.data;

      if (data.success && data.evaluation) {
        setScores(prev => ({
          ...prev,
          [sentenceId]: {
            score: data.evaluation.score,
            feedback: data.evaluation.feedback || '',
            transcript: data.transcript || '',
            provider: 'deepgram',
          },
        }));
        return;
      }
    } catch (err) {
      console.error('[ShadowingRecorder] Deepgram Server Error Details:', JSON.stringify({
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message,
        url: err.config?.url,
        method: err.config?.method,
      }, null, 2));
    }

    // Fallback to Web Speech API
    scoreWithWebSpeech(targetText, sentenceId);
  };

  // Score via Web Speech API (fallback)
  const scoreWithWebSpeech = (targetText, sentenceId) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setScores(prev => ({
        ...prev,
        [sentenceId]: { score: 0, feedback: 'Speech recognition unavailable', transcript: '', provider: 'none' },
      }));
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onresult = (e) => {
        const transcript = e.results[0]?.[0]?.transcript || '';
        const score = wordMatchScore(transcript, targetText);
        setScores(prev => ({
          ...prev,
          [sentenceId]: {
            score,
            feedback: '',
            transcript,
            provider: 'webspeech',
          },
        }));
      };
      rec.onerror = () => {
        setScores(prev => ({
          ...prev,
          [sentenceId]: { score: 0, feedback: '', transcript: '', provider: 'webspeech_error' },
        }));
      };
      recognitionRef.current = rec;
      rec.start();
    } catch {
      // Web Speech not available
    }
  };

  // Simple word-matching score
  const wordMatchScore = (recognized, target) => {
    const normalize = s => s.toLowerCase().replace(/[^a-z'\s]/g, '').trim().split(/\s+/).filter(Boolean);
    const recWords = normalize(recognized);
    const targetArr = normalize(target);
    if (targetArr.length === 0) return 0;
    const remaining = [...targetArr];
    let matches = 0;
    recWords.forEach(w => {
      const idx = remaining.indexOf(w);
      if (idx !== -1) { matches++; remaining.splice(idx, 1); }
    });
    return Math.round((matches / targetArr.length) * 100);
  };

  // Start recording
  const startRecording = useCallback(async (sentenceId, targetText) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      chunksRef.current = [];

      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        saveRecording(weekId, String(sentenceId), blob);
        setRecordings(prev => ({ ...prev, [sentenceId]: url }));
        stream.getTracks().forEach(t => t.stop());

        // Score the recording
        scoreWithDeepgram(blob, targetText, sentenceId);
      };

      mr.start();
      mediaRecorderRef.current = mr;
      setIsRecording(true);
      setActiveRecordId(sentenceId);
    } catch (err) {
      console.error('[ShadowingRecorder] Mic access denied:', err);
      alert('Microphone access is required for recording. Please allow microphone access and try again.');
    }
  }, [weekId]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
      recognitionRef.current = null;
    }
    setIsRecording(false);
    setActiveRecordId(null);
  }, []);

  // Pause an in-flight recording. Idempotent — no-op if not currently recording
  // or already paused. Used by the inline Play/Pause button to halt the
  // challenge mid-recording without throwing away the audio chunks.
  const pauseRecording = useCallback(() => {
    const mr = mediaRecorderRef.current;
    if (mr && mr.state === 'recording') {
      try { mr.pause(); } catch (e) { console.warn('[ShadowingRecorder] MediaRecorder.pause() failed:', e); }
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
    }
  }, []);

  // Resume a paused recording. Idempotent — no-op if not currently paused.
  const resumeRecording = useCallback(() => {
    const mr = mediaRecorderRef.current;
    if (mr && mr.state === 'paused') {
      try { mr.resume(); } catch (e) { console.warn('[ShadowingRecorder] MediaRecorder.resume() failed:', e); }
    }
  }, []);

  // Play a recording
  const playRecording = useCallback(async (sentenceId) => {
    let url = recordings[sentenceId];
    if (!url) {
      url = await loadRecording(weekId, String(sentenceId));
      if (!url) return null;
      setRecordings(prev => ({ ...prev, [sentenceId]: url }));
    }
    const audio = new Audio(url);
    audio.play().catch(err => console.error('[ShadowingRecorder] Playback failed:', err));
    return audio;
  }, [recordings, weekId]);

  // ── Record All (full_script) ──────────────────────────────────
  const allRecorderRef = useRef(null);
  const allChunksRef = useRef([]);
  const [isRecordingAll, setIsRecordingAll] = useState(false);
  const allStartPromiseRef = useRef(null);

  const startRecordAll = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      allChunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) allChunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(allChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        saveRecording(weekId, 'full_script', blob);
        // CRITICAL: update recordings state so playRecording can find it
        setRecordings(prev => ({ ...prev, full_script: url }));
        stream.getTracks().forEach(t => t.stop());
      };
      mr.start();
      allRecorderRef.current = mr;
      setIsRecordingAll(true);
    } catch (err) {
      console.error('[ShadowingRecorder] Mic access denied:', err);
      throw err; // Let caller handle UI
    }
  }, [weekId]);

  const stopRecordAll = useCallback(() => {
    if (allRecorderRef.current?.state === 'recording') {
      allRecorderRef.current.stop();
    }
    setIsRecordingAll(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      }
      if (allRecorderRef.current?.state === 'recording') {
        allRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      }
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch { /* ignore */ }
      }
    };
  }, []);

  return {
    isRecording,
    activeRecordId,
    recordings,
    scores,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    playRecording,
    isRecordingAll,
    startRecordAll,
    stopRecordAll,
  };
}
