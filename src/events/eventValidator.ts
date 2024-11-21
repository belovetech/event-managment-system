import Joi from 'joi';

const eventSchema = Joi.object({
  title: Joi.string().trim().min(3).required(),
  description: Joi.string().trim().min(3).required(),
  date: Joi.date().required(),
  endDate: Joi.date().required(),
  location: Joi.string().required(),
});

export { eventSchema };
