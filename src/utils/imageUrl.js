/**
 * imageUrl.js - Resolve image paths to CDN or local
 *
 * Images are served from Cloudflare R2 CDN (engquest-images bucket).
 * Public URL: https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev
 *
 * To override (or disable CDN), set VITE_IMAGES_CDN_URL env var.
 * Set to empty string "" to fall back to local /images/... paths.
 *
 * TEMPORARILY DISABLED: Using local paths until images are uploaded to R2
 */

const IMAGES_CDN = import.meta.env.VITE_IMAGES_CDN_URL ?? ''; // Disabled CDN (was: 'https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev')

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
