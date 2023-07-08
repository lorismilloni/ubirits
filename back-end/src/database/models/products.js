const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(3, 2).ZEROFILL,
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'url_image'
    },
  }, {
    timestamps: false,
    tableName: 'products',
  });

  return Product;
};

module.exports = Product;