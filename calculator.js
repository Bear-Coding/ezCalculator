window.onload = function (){
	var buttons = document.getElementsByTagName("input");
	var displayScreen = buttons[0];
	var clear = document.getElementById('clear')[0];

	for(var i=0;i<buttons.length;i++){
		  if(buttons[i].value === '='){
			    buttons[i].addEventListener("click", calculate());
		  } else if(buttons[i].id==='clear'){
        buttons[i].addEventListener("click",clearDisplay());
      } else{
			   buttons[i].addEventListener("click", addToDisplay(i));
		  }
	}

	function addToDisplay (i){
		return function(){
			if (buttons[i].value === "÷") {
               displayScreen.value  +=  "/ " ;
      }else if(buttons[i].value === "x"){
			      displayScreen.value += "*";
		   } else{
			   displayScreen.value  += buttons[i].value;
		   }
	  };
   }

   function clearDisplay(){
     displayScreen.value="";
   }

  };
