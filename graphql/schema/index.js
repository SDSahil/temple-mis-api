import { buildSchema } from "graphql";

export const gqlSchema = buildSchema(`
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
`);