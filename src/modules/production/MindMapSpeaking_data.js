// Updated content arrays/objects for MindMapSpeaking.jsx

const centerStems = [
    "There was a ___.",
    "There were many ___.",
    "There was ___ here.",
    "There were ___ everywhere."
];

const branchLabels = {
    "There was a ___.": [
        "big map",
        "heavy hammer",
        "sharp tool",
        "deep hole"
    ],
    "There were many ___.": [
        "old bones",
        "big rocks",
        "small stones",
        "cool fossils"
    ],
    "There was ___ here.": [
        "a lot of sand",
        "a lot of dust",
        "one big bone",
        "a secret door"
    ],
    "There were ___ everywhere.": [
        "old pots",
        "ancient coins",
        "shiny rocks",
        "busy people"
    ]
};

// Ensure the generator works for Week 20 / The Archaeologist view
const week20Content = {
    centerStem: centerStems,
    branches: branchLabels
};

export default week20Content;
