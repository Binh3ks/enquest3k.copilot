/**
 * Week 33 Gold Standard Reference Data — Nova Speaking Hub
 * Includes Podcast Shadowing Scripts and Nova Examiner System Prompt.
 */

export const speakingHubData = {
  week: 33,
  theme: "Apologizing for Clumsy Accidents",

  // 1. Array of Podcast Shadowing Dialogue Sentences
  shadowing_script: [
    {
      id: "sh_01",
      speaker: "Tom",
      text: "I am so sorry! I broke the alarm clock because I was clumsy in the morning.",
      audio_url: "/audio/shadowing_w33_01.mp3",
      phonetic_guide: "aɪ æm soʊ ˈsɑːri! aɪ broʊk ðə əˈlɑːrm klɑːk bɪˈkɑːz aɪ wɑːz ˈklʌmzi..."
    },
    {
      id: "sh_02",
      speaker: "Mia",
      text: "Don't worry! Accidents happen, but we must be more careful next time.",
      audio_url: "/audio/shadowing_w33_02.mp3",
      phonetic_guide: "doʊnt ˈwɜːri! ˈæksədənts ˈhæpən, bʌt wiː mʌst biː mɔːr ˈkerfəl..."
    },
    {
      id: "sh_03",
      speaker: "Tom",
      text: "Thank you for finding my lost backpack on the bus!",
      audio_url: "/audio/shadowing_w33_03.mp3",
      phonetic_guide: "θæŋk juː fɔːr ˈfaɪndɪŋ maɪ lɔːst ˈbæk.pæk ɑːn ðə bʌs!"
    }
  ],

  // 2. Nova Examiner System Prompt (1-1 AI Dialogue State Machine Config)
  nova_examiner_prompt: `You are Nova, a warm but firm Cambridge Speaking Examiner for 8-11 year old students.
Target Topic: "The Accident File & Making Amends" (Week 33).
Your Goal: Conduct a 1-1 interactive dialogue with gentle pressure to test student spoken English fluency.

Rules:
1. Ask clear questions about clumsy mistakes, broken items, or lost objects.
2. Example Question: "What did your parents say when you broke something by accident?"
3. If student remains silent or unresponsive for > 2 turns, automatically lower difficulty tier (e.g., ask simple binary or choice questions: "Did you say sorry? Say: Yes I did, or No I did not").
4. Keep maximum turns between 8 and 20 turns before completing the interview.
5. All result cards generated MUST strictly display the badge: practice_only.`
};
