/* AUDIO HELPER v3.0 - Supports Playback Rate & onEnd Callback */

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

// Hàm chính để phát Audio (MP3/URL -> Google TTS -> Native TTS)
export const speakText = async (text, audioUrl = null, rate = 1.0, onEnd = null) => {
    if (!text) {
        if (onEnd) onEnd();
        return;
    }

    // 1. Ưu tiên Audio URL (MP3 files)
    if (audioUrl) {
        return new Promise((resolve) => {
            const audio = new Audio(audioUrl);
            audio.playbackRate = rate;
            
            // Xử lý khi phát xong
            audio.onended = () => { if(onEnd) onEnd(); resolve(true); };
            audio.onplay = () => resolve(true);

            // 2. Nếu Audio URL lỗi, chuyển sang TTS
            audio.onerror = async () => {
                console.warn(`[AudioHelper] Failed to load MP3: ${audioUrl}. Falling back to TTS.`);
                // 3. Fallback 1: Google TTS (Lưu ý: Google TTS có thể bị chặn, nên dùng Native TTS)
                await speakNativeTTS(text, rate, onEnd);
                resolve(true);
            };
            
            // Bắt đầu phát (Nếu file tồn tại, nó sẽ chạy onplay/onended. Nếu lỗi, nó sẽ chạy onerror)
            audio.play().catch(async (e) => {
                // Play() failed (thường do policy của trình duyệt, hoặc lỗi file)
                console.warn(`[AudioHelper] Play attempt failed: ${e.message}. Falling back to TTS.`);
                // 3. Fallback 2: Native TTS (An toàn nhất)
                await speakNativeTTS(text, rate, onEnd);
                resolve(true);
            });
        });
    }

    // Nếu không có audioUrl, chỉ dùng Native TTS
    await speakNativeTTS(text, rate, onEnd);
    return true;
};
