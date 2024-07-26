import { EventModel } from "../../models/event.js";

export const eventResolver = async args => {
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
};