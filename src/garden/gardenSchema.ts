import Joi from 'joi';


const name = Joi.string().min(3).max(50);

const image = Joi.string();

const plant_type = Joi.string().min(3).max(50);

const min_temperature = Joi.number();

const max_temperature = Joi.number();

const user_id = Joi.number();


const createAGardenScheme = Joi.object({
  name: name.required(),
  image: image.required(),
  plant_type: plant_type.required(),
  min_temperature: min_temperature.required(),
  max_temperature: max_temperature.required(),
  user_id: user_id.required(),
});

export {
  createAGardenScheme,
};
