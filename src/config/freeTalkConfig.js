/**
 * FREE TALK 3.0 - ROLEPLAY & CHAT ENGINE
 * Central configuration for roleplay scenarios and free conversation
 * NOTE: Games moved to GameHub (production-oriented games with validation)
 */

export const FREE_TALK_ACTIONS = [
  { id: 'translate', label: 'Translate 📚', icon: '📚', type: 'system' },
  { id: 'conversation', label: 'Conversation 💬', icon: '💬', type: 'menu' }
];

// ❌ GAME_OPTIONS removed - Games moved to GameHub
// GameHub provides production-focused games with proper validation:
// - Show & Tell Ladder (5-step scaffolding)
// - Sentence Expander (3-step enrichment)
// - Ask Me (question formation)
// This separation provides clear UX: AI Tutor = Coach-led, GameHub = Self-directed

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
