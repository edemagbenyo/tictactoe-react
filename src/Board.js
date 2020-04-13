import React, { useState } from "react";
import Square from "./Square";

export default function Board() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [xnext, xsetNext] = useState(true);
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  const handleClick = function(i) {
    const newValue = square.slice();
    if (calculateWinner(square) || square[i]) {
      return;
    }
    newValue[i] = xnext ? "X" : "O";
    setSquare(newValue);
    // const nextPlayer = next === "X" ? "O" : "X";
    xsetNext(!xnext);
  };
  const renderSquare = function(i) {
    return <Square value={square[i]} onClick={() => handleClick(i)} />;
  };
  // const status = `Next player ${xnext?'X':'O'}`;
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xnext ? "X" : "O");
  }
  return (
    <div>
      <p>{status}</p>
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
  );
}
