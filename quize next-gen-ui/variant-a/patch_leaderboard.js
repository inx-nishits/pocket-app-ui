const fs = require('fs');

let html = fs.readFileSync('quiz.html', 'utf8');

const targetStr = `<div class="card premium-card" onclick="QuizEngine.navigate('view-leaderboard')" style="cursor: pointer; margin-bottom: 32px; padding: 0;">
                <!-- Team Rank Row -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.05);">`;

const replacementStr = `<div class="card premium-card" style="margin-bottom: 32px; padding: 0; overflow: hidden;">
                <!-- Team Rank Row -->
                <div onclick="QuizEngine.navigate('view-leaderboard'); setTimeout(() => QuizEngine.switchLeaderboardTab(document.querySelectorAll('#view-leaderboard .tab-btn')[1], 'team'), 50);" style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.02)'" onmouseout="this.style.background='transparent'">`;

html = html.replace(targetStr, replacementStr);

const targetStr2 = `<!-- National Rank Row -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px;">`;

const replacementStr2 = `<!-- National Rank Row -->
                <div onclick="QuizEngine.navigate('view-leaderboard'); setTimeout(() => QuizEngine.switchLeaderboardTab(document.querySelectorAll('#view-leaderboard .tab-btn')[2], 'national'), 50);" style="display: flex; justify-content: space-between; align-items: center; padding: 20px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.02)'" onmouseout="this.style.background='transparent'">`;

html = html.replace(targetStr2, replacementStr2);

fs.writeFileSync('quiz.html', html, 'utf8');
console.log("Leaderboard click handlers patched successfully.");
