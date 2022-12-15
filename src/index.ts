import { config } from './config';

import http from 'http';
import express from 'express';

import { Server } from 'socket.io';

import { AppDataSource } from './data-source';

import { setAppApiController } from './controller';
import { setupPassportStrategies } from './auth/strategies';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

const io = new Server(server);

AppDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.log(error));

// passport strategies
setupPassportStrategies();

// routes
setAppApiController(app);

// middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('test', (msg) => {
    console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(config.appPort, () => {
  console.log('listening on *:', config.appPort);
});
