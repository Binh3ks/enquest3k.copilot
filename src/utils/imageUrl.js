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

// List of specific locally re-rendered images for weeks 1..35
const LOCAL_OVERRIDE_IMAGES = new Set([
  // Week 30
  '/images/week30/vocab_refreshing.jpg',
  '/images/week30/v6_refreshing.jpg',
  '/images/week30/refreshing.jpg',
  '/images/week30/refreshing.png',
  '/images/week30/wordpower_civil_engineer.jpg',
  '/images/week30/civil_engineer.jpg',
  '/images/week30/wordpower_w7.jpg',
  '/images/week30/wordpower_head_chef.jpg',
  '/images/week30/head_chef.jpg',
  '/images/week30/wordpower_w8.jpg',
  // Week 31
  '/images/week31/vocab_texture.jpg',
  '/images/week31/texture.jpg',
  '/images/week31/v8_texture.jpg',
  '/images/week31/vocab_wood.jpg',
  '/images/week31/wood.jpg',
  '/images/week31/v1_wood.jpg',
  '/images/week31/vocab_metal.jpg',
  '/images/week31/metal.jpg',
  '/images/week31/v2_metal.jpg',
  '/images/week31/vocab_plastic.jpg',
  '/images/week31/plastic.jpg',
  '/images/week31/v3_plastic.jpg',
  '/images/week31/vocab_glass.jpg',
  '/images/week31/glass.jpg',
  '/images/week31/vocab_stone.jpg',
  '/images/week31/stone.jpg',
  '/images/week31/vocab_cotton.jpg',
  '/images/week31/cotton.jpg',
  '/images/week31/vocab_breeze.jpg',
  '/images/week31/breeze.jpg',
  '/images/week31/wordpower_hear_bird.jpg',
  '/images/week31/wp_hear_bird_sing.jpg',
  '/images/week31/wordpower_smell_air.jpg',
  '/images/week31/wp_smell_fresh_air.jpg',
  '/images/week31/wordpower_feel_bark.jpg',
  '/images/week31/wordpower_see_butterfly.jpg',
  '/images/week31/wordpower_startled.jpg',
  '/images/week31/wordpower_breathe_air.jpg',
  '/images/week31/wordpower_w7.jpg',
  '/images/week31/wordpower_w8.jpg',
  '/images/week31/wordpower_feel_grass.jpg',
  '/images/week31/wordpower_see_bird.jpg',
  '/images/week31/wordpower_feel_breeze.jpg',
  '/images/week31/wordpower_wonder_nature.jpg',
  // Week 32
  '/images/week32/vocab_nail.jpg',
  '/images/week32/nail.jpg',
  '/images/week32/vocab_polish.jpg',
  '/images/week32/polish.jpg',
  '/images/week32/v8_polish.jpg',
  '/images/week32/wordpower_get_dressed.jpg',
  '/images/week32/get_dressed.jpg',
  '/images/week32/wp_get_dressed.jpg',
  '/images/week32/wordpower_wake_up_early.jpg',
  '/images/week32/wake_up_early.jpg',
  '/images/week32/wp_wake_up_early.jpg',
]);

/**
 * Convert a relative image path to the CDN URL or local bundle path.
 * @param {string} path - e.g. "/images/week12/perform.jpg" or "/images/week36/v1_submarine.jpg"
 * @returns {string} Resolved image URL
 */
export function getImageUrl(path) {
  if (!path) return '';

  let cleanPath = path;
  if (IMAGES_CDN && cleanPath.startsWith(IMAGES_CDN)) {
    cleanPath = cleanPath.slice(IMAGES_CDN.length);
  }
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }

  // Entire week folders bundled locally (e.g. week 36, week 37)
  if (cleanPath.startsWith('/images/week36/') || cleanPath.startsWith('/images/week37/')) {
    return cleanPath;
  }

  // Specific local overrides for fixed/re-rendered images in weeks 1..35
  if (LOCAL_OVERRIDE_IMAGES.has(cleanPath)) {
    return cleanPath;
  }

  // If original path was already a full absolute URL and not overridden locally, return as-is
  if (path.startsWith('http')) {
    return path;
  }

  // Default CDN mode for existing weeks (1..35) stored on Cloudflare R2
  if (IMAGES_CDN) {
    return `${IMAGES_CDN}${cleanPath}`;
  }

  return cleanPath;
}
