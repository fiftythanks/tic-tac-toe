function startGame() {
  const getGameboard = (function() {
    let gameboard = [];
    for (let i = 0; i < 3; i++) { 
      let row = ["", "", ""];
      gameboard.push(row);
    }
    return gameboard;
  })();

  function getPlayer(mark) {
    return {
      name: mark,
      mark: mark,
    };
  }

  function mark(player, row, col) {
    if (!this.win) {
      row = --row;
      col = --col;
      let gameboard = this.gameboard;
      if (gameboard[row][col] === "") {
        gameboard[row][col] = this[player].mark;
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
      })();

    } else {
      if (this.win === "draw") {
        console.log("It's a draw.");
      } else {
        console.log(`${this.win} won.`)
      }
    }
  }     

  return {
    gameboard: getGameboard,
    player1: getPlayer("X"),
    player2: getPlayer("O"),
    mark: mark,
    win: undefined,
  };
}