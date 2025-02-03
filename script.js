function startGame() {
  const getGameboard = (function() {
    let gameboard = [];
    for (let i = 0; i < 3; i++) { 
      let row = ["", "", ""] 
      gameboard.push(row);
    }
    return gameboard;
  })();

  function getPlayer(mark) {
    return {
      mark: mark,
    };
  }

  function mark(player, row, col) {
    row = --row;
    col = --col;
    let gameboard = this.gameboard;
    if (gameboard[row][col] === "") {
      gameboard[row][col] = this[player].mark;
    } else {
      return console.log(`This cell is already marked with ${gameboard[row][col]}`);
    }
    function checkBoard() {
      // check diagonals
      let mark = gameboard[0][0];
      if (mark) {
        for (let i = 1; i < 3; i++) {
          if (gameboard[i][i] !== mark) break;
          if (i === 2) {
            return console.log(`${mark} win!`);
          }
        }
      }
      mark = gameboard[2][0];
      if (mark) {
        for (let i = 1; i >= 0; i--) {
          if (gameboard[i].at(-(i + 1)) !== mark) break;
          if (i === 0) return console.log(`${mark} win!`);
        }
      }

      // check rows and columns
      for (let i = 0; i < 3; i++) {
        // rows
        mark = gameboard[i][0];
        if (mark) {
          for (let j = 1; j < 3; j++) {
            if (gameboard[i][j] !== mark) break;
            if (j === 2) return console.log(`${mark} win!`);
          }
        }

        // columns
        mark = gameboard[0][i];
        if (mark) {
          for (let j = 1; j < 3; j++) {
            if (gameboard[j][i] !== mark) break;
            if (j === 2) return console.log(`${mark} win!`);
          }
        }
      }
      
      // check if it's a draw
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!gameboard[i][j]) return false;
        }
      }
      return console.log("It's a draw.");
    }

    if (checkBoard()) return checkBoard();
  }

  return {
    gameboard: getGameboard,
    player1: getPlayer("X"),
    player2: getPlayer("O"),
    mark: mark,
  };
};