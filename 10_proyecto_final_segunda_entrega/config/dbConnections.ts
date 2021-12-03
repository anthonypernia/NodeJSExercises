import knex from 'knex';
import { db } from './index'
import { MongoClient , ObjectId } from 'mongodb';
import { initializeApp } from "firebase/app";
import { dbFirebase } from '../src/utils/firebase/database'

class RelationalDatabase {
    static connection ;
    
    static getAllData(tableName: string) {
        return this.connection.select('*').from(tableName);
    }

    static getDataById(tableName: string, id: string) {
        return this.connection.select('*').from(tableName).where('id', id);
    }

    static getDataByIdList(tableName: string, idList: any[]) {
        return this.connection.select('*').from(tableName).whereIn('id', idList);
    }
    static insertData(tableName: string, data: any) {
        return this.connection.insert(data).into(tableName);
    }
    static updateData(tableName: string, id: string, data: any) {
        return this.connection.update(data).into(tableName).where('id', id);
    }
    static deleteData(tableName: string, condition: any) {
        return this.connection.delete().from(tableName).where(condition);
    }

    static createTable(tableName: string, schema) {
        return this.connection.schema.createTableIfNotExists(tableName, schema);
    }
}


class MariaDB extends RelationalDatabase {
    static connection;
    static connect() {
        const firebaseConfig = {
            apiKey: "AIzaSyDRJVtvi79wHWVwJttoAXEJAJFFse3KJK8",
            authDomain: "anthonystoreproject.firebaseapp.com",
            projectId: "anthonystoreproject",
            storageBucket: "anthonystoreproject.appspot.com",
            messagingSenderId: "973311422477",
            appId: "1:973311422477:web:19ce6b6834e0fbf9756544"
          };
          
          // Initialize Firebase
          const app = initializeApp(firebaseConfig);
    }

}

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

class MongoDB {
    static connection;
    static database = db.database

    static connect() {
        let uri = db.mongo_db_uri || 'mongodb://102.168.0.16:27017/';
        let user = db.user || '';
        let password = db.password || '';
        
        console.log(uri);
        if (MongoDB.connection === undefined || MongoDB.connection === null) {
            MongoDB.connection = new MongoClient(uri);
            MongoDB.connection.connect()
        }
    }

    static async getAllData(tableName: string) {
        return await MongoDB.connection.db(this.database).collection(tableName).find({}).toArray();
    }

    static async getDataById(tableName: string, id: string) {
        return await MongoDB.connection.db(this.database).collection(tableName).findOne({_id: new ObjectId(id)});
    } 

    static getDataByIdList(tableName: string, idList: any[]) {
        let idListString = idList.map(id => new ObjectId(id));
        return MongoDB.connection.db(this.database).collection(tableName).find({_id: {$in: idListString}}).toArray();
    }

    static insertData(tableName: string, data: any) {
        return MongoDB.connection.db(this.database).collection(tableName).insertOne(data);
    }

    static updateData(tableName: string, id: string, data: any) {
        return MongoDB.connection.db(this.database).collection(tableName).updateOne({_id: new ObjectId(id)}, {$set: data});
    }

    static deleteData(tableName: string, condition: any) {
        return MongoDB.connection.db(this.database).collection(tableName).deleteOne(condition);
    }

    static createTable(tableName: string, schema) {
        return MongoDB.connection.db(this.database).createCollection(tableName);
    }
}

class FirebaseDB {
    static connection;
    static database = db.database

    static connect() {
        if (FirebaseDB.connection === undefined || FirebaseDB.connection === null) {
            FirebaseDB.connection = dbFirebase
        }
    }

    static async getAllData(tableName: string) {
        try{
            return await FirebaseDB.connection.collection(tableName).get().then(snapshot => {
                return snapshot.docs.map(doc => doc.data());
            });
        }catch(err){
            console.log(err);
        }
    }

    static async getDataById(tableName: string, id: string) {
        try{
            return await FirebaseDB.connection.collection(tableName).doc(id).get().then(doc => {
                if(doc.exists){
                    return doc.data();
                }
            });
        }catch(err){
            console.log(err);
        }
    }

    static getDataByIdList(tableName: string, idList: any[]) {
        let idListString = idList.map(id => id);
        return FirebaseDB.connection.collection(tableName).where('id', 'in', idListString).get().then(snapshot => {
            return snapshot.docs.map(doc => doc.data());
        });
    }

    static insertData(tableName: string, data: any) {
        return FirebaseDB.connection.collection(tableName).add(data);
    }

    static updateData(tableName: string, id: string, data: any) {
        return FirebaseDB.connection.collection(tableName).doc(id).set(data);
    }

    static deleteData(tableName: string, condition: any) {
        let id = condition.id;
        
        return FirebaseDB.connection.collection(tableName).doc(id).delete();
    }

    static async createTable(tableName: string, schema) {
        try{
            let idRef = await FirebaseDB.connection.collection(tableName).add({id: 'id'});
            
            await FirebaseDB.deleteData(tableName, {id: idRef.id});
        }catch(err){
            console.log(err);
        }
    }






}

        





export { MariaDB, Sqlite, MongoDB, FirebaseDB };
