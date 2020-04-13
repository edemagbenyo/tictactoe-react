import React from "react";
import Square from "./Square";

export default function Board({ square, onClick }) {
  const renderSquare = function(i) {
    return <Square value={square[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
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
