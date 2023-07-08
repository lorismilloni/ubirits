const { Router } = require('express');
const loginController = require('../controllers/loginController');

const loginRouter = Router();

loginRouter.post('/login', loginController.login);
loginRouter.get('/login', loginController.getByRole);

module.exports = loginRouter;
