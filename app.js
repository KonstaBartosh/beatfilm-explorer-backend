const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const { SERVER_PORT, DB } = require('./helpers/config');
const router = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

//* * запуск сервера express.js */
app.listen(SERVER_PORT, () => console.log(`App listening on port: ${SERVER_PORT}`));

mongoose.connect(DB)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('Error:', err));

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
// app.use(error);
