import scheduler from 'node-schedule';

import { io } from '..';
import { ActionServices } from '../action';
import { ActionTypeService } from '../actionType';

import { Action, ActionTypes } from '../entity';

import { ScheduleServices } from '../schedule/scheduleService';

const actionService = new ActionServices();
const actionTypeService = new ActionTypeService();
const scheduleService = new ScheduleServices();

const jobs = [];

// TODO: Make a better way to identify jobs by some kind of id and cancel them manually.
// Maybe creating a new field in the Schedule entity and storing the id of the job currently
// holding that schedule, but i'll do it later
export const cancelAllJobs = () => {
  console.log('eliminando todos los jobs');
  for (const job of jobs) {
    job.cancel();
  }
};

// cancel job by id
// export const cancelWaterSchedulerJob = (id: number) => {
//   const deleted = scheduler.cancelJob(`watering - scheduleId:${id}`);
//   console.log(deleted);
//   return deleted;
// };

export const generateWaterSchedulers = async () => {
  const schedules = await scheduleService.findAll();
  console.log(
    schedules.filter(({ active }) => !active).length +
      ' non active schedules found...'
  );

  for (const schedule of schedules) {
    if (schedule.active) continue;

    console.log('executing job for schedule ', schedule.id);

    for (const dayOfSchedule of schedule.daysOfSchedule) {
      const wateringJob = scheduler.scheduleJob(
        `watering - scheduleId:${schedule.id}`,
        `* * * * ${dayOfSchedule.dayNumber}`,

        // `* * * ? * *`, // every second
        // `0 * * ? * *`, // every minute
        async () => {
          console.log(
            'ejecutando job: regado de schedule ' + schedule.id + ', día ',
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
      jobs.push(wateringJob);
    }

    schedule.active = true;
    delete schedule.daysOfSchedule;
    await scheduleService.editASchedule(schedule.id, schedule);
  }
};

// when stopping your app
// scheduler.stop();
