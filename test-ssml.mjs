import { VoiceService } from './src/services/voiceService.js';
console.log(VoiceService.cleanTextForTTS(`<speak>
  <prosody pitch="-4st" rate="75%">Argh! <break time="500ms"/></prosody>
</speak>`));
