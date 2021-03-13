var startTime = 60;
var timerEl = document.getElementById('timer');
var shuffledQuestions;
var currentQuestionIndex;
var myTimer;
var secondsLeft;
var answerButtonsGrid;
var mainContainer = document.getElementById('container');
mainContainer.classList.add('container');
var questionContainerEl;
var rightWrong;
var highScoreLink = document.getElementById('high-scores');
highScoreLink.addEventListener('click', highScores);
var initials;
var highScoresArray = [];
// highScoresArray.sort((a,b) => (a.score > b.score) ? 1 : -1);
var highScoreObj;
var correct;

window.onload = mainMenu();

var loadHighScores = function() {
  var savedScores = localStorage.getItem('highScoresArray');

  if (!savedScores) {
    return false;
  };

  highScoresArray = JSON.parse(savedScores);
}
var saveHighScores = function() {
  localStorage.setItem('highScoresArray', JSON.stringify(highScoresArray));
}

// main menu
function mainMenu() {
  startTime = 60;
  reset();
  // add title and append
  var title = document.createElement('h1');
  title.classList.add('center');
  title.innerText = 'Coding Quiz Challenge';
  mainContainer.appendChild(title);

  // add description and append
  var description = document.createElement('p');
  description.classList.add('center');
  description.innerText = "Try to answer the code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"; 
  mainContainer.appendChild(description);

  // add start button and append
  var startWrapper = document.createElement('div');
  startWrapper.classList.add('start');
  var startButton = document.createElement('btn');
  startButton.classList.add('start-btn', 'btn');
  startButton.innerText = 'Start';
  startWrapper.appendChild(startButton);
  mainContainer.appendChild(startWrapper);

  startButton.addEventListener('click', startGame);
};

// start game
function startGame() {
  reset();
  myTimer = setInterval(updateTimer, 1000);
  updateTimer();
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  setNextQuestion();
};

// set next question
function setNextQuestion() {
  reset();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
  // create question container and append
  questionContainerEl = document.createElement('div');
  mainContainer.appendChild(questionContainerEl);

  // create question text and append
  var questionEl = document.createElement('div');
  questionEl.innerText = question.question;
  questionContainerEl.appendChild(questionEl);

  // create answer button grid and append
  answerButtonsGrid = document.createElement('div');
  answerButtonsGrid.classList.add('btn-grid');
  questionContainerEl.appendChild(answerButtonsGrid);

  // answer buttons and append
  question.answers.forEach(answer => {
    var button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsGrid.appendChild(button);
  });

  // confirmation div
  rightWrong = document.createElement('div');
  rightWrong.classList.add('confirm');
  // answer correct
  if (correct) {
    rightWrong.innerHTML = "<h2>Correct!!</h2>"
  }
  // check if it's the first question
  else if (!correct && currentQuestionIndex > 0) {
    rightWrong.innerHTML = "<h2>WRONG!!</h2>"
  }
  // !correct and 
  else {
    rightWrong.innerHTML = '';
  }
  questionContainerEl.appendChild(rightWrong);
}

function reset() {
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  };
};

// selectAnswer and check if correct
function selectAnswer(e) {
  var selectedBtn = e.target;
  correct = selectedBtn.dataset.correct;
  if (correct) {
    console.log("correct");
    // rightWrong.innerHTML = "<h2>Correct!!</h2>";
    // mainContainer.appendChild(rightWrong);
  }
  else {
    console.log('wrongo');
    // rightWrong.innerHTML = "<h2>Wrong!!</h2>";
    // mainContainer.appendChild(rightWrong);
    startTime -= 10;
  };
  if (startTime <= 0) {
    console.log('worked');
    secondsLeft = 0;
    timerEl.innerText = '0';
    endGame();
  }
  else {
    currentQuestionIndex++;
    if (currentQuestionIndex == questions.length) {
      console.log('done');
      // clearInterval(myTimer);
      endGame();
    }
    else {
      // reset();
      setNextQuestion();
    };
  }
};

function endGame() {
  clearInterval(myTimer);
  reset();
  // questionEl.innerHTML = '<h1>All Done!</h1>';
  var allDone = document.createElement('h1');
  allDone.innerText = 'All Done!';
  mainContainer.appendChild(allDone);

  // display high score
  var scoreHolder = document.createElement('div');
  scoreHolder.innerHTML = "<p>Your final score is " + secondsLeft + ".";
  mainContainer.appendChild(scoreHolder);

  // enter initials for high score
  initials = document.createElement('input');
  initials.classList.add('input');
  var submit = document.createElement('button');
  submit.classList.add('btn');
  submit.setAttribute('type', 'submit');
  submit.innerText = "Submit";
  submit.addEventListener('click', storeHighScore);
  var highScoreSubmit = document.createElement('div');
  highScoreSubmit.innerHTML = "<p>Enter your initials below.</p>";
  highScoreSubmit.appendChild(initials);
  highScoreSubmit.appendChild(submit);
  mainContainer.appendChild(highScoreSubmit);
}

function storeHighScore() {
  if (!initials.value) {
    alert("Please enter your initials.");
  }
  else {
    highScoreObj = {
      initiald: initials.value,
      score: secondsLeft
    };
    highScoresArray.push(highScoreObj);
    saveHighScores();
    highScores();
  };
};

var clearScores = function() {
  localStorage.clear();
  while (highScoresArray.length > 0) {
    highScoresArray.pop();
  }

  mainMenu();
  console.log(highScoresArray);
};

function highScores() {
  reset();
  var title = document.createElement('h1');
  title.innerText = "High Scores";
  mainContainer.appendChild(title);

  // display high score array
  var displayArray = document.createElement('ol');
  highScoresArray.sort((a,b) => (a.score < b.score) ? 1 : -1);
  for (var i = 0; i < highScoresArray.length; i++) {
    
    var initial = highScoresArray[i].initiald;
    var score = highScoresArray[i].score;
    var scoreLi = document.createElement('li');
    scoreLi.classList.add('li', 'li:nth-child(odd)');
    scoreLi.innerHTML = initial.toUpperCase() + " - " + score;
    displayArray.appendChild(scoreLi);
  }
  
  // displayArray.innerHTML = (highScoresArray);
  mainContainer.appendChild(displayArray);

  // go back an clear high scores buttons
  var goBack = document.createElement('btn');
  goBack.classList.add('btn');
  goBack.innerText = 'Go Back';
  goBack.addEventListener('click', mainMenu);

  var clearHighScores = document.createElement('btn');
  clearHighScores.classList.add('btn');
  clearHighScores.innerText = 'Clear High Scores';
  clearHighScores.addEventListener('click', clearScores);

  mainContainer.appendChild(goBack);
  mainContainer.appendChild(clearHighScores);
}

// timer function

function updateTimer() {
  secondsLeft = startTime;
  if (secondsLeft > 0) {
    secondsLeft = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
    timerEl.innerText = secondsLeft;
    startTime--;
  }
  else {
  clearInterval(myTimer);
  // timerEl.innerText = 0;
  // secondsLeft = 0;
  endGame();
  }
};

// questions array

var questions = [
  {
    question: 'Commonly used data types do NOT include:',
    answers: [
      { text: 'alerts', correct: true },
      { text: 'booleans', correct: false },
      { text: 'strings', correct: false },
      { text: 'numbers', correct: false },
    ]
  },
  {
    question: 'The condition of an if / else statement is closed with ________.',
    answers: [
      { text: 'quotes', correct: false },
      { text: 'curly brackets', correct: false },
      { text: 'parenthesis', correct: true },
      { text: 'square brackets', correct: false },
    ]
  },
  {
    question: 'Arrays in JavaScript can be used to store.',
    answers: [
      { text: 'numbers and strings', correct: false },
      { text: 'other arrays', correct: false },
      { text: 'booleans', correct: false },
      { text: 'all of the above', correct: true },
    ]
  },
  {
    question: 'String values must be enclosed with _____ when being assigned to variables.',
    answers: [
      { text: 'commas', correct: false },
      { text: 'quotes', correct: true },
      { text: 'curly brackets', correct: false },
      { text: 'parenthess', correct: false },
    ]
  },
  {
    question: 'A very useful tool used for devleopment and debugging for printing content to the debugger is:',
    answers: [
      { text: 'JavaScript', correct: false },
      { text: 'terminal/bash', correct: false },
      { text: 'for loops', correct: false },
      { text: 'console.log', correct: true },
    ]
  }
]

loadHighScores();