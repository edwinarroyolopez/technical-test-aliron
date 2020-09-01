//import * from './src/config/environment'
import * as dotenv from "dotenv";
dotenv.config();
let path;
//const env = process.env.NODE_ENV;
let env: any = process.env["NODE_ENV"];

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

console.log("env.NODE_ENV", env.NODE_ENV);
console.log("env.URL_WEB_PAGE", env.URL_WEB_PAGE);

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

import { makeExecutableSchema } from "graphql-tools";
import gqlMiddleware from "express-graphql";
import { graphqlUploadExpress } from "graphql-upload";

//#region socket library
import { createServer } from "http";
import { buildSchema, execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { PubSub } from "graphql-subscriptions";
//#endregion

import resolversWithOutAuth from "./src/util/resolversWithoutAuth";

import resolvers from "./src/services/resolvers";
import typeDefs from "./src/services/typeDefs";

const app: express.Application = express();
const port = env.API_PORT || 7000;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const JWT_SECRET = env.JWT_SECRET || "jx7B9vHSUcJq6pA"

    let bearerToken = req.headers.authorization;
    if (bearerToken) bearerToken = bearerToken.split(" ");

    if (
      bearerToken &&
      bearerToken.length > 1 &&
      bearerToken[0].toLowerCase() === "bearer" &&
      bearerToken[1] &&
      bearerToken[1] !== "undefined"
    ) {
      
      const userInfo = jwt.verify(bearerToken[1], JWT_SECRET);
      req.user = userInfo;
      return next();
    } else {
      let foundAuthResolver = false;
      const { query: queryString } = req.body;

      if (!queryString) return next();
      if (queryString.indexOf("IntrospectionQuery") > -1)
        return next(); /* workaround */

      resolversWithOutAuth.forEach((resolver) => {
        if (queryString.includes(resolver)) {
          foundAuthResolver = true;
          return;
        }
      });
      if (foundAuthResolver) return next();
      throw new Error("NOT_AUTHORIZED");
    }
  } catch (e) {
    console.log("e", e);
    return res.status(403).send("Access Denied");
  }
};

let allCors: any = "*";

const start = async () => {
  app.use(cors(allCors));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", authMiddleware);
  app.use(
    "/api",
    graphqlUploadExpress({ maxFileSize: 15000000, maxFiles: 20 }),
    gqlMiddleware((req, res, graphQLParams) => ({
      schema: schema,
      rootValue: resolvers,
      graphiql: true,
      context: { req, pubSub: null },
    }))
  );
  app.listen(port, () => {
    console.log(`Server is listening  at http://localhost:${port}/api`);
  });

  //#region initialize ws
  createServer(app);
};

start();
