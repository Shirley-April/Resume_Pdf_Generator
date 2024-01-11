const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const createResume = (resume) => {
  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ margin: 40, size: "A4" });

    generateHeader(resume, doc);
    generateContact(resume, doc);
    generateSkills(resume, doc);
    generateEducation(resume, doc);
    generateDivider(doc);
    generateProfile(resume, doc);
    generateWorkExp(resume, doc);
    generateKeyWords(resume, doc);

    const file_path = "resume.pdf";
    const tmpDir = '/tmp';

    doc.end();
    const stream = doc.pipe(fs.createWriteStream(path.join(tmpDir, file_path)));

    stream.on("finish", () => {
      resolve(file_path);
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
};

const bold_font = `${__dirname}/public/Roboto-Bold.ttf`;
const regular_font = `${__dirname}/public/Roboto-Regular.ttf`;

const generateHeader = (resume, doc) => {
  doc.font(bold_font).fontSize(24).text(`${resume.contact.name}`);
  doc.font(regular_font).fontSize(10).text(`${resume.contact.jobTitle}`);
  doc.moveDown(2);
};

const generateDivider = (doc) => {
  doc
    .moveTo(205, 100) // set the current point
    .lineTo(205, 210)
    .strokeColor("#EAF1FB")
    .stroke();

  doc.moveDown(2);
  doc
    .moveTo(205, 228) // set the current point
    .lineTo(205, 755)
    .strokeColor("#EAF1FB")
    .stroke();
};

const generateContact = (resume, doc) => {
  doc.font(bold_font).fontSize(12).text(`CONTACT`);
  doc.moveDown(0.2);
  doc.font(bold_font).fontSize(10).text(`Email`);
  doc.moveDown(0.2);

  doc.font(regular_font).fontSize(10).text(`${resume.contact.email}`);
  doc.moveDown(0.3);

  doc.font(bold_font).fontSize(10).text(`Phone`);
  doc.moveDown(0.2);

  doc.font(regular_font).fontSize(10).text(`${resume.contact.phone}`);
  doc.moveDown(0.3);

  doc.font(bold_font).fontSize(10).text(`Github`);
  doc.moveDown(0.2);
  doc.font(regular_font).fontSize(10).text(`${resume.contact.github}`);
  doc.moveDown(0.3);


  doc.font(bold_font).fontSize(10).text(`LinkedIn`);
  doc.moveDown(0.2);
  doc
    .font(regular_font)
    .fontSize(10)
    .text(`${resume.contact.linkedin}`, { width: "150" });
  doc.moveDown(2);
};

const generateSkills = (resume, doc) => {
  doc.font(bold_font).fontSize(12).text(`SKILLS`);

  doc
    .font(regular_font)
    .fontSize(10)
    .moveDown(0.2)
    .list(resume.skills.split("\n"), {
      listType: "bullet",
      bulletRadius: 1.5,
      lineGap: 4,
    });
  doc.moveDown();
};

const generateEducation = (resume, doc) => {
  doc.font(bold_font).fontSize(12).text(`EDUCATION`);
  doc.moveDown(0.2);

  let i;

  for (i = 0; i < resume.education.length; i++) {
    const edu = resume.education[i];

    doc
      .font(regular_font)
      .fontSize(9)
      .text(`${edu.startDate} - ${edu.endDate}`);
    doc.moveDown(0.2);

    doc.font(regular_font).fontSize(10).text(`${edu.fieldOfStudy}`);
    doc.moveDown(0.3);
    doc.font(regular_font).fontSize(10).text(`${edu.school}`);
    doc.moveDown(0.4);

    doc.moveDown();
  }
};

const generateProfile = (resume, doc) => {
  doc.font(bold_font).fontSize(12).text(`PROFILE`, 220, 102);
  doc.moveDown(0.2);

  doc
    .font(regular_font)
    .fontSize(10)
    .text(`${resume.summary}`, { align: "justify", lineGap: 4 });
  doc.moveDown(2);
};

const generateWorkExp = (resume, doc) => {
  doc.font(bold_font).fontSize(12).text(`EXPERIENCE`);
  doc.moveDown(0.2);

  let i;

  for (i = 0; i < resume.workExperience.length; i++) {
    const exp = resume.workExperience[i];

    doc
      .font(regular_font)
      .fontSize(9)
      .text(`${exp.startDate} - ${exp.endDate}`);
    doc.moveDown(0.3);

    doc.font(bold_font).fontSize(10).text(`${exp.jobTitle} | ${exp.company}`);
    doc.moveDown(0.4);

    doc
      .font(regular_font)
      .fontSize(10)
      .moveDown(0.2)
      .list(exp.description.split("\n"), {
        listType: "bullet",
        bulletRadius: 1.5,
        lineGap: 4,
      });

    doc.moveDown();
  }
};

const generateKeyWords = (resume, doc) => {
  doc.moveDown(1).fontSize(1).fill("#FFFFFF").text(resume.keywords, 1, 5);
};

module.exports = { createResume };
