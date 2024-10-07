import { ApolloServer, gql } from 'apollo-server-express';
import express, { Application } from 'express';  // Import Application type
import { userResolver } from './resolvers/userResolver';

// Define typeDefs and resolvers
const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }
`;

const app: Application = express();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: userResolver.Query,
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app: app as any });


  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
