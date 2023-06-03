let score = 0;

const scoreElement = document.getElementById('score');
const cookieButton = document.getElementById('cookieButton');

cookieButton.addEventListener('click', () => {
  score++;
  scoreElement.innerText = 'Score: ' + score;
});
