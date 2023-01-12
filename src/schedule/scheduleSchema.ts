import Joi from 'joi';


const id = Joi.number();

const dayNumber = Joi.number();
const active = Joi.boolean();
const cuantity = Joi.number().max(1000);

const foo = Joi.object

const dayOfTheWeek = Joi.object({
  dayNumber: dayNumber.required(), 
  active: active.required(),
  cuantity: cuantity.required(),
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

export {
  createAScheduleScheme,
  editAScheduleScheme,
  scheduleId,
};
