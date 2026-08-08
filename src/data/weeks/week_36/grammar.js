// WEEK 36: Grammar Station — Advanced Mode
// 20 Exercises: Irregular Verbs in Past Simple

export default {
  title: "Irregular Verbs in Past Simple",
  focus: "Past Simple forms of irregular action verbs (went, dove, swam, hid, found, came, wrote, gave, spoke, made)",
  exercises: [
    { id: 1, type: "fill_blank", question: "On Sunday afternoon, Leo ___ (go) into the ocean in a submarine.", answer: "went", hint: "Past tense of go" },
    { id: 2, type: "fill_blank", question: "The exploration team ___ (dive) 300 metres below the surface.", answer: "dove", hint: "Past tense of dive" },
    { id: 3, type: "fill_blank", question: "They ___ (find) a heavy ancient wooden chest in the cavern.", answer: "found", hint: "Past tense of find" },
    { id: 4, type: "fill_blank", question: "Marco Polo ___ (leave) Venice when he was seventeen years old.", answer: "left", hint: "Past tense of leave" },
    { id: 5, type: "fill_blank", question: "Marco Polo ___ (speak) several foreign languages during his travels.", answer: "spoke", hint: "Past tense of speak" },
    { id: 6, type: "fill_blank", question: "The team ___ (write) detailed notes in their research journal.", answer: "wrote", hint: "Past tense of write" },
    { id: 7, type: "fill_blank", question: "They ___ (give) the 16th-century gold compass to the museum.", answer: "gave", hint: "Past tense of give" },
    { id: 8, type: "fill_blank", question: "The ancient ship ___ (sink) hundreds of years ago.", answer: "sank", hint: "Past tense of sink" },

    { id: 9, type: "multiple_choice", question: "Which irregular past verb correctly completes: 'Tiny fish ___ between the rocks'?", options: ["swam", "swimmed", "swimming", "swams"], answer: "swam" },
    { id: 10, type: "multiple_choice", question: "Which verb is the past tense of 'hide'?", options: ["hid", "hided", "hidden", "hiding"], answer: "hid" },
    { id: 11, type: "multiple_choice", question: "Which verb completes: 'The gold coins ___ brightly under the spotlight'?", options: ["shone", "shined", "shining", "shines"], answer: "shone" },
    { id: 12, type: "multiple_choice", question: "Which past verb completes: 'Kublai Khan ___ Marco Polo an important job'?", options: ["gave", "gived", "given", "gives"], answer: "gave" },

    { id: 13, type: "unscramble", words: ["went", "Leo", "submarine", "a", "in", "underwater"], answer: "Leo went underwater in a submarine", hint: "Start with subject Leo" },
    { id: 14, type: "unscramble", words: ["found", "they", "compass", "a", "gold"], answer: "They found a gold compass", hint: "Start with They" },
    { id: 15, type: "unscramble", words: ["left", "Marco", "Polo", "Venice", "in", "1271"], answer: "Marco Polo left Venice in 1271", hint: "Start with Marco Polo" },
    { id: 16, type: "unscramble", words: ["spoke", "he", "languages", "many", "fluently"], answer: "He spoke many languages fluently", hint: "Start with He" },

    { id: 17, type: "sentence_correct", incorrect: "Leo and his team feeled very excited when they found the chest.", correct: "Leo and his team felt very excited when they found the chest.", explanation: "Past of feel is felt, not feeled." },
    { id: 18, type: "sentence_correct", incorrect: "Marco Polo writed a book about his Silk Road journey.", correct: "Marco Polo wrote a book about his Silk Road journey.", explanation: "Past of write is wrote, not writed." },
    { id: 19, type: "sentence_correct", incorrect: "The lift bags bringed the heavy chest to the surface.", correct: "The lift bags brought the heavy chest to the surface.", explanation: "Past of bring is brought." },
    { id: 20, type: "sentence_correct", incorrect: "They runned out of compressed air during the dive.", correct: "They ran out of compressed air during the dive.", explanation: "Past of run is ran." }
  ]
};
