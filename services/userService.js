import jwt from 'jsonwebtoken';
import { hash, genSalt, compare } from "bcrypt";
import { UserDbService } from "../dbServices/userDbService.js";

export class UserService {
    constructor() {
        this.userDbService = new UserDbService();
    }

    async checkPassword(hashPswd, password) {
        try {
            return await compare(password, hashPswd);
        } catch (error) {
            console.error(`Error while checking password, ${JSON.stringify({ ...error })}`);
            return false;
        }
    }

    async loginUser(phone, password) {
        try {
            const result = await this.userDbService.getUserByPhone(phone);
            if (!(result?.password && await this.checkPassword(result.password, password))) {
                throw new Error('Auth Failed');
            };
            const token = jwt.sign({ userId: result._id, phone: result.phone }, process.env['JWT_SECRET_KEY'], { expiresIn: '1h' });
            return { message: 'Login successful', token };
        } catch (error) {
            error = serializeError(error);
            const { stack, ...err } = error;
            console.error(`Error in UserService, method: loginUser, ${JSON.stringify({ ...err })}`);
            throw error;
        }
    }

    async getUserByPhone(phone) {
        try {
            const result = await this.userDbService.getUserByPhone(phone);
            if (result) return Promise.resolve({ userId: result._id });
            return Promise.resolve({ userId: null });
        } catch (error) {
            error = serializeError(error);
            const { stack, ...err } = error;
            console.error(`Error in UserService, method: getUserByPhone, ${JSON.stringify({ ...err })}`);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const result = await this.userDbService.getUserById(userId);
            return Promise.resolve({ ...result });
        } catch (error) {
            error = serializeError(error);
            const { stack, ...err } = error;
            console.error(`Error in UserService, method: getUserById, ${JSON.stringify({ ...err })}`);
            throw error;
        }
    }

    async createUser(body) {
        try {
            const saltRound = +process.env['SALT_ROUND'];
            const salt = await genSalt(saltRound);
            body.password = await hash(body.password, salt);
            const result = await this.userDbService.createUser({ ...body });
            return { ...result };
        } catch (error) {
            error = serializeError(error);
            const { stack, ...err } = error;
            console.error(`Error in UserService, method: createUser, ${JSON.stringify({ ...err })}`);
            throw error;
        }
    }
}