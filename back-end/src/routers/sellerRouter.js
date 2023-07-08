const { Router } = require('express');
const sellerController = require('../controllers/sellerController');

const sellerRouter = Router();

sellerRouter.get('/orders/:id', sellerController.findBySellerId);
sellerRouter.get('/orders', sellerController.findAll);

module.exports = sellerRouter;