import { Server } from 'boardgame.io/dist/cjs/server.js';
import { FlatFile } from 'boardgame.io/dist/cjs/server.js';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import MortgageBacked from '../client/game.js';

const server = Server({
  // Assuming you have a game implementation in `src/game.js`
  games: [MortgageBacked], // replace 'YourGame' with your game object
  origins: ['*'],
  db: new FlatFile({
    dir: path.join(process.cwd(), 'game-storage'),
  }),
});

server.run(8000);