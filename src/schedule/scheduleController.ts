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
import { GardenServices } from '../garden';

import { Schedule } from '../entity';
import { weekdays } from '../constants';
import { DayOfSchedule } from '../entity/DayOfSchedule';
import { DayOfScheduleServices } from '../dayOfSchedule';
import { cancelAllJobs, generateWaterSchedulers } from '../scheduler';

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

    await Promise.all(
        weekdays.map(async ({dayNumber, name, abbreviation, keyName}) => {
            await dayOfScheduleService.createDayOfSchedule(DayOfSchedule.assignDayOfSchedule(
                new DayOfSchedule(),
                dayNumber,
                name,
                abbreviation,
                keyName,
                req.body[keyName].cuantity,
                req.body[keyName].active,
                newSchedule
            ));
        })
    );

    await scheduleService.createSchedule(newSchedule);

    garden.schedule = newSchedule;

    res.status(201).json({
      ok: false,
      schedule: newSchedule,
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

    await Promise.all(
        weekdays.map(
            async ({dayNumber, name, abbreviation, keyName}, index) => {
                await dayOfScheduleService.editADayOfSchedule(
                    schedule.daysOfSchedule[index].id,
                    DayOfSchedule.assignDayOfSchedule(
                      schedule.daysOfSchedule[index], 
                     dayNumber, name, abbreviation, keyName, req.body[keyName].cuantity, req.body[keyName].active, schedule
                    )
                );
            }
        )
    );

    
    // una ves editado el schedule, cancelamos el job que estaba corriendo
    cancelAllJobs();

    schedule.active = false;
    delete schedule.daysOfSchedule ;
    scheduleService.editASchedule(Number(id), schedule);
    // volvemos a generar los water schedulers
    generateWaterSchedulers();

    
    res.status(201).json({
      ok: true,
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

    res.status(201).json({
      ok: true,
      schedule: garden.schedule,
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
