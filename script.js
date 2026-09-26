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
    let userScore = 0;
    let botScore = 0;
    const logNode = document.querySelector(".log");
    function log(message, append = true, wait = true, typingDelay = 40){   
        return Utils.typeText(logNode, message, append, wait, typingDelay);
    }   
    while(userScore < 5 && botScore < 5){
        await playRound();
    }
    async function playRound(){
        log('Make your move!');
        const userChoice = await Utils.waitForUserChoice();
        console.log("playing...");
        const botChoice = Utils.randInt(0,2);
        log("Awaiting bot choice", false);
        log("... ", true, true, 400);
        let diff = (userChoice - botChoice + 3) % 3;
        switch(diff){
            case 0:
                log("It's a TIE!");
                break;
            case 1:
                log(`${moves[userChoice]} beats ${moves[botChoice]}! You WIN this round!`);
                userScore++;
                break;
            case 2:
                log(`${moves[botChoice]} beats ${moves[userChoice]}! You LOSE this round!`);
                botScore++;
                break;
        }
        await log(', ');
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