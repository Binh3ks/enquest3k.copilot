import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useStationProgress } from '../../hooks/useStationProgress';
import { useTTSPrefetch } from '../../hooks/useTTSPrefetch';
import { useShadowingPlayer } from '../../hooks/useShadowingPlayer';
import { useShadowingRecorder } from '../../hooks/useShadowingRecorder';
import { useShadowingChallenge } from '../../hooks/useShadowingChallenge';
import { useShadowingYouTubeBridge } from '../../hooks/useShadowingYouTubeBridge';
import { useShadowingVideoSync } from '../../hooks/useShadowingVideoSync';
import { useShadowingPlayPause } from '../../hooks/useShadowingPlayPause';
import { VoiceService } from '../../services/voiceService';
import { loadIpaData, generateIpaForText } from './ipaUtils';
import { useWordHighlight } from './useWordHighlight';
import { useTTSWordHighlight } from './useTTSWordHighlight';
import { getTranscript, getCleanedTranscriptSentences, _GLOBS as _TRANSCRIPT_GLOBS } from './transcriptUtils';
import ShadowingHeader from './ShadowingHeader';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import FullPracticeModal from './FullPracticeModal';
import SavePracticeModal from './SavePracticeModal';
import ChallengeBar from './ChallengeBar';
import ShadowingErrorBoundary from './ShadowingErrorBoundary';
import FloatingVideoWindow from './FloatingVideoWindow';
import { generateText } from '../../services/aiProxy';

const Shadowing = ({ data, themeColor, isVi, onToggleLang, weekNumber, mode = 'advanced' }) => {
  const { weekId } = useParams();
  const currentWeek = weekNumber || parseInt(weekId);

  const { savedData, saveProgress, markComplete } = useStationProgress(parseInt(weekId), 'skill_shadowing');
  const { prefetchFromArray } = useTTSPrefetch('shadowing', currentWeek);

  const script = data?.script || data?.sentences || [];
  const ttsScript = data?.ttsScript || script;

  // IPA data
  const [ipaData, setIpaData] = useState(null);
  // Transcript IPA cache (generated on-the-fly for transcript text)
  const [transcriptIpa, setTranscriptIpa] = useState({});
  useEffect(() => {
    if (currentWeek) loadIpaData(currentWeek, mode).then(setIpaData);
  }, [currentWeek, mode]);

  // Video transcript (from cached YouTube captions)
  const videoTranscript = data?.videoId ? getTranscript(data.videoId) : null;

  // YouTube player API ref (must be declared BEFORE useShadowingPlayer which uses it).
  // The loaded player API object + playback state are owned by useShadowingYouTubeBridge
  // (see below). The ref just exposes the API to useShadowingPlayer which writes
  // playback time into the polling interval there.
  const ytPlayerRef = useRef(null);
  // Refs to avoid TDZ: handleRecordAll (defined early) needs seekPlayback
  // and videoSync which are declared later. Refs are read at call-time only.
  const seekPlaybackRef = useRef(null);
  const videoSyncRef = useRef(null);

  // Hooks
  const player = useShadowingPlayer(ttsScript, currentWeek, mode, ytPlayerRef);
  const recorder = useShadowingRecorder(weekId);
  const youTube = useShadowingYouTubeBridge(ytPlayerRef, player);
  const ytPlayer = youTube.ytPlayer;
  const ytPlayerState = youTube.ytPlayerState;
  
  // Selected sentence (for right panel click → left panel focus).
  const [selectedId, setSelectedId] = useState(null);

  // Full Practice Modal
  const [practiceSentence, setPracticeSentence] = useState(null);
  const [practiceOpen, setPracticeOpen] = useState(false);

  // Save Practice Modal (per-sentence challenge mode with countdown + AI eval)
  const [savePracticeOpen, setSavePracticeOpen] = useState(false);
  // When 'SETUP' the modal is the setup screen; when 'SUMMARY' it's the end screen.
  // 'CLOSED' means modal hidden.
  const [saveModalMode, setSaveModalMode] = useState('CLOSED');

  // Floating video window
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);

  // Inline video (new): default true — embed YouTube at top of LeftPanel
  // so user sees video + shadowing controls at once, without needing to
  // click "Open Floating Video". They can still pop out to floating mode.
  const [videoInline, setVideoInline] = useState(true);

  const [corrections, setCorrections] = useState(() => {
    if (!data?.videoId) return {};
    try {
      // v2 (Jul 1, 2026): previous key shadowing_corrections_<videoId> held stale
      // edits from the old "My teacher is Nova" / Easy mode mirror-script (e.g.
      // sentence 2 = "I see my round face"). Those edits referred to sentence ids
      // that no longer exist after the W3 dialogue rewrite, so they appear as
      // ghost "edited" badges on the wrong text. Bumping to v2 gives a clean
      // slate per video; old data is left in place under the legacy key and
      // can be cleared from localStorage by users manually.
      const raw = localStorage.getItem('shadowing_corrections_v2_' + data.videoId);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });
  // TTS worker base — used for corrections endpoint (KV API).
  // Mirrors voiceService.js: same env var as /tts endpoint so domain can flip via .env.
  const CORRECTIONS_API_BASE = import.meta.env.VITE_TTS_WORKER_URL || '';
  // Fetch corrections from server on mount (if video exists + worker URL configured)
  useEffect(() => {
    if (!data?.videoId || !CORRECTIONS_API_BASE) return;
    (async () => {
    try {
      const res = await fetch(CORRECTIONS_API_BASE + '/api/corrections/' + data.videoId);
      if (!res.ok) return;
      const serverCorrections = await res.json();
      if (!serverCorrections || Object.keys(serverCorrections).length === 0) return;
      setCorrections(prev => {
        const merged = { ...serverCorrections, ...prev }; // localStorage takes precedence
        try { localStorage.setItem('shadowing_corrections_v2_' + data.videoId, JSON.stringify(merged)); } catch { /* ignore */ }
        return merged;
      });
    } catch (e) { console.warn('[Shadowing] corrections fetch failed:', e?.message); }
    })();
  }, [data?.videoId, CORRECTIONS_API_BASE]);
  const handleSaveCorrection = useCallback((sentenceId, newText) => {
    setCorrections(prev => {
      const next = { ...prev, [sentenceId]: newText };
      try { localStorage.setItem('shadowing_corrections_v2_' + data.videoId, JSON.stringify(next)); } catch { /* ignore */ }
      // Clear cached IPA so it gets regenerated from new text
      setTranscriptIpa(prev => {
        const { [sentenceId]: _, ...rest } = prev;
        return rest;
      });
      // Also save to server (fire-and-forget)
      if (CORRECTIONS_API_BASE) {
        fetch(CORRECTIONS_API_BASE + '/api/corrections/' + data.videoId, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: sentenceId, text: newText }),
        }).catch(() => {});
      }
      return next;
    });
  }, [data?.videoId, CORRECTIONS_API_BASE]);

  // (Transcript IPA useEffect moved to bottom of component for proper TDZ ordering)

  // Default: TTS lesson text. User clicks the video to switch to video
  // transcript mode. Don't auto-enable on inline video mount — the TTS
  // sync is the default behaviour the user expects on opening shadowing.
  // (June 30 revert: 57d49cda auto-enabled transcript source and forced
  // every Play click into YouTube seekPlayback, breaking the expected
  // TTS-first flow.)
  const [useTranscriptSource, setUseTranscriptSource] = useState(false);

  // Active sentence drives the karaoke display + RightPanel highlight.
  // In transcript mode, `selectedId` is updated by the 250ms sync effect
  // (useShadowingVideoSync) as video time crosses into each segment — so
  // it MUST win over `player.activeSentenceId`, which is fixed at the
  // sentence the user clicked Play on. In TTS mode the priority flips:
  // `player.activeSentenceId` updates as the sequence advances and is
  // what the karaoke display follows.
  const activeId = useTranscriptSource
    ? (selectedId || player.activeSentenceId)
    : (player.activeSentenceId || selectedId);

  // Practice settings (passed to settings modal) - persisted to localStorage.
  // June 30 fix #2: default waitMode 'off' (was '30%'). With auto-wait the
  // transcript mode felt choppy/ngắt quãng — every sentence with a ≥ 0.5s
  // natural gap paused briefly, producing audible re-seeks. Users can opt
  // into wait-mode via the Settings modal if they want catch-up pauses.
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('shadowing_settings');
      if (saved) return { ...{ accent: 'US', repeatCount: 1, waitMode: 'off', subSync: 0 }, ...JSON.parse(saved) };
    } catch { /* ignore */ }
    return { accent: 'US', repeatCount: 1, waitMode: 'off', subSync: 0 };
  });
  useEffect(() => {
    try { localStorage.setItem('shadowing_settings', JSON.stringify(settings)); } catch { /* ignore */ }
  }, [settings]);

  // Language/feature toggles
  const [showIPA, setShowIPA] = useState(true);
  const [showStress, setShowStress] = useState(true);
  const [showTranslate, setShowTranslate] = useState(false);

  // AI translate fallback — cache for sentences where vi is null
  const [translatedTexts, setTranslatedTexts] = useState({});
  const [translating, setTranslating] = useState(false);

  // Local completedIds state for Record All — declared BEFORE handleRecordAll to avoid TDZ error
  const [completedIdsLocal, setCompletedIdsLocal] = useState(new Set());

  // Full recording playback
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const playbackAudioRef = useRef(null);

  const hasFullRecording = !!recorder.recordings?.full_script;

  const handlePlayBackAll = useCallback(async () => {
    let url = recorder.recordings?.full_script;
    if (!url) {
      const { loadRecording } = await import('../../utils/shadowingStorage');
      url = await loadRecording(weekId, 'full_script');
      if (!url) return;
    }
    const audio = new Audio(url);
    audio.onended = () => setIsPlayingBack(false);
    playbackAudioRef.current = audio;
    audio.play();
    setIsPlayingBack(true);
  }, [recorder.recordings, weekId]);

  const handleStopPlayBack = useCallback(() => {
    if (playbackAudioRef.current) {
      playbackAudioRef.current.pause();
      playbackAudioRef.current.currentTime = 0;
    }
    setIsPlayingBack(false);
  }, []);

  // Download the full_script recording as a .webm file
  const handleDownloadAll = useCallback(async () => {
    let url = recorder.recordings?.full_script;
    if (!url) {
      const { loadRecording } = await import('../../utils/shadowingStorage');
      url = await loadRecording(weekId, 'full_script');
    }
    if (!url) {
      alert(isVi ? 'Chưa có bản ghi để tải xuống.' : 'No full recording to download yet.');
      return;
    }
    const a = document.createElement('a');
    a.href = url;
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    a.download = `shadowing-${weekId}-full_script-${ts}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [recorder.recordings, weekId, isVi]);

  

  // When transcript mode is on: use cleaned transcript segments directly as the sentence list
  const cleanedTranscriptSentences = useTranscriptSource && data?.videoId
    ? getCleanedTranscriptSentences(data.videoId)
    : [];

  // The "effective" script — cleaned transcript segments if enabled, else script.js
  // When ttsScript is provided, TTS mode uses ttsScript for both playback and display
  const baseScript = cleanedTranscriptSentences.length > 0
    ? cleanedTranscriptSentences
    : (data?.ttsScript ? ttsScript : script);
  const effectiveScript = baseScript.map(s => ({
    ...s,
    text: corrections[s.id] || s.text,
    _corrected: !!corrections[s.id],
  }));

  // Challenge script: same source as effectiveScript (so it matches the
  // transcript the user sees in the right panel) but FILTERED to a single
  // dialogue cycle. The W3 video has 3 cycles of the same dialogue
  // (33 JSON segments). For challenge practice the user only wants ONE
  // cycle (~10 unique entries). We dedupe by text and skip the leading
  // "." fragments that ASR sometimes emits.
  //
  // After filtering, also adjust `duration` to be non-overlapping: each
  // entry's window [start, start+duration] should end where the NEXT
  // entry starts. The raw ASR durations overlap (e.g. "I don't know."
  // [20.76, 25.60] + "Oh, no." [22.68, 25.60]), so when the challenge
  // plays "I don't know" for 4.84s, the YouTube audio runs into "Oh, no."
  // and the user hears them as one merged phrase. Trimming duration
  // here means the challenge pauses the video right when the next
  // sentence's audio is about to start — no overlap.
  const challengeScript = effectiveScript
    .filter((s, i, arr) => {
      const text = (s.text || '').trim();
      if (text === '.' || text.length < 2) return false;          // skip ASR fragments
      if (i > 0 && text === arr[i - 1].text) return false;         // skip consecutive dupes
      // Keep only the first cycle. Cycle 2 starts at 42.72s with the
      // "What does she look like?" repeat.
      if (s.start >= 42) return false;
      return true;
    })
    .map((s, i, arr) => {
      if (i === arr.length - 1) return s;                          // last entry keeps raw duration
      const next = arr[i + 1];
      return { ...s, duration: Math.max(0.3, next.start - s.start) };
    });

    // Merge all per-sentence recordings into one WAV and trigger download.
  const handleChallengeDownload = useCallback(async () => {
    const { loadAllRecordingsForWeek } = await import('../../utils/shadowingStorage');
    const allRec = await loadAllRecordingsForWeek(weekId);
    const sentenceIds = effectiveScript.map(s => String(s.id));
    const urls = sentenceIds.map(id => allRec[id]).filter(Boolean);
    if (urls.length === 0) {
      alert(isVi ? 'Chưa có bản ghi nào để tải.' : 'No recordings to download.');
      return;
    }
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const buffers = [];
    for (const url of urls) {
      const res = await fetch(url);
      const arr = await res.arrayBuffer();
      try {
        const decoded = await ctx.decodeAudioData(arr);
        buffers.push(decoded);
      } catch { /* skip corrupt */ }
    }
    ctx.close();
    if (buffers.length === 0) {
      alert(isVi ? 'Không thể giải mã bản ghi.' : 'Could not decode recordings.');
      return;
    }
    const sr = buffers[0].sampleRate;
    const totalLen = buffers.reduce((sum, b) => sum + b.length, 0);
    const merged = new Float32Array(totalLen);
    let offset = 0;
    for (const buf of buffers) {
      merged.set(buf.getChannelData(0), offset);
      offset += buf.length;
    }
    const wavBuffer = new ArrayBuffer(44 + merged.length * 2);
    const view = new DataView(wavBuffer);
    const writeStr = (pos, str) => { for (let i = 0; i < str.length; i++) view.setUint8(pos + i, str.charCodeAt(i)); };
    writeStr(0, 'RIFF');
    view.setUint32(4, 36 + merged.length * 2, true);
    writeStr(8, 'WAVE');
    writeStr(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sr, true);
    view.setUint32(28, sr * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeStr(36, 'data');
    view.setUint32(40, merged.length * 2, true);
    for (let i = 0; i < merged.length; i++) {
      const s = Math.max(-1, Math.min(1, merged[i]));
      view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    const blob = new Blob([wavBuffer], { type: 'audio/wav' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    a.download = `shadowing-${weekId}-challenge-${ts}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
  }, [effectiveScript, weekId, isVi]);

  // Word-level highlight (karaoke-style) when video is playing.
  // `videoActive` and the segment-tracker that drives RightPanel are owned
  // by useShadowingVideoSync (hooked later, after useShadowingChallenge).
  const activeSentenceForHighlight = effectiveScript.find(s => s.id === activeId) || null;
  
  const handleRecordAll = useCallback(async () => {
    // Guard: don't start Record All while Save Practice mode is open
    if (savePracticeOpen) return;
    if (recorder.isRecordingAll) {
      // Stop both mic + playback
      recorder.stopRecordAll();
      player.stop();
      setCompletedIdsLocal(new Set(ttsScript.map(s => String(s.id))));
    } else {
      try {
        await recorder.startRecordAll();
        // Auto-start playback (transcript → video seek; otherwise → TTS playAll).
        // Uses refs to avoid TDZ with seekPlayback/videoSync declared below.
        if (useTranscriptSource && videoSyncRef.current?.videoActive && ytPlayerRef.current) {
          const firstId = effectiveScript[0]?.id;
          if (firstId) {
            seekPlaybackRef.current?.(firstId);
            setSelectedId(firstId);
          }
        } else if (effectiveScript.length > 0) {
          player.playAll(ttsScript);
        }
      } catch (err) {
        alert('Microphone access is required to record.');
      }
    }
  }, [recorder, script, savePracticeOpen, useTranscriptSource, effectiveScript, player]);

  // Prefetch TTS
  const hasPrefetched = useRef(false);
  useEffect(() => { hasPrefetched.current = false; }, [ttsScript.length]);
  useEffect(() => {
    if (hasPrefetched.current) return;
    if (ttsScript?.length > 0) {
      hasPrefetched.current = true;
      prefetchFromArray(ttsScript, 'text_en').catch(() => {});
    }
  }, [ttsScript.length, prefetchFromArray]);

  // AI translate fallback: when showTranslate is ON and active sentence has
  // vi=null (e.g. Easy mode weeks without pre-written Vietnamese), call LLM
  // once and cache the result in translatedTexts[activeId]. Renders in
  // LeftPanel with a "..." loading state.
  // Uses generateText (raw proxy) instead of sendToAI (which auto-replaces
  // short responses via responseParser.validateResponse — breaking translations).
  useEffect(() => {
    if (!showTranslate || !activeId) return;
    const sentence = (effectiveScript || []).find(s => s.id === activeId);
    if (!sentence) return;
    if (sentence.vi) return;                       // already has Vietnamese
    if (translatedTexts[activeId]) return;          // already cached
    if (!sentence.text) return;
    let cancelled = false;
    setTranslating(true);
    const prompt = `Translate this English sentence to Vietnamese. Reply with ONLY the Vietnamese translation — no explanation, no quotes, no English:\n${sentence.text}`;
    generateText(prompt).then(vi => {
      if (cancelled) return;
      const cleaned = (vi || '').replace(/^["'`"'"']+|["'`"'"']+$/g, '').trim();
      if (cleaned) setTranslatedTexts(prev => ({ ...prev, [activeId]: cleaned }));
    }).catch(err => {
      if (cancelled) return;
      console.warn('[Shadowing] AI translate failed:', err?.message);
    }).finally(() => {
      if (!cancelled) setTranslating(false);
    });
    return () => { cancelled = true; };
  }, [showTranslate, activeId, effectiveScript, translatedTexts]);

  // Progress tracking
  const completedIdsBase = React.useMemo(() => {
    const ids = new Set();
    (savedData.recordedSentenceIds || []).forEach(id => ids.add(String(id)));
    Object.keys(recorder.scores).forEach(id => ids.add(String(id)));
    return ids;
  }, [savedData, recorder.scores]);
  const completedIds = React.useMemo(() => {
    return new Set([...completedIdsBase, ...completedIdsLocal]);
  }, [completedIdsBase, completedIdsLocal]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (ttsScript.length === 0) return;
      const count = completedIds.size;
      const percent = Math.round((count / ttsScript.length) * 100);
      saveProgress({
        recordedSentenceIds: [...completedIds],
        totalSentences: ttsScript.length,
        completionPct: percent,
        lastPracticed: new Date().toISOString(),
      }, count >= ttsScript.length, percent);
      if (count >= ttsScript.length) markComplete(100);
    }, 1500);
    return () => clearTimeout(handler);
  }, [completedIds, script.length, saveProgress, markComplete]);

  // ── Handlers ──────────────────────────────────────────────────

  // Helper: get text for a sentence id from the active script (transcript or lesson).
  const getTextForId = useCallback((sentenceId) => {
    const s = effectiveScript.find(s => s.id === sentenceId);
    return s ? s.text : '';
  }, [effectiveScript]);

  // Seek-based playback: when video is open, play the segment from YouTube
  // NOTE: reads ytPlayerRef.current directly — ytPlayerRef is stable (never
  // changes, only its .current does on YouTube onReady). This avoids the stale-
  // closure bug where seekPlayback captured ytPlayer=null at mount time and
  // never updated even after YouTube reported ready.
  const seekPlayback = useCallback((sentenceId, seekToOverride) => {
    // Try effectiveScript first (transcript mode = JSON, lesson mode = script).
    // Fallback to the raw `script` (lesson) when the challenge is using
    // lesson IDs that don't align with the JSON (e.g. W3: lesson id=1
    // "What does she look like?" but JSON ids start at 2). Without this
    // fallback, the challenge falls back to TTS path because seekPlayback
    // returns false, and the user hears synthesized voice over the
    // transcript they're trying to practice.
    let seg = effectiveScript.find(s => s.id === sentenceId);
    if (!seg) {
      seg = script.find(s => s.id === sentenceId);
    }
    if (!seg) {
      console.log('[Shadowing] seekPlayback → no seg for sentenceId', sentenceId);
      return false;
    }
    // Read from ref so this callback works even if created before YouTube ready
// Read from ref so this callback works even if created before YouTube ready
    const yt = ytPlayerRef.current;
    if (useTranscriptSource && yt) {
      const target = typeof seekToOverride === 'number' ? seekToOverride : seg.start;
      console.log('[Shadowing] seekPlayback via YouTube', {
        sentenceId, segStart: seg.start, seekToOverride, target, ytReady: !!yt.loadAndPlay,
      });
      if (yt.loadAndPlay) {
        yt.seekTo(target, true);
        try { yt.playVideo(); } catch (e) {
          console.warn('[Shadowing] playVideo threw:', e);
        }
      }
      // Mark activeSentenceId so handlePlayPause case 2 (currently playing
      // → pause) fires reliably in transcript mode. Without this, the
      // inline Pause button saw idle and restarted playback from beginning.
      player.setActiveSentenceId(sentenceId);
      return true;
    }
    console.log('[Shadowing] seekPlayback → useTranscriptSource=', useTranscriptSource, ', yt=', !!yt, ' (fall through to TTS)');
    return false;
  }, [effectiveScript, useTranscriptSource, player]);

  // Wire refs so handleRecordAll (declared before seekPlayback) can read them
  useEffect(() => { seekPlaybackRef.current = seekPlayback; }, [seekPlayback]);

  const handlePlayOne = useCallback((sentenceId, text) => {
    console.log('[Shadowing] handlePlayOne (click sentence)', { sentenceId, useTranscriptSource });
    setSelectedId(sentenceId);
    // Video mode: use seekPlayback (reads ytPlayerRef.current directly — no stale closure)
    if (useTranscriptSource && ytPlayerRef.current) {
      if (seekPlayback(sentenceId)) return;
    }
    
    // TTS mode: use TTS player
    if (!text) text = getTextForId(sentenceId);
    player.playSentence(sentenceId, text);
  }, [player, getTextForId, seekPlayback, useTranscriptSource, ytPlayerRef]);

  const handleSelectSentence = useCallback((sentence) => {
    console.log('[Shadowing] handleSelectSentence (select only)', { sentenceId: sentence.id });
    setSelectedId(sentence.id);
    if (!player.isPlayingAll) {
      if (seekPlayback(sentence.id)) return;
      const text = getTextForId(sentence.id);
      player.playSentence(sentence.id, text);
    }
  }, [player, getTextForId, seekPlayback]);

  // Controls: prev/play-pause/next/replay
  const activeIndex = effectiveScript.findIndex(s => s.id === activeId);

  const handlePlayPrev = useCallback(() => {
    console.log('[Shadowing] handlePlayPrev (prev button)', { activeIndex });
    if (activeIndex > 0) {
      const prev = effectiveScript[activeIndex - 1];
      setSelectedId(prev.id);
      if (seekPlayback(prev.id)) return;
      const text = getTextForId(prev.id);
      player.playSentence(prev.id, text);
    }
  }, [activeIndex, effectiveScript, player, getTextForId, seekPlayback]);

  const handlePlayNext = useCallback(() => {
    console.log('[Shadowing] handlePlayNext (next button)', { activeIndex, totalSentences: effectiveScript.length });
    if (activeIndex < effectiveScript.length - 1) {
      const next = effectiveScript[activeIndex + 1];
      setSelectedId(next.id);
      if (seekPlayback(next.id)) return;
      const text = getTextForId(next.id);
      player.playSentence(next.id, text);
    }
  }, [activeIndex, effectiveScript, player, getTextForId, seekPlayback]);

  const handleReplay = useCallback(() => {
    console.log('[Shadowing] handleReplay (replay button)', { activeId });
    if (activeId) {
      if (seekPlayback(activeId)) return;
      const text = getTextForId(activeId);
      if (text) player.playSentence(activeId, text);
    }
  }, [activeId, getTextForId, player, seekPlayback]);

  // Play All: Pure video playback - completely separate from TTS
  const handlePlayAll = useCallback(() => {
    // Video mode: use seekPlayback directly (reads ytPlayerRef.current — no stale closure)
    if (useTranscriptSource && ytPlayerRef.current) {
      if (effectiveScript.length > 0) {
        seekPlayback(effectiveScript[0].id);
        setSelectedId(effectiveScript[0].id);
      }
      return;
    }

    // TTS mode: use TTS player directly
    if (effectiveScript.length > 0) {
      player.playAll(effectiveScript);
    }
  }, [useTranscriptSource, effectiveScript, player, seekPlayback, ytPlayerRef]);

  // Toggle transcript source (TTS ↔ video). Cleanly stops the OTHER mode
  // before flipping the flag so we never have TTS + video playing together.
  // Also resets selectedId in both directions so fresh Play starts from
  // sentence 1 (avoids "video jumps to sentence 2" when user toggled mid-flow
  // with a different sentence selected).
  //   TTS → video:  stop TTS, deselect, switch to video
  //   video → TTS:  stop video, deselect, switch to TTS
  const handleToggleTranscriptSource = useCallback(() => {
    if (useTranscriptSource) {
      // currently video mode → switch back to TTS
      player.stop();
      setSelectedId(null);
      setUseTranscriptSource(false);
      console.log('[Toggle] TTS mode active now (selectedId reset)');
    } else {
      // currently TTS → switch to video
      if (!videoTranscript) {
        console.log('[Toggle] videoTranscript missing — cannot switch to video mode');
        return;
      }
      player.stop();  // kill any running TTS sequence
      setSelectedId(null);
      setUseTranscriptSource(true);
      console.log('[Toggle] video mode active now (selectedId reset)');
    }
  }, [useTranscriptSource, videoTranscript, player]);

  // Open floating video window — auto-enable transcript source
  const handleOpenVideo = useCallback(() => {
    if (videoTranscript) {
      setUseTranscriptSource(true);
      player.stop();  // June 30 fix #4: kill any running TTS sequence
    }
    setVideoPopupOpen(true);
    setVideoInline(false);
  }, [videoTranscript, player]);

  // Pop-back to inline video (called from FloatingVideoWindow's "Pop back" button)
  const handlePopBackToInline = useCallback(() => {
    setVideoPopupOpen(false);
    setVideoInline(true);
    // Keep ytPlayer — it's still mounted, just not visible
  }, []);

  // Toggle inline ↔ floating from LeftPanel's "Pop out" button
  const handleToggleFloating = useCallback(() => {
    if (videoPopupOpen) {
      handlePopBackToInline();
    } else {
      handleOpenVideo();
    }
  }, [videoPopupOpen, handlePopBackToInline, handleOpenVideo]);

  const handlePractice = useCallback((sentence) => {
    setPracticeSentence(sentence);
    setPracticeOpen(true);
    player.stop();
  }, [player]);

  const handlePracticeRecord = useCallback((sentenceId, text) => {
    recorder.startRecording(sentenceId, text);
  }, [recorder]);

  const handlePracticeClose = useCallback(() => {
    if (recorder.isRecording) recorder.stopRecording();
    setPracticeOpen(false);
    setPracticeSentence(null);
  }, [recorder]);

  // ── Inline shadowing challenge mode ────────────────────────────────
  // Setup is shown in a modal (SavePracticeModal), but the actual
  // countdown/recording/score flow runs inline via <ChallengeBar /> so the
  // user can see the sentence they're shadowing.
  const challenge = useShadowingChallenge({
    // July 3: use the LESSON script (15 entries) for challenge, not
    // challengeScript. The lesson script has TIGHT, curated durations
    // (e.g. "Excuse me." dur=1.77s vs JSON dur=5.4s) so the gap
    // between sentences is small (~0.13s) and the YouTube pause can
    // fire before audio bleeds into the next sentence.
    //
    // Why not challengeScript: JSON ASR durations have 2-5s of
    // pre/post padding per segment. With trimmed non-overlap windows
    // the timer fires at segDuration (= padding), so the YouTube
    // audio plays INTO the next sentence's actual speech start.
    // User hears "Excuse me... I'm" merged. Lesson script's tight
    // durations don't have this issue.
    //
    // canUseVideoTranscript=true (transcript mode on, YouTube ready)
    // → challenge uses YouTube seekPlayback, NOT TTS. The voice is
    // the actual video audio. The lesson script's `text` is only
    // used as a fallback when canUseVideoTranscript is false (lesson
    // mode, no YouTube).
    sentences: effectiveScript,
    onRecord: handlePracticeRecord,
    stopRecording: recorder.stopRecording,
    pauseRecording: recorder.pauseRecording,    // June 30 fix: pause MediaRecorder for inline Pause
    resumeRecording: recorder.resumeRecording,  // June 30 fix: resume MediaRecorder on unpause
    isRecording: recorder.isRecording,
    scores: recorder.scores,
    seekPlayback,
    pauseVideo: player.pause,
    setActiveSentenceId: player.setActiveSentenceId,
    ytPlayer,
    speed: player.speed,
    weekNumber: currentWeek,
    mode,
    hasVideo: !!data?.videoId,
    videoId: data?.videoId,
    canUseVideoTranscript: useTranscriptSource && (videoPopupOpen || (videoInline && !!data?.videoId)) && !!ytPlayer,
    practiceMode: 'per-sentence',
  });

  // Auto-open video window when challenge starts (so YouTube player is available).
  // Do NOT force useTranscriptSource — respect user's current mode selection.
  // If user is in TTS mode, challenge uses TTS playback; if in video mode, uses video.
  useEffect(() => {
    const active = challenge.state.phase !== challenge.PHASES.SETUP
      && challenge.state.phase !== challenge.PHASES.ALL_DONE;
    if (!active || !data?.videoId) return;
    if (!videoInline && !videoPopupOpen) setVideoInline(true);
  }, [challenge.state.phase, challenge.PHASES, data?.videoId, videoInline, videoPopupOpen]);

  // Challenge-active = the user has started the challenge (any phase beyond SETUP).
  // Declared EARLY (right after the challenge hook returns) so it is in scope for
  // useMemo/useEffect blocks further up that need to gate on challenge state
  // (e.g. the video-time segment tracker at line ~240). Original placement at
  // line 714 came AFTER those hooks and triggered TDZ: "Cannot access qt
  // before initialization" on production.
  const challengeActive = challenge.state.phase !== challenge.PHASES.SETUP;
  const challengeDone = challenge.state.phase === challenge.PHASES.ALL_DONE;

  // ── Extracted hooks (refactor/shadowing-split) ──────────────────
  // 1. Transcript-mode sync: tracks current segment from video time and
  //    drives RightPanel highlight + auto-scroll. Called here so the
  //    segment-tracker can be in scope for the JSX render. challengeActive
  //    is passed as a getter (not a value) because the challenge hook below
  //    hasn't returned yet — the getter reads the freshest value at
  //    effect-run time, avoiding a TDZ crash.
  const videoSync = useShadowingVideoSync({
    effectiveScript,
    ytPlayer: youTube.ytPlayer,
    useTranscriptSource,
    isChallengeActive: () => challengeActive,  // late-bound getter — safe pre-challenge-hook
    videoInline,
    videoPopupOpen,
    videoId: data?.videoId,
    setSelectedId,
    settingsWaitMode: settings?.waitMode,
  });
  useEffect(() => { videoSyncRef.current = videoSync; }, [videoSync]);
  // NB: no `const videoActive = videoSync.videoActive` alias — `videoActive`
  // is referenced earlier in this file (e.g. handlePlayAll deps, useShadowingChallenge
  // canUseVideoTranscript arg) which would TDZ-crash. Consumers below use
  // videoSync.videoActive directly. Same pattern for `ytPlayer` (aliased
  // right after the YouTube bridge hook since it's always in scope).

  // 2. Word-level highlight — video OR TTS mode, swapped by useTranscriptSource.
  //    Video: useWordHighlight polls ytPlayer.getCurrentTime().
  //    TTS:   useTTSWordHighlight polls VoiceService._currentAudio.currentTime.
  const videoHighlight = useWordHighlight(
    youTube.ytPlayer,
    videoSync.videoActive,
    useTranscriptSource,
    activeSentenceForHighlight,
  );
  const ttsHighlightActive = !useTranscriptSource && (player.isPlaying || challengeActive);
  const ttsHighlight = useTTSWordHighlight(
    ttsHighlightActive ? effectiveScript.find((s) => s.id === activeId) : null,
    ttsHighlightActive,
  );
  const currentWordIdx = useTranscriptSource ? videoHighlight.currentWordIdx : ttsHighlight.currentWordIdx;
  const wordTime = useTranscriptSource ? videoHighlight.currentTime : ttsHighlight.currentTime;
  const highlightWords = useTranscriptSource ? videoHighlight.words : ttsHighlight.words;

  // 3. Inline Play/Pause + universal Stop (the 4-case state machine).
  //    Owns the challengeActiveRef / challengeIsPausedRef mirrors that used
  //    to live here.
  const playPause = useShadowingPlayPause({
    player, recorder, challenge,
    ytPlayerRef,
    useTranscriptSource,
    videoActive: videoSync.videoActive,
    ytPlayer: youTube.ytPlayer,
    videoTranscript,
    effectiveScript,
    activeId,
    setSelectedId,
    seekPlayback,
    getTextForId,
    challengeActive,
    challengeDone,
  });

  const openSetupModal = useCallback(() => {
    setSaveModalMode('SETUP');
    setSavePracticeOpen(true);
  }, []);

  // Bug 2 fix: wrap challenge.handleRetryWrong to close the modal BEFORE
  // dispatching RESET_FOR_RETRY. Without this, the modal stays open while
  // the challenge jumps to the first wrong sentence, blocking the user from
  // seeing the recording UI.
  const handleRetryWrongWithClose = useCallback(() => {
    setSavePracticeOpen(false);
    setSaveModalMode('CLOSED');
    challenge.handleRetryWrong();
  }, [challenge]);

  // Open summary modal when challenge reaches ALL_DONE (whole-script mode end).
  // Bug fix: previously, after the last sentence finished recording in whole-script
  // mode, phase transitioned to ALL_DONE but the summary modal was never opened,
  // so the user saw a stale recording UI with no AI feedback.
  useEffect(() => {
    if (challengeDone) {
      setSaveModalMode('SUMMARY');
      setSavePracticeOpen(true);
    }
  }, [challengeDone]);

  const closeSaveModal = useCallback(() => {
    setSavePracticeOpen(false);
    setSaveModalMode('CLOSED');
    // If we close during active challenge, also stop the challenge
    if (challengeActive && !challengeDone) {
      challenge.handleCancel();
      // June 30 fix #3: also stop the player + video. Without this, YouTube
      // keeps playing (videoIsPlaying=true propagates) and the inline
      // Play/Pause icon stays as Pause even though the challenge is over.
      player.stop();
    }
  }, [challengeActive, challengeDone, challenge, player]);

  const handleStartChallenge = useCallback(() => {
    setSavePracticeOpen(false);  // close setup modal
    setSaveModalMode('CLOSED');
    challenge.handleStart();
  }, [challenge]);

  const progressPercent = script.length > 0
    ? Math.round((completedIds.size / script.length) * 100) : 0;

  // Pre-generate IPA for all transcript sentences when entering transcript mode
  useEffect(() => {
    if (!useTranscriptSource || cleanedTranscriptSentences.length === 0) return;
    const missing = cleanedTranscriptSentences.filter(s => !transcriptIpa[s.id]);
    if (missing.length === 0) return;
    // Generate for active sentence first (priority), then batch the rest
    const ordered = activeId
      ? [...missing.filter(s => s.id === activeId), ...missing.filter(s => s.id !== activeId)]
      : missing;
    let cancelled = false;
    const gen = async () => {
      for (const seg of ordered) {
        if (cancelled) return;
        // Use corrected text if available, else raw transcript text
        const correctedText = corrections[seg.id] || seg.text;
        const ipaWords = await generateIpaForText(correctedText);
        setTranscriptIpa(prev => ({ ...prev, [seg.id]: ipaWords }));
      }
    };
    gen();
    return () => { cancelled = true; };
  }, [useTranscriptSource, cleanedTranscriptSentences, transcriptIpa, activeId, corrections]);

  if (!data || script.length === 0) {
    return <div className="text-center py-12 text-slate-400 font-bold">Loading Script...</div>;
  }

  return (
    <ShadowingErrorBoundary isVi={isVi} onReset={() => { setSelectedId(null); }}>
      <div className="space-y-4 pb-6">
        <ShadowingHeader
          isVi={isVi}
          onToggleLang={onToggleLang}
          isPlayingAll={player.isPlayingAll}
        onPlayAll={handlePlayAll}
        isRecordingAll={recorder.isRecordingAll}
        onRecordAll={handleRecordAll}
        hasFullRecording={hasFullRecording}
        onPlayBackAll={handlePlayBackAll}
        isPlayingBack={isPlayingBack}
        onStopPlayBack={handleStopPlayBack}
        onDownloadAll={handleDownloadAll}
        speed={player.speed}
        onSpeedChange={player.setSpeed}
        speedOptions={player.SPEED_OPTIONS}
        progress={progressPercent}
        themeColor={themeColor}
      />

      {/* Inline shadowing challenge bar — countdown/recording/score, shown above
          the left panel when challenge is active. Bilingual + matches inline flow. */}
      <ChallengeBar
        state={challenge.state}
        PHASES={challenge.PHASES}
        isLast={challenge.isLast}
        isVi={isVi}
        practiceMode={challenge.state.practiceMode}
        onTryAgain={challenge.handleTryAgain}
        onSkip={challenge.handleSkip}
        onStopEarly={challenge.handleStopEarly}
        onSkipAutoAdvance={challenge.handleSkipAutoAdvance}
        playRecording={recorder.playRecording}
        totalSentences={script.length}
      />

      {/* Dual-panel layout — Left 58%, Right 42% */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: video + controls + transcript */}
        <div className="lg:w-[58%] min-w-0">
          <LeftPanel
            contentEn={data.content_en}
            script={effectiveScript}
            // July 2: in challenge mode use the ACTUAL sentence id of the
            // current index, not currentIndex+1. challengeScript IDs come
            // from the JSON (2, 3, 4, 5, 6, 7, 8, 10 for W3 zT5IiE9m9oY) and
            // do NOT align with array index+1. The previous code passed
            // currentIndex+1 as the prop, so LeftPanel looked up a wrong
            // sentence and the IPA + timing came from a DIFFERENT segment
            // than the displayed text — the 'bleed' the user saw in
            // challenge mode.
            activeSentenceId={challengeActive ? challengeScript[challenge.state.currentIndex]?.id : activeId}
            ipaData={ipaData}
            currentWordIdx={currentWordIdx}
            wordTime={wordTime}
            highlightWords={highlightWords}
            videoId={data.videoId}
            videoInline={videoInline}
            videoPopupOpen={videoPopupOpen}
            ytPlayer={youTube.ytPlayer}
            useTranscriptSource={useTranscriptSource}
            videoTranscriptSegments={useTranscriptSource ? effectiveScript : null}
            transcriptIpa={transcriptIpa}
            themeColor={themeColor}
            isVi={isVi}
            // Inline button must reflect challenge playback too. During
            // PLAY_TTS/COUNTDOWN_321/RECORDING/SCORING/SCORED, the player
            // hook's isPlaying is false (challenge drives its own playback)
            // — without this OR, the icon stays as Play and never flips to
            // Pause mid-challenge, so the user can't tell the button is live.
            isPlaying={player.isPlaying || (challengeActive && !challengeDone)}
            // During challenge mode, the inline button's paused-ness comes
            // ONLY from challenge.state.isPaused — never from player.isPaused.
            // ChallengeBar reads the same challenge state for the
            // "Paused — press Play to resume" label; mixing player.isPaused
            // in here created the bug where the bar says "Recording..." but
            // the inline button shows the Play icon (e.g. after case 2 pause
            // left player.isPaused=true while user was in challenge RECORDING).
            isPaused={challengeActive ? challenge.state.isPaused : player.isPaused}
            isChallengeActive={challengeActive}
            // June 30 fix #3: disable inline Play/Pause during any recording
            // (per-sentence challenge RECORDING phase OR whole-script Record All).
            // Without this, clicks during recording fire player.pause() and the
            // icon doesn't switch correctly because recorder state isn't tracked
            // here.
            isRecording={recorder.isRecording || recorder.isRecordingAll}
            speed={player.speed}
            onSpeedChange={player.setSpeed}
            speedOptions={player.SPEED_OPTIONS}
            onPlayPrev={handlePlayPrev}
            onPlayPause={playPause.handlePlayPause}
            onPlayNext={handlePlayNext}
            onReplay={handleReplay}
            onStop={playPause.handleStop}
            onSave={openSetupModal}
            onOpenVideo={handleOpenVideo}
            onToggleFloating={handleToggleFloating}
            onPlayerReady={youTube.handleYtPlayerReady}
            onPlayerUnloaded={youTube.handleYtPlayerUnloaded}
            onSwitchToTranscript={handleToggleTranscriptSource}
            settings={settings}
            onSettingsChange={setSettings}
            showIPA={showIPA}
            showStress={showStress}
            showTranslate={showTranslate}
            translating={translating}
            translatedTexts={translatedTexts}
            onToggleIPA={() => setShowIPA(!showIPA)}
            onToggleStress={() => setShowStress(!showStress)}
            onToggleTranslate={() => setShowTranslate(!showTranslate)}
          />
        </div>

        {/* Right: sentence list */}
        <div className="lg:w-[42%] min-w-0">
          <RightPanel
            script={effectiveScript}
            ipaData={ipaData}
            transcriptIpa={useTranscriptSource ? transcriptIpa : null}
            scores={recorder.scores}
            transcriptSegments={useTranscriptSource ? effectiveScript : null}
            activeSentenceId={activeId}
            isPlaying={player.isPlayingAll || player.activeSentenceId !== null}
            onPlay={handlePlayOne}
            onPlayBack={recorder.playRecording}
            onPractice={handlePractice}
            themeColor={themeColor}
            useTranscriptSource={useTranscriptSource}
            onToggleSource={useTranscriptSource
              ? () => setUseTranscriptSource(false)
              : handleOpenVideo}
            hasTranscript={!!videoTranscript}
            onCorrect={handleSaveCorrection}
          />
        </div>
      </div>

      {/* Save Practice Modal — only setup (SETUP) + summary (ALL_DONE) screens.
          The active challenge flow (countdown/recording/score) runs inline
          via <ChallengeBar /> above so the user can see the sentence. */}
      <SavePracticeModal
        isOpen={savePracticeOpen}
        onClose={closeSaveModal}
        isVi={isVi}
        mode={saveModalMode}
        countdownOptions={challenge.COUNTDOWN_OPTIONS}
        countdownDuration={challenge.state.countdownDuration}
        onSelectCountdown={challenge.setCountdown}
        practiceMode={challenge.state.practiceMode}
        onSelectPracticeMode={challenge.setPracticeMode}
        sentences={effectiveScript}
        sessionScores={challenge.allScores}
        skippedIds={challenge.state.skippedIds}
        onStart={handleStartChallenge}
        onRetryWrong={handleRetryWrongWithClose}
        isBatchEvaluating={challenge.state.phase === challenge.PHASES.BATCH_EVALUATING}
        batchEvalProgress={challenge.state.phase === challenge.PHASES.BATCH_EVALUATING
          ? { done: challenge.batchEvalDoneCount, total: effectiveScript.length }
          : null}
      />

      {/* Floating Video Window */}
      {videoPopupOpen && data?.videoId && (
        <FloatingVideoWindow
          videoId={data.videoId}
          onClose={() => {
            setVideoPopupOpen(false);
            setUseTranscriptSource(false);
            // ytPlayer state owned by useShadowingYouTubeBridge — clear via
            // its returned handler so the polling interval is also disposed.
            youTube.handleYtPlayerUnloaded();
            setVideoInline(true);
          }}
          onPopBack={handlePopBackToInline}
          title={data?.title || 'YouTube Video'}
          onPlayerReady={youTube.handleYtPlayerReady}
          onPlayerUnloaded={youTube.handleYtPlayerUnloaded}
        />
      )}

      {/* Full Practice Modal */}
      <FullPracticeModal
        sentence={practiceSentence}
        ipaWords={practiceSentence && ipaData ? ipaData[practiceSentence.id] || null : null}
        isOpen={practiceOpen}
        onClose={handlePracticeClose}
        onRecord={handlePracticeRecord}
        existingScore={practiceSentence ? recorder.scores[practiceSentence.id] : null}
        isRecording={recorder.isRecording}
        stopRecording={recorder.stopRecording}
        speed={player.speed}
        weekNumber={currentWeek}
        mode={mode}
        themeColor={themeColor}
      />
    </div>
    </ShadowingErrorBoundary>
  );
};

export default Shadowing;
