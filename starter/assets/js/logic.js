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

// time on the screen
function screenTime() {
    return Number(time.textContent);
}

function newScreenTime(newTime) {
    time.textContent = newTime;
}

//decreasing time
function countdownTimer() {
    countdown(1);
}

//Countdown to end the quiz
//used StackFlow for codes to assist (JavaScript timer for a quiz)
function countdown(value) {
    var displayedTime = screenTime();
    var stopValue = displayedTime - value;

    //User runs out of time
    if (stopValue <= 0) {
        clearInterval(interval);
        newScreenTime("Oh no! You ran out of time!");
        gameEnd();
    } else {
        newScreenTime(stopValue);
    }
}



//Questions
//Answers - if correct or incorrect

function removeMessages() {
    var messageElements = document.querySelectorAll(".message");

    messageElements.forEach(function (element) {
        element.remove();
    });
}
//when answer is wrong
function wrongAnswer() {
    removeMessages();
    var wrongAnswer = document.createElement("p");
    wrongAnswer.textContent = "No! Try again!";
    wrongAnswer.classList.add("message", "wrong");
    selectAnswer.appendChild(wrongAnswer);

    //message shows for over 2 seconds
    setTimeout(function () {
        wrongAnswer.style.display = "none";
    }, 2000);
}




//when answer is correct
//assist from StackOVerflow to match correct Answer from questions.js
function correctAnswer() {
    var optionButtons = document.querySelectorAll(".option-button");


    optionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var currentQuestion = choices[questionNumber];
            // var correctAnswer = document.createElement("p");
            // // correctAnswer.textContent = "Yes! Well done!";
            // // correctAnswer.classList.add("message", "correct");
            // // selectAnswer.appendChild(correctAnswer);
         
            // setTimeout(function () {
            //     correctAnswer.style.display = "none";
            // }, 2000);

            //score is tallied up
            if (this.textContent === currentQuestion.correctAnswer) {
                correctSfx.play();
                correctAnswer();
                score++;

                // hides the current userChoices before moving onto the next question
                optionButtons.forEach(function (choices) {
                    choices.style.display = "none";
                }
                );


                    
                //adding audio and try to decrease time by 10 seconds
                showNextQuestion();
            } else {
            
                incorrectSfx.play();
                wrongAnswer();
                countdownTimer()
                countdown(10); 
                score--;


            }
        })
    })
}

//more timer funtionality when going through the quiz game

start.addEventListener("click", function (event) {
    event.preventDefault();
    newScreenTime(startTime);
    interval = setInterval(countdownTimer, 1000);
    startScreen.classList.add("hide");
    screenQuestions.classList.remove("hide");
    showNextQuestion();
})



//for questions to pop up on ater another
function showNextQuestion() {

    if (questionNumber < choicesLength) {
        removeMessages();

        questionNumber += 1;
    
        var questionName = shuffledQuestions[questionNumber].questionList;
        questionsAnswer.textContent = questionName;
   
        var choice = shuffledQuestions[questionNumber];
      
        //allows questions and options to be displayed 
        console.log(questionNumber);

        shuffle(choice.multipleChoiceOptions).forEach(function (item) {
            var optionButton = document.createElement("button");
            optionButton.textContent = item;
            optionButton.classList.add("option-button");
            selectAnswer.appendChild(optionButton);
        });
        // runs function to check if correct answer was selected
        correctAnswer();
    } else {
        gameEnd();
    }
}


//end game quiz

function gameEnd() {
    screenQuestions.classList.add("hide");
    endScreen.classList.remove("hide");
    finalScore.textContent = score;
}


// save initials -local storage

submit.addEventListener("click", function (event) {
    if (addInitials.value === "") {
        return;
    }

    var scoresString = localStorage.getItem("scores");
    var scores;

    // if no data in local storage a new string of scores is created
    if (scoresString === null) {
        scores = [];
    } else {
        // converts  into an array with objects
        scores = JSON.parse(scoresString);
    }

    //stores initials for high scores
    var scoreObject = {
        initials: addInitials.value.toUpperCase(),
        score: score
    };

    scores.push(scoreObject);
    // converts back to local storage
    localStorage.setItem("scores", JSON.stringify(scores));
    endScreen.classList.add("hide");
    startScreen.classList.remove("hide");
    addInitials.value = "";
    // a new game can begin
    score = 0;
});