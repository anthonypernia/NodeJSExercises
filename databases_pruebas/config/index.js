require('dotenv').config();


let config = {

    port: process.env.PORT || 3000,

}


let db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
}

module.exports = { config, db }