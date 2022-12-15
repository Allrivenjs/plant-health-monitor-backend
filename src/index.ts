import { AppDataSource } from './data-source';

import http from 'http';
import express from 'express';

import { Server } from 'socket.io';

import { setAppApiController } from './controller';

import { setupPassportStrategies } from './auth/strategies';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

const io = new Server(server);



AppDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.log(error));


setupPassportStrategies();

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
