import React,{useState} from "react";
import "./styles.css";
import Board from "./Board";

export default function App() {
  const [state, setState] = useState({
    history:[{square: Array(9).fill(null)}],
    xIsNext: true
  });
  const handleClick = function(i) {
    const history = state.history;
    const current = history[history.length - 1];
    const square = current.square.slice();
    if (calculateWinner(square) || square[i]) {
      return;
    }
    square[i] = state.xIsNext ? 'X' : 'O';
    setState({
      history: history.concat([{
        square: square,
      }]),
      xIsNext: !state.xIsNext,
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
      if (
        square[a] &&
        square[a] === square[b] &&
        square[a] === square[c]
      ) {
        return square[a];
      }
    }
    return null;
  }
  

  // const status = `Next player ${xIsNext?'X':'O'}`;
  const history = state.history;
  const current = history[history.length-1];

  const winner = calculateWinner(current.square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (state.xIsNext ? "X" : "O");
  }
  return (
    <div>
      <Board square={current.square} onClick={(i)=>handleClick(i)} />
      <div>{status}</div>
    </div>
  );
}
