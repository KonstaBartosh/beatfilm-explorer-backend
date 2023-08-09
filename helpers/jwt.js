const jwt = require('jsonwebtoken');
const { SECRET_STRING } = require('./config');

function createJwtToken(_id) {
  return jwt.sign(
    { _id },
    SECRET_STRING,
    { expiresIn: '7d' },
  );
}

function verifyJwtToken(token) {
  return jwt.verify(
    token,
    SECRET_STRING,
  );
}

module.exports = { createJwtToken, verifyJwtToken };
