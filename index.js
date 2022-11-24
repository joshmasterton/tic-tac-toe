// Gameboard module deals with all functionallity of the elements
const Gameboard = (() => {

    // Simple array to store changed values when player selects empty space
    let gameBoard = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];

    // A factory function meant to act as a template for making multiple players
    const Player = (name, marker, turn, score) => {
        return {name, marker, turn, score};
    };

    const playerOne = Player("Friend", "X", true, 0);
    const playerTwo = Player("Enemy", "O", false, 0);
    let winner = "";

    // Function that decides who's turn it is based of if turn is true or not
    const getCurrentPlayer = () => {
        let currentPlayer = null;
        if(playerOne.turn === true){
            playerTwo.turn = true;
            playerOne.turn = false;
            return currentPlayer = playerOne;
        }else if(playerTwo.turn === true){
            playerOne.turn = true;
            playerTwo.turn = false;
            return currentPlayer = playerTwo;
        };
    };

    // When the current player selects an empty area this function checks if there are 3 
    // places that match so that it can declare a winner if there is one  
    const getWinner = (currentPlayer) => {
        if(gameBoard[0] === currentPlayer && gameBoard[1] === currentPlayer && gameBoard[2] === currentPlayer ||
            gameBoard[3] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[5] === currentPlayer || 
            gameBoard[6] === currentPlayer && gameBoard[7] === currentPlayer && gameBoard[8] === currentPlayer ||
            gameBoard[0] === currentPlayer && gameBoard[3] === currentPlayer && gameBoard[6] === currentPlayer ||
            gameBoard[1] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[7] === currentPlayer ||
            gameBoard[2] === currentPlayer && gameBoard[5] === currentPlayer && gameBoard[8] === currentPlayer ||
            gameBoard[0] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[8] === currentPlayer ||
            gameBoard[2] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[6] === currentPlayer)
            {
                if(winner === ""){
                    const resultWinnerElement = displayController.createResults();
                    resultWinnerElement.innerHTML = `${currentPlayer} Is The Winner Of This Round`;
                    winner = currentPlayer;
                };
                console.log(winner);
            };
    };
    return {
        gameBoard,
        playerOne, 
        playerTwo, 
        getCurrentPlayer,
        getWinner,
        winner
    };
})();


// Here is a module we use to create and edit DOM elements
const displayController = (() => {
    const root = document.getElementById("root");
    let currentPlayer = null;

    const createGrid = () => {
        const gridCon = document.createElement("div");
        gridCon.id = "gridCon";
        root.appendChild(gridCon);

        const gameBoardLength = Gameboard.gameBoard.length;
        for(let i = 0; i < gameBoardLength; i++){
            const grid = document.createElement("button");
            grid.className = "grid";
            grid.value = i;
            grid.addEventListener("click", () => { 
                if(grid.innerHTML === ""){
                    currentPlayer = Gameboard.getCurrentPlayer();
                    grid.innerHTML = currentPlayer.marker;
                    Gameboard.gameBoard[i] = currentPlayer.marker;
                    Gameboard.getWinner(currentPlayer.marker);
                };
            });
            gridCon.appendChild(grid);
        };

        return gridCon;
    };

    const createResults = () => {
        const resultCon = document.createElement("div");
        resultCon.id = "resultCon";
        root.appendChild(resultCon);
        const resultBtn = document.createElement("button");
        resultBtn.className = "resultChild";
        resultBtn.addEventListener("click", () => {
            window.location.reload();
        });
        resultCon.appendChild(resultBtn);

        const resultWinner = document.createElement("div");
        resultWinner.className = "resultChild";
        resultCon.appendChild(resultWinner);

        return resultWinner;
    };
    return {createGrid, createResults, currentPlayer};
})(); 

displayController.createGrid();
