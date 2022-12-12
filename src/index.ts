import { AppDataSource } from './data-source';

import http from 'http';
import express from 'express';

import { Server } from 'socket.io';

import { setAppApiController } from './controller';

const app = express();
const server = http.createServer(app);

const io = new Server(server);

AppDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.log(error));

setAppApiController(app);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('test', (msg) => {
    console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
