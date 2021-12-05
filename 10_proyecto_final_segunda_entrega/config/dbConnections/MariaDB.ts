
import RelationalDatabase from "./RelationalDatabase";
import { db } from '../index'
import knex from 'knex';

class MariaDB extends RelationalDatabase {
    static connection;
    static connect() {
        if (MariaDB.connection === undefined || MariaDB.connection === null) {
            MariaDB.connection = knex({
            client: 'mysql',
            connection: db
            ,
            pool: {
                min: 0,
                max: 10
            }
        });
        }
    }

}


export  {MariaDB};