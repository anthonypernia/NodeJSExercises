import knex from 'knex';
import { db } from './index'

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

class Database {

    static getMariaDB() {
        return mariaDB;
    }

    static getSqlite3() {
        return sqlite3;
    }
}

export { Database };
