const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const ValidateError = require('./ValidateError');

const secret = fs.readFileSync(path.join(__dirname, '..', '..', 'jwt.evaluation.key'),
  { encoding: 'utf-8' });

const auth = (token) => {
  if (!token) throw new ValidateError(401, 'Token not found');
  try {
    const data = jwt.verify(token, secret);
    return data;
  } catch (error) {
    throw new ValidateError(401, 'Token must be a valid token');
  }
};

module.exports = auth;