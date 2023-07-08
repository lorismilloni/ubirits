const models = require('../database/models');
const ValidateError = require('../middlewares/ValidateError');

const saleService = {
  async getSales(sellerId) {
    const orders = await models.Sale.findByPk(sellerId, {
      include: [{
        model: models.Product,
        as: 'products',
        through: { attributes: ['quantity'] },
      }],
    });

    if (!orders) throw new ValidateError(404, 'Order does not exist');

    return orders;
  },

};

module.exports = saleService;
