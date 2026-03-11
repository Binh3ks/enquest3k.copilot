/**
 * imageUrl.js - Resolve image paths to CDN or local
 *
 * Images are served from Cloudflare Pages static assets (/public/images/).
 * To serve from CDN instead, set VITE_IMAGES_CDN_URL env var.
 * e.g. VITE_IMAGES_CDN_URL=https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev
 */

const IMAGES_CDN = import.meta.env.VITE_IMAGES_CDN_URL ?? '';

/**
 * Convert a relative image path to the CDN URL.
 * @param {string} path - e.g. "/images/week1_easy/name.jpg"
 * @returns {string} Full CDN URL
 */
export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path; // already absolute
  if (IMAGES_CDN) return `${IMAGES_CDN}${path}`; // CDN mode (default)
  return path; // fallback to relative
}
