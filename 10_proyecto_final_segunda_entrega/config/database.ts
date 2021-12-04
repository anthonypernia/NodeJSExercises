
import { db } from './index'
import { MongoDB} from './dbConnections/MongoDB'
import { FirebaseDB } from './dbConnections/Firebase'
import { Sqlite } from './dbConnections/Sqlite'



class Database {


    static  getDB() {
   
        console.log(db)
        if(db.database_type == 'mongo'){
                MongoDB.connect()
                return MongoDB
        }else if(db.database_type == 'firebase'){
                FirebaseDB.connect()
                return FirebaseDB
        }else{
                Sqlite.connect()
                return Sqlite
        }
    }

}

export { Database }


