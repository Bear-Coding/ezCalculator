window.onload = function (){ // Run code once the page is loaded.
	var buttons = document.getElementsByTagName("input"); // Getting an array of all "input" elements.
	var displayScreen = buttons[0]; // aAsigning the first input element which is the display screen to a variable.
	var clear = document.getElementById('clear'); // The clear (c) button

	for(var i=0;i<buttons.length;i++){ // a loop to add onClick listener to the buttons
		  if(buttons[i].value === '='){ // if the '=' button is clicked then the onclick function will be "calculate()" which I haven't done yet :D
			    buttons[i].addEventListener("click", calculate());
      }else{ // else it will be a number or an op so we just add it to the display;
			   buttons[i].addEventListener("click", addToDisplay(i));
		  }
	}

	function addToDisplay (i){ //This function adds the clicked buttin value to the display screen, exepct for clear which clears the screen for sure.
		return function(){
			if (buttons[i].value === "÷") {
               displayScreen.value  +=  "/ " ;
      }else if(buttons[i].value === "x"){
			      displayScreen.value += "*";
		   } else if(buttons[i].value==="c"){
         displayScreen.value="";
       }else{
			   displayScreen.value  += buttons[i].value;
		   }
	  };
   }

// Clear method that didn't work :( new method above ^
  /* function clearDisplay(){
    displayScreen.value="";
  //  document.getElementById('display').value =' ';
}*/


  };
