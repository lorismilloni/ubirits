module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('sales', [
      {
        user_id: 3,
        seller_id: 2,
        total_price: 22,
        delivery_address: 'Rua Canada, Apartamento Microsoft, Bloco Trybe',
        delivery_number: '47 986490818',
        sale_date: new Date(),
        status: 'Entregue',
      },
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
