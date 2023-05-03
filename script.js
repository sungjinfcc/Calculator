function add(a, b){
    return Number(a) + Number(b);
}
function subtract(a, b){
    return Number(a) - Number(b);
}
function multiply(a, b){
    return Number(a) * Number(b);
}
function divide(a, b){
    return Number(a) / Number(b);
}

let firstNumber;
let secondNumber;
let operator;
let displayValue = "";
let answer = 0;
let isRestarting = false;
let hasDot = false;
const display = document.querySelector('.display');
display.innerText = displayValue;
const result = document.querySelector('.result');
result.innerText = answer;

function operate(first, second, curOperator){
    console.log(first, curOperator, second);
    secondNumber = null;
    operator = null;
    isRestarting = true;
    hasDot = false;
    switch(curOperator){
        case '+':
            answer = add(first, second);
            result.innerText = answer;
            firstNumber = answer;
            break;
        case '-':
            answer = subtract(first, second);
            result.innerText = answer;
            firstNumber = answer;
            break;
        case '*':
            answer = multiply(first, second);
            result.innerText = answer;
            firstNumber = answer;
            break;
        case '/':
            answer = divide(first, second);
            result.innerText = answer;
            firstNumber = answer;
            break;
        default:
            break;
    }
}

function numberClicked(e){
    display.innerText += ` ${e.target.innerText}`;
    if(operator){
        if(!secondNumber){
            secondNumber = e.target.innerText;
        }else{
            secondNumber += e.target.innerText;
        }
    }else{
        if(!firstNumber){
            firstNumber = e.target.innerText;
        }else{
            if(isRestarting){
                display.innerText = e.target.innerText;
                answer = 0;
                result.innerText = answer;
                firstNumber = e.target.innerText;
                isRestarting = false;
            }else{
                firstNumber += e.target.innerText;
            }
        }
    }
    console.log(firstNumber, operator, secondNumber);
}
function operatorClicked(e){
    display.innerText += ` ${e.target.innerText}`;
    if(!operator){
        operator = e.target.innerText;
    }else{
        operate(firstNumber, secondNumber, operator);
        secondNumber = null;
        operator = e.target.innerText;
        isRestarting = false;
    }
    console.log(firstNumber, operator, secondNumber);
}
function clear(){
    firstNumber = null;
    secondNumber = null;
    operator = null;
    answer = 0;
    isRestarting = false;
    hasDot = false;
    display.innerText = "";
    result.innerText = answer;
}
function dotClicked(){
    if(!hasDot){
        hasDot = true;
        if(operator){
            if(!secondNumber){
                display.innerText += ` 0.`;
                secondNumber = '0.';
            }else{
                display.innerText += ` .`;
                secondNumber += '.';
            }
        }else{
            if(!firstNumber){
                display.innerText += `0.`;
                firstNumber = '0.';
            }else{
                if(isRestarting){
                    display.innerText += `0.`;
                    display.innerText = '0.';
                    answer = 0;
                    result.innerText = answer;
                    firstNumber = '0.';
                    isRestarting = false;
                }else{
                    display.innerText += ` .`;
                    firstNumber += '.';
                }
            }
        }
    }
}

const numbers = Array.from(document.querySelectorAll('.number'));
numbers.forEach((button) => button.addEventListener('click', numberClicked));
const operators = Array.from(document.querySelectorAll('.operator'));
operators.forEach((button) => button.addEventListener('click', operatorClicked));
document.querySelector('.equals')
    .addEventListener('click', (e) => operate(firstNumber, secondNumber, operator));
document.querySelector('.clear').addEventListener('click', clear);
document.querySelector('.dot').addEventListener('click', dotClicked);