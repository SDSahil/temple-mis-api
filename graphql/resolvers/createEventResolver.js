import { EventModel } from "../../models/event.js";

export const createEventResolver = async args => {
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