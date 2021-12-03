import { MariaDB, Sqlite, MongoDB, FirebaseDB  } from './dbConnections'
import { db } from './index'

class Database {

    static connect() {
        FirebaseDB.connect()
    }

    static getDB() {
        FirebaseDB.connect()
        return FirebaseDB
    }

}

export { Database }


