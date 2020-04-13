import React, { useState } from "react";
import "./styles.css";
import Board from "./Board";

export default function App() {
  const [state, setState] = useState({
    history: [{ square: Array(9).fill(null) }],
    xIsNext: true,
    stepNumber: 0
  });
  const handleClick = function(i) {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const square = current.square.slice();
    if (calculateWinner(square) || square[i]) {
      return;
    }
    square[i] = state.xIsNext ? "X" : "O";
    setState({
      history: history.concat([
        {
          square: square
        }
      ]),
      xIsNext: !state.xIsNext,
      stepNumber: history.length
    });
  };
  function calculateWinner(square) {
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
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }
  const jumpTo = function(step) {
    setState(prevState => {
      return {
        ...prevState,
        ...{
          stepNumber: step,
          xIsNext: step % 2 === 0
        }
      };
    });
  };

  // const status = `Next player ${xIsNext?'X':'O'}`;
  const history = state.history;
  const current = history[state.stepNumber];
  console.log(current, state.stepNumber);
  const winner = calculateWinner(current.square);
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (state.xIsNext ? "X" : "O");
  }
  return (
    <div>
      <Board square={current.square} onClick={i => handleClick(i)} />
      <div>{status}</div>
      <div>{moves}</div>
    </div>
  );
}
