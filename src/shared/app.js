import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { Server } from 'boardgame.io/dist/cjs/server.js';
import MortgageBacked from './game.js';

const server = Server({ games: [MortgageBacked] });
server.run(8000);