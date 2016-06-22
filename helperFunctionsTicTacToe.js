var makeGameBoard = function(boardSizeRows, boardSizeColumns) {
    // Comment out to make boards asymmetric
    boardSizeColumns = boardSizeRows;
  var board = [];
  var color = getRandomColor();
  // Board is an array of arrays. console.log it to investigate it further!
  for(var i = 0; i < boardSizeRows; i++) {
    var row = [];
    for(var j = 0; j < boardSizeColumns; j++) {
      //each square (position on the board) is represented by an object. 
      var square = {
        position: [i, j],
        color: color,
        gamePiece: '', // This is the property that will contain our gamePiece object if one is on that square. 
        text: ''
      };
      row.push(square);
    }
    board.push(row);
  }
  return board;
};
 
var renderGameBoard = function(gameBoard) {
  $('.gameBoard').html('');
  var boardSize = gameBoard.length;
  // we scale the gameBoard to the user's screen. First we find which is smaller, the height or width of the user's browser
  var browserSize = Math.min($(window).height(), $(window).width());
  $('.gameBoard').width(browserSize - 200);
  // then we leave some room around the edges (200 pixels), and divide by the number of squares to find how large the squares should be to fill that space perfectly.
  var squareSize = (browserSize - 200) / boardSize - 2;
  gameBoard.forEach(function(rowArr, rowIndex) {
    rowArr.forEach(function(squareObj, columnIndex) {
      // Here we are creating the HTML that will be rendered to the DOM for each square. 
      // HTML and JS play nicely together; you can just create a string with most of the characters that you need, add in some variables dynamically, and then when you render this to the DOM, it will interpret everything to be HTML elements and display them correctly. 
      // We're creating a <div>, which is just a default html container that we can do whatever we want with (similar to an object in JS).
      // We can then set "properties" on this html element. In this case, we're setting style properties to tell it how it should look on the screen.  
        // Those style properties include it's size (height and width) in pixels (px). 
        // We're setting it's background color to be the color of that squareObj. 
      // To keep track of which square this is (necessary for figuring out which square was clicked on later), we set a data "property" on each square as well. 
      // Inside of each div, we can put whatever text we want! Or none at all- it doesn't care. So we put in the text from the object at that position, if one exists. 
      // OPTIONAL: You can change what gets rendered for each square. Want to display the name differently? Feel free to modify the code below to do what you want!
      if(squareObj.gamePiece && squareObj.gamePiece.imageURL) {
        var squareHtml = '<img src="' + squareObj.gamePiece.imageURL + '" class="gameSquare" style="height:' + squareSize + 'px; width:' + squareSize + 'px" data-position="[' + rowIndex + ',' + columnIndex + ']">'
      } else {
        var squareText = '';
        if(squareObj.gamePiece) {
          squareText = squareObj.gamePiece.name;
        }
        var squareHtml = '<div class="gameSquare" style="background-color:' + squareObj.color + '; height:' + squareSize + 'px; width:' + squareSize + 'px" data-position="[' + rowIndex + ',' + columnIndex + ']">' + squareText + '</div>';
      }
      $('.gameBoard').append(squareHtml);
    });
  });
}


// NOTE: You have to uncomment these lines to make program invoke the clickHandler function you're building out in yourOwnGame.js. 
$(document).on('click', '.gameSquare', function() {
  clickHandler($(this).data('position'));
});


//here we're going to keep track of the count of all pieces added to our gameBoard. 
var totalPieceCount = {};

//initialPosition should be an array with two numbers in it. 
  // those numbers should specify the 0-indexed row and column you want this piece to start at. 
  // example: [1,3] would put the piece on the second row (remember we're 0-indexed) in the 4th column. 
var makePiece = function(gameBoard, initialPosition, pieceType, playerBelongsTo) {
    // make sure this piece is counted in our totalPieceCount object. 
    if(totalPieceCount[pieceType]) {
        totalPieceCount[pieceType]++;
    } else {
        totalPieceCount[pieceType] = 1;
    }

    // default player to Player1 if no player name is passed in, then defines a unique name for this gamePiece
    playerBelongsTo = playerBelongsTo || 'Player1';
    var pieceName = playerBelongsTo + ' ' + pieceType + ' #' + totalPieceCount[pieceType];

    var gamePiece = {
        movementDescription: 'use words to describe how this piece moves so your users can understand what their options are',
        collisionDescription: 'use words to explain what happens when this piece collides with another',
        name: pieceName,
        typeOfPiece: pieceType,
        imageURL: '',
        playerBelongsTo: playerBelongsTo  // if you have a game with two (or more?!) players playing against each other, you'll want to specify which player this piece belongs to
    }

    var row = initialPosition[0];
    var column = initialPosition[1];

    gameBoard[row][column].gamePiece = gamePiece;

    return gamePiece;
};

/* ######################################
MY TIC TAC TOE SPECIFIC HELPER FUNCTIONS
#########################################*/

var getRandomColor = function() {
    // http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    };
    return color;
};

var resetBoard = function(board) {
    // Resets each squareObj to having a new color and each gamePiece as empty
    var newColor = getRandomColor()
    _.each(board, function(boardRow) {
        _.each(boardRow, function(squareObj) {
            squareObj.color = newColor;
            squareObj.gamePiece = '';
        })
    })
};

var getBoardDim = function(board) {
    // Toggle for symmetric or asymmetric boards
    return board.length // symmetric
    // return [board.length, board[0].length]; //asymmetric
};

var resetScores = function (board) {
    var scoreArr = [];
    _.each(board, function(boardRow) {
        var innerArr = [];
        _.each(boardRow, function(squareObj){
            innerArr.push(0);
        });
    scoreArr.push(innerArr);
    });
    return scoreArr;
};

var getEmptySquares = function(board) {
    var emptyArr = [];
    _.each(board, function(boardRow) {
        _.each(boardRow, function(squareObj) {
            if (!squareObj.gamePiece) {
                emptyArr.push(squareObj.position);
            }
        })
    });
    return emptyArr; 
};

var checkWin = function(board) {
    // Initialize an array
    linesArr = [];

    // Add rows gamepiece array to lines array
    _.each(board, function(boardRow){ 
       var pieceArray = _.filter(boardRow, function(squareObj) {
           return squareObj.gamePiece;
       })
       linesArr.push(pieceArray);
    });

    // Add column gamepiece arrays to lines array
    for (var i = 0; i < board[0].length; i++) {
        var pieceArray = [];
        _.each(board, function(boardRow) {
            if (boardRow[i].gamePiece) {
                pieceArray.push(boardRow[i]);
            };
        })
        linesArr.push(pieceArray);
    };

    // Add diagonal gamePiece arrays to lines array
    boardDim = getBoardDim(board);
    console.log('boardDimdddddd', boardDim);
    diag1 = [];
    diag2 = [];
    for (var i = 0; i < boardDim; i++) {
        console.log("board ii", board[i][i]);
        if (board[i][i].gamePiece) {
            diag1.push(board[i][i]);
        }
        if (board[boardDim - i - 1][i].gamePiece) {
            diag2.push(board[boardDim - i - 1][i]);
        }
    };
    linesArr.push(diag1, diag2);

    // Filter linesArr for a full Line
    fullLineArr = _.filter(linesArr, function(arr) {
        console.log("arrlength and boardDim", arr.length, boardDim);
        return arr.length == boardDim;
    });
    console.log('fullLineArr:', fullLineArr);
    // TODO NEXT - SEE if ITEMS in lengthARR match!!!!
     
    // Check for winners

    if (fullLineArr.length == 0) { 
        return "noWinner";
    };
    
    var playerWon = function(fullLineArr) {
        var retWinner = 'keepGoing';
        _.each(fullLineArr, function(lineArr) {
            if (lineArr.length === _.filter(lineArr, function(item) {
                return lineArr[0].gamePiece.playerBelongsTo === item.gamePiece.playerBelongsTo
                }).length) {
                console.log("HERE~~~~~~~~~~~~~~~~~~~~~~")
                console.log(lineArr[0].gamePiece.playerBelongsTo)
                retWinner = lineArr[0].gamePiece.playerBelongsTo
                // winAlert(lineArr[0].gamePiece.playerBelongsTo)
                return retWinner;
            }
    
        })
    return retWinner;   
    }
    playerWon1 = playerWon(fullLineArr)

    if (playerWon1 === "playerX") {
        return "playerX"
    };

    if (playerWon1 === "playerO") {
        return "playerO"
    };

    console.log("Player won", playerWon1)

    var emptyArr = getEmptySquares(board) 
    if (emptyArr.length === 0) {
        // winAlert("tie");
        return "Tie";
    };
};

var placeRandom = function(emptyArr) {
    var randomEmptyPos = emptyArr[_.random(emptyArr.length - 1)];
    console.log('randomPos', randomEmptyPos)
    makePiece(gameBoard, randomEmptyPos, 'fishO', 'playerO');
    gameBoard[randomEmptyPos[0]][randomEmptyPos[1]].gamePiece.imageURL = imageDict[gameBoard[randomEmptyPos[0]][randomEmptyPos[1]].gamePiece.typeOfPiece]
};

var winAlert = function(gameState) {
    if (gameState !== 'noWinner') {
        alert('Winner is: ' + gameState);
        gameOn = false;
    }
};

var imageDict = {
    fishX: "images/fruitsAndVeggies/expressions-francaises-1300612_1280.png",
    fishO: "images/fruitsAndVeggies/expressions-francaises-1300615_1280.png"
};

// var imageDict = {
//     // This points to images for each character;
//     babyDino: "http://cs307103.vk.me/v307103801/4aad/kGuRYIMoJnw.jpg",
//     // babyDino: "animal-1292994_960_720.png",
//     // fierceDragon: "http://image.rakuten.co.jp/cinemacollection/cabinet/r20141209/sans-224598.jpg",
//     lazyPanda: "https://diygeekery.files.wordpress.com/2014/08/panda-square.jpg?w=280&h=280",
//     // kuddlyKoala: "http://g01.a.alicdn.com/kf/HTB1HurdIXXXXXbVXVXXq6xXFXXX5/-font-b-Koala-b-font-font-b-plush-b-font-toy-13-cm-1-pcs.jpg"
//     // set1: ["images/]
// };

var setPieceImg = function() {
    var imageDict = {
        // This points to images for each character;
        // babyDino: "http://cs307103.vk.me/v307103801/4aad/kGuRYIMoJnw.jpg",
        // babyDino: "animal-1292994_960_720.png",
        // fierceDragon: "http://image.rakuten.co.jp/cinemacollection/cabinet/r20141209/sans-224598.jpg",
        // lazyPanda: "https://diygeekery.files.wordpress.com/2014/08/panda-square.jpg?w=280&h=280",
        // kuddlyKoala: "http://g01.a.alicdn.com/kf/HTB1HurdIXXXXXbVXVXXq6xXFXXX5/-font-b-Koala-b-font-font-b-plush-b-font-toy-13-cm-1-pcs.jpg"
        // set1: ["images/]
    };
}

// Returns two images for player X and player O
