import { Request, Response, Router } from 'express';
import passport from 'passport';

import { GardenServices } from './gardenService';
import { Garden } from '../entity';
import { validatorHandler } from '../middlewares';
import { createAGardenScheme } from './gardenSchema';
import { UserServices } from '../user/userService';

const gardenService = new GardenServices();
const userService = new UserServices();

export const gardenController = Router();

gardenController.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const gardens = await gardenService.findAll();
    res.json({ gardens: gardens });
  }
);

// create a garden
gardenController.post(
  '/',
  validatorHandler(createAGardenScheme, 'body'),
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {

    const {
      name,
      image,
      plant_type,
      max_temperature,
      min_temperature,
      user_id,
    } = req.body;

    const user = await userService.findById(user_id);

    if (!user) {
      return res.json({
        ok: false,
        message: 'User not found',
      });
    }


    const garden = new Garden();

    garden.name = name;
    garden.image = image;
    garden.plant_type = plant_type;
    garden.max_temperature = max_temperature;
    garden.min_temperature = min_temperature;
    garden.user = user;
    garden.created_at = new Date();
    garden.updated_at = new Date();

    const newGarden = await gardenService.createGarden(garden);

    res.json({ 
      ok: true,
      garden: newGarden,
    });
  }
);
