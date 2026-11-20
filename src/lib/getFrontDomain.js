import "dotenv/config";
function getFrontDomain() {
  return process.env["ENV"] == "prod" ? process.env["PROD_FRONT"] : undefined;
}

export default getFrontDomain;
