const emojiMap = { rock: '🪨', paper: '📄', scissors: '✂️' };
let wins = 0, losses = 0;

function play(userChoice) {
  const choices   = ['rock', 'paper', 'scissors'];
  const cpuChoice = choices[Math.floor(Math.random() * 3)];

  const resultEl  = document.getElementById('result');
  const cpuEl     = document.getElementById('computer-choice');
  const winEl     = document.getElementById('score-win');
  const loseEl    = document.getElementById('score-lose');

  // Shake the clicked button
  const btns = document.querySelectorAll('.choice-btn');
  btns.forEach(btn => {
    if (btn.getAttribute('aria-label').toLowerCase() === userChoice) {
      btn.classList.remove('shaking');
      void btn.offsetWidth; // reflow to restart animation
      btn.classList.add('shaking');
      setTimeout(() => btn.classList.remove('shaking'), 400);
    }
  });

  // Determine outcome
  let outcome, label;
  if (userChoice === cpuChoice) {
    outcome = 'tie';
    label   = "It's a tie! 🤝";
  } else if (
    (userChoice === 'rock'     && cpuChoice === 'scissors') ||
    (userChoice === 'paper'    && cpuChoice === 'rock')     ||
    (userChoice === 'scissors' && cpuChoice === 'paper')
  ) {
    outcome = 'win';
    label   = 'You win! 🎉';
    wins++;
    bumpScore(winEl);
    winEl.textContent = wins;
  } else {
    outcome = 'lose';
    label   = 'You lose! 💀';
    losses++;
    bumpScore(loseEl);
    loseEl.textContent = losses;
  }

  // Update result display with animation
  resultEl.className = 'result-text';
  void resultEl.offsetWidth;
  resultEl.textContent  = label;
  resultEl.classList.add(outcome, 'pop');

  cpuEl.textContent = `Computer chose ${emojiMap[cpuChoice]} ${cpuChoice}`;
}

function bumpScore(el) {
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}
