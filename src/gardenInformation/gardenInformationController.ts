import { Request, Response, Router } from 'express';
import passport from 'passport';
import { GardenServices } from '../garden/gardenService';

import { GardenInformationServices } from './gardenInformationService';

const gardenInformationService = new GardenInformationServices();
const gardenServices = new GardenServices();

export const gardenInformationController = Router();

gardenInformationController.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const gardens = await gardenInformationService.findAll();
    res.json({ gardens: gardens });
  }
);

// get a garden information by garden id
gardenInformationController.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const garden = await gardenServices.findById(Number(id));

    if (!garden) {
      return res.status(404).json({
        ok: false,
        message: 'Garden not found',
      });
    }

    const gardenInformations = await gardenInformationService.findByGardenId(
      garden.id
    );

    res.status(201).json({
      ok: true,
      gardenInformations,
    });
  }
);
