// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");

// sequelize (lowercase) references my connection to the DB. You could name it something else, but I was just following their convention.
var sequelize = require("../config/connection.js");

var Task = sequelize.define("Task", {
    task_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    event_id: Sequelize.INTEGER,
    task_name: Sequelize.STRING,
    volunteers_needed: Sequelize.INTEGER,
    volunteer_count: Sequelize.STRING
}, {
    timestamps: false
});

// Sync with DB
Task.sync();

module.exports = Task;
