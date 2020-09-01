import * as dotenv from "dotenv";
dotenv.config();
let path;
const env = process.env.NODE_ENV;

switch (env) {
  case "test":
    path = `${__dirname}/../../.env.dev`;
    break;
  case "production":
    path = `${__dirname}/../../.env.dev`;
    break;
  default:
    path = `${__dirname}/../../.env.dev`;
}

dotenv.config({ path: path });

export default dotenv;

//export const APP_ID = process.env.APP_ID;
//export const LOG_LEVEL = process.env.LOG_LEVEL;
