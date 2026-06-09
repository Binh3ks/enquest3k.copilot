/**
 * imageUrl.js - Resolve image paths to CDN or local
 *
 * Images live on the R2 image bucket. The env var is checked first so a
 * dashboard override can re-point to a mirror (e.g. during a migration),
 * but the fallback is hard-coded to the canonical image bucket so a
 * missing/typo'd env var in Cloudflare Pages dashboard doesn't 404 every
 * image across the deployed app.
 */

const IMAGES_CDN =
  import.meta.env.VITE_IMAGES_CDN_URL || 'https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev';

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
