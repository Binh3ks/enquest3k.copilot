import React from 'react';
import { useUserStore } from '../../stores/useUserStore';
import KawaiiAvatar, { AVATAR_PRESETS } from './avatarLayers';
import { LEGACY_ITEM_TO_KAWAII } from '../../data/avatarItemConfig';

const SIZE_MAP = {
  sm: 40,
  md: 96,
  lg: 120,
};

function pickAvatarConfig(equippedItems, avatarItems) {
  // Find the first preset, or a default
  const base = AVATAR_PRESETS[0];
  // Map legacy store item IDs to kawaii layer names
  let accessory = 'none';
  const equippedValues = Object.values(equippedItems || {}).filter(Boolean);
  for (const id of equippedValues) {
    const mapped = LEGACY_ITEM_TO_KAWAII[id] || id;
    if (['crown', 'hat', 'glasses', 'star', 'trophy', 'wand'].includes(mapped)) {
      accessory = mapped;
      break;
    }
  }
  return { ...base, accessory };
}

/**
 * <AvatarOverlay size="sm|md|lg" />
 * Reads equipped items from the store and renders the kawaii chibi avatar.
 */
export default function AvatarOverlay({ size = 'md' }) {
  const equippedItems = useUserStore((state) => state.equippedItems);
  const avatarItems = useUserStore((state) => state.avatarItems);
  const dim = SIZE_MAP[size] || SIZE_MAP.md;
  const config = pickAvatarConfig(equippedItems, avatarItems);
  return <KawaiiAvatar size={dim} config={config} />;
}
