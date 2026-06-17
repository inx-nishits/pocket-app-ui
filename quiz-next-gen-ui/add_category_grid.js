const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'variant-a', 'quiz.html');
let html = fs.readFileSync(filePath, 'utf8');

// Find the format-list container
const listStartIdx = html.indexOf('<div class="format-list"');
const paddingEndIdx = html.indexOf('<div style="height: 100px;"></div>', listStartIdx);

if (listStartIdx === -1 || paddingEndIdx === -1) {
    console.error('Could not find format-list');
    process.exit(1);
}

// Extract the format-list block
let listBlock = html.substring(listStartIdx, paddingEndIdx);

// Add ID to format-list and hide it initially
let modifiedListBlock = listBlock.replace('<div class="format-list"', '<div id="view-category-list" class="format-list"');

// Create the grid block
const gridBlock = `
            <div id="view-category-grid" class="grid-2-col">
                <div class="category-card card" onclick="QuizEngine.handleCategorySelection('Criminal Law')" style="position: relative; overflow: hidden;">
                    <div class="recommended-tag" style="z-index: 10;">RECOMMENDED</div>
                    <div class="card-content">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4dd.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Criminal Law">
                        </div>
                        <h3 class="card-title">Criminal Law</h3>
                        <p class="card-subtitle">Test your knowledge on key offenses and legal statutes.</p>
                    </div>
                </div>
                
                <div class="category-card card" onclick="QuizEngine.handleCategorySelection('Traffic')">
                    <div class="card-content">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f693.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Traffic">
                        </div>
                        <h3 class="card-title">Traffic</h3>
                        <p class="card-subtitle">Review traffic codes, road regulations, and vehicle laws.</p>
                    </div>
                </div>
                
                <div class="category-card card" onclick="QuizEngine.handleCategorySelection('Custody')">
                    <div class="card-content">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f512.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Custody">
                        </div>
                        <h3 class="card-title">Custody</h3>
                        <p class="card-subtitle">Procedures and rights for detaining and managing suspects.</p>
                    </div>
                </div>
                
                <div class="category-card card" onclick="QuizEngine.handleCategorySelection('Evidence')">
                    <div class="card-content">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4c4.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Evidence">
                        </div>
                        <h3 class="card-title">Evidence</h3>
                        <p class="card-subtitle">Guidelines for securely collecting and presenting evidence.</p>
                    </div>
                </div>

                <div class="category-card card" onclick="QuizEngine.navigate('view-format', {category: 'Domestic Abuse'})">
                    <div class="card-content">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3e0.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Domestic Abuse">
                        </div>
                        <h3 class="card-title">Domestic Abuse</h3>
                        <p class="card-subtitle">Understand protocols and laws surrounding domestic incidents.</p>
                    </div>
                </div>

                <div class="category-card card" onclick="QuizEngine.handleCategorySelection('Cyber Crime')">
                    <div class="card-content">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f50d.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Detectives">
                        </div>
                        <h3 class="card-title">Detectives</h3>
                        <p class="card-subtitle">Advanced investigative techniques and detective procedures.</p>
                    </div>
                </div>

                <div class="category-card card" onclick="QuizEngine.handleCategorySelection('Promotion Exam')">
                    <div class="card-content">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f393.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Promotion Exam">
                        </div>
                        <h3 class="card-title">Promotion Exam</h3>
                        <p class="card-subtitle">Comprehensive questions to prepare for your next rank.</p>
                    </div>
                </div>

                <div class="category-card card" onclick="QuizEngine.handleCategorySelection('Random Mix')">
                    <div class="card-content">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f500.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Random Mix">
                        </div>
                        <h3 class="card-title">Random Mix</h3>
                        <p class="card-subtitle">A shuffled challenge across all topics and difficulty levels.</p>
                    </div>
                </div>
            </div>
`;

// Only replace if neither ID is already present
if (!html.includes('view-category-list') && !html.includes('view-category-grid')) {
    html = html.substring(0, listStartIdx) + modifiedListBlock + gridBlock + html.substring(paddingEndIdx);
    fs.writeFileSync(filePath, html);
    console.log('Successfully added view-category-grid and updated list ID.');
} else {
    console.log('Grid or list ID already present. Skipping replacement.');
}
