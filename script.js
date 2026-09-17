function randInt(l, r){
    let range = r+1-l;
    return l + Math.floor(Math.random()*range);
}

function getBotChoice(){
    let choices = ['Rock', 'Paper', 'Scissors'];
    let botChoice = randInt(0,2);
    return choices[botChoice];
}

function capitalize(word){
    return word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase();
}

function getUserChoice(){
    let userChoice = prompt("Make your move!", 'Rock');
    userChoice = capitalize(userChoice);
    return userChoice;
}

function playGame(){
    let userScore = 0;
    let botScore = 0;
    function playRound(userChoice, botChoice){
        let enumerate = (str) => {
            if(str == 'Rock')return 0;
            if(str == 'Paper')return 1;
            if(str == 'Scissors')return 2;   
        }
        let userChoiceNumber = enumerate(userChoice);
        let botChoiceNumber = enumerate(botChoice);
        alert(`You chose: ${userChoice}`);
        alert(`Your opponent chose: ${botChoice}`);
        if(userChoiceNumber === botChoiceNumber){
            alert("It's a Draw!");
        }
        if(userChoiceNumber === (botChoiceNumber + 1) % 3){
            alert(`You Win! ${userChoice} beats ${botChoice}`);
            userScore++;
        }
        else if(botChoiceNumber === (userChoiceNumber + 1) % 3){
            alert(`You Lose! ${botChoice} beats ${userChoice}`);
            botScore++;
        }
    }
    for(let i=0; i<5; i++){
        playRound(getUserChoice(), getBotChoice());
    }
    alert(`Your score: ${userScore}`);
    alert(`Your opponent's score: ${botScore}`);
    if(userScore > botScore){
        alert(`You Win the game!`);
    }
    else if(userScore < botScore){
        alert(`You Lose the game!`);
    }
    else if(userChoice === botScore){
        alert(`The game is a Draw!`);
    }
    return capitalize(prompt('Play Again?', 'Yes'));
}
let userChoice = prompt('Play Rock Paper Scissors?', 'Yes');
userChoice = capitalize(userChoice);
if(userChoice === 'Yes'){
    while(playGame() === 'Yes');
}