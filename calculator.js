window.onload = function (){ // Run code once the page is loaded.
	var buttons = document.getElementsByTagName("input"); // Getting an array of all "input" elements.
	var displayScreen = buttons[0]; // assigning the first input element which is the display screen to a variable.
	var clear = document.getElementById('clear'); // The clear (c) button.
  var isFirst=false;
  //var opWithoutNum=false;
	for(var i=0;i<buttons.length;i++){ // A loop to add onClick listeners to the buttons.
		  if(buttons[i].value === '='){ // If the '=' button is clicked then the onclick function will be "calculate()" which I haven't done yet :D
			    buttons[i].addEventListener("click", calculate());
      }else{ // Else it will be a number or an operation so we just add it to the display screen.
			   buttons[i].addEventListener("click", addToDisplay(i));
		  }
	}

	function addToDisplay (i){ //This function adds the clicked button value to the display screen, except for 'clear' which clears the display screen for sure.
		return function(){
			if (buttons[i].value === "÷") {
        displayScreen.value  +=  "/ " ;
      }else if(buttons[i].value === "x"){
        displayScreen.value += "*";
		  } else if(buttons[i].value==="c"){
         //displayScreen.value="";
         clearDisplay();
      } else{
        if(isFirst)clearDisplay();
        isFirst=false;
			   displayScreen.value  += buttons[i].value;
		   }
	  };
   }

// Clear method that didn't work :( new method above ^ ---nvm
   function clearDisplay(){
    displayScreen.value="";
  //  document.getElementById('display').value =' ';
}
function calculate(){

  return function(){
    if(displayScreen.value[displayScreen.value.length-1]<'0' || displayScreen.value[displayScreen.value.length]>'9'){
      return(alert("Invalid expression, please end with number"));
    }
      isFirst=true;
  displayScreen.value=eval(displayScreen.value);
};
//  if(displayScreen.value==undefined)displayScreen.value=" ";
}

  };
