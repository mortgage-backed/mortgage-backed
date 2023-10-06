import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import MortgageBacked from './game.js';
import { Board } from './board.js';

const MortgageBackedClient = Client({
  game: MortgageBacked,
  board: Board,
  multiplayer: SocketIO({ server: 'http://localhost:8000' }),
});

export default MortgageBackedClient;