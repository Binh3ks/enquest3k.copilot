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

// Helper: Sử dụng Native TTS (Phòng hờ cho Chrome/Safari)
const speakNativeTTS = (text, rate = 1.0, onEnd = null) => {
    return new Promise((resolve) => {
        if (!window.speechSynthesis) { resolve(false); return; }

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Tìm giọng mặc định tốt nhất
        const voice = voices.find(v => v.name === DEFAULT_TTS_VOICE_URI) || voices[0];
        if(voice) utterance.voice = voice;

        utterance.rate = rate;
        utterance.onend = () => {
            if(onEnd) onEnd();
            resolve(true);
        };
        utterance.onerror = (event) => {
            console.error("Native TTS Error:", event.error);
            resolve(false);
        };
        window.speechSynthesis.speak(utterance);
    });
};

// Hàm chính để phát Audio (TTS Server -> MP3 fallback -> Native TTS)
// station: Station ID for voice selection (read, new_word, dictation, ask_ai, shadowing, explore, word_power)
// weekNumber: Week number (1-7) for CDN pre-generated files
// mode: 'advanced' or 'easy' for CDN folder selection
// instant: If true, play Browser TTS immediately + prefetch Kokoro in background
// 🎯 PRIORITY: TTS server (Kokoro voices) > Old MP3 files > Native browser TTS
export const speakText = async (text, audioUrl = null, rate = 1.0, onEnd = null, station = 'read', weekNumber = null, mode = 'advanced', instant = false) => {
    if (!text) {
        if (onEnd) onEnd();
        return;
    }

    // 🎙️ 1. FIRST PRIORITY: Use Kokoro/Edge TTS Server with 7 different voices
    try {
        await VoiceService.speak(text, station, audioUrl, weekNumber, mode, instant);
        if(onEnd) onEnd();
        return true;
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
};
