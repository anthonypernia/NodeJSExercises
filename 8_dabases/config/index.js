require('dotenv').config();

let config = {
    host: process.env.HOST,
    port: process.env.PORT
};

module.exports = {config}