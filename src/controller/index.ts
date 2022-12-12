import { Express, Router } from 'express';

import { userController } from '../user';

export const setAppApiController = (app: Express) => {
  const appRouter = Router();
  app.use('/api/v1', appRouter);

  appRouter.use('/user', userController);
};
