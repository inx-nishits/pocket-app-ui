const fs = require('fs');

const original = fs.readFileSync('quiz.css', 'utf8');
const lines = original.split('\n');

const topBlock = `/* quiz.css - High Fidelity Quiz Module Styles */
:root {
    --bg-color: #e9f5ff; /* Match the blue shade of other pages */
    --card-bg: #ffffff;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-dim: #94a3b8;
    --accent-blue: #466ba9;
    --accent-light: #eff6ff; /* More subtle accent bg */
    --accent-active: #38568a; /* Pressed state for buttons */
    --success: #34c759; /* iOS native green */
    --danger: #ff3b30; /* iOS native red */
    --warning: #ff9500; /* iOS native orange */
    --safe-top: 44px;
    --safe-bottom: 34px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    -webkit-tap-highlight-color: transparent;
    
    /* Prevent accidental text selection and callouts on mobile */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

input, textarea {
    -webkit-user-select: auto !important;
    -khtml-user-select: auto !important;
    -moz-user-select: auto !important;
    -ms-user-select: auto !important;
    user-select: auto !important;
}

body {
    background-color: #e2e8f0; /* Outer background to show the phone frame effect on desktop */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow-x: hidden;
}

/* App Container (Phone shape boundary) */
.app-container {
    width: 100%;
    max-width: 414px;
    height: 100vh;
    max-height: 896px;
    background-color: var(--bg-color);
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 40px rgba(0,0,0,0.1);
}

@media (min-width: 415px) {
    .app-container {
        height: 896px;
        border-radius: 40px;
        border: 12px solid #0f172a;
        margin: 20px;
    }
}

/* SPA View Logic */
.quiz-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);
    z-index: 10;
    display: none;
    flex-direction: column;
}

.quiz-view.active {
    display: flex;
}

.quiz-view.fade-out {
    /* Removed for instant transition */
}

/* Header */
.header-wrapper {
    background: var(--accent-blue);
    position: sticky;
    top: 0;
    z-index: 50;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.header-title {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.3px;
    margin: 0;
}

.back-btn, .header-icon-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    cursor: pointer;
    box-shadow: none;
    transition: transform 0.2s, background 0.2s;
}

.back-btn:active, .header-icon-btn:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.25);
}

.back-btn svg, .header-icon-btn svg {
    width: 20px;
    height: 20px;
}
`;

// Replace lines 0 through 4130 (which corresponds to lines 1 through 4131 in the file)
const remainingLines = lines.slice(4131);

const finalContent = topBlock + '\n' + remainingLines.join('\n');

fs.writeFileSync('quiz.css', finalContent);
console.log('Fixed quiz.css successfully');
