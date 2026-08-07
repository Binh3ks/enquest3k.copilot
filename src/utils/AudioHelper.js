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
export const speakText = async (text, audioUrl = null, rate = 1.0, onEnd = null, station = 'read', weekNumber = null, mode = 'advanced', instant = false) => {
    if (!text) {
        if (onEnd) onEnd();
        return;
    }

    // 🎙️ 1. FIRST PRIORITY: Use Kokoro/Edge TTS Server with 7 different voices
    try {
        await VoiceService.speak(text, station, audioUrl, weekNumber, mode, instant);
        const audioEl = VoiceService._currentAudio;
        if (audioEl) {
            let fired = false;
            const fire = () => {
                if (fired) return;
                fired = true;
                try {
                    audioEl.removeEventListener && audioEl.removeEventListener('ended', fire);
                    audioEl.removeEventListener && audioEl.removeEventListener('error', fire);
                } catch { /* ignore */ }
                if (onEnd) onEnd();
            };
            // Wire onEnd to actual playback events. Three paths:
            //   1. `ended` — normal audio completion
            //   2. `error` — broken blob / network / unsupported codec
            //   3. Safety timeout — even if neither fires (rare), the
            //      sequence still progresses. Floor 2s ensures we never
            //      fire faster than a real sentence would play.
            try {
                audioEl.addEventListener('ended', fire, { once: true });
                audioEl.addEventListener('error', fire, { once: true });
            } catch { /* ignore */ }
            const safetyMs = Math.max(2000, (text.length || 0) * 80);
            setTimeout(fire, safetyMs);
            return true;
        }
        // No audio element — fall through to estimate-only fallback below.
    } catch (ttsError) {
        console.warn(`[AudioHelper] TTS server failed (station: ${station}):`, ttsError.message);

        // 📀 2. FALLBACK: Try old MP3 file if available (legacy content)
        if (audioUrl) {
            try {
                await new Promise((resolve, reject) => {
                    const audio = new Audio(audioUrl);
                    audio.playbackRate = rate;

                    audio.onended = () => { if(onEnd) onEnd(); resolve(); };
                    audio.onerror = (e) => reject(new Error(`MP3 load failed: ${e.message || 'Unknown error'}`));

                    audio.play().catch(reject);
                });
                console.log(`[AudioHelper] ✅ Used fallback MP3: ${audioUrl}`);
                return true;
            } catch (mp3Error) {
                console.warn(`[AudioHelper] MP3 fallback also failed:`, mp3Error.message);
            }
        }

        // 🔊 3. LAST RESORT: Browser native TTS (no custom voice)
        console.warn('[AudioHelper] Using native browser TTS as last resort');
        await speakNativeTTS(text, rate, onEnd);
        return true;
    }

    // No audio element (extremely rare) — estimate-only fallback.
    const fallbackMs = Math.max(2000, (text.length || 0) * 80);
    setTimeout(() => { if (onEnd) onEnd(); }, fallbackMs);
    return true;
};
