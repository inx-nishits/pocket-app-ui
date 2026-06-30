const fs = require('fs');

function tryFixEncoding(text) {
    // Try to decode as windows-1252/latin1
    // The mojibake is like 'Ã°Å¸â€˜Â®'.
    // If we convert this back to latin1 bytes, and decode as utf8, we get the original utf8 bytes.
    // However, some characters like 'â€˜' are Windows-1252 0x91, which in JS latin1 (ISO-8859-1) is not 0x91.
    // Node.js doesn't natively support windows-1252, but we can write a simple mapping for the 0x80-0x9F range if needed.
    // Let's just try basic latin1 first.
    try {
        const buf = Buffer.from(text, 'latin1');
        return buf.toString('utf8');
    } catch(e) {
        return text;
    }
}

function processFile(filename) {
    const text = fs.readFileSync(filename, 'utf8');
    const lines = text.split('\n');
    let fixedLines = 0;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Ã')) {
            console.log('Original:', lines[i].trim());
            
            // Because of windows-1252, some chars in 0x80-0x9F might have been parsed differently.
            // Let's see what a direct Buffer conversion does:
            const buf = Buffer.from(lines[i], 'utf8'); // Wait, if the text is 'Ã°...', it's already a JS string.
            // We need to convert the JS string characters to bytes. 
            // The characters are literally 'Ã' (0xC3), '°' (0xB0), 'Å' (0xC5), etc.
            // We can get their char codes:
            let bytes = [];
            let canConvert = true;
            for (let j = 0; j < lines[i].length; j++) {
                let code = lines[i].charCodeAt(j);
                
                // Windows-1252 reverse mapping for the "funny" characters (e.g. â€˜ which is \u2018)
                // If it's a typical windows-1252 character, map it back to its byte.
                if (code === 0x201A) code = 0x82; // ‚
                else if (code === 0x0192) code = 0x83; // ƒ
                else if (code === 0x201E) code = 0x84; // „
                else if (code === 0x2026) code = 0x85; // …
                else if (code === 0x2020) code = 0x86; // †
                else if (code === 0x2021) code = 0x87; // ‡
                else if (code === 0x02C6) code = 0x88; // ˆ
                else if (code === 0x2030) code = 0x89; // ‰
                else if (code === 0x0160) code = 0x8A; // Š
                else if (code === 0x2039) code = 0x8B; // ‹
                else if (code === 0x0152) code = 0x8C; // Œ
                else if (code === 0x017D) code = 0x8E; // Ž
                else if (code === 0x2018) code = 0x91; // ‘
                else if (code === 0x2019) code = 0x92; // ’
                else if (code === 0x201C) code = 0x93; // “
                else if (code === 0x201D) code = 0x94; // ”
                else if (code === 0x2022) code = 0x95; // •
                else if (code === 0x2013) code = 0x96; // –
                else if (code === 0x2014) code = 0x97; // —
                else if (code === 0x02DC) code = 0x98; // ˜
                else if (code === 0x2122) code = 0x99; // ™
                else if (code === 0x0161) code = 0x9A; // š
                else if (code === 0x203A) code = 0x9B; // ›
                else if (code === 0x0153) code = 0x9C; // œ
                else if (code === 0x017E) code = 0x9E; // ž
                else if (code === 0x0178) code = 0x9F; // Ÿ
                
                if (code > 255) {
                    // Not convertible directly, probably already a valid unicode char like a normal letter
                    // Wait, if it's not convertible, this line might have mixed content (mojibake + normal).
                    // We shouldn't blindly convert the whole line.
                }
                
                bytes.push(code & 0xFF);
            }
            
            const decoded = Buffer.from(bytes).toString('utf8');
            console.log('Decoded :', decoded.trim());
            console.log('---');
            
            if (fixedLines++ > 5) break;
        }
    }
}

processFile('quiz.html');
