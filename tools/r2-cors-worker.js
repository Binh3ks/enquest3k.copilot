export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Get the file from R2
    const objectKey = url.pathname.slice(1); // Remove leading /
    const object = await env.AUDIO_BUCKET.get(objectKey);
    
    if (object === null) {
      return new Response('File not found', { status: 404 });
    }
    
    // Return with CORS headers
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    headers.set('Access-Control-Allow-Headers', '*');
    headers.set('Cache-Control', 'public, max-age=31536000');
    
    return new Response(object.body, {
      headers,
    });
  },
};
