import fs from 'fs';

const apiKey = process.env.VITE_GOOGLE_TTS_API_KEY || process.env.GOOGLE_TTS_API_KEY;

async function testTTS() {
  const text = `<speak>
  <prosody pitch="-4st" rate="75%">Argh! <break time="500ms"/></prosody>
  <prosody pitch="+2st" rate="90%">Uh... <break time="200ms"/> No... </prosody>
  <prosody pitch="-1st" rate="80%"><break time="400ms"/> *Sigh*... You actually managed to hit me?</prosody>
</speak>`;
  
  // mock cleanTextForTTS
  let cleaned = text.replace(/\s+/g, ' ').trim();
  const isSSML = cleaned.trim().startsWith('<speak>');
  console.log('isSSML:', isSSML);
  
  if (!apiKey) {
    console.log('No API key to test real endpoint, but isSSML works.');
    return;
  }
}
testTTS();
