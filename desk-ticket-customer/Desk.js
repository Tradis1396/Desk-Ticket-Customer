const express = require("express");
const app = express();
const request = require("request");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
// const mongoclient = mongodb.MongoClient;
// const url = "mongodb://localhost:27017";

app.use(cors());
app.use(bodyParser.json());

app.post("/Desk", (req, res) => {
  let jsondata = req.body;

  const options = {
    url: 'http://localhost:3600/customer',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8'
    },
    body: jsondata,
    json: true
  };

  request(options, function (err, res, body) {
  });
  res.json({ message: "success" });
});


app.listen(3000);