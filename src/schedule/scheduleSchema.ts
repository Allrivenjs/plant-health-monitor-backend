import Joi from 'joi';

const id = Joi.number();

const dayNumber = Joi.number();
const active = Joi.boolean();
const cuantity = Joi.number().max(1000);
const hour = Joi.number().max(23).min(0);
const minutes = Joi.number().max(59).min(0);

const dayOfTheWeek = Joi.object({
  dayNumber: dayNumber.required(),
  active: active.required(),
  cuantity: cuantity.required(),
  hour: hour.required(),
  minutes: minutes.required(),
});

const createAScheduleScheme = Joi.object({
  monday: dayOfTheWeek.required(),
  tuesday: dayOfTheWeek.required(),
  wednesday: dayOfTheWeek.required(),
  thursday: dayOfTheWeek.required(),
  friday: dayOfTheWeek.required(),
  saturday: dayOfTheWeek.required(),
  sunday: dayOfTheWeek.required(),
});

const scheduleId = Joi.object({
  id: id.required(),
});

const editAScheduleScheme = Joi.object({
  monday: dayOfTheWeek.required(),
  tuesday: dayOfTheWeek.required(),
  wednesday: dayOfTheWeek.required(),
  thursday: dayOfTheWeek.required(),
  friday: dayOfTheWeek.required(),
  saturday: dayOfTheWeek.required(),
  sunday: dayOfTheWeek.required(),
});

export { createAScheduleScheme, editAScheduleScheme, scheduleId };
