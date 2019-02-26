window.onload = function (){ // Run code once the page is loaded.
	var buttons = document.getElementsByTagName("input"); // Getting an array of all "input" elements.
	var displayScreen = buttons[0]; // assigning the first input element which is the display screen to a variable.
	var clear = document.getElementById('clear'); // The clear (c) button.
  var isFirst=false;
	var turnOp='n'; // n stands for number, o stands for operation - I use this to check what input we are looking for to avoid errors.
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
				if(turnOp=='o'){
        displayScreen.value  +=  "/ " ;
				turnOp='n';
			}
      }else if(buttons[i].value === "x"){
					if(turnOp=='o'){
        displayScreen.value += "*";
				turnOp='n';
		  }
		}else if(buttons[i].value==="C"){
         //displayScreen.value="";
         clearDisplay();
      }else if(buttons[i].value=="+"){
				if(turnOp=='o'){
					displayScreen.value+="+";
					turnOp='n';
				}
			}else if(buttons[i].value=="-"){
				if(turnOp=='o'){
					displayScreen.value+="-";
					turnOp='n';
				}
			}
			else {
        if(isFirst){
					clearDisplay();
					}

         isFirst=false;
			   displayScreen.value  += buttons[i].value;
				 turnOp='o';
			 }
		 };
	  }


// Clear method that didn't work :( new method above ^ ---nvm
   function clearDisplay(){
    displayScreen.value="";
		turnOp='n';
  //  document.getElementById('display').value =' ';
}
function calculate(){

  return function(){
    if(displayScreen.value[displayScreen.value.length-1]<'0' || displayScreen.value[displayScreen.value.length]>'9'){
      return(alert("Invalid expression, the input should end with a number"));
    }
      isFirst=true;
  displayScreen.value=eval(displayScreen.value);
};
//  if(displayScreen.value==undefined)displayScreen.value=" ";
}



  };
