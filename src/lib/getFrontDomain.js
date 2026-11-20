import "dotenv/config";
function getFrontDomain() {
  return process.env["ENV"] == "prod"
    ? process.env["PROD_FRONT"]
    : process.env["DEV_FRONT"];
}

export default getFrontDomain;
