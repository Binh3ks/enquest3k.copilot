// ─────────────────────────────────────────────────────────────
//  EngQuest TTS Worker — Deepgram Aura + R2 Cache
//
//  DYNAMIC CONTENT (AI Tutor):
//    R2 HIT  → instant Deepgram audio (<100ms)
//    R2 MISS → call Deepgram Aura (~200-500ms) → return audio
//              + save to R2 in background (ctx.waitUntil)
//    Next    → R2 HIT → instant ✅
//
//  STATIC CONTENT (Lessons):
//    Path-based: audio/week14/dictation_7.mp3
//    R2 MISS → generate on-demand with voiceConfig voice
//           → save to exact path for next request
//    No pre-generation needed! Audio auto-generates on first play.
//
//  No cold start. No 503. No HF dependency.
// ─────────────────────────────────────────────────────────────

// Deepgram Aura — voices for ESL education
// Female voices:
// aura-luna-en    → soft, warm, gentle (best for kids/ESL, dictation)
// aura-asteria-en → natural, expressive, conversational (vocabulary, mindmap)
// aura-stella-en  → bright, clear (original — too sharp)
// aura-athena-en  → warm, British accent
// aura-hera-en    → gentle, clear
// Male voices:
// aura-orion-en   → deep, authoritative (narration, stories)
// aura-zeus-en    → energetic, engaging (questions, challenges)
const DEEPGRAM_MODEL   = 'aura-asteria-en'; // Default voice (changed from luna to asteria - Mar 2026)

// Allowed voice overrides (whitelist for security)
const ALLOWED_VOICES = new Set([
  'aura-luna-en', 'aura-asteria-en', 'aura-stella-en', 'aura-athena-en', 'aura-hera-en',
  'aura-orion-en', 'aura-zeus-en', 'aura-helios-en'  // aura-helios-en: clean, clear male (week 16+ mindmap/ask-ai)
]);
const DEEPGRAM_TIMEOUT = 8000;  // 8s hard cap — Deepgram rarely takes >1s

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', provider: 'deepgram', time: Date.now() }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }

    // Debug: test Deepgram reachability and latency from Worker edge
    if (url.pathname === '/debug/deepgram') {
      const testText = url.searchParams.get('text') || 'Hello world';
      const t0 = Date.now();
      try {
        const buf = await fetchDeepgramTTS(testText, env);
        const elapsed = Date.now() - t0;
        return new Response(JSON.stringify({
          ok: true, bytes: buf.byteLength, elapsed_ms: elapsed, model: DEEPGRAM_MODEL
        }), { headers: { 'Content-Type': 'application/json', ...corsHeaders() } });
      } catch (err) {
        const elapsed = Date.now() - t0;
        return new Response(JSON.stringify({
          ok: false, error: err.message, elapsed_ms: elapsed
        }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders() } });
      }
    }

    return handleTTS(request, env, ctx, url);
  }
};

async function handleTTS(request, env, ctx, url) {
  const text    = url.searchParams.get('text');
  const station = url.searchParams.get('station') || 'ai_tutor';
  // Allow client to request a specific voice (ignored for cached R2 entries)
  const voiceParam = url.searchParams.get('voice');
  const activeModel = (voiceParam && ALLOWED_VOICES.has(voiceParam)) ? voiceParam : DEEPGRAM_MODEL;
  
  // NEW: Support for static content path (e.g., audio/week14/dictation_7.mp3)
  // If path is provided, use it directly instead of generating hash-based path
  const staticPath = url.searchParams.get('path');

  if (!text) {
    return new Response('Missing text parameter', { status: 400, headers: corsHeaders() });
  }

  const cleanText = text.trim().toLowerCase();
  const hash      = await sha256(cleanText + '|' + activeModel);
  
  // Determine R2 object key:
  // - If staticPath provided: use it (e.g., audio/week14/dictation_7.mp3)
  // - Otherwise: use dynamic path (dynamic/station/hash.mp3)
  const objectKey = staticPath || ('dynamic/' + station + '/' + hash + '.mp3');

  // ── TIER 1: R2 Cache Hit — serve instantly ───────────────────
  if (env.TTS_BUCKET) {
    const cached = await env.TTS_BUCKET.get(objectKey).catch(() => null);
    if (cached) {
      const src = (cached.customMetadata && cached.customMetadata.source) || 'unknown';
      console.log('[Worker] R2 HIT source=' + src);
      return new Response(cached.body, {
        headers: {
          'Content-Type':  'audio/mpeg',
          'X-Cache':        'HIT',
          'X-TTS-Source':   src,
          'Cache-Control':  'public, max-age=86400',
          ...corsHeaders()
        }
      });
    }
  }

  // ── TIER 2: R2 MISS — call Deepgram, return instantly, cache in background ─
  //
  // Deepgram TTFB < 200ms, full sentence < 500ms — no 503 needed.
  // Client gets audio immediately. R2 cached for next request.
  //
  if (!env.DEEPGRAM_API_KEY) {
    return new Response('DEEPGRAM_API_KEY not configured', { status: 500, headers: corsHeaders() });
  }

  let audioBuffer;
  try {
    audioBuffer = await fetchDeepgramTTS(text, env, activeModel);
  } catch (err) {
    console.error('[Worker] Deepgram failed: ' + err.message);
    return new Response('TTS generation failed: ' + err.message, {
      status: 502,
      headers: corsHeaders()
    });
  }

  // Save to R2 in background (don't block response)
  if (env.TTS_BUCKET) {
    const bufferCopy = audioBuffer.slice(0);
    ctx.waitUntil(
      env.TTS_BUCKET.put(objectKey, bufferCopy, {
        httpMetadata:   { contentType: 'audio/mpeg' },
        customMetadata: { source: 'deepgram', model: activeModel }
      })
      .then(() => console.log('[Worker] R2 cached Deepgram – ' + (audioBuffer.byteLength / 1024).toFixed(1) + ' KB'))
      .catch(e => console.warn('[Worker] R2 save failed: ' + e.message))
    );
  }

  return new Response(audioBuffer, {
    headers: {
      'Content-Type':  'audio/mpeg',
      'X-Cache':        'MISS',
      'X-TTS-Source':   'deepgram',
      'Cache-Control':  'no-store',
      ...corsHeaders()
    }
  });
}

// ─────────────────────────────────────────────────────────────
//  Deepgram Aura TTS — POST /v1/speak
// ─────────────────────────────────────────────────────────────
async function fetchDeepgramTTS(text, env, model) {
  model = model || DEEPGRAM_MODEL;
  // Pad text with trailing ellipsis to prevent Deepgram from clipping the last syllable
  let padded = text.trim();
  if (!/[.!?,]$/.test(padded)) padded += '.';
  padded += ' ...';

  const dgUrl = 'https://api.deepgram.com/v1/speak?model=' + model + '&encoding=mp3';

  const controller = new AbortController();
  const timeoutId  = setTimeout(function() { controller.abort(); }, DEEPGRAM_TIMEOUT);

  try {
    const res = await fetch(dgUrl, {
      method:  'POST',
      signal:  controller.signal,
      headers: {
        'Authorization': 'Token ' + env.DEEPGRAM_API_KEY,
        'Content-Type':  'application/json'
      },
      body: JSON.stringify({ text: padded })
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      throw new Error('Deepgram HTTP ' + res.status + ': ' + errBody.slice(0, 200));
    }

    const buf = await res.arrayBuffer();
    if (buf.byteLength < 500) {
      throw new Error('Deepgram response too small: ' + buf.byteLength + ' bytes');
    }

    return buf;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────
async function sha256(text) {
  var data   = new TextEncoder().encode(text);
  var digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(function(b) {
    return b.toString(16).padStart(2, '0');
  }).join('');
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Expose-Headers': 'X-Cache, X-TTS-Source, X-Voice'  // Allow client to read cache status
  };
}
