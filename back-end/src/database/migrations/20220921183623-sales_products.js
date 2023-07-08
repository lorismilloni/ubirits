'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      sale_id: {
        allowNull: false,
        field: 'sale_id',
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'sales',
          },
          key: 'id',
        },
      },
      product_id: {
        allowNull: false,
        field: 'product_id',
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'products',
          },
          key: 'id',
        },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales_products');
  }
};
