const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Home route!");
});

const PORT = 3005;

app.listen(PORT, () => console.log("App running on port" + PORT));

module.exports = app