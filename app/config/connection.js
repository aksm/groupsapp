// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");

// Selects a connection (can be changed quickly as needed)

// Creates mySQL connection using Sequelize
var sequelize = new Sequelize(process.env.JAWSDB_URL,
{
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }

});

// Exports the connection for other files to use
module.exports = sequelize;