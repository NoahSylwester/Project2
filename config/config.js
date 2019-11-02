// /* eslint-disable camelcase */
// require("dotenv").config();

// module.exports = {
//   development: {
//     username: "root",
//     password: process.env.DB_PASS,
//     database: "exampledb",
//     host: "localhost",
//     dialect: "mysql"
//   },
//   test: {
//     username: "root",
//     password: null,
//     database: "testdb",
//     host: "localhost",
//     dialect: "mysql",
//     logging: false
//   },
//   production: {
//     use_env_variable: "JAWSDB_URL",
//     dialect: "mysql"
//   }
// };

var Sequelize = require("sequelize");

var sequelize = new Sequelize("cardgame", "root", "Pa$$w0rd", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
