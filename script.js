import * as Utils from './utils.js';

function startGame(){
    const gameCard = document.querySelector(".game-card");
    gameCard.style.alignItems = "";
    gameCard.innerHTML = 
            `<div class="players">
                <div class="user">
                    <ul class="scores">
                        <li class="score-dot"></li>
                        <li class="score-dot"></li>
                        <li class="score-dot"></li>
                        <li class="score-dot"></li>
                        <li class="score-dot"></li>
                    </ul>
                    <div class="move-card"></div>
                    <p class="move-desc"></p>
                </div>
                <div class="log">
                    
                </div>
                <div class="bot">
                    <ul class="scores">
                        <li class="score-dot"></li>
                        <li class="score-dot"></li>
                        <li class="score-dot"></li>
                        <li class="score-dot"></li>
                        <li class="score-dot"></li>
                    </ul>
                    <div class="move-card"></div>
                    <p class="move-desc"></p>
                </div>
            </div>
            <div class="play-buttons">
                <button id="play-rock">✊ Rock</button>
                <button id="play-paper">✋ Paper</button>
                <button id="play-scissors">✌️ Scissors</button>
            </div>`;
    playGame();
}

async function playGame(){
    const moves = ['rock', 'paper', 'scissors'];
    const movesEmo = ['✊', '✋', '✌️'];
    
    let userScore = 0;
    let botScore = 0;
    const logNode = document.querySelector(".log");
    const userMoveDesc = document.querySelector(".user .move-desc");
    const userMoveCard = document.querySelector(".user .move-card");
    const botMoveDesc = document.querySelector(".bot .move-desc");
    const botMoveCard = document.querySelector(".bot .move-card");
    const userScores = document.querySelector(".user .scores");
    const botScores = document.querySelector(".bot .scores");
    function log(message, append = true, wait = true, typingDelay = 40){   
        return Utils.typeText(logNode, message, append, wait, typingDelay);
    }   
    while(userScore < 5 && botScore < 5){
        await playRound();
    }
    async function playRound(){
        await log('Make your move!');
        userMoveDesc.textContent = ' ';
        userMoveCard.textContent = ' ';
        botMoveDesc.textContent = ' ';
        botMoveCard.textContent = ' ';
        const userChoice = await Utils.waitForUserChoice();
        userMoveDesc.textContent = moves[userChoice];
        userMoveCard.textContent = movesEmo[userChoice];
        console.log("playing...");
        await log("Awaiting bot choice", false);
        await log("... ", true, true, 400);
        const botChoice = Utils.randInt(0,2);
        botMoveDesc.textContent = moves[botChoice];
        botMoveCard.textContent = movesEmo[botChoice];
        let diff = (userChoice - botChoice + 3) % 3;
        switch(diff){
            case 0:
                log("It's a TIE!");
                break;
            case 1:
                log(`${moves[userChoice]} beats ${moves[botChoice]}! You WIN this round!`);
                userScores.children[userScore].classList.toggle("activated");
                userScore++;
                break;
            case 2:
                log(`${moves[botChoice]} beats ${moves[userChoice]}! You LOSE this round!`);
                botScores.children[botScore].classList.toggle("activated");
                botScore++;
                break;
        }
        await log(', ');
    }
    
    if(userScore === 5){
        log("You Win!");
    }
    if(botScore === 5){
        log("You Lose!");
    }
}

function reset(){
    const playButton = document.createElement("button");
    playButton.classList.toggle("start-button");
    playButton.textContent = "Play";
    Object.assign(playButton.style, {
        fontSize: "5rem"
    });
    const gameCard = document.querySelector(".game-card");
    gameCard.replaceChildren(playButton);
    Object.assign(gameCard.style, {
        alignItems: "center"
    });
}

addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if(button === null) return;
    if(button.matches(".start-button")){
        return startGame();
    }
    if(button.matches("#play-rock")) return Utils.handleChoice(0);
    if(button.matches("#play-paper")) return Utils.handleChoice(1);
    if(button.matches("#play-scissors")) return Utils.handleChoice(2);
    
});

reset();