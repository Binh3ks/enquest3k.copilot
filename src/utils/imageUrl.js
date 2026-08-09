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
 * Convert a relative image path to the CDN URL or local bundle path.
 * @param {string} path - e.g. "/images/week12/perform.jpg" or "/images/week36/v1_submarine.jpg"
 * @returns {string} Resolved image URL
 */
export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path; // already absolute

  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Local assets bundled directly on Cloudflare Pages for newly added weeks
  if (cleanPath.startsWith('/images/week36/') || cleanPath.startsWith('/images/week37/')) {
    return cleanPath;
  }

  // Default CDN mode for existing weeks (1..35) stored on Cloudflare R2
  if (IMAGES_CDN) {
    return `${IMAGES_CDN}${cleanPath}`;
  }

  return cleanPath;
}
