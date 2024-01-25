const btn0 = document.querySelector(".buttons #zero");
const btn1 = document.querySelector(".buttons #one");
const btn2 = document.querySelector(".buttons #two");
const btn3 = document.querySelector(".buttons #three");
const btn4 = document.querySelector(".buttons #four");
const btn5 = document.querySelector(".buttons #five");
const btn6 = document.querySelector(".buttons #six");
const btn7 = document.querySelector(".buttons #seven");
const btn8 = document.querySelector(".buttons #eight");
const btn9 = document.querySelector(".buttons #nine");
const addbtn = document.querySelector(".buttons #add");
const subbtn = document.querySelector(".buttons #subtract");
const mulbtn = document.querySelector(".buttons #multiply");
const divbtn = document.querySelector(".buttons #division");
const clrbtn = document.querySelector(".buttons #clear");

let expr=[];


function handleKey(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        screen.innerHTML += `<span>${key}</span>`;
    }
    else if(['+', '-', '*', '/'].includes(key) && !event.shiftKey){
        screen.innerHTML += `<span> ${key} </span>`;
    }
    
    else if(['='].includes(key)){

        screen.innerHTML = "<span></span>";
    }
}


function evaluate(expr) {
    let num1 = 0;
    let i = 0;

    expr.forEach(key => {
        if (!(['+', '-', '*', '/'].includes(key))) {
            num1 = num1 * 10 + parseInt(key);
            i++;
        }
    });

    screen.innerHTML = `<span>${num1}</span>`;
}


const screen = document.querySelector(".screen");
btn0.addEventListener("click", () => {
    screen.innerHTML += "<span>0</span>";
    expr.push("0");
});
btn1.addEventListener("click", () => {
    screen.innerHTML += "<span>1</span>";
    expr.push("1");
});
btn2.addEventListener("click", () => {
    screen.innerHTML += "<span>2</span>";
    expr.push("2");
});
btn3.addEventListener("click", () => {
    screen.innerHTML += "<span>3</span>";
    expr.push("3");
});
btn4.addEventListener("click", () => {
    screen.innerHTML += "<span>4</span>";
    expr.push("4");
});
btn5.addEventListener("click", () => {
    screen.innerHTML += "<span>5</span>";
    expr.push("5");
});
btn6.addEventListener("click", () => {
    screen.innerHTML += "<span>6</span>";
    expr.push("6");
});
btn7.addEventListener("click", () => {
    screen.innerHTML += "<span>7</span>";
    expr.push("7");
});
btn8.addEventListener("click", () => {
    screen.innerHTML += "<span>8</span>";
    expr.push("8");
});
btn9.addEventListener("click", () => {
    screen.innerHTML += "<span>9</span>";
    expr.push("9");
});
addbtn.addEventListener("click", () => {
    screen.innerHTML += "<span> + </span>";
    expr.push(" + ");
});
mulbtn.addEventListener("click", () => {
    screen.innerHTML += "<span> * </span>";
});
subbtn.addEventListener("click", () => {
    screen.innerHTML += "<span> - </span>";
});
divbtn.addEventListener("click", () => {
    screen.innerHTML += "<span> / </span>";
});
clrbtn.addEventListener("click", () => {
    screen.innerHTML = "<span></span>";
});
equal.addEventListener("click",()=> {
    screen.innerHTML = "<span></span>";
    evaluate();  
})

document.addEventListener("keydown", handleKey);

