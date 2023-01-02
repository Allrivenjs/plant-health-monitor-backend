import { Express, Router } from 'express';

import { authController } from '../auth';
import { gardenController } from '../garden';
import { scheduleController } from '../schedule';
import { userController } from '../user';

export const setAppApiController = (app: Express) => {
  const appRouter = Router();
  app.use('/api/v1', appRouter);

  appRouter.use('/user', userController);
  appRouter.use('/auth', authController);
  appRouter.use('/garden', gardenController);
  appRouter.use('/schedule', scheduleController);
};
