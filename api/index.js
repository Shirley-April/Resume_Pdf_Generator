const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("Home route!");
});

app.post("/api/post", (req, res) => {
  const body = req.body;
  res.json(body);
});

app.get("/api/file", (req, res) => {
  const file_path = path.join(__dirname, "/public");
  res.sendFile("DStv-logo.jpg", { root: file_path });
});

const PORT = 3005;

app.listen(PORT, () => console.log("App running on port" + PORT));

module.exports = app;
