var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var bestScore = 0; 

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press any Key to Restart");
  
      
      if(level===0){
        $("#score-display").text("Your Previous Score Was: 0");
        $("#score-display").show();
      }
      else{
        $("#score-display").text("Your Previous Score Was: " + (level - 1));
        $("#score-display").show();
      }
      
  
      $("#best-score-display").text("Your Current Best Score Is: " + bestScore);
      $("#best-score-display").show();
  
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
  
      startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);


    $("#score-display").text("Your Current Score Is: " + (level - 1));
    $("#score-display").show();

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


    if (level - 1 > bestScore) {
        bestScore = level - 1;
    }

    $("#best-score-display").text("Your Current Best Score Is: " + bestScore);
    $("#best-score-display").show();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}