import { Request, Response, Router } from 'express';
import passport from 'passport';

import { GardenServices } from './gardenService';
import { Garden } from '../entity';
import { validatorHandler } from '../middlewares';
import { createAGardenScheme, editAGardenIdScheme, editAGardenScheme } from './gardenSchema';
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
      return res.status(404).json({
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

    const newGarden = await gardenService.createGarden(garden);

    res.status(201).json({ 
      ok: true,
      garden: newGarden,
    });
  }
);

// get a garden by id
gardenController.get(
  '/:id',
  validatorHandler(editAGardenIdScheme, 'params'),
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {

    const { id } = req.params;

    const garden = await gardenService.findById(Number(id));

    if (!garden) {
      return res.status(404).json({
        ok: false,
        message: 'Garden not found',
      });
    }

    res.status(201).json({ 
      ok: true,
      garden,
    });
  }
);

// edit a garden
gardenController.put(
  '/:id',
  validatorHandler(editAGardenIdScheme, 'params'),
  validatorHandler(editAGardenScheme, 'body'),
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {

    const { id } = req.params;

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
      return res.status(404).json({
        ok: false,
        message: 'User not found',
      });
    }

    const garden = await gardenService.findById(Number(id));

    if (!garden) {
      return res.status(404).json({
        ok: false,
        message: 'Garden not found',
      });
    }

    garden.name = name;
    garden.image = image;
    garden.plant_type = plant_type;
    garden.max_temperature = max_temperature;
    garden.min_temperature = min_temperature;

    const editedGarden = await gardenService.editAGarden(Number(id), garden);

    res.status(201).json({ 
      ok: true,
      garden: editedGarden,
    });
  }
);


// delete a garden
gardenController.delete(
  '/:id',
  validatorHandler(editAGardenIdScheme, 'params'),
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {

    const { id } = req.params;

    const garden = await gardenService.findById(Number(id));

    if (!garden) {
      return res.status(404).json({
        ok: false,
        message: 'Garden not found',
      });
    }

    await gardenService.deleteAGarden(Number(id));

    res.status(201).json({ 
      ok: true,
      garden,
    });
  }
);
