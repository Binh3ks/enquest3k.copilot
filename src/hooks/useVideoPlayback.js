/**
 * useVideoPlayback.js - Pure YouTube video playback for shadowing
 * 
 * This hook is COMPLETELY SEPARATE from TTS playback.
 * It handles only video playback - play, pause, seek, auto-advance through sentences.
 * 
 * No TTS integration - video plays independently.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { VoiceService } from '../services/voiceService';
import { speakText } from '../utils/AudioHelper';

export function useVideoPlayback({
  ytPlayerRef,           // ref to YouTube player (set once on onReady, never stale)
  effectiveScript,       // Script sentences with timestamps
  onSentenceChange,      // Callback when sentence changes
  speed = 1,
}) {
  // Video playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentenceId, setCurrentSentenceId] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);
  
  // Refs for internal state
  const activeRef = useRef(false);
  const pollIntervalRef = useRef(null);
  const lastSentenceRef = useRef(null);
  
  // Check if YouTube player is ready — read from ref so we always get the
  // live object even before ytPlayer state is set on mount.
  const checkPlayerReady = useCallback(() => {
    const p = ytPlayerRef.current;
    return p && typeof p.getPlayerState === 'function';
  }, [ytPlayerRef]);
  
  // Start playing from a specific sentence — reads ytPlayer from ref.
  const playFromSentence = useCallback((sentenceId) => {
    const player = ytPlayerRef.current;
    if (!player || !checkPlayerReady()) {
      console.log('[VideoPlayback] player not ready yet');
      return false;
    }
    
    // Find the sentence
    const sentence = effectiveScript.find(s => s.id === sentenceId);
    if (!sentence) {
      console.log('[VideoPlayback] sentence not found:', sentenceId);
      return false;
    }
    
    console.log('[VideoPlayback] playFromSentence:', sentence.id, 'at', sentence.start);
    
    // Seek to sentence start
    if (player.seekTo) {
      player.seekTo(sentence.start, true);
    }
    
    // Start playback
    if (player.loadAndPlay) {
      player.loadAndPlay(sentence.start);
    } else {
      try { player.playVideo(); } catch {}
    }
    
    setCurrentSentenceId(sentenceId);
    lastSentenceRef.current = sentenceId;
    setIsPlaying(true);
    activeRef.current = true;
    
    return true;
  }, [ytPlayerRef, effectiveScript, checkPlayerReady]);
  
  // Play from beginning
  const playAll = useCallback(() => {
    if (effectiveScript.length === 0) return;
    
    // Cancel any TTS that might be playing
    VoiceService._shouldPauseNext = true;
    speakText('');
    
    // Start from first sentence
    playFromSentence(effectiveScript[0].id);
  }, [effectiveScript, playFromSentence]);
  
  // Pause video — reads from ref.
  const pause = useCallback(() => {
    const p = ytPlayerRef.current;
    if (p?.pauseVideo) {
      p.pauseVideo();
    }
    setIsPlaying(false);
    activeRef.current = false;
    
    // Clear poll interval
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, [ytPlayerRef]);
  
  // Resume video — reads from ref.
  const resume = useCallback(() => {
    const p = ytPlayerRef.current;
    if (p?.playVideo) {
      p.playVideo();
    }
    setIsPlaying(true);
    activeRef.current = true;
  }, [ytPlayerRef]);
  
  // Stop video — reads from ref.
  const stop = useCallback(() => {
    const p = ytPlayerRef.current;
    if (p?.pauseVideo) {
      p.pauseVideo();
    }
    if (p?.seekTo && effectiveScript.length > 0) {
      p.seekTo(effectiveScript[0].start, true);
    }
    setIsPlaying(false);
    setCurrentSentenceId(null);
    activeRef.current = false;
    lastSentenceRef.current = null;
    
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, [ytPlayerRef, effectiveScript]);
  
  // Play next sentence
  const playNext = useCallback(() => {
    if (!currentSentenceId || effectiveScript.length === 0) return;
    
    const currentIdx = effectiveScript.findIndex(s => s.id === currentSentenceId);
    if (currentIdx < 0 || currentIdx >= effectiveScript.length - 1) {
      // At end, stop
      stop();
      return;
    }
    
    // Play next sentence
    playFromSentence(effectiveScript[currentIdx + 1].id);
  }, [currentSentenceId, effectiveScript, playFromSentence, stop]);
  
  // Set playback speed — reads from ref.
  const setSpeed = useCallback((newSpeed) => {
    const p = ytPlayerRef.current;
    if (p?.setPlaybackRate) {
      try { p.setPlaybackRate(newSpeed); } catch {}
    }
  }, [ytPlayerRef]);
  
  // Polling to track current sentence (for auto-advance and highlighting)
  useEffect(() => {
    if (!isPlaying || !activeRef.current) {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      return;
    }
    
    pollIntervalRef.current = setInterval(() => {
      const p = ytPlayerRef.current;
      if (!p || !checkPlayerReady()) return;
      
      const currentTime = p.getCurrentTime?.();
      if (typeof currentTime !== 'number') return;
      
      // Find which sentence we're in
      const currentSentence = effectiveScript.find(s =>
        currentTime >= s.start && currentTime < s.start + s.duration
      );
      
      if (currentSentence && currentSentence.id !== lastSentenceRef.current) {
        console.log('[VideoPlayback] sentence change:', lastSentenceRef.current, '->', currentSentence.id);
        lastSentenceRef.current = currentSentence.id;
        setCurrentSentenceId(currentSentence.id);
        
        // Notify parent
        if (onSentenceChange) {
          onSentenceChange(currentSentence.id);
        }
      }
    }, 250);
    
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [isPlaying, ytPlayerRef, effectiveScript, checkPlayerReady, onSentenceChange]);
  
  return {
    isPlaying,
    currentSentenceId,
    playerReady,
    playFromSentence,
    playAll,
    pause,
    resume,
    stop,
    playNext,
    setSpeed,
  };
}
