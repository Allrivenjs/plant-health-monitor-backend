import { Request, Response, Router } from 'express';
import passport from 'passport';

import { GardenServices } from './gardenService';

const gardenService = new GardenServices();

export const gardenController = Router();

gardenController.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const gardens = await gardenService.findAll();
    res.json({ gardens: gardens });
  }
);
