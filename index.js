const root = document.getElementById("root");

const Gameboard = (() => {
    let gameboard = [
        "","","",
        "","","",
        "","","",
    ];

    const Player = (name, marker, active, score) => {
        return {name, marker, active, score};
    };

    const playerOne = Player("Zeno", "X", true, 0);
    const playerTwo = Player("Xona", "O", false, 0);

    const getActivePlayer = () => {
        if(playerOne.active === true){
            playerOne.active = false;
            playerTwo.active = true;
            return playerOne;
        }else if(playerTwo.active === true){
            playerOne.active = true;
            playerTwo.active = false;
            return playerTwo;
        };
    };

    const checkWinner = (y, a) => {
        let x = y.marker;

        if(
            gameboard[0] === x && gameboard[1] === x && gameboard[2] === x ||
            gameboard[3] === x && gameboard[4] === x && gameboard[5] === x ||
            gameboard[6] === x && gameboard[7] === x && gameboard[8] === x ||
            gameboard[0] === x && gameboard[3] === x && gameboard[6] === x ||
            gameboard[1] === x && gameboard[4] === x && gameboard[7] === x ||
            gameboard[2] === x && gameboard[5] === x && gameboard[8] === x ||
            gameboard[0] === x && gameboard[4] === x && gameboard[8] === x ||
            gameboard[2] === x && gameboard[4] === x && gameboard[6] === x
        ){
            y.score += 1;
            const winningPlayer = document.getElementById(`${y.marker}`);
            winningPlayer.innerHTML = `${y.name}: ${y.score}`;
            a = true;
        };
    };

    return {gameboard, playerOne, playerTwo, getActivePlayer, checkWinner};
})();

const displayController = (() => {
    let activePlayer = null;

    let roundOver = false

    const createGrid = () => {
        const gridCon = document.createElement("div");
        gridCon.id = "gridCon";
        root.appendChild(gridCon);

        for(let i = 0; i < Gameboard.gameboard.length; i++){
            const grid = document.createElement("button");
            grid.className = "grid";
            grid.addEventListener("click", () => {
                if(grid.innerHTML === ""){
                    activePlayer = Gameboard.getActivePlayer();
                    grid.innerHTML = activePlayer.marker;
                    Gameboard.gameboard[i] = activePlayer.marker;
                    Gameboard.checkWinner(activePlayer, roundOver);
                    console.log(roundOver);
                };
            });
            gridCon.appendChild(grid);
        };
    };

    const createScoreboard = () => {
        const scoreCon = document.createElement("div");
        scoreCon.id = "scoreCon";
        root.appendChild(scoreCon);

        const playerOneScore = document.createElement("div");
        playerOneScore.className = "score";
        playerOneScore.id = "X";
        playerOneScore.innerHTML = `${Gameboard.playerOne.name}: ${Gameboard.playerOne.score}`;
        scoreCon.appendChild(playerOneScore);

        const playerTwoScore = document.createElement("div");
        playerTwoScore.className = "score";
        playerTwoScore.id = "O";
        playerTwoScore.innerHTML = `${Gameboard.playerTwo.name}: ${Gameboard.playerTwo.score}`;
        scoreCon.appendChild(playerTwoScore);
    };

    const createRestart = () => {
        const restartCon = document.createElement("div");
        restartCon.id = "restartCon";
        root.appendChild(restartCon);

        const restartBtn = document.createElement("button");
        restartBtn.className = "restart";
        restartBtn.innerHTML = "Restart";
        restartBtn.addEventListener("click", () => {
            const gridCon = document.getElementById("gridCon");
            gridCon.remove();
            restartCon.remove();
            createGrid();
            createRestart();
            for(let i = 0; i < Gameboard.gameboard.length; i++){
                Gameboard.gameboard[i] = "";
            }
        });
        restartCon.appendChild(restartBtn);

        const winnerResult = document.createElement("div");
        winnerResult.className = "restart";;
        restartCon.appendChild(winnerResult);
    };

    return {createGrid, createScoreboard, createRestart};
})();

displayController.createScoreboard();
displayController.createGrid();
displayController.createRestart();