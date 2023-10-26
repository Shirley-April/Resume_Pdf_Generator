const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");

const { createResume } = require("./create_resume");
const { uploadFile } = require("./dropbox/uploadFile");
const { downloadFile } = require("./dropbox/downloadFile");

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

    const upload_file = await uploadFile(filePath);
    const download_file_link = await downloadFile();

    if (upload_file.status === 200) {
      res.status(200).send({
        response: download_file_link,
      });
    }
  } catch (error) {
    res.status(500).send("Error creating the file: " + error.message);
  }
});

const PORT = 3005;

app.listen(PORT, () => console.log("App running on port" + PORT));

module.exports = app;
