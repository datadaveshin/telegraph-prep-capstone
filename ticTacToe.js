(function() {
    // Initialize game
    var gameOn = true; // Set to true if game to start upon page loading
    window.gameBoard = makeGameBoard(3);
    var scores = resetScores(gameBoard);
    // Test
    // console.log("scores is", scores);

    // New game button resets game
    document.getElementById('button0').onclick = function() {
        gameOn = true;
        var width = document.getElementById('width');
        var widthVal = width.value
        widthVal = Number(widthVal);
        if (![2, 3, 4, 5].includes(widthVal)) {
            widthVal = 3;
        }
        window.gameBoard = makeGameBoard(widthVal, widthVal);
        resetBoard(gameBoard);
        renderGameBoard(gameBoard);
    };
    // Test
    // console.log('gameOn', gameOn)

    // Click handler for squares on board
    window.clickHandler = function(positionArr) {
        if (gameOn) {
            var piece = 'pieceX';
            var player = 'playerX'
            var row = positionArr[0];
            var col = positionArr[1];
            // TEST
            // console.log('the user clicked on square:', gameBoard[row][col]);
            if (!gameBoard[row][col].gamePiece) {
                makePiece(gameBoard, [row, col], piece, player);
                gameBoard[row][col].gamePiece.imageURL = imageDict[gameBoard[row][col].gamePiece.typeOfPiece]
                renderGameBoard(gameBoard);
                var winner = checkWin(gameBoard);
                // TEST
                // console.log("CHECKWIN STATE", winner);
                if (winner === 'playerX') {
                    alert('Winner is: ' + winner);
                    gameOn = false;
                };
                var emptyArr = getEmptySquares(gameBoard);
                if (emptyArr.length > 0 && gameOn) {
                    placeRandom(emptyArr);
                };
                // TEST
                // console.log("emptyArr", emptyArr);
                // console.log("WINNER = ", winner);
                // console.log(getBoardDim(gameBoard));
                // console.log("scores is", scores);
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