export const GameBoard = ({ onSelectSquare, board }) => {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, columIndex) => (
              <li key={columIndex}>
                <button
                  disabled={playerSymbol}
                  type="button"
                  onClick={() => {
                    onSelectSquare(rowIndex, columIndex, "X");
                  }}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};
