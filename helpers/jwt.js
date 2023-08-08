const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

function createJwtToken(_id) {
  return jwt.sign(
    { _id },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    { expiresIn: '7d' },
  );
}

function verifyJwtToken(token) {
  return jwt.verify(
    token,
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  );
}

module.exports = { createJwtToken, verifyJwtToken };
