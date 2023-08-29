const rateLimit = require('express-rate-limit');

//* * ограничитель запросов */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Слишком много запросов, пожалуйста попробуйте позже',
});

module.exports = authLimiter;
