import Player from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import Logs from "./components/Logs";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winningCombinations";
import { useState } from "react";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const derivedActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  let activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = structuredClone(initialGameBoard);
  for (const turn of gameTurns) {
    const { sqaure, player } = turn;
    const { row, col } = sqaure;
    gameBoard[row][col] = player;
  }
  let winner;
  for (const winningCombination of WINNING_COMBINATIONS) {
    const firstSquare =
      gameBoard[winningCombination[0].row][winningCombination[0].column];
    const secondSquare =
      gameBoard[winningCombination[1].row][winningCombination[1].column];
    const thirdSquare =
      gameBoard[winningCombination[2].row][winningCombination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = firstSquare;
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;
  const handleSelectSquare = (rowIndex, columIndex) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = derivedActivePlayer(prevTurns);
      return [
        { sqaure: { row: rowIndex, col: columIndex }, player: currentPlayer },
        ...prevTurns,
      ];
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };
  const handlePlayerNameChange = (playerSymbol, updatedName) => {
    setPlayerName((prevPlayerName) => {
      return { ...prevPlayerName, [playerSymbol]: updatedName };
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={"Player 1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            name={"Player 2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={playerName[winner]} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
