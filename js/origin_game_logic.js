// 🌱 ORIGIN LOOPS - EXACT OZZYRABBIT WORKING PATTERN ✨

const loopOrder = [
    { name: "The First Cause", file: "first_cause.html", unlockScore: 0 },
    { name: "Design vs Emergence", file: "design_emergence.html", unlockScore: 50 },
    { name: "Consciousness Arising", file: "consciousness_arising.html", unlockScore: 100 },
    { name: "Purpose & Meaning", file: "purpose_meaning.html", unlockScore: 150 },
    { name: "Sacred & Scientific", file: "sacred_scientific.html", unlockScore: 200 },
    { name: "Non-Dual Origins", file: "nondual_origins.html", unlockScore: 250 }
];

let currentPerspective = null;
let currentContentIndex = 0;
let progressIndicator;
let designScore = 0;
let emergenceScore = 0;
let totalScore = 0;
let contentPool = [];
let usedContent = [];
let maxContentItems = 8;

let contentDisplay;
let bridgeCommentary;
let nextButton;
let scoreDisplay;
let unlockStatus;

document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});

function initializeGame() {
    contentDisplay = document.getElementById('content-display');
    bridgeCommentary = document.getElementById('bridge-commentary');
    nextButton = document.getElementById('next-button');
    scoreDisplay = document.getElementById('current-score');
    unlockStatus = document.getElementById('unlock-status');
    progressIndicator = document.getElementById('progress-indicator');
    
    try {
        contentPool = getLoopContent();
        console.log(`🌱 Loaded ${contentPool.length} sacred content items`);
    } catch (error) {
        console.error('Error loading sacred content:', error);
        contentDisplay.innerHTML = '<p style="color: #d4af37;">Sacred content loading pause. Please refresh.</p>';
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
    
    chooseLeft.addEventListener('click', () => selectPerspective('design'));
    chooseRight.addEventListener('click', () => selectPerspective('emergence'));
}

function selectPerspective(perspective) {
    currentPerspective = perspective;
    document.getElementById('perspective-selection').style.display = 'none';
    nextButton.disabled = false;
    
    let perspectiveMessage = getPerspectiveMessage(perspective);
    
    contentDisplay.innerHTML = `
        <div class="perspective-intro" style="text-align: center; padding: 30px; background: rgba(212, 175, 55, 0.1); border-radius: 15px; border: 2px solid #d4af37;">
            <p><strong>${perspectiveMessage}</strong></p>
            <p style="margin-top: 15px;">Click "Continue the Sacred Inquiry" to begin your sacred exploration.</p>
        </div>
    `;
    
    bridgeCommentary.innerHTML = '<p><em>The Bridge begins contemplating how this very choice reflects your sacred understanding of existence...</em></p>';
}

function getPerspectiveMessage(perspective) {
    const title = document.title.toLowerCase();
    
    if (title.includes('first cause')) {
        return perspective === 'design' 
            ? "You've chosen the Sacred Design perspective. You see intention, purpose, and divine creativity as the source of existence. The universe bears the signature of conscious design and love."
            : "You've chosen the Sacred Emergence perspective. You see beauty arising spontaneously from natural processes. The universe creates itself through emergent complexity and self-organization.";
    }
    
    return perspective === 'design'
        ? "You've chosen the Sacred Design perspective. You honor divine intention and purposeful creation as the foundation of existence."
        : "You've chosen the Sacred Emergence perspective. You celebrate natural processes and spontaneous arising as sacred creativity.";
}

function loadNextContent() {
    if (!currentPerspective) {
        alert('🌱 Please select a sacred perspective first.');
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
        case 'causation_explorer':
            html = createCausationExplorer(content);
            break;
        case 'sacred_integration':
            html = createSacredIntegration(content);
            break;
        case 'video':
            html = createVideoContent(content);
            break;
        case 'factoid':
            html = createFactoidContent(content);
            break;
        default:
            html = '<p>🌱 Unknown sacred content type detected</p>';
    }
    
    contentDisplay.innerHTML = html;
    bridgeCommentary.innerHTML = `<p><em>${content.bridge_commentary}</em></p>`;
    
    if (content.type.includes('question') || content.type.includes('explorer') || content.type.includes('integration')) {
        nextButton.disabled = true;
    } else {
        updateScoreForNonQuestion(content.value, content.stance);
        nextButton.disabled = false;
    }
}

function createTrueFalseQuestion(content) {
    return `
        <div class="question-container">
            <h3>Sacred Contemplation</h3>
            <p class="question-text">${content.question}</p>
            <div class="tf-options">
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
        <div class="question-container">
            <h3>Sacred Inquiry</h3>
            <p class="question-text">${content.question}</p>
            <div class="mc-options">
                ${optionsHtml}
            </div>
            <div id="feedback-area"></div>
        </div>
    `;
}

function createCausationExplorer(content) {
    return `
        <div class="causation-explorer">
            <h3>🌱 Causation Explorer</h3>
            <p>${content.description}</p>
            <div class="explorer-options">
                <div class="explorer-option" onclick="selectCause('infinite', ${content.value}, '${content.stance}')">
                    <strong>♾️ Infinite Regress</strong><br>
                    <small>Every cause has a cause, infinitely</small>
                </div>
                <div class="explorer-option" onclick="selectCause('uncaused', ${content.value}, '${content.stance}')">
                    <strong>✨ Uncaused Cause</strong><br>
                    <small>Something exists without needing a cause</small>
                </div>
                <div class="explorer-option" onclick="selectCause('circular', ${content.value}, '${content.stance}')">
                    <strong>🌀 Circular Causation</strong><br>
                    <small>Reality causes itself in mysterious loops</small>
                </div>
                <div class="explorer-option" onclick="selectCause('beyond', ${content.value}, '${content.stance}')">
                    <strong>🌌 Beyond Causation</strong><br>
                    <small>Existence transcends cause and effect</small>
                </div>
            </div>
            <div id="cause-result" style="margin-top: 20px;"></div>
        </div>
    `;
}

function selectCause(causeType, value, stance) {
    const responses = {
        infinite: "Infinite regress chosen! You sense that causation extends eternally backward. This points to existence being fundamentally mysterious.",
        uncaused: "Uncaused cause selected! You recognize something must exist without prior cause. This mysterious self-existence is sacred.",
        circular: "Circular causation chosen! You see reality as beautifully self-creating in recursive loops beyond linear thinking.",
        beyond: "Beyond causation selected! You sense ultimate reality transcends our categories entirely. Pure wonder."
    };
    
    document.getElementById('cause-result').innerHTML = `
        <div style="background: rgba(212, 175, 55, 0.2); border-radius: 10px; padding: 20px; text-align: center;">
            <h4 style="color: #d4af37; margin-bottom: 10px;">Your Causal Insight:</h4>
            <p style="color: #f4e4bc;">${responses[causeType]}</p>
            <p style="color: #d4af37; margin-top: 15px; font-weight: bold;">+${value} Sacred Wisdom Points</p>
        </div>
    `;
    
    updateScoreForNonQuestion(value, stance);
    nextButton.disabled = false;
}

function createSacredIntegration(content) {
    return `
        <div class="sacred-integration">
            <h3>🌉 Sacred Integration</h3>
            <p>${content.description}</p>
            <div class="integration-options">
                <div class="integration-option" onclick="selectIntegration('complementary', ${content.value}, '${content.stance}')">
                    <strong>🤝 Complementary</strong><br>
                    <small>Different approaches dance together</small>
                </div>
                <div class="integration-option" onclick="selectIntegration('mystery', ${content.value}, '${content.stance}')">
                    <strong>🌌 Ultimate Mystery</strong><br>
                    <small>All paths point to the same wonder</small>
                </div>
                <div class="integration-option" onclick="selectIntegration('facets', ${content.value}, '${content.stance}')">
                    <strong>💎 Different Facets</strong><br>
                    <small>Multiple perspectives on one truth</small>
                </div>
                <div class="integration-option" onclick="selectIntegration('question', ${content.value}, '${content.stance}')">
                    <strong>❓ Sacred Question</strong><br>
                    <small>Wonder itself is the answer</small>
                </div>
            </div>
            <div id="integration-result" style="margin-top: 20px;"></div>
        </div>
    `;
}

function selectIntegration(integrationType, value, stance) {
    const responses = {
        complementary: "Complementary wisdom! You see different approaches as partners in exploring the sacred mystery.",
        mystery: "Ultimate mystery recognized! All explanations point toward the same fundamental wonder.",
        facets: "Different facets appreciated! Reality is too rich for any single perspective to capture.",
        question: "Sacred question honored! The capacity for wonder is itself the most profound mystery."
    };
    
    document.getElementById('integration-result').innerHTML = `
        <div style="background: rgba(244, 228, 188, 0.2); border-radius: 10px; padding: 20px; text-align: center;">
            <h4 style="color: #f4e4bc; margin-bottom: 10px;">Your Integration Wisdom:</h4>
            <p style="color: #f4e4bc;">${responses[integrationType]}</p>
            <p style="color: #d4af37; margin-top: 15px; font-weight: bold;">+${value} Integration Points</p>
        </div>
    `;
    
    updateScoreForNonQuestion(value, stance);
    nextButton.disabled = false;
}

function createVideoContent(content) {
    return `
        <div class="video-content">
            <h3>${content.title}</h3>
            <div class="video-wrapper">
                <iframe src="${content.url}" frameborder="0" allowfullscreen></iframe>
            </div>
            <p class="content-value">Sacred Insight: +${content.value} points</p>
        </div>
    `;
}

function createFactoidContent(content) {
    return `
        <div class="factoid-content">
            <h3>Sacred Wisdom</h3>
            <p class="factoid-text">${content.text}</p>
            <p class="content-value">Wisdom Value: +${content.value} points</p>
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
    
    if (stance === 'design') {
        designScore += earnedPoints;
    } else if (stance === 'emergence') {
        emergenceScore += earnedPoints;
    }
    
    const feedbackClass = isCorrect ? 'correct-feedback' : 'incorrect-feedback';
    const feedbackText = isCorrect ? correctFeedback : incorrectFeedback;
    
    feedbackArea.innerHTML = `
        <div class="${feedbackClass}" style="background: rgba(212, 175, 55, 0.2); border-radius: 10px; padding: 20px; margin-top: 20px; text-align: center;">
            <p><strong>${isCorrect ? 'Sacred Insight!' : 'Sacred Reflection:'}</strong></p>
            <p>${feedbackText}</p>
            <p style="color: #d4af37; margin-top: 15px; font-weight: bold;">+${earnedPoints} Wisdom Points</p>
        </div>
    `;
    
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => btn.disabled = true);
    
    nextButton.disabled = false;
    updateScoreDisplay();
}

function updateScoreForNonQuestion(value, stance) {
    totalScore += value;
    
    if (stance === 'design') {
        designScore += value;
    } else if (stance === 'emergence') {
        emergenceScore += value;
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
        scoreDisplay.textContent = totalScore;
    }
}

function getCurrentLoopName() {
    const title = document.title.toLowerCase();
    
    if (title.includes('first cause')) return 'Loop 6.1';
    if (title.includes('design')) return 'Loop 6.2';
    if (title.includes('consciousness')) return 'Loop 6.3';
    if (title.includes('purpose')) return 'Loop 6.4';
    if (title.includes('sacred')) return 'Loop 6.5';
    if (title.includes('non-dual')) return 'Loop 6.6';
    
    return 'Origin Loop';
}

function getNextLoop() {
    const currentTitle = document.title.toLowerCase();
    
    if (currentTitle.includes('first cause')) {
        return { name: "Design vs Emergence", file: "design_emergence.html" };
    } else if (currentTitle.includes('design')) {
        return { name: "Consciousness Arising", file: "consciousness_arising.html" };
    } else if (currentTitle.includes('consciousness')) {
        return { name: "Purpose & Meaning", file: "purpose_meaning.html" };
    } else if (currentTitle.includes('purpose')) {
        return { name: "Sacred & Scientific", file: "sacred_scientific.html" };
    } else if (currentTitle.includes('sacred')) {
        return { name: "Non-Dual Origins", file: "nondual_origins.html" };
    }
    
    return null; // Last loop
}

function getPersonalizedMessage() {
    const ratio = designScore / (emergenceScore + 1);
    
    if (ratio > 1.5) {
        return "Your sacred journey reveals deep appreciation for divine design, conscious intention, and purposeful creation. You see the signature of love in existence itself.";
    } else if (ratio < 0.67) {
        return "Your sacred exploration shows reverence for natural emergence, spontaneous creativity, and the self-organizing wisdom of the universe.";
    } else {
        return "Your sacred contemplation embraces both divine intention and natural emergence, recognizing the ultimate mystery transcends our categories.";
    }
}

function showLoopCompletion() {
    const currentLoopName = getCurrentLoopName() + ': ' + getCurrentLoopTitle();
    const nextLoop = getNextLoop();
    
    contentDisplay.innerHTML = `
        <div class="completion-content" style="text-align: center; padding: 30px;">
            <h3>🌱 Sacred Loop Complete: ${currentLoopName}</h3>
            <p style="font-size: 1.3em; margin: 20px 0;"><strong>Sacred Wisdom Gathered: ${totalScore} points</strong></p>
            
            <div class="belief-analysis" style="background: rgba(212, 175, 55, 0.1); border-radius: 15px; padding: 20px; margin: 20px 0;">
                <h4>Your Sacred Understanding:</h4>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 10px 0;">Sacred Design Appreciation: ${designScore} points</li>
                    <li style="margin: 10px 0;">Sacred Emergence Reverence: ${emergenceScore} points</li>
                </ul>
            </div>
            
            <div class="journey-complete" style="background: rgba(244, 228, 188, 0.1); border-radius: 15px; padding: 20px; margin: 20px 0;">
                <h4>🌌 Sacred Exploration Complete!</h4>
                <p>You have contemplated this aspect of the origin mystery with grace and wonder.</p>
                <p>The Bridge honors your thoughtful engagement with these sacred questions.</p>
            </div>
            
            <div class="navigation-buttons" style="margin-top: 30px;">
                <button onclick="window.location.href='index.html'" style="margin: 10px; padding: 12px 24px; background: rgba(212, 175, 55, 0.3); color: #2c1810; border: 1px solid #d4af37; border-radius: 8px; cursor: pointer;">← Return to Origin Loops</button>
                ${nextLoop ? `<button onclick="window.location.href='${nextLoop.file}'" style="margin: 10px; padding: 12px 24px; background: linear-gradient(45deg, #d4af37, #b8860b); color: #2c1810; border: none; border-radius: 8px; cursor: pointer;">Next Sacred Mystery: ${nextLoop.name} →</button>` : '<button onclick="window.location.href=\'index.html\'" style="margin: 10px; padding: 12px 24px; background: linear-gradient(45deg, #d4af37, #f4e4bc); color: #2c1810; border: none; border-radius: 8px; cursor: pointer;">🌱 Sacred Journey Complete →</button>'}
            </div>
        </div>
    `;
    
    bridgeCommentary.innerHTML = `
        <p><em>The Bridge celebrates your sacred journey through this mystery. ${getPersonalizedMessage()}</em></p>
    `;
    
    nextButton.style.display = 'none';
}

function getCurrentLoopTitle() {
    const title = document.title.toLowerCase();
    
    if (title.includes('first cause')) return 'The First Cause';
    if (title.includes('design')) return 'Design vs Emergence';
    if (title.includes('consciousness')) return 'Consciousness Arising';
    if (title.includes('purpose')) return 'Purpose & Meaning';
    if (title.includes('sacred')) return 'Sacred & Scientific';
    if (title.includes('non-dual')) return 'Non-Dual Origins';
    
    return 'Sacred Mystery';
}
