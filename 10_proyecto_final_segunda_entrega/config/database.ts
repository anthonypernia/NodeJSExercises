
import { db } from './index'
import { MongoDB} from './dbConnections/MongoDB'
import { FirebaseDB } from './dbConnections/Firebase'
import { Sqlite } from './dbConnections/Sqlite'
import { MariaDB } from './dbConnections/MariaDB'



class Database {


    static  getDB() {

        if(db.database_type == 'mongo'){
                MongoDB.connect()
                return MongoDB
        }else if(db.database_type == 'firebase'){
                FirebaseDB.connect()
                return FirebaseDB
        }else if(db.database_type == 'mariadb'){
                MariaDB.connect()
                return MariaDB
        }else{
                Sqlite.connect()
                return Sqlite
        }
    }

}

export { Database }


