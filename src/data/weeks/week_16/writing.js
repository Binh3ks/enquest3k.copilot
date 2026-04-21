export default {
  title: "My Favorite Sport",
  min_words: 40,
  model_sentence: "I love playing soccer. I am kicking the ball hard. My team is running fast. We are scoring many goals. The ball is flying through the air. Everyone is cheering loudly. I have a lot of energy. Playing sports is fun!",
  instruction_en: "Use: I am playing... / I am (running/kicking)... / We are... / I feel... because...",
  instruction_vi: "Dùng: I am playing... / I am (running/kicking)... / We are... / I feel... because...",
  prompt_en: "Write about your favourite sport or game! What sport are you playing? What are you doing right now in the game? Who are you playing with? Are you winning? How do you feel?",
  prompt_vi: "Viết về môn thể thao hoặc trò chơi yêu thích! Bạn đang chơi môn nào? Bạn đang làm gì trong trận đấu? Chơi cùng ai? Đang thắng không? Cảm giác thế nào?",
  keywords: ["I am", "is", "are", "playing", "running", "kicking", "scoring", "team", "energy", "motion"],
  topic_talk_prompt: "Tell me about your favourite sport. What are the players doing? What is happening in the game?",
  sentence_frames: [{"template":"Right now I am playing ___."},{"template":"I am ___ing the ___ and my team is ___."},{"template":"We are playing against ___."},{"template":"My job in the team is to ___."},{"template":"The score is ___ to ___."},{"template":"I feel ___ because ___."}],
};
