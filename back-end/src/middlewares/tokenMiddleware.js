const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const secret = fs.readFileSync(path.join(__dirname, '..', '..', 'jwt.evaluation.key'),
  { encoding: 'utf-8' });

const verifyToken = (password) => jwt.verify(password, secret);

const setToken = (payload) => jwt.sign({ data: payload }, secret);

module.exports = {
  verifyToken,
  setToken,
};
