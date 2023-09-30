import React from 'react';

function Property({ name, price, rent }) {
  return (
    <div className="property">
      <div className="name">{name}</div>
      <div className="price-rent">
        <div className="price">${price}</div>
        <div className="rent">${rent}</div>
      </div>
    </div>
  );
}

function Space({ type, name, children }) {
  let spaceClass = 'space';
  if (type === 'property') {
    spaceClass += ' property';
  } else if (type === 'go') {
    spaceClass += ' go';
  } else if (type === 'tax') {
    spaceClass += ' tax';
  } else if (type === 'community-chest') {
    spaceClass += ' community-chest';
  } else if (type === 'chance') {
    spaceClass += ' chance';
  } else if (type === 'jail') {
    spaceClass += ' jail';
  } else if (type === 'free-parking') {
    spaceClass += ' free-parking';
  } else if (type === 'go-to-jail') {
    spaceClass += ' go-to-jail';
  }

  return (
    <div className={spaceClass}>
      <div className="name">{name}</div>
      {children}
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
      <div className="row top-row">{spaces.slice(0, 10)}</div>
      <div className="row right-row">{spaces.slice(10, 20)}</div>
      <div className="row bottom-row">{spaces.slice(20, 30).reverse()}</div>
      <div className="row left-row">{spaces.slice(30, 40).reverse()}</div>
      <div className="players">{players}</div>
      {gameInfo}
      <button onClick={() => moves.rollDice()}>Roll Dice</button>
      <button onClick={() => moves.buyProperty()}>Buy Property</button>
      <button onClick={() => moves.endTurn()}>End Turn</button>
    </div>
  );
}