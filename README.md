# telegraphPrepCapstone
Capstone Project for Telegraph Prep course!


[<img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" />](http://creativecommons.org/licenses/by/4.0/)<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">
Telegraph Prep Curriculum by [Telegraph Academy](http://www.telegraphacademy.com/prep/) is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

# Tic Tac Toe Game

For my nieces, I decided to make a Tic Tac Toe game.
Telegraph Prep provided .css, .html files, along with some helper methods in the helperFunctions.js file.
They basically provided an 8 x 8 rendered game board, and a click handler that would return the position of the board that the mouse clicked.

## Version 1
### The Game
A basic playable Tic Tac Toe game. 
In this version, you play against the computer. 
To make it fun for the kids, I let the computer choose it's square by random, which, I find for a 3 x 3 board, actually provides enough challenge for children - they can win!

I also made the board expandable to a 4 x 4 or 5 x 5 grid. 

###New files and Edits
####index.html file 
Added a field to choose the board size.
Added a reset game button.

####helperFunctionsTicTacToe.js	
Copied over the helperFunctions.js file and made one specific for this game.
Added in helper functions to do things such as check the game state, etc.

####ticTacToe.js
Has the code for the game.

####Other files
The other files had some practice exercises they provided to get to learn how the board works.

# Plans

## Version 2
Make version that has the option of 1 o2 two players.

## Version 3
The next version will incorporate some "AI". I will use Monte Carlo simulations and a scoring function to allow the computer player to make better moves. I'm choosing Monte Carlo over say a minimax algorithm, because it should be easy to set "skill" levels by changing the number of trials.




