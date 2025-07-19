// 🌱 ORIGIN LOOPS - EXACT WORKING PATTERN FROM NATURE VS NURTURE ✨

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
        console.log(`Loaded ${contentPool.length} content items`);
    } catch (error) {
        console.error('Error loading content pool:', error);
        contentDisplay.innerHTML = '<p style="color: red;">Error loading content. Please refresh the page.</p>';
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
            <p>Click "Explore the Next Angle" to begin your origin journey.</p>
        </div>
    `;
    
    engineCommentary.innerHTML = '<p><em>The Engine begins analyzing how this very choice reflects your own origin story...</em></p>';
}

function getPerspectiveMessage(perspective) {
    const title = document.title.toLowerCase();
    
    if (title.includes('cosmic genesis')) {
        return perspective === 'creation' 
            ? "You've chosen the Cosmic Design perspective. You believe the universe shows evidence of fine-tuning and intelligent design, with consciousness and complexity arising from purposeful creation."
            : "You've chosen the Cosmic Evolution perspective. You see the universe as self-organizing through natural laws, with complexity and consciousness emerging through evolutionary processes without external design.";
    } else if (title.includes('lifes spark')) {
        return perspective === 'creation'
            ? "You've chosen the Divine Spark perspective. You believe life required a special creative act or divine intervention to bridge the gap from non-living matter to living organisms."
            : "You've chosen the Chemical Evolution perspective. You see life emerging naturally from chemical processes, with abiogenesis occurring through natural selection acting on molecular replicators.";
    } else if (title.includes('minds dawn')) {
        return perspective === 'creation'
            ? "You've chosen the Soul Creation perspective. You believe consciousness represents something beyond mere neural activity - a soul, spirit, or divine essence that cannot emerge from matter alone."
            : "You've chosen the Neural Evolution perspective. You see consciousness as an emergent property of complex neural networks, arising through evolutionary pressures without requiring non-physical explanations.";
    } else if (title.includes('cultures code')) {
        return perspective === 'creation'
            ? "You've chosen the Divine Inspiration perspective. You believe human cultural achievements - language, art, religion, morality - reflect divine gifts or supernatural inspiration beyond natural explanation."
            : "You've chosen the Cultural Evolution perspective. You see human culture as naturally evolving through social learning, memetic transmission, and adaptive advantages without supernatural intervention.";
    } else if (title.includes('personal genesis')) {
        return perspective === 'creation'
            ? "You've chosen the Unique Soul perspective. You believe each individual possesses a unique, divinely-created essence that cannot be fully explained by genetics, environment, or developmental processes."
            : "You've chosen the Biological Development perspective. You see personal identity and consciousness emerging through natural developmental processes - genetics, brain development, and environmental interaction.";
    } else if (title.includes('question itself')) {
        return perspective === 'creation'
            ? "You've chosen the Divinely-Inspired Inquiry perspective. You believe our capacity to ask origin questions reflects divine image or supernatural endowment beyond natural explanation."
            : "You've chosen the Evolved Curiosity perspective. You see human questioning and wonder as naturally evolved cognitive capacities that provided survival advantages to our ancestors.";
    }
    
    return perspective === 'creation'
        ? "You've chosen the Creation perspective. You believe divine design and purposeful intention provide the primary explanation for existence and complexity."
        : "You've chosen the Evolution perspective. You see natural processes and emergent complexity as sufficient to explain existence without requiring external design.";
}

function loadNextContent() {
    if (!currentPerspective) {
        alert('Please select a perspective first.');
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
            html = '<p>Unknown content type</p>';
    }
    
    contentDisplay.innerHTML = html;
    engineCommentary.innerHTML = `<p><em>${content.engine_commentary}</em></p>`;
    
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
            <h3>Consider This:</h3>
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
            <h3>Consider This Question:</h3>
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
            <h3>${content.title}</h3>
            <div class="video-wrapper">
                <iframe src="${content.url}" frameborder="0" allowfullscreen></iframe>
            </div>
            <p class="content-value">Insight Value: +${content.value} points</p>
        </div>
    `;
}

function createFactoidContent(content) {
    return `
        <div class="factoid-content">
            <h3>Origin Insight:</h3>
            <p class="factoid-text">${content.text}</p>
            <p class="content-value">Insight Value: +${content.value} points</p>
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
            <p><strong>${isCorrect ? 'Origin Insight!' : 'Consider this:'}</strong></p>
            <p>${feedbackText}</p>
            <p class="points-earned">+${earnedPoints} Origin Points</p>
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
        scoreDisplay.textContent = `Origin Score: ${totalScore}`;
    }
}

function getCurrentLoopName() {
    const title = document.title.toLowerCase();
    
    if (title.includes('cosmic genesis')) return 'Loop 6.1';
    if (title.includes('lifes spark')) return 'Loop 6.2';
    if (title.includes('minds dawn')) return 'Loop 6.3';
    if (title.includes('cultures code')) return 'Loop 6.4';
    if (title.includes('personal genesis')) return 'Loop 6.5';
    if (title.includes('question itself')) return 'Loop 6.6';
    
    return 'Origin Loop';
}

function getNextLoop() {
    const currentTitle = document.title.toLowerCase();
    
    if (currentTitle.includes('cosmic genesis')) {
        return { name: "Life's Spark", file: "lifes_spark.html" };
    } else if (currentTitle.includes('life\'s spark') || currentTitle.includes('lifes spark')) {
        return { name: "Mind's Dawn", file: "minds_dawn.html" };
    } else if (currentTitle.includes('mind\'s dawn') || currentTitle.includes('minds dawn')) {
        return { name: "Culture's Code", file: "cultures_code.html" };
    } else if (currentTitle.includes('culture\'s code') || currentTitle.includes('cultures code')) {
        return { name: "Personal Genesis", file: "personal_genesis.html" };
    } else if (currentTitle.includes('personal genesis')) {
        return { name: "The Question Itself", file: "question_itself.html" };
    }
    
    return null; // Last loop
}

function getPersonalizedMessage() {
    const ratio = creationScore / (evolutionScore + 1); // Avoid division by zero
    
    if (ratio > 1.5) {
        return "Your responses suggest a strong belief in creation and divine design. You see purposeful intention and sacred creativity as fundamental to existence.";
    } else if (ratio < 0.67) {
        return "Your responses suggest a strong belief in evolutionary processes and natural emergence. You see natural laws and self-organization as sufficient to explain existence.";
    } else {
        return "Your responses suggest a balanced perspective, recognizing both creative intention and evolutionary processes as important aspects of the origin mystery.";
    }
}

function showLoopCompletion() {
    const currentLoopName = getCurrentLoopName() + ': ' + getCurrentLoopTitle();
    const nextLoop = getNextLoop();
    
    contentDisplay.innerHTML = `
        <div class="completion-content">
            <h3>🌱 Loop Complete: ${currentLoopName}</h3>
            <p><strong>Your Final Score: ${totalScore} points</strong></p>
            
            <div class="belief-analysis">
                <h4>Your Origin Leanings:</h4>
                <ul>
                    <li>Creation Conviction: ${creationScore} points</li>
                    <li>Evolution Conviction: ${evolutionScore} points</li>
                </ul>
            </div>
            
            <div class="journey-complete">
                <h4>🌌 Origin Exploration Complete!</h4>
                <p>You have explored this aspect of the creation vs evolution mystery.</p>
                <p>The Engine appreciates your thoughtful engagement with these origin questions.</p>
            </div>
            
            <div class="navigation-buttons" style="margin-top: 30px; text-align: center;">
                <button onclick="window.location.href='index.html'" class="nav-button" style="margin: 10px; padding: 12px 24px; background: rgba(255,255,255,0.2); color: #2C3E50; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; cursor: pointer;">← Return to Engine</button>
                ${nextLoop ? `<button onclick="window.location.href='${nextLoop.file}'" class="nav-button" style="margin: 10px; padding: 12px 24px; background: linear-gradient(45deg, #d4af37, #b8860b); color: #2c1810; border: none; border-radius: 8px; cursor: pointer;">Next Loop: ${nextLoop.name} →</button>` : '<button onclick="window.location.href=\'index.html\'" class="nav-button" style="margin: 10px; padding: 12px 24px; background: linear-gradient(45deg, #FFD700, #FFA500); color: white; border: none; border-radius: 8px; cursor: pointer;">🎉 Journey Complete - Return to Engine →</button>'}
            </div>
        </div>
    `;
    
    engineCommentary.innerHTML = `
        <p><em>The Engine has analyzed your origin journey through this scale. ${getPersonalizedMessage()}</em></p>
    `;
    
    nextButton.style.display = 'none';
}

function getCurrentLoopTitle() {
    const title = document.title.toLowerCase();
    
    if (title.includes('cosmic genesis')) return 'Cosmic Genesis';
    if (title.includes('lifes spark')) return 'Life\'s Spark';
    if (title.includes('minds dawn')) return 'Mind\'s Dawn';
    if (title.includes('cultures code')) return 'Culture\'s Code';
    if (title.includes('personal genesis')) return 'Personal Genesis';
    if (title.includes('question itself')) return 'The Question Itself';
    
    return 'Origin Mystery';
}
