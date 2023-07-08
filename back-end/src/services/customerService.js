const models = require('../database/models');

const customerService = {
  async findAll() {
    const result = await models.Product.findAll({ raw: true });
    return result;
  },
  
  async findProductById(id) {
    const product = await models.Product.findByPk(id);
    return product;
  },

  async customer(data) {
    const { products, ...sale } = data;
    const saleId = await models.Sale.create(
      { ...sale, saleDate: new Date() },
      { raw: true },
    );
    await Promise.all(
      products.map((product) =>
        models.SaleProduct.create({
          saleId: saleId.id,
          productId: product.id,
          quantity: product.quantity,
        })),
    );
    return saleId;
  },

  async findById(id) {
    const customersById = await models.Sale.findByPk(id);
    return customersById;
  },

  async updateSaleStatus(id, status) {
    try {
      return models.Sale.update({ status }, { where: { id } });
    } catch (error) {
      throw new Error('deu ruim');
    }
  },
};

module.exports = customerService;
