//storing the player's high score - LOCAL STORAGE
// stackOverflow and w3 schools was used to save scores
var highscoresElement = document.querySelector("#highscores");
var clear = document.querySelector("#clear");

//highscores to be saved
var highscores = [];

function listScores() {
var storedScores = localStorage.getItem("scores")
// no display of scores if nothing is submitted i.e. initals with scores
if (storedScores === null) {
return;
} else {
// if stored scores convert to an object via JSON
highscores = JSON.parse(storedScores);

}
// saved top 5scorers
highscores.forEach(function (scoreObject, index) {
if (index > 4) {
return;
}
// listing the scores
var listElement = document.createElement("li");
listElement.textContent = scoreObject.initials + " achieved the score " + scoreObject.score;
highscoresElement.appendChild(listElement);
})
}


// clear high scores button

clear.addEventListener("click", function () {
localStorage.clear();
highscoresElement.innerHTML = "";

})

listScores();