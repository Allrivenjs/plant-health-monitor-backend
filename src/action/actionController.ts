import { Request, Response, Router } from 'express';

import passport from 'passport';

import { ActionServices } from './actionService';

const actionService = new ActionServices();

export const actionController = Router();

// get all actions
actionController.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const actions = await actionService.findAll();
    res.json({ actions });
  }
);

// create a actions
actionController.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    // TODO

    res.status(201).json({
      todo: 'todo',
    });
  }
);

// edit a actions
actionController.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    // TODO

    res.status(201).json({
      todo: 'todo',
    });
  }
);

// get a action by id
actionController.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    // TODO

    res.status(201).json({
      todo: 'todo',
    });
  }
);

// get a actions by garden id
actionController.get(
  '/garden/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    // TODO

    res.status(201).json({
      todo: 'todo',
    });
  }
);

// delete a action
actionController.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    // TODO

    res.status(201).json({
      todo: 'todo',
    });
  }
);
