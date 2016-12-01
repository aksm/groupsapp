// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize"); 

// sequelize (lowercase) references my connection to the DB. You could name it something else, but I was just following their convention.
var sequelize = require("../config/connection.js"); 

var GroupEvent = sequelize.define("GroupEvent", {
  event_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  event_start_date: Sequelize.DATE,
  event_end_date: Sequelize.DATE,
  created_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  org_id: Sequelize.INTEGER,
  event_name: Sequelize.STRING,
  event_description: Sequelize.TEXT,
  event_url: Sequelize.STRING,
  event_img: Sequelize.STRING
},
{
    timestamps: false
});

// Sync with DB
GroupEvent.sync();

module.exports = GroupEvent;
