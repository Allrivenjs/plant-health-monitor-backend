import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

import http from 'http';
import express from 'express';

import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server);

AppDataSource.initialize().then(async () => {
}).catch(error => console.log(error))

AppDataSource.initialize().then(async () => {}).catch(error => console.log(error));

app.get('/', (req, res) => {
  console.log('hello');
  res.send({
    hello: 'world',
  });
});

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

