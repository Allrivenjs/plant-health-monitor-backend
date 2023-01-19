import { Request, Response, Router } from 'express';
import passport from 'passport';

import { GardenServices } from './gardenService';
import { Garden } from '../entity';
import { validatorHandler } from '../middlewares';
import { createAGardenScheme, editAGardenIdScheme, editAGardenScheme } from './gardenSchema';
import { UserServices } from '../user/userService';
import { Schedule } from '../entity';
import { ScheduleServices } from '../schedule';
import { weekdays } from '../constants';
import { DayOfScheduleServices } from '../dayOfSchedule';
import { DayOfSchedule } from '../entity/DayOfSchedule';

const gardenService = new GardenServices();
const scheduleService = new ScheduleServices();
const dayOfScheduleService = new DayOfScheduleServices();
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
      water_levels,
      sun_levels,
      device_mac,
    } = req.body;

    const user = await userService.findById(user_id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'User not found',
      });
    }

    const gardenSchedule = new Schedule();
    await scheduleService.createSchedule(gardenSchedule);

    weekdays.forEach(({ dayNumber, name, abbreviation, keyName }) => {
      dayOfScheduleService.createDayOfSchedule(DayOfSchedule.makeDayOfSchedule(
          dayNumber,
            name,
            abbreviation,
            keyName,
            false,
            0,
            gardenSchedule
      ));
    });


      const garden = Garden.makeGarden(
        name,
        image,
        plant_type,
        max_temperature,
        min_temperature,
        water_levels,
        sun_levels,
        device_mac,
        user,
        gardenSchedule
      );

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
      water_levels,
      sun_levels,
      device_mac,
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

    delete garden.actions;

    const editedGarden = await gardenService.editAGarden(Number(id), Garden.updateGarden(
        garden,
        name,
        image,
        plant_type,
        min_temperature,
        max_temperature,
        water_levels,
        sun_levels,
        device_mac,
        user,
        garden.schedule
    ));

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
    await scheduleService.deleteASchedule(garden.schedule.id);

    res.status(201).json({ 
      ok: true,
      garden,
    });
  }
);
