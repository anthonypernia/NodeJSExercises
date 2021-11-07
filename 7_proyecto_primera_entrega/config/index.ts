import dotenv from 'dotenv';

dotenv.config();

let config = {
    host: process.env.HOST,
    port: process.env.PORT || 3000,
};

export { config };