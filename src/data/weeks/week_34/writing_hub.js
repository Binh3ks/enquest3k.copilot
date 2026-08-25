// Pure Generated Writing Hub for Week 34
import { readingHub } from './reading_hub.js';

export const writingHub = {
  week: Number(34),
  theme: "The Lion and the Mouse",
  picture_story: {
    title: "The Lion and the Brave Mouse",
    panels: [
      { image_url: "/images/week34/webtoon_scene_1.png", caption: "The mighty lion was sleeping peacefully under a tree." },
      { image_url: "/images/week34/webtoon_scene_4.png", caption: "Hunters trapped the lion in a heavy rope net." },
      { image_url: "/images/week34/webtoon_scene_5.png", caption: "The brave mouse chewed the ropes and freed the lion." }
    ],
    steps: [
      {
        scene: 1,
        ladder_stage: "MODEL",
        badge_label: "MODEL",
        title: "Scene 1: Lion Sleeping Under Tree",
        image_url: "/images/week34/webtoon_scene_1.png",
        caption: "The mighty lion was sleeping peacefully under a tree.",
        frame_L1: "The mighty lion was sleeping peacefully under a tree.",
        locked_connector: "In the beginning,",
        ordered_chips: ["the mighty lion", "was sleeping peacefully", "under a shady green tree"],
        pills: ["the mighty lion", "was sleeping peacefully", "under a shady green tree"],
        audio: "While the lion was sleeping peacefully under a shady tree, a mouse arrived."
      },
      {
        scene: 2,
        ladder_stage: "BUILD",
        badge_label: "BUILD",
        title: "Scene 2: Hunters Trap the Lion",
        image_url: "/images/week34/webtoon_scene_4.png",
        caption: "Suddenly, hunters trapped the lion in a heavy rope net.",
        frame_L1: "Suddenly, two hunters trapped the lion in a heavy net.",
        connectors: ["Then", "Suddenly", "After that"],
        display_chips: ["in a heavy net", "two hunters", "trapped the lion"],
        pills: ["in a heavy net", "two hunters", "trapped the lion"],
        correct_order: ["two hunters", "trapped the lion", "in a heavy net"],
        audio: "Suddenly, two hunters trapped the strong lion in a heavy net."
      },
      {
        scene: 3,
        ladder_stage: "WRITE",
        badge_label: "WRITE",
        title: "Scene 3: Mouse Rescues Lion",
        image_url: "/images/week34/webtoon_scene_5.png",
        caption: "The brave mouse chewed the thick ropes and freed the lion.",
        frame_L1: "The brave mouse chewed the thick ropes and freed his friend.",
        connectors: ["Finally", "In the end", "At last"],
        keywords: ["the brave mouse", "chew the ropes", "free the lion", "feel grateful"],
        pills: ["the brave mouse", "chew the ropes", "free the lion", "feel grateful"],
        audio: "Finally, the brave mouse chewed the thick ropes and freed the mighty lion."
      }
    ],
    connectors: ["In the beginning,", "Suddenly,", "Finally,"],
    word_bank: [
      "lion", "mouse", "sleeping", "shady tree", "forest",
      "hunters", "trapped", "heavy net", "thick ropes", "chewed",
      "sharp teeth", "freed", "escaped", "grateful", "best friends"
    ],
    min_words: 20
  },

  rw_part_1: readingHub.rw_part1,
  rw_part_2: readingHub.rw_part2,
  rw_part_3: readingHub.reading_part3_story,
  rw_part_4: readingHub.rw_part4,
  rw_part_5: readingHub.rw_part5,

  writing_chunks: {
    setting_time: ["On a sunny afternoon", "Under a shady tree", "In the deep forest", "During morning hours"],
    action_manner: ["was sleeping peacefully", "ran quickly across", "chewed through ropes", "roared loudly for help"],
    problem_event: ["stepped into a rope trap", "was caught in a heavy net", "felt scared and helpless"],
    solution_outcome: ["cut the thick ropes", "freed the mighty lion", "became loyal friends forever"]
  },

  science_report_config: {
    topic: "Animal Cooperation in Nature",
    notebookTitle: "Animal Cooperation Lab Notebook",
    purpose: "For young learners (little scientists): practice observational reporting using concrete scientific facts observed / because / past tense structures.",
    data_card: [
      { id: 1, subject: "Mighty Lion", action: "protected the forest territory", result: "kept other animals safe" },
      { id: 2, subject: "Tiny Mouse", action: "chewed through the thick ropes", result: "freed his large friend" },
      { id: 3, subject: "Forest Birds", action: "chirped high in the trees", result: "alerted others about danger" }
    ],
    step1Title: "Observe Animal Roles",
    step1Pills: {
      "🦁 Large Animals": ["protect the forest territory", "maintain balance in nature", "keep other animals safe"],
      "🐭 Small Helpers": ["clean the forest floor", "plant new seeds", "help larger friends in trouble"]
    },
    step2Title: "Measure Mutual Benefits",
    step2Pills: {
      "🤝 Teamwork Actions": ["animals work together in harmony", "different skills help everyone survive", "cooperation makes the forest safer"],
      "🌲 Forest Health": ["plants and trees grow well", "animals stay healthy and fed", "water and shelter are shared"]
    },
    step3Title: "Record Ecosystem Conclusion",
    step3Pills: {
      "🏆 Key Conclusion": ["true friendship and teamwork help all creatures", "size does not matter when helping friends", "cooperation keeps nature strong"],
      "🌟 Takeaway": ["small acts of kindness make a big difference", "everyone has an important role in nature", "working together brings peace"]
    }
  }
};

export const writingHubData = writingHub;
export default writingHub;
