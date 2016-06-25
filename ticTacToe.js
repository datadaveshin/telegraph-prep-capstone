var gameOn = true; // Set to true if game to start upon page loading
var players = 1
// var piece = 'playerX';
var currentPlayer = 'playerX';

var placeFirstRandomPiece = function () {
    // getBoardDim
    // makePiece(gameBoard, randomEmptyPos, 'playerO', 'playerO');
    // gameBoard[randomEmptyPos[0]][randomEmptyPos[1]].gamePiece.imageURL = imageDict[gameBoard[randomEmptyPos[0]][randomEmptyPos[1]].gamePiece.typeOfPiece]
                    var emptyArr = getEmptySquares(gameBoard);
                if (emptyArr.length > 0 && gameOn) {
                    placeRandom(emptyArr);
                };
};

(function(){
    window.gameBoard = makeGameBoard(3);
    var scores = resetScores(gameBoard);
    placeFirstRandomPiece();
    // setNumPlayers(1);
    // renderGameBoard(gameBoard);
    console.log("function1 is on")
})();


(function() {
    var gameOn = true;
    // Initialize game
    // var gameOn = true; // Set to true if game to start upon page loading
    // window.gameBoard = makeGameBoard(3);
    // var scores = resetScores(gameBoard);
    // renderGameBoard(gameBoard);
    // Test
    // console.log("scores is", scores);

    var resetGame = function() {
        gameOn = true;
        var width = document.getElementById('width');
        var widthVal = width.value
        var gridSize = Number(widthVal);
        if (![2, 3, 4, 5].includes(gridSize)) {
           widthVal = 3;
        }
        // var gridSize = 3

        window.gameBoard = makeGameBoard(gridSize);
        resetBoard(gameBoard);

    };

    document.getElementById('button-1player').onclick = function() {
        players = 1;
        piece = 'playerX';
        currentPlayer = 'playerX';
        resetGame();
        placeFirstRandomPiece();
        renderGameBoard(gameBoard);
    };
    document.getElementById('button-2player').onclick = function() {
        players = 2;
        resetGame();
        renderGameBoard(gameBoard);
    };

    // New game button resets game
    // document.getElementById('button-1player').onclick = function() {
    //     gameOn = true;
    //     var width = document.getElementById('width');
    //     var widthVal = width.value
    //     widthVal = Number(widthVal);
    //     if (![2, 3, 4, 5].includes(widthVal)) {
    //         widthVal = 3;
    //     }
    //     window.gameBoard = makeGameBoard(widthVal, widthVal);
    //     resetBoard(gameBoard);
    //     renderGameBoard(gameBoard);
    // };
    // Test
    // console.log('gameOn', gameOn)

    // Click handler for squares on board
    window.clickHandler = function(positionArr) {
        if (gameOn) {
            console.log("the number of players", players);


            var row = positionArr[0];
            var col = positionArr[1];
            // TEST
            console.log('the user clicked on square:', gameBoard[row][col]);
            if (!gameBoard[row][col].gamePiece) {
                makePiece(gameBoard, [row, col], currentPlayer);
                gameBoard[row][col].gamePiece.imageURL = imageDict[gameBoard[row][col].gamePiece.playerBelongsTo]
                renderGameBoard(gameBoard);
                var winner = checkWin(gameBoard);
                // TEST
                // console.log("CHECKWIN STATE", winner);
                if (winner === 'playerX') {
                    alert('Winner is: ' + winner);
                    gameOn = false;
                };
                // Test
                console.log("outer click handler, player is", currentPlayer)
                if (players === 1) {
                    var emptyArr = getEmptySquares(gameBoard);
                    piece = 'playerX';
                    currentPlayer = 'playerX';
                    if (emptyArr.length > 0 && gameOn) {
                        placeRandom(emptyArr);
                    };
                } else if (players === 2) {
                    // window.clickHandler = function(positionArr) {
                        // Test
                        console.log("Inner click handler, player is", currentPlayer)
                        // piece = 'currentPlayerO';
                        // currentPlayer = 'playerO';
                        row = positionArr[0];
                        col = positionArr[1];
                        // if (!gameBoard[row][col].gamePiece) {
                            // makePiece(gameBoard, [row, col], piece, currentPlayer);
                            // gameBoard[row][col].gamePiece.imageURL = imageDict[gameBoard[row][col].gamePiece.typeOfPiece]
                            // renderGameBoard(gameBoard);
                            currentPlayer = switchPlayer(currentPlayer);
                            piece = switchPiece(piece);
                            // piece = 'playerX';
                            // currentPlayer = 'playerX';
                            console.log("I'm here!!!")

                        // }
                    // break 
                    // }
                }

                // TEST
                // console.log("emptyArr", emptyArr);
                // console.log("WINNER = ", winner);
                // console.log(getBoardDim(gameBoard));
                // console.log("scores is", scores);
                console.log(gameBoard);
                renderGameBoard(gameBoard);
                var winner = checkWin(gameBoard);
                if (winner === 'playerO') {
                    alert('Winner is: ' + winner);
                    gameOn = false;
                }; 
                if (winner === 'Tie') {
                    alert('Winner is: ' + winner);
                    gameOn = false;
                };
            }
        }
    };
})();