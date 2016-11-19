var Event = require("../models/Events.js")

module.exports = function(app){

    app.get("/", function(req, res){

        console.log("Hello");

        // Run a quick test to confirm.
        Event.findAll({})
            .then(function(result) {
                res.json(result)
            })

    })

}