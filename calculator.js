window.onload = function (){ // Run code once the page is loaded.

	var buttons = document.getElementsByTagName("input"); // Getting an array of all "input" elements.
	var displayScreen =buttons[0]; // assigning the first input element which is the display screen to a variable.
  var isFirst = false; // true if its the first char in display scree, false if its not.
	var turnOp = 'n'; // n stands for number, o stands for operation - I use this to check what input we are looking for to avoid errors.
	var bracketsCount = 0; // increase 1 each time we add open bracket, decrease 1 each time we add close bracket.
	var decimal = false; // true if we used decimal at the current number to avoid using multiple decimals on same number.

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
			if(displayScreen.value == "NaN, stop looking for bugs!" || displayScreen.value == "420, Smoke weed everyday!" ||
							displayScreen.value == "911, Someone call 911 there's a bug!" || displayScreen.value == "NaN")
				clearDisplay();
		 	// Checks if its a special button (not a number) and adds it to display screen.
			if (buttons[i].value === "/") { // Checks the button value to know what button is it.
				if(turnOp === 'o'){ // Check if its possible to add operator.
        displayScreen.value  +=  "/" ; // Adds the operator to the display screen.
				decimal = false; // After adding an operator we can add decimal again to another number.
				changeTurn(); // Changes the turn to 'n' so user can't add operator more than once.
				}
      }
			else if(buttons[i].value === "x"){ // Read comments above.
				if(turnOp ==='o'){
        displayScreen.value += "*";
				decimal=false;
				changeTurn();
		  	}
			}
			else if(buttons[i].value === "C"){ // For the C button we just clear the display screen using a function.
         clearDisplay();
      }
			else if(buttons[i].value === "AC"){
				clearLast();
			}
			else if(buttons[i].value == "+"){
					if(turnOp == 'o'){
					displayScreen.value += "+";
					decimal = false;
					changeTurn();
				}
			}
			else if(buttons[i].value == "-"){ // For the minus button its different...
					decimal = false;
					if(turnOp == 'o' || displayScreen.value.length == 0 || displayScreen.value[displayScreen.value.length-1] == '('
					 			|| displayScreen.value[displayScreen.value.length-1] == '-' ){ // We want to be able to add minus at the start and after open bracket.
					if(displayScreen.value[displayScreen.value.length-1] != '-' ){ // if there is no minus before it so we just add one.
						displayScreen.value += "-";
						changeTurn();
					}
			else{ // if there is already minus before it so we remove it and add plus instead if minus because -- is equal to +.
					clearLast();
					displayScreen.value += '+';
					changeTurn();
					}
				}
			}
			else if(buttons[i].value == "("){
				decimal = false;
				if(displayScreen.value[displayScreen.value.length-1] >= '0' && displayScreen.value[displayScreen.value.length-1] <= '9'
						|| displayScreen.value[displayScreen.value.length-1] == ')'){ // We check if we are adding close bracket after a number/closing bracket...
				displayScreen.value+="*("; // So we add multiply(*) before it.
				changeTurn();
			}
			else{
				displayScreen.value += "(";
			}
				bracketsCount++; // We added open bracket so we increase bracketsCount by 1.
			}
			else if(buttons[i].value == ")"){
				if(bracketsCount>0 && displayScreen.value[displayScreen.value.length-1]!='('){ // We check if we can add close brackets, if there is no open brackets...
					// ... and we are not adding close bracket right after open bracket then we add it.
					decimal = false;
					displayScreen.value += ")";
					bracketsCount--; // Decreasing the brackets count by 1 because we added a close bracket.
				}
			}
			else if(buttons[i].value == "^"){
				if(turnOp == "o"){
					decimal = false;
				displayScreen.value += "**"; // For the power operator we add double * which the computer understands as power.
				turnOp = "n";
		  	}
		 	}
	 	 else if(buttons[i].value == "."){
			 if(!decimal){ // Before adding a decimal we check if there is already a decimal in this number.
				displayScreen.value += ".";
				decimal=true; // We change it to true because now we have a decimal in the current number.
				}
			}
			else {
        if(isFirst && displayScreen.value[displayScreen.value.length-1] >= '0' && displayScreen.value[displayScreen.value.length-1] <=' 9'){
					// if we click any button(except for '=') and the last character in display is a number
					// and its the first number/operator(which means the current display is a result), we clear it to start a new expression.
					clearDisplay();
				}
         isFirst=false; // We change it to false since we already added the first character.
				 if(displayScreen.value[displayScreen.value.length-1]===')'){ //if the last char is close bracket then we add "*" before the number;
					 displayScreen.value += '*' + buttons[i].value;
					 changeTurn();
				 }
				 else { // Last else means that there is no special cases left, so we just add the number.
			   	displayScreen.value += buttons[i].value;
			 		 }
			 	 turnOp='o'; // Changing the turn to operator after adding a number.
			  }
		  };
	   }

 		function clearDisplay(){ // A function to clear the current display.
			bracketsCount=0;
    	displayScreen.value="";
			turnOp='n';
		}

		function calculate(){ // A function to calculate the current expression in the displayScreen.
  		return function(){ // Callback, since we need a first value, I had to return it all to avoid getting undefined results.
				if(bracketsCount!==0) // If there is something wrong with brackets count we send the user a msg to fix it.
					return(alert("Fix your brackets, please")); // Pay attention that its a 'return';
					// if the results or the current displayScreen value is equal to any special code or is equal to undefined/infinity/NaN which is caused in dividing by zero..etc.. we change it to NaN.
				if(displayScreen.value == "NaN" || displayScreen.value == "" || displayScreen.value == "NaN, stop looking for bugs!" || displayScreen.value == "911, Someone call 911 there's a bug!" ||
							displayScreen.value == "420, Smoke weed everyday!" || eval(displayScreen.value) == "Infinity" || eval(displayScreen.value) == "-Infinity" ||
							eval(displayScreen.value) == "undefined" || eval(displayScreen.value)=="NaN")
					return(displayScreen.value = "NaN, stop looking for bugs!");
					// funny code 1: if the answer is 911 we add a msg to the user.
				if(eval(displayScreen.value) == "911")
					return(displayScreen.value = "911, Someone call 911 there's a bug!");
					// funny code 2: if the results is 420 we add a msg to the user.
			  if(eval(displayScreen.value) == "420")
					return(displayScreen.value = "420, Smoke weed everyday!");
					// If we finish the expression with an operator we send error msg, except for close bracket which is allowed.
      	if(displayScreen.value[displayScreen.value.length-1]<'0' || displayScreen.value[displayScreen.value.length-1]>'9'){
		 			if(displayScreen.value[displayScreen.value.length-1]!==')')
      			return(alert("Invalid expression, the input should end with a number"));
    		}
      	isFirst=true;
				decimal=false;
				displayScreen.value=eval(displayScreen.value); // If its correct expression we just display the correct answer using eval.
			};
		}

		function changeTurn(){ // Changes the turn from operator to number or n to o.
			if(turnOp === 'o')turnOp='n';
				else {
					turnOp='o';
				}
		}
 		// Function that deletes only the last character.
		function clearLast(){
			if(displayScreen.value[displayScreen.value.length-1] == ")") bracketsCount++;
			if(displayScreen.value[displayScreen.value.length-1] == "(") bracketsCount--;
			displayScreen.value = displayScreen.value.substring(0,displayScreen.value.length-1);
			if(displayScreen.value[displayScreen.value.length-1]<'0' || displayScreen.value[displayScreen.value.length-1]>'9' || displayScreen.value.length == 0)
				turnOp="n";
		}
  };
