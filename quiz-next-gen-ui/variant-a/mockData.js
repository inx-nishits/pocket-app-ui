// mockData.js - Contains all the mocked data to drive the frontend prototype

const MockData = {
    // Current Logged In User
    currentUser: {
        name: 'PC Alex Taylor',
        role: 'Response Team',
        level: 12,
        rank: 'Sergeant',
        xp: 4250,
        nextLevelXp: 5000,
        winRate: 72,
        totalChallenges: 24,
        bestStreak: 7,
        topCategories: [
            { name: 'Criminal Law', progress: 75 },
            { name: 'Traffic', progress: 62 },
            { name: 'PACE', progress: 85 }
        ]
    },

    // Colleagues for Challenges
    opponents: [
        { id: 1, name: 'PC James Wilson', role: 'Response Team', status: 'online', score: 1780, avatarUrl: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'DC Sarah Patel', role: 'CID', status: 'online', score: 2150, avatarUrl: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'PC Liam O\'Connor', role: 'Neighbourhood', status: 'away', score: 1450, avatarUrl: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Sgt Emma Davis', role: 'Response Team', status: 'offline', score: 2450, avatarUrl: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'DC Michael Brown', role: 'CID', status: 'offline', score: 1230, avatarUrl: 'https://i.pravatar.cc/150?u=5' }
    ],

    // Leaderboard (Mocking Force-Wide)
    leaderboard: [
        { rank: 1, name: 'Sgt Emma Davis', score: 2450, avatarUrl: 'https://i.pravatar.cc/150?u=4' },
        { rank: 2, name: 'DC Sarah Patel', score: 2150, avatarUrl: 'https://i.pravatar.cc/150?u=2' },
        { rank: 3, name: 'You', score: 1880, avatarUrl: 'https://i.pravatar.cc/150?u=you', isCurrentUser: true },
        { rank: 4, name: 'PC James Wilson', score: 1780, avatarUrl: 'https://i.pravatar.cc/150?u=1' },
        { rank: 5, name: 'PC Liam O\'Connor', score: 1450, avatarUrl: 'https://i.pravatar.cc/150?u=3' },
        { rank: 6, name: 'DC Michael Brown', score: 1230, avatarUrl: 'https://i.pravatar.cc/150?u=5' }
    ],

    // Detailed 150 Question Exam Mock Data (Truncated for Prototype but fully structured)
    examQuestions: [
        {
            id: 'q1',
            question: "Under PACE, what is the maximum period a person can be detained under Section 24 without charge before requiring an extension?",
            options: [
                "6 hours",
                "12 hours",
                "24 hours",
                "36 hours"
            ],
            correctIndex: 2,
            explanation: "Under PACE Section 41, the initial limit for detention without charge is 24 hours. Extensions beyond this require superintendent authorization (up to 36 hours) or a warrant of further detention from a magistrates' court."
        },
        {
            id: 'q2',
            question: "Which of the following is NOT a necessary condition for a lawful arrest under Section 24 of PACE?",
            options: [
                "To prevent an offence",
                "To protect a child or vulnerable person",
                "Because the offence is non-arrestable",
                "To allow the prompt and effective investigation of the offence"
            ],
            correctIndex: 2,
            explanation: "All offences are now 'arrestable' under Section 24 of PACE (as amended by SOCPA), but the arrest must be 'necessary'. Reasons for necessity include preventing physical injury, protecting a child/vulnerable person, and allowing prompt/effective investigation. 'Because the offence is non-arrestable' is factually incorrect."
        },
        {
            id: 'q3',
            question: "When conducting a stop and search under Section 1 of PACE, what acronym is commonly used to remember the information an officer must provide?",
            options: [
                "GOWISELY",
                "JENGBA",
                "SHACKS",
                "PLAN"
            ],
            correctIndex: 0,
            explanation: "GOWISELY stands for Grounds, Object, Warrant Card, Identity, Station, Entitlement, Legal Power, and 'You are detained'. These are the mandatory details to provide before searching."
        },
        {
            id: 'q4',
            question: "In the context of the National Decision Model (NDM), what is the central core around which the model revolves?",
            options: [
                "Assess threat and risk",
                "Take action and review",
                "Code of Ethics",
                "Identify options and contingencies"
            ],
            correctIndex: 2,
            explanation: "The Code of Ethics sits at the very centre of the National Decision Model. All decisions and actions must reflect the principles and standards of professional behaviour."
        },
        {
            id: 'q5',
            question: "Which of the following defines the offence of Theft under Section 1 of the Theft Act 1968?",
            options: [
                "Taking property belonging to another without consent",
                "Dishonestly appropriating property belonging to another with the intention of permanently depriving the other of it",
                "Using force to steal property",
                "Receiving stolen goods knowing or believing them to be stolen"
            ],
            correctIndex: 1,
            explanation: "The statutory definition of theft is: 'A person is guilty of theft if he dishonestly appropriates property belonging to another with the intention of permanently depriving the other of it.' (S1 Theft Act 1968)."
        }
    ],

    // Past Exam Scores for the Chart
    historicalExamProgress: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        scores: [45, 52, 60, 68, 78], // Showing improvement towards the 70% passing mark
        passingLine: 70
    }
};

window.MockData = MockData;
