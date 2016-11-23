var Event = require("../models/Events.js");
var Organization = require("../models/Organizations.js");
var Task = require("../models/Tasks.js");
var User = require("../models/Users.js");

module.exports = function(app) {

    app.get("/org/:org_id?", function(req, res) {

        console.log("Organizations say hello");


        // If the user provides a specific org_id in the URL...
        if (req.params.org_id) {


            Organization.findAll({
                where: {
                    org_id: req.params.org_id
                }
            }).then(function(result) {
                res.json(result);
            });
        }

        // Otherwise...
        else {

            // Run a quick test to confirm.
            Organization.findAll({})
                .then(function(result) {
                    res.json(result);
                });
        }
    });


    app.get("/event/:event_id?", function(req, res) {

        console.log("Events say hello");

                        if (req.params.user_id) {
            Event.findAll({
                where: {
                    event_id: req.params.task_id
                }
            }).then(function(result) {
                res.json(result);
            });

        }else{

        // Run a quick test to confirm.
        Event.findAll({})
            .then(function(result) {
                res.json(result);
            });
}
    });

    app.get("/task/:task_id?", function(req, res) {

        console.log("Tasks say hello");

                if (req.params.user_id) {
                    Task.findAll({
                        where: {
                            task_id: req.params.task_id
                        }
                    }).then(function(result) {
                        res.json(result);
                    });

                } else {


        // Run a quick test to confirm.
        Task.findAll({})
            .then(function(result) {
                res.json(result);
            });
}
    });

    app.get("/user/:user_id?", function(req, res) {

        console.log("Users say hello");

        if (req.params.user_id) {
            User.findAll({
                where: {
                    user_id: req.params.user_id
                }
            }).then(function(result) {
                res.json(result);
            });
        } else {

            // Run a quick test to confirm.
            User.findAll({})
                .then(function(result) {
                    res.json(result);
                });
        }
    });

    app.post("/org/:action?", function(req, res) {
        switch(req.params.action) {
            case "add":
                console.log(req.body.group+" created.");
                res.redirect("/dashboard");
            break;
            case "join":
                console.log(req.body.group+" joined.");
                res.redirect("/dashboard");
            break;
            default:
            console.log("WTF happened?");
        }
    });
};
