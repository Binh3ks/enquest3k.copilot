const fs = require('fs');
const dbPath = 'src/data/syllabus_database.js';
if (fs.existsSync(dbPath)) {
    let content = fs.readFileSync(dbPath, 'utf8');
    const missingData = `
  19: { 
    title: "Emotional Intelligence", 
    grammar: ["Past Tense Irregular", "Feelings"], 
    math: ["Time Sequencing"], 
    science: ["Human Emotions"], 
    topic: ["Analyzing Feelings"] 
  },
  20: { 
    title: "The Archaeologist", 
    grammar: ["There was / There were"], 
    math: ["Telling Time", "Clock Reading"], 
    science: ["Materials", "Preservation"], 
    topic: ["History & Discovery"] 
  }`;
    
    const lastBrace = content.lastIndexOf('};');
    if (lastBrace !== -1) {
        let before = content.substring(0, lastBrace).trimEnd();
        if (before.endsWith('}')) before += ',';
        const after = content.substring(lastBrace);
        fs.writeFileSync(dbPath, before + missingData + '\n' + after);
        console.log("✅ Database updated with Week 19 & 20.");
    }
}
