import { Request, Response, Router } from 'express';

import { UserServices } from './userService';

const userService = new UserServices();

export const userController = Router();

userController.get('/', async (req: Request, res: Response) => {
  const users = await userService.findAllUsers();
  res.json({ users: users });
});
