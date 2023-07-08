module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('sales_products', [
      {
        sale_id: 1,
        product_id: 1,
        quantity: 10,
      },
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sales_products', null, {});
  },
};