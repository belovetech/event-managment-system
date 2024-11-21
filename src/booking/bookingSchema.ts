import Joi from 'joi';

const bookingSchema = Joi.object({
  seatId: Joi.string().required().messages({
    'string.empty': 'Seat ID is required.',
    'any.required': 'Seat ID is required.',
  }),
  eventId: Joi.string().required().messages({
    'string.empty': 'Event ID is required.',
    'any.required': 'Event ID is required.',
  }),
  name: Joi.string().required().messages({
    'string.empty': 'Name is required.',
    'any.required': 'Name is required.',
  }),
  email: Joi.string().required().messages({
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.',
  }),
});

export { bookingSchema };
