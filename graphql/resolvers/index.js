import { createEventResolver } from "./createEventResolver.js";
import { eventResolver } from "./eventResolver.js";

export const rootValueResolver = {
    events: eventResolver,
    createEvent: createEventResolver
};