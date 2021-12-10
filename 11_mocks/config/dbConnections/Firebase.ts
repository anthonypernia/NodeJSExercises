
import { db } from '../index'
import { dbFirebase } from '../../src/utils/firebase/database'

class FirebaseDB {
    static connection;
    static database = db.database

    static connect() {
        if (FirebaseDB.connection === undefined || FirebaseDB.connection === null) {
            FirebaseDB.connection = dbFirebase
        }
    }

    static async getAllData(tableName: string) {
        return await FirebaseDB.connection.collection(tableName).get().then(snapshot => {
            return snapshot.docs.map(doc => doc.data());
        });
    }

    static async getDataById(tableName: string, id: string) {
        return await FirebaseDB.connection.collection(tableName).doc(id).get().then(doc => {
            if(doc.exists){
                return doc.data();
            }
        });
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
        return FirebaseDB.connection.collection(tableName).doc(id).update(data);
    }

    static deleteData(tableName: string, id: any) {
        return FirebaseDB.connection.collection(tableName).doc(id).delete();
    }

    static async createTable(tableName: string, schema) {
        //En firebase una colleccion se crea apenas le agregamos un documento
        return true;
    }

    static async insertDataInsideDocument(tableName: string, id: string, data: any, subCollectionName: string) {
        return await FirebaseDB.connection.collection(tableName).doc(id).collection(subCollectionName).add(data);
    }

    static async getAllDataInsideDocument(tableName: string, id: string, subCollectionName: string) {
        let document = await FirebaseDB.connection.collection(tableName).doc(id).collection(subCollectionName).get();
        return document.docs.map(doc => doc.data());
    }

    static async deleteDataInsideDocument(tableName: string, id: string, subCollectionName: string, productId: any) {
        return await FirebaseDB.connection.collection(tableName).doc(id).collection(subCollectionName).doc(productId).delete();
    }


}

export  {FirebaseDB}