const express = require("express");
const app = express();
const cors = require("cors");
const request = require("request");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";

app.use(cors());
app.use(bodyParser.json());

var username;
app.post('/ticket', function (req, res) {
    username = req.body[0].creatorName;

    mongoclient.connect(url, function (err, client) {
        if (err) throw err;

        var db = client.db("ticketDB");
        db.collection("user").insertOne({ creatorName: req.body[0].creatorName, subject: req.body[0].subject }, function (err, data) {
            if (err) throw err;
            res.json({
                message: "registered in ticket"
            });
        });
        client.close();

    });



});

app.get('/ticket', function (req, res) {
    mongoclient.connect(url, function (err, client) {
        if (err) throw err;

        var db = client.db("ticketDB");

        var dbResult = db.collection("user").findOne({ creatorName: username });

        dbResult.then(function (userData) {
            res.json({
                userData: userData
            });

        });
        client.close();
    });
});

app.listen(3500);