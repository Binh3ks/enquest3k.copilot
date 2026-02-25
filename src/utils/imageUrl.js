/**
 * imageUrl.js - Resolve image paths to CDN or local
 *
 * Strategy:
 * - NOW (< 156 weeks): images in git, served from Cloudflare Pages at /images/...
 * - FUTURE (156 weeks, ~4GB): upload to R2, set VITE_IMAGES_CDN_URL in CF Pages
 *   → all image references automatically switch to CDN, no code changes needed
 */

const IMAGES_CDN = import.meta.env.VITE_IMAGES_CDN_URL || '';

/**
 * Convert a relative image path to the correct URL.
 * @param {string} path - e.g. "/images/week1_easy/name.jpg"
 * @returns {string} Full URL (CDN if configured, else relative)
 */
export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path; // already absolute
  if (IMAGES_CDN) return `${IMAGES_CDN}${path}`; // CDN mode
  return path; // relative → CF Pages serves from /images/...
}
