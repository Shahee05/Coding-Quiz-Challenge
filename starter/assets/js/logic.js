//breaking down the logic into parts and using pseudo comments to help 

//Audio files added from assets/sfx file
var correctSfx = new Audio("assets/sfx/correct.wav");
var incorrectSfx = new Audio("assets/sfx/incorrect.wav");

//Buttons to start and submit quiz
//had to change the variables as originally was start and submit only, but got confusing when adding EventListener
var startQuestions = document.querySelector("#start");
var submitChoice = document.querySelector("#submit");

//Adding initials element and final score element
var addInitials = document.querySelector("#initials");
var finalScore = document.querySelector("#final-score");

//screen elements and answering choices
var startScreen = document.querySelector("#start-screen");
var screenQuestions = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");


var questionsAnswer = document.querySelector("#question-title");
var selectAnswer = document.querySelector("#choices");



//TIMER



var interval;
var time = document.querySelector("#time");

// 45 seconds to begin with (questions are fairly easy)
// Score is 0 to begin with - until user starts the quiz
var startTime = 45;
var questionNumber = -1;
var score = 0;

//received help from online sources and group mate to get this functioning

//shuffle function
function shuffle(array) {
var currentIndex = array.length;
var randomIndex;

return array;

}

// storing answers
var shuffledQuestions = shuffle(choices);
var choicesLength = choices.length - 1;

//function to get the current time on the screen
function screenTime() {
return Number(time.textContent);
}

//function to set the new time and dsiplay it on the screen
function newScreenTime(newQuizTime) {
time.textContent = newQuizTime;
}


//Function to countdown the quiz and end it at 0
function countdown(value) {
var displayedTime = screenTime();
var stoppageValue = displayedTime - value;
// if the value of the timer is equal to or less than 0 , this indicates that the quiz is over
if (stoppageValue <= 0) {
clearInterval(interval);
newScreenTime("Time is up! Your quiz is over");
gameOver();
} else {
// timer continues with new time if the condition of <=0 has not been met
newScreenTime(stoppageValue);
}
}

//In the countdown, the timer should decrease by 1
function TimeMinusOne() {
countdown(1);
}
//Start of Questions/Quiz logic

function removeMessages() {
var messageElements = document.querySelectorAll(".message");

messageElements.forEach(function (element) {
element.remove();
});
}
//user should see a message when the answer is wrong
function IncorrectAnswerMessage() {
removeMessages();
// logic to display the message to user
var incorrectAnswerMessage = document.createElement("p");
incorrectAnswerMessage.textContent = "This answer in incorrect!";
incorrectAnswerMessage.classList.add("message", "wrong");
selectAnswer.appendChild(incorrectAnswerMessage);

// ensuring the message disappears after 2 seconds.
setTimeout(function () {
incorrectAnswerMessage.style.display = "none";
}, 2500);
}
function isTheAnswerCorrect() {
var optionButtons = document.querySelectorAll(".option-button");
// converts each option into a button
optionButtons.forEach(function (button) {
button.addEventListener("click", function () {
var currentQuestion = choices[questionNumber];
// checks if answer selected is the correct answer
if (this.textContent === currentQuestion.correctAnswer) {
correctSfx.play();
score++;
// hides the current userChoices before moving onto the next question
optionButtons.forEach(function (choices) {
choices.style.display = "none";
});
showNextQuestion();
} else {
incorrectSfx.play();
IncorrectAnswerMessage();
// take 10 secs off time.
TimeMinusOne(10);
score--;
}
})
})
}

// function to display the next question.
function showNextQuestion() {
// end game once all questions have been answered
if (questionNumber < choicesLength) {
// removes messages before next question is displayed
removeMessages();

//when called adds 1 to the index which in turn goes to the next question
questionNumber += 1;
// shuffles questions then displays a question title on the webpage
var questionName = shuffledQuestions[questionNumber].questionList;
questionsAnswer.textContent = questionName;
// displays corresponding options
var choice = shuffledQuestions[questionNumber];
// creates choices buttons and displays the choices on the webpage
console.log(questionNumber);

shuffle(choice.multipleChoiceOptions).forEach(function (item) {
var optionButton = document.createElement("button");
optionButton.textContent = item;
optionButton.classList.add("option-button");
selectAnswer.appendChild(optionButton);
});
// runs function to check if correct answer was selected
isTheAnswerCorrect();
} else {
gameOver();
}
}


function gameOver() {
screenQuestions.classList.add("hide");
endScreen.classList.remove("hide");
finalScore.textContent = score;
}


start.addEventListener("click", function (event) {
event.preventDefault();
newScreenTime(startTime);
// decrease time by 1 every second
interval = setInterval(TimeMinusOne, 1000);
// hide the start screen
startScreen.classList.add("hide");
// removes the class hide from the question screen to display the question screen
screenQuestions.classList.remove("hide");
showNextQuestion();
})

submit.addEventListener("click", function (event) {
// if no initials entered score is not saved
if (addInitials.value === "") {
return;
}

var scoresString = localStorage.getItem("scores");
var scores;

// if no data in local storage a new string of scores is created
if (scoresString === null) {
scores = [];
} else {
// converts in local storage into an array with objects
scores = JSON.parse(scoresString);
}

var scoreObject = {
initials: addInitials.value.toUpperCase(),
score: score
};

scores.push(scoreObject);
// converts score inot string to be stored in local storage
localStorage.setItem("scores", JSON.stringify(scores));
endScreen.classList.add("hide");
startScreen.classList.remove("hide");
// sets initial input box back to empty for next player
addInitials.value = "";
// sets score back to 0 for next player
score = 0;
});