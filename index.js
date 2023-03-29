import { ApolloServer  } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"; 
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { applyMiddleware } from "graphql-middleware";
import { buildFederatedSchema } from "@apollo/federation";
import express from "express";
import http from 'http';
import { permissions } from "./src/shield-rules/permissions/permissions.cjs";

const gateway = new ApolloGateway({

    serviceList: [
        {name: 'sharingsystem', url: 'http://localhost:8085/graphql'}
    ],
    buildService({ url }){

        return new RemoteGraphQLDataSource({

            url,
            willSendRequest({ request, context }) {

                if(context.headers != undefined){

                    console.log("Headers Present");
                    console.log(`Permissions: ${(context.headers.permissions)}`)

                    if(context.headers.userId){
                        request.http.headers.set("userId", context.headers.userId);
                    }
                    if(context.headers.permissions){
                        request.http.headers.set("permissions", context.headers.permissions);
                    }
                    if(context.headers.organisationId){
                        request.http.headers.set("organisationId", context.headers.organisationId);
                    }
                    if (context.headers.inspectingfororganisationid){
                        request.http.headers.set("inspectingfororganisationid", context.headers.inspectingfororganisationid);
                    }
                    if (context.headers.inspectingforuserid){
                        request.http.headers.set("inspectingforuserid", context.headers.inspectingforuserid);
                    }

                }
            }
        });
    }
});

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({

//    schema: applyMiddleware(
//       buildFederatedSchema([{ typeDefs, resolvers }]),
//        permissions
//    ),
    context: ({ req }) => {
        const headers = { ...req.headers} || null;
        return { headers };
    },
    gateway,
    debug: false,
    tracing: true,
    subscriptions: false,
    introspection: true,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
                'schema.polling.interval' : 3600000,
            },
        }),
    ],
});

await server.start();
server.applyMiddleware({
    app,
    cors: false,
    path: '/graphql'
})


await new Promise(resolve => httpServer.listen({ port: 80 }, resolve));
console.log(`-> Server ready at http://localhost:80${server.graphqlPath}`);