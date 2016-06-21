(function() {
    var gameOn = false;
    window.gameBoard = makeGameBoard(3, 3);
    var scores = resetScores(gameBoard);
    console.log("scores is", scores);

    // Reset game if new game button is clicked
    document.getElementById('button0').onclick = function() {
        gameOn = true;
        var width = document.getElementById('width');
        var widthVal = width.value
        widthVal = Number(widthVal);
        if (![2, 3, 4, 5].includes(widthVal)) {
            widthVal = 3;
        }

        // Uncomment below to make board asymmetric
        // var height = document.getElementById('height');
        // var heightVal = height.value;
        // heightVal = Number(heightVal);
        // if (![2, 3, 4, 5].includes(heightVal)) {
        //     heightVal = 3;
        // }

        // Toggle lines below to make board asymmetric
        window.gameBoard = makeGameBoard(widthVal, widthVal); // symmetric   
        // window.gameBoard = makeGameBoard(widthVal, heightVal); // asymmetric

        resetBoard(gameBoard);
        renderGameBoard(gameBoard);
    };

    // Click handler for squares on board
    console.log('gameOn', gameOn)
    window.clickHandler = function(positionArr) {
        if (gameOn) {
            var piece = 'babyDino';
            var player = 'playerX'
            var row = positionArr[0];
            var col = positionArr[1];
            // Test
            console.log('the user clicked on square:', gameBoard[row][col]);
            if (!gameBoard[row][col].gamePiece) {
                makePiece(gameBoard, [row, col], piece, player);
                gameBoard[row][col].gamePiece.imageURL = imageDict[gameBoard[row][col].gamePiece.typeOfPiece]
                renderGameBoard(gameBoard);
                var winner = checkWin(gameBoard);
                // Test
                console.log("CHECKWIN STATE", winner);
                if (winner === 'playerX') {
                    alert('Winner is: ' + winner);
                    gameOn = false;
                };
                var emptyArr = getEmptySquares(gameBoard);
                if (emptyArr.length > 0 && gameOn) {
                    placeRandom(emptyArr);
                }
                // Test
                console.log("emptyArr", emptyArr);
                console.log("WINNER = ", winner);
                console.log(getBoardDim(gameBoard));
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