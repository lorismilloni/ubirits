const SaleProduct = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      field: 'sale_id'
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      field: 'product_id'
    },
    quantity: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    tableName: 'sales_products',
  });

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
      as: 'sales',
    });

    models.Sale.belongsToMany(models.Product, {
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
      as: 'products',
    });

  };

  return SaleProduct;
}

module.exports = SaleProduct;