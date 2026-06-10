/**
 * quiz.js - High Fidelity Quiz Module Interaction Engine
 */

const QuizEngine = {
    history: ['view-hub'],
    currentFlow: null,
    selectedCategory: null,
    selectedFormat: null,
    
    startFlow: function(flowName) {
        this.currentFlow = flowName;
        if (flowName === 'live') {
            this.navigate('view-live-list');
        } else {
            this.navigate('view-category');
        }
    },
    
    handleCategorySelection: function(category) {
        if (this.currentFlow === 'quick') {
            // Quick play goes directly to active quiz, use Intermediate as default difficulty for now
            document.getElementById('difficulty-category-title').innerText = category;
            document.getElementById('preview-count').innerText = 5;
            this.navigate('view-active', {category: category, mode: 'Quick Play', count: 5});
        } else {
            // Colleague flow goes to Difficulty selection
            this.navigate('view-difficulty', {category: category});
        }
    },
    
    handleDifficultySelection: function(difficulty) {
        if (this.currentFlow === 'colleague') {
            this.navigate('view-format', {difficulty: difficulty});
        } else {
            this.navigate('view-active', {mode: 'Challenge', count: 10, difficulty: difficulty});
        }
    },
    
    showToast: function(message) {
        const existingToast = document.getElementById('quiz-toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.id = 'quiz-toast';
        toast.className = 'quiz-toast';
        toast.innerText = message;
        document.body.appendChild(toast);
        
        // Trigger reflow and show
        void toast.offsetWidth;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    },

    // --- Routing & Navigation ---
    navigate: function(viewId, params = {}, fromPopState = false) {
        const currentView = document.querySelector('.quiz-view.active');
        const nextView = document.getElementById(viewId);
        
        if (!nextView) return;
        
        // Push to history
        if (!fromPopState) {
            this.history.push(viewId);
            window.history.pushState({ viewId: viewId, index: this.history.length - 1 }, "", `#${viewId}`);
        }
        
        // Handle params mapping
        if (params.category) {
            document.getElementById('difficulty-category-title').innerText = params.category;
            this.selectedCategory = params.category;
        }
        if (params.format) {
            this.selectedFormat = params.format;
        }
        
        if (params.mode) {
            this.currentMode = params.mode;
            if(document.getElementById('preview-title')) document.getElementById('preview-title').innerText = document.getElementById('difficulty-category-title').innerText;
            if(document.getElementById('preview-mode')) document.getElementById('preview-mode').innerText = params.mode;
            if(document.getElementById('preview-count')) document.getElementById('preview-count').innerText = params.count;
            if(document.getElementById('preview-xp')) document.getElementById('preview-xp').innerText = params.count * 25;
        }
        
        if (params.difficulty) {
            this.currentDifficulty = params.difficulty;
        }
        if (viewId === 'view-challenge-confirm') {
            document.getElementById('confirm-level').innerText = params.difficulty || 'Intermediate';
            document.getElementById('confirm-category').innerText = this.selectedCategory || 'Criminal Law';
            document.getElementById('confirm-format').innerText = this.selectedFormat || 'Standard Quiz';
            const selectedOpponent = document.querySelector('.colleague-row-card.selected h3');
            if (selectedOpponent) document.getElementById('confirm-opponent').innerText = selectedOpponent.innerText;
        }

        // Switch views instantly (without buggy fade class)
        if (currentView) {
            currentView.classList.remove('active');
        }
        nextView.classList.add('active');
        
        // Special initializers
        if (viewId === 'view-active') this.initActiveQuiz();
        if (viewId === 'view-leaderboard') this.initLeaderboard();
        if (viewId === 'view-analytics') this.initAnalytics();
        if (viewId === 'view-achievements') this.initAchievements();
    },
    
    navigateBack: function() {
        if (this.history.length <= 1) {
            window.location.href = 'menu.html';
            return;
        }
        // Native back triggers the popstate listener
        window.history.back();
    },
    
    confirmExit: function() {
        if (confirm("Are you sure you want to exit? Your progress will be lost.")) {
            this.navigateBack();
        }
    },
    
    returnHome: function() {
        this.history = ['view-hub'];
        window.history.pushState({ viewId: 'view-hub', index: 0 }, "", `#view-hub`);
        document.querySelectorAll('.quiz-view').forEach(v => v.classList.remove('active'));
        document.getElementById('view-hub').classList.add('active');
    },


    // --- Countdown & Quiz Start ---
    startCountdown: function() {
        const overlay = document.getElementById('countdown-overlay');
        const numberEl = document.getElementById('countdown-number');
        overlay.classList.remove('hidden');
        
        let count = 3;
        numberEl.innerText = count;
        
        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                numberEl.innerText = count;
                // Force reflow for animation restart
                numberEl.style.animation = 'none';
                numberEl.offsetHeight; 
                numberEl.style.animation = null;
            } else {
                clearInterval(interval);
                overlay.classList.add('hidden');
                this.navigate('view-active');
            }
        }, 1000);
    },

    sendChallengeInvitation: function() {
        const overlay = document.getElementById('waiting-overlay');
        if (overlay) overlay.classList.remove('hidden');
        
        // Mock a 3 second delay for the opponent to accept the challenge
        setTimeout(() => {
            if (overlay) overlay.classList.add('hidden');
            this.navigate('view-active', {
                mode: 'Challenge', 
                count: 10, 
                difficulty: this.currentDifficulty || 'Intermediate',
                category: this.selectedCategory || 'Random Mix'
            });
        }, 3000);
    },


    // --- Active Quiz State ---
    currentQuestion: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    totalQuestions: 5,
    
    questionsData: [
        {
            q: "What is the primary objective of PACE Code A?",
            opts: ["To regulate the detention of suspects", "To regulate statutory powers of stop and search", "To regulate the searching of premises", "To regulate identification procedures"],
            correct: 1,
            expCorrect: "PACE Code A specifically deals with the exercise by police officers of statutory powers to search a person or a vehicle.",
            expWrong: "PACE Code A regulates Stop and Search. Remember: A = Action (Stop & Search)."
        },
        {
            q: "Under PACE Code C, how often should a detained person be offered a meal?",
            opts: ["Every 4 hours", "Every 6 hours", "Approximately every 8 hours", "Only upon request"],
            correct: 2,
            expCorrect: "Code C states at least two light meals and one main meal should be offered in any 24-hour period.",
            expWrong: "Code C requires meals at recognised meal times, roughly every 8 hours, not just on request."
        },
        {
            q: "Which PACE Code governs the audio recording of interviews with suspects?",
            opts: ["Code B", "Code E", "Code F", "Code G"],
            correct: 1,
            expCorrect: "Code E deals specifically with audio recording of interviews at police stations.",
            expWrong: "Code E covers audio recordings. Code F covers visual recording."
        },
        {
            q: "What is the maximum initial period of detention without charge under PACE?",
            opts: ["12 hours", "24 hours", "36 hours", "72 hours"],
            correct: 1,
            expCorrect: "The initial period is 24 hours, which can be extended up to 36 hours by a Superintendent.",
            expWrong: "The standard initial limit is 24 hours. Extensions require senior authorization."
        },
        {
            q: "When must a suspect be cautioned?",
            opts: ["Upon arrest only", "Before asking any questions regarding their involvement in an offence", "After arriving at the station", "When they ask for a solicitor"],
            correct: 1,
            expCorrect: "A person must be cautioned before any questions about an offence are put to them.",
            expWrong: "A caution must be given before questioning about suspected offences to ensure admissibility."
        }
    ],
    
    initActiveQuiz: function() {
        this.currentQuestion = 0;
        this.score = 0;
        this.streak = 0;
        this.bestStreak = 0;
        this.totalXp = 0;
        
        this.totalQuestions = parseInt(document.getElementById('preview-count').innerText) || 5;
        
        document.getElementById('active-streak').innerText = '🔥 0 Streak';
        document.getElementById('active-xp').innerText = '0 XP';
        
        // Update Difficulty Badge dynamically
        const difficultyBadge = document.getElementById('active-difficulty');
        const diffText = this.currentDifficulty || 'Intermediate';
        let diffIcon = '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4da.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;">';
        if (diffText.toLowerCase() === 'beginner') diffIcon = '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f331.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;">';
        if (diffText.toLowerCase() === 'advanced') diffIcon = '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;">';
        difficultyBadge.innerHTML = `${diffIcon} ${diffText}`;
        
        // Start timer
        this.timeElapsed = 0;
        const timerText = document.getElementById('active-timer-text');
        const timerContainer = document.getElementById('active-timer');
        timerContainer.classList.remove('timer-urgent');
        
        if (this.timerInterval) clearInterval(this.timerInterval);
        
        // If it's a Live Challenge, count down. Otherwise count up.
        // Let's implement a countdown timer for better urgency (e.g. 10 mins).
        this.timeLeft = this.totalQuestions * 30; // 30 seconds per question
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.timeLeft = 0;
                // auto submit or end quiz
            }
            
            const m = Math.floor(this.timeLeft / 60);
            const s = this.timeLeft % 60;
            timerText.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            
            if (this.timeLeft <= 10 && this.timeLeft > 0) {
                timerContainer.classList.add('timer-urgent');
            } else {
                timerContainer.classList.remove('timer-urgent');
            }
        }, 1000);
        
        this.loadQuestion();
    },
    
    loadQuestion: function() {
        this.currentQuestion++;
        this.questionStartTime = Date.now();
        
        // Update Progress Bar & Counters
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        document.getElementById('active-progress-fill').style.width = `${progress}%`;
        document.getElementById('active-progress-text').innerText = `${Math.round(progress)}% Complete`;
        document.getElementById('active-question-counter').innerText = `Question ${this.currentQuestion} of ${this.totalQuestions}`;
        
        // Hide Feedback
        document.getElementById('feedback-sheet').classList.add('hidden');
        document.getElementById('feedback-overlay').classList.add('hidden');
        document.getElementById('feedback-sheet').classList.remove('correct', 'wrong');
        
        // Mock Question Data
        const qData = this.questionsData[(this.currentQuestion - 1) % this.questionsData.length];
        document.getElementById('question-text').innerText = qData.q;
        
        const answersGrid = document.getElementById('answers-grid');
        answersGrid.innerHTML = qData.opts.map((opt, index) => {
            const isCorrect = (index === qData.correct);
            return `<button class="answer-btn" onclick="QuizEngine.selectAnswer(this, ${isCorrect})" style="transition: transform 0.1s ease, box-shadow 0.1s ease;">${opt}</button>`;
        }).join('');
    },
    
    selectAnswer: function(btnElement, isCorrect) {
        // Disable all buttons
        const buttons = document.getElementById('answers-grid').querySelectorAll('button');
        buttons.forEach(btn => btn.disabled = true);
        
        // Add micro-interaction: slight scale down
        btnElement.style.transform = 'scale(0.95)';
        setTimeout(() => { btnElement.style.transform = 'scale(1)'; }, 150);
        
        const sheet = document.getElementById('feedback-sheet');
        const overlay = document.getElementById('feedback-overlay');
        const icon = document.getElementById('feedback-icon');
        const title = document.getElementById('feedback-title');
        const xp = document.getElementById('feedback-xp');
        const streakMsg = document.getElementById('feedback-streak-msg');
        
        sheet.classList.remove('correct', 'wrong');
        
        const qData = this.questionsData[(this.currentQuestion - 1) % this.questionsData.length];
        const timeTaken = (Date.now() - this.questionStartTime) / 1000;

        if (isCorrect) {
            btnElement.classList.add('correct');
            
            this.score++;
            this.streak++;
            if (this.streak > this.bestStreak) this.bestStreak = this.streak;
            
            let xpEarned = 25; // Base 25 XP
            if (timeTaken < 3.0) {
                xpEarned += 15; // Speed bonus +15 XP
                this.showToast('⚡ Quick Thinker +15 Bonus XP');
            }
            this.totalXp += xpEarned;
            
            // Floating XP Gamification
            const floatXP = document.createElement('div');
            floatXP.className = 'floating-xp';
            floatXP.innerHTML = `✔ Correct<br>+${xpEarned} XP`;
            btnElement.appendChild(floatXP);
            setTimeout(() => floatXP.remove(), 1200);
            
            // Update Streak Indicator in top bar
            const streakContainer = document.getElementById('streak-container');
            const streakEl = document.getElementById('active-streak');
            
            streakEl.innerText = `🔥 ${this.streak} Streak`;
            
            streakContainer.classList.remove('streak-pulse');
            void streakContainer.offsetWidth; // trigger reflow
            streakContainer.classList.add('streak-pulse');

            document.getElementById('active-xp').innerText = `${this.totalXp} XP`;
            
            sheet.classList.add('correct');
            document.getElementById('feedback-details').style.display = 'flex';
            
            icon.innerHTML = '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f973.png" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle;">';
            title.innerText = 'Excellent!';
            
            streakMsg.innerHTML = `<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Streak: ${this.streak}`;
            streakMsg.style.display = 'block';
            
            document.getElementById('feedback-explanation').innerText = qData.expCorrect;
            
            // Trigger confetti for correct answer
            if (typeof confetti === 'function') {
                if (!QuizEngine.myConfetti) {
                    const canvas = document.createElement('canvas');
                    canvas.style.position = 'absolute';
                    canvas.style.top = '0';
                    canvas.style.left = '0';
                    canvas.style.width = '100%';
                    canvas.style.height = '100%';
                    canvas.style.pointerEvents = 'none';
                    canvas.style.zIndex = '2000';
                    document.querySelector('.app-container').appendChild(canvas);
                    QuizEngine.myConfetti = confetti.create(canvas, { resize: true });
                }
                QuizEngine.myConfetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.8 },
                    zIndex: 2000
                });
            }
        } else {
            btnElement.classList.add('wrong');
            
            buttons.forEach(btn => {
                if(btn.getAttribute('onclick').includes('true')) {
                    btn.classList.add('correct', 'correct-revealed');
                } else if (btn !== btnElement) {
                    btn.style.opacity = '0.4';
                }
            });
            
            this.streak = 0;
            this.streak = 0;
            document.getElementById('active-streak').innerText = '🔥 0 Streak';
            
            sheet.classList.add('wrong');
            icon.innerHTML = '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/274c.png" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle;">';
            title.innerText = 'Incorrect';
            document.getElementById('feedback-details').style.display = 'none';
            
            document.getElementById('feedback-explanation').innerText = qData.expWrong;
        }
        
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(isCorrect ? [50] : [50, 100, 50]);
        }
        
        setTimeout(() => {
            sheet.classList.remove('hidden');
            overlay.classList.remove('hidden');
            
            if (isCorrect) {
                let xpEarned = (timeTaken < 3.0) ? 40 : 25;
                xp.innerText = '+0 XP Earned';
                let currentDisplayXp = 0;
                const xpInterval = setInterval(() => {
                    currentDisplayXp += Math.ceil(xpEarned / 10);
                    if (currentDisplayXp >= xpEarned) {
                        currentDisplayXp = xpEarned;
                        clearInterval(xpInterval);
                    }
                    xp.innerText = `+${currentDisplayXp} XP Earned`;
                }, 30);
            }
        }, 600);
    },
    
    nextQuestion: function() {
        const sheet = document.getElementById('feedback-sheet');
        const overlay = document.getElementById('feedback-overlay');
        sheet.classList.add('hidden');
        overlay.classList.add('hidden');
        
        // currentQuestion is incremented by loadQuestion(), so we check against currentQuestion (before incrementing)
        if (this.currentQuestion >= this.totalQuestions) {
            this.showToast('🏆 Challenge Complete');
            setTimeout(() => {
                this.finishQuiz();
            }, 1000);
            return;
        }
        
        if (this.currentQuestion === Math.floor(this.totalQuestions / 2)) {
            this.showToast('🚀 Halfway There');
        } else if (this.currentQuestion === this.totalQuestions - 1) {
            this.showToast('⭐ Final Question');
        }
        
        this.loadQuestion();
    },
    
    finishQuiz: function() {
        const accuracy = Math.round((this.score / this.totalQuestions) * 100);
        
        // Mock opponent score for the battle view
        const opponentScore = Math.max(0, this.score - 1 + Math.floor(Math.random() * 3));
        const opponentAccuracy = Math.round((opponentScore / this.totalQuestions) * 100);
        const didWin = this.score >= opponentScore;
        const isTie = this.score === opponentScore;
        
        document.getElementById('completion-title').innerText = didWin ? (isTie ? 'It\'s a Tie!' : 'You Won!') : 'So Close!';
        document.getElementById('completion-subtitle').innerText = 'Challenge Complete';
        
        let emojiUrl = 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png'; // win
        let bgColor = '#466ba9'; // primary blue
        let accentColor = '#466ba9'; // primary blue for text
        
        if (isTie) {
            emojiUrl = 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f91d.png'; // tie
            bgColor = '#466ba9'; 
            accentColor = '#466ba9';
        } else if (!didWin) {
            emojiUrl = 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f61e.png'; // lose
            bgColor = '#466ba9'; 
            accentColor = '#466ba9';
        }
        
        // Apply thematic styling
        const viewCompletion = document.getElementById('view-completion');
        if (viewCompletion) {
            viewCompletion.style.background = bgColor;
            viewCompletion.style.setProperty('--result-accent', accentColor);
        }

        document.getElementById('completion-emoji').innerHTML = `<img src="${emojiUrl}" style="width: 160px; height: 160px; object-fit: contain;">`;
        
        // Multiplier for score to make it look like a real game score
        const scoreMultiplier = 25;
        document.getElementById('my-score-val').innerText = `${this.score * scoreMultiplier}`;
        document.getElementById('opp-score-val').innerText = `${opponentScore * scoreMultiplier}`;
        
        // Correct answers
        document.getElementById('my-correct-val').innerText = `${this.score}`;
        document.getElementById('opp-correct-val').innerText = `${opponentScore}`;

        document.getElementById('my-acc-val').innerText = `${accuracy}%`;
        document.getElementById('opp-acc-val').innerText = `${opponentAccuracy}%`;

        // Mock stats for streaks and time
        const myStreak = this.bestStreak || Math.max(1, Math.floor(this.score / 2));
        const oppStreak = Math.max(1, myStreak - 1 + Math.floor(Math.random() * 3));
        document.getElementById('my-streak-val').innerText = `${myStreak}`;
        document.getElementById('opp-streak-val').innerText = `${oppStreak}`;

        // Mock fastest time
        const myFastest = (1.0 + Math.random()).toFixed(1);
        const oppFastest = (1.0 + Math.random() + (didWin ? 0.5 : -0.2)).toFixed(1);
        document.getElementById('my-fastest-val').innerText = `${myFastest}s`;
        document.getElementById('opp-fastest-val').innerText = `${Math.max(0.8, oppFastest)}s`;

        const myAvg = (2.0 + Math.random()).toFixed(1);
        const oppAvg = (2.0 + Math.random() + (didWin ? 0.5 : -0.2)).toFixed(1);
        document.getElementById('my-time-val').innerText = `${myAvg}s`;
        document.getElementById('opp-time-val').innerText = `${Math.max(1.2, oppAvg)}s`;

        // Insight logic
        let insight = '';
        if (didWin && !isTie) {
            if (myFastest < oppFastest && myAvg < oppAvg) {
                insight = `You answered faster on average, securing the victory!`;
            } else if (accuracy > opponentAccuracy) {
                insight = `Your accuracy improved by ${accuracy - opponentAccuracy}%, leading you to victory!`;
            } else {
                insight = `Your best streak of ${myStreak} correct answers made the difference!`;
            }
        } else if (isTie) {
            insight = `A perfectly matched game! Your performance was remarkably similar to your opponent.`;
        } else {
            if (oppStreak > myStreak) {
                insight = `Your opponent answered more consistently with a streak of ${oppStreak}.`;
            } else {
                insight = `So close! Your opponent had a slight edge this time.`;
            }
        }
        document.getElementById('match-insight-text').innerText = insight;
        
        // Update Rewards
        if (didWin) {
            document.getElementById('result-xp-reward').innerHTML = `<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/2b50.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> +${this.totalXp} XP Earned`;
            document.getElementById('result-rank-reward').innerHTML = `<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4c8.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Rank Increased +2`;
            document.getElementById('result-badge-reward').innerHTML = `<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f947.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> New Badge Unlocked`;
            document.querySelector('.rewards-card').style.display = 'block';
        } else {
            document.querySelector('.rewards-card').style.display = 'none';
        }
        
        this.navigate('view-completion');
        

        if (typeof confetti === 'function') {
            if (!QuizEngine.myConfetti) {
                const canvas = document.createElement('canvas');
                canvas.style.position = 'absolute';
                canvas.style.top = '0';
                canvas.style.left = '0';
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.pointerEvents = 'none';
                canvas.style.zIndex = '2000';
                document.querySelector('.app-container').appendChild(canvas);
                QuizEngine.myConfetti = confetti.create(canvas, { resize: true });
            }
            if (didWin) {
                // Fire multiple bursts for a winning celebration
                const duration = 2000;
                const end = Date.now() + duration;
                (function frame() {
                    QuizEngine.myConfetti({
                        particleCount: 5,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        zIndex: 2000
                    });
                    QuizEngine.myConfetti({
                        particleCount: 5,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        zIndex: 2000
                    });
                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                }());
            } else if (isTie) {
                // Single nice burst for a tie
                QuizEngine.myConfetti({
                    particleCount: 100,
                    spread: 100,
                    origin: { y: 0.5 },
                    zIndex: 2000
                });
            } else {
                // Subtle gray/blue rain effect for a loss
                QuizEngine.myConfetti({
                    particleCount: 60,
                    angle: 270, // Straight down
                    spread: 120,
                    origin: { y: -0.1, x: 0.5 },
                    colors: ['#94a3b8', '#64748b', '#475569', '#cbd5e1'],
                    zIndex: 2000,
                    gravity: 0.8,
                    scalar: 0.8
                });
            }
        }
    },


    // --- Analytics ---
    initAnalytics: function() {
        const list = document.getElementById('analytics-question-list');
        list.innerHTML = '';
        
        for(let i=1; i<=this.totalQuestions; i++) {
            const isCorrect = i <= this.score;
            list.innerHTML += `
                <div class="breakdown-item ${isCorrect ? 'correct' : 'wrong'}">
                    <div class="breakdown-icon">${isCorrect ? '✓' : '✕'}</div>
                    <div class="breakdown-text"><strong>Q${i}:</strong> PACE Code A Objective...</div>
                </div>
            `;
        }
    },

    
    // --- Leaderboard ---

    achievementsData: [
        { id: 1, title: 'First Win', desc: 'Win your first challenge', iconUrl: 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png', state: 'unlocked', req: '1 Win', bg: 'linear-gradient(135deg, #FFE082 0%, #FFECB3 100%)', currentProgress: 1, targetProgress: 1, progressUnit: 'Win', rewardXp: 50, rarityLevel: 'Common', earnedDate: 'Oct 12, 2023' },
        { id: 2, title: '5 Wins', desc: 'Win 5 challenges', iconUrl: 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f31f.png', state: 'unlocked', req: '5 Wins', bg: 'linear-gradient(135deg, #93C5FD 0%, #BFDBFE 100%)', currentProgress: 5, targetProgress: 5, progressUnit: 'Wins', rewardXp: 150, rarityLevel: 'Uncommon', earnedDate: 'Nov 04, 2023' },
        { id: 3, title: 'Streak 5', desc: 'Achieve a streak of 5', iconUrl: 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png', state: 'unlocked', req: 'Streak of 5', bg: 'linear-gradient(135deg, #FCA5A5 0%, #FECACA 100%)', currentProgress: 5, targetProgress: 5, progressUnit: 'Streak', rewardXp: 200, rarityLevel: 'Rare', earnedDate: 'Dec 18, 2023' },
        { id: 4, title: 'Category Master', desc: 'Score 100% in a category', iconUrl: 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f9e0.png', state: 'locked', req: '100% Score', bg: 'linear-gradient(135deg, #C4B5FD 0%, #DDD6FE 100%)', currentProgress: 80, targetProgress: 100, progressUnit: '%', rewardXp: 300, rarityLevel: 'Epic' },
        { id: 5, title: 'Speed Champion', desc: 'Answer fast 10 times', iconUrl: 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26a1.png', state: 'locked', req: '< 2.0s Avg', bg: 'linear-gradient(135deg, #FCD34D 0%, #FDE68A 100%)', currentProgress: 6, targetProgress: 10, progressUnit: 'Fast Answers', rewardXp: 250, rarityLevel: 'Rare' },
        { id: 6, title: 'Perfect Score', desc: 'Get all answers correct 10 times', iconUrl: 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3af.png', state: 'locked', req: '100% Accuracy', bg: 'linear-gradient(135deg, #6EE7B7 0%, #A7F3D0 100%)', currentProgress: 4, targetProgress: 10, progressUnit: 'Perfect Quizzes', rewardXp: 500, rarityLevel: 'Legendary' },
        { id: 7, title: 'Early Bird', desc: 'Complete 5 quizzes before 8 AM', iconUrl: 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f305.png', state: 'locked', req: 'Quiz at 6-8 AM', bg: 'linear-gradient(135deg, #F9A8D4 0%, #FBCFE8 100%)', currentProgress: 2, targetProgress: 5, progressUnit: 'Quizzes', rewardXp: 150, rarityLevel: 'Uncommon' },
        { id: 8, title: 'Night Owl', desc: 'Complete 5 quizzes after 10 PM', iconUrl: 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f989.png', state: 'locked', req: 'Quiz after 10 PM', bg: 'linear-gradient(135deg, #94A3B8 0%, #CBD5E1 100%)', currentProgress: 1, targetProgress: 5, progressUnit: 'Quizzes', rewardXp: 150, rarityLevel: 'Uncommon' }
    ],

    initAchievements: function() {
        this.filterBadgesMagic('all', document.querySelector('.badge-tab'));
    },

    filterBadgesMagic: function(filter, btnElement) {
        if (btnElement) {
            document.querySelectorAll('.badge-tab').forEach(b => {
                b.classList.remove('m-tab-active');
            });
            btnElement.classList.add('m-tab-active');
            
            // Move indicator dynamically
            const indicator = document.getElementById('badgeTabIndicator');
            if (indicator) {
                indicator.style.width = `${btnElement.offsetWidth}px`;
                indicator.style.transform = `translateX(${btnElement.offsetLeft}px)`;
            }
        }

        const grid = document.getElementById('ios-badges-grid');
        grid.innerHTML = '';

        const filtered = filter === 'all' ? this.achievementsData : this.achievementsData.filter(a => a.state === filter);

        let previousState = null;

        filtered.forEach((badge, index) => {
            const isUnlocked = badge.state === 'unlocked';
            
            // Insert headings and full-width spacers when transitioning from unlocked to locked
            if (filter === 'all') {
                if (index === 0) {
                    const title = isUnlocked ? 'Unlocked' : 'Locked';
                    grid.innerHTML += `<div style="grid-column: 1 / -1; font-size: 18px; font-weight: 700; color: var(--text-primary, #1e293b); font-family: 'Poppins', sans-serif; margin-bottom: 0px;">${title}</div>`;
                } else if (previousState === 'unlocked' && !isUnlocked) {
                    grid.innerHTML += `
                        <div style="grid-column: 1 / -1; font-size: 18px; font-weight: 700; color: var(--text-primary, #1e293b); font-family: 'Poppins', sans-serif; margin-top: 8px; margin-bottom: 0px;">Locked</div>
                    `;
                }
            }
            previousState = badge.state;
            
            // Visual styles based on state
            const showFullColor = isUnlocked || filter === 'locked';
            
            const cardBg = showFullColor ? badge.bg : '#e2e8f0';
            const cardOpacity = showFullColor ? '1' : '0.7';
            const iconFilter = showFullColor ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' : 'grayscale(100%) opacity(50%)';
            const titleColor = showFullColor ? '#000000' : '#8e8e93';
            const descColor = showFullColor ? '#4b5563' : '#8e8e93';
            
            const lockIndicator = isUnlocked ? '' : `<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f512.png" style="position: absolute; top: 12px; right: 12px; width: 22px; height: 22px; z-index: 2; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15)); opacity: 0.9;">`;
            const checkIndicator = isUnlocked ? `<div style="position: absolute; top: 12px; right: 12px; width: 22px; height: 22px; background: #34c759; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: bold; box-shadow: 0 2px 6px rgba(52, 199, 89, 0.4); z-index: 2;">✓</div>` : '';
            
            const iconBg = '#ffffff';

            let boxEffect = '';
            let progressSection = '';
            
            if (!isUnlocked) {
                const percent = Math.round((badge.currentProgress / badge.targetProgress) * 100);
                const remaining = badge.targetProgress - badge.currentProgress;
                progressSection = `
                    <div style="margin-top: 16px; text-align: left;">
                        <div style="height: 6px; background: rgba(0,0,0,0.12); border-radius: 3px; overflow: hidden; margin-bottom: 8px;">
                            <div style="height: 100%; width: ${percent}%; background: rgba(0,0,0,0.3); border-radius: 3px;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <span style="font-size: 11px; font-weight: 700; color: #4b5563;">${badge.currentProgress} / ${badge.targetProgress} ${badge.progressUnit}</span>
                        </div>
                        <div style="font-size: 10px; color: #8e8e93; font-weight: 500;">
                            ${badge.progressUnit === '%' ? `Complete ${remaining} more points to unlock` : `${remaining} More Required`}
                        </div>
                    </div>
                `;
            } else {
                const glowColor = badge.bg.match(/#[0-9a-fA-F]{6}/) ? badge.bg.match(/#[0-9a-fA-F]{6}/)[0] : '#34c759';
                boxEffect = `box-shadow: 0 8px 24px ${glowColor}40; border: 1px solid ${glowColor}60;`;
                progressSection = `
                    <div style="margin-top: 16px; font-size: 12px; color: rgba(0,0,0,0.7); font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 4px;">
                        Earned ${badge.earnedDate}
                    </div>
                `;
            }

            grid.innerHTML += `
                <div ${filter !== 'all' ? `onclick="QuizEngine.openIosBadgeDetails(${badge.id})"` : ''} style="background: ${cardBg}; border-radius: 20px; padding: 16px; text-align: center; box-shadow: 0 4px 16px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); position: relative; opacity: ${cardOpacity}; cursor: pointer; transition: transform 0.2s; overflow: hidden; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; box-sizing: border-box; ${boxEffect}">
                    ${lockIndicator}
                    ${checkIndicator}
                    <div style="position: relative; z-index: 1; width: 100%;">
                        <div style="margin-bottom: 12px; display: flex; justify-content: center;">
                            <div style="width: 72px; height: 72px; border-radius: 36px; background: ${iconBg}; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 -4px 8px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.05);">
                                ${badge.iconUrl.startsWith('http') ? `<img src="${badge.iconUrl}" style="width: 40px; height: 40px; object-fit: contain; filter: ${iconFilter};">` : `<span style="font-size: 36px; filter: ${iconFilter};">${badge.iconUrl}</span>`}
                            </div>
                        </div>
                        <div style="font-size: 14px; font-weight: 700; color: ${titleColor}; margin-bottom: 4px; font-family: 'Poppins', sans-serif; letter-spacing: -0.3px;">${badge.title}</div>
                        ${progressSection}
                    </div>
                </div>
            `;
        });
    },

    openIosBadgeDetails: function(id) {
        const badge = this.achievementsData.find(b => b.id === id);
        if (!badge) return;

        const sheet = document.getElementById('ios-badge-sheet');
        const backdrop = document.getElementById('ios-badge-sheet-backdrop');
        const content = document.getElementById('ios-badge-sheet-content');

        const isUnlocked = badge.state === 'unlocked';
        const statusBadge = isUnlocked 
            ? `<div style="display: inline-block; background: rgba(70,107,169,0.1); color: #466ba9; padding: 6px 12px; border-radius: 14px; font-size: 13px; font-weight: 600; margin-bottom: 24px; font-family: 'Inter', sans-serif;">✓ Unlocked</div>`
            : `<div style="display: inline-block; background: #f1f5f9; color: var(--text-secondary, #64748b); padding: 6px 12px; border-radius: 14px; font-size: 13px; font-weight: 600; margin-bottom: 24px; font-family: 'Inter', sans-serif;"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f512.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Locked</div>`;

        const iconFilter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))';
        const iconBg = badge.bg;

        let progressDetails = '';
        if (!isUnlocked) {
            const percent = Math.round((badge.currentProgress / badge.targetProgress) * 100);
            progressDetails = `
                <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 13px; color: var(--text-secondary, #64748b); font-weight: 500;">Current Progress</span>
                        <span style="font-size: 13px; color: var(--text-primary, #1e293b); font-weight: 700;">${percent}%</span>
                    </div>
                    <div style="height: 8px; background: rgba(0,0,0,0.06); border-radius: 4px; overflow: hidden;">
                        <div style="height: 100%; width: ${percent}%; background: ${badge.bg}; border-radius: 4px;"></div>
                    </div>
                    <div style="text-align: right; margin-top: 4px; font-size: 11px; color: var(--text-secondary, #64748b);">
                        ${badge.currentProgress} / ${badge.targetProgress} ${badge.progressUnit}
                    </div>
                </div>
                <div style="height: 1px; background: rgba(15,23,42,0.05); margin-bottom: 16px;"></div>
            `;
        } else {
            progressDetails = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <span style="font-size: 13px; color: var(--text-secondary, #64748b); font-weight: 500;">Earned</span>
                    <span style="font-size: 13px; color: #10b981; font-weight: 600;">${badge.earnedDate}</span>
                </div>
                <div style="height: 1px; background: rgba(15,23,42,0.05); margin-bottom: 16px;"></div>
            `;
        }

        content.innerHTML = `
            <div style="font-family: 'Inter', sans-serif;">
                <div style="margin-bottom: 24px; animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; justify-content: center;">
                    <div style="width: 140px; height: 140px; border-radius: 70px; background: ${iconBg}; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 -6px 12px rgba(0,0,0,0.05), 0 12px 24px rgba(0,0,0,0.08);">
                        ${badge.iconUrl.startsWith('http') ? `<img src="${badge.iconUrl}" style="width: 80px; height: 80px; object-fit: contain; filter: ${iconFilter};">` : `<span style="font-size: 72px; filter: ${iconFilter};">${badge.iconUrl}</span>`}
                    </div>
                </div>
                <h2 style="font-size: 24px; font-weight: 700; color: var(--text-primary, #1e293b); letter-spacing: -0.5px; margin-bottom: 12px; font-family: 'Poppins', sans-serif;">${badge.title}</h2>
                ${statusBadge}
                
                <div style="background: #f8fafc; border: 1px solid rgba(15,23,42,0.05); border-radius: 16px; padding: 20px; text-align: left; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                    <div style="font-size: 15px; color: var(--text-primary, #1e293b); font-weight: 500; margin-bottom: 16px; line-height: 1.4;">${badge.desc}</div>
                    <div style="height: 1px; background: rgba(15,23,42,0.05); margin-bottom: 16px;"></div>
                    
                    ${progressDetails}

                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <span style="font-size: 13px; color: var(--text-secondary, #64748b); font-weight: 500;">Reward XP</span>
                        <span style="font-size: 14px; color: #b45309; font-weight: 700;">⭐ +${badge.rewardXp} XP</span>
                    </div>
                    <div style="height: 1px; background: rgba(15,23,42,0.05); margin-bottom: 16px;"></div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <span style="font-size: 13px; color: var(--text-secondary, #64748b); font-weight: 500;">Rarity Level</span>
                        <span style="font-size: 13px; color: #466ba9; font-weight: 700; background: rgba(70,107,169,0.1); padding: 4px 8px; border-radius: 8px;">${badge.rarityLevel}</span>
                    </div>
                    <div style="height: 1px; background: rgba(15,23,42,0.05); margin-bottom: 16px;"></div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 13px; color: var(--text-secondary, #64748b); font-weight: 500;">Unlock Requirement</span>
                        <span style="font-size: 13px; color: var(--text-primary, #1e293b); font-weight: 600;">${badge.req}</span>
                    </div>
                </div>

                <button onclick="QuizEngine.closeIosBadgeDetails()" style="width: 100%; padding: 16px; background: #466ba9; color: #ffffff; border-radius: 14px; border: none; font-size: 16px; font-weight: 600; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; font-family: 'Poppins', sans-serif; box-shadow: 0 8px 16px rgba(70,107,169,0.25);">
                    Close
                </button>
            </div>
        `;

        backdrop.style.opacity = '1';
        backdrop.style.pointerEvents = 'auto';
        sheet.style.transform = 'translateY(0)';
    },

    closeIosBadgeDetails: function() {
        const sheet = document.getElementById('ios-badge-sheet');
        const backdrop = document.getElementById('ios-badge-sheet-backdrop');
        
        backdrop.style.opacity = '0';
        backdrop.style.pointerEvents = 'none';
        sheet.style.transform = 'translateY(100%)';
    },

    previewOutcome: function(outcome) {
        let title, subtitle, emojiUrl;
        let myScore, oppScore, myAcc, oppAcc, myStreak, oppStreak, myTime, oppTime, insight;

        if (outcome === 'win') {
            title = 'You Won!';
            subtitle = 'Challenge Complete';
            emojiUrl = 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png';
            myScore = 320; oppScore = 210;
            myAcc = 85; oppAcc = 60;
            myStreak = 7; oppStreak = 3;
            myTime = '2.1s'; oppTime = '3.4s';
            insight = `You answered faster and had 25% better accuracy, securing the victory!`;
        } else if (outcome === 'lose') {
            title = 'So Close!';
            subtitle = 'Challenge Complete';
            emojiUrl = 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f61e.png';
            myScore = 180; oppScore = 290;
            myAcc = 45; oppAcc = 75;
            myStreak = 2; oppStreak = 6;
            myTime = '3.8s'; oppTime = '2.2s';
            insight = `You performed better than 68% of participants overall. Keep it up!`;
        } else {
            title = 'It\'s a Tie!';
            subtitle = 'Challenge Complete';
            emojiUrl = 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f91d.png';
            myScore = 250; oppScore = 250;
            myAcc = 65; oppAcc = 65;
            myStreak = 4; oppStreak = 4;
            myTime = '2.8s'; oppTime = '2.8s';
            insight = `A perfectly matched game! Your performance was identical to your opponent.`;
        }

        document.getElementById('completion-title').innerText = title;
        document.getElementById('completion-subtitle').innerText = subtitle;
        document.getElementById('completion-emoji').innerHTML = `<img src="${emojiUrl}" style="width: 140px; height: 140px; object-fit: contain;">`;
        
        document.getElementById('my-score-val').innerText = myScore;
        document.getElementById('opp-score-val').innerText = oppScore;
        document.getElementById('my-acc-val').innerText = `${myAcc}%`;
        document.getElementById('opp-acc-val').innerText = `${oppAcc}%`;
        document.getElementById('my-streak-val').innerText = myStreak;
        document.getElementById('opp-streak-val').innerText = oppStreak;
        document.getElementById('my-time-val').innerText = myTime;
        document.getElementById('opp-time-val').innerText = oppTime;
        document.getElementById('match-insight-text').innerText = insight;
    },

    initLeaderboard: function() {
        // Find the friends tab button to pass as the active element
        const friendsBtn = document.querySelector('.tabs-container .tab-btn') || null;
        this.switchLeaderboardTab(friendsBtn, 'friends');
    },

    switchLeaderboardTab: function(btnElement, tabName) {
        // Handle Active states
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        if(btnElement) btnElement.classList.add('active');
        
        const podiumContainer = document.getElementById('leaderboard-podium');
        const listContainer = document.getElementById('leaderboard-list');
        const userCardContainer = document.getElementById('lb-sticky-user-card');
        const achievementBanner = document.getElementById('lb-achievement-banner');
        const weeklyMvpContainer = document.getElementById('lb-weekly-mvp-container');
        const weeklyAchieveContainer = document.getElementById('lb-weekly-achievements-container');
        
        podiumContainer.innerHTML = '';
        listContainer.innerHTML = '';
        userCardContainer.innerHTML = '';
        weeklyMvpContainer.innerHTML = '';
        weeklyAchieveContainer.innerHTML = '';
        
        // Expanded Premium Mock Data with requested metrics
        const mockData = {
            'friends': [
                {rank: 1, name: 'Sgt. Davies', score: '12,450', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop', team: 'Alpha Squad', trend: 'up', trendVal: 2, badges: ['<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Highest Streak'], extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> +15%'},
                {rank: 2, name: 'Emma Davis', score: '11,800', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', team: 'Bravo Squad', trend: 'down', trendVal: 1, badges: ['<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Top Performer'], extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> 12 Wins'},
                {rank: 3, name: 'Insp. Jones', score: '9,800', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', team: 'Alpha Squad', trend: 'up', trendVal: 4, badges: ['<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3af.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Accurate'], extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/2b50.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Most Active'},
                {rank: 4, name: 'Mike Ross', score: '8,200', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop', team: 'Delta Force', trend: 'same', trendVal: 0, badges: []},
                {rank: 5, name: 'Officer Smith', score: '7,900', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', team: 'Charlie Team', trend: 'up', trendVal: 5, badges: ['<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Most Active'], isUser: true},
                {rank: 6, name: 'Sarah Connor', score: '7,100', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', team: 'Bravo Squad', trend: 'down', trendVal: 2, badges: []},
            ],
            'team': [
                {rank: 1, name: 'Alpha Squad', score: '45,000', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', team: 'London', trend: 'up', trendVal: 1, activeMembers: 42, performanceMetric: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> +15% This Week', extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> +15%'},
                {rank: 2, name: 'Bravo Squad', score: '41,200', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop', team: 'Manchester', trend: 'same', trendVal: 0, activeMembers: 38, performanceMetric: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> 12 Team Wins', extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> 12 Wins'},
                {rank: 3, name: 'Charlie Team', score: '38,900', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', team: 'Birmingham', trend: 'up', trendVal: 3, activeMembers: 35, performanceMetric: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Most Active Team', extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Most Active', isUser: true},
            ],
            'national': [
                {rank: 1, name: 'Met Police', score: '99,999', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop', team: 'London', trend: 'same', trendVal: 0, activeMembers: '1,250', challengesCompleted: '4,500', isNationalLeader: true, extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/2b50.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Leader'},
                {rank: 2, name: 'GMP', score: '88,500', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', team: 'Manchester', trend: 'up', trendVal: 2, activeMembers: '950', challengesCompleted: '3,800', extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> +10%'},
                {rank: 3, name: 'WMP', score: '82,100', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', team: 'Birmingham', trend: 'down', trendVal: 1, activeMembers: '820', challengesCompleted: '3,100', extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> 520 Wins'},
                {rank: 12, name: 'Officer Smith', score: '11,200', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop', team: 'Charlie Team', trend: 'up', trendVal: 12, activeMembers: '1', challengesCompleted: '45', extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Active', isUser: true},
            ],
            'weekly': [
                {rank: 1, name: 'Officer Smith', xpThisWeek: '+520', score: '520', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', team: '', trend: 'new', trendVal: 0, badges: [], extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Weekly MVP', isUser: true},
                {rank: 2, name: 'Sgt. Davies', xpThisWeek: '+430', score: '430', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop', team: '', trend: 'down', trendVal: 1, badges: [], extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Fast'},
                {rank: 3, name: 'Emma Davis', xpThisWeek: '+350', score: '350', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', team: '', trend: 'up', trendVal: 5, badges: [], extraStat: '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> Active'},
                {rank: 4, name: 'Mike Ross', xpThisWeek: '+280', score: '280', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', team: '', trend: 'up', trendVal: 12, badges: []}
            ]
        };
        
        const data = mockData[tabName] || mockData['friends'];
        let userItem = null;
        let rankAboveUser = null;

        // Separate Top 3 from the rest
        const top3 = data.slice(0, 3);
        const rest = data.slice(3);

        // Helper to render trend badge
        const getTrendHTML = (trend, val) => {
            if(trend === 'up') return `<span class="lb-trend up">↑ ${val}</span>`;
            if(trend === 'down') return `<span class="lb-trend down">↓ ${val}</span>`;
            if(trend === 'new') return `<span class="lb-trend new">NEW</span>`;
            return '';
        };

        // Render Podium (Order: 2, 1, 3 for visual stage)
        const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
        podiumOrder.forEach(item => {
            if(item.isUser) userItem = item;
            const rankClass = `lb-podium-rank-${item.rank}`;
            const extraStatHTML = item.extraStat ? `<div class="lb-podium-extra-stat" style="font-size:10px; font-weight:700; color:var(--text-dim); margin-top:4px;">${item.extraStat}</div>` : '';
            
            // Celebration support for rank 1
            const confettiClass = (item.isUser && item.rank === 1) ? 'celebration-confetti' : '';

            podiumContainer.innerHTML += `
                <div class="lb-podium-item ${rankClass} ${item.isUser ? 'current-user' : ''} ${confettiClass}">
                    <div class="lb-podium-avatar-wrapper">
                        ${item.rank === 1 ? '<div class="lb-crown"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f451.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></div>' : ''}
                        <div class="lb-podium-avatar"><img src="${item.avatar}" alt="${item.name}"></div>
                    </div>
                    <div class="lb-podium-rank-badge">${item.rank}</div>
                    <div class="lb-podium-name">${item.name}</div>
                    <div class="lb-podium-score">${tabName === 'weekly' ? item.xpThisWeek : item.score} ${tabName === 'weekly' ? '' : 'XP'}</div>
                    ${extraStatHTML}
                </div>
            `;
        });

        // Dynamic Banner Logic
        if (tabName === 'weekly') {
            achievementBanner.innerHTML = `
                <div class="lb-banner-icon"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></div>
                <div class="lb-banner-text">
                    <strong>Weekly Challenge Race</strong>
                    <p>Competition Ends In: 3 Days 14 Hours</p>
                </div>
            `;
            
            // Weekly MVP Card
            weeklyMvpContainer.innerHTML = `
                <div class="lb-weekly-mvp-card" style="background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 16px; padding: 16px; margin: 0 0 24px; border: 1px solid #fcd34d; display: flex; align-items: center; gap: 16px;">
                    <div style="font-size: 32px;"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></div>
                    <div style="flex: 1;">
                        <div style="font-size: 12px; font-weight: 800; color: #b45309; text-transform: uppercase;">Weekly MVP</div>
                        <div style="font-size: 16px; font-weight: 800; color: #92400e; margin-bottom: 4px;">Officer Smith</div>
                        <div style="font-size: 12px; color: #b45309; font-weight: 600;">+520 XP This Week • 12 Challenges</div>
                    </div>
                </div>
            `;
            
            // Weekly Achievements Section
            weeklyAchieveContainer.innerHTML = `
                <div class="lb-weekly-achievements" style="margin: 0 0 24px; background: white; border-radius: 16px; padding: 20px; border: 1px solid rgba(15,23,42,0.05);">
                    <h3 style="font-size: 15px; font-weight: 800; margin-bottom: 16px; color: var(--text-primary);">Weekly Achievements</h3>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 14px 16px; border-radius: 12px;">
                            <div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 20px;"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></span> <span style="font-size: 14px; font-weight: 700; color: var(--text-secondary);">Fastest Climber</span></div>
                            <div style="text-align: right;"><div style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">Officer Smith</div><div style="font-size: 12px; font-weight: 600; color: #166534;">↑ 12 Positions</div></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 14px 16px; border-radius: 12px;">
                            <div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 20px;"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></span> <span style="font-size: 14px; font-weight: 700; color: var(--text-secondary);">Most Completed</span></div>
                            <div style="text-align: right;"><div style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">Emma Davis</div><div style="font-size: 12px; font-weight: 600; color: var(--accent-blue);">24 Challenges</div></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 14px 16px; border-radius: 12px;">
                            <div style="display: flex; align-items: center; gap: 12px;"><span style="font-size: 20px;"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26a1.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></span> <span style="font-size: 14px; font-weight: 700; color: var(--text-secondary);">Longest Streak</span></div>
                            <div style="text-align: right;"><div style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">Sarah Connor</div><div style="font-size: 12px; font-weight: 600; color: #f59e0b;">11 Days</div></div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Dynamic Motivation Banner
            let motivateText = "You've climbed 5 positions! Keep it up!";
            if (userItem) {
                if (userItem.rank === 1) motivateText = "You are the Top Performer! Defend your title!";
                else if (userItem.rank <= 10) motivateText = `You are in the Top 10 at Rank #${userItem.rank}!`;
                else motivateText = "Complete 1 more challenge to enter Top 10!";
            }
            achievementBanner.innerHTML = `
                <div class="lb-banner-icon"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"></div>
                <div class="lb-banner-text">
                    <strong>Weekly Progress</strong>
                    <p>${motivateText}</p>
                </div>
            `;
        }

        // Render List
        rest.forEach((item, index) => {
            if(item.isUser) {
                userItem = item;
                rankAboveUser = rest[index - 1] || top3[2]; // Get the person right above them
            }
            
            const badgesHTML = (item.badges || []).map(b => `<span class="lb-tiny-badge" style="background: rgba(0,0,0,0.05); padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 600; color: var(--text-secondary);">${b}</span>`).join('');
            
            // Build Contextual Details
            let contextDetails = '';
            if (tabName === 'team') {
                contextDetails = `<div style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">Active Members: ${item.activeMembers}</div>`;
            } else if (tabName === 'national') {
                contextDetails = `<div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f465.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> ${item.activeMembers} Members • <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> ${item.challengesCompleted} Challenges</div>`;
            } else {
                contextDetails = `<div class="lb-list-team" style="margin-top: 6px;">${item.team}</div>`;
            }

            let extraTeamStat = '';
            if (tabName === 'team' && item.performanceMetric) {
                extraTeamStat = `<div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); margin-top: 4px;">${item.performanceMetric}</div>`;
            }

            const nationalBadgeHTML = (tabName === 'national' && item.isNationalLeader) ? `<span style="background: #fef3c7; color: #b45309; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700; border: 1px solid #fde68a;"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/2b50.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> National Leader</span>` : '';

            // User Inline Progress (Friends tab)
            let inlineProgressHTML = '';
            if (tabName === 'friends' && item.isUser && rankAboveUser) {
                const myScore = parseInt(item.score.replace(/,/g, ''));
                const aboveScore = parseInt(rankAboveUser.score.replace(/,/g, ''));
                const diff = aboveScore - myScore + 50;
                const percent = Math.min(100, Math.max(10, (myScore / aboveScore) * 100));
                
                inlineProgressHTML = `
                    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.05); width: 100%;">
                        <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">
                            <span>Progress to Rank #${item.rank - 1}</span>
                            <span style="color: var(--accent-blue);">${diff} XP away</span>
                        </div>
                        <div style="height: 6px; background: rgba(0,0,0,0.05); border-radius: 3px; overflow: hidden;">
                            <div style="height: 100%; width: ${percent}%; background: var(--accent-blue); border-radius: 3px;"></div>
                        </div>
                    </div>
                `;
            }
            
            // Celebration support for Top 10
            const glowClass = (item.isUser && item.rank <= 10) ? 'celebration-glow' : '';
            
            listContainer.innerHTML += `
                <div class="lb-list-item ${item.isUser ? 'current-user' : ''} ${glowClass}" style="flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; width: 100%; gap: 12px;">
                        <div class="lb-list-rank">${item.rank}</div>
                        <div class="lb-list-avatar"><img src="${item.avatar}" alt="${item.name}"></div>
                        <div class="lb-list-info">
                            <div class="lb-list-name-row">
                                <span class="lb-list-name">${item.name}</span>
                                ${nationalBadgeHTML}
                            </div>
                            <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 2px;">${badgesHTML}</div>
                            ${contextDetails}
                        </div>
                        <div class="lb-list-stats">
                            <div class="lb-list-score">${tabName === 'weekly' ? item.xpThisWeek : item.score} ${tabName === 'weekly' ? 'XP This Week' : 'XP'}</div>
                            ${getTrendHTML(item.trend, item.trendVal)}
                            ${extraTeamStat}
                        </div>
                    </div>
                    ${inlineProgressHTML}
                </div>
            `;
        });
        
        // Add Full Leaderboard CTA only on friends tab
        if (tabName === 'friends') {
            listContainer.innerHTML += `
                <button class="btn-primary w-100 mt-4 lb-full-cta" style="border-radius: 16px; padding: 16px; font-weight: 700;" onclick="QuizEngine.switchLeaderboardTab(document.querySelectorAll('.tab-btn')[2], 'national')">View Full Global Rankings</button>
            `;
        }

        // Render Sticky User Card
        if (userItem) {
            let progressHTML = '';
            let targetPoints = 500; // Mock target
            
            if (userItem.rank > 1 && rankAboveUser) {
                const myScore = parseInt(userItem.score.replace(/,/g, ''));
                const aboveScore = parseInt(rankAboveUser.score.replace(/,/g, ''));
                const diff = aboveScore - myScore + 50; // Add 50 to pass them
                const percent = Math.min(100, Math.max(10, (myScore / aboveScore) * 100));
                
                progressHTML = `
                    <div class="lb-sticky-progress-wrap">
                        <div class="lb-sticky-progress-text">
                            <span>Progress to Rank #${userItem.rank - 1}</span>
                            <span style="color: #fbbf24; font-weight: 800; letter-spacing: 0.2px;">Only ${diff} XP away!</span>
                        </div>
                        <div class="lb-sticky-progress-bar">
                            <div class="lb-sticky-progress-fill" style="width: ${percent}%;"></div>
                        </div>
                    </div>
                `;
            } else if (userItem.rank === 1) {
                progressHTML = `
                    <div class="lb-sticky-progress-wrap">
                        <div class="lb-sticky-progress-text" style="justify-content: center; color: #f59e0b; font-weight: 700;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> You are the Top Performer! Keep defending your title!
                        </div>
                    </div>
                `;
            }

            userCardContainer.innerHTML = `
                <div class="lb-sticky-inner">
                    <div class="lb-sticky-top">
                        <div class="lb-sticky-rank">#${userItem.rank}</div>
                        <div class="lb-sticky-info">
                            <div class="lb-sticky-name">Your Ranking</div>
                            <div class="lb-sticky-stats">
                                <span class="lb-sticky-score">${userItem.score} XP</span>
                                <span class="lb-sticky-trend"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 1.2em; height: 1.2em; vertical-align: -0.2em; display: inline-block;"> 12 Day Streak</span>
                            </div>
                        </div>
                    </div>
                    ${progressHTML}
                </div>
            `;
            userCardContainer.classList.remove('hidden');
        } else {
            userCardContainer.classList.add('hidden');
        }
    },

    // --- Participant Selection Logic ---
    selectParticipantMode: function(mode, el) {
        // Clear all selected states
        document.querySelectorAll('#view-participants .participant-option-card').forEach(card => card.classList.remove('active'));
        // Set new active
        el.classList.add('active');
        
        // Hide dynamic areas
        document.getElementById('colleague-selection-area').classList.add('hidden');
        document.getElementById('random-match-area').classList.add('hidden');
        
        const continueBtn = document.getElementById('participant-continue-btn');
        continueBtn.disabled = true;
        continueBtn.classList.add('disabled');

        if (mode === 'solo' || mode === 'team') {
            // Instantly enable
            continueBtn.disabled = false;
            continueBtn.classList.remove('disabled');
        } else if (mode === 'colleague') {
            document.getElementById('colleague-selection-area').classList.remove('hidden');
            // Reset colleague selections
            document.querySelectorAll('.colleague-card').forEach(c => c.classList.remove('active'));
        } else if (mode === 'random') {
            document.getElementById('random-match-area').classList.remove('hidden');
            // Simulate finding an opponent
            document.querySelector('#random-match-area .matchmaking-text h4').innerText = "Finding opponent...";
            document.querySelector('#random-match-area .matchmaking-text p').innerText = "Estimated wait: 0:12";
            document.querySelector('.radar-spinner').style.display = 'block';
            
            setTimeout(() => {
                document.querySelector('#random-match-area .matchmaking-text h4').innerText = "Opponent found!";
                document.querySelector('#random-match-area .matchmaking-text p').innerText = "Player: Alex_99";
                document.querySelector('.radar-spinner').style.display = 'none';
                continueBtn.disabled = false;
                continueBtn.classList.remove('disabled');
            }, 2000);
        }
    },

    selectColleague: function(el) {
        const isSelected = el.classList.contains('selected');
        document.querySelectorAll('.colleague-row-card').forEach(c => c.classList.remove('selected'));
        
        const container = document.getElementById('send-challenge-container');
        
        if (!isSelected) {
            el.classList.add('selected');
            if (container) container.style.display = 'block';
        } else {
            if (container) container.style.display = 'none';
        }
    }
};

// Handle Native Browser Back Button
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.viewId) {
        const index = QuizEngine.history.indexOf(event.state.viewId);
        if (index !== -1) {
            // Revert history array to this point
            const currentViewId = QuizEngine.history[QuizEngine.history.length - 1];
            QuizEngine.history = QuizEngine.history.slice(0, index + 1);
            
            const currentView = document.getElementById(currentViewId);
            const prevView = document.getElementById(event.state.viewId);
            
            if (currentView) currentView.classList.remove('active');
            if (prevView) prevView.classList.add('active');
        }
    } else {
        // If no state, try to go home
        QuizEngine.returnHome();
    }
});

// Initialize first history state
window.history.replaceState({ viewId: 'view-hub', index: 0 }, "", "#view-hub");
