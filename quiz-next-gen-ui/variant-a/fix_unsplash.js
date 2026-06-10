const fs = require('fs');
const path = require('path');

const menAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop'
];

const womenAvatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop'
];

function processFile(filepath) {
    const fullPath = path.join(__dirname, filepath);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Replace men
    let mIndex = 0;
    content = content.replace(/https:\/\/randomuser\.me\/api\/portraits\/men\/\d+\.jpg/g, (match) => {
        const replacement = menAvatars[mIndex % menAvatars.length];
        mIndex++;
        return replacement;
    });

    // Replace women
    let wIndex = 0;
    content = content.replace(/https:\/\/randomuser\.me\/api\/portraits\/women\/\d+\.jpg/g, (match) => {
        const replacement = womenAvatars[wIndex % womenAvatars.length];
        wIndex++;
        return replacement;
    });
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${filepath}`);
}

processFile('quiz.js');
processFile('quiz.html');
processFile('menu.html');
