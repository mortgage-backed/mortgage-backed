import React from 'react';

function GameControls({ onRollDice, onBuyProperty, onEndTurn }) {
  return (
    <div className="game-controls">
      <button onClick={onRollDice}>Roll Dice</button>
      <button onClick={onBuyProperty}>Buy Property</button>
      <button onClick={onEndTurn}>End Turn</button>
    </div>
  );
}

export default GameControls;