import dotenv from 'dotenv';

dotenv.config();

let config = {
    host: process.env.HOST,
    port: process.env.PORT || 8080,
};

let db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
}


export { config, db };