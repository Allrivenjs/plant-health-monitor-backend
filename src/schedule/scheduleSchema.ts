import Joi from 'joi';


const dayOfTheWeek = Joi.boolean();

const id = Joi.number();


const createAScheduleScheme = Joi.object({
  monday: dayOfTheWeek,
  tuesday: dayOfTheWeek,
  wednesday: dayOfTheWeek,
  thursday: dayOfTheWeek,
  friday: dayOfTheWeek,
  saturday: dayOfTheWeek,
  sunday: dayOfTheWeek,
});

const scheduleId = Joi.object({
  id: id.required(),
});

const editAScheduleScheme = Joi.object({
  monday: dayOfTheWeek,
  tuesday: dayOfTheWeek,
  wednesday: dayOfTheWeek,
  thursday: dayOfTheWeek,
  friday: dayOfTheWeek,
  saturday: dayOfTheWeek,
  sunday: dayOfTheWeek,
});

export {
  createAScheduleScheme,
  editAScheduleScheme,
  scheduleId,
};
