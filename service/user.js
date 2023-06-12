
import { ApolloServer } from '@apollo/server';
import gql from "graphql-tag"
import { buildSubgraphSchema } from "@apollo/federation"
import { startStandaloneServer } from '@apollo/server/standalone';
const typeDefs = gql`
  extend type Query {
    getUser: [User]
  }

  type User @key (fields:"id") {
    id: Int
    firstName: String
    lastName: String
    gender: String
  }
`;

const resolvers = {
    Query: {
        getUser: () => Users
    },
    User: {
        __resolveReference(id) {
            console.log("🚀 ~ file: user.js:31 ~ __resolveReference ~ id:", id)
            return Users.find(user => user.id === id.id)
        }
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([
        {
            typeDefs,
            resolvers
        }
    ])
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 9001 },
});
console.log(`🚀 User Server ready at: ${url}`);


const Users = [
    {
        id: 1,
        firstName: "Terry",
        lastName: "Medhurst",
        gender: "male"
    },
    {
        id: 2,
        firstName: "Sheldon",
        lastName: "Quigley",
        gender: "male"
    },
    {
        id: 3,
        firstName: "Terrill",
        lastName: "Hills",
        gender: "male"
    },
    {
        id: 4,
        firstName: "Miles",
        lastName: "Cummerata",
        gender: "male"
    },
    {
        id: 5,
        firstName: "Mavis",
        lastName: "Schultz",
        gender: "male"
    },

]

