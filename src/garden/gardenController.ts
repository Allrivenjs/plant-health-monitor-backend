import { Request, Response, Router } from 'express';
import passport from 'passport';

import { GardenServices } from './gardenService';
import {Garden} from "../entity";

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

gardenController.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const { name, image, plant_type, max_temperature, actions   } = req.body;
        const garden = new Garden();
        garden.name = name;
        garden.image = image;
        garden.plant_type = plant_type;
        garden.max_temperature = max_temperature;
        garden.actions = actions;
        const gardens = await gardenService.createGarden(garden);
        res.json({ gardens: gardens });
    }
)

