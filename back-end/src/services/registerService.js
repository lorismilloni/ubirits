const Joi = require('joi');
const md5 = require('md5');
const models = require('../database/models');
const ValidateError = require('../middlewares/ValidateError');

const schema = Joi.object({
  name: Joi.string().required().min(12),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
}).messages({
  'string.empty': 'All fields must be filled',
  'any.required': 'All fields must be filled',
});

const registerService = {
  async register(body) {
    const { error } = schema.validate(body);
    if (error) throw new ValidateError(400, error.message);

    const { name, email, password } = body;
    console.log(body);

    const dataValues = await models.User.findOne({
      where: { name, email },
    });
    // console.log('dataValues');
    if (dataValues) throw new ValidateError(409, 'User already exists');

    const createHash = md5(password);

    // if (!createHash) throw ValidateError(401, 'Incorrect name, email or password');

    const newUser = { name, email, password: createHash };
    const createUser = await models.User.create(newUser);
    return createUser;
  },
};

module.exports = registerService;
