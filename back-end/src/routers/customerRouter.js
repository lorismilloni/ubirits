const { Router } = require('express');
const customerController = require('../controllers/customerController');

const customerRouter = Router();

customerRouter.get('/products/:id', customerController.findProductById);
customerRouter.get('/products', customerController.findAll);
customerRouter.post('/orders', customerController.addCustomer);

customerRouter.put('/orders/:id', customerController.updateSaleStatus);
customerRouter.get('/orders/:id', customerController.getByIdCustomer);

module.exports = customerRouter;
