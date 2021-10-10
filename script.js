const gameBoard = {
    board: ["", "", "", "", "", "", "", "", ""],
    fillBoard: function(){
        for (let i=0; i<this.board.length; i++){
            let box = document.createElement("button")
            box.classList.add("box");
            box.id = "box" + i;
            dom_gameboard.appendChild(box);

            box.addEventListener("click", function(x){
                if (playerOne.turn){
                    p.textContent = playerOne.type;
                    playerOne.turn = false;
                    playerTwo.turn = true;
                    box.disabled = true;
                    //update board
                    gameBoard.update();
                } else{
                    p.textContent = playerTwo.type;
                    playerTwo.turn = false;
                    playerOne.turn = true;
                    box.disabled = true;
                    gameBoard.update();
                }
                
            });

            let p = document.createElement("p");
            p.classList.add("square-text")
            p.id = "p" + i;
            p.textContent = this.board[i];
            box.appendChild(p);
        }
    },

    update: function(){
        for (i=0; i<this.board.length; i++){
            let selectedBox = document.getElementById("p" + i);
            this.board[i] = selectedBox.textContent;
        };
        gameBoard.checkWin();
    },
  

    checkWin: function(){
        let winBoard = [];
        for (i=0; i<this.board.length; i++){
            winBoard[i] = this.board[i];
        }
        winBoard.forEach(function(value, index){
            if (winBoard[index] !== "X" && winBoard[index] !== "O"){
                winBoard[index] = index;
            } 
        }, this)

        if (winBoard[0] == winBoard[1] && winBoard[1] == winBoard[2] ||
            winBoard[3] == winBoard[4] && winBoard[4] == winBoard[5] ||
            winBoard[6] == winBoard[7] && winBoard[7] == winBoard[8] ||
            winBoard[0] == winBoard[3] && winBoard[3] == winBoard[6] ||
            winBoard[1] == winBoard[4] && winBoard[4] == winBoard[7] ||
            winBoard[2] == winBoard[5] && winBoard[5] == winBoard[8] ||
            winBoard[0] == winBoard[4] && winBoard[4] == winBoard[8] ||
            winBoard[2] == winBoard[4] && winBoard[4] == winBoard[6]){
            for (i=0; i<this.board.length; i++){
                let x = document.getElementById("box" + i);
                x.disabled = true;
            }
        
            if (playerOne.turn){
                winBox.textContent = playerOne.name + " Wins!"
            } else{
                winBox.textContent = playerTwo.name + " Wins!"
            }
            
            main.appendChild(winBox);
            return;
        }
        let newBoard = this.board.filter(word => word == "X" || word == "O");
        if (newBoard.length == 9){
            
            for (i=0; i<this.board.length; i++){
                let x = document.getElementById("box" + i);
                x.disabled = true;
            }
            winBox.textContent = "TIE"
        }
    },
    restart: function(){
        for (i=0; i<this.board.length; i++){
            let x = document.getElementById("box" + i);
            x.remove();
        }
        console.log("Hi");
        
        winBox.textContent = "";

        this.board = ["", "", "", "", "", "", "", "", ""];
        gameBoard.fillBoard();
    },
}


const Player = (type, turn, name) => {
    this.type = type;
    this.turn = turn;
    this.name = name;
    
    return {type, turn, name};
}
let restartButton = document.getElementById("restart");
let player1slot = document.getElementById("player1");
let player2slot = document.getElementById("player2");

let playerPrompt1 = prompt("Enter Player 1 Name");
let playerPrompt2 = prompt("Enter Player 2 Name");

let main = document.querySelector("main")
let dom_gameboard = document.getElementById("gameboard");
const playerOne = Player("X", true, playerPrompt1);
const playerTwo = Player("O", false, playerPrompt2);

winBox = document.getElementById("winBox");

player1slot.textContent = playerPrompt1;
player2slot.textContent = playerPrompt2;

restartButton.addEventListener("click", function(){
    gameBoard.restart();
})


gameBoard.fillBoard();