import Joi from 'joi';


const email = Joi.string().email();

const password = Joi.string().min(3).max(50);

const name = Joi.string().min(3).max(50);


const registerUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  name: name.required(),
});

export {
  registerUserSchema,
};
