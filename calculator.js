window.onload = function (){ // Run code once the page is loaded.

	var buttons = document.getElementsByTagName("input"); // Getting an array of all "input" elements.
	var displayScreen = buttons[0]; // assigning the first input element which is the display screen to a variable.
  var isFirst=false; // true if its the first char in display scree, false if its not.
	var turnOp='n'; // n stands for number, o stands for operation - I use this to check what input we are looking for to avoid errors.
	var bracketsCount=0; // increase 1 each time we add open bracket, decrease 1 each time we add close bracket.
	var decimal =false; // true if we used decimal at the current number to avoid using multiple decimals on same number.

	for(var i=0;i<buttons.length;i++){ // A loop to add onClick listeners to the buttons.
		  if(buttons[i].value === '='){ // If the '=' button is clicked then the onclick function will be "calculate()" which I haven't done yet :D
			    buttons[i].addEventListener("click", calculate());
      }
			else{ // Else it will be a number or an operation so we just add it to the display screen.
			   	buttons[i].addEventListener("click", addToDisplay(i));
		  }
	}

	function addToDisplay (i){ //This function adds the clicked button value to the display screen, except for 'clear' which clears the display screen for sure.
		return function(){
			// Clear the display screen before adding anything to it if funny code found.
			if(displayScreen.value=="NaN, stop looking for bugs!" || displayScreen.value=="420, Smoke weed everyday!" ||
							displayScreen.value=="911, Someone call 911 there's a bug!")
				clearDisplay();
		 	// Checks if its a special button (not a number) and adds it to display screen.
			if (buttons[i].value === "/") { // Checks the button value to know what button is it.
				if(turnOp==='o'){ // Check if its possible to add operator.
        displayScreen.value  +=  "/" ; // Adds the operator to the display screen.
				decimal=false; // After adding an operator we can add decimal again to another number.
				changeTurn(); // Changes the turn to 'n' so user can't add operator more than once.
				}
      }
			else if(buttons[i].value === "x"){ // Read comments above.
				if(turnOp==='o'){
        displayScreen.value += "*";
				decimal=false;
				changeTurn();
		  	}
			}
			else if(buttons[i].value==="C"){ // For the C button we just clear the display screen using a function.
         clearDisplay();
      }
			else if(buttons[i].value==="AC"){
				clearLast();
			}
			else if(buttons[i].value=="+"){
					if(turnOp=='o'){
					displayScreen.value+="+";
					decimal=false;
					changeTurn();
				}
			}
			else if(buttons[i].value=="-"){ // For the minus button its different...
					decimal=false;
					if(turnOp=='o' || displayScreen.value.length==0 || displayScreen.value[displayScreen.value.length-1]=='(' || displayScreen.value[displayScreen.value.length-1]=='-' ){ // We want to be able to add
					if(displayScreen.value[displayScreen.value.length-1]!='-' ){
					displayScreen.value+="-";
					changeTurn();
					}
			else{
					clearLast();
					displayScreen.value+='+';
					changeTurn();
				}
			}
			}
			else if(buttons[i].value=="("){
				decimal=false;
				if(displayScreen.value[displayScreen.value.length-1] >='0' && displayScreen.value[displayScreen.value.length-1]<='9' || displayScreen.value[displayScreen.value.length-1]==')'){
				displayScreen.value+="*(";
				changeTurn();
			}
			else{
				displayScreen.value+="(";
			}
				bracketsCount++;
			}
			else if(buttons[i].value==")"){
				if(bracketsCount>0 && displayScreen.value[displayScreen.value.length-1]!='('){
				decimal=false;
				displayScreen.value+=")";
				bracketsCount--;
			}
			}
			else if(buttons[i].value=="^"){
				if(turnOp=="o"){
					decimal=false;
				displayScreen.value+="**";
				turnOp="n";
			}
		}else if(buttons[i].value=="."){
			if(!decimal){
				displayScreen.value+=".";
				decimal=true;
			}
		}
			else {

        if(isFirst && displayScreen.value[displayScreen.value.length-1]>='0' && displayScreen.value[displayScreen.value.length-1]<='9'){

					clearDisplay();

				}

         isFirst=false;
				 if(displayScreen.value[displayScreen.value.length-1]===')'){
					 displayScreen.value  += '*'+buttons[i].value;
					 changeTurn();
				 }
				 else {
			   displayScreen.value  += buttons[i].value;
			 }
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
			if(bracketsCount!==0)return(alert("Fix your brackets, please"));
		if(displayScreen.value=="NaN" || displayScreen.value=="" || displayScreen.value=="NaN, stop looking for bugs!" || displayScreen.value=="911, Someone call 911 there's a bug!" ||
		displayScreen.value=="420, Smoke weed everyday!" || eval(displayScreen.value)=="Infinity" || eval(displayScreen.value)=="-Infinity" ||
		eval(displayScreen.value)=="undefined" || eval(displayScreen.value)=="NaN")
			return(displayScreen.value="NaN, stop looking for bugs!");
		if(eval(displayScreen.value)=="911")return(displayScreen.value="911, Someone call 911 there's a bug!");
		if(eval(displayScreen.value)=="420")return(displayScreen.value="420, Smoke weed everyday!");
    if(displayScreen.value[displayScreen.value.length-1]<'0' || displayScreen.value[displayScreen.value.length-1]>'9'){
		 if(displayScreen.value[displayScreen.value.length-1]!==')')
      return(alert("Invalid expression, the input should end with a number"));

    }
      isFirst=true;
			decimal=false;

				displayScreen.value=eval(displayScreen.value);

	};
//  if(displayScreen.value==undefined)displayScreen.value=" ";
}

function changeTurn(){
	if(turnOp==='o')turnOp='n';
	else {
		turnOp='o';
	}
}
function clearLast(){
	displayScreen.value=displayScreen.value.substring(0,displayScreen.value.length-1);
	if(displayScreen.value[displayScreen.value.length-1]<'0' || displayScreen.value[displayScreen.value.length-1]>'9')turnOp="n";

}

  };
