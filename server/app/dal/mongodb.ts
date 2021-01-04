import { MongoClient } from 'mongodb';
import { strict as assert } from 'assert';


// const mongodbUsername = process.env.MONGODB_USER_NAME;
// const mongodbPassword = process.env.MONGODB_PASSWORD;
// const mongodbPort = process.env.MONGODB_PORT;
// const mongodbHost = process.env.MONGODB_HOST;

// assert.ok(mongodbUsername, `MONGODB_USER_NAME environment variable can not be undefined`);
// assert.ok(mongodbPassword, `MONGODB_PASSWORD environment variable can not be undefined`);
// assert.ok(mongodbHost, `MONGODB_HOST environment variable can not be empty`);
// assert.ok(mongodbPort, `MONGODB_PORT environment variable can not be empty`);

const mongodbUsername = 'fuck';
const mongodbPassword = 'fuckyou';
const mongodbPort = '27017';
const mongodbHost = 'localhost';

export class MongoDB {
    mongoClient: MongoClient;

    async connect() {
        try {
            // const uri = `mongodb://${mongodbUsername}:${mongodbPassword}@${mongodbHost}:${mongodbPort}/?authSource=dorycapital&authMechanism=SCRAM-SHA-256&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
            const uri = `mongodb://${mongodbUsername}:${mongodbPassword}@${mongodbHost}:${mongodbPort}/?authSource=dorycapital`;
            this.mongoClient = await MongoClient.connect(uri, { useUnifiedTopology: true });
            // this.mongoClient = await MongoClient.connect(uri, {
            //     ssl: true,
            //     sslValidate: false,
            //     checkServerIdentity: false,
            //     useUnifiedTopology: true
            // });
            console.error(`Connected to MongoDB`);
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

    async delete(dbName: string, collectionName: string, filter: {}) {
        const db = this.mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        const output = collection.deleteMany(filter);

        return output;
    }
}

export const mongoDb = new MongoDB();