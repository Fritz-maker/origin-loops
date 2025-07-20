// 🌱 ORIGIN LOOPS - FIXED FRONTIER NAVIGATION
// FIXED: FRONTIER hub navigation only appears after final loop (The Question Itself)

const loopOrder = [
    { name: "Cosmic Genesis", file: "cosmic_genesis.html", unlockScore: 0 },
    { name: "Life's Spark", file: "lifes_spark.html", unlockScore: 20 },
    { name: "Mind's Dawn", file: "minds_dawn.html", unlockScore: 40 },
    { name: "Culture's Code", file: "cultures_code.html", unlockScore: 60 },
    { name: "Personal Genesis", file: "personal_genesis.html", unlockScore: 80 },
    { name: "The Question Itself", file: "question_itself.html", unlockScore: 100 }
];

let currentPerspective = null;
let currentContentIndex = 0;
let progressIndicator;
let creationScore = 0;
let evolutionScore = 0;
let totalScore = 0;
let contentPool = [];
let usedContent = [];
let maxContentItems = 8;

let contentDisplay;
let engineCommentary;
let nextButton;
let scoreDisplay;
let unlockStatus;

document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});

function initializeGame() {
    contentDisplay = document.getElementById('content-display');
    engineCommentary = document.getElementById('engine-commentary');
    nextButton = document.getElementById('next-button');
    scoreDisplay = document.getElementById('current-score');
    unlockStatus = document.getElementById('unlock-status');
    progressIndicator = document.getElementById('progress-indicator');
    
    try {
        contentPool = getLoopContent();
        console.log(`🌱 Loaded ${contentPool.length} origin content items`);
    } catch (error) {
        console.error('🚨 Error loading origin content pool:', error);
        contentDisplay.innerHTML = '<p style="color: red;">🌱 Origin interference detected. Please refresh the genesis.</p>';
        return;
    }
    
    setupPerspectiveSelection();
    nextButton.addEventListener('click', loadNextContent);
    nextButton.disabled = true;
    updateScoreDisplay();
}

function setupPerspectiveSelection() {
    const chooseLeft = document.getElementById('choose-left');
    const chooseRight = document.getElementById('choose-right');
    
    chooseLeft.addEventListener('click', () => selectPerspective('creation'));
    chooseRight.addEventListener('click', () => selectPerspective('evolution'));
}

function selectPerspective(perspective) {
    currentPerspective = perspective;
    document.getElementById('preference-selection').style.display = 'none';
    nextButton.disabled = false;
    
    let perspectiveMessage = getPerspectiveMessage(perspective);
    
    contentDisplay.innerHTML = `
        <div class="perspective-intro">
            <p><strong>${perspectiveMessage}</strong></p>
            <p>Click "Explore the Next Origin" to begin your journey through consciousness emergence.</p>
        </div>
    `;
    
    engineCommentary.innerHTML = '<p><em>🌱 The Engine begins analyzing how this very choice reflects your perspective on the deepest questions of existence...</em></p>';
}

function getPerspectiveMessage(perspective) {
    const title = document.title.toLowerCase();
    
    if (title.includes('cosmic genesis')) {
        return perspective === 'creation' 
            ? "You've chosen the Designed Universe perspective. You believe the cosmos emerged through intentional design, with consciousness as a fundamental feature rather than an accident."
            : "You've chosen the Emergent Universe perspective. You see the cosmos as an unguided process where consciousness emerged naturally from increasing complexity over vast time scales.";
    } else if (title.includes('life')) {
        return perspective === 'creation'
            ? "You've chosen the Spark of Design perspective. You believe life represents a qualitative leap that required intentional intervention or design to cross the gap from chemistry to biology."
            : "You've chosen the Natural Emergence perspective. You see life as an inevitable result of chemical complexity under the right conditions - no design required.";
    } else if (title.includes('mind')) {
        return perspective === 'creation'
            ? "You've chosen the Consciousness Design perspective. You believe mind and consciousness represent a fundamental feature of reality that was present from the beginning or intentionally introduced."
            : "You've chosen the Consciousness Evolution perspective. You see consciousness as emerging naturally from increasing neural complexity - mind arising from mindless matter.";
    } else if (title.includes('culture')) {
        return perspective === 'creation'
            ? "You've chosen the Cultural Design perspective. You believe human culture and meaning reflect deeper patterns or purposes - that our symbols and stories point to intended meanings."
            : "You've chosen the Cultural Evolution perspective. You see culture as emerging through natural selection of ideas - memes competing and evolving without any guiding purpose.";
    } else if (title.includes('personal')) {
        return perspective === 'creation'
            ? "You've chosen the Personal Purpose perspective. You believe individual consciousness and identity reflect a deeper design - that 'you' are more than just neural patterns."
            : "You've chosen the Personal Evolution perspective. You see individual identity as emerging from brain activity - consciousness as a natural phenomenon with no special metaphysical status.";
    } else if (title.includes('question')) {
        return perspective === 'creation'
            ? "You've chosen the Question by Design perspective. You believe the very ability to ask 'why is there something rather than nothing?' points to intended consciousness in a designed reality."
            : "You've chosen the Question by Evolution perspective. You see the capacity to ask ultimate questions as an emergent property of evolved brains - meaningful to us, but not necessarily to the universe.";
    }
    
    return perspective === 'creation'
        ? "You've chosen the Creation perspective. You believe consciousness and meaning reflect deeper design or intention in reality's fundamental structure."
        : "You've chosen the Evolution perspective. You see consciousness and meaning as natural emergent properties of increasing complexity over time.";
}

function loadNextContent() {
    if (!currentPerspective) {
        alert('🌱 Please select an origin perspective first.');
        return;
    }
    
    if (usedContent.length >= maxContentItems) {
        showLoopCompletion();
        return;
    }
    
    const nextContent = getNextContentItem();
    
    if (!nextContent) {
        showLoopCompletion();
        return;
    }
    
    displayContent(nextContent);
    usedContent.push(nextContent);
    currentContentIndex++;
    updateProgressDisplay();
}

function getNextContentItem() {
    let availableContent = contentPool.filter(item => 
        !usedContent.includes(item)
    );
    
    if (availableContent.length === 0) {
        return null;
    }
    
    let preferredContent = availableContent.filter(item => 
        item.stance === currentPerspective || item.stance === 'neutral'
    );
    
    if (preferredContent.length === 0) {
        preferredContent = availableContent;
    }
    
    return preferredContent[Math.floor(Math.random() * preferredContent.length)];
}

function displayContent(content) {
    let html = '';
    
    switch (content.type) {
        case 'tf_question':
            html = createTrueFalseQuestion(content);
            break;
        case 'mc_question':
            html = createMultipleChoiceQuestion(content);
            break;
        case 'video':
            html = createVideoContent(content);
            break;
        case 'factoid':
            html = createFactoidContent(content);
            break;
        default:
            html = '<p>🌱 Unknown origin content type</p>';
    }
    
    contentDisplay.innerHTML = html;
    engineCommentary.innerHTML = `<p><em>🌱 ${content.engine_commentary}</em></p>`;
    
    if (content.type.includes('question')) {
        nextButton.disabled = true;
    } else {
        updateScoreForNonQuestion(content.value, content.stance);
        nextButton.disabled = false;
    }
}

function createTrueFalseQuestion(content) {
    return `
        <div class="question-content">
            <h3>🌱 Origin Contemplation:</h3>
            <p class="question-text">${content.question}</p>
            <div class="answer-buttons">
                <button class="answer-btn" onclick="answerTrueFalse(true, ${content.correct_answer}, ${content.value}, '${content.stance}', \`${content.correct_feedback.replace(/`/g, '\\`')}\`, \`${content.incorrect_feedback.replace(/`/g, '\\`')}\`)">TRUE</button>
                <button class="answer-btn" onclick="answerTrueFalse(false, ${content.correct_answer}, ${content.value}, '${content.stance}', \`${content.correct_feedback.replace(/`/g, '\\`')}\`, \`${content.incorrect_feedback.replace(/`/g, '\\`')}\`)">FALSE</button>
            </div>
            <div id="feedback-area"></div>
        </div>
    `;
}

function createMultipleChoiceQuestion(content) {
    let optionsHtml = '';
    for (let key in content.options) {
        optionsHtml += `<button class="answer-btn" onclick="answerMultipleChoice('${key}', '${content.correct_answer_key}', ${content.value}, '${content.stance}', \`${content.correct_feedback.replace(/`/g, '\\`')}\`, \`${content.incorrect_feedback.replace(/`/g, '\\`')}\`)">${key}: ${content.options[key]}</button>`;
    }
    
    return `
        <div class="question-content">
            <h3>🌱 Origin Question:</h3>
            <p class="question-text">${content.question}</p>
            <div class="answer-buttons">
                ${optionsHtml}
            </div>
            <div id="feedback-area"></div>
        </div>
    `;
}

function createVideoContent(content) {
    return `
        <div class="video-content">
            <h3>🎬 ${content.title}</h3>
            <div class="video-wrapper">
                <iframe src="${content.url}" frameborder="0" allowfullscreen></iframe>
            </div>
            <p class="content-value">Origin Insight Value: +${content.value} points</p>
        </div>
    `;
}

function createFactoidContent(content) {
    return `
        <div class="factoid-content">
            <h3>🌱 Origin Insight:</h3>
            <p class="factoid-text">${content.text}</p>
            <p class="content-value">Genesis Wisdom: +${content.value} points</p>
        </div>
    `;
}

function answerTrueFalse(userAnswer, correctAnswer, value, stance, correctFeedback, incorrectFeedback) {
    const isCorrect = userAnswer === correctAnswer;
    showFeedback(isCorrect, correctFeedback, incorrectFeedback, value, stance);
}

function answerMultipleChoice(userAnswer, correctAnswer, value, stance, correctFeedback, incorrectFeedback) {
    const isCorrect = userAnswer === correctAnswer;
    showFeedback(isCorrect, correctFeedback, incorrectFeedback, value, stance);
}

function showFeedback(isCorrect, correctFeedback, incorrectFeedback, value, stance) {
    const feedbackArea = document.getElementById('feedback-area');
    
    const earnedPoints = isCorrect ? value : Math.floor(value / 2);
    totalScore += earnedPoints;
    
    if (stance === 'creation') {
        creationScore += earnedPoints;
    } else if (stance === 'evolution') {
        evolutionScore += earnedPoints;
    }
    
    const feedbackClass = isCorrect ? 'correct-feedback' : 'incorrect-feedback';
    const feedbackText = isCorrect ? correctFeedback : incorrectFeedback;
    
    feedbackArea.innerHTML = `
        <div class="${feedbackClass}">
            <p><strong>🌱 ${isCorrect ? 'Origin Insight!' : 'Consider This:'}</strong></p>
            <p>${feedbackText}</p>
            <p class="points-earned">+${earnedPoints} Genesis Points</p>
        </div>
    `;
    
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => btn.disabled = true);
    
    nextButton.disabled = false;
    updateScoreDisplay();
}

function updateScoreForNonQuestion(value, stance) {
    totalScore += value;
    
    if (stance === 'creation') {
        creationScore += value;
    } else if (stance === 'evolution') {
        evolutionScore += value;
    }
    
    updateScoreDisplay();
}

function updateProgressDisplay() {
    if (progressIndicator) {
        const percentage = Math.round((currentContentIndex / maxContentItems) * 100);
        const currentLoopName = getCurrentLoopName();
        progressIndicator.textContent = `${currentLoopName}: ${currentContentIndex}/${maxContentItems} (${percentage}%)`;
    }
}

function updateScoreDisplay() {
    if (scoreDisplay) {
        scoreDisplay.textContent = `Genesis Score: ${totalScore}`;
    }
}

function getCurrentLoopName() {
    const title = document.title.toLowerCase();
    
    if (title.includes('cosmic genesis')) return 'Loop 6.1';
    if (title.includes('life')) return 'Loop 6.2';
    if (title.includes('mind')) return 'Loop 6.3';
    if (title.includes('culture')) return 'Loop 6.4';
    if (title.includes('personal')) return 'Loop 6.5';
    if (title.includes('question')) return 'Loop 6.6';
    
    return 'Origin Loop';
}

function getNextLoop() {
    const currentTitle = document.title.toLowerCase();
    
    if (currentTitle.includes('cosmic genesis')) {
        return { name: "Life's Spark", file: "lifes_spark.html" };
    } else if (currentTitle.includes('life')) {
        return { name: "Mind's Dawn", file: "minds_dawn.html" };
    } else if (currentTitle.includes('mind')) {
        return { name: "Culture's Code", file: "cultures_code.html" };
    } else if (currentTitle.includes('culture')) {
        return { name: "Personal Genesis", file: "personal_genesis.html" };
    } else if (currentTitle.includes('personal')) {
        return { name: "The Question Itself", file: "question_itself.html" };
    }
    
    return null; // Last loop
}

function getPersonalizedMessage() {
    const ratio = creationScore / (evolutionScore + 1); // Avoid division by zero
    
    if (ratio > 1.5) {
        return "Your origin journey reveals a perspective that sees design, intention, and purpose in consciousness and reality's fundamental structure.";
    } else if (ratio < 0.67) {
        return "Your origin exploration suggests you see consciousness and meaning as natural emergent properties of increasing complexity over time.";
    } else {
        return "Your origin perspective balances design and emergence, recognizing both the mystery of consciousness and the power of natural processes.";
    }
}

function showLoopCompletion() {
    const currentLoopName = getCurrentLoopName() + ': ' + getCurrentLoopTitle();
    const nextLoop = getNextLoop();
    
    // FIXED: Check if this is actually the final loop before showing FRONTIER navigation
    const currentTitle = document.title.toLowerCase();
    const isTrueFinalLoop = currentTitle.includes('question');
    
    contentDisplay.innerHTML = `
    <style>
    /* FRONTIER Hub Navigation Styles for Origin Loops */
    .origin-completion-actions {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 30px 0;
        align-items: center;
    }
    
    .origin-begin-again-btn {
        background: linear-gradient(45deg, #d4af37, #b8860b);
        color: #2c1810;
        border: none;
        padding: 15px 30px;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
        font-size: 1.1rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .origin-begin-again-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
    }
    
    .origin-explore-all-loops {
        display: inline-block;
        background: linear-gradient(45deg, #d4af37, #ffd700);
        color: #1a1a2e;
        text-decoration: none;
        padding: 15px 30px;
        border-radius: 25px;
        font-weight: bold;
        font-size: 1.1rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-align: center;
    }
    
    .origin-explore-all-loops:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
        text-decoration: none;
        color: #1a1a2e;
    }
    
    .origin-frontier-motto {
        margin-top: 30px;
        padding: 20px;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 15px;
        border: 2px solid rgba(212, 175, 55, 0.3);
    }
    
    .origin-frontier-motto p {
        color: #d4af37;
        font-style: italic;
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
        text-align: center;
    }
    </style>
    
    <div class="completion-content">
        <h3>🌱 Loop Complete: ${currentLoopName}</h3>
        <p><strong>Your Final Score: ${totalScore} points</strong></p>
        
        <div class="belief-analysis">
            <h4>Your Origin Perspective:</h4>
            <ul>
                <li>Creation Conviction: ${creationScore} points</li>
                <li>Evolution Conviction: ${evolutionScore} points</li>
            </ul>
        </div>
            
        <div class="journey-complete">
            <h4>🌱 Origin Exploration Complete!</h4>
            <p>You have explored this aspect of consciousness origins.</p>
            <p>The Engine appreciates your thoughtful engagement with these fundamental questions.</p>
        </div>

        <div class="navigation-buttons" style="margin-top: 30px; text-align: center;">
            <button onclick="window.location.href='index.html'" class="nav-button" style="margin: 10px; padding: 12px 24px; background: rgba(255,255,255,0.2); color: #2C3E50; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; cursor: pointer;">← Return to Engine</button>
            ${nextLoop ? `<button onclick="window.location.href='${nextLoop.file}'" class="nav-button" style="margin: 10px; padding: 12px 24px; background: linear-gradient(45deg, #d4af37, #b8860b); color: #2c1810; border: none; border-radius: 8px; cursor: pointer;">Next Loop: ${nextLoop.name} →</button>` : 
            (isTrueFinalLoop ? `
            <div class="origin-completion-actions">
                <button onclick="window.location.href='index.html'" class="origin-begin-again-btn">🌱 Explore Origins Again</button>
                <a href="https://unity-loops.com/hub" class="origin-explore-all-loops">
                    🏛️ Explore All 6 Consciousness Loops
                </a>
            </div>
            
            <div class="origin-frontier-motto">
                <p>"It\'s Loops All the Way Down"</p>
            </div>
            ` : `
            <div class="origin-completion-actions">
                <button onclick="window.location.href='index.html'" class="origin-begin-again-btn">🌱 Explore This Origin Again</button>
            </div>
            `)}
        </div>
    </div>
    `;
    
    engineCommentary.innerHTML = `
        <p><em>🌱 The Engine has analyzed your origin journey through this scale. ${getPersonalizedMessage()}</em></p>
    `;
    
    nextButton.style.display = 'none';
}

function getCurrentLoopTitle() {
    const title = document.title.toLowerCase();
    
    if (title.includes('cosmic genesis')) return 'Cosmic Genesis';
    if (title.includes('life')) return 'Life\'s Spark';
    if (title.includes('mind')) return 'Mind\'s Dawn';
    if (title.includes('culture')) return 'Culture\'s Code';
    if (title.includes('personal')) return 'Personal Genesis';
    if (title.includes('question')) return 'The Question Itself';
    
    return 'Origin Stage';
}
