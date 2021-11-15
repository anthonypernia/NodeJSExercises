let { db } = require('./index')
let knex = require('knex');

let mariaDB = knex({
    client: 'mysql',
    connection: {
        ...db
    },
    pool: {
        min: 0,
        max: 10
    }
});

let sqlite3 = knex({
    client: 'sqlite3',
    connection: {
        filename: './config/db.sqlite'
    }
});


class Database{
    static client;
    constructor(){
        if (Database.client){
            this.client = Database.client;
            return this;
        }
        //Database.client = mariaDB;
        Database.client = sqlite3;
        this.client = Database.client;
    }
}

module.exports = new Database()