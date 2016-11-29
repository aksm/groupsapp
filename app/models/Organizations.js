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
    member_count: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    org_shortcode: Sequelize.STRING,
    fb_link: Sequelize.STRING,
    created_timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }
}, {
    timestamps: false
});

// Sync with DB
Organization.sync();

module.exports = Organization;
