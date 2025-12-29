import fs from 'fs';
import path from 'path';

const searchFiles = (dir, fileName) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(searchFiles(file, fileName));
        else if (file.endsWith(fileName)) results.push(file);
    });
    return results;
};

const filesToPatch = searchFiles('./src', 'DailyWatch.jsx');

if (filesToPatch.length === 0) {
    console.log("❌ DailyWatch.jsx not found via recursive search. Checking specific path...");
    if (fs.existsSync('src/modules/watch/DailyWatch.jsx')) {
        filesToPatch.push(path.resolve('src/modules/watch/DailyWatch.jsx'));
    }
}

filesToPatch.forEach(p => {
    let content = fs.readFileSync(p, 'utf8');
    console.log(` 🔍 Patching: ${p}`);

    // LOGIC THAY THẾ KEY MẠNH MẼ (Thay index bằng videoId)
    let patched = false;
    
    if (content.includes('key={video.id}')) {
        content = content.replace(/key=\{video\.id\}/g, 'key={video.videoId || video.id}');
        patched = true;
    }
    
    if (content.includes('key={index}')) {
        content = content.replace(/key=\{index\}/g, 'key={video.videoId || index}');
        patched = true;
    }

    if (content.includes('key={idx}')) {
        content = content.replace(/key=\{idx\}/g, 'key={video.videoId || idx}');
        patched = true;
    }

    if (patched) {
        fs.writeFileSync(p, content);
        console.log(` ✅ UI Fix Applied successfully.`);
    } else {
        console.log(` ℹ️  No risky keys found or already patched.`);
    }
});
