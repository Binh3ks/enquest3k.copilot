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
        title: "Scene 1: Lion in the Forest",
        image_url: "/images/week34/webtoon_scene_1.png",
        caption: "The mighty lion was resting under a tall oak tree in the forest.",
        frame_L1: "The mighty lion was sleeping peacefully under a tall oak tree.",
        locked_connector: "In the beginning,",
        ordered_chips: ["the mighty lion", "was sleeping peacefully", "under a tall oak tree"],
        pills: ["the mighty lion", "was sleeping peacefully", "under a tall oak tree"],
        audio: "On a sunny afternoon, the mighty lion was resting under a tall tree."
      },
      {
        scene: 2,
        ladder_stage: "BUILD",
        badge_label: "BUILD",
        title: "Scene 2: Trapped in Heavy Net",
        image_url: "/images/week34/webtoon_scene_4.png",
        caption: "The hunters trapped the strong lion in a heavy rope net.",
        frame_L1: "Suddenly, hunters trapped the lion in a heavy rope net.",
        connectors: ["Then", "Suddenly", "After that"],
        display_chips: ["trapped the strong lion", "the hunters", "in a heavy rope net"],
        pills: ["trapped the strong lion", "the hunters", "in a heavy rope net"],
        correct_order: ["the hunters", "trapped the strong lion", "in a heavy rope net"],
        audio: "Suddenly, the hunters trapped the lion in a strong net."
      },
      {
        scene: 3,
        ladder_stage: "WRITE",
        badge_label: "WRITE",
        title: "Scene 3: Mouse Frees the Lion",
        image_url: "/images/week34/webtoon_scene_5.png",
        caption: "The brave mouse chewed through the thick ropes and freed the lion.",
        frame_L1: "The brave mouse chewed the thick ropes and freed the mighty lion.",
        connectors: ["Finally", "In the end", "At last"],
        keywords: ["the brave mouse", "chew", "the thick ropes", "free"],
        pills: ["the brave mouse", "chew", "the thick ropes", "free"],
        audio: "Finally, the brave mouse chewed the ropes and freed the lion."
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
    purpose: "🌱 Today we write like little scientists: we say what we SAW, use past tense, and join ideas with because / so!",
    teacher_parent_note: "Learn the language of science reports (observed / because / past tense), not science content.",
    data_card: [
      { subject: "🐿️ Squirrels", action: "buried extra nuts in the ground", result: "some nuts grew into new oak trees" },
      { subject: "🐝 Bees", action: "drank sweet nectar from flowers", result: "carried pollen to help new flowers grow" },
      { subject: "🐦 Jays", action: "hid seeds under soft leaves", result: "started small green plants across the forest" }
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
