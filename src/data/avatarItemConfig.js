/**
 * Avatar item configuration — items layered onto the kawaii chibi avatar.
 * Each item maps to a layer slot in avatarLayers.js.
 *
 * Equipped items shape: { face, hair, outfit, accessory }
 * `accessory` is the unlockable one; face/hair/outfit are base presets.
 */

export const AVATAR_ITEMS = {
  crown: {
    id: 'crown', slot: 'accessory', layer: 'crown',
    name: 'Crown', nameVi: 'Vương miện',
    icon: '👑', description: 'Complete a collection to earn the Crown',
    descriptionVi: 'Hoàn thành một bộ sưu tập',
  },
  hat: {
    id: 'hat', slot: 'accessory', layer: 'hat',
    name: 'Explorer Hat', nameVi: 'Mũ thám hiểm',
    icon: '🎩', description: 'Awarded for exploration milestones',
    descriptionVi: 'Trao cho cột mốc khám phá',
  },
  glasses: {
    id: 'glasses', slot: 'accessory', layer: 'glasses',
    name: 'Cool Glasses', nameVi: 'Kính ngầu',
    icon: '🕶️', description: 'Maintain a 7-day streak',
    descriptionVi: 'Duy trì chuỗi 7 ngày',
  },
  star: {
    id: 'star', slot: 'accessory', layer: 'star',
    name: 'Star Pin', nameVi: 'Huy hiệu sao',
    icon: '⭐', description: 'Collect 50 stars total',
    descriptionVi: 'Thu thập 50 sao',
  },
  trophy: {
    id: 'trophy', slot: 'accessory', layer: 'trophy',
    name: 'Trophy Pin', nameVi: 'Huy hiệu cúp',
    icon: '🏆', description: 'First perfect week',
    descriptionVi: 'Tuần hoàn hảo đầu tiên',
  },
  wand: {
    id: 'wand', slot: 'accessory', layer: 'wand',
    name: 'Magic Wand', nameVi: 'Đũa thần',
    icon: '✨', description: 'Master a collection',
    descriptionVi: 'Thuần thục một bộ sưu tập',
  },
};

export const ALL_AVATAR_ITEMS = Object.values(AVATAR_ITEMS);

export const getAvatarItem = (id) => AVATAR_ITEMS[id] || null;

// Backward-compat: avatar item IDs that the store may still award.
// Each one maps to a kawaii accessory.
export const LEGACY_ITEM_TO_KAWAII = {
  explorer_hat: 'hat',
  cool_glasses: 'glasses',
  magic_wand: 'wand',
  star_badge: 'star',
  trophy: 'trophy',
  crown: 'crown',
};
