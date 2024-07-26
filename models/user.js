import mongoose from "mongoose";
import { ALPHABETICAL_STRING, EMAIL, PHONE } from "../configs/regex.js";

const { Schema } = mongoose;

const FullNameSchema = new Schema({
    firstName: {
        type: String,
        match: ALPHABETICAL_STRING,
        required: true
    },
    middleName: {
        type: String,
        match: ALPHABETICAL_STRING,
        required: false
    },
    lastName: {
        type: String,
        match: ALPHABETICAL_STRING,
        required: true
    }
}, { _id: false });

const userSchema = new Schema({
    name: {
        type: FullNameSchema,
        required: true
    },
    email: {
        type: String,
        // default: '',
        match: EMAIL,
        required: false
    },
    phone: {
        type: String,
        // validate: {
        //     validator: v => /\d{10}/.test(v)
        // },
        match: PHONE,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
});

export const UserModel = mongoose.model("Users", userSchema);