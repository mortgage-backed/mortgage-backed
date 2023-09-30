import React from 'react';

function GameBoard({ spaces }) {
  return (
    <div className="game-board">
      <div className="row top-row">{spaces.slice(0, 10)}</div>
      <div className="row right-row">{spaces.slice(10, 20)}</div>
      <div className="row bottom-row">{spaces.slice(20, 30).reverse()}</div>
      <div className="row left-row">{spaces.slice(30, 40).reverse()}</div>
    </div>
  );
}

export default GameBoard;