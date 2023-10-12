module.exports = function (sequelize, DataTypes) {
  const ClientCampaignHistory = sequelize.define(
    "ClientCampaignHistory",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "client",
          key: "id",
        },
      },
      campaign_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "campaign",
          key: "id",
        },
      },
      message: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
    },
    {
      indexes: [],
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "clientCampaignHistory",
    }
  );

  ClientCampaignHistory.associate = function (models) {
    ClientCampaignHistory.belongsTo(models.Client, { foreignKey: "client_id" });
    ClientCampaignHistory.belongsTo(models.Campaign, {
      foreignKey: "campaign_id",
    });
  };

  ClientCampaignHistory.sync();

  return ClientCampaignHistory;
};
