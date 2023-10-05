const PDFDocument = require("pdfkit");
const fs = require("fs");

const createResume = (resume) => {
  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ margin: 40, size: "A4" });

    generateHeader(resume, doc);

    const path = `resume.pdf`;

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
