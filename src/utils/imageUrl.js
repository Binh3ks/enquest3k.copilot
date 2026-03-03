/**
 * imageUrl.js - Resolve image paths to CDN or local
 *
 * Images are served from Cloudflare R2 CDN (engquest-images bucket).
 * Public URL: https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev
 *
 * To override (or disable CDN), set VITE_IMAGES_CDN_URL env var.
 * Set to empty string "" to fall back to local /images/... paths.
 */

const IMAGES_CDN = import.meta.env.VITE_IMAGES_CDN_URL ?? 'https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev';

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
