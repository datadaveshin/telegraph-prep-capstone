(function() {
    
    {""
    "THIS IS MY CODE BELOW - I wanted to turn off the first two exercises to get rid of the gamePieces created in those exercises"
    console.log("##################");
    console.log("#### 3_gamePieces ####");
    console.log("Turning off 1_boardBasics and 2_reduceIntro");
    console.log("Must also reinitate a gameBoard as this was done in 1_boardBasics")
    window.gameBoard = makeGameBoard(8);
    console.log("##################");
    }

  // Let's return to our gameBoard now. Step back up to just before we started the reduce mini-sprint to remind yourself what we were doing. 

  // First, note that in this file we still have access to our gameBoard object. This is because in boardBasics.js we put it on the window object. You can test this by trying to print the gameBoard variable to the console:
  // console.log('gameBoard object in gamePieces.js is:', gameBoard);

// ##################
console.log("\n\nSection 3, Part 1");
console.log("just logging out the gameBoard again to prove it is there:");

console.log('gameBoard object in gamePieces.js is:', gameBoard);
// ##################

  // Remember that we'd just used each and filter to find all the gamePieces on the board: "results after filter: [Array[0], Array[0], Array[0], Array[3], Array[0], Array[2], Array[0], Array[0]]" for a gameBoard that has three gamePieces on row 3 and two game pieces on row 5.
  // Having that information scattered throughout a bunch of different arrays seems messy. You can probably think of plenty of cases where we'd want to have all that information collected into a single array. 
    // Wait, that's starting to sound like reduce! We're taking a collection of a bunch of things, and reducing it down to a single thing. 
      // Can you think of a way we could reduce an array filled with arrays to a single array just filled with all the values contained in each subarray? 
      // Hint: what if we tried passing in an empty array as the starting value?

// ##################
console.log("\n\nSection 3, Part 2");
console.log("Returning a flattened array of all objects on the gameBoard by combining filter and reduce:");

flattenedArr = _.reduce(gameBoard, function(memo, next, index, array) {
    var passedArr = _.filter(next, function(squareObj) {
        return squareObj.gamePiece;
    })
    _.each(passedArr, function(item) {
        memo.push(item);
    }) 
    return memo;
},[]);
console.log('The flattened array that contains just the board objects is:', flattenedArr);

// ##################

  // This ends our intro to the capstone project. By this point you should be pretty familiar with the gameBoard, the makePiece function, and all four of the main functional programming tools (each, map, filter, and reduce). From here on out, we're intentionally going to give you less guidance. One of the key skills to be a successful engineer is autonomy in accomplishing tasks that are given to you. We want you to get used to that feeling with these upcoming exercises. 

  // 1. Create an array called piecesToAdd that holds the names of each of the pieces we'll create for each player. For example: ['kuddlyKoala', 'babyDino','babyDino', 'babyDino', 'fierceDragon', 'lazyPanda', 'lazyPanda']

console.log("\n\nSection 3, Number 1:");
console.log("Make an array of pieces to add:");

var piecesToAdd = ['kuddlyKoala', 'babyDino','babyDino', 'kuddlyKoala','fierceDragon', 'lazyPanda', 'lazyPanda', 'fierceDragon'];

var imageDict = {
    babyDino: "http://cs307103.vk.me/v307103801/4aad/kGuRYIMoJnw.jpg",
    fierceDragon: "http://image.rakuten.co.jp/cinemacollection/cabinet/r20141209/sans-224598.jpg",
    lazyPanda: "https://diygeekery.files.wordpress.com/2014/08/panda-square.jpg?w=280&h=280",
    kuddlyKoala: "http://g01.a.alicdn.com/kf/HTB1HurdIXXXXXbVXVXXq6xXFXXX5/-font-b-Koala-b-font-font-b-plush-b-font-toy-13-cm-1-pcs.jpg"        
};

console.log("Here is a piece array:", piecesToAdd);

  // 2. Create an array of the playerNames. For example: ['hermoineGranger', 'graceHopper']

console.log("\n\nSection 3, Number 2:");
console.log("Making an array of player names:");

var playerNames = ['hermoineGranger', 'graceHopper'];

  // 3. Now use two (nested) each loops to add these pieces to the board. Remember that we have the makePiece function!

console.log("\n\nSection 3, Number 3:");
console.log("Adding gamePieces to opposite ends of the board:");

    // Question1: How can you make sure each piece ends up on a different square on the board? 

    "Either ask if the squareObj already has a gamePiece associated to it, or use a loop to add each piece using the index as one of the positions"

    // Question2: What happens when you get to the end of a line? How do you know to start on the first position of the next line? Think if you can use the modulus "%" operator for this. If you're not familiar with the modulus operator, it gives you the remainder from dividing two numbers. So if we divide 12 by 8, that gives us a remainder of 4 (we have 4 left over after taking 8 out of 12). As always, feel free to google around for more information!
    
    "Once the modulus = 0, then we know that we have to reset either row or col index, as the case may be"

    // Question3: How can we line these pieces up on opposite sides of the board?

    "The row variable in the position array will either be 0 for the first row or gameBoard.length for the last row"

    // BEST PRACTICE: Pseudocode the specific steps you'll need to accomplish. This takes a seemingly large and complex task and breaks it down into solvable chunks. 

"1) loop through the player names"
"2) if it is player 1 the row position start will be 0"
"3) Then we loop through the pieces to add, where the col position, will be (index * 2 + 1), so that every other square is filled - being fancy here, we will first check to see if we get to the end, if so, we will advance row position by 1"
"4) I will do the same, for player 2, except the row position will start at gameBoard.length, the column index will be (index * 2), and if we reach the end we subtract 1 from the row variable"
"5) When loading, I will use an image dictionary"


_.each(playerNames, function(playerName, index, array) {
    var row = (index == 0) ? 0 : gameBoard.length - 1 ; // Sets which row to start adding pieces
    var col = (index == 0) ? 1 : 0;
    var colIncrementer = 2; // Loading up every other square
    var rowIncrementer = (index == 0) ? 1 : -1; // Will be used when get to end of row
    // console.log(row, col);
    _.each(piecesToAdd, function(piece, index2, array2){
        if (col > gameBoard.length - 1) {
            col = (index == 0) ? 0 : 1;
            row += rowIncrementer;
        }
        console.log(row, col);
        makePiece(gameBoard, [row, col], piece);
        gameBoard[row][col].gamePiece.imageURL = imageDict[gameBoard[row][col].gamePiece.typeOfPiece];
        col += colIncrementer;
    })
});
// makePiece(gameBoard, [3,5], 'babyDino');
// gameBoard[3][5].gamePiece.imageURL = "http://cs307103.vk.me/v307103801/4aad/kGuRYIMoJnw.jpg";

  // 4. Great! Now we have two fierce opposing armies (or two groups of friends just trying to gather together on the same square for a group hug?!) arranged on the board. It's time to make them look intimidating or pretty for their impending battle or hugfest. 
    // Let's use a couple of our functional programming skills here. We'll chain them together, slowly building up to do some fairly complex operations. 
      // A. Use filter to iterate through a single row, returning an arr of the squareObj in that row that have a gamePiece on them. 

"Since I have already written code that includes images, I will copy the above code and remove the calls to images below - however, if you seee this in the future, run the code directly above by commenting out what is below, and see how I made the pieces line up checkerboard style, with like images across from each other"

_.each(playerNames, function(playerName, index, array) {
    var row = (index == 0) ? 0 : gameBoard.length - 1 ; // Sets which row to start adding pieces
    var col = (index == 0) ? 1 : 0;
    var colIncrementer = 2; // Loading up every other square
    var rowIncrementer = (index == 0) ? 1 : -1; // Will be used when get to end of row
    // console.log(row, col);
    _.each(piecesToAdd, function(piece, index2, array2){
        if (col > gameBoard.length - 1) {
            col = (index == 0) ? 0 : 1;
            row += rowIncrementer;
        }
        console.log(row, col);
        makePiece(gameBoard, [row, col], piece);
        // gameBoard[row][col].gamePiece.imageURL = imageDict[gameBoard[row][col].gamePiece.typeOfPiece];
        col += colIncrementer;
    })
});

console.log("\n\nSection 3, Number 4 A:");
console.log("Removed the images from above exercise, so we can do it their way.");
console.log("First is to use _.filter on a gameBoard row, and return an array containing squareObj's with gamePieces on them.");

console.log("\nmethod 1, just using underscore functions to return a value:");

var objArray = _.filter(gameBoard[0], function(squareObj){
        return squareObj.gamePiece;
    });
console.log("Object Array for gameBoard row 1 (index 0)", objArray);

console.log("\nmethod 2, making a named function for the whole thing so we can pass in a gameBoard row of choice:");

var getObjArray = function(gameBoardRow) {
    var retArray = _.filter(gameBoardRow, function(squareObj){
        return squareObj.gamePiece;
    });
    return retArray;
};

var objArray = getObjArray(gameBoard[0]);
console.log("Object Array for gameBoard row 1 (index 0)", objArray);


      // B. Use map to change each of the objects in the array returned from filter to an array of their positions. Positions are a property saved as a property on each object. Console.log each object to check it out!

console.log("\n\nSection 3, Number 4 B:");
console.log("Make a new _.map based function to take the filter results to return an array of just positions of gamePieces from a gameBoardRow");
console.log("\nmethod 1, just using underscore functions to return a value:");
var positionsArray = _.map(_.filter(gameBoard[0], function(squareObj){
        return squareObj.gamePiece;
    }), function(squareObj2) {
        return squareObj2.position;
    });
console.log('positionsArray', positionsArray);

console.log("\nmethod 2, making a named function for the whole thing so we can pass in a gameBoard row of choice:");
var getPositionsArray = function(gameBoardRow) {
    var retArray = _.map(_.filter(gameBoardRow, function(squareObj){
        return squareObj.gamePiece;
    }), function(squareObj2) {
        return squareObj2.position;
    });
    return retArray;
};

console.log('positionsArray', getPositionsArray(gameBoard[1]));

console.log("\nmethod 3, making a named function that I can use with the previous function:");
var getPositionsArray2 = function(objArray) {
    var retArray = _.map(objArray, function(squareObj) {
        return squareObj.position;
    })
    return retArray;
};
console.log('positionsArray', getPositionsArray2(getObjArray(gameBoard[0])));

      // C. Use each or map to repeat this process on each row in your gameBoard. At this point, you should have an array of subarrays. Each of those subarrays will contain the positions of the squares in a given row that have a gamePiece on them.

console.log("\n\nSection 3, Number 4 C:");
console.log("Make a new _.each based function to take the map and filter results to return a nested list of arrays of the positions of gamePieces from each gameBoardRow");
console.log("\nmethod 1, just using underscore functions to return a value:");

var nestedPositionArr = _.each(gameBoard, function(gameBoardRow) {
    return _.map(_.filter(gameBoardRow, function(squareObj) {
            return squareObj.gamePiece;
        }), function(gamePiece){
            return gamePiece.position;
        });
});
console.log('nestedPositionArr', nestedPositionArr);


console.log("\nmethod 3, making a named function that I can use with the previous function:");

var pumpRows = function(collection, callback) {
// var getRows = function(AGameBoard) {
    var retArray = [];
    _.each(collection, function(row) {
        retArray.push(callback(row));
        // retArray.push(getPositionsArray2(getObjArray(row)));
    });
    return retArray;
};


var getLength = function(arr) {
    return arr.length;
};

// console.log(getRows(gameBoard, getPositionsArray2(getObjArray)));
console.log(pumpRows(gameBoard, function(item){return item.length}));
console.log(pumpRows(gameBoard, getLength));
// console.log(getRows(gameBoard, function(item){getPositionsArray2(getObjArray(item))}));
console.log(pumpRows(gameBoard, getObjArray));
// console.log(getRows(gameBoard, (getPositionsArray2(getObjArray))));
// console.log(getRows(gameBoard, getObjArray(getPositionsArray2)));
console.log(pumpRows(gameBoard, getPositionsArray));

var doubleFunc = function(callback1, callback2) {
    var doubler = function(item) {
        return callback1(callback2(item));
    }
    return doubler;
};

var doit = doubleFunc(getPositionsArray2, getObjArray);

console.log(pumpRows(gameBoard, doit));



var compileArrays = function(collection, callback1, callback2) {
    var retArray = [];
    _.each(collection, function(row) {
        retArray.push(callback1(callback2(row)));
    });
    return retArray;
};
console.log("results of compileArrays:", compileArrays(gameBoard, getPositionsArray2, getObjArray));

      // D. Now, let's use reduce to reduce this down to a single array that contains the position of all the squares we're interested in. 

retArr = [];
_.each(gameBoard, function(gameBoardRow) {

    retArr.push()
})

var flattenArray = function(collection) 
{
    return _.reduce(collection, function (memo, next) 
    {
        memo.push(callback1(callback2(callback3(next))));
        return memo;
    },[]);
};

// console.log("Big Daddy:", flattenArray(gameBoard, compileArrays, getPositionsArray2, getObjArray));

// var something = flattenArray(gameBoard, compileArrays, getPositionsArray2, getObjArray);
var something = flattenArray(compileArrays(gameBoard, getPositionsArray2, getObjArray));

      // E. Whew! You've now used all four of the canonical functional programming functions! Great job getting here. Now we have a single array that holds the position of all the gamePieces. Let's use each to go through that array and do something for each item in that array. Except we're going to use it in a slightly creative way (yay for creativity in programming! And here my momma thought I'd never be an artist.). We're just going to use each item in the positionsArray as information to go find the gamePiece at that position. Then, once we have those gamePieces, let's add an imageURL to each gamePiece so we can see the gamePieces on the board. 
        // imageURL is just a property on each object. All you need to do is add a link to an image. If you haven't done this before, you can right click on any image online, and get a link to that image. Set the imageURL property equal to that string, and voila! Your image will appear on the screen. 

  // 5. Use filter to grab all gamePieces of the same type, and then use each to iterate through them and set their movement descriptions. Don't worry about building out the logic of how you'd make them move- for now just have fun coming up with moves you'd want your various pieces to do. For example, maybe scaredKitty goes and hides in the corner, and impetuousDragon frequently flies off and leaves the board entirely. 

  // 6. Use reduce to create an object that has a tally of all our gamePieces. For example, the result might be: 
  // { babyDino: 3,
  //   impetutousDragon: 2,
  //   scaredKitty: 4,
  //   hobblingPirate:8,
  //   groupHuggers:12 }
    // You should be able to do this from scratch by just using reduce inside of another reduce if you're feeling ambitious!

  // CARRY ON...
  // You're doing great!!! Go ahead and check out the file called '4_gamePlay.js' in the yourOwnGame folder for more fun!
})();
