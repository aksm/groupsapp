var moment = require('moment');
moment().format();

var now = moment();

		$(addUser).on("click", function() {

		    var newUser =

		        user_id: {
		            type: Sequelize.INTEGER,
		            autoIncrement: true,
		            primaryKey: true
		        },
		        user_name: Sequelize.STRING,
		        fb_login: Sequelize.STRING,
		        f_name: Sequelize.STRING,
		        l_name: Sequelize.STRING,
		        email: Sequelize.STRING,
		        created_timestamp: Sequelize.STRING 

		        {
		            user_name: $("#user_name").val().trim(),
		            fb_login: $("#fb_login").val().trim(),
		            f_name: $("#f_name").val().trim(),
		            l_name: $("#l_name").val().trim(),
		            email: $("#email").val().trim(),
		            created_timestamp: now;
		        };

		    var currentURL = window.location.origin;

		    $.post(currentURL + "/api/new", newCharacter)
		        .done(function(data) {
		            console.log(data);
		            alert("Adding character...")
		        })

		    $('#name').val("");
		    $('#role').val("");
		    $('#age').val("");
		    $('#forcepoints').val("");

		    return false;

		});
