const fs = require('fs');

let html = fs.readFileSync('variant-a/quiz.html', 'utf8');

// Replace header
html = html.replace('<h1 class="header-title">Quiz Categories</h1>', '<h1 class="header-title">Choose Exam</h1>');

// Replace the grid block with the list block
const newGrid = `            <div class="format-list" style="display: flex; flex-direction: column; gap: 16px;">
                <!-- 1. Criminal Law -->
                <div class="format-card" onclick="QuizEngine.handleCategorySelection('Criminal Law')" style="position: relative; overflow: hidden;">
                    <div class="recommended-tag" style="z-index: 10;">RECOMMENDED</div>
                    <div class="format-card-left">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4dd.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Criminal Law">
                        </div>
                        <div class="format-info">
                            <h3>Criminal Law</h3>
                            <p>Test your knowledge on key offenses and legal statutes.</p>
                        </div>
                    </div>
                    <div class="format-card-right">
                        <button class="star-btn" onclick="event.stopPropagation(); this.classList.toggle('active');"><img src="../images/star-sm.svg" alt="Star"></button>
                    </div>
                </div>
                
                <!-- 2. Traffic -->
                <div class="format-card" onclick="QuizEngine.handleCategorySelection('Traffic')">
                    <div class="format-card-left">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f693.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Traffic">
                        </div>
                        <div class="format-info">
                            <h3>Traffic</h3>
                            <p>Review traffic codes, road regulations, and vehicle laws.</p>
                        </div>
                    </div>
                    <div class="format-card-right">
                        <button class="star-btn" onclick="event.stopPropagation(); this.classList.toggle('active');"><img src="../images/star-sm.svg" alt="Star"></button>
                    </div>
                </div>
                
                <!-- 3. Custody -->
                <div class="format-card" onclick="QuizEngine.handleCategorySelection('Custody')">
                    <div class="format-card-left">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f512.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Custody">
                        </div>
                        <div class="format-info">
                            <h3>Custody</h3>
                            <p>Procedures and rights for detaining and managing suspects.</p>
                        </div>
                    </div>
                    <div class="format-card-right">
                        <button class="star-btn" onclick="event.stopPropagation(); this.classList.toggle('active');"><img src="../images/star-sm.svg" alt="Star"></button>
                    </div>
                </div>
                
                <!-- 4. Evidence -->
                <div class="format-card" onclick="QuizEngine.handleCategorySelection('Evidence')">
                    <div class="format-card-left">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4c4.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Evidence">
                        </div>
                        <div class="format-info">
                            <h3>Evidence</h3>
                            <p>Guidelines for securely collecting and presenting evidence.</p>
                        </div>
                    </div>
                    <div class="format-card-right">
                        <button class="star-btn" onclick="event.stopPropagation(); this.classList.toggle('active');"><img src="../images/star-sm.svg" alt="Star"></button>
                    </div>
                </div>

                <!-- 5. Domestic Abuse -->
                <div class="format-card" onclick="QuizEngine.navigate('view-format', {category: 'Domestic Abuse'})">
                    <div class="format-card-left">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3e0.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Domestic Abuse">
                        </div>
                        <div class="format-info">
                            <h3>Domestic Abuse</h3>
                            <p>Understand protocols and laws surrounding domestic incidents.</p>
                        </div>
                    </div>
                    <div class="format-card-right">
                        <button class="star-btn" onclick="event.stopPropagation(); this.classList.toggle('active');"><img src="../images/star-sm.svg" alt="Star"></button>
                    </div>
                </div>

                <!-- 6. Detectives -->
                <div class="format-card" onclick="QuizEngine.handleCategorySelection('Cyber Crime')">
                    <div class="format-card-left">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f50d.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Detectives">
                        </div>
                        <div class="format-info">
                            <h3>Detectives</h3>
                            <p>Advanced investigative techniques and detective procedures.</p>
                        </div>
                    </div>
                    <div class="format-card-right">
                        <button class="star-btn" onclick="event.stopPropagation(); this.classList.toggle('active');"><img src="../images/star-sm.svg" alt="Star"></button>
                    </div>
                </div>

                <!-- 7. Promotion Exam -->
                <div class="format-card" onclick="QuizEngine.handleCategorySelection('Promotion Exam')">
                    <div class="format-card-left">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f393.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Promotion Exam">
                        </div>
                        <div class="format-info">
                            <h3>Promotion Exam</h3>
                            <p>Comprehensive questions to prepare for your next rank.</p>
                        </div>
                    </div>
                    <div class="format-card-right">
                        <button class="star-btn" onclick="event.stopPropagation(); this.classList.toggle('active');"><img src="../images/star-sm.svg" alt="Star"></button>
                    </div>
                </div>

                <!-- 8. Random Mix -->
                <div class="format-card" onclick="QuizEngine.handleCategorySelection('Random Mix')">
                    <div class="format-card-left">
                        <div class="category-icon-top">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f500.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Random Mix">
                        </div>
                        <div class="format-info">
                            <h3>Random Mix</h3>
                            <p>A shuffled challenge across all topics and difficulty levels.</p>
                        </div>
                    </div>
                    <div class="format-card-right">
                        <button class="star-btn" onclick="event.stopPropagation(); this.classList.toggle('active');"><img src="../images/star-sm.svg" alt="Star"></button>
                    </div>
                </div>
            </div>`;

const startIndex = html.indexOf('<div class="grid-2-col">');
const endIndex = html.indexOf('<div style="height: 100px;"></div> <!-- Bottom Padding -->');

if (startIndex !== -1 && endIndex !== -1) {
    html = html.substring(0, startIndex) + newGrid + '\n            ' + html.substring(endIndex);
    fs.writeFileSync('variant-a/quiz.html', html);
    console.log('Success');
} else {
    console.log('Failed to find markers');
}
