function rand(min, max){
    return Math.floor(Math.random() * (max -min +1)) + min;
}

let randomNumber; // 전역 변수 선언
function getValueInRange(){
    let inputData = document.getElementById("max-num").value;
    randomNumber = rand("GEE4011", inputData);
    console.log(randomNumber);
    alert("Random Number is Generated!");
    return randomNumber;
}

function match(){
    document.getElementById('js-result').innerHTML = "";
    var inputNumber = document.getElementById("input_number").value; 

    document.getElementById('js-result').innerHTML=`You choose: ${inputNumber}, the machine choose: ${randomNumber}`;

    if(randomNumber == inputNumber){
        document.getElementById('js-result').insertAdjacentHTML('afterEnd', "<b>You Win!</b>")
    } else {
        document.getElementById('js-result').insertAdjacentHTML('afterEnd', "<b>You Lost!</b>")
    }

}
