const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const db = {};

const connect = async () => {
  let sequelize = null;
  const host = process.env.POSTGRES_URL;
  const port = process.env.POSTGRES_PORT;
  const engine = process.env.POSTGRES_ENGINE;
  const username = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASS;
  sequelize = new Sequelize("myFirstDb", username, password, {
    dialect: engine,
    host,
    port,
    logging: false,
    dialectOptions: {
      useUTC: true,
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 5,
      idle: 10000,
      acquire: 30000,
    },
    operatorsAliases: false,
  });

  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = Sequelize;
  db.sequelize = sequelize;

  return db;
};

module.exports = connect();
