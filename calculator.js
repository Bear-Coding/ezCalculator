window.onload = function (){ // Run code once the page is loaded.
	var buttons = document.getElementsByTagName("input"); // Getting an array of all "input" elements.
	var displayScreen = buttons[0]; // assigning the first input element which is the display screen to a variable.
//	var clear = document.getElementById('clear'); // The clear (c) button.
	//var clearLastbtn = document.getElementById('clear2');
  var isFirst=false;
	var turnOp='n'; // n stands for number, o stands for operation - I use this to check what input we are looking for to avoid errors.
	var bracketsCount=0;
	var decimal =false;
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
			if(displayScreen.value=="NaN, stop looking for bugs!" || displayScreen.value=="420, Smoke weed everyday!" || displayScreen.value=="911, Someone call 911 there's a bug!")clearDisplay();
			if (buttons[i].value === "\/") {
				if(turnOp==='o'){
        displayScreen.value  +=  "/" ;
				decimal=false;
				changeTurn();
				}
      }else if(buttons[i].value === "x"){
				if(turnOp==='o'){
        displayScreen.value += "*";
				decimal=false;
				changeTurn();
		  	}
			}
		else if(buttons[i].value==="C"){
         //displayScreen.value="";
         clearDisplay();
      }else if(buttons[i].value==="AC"){
				clearLast();
			}
			else if(buttons[i].value=="+"){
					if(turnOp=='o'){
					displayScreen.value+="+";
					decimal=false;
					changeTurn();
					}
				}
			else if(buttons[i].value=="-"){
					decimal=false;
					if(turnOp=='o'){
					if(displayScreen.value[displayScreen.value.length-1]!='-' ){
					displayScreen.value+="-";
					//changeTurn();
					}
				else {
					clearLast();
					displayScreen.value+='+';
					changeTurn();
				}
				}
			}
			else if(buttons[i].value=="("){
				decimal=false;
				if(displayScreen.value[displayScreen.value.length-1] >='0' && displayScreen.value[displayScreen.value.length-1]<='9'){
				displayScreen.value+="*(";
			}else{
				displayScreen.value+="(";
			}
				bracketsCount++;
			}
			else if(buttons[i].value==")"){
				decimal=false;
				displayScreen.value+=")";
				bracketsCount--;
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
				 }else {
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
		if(displayScreen.value=="NaN" || displayScreen.value=="NaN, stop looking for bugs!" || displayScreen.value=="911, Someone call 911 there's a bug!" ||
		displayScreen.value=="420, Smoke weed everyday!" || eval(displayScreen.value)=="Infinity" || eval(displayScreen.value)=="-Infinity" ||
		eval(displayScreen.value)=="undefined" || eval(displayScreen.value)=="NaN")
			return(displayScreen.value="NaN, stop looking for bugs!");
		if(eval(displayScreen.value)=="911")return(displayScreen.value="911, Someone call 911 there's a bug!");
		if(eval(displayScreen.value)=="420")return(displayScreen.value="420, Smoke weed everyday!");
    if(displayScreen.value[displayScreen.value.length-1]<'0' || displayScreen.value[displayScreen.value.length-1]>'9'){
		 if(displayScreen.value[displayScreen.value.length-1]!==')')
      return(alert("Invalid expression, the input should end with a number"));
			if(bracketsCount!==0)return(alert("Fix your brackets, please"));
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
