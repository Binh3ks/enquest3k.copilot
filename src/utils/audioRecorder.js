/**
 * audioRecorder.js - Record audio from user microphone
 * 
 * Used for pronunciation practice with Deepgram STT
 * Records audio in webm/opus format (best browser support)
 */

/**
 * Record audio from user microphone
 * @param {number} maxDuration - Max recording duration in ms (default 5000 = 5 seconds)
 * @returns {Promise<Blob>} - Audio blob in webm/opus format
 */
export async function recordAudio(maxDuration = 5000) {
  try {
    // Request microphone permission with audio constraints
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        echoCancellation: true,  // Reduce echo for better speech recognition
        noiseSuppression: true,  // Filter out background noise
        autoGainControl: true    // Normalize volume levels
      } 
    });

    // Determine best supported mime type
    let mimeType = 'audio/webm;codecs=opus';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      // Fallback for browsers that don't support opus
      mimeType = 'audio/webm';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/mp4'; // Last resort (Safari)
      }
    }

    // Create MediaRecorder
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: mimeType
    });

    const audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    // Start recording
    mediaRecorder.start();
    console.log('🎙️ Recording started... (max duration:', maxDuration, 'ms)');

    // Auto-stop after maxDuration OR when user stops manually
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (mediaRecorder.state !== 'inactive') {
          console.log('⏰ Max duration reached, stopping recording');
          mediaRecorder.stop();
        }
      }, maxDuration);

      mediaRecorder.onstop = () => {
        clearTimeout(timeout);
        
        // Release microphone resources
        stream.getTracks().forEach(track => track.stop());
        
        // Create audio blob from recorded chunks
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        
        console.log('⏹️ Recording stopped. Size:', audioBlob.size, 'bytes, Type:', audioBlob.type);
        
        if (audioBlob.size === 0) {
          reject(new Error('Recording failed - no audio data captured'));
        } else {
          resolve(audioBlob);
        }
      };

      mediaRecorder.onerror = (error) => {
        clearTimeout(timeout);
        stream.getTracks().forEach(track => track.stop());
        console.error('❌ MediaRecorder error:', error);
        reject(error);
      };
    });

  } catch (error) {
    console.error('❌ Error accessing microphone:', error);
    
    if (error.name === 'NotAllowedError') {
      throw new Error('Microphone permission denied. Please allow microphone access in your browser settings.');
    } else if (error.name === 'NotFoundError') {
      throw new Error('No microphone found. Please connect a microphone and try again.');
    } else {
      throw new Error(`Microphone error: ${error.message}`);
    }
  }
}

/**
 * Check if browser supports audio recording
 * @returns {boolean}
 */
export function isRecordingSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
}

/**
 * Get list of available audio input devices
 * @returns {Promise<MediaDeviceInfo[]>}
 */
export async function getAudioInputDevices() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'audioinput');
  } catch (error) {
    console.error('Error enumerating devices:', error);
    return [];
  }
}
