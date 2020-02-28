import React, { useState } from "react";
import Square from "./Square";
import Reset from "./Reset";

export default function Game() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const nextSymbol = isXNext ? "X" : "O";
  const winner = calculateWiner(square);

  function getStatus() {
    if (winner) {
      return "Winner " + winner + "!";
    } else if (isBoardFull(square)) {
      return "Game is end!";
    } else {
      return "Next player " + nextSymbol;
    }
  }

  function createSquare(i) {
    return (
      <Square
        value={square[i]}
        onClick={() => {
          if (square[i] != null || winner != null) {
            return;
          }
          const nextSquares = square.slice();
          nextSquares[i] = nextSymbol;
          setSquare(nextSquares);
          setIsXNext(!isXNext);
        }}
      />
    );
  }

  function createResetButton() {
    return (
      <Reset
        onClick={() => {
          setSquare(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }
  return (
    <div className="game">
      <h1>Game</h1>
      <div className="gameBoard">
        <div className="gameRow">
          {createSquare(0)}
          {createSquare(1)}
          {createSquare(2)}
        </div>
        <div className="gameRow">
          {createSquare(3)}
          {createSquare(4)}
          {createSquare(5)}
        </div>
        <div className="gameRow">
          {createSquare(6)}
          {createSquare(7)}
          {createSquare(8)}
        </div>
      </div>
      <div className="game_info">{getStatus()}</div>
      <div>{createResetButton()}</div>
    </div>
  );
}

function calculateWiner(squares) {
  const posibilites = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < posibilites.length; i++) {
    const [a, b, c] = posibilites[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }

  return null;
}

function isBoardFull(squares) {
  for (let square of squares) {
    if (square == null) return false;
  }
  return true;
}
