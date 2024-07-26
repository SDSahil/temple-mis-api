import { UserService } from "../services/userService.js";
import { userCreation } from "../validators/userValidator.js";

export class UserController {
    constructor() {
        this.userService = new UserService();
    }

    userLogin = async (req, res) => {
        try {
            const { phone, password } = req.body;
            if (!(phone && password)) {
                throw new Error('phone and password must valid');
            }
            const result = await this.userService.loginUser(phone, password);
            // if (!result) {
            //     throw new Error('Invalid credential');
            // }
            res.json({ message: 'login successfully', ...result });
        } catch (error) {
            error = serializeError(error);
            res.status(404).json({ ...error });
        }
    }

    getCurrUser = async (req, res) => {
        try {
            if (!req.authValue) throw new Error('Missing Token');
            const { userId } = req.authValue;
            const result = await this.userService.getUserById(userId);
            if (!result || !Object.keys(result).length) throw new Error('User Not Found');
            const {_id, ...rest} = result;
            res.json({ id: _id, ...rest });
        } catch (error) {
            error = serializeError(error);
            res.status(404).json({ ...error });
        }
    }

    createUser = async (req, res) => {
        try {
            const body = await userCreation.validateAsync({ ...req.body });
            // const body = { ...req.body };
            const result = await this.userService.createUser({ ...body });
            res.json({ ...result });
        } catch (error) {
            const { stack, ...err } = error;
            console.error(`Error in UserController, method: createUser, ${JSON.stringify({ ...err })}`);
            res.status(400).json({ ...error });
        }
    }

    getUserByPhone = async (req, res) => {
        try {
            const { phone } = req.query;
            const result = await this.userService.getUserByPhone(phone);
            res.status(200).json({ ...result });
        } catch (error) {
            const { stack, ...err } = error;
            console.error(`Error in UserController, method: getUserByPhone, ${JSON.stringify({ ...err })}`);
            res.status(403).json({ ...error });
        }
    }

    authCheck = async (req, res) => {
        try {
            res.json({ msg: 'token validate successfully' });
        } catch (error) {
            res.status(400).json({ message: 'error' });
        }
    }
}