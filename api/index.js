const express = require("express");
var bodyParser = require('body-parser')

app.use(express.static('public'))

const app = express();

app.use(bodyParser.json())

app.get("/api", (req, res) => {
  res.send("Home route!");
});

app.post("/api/post", (req, res) => {
  const body = req.body
  res.json(body);
});

const PORT = 3005;

app.listen(PORT, () => console.log("App running on port" + PORT));

module.exports = app;
