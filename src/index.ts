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
import { startGardenWateringSchedule } from './sockets';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const server = http.createServer(app);

export const io = new Server(server);

AppDataSource.initialize()
  .then(async () => {
    startGardenWateringSchedule();
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

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/test', (req: Request, res: Response) => {
  res.json({
    test: 'hello',
  });
});

server.listen(config.appPort, () => {
  console.log('listening on *:', config.appPort);
});
