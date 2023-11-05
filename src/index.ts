import { config } from './config';
import cors from 'cors';

import http from 'http';
import express, { Request, Response } from 'express';

import { Server } from 'socket.io';

import { AppDataSource } from './data-source';

import { setAppApiController } from './controller';
import { setupPassportStrategies } from './auth/strategies';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from './middlewares/errorHandler';

import { generateWaterSchedulers, resetSchedules } from './scheduler';

require('console-stamp')(console, {
  format: ':date(yyyy/mm/dd HH:MM:ss.l):label',
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const server = http.createServer(app);

export const io = new Server(server);

AppDataSource.initialize()
  .then(async () => {
    await resetSchedules();
    await generateWaterSchedulers();
  })
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

  // console.log(io.sockets.adapter.rooms);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/test', (req: Request, res: Response) => {
  // console.log(io.sockets.adapter.rooms);
  console.log("test")
  res.json({
    test: 'hello',
  });
});

server.listen(config.appPort, () => {
  console.log('listening on *:', config.appPort);
});
