import axios from "axios";

export async function createZohoIssue(testName: string) {

 const url = `https://projectsapi.zoho.com/restapi/portal/${process.env.ZOHO_PORTAL_ID}/projects/${process.env.ZOHO_PROJECT_ID}/bugs/`;

 const data = {
   title: `Automation Failure: ${testName}`,
   description: `Test failed in GitHub Actions`,
   severity: "High"
 };

 await axios.post(url, data, {
   headers: {
     Authorization: `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`
   }
 });

 console.log("Zoho issue created");
}