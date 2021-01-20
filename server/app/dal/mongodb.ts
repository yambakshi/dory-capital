import { MongoClient, ObjectID } from 'mongodb';
import { env } from '../../config';

export class MongoDB {
    mongoClient: MongoClient;

    async connect() {
        try {
            const { uriPrefix, username, password, dbName, host } = env.mongodb;
            const uri = `${uriPrefix}://${username}:${password}@${host}/${dbName}`;
            this.mongoClient = await MongoClient.connect(uri, {
                useUnifiedTopology: true,
                retryWrites: true,
                w: 'majority',
                useNewUrlParser: true
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error(`Failed to connect to MongoDB: ${error}`);
        }
    }

    async find(dbName: string, collectionName: string, filter: {}) {
        const db = this.mongoClient.db(dbName);
        const cursor = db.collection(collectionName).find(filter);
        return cursor;
    }

    async findOne(dbName: string, collectionName: string, filter: {}) {
        const db = this.mongoClient.db(dbName);
        const cursor = db.collection(collectionName).findOne(filter);
        return cursor;
    }

    async aggregate(dbName: string, collectionName: string, lookup: {}) {
        const db = this.mongoClient.db(dbName);
        const cursor = db.collection(collectionName).aggregate(lookup);
        return cursor;
    }

    async insertMany(dbName: string, collectionName: string, documents: any[]) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.insertMany(documents);

        return output;
    }

    async insertOne(dbName: string, collectionName: string, documents: any[]) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.insertOne(documents);

        return output;
    }

    async deleteMany(dbName: string, collectionName: string, filter: {}) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.deleteMany(filter);

        return output;
    }

    async updateOne(dbName: string, collectionName: string, { _id, data }) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.updateOne(
            { _id: { $eq: new ObjectID(_id) } },
            { $set: data });

        return output;
    }

    async push(dbName: string, collectionName: string, { _id, data }) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.updateOne(
            { _id: { $eq: new ObjectID(_id) } },
            { $push: data });

        return output;
    }

    async pull(dbName: string, collectionName: string, { _id, data }) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.updateOne(
            { _id: { $eq: new ObjectID(_id) } },
            { $pull: data });

        return output;
    }
}

export const mongoDb = new MongoDB();