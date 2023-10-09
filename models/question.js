module.exports = function (sequelize, DataTypes) {
  const Question = sequelize.define(
    "Question",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      question: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      options: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      answer: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      indexes: [],
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "question",
    }
  );

  Question.associate = function (models) {};

  Question.sync();

  return Question;
};
