document.addEventListener('DOMContentLoaded', function () {
    const username = document.getElementById('username');
    const saveScoreBtn = document.getElementById('saveScoreBtn');
    const scoreMessage = document.getElementById('scoreMessage');
    const mostRecentScore = localStorage.getItem('mostRecentScore');
    const finalScoreElement = document.getElementById('finalScore');

    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Set the final score text
    finalScoreElement.innerText = mostRecentScore;

    // Check the score and update the scoreMessage element
    if (mostRecentScore >= 80) {
        scoreMessage.innerText = 'Congratulations! You achieved a high score!';
    } else if (mostRecentScore >= 50) {
        scoreMessage.innerText = 'eeh! You did alright.';
    } else {
        scoreMessage.innerText = 'Nice try! You need more practicec.';
    }

    // Save score logic
    const score = {
        score: mostRecentScore,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    // window.location.assign('/');
});
