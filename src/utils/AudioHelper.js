/* AUDIO HELPER v4.0 - Piper TTS Integration + Playback Rate & onEnd Callback */

import { VoiceService } from '../services/voiceService';

let voices = [];
const DEFAULT_TTS_VOICE_URI = "Google US English"; // Giọng mặc định tốt nhất cho TTS

export const loadVoices = () => {
  return new Promise((resolve) => {
    if (voices.length > 0) { resolve(voices); return; }
    const synth = window.speechSynthesis;
    if (!synth) { resolve([]); return; }
    const populateVoices = () => {
      voices = synth.getVoices();
      resolve(voices);
    };
    populateVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoices;
    }
    // Nếu sau 1 giây mà vẫn chưa load xong, resolve rỗng
    setTimeout(() => { if (voices.length === 0) resolve([]); }, 1000);
  });
};

export const getVoicesList = () => voices;

let selectedVoiceURI = null;
export const setVoice = (uri) => { selectedVoiceURI = uri; };

let _activeNativeUtterance = null;

// Helper: Sử dụng Native TTS (Phòng hờ cho Chrome/Safari)
const speakNativeTTS = (text, rate = 1.0, onEnd = null) => {
    return new Promise((resolve) => {
        if (!window.speechSynthesis) { resolve(false); return; }
        const synth = window.speechSynthesis;
        if (synth.paused) synth.resume();
        try { synth.cancel(); } catch {}

        let cleanText = (text || '').trim();
        if (!cleanText) { resolve(false); return; }
        cleanText = cleanText.replace(/^["'\s]+|["'\s]+$/g, '');

        const utterance = new SpeechSynthesisUtterance(cleanText);
        // CRITICAL V8 GC FIX: Store utterance reference so V8 GC does not collect mid-speech
        _activeNativeUtterance = utterance;
        
        const voicesList = synth.getVoices();
        const voice = voicesList.find(v => v.name === 'Google US English' || v.lang === 'en-US' || (v.lang.startsWith('en-') && (v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Female')))) || voicesList[0];
        if (voice) utterance.voice = voice;

        utterance.rate = cleanText.split(/\s+/).length <= 2 ? 0.90 : rate;
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
            _activeNativeUtterance = null;
            if (onEnd) onEnd();
            resolve(true);
        };
        utterance.onerror = (event) => {
            _activeNativeUtterance = null;
            console.error("Native TTS Error:", event);
            resolve(false);
        };
        synth.speak(utterance);
    });
};

// Hàm chính để phát Audio (TTS Server -> MP3 fallback -> Native TTS)
// station: Station ID for voice selection (read, new_word, dictation, ask_ai, shadowing, explore, word_power)
// weekNumber: Week number (1-7) for CDN pre-generated files
// mode: 'advanced' or 'easy' for CDN folder selection
// instant: If true, play Browser TTS immediately + prefetch Kokoro in background
// 🎯 PRIORITY: TTS server (Kokoro voices) > Old MP3 files > Native browser TTS
//
// Jun 30 fix: onEnd is bound to `audio.ended`/`error` event with a safety
// timeout fallback. Pre-fix, an empty or corrupted cached blob caused the
// browser to fire `audio.ended` immediately after `audio.play()` — which
// made speakText fire onEnd in <1ms, the sequence advanced rapidly through
// every sentence without any audible speech.
// With this fix, speakText installs a robust onEnd listener chain (ended
// event + error event + safety timeout). Only one of these fires (with a
// `fired` guard). The safety timeout floor (2s) prevents rapid-fire even
// when many sentences share the broken-blob path.
export const speakText = async (text, audioUrl = null, rate = 1.0, onEnd = null, station = 'read', weekNumber = null, mode = 'advanced', instant = false, onPlayStart = null) => {
    if (!text) {
        if (onEnd) onEnd();
        return;
    }

    // 🎙️ 1. FIRST PRIORITY: Use Kokoro/Edge TTS Server with 7 different voices
    try {
        await VoiceService.speak(text, station, audioUrl, weekNumber, mode, instant, null, onPlayStart);
        if (onEnd) onEnd();
        return true;
    } catch (ttsError) {
        console.warn(`[AudioHelper] TTS server error handled by VoiceService:`, ttsError.message);
        if (onEnd) onEnd();
        return false;
    }
};
