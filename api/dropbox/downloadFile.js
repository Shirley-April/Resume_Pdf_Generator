require("dotenv").config();

const { Dropbox } = require("dropbox");

const downloadFile = () => {
  return new Promise((resolve, reject) => {
    const dbx = new Dropbox({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    });

    dbx
      .filesGetTemporaryLink({ path: "/resume.pdf" })
      .then((response) => {
        resolve(response.result.link);
      })
      .catch((error) => {
        console.log("DOWNLOAD ERR", error);
        reject({ message: "Link download error", error });
      });
  });
};

module.exports = { downloadFile };
