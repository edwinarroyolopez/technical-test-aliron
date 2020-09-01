import { fileLoader, mergeResolvers } from "merge-graphql-schemas";
import path from "path";

const resolversArray = fileLoader(path.join(__dirname, "./"));

export default  mergeResolvers(resolversArray);
