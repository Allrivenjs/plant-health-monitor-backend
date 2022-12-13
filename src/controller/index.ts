import { Express, Router } from 'express';

import { authController } from '../auth';
import { userController } from '../user';

export const setAppApiController = (app: Express) => {
  const appRouter = Router();
  app.use('/api/v1', appRouter);

  appRouter.use('/user', userController);
  appRouter.use('/auth', authController);
};
