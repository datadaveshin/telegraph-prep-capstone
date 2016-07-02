// Initialize environment
var gameOn = true; // Set to true if game to start upon page loading
var numPlayers = 1
var currentPlayer = 'playerX';

// Start an initial default game upon page loading
(function() {
    window.gameBoard = makeGameBoard(3);
    var scores = resetScores(gameBoard);
    placeFirstRandomPiece();
})();

(function() {
    var gameOn = true;
    var resetGame = function() {
        gameOn = true;
        var width = document.getElementById('width');
        var widthVal = width.value
        var gridSize = Number(widthVal);
        if (![2, 3, 4, 5].includes(gridSize)) {
           widthVal = 3;
        }
        window.gameBoard = makeGameBoard(gridSize);
        resetBoard(gameBoard);
    };

    document.getElementById('button-1player').onclick = function() {
        numPlayers = 1;
        currentPlayer = 'playerX';
        resetGame();
        placeFirstRandomPiece();
        renderGameBoard(gameBoard);
    };
    
    document.getElementById('button-2player').onclick = function() {
        numPlayers = 2;
        currentPlayer = 'playerX';
        resetGame();
        renderGameBoard(gameBoard);
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
                if (winner === 'playerX') {
                    winAlert(winner);
                    gameOn = false;
                };

                if (numPlayers === 1) {
                    var emptyArr = getEmptySquares(gameBoard);
                    piece = 'playerX';
                    currentPlayer = 'playerX';
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

                if (winner === 'playerO' || winner ==='Tie') {
                    winAlert(winner);
                    gameOn = false;
                };
            }
        }
    };
})();