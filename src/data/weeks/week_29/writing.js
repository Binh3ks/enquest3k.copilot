export default {
  title: "Writing: The Magic Trip",
  image_url: null,
  instruction_en: "Write about a magic trip! Use the past tense. Where did you GO? Who did you MEET (a pilot, a doctor, a farmer, a teacher, a driver, or a nurse)? What CAME to help you? Include at least THREE occupations words!",
  instruction_vi: "H\u00e3y vi\u1ebft v\u1ec1 m\u1ed9t chuy\u1ebfn \u0111i k\u1ef3 di\u1ec7u! D\u00f9ng th\u00ec qu\u00e1 kh\u1ee9. B\u1ea1n \u0111\u00e3 \u0110I \u0111\u00e2u? B\u1ea1n g\u1eb6P ai (m\u1ed9t phi c\u00f4ng, b\u00e1c s\u0129, n\u00f4ng d\u00e2n, gi\u00e1o vi\u00ean, t\u00e0i x\u1ebf, hay y t\u00e1)? \u0110i\u1ec1u g\u00ec \u0110\u1ebcN \u0111\u1ec3 gi\u00fap b\u1ea1n?",
  prompt_en: "Imagine you found a magic carpet, a magic boat, or a magic bicycle. Describe your trip using went, flew, came, and ran.",
  prompt_vi: "H\u00e3y t\u01b0\u1edfng t\u01b0\u1ee3ng b\u1ea1n t\u00ecm th\u1ea5y m\u1ed9t t\u1ea5m th\u1ea3m th\u1ea7n, m\u1ed9t con thuy\u1ec1n th\u1ea7n k\u1ef3, ho\u1eb7c m\u1ed9t chi\u1ebfc xe \u0111\u1ea1p k\u1ef3 di\u1ec7u. M\u00f4 t\u1ea3 chuy\u1ebfn \u0111i c\u1ee7a b\u1ea1n d\u00f9ng went, flew, came v\u00e0 ran.",
  model_sentence: "Last night, I found a magic carpet under my bed. I sat on it and it flew up! I went to a farm and a kind farmer gave me an apple. Then the carpet came down near a hospital and a doctor and nurse waved hello. A pilot flew past in his plane and I ran back to the carpet before it flew home. It was the best trip I ever had!",
  keywords: ["went", "flew", "came", "ran", "pilot", "doctor", "farmer", "teacher", "driver", "nurse", "adventure", "journey"],
  topic_talk_prompt: "What job would you like to have — pilot, doctor, farmer, teacher, driver, or nurse? Why? Speak for at least 5 sentences!",
  audio_model: "/audio/week29/writing_model.mp3",
  sentence_frames: [
    {
      "template": "I found a ___ under my ___ and it flew me to a ___.",
      "answers": ["magic carpet", "bed", "wonderful island"]
    },
    {
      "template": "When I arrived, I saw ___ creatures and ___ dolphins near the ___.",
      "answers": ["tiny", "friendly", "coast"]
    },
    {
      "template": "I met a ___ who ___ and helped me ___.",
      "answers": ["kind doctor", "came quickly", "feel better"]
    },
    {
      "template": "A ___ drove us along the ___ road while the ___ flew above.",
      "answers": ["friendly driver", "tiny island", "pilot"]
    },
    {
      "template": "We took a ___ of the dolphins and the ___ teacher ___ at the camera.",
      "answers": ["photo", "wonderful", "smiled"]
    },
    {
      "template": "The farmer ___ us fresh fruit and the nurse ___ everyone safely.",
      "answers": ["gave", "checked"]
    },
    {
      "template": "At the station, we found the magic ___ again and it ___ us safely ___.",
      "answers": ["carpet", "carried", "home"]
    },
    {
      "template": "It was the most ___ trip I ever had because I met so many ___ people and saw ___ things.",
      "answers": ["wonderful", "kind", "amazing"]
    }
  ]
};