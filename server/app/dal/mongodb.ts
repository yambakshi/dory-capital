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

    async updateOne(dbName: string, collectionName: string, document: { _id: string, path: string, text: string }) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.updateOne(
            { _id: { $eq: new ObjectID(document._id) } },
            { $set: { [document.path]: document.text } });

        return output;
    }

    async deleteMany(dbName: string, collectionName: string, filter: {}) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.deleteMany(filter);

        return output;
    }
}

export const mongoDb = new MongoDB();