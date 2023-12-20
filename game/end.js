document.addEventListener('DOMContentLoaded', function () {
  const username = document.getElementById('username');
  const saveScoreBtn = document.getElementById('saveScoreBtn');
  const mostRecentScore = localStorage.getItem('mostRecentScore');
  const finalScoreElement = document.getElementById('finalScore');
  const scoreMessageElement = document.getElementById('scoreMessage');
  const clickSound = document.getElementById('clickSound');

  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  // Set the final score text
  finalScoreElement.innerText = mostRecentScore;

  // Display a message based on the score
  if (mostRecentScore >= 80) {
    scoreMessageElement.innerText = 'Congratulations! You achieved a high score!';
  } else if (mostRecentScore >= 50) {
    scoreMessageElement.innerText = 'eh! you can do better.';
  } else {
    scoreMessageElement.innerText = 'This is bad! Better luck next time.';
  }

  // Save score logic
  saveScoreBtn.addEventListener('click', function () {
    playClickSound();
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
      clickSound.addEventListener('ended', function () {
        window.location.href = './highscores.html';
      });
    } else {
      // Handle the case where mostRecentScore is not a valid number
      console.error('Invalid score:', mostRecentScore);
    }
  });

  function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});
