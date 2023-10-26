require("dotenv").config();

const { Dropbox } = require("dropbox");

const deleteFile = () => {
  const dbx = new Dropbox({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  });

  dbx
    .filesDeleteV2({ path: "/resume.pdf" })
    .then((response) => console.log("FILE DELETED", response))
    .catch((error) => console.log("ERROR DELETIMG FILE", error));
};

module.exports = { deleteFile };
