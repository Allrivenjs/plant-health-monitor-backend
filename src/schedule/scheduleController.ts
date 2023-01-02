import { Request, Response, Router } from 'express';

import passport from 'passport';

import { validatorHandler } from '../middlewares';

import { editAGardenIdScheme } from '../garden/gardenSchema';
import { editAScheduleScheme, createAScheduleScheme, scheduleId } from './scheduleSchema';

import { ScheduleServices } from './scheduleService';
import { UserServices } from '../user/userService';
import { GardenServices } from '../garden';

import { Schedule } from '../entity';

const scheduleService = new ScheduleServices();
const userService = new UserServices();
const gardenService = new GardenServices();

export const scheduleController = Router();

// get all schedules
scheduleController.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const schedules = await scheduleService.findAll();
    res.json({ schedules, });
  }
);

// create a schedule
scheduleController.post(
  '/:id',
  validatorHandler(editAGardenIdScheme, 'params'),
  validatorHandler(createAScheduleScheme, 'body'),
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {

    const {
      monday = false,
      tuesday = false,
      wednesday = false,
      thursday = false,
      friday = false,
      saturday = false,
      sunday = false,
    } = req.body;

    const { id } = req.params;

    const garden = await gardenService.findById(Number(id));

    if (!garden) {
      return res.status(404).json({
        ok: false,
        message: 'Garden not found',
      });
    }

    const newSchedule = new Schedule();

    newSchedule.monday = monday;
    newSchedule.tuesday = tuesday;
    newSchedule.wednesday = wednesday;
    newSchedule.thursday = thursday;
    newSchedule.friday = friday;
    newSchedule.saturday = saturday;
    newSchedule.sunday = sunday;

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
    const {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    } = req.body;

    const { id } = req.params;

    const schedule = await scheduleService.findById(Number(id));

    if (!schedule) {
      return res.status(404).json({
        ok: false,
        message: 'Schedule not found',
      });
    }

    schedule.monday = monday !== undefined ? monday : schedule.monday;
    schedule.tuesday = tuesday  !== undefined ? tuesday : schedule.tuesday;
    schedule.wednesday = wednesday  !== undefined ? wednesday : schedule.wednesday;
    schedule.thursday = thursday !== undefined  ? thursday : schedule.thursday;
    schedule.friday = friday !== undefined  ? friday : schedule.friday;
    schedule.saturday = saturday !== undefined  ? saturday : schedule.saturday;
    schedule.sunday = sunday !== undefined  ? sunday : schedule.sunday;

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
