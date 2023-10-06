const PDFDocument = require("pdfkit");
const fs = require("fs");

const createResume = (resume) => {
  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ margin: 40, size: "A4" });

    generateHeader(resume, doc);

    const path = `${__dirname}/tmp/resume.pdf`;

    doc.end();
    const stream = doc.pipe(fs.createWriteStream(path));

    stream.on("finish", () => {
      resolve("resume.pdf");
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
};

const bold_font = `${__dirname}/public/Roboto-Bold.ttf`
const regular_font = `${__dirname}/public/Roboto-Regular.ttf`

const generateHeader = (resume, doc) => {
  doc.fontSize(24).text(`${resume.contact.name}`);
  doc
    .font(regular_font)
    .fontSize(10)
    .text(`${resume.contact.jobTitle}`);
  doc.moveDown(2);
};

module.exports = { createResume };
