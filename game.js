let gameStarted = false;
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = -1;
let inputCount = -1;

function nextSequence() {
    // next level
    level++;
    $("#level-title").text(`level ${level}`);

    // reset user input
    userClickedPattern = [];
    inputCount = -1;

    // get random color and all to gamePattern[]
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColorChoosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChoosen);

    // show sequence to user
    $("#" + randomColorChoosen).fadeOut(100).fadeIn(100);
    playSound(randomColorChoosen);
}

function checkAnswer(lastResponse) {/*
    // was last response correct?
    if (lastResponse == gamePattern[gamePattern.length - 1]) {
        // was the last sequence correct?
        let matched = true;
        for (let i = 0; i < level; i++)
            if (userClickedPattern[i] != gamePattern[i])
                matched = false;
        if (matched)
            setTimeout(function () {
                nextSequence();
            }, 1000);
        else
            console.log("Failed");
    }*/
    let match = true;
    for (let i = 0; i <= inputCount; i++)
        if (gamePattern[i] != userClickedPattern[i]) {
            match = false;
            break;
        }

    if (match) { // pattern matches
        if (inputCount == level) { // end of current pattern
            console.log("Success");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else { // pattern mismatch
        // game over
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver() {
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
    level = -1;
    inputCount = -1;
}

function playSound(color) {
    new Audio(`./sounds/${color}.mp3`).play();
}

function animatePress(color) {
    $(`#${color}`).addClass("pressed");
    setTimeout(function () {
        $(`#${color}`).removeClass("pressed");
    }, 100);
}

$(".btn").on("click", function (e) {
    // add the color clicked by the user to userClickedPattern[]
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    inputCount++;

    // alert user of thier choice
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userChosenColor);
});

$(document).keypress(function () {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});
