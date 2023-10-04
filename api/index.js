const express = require("express");

const app = express();

app.get("/api", (req, res) => {
  res.send("Home route!");
});

app.post("/api/post", (req, res) => {
  const body = { status: 200, message: "POST Request" };
  res.json(body);
});

const PORT = 3005;

app.listen(PORT, () => console.log("App running on port" + PORT));

module.exports = app;
