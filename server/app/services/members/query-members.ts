import { ObjectID } from 'mongodb';
import { env } from '../../../config';
import { mongoDb } from '../../dal';


export async function queryMembers(ids: string[]) {
    const filter = ids.length > 0 ? { _id: { $in: ids.map(_id => new ObjectID(_id)) } } : {};
    const cursor = await mongoDb.find(env.mongodb.dbName, 'members', filter);
    return cursor.toArray();
}