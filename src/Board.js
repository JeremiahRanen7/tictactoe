import React, { useState } from 'react';
import Square from './components/Square';
import "./App.css";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [filledSquaresCount, setFilledSquaresCount] = useState(0);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setFilledSquaresCount(prevCount => prevCount + 1);

    // Check for draw
    if (filledSquaresCount === 8 && !calculateWinner(nextSquares)) {
      setTimeout(() => {
        alert("Draw!");
        resetBoard();
      }, 0);
    }
  }

  function resetBoard() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setFilledSquaresCount(0);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (filledSquaresCount === 9) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className='content-container'>
      <div className='app'>
        <h1 style={{ color: "#ADD8E6", textAlign: "center" }}>TicTacToe</h1>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} className={squares[0] === 'X' ? 'X' : squares[0] === 'O' ? 'O' : ''} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} className={squares[1] === 'X' ? 'X' : squares[1] === 'O' ? 'O' : ''} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} className={squares[2] === 'X' ? 'X' : squares[2] === 'O' ? 'O' : ''} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} className={squares[3] === 'X' ? 'X' : squares[3] === 'O' ? 'O' : ''} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} className={squares[4] === 'X' ? 'X' : squares[4] === 'O' ? 'O' : ''} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} className={squares[5] === 'X' ? 'X' : squares[5] === 'O' ? 'O' : ''} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} className={squares[6] === 'X' ? 'X' : squares[6] === 'O' ? 'O' : ''} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} className={squares[7] === 'X' ? 'X' : squares[7] === 'O' ? 'O' : ''} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} className={squares[8] === 'X' ? 'X' : squares[8] === 'O' ? 'O' : ''} />
        </div>
      </div>
    </div>
  );
}

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
