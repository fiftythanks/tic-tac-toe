let startGame = function() {
  let createPlayer = function(name) {
    return {
      score: 0,
    };
  };

  let getGameboard = (function() {
    let gameboard = [];
    for (let i = 1; i <= 3; i++) {
      let row = [];
      for (let j = 1; j <= 3; j++) {
        let cell = "";
        row.push(cell);
      }
      gameboard.push(row);
    }
    return { gameboard };
  })();

  return {
    player1: createPlayer(),
    player2: createPlayer(),
    gameboard: getGameboard,
  };
}