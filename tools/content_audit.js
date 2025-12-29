import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspaceRoot = path.resolve(__dirname, '..');
const dataRoot = path.join(workspaceRoot, 'src', 'data');
const publicRoot = path.join(workspaceRoot, 'public');

const weekDirs = [
    path.join(dataRoot, 'weeks'),
    path.join(dataRoot, 'weeks_easy')
];

let findings = [];
let allMediaAssets = new Set();

// --- Helper Functions ---

function logFinding(type, file, details) {
    const finding = { type, file: path.relative(workspaceRoot, file), details };
    findings.push(finding);
    console.log(`[${type}] in ${finding.file}: ${details}`);
}

function listFilesRecursive(dir) {
    if (!fs.existsSync(dir)) return [];
    let fileList = [];
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fileList = fileList.concat(listFilesRecursive(fullPath));
        } else {
            fileList.push(fullPath);
        }
    });
    return fileList;
}

function checkMediaExists(mediaPath, sourceFile, context) {
    if (!mediaPath || typeof mediaPath !== 'string' || !mediaPath.startsWith('/')) {
        return; // Ignore invalid or external paths
    }
    const expectedFilePath = path.join(publicRoot, mediaPath.substring(1));
    if (!allMediaAssets.has(expectedFilePath)) {
        logFinding('Missing Media', sourceFile, `File not found: ${mediaPath} (referenced for ${context})`);
    }
}

function auditVocabStation(stationData, filePath) {
    if (!stationData || !Array.isArray(stationData.vocab)) return;

    const ids = new Set();
    stationData.vocab.forEach(item => {
        if (!item) return;
        // Check for duplicate IDs
        if (item.id && ids.has(item.id)) {
            logFinding('Duplicate ID', filePath, `Duplicate vocab ID #${item.id} for word "${item.word}"`);
        }
        if (item.id) ids.add(item.id);

        // Check image-word mismatch
        if (item.image_url && item.word) {
            const imageName = path.basename(item.image_url, path.extname(item.image_url)).toLowerCase();
            const word = item.word.toLowerCase().replace(/[?']/g, '').replace(/ /g, '_');
            if (!imageName.includes(word) && !word.includes(imageName)) {
                logFinding('Image-Word Mismatch', filePath, `Word "${item.word}" may have wrong image: ${path.basename(item.image_url)}`);
            }
        }
        
        // Check audio-word mismatch
        if (item.audio_word && item.word) {
             const audioName = path.basename(item.audio_word, path.extname(item.audio_word)).toLowerCase();
             const word = item.word.toLowerCase().replace(/[?']/g, '').replace(/ /g, '_');
             if (!audioName.includes(word) && !word.includes(audioName)) {
                logFinding('Audio-Word Mismatch', filePath, `Word "${item.word}" may have wrong audio: ${path.basename(item.audio_word)}`);
             }
        }

        // Check for media existence
        checkMediaExists(item.image_url, filePath, `vocab word: "${item.word}"`);
        checkMediaExists(item.audio_word, filePath, `vocab word audio: "${item.word}"`);
        checkMediaExists(item.audio_def, filePath, `vocab definition audio: "${item.word}"`);
    });
}

async function auditWeekFile(filePath) {
    try {
        // Use a path that is unambiguous for dynamic import
        const modulePath = 'file://' + path.resolve(filePath);
        const module = await import(modulePath);
        const weekData = module.default;

        if (!weekData) return;

        // Handle single station files (like vocab.js)
        if (weekData.vocab) {
             auditVocabStation(weekData, filePath);
        }

        // Handle week files with multiple stations
        if (weekData.stations) {
            for (const stationKey in weekData.stations) {
                const stationData = weekData.stations[stationKey];
                if (stationKey === 'new_words' || stationKey === 'vocab') {
                    auditVocabStation(stationData, filePath);
                }
                // Future checks for other stations can be added here
            }
        }
    } catch (error) {
        logFinding('File Error', filePath, `Could not process file: ${error.message}`);
    }
}

// --- Main Execution ---

async function runAudit() {
    console.log("--- Starting Content Audit ---");

    console.log("\n1. Building media asset manifest...");
    const audioFiles = listFilesRecursive(path.join(publicRoot, 'audio'));
    const imageFiles = listFilesRecursive(path.join(publicRoot, 'images'));
    allMediaAssets = new Set([...audioFiles, ...imageFiles]);
    console.log(`   Found ${allMediaAssets.size} media files.`);

    console.log("\n2. Scanning week data files...");
    const allWeekFiles = weekDirs.flatMap(dir => {
        if (!fs.existsSync(dir)) return [];
        return fs.readdirSync(dir)
            .filter(file => file.startsWith('week_') && (file.endsWith('.js') || fs.statSync(path.join(dir, file)).isDirectory()))
            .flatMap(file => {
                const weekPath = path.join(dir, file);
                if (fs.statSync(weekPath).isDirectory()) {
                    // Handle folder-based weeks (e.g., week_20/)
                    return fs.readdirSync(weekPath)
                        .filter(subFile => subFile.endsWith('.js'))
                        .map(subFile => path.join(weekPath, subFile));
                } else {
                    // Handle single-file weeks
                    return [weekPath];
                }
            });
    });
    
    console.log(`   Found ${allWeekFiles.length} data files to audit.`);

    for (const file of allWeekFiles) {
        await auditWeekFile(file);
    }

    console.log("\n--- Audit Complete ---");
    if (findings.length === 0) {
        console.log("✅ No inconsistencies found. Great job!");
    } else {
        console.log(`\n🔥 Found ${findings.length} potential issues.`);
        fs.writeFileSync(path.join(workspaceRoot, 'CONTENT_AUDIT_REPORT.md'), JSON.stringify(findings, null, 2));
        console.log('   A full report has been saved to CONTENT_AUDIT_REPORT.md');
    }
}

runAudit();
