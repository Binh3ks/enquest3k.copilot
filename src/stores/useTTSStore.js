/**
 * TTS Settings Store
 * Persistent user preferences for Text-to-Speech voice and speed
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTTSStore = create(
  persist(
    (set) => ({
      // Voice selection
      // Voice selection
      voice: 'en-US-Journey-F', // Default: Google Journey Female, warm & natural
      
      // Speed selection  
      speed: 'auto', // 'auto' uses mode-based speed, or custom: 0.7, 0.85, 1.0, 1.2
      
      // Available voices (Google Cloud TTS)
      voices: [
        { 
          id: 'en-US-Journey-F', 
          name: 'Nova (Warm & Natural)', 
          type: 'female',
          description: 'Warm, natural female voice (Google Journey)'
        },
        { 
          id: 'en-US-Neural2-F', 
          name: 'Ms. Sarah (Clear & Crisp)', 
          type: 'female',
          description: 'Clear, crisp female voice (Google Neural2)'
        },
        { 
          id: 'en-US-Neural2-D', 
          name: 'Mr. David (Professional Male)', 
          type: 'male',
          description: 'Professional male voice (Google Neural2)'
        }
      ],
      
      // Speed presets
      speedPresets: [
        { id: 'auto', label: 'Auto', value: null, description: 'Smart speed based on context' },
        { id: 'slow', label: 'Slow (0.7x)', value: 0.7, description: 'Very slow for beginners' },
        { id: 'moderate', label: 'Moderate (0.85x)', value: 0.85, description: 'Slower for clear learning' },
        { id: 'normal', label: 'Normal (1.0x)', value: 1.0, description: 'Natural speaking speed' },
        { id: 'fast', label: 'Fast (1.2x)', value: 1.2, description: 'Faster for advanced learners' }
      ],
      
      // Actions — sync to localStorage for voiceService.playAudio() compatibility
      setVoice: (voice) => {
        localStorage.setItem('tts_voice', voice);
        set({ voice });
      },
      setSpeed: (speed) => {
        // Resolve preset to numeric value for voiceService
        const presets = useTTSStore.getState().speedPresets;
        const preset = presets.find(p => p.id === speed);
        const numericValue = preset?.value || 1.0;
        localStorage.setItem('tts_speed', String(numericValue));
        set({ speed });
      },
      
      // Get current speed value (resolve 'auto' to actual number based on mode)
      getSpeedValue: (mode = 'conversation') => {
        const state = useTTSStore.getState();
        if (state.speed === 'auto') {
          // Auto mode: use smart defaults
          return mode === 'pronunciation' ? 0.85 : 1.0;
        }
        // Find preset value
        const preset = state.speedPresets.find(p => p.id === state.speed);
        return preset?.value || 1.0;
      },
      
      // Get current voice config for ttsEngine
      getVoiceConfig: () => {
        const state = useTTSStore.getState();
        return state.voice;
      }
    }),
    {
      name: 'tts-settings', // localStorage key
      version: 1,
      onRehydrate: () => {
        return (state) => {
          if (!state) return;
          // Sync to localStorage keys that voiceService reads
          localStorage.setItem('tts_voice', state.voice || 'aura-asteria-en');
          const preset = state.speedPresets?.find(p => p.id === state.speed);
          localStorage.setItem('tts_speed', String(preset?.value || 1.0));
        };
      }
    }
  )
);

export default useTTSStore;
