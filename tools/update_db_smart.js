const fs = require('fs');

const dbPath = 'src/data/syllabus_database.js';
const weekId = 20;
const weekData = {
  title: "The Old Town",
  grammar: ["There was / There were"],
  math: ["Past vs Present"],
  science: [], // No specific science focus mentioned for Week 20
  topic: ["History of my city"]
};

console.log(`Preparing to add Week ${weekId} to the database...`);

try {
  // Read the database file
  let content = fs.readFileSync(dbPath, 'utf8');

  // Check if week 20 already exists to prevent duplicates
  if (content.includes(`'${weekId}': {`)) {
    console.log(`Week ${weekId} already exists in the database. Skipping.`);
    return;
  }

  // Prepare the new entry string
  const fs = require('fs');

// Get week ID from command line arguments, default to null
const weekIdArg = process.argv[2];

if (!weekIdArg) {
  console.error("Error: Please provide a week ID as a command-line argument.");
  console.log("Usage: node tools/update_db_smart.js <week_id>");
  process.exit(1);
}

const weekId = parseInt(weekIdArg, 10);

if (isNaN(weekId)) {
    console.error(`Error: Invalid week ID '${weekIdArg}'. Please provide a number.`);
    process.exit(1);
}

// Define data for known weeks. In a real scenario, this might come from a config file.
const weekDataLibrary = {
  19: {
    title: "Looking Back",
    grammar: ["Past Simple: was/were"],
    math: ["Problem Solving with Past Events"],
    science: ["Human Growth & Development"],
    topic: ["Childhood & Memories"]
  },
  20: {
    title: "The Old Town",
    grammar: ["There was / There were"],
    math: ["Past vs Present"],
    science: [],
    topic: ["History of my city"]
  }
};

const weekData = weekDataLibrary[weekId];

if (!weekData) {
    console.error(`Error: No data defined for Week ${weekId}. Please add it to the 'weekDataLibrary' in this script.`);
    process.exit(1);
}

const dbPath = 'src/data/syllabus_database.js';

function updateDatabase() {
  console.log(`Preparing to add/update Week ${weekId} in the database...`);

  try {
    let content = fs.readFileSync(dbPath, 'utf8');

    // Check if the week already exists
    const weekRegex = new RegExp(`'${weekId}':\s*\{[^}]*\}`, 'g');
    const entryExists = weekRegex.test(content);

    const newEntry = `'${weekId}': {
    title: 

  // Find the last closing brace of the main object
  const lastBraceIndex = content.lastIndexOf('};');

  if (lastBraceIndex === -1) {
    throw new Error("Could not find the closing brace of the syllabusDB object.");
  }

  // Find the character right before the last brace to check for a comma
  let insertionPoint = content.substring(0, lastBraceIndex).trimEnd();
  
  if (!insertionPoint.endsWith(',') && !insertionPoint.endsWith('{')) {
    insertionPoint += ',';
  }

  const finalContent = insertionPoint + newEntry + '\n' + content.substring(lastBraceIndex);
  
  fs.writeFileSync(dbPath, finalContent, 'utf8');
  
  console.log(`✅ Successfully updated ${dbPath} with Week ${weekId} data.`);

} catch (error) {
  console.error("❌ Error updating the database:", error.message);
}
