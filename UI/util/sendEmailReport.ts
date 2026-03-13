import nodemailer from "nodemailer";
import { zipReport } from "./zipreports";
import fs from "fs";

async function sendEmail() {

    // zip the report first
    await zipReport();

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "atthilivamsikrishna@gmail.com",
            pass: "chsxbqztgyotxuzm"
        }
    });

    const mailOptions = {
        from: "QA Automation",
        to: "atthilivamsikrishna1@email.com",
        subject: "Playwright Automation Test Report",
        text: "Automation execution Failed. Please find the Allure report attached.",
        html: `
            <h3>Automation Test Failed</h3>
            <p>Click the link below to view the Allure report:</p>
            <a href="https://atthilivamsikrishna-boop.github.io/playwright-automation/">Open Allure Report</a>
  `
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully with Allure report");
}

sendEmail();