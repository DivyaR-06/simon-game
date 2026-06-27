var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];
var started=false;
var level=0;
var instructionsRead = false;

$(document).on("keydown", function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// Separate touch-start handler to avoid double-fire on mobile
$(document).on("touchstart", function(e) {
  if ($(e.target).hasClass("btn")) return; // let button handler deal with it
  if (!started) {
    nextSequence();
    started = true;
  }
});



$(document).on("click","#showInstructions",function(){

    $("#instructionModal").removeClass("hidden");

    started = false;

});

$("#startBtn").click(function(){

    $("#instructionModal").addClass("hidden");

    instructionsRead = true;

    if(!started){
        $("h1").text("Game over");
        setTimeout(function(){

        },1000);
        nextSequence();
        started = true;
    }

});

 $(".btn").on("click touchstart", function(e) {
  e.preventDefault(); // prevents ghost click on mobile
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("success");
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function(){
                    nextSequence()
                },1000);
            }
        }
            else{
                console.log("Wrong");
                playSound("wrong");
                $("body").addClass("game-over");
                setTimeout(function () {
                $("body").removeClass("game-over");
                }, 200);
            
               $("#level-title").html(
  'Game Over! <br><button id="showInstructions">View Instructions</button>'
);
                startOver();
            }

}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level:"+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
   
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);;
    playSound(randomChosenColor);
     

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    var delayInMilliseconds = 100;
    setTimeout(function() {
   $("#" + currentColor).removeClass("pressed");
}, delayInMilliseconds);

}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}



