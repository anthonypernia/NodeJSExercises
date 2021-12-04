import { MariaDB, Sqlite, MongoDB, FirebaseDB  } from './dbConnections'
import { db } from './index'

class Database {


    static getDB() {
        MongoDB.connect()
        return MongoDB
    }

}

export { Database }


