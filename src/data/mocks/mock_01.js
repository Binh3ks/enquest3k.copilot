/**
 * EngQuest MOCK-01 Assessment Unit
 * Cambridge Flyers Full Format Assessment
 * Parts: Reading & Writing (1-7), Listening (1-5), Speaking (1-4)
 */

export const MOCK_01_DATA = {
  mockId: "MOCK-01",
  title: "EngQuest Flyers Mock Exam 01",
  cefrLevel: "A2 Flyers",

  readingWriting: {
    part1: {
      instructions: "Match words to their descriptions.",
      items: [
        { id: "rw1_1", text: "A small room where you can wash your body", answer: "bathroom" },
        { id: "rw1_2", text: "A place where sick people are taken care of by doctors", answer: "hospital" },
        { id: "rw1_3", text: "A large animal that lives in the ocean and breathes air", answer: "whale" },
        { id: "rw1_4", text: "A piece of paper you buy to travel on a bus or train", answer: "ticket" },
        { id: "rw1_5", text: "A person who flies an airplane", answer: "pilot" }
      ]
    },
    part3: {
      instructions: "Choose the best option (A, B, C) to complete each sentence.",
      items: [
        { id: "rw3_1", question: "Tom was feeling tired because he...", options: ["A", "B", "C"], answer: "B" },
        { id: "rw3_2", question: "While Sarah was reading, her dog...", options: ["A", "B", "C"], answer: "A" }
      ]
    },
    part4: {
      instructions: "Fill in the missing words in the story (Open Cloze).",
      gaps: [
        { id: "rw4_g1", target: "walked" },
        { id: "rw4_g2", target: "because" },
        { id: "rw4_g3", target: "were" },
        { id: "rw4_g4", target: "quickly" },
        { id: "rw4_g5", target: "happily" }
      ]
    }
  },

  listening: {
    part1: {
      instructions: "Listen and draw lines between names and people in the picture.",
      items: [
        { id: "l1_1", name: "Katy", description: "Girl wearing green shirt holding a camera" },
        { id: "l1_2", name: "David", description: "Boy running near the pond with a red cap" }
      ]
    },
    part3: {
      instructions: "Listen and match each person to their favorite object (Pictures A-H).",
      items: [
        { id: "l3_1", person: "Oliver", pictureTarget: "B" },
        { id: "l3_2", person: "Sophia", pictureTarget: "E" }
      ]
    }
  },

  speaking: {
    part1: {
      instructions: "Find differences between Picture 1 and Picture 2.",
      differenceSpotCount: 6
    },
    part2: {
      instructions: "Tell a story from 5 picture panels.",
      panelCount: 5
    },
    part3: {
      instructions: "Ask and answer questions using information cards.",
      dialogueTurnLimit: 20
    }
  }
};

export default MOCK_01_DATA;
