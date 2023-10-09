module.exports = function (sequelize, DataTypes) {
  const Campaign = sequelize.define(
    "Campaign",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      campaignName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      campaignQuestions: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      activeDateTime: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      indexes: [],
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "campaign",
    }
  );

  Campaign.associate = function (models) {};

  Campaign.sync();

  return Campaign;
};
