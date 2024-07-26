import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

export const EventModel = mongoose.model("Event", eventSchema);