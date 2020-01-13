const express = require("express");
const app = express();
const request = require("request");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";

app.use(cors());

app.use(bodyParser.json());


app.post('/customer', function (req, res) {
    mongoclient.connect(url, function (err, client) {
        if (err) throw err;

        var db = client.db("customerDB");
        var dbResult = db.collection("user").findOne({ creatorName: req.body.creatorName });

        dbResult.then(function (userData) {

            const options = {
                url: 'http://localhost:3700/support',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                },
                body: userData,
                json: true
            };
            request(options, function (err, res, body) {
            });
        });
        client.close();

    });

    res.send({ message: "success from ticket" });

});

app.listen(3600);