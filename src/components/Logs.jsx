export default function Logs({ turns }) {
  return (
    <ol id="log">
      <h1>Logs</h1>
      {turns.map((turn) => (
        <li key={`${turn.sqaure.row}-${turn.sqaure.col}`}>
          {turn.player} - {0 + turn.sqaure.row + 1} , {0 + turn.sqaure.col + 1}
        </li>
      ))}
    </ol>
  );
}
