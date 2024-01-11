require("dotenv").config();
const path = require("path");


const { Dropbox } = require("dropbox");

const fs = require("fs");

const uploadFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const dbx = new Dropbox({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    });

    const mypath = path.join(__dirname, '..', '..', filePath);

    fs.readFile(mypath, (err, contents) => {
      if (err) {
        console.log("3333443", filePath);
        console.log("mypath err", mypath);

        reject({ message: "Error reading file", error: err });
      } else {
        console.log("mypath good", mypath);
        dbx
          .filesUpload({ path: `/resume.pdf`, contents })
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
