var Event = require("../models/Events.js");
var Organization = require("../models/Organizations.js");
var Task = require("../models/Tasks.js");
var User = require("../models/Users.js");

module.exports = function(app) {

        app.get("/org/:org_id?", function(req, res) {

                    console.log("Organizations say hello");


                        // If the user provides a specific character in the URL...
                        if (req.params.org_id) {

                            // Then display the JSON for ONLY that character.
                            // (Note how we're using the ORM here to run our searches)
                            Organization.findAll({
                                where: {
                                    routeName: req.params.org_id
                                }
                            }).then(function(result) {
                                res.json(result);
                            })
                        }

                        // Otherwise...
                        else {

                            // Run a quick test to confirm.
                            Organization.findAll({})
                                .then(function(result) {
                                    res.json(result)
                                })
                        }
                    });


                    app.get("/event/:event_id?", function(req, res) {

                        console.log("Events say hello");

                        // Run a quick test to confirm.
                        Event.findAll({})
                            .then(function(result) {
                                res.json(result)
                            })

                    });

                    app.get("/task/:task_id?", function(req, res) {

                        console.log("Tasks say hello");

                        // Run a quick test to confirm.
                        Task.findAll({})
                            .then(function(result) {
                                res.json(result)
                            })

                    });

                    app.get("/user/:user_id?", function(req, res) {

                        console.log("Users say hello");

                        // Run a quick test to confirm.
                        User.findAll({})
                            .then(function(result) {
                                res.json(result)
                            })

                    });
                }
