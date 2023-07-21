import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import 'dotenv/config';
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

interface IEnv {
  NODE_ENV: string | undefined;
  MONGODB_URI: string | undefined;
}

interface IConfig {
  NODE_ENV: string;
  MONGODB_URI: string;
}

const getConfig = (): IEnv => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
  }
};

const getSanitizedConfig = (config: IEnv): IConfig => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error (`Missing key ${key} in .env`);
    }
  }
  return config as IConfig;
}

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

async function startServer() {
  await mongoose.connect(sanitizedConfig.MONGODB_URI);
  console.log(`Connected to Mongo at ${sanitizedConfig.MONGODB_URI}`);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 8080 },
  });
  console.log(`Server ready at ${url}`);
}

startServer();

