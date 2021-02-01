import { MongoClient } from 'mongodb';
import { env } from '../../config';
import { logger } from '../../config/logger';

export class MongoDB {
    mongoClient: MongoClient;

    async connect() {
        try {
            const { uriPrefix, username, password, dbName, host } = env.mongodb;
            const uri = `${uriPrefix}://${username}:${password}@${host}/${dbName}`;
            this.mongoClient = await MongoClient.connect(uri, {
                useUnifiedTopology: true,
                w: 'majority',
                useNewUrlParser: true
            });

            logger.info({ message: "Connected to MongoDB", label: 'MongoDB' });
        } catch (error) {
            logger.error({ message: error, label: 'MongoDB' });
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

    async findAndModify(dbName: string, collectionName: string, filter: {}, data: {}) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.findOneAndUpdate(
            filter,
            { $set: data },
            { returnOriginal: false }
        )

        return output;
    }

    async aggregate(dbName: string, collectionName: string, lookup: {}[]) {
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

    async insertOne(dbName: string, collectionName: string, document: any) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.insertOne(document);

        return output;
    }

    async deleteMany(dbName: string, collectionName: string, filter: {}) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.deleteMany(filter);

        return output;
    }

    async updateOne(dbName: string, collectionName: string, filter: {}, data: {}) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.updateOne(
            filter,
            { $set: data });

        return output;
    }

    async push(dbName: string, collectionName: string, filter: {}, data: {}) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.updateOne(filter, { $push: data });

        return output;
    }

    async pull(dbName: string, collectionName: string, filter: {}, data: {}) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.updateOne(filter, { $pull: data });

        return output;
    }
}

export const mongoDb = new MongoDB();