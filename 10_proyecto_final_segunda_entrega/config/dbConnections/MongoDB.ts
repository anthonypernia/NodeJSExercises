import knex from 'knex';
import { db } from '../index'
import { MongoClient , ObjectId } from 'mongodb';


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

    static deleteData(tableName: string, id: any) {
        return MongoDB.connection.db(this.database).collection(tableName).deleteOne({_id: new ObjectId(id)});
    }

    static createTable(tableName: string, schema) {
        return MongoDB.connection.db(this.database).createCollection(tableName);
    }

    static async getAllDataInsideDocument(tableName: string, id: string, subCollectionName: string) {
        return await MongoDB.connection.db(this.database).collection(tableName).findOne({_id: new ObjectId(id)}).then(result => {
            return result[subCollectionName];
        });
    }

    static async insertDataInsideDocument(tableName: string, id: string, data: any, subCollectionName: string) {
        data._id = new ObjectId();
        return await MongoDB.connection.db(this.database).collection(tableName).updateOne({_id: new ObjectId(id)}, {$push: {[subCollectionName]: data}}); 
    }
    
    static async deleteDataInsideDocument(tableName: string, id: string, subCollectionName: string, productId: any) {
        return await MongoDB.connection.db(this.database).collection(tableName).updateOne({_id: new ObjectId(id)}, {$pull: {[subCollectionName]: {_id: new ObjectId(productId)}}});
    }
}

export  {MongoDB};