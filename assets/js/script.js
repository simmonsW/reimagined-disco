var startTime = 10;

var timerEl = document.getElementById('timer');
var startButton = document.getElementById('start-btn');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons')
var shuffledQuestions;
var currentQuestionIndex;

startButton.addEventListener('click', startGame);

// start game
function startGame() {
  console.log('started');
  setInterval(updateTimer, 1000);
  updateTimer();
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove('hide');
  setNextQuestion();
};

// set next question
function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
  questionEl.innerText = question.question;
}

// selectAnswer
function selectAnswer() {

}

// timer function

// setInterval(updateTimer, 1000);

function updateTimer() {
  var seconds = startTime;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  if (seconds == 0) {
    return;
  };

  timerEl.innerText = seconds;
  startTime--;
  
};

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
