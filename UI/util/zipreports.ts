import fs from "fs";
import archiver from "archiver"

export async function zipReport() {
  return new Promise((resolve, reject) => {

    const output = fs.createWriteStream("QA_Test_Report.zip");
    const archive = archiver("zip");

    archive.pipe(output);
    archive.directory("allure-report/", false);
    archive.finalize();

    output.on("close", () => resolve(true));
    archive.on("error", (err) => reject(err));

  });
}