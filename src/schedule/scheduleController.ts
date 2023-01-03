import { Request, Response, Router } from 'express';

import passport from 'passport';

import { validatorHandler } from '../middlewares';

import { editAGardenIdScheme } from '../garden/gardenSchema';
import {
  editAScheduleScheme,
  createAScheduleScheme,
  scheduleId,
} from './scheduleSchema';

import { ScheduleServices } from './scheduleService';
import { UserServices } from '../user/userService';
import { GardenServices } from '../garden';

import { Schedule } from '../entity';
import { weekdays } from '../constants';
import { DayOfSchedule } from '../entity/DayOfSchedule';
import { DayOfScheduleServices } from '../dayOfSchedule';

const scheduleService = new ScheduleServices();
const dayOfScheduleService = new DayOfScheduleServices();
const gardenService = new GardenServices();

export const scheduleController = Router();

// get all schedules
scheduleController.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const schedules = await scheduleService.findAll();
    res.json({ schedules });
  }
);

// create a schedule
scheduleController.post(
  '/:id',
  validatorHandler(editAGardenIdScheme, 'params'),
  validatorHandler(createAScheduleScheme, 'body'),
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

    const newSchedule = new Schedule();

    weekdays.map(({ dayNumber, name, abbreviation, keyName }) => {
      const newDayOfSchedule = new DayOfSchedule();

      newDayOfSchedule.dayNumber = dayNumber;
      newDayOfSchedule.name = name;
      newDayOfSchedule.abbreviation = abbreviation;
      newDayOfSchedule.keyName = keyName;
      newDayOfSchedule.cuantity = req.body[keyName].cuantity;
      newDayOfSchedule.active = req.body[keyName].active;

      newDayOfSchedule.schedule = newSchedule;

      dayOfScheduleService.createDayOfSchedule(newDayOfSchedule);
    });

    scheduleService.createSchedule(newSchedule);

    garden.schedule = newSchedule;

    res.status(201).json({
      ok: false,
      schedule: newSchedule,
    });
  }
);

// get a schedule by id
scheduleController.get(
  '/:id',
  validatorHandler(scheduleId, 'params'),
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const schedule = await scheduleService.findById(Number(id));

    if (!schedule) {
      return res.status(404).json({
        ok: false,
        message: 'Schedule not found',
      });
    }

    res.status(201).json({
      ok: true,
      schedule,
    });
  }
);

// get a schedule by garden id
scheduleController.get(
  '/garden/:id',
  validatorHandler(editAGardenIdScheme, 'params'),
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const garden = await gardenService.findScheduleByGardenId(Number(id));

    if (!garden) {
      return res.status(404).json({
        ok: false,
        message: 'Garden not found',
      });
    }

    console.log(garden);

    res.status(201).json({
      ok: true,
      schedule: garden.schedule,
    });
  }
);

// edit a schedule
scheduleController.put(
  '/:id',
  validatorHandler(scheduleId, 'params'),
  validatorHandler(editAScheduleScheme, 'body'),
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const schedule = await scheduleService.findById(Number(id));

    if (!schedule) {
      return res.status(404).json({
        ok: false,
        message: 'Schedule not found',
      });
    }

    weekdays.map(({ dayNumber, name, abbreviation, keyName }, index) => {
      schedule.daysOfSchedule[index].dayNumber = dayNumber;
      schedule.daysOfSchedule[index].name = name;
      schedule.daysOfSchedule[index].abbreviation = abbreviation;
      schedule.daysOfSchedule[index].keyName = keyName;
      schedule.daysOfSchedule[index].cuantity = req.body[keyName].cuantity;
      schedule.daysOfSchedule[index].active = req.body[keyName].active;

      dayOfScheduleService.editADayOfSchedule(
        schedule.daysOfSchedule[index].id,
        schedule.daysOfSchedule[index]
      );
    });

    scheduleService.editASchedule(Number(id), schedule);

    res.status(201).json({
      ok: true,
      schedule,
    });
  }
);

// delete a schedule
scheduleController.delete(
  '/:id',
  validatorHandler(scheduleId, 'params'),
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const schedule = await scheduleService.findById(Number(id));

    if (!schedule) {
      return res.status(404).json({
        ok: false,
        message: 'Schedule not found',
      });
    }

    await scheduleService.deleteASchedule(Number(id));

    res.status(201).json({
      ok: true,
      schedule,
    });
  }
);
