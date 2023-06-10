import { io } from '..';

import { ActionServices } from '../action';
import { ActionTypeService } from '../actionType';

import { Action, ActionTypes, Schedule } from '../entity';

import { ScheduleServices } from '../schedule/scheduleService';
import { JobScheduler } from './JobScheduler';

const actionService = new ActionServices();
const actionTypeService = new ActionTypeService();
const scheduleService = new ScheduleServices();

export const generateWaterSchedulers = async () => {
  console.log('*********************************');
  console.log('***Generating water schedulers***');
  console.log('*********************************');

  const schedules = await scheduleService.findAll();
  const nNonActiveSchedules = schedules.filter(({ active }) => !active).length;

  console.log(
    schedules.length,
    ' schedules found, ',
    nNonActiveSchedules,
    ' non active'
  );

  for (const schedule of schedules) {
    if (schedule.active) continue;

    for (const dayOfSchedule of schedule.daysOfSchedule) {
      if (!dayOfSchedule.active) continue;

      console.log(
        '*** creating a new job for the schedule ',
        schedule.id,
        ', day ',
        dayOfSchedule.dayNumber,
        '-',
        dayOfSchedule.name,
        ' ***'
      );

      JobScheduler.createAJob(
        schedule.id,
        dayOfSchedule.dayNumber,
        dayOfSchedule.hour,
        dayOfSchedule.minutes,
        async () => {
          console.log(
            '* executing job: watering of schedule ' + schedule.id,
            ' ',
            dayOfSchedule.dayNumber + '-' + dayOfSchedule.name
          );

          const scheduleWithGarden =
            await scheduleService.findGardenByScheduleId(schedule.id);
          const garden = scheduleWithGarden.garden;

          const actionType = await actionTypeService.findByType(
            ActionTypes.WATERING
          );

          // cada dayOfSchedule (día de la semana correspondiente) se creara:
          // Un action
          const action = new Action();
          action.payload = 'test';
          action.garden = garden;
          action.pending = true;
          action.actionType = actionType;

          await actionService.createAction(action);
          console.log('action creada');

          // se ejecutará un socket a la app mobil y se manda el action creado
          io.emit('watering', action);

          // se mandará una petición o socket al esp8266 para regar la planta
          // TODO: código para mandar mensaje el dispositivo
        }
      );
    }

    schedule.active = true;
    delete schedule.daysOfSchedule;
    await scheduleService.editASchedule(schedule.id, schedule);
  }

  console.log('actual jobs: ', JobScheduler.toString());
};

export const resetSchedules = async () => {
  console.log('*********************************');
  console.log('***Reseting schedules in the db***');
  console.log('*********************************');

  const schedules = await scheduleService.findAll();

  for (const schedule of schedules) {
    schedule.active = false;
    delete schedule.daysOfSchedule;
    await scheduleService.editASchedule(schedule.id, schedule);
  }
};
