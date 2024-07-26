import mongoose from 'mongoose';

export class DbConnection {
    constructor () {
        this.setConnection();
    }

    async setConnection() {
        try {
            await mongoose.connect(`${process.env['DB_URL']}/${process.env['DB_NAME']}`);
            console.log('Successfully connected to DB');
        } catch (error) {
            console.error(`Error while connecting to DB ${JSON.stringify(error)}`);
        }
    }
}