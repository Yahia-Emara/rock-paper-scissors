function randInt(l, r){
    let range = r+1-l;
    return l + Math.floor(Math.random()*range);
}

function getBotChoice(){
    let choices = ['Rock', 'Paper', 'Scissors'];
    let botChoice = randInt(0,2);
    return choices[botChoice];
}

function typeText(textElement, text, typingSpeed = 40) {
    let index = 0;
    function work(){
        if (index < text.length) {
            textElement.textContent += text[index];
            index++;
            setTimeout(work, typingSpeed);
        }
    }
    setTimeout(work, 100);
}

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
                <button>✊ Rock</button>
                <button>✋ Paper</button>
                <button>✌️ Scissors</button>
            </div>`;
    playGame();
}

function playGame(){
    let userScore = 0;
    let botScore = 0;
    const log = document.querySelector(".log");
    typeText(log, "Make your move!");
    log.
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
});

reset();