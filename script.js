var emojiMap = { rock: '\u{1FAA8}', paper: '\u{1F4C4}', scissors: '\u2702\uFE0F' };
var wins = 0;
var losses = 0;

function play(userChoice) {
  var choices   = ['rock', 'paper', 'scissors'];
  var cpuChoice = choices[Math.floor(Math.random() * 3)];

  var resultEl = document.getElementById('result');
  var cpuEl    = document.getElementById('computer-choice');
  var winEl    = document.getElementById('score-win');
  var loseEl   = document.getElementById('score-lose');

  // Shake the clicked button
  var btns = document.querySelectorAll('.choice-btn');
  for (var i = 0; i < btns.length; i++) {
    var btn = btns[i];
    if (btn.getAttribute('aria-label').toLowerCase() === userChoice) {
      btn.classList.remove('shaking');
      // Force reflow so the animation restarts
      btn.getBoundingClientRect();
      btn.classList.add('shaking');
      setTimeout(function(b) { return function() { b.classList.remove('shaking'); }; }(btn), 400);
    }
  }

  // Determine outcome
  var outcome, label;
  if (userChoice === cpuChoice) {
    outcome = 'tie';
    label   = "It's a tie! \uD83E\uDD1D";
  } else if (
    (userChoice === 'rock'     && cpuChoice === 'scissors') ||
    (userChoice === 'paper'    && cpuChoice === 'rock')     ||
    (userChoice === 'scissors' && cpuChoice === 'paper')
  ) {
    outcome = 'win';
    label   = 'You win! \uD83C\uDF89';
    wins++;
    bumpScore(winEl);
    winEl.textContent = wins;
  } else {
    outcome = 'lose';
    label   = 'You lose! \uD83D\uDC80';
    losses++;
    bumpScore(loseEl);
    loseEl.textContent = losses;
  }

  // Reset classes fully before re-applying
  resultEl.className = 'result-text';
  resultEl.textContent = '';
  // Small delay so browser registers the class reset before re-animating
  setTimeout(function() {
    resultEl.textContent = label;
    resultEl.className = 'result-text ' + outcome + ' pop';
  }, 20);

  cpuEl.textContent = 'Computer chose ' + emojiMap[cpuChoice] + ' ' + cpuChoice;
}

function bumpScore(el) {
  el.classList.remove('bump');
  el.getBoundingClientRect(); // force reflow
  el.classList.add('bump');
}
