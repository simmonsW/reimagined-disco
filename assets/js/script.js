var startTime = 10;
var timerEl = document.getElementById('timer');
var startButton = document.getElementById('start-btn');
var shuffledQuestions;
var currentQuestionIndex;
var myTimer;
var secondsLeft;
var answerButtonsGrid;
var mainContainer = document.getElementById('container');
mainContainer.classList.add('container');
var questionContainerEl;

startButton.addEventListener('click', startGame);

// start game
function startGame() {
  myTimer = setInterval(updateTimer, 1000);
  updateTimer();
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  // questionContainerEl.classList.remove('hide');
  setNextQuestion();
};

// set next question
function setNextQuestion() {
  // reset();
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
}

function reset() {
  while (answerButtonsGrid.firstChild) {
    answerButtonsGrid.removeChild(answerButtonsGrid.firstChild);
  };
  questionContainerEl.removeChild(questionContainerEl.firstChild);
};

// selectAnswer and check if correct
function selectAnswer(e) {
  var selectedBtn = e.target;
  var correct = selectedBtn.dataset.correct;
  if (correct) {
    console.log("correct");
  }
  else {
    console.log('wrongo');
    startTime -= 10;
  };
  currentQuestionIndex++;
  if (currentQuestionIndex == questions.length) {
    console.log('done');
    clearInterval(myTimer);
    endGame();
  }
  else {
    reset();
    setNextQuestion();
  };
};

function endGame() {
  reset();
  // questionEl.innerHTML = '<h1>All Done!</h1>';
  var allDone = document.createElement('h2');
  allDone.innerText = 'All Done!';
  mainContainer.appendChild(allDone);

  // display high score
  var scoreHolder = document.createElement('div');
  scoreHolder.innerHTML = "<p>You're final score is " + secondsLeft + ".";
  mainContainer.appendChild(scoreHolder);

  // enter initials for high score
  var initials = document.createElement('input');
  var submit = document.createElement('button');
  submit.classList.add('btn');
  submit.innerText = "Submit";
  var highScoreSubmit = document.createElement('div');
  highScoreSubmit.innerHTML = "<p>Enter your initials below.</p>";
  highScoreSubmit.appendChild(initials);
  highScoreSubmit.appendChild(submit);
  mainContainer.appendChild(highScoreSubmit);
}

// timer function

function updateTimer() {
  secondsLeft = startTime;

  secondsLeft = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
  if (secondsLeft == 0) {
    endGame();
  };

  timerEl.innerText = secondsLeft;
  startTime--;
  
};

// questions array

var questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false },
      { text: '18', correct: false },
      { text: '2000', correct: false },
    ]
  },
  {
    question: 'What color is the sky?',
    answers: [
      { text: 'red', correct: false },
      { text: 'green', correct: false },
      { text: 'yellow', correct: false },
      { text: 'blue', correct: true },
    ]
  },
  {
    question: 'Why?',
    answers: [
      { text: 'yes', correct: false },
      { text: 'no', correct: false },
      { text: 'because', correct: true },
      { text: 'maybe', correct: false },
    ]
  },
  {
    question: 'What is the meaning of life?',
    answers: [
      { text: '42', correct: true },
      { text: 'death', correct: false },
      { text: 'existence', correct: false },
      { text: 'nothing', correct: false },
    ]
  },
  {
    question: 'Which answer is correct?',
    answers: [
      { text: 'Not this one', correct: false },
      { text: 'This one', correct: true },
      { text: 'The other one', correct: false },
      { text: 'That one', correct: false },
    ]
  }
]
