import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway"



const supergraphSdl = new IntrospectAndCompose({
    // This entire subgraph list is optional when running in managed federation
    // mode, using Apollo Studio as the source of truth.  In production,
    // using a single source of truth to compose a schema is recommended and
    // prevents composition failures at runtime using schema validation using
    // real usage-based metrics.
    subgraphs: [
      { name: "user", url: "http://localhost:9001/graphql" },
      { name: "product", url: "http://localhost:9002/graphql" },
      { name: "cart", url: "http://localhost:9003/graphql" },
    ],
  });
  
const gateway = new ApolloGateway({
    supergraphSdl,
    // Experimental: Enabling this enables the query plan view in Playground.
    __exposeQueryPlanExperimental: false,
  });

// const baseURL = "http://localhost:"
// const gateway = new ApolloGateway({
//     serviceList: [{
//         // "name":"user",url:`${baseURL}9001`
//         "name": "user", url: `http://localhost:9001/graphql`,
//         "name": "product", url: `http://localhost:9002/graphql`,
//         "name": "cart", url: `http://localhost:9003/graphql`,
//     }]
// })

const server = new ApolloServer({
    gateway,
    engine: false,

    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 9000 },
});

console.log(`🚀 Cart Server ready at: ${url}`);

