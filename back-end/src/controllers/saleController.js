const saleService = require('../services/saleService');

const saleController = {
  async getSales(req, res) {
    try {
      const { id } = req.params;
      const order = await saleService.getSales(id);
      return res.status(200).json(order);
    } catch (error) {
      return error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(500).json({ message: error.message });
    }
  },
};

module.exports = saleController;