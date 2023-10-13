module.exports = function (sequelize, DataTypes) {
  const Client = sequelize.define(
    "Client",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      domain: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      identifier: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      active_campaign: {
        type: DataTypes.UUID,
        allowNull: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "campaign",
          key: "id",
        },
      },
    },
    {
      indexes: [],
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "client",
      hooks: {
        beforeUpdate: (client, options) => {
          if (client.changed("active_campaign")) {
            // message is like [ADMIN] [Campaign] [Date]
            // create if clientCampaignHistory not exist else update the  message
            sequelize.models["ClientCampaignHistory"]
              .findOrCreate({
                where: {
                  client_id: client.id,
                  campaign_id: client.active_campaign,
                },
                defaults: {
                  message: [
                    `[ADMIN] [${client.name}] [${
                      client.active_campaign
                    }] [${new Date().toISOString()}]`,
                  ],
                },
              })
              .then(([clientCampaignHistory, created]) => {
                if (!created) {
                  clientCampaignHistory.message.push(
                    `[ADMIN] [${client.name}] [${
                      client.active_campaign
                    }] [${new Date().toISOString()}]`
                  );
                  clientCampaignHistory.save();
                }
              });
          }
        },
      },
    }
  );

  Client.associate = function (models) {
    Client.belongsTo(models.Campaign, { foreignKey: "active_campaign" });
  };

  Client.sync();

  return Client;
};
