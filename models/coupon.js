module.exports = function (sequelize, DataTypes) {
  const Coupon = sequelize.define(
    "Coupon",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      couponCode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      couponValue: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      shopifyUserID: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      domain: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      indexes: [],
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "coupon",
    }
  );

  Coupon.associate = function (models) {};

  Coupon.sync();

  return Coupon;
};
