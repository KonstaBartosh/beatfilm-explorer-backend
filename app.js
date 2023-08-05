/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

//* * запуск сервера express.js и прослушивание запросов в порту*/
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));

mongoose.connect('mongodb://127.0.0.1:27017/diploma_DB')
	.then(() => console.log('Connected to DB'))
	.catch((err) => console.error('Error:', err));
