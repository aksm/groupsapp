// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize"); 

// sequelize (lowercase) references my connection to the DB. You could name it something else, but I was just following their convention.
var sequelize = require("../config/connection.js"); 

var Event = sequelize.define("Event", {
  event_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  event_start_date: Sequelize.DATE,
  event_end_date: Sequelize.DATE,
  created_date: Sequelize.DATE,
  org_shortcode: Sequelize.STRING,
  event_name: Sequelize.STRING,
  description: Sequelize.STRING,
  url: Sequelize.STRING,
  img: Sequelize.STRING
},
{
    timestamps: false
});

// Sync with DB
Event.sync();

module.exports = Event;
