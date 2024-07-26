export class CORS {
    constructor() {}

    static handleOrigins(req, res, next) {
        const allowedOrigins = process.env['WHITELISTED_ORIGINS'].split(';');
        const origin = req.get('Origin');
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    }
}