
const { MongoClient, ObjectId } = require('mongodb');
const { db } = require('../index');

class MongoDB {
    constructor() {
        this.client = null;
        this.db = null;
        this.connect();
    }

    async connect() {
        this.client = await MongoClient.connect(db.mongo_db_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.db = this.client.db(db.database);
    }

    async getAll(collectionName) {
        const collection = this.db.collection(collectionName);
        const result = await collection.find({}).toArray();
        return result;
    }

    async getById(collectionName, id) {
        const collection = this.db.collection(collectionName);
        const result = await collection.findOne({ _id: ObjectId(id) });
        return result;
    }
    
    async getByField(collectionName, field, value) {
        const collection = this.db.collection(collectionName);
        const result = await collection.findOne({ [field]: value });
        return result;
    }

    async getByIdList(collectionName, idList) {
        const collection = this.db.collection(collectionName);
        let idListString = idList.map(id => ObjectId(id));
        const result = await collection.find({ _id: { $in: idListString } }).toArray();
        return result;
    }

    async getValueFromDocument(collectionName, id, field) {
        return await this.db
            .collection(collectionName)
            .findOne({ _id: ObjectId(id) })
            .then(result => result[field]);
    }

    async addValueToDocument(collectionName, id, field, value) {
        console.log(id, field, value);
        return await this.db
            .collection(collectionName)
            .updateOne(
                { _id: ObjectId(id) },
                { $push: { [field]: value } }
            );
    }

    async deleteValueFromDocument(collectionName, id, field, value) {
        console.log(id, field, value);
        
        const collection = this.db.collection(collectionName);
        const result = await collection.updateOne(
            { _id: ObjectId(id) },
            { $pull: { [field]: value } }
        );
        return result;
    }
    
    async insert(collectionName, data) {
        const collection = this.db.collection(collectionName);
        const result = await collection.insertOne(data);
        return result;
    }
    async insertWithId(collectionName, id, data) {
        const collection = this.db.collection(collectionName);
        const result = await collection.insertOne({ _id: ObjectId(id), ...data });
        return result;
    }
    async insertAndValidateDuplicate(collectionName, data, field) {
        const collection = this.db.collection(collectionName);
        const result = await collection.findOne({ [field]: data[field] });
        if (result) {
            return false;
        }
        const result2 = await collection.insertOne(data);
        return result2;
    }

    async update(collectionName, id, data) {
        const collection = this.db.collection(collectionName);
        const result = await collection.updateOne({ _id: ObjectId(id) }, { $set: data });
        return result;
    }

    async delete(collectionName, id) {
        const collection = this.db.collection(collectionName);
        const result = await collection.deleteOne({ _id: ObjectId(id) });
        return result;
    }
}

module.exports = new MongoDB();