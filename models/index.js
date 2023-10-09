require("dotenv").config();
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);

const dbConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  dialect: "postgres",
};

var db = {};
const Op = Sequelize.Op;

const ENV = process.env.NODE_ENV || "development";

const sequelize = new Sequelize(
  `postgres://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
  { logging: false }
);

sequelize
  .authenticate()
  .then(function () {
    console.log(
      "Connection has been established successfully to " + ENV + " environment."
    );
  })
  .catch(function (err) {
    console.log(
      "Unable to connect to the " +
        ENV +
        " database:" +
        JSON.stringify(err, null, 2)
    );
  });

const validFilenameRegex = /^[a-zA-Z0-9_-]+\.js$/;

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (
      validFilenameRegex.test(file) &&
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  })
  .forEach(function (file) {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

module.exports = db;
