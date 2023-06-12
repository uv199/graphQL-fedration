import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from "graphql-tag"
import { buildSubgraphSchema } from "@apollo/federation"


const typeDefs = gql`
  extend type Query {
    getCart: [Cart]
  }
  type Cart {
    id: Int
    products:Product
    userId: User
    total: Int
  }
  extend type User @key(fields:"id"){
    id:Int @external
    age:Int 
  }
  extend type Product @key(fields:"id"){
    id:Int @external
  }
`;

const resolvers = {

    Cart: {
        userId: (cart) => {
            // console.log("🚀 ~ file: cart.js:26 ~ cart:", cart.userId)
            return { __typename: 'User', id: cart?.userId }
        },
        products: (cart) => {
            return { __typename: "Product", id: cart?.products }
        }
    },
    Query: {
        getCart: () => Carts
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
    listen: { port: 9003 },
});

console.log(`🚀 Cart Server ready at: ${url}`);

// getCart: () => {
// //return Carts
//     return fetch('https://dummyjson.com/carts')
//         .then(res => res.json())
//         .then(res => {
//             // return res.carts
//             console.log("🚀 ~ file: index.js:31 ~ res:", res.carts[0])
//         })
// }


const Carts = [
    {
        id: 1,
        products: 2,
        userId: 2,
        total: 10,
    },
    {
        id: 2,
        products: 1,
        userId: 1,
        total: 20,
    },
    {
        id: 3,
        products: 3,
        userId: 3,
        total: 30,
    },
    {
        id: 4,
        products: 4,
        userId: 4,
        total: 40,
    },
    {
        id: 5,
        products: 5,
        userId: 5,
        total: 50,
    },
]


