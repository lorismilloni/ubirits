const errors = {
  validationError: 400,
  unauthorizedError: 401,
  notFoundError: 404,
  sequelizeUniqueConstraintError: 409,
  unprocessableEntity: 422,
};

const errorMiddleware = ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  if (!status) return res.sendStatus(500);
  return res.status(status).json({ message });
};

module.exports = errorMiddleware;

//  throw { name: 'notFoundError', message: 'Não encontrada' };
// if (!user) { const error = new Error('Incorrect email or password'); error.name = 'invalidField'; throw error; }