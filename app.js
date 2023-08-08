/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT, DB_ADRESS } = process.env;

//* * запуск сервера express.js и прослушивание запросов в порту*/
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));

mongoose.connect(DB_ADRESS)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('Error:', err));

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
