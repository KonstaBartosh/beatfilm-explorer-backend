const rateLimit = require('express-rate-limit');
const { tooManyRequestsMessage } = require('./config');

//* * ограничитель запросов */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: tooManyRequestsMessage,
});

module.exports = authLimiter;
