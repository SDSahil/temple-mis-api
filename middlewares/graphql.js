import { graphqlHTTP } from "express-graphql";
import { gqlSchema } from "../graphql/schema/index.js";
import { rootValueResolver } from "../graphql/resolvers/index.js";

export class Graphql {
    static graphqlMiddleware = graphqlHTTP({
        schema: gqlSchema,
        rootValue: rootValueResolver,
        graphiql: true
    });
}

// export const graphqlMiddleware = graphqlHTTP({
//     schema: gqlSchema,
//     rootValue: rootValueResolver,
//     graphiql: true
// });