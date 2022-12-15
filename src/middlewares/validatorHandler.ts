import boom from '@hapi/boom';
import Joi from 'joi';

export const validatorHandler = (
  schema: Joi.ObjectSchema,
  property: string
) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error as any));
    }
    next();
  };
};
