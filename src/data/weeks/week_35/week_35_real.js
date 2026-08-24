// Week 35 Real Data — AI Tutor format
import vocab from './vocab.js';

export const weekRealData = {
  weekId: 35,
  theme: "The Best Day Ever",
  target_vocab: vocab,
  story_missions: [
    { mission_id: 1, title: "Mission 1: Arriving at Camp", prompt: "Tell Nova what the family did when they reached the campsite." },
    { mission_id: 2, title: "Mission 2: Evening Campfire", prompt: "Describe how they roasted marshmallows and enjoyed the starry sky." },
    { mission_id: 3, title: "Mission 3: Your Best Day Ever", prompt: "Share your own favorite memory or family trip." }
  ],
  spark_talk: [
    { id: "spark_1", topic: "Favorite Outdoor Adventure", prompt: "What is your favorite outdoor activity to do with friends?" },
    { id: "spark_2", topic: "Camping Essentials", prompt: "What three things would you pack in your backpack for a camping trip?" }
  ]
};

export default weekRealData;
