import dotenv from 'dotenv';

dotenv.config();

let config = {
    host: process.env.HOST,
    port: process.env.PORT || 8080,
};

export { config };