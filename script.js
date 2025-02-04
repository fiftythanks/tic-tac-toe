function startGame() {
  const getGameboard = (function() {
    let gameboard = [];
    for (let i = 0; i < 3; i++) { 
      let row = ["", "", ""];
      gameboard.push(row);
    }
    return gameboard;
  })();

  function getPlayer(name, mark) {
    return {
      name: name,
      mark: mark,
    };
  }


  function mark(row, col) {
    if (!this.win) {
      row = --row;
      col = --col;
      let gameboard = this.gameboard;
      if (gameboard[row][col] === "") {
        gameboard[row][col] = this.turn.mark;
        if (this.turn === this.player1) {
          this.turn = this.player2;
        } else if (this.turn === this.player2) {
          this.turn = this.player1;
        }
        renderBoard.call(game);
      } else {  
        return console.log(`This cell is already marked with ${gameboard[row][col]}`);
      }

      // checks the board for patterns to determine if the game should be over after the just made turn. The arrow function is chosen because I use "this" (meaning the gameflow object) a lot and figured it would be a good choice
      (() => {
        // check diagonals
        let mark = gameboard[0][0];
        if (mark) {
          for (let i = 1; i < 3; i++) {
              if (gameboard[i][i] !== mark) break;
            if (i === 2) {
              if (this.player1.mark === mark) {
                this.win = this.player1.name;
              } else if (this.player2.mark === mark) {
                this.win = this.player2.name;
              }
              document.querySelector(".turn").textContent = `${this.win} win!`;
              return console.log(`${this.win} win!`);
            }
          }
        }
        mark = gameboard[2][0];
        if (mark) {
          for (let i = 1; i >= 0; i--) {
            if (gameboard[i].at(-(i + 1)) !== mark) break;
            if (i === 0) {
              if (this.player1.mark === mark) {
                this.win = this.player1.name;
              } else if (this.player2.mark === mark) {
                this.win = this.player2.name;
              }
              document.querySelector(".turn").textContent = `${this.win} win!`;
              return console.log(`${this.win} win!`);
            };
          }
        }

        // check rows and columns
        for (let i = 0; i < 3; i++) {
          // rows
          mark = gameboard[i][0];
          if (mark) {
            for (let j = 1; j < 3; j++) {
              if (gameboard[i][j] !== mark) break;
              if (j === 2) {
                if (this.player1.mark === mark) {
                  this.win = this.player1.name;
                } else if (this.player2.mark === mark) {
                  this.win = this.player2.name;
                }
                document.querySelector(".turn").textContent = `${this.win} win!`;
                return console.log(`${this.win} win!`);
              };
            }
          }

          // columns
          mark = gameboard[0][i];
          if (mark) {
            for (let j = 1; j < 3; j++) {
              if (gameboard[j][i] !== mark) break;
              if (j === 2) {
                if (this.player1.mark === mark) {
                  this.win = this.player1.name;
                } else if (this.player2.mark === mark) {
                  this.win = this.player2.name;
                }
                document.querySelector(".turn").textContent = `${this.win} win!`;
                return console.log(`${this.win} win!`); 
              };
            }
          }
        }
        
        // check if it's a draw
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (!gameboard[i][j]) return false;
          }
        }
        this.win = "draw";
        console.log("It's a draw.");
        document.querySelector(".turn").textContent = "It's a draw";
      })();

    } else {
      if (this.win === "draw") {
        console.log("It's a draw.");
      } else {
        console.log(`${this.win} won.`)
      }
    }
  }

  const game = {
    gameboard: getGameboard,
    player1: getPlayer(player1Name.value, player1Mark.value),
    player2: getPlayer(player2Name.value, player2Mark.value),
    mark: mark,
    win: undefined,
  }
  game.turn = game.player1;

  function renderBoard() {
    Array.from(document.body.childNodes).forEach((child) => {
      if (child !== document.querySelector("form")) child.remove();
    });
    const gameboard = document.createElement("div");
    gameboard.classList.add("gameboard");
    for (let i = 0; i < 3; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (this.gameboard[i][j] === "O") {
          const nought = document.createElement("img");
          nought.classList.add("nought");
          nought.setAttribute("src", "img/nought.svg");
          nought.setAttribute("width", "64px");
          nought.setAttribute("height", "64px");  
          cell.appendChild(nought);
        } else if (this.gameboard[i][j] === "X") {
          const cross = document.createElement("img");
          cross.classList.add("cross");
          cross.setAttribute("src", "img/cross.svg");
          cross.setAttribute("width", "64px");
          cross.setAttribute("height", "64px");
          cell.appendChild(cross);
        } else if (this.gameboard[i][j] === "") {
          cell.addEventListener("click", () => {
            game.mark(i + 1, j + 1);
          });
        }  
        row.appendChild(cell);
      }
      gameboard.appendChild(row);
      document.body.appendChild(gameboard);
    }
    const turn = document.createElement("p");
    turn.classList.add("turn");
    turn.textContent = `${game.turn.name}’s turn`
    document.body.appendChild(turn);  
  }

  renderBoard.call(game);

  return game;
}

const player1Name = document.querySelector("#player1-name");
const player2Name = document.querySelector("#player2-name");
const player1Mark = document.querySelector("#player1-mark");
const player2Mark = document.querySelector("#player2-mark");
player1Mark.addEventListener("change", () => {
  if (player1Mark.value === "X") {
    player2Mark.value = "O";
  } else if (player1Mark.value === "O") {
    player2Mark.value = "X";
  }
});
player2Mark.addEventListener("change", () => {
  if (player2Mark.value === "X") {
    player1Mark.value = "O";
  } else if (player2Mark.value === "O") {
    player1Mark.value = "X";
  }
});

const start = document.querySelector(".start-btn");
start.addEventListener("click", (e) => {
  e.preventDefault();
  startGame()
});