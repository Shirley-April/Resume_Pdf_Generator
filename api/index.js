const express = require("express");
var bodyParser = require("body-parser");
const path = require("path")

const { createResume } = require("./create_resume");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("Home route!");
});

app.post("/api/file", async (req, res) => {
  const resume = req.body;

  try {
    const filePath = await createResume(resume);
    const current_dir = __dirname
    const parent_dir = path.dirname(current_dir)

    res.sendFile(filePath, { root: parent_dir });
  } catch (error) {
    res.status(500).send("Error creating the file: " + error.message);
  }
});

const PORT = 3005;

app.listen(PORT, () => console.log("App running on port" + PORT));

module.exports = app;
