var testObj1 = {one: 1}
var testObj2 = {one: 1}
var assert = function(arg, message) {
    if (!arg) {
        console.log(message)
    }
    else {
        console.log("TEST PASSED")
    }
} 

var assertIsEqual = function(arg1, arg2, message) {
    if (JSON.stringify(arg1) !== JSON.stringify(arg2)) {
        console.log(message);
    }
    else {
        console.log("TEST PASSED");
    }
}

assertIsEqual(testObj1, testObj2, 'should return true')

console.log(gameBoard);
var newClone = cloneBoard(gameBoard);
console.log(newClone
    );
assertIsEqual(gameBoard, newClone, 'should return a similar board');

