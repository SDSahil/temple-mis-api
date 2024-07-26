import jwt from "jsonwebtoken";

export class AuthValidator {

    constructor() { }

    validateToken(req, res, next) {
        try {
            // const token = req.headers.authorization?.match(/(?<=(^Bearer\s)).*/)?.[0];
            const token = req.get('Authorization')?.match(/(?<=(^Bearer\s)).*/)?.[0];
            if (!token) throw new Error('Token not found');

            const decoded = jwt.verify(token, process.env['JWT_SECRET_KEY']);
            req.authValue = decoded;
            next();
        } catch (error) {
            error = serializeError(error);
            const { stack, ...err } = error;
            console.error(`Error in validateToken: ${JSON.stringify({ ...err })}`);
            res.status(401).json({ ...error });
        }
    }
}