import React from 'react';

exports.Board = function ({ G, ctx, moves }) {
    console.log('G:', G);
    console.log('ctx:', ctx);
    console.log('moves:', moves);
    const board = G.board;

    // Define the board spaces
    const spaces = board.map((space, index) => {
        let spaceClass = 'space';
        if (space.type === 'property') {
            spaceClass += ' property';
        } else if (space.type === 'go') {
            spaceClass += ' go';
        } else if (space.type === 'tax') {
            spaceClass += ' tax';
        } else if (space.type === 'community-chest') {
            spaceClass += ' community-chest';
        } else if (space.type === 'chance') {
            spaceClass += ' chance';
        } else if (space.type === 'jail') {
            spaceClass += ' jail';
        } else if (space.type === 'free-parking') {
            spaceClass += ' free-parking';
        } else if (space.type === 'go-to-jail') {
            spaceClass += ' go-to-jail';
        }

        return (
            <div key={index} className={spaceClass}>
                <div className="name">{space.name}</div>
                {space.type === 'property' && (
                    <div className="price-rent">
                        <div className="price">${space.price}</div>
                        <div className="rent">${space.rent[0]}</div>
                    </div>
                )}
            </div>
        );
    });

    return (
        <div>
            <h1>Monopoly</h1>
            <p>Current player: {ctx.currentPlayer}</p>
            <p>Money: {G.players[ctx.currentPlayer].money}</p>
            <p>Properties:</p>
            <ul>
                {G.players[ctx.currentPlayer].properties.map((property) => (
                    <li key={property.name}>{property.name}</li>
                ))}
            </ul>
            <button onClick={() => moves.rollDice()}>Roll Dice</button>
            <button onClick={() => moves.buyProperty()}>Buy Property</button>
            <button onClick={() => moves.endTurn()}>End Turn</button>
            <div className="board">
                <div className="row top-row">{spaces.slice(0, 10)}</div>
                <div className="row right-row">{spaces.slice(10, 20)}</div>
                <div className="row bottom-row">{spaces.slice(20, 30).reverse()}</div>
                <div className="row left-row">{spaces.slice(30, 40).reverse()}</div>
            </div>
        </div>
    );
};