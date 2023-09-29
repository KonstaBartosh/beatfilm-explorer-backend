const { celebrate, Joi } = require('celebrate');
const { EMAIL_REGEX, LINK_REGEX } = require('../helpers/config');

const registerValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().pattern(EMAIL_REGEX),
    password: Joi.string().required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EMAIL_REGEX),
    password: Joi.string().required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().pattern(EMAIL_REGEX),
  }),
});

const validateUSerId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});

const validateNewMovie = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().min(2).required(),
    nameEN: Joi.string().min(2).required(),
    country: Joi.string().min(2).required(),
    director: Joi.string().min(2).required(),
    year: Joi.string().min(2).max(4).required(),
    description: Joi.string().min(2).required(),
    duration: Joi.number().required(),
    image: {
      url: Joi.string().required().pattern(LINK_REGEX),
    },
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().pattern(LINK_REGEX),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  registerValidation,
  loginValidation,
  validateUpdateUser,
  validateNewMovie,
  validateUSerId,
};
