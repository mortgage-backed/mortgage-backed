import React from 'react';
import GameBoard from './gameboard.js';
import GameControls from './gamecontrols.js';

function Space({ type, name, children }) {
  return (
    <div className={`space ${type}`}>
      <div className="space-name">{name}</div>
      {children}
    </div>
  );
}

function Property({ name, price, rent }) {
  return (
    <div className="property">
      <div className="property-name">{name}</div>
      <div className="property-price">Price: ${price}</div>
      <div className="property-rent">Rent: ${rent}</div>
    </div>
  );
}

export function Board({ G, ctx, moves }) {
  console.log('G:', G);
  console.log('ctx:', ctx);
  console.log('moves:', moves);
  const board = G.board;

  // Define the board spaces
  const spaces = board.map((space, index) => {
    if (space.type === 'property') {
      return (
        <Space key={index} type={space.type} name={space.name}>
          <Property name={space.name} price={space.price} rent={space.rent[0]} />
        </Space>
      );
    } else {
      return <Space key={index} type={space.type} name={space.name} />;
    }
  });

  // Display player information
  const players = Object.entries(G.players).map(([playerID, player]) => {
    return (
      <div key={playerID} className="player">
        <div className="name">{player.name}</div>
        <div className="balance">${player.balance}</div>
        <div className="properties">
          {player.properties.map((property, index) => (
            <div key={index}>{property}</div>
          ))}
        </div>
      </div>
    );
  });

  // Display game information
  const gameInfo = (
    <div className="game-info">
      <div className="current-player">Current player: {ctx.currentPlayer}</div>
      <div className="dice">Dice: {ctx.random.D6()}</div>
    </div>
  );

  return (
    <div className="monopoly-board">
      <GameBoard spaces={spaces} />
      <div className="players">{players}</div>
      {gameInfo}
      <GameControls
        onRollDice={() => moves.rollDice()}
        onBuyProperty={() => moves.buyProperty()}
        onEndTurn={() => moves.endTurn()}
      />
    </div>
  );
}