function generateNum(){	
	return Math.floor(Math.random() * 100) + 1;
}

function calculateTemp(targetNum, guessNum){
	var diff = Math.abs(targetNum - guessNum);
	var resStr;

	if(diff >= 50){
		resStr = "ice cold";
	}else if( diff >= 30 && diff < 50){
		resStr = "cold";
	}else if( diff >= 20 && diff < 30){
		resStr = "warm";
	}else if( diff >= 10 && diff < 20){
		resStr = "hot";
	}else if( diff >=1 && diff < 10){
		resStr = "very hot";
	}else if( diff == 0){
		resStr = "bingo"
	}

  return resStr;
}

/*--- global variable ---*/
var guessCnt = 0;
var guessArr = [];

$(document).ready(function(){
	/*--- Generate the target number ---*/ 
	var target = generateNum();
	console.log(target);

	/*--- Display information modal box ---*/
  	$('.what').click(function(){
    	$('.overlay').fadeIn(1000);
  	});
  	/*--- Hide information modal box ---*/
  	$('a.close').click(function(){
  		$('.overlay').fadeOut(1000);
  	});

  	/*--- Start a new game ---*/
  	$("a.new").click(function(){
  		//generate a new number
  		target = generateNum();
      console.log(target);

      //clear input value
      $("#userGuess").val("");

  		//reset feedback
      $("#feedback").text("Make your Guess!");

  		//reset count number
      guessCnt = 0;
      $("#count").text("0");

  		//reset guess list
      guessArr = [];
      $("#guessList").html("");
  	});

  	/*--- Submit the user guessed number---*/
  	$("#guessForm").submit(function(e){
  		//get the user input value
  		var inputNum = $("#userGuess").val();

  		//input number validation
      var regEx = /^\d+$/;
      if(!regEx.test(inputNum)){
        alert("The guess must be positive integer number!");
        
        $("#userGuess").val("");
        return false;
      }

      //repeated input number check
      if(guessArr.indexOf(inputNum) != -1){
        alert("You already guessed this number!");

        $("#userGuess").val("");
        return false;
      }

  		//calculate 
  		var feedbackStr = calculateTemp(target, inputNum);
  		if(feedbackStr == "bingo"){
  			//update feedback
  			$("#feedback").html("You won!<br/>Click new game to play again.")

  			//dismiss guess button
  			return false;	
  		}

      //put new guess number into array
      guessArr.push(inputNum);

      //update count number
      guessCnt += 1; 
      $("#count").text(guessCnt); 

  		//update feedback
      $("#feedback").text(feedbackStr);

  		//append guess to list
      $("#guessList").append("<li>"+inputNum+"</li>");

      //clear user input
      $("#userGuess").val("");

      //prevent default frefreshing page
      e.preventDefault();
  	});

});


