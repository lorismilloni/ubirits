const { Router } = require('express');
const saleController = require('../controllers/saleController');

const saleRouter = Router();

saleRouter.get('/orders/:id', saleController.getSales);

module.exports = saleRouter;