import { MongoClient } from 'mongodb';
import { ObjectID } from 'mongodb';
import { strict as assert } from 'assert';


// const mongodbUsername = process.env.MONGODB_USER_NAME;
// const mongodbPassword = process.env.MONGODB_PASSWORD;
// const mongodbPort = process.env.MONGODB_PORT;
// const mongodbHost = process.env.MONGODB_HOST;

// assert.ok(mongodbUsername, `MONGODB_USER_NAME environment variable can not be undefined`);
// assert.ok(mongodbPassword, `MONGODB_PASSWORD environment variable can not be undefined`);
// assert.ok(mongodbHost, `MONGODB_HOST environment variable can not be empty`);
// assert.ok(mongodbPort, `MONGODB_PORT environment variable can not be empty`);

const mongodbUsername = 'admin';
const mongodbPassword = '1234';
const mongodbPort = '27017';
const mongodbHost = 'localhost';
const mongodbAuthSource = 'dory-capital'

export class MongoDB {
    mongoClient: MongoClient;

    async connect() {
        try {
            const uri = `mongodb://${mongodbUsername}:${mongodbPassword}@${mongodbHost}:${mongodbPort}/?authSource=${mongodbAuthSource}`;
            this.mongoClient = await MongoClient.connect(uri, { useUnifiedTopology: true });
            // this.mongoClient = await MongoClient.connect(uri, {
            //     ssl: true,
            //     sslValidate: false,
            //     checkServerIdentity: false,
            //     useUnifiedTopology: true
            // });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error(`Failed to connect to MongoDB: ${error}`);
        }
    }

    async get(dbName: string, collectionName: string, filter: {}) {
        const db = this.mongoClient.db(dbName);
        const cursor = db.collection(collectionName).find(filter);
        return cursor;
    }

    async insert(dbName: string, collectionName: string, documents: any[]) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.insertMany(documents);

        return output;
    }

    async update(dbName: string, collectionName: string, document: { _id: string, text: string }) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.update(
            { _id: { $eq: new ObjectID(document._id) } },
            { $set: { text: document.text } });

        return output;
    }
}

export const mongoDb = new MongoDB();