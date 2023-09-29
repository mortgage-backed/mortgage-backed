require = require('esm')(module);
import { Server } from 'boardgame.io/server';
import MortgageBacked from './game.js';

const server = Server({ games: [MortgageBacked] });
server.run(8000);