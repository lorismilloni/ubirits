const models = require('../database/models');

const include = [
  { model: models.Product, as: 'products', through: { attributes: ['quantity'] } }, 
  { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
  { model: models.User, as: 'seller', attributes: { exclude: ['password'] } },
];

const sellerService = {

  async findAll() {
    const orders = await models.Sale.findAll({ include });
    return orders;
  },

  async findBySellerId(id) {
    // console.log(id);
    const order = await models.Sale.findOne({ where: { id }, include });
    return order;
  },

};

module.exports = sellerService;