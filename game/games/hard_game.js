const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionText = document.getElementById('question');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const correctSound = document.getElementById('correctSound');
const incorrectSound = document.getElementById('incorrectSound');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let countdown;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...hardQuestions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

    startTimer(); // Start the timer for each new question
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        clearInterval(countdown);

        const selectedChoice = e.target;
        const selectedAnswer = parseInt(selectedChoice.dataset['number']);

        const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
            playCorrectSound();
        } else {
            playIncorrectSound();
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

// Function to play the correct sound
function playCorrectSound() {
    correctSound.play();
}

// Function to play the incorrect sound
function playIncorrectSound() {
    incorrectSound.play();
}

// Function to start the timer
function startTimer() {
    let timeLeft = TIMER_DURATION; // Set the initial time in seconds
    updateTimerDisplay(timeLeft);

    countdown = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            getNewQuestion(); // Move to the next question when time is up
        }
    }, 1000);
}

// Function to update the timer display
function updateTimerDisplay(timeLeft) {
    document.getElementById('timerDisplay').innerText = timeLeft;
}

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
const TIMER_DURATION = 20; // Set the duration for each question in seconds

// Initial setup
startGame();
