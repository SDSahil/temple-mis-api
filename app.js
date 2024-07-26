import express from 'express';
import bodyParser from 'body-parser';
import { serializeError } from 'serialize-error';
// import { graphqlHTTP } from "express-graphql";
// import { buildSchema } from "graphql";
import { Routes } from './routes/index.js';
import { DbConnection } from './dbServices/connection.js';
// import { EventModel } from './models/event.js';

import 'dotenv/config'
// import { gqlSchema } from './graphql/schema/index.js';
// import { rootValueResolver } from './graphql/resolvers/index.js';
import { Graphql } from './middlewares/graphql.js';
import { AuthValidator } from './middlewares/authValidator.js';
import { CORS } from './middlewares/cors.js';


const PORT = process.env['PORT'];

const app = express();

const router = new Routes().getRouter();

const authValidator = new AuthValidator();

global.serializeError = serializeError;

app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());     // parse application/json
app.use(CORS.handleOrigins);

/* app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      desc: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      desc: String!
      price: Float!
      date: String!
    }
    type RootQuery {
      events(page: Int = 0, limit: Int = 100): [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: async (args) => {
      try {
        const { page, limit } = args;
        const result = await EventModel.aggregate([
          { $skip: page * limit },
          { $limit: limit },
          { $project: { __v: 0 } }
        ]).exec();
        return result;
      } catch (err) {
        throw err;
      }
    },
    createEvent: async (args) => {
      try {
        const event = new EventModel({
          title: args.eventInput.title,
          desc: args.eventInput.desc,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date)
        });

        const result = await event.save();
        return result;
      } catch (error) {
        throw error;
      }
    }
  },
  graphiql: true
})); */

app.use('/graphql', authValidator.validateToken, Graphql.graphqlMiddleware);
app.use('/v1/api', router);     // Mount the router to a specific path


new DbConnection();


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on url: ${process.env['SERVER_URL']}:${PORT}`);
});
