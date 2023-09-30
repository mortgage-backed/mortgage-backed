import React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { MortgageBacked } from './game';
import { Board } from './board';

const MortgageBackedClient = Client({
    game: MortgageBacked,
    board: Board,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
});

const App = () => {
    return (
        <div>
            <MortgageBackedClient />
        </div>
    );
};

export default App;