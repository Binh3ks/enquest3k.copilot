// Week 34 Real Data — AI Tutor format
import vocab from './vocab.js';

export const weekRealData = {
  weekId: 34,
  theme: "The Lion and the Mouse",
  target_vocab: vocab,
  story_missions: [
    {
      mission_id: 1,
      title: "Mission 1: The Sleeping Lion",
      prompt: "Tell Nova what the lion was doing when the mouse arrived."
    },
    {
      mission_id: 2,
      title: "Mission 2: Trapped in the Net",
      prompt: "Explain how the hunters trapped the lion and how the mouse helped."
    },
    {
      mission_id: 3,
      title: "Mission 3: Helping Your Friends",
      prompt: "Share a time when you helped a friend or family member."
    }
  ],
  spark_talk: [
    {
      id: "spark_1",
      topic: "Small Animals with Big Superpowers",
      prompt: "Which small animal do you think is the smartest and why?"
    },
    {
      id: "spark_2",
      topic: "Keeping Promises",
      prompt: "Why is it important to always keep promises to your friends?"
    }
  ]
};

export default weekRealData;
