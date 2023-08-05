const express = require('express');
const app = express();

const { PORT = 3000 } = process.env;

//* * запуск сервера express.js и прослушивание запросов в порту*/
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));