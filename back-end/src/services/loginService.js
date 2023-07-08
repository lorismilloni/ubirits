const Joi = require('joi');
const md5 = require('md5');
const db = require('../database/models');
const ValidateError = require('../middlewares/ValidateError');
const { setToken } = require('../middlewares/tokenMiddleware');

const schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
}).messages({
  'string.empty': 'All fields must be filled',
  'any.required': 'All fields must be filled',
});

const loginService = {
  async login(body) {
    const { error } = schema.validate(body);
    if (error) throw new ValidateError(400, error.message);

    const { email, password } = body;

    const dataValues = await db.User.findOne({
      where: { email }, raw: true,
    });

    if (!dataValues) throw new ValidateError(404, 'Incorrect email or password');

    const { id, name, role } = dataValues;

    const hashVerify = md5(password);
    if (dataValues.password !== hashVerify) {
      throw new ValidateError(401, 'Incorrect email or password');
    }

    const token = setToken({ id, name, role });
    // console.log(token);

    return { id, name, email, role, token };
  },

  async getByRole() {
    const role = 'seller';

    const dataValues = await db.User.findOne({
      where: { role }, raw: true,
    });

    return { id: dataValues.id, name: dataValues.name };
  },
};

module.exports = loginService;
