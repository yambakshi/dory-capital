import { strict as assert } from 'assert';


export const apiPort = Number(process.env.API_PORT);

assert.ok(apiPort, 'API_PORT environment variable can not be undefined');

export const mongodbVars = {
    uriPrefix: process.env.MONGODB_URI_PREFIX,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    host: process.env.MONGODB_HOST,
    dbName: process.env.MONGODB_DB
}

assert.ok(mongodbVars.uriPrefix, 'MONGODB_URI_PREFIX environment variable can not be undefined');
assert.ok(mongodbVars.username, 'MONGODB_USER_NAME environment variable can not be undefined');
assert.ok(mongodbVars.password, 'MONGODB_PASSWORD environment variable can not be undefined');
assert.ok(mongodbVars.host, 'MONGODB_HOST environment variable can not be undefined');
assert.ok(mongodbVars.dbName, 'MONGODB_DB environment variable can not be undefined');