window.addEventListener('DOMContentLoaded', () => {
    const cells = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
  
    let currentPlayer = 1;
    let isGameActive = true;
  
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
  
    const getPlayerSymbol = (player) => {
      return player === 1 ? 'X' : 'O';
    };
  
    const announce = (winner) => {
      if (winner === 0) {
        announcer.innerText = 'Tie';
      } else {
        announcer.innerHTML = `Player ${winner} Won`;
      }
      announcer.classList.remove('hide');
    };
  
    const checkWinConditions = () => {
      for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (
          cells[a].innerText !== '' &&
          cells[a].innerText === cells[b].innerText &&
          cells[b].innerText === cells[c].innerText
        ) {
          return cells[a].innerText === 'X' ? 1 : 2;
        }
      }
  
      if (!cells.some((cell) => cell.innerText === '')) {
        return 0; // Tie
      }
  
      return -1; // Game ongoing
    };
  
    const handleCellClick = (event) => {
      const cell = event.target;
      const index = cells.indexOf(cell);
  
      if (cell.innerText === '' && isGameActive) {
        cell.innerText = getPlayerSymbol(currentPlayer);
        cell.classList.add(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        playerDisplay.innerText = currentPlayer;
        const winner = checkWinConditions();
        if (winner !== -1) {
          isGameActive = false;
          announce(winner);
        }
      }
    };
  
    const resetBoard = () => {
      cells.forEach((cell) => {
        cell.innerText = '';
        cell.classList.remove('player1', 'player2');
      });
      currentPlayer = 1;
      playerDisplay.innerText = currentPlayer;
      announcer.classList.add('hide');
      isGameActive = true;
    };
  
    cells.forEach((cell) => {
      cell.addEventListener('click', handleCellClick);
    });
  
    resetButton.addEventListener('click', resetBoard);
  });
  