require("dotenv").config();

const { Dropbox } = require("dropbox");

const fs = require("fs");

const uploadFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const dbx = new Dropbox({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    });

    fs.readFile(filePath, (err, contents) => {
      if (err) {
        reject({ message: "Error reading file", error: err });
      } else {
        dbx
          .filesUpload({ path: `/${filePath}`, contents })
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            console.log("upload ERR", err);
            reject({ message: "Error uploading file", error: err });
          });
      }
    });
  });
};

module.exports = { uploadFile };
