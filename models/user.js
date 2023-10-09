module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email address already in use!",
        },
        validate: {
          len: {
            args: [6, 128],
            msg: "Email address must be between 6 and 128 characters in length",
          },
          isEmail: {
            msg: "Email address must be valid",
          },
        },
      },
      wallet: {
        allowNull: true,
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
    },
    {
      indexes: [{ fields: ["email"] }],
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "user",
    }
  );

  User.associate = function (models) {};

  User.sync();

  return User;
};
