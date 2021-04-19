import pkg from "apollo-server";
const { ApolloServer } = pkg;

import mongoose from "mongoose";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import config from "./config.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(config.mongoInfo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return server.listen({ port: 9000 }).then((res) => {
      console.log(`Server running at ${res.url}`);
    });
  });
