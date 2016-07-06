// Initialize game environment
var gameOn = true; // Set to true if game to start upon page loading
var numPlayers = 1;
var gridSize = 3;
var humanPlayer = 'playerX'
var computerPlayer = 'playerO'
var currentPlayer = 'playerX';

// Start an initial default game upon page loading
(function() {
    window.gameBoard = makeGameBoard(3);
    var scores = resetScores(gameBoard);
    placeFirstRandomPiece();
})();

(function() {
    // Starts game over, used by other buttons
    var resetGame = function() {
        gameOn = true;
        currentPlayer = humanPlayer;
        window.gameBoard = makeGameBoard(gridSize);
        resetBoard(gameBoard);
        if (numPlayers === 1 && currentPlayer === 'playerX') {
            placeFirstRandomPiece();
        }
        renderGameBoard(gameBoard);
    };

    // Restart game in 1 player mode
    document.getElementById('button-1player').onclick = function() {
        numPlayers = 1;
        resetGame();
    };
    
    // Restart game in 2 player mode
    document.getElementById('button-2player').onclick = function() {
        numPlayers = 2;
        resetGame();
    };

    // Restart game with 3 X 3 grid, player mode is retained
    document.getElementById('button-grid3').onclick = function() {
        gridSize = 3;
        resetGame();
    };
    
    // Restart game with 4 X 4 grid, player mode is retained
    document.getElementById('button-grid4').onclick = function() {
        gridSize = 4;
        resetGame();
    };
     
    // Restart game with 5 X 5 grid, player mode is retained
    document.getElementById('button-grid5').onclick = function() {
        gridSize = 5;
        resetGame();
    };

    // Restart game with human player as pear
    document.getElementById('button-pear').onclick = function() {
        humanPlayer = 'playerX'
        computerPlayer = 'playerO'
        resetGame();
    };
    // Restart game with human player as pickle
    document.getElementById('button-pickle').onclick = function() {
        humanPlayer = 'playerO'
        computerPlayer = 'playerX'
        resetGame();
    };

    // Click handler for squares on board
    window.clickHandler = function(positionArr) {
        if (gameOn) {
            var row = positionArr[0];
            var col = positionArr[1];
            if (!gameBoard[row][col].gamePiece) {
                makePiece(gameBoard, [row, col], currentPlayer);
                gameBoard[row][col].gamePiece.imageURL = imageDict[gameBoard[row][col].gamePiece.playerBelongsTo]
                renderGameBoard(gameBoard);
                var winner = checkWin(gameBoard);
                if (winner === humanPlayer) {
                    winAlert(winner);
                    gameOn = false;
                };

                if (numPlayers === 1) {
                    var emptyArr = getEmptySquares(gameBoard);
                    piece = humanPlayer;
                    currentPlayer = humanPlayer;
                    if (emptyArr.length > 0 && gameOn) {
                        placeRandom(emptyArr);
                    };
                } else if (numPlayers === 2) {
                        row = positionArr[0];
                        col = positionArr[1];
                        currentPlayer = switchPlayer(currentPlayer);
                }
                renderGameBoard(gameBoard);
                var winner = checkWin(gameBoard);

                if (winner === computerPlayer || winner ==='Tie') {
                    winAlert(winner);
                    gameOn = false;
                };
            }
        }
    };
})();