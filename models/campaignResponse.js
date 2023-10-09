module.exports = function (sequelize, DataTypes) {
  const CampaignResponse = sequelize.define(
    "CampaignResponse",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "user",
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
      response: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
    },
    {
      indexes: [],
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "campaignResponse",
    }
  );

  CampaignResponse.associate = function (models) {
    CampaignResponse.belongsTo(models.User, { foreignKey: "user_id" });
    CampaignResponse.belongsTo(models.Campaign, { foreignKey: "campaign_id" });
  };

  CampaignResponse.sync();

  return CampaignResponse;
};
