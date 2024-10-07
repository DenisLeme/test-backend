import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { userResolver } from './resolvers/userResolver';

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: userResolver.Query,
      Mutation: userResolver.Mutation,
    },
  });

  await server.start();
  server.applyMiddleware({ app: app as any });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server rodando http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
