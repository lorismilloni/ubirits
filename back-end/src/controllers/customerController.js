const customerService = require('../services/customerService');

const customerController = {
  async findAll(_req, res) {
    const products = await customerService.findAll();
    return res.status(200).json(products);
  },

  async addCustomer(req, res) {
    const response = await customerService.customer(req.body);
    return res.status(201).json(response);
  },
  async getByIdCustomer(req, res) {
    const { id } = req.params;
    const customersById = await customerService.findById(id);
    return res.status(200).json(customersById);
  },
  async updateSaleStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const customersUpdate = await customerService.updateSaleStatus(id, status);
    return res.status(200).json(customersUpdate);
  },

  async findProductById(req, res) {
    const { id } = req.params;
    const product = await customerService.findProductById(id);
    return res.status(200).json(product);
  },
};

module.exports = customerController;
