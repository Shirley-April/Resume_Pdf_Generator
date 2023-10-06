const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path")

const createResume = (resume) => {
  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ margin: 40, size: "A4" });

    generateHeader(resume, doc);

    const current_dir = __dirname
    const parent_dir = path.dirname(current_dir)

    const file_path  = path.join(parent_dir, "/tmp/resume.pdf")

    doc.end();
    const stream = doc.pipe(fs.createWriteStream(file_path));

    stream.on("finish", () => {
      resolve(file_path);
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
