
require('dotenv').config();
let mongoose = require('mongoose');
const MONGO_DB = process.env.MONGO_DB_URI;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

let connection = null;

(
    async () => {
        try {
            connection = await mongoose.connect(`${MONGO_DB}${DB_NAME}`, {
                "auth": {
                    "authSource": "admin"
                },
                "user": DB_USER,
                "pass": DB_PASS,
            });
            console.log('MongoDB connected');
        } catch (error) {
            console.log(error);
        }
    }
)()

module.exports = { connection, mongoose };