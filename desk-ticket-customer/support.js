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


app.post('/support', function (req, res) {

    mongoclient.connect(url, function (err, client) {
        if (err) throw err;

        var db = client.db("supportDB");
        db.collection("user").insertOne({ creatorName: req.body.creatorName, subject: req.body.subject }, function (err, data) {
            if (err) throw err;
            const options = {
                url: 'http://localhost:3500/ticket',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                },
                body: data.ops,
                json: true
            };
            request(options, function (err, res, body) {
            });
            res.json({
                message: "registered"
            });
        });
        client.close();

    });



});

app.listen(3700);