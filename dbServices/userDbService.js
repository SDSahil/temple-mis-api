import mongoose from "mongoose";
import { UserModel } from "../models/user.js";

export class UserDbService {
    constructor() { }

    async getUserByPhone(phone) {
        try {
            const result = await UserModel.findOne({ phone: `${phone}` }).lean();
            // if (!result) {
            //     throw new Error('Auth Failed');
            // }
            return result;
        } catch (error) {
            error = serializeError(error);
            const { stack, ...err } = error;
            console.error(`Error in UserDbService, method: getUserByPhone, ${JSON.stringify({ ...err })}`);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const result = await UserModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(userId) } },
                { $project: { password: 0, __v: 0 } }
            ]).exec();
            return result[0];
        } catch (error) {
            error = serializeError(error);
            const { stack, ...err } = error;
            console.error(`Error in UserDbService, method: getUserByPhone, ${JSON.stringify({ ...err })}`);
            throw error;
        }
    }

    async createUser(body) {
        try {
            const user = new UserModel({ ...body });
            const result = await user.save();
            const { _id } = result.toObject();
            return { userId: _id };
        } catch (error) {
            error = serializeError(error);
            const { stack, ...err } = error;
            console.error(`Error in UserDbService, method: createUser, ${JSON.stringify({ ...err })}`);
            throw error;
        }
    }
}