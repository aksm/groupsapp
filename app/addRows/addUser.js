var moment = require('moment');
moment().format();

var now = moment();

		$(addUser).on("click", function() {

		    var newUser = sequuelize.define("newUser", {

		        user_id: {
		            type: Sequelize.INTEGER,
		            autoIncrement: true,
		            primaryKey: true
		        },

		        user_name: Sequelize.STRING,
		        facebook_id: Sequelize.STRING,
		        google_id: Sequelize.STRING,
		        twitter_id: Sequelize.STRING,
		        linkedin_id: Sequelize.STRING,
		        f_name: Sequelize.STRING,
		        l_name: Sequelize.STRING,
		        email: Sequelize.STRING,
		        created_timestamp: Sequelize.STRING 

		        }, {
		            user_name: $("#user_name").val().trim(),
		            facebook_id: $("#fb_login").val().trim(),
		            f_name: $("#f_name").val().trim(),
		            l_name: $("#l_name").val().trim(),
		            email: $("#email").val().trim(),
		            created_timestamp: now
		        });

		    var currentURL = window.location.origin;

		    $.post(currentURL + "/api/new", newUser)
		        .done(function(data) {
		            console.log(data);
		            alert("Adding character...");
		        });

		    $('#name').val("");
		    $('#role').val("");
		    $('#age').val("");
		    $('#forcepoints').val("");

		    return false;

		});
