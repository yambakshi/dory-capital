import { env } from '../../../config';
import { mongoDb } from '../../dal';

export async function querySkills() {
    const query = {};
    const cursor = await mongoDb.find(env.mongodb.dbName, 'skills', query);
    return cursor.toArray();
}