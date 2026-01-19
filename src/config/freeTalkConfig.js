/**
 * FREE TALK 3.0 - GAME & ROLEPLAY ENGINE
 * Central configuration for all game modes (universal across all weeks)
 */

export const FREE_TALK_ACTIONS = [
  { id: 'translate', label: 'Dịch giúp con 🆘', icon: '🆘', type: 'system' },
  { id: 'play_game', label: 'Chơi Game 🎮', icon: '🎮', type: 'menu' },
  { id: 'role_play', label: 'Đóng vai 🎭', icon: '🎭', type: 'menu' },
  { id: 'ask_any', label: 'Hỏi bất kỳ ❓', icon: '❓', type: 'mode' }
];

export const GAME_OPTIONS = [
  {
    id: 'word_chain',
    label_en: "Word Chain",
    label_vi: "Nối từ",
    icon: "🔗",
    intro: "I say a word, you say a word starting with the LAST letter! I start: Do__g__. Your turn! (G...)"
  },
  {
    id: 'i_spy',
    label_en: "I Spy",
    label_vi: "Đoán vật",
    icon: "🕵️‍♀️",
    intro: "I will describe something. You guess! I spy with my little eye..."
  },
  {
    id: 'emoji_mixer',
    label_en: "Emoji Mixer",
    label_vi: "Đuổi hình bắt chữ",
    icon: "🧩",
    intro: "Look at the emojis and guess the word! 🔴 + 🍎 = ?"
  }
];

export const ROLEPLAY_SCENARIOS = [
  {
    id: 'pizza_chef',
    label_en: "Pizza Chef",
    label_vi: "Đầu bếp nhí",
    icon: "🍕",
    ai_role: "Hungry Customer",
    user_role: "Chef",
    intro: "I am hungry! 😋 Are you a Chef?"
  },
  {
    id: 'pet_doctor',
    label_en: "Pet Doctor",
    label_vi: "Bác sĩ thú y",
    icon: "🚑",
    ai_role: "Pet Owner (Cat is sad)",
    user_role: "Doctor",
    intro: "Oh no! My Cat is sad. 😿 Doctor, help me!"
  },
  {
    id: 'toy_shop',
    label_en: "Toy Shop",
    label_vi: "Cửa hàng đồ chơi",
    icon: "🛍️",
    ai_role: "Customer",
    user_role: "Shopkeeper",
    intro: "Hello! I want to buy a Robot. 🤖 Do you have one?"
  }
];
