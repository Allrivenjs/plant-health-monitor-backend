import { Request, Response, Router } from 'express';

import { AppDataSource } from '../data-source';
import { User } from '../entity';

const userRepository = AppDataSource.getRepository(User);

export const userController = Router();

userController.get('/', async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.json({ hello: 'user' });
});
