
var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];




var p=false;
var level;

$(document).keypress(function(){

    if(!p){
     
     p=true;

      level=0;
    
     $("#level-title").text("Level "+level); 
      
      setTimeout(function(){nextSequence();},1000);
      
     }
});



$(".btn").click(function(){
      
      //we are selecting the clicked position and finding its attribute thorugh the id

      var userChosenColor=$(this).attr("id");

      userClickedPattern.push(userChosenColor);

      playSound(userChosenColor);

      animatePress(userChosenColor);
      checkAnswer(userClickedPattern.length-1);
});






function nextSequence(){

    userClickedPattern=[];

     level++;

     $("#level-title").text("Level "+level);
    
	var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColor=buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);




}

function playSound(name){

var audio=new Audio("sounds/"+name+".mp3");

    audio.play();
}

function animatePress(currentColor){

    //while adding class no need to include dot(.) operator
	$("#"+currentColor).addClass("pressed");

     setTimeout(function(){
     	$("#"+currentColor).removeClass("pressed");
     },100);
}


function checkAnswer(currentLevel){
       if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
       	console.log("sucess");
       
     
     if(userClickedPattern.length===gamePattern.length){
              setTimeout(function(){

              	nextSequence();
              },1000);

       }

   }else{
       	playSound("wrong");

       	$("body").addClass("game-over");

       	setTimeout(function(){
       		$("body").removeClass("game-over");
       	},100);

       	$("h1").text("Game over,press any key to restart");
       	   startover();
       }
}

function startover(){
	p=false;
	level=0;gamePattern=[];
}