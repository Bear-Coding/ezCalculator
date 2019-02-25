function op(num1,num2,op){
  results=0;
  switch(op){
    case '+':
    results = num1+num2;
    break;
    case '-':
    results=num1-num2;
    break;
    case '*':
    results=num1*num2;
    break;
    case '/':
    results=num1/num2;
    break;
    default: results= null;
  }
  function checkBrackets(exStr){
    let c=0;
    for(let i=0;i<exStr.length;i++){
      if(exStr[i]=='(')c++;
      else if(exStr[i]==')')c--;
    }
    if(c!=0)return false;
    else return true;
  }
}
