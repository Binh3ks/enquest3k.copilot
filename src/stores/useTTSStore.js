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
      voice: 'aura-asteria-en', // Default: Female, warm, friendly
      
      // Speed selection  
      speed: 'auto', // 'auto' uses mode-based speed, or custom: 0.7, 0.85, 1.0, 1.2
      
      // Available voices
      voices: [
        { 
          id: 'aura-asteria-en', 
          name: 'Ms. Nova (Warm)', 
          type: 'female',
          description: 'Warm & friendly female voice'
        },
        { 
          id: 'aura-luna-en', 
          name: 'Ms. Luna (Calm)', 
          type: 'female',
          description: 'Calm & clear female voice'
        },
        { 
          id: 'aura-stella-en', 
          name: 'Ms. Stella (Energetic)', 
          type: 'female',
          description: 'Young & energetic female voice'
        },
        { 
          id: 'aura-orion-en', 
          name: 'Mr. Orion (Professional)', 
          type: 'male',
          description: 'Professional male voice'
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
      
      // Actions
      setVoice: (voice) => set({ voice }),
      setSpeed: (speed) => set({ speed }),
      
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
      version: 1
    }
  )
);

export default useTTSStore;
