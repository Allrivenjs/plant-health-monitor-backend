import { io } from '..';

import { ScheduleServices } from '../schedule';

const scheduleService = new ScheduleServices();

export const startGardenWateringSchedule = async () => {
  const schedules = await scheduleService.findAll();
  console.log(schedules.length);

  schedules.forEach(() => {
    // TODO: hacer algo con el schedule para obtener el número del intervalo con el que se emitirá
    setInterval(() => {
      console.log('emiting watering...');
      io.emit('watering', 'riegame nojoda');
    }, 1000); // <-- este número
  });
};
