const sellerService = require('../services/sellerService');

const sellerController = {
  async findAll(_req, res) {
    const orders = await sellerService.findAll();
    return res.status(200).json(orders);
  },

  async findBySellerId(req, res) {
    const { id } = req.params;
    const order = await sellerService.findBySellerId(id);
    return res.status(200).json(order);
  },
};

module.exports = sellerController;