import { buildSubgraphSchema } from '@apollo/federation';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from "graphql-tag"

const typeDefs = gql`
  type Product @key(fields:"id") {
    id: Int
    title: String
    price: Int
    stock: Int
  }
  extend type Query {
    getProduct: [Product]
  }
`;

const resolvers = {
    Product: {
        __resolveReference(id) {
            console.log("🚀 ~ file: user.js:31 ~ __resolveReference ~ id:", id)
            return Products.find(product => product?.id === id.id)
        }
    },
    Query: {
        getProduct: () => Products
    },
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
    listen: { port: 9002 },
});

console.log(`🚀 Product Server ready at: ${url}`);

const Products = [
    {
        id: 1,
        title: "iPhone 9",
        price: 549,
        stock: 94
    },
    {
        id: 2,
        title: "iPhone X",
        price: 899,
        stock: 34
    },
    {
        id: 3,
        title: "Samsung Universe 9",
        price: 1249,
        stock: 36
    },
    {
        id: 4,
        title: "OPPOF19",
        price: 280,
        stock: 123
    },
    {
        id: 5,
        title: "Huawei P30",
        price: 499,
        stock: 32
    },
]
