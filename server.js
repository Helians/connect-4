import express from 'express';

const app = express();

const PORT = process.env.PORT || 3030;

// game board
let gameBoard;

// player variables
let currPlayer;
let currPlayerValue;

// move status --> Valid or Invalid
let moveStatus;
let gameStatus;

// yellow represents = 0
// red represents = 1
// empty represents -1

// reset game
const resetGame = () => {
    currPlayer = "Yellow";
    currPlayerValue = 0;
    gameBoard = [];
    for (let i = 0; i < 6; i++) {
        const row = [-1, -1, -1, -1, -1, -1, -1];
        gameBoard.push(row);
    }
    displayBoard(gameBoard);
}

// push color to board
const pushColorToGameBoard = (board, move, playerValue) => {
    for (let i = 0; i < 6; i++) {
        if (board[i][move] == -1) {
            board[i][move] = playerValue;
            return;
        }
    }
}

// display board
const displayBoard = (board) => {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            process.stdout.write(board[i][j] + "   ");
        }
        process.stdout.write("\n");
    }
}

// validate the move
const validateMove = (board, move) => {
    const isValidMove = !isNaN(move) && move >= 0 && move <= 6;
    if (isValidMove) {
        for (let i = 0; i < 6; i++) {
            if (board[i][move] == -1) {
                return true
            }
        }
    }
    return false;
}

// check the winner
const checkWinning = (currBoard) => {

    let countY;
    let countR;

    // horizontal
    for (let i = 0; i < 6; i++) {
        countY = 0;
        countR = 0;
        for (let j = 0; j < 7; j++) {
            if (currBoard[i][j] == 0) {
                countY += 1;
            } else if (currBoard[i][j] == 1) {
                countR += 1;
            }
            if (countY == 4) {
                return "Yellow";
            }
            if (countR == 4) {
                return "Red";
            }
            if (countY > 0 && countR > 0) {
                countY = 0;
                countR = 0;
            }
        }
    }

    // vertical
    for (let i = 0; i < 7; i++) {
        countY = 0;
        countR = 0;
        for (let j = 0; j < 6; j++) {
            if (currBoard[j][i] == 0) {
                countY += 1;
            } else if (currBoard[j][i] == 1) {
                countR += 1;
            }
            if (countY == 4) {
                return "Yellow";
            }
            if (countR == 4) {
                return "Red";
            }
            if (countY > 0 && countR > 0) {
                countY = 0;
                countR = 0;
            }
        }
    }

    // diagonal left to right top
    for (let i = 3; i < 6; i++) {
        countY = 0;
        countR = 0;
        for (let j = 0, k = i; j < 7, k >= 0; j++ , k--) {
            if (currBoard[k][j] == 0) {
                countY += 1;
            } else if (currBoard[k][j] == 1) {
                countR += 1;
            }
            if (countY == 4) {
                return "Yellow";
            }
            if (countR == 4) {
                return "Red";
            }
            if (countY > 0 && countR > 0) {
                countY = 0;
                countR = 0;
            }
        }
    }

    for (let j = 1; j < 4; j++) {
        countY = 0;
        countR = 0;
        for (let i = 5, k = j; i >= 0, k < 7; i-- , k++) {
            if (currBoard[i][k] == 0) {
                countY += 1;
            } else if (currBoard[i][k] == 1) {
                countR += 1;
            }
            if (countY == 4) {
                return "Yellow";
            }
            if (countR == 4) {
                return "Red";
            }
            if (countY > 0 && countR > 0) {
                countY = 0;
                countR = 0;
            }
        }
    }

    // diagonal left to right bottom
    for (let i = 2; i >= 0; i--) {
        countY = 0;
        countR = 0;
        for (let j = 0, k = i; j < 7, k < 6; j++ , k++) {
            if (currBoard[k][j] == 0) {
                countY += 1;
            } else if (currBoard[k][j] == 1) {
                countR += 1;
            }
            if (countY == 4) {
                return "Yellow";
            }
            if (countR == 4) {
                return "Red";
            }
            if (countY > 0 && countR > 0) {
                countY = 0;
                countR = 0;
            }
        }
    }

    for (let j = 1; j < 5; j++) {
        countY = 0;
        countR = 0;
        for (let i = 0, k = j; i < 6, k < 7; i++ , k++) {
            if (currBoard[i][k] == 0) {
                countY += 1;
            } else if (currBoard[i][k] == 1) {
                countR += 1;
            }
            if (countY == 4) {
                return "Yellow";
            }
            if (countR == 4) {
                return "Red";
            }
            if (countY > 0 && countR > 0) {
                countY = 0;
                countR = 0;
            }
        }
    }

    return "None";
}

// check draw
const checkDraw = (currBoard) => {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (currBoard[i][j] == -1) {
                return false;
            }
        }
    }
    return true;
}

// home api
app.get('/', (req, res) => {
    res.status(200).redirect("/start");
});

// start api
app.get('/start', (req, res, next) => {
    resetGame();
    console.log("Game reset: Yellow move");
    next();
}, (req, res) => {
    res.status(200).send("Ready");
});

// move api
app.get('/:move', (req, res, next) => {
    try {
        const move = Number(req.params.move);
        const isValidMove = validateMove(gameBoard, move);
        if (!isValidMove) {
            moveStatus = "Invalid";
            displayBoard(gameBoard);
            console.log(`${moveStatus} Move: Now, ${currPlayer} turn`);
            next();
        } else {
            moveStatus = "Valid";
            pushColorToGameBoard(gameBoard, move, currPlayerValue);
            displayBoard(gameBoard);
            const winner = checkWinning(gameBoard);
            console.log("Winner: " + winner);
            if (winner != "None") {
                gameStatus = "Win";
                resetGame();
            } else {
                if (checkDraw(gameBoard)) {
                    gameStatus = "Draw";
                    console.log(`${moveStatus} Move: Draw: Game Over`);
                } else {
                    if (currPlayer == "Yellow") {
                        currPlayer = "Red";
                        currPlayerValue = 1;
                    } else {
                        currPlayer = "Yellow";
                        currPlayerValue = 0
                    }
                    console.log(`${moveStatus} Move: Now, ${currPlayer} turn`);
                }

            }
        }
        next();
    } catch (e) {
        res.status(400).send("Something went wrong, Please start the game and then make a move. To start the game go to: ' / ' ");
    }
}, (req, res) => {
    if (moveStatus == "Invalid") {
        res.status(422).send(`${moveStatus}`);
    } else if (gameStatus == "Draw") {
        res.status(200).send("Draw: Game Over");
    }
    else if (gameStatus == "Win") {
        res.status(200).send(`${currPlayer} wins`);
    } else {
        res.status(200).send(`${moveStatus}`);
    }
});

// listener
app.listen(PORT, () => {
    console.log(`server is started at port ${PORT} to play connect 4`);
});