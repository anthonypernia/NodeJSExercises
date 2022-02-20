const dotenv = require('dotenv').config();

let config = {
    host: process.env.HOST,
    port: process.env.PORT || 8080,
    cluster_mode: process.env.CLUSTER_MODE,
};

let db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    mongo_db_uri: process.env.MONGO_DB_URI,
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
}

module.exports = {
    config,
    db
}