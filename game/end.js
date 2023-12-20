document.addEventListener('DOMContentLoaded', function () {
    const username = document.getElementById('username');
    const saveScoreBtn = document.getElementById('saveScoreBtn');
    const mostRecentScore = localStorage.getItem('mostRecentScore');
    const finalScoreElement = document.getElementById('finalScore');

    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Set the final score text
    finalScoreElement.innerText = mostRecentScore;

    // Save score logic
    saveScoreBtn.addEventListener('click', function () {
        const isValidScore = !isNaN(parseFloat(mostRecentScore)) && isFinite(mostRecentScore);

        if (isValidScore) {
            const score = {
                name: username.value || 'Anonymous',
                score: mostRecentScore,
            };
            highScores.push(score);
            highScores.sort((a, b) => b.score - a.score);
            highScores.splice(5);

            localStorage.setItem('highScores', JSON.stringify(highScores));

            // Redirect to the high scores page after saving
            window.location.href = './highscores.html';
        } else {
            // Handle the case where mostRecentScore is not a valid number
            console.error('Invalid score:', mostRecentScore);
        }
    });
});
