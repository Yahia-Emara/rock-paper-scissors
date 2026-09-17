console.log("Hello World!");

function randInt(l, r){
    let range = r+1-l;
    return l + Math.floor(Math.random()*range);
}

function getComputerChoice(){
    let choices = ['Rock', 'Paper', 'Scissors'];
    let computerChoice = randInt(0,2);
    return choices[computerChoice];
}

function getUserChoice(){
    let userChoice = prompt("Make your move!", 'Rock');
    return userChoice;
}

console.log(getUserChoice());
console.log(getComputerChoice());