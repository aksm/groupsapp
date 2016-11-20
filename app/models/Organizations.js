// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");

// sequelize (lowercase) references my connection to the DB. You could name it something else, but I was just following their convention.
var sequelize = require("../config/connection.js");

var Organization = sequelize.define("Organization", {
    org_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    org_name: Sequelize.STRING,
    admin_id: Sequelize.STRING,
    org_shortcode: Sequelize.STRING,
    fb_link: Sequelize.STRING,
    created_date: Sequelize.DATE
}, {
    timestamps: false
});

// Sync with DB
Organization.sync()

module.exports = Organization;
