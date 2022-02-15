let calcSecondFlag = true; 
let degFlag = true;
let trigonometryInverseFlag = true;
let trigonometryHyperbolicFlag = true;
let feFlag = true;
// Column-1 function change on pressing the "2nd" button.
function handleCalcSecondBtn() : void {
  if (calcSecondFlag) {
    document.getElementById("calcSecondBtn")!.style.backgroundColor = 
      "var(--function-change-btns-background)";
    document.getElementById("square")!.innerHTML = "&#119909;<sup>3</sup>";
    document.getElementById("root")!.innerHTML = "&#8731;&#119909;";
    document.getElementById("power")!.innerHTML = "<sup>y</sup>&radic;&#119909;";
    document.getElementById("power10")!.innerHTML = "2<sup>&#119909;</sup>";
    document.getElementById("log")!.innerHTML = "log<sub>2</sub>&#119909;";
    document.getElementById("ln")!.innerHTML = "e<sup>&#119909;</sup>";
    calcSecondFlag = !calcSecondFlag;
  } else {
    document.getElementById("calcSecondBtn")!.style.backgroundColor =
      "var(--operator-background)";
    document.getElementById("square")!.innerHTML = "&#119909;<sup>2</sup>";
    document.getElementById("root")!.innerHTML = "&radic;&#119909;";
    document.getElementById("power")!.innerHTML = "&#119909;<sup>y</sup>";
    document.getElementById("power10")!.innerHTML = "10<sup>&#119909;</sup>";
    document.getElementById("log")!.innerHTML = "log";
    document.getElementById("ln")!.innerHTML = "ln";
    calcSecondFlag = !calcSecondFlag;
  }
}
// For 2nd button under trigonomatry functions
function handleTrigonometryInverse() : void {
  if (trigonometryInverseFlag) {
    document.getElementById("trigonometryInverse")!.style.backgroundColor = 
      "var(--function-change-btns-background)";
    if (trigonometryHyperbolicFlag) {
      document.getElementById("sin")!.innerHTML = "sin<sup>-1</sup>";
      document.getElementById("cos")!.innerHTML = "cos<sup>-1</sup>";
      document.getElementById("tan")!.innerHTML = "tan<sup>-1</sup>";
      trigonometryInverseFlag = !trigonometryInverseFlag;
    } else {
      document.getElementById("sin")!.innerHTML = "sin<sup>-1</sup>h";
      document.getElementById("cos")!.innerHTML = "cos<sup>-1</sup>h";
      document.getElementById("tan")!.innerHTML = "tan<sup>-1</sup>h";
      trigonometryInverseFlag = !trigonometryInverseFlag;
    }
  } else {
    document.getElementById("trigonometryInverse")!.style.backgroundColor = 
      "var(--main-background)";
    if (trigonometryHyperbolicFlag) {
      document.getElementById("sin")!.innerHTML = "sin";
      document.getElementById("cos")!.innerHTML = "cos";
      document.getElementById("tan")!.innerHTML = "tan";
      trigonometryInverseFlag = !trigonometryInverseFlag;
    } else {
      document.getElementById("sin")!.innerHTML = "sinh";
      document.getElementById("cos")!.innerHTML = "cosh";
      document.getElementById("tan")!.innerHTML = "tanh";
      trigonometryInverseFlag = !trigonometryInverseFlag;
    }
  }
}
// For hyp button under trigonomatry functions
function handleTrigonometryHyperbolic() : void {
  if (trigonometryHyperbolicFlag) {
    document.getElementById("trigonometryHyperbolic")!.style.backgroundColor = 
      "var(--function-change-btns-background)";
    if (trigonometryInverseFlag) {
      document.getElementById("sin")!.innerHTML = "sinh";
      document.getElementById("cos")!.innerHTML = "cosh";
      document.getElementById("tan")!.innerHTML = "tanh";
      trigonometryHyperbolicFlag = !trigonometryHyperbolicFlag;
    } else {
      document.getElementById("sin")!.innerHTML = "sin<sup>-1</sup>h";
      document.getElementById("cos")!.innerHTML = "cos<sup>-1</sup>h";
      document.getElementById("tan")!.innerHTML = "tan<sup>-1</sup>h";
      trigonometryHyperbolicFlag = !trigonometryHyperbolicFlag;
    }
  } else {
    document.getElementById("trigonometryHyperbolic")!.style.backgroundColor = 
      "var(--main-background)";
    if (trigonometryInverseFlag) {
      document.getElementById("sin")!.innerHTML = "sin";
      document.getElementById("cos")!.innerHTML = "cos";
      document.getElementById("tan")!.innerHTML = "tan";
      trigonometryHyperbolicFlag = !trigonometryHyperbolicFlag;
    } else {
      document.getElementById("sin")!.innerHTML = "sin<sup>-1</sup>";
      document.getElementById("cos")!.innerHTML = "sin<sup>-1</sup>";
      document.getElementById("tan")!.innerHTML = "sin<sup>-1</sup>";
      trigonometryHyperbolicFlag = !trigonometryHyperbolicFlag;
    }
  }
}
// Function for evaluation of mathematical expression:
function evaluate(expression: string) : number {
  let expressionToken : string[] = expression.split("");  
  let operand : any[] = [];     // operand stack
  let operator : any[] = [];    // operator stack
  for (let i : number = 0; i < expressionToken.length; i++)
  {
    if (expressionToken[i] == " ")
    {
      continue;
    }
    // Conditions to push or pop operands
    else if (expressionToken[i] >= "0" && expressionToken[i] <= "9" 
       || expressionToken[i] == "." || expressionToken[i] == "-")
    {
      let num : string = "";
      while (i < expressionToken.length && expressionToken[i] >= "0" && 
      expressionToken[i] <= "9" || expressionToken[i] == "." || expressionToken[i] == "-")
      {
        num = num + expressionToken[i++];
      }
      operand.push(parseFloat(num));
      i--;
    }
    // Conditions to push or pop operators
    else if (expressionToken[i] == "(")
    {     
      operator.push(expressionToken[i]);     
    }
    else if (expressionToken[i] == ")")
    {
      if (expressionToken[i-2] == "-") {
        operand.push(parseFloat(expressionToken[i-1])*-1);
      }
      while (operator[operator.length - 1] != "(") {
        operand.push(calculate(operator.pop(), operand.pop(), operand.pop()));
      }
      operator.pop();
    }
    else if (expressionToken[i] == "+" || expressionToken[i] == "–" 
    || expressionToken[i] == "×" || expressionToken[i] == "÷" 
    || expressionToken [i] == "^" || expressionToken[i] == "%" 
    || expressionToken[i] == "√")
    {
      while (operator.length > 0 
        && precedence(expressionToken[i], operator[operator.length - 1]))
      {
        operand.push(
          calculate(operator.pop(), operand.pop(), operand.pop())
        );
      }
      operator.push(expressionToken[i]);   
		}
	}
  while (operator.length > 0) {
    operand.push(calculate(operator.pop(), operand.pop(), operand.pop()));
  }
  return operand.pop();    // Result of "evaluate" function
}
// Function to check precedence of operators.
/* It will return true only if the second Operator has 
    equal or higher precedence than first Operator.*/
function precedence(firstOperator : string, secondOperator : string) : boolean
{
  if (secondOperator == "(" || secondOperator == ")" || secondOperator == "-")
  {
    return false;
  }  
  else if ((firstOperator == "^" || firstOperator == "√") 
  && (secondOperator == "+" || secondOperator == "–"))
  {
    return false;
  }
  else if ((firstOperator == "^" || firstOperator == "√" || firstOperator == "÷")
  && (secondOperator == "×" || secondOperator == "%"))
  {
    return false;
  }
  else if ((firstOperator == "%") && (secondOperator == "×" || secondOperator == "÷"))
  {
    return false;
  }
  else if ((firstOperator == "×" || firstOperator == "÷" || firstOperator == "%")
   && (secondOperator == "+" || secondOperator == "–"))
  {
    return false;
  }
  else
  {
    return true;
  }
}
// Function to calculate string value according to precedence.
function calculate(operator: string, secondOperand : number, firstOperand : number) : number
{
  switch (operator){
    case "^":
      return firstOperand ** secondOperand;
    case "√":
      return nthRoot(secondOperand,firstOperand)
    case "%":
      return firstOperand % secondOperand;
    case "+":
      return firstOperand + secondOperand;
    case "–":
      return firstOperand - secondOperand;
    case "×":
      return firstOperand * secondOperand;
    case "÷":
      if (secondOperand == 0)
      {
        calcScreen.value = "infinity";
      }
      return firstOperand / secondOperand;
    }
    return 0;
}
// Function for finding nth root.
function nthRoot(redicant:number, index : number) : number {
  if (redicant < 0) {
    if (index % 2 === 1) return -nthRoot(-redicant, index)
    if (index % 2 === -1) return -1 / nthRoot(-redicant, -index)
  }
  return redicant ** (1 / index)
}
// To take the input using the keyboard
document.onkeyup = function(event : KeyboardEvent) : void{
  switch (event.key) {
    case "Backspace":
      document.getElementById("backspace")!.click();
      break;
    case "Delete":
      document.getElementById("clear")!.click();
      break;
    case "e":
    case "E":
      document.getElementById("e")!.click();
      break;
    // operators
    case "+":
      document.getElementById("addition")!.click();
      break;
    case "-":
      document.getElementById("subtraction")!.click();
      break;
    case "*":
      document.getElementById("multiply")!.click();
      break;
    case "/":
      document.getElementById("divide")!.click();
      break;
    case "^":
      document.getElementById("power")!.click();
      break;
    case "%":
      document.getElementById("mod")!.click();
      break;
    case "(":
      document.getElementById("openBracket")!.click();
      break;
    case ")":
      document.getElementById("closeBracket")!.click();
      break;
    case "!":
      document.getElementById("factorial")!.click();
      break;
    // Result
    case "=":
    case "Enter":
      document.getElementById("equal")!.click();
      break;
    // operands
    case "1":
      document.getElementById("1")!.click();
      break;
    case "2":
      document.getElementById("2")!.click();
      break;
    case "3":
      document.getElementById("3")!.click();
      break;
    case "4":
      document.getElementById("4")!.click();
      break;
    case "5":
      document.getElementById("5")!.click();
      break;
    case "6":
      document.getElementById("6")!.click();
      break;
    case "7":
      document.getElementById("7")!.click();
      break;
    case "8":
      document.getElementById("8")!.click();
      break;   
    case "9":
      document.getElementById("9")!.click();
      break;
    case "0":
      document.getElementById("0")!.click();
      break;
    case ".":
      document.getElementById(".")!.click();
      break;   
    default:
      alert("press valid key!");
  } 
}
// Other Functionalities & Event Handlers
let calcScreen : HTMLInputElement = (<HTMLInputElement>document.getElementById("calcScreen"));
let calcHistory : HTMLInputElement = (<HTMLInputElement>document.getElementById("calcHistory"));
let buttons : HTMLButtonElement[] = Array.from(document.getElementsByTagName("button"));
let memory = 0;
buttons.map(button => {
  button.addEventListener("click", (e:Event) => {
    let target = e.target as HTMLButtonElement; 
    switch (target.innerText) {
      case "C":
        calcScreen.value = "";
        calcHistory.value = "";
        break;
      case "π":
        calcScreen.value = String(Math.PI);
        break;
      case "e":
        calcScreen.value = String(Math.E);
        break;
      case "⌫":
        calcScreen.value = calcScreen.value.slice(0, -1);
        break;
      // Operators
      case "mod":
        calcHistory.value += calcScreen.value + "%";
        calcScreen.value = "";
        break;
      case "+":
      case "–":
      case "÷":
      case "×":
      case "(":
      case ")":
        calcHistory.value += calcScreen.value + target.innerText;
        calcScreen.value = "";
        break;
      case "𝑥y":
        calcHistory.value += calcScreen.value + "^";
        calcScreen.value = "";
        break;
      case "±":
        calcScreen.value = String(parseFloat(calcScreen.value)*-1)
        break;
      // Factorial
      case "n!":
        if (parseFloat(calcScreen.value) > 0) {
          let fact = 1;
          for (let i = 1; i <= parseFloat(calcScreen.value); i++) {
            fact *= i;
          }
          calcScreen.value = String(fact);
        } else if (parseFloat(calcScreen.value) == 0) calcScreen.value = "1";
        else calcScreen.value = "invalid input";
        break;
      // Converts -ve into +ve
      case "|𝑥|":
        if (parseFloat(calcScreen.value) < 0) calcScreen.value = String(parseFloat(calcScreen.value) * -1);
        break;
      // Inverse
      case "1/𝑥":
        if (parseFloat(calcScreen.value) == 0) calcScreen.value = "infinity";
        else calcScreen.value = String(1 / parseFloat(calcScreen.value));
        break;
      // Root
      case "√𝑥":
        calcScreen.value = String(Math.sqrt(parseFloat(calcScreen.value)));
        break;
      case "∛𝑥":
        calcScreen.value = String(Math.cbrt(parseFloat(calcScreen.value)));
        break;
      case "y√𝑥":
        calcHistory.value += calcScreen.value + "√";
        calcScreen.value = "";
        break;
      // Functions
      case "floor":
        const ans = Math.floor(parseFloat(calcScreen.value))
        calcScreen.value = String(ans);
        break;
      case "ceiling":
        calcScreen.value = String(Math.ceil(parseFloat(calcScreen.value)));
        break;
      case "round":
        calcScreen.value = String(Math.round(parseFloat(calcScreen.value)));
        break;
      // Power
      case "10𝑥":
        calcScreen.value = String(10 ** parseFloat(calcScreen.value));
        break;
      case "2𝑥":
        calcScreen.value = String(2 ** parseFloat(calcScreen.value));
        break;
      case "e𝑥":
        calcScreen.value = String(Math.E ** parseFloat(calcScreen.value));
        break;
      case "𝑥3":
        calcScreen.value = String(parseFloat(calcScreen.value) ** 3);
        break;
      case "𝑥2":
        calcScreen.value = String(parseFloat(calcScreen.value) ** 2);
        break;  
      // Trigonometric functions
      case "sin":
        if (degFlag) {
          calcScreen.value = Math.sin((parseFloat(calcScreen.value) * Math.PI) / 180).toPrecision(10);
        } else {
          calcScreen.value = Math.sin(parseFloat(calcScreen.value)).toPrecision(10);
        }
        break;
      case "cos":
        if (degFlag) {
          calcScreen.value = Math.cos((parseFloat(calcScreen.value) * Math.PI) / 180).toPrecision(10);
        } else {
          calcScreen.value = Math.cos(parseFloat(calcScreen.value)).toPrecision(10);
        }
        break;
      case "tan":
        if (degFlag) {
          calcScreen.value = Math.tan((parseFloat(calcScreen.value) * Math.PI) / 180).toPrecision(10);
        } else {
          calcScreen.value = Math.tan(parseFloat(calcScreen.value)).toPrecision(10);
        }
        break;
      case "sin-1":
        if (degFlag) {
          const sineInverse = Math.asin(parseFloat(calcScreen.value));
          calcScreen.value = String((sineInverse * 180) / Math.PI);
        } else {
          calcScreen.value = String(Math.asin(parseFloat(calcScreen.value)));
        }
        break;
      case "cos-1":
        if (degFlag) {
          const cosInverse = Math.acos(parseFloat(calcScreen.value));
          calcScreen.value = String((cosInverse * 180) / Math.PI);
        } else {
          calcScreen.value = String(Math.acos(parseFloat(calcScreen.value)));
        }
        break;
      case "tan-1":
        if (degFlag) {
          const tanInverse = Math.atan(parseFloat(calcScreen.value));
          calcScreen.value = String((tanInverse * 180) / Math.PI);
        } else {
          calcScreen.value = String(Math.atan(parseFloat(calcScreen.value)));
        }
        break;
      case "sinh":
        if (degFlag) {
          calcScreen.value = String(Math.sinh((parseFloat(calcScreen.value) * Math.PI) / 180));
        } else {
          calcScreen.value = String(Math.sinh(parseFloat(calcScreen.value)));
        }
        break;
      case "cosh":
        if (degFlag) {
          calcScreen.value = String(Math.cosh((parseFloat(calcScreen.value) * Math.PI) / 180));
        } else {
          calcScreen.value = String(Math.cosh(parseFloat(calcScreen.value)));
        }
        break;
      case "tanh":
        if (degFlag) {
          calcScreen.value = String(Math.tanh((parseFloat(calcScreen.value) * Math.PI) / 180));
        } else {
          calcScreen.value = String(Math.tanh(parseFloat(calcScreen.value)));
        }
        break;
      case "sin-1h":
        if (degFlag) {
          const sinehInverse = Math.asinh(parseFloat(calcScreen.value));
          calcScreen.value = String((sinehInverse * 180) / Math.PI);
        } else {
          calcScreen.value = String(Math.asinh(parseFloat(calcScreen.value)));
        }
        break;
      case "cos-1h":
        if (degFlag) {
          const coshInverse = Math.acosh(parseFloat(calcScreen.value));
          calcScreen.value = String((coshInverse * 180) / Math.PI);
        } else {
          calcScreen.value = String(Math.acosh(parseFloat(calcScreen.value)));
        }
        break;
      case "tan-1h":
        if (degFlag) {
          const tanhInverse = Math.atanh(parseFloat(calcScreen.value));
          calcScreen.value = String((tanhInverse * 180) / Math.PI);
        } else {
          calcScreen.value = String(Math.atanh(parseFloat(calcScreen.value)));
        }
        break;
      // Memory Functions
      case "M+":
        (document.getElementById("MR") as HTMLButtonElement)!.disabled = false;
        (document.getElementById("MC") as HTMLButtonElement)!.disabled = false;
        memory += parseFloat(calcScreen.value);
        calcScreen.value = "";
        break;
      case "M-":
        (document.getElementById("MR") as HTMLButtonElement)!.disabled = false;
        (document.getElementById("MC") as HTMLButtonElement)!.disabled = false;
        memory -= parseFloat(calcScreen.value);
        calcScreen.value = "";
        break;
      case "MS":
        (document.getElementById("MR") as HTMLButtonElement)!.disabled = false;
        (document.getElementById("MC") as HTMLButtonElement)!.disabled = false;
        memory = parseFloat(calcScreen.value);
        break;
      case "MR":
        calcScreen.value = String(memory);
        break;
      case "MC":
        memory = 0;
        (document.getElementById("MR") as HTMLButtonElement)!.disabled = true;
        (document.getElementById("MC") as HTMLButtonElement)!.disabled = true;
        break;      
      // Logarithm
      case "exp":
        let num : number = evaluate(calcScreen.value);
        calcScreen.value = num.toExponential(10);
        break;
      case "log":
        calcScreen.value = String(Math.log10(parseFloat(calcScreen.value)));
        break;
      case "ln":
        calcScreen.value = String(Math.log10(parseFloat(calcScreen.value)) / Math.log10(Math.PI));
        break;
      case "log2𝑥":
        calcScreen.value = String(Math.log2(parseFloat(calcScreen.value)));
        break;
      // Evaluate
      case "=":
        calcHistory.value += calcScreen.value;
        calcScreen.value = "";
        if (feFlag) {
          calcScreen.value = String(evaluate(calcHistory.value))
          calcHistory.value = "";
        } else {
          calcScreen.value = evaluate(calcHistory.value).toExponential(10);
          calcHistory.value = "";
        }
        break;
      case "hyp":
      case "2nd":
      case "nd":
        break;
      // Choice for the mode of calc
      case "DEG":
      case "RAD":
        if (degFlag) {
          document.getElementById("deg")!.innerHTML = "RAD";
          degFlag = !degFlag;
        } else {
          document.getElementById("deg")!.innerHTML = "DEG";
          degFlag = !degFlag;
        }
        break;
      // Choice for the mode of calc
      case "F-E":
        if (feFlag) {
          document.getElementById("fe")!.style.background = 
            "var(--function-change-btns-background)";
          feFlag = !feFlag;
        } else {
          document.getElementById("fe")!.style.background = 
            "var(--main-background)";
          feFlag = !feFlag;
        }
        break;
      // Default case (for numbers, operators and decimal.)
      default:
        calcScreen.value += target.innerText;
    }
  });
})