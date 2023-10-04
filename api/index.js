const express = require("express");

const app = express();

app.get("/api", (req, res) => {
  res.send("Home route!");
});

app.get("/api/test", (req, res) => {
    res.send("Test route!");
  });

const PORT = 3005;

app.listen(PORT, () => console.log("App running on port" + PORT));

module.exports = app