
import knex from 'knex';
import RelationalDatabase from './RelationalDatabase';

class Sqlite extends RelationalDatabase {
    static connection;
    static connect() {
        if (Sqlite.connection === undefined || Sqlite.connection === null) {
            Sqlite.connection = knex({
                client: 'sqlite3',
                connection: {
                    filename: './config/database.sqlite'
                }
            });
        }
    }
}

export  {Sqlite};