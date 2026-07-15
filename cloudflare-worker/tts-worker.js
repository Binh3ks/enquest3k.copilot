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
// Aura-1 (legacy) + Aura-2 (current)
const ALLOWED_VOICES = new Set([
  // Aura-1 legacy
  'aura-luna-en', 'aura-asteria-en', 'aura-stella-en', 'aura-athena-en', 'aura-hera-en',
  'aura-orion-en', 'aura-zeus-en', 'aura-helios-en',
  // Aura-2 female — American
  'aura-2-luna-en', 'aura-2-iris-en', 'aura-2-aurora-en', 'aura-2-thalia-en', 'aura-2-helena-en',
  // Aura-2 female — British
  'aura-2-pandora-en',
  // Aura-2 male — American
  'aura-2-aries-en', 'aura-2-apollo-en', 'aura-2-arcas-en',
  // Aura-2 male — British
  'aura-2-draco-en',
]);
const DEEPGRAM_TIMEOUT = 12000;  // 12s — long reading passages need more time

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

    // ── Transcript corrections (KV-backed) ──────────────────────
    // GET  /api/corrections/:videoId  → { "1": "corrected text", ... }
    // POST /api/corrections/:videoId  → merge { id, text } into existing corrections
    const corrMatch = url.pathname.match(/^\/api\/corrections\/([a-zA-Z0-9_-]+)$/);
    if (corrMatch) {
      return handleCorrections(request, env, corrMatch[1]);
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
  // Client-supplied content hash — used to detect stale R2 files whose
  // recorded text no longer matches the source data (e.g. the source
  // sentence was rewritten in mindmap.js but R2 still has the old audio).
  const verifyHash = url.searchParams.get('vh');

  // NEW: Support for static content path (e.g., audio/week14/dictation_7.mp3)
  // If path is provided, use it directly instead of generating hash-based path
  const staticPath = url.searchParams.get('path');

  if (!text) {
    return new Response('Missing text parameter', { status: 400, headers: corsHeaders() });
  }

  const cleanText = text.trim().toLowerCase();
  const hash        = await sha256(cleanText + '|' + activeModel);

  // Text-only content hash for stale-detection (voice-independent).
  // Stored in R2 metadata; compared against client's `vh` param on cache-hit
  // so rewritten source text (e.g. mindmap.js) regenerates audio even if the
  // R2 path is unchanged.
  const contentHash = await sha256(cleanText);

  // Determine R2 object key:
  // - If staticPath provided: use it (e.g., audio/week14/dictation_7.mp3)
  // - Otherwise: use dynamic path (dynamic/station/hash.mp3)
  const objectKey = staticPath || ('dynamic/' + station + '/' + hash + '.mp3');

  // ── TIER 1: R2 Cache Hit — serve instantly ───────────────────
  if (env.TTS_BUCKET) {
    const cached = await env.TTS_BUCKET.get(objectKey).catch(() => null);
    if (cached) {
      const meta = cached.customMetadata || {};
      const cachedModel  = meta.model  || DEEPGRAM_MODEL;
      const cachedContentHash = meta.contentHash || '';
      // BUG FIX (Jun 8, 2026): When client passes verifyHash (vh), compare with stored contentHash.
      // If mismatched → R2 file is stale (source text changed), regenerate.
      // This handles the case where a developer rewrites a sentence in
      // mindmap.js but R2 still has the audio for the old sentence.
      const hashMatch = !verifyHash || (cachedContentHash === verifyHash);
      // Voice-aware invalidation: if caller requests a specific voice that differs from
      // what's cached, regenerate so the new voice takes effect immediately.
      const voiceMatchOrDefault = !voiceParam || (cachedModel === activeModel);
      if (hashMatch && voiceMatchOrDefault) {
        const src = meta.source || 'unknown';
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
      if (!hashMatch) {
        console.log('[Worker] Content hash changed (was=' + cachedContentHash + ', now=' + verifyHash + ') — regenerating');
      } else {
        console.log('[Worker] Voice changed: ' + cachedModel + ' → ' + activeModel + ', regenerating');
      }
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
    // BUG FIX (Jun 8, 2026): store textHash so future requests can detect
    // when the source text was rewritten and the cached audio is stale.
    // The same R2 path is overwritten with new content + new textHash.
    const saveMetadata = { source: 'deepgram', model: activeModel, textHash: hash, contentHash: contentHash };
    ctx.waitUntil(
      env.TTS_BUCKET.put(objectKey, bufferCopy, {
        httpMetadata:   { contentType: 'audio/mpeg' },
        customMetadata: saveMetadata
      })
      .then(() => console.log('[Worker] R2 cached Deepgram – ' + (audioBuffer.byteLength / 1024).toFixed(1) + ' KB [vh=' + hash.substring(0, 8) + ']'))
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

// ─────────────────────────────────────────────────────────────
//  Transcript Corrections — Cloudflare KV
// ─────────────────────────────────────────────────────────────
async function handleCorrections(request, env, videoId) {
  const KV = env.TRANSCRIPT_CORRECTIONS;
  if (!KV) {
    return new Response(JSON.stringify({ error: 'KV not configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders() }
    });
  }

  const key = 'corr:' + videoId;

  if (request.method === 'GET') {
    const data = await KV.get(key, { type: 'json' });
    return new Response(JSON.stringify(data || {}), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders() }
    });
  }

  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const { id, text } = body;
      if (!id || !text) {
        return new Response(JSON.stringify({ error: 'Missing id or text' }), {
          status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders() }
        });
      }
      const existing = await KV.get(key, { type: 'json' }) || {};
      const updated = { ...existing, [String(id)]: text };
      await KV.put(key, JSON.stringify(updated), {
        expirationTtl: 86400 * 365, // 1 year
      });
      return new Response(JSON.stringify({ ok: true, corrections: updated }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }
  }

  return new Response('Method not allowed', { status: 405, headers: corsHeaders() });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Expose-Headers': 'X-Cache, X-TTS-Source, X-Voice'  // Allow client to read cache status
  };
}
